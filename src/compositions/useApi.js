export function useApi() {
  // const api = "https://api.superapp.avacore.ru";
  const api = "http://87.249.49.97:90";
  /*   const api = "http://192.168.0.119:90"; */
  const Token = "Bearer" + " " + localStorage.getItem("Token");
  const params = {
    headers: {
      Authorization: Token,
    },
  };
  return {
    api,
    Token,
    params,
  };
}
