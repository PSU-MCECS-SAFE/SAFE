import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';

function BannerNavBar() {
  const [open, setOpen] = useState(false);
  const targetRef = useRef(null);

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
        src="/PSU_logo_accent_transparent.png"
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
        Safe Faculty Dashboard
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
  );
}

export default BannerNavBar;
