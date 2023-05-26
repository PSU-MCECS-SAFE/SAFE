//This import isn't required in newer versions of react in every file, but
//is a fail safe for older versions. Best to do it anyways!'
import React from 'react';
import BannerBar from './Components/bannerBar';
import HeaderText from './Components/headerText';
import SubmitForm from './Components/submitForm';

/* SAFE UI application is rendered here. Individual components
 * are broken up and referenced from the Component folder to
 * improve system readability and maintainability.
 */

import { Box } from '@mui/material';

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
