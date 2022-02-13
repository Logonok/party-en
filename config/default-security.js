'use strict';

const parent = require('evado/config/default-security');

module.exports = {

    metaPermissions: [{
        description: 'Full access to data',
        roles: 'administrator',
        type: 'allow',
        actions: 'all',
        targets: {type: 'all'}
    }, {
        description: 'Update own member',
        roles: 'user',
        type: 'allow',
        actions: 'update',
        targets: {
            type: 'class',
            class: 'member'
        },
        rules: 'creator'
    }, {
        description: 'Manage own toasts',
        roles: 'user',
        type: 'allow',
        actions: 'all',
        targets: {
            type: 'class',
            class: 'toast'
        },
        rules: 'creator'
    }, {
        description: 'Read toasts that you have access to',
        roles: 'user',
        type: 'allow',
        actions: 'read',
        targets: {
            type: 'class',
            class: 'toast'
        },
        rules: 'toast'
    }, {
        description: 'Manage own comments',
        roles: 'user',
        type: 'allow',
        actions: ['read', 'update', 'delete'],
        targets: {
            type: 'class',
            class: 'comment'
        },
        rules: 'creator'
    }, {
        description: 'Read and create comments of toasts that you have access to',
        roles: 'user',
        type: 'allow',
        actions: ['create', 'read'],
        targets: {
            type: 'class',
            class: 'comment'
        },
        rules: 'comment'
    }, {
        description: 'Read members and friends',
        roles: 'user',
        type: 'allow',
        actions: 'read',
        targets: {
            type: 'class',
            class: ['friend', 'member']
        }
    }, {
        description: 'Create and delete own friends',
        roles: 'user',
        type: 'allow',
        actions: ['create', 'delete'],
        targets: {
            type: 'class',
            class: 'friend'
        },
        rules: 'creator'
    }, {
        description: 'Change friendship if you are an invited member',
        roles: 'user',
        type: 'allow',
        actions: 'update',
        targets: {
            type: 'transition',
            class: 'friend'
        },
        rules: 'invitee'
    }, {
        description: 'Read objects with guest role',
        roles: 'guest',
        type: 'allow',
        actions: 'read',
        targets: {
            type: 'view',
            class: ['member', 'toast', 'comment'],
            view: 'public'
        }
    }],

    permissions: {
        ...parent.permissions,

        'moduleAdmin': {
            label: 'Admin module',
            description: 'Access to Admin module'
        },
        'moduleOffice': {
            label: 'Office module',
            description: 'Access to Office module'
        },
        'moduleStudio': {
            label: 'Studio module',
            description: 'Access to Studio module'
        },
        'moduleApiBaseUpload': {
            label: 'Upload files',
            description: 'Uploading files via basic metadata API module'
        }
    },

    roles: {
        'administrator': {
            label: 'Administrator',
            description: 'Full access',
            children: [
                'moduleAdmin',
                'moduleOffice',
                'moduleStudio',
                'moduleApiBaseUpload'
            ]
        },
        'guest': {
            label: 'Guest',
            description: 'Auto-assigned role for anonymous users'
        },
        'user': {
            label: 'User',
            description: 'Default role for authenticated users',
            children: [
                'moduleOffice',
                'moduleApiBaseUpload'
            ]
        }
    },

    rules: {
        'author': {
            label: 'Author',
            description: 'Check user is author',
            config: {
                Class: 'evado/component/meta/rbac/rule/RefUserRule',
                refAttr: 'author'
            }
        },
        'comment': {
            label: 'Comment',
            description: 'User can comment toasts in All access. User can comment toasts in Friends access if he is a friend of the author',
            config: {
                Class: 'component/meta/rbac/rule/CommentRule'
            }
        },
        'creator': {
            label: 'Creator',
            description: 'Check user binding as object creator',
            config: {
                Class: 'evado/component/meta/rbac/rule/UserRule',
                userAttr: '_creator'
            }
        },
        'invitee': {
            label: 'Invitee',
            description: 'Check user is invitee',
            config: {
                Class: 'evado/component/meta/rbac/rule/RefUserRule',
                refAttr: 'invitee'
            }
        },
        'toast': {
            label: 'Toast',
            description: 'User can read toasts in All access. User can read toasts in Friends access if he is a friend of the author',
            config: {
                Class: 'component/meta/rbac/rule/ToastRule'
            }
        },
        'user': {
            label: 'User',
            description: 'Check user binding',
            config: {
                Class: 'evado/component/meta/rbac/rule/UserRule'
            }
        }
    },

    // bind users to roles
    assignments: {
        'Adam': 'administrator'
    },

    // rules to auto-bind users to roles
    assignmentRules: {
    }
};