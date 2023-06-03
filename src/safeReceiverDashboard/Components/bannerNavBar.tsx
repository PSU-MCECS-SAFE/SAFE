import React from 'react';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';

/* Component for logo banner bar
 * Similar to bannerBar in safeUI.
 * 'Allows' a user to login and out.
 */

function BannerNavBar() {
  const [open, setOpen] = useState(false);
  const targetRef = useRef(null);
  const [signIn, setSignIn] = useState('Logout');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
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
        src="./PSU_logo_accent_transparent.png"
        alt="Logo"
        width="135"
        height="53"
      />
      <Typography
        sx={{
          color: 'white',
          marginRight: 'auto',
          marginLeft: 'auto',
          fontSize: '24px',
        }}
      >
        SAFE Faculty Dashboard
      </Typography>
      <IconButton id="logout-button" onClick={handleClick} ref={targetRef}>
        <PersonIcon />
      </IconButton>
      <Menu
        id="logout-menu"
        open={open}
        onClose={handleClose}
        anchorEl={targetRef.current}
      >
        <MenuItem // Logout menu item
          onClick={() => {
            handleClose();
            //Place logout function here
            if (signIn === 'Logout') {
              setSignIn('Login');
            } else {
              setSignIn('Logout');
            }
          }}
        >
          {signIn}
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default BannerNavBar;
