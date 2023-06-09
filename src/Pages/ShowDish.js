import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardMedia, Typography } from '@mui/material';
import { API_URL } from '../config';

function ShowDish() {
  const params = useParams();
  const [singleDish, setSingleDish] = useState({});
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    getDish(params.id);
  }, []);

  function getDish(id) {
    axios.get(`${API_URL}/dishes/${id}`).then((response) => {
      setSingleDish(response.data);
    });
  }

  const handleImageLoad = (event) => {
    const { naturalWidth, naturalHeight } = event.target;
    setImageWidth(naturalWidth);
    setImageHeight(naturalHeight);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <Card style={{ height: '50%',width: '45%' }}>
        <div
          style={{
            maxWidth: '100%',
            maxHeight: '50%',
            width: '100%',
            paddingBottom: `${(imageHeight / imageWidth) * 100}%`,
            position: 'relative',
          }}
        >
          <CardMedia
            component="img"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
            image={`${process.env.PUBLIC_URL}/images/${singleDish.image}`}
            alt="Dish Photo"
            onLoad={handleImageLoad}
          />
        </div>
        <div style={{ padding: '16px' }}>
          <Typography variant="h6" component="div">
            {singleDish.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="div" style={{ marginTop: '8px' }}>
            {singleDish.description}
          </Typography>
          <Typography variant="h6" color="textSecondary" component="div" style={{ marginTop: '8px' }}>
            Price: ₪{singleDish.price}
          </Typography>
        </div>
      </Card>
    </div>
  );
}

export default ShowDish;
