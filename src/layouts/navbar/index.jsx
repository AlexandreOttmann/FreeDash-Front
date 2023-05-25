import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Link,
  Divider,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// utils
import { bgBlur } from '../../utils/cssStyles';
//store
import { useSelector, useDispatch } from 'react-redux';
import { retrieveUserData } from '../../store/reducers/user';
//hooks
import useResponsive from '../../hooks/useReponsive';
// components
import Iconify from '../../components/iconify/Iconify';
import Logo from '../../components/logo/Logo';
import DarkToggle from '../../components/button/DarkToggle';
import AccountPopover from './AccountPopover';


// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
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
  isDashboard: PropTypes.bool,
};

export default function Navbar({
  onOpenNav,
  isDashboard,
  isLogged,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogoutClick = () => {
    localStorage.clear('jwt')
    navigate('/')
  }

  //! TO DO : REQUEST USERID on API HERE TO DISPATCH DATA INTO NAVBAR

  const dispatch = useDispatch()

  const userData = useSelector((state) => state.user.userData)

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(retrieveUserData())
      } catch (err) {
        console.log(err)
      }
    }
    if (userData) {

      fetchData();

    }
  }, [])



  const isDesktop = useResponsive('up', 'lg');

  return (
    <StyledRoot>
      <StyledToolbar>
        {isDashboard ? (
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
        ) : (
          <>
            <Stack
              direction="row"
              alignItems="center"
              spacing={{
                xs: 0.5,
                sm: 5,
              }}
            >
              <Logo />
              {isDesktop ? (
                <>
                  <Link underline="none" to="/" component={RouterLink}>
                    Home
                  </Link>
                  <Link underline="none" to="/about" component={RouterLink}>
                    A propos
                  </Link>
                  <Link underline="none" to="/contact" component={RouterLink}>
                    Contact
                  </Link>
                </>
              ) : (
                <div>
                  <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    endIcon={<Iconify icon="simple-line-icons:arrow-down" width={10} />}
                  >
                    Pages
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <Link underline="none" to="/" component={RouterLink}>
                      <MenuItem onClick={handleClose}>Home</MenuItem>
                    </Link>
                    <Link underline="none" to="/about" component={RouterLink}>
                      <MenuItem onClick={handleClose}>A Propos</MenuItem>
                    </Link>
                    <Link underline="none" to="/contact" component={RouterLink}>
                      <MenuItem onClick={handleClose}>Contact</MenuItem>
                    </Link>
                  </Menu>
                </div>
              )}
            </Stack>
          </>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <DarkToggle />
        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          {/* If I'm connected I display the Profil menu, if not => Display Login/Register */}
          {isLogged ? (
            <AccountPopover onLogoutClick={onLogoutClick} userData={userData} />
          ) : (
            isDesktop ? (
              <>
                <Link underline="none" to="/login" component={RouterLink}>
                  Se connecter
                </Link>
                <Divider orientation="vertical" flexItem />
                <Link underline="none" to="/register" component={RouterLink}>
                  S'inscrire
                </Link>
              </>
            ) : (
              <>
                <Link underline="none" to="/login" component={RouterLink}>
                  Se connecter
                </Link>
              </>
            )
          )}
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}