import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
//@mui
import { Container, Box, ListItem, ListItemIcon, Tab } from '@mui/material';

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useTheme } from '@mui/material';
import styled from '@emotion/styled';
//motion
import { motion, useIsPresent } from 'framer-motion';
import "./transition.css"
//hooks & utils
import { axiosPrivateInstance } from '../../../api/axios';
import useResponsive from '../../../hooks/useReponsive';
import SvgColor from '../../../components/svg-color/SvgColor';
//sections
import ProfileForm from './section/ProfileForm';
import PasswordForm from './section/PasswordForm';



const StyledSection = styled('div')(({ theme }) => ({
  maxWidth: 600,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',

}));

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    position: 'relative',
    minHeight: '100vh',
  },
}));


export const StyledNavItemIcon = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// export const StyledNavItem = styled(ListItem){

// }


const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;


const ProfilePage = () => {

  const [value, setValue] = useState('1');
  const [user, setUser] = useState([]);

  //store
  const isDarkMode = useSelector(state => state.user.isDarkMode)

  //hooks
  const mdUp = useResponsive('up', 'md');
  const isPresent = useIsPresent();
  const theme = useTheme();

  // ==============States TabList=================

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ==============States API=================

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
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange}>
                  <Tab label={
                    <ListItem alignItems='center'>
                      <StyledNavItemIcon>{icon('ic_user')}</StyledNavItemIcon>
                      Général
                    </ListItem>
                  }
                    value="1"
                  />
                  <Tab label={
                    <ListItem alignItems='center'>
                      <StyledNavItemIcon>{icon('ic_lock')}</StyledNavItemIcon>
                      Mot de passe
                    </ListItem>
                  } value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <ProfileForm profile={user} />
              </TabPanel>
              <TabPanel value="2">
                <PasswordForm EmailCheck={user?.email} />
              </TabPanel>
            </TabContext>
          </Box>
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