import './login.html';
import {Tracker} from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';
import {i18n} from "../../../api/language/i18n";
import {Routes} from "../../../api/routes/Routes";

const loginSchema = new SimpleSchema({
        user:{
            type:String,
            label:i18n.get("login.usernameOrEmail"),
        },
        password:{
            type:String,
            label:i18n.get("login.password"),
        }
}, {tracker:Tracker});

Template.login.onCreated(function () {

});

Template.login.helpers({
    schema(){
        return loginSchema;
    },
    registerRoute(){
        return Routes.register.path;
    }
});

Template.login.events({

   'submit loginForm'(event, instance) {
       event.preventDefault();

   }
});