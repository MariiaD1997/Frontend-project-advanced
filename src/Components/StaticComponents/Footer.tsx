import Box from "@mui/material/Box";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import Container from "@mui/material/Container";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "20vh",
      }}
    >
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          height: "5vh",
          textAlign: "center",
          backgroundColor: "#496DDB",
        }}
      >
        <Container maxWidth="lg">
          <InstagramIcon />
          <FacebookIcon />
          <TwitterIcon />
          <EmailIcon />
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
