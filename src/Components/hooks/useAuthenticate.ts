import axios from "axios";
import { useAppDispatch } from "../hooks/reactHooks";
import { authenticate } from "../redux/reducers/users";
import { UserLoginCredential } from "../types/user";

export const useAuthenticate = () => {
  const dispatch = useAppDispatch();
  const logIn = async (data: UserLoginCredential) => {
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        data
      );
      const token = response.data;
      localStorage.setItem("token", token.access_token);
      dispatch(authenticate(token.access_token));
    } catch (e) {
      console.log(e);
    }
  };
  return { logIn };
};
