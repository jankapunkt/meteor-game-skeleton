import {check, Match} from 'meteor/check';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';

import {NonEmptyObject} from "../utils/CheckUtils";
import {AccountsUtils} from "../utils/AccountsUtils";

export const MethodFactory = {

    definitionsMatch: {
        // REQUIRED
        name: String,
        schema: NonEmptyObject,
        run: Function,
        // OPTIONAL
        isPublic: Match.Maybe(Boolean),
        log: Match.Maybe(Function),
        validateOptions: Match.Maybe({
            modifier: Boolean,
        }),
        roles: Match.Maybe({
            domain: String,
            roles: [String],
        }),
    },

    errors: {

    },

    create(definitions) {
        check(definitions, this.definitionsMatch);

        const methodSchema = new SimpleSchema(definitions.schema);
        const isPublic = definitions.isPublic || false;
        const log = definitions.log;

        return new ValidatedMethod({
            name: definitions.name,
            validate(doc) {
                try {
                    methodSchema.validate(doc, definitions.validateOptions || {});
                } catch (err) {
                    if (log) log.call(this, err);
                    throw err;
                }
            },
            run(doc) {
                // CHECK USER IF NOT PUBLIC
                if (!isPublic && !AccountsUtils.userExistsById(this.userId)) {
                    const err = new Error(AccountsUtils.errors.USER_NOT_RECOGNIZED);
                    if (log) log.call(this, err);
                    throw err;
                }

                // CHECK ROLES IF REQUIRED
                if (definitions.roles && !AccountsUtils.userHasRole(this.userId, definitions.roles.roles, definitions.roles.domain)) {
                    const err = new Error(AccountsUtils.errors.USER_NOT_IN_ROLE);
                    if (log) log.call(this, err);
                    throw err;
                }

                // EXECUTE FUNCTION CONTEXT
                try {
                    return definitions.run.call(this, doc);
                } catch (err) {
                    if (log) log.call(this, err);
                    throw err;
                }

            },
        });
    }

}