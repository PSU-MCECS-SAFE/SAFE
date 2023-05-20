//This import isn't required in newer versions of react in every file, but
//is a fail safe for older versions. Best to do it anyways!
import { Box } from '@mui/material';
import React from 'react';
import BannerBar from './Components/bannerBar';
import HeaderText from './Components/headerText';
import SubmitForm from './Components/submitForm';

/* Will return the whole SAFE UI page
 */

function SafeUI() {
  return (
    <Box sx={{ backgroundColor: '#faf7e1', width: 'auto', height: 'auto' }}>
      <BannerBar />
      <HeaderText />
      <SubmitForm />
    </Box>
  );
}

export default SafeUI;
