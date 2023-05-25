import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

//store
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../store/reducers/user';

// ----------------------------------------------------------------------
//utils
import { retrieveUserId } from '../../../utils/retrieveUserId';


// eslint-disable-next-line react/prop-types
export default function LoginForm() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [error, setError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const errorLogin = useSelector((state) => state.user.errorLogin)

  // ---------------------------
  const handleLogin = (e) => {
    e.preventDefault()
    try {
      // If we're logged, we retrieve jwt from localStorage that's just been fetched,
      // if it exist, we navigate to dashboard, a protected route
      dispatch(login({
        email, password, resolve() {
          navigate('/dashboard')
        }
      }))
      setEmail('')
      setPassword('')
      setError(false)
    } catch (err) {
      console.log(err)
      setError(true)
    }
  };

  const handleDemoLogin = (e) => {
    e.preventDefault()
    try {
      dispatch(login({
        email: 'ottmann.alex@gmail.com', password: '123.Freedash!', resolve() {
          navigate('/dashboard')
        }
      }))
      setEmail('')
      setPassword('')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Adresse Email" onChange={e => setEmail(e.target.value)} />
        <TextField
          name="password"
          onChange={e => setPassword(e.target.value)}
          label="Mot de Passe"
          type={showPassword ? 'text' : 'password'}
          helperText={<Typography variant="body" color={theme => theme.palette["error"].main}>{errorLogin}</Typography>}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      {/*//! To implemente on  V2 "Remember ME" */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Stack direction="row" alignItems="center">
          <Checkbox name="remember" label="Se souvenir de moi" />
          Se souvenir de moi
        </Stack>

        {/*//! To implemente on  V2 "Forgot Password" */}
        <Link variant="subtitle2" underline="hover">
          Mot de passe oublié ?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleLogin}>
        Se connecter
      </LoadingButton>
      <LoadingButton sx={{ my: 5, bgcolor: 'red' }} size="small" type="submit" variant="contained" onClick={handleDemoLogin}>
        DEMO
      </LoadingButton>

      <Typography variant="body2" align="center">
        {error && error.message}
      </Typography>
    </>
  );
}

