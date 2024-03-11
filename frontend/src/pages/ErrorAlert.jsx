import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const ErrorAlert = ({ message, open, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Center the Snackbar horizontally
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', // Center the Snackbar vertically and horizontally
        marginTop: '50px' // Add some top margin for better visibility
      }}
    >
      <Alert
        onClose={onClose}
        severity="error"
        sx={{
          width: '40vw',
          height: '20vh', // Set the width of the Alert
          textAlign: 'center',
          backgroundColor: '#f8d7da', // Red background color
          color: '#721c24', // Dark red text color
          fontSize: '1.2rem', // Larger font size
          borderRadius: '12px', // Rounded corners
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Box shadow
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '20px' // Add some padding for better readability
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorAlert;
