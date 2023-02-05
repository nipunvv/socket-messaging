import axios from "axios";

const ApiUtils = {
  post: async (url, data) => {
    return await axios
      .post(url, data)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  get: async (url) => {
    const accessToken = localStorage.getItem("access_token");
    return await axios
      .get(url, { headers: { "x-access-token": accessToken } })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.error(err);
      });
  },
};

export default ApiUtils;
