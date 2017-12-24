import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';

Template.registerHelper('eq', function (a, b) {
    return a === b;
});

Template.registerHelper('neq', function (a, b) {
    return a !== b;
});

Template.registerHelper('gt', function (a, b) {
    return a > b;
});

Template.registerHelper('lt', function (a, b) {
    return a < b;
});

Template.registerHelper('let', function (a, b) {
    return a <= b;
});

Template.registerHelper('gte', function (a, b) {
    return a > b;
});

Template.registerHelper('in', function (a, b) {
    return (Array.isArray(b) || typeof b === 'string') && b.indexOf(a) > -1;
});

Template.registerHelper('allTrue', function (...args) {
    args.pop();
    for (let arg of args)
        if (!!arg === false) return false;
    return true;
});

Template.registerHelper('or', function (...args) {
    args.pop();
    for (let arg of args)
        if (!!arg) return true;
    return false;
});

Template.registerHelper('allFalse', function (...args) {
    args.pop();
    for (let arg of args)
        if (!!arg === true) return false;
    return true;
});

Template.registerHelper('trueFalse', function (a, b) {
    return a && !b;
});

Template.registerHelper('toIndex', function (arrayIndex) {
    return arrayIndex + 1;
});

Template.registerHelper('settings', function () {
    return Meteor.settings.public;
});