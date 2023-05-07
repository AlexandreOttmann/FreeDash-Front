import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './index.css';
// Component
import Iconify from '../../../components/iconify';
// api & hooks
import axios from '../../../api/axios';
import useResponsive from '../../../hooks/useReponsive';
//@mui
import { styled } from '@mui/material/styles';
import {
  Container,
  Typography,
  IconButton,
  Divider,
  Stack,
  Button,
  TextField,
  Box,
  Tooltip,
  InputAdornment,
  Grid,
} from '@mui/material';

//utils
const USER_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';
//-----------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginLeft: 'auto',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 20,
  // minHeight: '100vh',

  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));
//---------------------------------------------

export default function RegisterPage() {
  const userRef = useRef();
  const errRef = useRef();

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')

  const [user, setUser] = useState('');

  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    //! Remove before deployment, it check if the value goes trough the submit
    if (!v1 || !v2) {
      setErrMsg('Invalid Entry');
      return;
    }
    console.log(firstname, lastname, user, pwd);
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ firstname, lastname, user, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      // TODO: remove console.logs before deployment
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response))
      setSuccess(true);
      //clear state and controlled inputs
      setUser('');
      setPwd('');
      setMatchPwd('');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed');
      }
      errRef.current.focus();
    }
  };

  const mdUp = useResponsive('up', 'md');
  return (
    <>
      <Helmet>
        <title> S'inscrire | DashFree </title>
      </Helmet>

      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Rejoignez-nous !
            </Typography>
            <img
              src="./assets/illustrations/settings_illustration.png"
              alt="like_illustration"
            />
          </StyledSection>
        )}
        {success ? (
          <StyledSection>
            <h1>Success!</h1>
            <p>
              <a href="#">Sign In</a>
            </p>
          </StyledSection>
        ) : (
          //-------------------------------------------------
          //! Register Form
          <Container maxWidth="sm">
            <StyledContent>
              <p
                ref={errRef}
                className={errMsg ? 'errmsg' : 'offscreen'}
                aria-live="assertive"
              >
                {errMsg}
              </p>

              <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                S'inscrire
              </Typography>
              <Box component="form" onSubmit={handleSubmit}>

                <Stack spacing={3}>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <TextField value={firstname} fullWidth name="Prénom" label="Prénom" onChange={(e) => setFirstname(e.target.value)} required />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField value={lastname} fullWidth name="Nom" label="Nom" onChange={(e) => setLastname(e.target.value)} required />
                    </Grid>
                  </Grid>
                  <Tooltip
                    title="entrez une adresse mail valide"
                    arrow
                    open={user.length > 3 && !validName}
                  >

                    {/* CHECK EMAIL */}
                    <TextField
                      ref={userRef}
                      name="email"
                      label="Adresse email"
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
                      required
                      error={user.length > 3 && !validName}
                      aria-invalid={validName ? 'false' : 'true'}
                      aria-describedby="uidnote"
                      onFocus={() => setUserFocus(true)}
                      onBlur={() => setUserFocus(false)}
                    />
                  </Tooltip>

                  {/* CHECK PASSWORD */}
                  <TextField
                    label="Mot de passe"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            <Iconify
                              icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}

                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                  />
                  {/* CHECK CONFIRM PASSWORD */}
                  <Tooltip
                    title="Les mots de passe ne correspondent pas"
                    arrow
                    open={matchPwd.length > 0 && !validMatch}
                  >
                    <TextField
                      helperText="Le mot de passe doit être compris entre 8 et 24 caractères, inclure une Majuscule, Minuscule, un Caractère spécial et un nombre minimum"
                      name="password"
                      label="Confirmer le mot de Passe"
                      type={showPassword ? 'text' : 'password'}
                      value={matchPwd}
                      onChange={(e) => setMatchPwd(e.target.value)}
                      required
                      aria-invalid={validMatch ? 'false' : 'true'}
                      aria-describedby="confirmnote"
                      onFocus={() => setMatchFocus(true)}
                      onBlur={() => setMatchFocus(false)}
                    />
                  </Tooltip>
                </Stack>
                <Button onClick={handleSubmit}
                  disabled={!validName || !validPwd || !validMatch ? true : false}
                >
                  Sign Up
                </Button>
              </Box>
              <Typography variant="body1">
                Déjà inscrit ?{" "}<Link to="/login">Se connecter</Link>
              </Typography>
            </StyledContent>
          </Container>
        )}
      </StyledRoot>
    </>
  );
}

