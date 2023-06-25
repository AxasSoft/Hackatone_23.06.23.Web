import axios from "axios";
import { useApi } from "./useApi.js";

export function account() {
  const { api, params } = useApi();
  const url = api + "/api/cp/users/me/";

  const getAccount = () => {
    return axios.get(url, params);
  };


  return {
    getAccount,
  };
}
