import axios from "axios";
import { useApi } from "./useApi.js";

export function users() {
  const { api, params } = useApi();
  const url = api + "/api/cp/users/";

  const getUsers = () => {
    return axios.get(url, params);
  };


  return {
    getUsers,
  };
}
