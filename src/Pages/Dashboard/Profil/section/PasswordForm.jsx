/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { axiosPrivateInstance } from '../../../../api/axios';

import { Container, Typography, Divider, Stack, Button, Card, TextField } from '@mui/material';

export default function PasswordForm({ profile }) {


  const [currentPassword, setCurrentPassword] = useState(profile?.password || '');
  const [newPassword, setNewPassword] = useState(profile?.password || '');
  const [confirmPassword, setConfirmPassword] = useState(profile?.password || '');

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleEditPassword = async () => {
    setLoading(true)
    try {
      const response = await axiosPrivateInstance.patch(`/user`, {
        currentPassword,
        newPassword,
        confirmPassword,
      })
      console.log(response.data)
      setSuccess('Votre mot de passe a bien été modifié')
      setLoading(false)
      window.location.reload();

    } catch (error) {
      console.log(error)
      setError('Une erreur est survenue')
      setLoading(false)
    }
  }

  useEffect(() => {
    setNewPassword('')
    setConfirmPassword('')
  }, [profile])


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
              fullWidth
              label="Mot de passe actuel"
              value={currentPassword}
              variant="outlined"
            />
          </Stack>

          <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Nouveau mot de passe"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              variant="outlined"
            />
          </Stack>

          <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Confirmation du mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant="outlined"
            />
          </Stack>

          <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              {error && 'erreur'}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {success && 'success'}
            </Typography>
          </Stack>

          <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              {loading && 'loading'}
            </Typography>
          </Stack>

          <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
            <Button

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