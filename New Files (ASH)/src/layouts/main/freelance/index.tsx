/* eslint-disable import/no-cycle */
import { Box, Container } from '@mui/material';
import { NavSectionHorizontal } from '@/components/nav-section';
import { useAccount } from 'wagmi';

type Props = {
  children?: React.ReactNode;
};

const LayoutXAgency = ({ children }: Props) => {
  const {address} = useAccount();

  
  const SUB_NAV_ITEMS = [
    {
      subheader: 'Freelance',
      items: [
        {
          title: 'Jobs',
          path: '/freelance/jobs',
        },
        {
          title: 'Verification',
          path: '/freelance/verification',
        },
        
        {
          title: 'How To Verify',
          path: '/freelance/how-to-verify',
        },
        {
          title: 'Vote',
          path: '/freelance/vote',
        },
        {
          title: 'Profile',
          path: `/freelance/profile?address=${address}`,
        },
      ],
    },
  ];

  return (
    <Container
          sx={{ height: 1, margin:'auto', alignItems: 'center', justifyContent: 'center' }}
        >
      <NavSectionHorizontal data={SUB_NAV_ITEMS} sx={{justifyContent:{md:'center',xs:'flex-start'}}}/>
      <Box>
        {children}
      </Box>
    </Container>
  );
};


export default LayoutXAgency;
