import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { alpha, styled } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion"
//mui
import { Paper, Typography, Box, Container, Divider, Button, CardMedia } from "@mui/material";


import "./slide.css"
//slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//utils
import Iconify from "../../../../components/iconify/Iconify";
import { useTheme } from "@mui/material/styles";
import zIndex from "@mui/material/styles/zIndex";


const StyledBg = styled('div')((index) => ({
  position: 'absolute',
  top: 20,
  left: 0,
  overflow: 'hidden',
  height: '100%',
  width: '100%',
  backgroundImage: 'url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  zIndex: -1,

}));

export default function CurrentMission({ displayMissions }) {

  const theme = useTheme();
  const boxSX = {
    height: '250px',
    "&:hover": {
      color: theme.palette['warning'].light,
      transition: 'all 0.5s ease',
    },
  };

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [animateSlide, setAnimateSlide] = useState(false);

  useEffect(() => {
    setAnimateSlide(true);
  }, [currentSlideIndex]);

  const handleSlideChange = (index) => {
    setCurrentSlideIndex(index);
    setAnimateSlide(false);
  };
  //Settings for the slider
  const settings = {
    dots: true,
    dotsClass: 'slick-dots slick-thumb ',
    infinite: true,
    arrows: false,
    draggable: true,
    speed: 1000,
    easing: 'ease-in-out',
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (oldIndex, newIndex) => handleSlideChange(newIndex),
  };

  return (
    <Box
      sx={{
        borderRadius: 3,
        color: (theme) => theme.palette['primary'].lighter,
        height: '100%',
        width: '100%',
      }}>

      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', borderRadius: 3, backgroundColor: (theme) => alpha(theme.palette['primary'].dark, 0.8) }}>

        <Box sx={{ position: 'absolute', zIndex: 1, top: 15, left: 20, }}>
          <Typography variant="subtitle1" align={'left'} >Mission en cours</Typography>
        </Box>
        <Slider {...settings}>
          {displayMissions.length === 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
              <Typography variant="subtitle2" align={'center'} sx={{ m: 10 }} >Vous n'avez pas de mission en cours...</Typography>
            </Box>
          ) : (
            displayMissions.map((mission, index) => (
              <AnimatePresence key={mission.id}>
                <Box key={mission.id} sx={{ zIndex: 3 }}>
                  <Link to={`/dashboard/mission/${mission.id}`} >
                    <Box sx={{
                      display: 'flex', flexDirection: 'column', pt: 10, height: '200%', color: 'white',
                      borderRadius: 3, ...boxSX
                    }}>

                      <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={
                          currentSlideIndex === index && animateSlide
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: 100 }
                        }
                        transition={{ duration: 0.8 }}
                        exit={{ opacity: 0, x: 100 }}
                      >
                        <Typography variant="h5" align={'left'} gutterBottom >{mission.name}</Typography>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 150 }}
                        animate={
                          currentSlideIndex === index && animateSlide
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: 150 }
                        }
                        transition={{ duration: 0.8, delay: 0.3 }}
                        exit={{ opacity: 0, x: 150 }}
                      >
                        <Typography variant="caption" align={'left'} >{mission.startDate}</Typography>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: 250 }}
                        animate={
                          currentSlideIndex === index && animateSlide
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: 250 }
                        }
                        transition={{ duration: 0.5, delay: 0.4 }}
                        exit={{ opacity: 0, x: 250 }}
                      >
                        <Typography variant="subtitle2" align={'left'} sx={{}}>{mission.commentary}</Typography>
                      </motion.div>
                    </Box>
                  </Link>
                </Box>
              </AnimatePresence>
            )
            )
          )}
        </Slider>
        <Box sx={{ textAlign: 'right', position: 'absolute', bottom: 10, right: 0, zIndex: 11 }}>
          <Link to={`/dashboard/mission/`}>
            <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
              Toutes les missions
            </Button>
          </Link>
        </Box>
      </Box>

    </Box >
  )


}