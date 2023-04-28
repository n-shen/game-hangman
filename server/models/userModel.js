import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    user_name: {
      type: String,
      unique: true,
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 0,
    },
    rounds_easy: {
      type: Number,
      default: 0,
    },
    rounds_normal: {
      type: Number,
      default: 0,
    },
    rounds_hard: {
      type: Number,
      default: 0,
    },
    password: {
      type: String,
      required: true,
    },
    backup_code: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.signUp = async function (user_name, password, back_code) {
  if (!user_name || !password || !back_code)
    throw Error("Missing required fields!");

  if (await this.findOne({ user_name }))
    throw Error("Sorry, username already in use!");

  // encrypt user password
  const pw_salt = await bcrypt.genSalt(12);
  const pw_hash = await bcrypt.hash(password, pw_salt);
  // encrypt user backup code
  const bc_salt = await bcrypt.genSalt(12);
  const bc_hash = await bcrypt.hash(back_code, bc_salt);

  return await this.create({
    user_name: user_name,
    password: pw_hash,
    backup_code: bc_hash,
  });
};

userSchema.statics.signIn = async function (user_name, password) {
  if (!user_name || !password) throw Error("Missing required fields!");

  const pre_user = await this.findOne({ user_name });
  if (!pre_user) throw Error("Sorry, please check your username and password!");

  const pre_match = await bcrypt.compare(password, pre_user.password);
  if (!pre_match)
    throw Error("Sorry, please check your username and password!");

  return pre_user;
};

userSchema.statics.getProfile = async function (uid) {
  if (!uid) throw Error("Missing required fields!");

  const pre_user = await this.findOne({ _id: uid });
  if (!pre_user) throw Error("User record not found!");

  return pre_user;
};

userSchema.statics.updateProfile = async function (uid, score) {
  if (!uid || !score) throw Error("Missing required fields!");

  const updatedProfile = await this.findOneAndUpdate(
    { _id: uid },
    {
      score: score,
    },
    {
      new: true,
    }
  );

  if (!updatedProfile) throw Error("Not a valid profile update request!");

  return updatedProfile;
};

const User = mongoose.model("User", userSchema);

export { User };
