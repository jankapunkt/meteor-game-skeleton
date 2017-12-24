import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export const AccountsUtils = {

    errors:{
        USER_NOT_RECOGNIZED: "accounts.userNotRecognized",
        USER_NOT_IN_ROLE: "accounts.userNotInRole",
    },

    userExistsById(userId) {
        check(userId, String);
        return userId && Meteor.users.findOne(userId);
    },

    userHasRole(userId, roles, domain) {
        check(userId, String);
        check(roles, [String]);
        check(domain, String);
        return userId && Roles.userIsInRole(userId, role, domain);
    },
}