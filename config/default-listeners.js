'use strict';

module.exports = [{
    description: 'Create a member on user sign up',
    events: ['auth.register'],
    handlers: ['memberInstantiation']
}];