import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

function MessageControl() {
  return (
    <AppBar
      position="static"
      sx={{ marginTop: '10px', backgroundColor: '#fff' }}
    >
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="success"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="black" component="div">
          Feedback
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default MessageControl;
