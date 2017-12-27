import {Random} from 'meteor/random';
import {Sinon} from 'meteor/practicalmeteor:sinon';

import {addUser, getUser, removeUser} from './methods';
import {PoolCollection} from "../PoolCollection";

const userObj = {
    _id: Random.id(),
    username: Random.id(),
    password: Random.id(),
};

describe("api/collections/Pool/server/methods", function () {

    let userId;

    beforeEach(function () {
        userId = userObj._id;
        Meteor.users.remove({});
        Meteor.users.insert(userObj);
    });

    afterEach(function () {

    });

    it("addUser", function () {
        PoolCollection.remove({});
        const docId = addUser._execute({userId: userId}, {userId: userId});
        assert.isDefined(docId);
        assert.equal(PoolCollection.find().count(), 1);

        // add user that already exists
        assert.equal(addUser._execute({userId: userId}, {userId: userId}), docId);
        assert.equal(PoolCollection.find().count(), 1);
    });

    it("removeUser", function () {
        PoolCollection.remove({});
        const docId = addUser._execute({userId: userId}, {userId: userId});
        assert.isDefined(docId);
        assert.equal(PoolCollection.find().count(), 1);

        // remove not existent user
        assert.equal(removeUser._execute({userId: userId}, {userId: Random.id()}), 0)
        assert.equal(PoolCollection.find().count(), 1);

        // remove existent user
        assert.equal(removeUser._execute({userId: userId}, {userId: userId}), 1);
        assert.equal(PoolCollection.find().count(), 0);

    });

    it("getUser", function () {
        PoolCollection.remove({});
        const users = [];
        const num = 10;
        for (let i = 0; i < num; i++) {
            const currentUserId = Random.id();
            users.push(currentUserId);
            addUser._execute({userId: userId}, {userId: currentUserId});
        }
        const randomPick = getUser._execute({userId: userId}, {});
        assert.isAbove(users.indexOf(randomPick), -1);
    });
});