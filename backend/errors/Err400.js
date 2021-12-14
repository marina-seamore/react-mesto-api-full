class Err400 extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400;
    }
}

module.exports = Err400;
