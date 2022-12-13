const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { hashPassword } = require("../helpers/bcrypt");

const User = require("../models/User");

class userController {
  static async findUsers(req, res) {
    try {
      const users = await User.findAll();
      users.forEach((el) => {
        delete el.password;
      });
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  }

  static async findById(req, res) {
    try {
      const user = await User.findById(req.params.user_id);
      delete user.password;
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async register(req, res) {
    try {
      let body = {
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        password: req.body.password,
      };
      body.password = hashPassword(body.password);

      const newUser = await User.createUser(body);

      res.status(201).json({
        _id: newUser.insertedId,
        name: body.name,
        address: body.address,
        email: body.email,
        password: body.password,
      });
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  }

  static async deleteUser(req, res) {
    try {
      const deletedUser = await User.deleteUser(req.params.user_id);
      res.status(200).json(deletedUser);
    } catch (err) {
      console.log(err);
    }
  }

  static async update(req, res) {
    try {
      let body = {
        id: req.params.user_id,
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        password: req.body.password,
      };
      body.password = hashPassword(body.password);
      const updatedUser = await User.update(body);
      res.status(200).json({
        _id: body.id,
        name: body.name,
        address: body.address,
        email: body.email,
        password: body.password,
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findByEmail(email);
      if (!user) {
        throw { name: "invalid email/password" };
      }
      const passwordValidation = comparePassword(password, user.password);
      if (!passwordValidation) {
        throw { name: "invalid email/password" };
      }
      const payload = {
        id: user._id,
        name: user.name,
      };
      const access_token = createToken(payload);
      res.status(200).json({ access_token });
    } catch (err) {
      console.log(err);
      //   next(err);
    }
  }
}

module.exports = userController;
