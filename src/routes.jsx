import { useRoutes, Navigate } from 'react-router-dom';
//layouts
import HomeLayout from './layouts/home';
import DashboardLayout from './layouts//dashboard';

//Component
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';

//WelcomePages
import HomePage from './Pages/WelcomePages/Home/HomePage';
import AboutPage from './Pages/WelcomePages/About/AboutPage';
import LoginPage from './Pages/WelcomePages/Login/LoginPage';
import RegisterPage from './Pages/WelcomePages/Register/RegisterPage';
import ContactPage from './Pages/WelcomePages/Contact/ContactPage';
import Page404 from './Pages/WelcomePages/404/Page404';


//DashBoardPages
import DashboardPage from './Pages/Dashboard/DashboardTable/Dashboard';
import ClientPage from './Pages/Dashboard/Client/ClientPage';
import ClientDetailsPage from './Pages/Dashboard/Client/ClientDetailsPage';
import NewClientPage from './Pages/Dashboard/Client/NewClientPage';
import MissionPage from './Pages/Dashboard/Mission/MissionPage';
import MissionDetailsPage from './Pages/Dashboard/Mission/MissionDetailsPage';
import NewMissionPage from './Pages/Dashboard/Mission/NewMissionPage';
import ProfilPage from './Pages/Dashboard/Profil/ProfilPage';

// import Page404 from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  const user = true;
  const routes = useRoutes([
    {
      element: <HomeLayout />,
      path: '/',
      children: [
        { path: '', element: <HomePage /> },
        { path: 'about', element: <AboutPage /> },
        { path: 'login', element: <LoginPage /> },
        { path: 'register', element: <RegisterPage /> },
        { path: 'contact', element: <ContactPage /> },
        { path: '*', element: <Page404 /> }
      ]
    },
    {
      element: <ProtectedRoute user={user} ><DashboardLayout /></ProtectedRoute>,
      path: '/dashboard',
      children: [
        // { element: <Navigate to="/dashboard" />, index: true },
        { path: '', element: <DashboardPage /> },
        { path: 'profil', element: <ProfilPage /> },
        { path: 'client', element: <ClientPage /> },
        { path: 'client/:idclient', element: <ClientDetailsPage /> },
        { path: 'newclient', element: <NewClientPage /> },
        { path: 'mission', element: <MissionPage /> },
        { path: 'mission/:idmission', element: <MissionDetailsPage /> },
        { path: 'newmission', element: <NewMissionPage /> }
      ],
    },
    // {
    //   path: '*',
    //   element: <Navigate to="/404" replace />,
    // },
  ]);

  return routes;
}
