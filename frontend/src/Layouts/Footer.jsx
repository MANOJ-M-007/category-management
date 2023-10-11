import React from "react";
import { Grid, Typography, Divider } from "@mui/material";

const Footer = () => {
  return (
    <>
      <Grid
        container
        sx={{
          bgcolor: "#92A6C8",
          padding: 3,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 6,
        }}
      >
        <Grid item xs={12} md={2} lg={2} textAlign="center">
          <Typography fontWeight={500} lineHeight={2.3} color="white">
            About Us
          </Typography>
          <Typography fontWeight={500} lineHeight={2.3} color="white">
            Contact Us
          </Typography>
        </Grid>
        <Divider orientation="vertical" flexItem sx={{ marginX: 2 }} />
      </Grid>
      <Grid
        container
        sx={{
          bgcolor: "#6F8AB7",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
          display: { xs: "flex", md: "flex" },
        }}
      >
        <Typography variant="body2" color="white">
          {"Copyright © "}
          CATEGORY {new Date().getFullYear()}
        </Typography>
      </Grid>
    </>
  );
};

export default Footer;
