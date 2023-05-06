import { Box } from '@mui/material';
import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import BannerNavBar from './Components/bannerNavBar';

function ReceiverDashboard() {
  return (
    <Box sx={{ backgroundColor: '#faf7e1', width: 'auto', height: 'auto' }}>
      <BannerNavBar />
    </Box>
  );
}

export default ReceiverDashboard;
