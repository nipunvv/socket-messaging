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
    return await axios
      .get(url)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.error(err);
      });
  },
};

export default ApiUtils;
