import {Tracker} from 'meteor/tracker';
import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict'
import SimpleSchema from 'simpl-schema';

import {Register} from "../../../api/accounts/Register";

import {createCallback} from "../../helpers/Callbacks";
const registerSchema = new SimpleSchema(Register.schema, {tracker: Tracker})

import './register.html';
import {Routes} from "../../../api/routes/Routes";
import {validateEmail, ValidEmail} from "../../../api/utils/CheckUtils";

Template.register.onCreated(function () {

    const instance = this;
    instance.state = new ReactiveDict();
    instance.state.set("errors", {});

});

Template.register.helpers({

    schema() {
        return registerSchema;
    },

    loginRoute(){
        return Routes.login.path;
    }
});

Template.register.events({

    'submit #registerForm'(event, instance) {
        event.preventDefault();
        const errors = instance.state.get("errors");

        if (Object.keys(errors).length > 0) return;
    },

    'blur .username-input'(event, instance) {
        const value = $(event.currentTarget).val();
        checkUser( Register.types.username, value,  Register.messages.usernameAlreadyUsed, instance);
    },

    'blur .email-input'(event, instance) {
        const value = $(event.currentTarget).val();

        if (updateErrors(!validateEmail(value), Register.types.email, Register.messages.emailInvalid, instance)) {
            return;
        }

        checkUser( Register.types.email, value,  Register.messages.emailAlreadyUsed, instance);
    },

    'blur .confirm-input'(event, instance) {
        const confirm = $(event.currentTarget).val();
        const password = $('.password-input').val();

        updateErrors((confirm === password),
            Register.types.confirm,
            Register.messages.confirmNotMatching,
            instance);
    },

});


const checkUser = function(type, value, message, instance) {
    const doc = {[type]:value};
    Meteor.call(Accounts.methods.userExists.name, doc, createCallback({
        instance: instance,
        onRes(exists) {
            updateErrors(exists, type, message, this);
        }
    }));
};

const updateErrors = function (hasError, type, message, instance) {
    const errors = instance.state.get("errors");
    if (hasError) {
        AutoForm.addStickyValidationError("registerForm", type, message);
        errors[type] = true;
    }else{
        AutoForm.removeStickyValidationError("registerForm", type);
        delete errors[type];
    }
    instance.state.set("errors", errors);
    return hasError
};