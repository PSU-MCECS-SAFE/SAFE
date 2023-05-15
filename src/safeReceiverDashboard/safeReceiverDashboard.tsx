import { Box } from '@mui/material';
import React from 'react';
import BannerNavBar from './Components/bannerNavBar';
import MessageBox from './Components/messageBox';

function ReceiverDashboard() {
  return (
    <Box sx={{ backgroundColor: '#faf7e1', width: 'auto', height: 'auto' }}>
      <BannerNavBar />
      <MessageBox></MessageBox>
    </Box>
  );
}

export default ReceiverDashboard;
