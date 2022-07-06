import Picture from "../models/PictureModel.js";
import User from "../models/UserModel.js";

const initialData = async () => {
  try {
    const response = await fetch("../../../DB/slideShow.json");

    let { pictures, users } = await response.json();

    pictures = pictures.map((picture, index, pictures) => {
      return new Picture(picture, pictures);
    });

    users = users.map((user) => {
      return new User(user);
    });

    return { pictures, users };
  } catch (error) {
    console.log(error.message);
  }
};

export default initialData;
