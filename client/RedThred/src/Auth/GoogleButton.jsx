import React from "react";
import { Button, Divider, Box } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const GoogleButton = () => {
  const styles = {
    buttonContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "20px 0",
    },
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
    icon: {
      marginRight: "10px",
    },
    text: {
      fontSize: "16px",
      fontWeight: "500",
    },

    divider: {
      width: "40%",
      margin: "0 10px",
    },
  };

  return (
    <Box style={{ width: "100%" }}>
      <Box style={styles.buttonContainer}>
        <Button style={styles.button}>
          <GoogleIcon style={styles.icon} />
          <span style={styles.text}>Continue with Google</span>
        </Button>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Divider style={styles.divider} />
        <p>or</p>
        <Divider style={styles.divider} />
      </Box>
    </Box>
  );
};

export default GoogleButton;
