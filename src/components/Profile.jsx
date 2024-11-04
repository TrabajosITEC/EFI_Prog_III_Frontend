import { useEffect, useState } from 'react';
import { Typography, Grid2 as Grid, TextField } from '@mui/material';
import { authService } from "../services/token";
import { grey, purple } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Button } from 'primereact/button';
import profileImage from '../img/profile.png';
const API = import.meta.env.VITE_API;

const Profile = () => {
  const [user, setUser] = useState({
    name: authService.getUserName(),
    email: authService.getUserEmail(),
    role: authService.getUserRole()
  });

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user]);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = async () => {
    const token = authService.getToken();
    const userId = authService.getUserId();
    try {
      const response = await fetch(`${API}/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({ name, email })
      });
      console.log('🚀 ~ handleSave ~ response:', response);

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

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        width: '600px',
        padding: '2rem',
        margin: '0 auto',
        borderRadius: '16px',
        border: `2px solid ${purple[800]}`,
        backgroundColor: grey[800]
      }}
    >
      <Grid item xs={12} style={{ marginRight: '2rem' }}>
        <img
          src={profileImage}
          style={{
            width: '100%',
            height: '100%',
            maxWidth: '200px',
            maxHeight: '200px',
            objectFit: 'contain'
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <Typography variant="h6" className='font-bold' style={{ marginTop: '1rem', color: purple[600] }}>
          Username:
        </Typography>
        <Typography variant="body1" style={{ color: 'white', marginBottom: '1rem' }}>
          {user.name}
        </Typography>

        <Typography variant="h6" className='font-bold' style={{ marginTop: '1rem', color: purple[600] }}>
          Email:
        </Typography>
        <Typography variant="body1" style={{ color: 'white', marginBottom: '1rem' }}>
          {user.email}
        </Typography>

        {user.role === 'admin' && (

          <Typography variant="body1" style={{ color: 'red', marginBottom: '1rem' }}>
            {'Usuario Administrador'}
          </Typography>

        )}

        {isEditing ? (
          <>
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
            <TextField
              value={email}
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
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
          </>
        ) : <></>}

        <Button
          label={isEditing ? "Save" : "Edit"}
          icon={isEditing ? <SaveIcon /> : <EditIcon />}
          onClick={isEditing ? handleSave : handleEditToggle}
          className='bg-purple-800 mt-2 border-none'
        />
      </Grid>
    </Grid >
  );
};

export default Profile;
