import { useState } from 'react';
import useResponsive from '../../hooks/useReponsive';
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/index';



//@mui
import { styled } from '@mui/material/styles';

//utils
import isLogged from '../../utils/isLogged';

//--------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export default function HomeLayout() {

  const user = isLogged()

  const [open, setOpen] = useState(false);
  return (
    <StyledRoot>
      <Navbar onOpenNav={() => setOpen(true)} isDashboard={false} isLogged={user} />
      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
}