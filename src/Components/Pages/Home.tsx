
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Footer from "../StaticComponents/Footer";

const Home = () => {
  return (
    <Box>
      <Paper
        sx={{
          position: "relative",
          backgroundColor: "grey.800",
          color: "#fff",
          mb: 4,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: `url(https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600)`,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,.3)",
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: "relative",
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                We have everything you need
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                Discover the latest range of close and accessories with BE
                YOURSELF. Shop for a range of different styles, discover your
                own and finish your shopping with smile!
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <CardActionArea component="a" href="#">
            <Card sx={{ display: "flex" }}>
              <CardContent sx={{ flex: 1 }}>
                <Typography component="h2" variant="h5">
                  Find what you love!
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  21 Dec
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  Discover the latest fashion trends with BE YOURSELF. Shop the
                  new collection of clothing, footwear, accessories, beauty
                  products and more. Order today from BE YOURSELF.
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                sx={{ width: 160, display: { xs: "none", sm: "block" } }}
                image={
                  "https://images.pexels.com/photos/975250/pexels-photo-975250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
              />
            </Card>
          </CardActionArea>
        </Grid>
        <Grid item xs={12} md={6}>
          <CardActionArea component="a" href="#">
            <Card sx={{ display: "flex" }}>
              <CardContent sx={{ flex: 1 }}>
                <Typography component="h2" variant="h5">
                  Explore your tastes!
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  15 Dec
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  Shop the biggest range of womens and mens clothing for the
                  latest fashion trends you can totally do your thing in, with
                  100s of new styles landing every day!
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                sx={{ width: 160, display: { xs: "none", sm: "block" } }}
                image={
                  "https://images.pexels.com/photos/318236/pexels-photo-318236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
              />
            </Card>
          </CardActionArea>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 3 }}>
        <Link
          to={"/products"}
          style={{
            textDecoration: "none",
            fontSize: "6vh",
          }}
        >
          Start Shopping!
        </Link>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
