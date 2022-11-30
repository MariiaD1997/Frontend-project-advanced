import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

import { userSchema } from "../schema/userForm";
import { UserFormData } from "../types/form";
import { useAppSelector, useAppDispatch } from "../hooks/reactHooks";
import { UserLoginCredential } from "../types/user";
import { authenticate, fetchUsers } from "../redux/reducers/users";

const SignIn = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: yupResolver(userSchema),
  });

  const onSubmit: SubmitHandler<UserFormData> = (data) => {
    data["avatar"] = "https://api.lorem.space/image/face?w=640&h=480&r=5073";
    /*
    const registrate = async (data: UserFormData) => {
      await axios
        .post("https://api.escuelajs.co/api/v1/users/", data)
        .then((responce) => {
          const input: UserLoginCredential = {
            email: responce.data.email,
            password: responce.data.password,
          };
          auth(input);
        });
    };
    return registrate(data);
    */
  };

  const navigate = useNavigate();

  const user = useAppSelector((state) => state.usersReducer.currentUser);
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                {...register("firstName")}
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
              <Typography>{errors.firstName?.message}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                {...register("lastName")}
                label="Last Name"
                autoComplete="family-name"
              />
              <Typography>{errors.lastName?.message}</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                label="Email Address"
                {...register("email")}
                autoComplete="email"
              />
              <Typography>{errors.email?.message}</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                {...register("password")}
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
              <Typography>{errors.password?.message}</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                {...register("re_password")}
                label="Confirm password"
                type="password"
                id="re_password"
                autoComplete="new-password"
              />
              <Typography>{errors.re_password?.message}</Typography>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/profile" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
