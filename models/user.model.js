const { Schema, model } = require('mongoose');

const userCollection = 'users';

const userSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String, unique: true },
  age: { type: Number },
  password: { type: String },
  githubLogin: {type: String, unique: true}
});

const UserModel = model(userCollection, userSchema);

module.exports = {
  UserModel
};