import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, CardActions, CardMedia, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import { API_URL } from '../config';

function MainPage({ categories }) {
  const navigate = useNavigate();
  const params = useParams();
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    if (params.id === undefined) {
      fetchDishes();
    } else {
      filterByCategory(params.id);
    }
  }, [params.id]);

  function fetchDishes() {
    axios.get(`${API_URL}/dishes`).then((response) => {
      const orderedDishes = response.data.sort((a, b) => {
        if (a.category_id < b.category_id) return -1;
        if (a.category_id > b.category_id) return 1;
        return 0;
      });
      setDishes(orderedDishes);
    });
  }


  function filterByCategory(category_id) {
    axios.get(`${API_URL}categories/${category_id}`).then((response) => {
      setDishes(response.data.dishes);
      params.category_name = response.data.name
    });
  }

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  }

  return (
    <div>
      <br/>
      <Typography variant="h5">{params.category_name}</Typography>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <List component="nav">
            {categories.map((category) => (
              <ListItem
                button
                key={category.id}
                selected={params.id === category.id}
                onClick={() => navigate(`/category/${category.id}`)}
              >
                <ListItemText primary={category.name} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={3}>
            {dishes.map((dish) => (
              <Grid item xs={4} key={dish.id}>
                <Card style={{ height: '100%' }}>
                  <CardMedia component="img" height="200" image={`${process.env.PUBLIC_URL}/images/${dish.image}`} alt="Dish Photo" />
                  <div style={{ padding: '16px' }}>
                    <Typography variant="h5" component="div">
                      {dish.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="div" style={{ marginTop: '8px' }}>
                      {truncateText(dish.description, 100)}
                    </Typography>
                    <Typography variant="h6" color="textSecondary" component="div" style={{ marginTop: '8px' }}>
                      Price: ₪{dish.price}
                    </Typography>
                  </div>
                  <CardActions>
                    <Button component={Link} to={'/show/' + dish.id}>
                      Read More...
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default MainPage;
