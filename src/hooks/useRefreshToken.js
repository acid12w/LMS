import { useDispatch } from "react-redux";
import axios from "../api/axios";
import { authActions } from "../store/Auth-slice";

const refresh_Token = localStorage.getItem("refresh_token");

export const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    const response = await axios("/auth/refresh", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + refresh_Token,
      },
      withCredentials: true,
    });
    console.log(response);

    dispatch(authActions.setToken(response.data.accessToken));

    return response.data.accessToken;
  };

  return refresh;
};
