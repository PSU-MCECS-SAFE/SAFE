import { Box } from '@mui/material';
import React from 'react';

/* Banner bar located at the top of the page
 * contains psu logo
 */

function BannerBar() {
  return (
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
        src="./PSU_logo_accent_transparent.png"
        alt="Logo"
        width="135"
        height="53"
      />
    </Box>
  );
}

export default BannerBar;
