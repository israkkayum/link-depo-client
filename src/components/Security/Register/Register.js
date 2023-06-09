import React, { useState } from "react";
import { Chip, Divider, Grid, Paper } from "@mui/material";
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import googleIcon from "../../../images/google.png";
import useAuth from "../../../hooks/useAuth";

const theme = createTheme();

const Register = () => {
  const [loginData, setLoginData] = useState({});
  const [message, setMessage] = useState("");

  const { registerUser, isLoading, authError, authInfo, signInWithGoogle } =
    useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };

  const handleRegisterSubmit = (e) => {
    if (loginData.password !== loginData.password2) {
      setMessage("Your password did not match");
    } else {
      registerUser(
        loginData.email,
        loginData.password,
        loginData.name,
        navigate
      );
      setMessage("");
    }

    e.preventDefault();
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle(location, navigate);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ pt: 5, pb: 20 }}>
        <CssBaseline />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          {isLoading && <CircularProgress />} <br />
          {authInfo && (
            <Alert variant="filled" severity="success">
              {authInfo}
            </Alert>
          )}
          {authError && (
            <Alert variant="filled" severity="error">
              {authError}
            </Alert>
          )}
          {message && (
            <Alert variant="filled" severity="error">
              {message}
            </Alert>
          )}
        </Box>
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 3,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={handleRegisterSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              onBlur={handleOnBlur}
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onBlur={handleOnBlur}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              onBlur={handleOnBlur}
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Confirm"
              type="password"
              onBlur={handleOnBlur}
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink style={{ textDecoration: "none" }} to="/login">
                  <Link style={{ textDecoration: "none" }} variant="body2">
                    Already have an account? Sign in
                  </Link>
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Divider sx={{ py: 3 }}>
          <Chip sx={{ color: "blue", fontWeight: "bold" }} label="OR" />
        </Divider>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: "100%",
              height: 60,
            },
          }}
        >
          <Paper
            elevation={2}
            onClick={handleGoogleSignIn}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Box sx={{ mr: 3 }}>
              <img style={{ width: "20px", height: "20px" }} src={googleIcon} />
            </Box>
            <h4>Continue with Google</h4>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
