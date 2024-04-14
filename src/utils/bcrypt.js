import bcrypt from 'bcrypt';
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => {
    const isValid = bcrypt.compareSync(password, user.password);
    return isValid;
};