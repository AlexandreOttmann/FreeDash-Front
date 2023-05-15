//hooks
import {
  useNavigate
} from 'react-router';
import jwt_decode from "jwt-decode";
import {
  createAction,
  createReducer,
  createAsyncThunk
} from '@reduxjs/toolkit';
import {
  useDispatch
} from 'react-redux';
//utils
import {
  axiosInstance
} from '../../api/axios'
import {
  retrieveUserId
} from '../../utils/retrieveUserId';
import {
  getUserDataFromLocalStorage,
  removeUserDataFromLocalStorage
} from '../../utils/user';

// Je récupère les données stockées dans le localStorage
// const userData = getUserDataFromLocalStorage();
const userId = retrieveUserId()

export const initialState = {
  logged: false,
  token: '',
  errorLogin: null,
  isLoading: false,
  credentials: {
    email: 'bouclierman@herocorp.io',
    password: 'jennifer',
  },
  isDarkMode: localStorage.getItem('isDarkMode') === 'true',
  userData: [],
  userId: null,

};

export const login = createAsyncThunk(
  'user/LOGIN',
  async ({
    email,
    password,
    resolve
  }, thunkAPI) => {
    // On va aller récupérer depuis le state les credentials

    const state = thunkAPI.getState()
    const {
      data
    } = await axiosInstance.post('/login', {
        email,
        password,
      })
      .then((data) => {
        localStorage.setItem('jwt', JSON.stringify(data))
        const decodedToken = jwt_decode(data.data.accessToken)
        console.log('jeton décodé', decodedToken.id)
        thunkAPI.dispatch(setToken(decodedToken))
        resolve()
        return data
      })
      .catch(err => console.log(err))
    return data
  },
);


export const retrieveUserData = createAsyncThunk('user/RETRIEVE_USER_DATA',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('jwt')
    const decodedToken = jwt_decode(token)
    const userIdFromToken = decodedToken.id
    const {
      data
    } = await axiosInstance.get(`/user/${userIdFromToken}`)
    return data
  }
);

export const setToken = createAction('user/SET_TOKEN', (token) => ({
  payload: {
    token
  },
}));


export const changeCredentialsField = createAction('user/CHANGE_CREDENTIALS_FIELD', (value, field) => ({
  value,
  field,
}));

export const toggleDarkMode = createAction('user/TOGGLE_DARK_MODE');

export const logout = createAction('user/LOGOUT');



const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCredentialsField, (state, action) => {
      const {
        field,
        value
      } = action.payload;
      state.credentials[field] = value;
    })
    .addCase(toggleDarkMode, (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem('isDarkMode', state.isDarkMode)
    })
    .addCase(retrieveUserData.fulfilled, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(login.fulfilled, (state, action) => {
      // J'enregistre les informations retourner par mon API
      state.logged = action.payload.logged;
      state.pseudo = action.payload.pseudo;
      state.token = action.payload.token;

      // const decodedToken = jwt_decode(action.payload.token);
      // state.userId = decodedToken.id;

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