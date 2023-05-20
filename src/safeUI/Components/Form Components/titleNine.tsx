import { Link, Typography, Grid } from '@mui/material';
import React from 'react';

/* Warning telling users that this site is not to report Title IX violations.
 * Provides references for submitting appropriate reports that fall outside of
 * what SAFE is used for.
 */

function TitleNine() {
  return (
    <Grid item xs={8}>
      <div>
        <Typography variant="subtitle2" m={1} align="center">
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
