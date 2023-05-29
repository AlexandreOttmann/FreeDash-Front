import ProfileForm from './section/ProfileForm';
import { Container } from '@mui/material';
import styled from '@emotion/styled';
import PasswordForm from './section/PasswordForm';
import { useCallback, useEffect, useState } from 'react';
import { axiosPrivateInstance } from '../../../api/axios';
import useResponsive from '../../../hooks/useReponsive';


// ==============States TabList=================

import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


const StyledSection = styled('div')(({ theme }) => ({
  maxWidth: 600,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
}));

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const ProfilePage = () => {

  const mdUp = useResponsive('up', 'md');

  // ==============States TabList=================

  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          <Container maxWidth="md">
            <img src="/src/assets/illustrations/settings_illustration.png" alt="paramètres" />
          </Container>
        </StyledSection>
      )}

      <Container maxWidth="md">
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange}>
                <Tab label="Général" value="1" />
                <Tab label="Mot de passe" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <ProfileForm profile={user} />
            </TabPanel>
            <TabPanel value="2">
              <PasswordForm profile={user} />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </StyledRoot>


  );
};

export default ProfilePage;