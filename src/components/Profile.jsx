import { useEffect, useState } from 'react';
import { Typography, Grid2 as Grid, TextField } from '@mui/material';
import { authService } from "../services/token";
import { purple } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Button } from 'primereact/button';
import profileImage from '../assets/person-circle.svg';

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
        fontFamily: 'Montserrat, sans-serif',
        width: '600px',
        padding: '2rem',
        margin: '200px auto',
        borderRadius: '16px',
        border: `2px solid ${purple[800]}`,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
      }}
    >
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className='me-3'>
          <img
            src={profileImage}
            style={{
              margin: '40px',
              objectFit: 'contain',
              width: '100px',
              height: '100px',
              filter: 'invert(1)'
            }}
          />
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <Typography variant="h6" className='font-bold' style={{ marginTop: '1rem', color: purple[600], fontFamily: 'Montserrat, sans-serif' }}>
          Username:
        </Typography>
        <Typography variant="body1" style={{ color: 'white', marginBottom: '1rem', fontFamily: 'Montserrat, sans-serif' }}>
          <p className='mt-2'>{user.name}</p>
        </Typography>

        <Typography variant="h6" className='font-bold' style={{ marginTop: '1rem', color: purple[600], fontFamily: 'Montserrat, sans-serif' }}>
          Email:
        </Typography>
        <Typography variant="body1" style={{ color: 'white', marginBottom: '1rem', fontFamily: 'Montserrat, sans-serif' }}>
          <p className='mt-2'>{user.email}</p>
        </Typography>

        {user.role === 'admin' && (
          <Typography variant="body1" style={{ color: 'red', marginTop: '2rem', marginBottom: '1rem', fontFamily: 'Montserrat, sans-serif' }}>
            {'Usuario Administrador'}
          </Typography>
        )}

        {isEditing && (
          <> 
            <TextField
              value={name}
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
              style={{ borderRadius: '16px', marginTop: '1rem', fontFamily: 'Montserrat, sans-serif' }}
              sx={{
                width: '100%',
                '& .MuiInputBase-input': {
                  color: 'white',
                  fontFamily: 'Montserrat, sans-serif',
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
              style={{ borderRadius: '16px', marginTop: '1rem', fontFamily: 'Montserrat, sans-serif' }}
              sx={{
                width: '100%',
                '& .MuiInputBase-input': {
                  color: 'white',
                  fontFamily: 'Montserrat, sans-serif',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: purple[600],
                },
              }}
            />
          </>
        )}

        <Button
          label={isEditing ? "Save" : "Edit"}
          icon={isEditing ? <SaveIcon /> : <EditIcon />}
          onClick={isEditing ? handleSave : handleEditToggle}
          className='p-button-outlined mt-4 w-100'
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        />
      </Grid>
    </Grid>
  );
};

export default Profile;
