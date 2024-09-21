// @mui
import { useTheme } from '@mui/material/styles';
import { Box, AppBar, Toolbar, Container, BoxProps } from '@mui/material';
// hooks
import ConnectWallet from '@/components/connect-wallet';
import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';
// utils
import { bgBlur } from '../../utils/cssStyles';
// config
import { HEADER } from '../../config-global';
// components
import Logo from '../../components/logo';
import NavMobile from './nav/mobile';
import navConfig from './nav/config-navigation';
import { NavSectionHorizontal } from '../../components/nav-section';

// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'md');

  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);

  return (
    <AppBar sx={{ boxShadow: 0, p: 0 }}>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_MAIN_DESKTOP,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          backgroundColor: theme.palette.background.default,
          ...(isOffset && {
            ...bgBlur({ color: theme.palette.background.default }),
            height: {
              md: HEADER.H_MAIN_DESKTOP - 10,
            },
          }),
        }}
      >
        <Container
          sx={{
            height: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {!isDesktop && <NavMobile isOffset={isOffset} data={navConfig} />}
          <Logo />
          {isDesktop && <NavSectionHorizontal data={NAV_ITEMS} />}
          <ConnectWallet />
        </Container>
      </Toolbar>

      {isOffset && <Shadow />}
    </AppBar>
  );
}

// ----------------------------------------------------------------------

function Shadow({ sx, ...other }: BoxProps) {
  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 24,
        zIndex: -1,
        m: 'auto',
        borderRadius: '50%',
        position: 'absolute',
        width: `calc(100% - 48px)`,
        boxShadow: (theme) => theme.customShadows.z8,
        ...sx,
      }}
      {...other}
    />
  );
}

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_TRADE = '/trade';
const ROOTS_AGENCY = '/freelance';
const ROOTS_NFTS = '/nfts';
const ROOTS_LEARN = '/learn';

const NAV_ITEMS = [
  {
    subheader: 'XFoundation',
    items: [
      {
        title: 'Trade',
        path: '/immediate',
        children: [
          { title: 'Immediate', path: path(ROOTS_TRADE, '/immediate') },
          { title: 'Advanced', path: path(ROOTS_TRADE, '/advanced') },
          { title: 'Trending', path: path(ROOTS_TRADE, '/trending') },
          { title: 'Experimental', path: path(ROOTS_TRADE, '/experimental') },
        ],
      },
      {
        title: 'Freelance',
        path: '/freelance/jobs',
        children: [
          { title: 'Jobs', path: path(ROOTS_AGENCY, '/jobs') },
          { title: 'Verify Jobs', path: path(ROOTS_AGENCY, '/verification') },
          {
            title: 'How To Verify',
            path: path(ROOTS_AGENCY, '/how-to-verify'),
          },
          { title: 'Vote', path: path(ROOTS_AGENCY, '/vote') },
          { title: 'Profile', path: path(ROOTS_AGENCY, '/profile') },
        ],
      },
      {
        title: 'NFTs',
        path: '/nfts/home',
        children: [
          { title: 'Home', path: path(ROOTS_NFTS, '/home') },
          { title: 'Explore', path: path(ROOTS_LEARN, '/explore') },
          { title: 'Mint', path: path(ROOTS_NFTS, '/mint') },
          { title: 'Import', path: path(ROOTS_NFTS, '/import') },
          { title: 'Profile', path: path(ROOTS_NFTS, '/profile') },
        ],
      },
      {
        title: 'Learn',
        path: '/learn',
        children: [
          { title: 'How TGR Works', path: path(ROOTS_LEARN, '/how-tgr-works') },
          {
            title: 'How To Get HTZ',
            path: path(ROOTS_LEARN, '/how-to-get-htz'),
          },
          {
            title: 'HOw To Post Jobs',
            path: path(ROOTS_LEARN, '/how-to-post-jobs'),
          },
          {
            title: 'How To Earn HTZ',
            path: path(ROOTS_LEARN, '/how-to-earn-htz'),
          },
          { title: 'Docs', path: path(ROOTS_LEARN, '/docs') },
          { title: 'Docs', path: path(ROOTS_LEARN, '/addresses') },
          { title: 'Roadmap', path: path(ROOTS_LEARN, '/roadmap') },
          { title: 'WhitePaper', path: path(ROOTS_LEARN, '/whitepaper') },
        ],
      },
    ],
  },
];
