import ProfileForm from './section/ProfileForm';
import { Container } from '@mui/material';
import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import { axiosPrivateInstance } from '../../../api/axios';
import useResponsive from '../../../hooks/useReponsive';


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


  // ==============States API=================
  const [user, setUser] = useState([]);

  //fetching user details
  const getUser = useCallback(async () => {
    try {
      const response = await axiosPrivateInstance.get(`/user`);
      setUser(response.data);
      console.log(response.data)
      console.log(response.data);
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
        <ProfileForm profile={user} />
      </Container>
    </StyledRoot>
  );
};

export default ProfilePage;
