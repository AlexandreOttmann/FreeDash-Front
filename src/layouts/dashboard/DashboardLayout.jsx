import { useState } from 'react';
import { Outlet } from 'react-router-dom';


//Component
import Navbar from '../navbar/index';
import Sidebar from '../sidebar/index';

//@mui
import { styled } from '@mui/material/styles';

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

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  let user = localStorage.getItem('jwt') !== null

  return (
    <StyledRoot>
      <Navbar onOpenNav={() => setOpen(true)} isDashboard={true} isLogged={user} />
      <Sidebar openSide={open} onCloseSide={() => setOpen(false)} />
      <Main>
        <Outlet />
      </Main>
      {/* <Footer/> */}

    </StyledRoot>
  );
}