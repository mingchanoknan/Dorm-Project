export const SET_USER = "SET_USER";

export const setUser = (obj) => {
    return { type: SET_USER, user: obj };
};