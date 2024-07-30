// AboutUs.js

import React from "react";
import { Container, Typography, Box } from "@mui/material";

const AboutUs = () => {
  return (
    <div className="dark:text-white p-4">
      <Box>
        <Typography variant="h3" gutterBottom>
          About Us
        </Typography>
        <Typography variant="h6" gutterBottom>
          Welcome to RedThread!
        </Typography>
        <Typography variant="body1" paragraph>
          At RedThread, we're passionate about bringing together fans of anime,
          Kdrama, and Cdrama from all over the world. Our platform is designed
          to create a vibrant, engaging, and respectful community where
          enthusiasts can share their thoughts, opinions, and creativity.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph>
          Our mission is to provide a safe and welcoming space for fans to
          connect, discuss, and celebrate their favorite shows and characters.
          We believe in the power of community and aim to foster meaningful
          interactions and friendships through our platform.
        </Typography>
        <Typography variant="h6" gutterBottom>
          What We Offer
        </Typography>
        <Typography variant="body1" paragraph>
          - <strong>Community and Forums:</strong> Engage in discussions with
          like-minded fans and share your thoughts on the latest episodes,
          theories, and news.
        </Typography>
        <Typography variant="body1" paragraph>
          - <strong>Posts and Recommendations:</strong> Create posts, share your
          favorite moments, and get personalized recommendations based on your
          interests.
        </Typography>
        <Typography variant="body1" paragraph>
          - <strong>Comments and Interactions:</strong> Comment on posts,
          interact with other users, and build a network of friends who share
          your passion.
        </Typography>
        <Typography variant="body1" paragraph>
          - <strong>Upcoming Features:</strong> Stay tuned for new features like
          communities, user profiles, and threaded comments to enhance your
          experience.
        </Typography>
        <Typography variant="body1" paragraph>
          Join us at RedThread and become a part of a community that celebrates
          the best of anime, Kdrama, and Cdrama!
        </Typography>
      </Box>
    </div>
  );
};

export default AboutUs;
