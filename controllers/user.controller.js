const { userService } = require('../services');

module.exports = {
  getUsersData: async (req, res) => {
      const users = await userService.getUsers();
      res.json(users);
  },
  getUserById: async (req, res) => {
      res.json(req.user);
  },
  createUser: async (req, res) => {
      await userService.createUser(req.body);
      res.json('user has been successfully created');
  },
  deleteUserById: async (req, res) => {
      const { userId } = req.params;
      await userService.deleteUser(userId);
      res.json('user has been successfully deleted');
  },
  updateUserById: async (req, res) => {
      const { userId } = req.params;
       await userService.updateUser(userId, req.body);
       res.json('user data has been successfully updated');
  }
};
