const { userService } = require('../services');
const { errorConstant } = require('../constants');

module.exports = {
    checkUserPresence: async (req, res, next) => {
        const { userId } = req.params;
        const userById = await userService.getSingleUser(userId);

        if (!userById) {
            throw new Error(errorConstant.USER_NOT_FOUND);
        }
        req.user = userById;

        next();
    },
    checkUserRegistration: async (req, res, next) => {
        const users = await userService.getUsers();
        const findUser = users.find(user => user.login === req.body.login);

        if (findUser) {
            throw new Error(errorConstant.ALREADY_LOGIN);
        }

        next();
    }
};
