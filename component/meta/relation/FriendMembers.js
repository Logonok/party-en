'use strict';

// find objects of the Member class via the Friend class link that are in the accepted state
// also, exclude the current user member

const Base = require('areto/base/Base');

module.exports = class FriendMembers extends Base {

    async apply (query, member) {
        const memberId = member.getId();
        const friendClass = member.class.meta.getClass('friend');
        const friendQuery = friendClass.find()
            .and({_state: 'accepted'})
            .and(['or', {inviter: memberId}, {invitee: memberId}]);
        const items = await friendQuery.raw().all();
        const memberIds = [];
        for (const item of items) {
            memberIds.push(item.inviter, item.invitee);
        }
        const key = member.class.getKey();
        query.and({[key]: memberIds}).and(['!=', key, memberId]);
    }
};