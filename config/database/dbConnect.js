import mongoose, { mongo } from "mongoose";

const DBConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("The Database is connected");
  } catch (error) {
    console.log(error);
  }
};

export default DBConnect;
