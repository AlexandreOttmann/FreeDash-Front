import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../../../components/iconify/Iconify';

import WelcomeSection from './Sections/WelcomeSection';
import CurrentMission from './Sections/CurrentMission';
import AppWidgetSummary from './Sections/AppWidgetSummary';
import TopClientsSection from './Sections/TopClientsSection';
import CalendarSection from './Sections/CalendarSection';
//utils
import { retrieveUserId } from '../../../utils/retrieveUserId';
import { retrieveUserData } from '../../../store/reducers/user';

import { axiosInstance } from '../../../api/axios'


export default function DashboardPage() {
  const theme = useTheme();

  const [missions, setMissions] = useState([]);

  const [topClients, setTopClients] = useState([]) // [ {name: 'client1', missions: 2}, {name: 'client2', missions: 1}

  const [clients, setClients] = useState([]);
  const [currentMissions, setCurrentMissions] = useState([]); // [  
  const [totalClient, setTotalClient] = useState(0);
  const [totalMission, setTotalMission] = useState(0);

  const [totalMissionNotDeclared, setTotalMissionNotDeclared] = useState(0);
  const [totalRevenueNotDeclared, setTotalRevenueNotDeclared] = useState(0); //
  const [revenue, setRevenue] = useState(0);

  //FETCH 1 : Missions List
  //FETCH 2 : Clients List
  const userId = retrieveUserId()


  const handleCurrentMissions = (missions) => {
    const currentMissions = missions.filter(mission => mission.status === 'En Cours')
    return currentMissions
  }
  const handleTotalMissionNotDeclared = (missions) => {
    const notDeclaredMissions = missions.filter(mission => mission.status !== 'Déclarée')
    return notDeclaredMissions
  }

  const handleRevenueNotDeclared = (missions) => {
    const notDeclaredMissions = missions.filter(mission => mission.status !== 'Déclarée')
    const revenueNotDeclared = notDeclaredMissions.reduce((acc, mission) => acc + +mission.totalPrice, 0)
    return revenueNotDeclared
  }

  const handleTotalClient = (missions) => {
    const clients = missions.map(mission => mission.client)
    const uniqueClients = [...new Set(clients)]
    return uniqueClients.length
  }

  const handleTopClients = (missions) => {
    // handle 5 most recurrent clients from missions
    const clients = missions.map(mission => mission.client)
    const uniqueClients = [...new Set(clients)]
    const topClients = uniqueClients.map(client => {
      const ClientMissions = missions.filter(mission => mission.client === client)
      return { name: ClientMissions[0].name, missions: ClientMissions.length }
    })

    return topClients
  }

  const getMissions = useCallback(async () => {
    try {
      //! => Change user ID from localStorage
      // const response = await axiosInstance.get(`user/${userId}/mission`);
      const response = await axiosInstance.get('/user/1/mission');
      // console.log(response.data)

      // set Mission NUmber
      setTotalMission(response.data.length);

      // set All Missions
      setMissions(response.data);

      //set current missions
      const currentMissionsFromApi = handleCurrentMissions(response.data)
      setCurrentMissions(currentMissionsFromApi)

      //set total mission not declared  
      const totalMissionNotDeclaredFromApi = handleTotalMissionNotDeclared(response.data)
      setTotalMissionNotDeclared(totalMissionNotDeclaredFromApi.length)

      const revenueNotDeclaredFromApi = handleRevenueNotDeclared(response.data)
      setTotalRevenueNotDeclared(revenueNotDeclaredFromApi)

      const totalClientFromApi = handleTotalClient(response.data)
      setTotalClient(totalClientFromApi)

      const topClientsFromApi = handleTopClients(response.data)
      setTopClients(topClientsFromApi)

    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getMissions();
  }, []);
  //========================================
  //DATA A CALCULER:
  // TOTAL CLIENT
  // Total mission 
  // Total mission not declared
  return (
    <>
      <Helmet>
        <title> Dashboard | FreeDash </title>
      </Helmet>

      <Container maxWidth="xl">


        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} md={8}>
            <WelcomeSection />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <CurrentMission displayMissions={currentMissions} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Total de Missons" total={totalMission} color="info" icon={'material-symbols:add-box-outline-rounded'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Total de Clients" total={totalClient} color="warning" icon={'material-symbols:person'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Missions non déclarées" total={totalMissionNotDeclared} price={totalRevenueNotDeclared} color="error" icon={'ic:round-access-time-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <CalendarSection />
          </Grid>


          <Grid item xs={12} sm={6} md={4}>
            <TopClientsSection clients={topClients} />
          </Grid>





        </Grid>
      </Container>
    </>
  )
}