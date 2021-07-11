const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { constant } = require('../constants');

const promiseReadFile = promisify(fs.readFile);
const promiseWriteFile = promisify(fs.writeFile);

const usersDbPath = path.join(__dirname, constant.DATA_BASE_PATH);

const obtainData = async () => {
  const data = await promiseReadFile(usersDbPath);
  return JSON.parse(data.toString());
};

module.exports = {
    getUsers: obtainData,
    getSingleUser: async userId => {
        const users = await obtainData();
        return users.find(user => user.id === + userId);
    },
    createUser: async newUser => {
        const users = await obtainData();
        users.push({ ...newUser, id: users.length + 1 });
        await promiseWriteFile(usersDbPath, JSON.stringify(users));
    },
    deleteUser: async userId => {
        const users = await obtainData();
        const newUsersArr = users.filter(user => user.id !== + userId);
        await promiseWriteFile(usersDbPath, JSON.stringify(newUsersArr));
    },
    updateUser: async (userId, newUserData) => {
        const users = await obtainData();
        users[userId] = { ...users[userId], ...newUserData };
        await promiseWriteFile(usersDbPath, JSON.stringify(users));
    }
};
