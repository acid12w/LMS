import axios from "../api/axios";

export function usehttp(url, requestData) {
  const fetchData = async () => {
    const response = await axios("/mycourses/instructor");
    if (response.status !== 200) {
      throw new Error("Could not fetch cart data!");
    }

    const data = await response;
    console.log(data);

    return data;
  };
}
