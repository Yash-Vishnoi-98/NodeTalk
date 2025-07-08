import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    bio: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
      default: "",
    },
    nativeLanguage: {
      type: String,
      default: "",
    },
    learningLanguage: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    isOnboarded: {
      type: Boolean,
      default: false, // other pages are only viisted if this default is Changed to True
    },
    friends: [
      // we can have mutiple Friends So using the array
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

// password HASHING
userSchema.pre("save", async function (next) {
  //before saving the user in database
  if (!this.isModified("password")) return next();
  try {
    const user = this;
    if (!user.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (e) {
    next(e);
    console.log(e);
  }
});

userSchema.methods.matchPassword = async function (genpassword) {
  console.log(this.password);
  return await bcrypt.compare(genpassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
