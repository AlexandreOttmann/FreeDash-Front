import { createAction, createReducer, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { createAppAsyncThunk } from '../../utils/redux';
import { axiosInstance } from '../../api/axios'
// import { LoginResponse } from '../../@types/user';
import { getUserDataFromLocalStorage, removeUserDataFromLocalStorage } from '../../utils/user';

// Je récupère les données stockées dans le localStorage
const userData = getUserDataFromLocalStorage();

export const initialState = {
  logged: false,
  token: '',
  errorLogin: null,
  isLoading: false,
  credentials: {
    email: 'bouclierman@herocorp.io',
    password: 'jennifer',
  },
  // Je déverse mes données, si elles existent je serai connecté
  // Sinon je reste déconnecté
  ...userData,
};

export const login = createAsyncThunk(
  'user/LOGIN',
  async ({
    email,
    password
  }, ) => {
    // On va aller récupérer depuis le state les credentials
    // Je récupère mon email et mon mot de passe
    console.log(email)

    const {
      data
    } = await axiosInstance.post('/login', {
      email,
      password,
    });
    console.log(data)
    // Pour sauvegarde mes informations, je transforme mon objet en chaine de caractère
    // Je stocke cette chaine de caractère dans le localStorage
    localStorage.setItem('user', JSON.stringify(data));
    // Je type les données que je renvoie pour que le type soit transmis
    // dans la fonction de reducer
    return data
  },
);

export const changeCredentialsField = createAction('user/CHANGE_CREDENTIALS_FIELD', (value, field) => ({
  value,
  field,
}));

export const logout = createAction('user/LOGOUT');

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCredentialsField, (state, action) => {
      // Depuis les données reçues dans mon action
      const { field, value } = action.payload;

      // Pour accéder à la propriété email deux syntaxes possibles
      // state.credentials.email
      // state.credentials['email']
      // L'avantage de la seconde syntaxe est qu'elle permet d'utiliser
      // une variable pour accéder à la propriété
      // const emailField = 'email';
      // state.credentials[emailField];
      // `field` ici est soit 'email' soit 'password'
      state.credentials[field] = value;
    })
    .addCase(login.fulfilled, (state, action) => {
      // J'enregistre les informations retourner par mon API
      state.logged = action.payload.logged;
      state.pseudo = action.payload.pseudo;
      state.token = action.payload.token;

      // Je réinitialiser les credentials
      state.credentials.email = '';
      state.credentials.password = '';
      state.isLoading = false;
    })
    .addCase(login.pending, (state) => {
      state.errorLogin = null;
      state.isLoading = true;
    })
    .addCase(login.rejected, (state) => {
      state.errorLogin = 'Identifiants incorrects';
      state.isLoading = false;
    })
    .addCase(logout, (state) => {
      state.logged = false;
      state.pseudo = '';
      state.token = '';

      // Quand je me déconnecte je supprime les données du localStorage
      removeUserDataFromLocalStorage();
    });
});

export default userReducer;