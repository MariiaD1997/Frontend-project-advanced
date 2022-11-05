import React, { useEffect } from "react";
import { Box, ListItem, Grid } from "@mui/material";
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../hooks/reactHooks";
import { RootState } from "../redux/store";
import { fetchUsers } from "../redux/reducers/users";

const Users = () => {
  const users = useAppSelector((state: RootState) => state.usersReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  return (
    <Box>
      <Grid container display="flex">
        <ListItem>Users</ListItem>
        {users.map((item) => (
          <Grid md={4}>
            <li key={item.id}>
              <img src={`${item.avatar}`}></img>
              <p>{item.name}</p>
              <p>{item.role}</p>
              <Link to={`/users/${item.id}`}>link</Link>
            </li>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Users;
