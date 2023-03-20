import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import bgImg from '../assets/img/backgrounds/diseno-web-404-CSS.webp'
import { NavLink } from "react-router-dom";
import { purple } from "@mui/material/colors";


const Errorpage = () => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid xs={6}>
              <Typography variant="h1">404</Typography>
              <Typography variant="h6">
                The page you’re looking for doesn’t exist.
              </Typography>
              <Button variant="contained" style={{backgroundColor: '#696cff'}}>
                <NavLink to="/" className="text-white">
                  Back Home
                </NavLink>
              </Button>
            </Grid>
            <Grid xs={6}>
              <img
                //   src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
                src={bgImg}
                alt=""
                width={500}
                height={250}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Errorpage;
