import * as yup from "yup";

export const userSchema = yup.object({
  name: yup.string().required().min(5).max(20),
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,18}\S$/gm),
});
