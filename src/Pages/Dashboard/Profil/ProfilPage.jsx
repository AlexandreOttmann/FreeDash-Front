import { useCallback, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

//@mui
import { Container, Box } from '@mui/material';
import styled from '@emotion/styled';
import { useTheme } from '@mui/material';
//motion
import { motion, useIsPresent } from 'framer-motion';
import "./transition.css"
//hooks & utils
import { axiosPrivateInstance } from '../../../api/axios';
import useResponsive from '../../../hooks/useReponsive';
//sections
import ProfileForm from './section/ProfileForm';


// ----------------------------------------------------------------------
const StyledSection = styled('div')(({ theme }) => ({
  maxWidth: 600,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',

}));

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    position: 'relative'
  },
}));

const ProfilePage = () => {

  const mdUp = useResponsive('up', 'md');
  const isPresent = useIsPresent();
  const theme = useTheme();


  const isDarkMode = useSelector(state => state.user.isDarkMode)
  // ==============States API=================
  const [user, setUser] = useState([]);

  //fetching user details
  const getUser = useCallback(async () => {
    try {
      const response = await axiosPrivateInstance.get(`/user`);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  return (


    <StyledRoot>

      {mdUp && (
        <StyledSection>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Container maxWidth="md">
              <img src="/assets/illustrations/settings_illustration.png" alt="paramètres" />
            </Container>
          </motion.div>
        </StyledSection>
      )}

      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <ProfileForm profile={user} />
        </motion.div>
      </Container>
      <motion.div
        initial={{ scaleY: 1, opacity: 1 }}
        animate={{ scaleY: 0, opacity: 0, transition: { duration: 1, ease: "anticipate" } }}
        exit={{ scaleY: 1, transition: { duration: 1, ease: "anticipate" } }}
        style={{
          originY: isPresent ? 0 : 1,
          backgroundColor: isDarkMode ? theme.palette["grey"][800] : theme.palette["grey"][300],
        }}
        className="privacy-screen"
      />



    </StyledRoot>
  );
};

export default ProfilePage;
