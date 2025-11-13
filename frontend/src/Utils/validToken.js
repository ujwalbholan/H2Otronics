const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const decoded = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    return decoded.exp * 1000 > Date.now(); // True if not expired
  } catch (err) {
    return err;
  }
};

export default isTokenValid;
