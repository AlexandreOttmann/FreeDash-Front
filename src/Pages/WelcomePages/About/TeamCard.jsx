import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent } from '@mui/material';
import SvgColor from '../../../components/svg-color';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const StyledTitle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

TeamCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function TeamCard({ post, index }) {
  const { avatar, displayName, role, cover } = post;

  return (
    <Grid item xs={12} sm={index === 0 ? 12 : 6} md={index === 0 ? 6 : 3}>
      <Card sx={{ position: 'relative' }}>
        <StyledCardMedia
          sx={{
            ...(index === 0 || index === 1 || index === 2) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            },
            ...(index === 0 && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)',
              },
            }),
          }}
        >
          <SvgColor
            color="paper"
            src="/assets/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
              color: 'background.paper',
              ...(index === 0 || index === 1 || index === 2) && { display: 'none' },
            }}
          />
          <StyledAvatar
            alt={displayName}
            src={avatar}
            sx={{
              ...(index === 0 || index === 1 || index === 2) && {
                zIndex: 9,
                top: 24,
                left: 24,
                width: 40,
                height: 40,
              },
            }}
          />

          <StyledCover alt={displayName} src={cover} />
        </StyledCardMedia>

        <CardContent
          sx={{
            pt: 4,
            ...(index === 0 || index === 1 || index === 2) && {
              bottom: 0,
              width: '100%',
              position: 'absolute',
            },
          }}
        >
          <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
          </Typography>

          <StyledTitle
            color="inherit"
            variant="subtitle2"
            underline="hover"
            sx={{
              ...(index === 0 && { typography: 'h5', height: 60 }),
              ...(index === 0 || index === 1 || index === 2) && {
                color: 'common.white',
              },
            }}
          >
            {displayName}
          </StyledTitle>

          <StyledInfo>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                ml: index === 0 ? 0 : 1.5,
                ...(index === 0 || index === 1 || index === 2) && {
                  color: 'grey.500',
                },
              }}
            >
              {role}
              <Iconify icon={'eva:share-fill'} sx={{ width: 16, height: 16, mr: 0.5 }} />
            </Box>
          </StyledInfo>
        </CardContent>
      </Card>
    </Grid>
  );
}