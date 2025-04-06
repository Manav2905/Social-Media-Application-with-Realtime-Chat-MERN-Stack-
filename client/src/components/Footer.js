import { Card, Grid, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Copyright from "./Copyright";

const Footer = () => {
  return (
    <Box pb={3}>
      <Card>
        <Typography variant="subtitle1">
          Connect, share, and explore—stay close to friends and the world around you!⭐
        </Typography>
      </Card>
    </Box>
  );
};

export default Footer;
