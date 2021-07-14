const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const {constants} = require('../constants');

const promiseReadFile = promisify(fs.readFile);
const promiseWriteFile = promisify(fs.writeFile);

const usersDbPath = path.join(__dirname, constants.DATA_BASE_PATH);

const getData = async () => {
    const data = await promiseReadFile(usersDbPath);
    return JSON.parse(data.toString());
};

module.exports = {
    getUsers: getData,
    getSingleUser: async (userId) => {
        const users = await getData();
        return users.find(user => user.id === +userId);
    },
    createUser:  async (newUser) => {
        const users = await getData();
        users.push({ ...newUser, id: users.length + 1 });
        await promiseWriteFile(usersDbPath, JSON.stringify(users));
    },
    deleteUser: async (userId) => {
        const users = await getData();
        const newUsersArr = users.filter(user => user.id !== + userId);
        await promiseWriteFile(usersDbPath, JSON.stringify(newUsersArr));
    },
    updateUser: async (userId, newData) => {
        const users = await getData();
        users[userId] = { ...users[userId], ...newData };
        await promiseWriteFile((usersDbPath, JSON.stringify(users)));
    }
};
