import { Container, Typography, Card, CardContent, Button, CardMedia, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { recipes as recipesData } from "../data/recipes"; 

const Recipes = () => {
  return (
    <Container className="container" sx={{ mt: 5, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Recipes
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {recipesData.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <Card className="recipe-card" sx={{ maxWidth: 400, width: "100%", mx: "auto", boxShadow: 3, display: "flex", flexDirection: "column" }}>
              <CardMedia
                component="img"
                height="200"
                image={recipe.image}
                alt={recipe.name}
                sx={{ objectFit: "cover", backgroundColor: "#fff" }}
              />
              <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant="h6" gutterBottom>
                  {recipe.name}
                </Typography>
                <Button component={Link} to={`/recipe/${recipe.id}`} variant="contained" color="primary">
                  View Recipe
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Recipes;
