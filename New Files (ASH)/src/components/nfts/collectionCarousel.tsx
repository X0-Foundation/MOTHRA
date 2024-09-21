import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { MotionViewport } from '@/components/animate';
import { nftCarousels } from '@/_mock/arrays/_nftCarousels';
import TextMaxLine from '@/components/text-max-line';
import Image from '@/components/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from '@/styles/Image.module.css';
import { StyledRoot } from '@/layouts/login/styles';
import React, { useState } from 'react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
// hooks
import useResponsive from '@/hooks/useResponsive';
import { useTheme } from '@mui/material/styles';

const CollectionCarousel = () => {
  const isMobile = useResponsive('down', 'sm');
  const isDesktop = useResponsive('up', 'sm');
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleNftSelect = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <StyledRoot>
        {/* Display most trending nfts and its description */}
        <Container
          component={MotionViewport}
          sx={{
            backgroundImage: `url(${nftCarousels[selectedIndex].background})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
          }}
        >
          <Grid container display="flex" justifyContent="space-between">
            <Grid
              item
              xs={12}
              md={6}
              sx={{ px: 2 }}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box sx={{ pt: 2 }}>
                <Typography variant="h4">
                  {nftCarousels[selectedIndex].name}
                </Typography>
                {isDesktop && (
                  <TextMaxLine line={4}>
                    {nftCarousels[selectedIndex].description}
                  </TextMaxLine>
                )}
                <Button variant="soft" sx={{ mt: 3 }}>
                  View Collection
                </Button>
              </Box>
              <Box display="flex">
                <img
                  alt="nft"
                  src={nftCarousels[selectedIndex].logo}
                  style={{ width: '35%', height: 'auto' }}
                />
                <Box
                // sx={{ backgroundColor: theme.palette.background.paper, p: 1 }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      textShadow: `
                  -1px -1px 0 black,
                   1px -1px 0 black,
                  -1px  1px 0 black,
                   1px  1px 0 black
                `,
                    }}
                  >
                    Creator: Arthur
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      textShadow: `
                  -1px -1px 0 black,
                   1px -1px 0 black,
                  -1px  1px 0 black,
                   1px  1px 0 black
                `,
                    }}
                  >
                    Floor: 50 FTM
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      textShadow: `
                  -1px -1px 0 black,
                   1px -1px 0 black,
                  -1px  1px 0 black,
                   1px  1px 0 black
                `,
                    }}
                  >
                    30D Volume: 5000 FTM
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* <Grid item xs={5} /> */}
            {isDesktop && (
              <Grid item xs={3}>
                <Swiper
                  key="collectionCarousel_1"
                  modules={[Navigation, Pagination, A11y]}
                  navigation
                  pagination={{ clickable: true }}
                  spaceBetween={40}
                  slidesPerView={1}
                >
                  {nftCarousels.map(
                    (carousel, index: number) =>
                      index % 3 === 0 && (
                        <SwiperSlide key={index}>
                          <Image
                            alt="nft"
                            src={nftCarousels[index].logo}
                            sx={{
                              borderRadius: 1,
                              width: '80%',
                              py: 3,
                              px: 1,
                            }}
                            className={
                              selectedIndex === index ? styles.selected : ''
                            }
                            onClick={() => handleNftSelect(index)}
                          />
                          {nftCarousels[index + 1] && (
                            <Image
                              alt="nft"
                              src={nftCarousels[index + 1]?.logo}
                              sx={{
                                borderRadius: 1,
                                width: '80%',
                                py: 3,
                                px: 1,
                              }}
                              className={
                                selectedIndex === index + 1
                                  ? styles.selected
                                  : ''
                              }
                              onClick={() => handleNftSelect(index + 1)}
                            />
                          )}
                          {nftCarousels[index + 2] && (
                            <Image
                              alt="nft"
                              src={nftCarousels[index + 2]?.logo}
                              sx={{
                                borderRadius: 1,
                                width: '80%',
                                py: 3,
                                px: 1,
                              }}
                              className={
                                selectedIndex === index + 2
                                  ? styles.selected
                                  : ''
                              }
                              onClick={() => handleNftSelect(index + 2)}
                            />
                          )}
                        </SwiperSlide>
                      ),
                  )}
                </Swiper>
              </Grid>
            )}
          </Grid>
        </Container>
      </StyledRoot>
      {isMobile && (
        <Box display="block">
          <Swiper
            key="swiper_carousel"
            modules={[Navigation, Pagination, A11y]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={3}
            onSlideChange={() => console.log('slide test')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {nftCarousels.map((carousel, index: number) => (
              <SwiperSlide key={`sc${index}`}>
                <Image
                  alt="nft"
                  src={nftCarousels[index].logo}
                  sx={{
                    borderRadius: 1,
                    width: '80%',
                    py: 3,
                    px: 1,
                  }}
                  className={selectedIndex === index ? styles.selected : ''}
                  onClick={() => handleNftSelect(index)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      )}
    </>
  );
};

export default CollectionCarousel;
