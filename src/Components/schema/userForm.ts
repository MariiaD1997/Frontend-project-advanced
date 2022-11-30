import * as yup from "yup";

export const userSchema = yup.object({
  firstName: yup.string().required().min(5).max(20),
  lastName: yup.string().required().min(5).max(20),
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .min(5)
    .max(20)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Must contain at least 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Character"
    ),
  re_password: yup
    .string()
    .required()
    .oneOf([yup.ref("password")]),
});
