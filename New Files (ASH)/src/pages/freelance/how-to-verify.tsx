import Head from 'next/head';
import { StyledRoot } from '@/layouts/login/styles';
import { Box } from '@mui/material';
import { Container } from '@mui/system';
import palette from '@/theme/palette';
import MainLayout from '../../layouts/main';
import LayoutXAgency from '../../layouts/main/freelance';

const XAgencyHowToVerify = () => (
    <StyledRoot>
      <Container>
        <Box
          sx={{
            color: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.400'),
          }}
        >
          <h2 className='agency-title' style={{color: `${palette('dark').primary.purple}`}}>How To Verify</h2>
        </Box>
        <Box
          sx={{ py: 2, mb: 3}}
          gridTemplateColumns={{ md: 'repeat(2, 1fr)', sm: 'repeat(1, 1fr)' }}
        >
          <iframe src="https://docs.tgr.finance/beginner-tutorials/how-to-verify-jobs-on-the-agency" title='how-to-verify' width="100%" height="500px"/>
        </Box>
      </Container>
    </StyledRoot>
  )

XAgencyHowToVerify.getLayout = (page: React.ReactElement) => (
  <MainLayout>
    <Head>
      <title>How to verify | Agency</title>
    </Head>
    <LayoutXAgency> {page} </LayoutXAgency>
  </MainLayout>
);

export default XAgencyHowToVerify;
