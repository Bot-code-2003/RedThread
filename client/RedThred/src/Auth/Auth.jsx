import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Box, Divider } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Change here: import jwtDecode directly
import { GoogleLogin } from "@react-oauth/google";

import { signup, signin } from "../actions/auth";
import alien from "/alien.png";
import alien1 from "/alien (1).png";
import diablo from "/diablo.png";
import clown from "/clown.png";
import black from "/black panther.png";
import ironman from "/iron man.png";
import monster from "/monster.png";
import spiderman from "/spiderman.png";
import skull from "/skull.png";

export default function Auth() {
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedProfilePic, setSelectedProfilePic] = useState(""); // New state for selected image
  const navigate = useNavigate();
  const profileImages = [
    alien,
    alien1,
    diablo,
    black,
    clown,
    ironman,
    monster,
    spiderman,
    skull,
  ];

  const initialData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePic: "",
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
    profileImage: {
      width: "60px",
      height: "60px",
      cursor: "pointer",
      transition: "transform 0.1s ease-in-out",
    },
    selectedImage: {
      border: "2px solid blue", // Blue border for selected image
    },
  };

  const handleProfilePicClick = (image) => {
    setFormData({ ...formData, profilePic: image });
    setSelectedProfilePic(image); // Set the selected image
  };

  return (
    <Container
      style={{ display: "flex", justifyContent: "center" }}
      component="main"
      maxWidth="xs"
    >
      <CssBaseline />
      <div className="dark:bg-white dark:px-5 rounded-md w-full sm:min-w-[800px] ">
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
          <Typography className="dark:text-white" component="h1" variant="h5">
            {isSignUp ? "Sign up" : "Log in"}
          </Typography>

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
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Divider style={{ width: "40%", margin: "0 10px" }} />
            <p>or</p>
            <Divider style={{ width: "40%", margin: "0 10px" }} />
          </Box>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {isSignUp && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
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
              {isSignUp && (
                <Grid
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    marginTop: "10px",
                    gap: "20px",
                  }}
                  item
                  xs={12}
                >
                  <p className="text-center text-gray-600">
                    Choose your Profile Picture
                  </p>
                  <div className="flex gap-4 justify-center flex-wrap">
                    {profileImages.map((image) => (
                      <img
                        onClick={() => handleProfilePicClick(image)}
                        key={image}
                        className={`w-[60px] h-[60px] ${
                          selectedProfilePic === image ? "scale-110 " : ""
                        } hover:scale-110 cursor-pointer transition-transform duration-100 ease-in-out`}
                        src={image}
                        alt=""
                      />
                    ))}
                  </div>
                </Grid>
              )}
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
              <Grid style={{ marginBottom: "10px" }} item>
                <Link
                  className="hover:cursor-pointer mb-5"
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
      </div>
    </Container>
  );
}
