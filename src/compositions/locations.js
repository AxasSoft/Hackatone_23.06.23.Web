import axios from "axios";
import { useApi } from "./useApi.js";

export function locations() {
  const { api, params } = useApi();
  const url = api + "/api/cp/location/";

  const getLocations = () => {
    return axios.get(url, params);
  };

  const getSelectLocation = (location_id) => {
    return axios.get(url + `${location_id}/`, params)
  }


  return {
    getLocations,
    getSelectLocation,
  };
}
