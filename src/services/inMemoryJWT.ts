
const inMemoryJWTService = () => {
  let inMemoryJWT: string | null = null;
  let refreshTimeoutId: any = null;

  const getToken = () => inMemoryJWT;

  const setToken = (token: string | null, tokenExpiration: number | null) => {
    inMemoryJWT = token;
  };

  const deleteToken = () => {
    inMemoryJWT = null;
    localStorage.setItem('logout', String(Date.now()));
  };

  return {
    getToken,
    setToken,
    deleteToken,
  };
};

export default inMemoryJWTService();
