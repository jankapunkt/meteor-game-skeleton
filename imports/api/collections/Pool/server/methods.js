import {Pool} from '../Pool';
import {MethodFactory} from "../../../factories/MethodFactory";
import {PoolCollection} from "../PoolCollection";

export const addUser = MethodFactory.create(Object.assign({}, Pool.methods.add, {
    run(doc) {
        const existingUser = PoolCollection.findOne({userId:doc.userId});
        return existingUser ? existingUser._id : PoolCollection.insert(doc);
    }
}));


export const removeUser = MethodFactory.create(Object.assign({}, Pool.methods.remove, {
    run(doc) {
        const existingUser = PoolCollection.findOne({userId:doc.userId});
        return PoolCollection.remove(existingUser._id);
    }
}));

export const getUser = MethodFactory.create(Object.assign({}, Pool.methods.get, {
    run(doc) {
        let found;
        let security = 0;
        // note: security prevents infinite loop, set max value according to your needs
        while(!found && security < 100000) {

            // NOTE: increase size to obtain multiple users
            const sample = PoolCollection.aggregate([ { $sample: { size: 1 } } ]);
            found = sample[0];
        }
        return found;
    }
}));