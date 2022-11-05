import React, { useEffect } from "react";
import { useParams } from "react-router";

import { useAppSelector, useAppDispatch } from "../hooks/reactHooks";
import { RootState } from "../redux/store";
import { fetchSingleUser } from "../redux/reducers/users";

const UserItem = () => {
  const params = useParams();

  const users = useAppSelector((state: RootState) => state.usersReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSingleUser());
  }, []);
  return <div></div>;
};

export default UserItem;
