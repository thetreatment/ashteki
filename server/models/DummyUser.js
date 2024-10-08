const User = require("./User");

/**
 * Dummy user acts as a proxy for LOBBY
 */
class DummyUser extends User {
    constructor() {
        super({
            _id: 0,
            username: DummyUser.DUMMY_USERNAME
        })
    }

    static DUMMY_USERNAME = 'dummy'
    get username() {
        return DummyUser.DUMMY_USERNAME;
    }

    get isDummy() {
        return true;
    }

    hasUserBlocked() {
        return false;
    }
}


module.exports = DummyUser;
