import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = (email, password) => {
  const url = `${process.env.REACT_APP_API_URL}/auth/login`;
  return axios({
    method: "post",
    url,
    data: {
      email: email,
      password: password,
    },
  });
};

export const register = (data) => {
  const url = `${process.env.REACT_APP_API_URL}/register`;
  return axios({
    method: "post",
    url,
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });
};

export const taskGroups = (getList) => {
  const url = `${process.env.REACT_APP_API_URL}/taskgroups/${getList}/tasks`;
  return axios({
    method: "get",
    url,
  });
};

export const changeCompletedTask = (taskId) => {
  const url = `${process.env.REACT_APP_API_URL}/tasks/close/${taskId}`;
  return axios({
    method: "put",
    url,
  });
};

export const deletedTask = (taskId) => {
  const url = `${process.env.REACT_APP_API_URL}/tasks/${taskId}`;
  return axios({
    method: "delete",
    url,
  });
};

export const showTaskGroup = () => {
  const url = `${process.env.REACT_APP_API_URL}/taskgroups`;
  return axios({
    method: "get",
    url,
  });
};

export const insertList = (data) => {
  const url = `${process.env.REACT_APP_API_URL}/taskgroups`;
  return axios({
    method: "post",
    url,
    data: {
      title: data.title,
      user_id: data.user_id,
    },
  });
};

export const insertTask = (data) => {
  const url = `${process.env.REACT_APP_API_URL}/tasks`;
  return axios({
    method: "post",
    url,
    data: {
      title: data.title,
      completed: false,
      task_group_id: data.task_group_id,
    },
  });
};
