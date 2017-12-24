import {Mongo} from 'meteor/mongo';
import {check, Match} from 'meteor/check';
import SimpleSchema from 'simpl-schema';
import {NonEmptyObject} from "../utils/CheckUtils";

export const CollectionFactory = {

    definitionsMatch:{
        name:String,
        schema:NonEmptyObject,
        hooks:Match.Maybe({
            insert:Function,
            update:Function,
            remove:Function,
            afterInsert:Function,
            afterUpdate:Function,
            afterRemove:Function,
        }),

        ///////////////
        preventSchemaDefaults:Match.Maybe(Boolean),
    },

    create(definitions) {
        check(definitions, this.definitionsMatch);

        const options = definitions.options || {};
        const hooks = definitions.hooks || {};
        const schema = new SimpleSchema(schema);
        const collection = new FactoryCollection(definitions.name, options, hooks);
        collection.deny({
            insert:()=>{return true},
            update:()=>{return true},
            remove:()=>{return true},
        });
        collection.attachSchema(schema);
        return collection;
    }
};



class FactoryCollection extends Mongo.Collection {

    constructor(name, options, optionalArgs={}) {
        super(name, options);
        this.insertHook = optionalArgs.insert;
        this.updateHook = optionalArgs.update;
        this.removeHook = optionalArgs.remove;
        this.insertAfterHook = optionalArgs.afterInsert;
        this.updateAfterHook = optionalArgs.afterUpdate;
        this.removeAfterHook = optionalArgs.afterRemove;
    }

    insert(doc, callback, cb) {
        try{
            if (this.insertHook && Meteor.isServer)
                this.insertHook.call(this, doc, callback, cb);
            const insertResult = super.insert(doc, cb ? cb : callback); // AUTOFORM INSERT CALLBACK FIX
            if (this.insertAfterHook && Meteor.isServer)
                this.insertAfterHook.call(this, doc, callback, cb, insertResult);
            return insertResult;
        }catch(e){
            if (this.insertAfterHook && Meteor.isServer)
                this.insertAfterHook.call(this, doc, callback, cb, e);
            throw e;
        }
    }

    update(query, modifier, options, callback) {
        try {
            if (this.updateHook && Meteor.isServer)
                this.updateHook.call(this, query, modifier, options, callback);
            const updateResult =  super.update(query, modifier, options, callback);
            if (this.updateAfterHook && Meteor.isServer)
                this.updateAfterHook.call(this, query, modifier, options, callback, updateResult);
            return updateResult
        }catch(e){
            if (this.updateAfterHook && Meteor.isServer)
                this.updateAfterHook.call(this, query, modifier, options, callback, e);
            throw e;
        }
    }

    remove(selector, callback) {
        try {
            if (this.removeHook && Meteor.isServer)
                this.removeHook.call(this, selector, callback);
            const removeResult = super.remove(selector, callback);
            if (this.removeAfterHook && Meteor.isServer)
                this.removeAfterHook.call(this, selector, callback, removeResult);
            return removeResult;
        }catch(e){
            if (this.removeAfterHook && Meteor.isServer)
                this.removeAfterHook.call(this, selector, callback, e);
            throw e;
        }
    }
}
