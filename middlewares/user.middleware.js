const { errorConstants } = require('../constants');
const { userService } = require('../services');

module.exports = {
    checkUserPresence: async (req, res, next) => {
        const { userId } = req.params;
        const usersById = await userService.getSingleUser(userId);

        if (!usersById) {
            throw new Error(errorConstants.RECORD_NOT_FOUND);
        }
        req.user = usersById;
        next();
    },
    checkUserRegistration: async (req, res, next) => {
        const users  = await userService.getUsers();
        const findUser = users.find(user => user.login === req.body.login);

        if (findUser) {
            throw new Error(errorConstants.USED_LOGIN);
        }
        next();
    }
};
