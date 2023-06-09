import { CardMedia, Typography, Container } from '@mui/material';

function Welcome() {
  return (
    <Container maxWidth="sm" style={{ textAlign: "center", paddingTop: "30px" }}>
      <Typography variant="h3" style={{ fontWeight: "bold", fontFamily: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif", marginBottom: "20px" }}>
        Welcome to Teloy Restaurant
      </Typography>

      <CardMedia
        component="img"
        height="375"
        image="/images/restraunt_logo.jpeg"
        alt="Restaurant Logo Photo"
        style={{ borderRadius: "50%", margin: "40px auto" }}
      />

      <Typography style={{ fontSize: "20px", fontFamily: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif" }}>
        To view our menu, just tap the "Menu" button in the upper right corner!
      </Typography>
    </Container>
  );
}

export default Welcome;
