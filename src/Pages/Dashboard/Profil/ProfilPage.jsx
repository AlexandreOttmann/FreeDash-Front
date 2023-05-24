
import { useSelector } from 'react-redux';
import ProfileForm from './section/ProfileForm';
import { Container } from '@mui/material';
import styled from '@emotion/styled';

const StyledSection = styled('div')(({ theme }) => ({
  maxWidth: 600,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
}));

const ProfilePage = () => {
  const profile = useSelector((state) => state.profile);

  return (
    <div style={{ display: 'flex' }}>
      <StyledSection>
        <Container maxWidth="md">
          <img src="/src/assets/illustrations/settings_illustration.png" alt="login" />
        </Container>
      </StyledSection>
      <div style={{ flex: '1' }}>
        <Container maxWidth="md">
          <ProfileForm profile={profile} />
        </Container>
      </div>
    </div>
  );
};

export default ProfilePage;