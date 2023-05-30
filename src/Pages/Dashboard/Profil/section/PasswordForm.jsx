/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { axiosPrivateInstance } from '../../../../api/axios';

import { Container, Typography, Divider, Stack, Button, Card, TextField, IconButton, InputAdornment } from '@mui/material';


import Iconify from '../../../../components/iconify/Iconify';
import { set } from 'lodash';
import { color } from 'framer-motion';

export default function PasswordForm({ EmailCheck }) {

  //Password regex
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-_.!@#$%]).{8,24}$/;

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const [EmailChecking, setEmailChecking] = useState(false)
  const [testPassword, setTestPassword] = useState(false)


  const handleEditPassword = async (e) => {
    e.preventDefault()
    // setError('Fonction désactivée pour le moment')
    if (PWD_REGEX.test(newPassword)) {
      setTestPassword(true)
      if (newPassword !== confirmPassword) {
        setError('Les mots de passe ne correspondent pas')
        return
      } else if (newPassword === currentPassword) {
        setError('Votre nouveau mot de passe doit être différent de l\'ancien')
        return
      }
      else if (newPassword === '' || confirmPassword === '') {
        setError('Veuillez remplir tous les champs')
        return
      }
      else {
        setLoading(true)
        try {
          const response = await axiosPrivateInstance.patch(`/updatepassword`, {
            currentPassword,
            confirmPassword,
          })
          setError('')
          setCurrentPassword('')
          setNewPassword('')
          setConfirmPassword('')
          setSuccess('Votre mot de passe a bien été modifié')
          setLoading(false)
        } catch (error) {
          console.log(error)
          setError('Une erreur est survenue')
          setLoading(false)
        }
      }
    } else {
      setTestPassword(false)
      setError('Votre mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial')
    }
  }

  useEffect(() => {
    setEmailChecking(EmailCheck === "ottmann.alex@gmail.com")
    if (EmailChecking &&
      setError('Vous ne pouvez pas modifier le compte de démo')
    )
      return
  }, [EmailChecking])

  return (
    <>
      <Container maxWidth="md">
        <Card sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Modification de mon mot de passe
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
            <TextField
              disabled={EmailChecking}
              fullWidth
              label="Mot de passe actuel"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              variant="outlined"
              type={showPassword ? "text" : "password"}
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

          <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Nouveau mot de passe"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              variant="outlined"
              type={showPassword ? "text" : "password"}

            />
          </Stack>

          <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Confirmation du mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant="outlined"
              type={showPassword ? "text" : "password"}
            />
          </Stack>

          <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
            <Typography variant="body2" color="error" gutterBottom>
              {error ? error : ''}
            </Typography>
            <Typography variant="body2" color={
              theme => theme.palette.success.main
            } gutterBottom>
              {success ? success : ''}
            </Typography>
          </Stack>

          <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
            <Typography variant="caption" gutterBottom color={
              theme => theme.palette.warning.main
            }>
              {loading && 'Chargement...'}
            </Typography>
          </Stack>

          <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
            <Button
              disabled={EmailChecking}
              variant="contained"
              color="primary"
              onClick={handleEditPassword}
            >
              Modifier
            </Button>
          </Stack>
        </Card>

      </Container >
    </>
  )
}