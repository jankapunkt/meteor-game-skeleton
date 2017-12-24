import SimpleSchema from 'simpl-schema';
import {i18n} from "../language/i18n";


export const Register = {

    schema: {
        username: {
            type: String,
            label: i18n.get("accounts.username"),
            autoform: {
                afFieldInput: {
                    class: "username-input"
                }
            }
        },
        email: {
            type: String,
            label: i18n.get("accounts.email"),
            autoform: {
                afFieldInput: {
                    class: "email-input"
                }
            }
        },
        password: {
            type: String,
            label: i18n.get("accounts.password"),
            autoform: {
                afFieldInput: {
                    type:"password",
                    class: "password-input"
                }
            }
        },
        confirmPassword: {
            type: String,
            label: i18n.get("accounts.confirmPassword"),
            autoform: {
                afFieldInput: {
                    type:"password",
                    class: "confirm-input"
                }
            }
        },
        terms: {
            type: Boolean,
            label: i18n.get("register.termsAndConditions"),
            autoform: {
                afFieldInput: {
                    class: "terms-input"
                }
            }
        }
    },
    types: {
        username: "username",
        email: "email",
        confirm:"confirmPassword",
    },
    messages: {
        usernameAlreadyUsed: "invalid-username-already-used",
        emailAlreadyUsed: "invalid-email-already-used",
        emailInvalid:"invalid-email-pattern",
        confirmNotMatching: "invalid-confirm-not-matching",
        termsRequired: "invalid-terms-required",
    }
};

SimpleSchema.setDefaultMessages({
    messages: {
        en: {
            "invalid-username-already-used": i18n.get("accounts.usernameAlreadyUsed"),
            "invalid-email-already-used": i18n.get("accounts.emailAlreadyUsed"),
            "invalid-email-pattern": i18n.get("register.invalidEmail"),
            "invalid-terms-required": i18n.get("register.termsRequired"),
            "invalid-confirm-not-matching": i18n.get("register.confirmNotMatching")
        },
    },
});