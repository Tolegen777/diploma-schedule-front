
export const tokenService = {
  getLocalAccessToken: () => {
    return localStorage.getItem('UNIVERSITY');

  },

  updateLocalTokenData: (token) => {
    localStorage.setItem('UNIVERSITY', token);
  },
};
