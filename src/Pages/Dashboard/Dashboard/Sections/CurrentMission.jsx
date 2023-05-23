import { useEffect } from "react";
import { Link } from "react-router-dom";

//mui
import { Card, Typography, Box, Container, Divider, Button } from "@mui/material";



//slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//utils
import Iconify from "../../../../components/iconify/Iconify";


export default function CurrentMission({ displayMissions }) {



  //Settings for the slider
  const settings = {
    dots: true,
    infinite: true,
    // speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  return (
    <Card
      sx={{
        pb: 1,
        pt: 3,
        boxShadow: 0,
        paddingX: 3,
        color: (theme) => theme.palette['primary'].lighter,
        bgcolor: (theme) => theme.palette['secondary'].main,

      }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1" align={'left'} >Mission en cours</Typography>
      </Box>

      <Container>
        <Slider {...settings}>
          {
            displayMissions.map((mission) => (
              <Container key={mission.id}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 2, }}>
                  <Typography sx={{
                    transform: 'translateY(-50 %)',
                    transition: 'transform 0.5s linear'

                  }} variant="h5" align={'left'} >{mission.name}</Typography>
                  <Typography variant="h5" align={'right'} >{mission.startDate}</Typography>
                </Box>
                <Link to={`/dashboard/mission/${mission.id}`}>
                  <Typography variant="subtitle2" align={'left'} >{mission.commentary}</Typography>
                </Link>
              </Container>
            )
            )
          }
        </Slider>

        <Divider sx={{ mt: 5 }} />

        <Box sx={{ p: 2, textAlign: 'right', }}>
          <Link to={`/dashboard/mission/`}>
            <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
              Voir toutes les missions
            </Button>
          </Link>
        </Box>
      </Container>





    </Card>
  )


}