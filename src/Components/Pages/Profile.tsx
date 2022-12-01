import React, { useState, useEffect } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Typography,
  Box,
  Container,
  Grid,
  Link,
  ImageList,
  ImageListItem,
  TextField,
  CssBaseline,
  Button,
  Avatar,
} from "@mui/material";
import axios from "axios";

import { useAppDispatch, useAppSelector } from "../hooks/reactHooks";
import { authenticate, fetchUsers } from "../redux/reducers/users";
import { RootState } from "../redux/store";
import { logout } from "../redux/reducers/users";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useAppSelector(
    (state: RootState) => state.usersReducer.currentUser
  );
  const userList = useAppSelector((state) => state.usersReducer.users);
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    dispatch(fetchUsers());
    if (token) {
      dispatch(authenticate(token));
    }
  }, []);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        { email, password }
      );
      const token = response.data;
      localStorage.setItem("token", token.access_token);
      dispatch(authenticate(token.access_token));
    } catch (e) {
      console.log(e);
    }
  };

  const logoutFromProfile = () => {
    dispatch(logout());
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box>
        {!user && (
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
              Log in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                type="email"
                autoComplete="email"
                autoFocus
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}{" "}
      </Box>
      <Box>
        {user && (
          <Box>
            <img src={`${user.avatar}`} loading="lazy" />
            <Typography>Your name: {user.name}</Typography>
            <Typography>Your password: {user.password}</Typography>
            <Typography>Your email: {user.email}</Typography>
            <Typography>Your role: {user.role}</Typography>
            <Button onClick={() => logoutFromProfile()}>Log Out</Button>
          </Box>
        )}{" "}
        {user?.role === "admin" && (
          <Box>
            <ImageList cols={2} gap={4}>
              {userList.map((item) => (
                <ImageListItem key={item.id}>
                  <img src={`${item.avatar}`}></img>
                  <Typography>Users name: {item.name}</Typography>
                  <Typography>Users role: {item.role}</Typography>
                  <Typography>Users email: {item.email}</Typography>
                  <Typography>Users password: {item.password}</Typography>
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        )}
      </Box>
    </Container>
  );
};
export default Profile;
