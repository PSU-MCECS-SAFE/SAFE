import {
  Box,
  Grid,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';

function ReceiverDashboard() {
  const [anchorE1, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ backgroundColor: '#faf7e1', width: 'auto', height: 'auto' }}>
      <Box
        sx={{
          backgroundColor: '#6a7f10',
          height: '38px',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '25px',
          paddingRight: '25px',
          justifyContent: 'space-between',
        }}
      >
        <img
          src="/PSU_logo_accent_transparent.png"
          alt="Logo"
          width="135"
          height="53"
        />
        <Typography
          sx={{
            color: 'black',
            marginRight: 'auto',
            marginLeft: 'auto',
            fontSize: '24px',
          }}
        >
          Safe Faculty Dashboard
        </Typography>
        <IconButton onClick={handleClick}>
          <PersonIcon />
        </IconButton>
        <Menu
          anchorEl={anchorE1}
          open={Boolean(anchorE1)}
          onClose={handleClose}
        >
          <MenuItem // Logout menu item
            onClick={() => {
              handleClose();
              //Place logout function here
            }}
          >
            {' '}
            Logout{' '}
          </MenuItem>
          <MenuItem onClick={handleClose}> Action2 </MenuItem>
          <MenuItem onClick={handleClose}> Action3 </MenuItem>
          {/* What should the other actions be? Do we need them? */}
        </Menu>
      </Box>
    </Box>
  );
}

export default ReceiverDashboard;
