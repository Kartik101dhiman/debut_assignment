import axios from "axios";

const Apiservices = (function () {
  //post api

  const _PostData = async (url, data) => {
    try {
      return await axios
        .post(url, data)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error;
        });
    } catch (error) {
      return error;
    }
  };

  //get api

  const _Getdata = async (url) => {
    try {
      return await axios
        .get(url)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error;
        });
    } catch (error) {
      return error;
    }
  };

  //delete api

  const _DeleteData = () => {
    return axios
      .delete("https://jsonplaceholder.typicode.com/posts/" + 50)
      .then(() => console.log("delete successfully"));
  };

  return {
    GetData: _Getdata,
    PostData: _PostData,
    // PutData: _PutData,
    // PatchData:_PatchData,
    DeleteData: _DeleteData,
  };
})();
export default Apiservices;
