import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Grid2 as Grid,
  TextField
} from '@mui/material';
import { authService } from "../services/token";
import { grey, purple } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Button } from 'primereact/button';

const API = import.meta.env.VITE_API;

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const token = authService.getToken();
      try {
        const response = await fetch(`${API}/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token && { 'Authorization': `Bearer ${token}` })
          },
        });

        if (!response.ok) {
          authService.removeToken();
          const data = await response.json();
          throw new Error(data.message || JSON.stringify(data));
        }

        const data = await response.json();
        setUser(data);
        setName(data.name); // Assume the user object has a name field

      } catch (error) {
        console.error("Error fetching user:", error.message || JSON.stringify(error));
      }
    };

    fetchUser();
  }, [id]);

  console.log('🚀 ~ Profile ~ user:', user);
  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = async () => {
    const token = authService.getToken();
    try {
      const response = await fetch(`${API}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({ name }) // Send updated name
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || JSON.stringify(data));
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false);

    } catch (error) {
      console.error("Error updating user:", error.message || JSON.stringify(error));
    }
  };

  if (!user) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        width: '800px',
        padding: '2rem',
        margin: '0 auto',
        borderRadius: '16px',
        border: `2px solid ${purple[800]}`,
        backgroundColor: grey[800]
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h3" color="white" className='font-bold underline'>{user.name}</Typography>

        <Typography variant="h6" className='font-bold' style={{ marginTop: '1rem', color: purple[600] }}>
          Email:
        </Typography>
        <Typography variant="body1" style={{ color: 'white', marginBottom: '1rem' }}>
          {user.email} {/* Assume the user object has an email field */}
        </Typography>

        <Typography variant="h6" className='font-bold' style={{ marginTop: '1rem', color: purple[600] }}>
          Role:
        </Typography>
        <Typography variant="body1" style={{ color: 'white', marginBottom: '1rem' }}>
          {user.role} {/* Assume the user object has a role field */}
        </Typography>

        {isEditing ? (
          <TextField
            value={name}
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
            style={{ borderRadius: '16px', marginTop: '1rem' }}
            sx={{
              width: '300px',
              '& .MuiInputBase-input': {
                color: 'white',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: purple[600],
              },
            }}
          />
        ) : (
          <Typography variant="body1" style={{ color: 'white', marginBottom: '1rem' }}>
            {user.name} {/* Display name */}
          </Typography>
        )}

        <Button
          label={isEditing ? "Save" : "Edit"}
          icon={isEditing ? <SaveIcon /> : <EditIcon />}
          onClick={isEditing ? handleSave : handleEditToggle}
          className='bg-purple-800 mt-2 border-none'
        />
      </Grid>
    </Grid>
  );
};

export default Profile;
