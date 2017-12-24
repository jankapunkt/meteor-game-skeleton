import {check, Match} from 'meteor/check';
import {MaybeEmptyObject, NonEmptyObject} from "../utils/CheckUtils";
import {AccountsUtils} from "../utils/AccountsUtils";


export const PublicationFactory = {

    definitionsMatch:{
        collection:String,
        fields:MaybeEmptyObject,
        query:MaybeEmptyObject,
        modifier:MaybeEmptyObject,
        isPublic:Match.Maybe(Boolean),
        log:Match.Maybe(Function),
    },
    
    runtimeMatch:{
        query: MaybeEmptyObject,
        modifier: MaybeEmptyObject,
    },

    errors:{
        COLLECTION_NOT_FOUND:"publicationFactory.collectionNotFound",
    },

    create(definitions){
        check(definitions, this.definitionsMatch);

        const query = definitions.query || {};
        const modifier = definitions.modifier || {};
        const log = definitions.log;
        const isPublic = definitions.isPublic || false;

        const collection = Mongo.Collection.get(definitions.collection);
        if (!collection) {
            throw new Error(this.errors.COLLECTION_NOT_FOUND);
        }

        return function (options) {
            check(options, PublicationFactory.runtimeMatch);

            if (!isPublic && !AccountsUtils.userExistsById(this.userId)) {
                const err = new Error(AccountsUtils.errors.USER_NOT_RECOGNIZED)
                if (log) log.call(this, err);
                throw err;
            }

            if (definitions.roles && !AccountsUtils.userHasRole(this.userId, definitions.roles.roles, definitions.roles.domain)){
                const err = new Error(AccountsUtils.errors.USER_NOT_IN_ROLE)
                if (log) log.call(this, err);
                throw err;
            }

            const runtimeQuery = Object.assign(query, options.query || {});
            const runtimeModifier = Object.assign(modifier, options.modifier || {});

            const data = collection.find(runtimeQuery, runtimeModifier);
            if (data && data.count >= 0) return data;
            this.ready();
        }
    }
}