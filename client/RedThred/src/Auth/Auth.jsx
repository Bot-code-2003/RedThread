/** Auth component - Responsible for login and signup */

import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Box, Divider } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";

import { signup, signin } from "../actions/auth";

export default function Auth() {
  // let isSignUp = true;
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const initialData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialData);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSignUp) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const styles = {
    button: {
      width: "100%",
      backgroundColor: "#4285F4",
      color: "#FFFFFF",
      textTransform: "none",
      padding: "10px 20px",
      display: "flex",
      alignItems: "center",
      borderRadius: "5px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
  };

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
          {isSignUp ? "Sign up" : "Log in"}
        </Typography>

        {/**
         * Google Login
         * returns {object} - Contains credential, clientId, selected_by.
         */}
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const result = jwtDecode(credentialResponse?.credential);
            const token = credentialResponse?.credential;
            try {
              dispatch({
                type: "AUTH",
                payload: { result, token },
              });
              navigate("/");
            } catch (error) {
              console.log(error);
            }
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          style={styles.button}
        />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <Divider style={{ width: "40%", margin: "0 10px" }} />
          <p>or</p>
          <Divider style={{ width: "40%", margin: "0 10px" }} />
        </Box>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className="dark:text-white"
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={handleChange}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} style={{ position: "relative" }}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type={visible ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                onChange={handleChange}
              />
              <div className="absolute top-[45%] right-5">
                <p
                  onClick={() => setVisible(!visible)}
                  className="text-gray-400 hover:underline cursor-pointer"
                >
                  Show
                </p>
              </div>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            style={styles.button}
            sx={{ mt: 3, mb: 2 }}
          >
            {isSignUp ? "Sign up" : "Sign in"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                className="hover:cursor-pointer"
                variant="body2"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "New to RedThread? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
