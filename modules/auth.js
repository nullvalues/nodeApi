// require our secret
const config = require('../config.json');
// and make sure we can use tokens
const jwt = require('jsonwebtoken');

// we'll move this to mongo in just a minute or two
const users = [{
    id: 10014,
    username: 'Davis',
    userpass: 'ShawtyPants',
    firstName: 'Davis',
    lastName: 'Jacunsen'
}];

exports.authenticate = async function ({ username, userpass }) {
    const user = users.find(u => u.username === username && u.userpass === userpass);
    let authError = new Error()
    if (!user) {
        authError.name ="AuthenticationError";
        authError.message = "Authentication Failed: User or Password is wrong, or User is disabled.";
        throw authError;
    }

    // 1 day jwt token
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '1d' });
    return {
        ...omitPassword(user),
        token
    };
}

function omitPassword(user) {
    const { userpass, ...userWithoutPassword } = user;
    return userWithoutPassword;
}
