import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
// utils
import { bgBlur } from '../../utils/cssStyles';
// components
import Iconify from '../../components/iconify/Iconify';
import Logo from '../../components/logo/Logo';
//

import AccountPopover from './AccountPopover';

// import NotificationsPopover from './NotificationsPopover';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  // [theme.breakpoints.up('lg')]: {
  //   width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  // },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Navbar.propTypes = {
  onOpenNav: PropTypes.func,
  isDashboard:PropTypes.bool,
};

export default function Navbar({ onOpenNav,isDashboard }) {
  return (
    <StyledRoot>
      <StyledToolbar>
        {isDashboard? (
        <IconButton
        onClick={onOpenNav}
        sx={{
          mr: 1,
          color: 'text.primary',
          display: { lg: 'none' },
        }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
         ): (
        
          <Logo/> 
          
         
        )
         }
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}