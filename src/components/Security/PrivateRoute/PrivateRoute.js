import { Box, CircularProgress, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import CompleteProfile from "../../YourProfile/CompleteProfile/CompleteProfile";

const PrivateRoute = ({ children, ...rest }) => {
  const { user, isLoading, setIsLoading } = useAuth();
  const [profile, setProfile] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://link-depo.vercel.app/profile/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.userName) {
          setProfile(true);
        }
      })
      .finally(() => {
        if (user.email) setIsLoading(false);
      });
  }, [user.email]);

  let location = useLocation();
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          "& > :not(style)": {
            m: 1,
            my: 5,
            width: 128,
            height: 128,
          },
        }}
      >
        <Paper
          elevation={1}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Paper>
      </Box>
    );
  }
  if (user.email && profile) {
    return children;
  } else if (user.email) {
    return <CompleteProfile />;
  }
  return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
