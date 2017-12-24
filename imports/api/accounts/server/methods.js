import '../Accounts';
import {MethodFactory} from "../../factories/MethodFactory";

export const createUser = MethodFactory.create(Object.assign({}, Accounts.methods.createUser, {
    run(doc) {
        const userId = Accounts.createUser(doc);
        // TODO add role here
        return userId;
    }
}));

export const userExists = MethodFactory.create(Object.assign({}, Accounts.methods.userExists, {
    run(doc) {
        if (doc.username)
            return !!Accounts.findUserByUsername(doc.username);
        if (doc.email)
            return !!Accounts.findUserByEmail(doc.email);
    }
}));