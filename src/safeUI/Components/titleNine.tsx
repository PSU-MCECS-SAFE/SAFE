import { Link, Typography, Box, Grid } from '@mui/material';
import React from 'react';

function TitleNine() {
  return (
    <Grid item xs={8}>
    <div>
      <Typography variant="subtitle2" mt={4} mb={3} align="center">
        This site should not be used to report{' '}
        <Link href="https://www.pdx.edu/diversity/title-ix">Title IX</Link>{' '}
        violations, including{' '}
        <Link href="https://www.pdx.edu/sexual-assault/faculty-staff-reporting-obligations">
          sexual misconduct
        </Link>{' '}
        or{' '}
        <Link href="https://www.pdx.edu/general-counsel/mandatory-child-abuse-reporting">
          child abuse
        </Link>
        ; please use the respective links for further information. Please note
        also that the{' '}
        <Link href="https://www.pdx.edu/womens-resource-center/">
          Women’s Resource Center
        </Link>{' '}
        also provides a confidential reporting option for the PSU community.
      </Typography>
    </div>
    </Grid>
  );
}

export default TitleNine;
