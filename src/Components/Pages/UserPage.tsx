import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  ImageListItem,
  ImageList,
} from "@mui/material";
import { useAppSelector, useAppDispatch } from "../hooks/reactHooks";
import { RootState } from "../redux/store";
import { logout } from "../redux/reducers/users";

const UserPage = () => {
  const user = useAppSelector(
    (state: RootState) => state.usersReducer.currentUser
  );
  const userList = useAppSelector((state) => state.usersReducer.users);
  const dispatch = useAppDispatch();
  const logoutFromProfile = () => {
    dispatch(logout());
  };
  return (
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
  );
};

export default UserPage;
