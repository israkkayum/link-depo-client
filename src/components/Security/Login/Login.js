import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Paper,
  Divider,
  Chip,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import googleIcon from "../../../images/google.png";
import useAuth from "../../../hooks/useAuth";

const theme = createTheme();

const Login = () => {
  const [loginData, setLoginData] = useState({});

  const {
    user,
    loginUser,
    isLoading,
    authError,
    authInfo,
    resetPassword,
    signInWithGoogle,
  } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };

  const handleLoginSubmit = (e) => {
    loginUser(loginData.email, loginData.password, location, navigate);
    e.preventDefault();
  };

  const handleResetPassword = (e) => {
    resetPassword(loginData.email);
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
          {authError && (
            <Alert variant="filled" severity="error">
              {authError}
            </Alert>
          )}
          {authInfo && (
            <Alert variant="filled" severity="info">
              {authInfo}
            </Alert>
          )}
        </Box>
        <Box
          sx={{
            marginTop: 5,
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
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleLoginSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={handleOnChange}
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
              onChange={handleOnChange}
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  onClick={handleResetPassword}
                  sx={{ textDecoration: "none", cursor: "pointer" }}
                  variant="body2"
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <NavLink to="/register" style={{ textDecoration: "none" }}>
                  <Link style={{ textDecoration: "none" }} variant="body2">
                    {"Don't have an account? Sign Up"}
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

export default Login;
