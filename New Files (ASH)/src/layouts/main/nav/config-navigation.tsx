// routes
import { PATH_AGENCY, PATH_LEARN, PATH_NFTS, PATH_TRADE } from '../../../routes/paths';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'TRADE',
    path: PATH_TRADE.root,
    children: [
      {
        subheader: '',
        items: [
          {
            title: 'Spot',
            path: PATH_TRADE.spot,
          },
          {
            title: 'Liquidity',
            path: PATH_TRADE.liquidity,
          },
          {
            title: 'Earn',
            path: PATH_TRADE.earn,
          },
          {
            title: 'Bridge',
            path: PATH_TRADE.bridge,
          },
          {
            title: 'Charts',
            path: PATH_TRADE.charts,
          },
        ],
      },
    ],
  },
  {
    title: 'AGENCY',
    path: PATH_AGENCY.root,
    children: [
      {
        subheader: '',
        items: [
          {
            title: 'Jobs',
            path: PATH_AGENCY.jobs,
          },
          {
            title: 'Verification',
            path: PATH_AGENCY.verification,
          },
          {
            title: 'Governance',
            path: PATH_AGENCY.governance,
          },
          {
            title: 'How To Verify',
            path: PATH_AGENCY.howToVerify,
          },
          {
            title: 'Profile',
            path: PATH_AGENCY.profile,
          },
        ],
      },
    ],
  },
  {
    title: 'NFTs',
    path: PATH_NFTS.root,
    children: [
      {
        subheader: '',
        items: [
          {
            title: 'Characters',
            path: PATH_NFTS.characters,
          },
          {
            title: 'Benefits',
            path: PATH_NFTS.benefits,
          },
        ],
      },
    ],
  },
  {
    title: 'LEARN',
    path: PATH_LEARN.root,
    children: [
      {
        subheader: '',
        items: [
          {
            title: 'How TGR Works',
            path: PATH_LEARN.howTgrWorks,
          },
          {
            title: 'How To Get HTZ',
            path: PATH_LEARN.howToGetHtz,
          },
          {
            title: 'How To Post Jobs',
            path: PATH_LEARN.howToPostJobs,
          },
          {
            title: 'How To Earn HTZ',
            path: PATH_LEARN.howToEarnHtz,
          },
        ],
      },
      {
        subheader: '',
        items: [
          {
            title: 'Docs',
            path: PATH_LEARN.docs,
          },
          {
            title: 'Addresses',
            path: PATH_LEARN.addresses,
          },
          {
            title: 'Roadmap',
            path: PATH_LEARN.roadmap,
          },
          {
            title: 'Github',
            path: PATH_LEARN.github,
          },
          {
            title: 'WhitePaper',
            path: PATH_LEARN.whitepaper,
          },
        ],
      },
    ],
  },
];

export default navConfig;
