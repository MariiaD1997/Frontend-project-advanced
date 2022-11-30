import axios from "axios";
import { UserFormData } from "../types/form";
import { UserLoginCredential } from "../types/user";
import { useAppDispatch } from "../hooks/reactHooks";
import { authenticate } from "../redux/reducers/users";

export const useRegister = () => {
  const registrate = async (data: UserFormData) => {
    await axios
      .post("https://api.escuelajs.co/api/v1/users/", data)
      .then((responce) => {
        const input: UserLoginCredential = {
          email: responce.data.email,
          password: responce.data.password,
        };
        login(input);
      });
  };

  return { registrate };
};
