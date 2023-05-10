import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

//store
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../store/reducers/user';

// ----------------------------------------------------------------------



// eslint-disable-next-line react/prop-types
export default function LoginForm() {
  const navigate = useNavigate();

  const dispatch = useDispatch();



  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ----------------- GPT
  // const handleLogins = () => {
  //   const credentials = { email, password };
  //   axios.post('/api/login', credentials)
  //     .then(response => {
  //       dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
  //       navigate('/dashboard');
  //     })
  //     .catch(error => {
  //       dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data });
  //     });
  // };
  // ---------------------------
  const handleLogin = () => {
    //  console.log(email, password)
    try {
      // If we're logged, we retrieve jwt from localStorage that's just been fetched,
      // if it exist, we navigate to dashboard, a protected route
      dispatch(login({ email, password }))
      if (localStorage.getItem('jwt')) {
        navigate('/dashboard')
      }
      setEmail('')
      setPassword('')
    } catch (err) {
      console.log(err)
    }
  };

  const handleDemoLogin = () => {
    try {
      dispatch(login({ email: 'john@mail.com', password: 'changeme' }))
      navigate('/dashboard')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" onChange={e => setEmail(e.target.value)} />
        <TextField
          name="password"
          onChange={e => setPassword(e.target.value)}
          label="Mot de Passe"
          type={showPassword ? 'text' : 'password'}
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
          <Checkbox name="remember" label="Remember me" />
          Se souvenir de moi
        </Stack>

        {/*//! To implemente on  V2 "Forgot Password" */}
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleLogin}>
        Login
      </LoadingButton>
      <LoadingButton sx={{ my: 5, bgcolor: 'red' }} size="small" type="submit" variant="contained" onClick={handleDemoLogin}>
        Login DEMO
      </LoadingButton>
    </>
  );
}

