const isTokenValid = (refreshToken) => {
  if (!refreshToken) return false;

  try {
    const decoded = JSON.parse(atob(refreshToken.split(".")[1])); // Decode JWT payload
    return decoded.exp * 1000 > Date.now(); // True if not expired
  } catch (err) {
    return err;
  }
};

export default isTokenValid;
