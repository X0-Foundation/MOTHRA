// next
// import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { Box, Grid, Link, Divider, Container, Typography } from '@mui/material';
// routes
// import { PATH_PAGE } from '../../routes/paths';
// _mock
// import { _socials } from '../../_mock/arrays';
// components
// import Logo from '../../components/logo';
// import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

// const LINKS = [
//   {
//     headline: 'Minimal',
//     children: [
//       { name: 'About us', href: PATH_PAGE.about },
//       { name: 'Contact us', href: PATH_PAGE.contact },
//       { name: 'FAQs', href: PATH_PAGE.faqs },
//     ],
//   },
//   {
//     headline: 'Legal',
//     children: [
//       { name: 'Terms and Condition', href: '#' },
//       { name: 'Privacy Policy', href: '#' },
//     ],
//   },
//   {
//     headline: 'Contact',
//     children: [
//       { name: 'support@minimals.cc', href: '#' },
//       { name: 'Los Angeles, 359  Hidden Valley Road', href: '#' },
//     ],
//   },
// ];

// ----------------------------------------------------------------------

export default function Footer() {
  const { pathname } = useRouter();

  const isHome = pathname === '/';

  const simpleFooter = (
    <Box
      component="footer"
      sx={{
        py: 5,
        textAlign: 'center',
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Container>
        {/* <Logo sx={{ mb: 1, mx: 'auto' }} /> */}

        <Typography variant="caption" component="div">
          © All rights reserved
          <br /> by &nbsp;
          <Link href="https://google.com/"> XFoundation </Link>
        </Typography>
      </Container>
    </Box>
  );

  const mainFooter = (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Divider />

      <Container sx={{ pt: 10 }}>
        <Grid
          container
          justifyContent={{
            xs: 'center',
            md: 'space-between',
          }}
          sx={{
            textAlign: {
              xs: 'center',
              md: 'center',
            },
          }}
        >
          {/* <Grid item xs={12} sx={{ mb: 1 }}>
            <Logo sx={{ mx: { xs: 'auto', md: 'inherit' } }} />
          </Grid> */}
        </Grid>

        <Typography
          variant="caption"
          component="div"
          sx={{
            mt: 2,
            pb: 5,
            textAlign: { xs: 'center', md: 'center' },
          }}
        >
          © 2023
        </Typography>
      </Container>
    </Box>
  );

  return isHome ? simpleFooter : mainFooter;
}
