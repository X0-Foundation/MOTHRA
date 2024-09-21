// React

// MUI
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  SvgIcon,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
// Icon
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';

const XNftDetails = () => {
  const shortenedAddress = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <Card sx={{ mt: 3 }}>
      <CardHeader
        title="Details"
        avatar={
          <IconButton>
            <TextSnippetOutlinedIcon fontSize="large" color="primary" />
          </IconButton>
        }
      />
      <CardContent>
        <List>
          {/* Mint Address */}
          <ListItem>
            <ListItemText primary="creator Address" />
            <Box sx={{ display: 'flex' }}>
              <ListItemText
                secondary={shortenedAddress(
                  '0x1f4542f8b58436978448b7ebe0a292b07d71efd857089e01cb412cf3ba56d842',
                )}
              />
            </Box>
          </ListItem>
          {/* End of Mint Address */}
          {/* Token Address */}
          <ListItem>
            <ListItemText primary="Token Address" />
            <Box sx={{ display: 'flex' }}>
              <ListItemText
                secondary={shortenedAddress(
                  '0x1f4542f8b58436978448b7ebe0a292b07d71efd857089e01cb412cf3ba56d842',
                )}
              />
            </Box>
          </ListItem>
          {/* End of Token Address */}
          {/* Owner */}
          <ListItem>
            <ListItemText primary="Owner" />
            <Box sx={{ display: 'flex' }}>
              <ListItemText
                secondary={shortenedAddress(
                  '0x1f4542f8b58436978448b7ebe0a292b07d71efd857089e01cb412cf3ba56d842',
                )}
              />
            </Box>
          </ListItem>
          {/* End of Owner */}
          <ListItem>
            <ListItemText primary="Creator Royalties" />
            <Box>
              <ListItemText secondary="0%" />
            </Box>
          </ListItem>
          <ListItem>
            <ListItemText primary="All Volume" />
            <Box>
              <ListItemText secondary="?" />
            </Box>
          </ListItem>
          <ListItem>
            <ListItemText primary="Floor Price" />
            <Box>
              <ListItemText secondary="?" />
            </Box>
          </ListItem>

          <ListItem>
            <ListItemText primary="Creatd Date" />
            <Box>
              <ListItemText secondary="01/02/2024" />
            </Box>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default XNftDetails;
