import { useState, useEffect } from 'react';
import { Button, TextField, Typography, Box, Paper } from '@mui/material';
import { Rating } from '@mui/material';
import { authService } from "../services/token";
import { useParams } from 'react-router-dom';
import { grey, purple } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API;

const Reviews = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const isAuthenticated = authService.isAuthenticated();
  const userRole = authService.getUserRole();
  const userId = authService.getUserId();

  const fetchReviews = async () => {
    const token = authService.getToken();

    try {
      const response = await fetch(`${API}/reviews/games/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
      });

      const data = await response.json();

      if (response.status === 404) {
        console.log(data.message);
        setReviews([]);
      } else if (!response.ok) {
        if (response.status === 401) {
          authService.removeToken();
        }
        throw new Error(data.message || JSON.stringify(data));
      } else {
        setReviews(data.reviews);
      }
    } catch (error) {
      console.error("Error al cargar reviews:", error.message || JSON.stringify(error));
    }
  };

  useEffect(() => {
    if (id) {
      fetchReviews();
    }
  }, [id]);

  const handleSubmitReview = async () => {
    const token = authService.getToken();
    try {
      const response = await fetch(`${API}/reviews`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({
          game_id: id,
          rating,
          comment,
          user_id: userId,
        }),
      });

      if (response.ok) {
        setRating(0);
        setComment('');
        await fetchReviews();
      } else {
        const errorData = await response.json();
        console.error("Failed to submit review:", errorData);
      }

      navigate(`/game/${id}`);
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    const token = authService.getToken();
    try {
      await fetch(`${API}/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
      });
      setReviews(reviews.filter((review) => review.id !== reviewId));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <Box className='mt-5' sx={{ maxWidth: '600px', width: '100%', margin: '0 auto' }}>
      {reviews.map((review) => (
        <Paper key={review.id} elevation={3} sx={{ padding: 2, marginBottom: 2, backgroundColor: grey[800], border: `2px solid ${purple[800]}` }}>
          <Typography variant="body1" sx={{ color: 'white' }}>
            <strong>{review.User ? review.User.userName : 'Anonymous'}</strong>
          </Typography>
          <Rating value={review.rating} readOnly />
          <Typography variant="body2" className='font-italic' sx={{ color: 'white' }}>{review.comment}</Typography>
          {userRole === 'admin' && (
            <Button
              variant="contained"
              color="error"
              className='mt-2'
              onClick={() => handleDeleteReview(review.id)}
            >
              Delete
            </Button>
          )}
        </Paper>
      ))}

      {isAuthenticated && (
        <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
          <Typography variant="h6">Add a Review</Typography>
          <Rating
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            multiline
            rows={3}
            variant="outlined"
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add your comment here"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitReview}
            sx={{ marginTop: 2 }}
          >
            Submit Review
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default Reviews;
