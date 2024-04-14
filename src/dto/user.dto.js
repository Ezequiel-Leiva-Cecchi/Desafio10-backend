export class UserDTO {
  constructor({ first_name, last_name, email, cartId, password }) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.cid = cid;
    this.password = password;
  }

  static fromModel(userModel) {
    return new UserDTO({
      first_name: userModel.first_name,
      last_name: userModel.last_name,
      email: userModel.email,
      cartId: userModel.cid,
      password: userModel.password
    });
  }
};


