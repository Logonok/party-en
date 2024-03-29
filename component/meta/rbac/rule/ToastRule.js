'use strict';

// member can read toasts in All access
// member can read toasts in Friends access if he is a friend of the author

const Base = require('evado/component/meta/rbac/rule/BaseRule');

module.exports = class ToastRule extends Base {

    execute () {
        return this.isObjectTarget() ? this.checkAccess(this.getTarget()) : true;
    }

    async checkAccess (toast) {
        if (toast.isCreator(this.getUserId())) {
            return true;
        }
        switch (toast.get('access')) {
            case 'all': return true;
            case 'friends': return this.checkFriendAccess(toast);
        }
        return false;
    }

    async checkFriendAccess (toast) {
        const member = await this.getUserMemberId();
        const members = [member, toast.get('author')];
        const query = toast.class.meta.getClass('friend').findByState('accepted').and({
            inviter: members,
            invitee: members
        });
        return !!await query.id();
    }

    getUserMemberId () {
        const user = this.getUserId();
        return this.getBaseMeta().getClass('member').find({user}).id();
    }

    /**
     * Filter objects in list
     */
    async getObjectFilter () {
        const friends = await this.getFriendIds();
        const items = await this.getToastIds(friends);
        return items.length
            ? ['or', {access: 'all'}, {_id: items}]
            : {access: 'all'};
    }

    async getFriendIds () {
        const memberId = await this.getUserMemberId();
        const friends = await this.getBaseMeta().getClass('friend').findByState('accepted')
            .and(['or', {inviter: memberId}, {invitee: memberId}])
            .raw().all();
        const result = [];
        for (const friend of friends) {
            result.push(friend.inviter, friend.invitee);
        }
        return result;
    }

    getToastIds (friends) {
        if (!friends.length) {
            return friends;
        }
        return this.getBaseMeta().getClass('toast').find({
            access: 'friends',
            author: friends
        }).ids();
    }
};