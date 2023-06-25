import axios from "axios";
import { useApi } from "./useApi.js";

export function tasks() {
  const { api, params } = useApi();
  const url = api + "/api/cp/task/";

  const getTasks = () => {
    return axios.get(url + `?is_deleted=false`, params);
  };

  const createTask = (body) => {
    return axios.post(url, body, params)
  }
  const changeTask = (body, task_id) => {
    return axios.put(url + `${task_id}/`, body, params)
  }

  return {
    getTasks,
    createTask,
    changeTask,
  };
}
