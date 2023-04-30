import {
    Box,
    Grid,
    Link,
    Snackbar,
    TextField,
    Typography,
  } from '@mui/material';
  import React from 'react';
  import { useCallback, useEffect, useState } from 'react';

  function ReceiverDashboard() {
    return (
      <Box sx={{ backgroundColor: '#faf7e1', width: 'auto', height: 'auto' }}>
        <Box
          sx={{
            backgroundColor: '#6a7f10',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '25px',
          }}
        >
          <img
            src="/PSU_logo_accent_transparent.png"
            alt="Logo"
            width="135"
            height="53"
          />
        </Box>
  
        
      </Box>
    );
  }
  
  export default ReceiverDashboard;
  