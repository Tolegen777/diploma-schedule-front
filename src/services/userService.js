export const userService = {
  getUser: () => {
    return JSON.parse(localStorage.getItem('USER_DATA'));

  },

  updateUser: (user) => {
    localStorage.setItem('USER_DATA', JSON.stringify(user));
  },
};
