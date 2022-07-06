import {
  generateUniqNumber,
  makeFirstLetterCapital,
} from "../utils/algoMethods.js";

class User {
  #id;

  address = {
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  };
  #nameF;
  #nameL;
  #phone;
  #email;
  #password;
  #createdAt;
  #isAdmin = false;
  #isBusiness = false;

  constructor(user, users = []) {
    const {
      address,
      nameF,
      nameL,
      phone,
      email,
      password,
      isBusiness,
      isAdmin = false,
    } = user;
    const { state, country, city, street, houseNumber, zip } = address;
    this.address = { state, country, city, street, houseNumber, zip };
    this.#id = generateUniqNumber(users, "_id");
    this.#nameF = this.setNameF(nameF);
    this.#nameL = this.setNameL(nameL);
    this.#phone = this.checkPhone(phone);
    this.#email = this.checkEmail(email, users);
    this.#password = this.checkPassword(password);
    this.#isBusiness = isBusiness;
    this.#isAdmin = isAdmin;
    this.#createdAt = new Date();
  }

  setNameF(first) {
    const firstName = makeFirstLetterCapital(first);

    return `${firstName}`;
  }
  setNameL(last) {
    const lastName = makeFirstLetterCapital(last);
    return `${lastName}`;
  }

  changeBusinessStatus(user) {
    if (!user.isAdmin) return null;
    this.#isBusiness = !this.#isBusiness;
  }

  checkPhone(phoneNumber) {
    if (
      phoneNumber.match(/^0[0-9]{1,2}(\-?|\s?)[0-9]{3}(\-?|\s?)[0-9]{4}/g) ===
      null
    ) {
      throw new Error("Please enter a valid phone number!");
    }
    return phoneNumber;
  }

  checkPassword(password) {
    if (
      password.match(
        /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/g
      ) === null
    )
      throw new Error(
        "The password must contain at least one uppercase letter in English. One lowercase letter in English. Four numbers and one of the following special characters !@#$%^&*-"
      );
    return password;
  }
  checkEmail(email, users = []) {
    if (email.match(/.+@.+\..{2,}/g) === null) {
      throw new Error("Please enter a standard email");
    }
    const user = users.findIndex((user) => user.email === email);
    if (user !== -1) throw new Error("User is already registered!");
    return email;
  }
  get _id() {
    return this.#id;
  }

  get nameF() {
    return this.#nameF;
  }
  set nameF(nameF) {
    return (this.#nameF = nameF);
  }
  get nameL() {
    return this.#nameL;
  }
  set nameL(nameL) {
    return (this.#nameL = nameL);
  }

  get email() {
    return this.#email;
  }
  set email(email) {
    return (this.#email = email);
  }

  get password() {
    return this.#password;
  }
  set password(password) {
    return (this.#password = password);
  }

  get createdAt() {
    return this.#createdAt;
  }

  get isAdmin() {
    return this.#isAdmin;
  }

  get isBusiness() {
    return this.#isBusiness;
  }
  set isBusiness(isBusiness) {
    return (this.#isBusiness = isBusiness);
  }
  get phone() {
    return this.#phone;
  }
  set phone(phone) {
    return (this.#phone = phone);
  }
}

export default User;
