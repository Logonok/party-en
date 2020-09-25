'use strict';

// Find a friend where the members are inviter and invitee

const Base = require('evado-meta-base/validator/Validator');

module.exports = class FriendValidator extends Base {

    async validateAttr (name, model) {
        const members = [
            model.get('inviter'),
            model.get('invitee')
        ];
        const id = await model.class.find({
            inviter: members,
            invitee: members
        }).id();
        if (id && !model.isId(id)) {
            model.addError(name, this.getMessage());
        }
    }

    getMessage () {
        return this.createMessage(this.message, 'Friend already exists');
    }
};