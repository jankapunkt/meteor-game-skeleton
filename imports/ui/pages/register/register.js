import {Tracker} from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';
import {Meteor} from 'meteor/meteor';
import {i18n} from "../../../api/language/i18n";
import {createCallback} from "../../helpers/Callbacks";

const registerSchema = new SimpleSchema({
    username:{
        type:String,
        label:i18n.get("accounts.username"),
        autoform: {
            afFieldInput: {
                class: "username-input"
            }
        }
    },
    email:{
        type:String,
        label:i18n.get("accounts.email"),
    },
    password:{
        type:String,
        label:i18n.get("accounts.password"),
    },
    confirmPassword:{
        type:String,
        label:i18n.get("accounts.confirmPassword"),
    },
    terms:{
        type:Boolean,
        label:i18n.get("register.termsAndConditions")
    }
}, {tracker:Tracker})

import './register.html';


Template.register.helpers({

    schema(){
        return registerSchema;
    }
});

Template.register.events({

    'submit #regsterForm'(event, instance) {
        event.preventDefault();
    },

    'blur .username-input'(event, instance) {
        const value = $(event.currentTarget).val();

        Meteor.call(Accounts.methods.userExists.name, {username: value}, createCallback({
            instance:instance,
            onRes(exists){
                if (exists === true) {
                    $('.username-input').removeClass("has-success");
                    AutoForm.addStickyValidationError("registerForm", "username", "error", "Username exists");
                }
                if (exists === false) {
                    AutoForm.removeStickyValidationError("registerForm", "username");
                    $('.username-input').addClass("has-success");
                }
            }
        }));
    }

});