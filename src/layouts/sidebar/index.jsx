import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

//! @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
//! mock
import account from '../../_mock/account';
//! hooks
import useResponsive from '../../hooks/useReponsive';
//! store
import { useDispatch, useSelector } from 'react-redux';
import { retrieveUserData } from '../../store/reducers/user';
//! components
import Logo from '../../components/logo';
import Scrollbar from '../../components/scrollbar/Scrollbar';
import SideSection from '../../components/side-section/SideSection';
//
import sideConfig from './config';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Sidebar.propTypes = {
  openSide: PropTypes.bool,
  onCloseSide: PropTypes.func,
};

export default function Sidebar({ openSide, onCloseSide }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');


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

  useEffect(() => {

    if (openSide) {
      onCloseSide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);



  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 12.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" to='/dashboard/profil'>
          <StyledAccount>
            <Avatar src={account.photoURL} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {userData?.firstName + ' ' + userData?.lastName}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {userData?.occupation}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>
      {/* items list, every link displayed on sidebar */}
      <SideSection data={sideConfig} />

      <Box sx={{ flexGrow: 1 }} />

    </Scrollbar>

  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openSide}
          onClose={onCloseSide}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}