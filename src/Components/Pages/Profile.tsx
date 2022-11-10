import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router";
import { authenticate, fetchUsers } from "../redux/reducers/users";
import LogIn from "./LogIn";
import { useAppDispatch, useAppSelector } from "../hooks/reactHooks";
import UserPage from "./UserPage";
import { RootState } from "../redux/store";

const Profile = () => {
  const user = useAppSelector(
    (state: RootState) => state.usersReducer.currentUser
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    dispatch(fetchUsers());
    if (token) {
      dispatch(authenticate(token));
    }
  }, []);

  return <Box>{!user ? <LogIn /> : <UserPage />}</Box>;
};
export default Profile;
