import axios from "axios";
import { useApi } from "./useApi.js";

export function groups() {
  const { api, params } = useApi();
  const url = api + "/api/cp/group/";

  const getGroups = () => {
    return axios.get(url, params);
  };


  return {
    getGroups,
  };
}
