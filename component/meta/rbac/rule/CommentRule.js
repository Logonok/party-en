'use strict';

// member can read comments on toasts in All access
// member can read comments on toasts in Friends access if he is a friend of the author

const Base = require('./ToastRule');

module.exports = class CommentRule extends Base {

    async execute () {
        if (this.isObjectTarget()) {
            const toast = await this.getTarget().related.resolve('toast');
            return this.checkAccess(toast);
        }
        if (this.params.model) {
            return this.checkAccess(this.params.model);
        }
        return true;
    }

    async getObjectFilter () { // filter objects in list
        const friends = await this.getFriendIds();
        const items = await this.getToastIds(friends);
        return items.length ? {toast: items} : null;
    }

    getToastIds (friends) {
        const condition = ['OR', {access: 'all'}];
        if (friends.length) {
            condition.push({
                access: 'friends',
                author: friends
            });
        }
        return this.getBaseMeta().getClass('toast').find(condition).ids();
    }
};