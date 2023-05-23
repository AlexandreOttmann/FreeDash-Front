import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';

// components
import Iconify from '../../../components/iconify/Iconify';


// sections
import WelcomeSection from './Sections/WelcomeSection';
import CurrentMission from './Sections/CurrentMission';
import AppWidgetSummary from './Sections/AppWidgetSummary';
import TopClientsSection from './Sections/TopClientsSection';
import CalendarSection from './Sections/CalendarSection';
import YearlyRevenueSection from './Sections/YearlyRevenueSection';
import TotalYearlyRevenue from './Sections/TotalYearlyRevenue';
//utils
import { retrieveUserId } from '../../../utils/retrieveUserId';
import { retrieveUserData } from '../../../store/reducers/user';

import { axiosInstance, axiosPrivateInstance } from '../../../api/axios'
import { last } from 'lodash';
import { fi } from 'date-fns/locale';


export default function DashboardPage() {
  const theme = useTheme();

  const [missions, setMissions] = useState([]);
  const [lastMonths, setLastMonths] = useState([])
  const [topClients, setTopClients] = useState([])

  const [clients, setClients] = useState([]);
  const [currentMissions, setCurrentMissions] = useState([]);
  const [totalClient, setTotalClient] = useState(0);
  const [totalMission, setTotalMission] = useState(0);


  const [revenueEvolution, setRevenueEvolution] = useState([]) // array of revenue evolution
  const [monthlyRevenue, setMonthlyRevenue] = useState([]) // array of revenue evolution  

  const [totalMissionNotDeclared, setTotalMissionNotDeclared] = useState(0);
  const [totalRevenueNotDeclared, setTotalRevenueNotDeclared] = useState(0);
  const [totalRevenueDeclared, setTotalRevenueDeclared] = useState(0);

  //FETCH 1 : Missions List
  //FETCH 2 : Clients List
  const userId = retrieveUserId()


  const handleCurrentMissions = (missions) => {
    const currentMissions = missions.filter(mission => mission.status === 'En Cours')
    return currentMissions
  }
  const handleTotalMissionNotDeclared = (missions) => {
    const notDeclaredMissions = missions.filter(mission => !mission.declarate)
    return notDeclaredMissions
  }

  const handleRevenueNotDeclared = (missions) => {
    const notDeclaredMissions = missions.filter(mission => !mission.declarate)
    const revenueNotDeclared = notDeclaredMissions.reduce((acc, mission) => acc + +mission.totalPrice, 0)
    return revenueNotDeclared
  }

  const handleRevenueDeclared = (missions) => {
    const declaredMissions = missions.filter(mission => mission.declarate)
    const revenueDeclared = declaredMissions.reduce((acc, mission) => acc + +mission.totalPrice, 0)
    return revenueDeclared
  }

  const handleTotalClient = (clients) => {
    return clients.length
  }

  const handleTopClients = (missions) => {
    // handle 5 most recurrent clients from missions
    // we got a value mission.clientFirstName and clientLastName to check the client name, we need to take it into account
    const topClients = missions.reduce((acc, mission) => {
      const clientName = `${mission.clientFirstName} ${mission.clientLastName}`
      if (!acc[clientName]) {
        acc[clientName] = { name: clientName, missions: [mission] }
      } else {
        acc[clientName].missions.push(mission)
      }
      return acc
    }
      , {})
    const topClientsArray = Object.values(topClients)
    topClientsArray.sort((a, b) => b.missions.length - a.missions.length)
    return topClientsArray.slice(0, 5)
  }

  const handleRevenueEvolution = (missions) => {
    // get the missions with status "Terminé"
    const filteredMissions = missions.filter(mission => mission.status !== 'En Cours' && new Date(mission.endDate) > new Date(new Date().setMonth(new Date().getMonth() - 11)))

    filteredMissions.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
    const revenueEvolution = new Array(11).fill(0);
    let previousRevenue = 0;

    filteredMissions.forEach(mission => {
      previousRevenue += +mission.totalPrice

      const endDate = new Date(mission.endDate)
      const monthIndex = Math.abs(new Date().getMonth() + endDate.getMonth());
      revenueEvolution[monthIndex + 2] = previousRevenue
    })
    console.log('revenueEvolution', revenueEvolution)
    return revenueEvolution
  }

  const lastElevenMonths = () => {
    const dates = [];
    const today = new Date();

    for (let i = 10; i >= 0; i--) {
      const month = new Date(today.getFullYear(), today.getMonth() - i);
      const formattedDate = `${(month.getMonth() + 1).toString().padStart(2, '0')}/${month.getDate().toString().padStart(2, '0')}/${month.getFullYear()}`;
      dates.push(formattedDate);
    }

    return dates
  }


  const handleMonthlyRevenue = (missions) => {
    const filteredMissions = missions.filter(mission => mission.status !== 'En Cours' && new Date(mission.endDate) > new Date(new Date().setMonth(new Date().getMonth() - 11)));
    console.log('filtered', filteredMissions);

    const monthlyRevenue = new Array(11).fill(0);

    filteredMissions.forEach(mission => {
      const startDate = new Date(mission.startDate);
      const endDate = new Date(mission.endDate);
      const startMonth = startDate.getMonth();
      const endMonth = endDate.getMonth();
      const startYear = startDate.getFullYear();
      const endYear = endDate.getFullYear();

      const monthDiff = (endYear - startYear) * 12 + (endMonth - startMonth);
      const totalMonths = Math.min(monthDiff + 1, 11);

      const startOffset = new Date().getMonth() - startMonth;
      const endOffset = new Date().getMonth() - endMonth;

      for (let i = 0; i < totalMonths; i++) {
        const monthIndex = (startOffset + i + 11) % 11;
        monthlyRevenue[monthIndex] += +mission.totalPrice / totalMonths;
      }
    });

    console.log('monthlyRevenue', monthlyRevenue);
    return monthlyRevenue.reverse();
  };



  const getClients = useCallback(async () => {
    try {
      const response = await axiosPrivateInstance.get(`/clients`);
      // const response = await axiosInstance.get(`/user/1/clients`);

      setClients(response.data);

      const totalClientFromApi = handleTotalClient(response.data)
      setTotalClient(totalClientFromApi)
    } catch (error) {
      console.log(error);
    }
  }, []);


  const getMissions = useCallback(async () => {
    try {
      //! => Change user ID from localStorage
      const response = await axiosPrivateInstance.get(`/mission`);
      // const response = await axiosInstance.get('/user/1/mission');

      // set Mission Number
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

      const revenueDeclaredFromApi = handleRevenueDeclared(response.data)
      setTotalRevenueDeclared(revenueDeclaredFromApi)

      const topClientsFromApi = handleTopClients(response.data)
      console.log('TOP CLIENT', topClientsFromApi)
      setTopClients(topClientsFromApi)

      const revenueEvolutionFromApi = handleRevenueEvolution(response.data)
      setRevenueEvolution(revenueEvolutionFromApi)

      const monthlyRevenueFromApi = handleMonthlyRevenue(response.data)
      setMonthlyRevenue(monthlyRevenueFromApi)
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getMissions();
    getClients();
    const months = lastElevenMonths()
    setLastMonths(months)
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
          <Grid item xs={12} sm={8} md={8}>
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
            <TopClientsSection clients={topClients} />
          </Grid>

          <Grid item xs={12} sm={12} md={8}>
            <YearlyRevenueSection
              title="Evolution du chiffre d'affaire"
              subheader="sur les derniers mois"
              chartLabels={lastMonths}
              chartData={[
                {
                  name: "Chiffre d'affaire mensuel",
                  type: 'column',
                  fill: 'solid',
                  data: monthlyRevenue,
                },
                {
                  name: "Evolution du chiffre d'affaire",
                  type: 'area',
                  fill: 'gradient',
                  data: revenueEvolution
                },
              ]} />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <CalendarSection />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <TotalYearlyRevenue
              title="Répartition des revenus"
              chartData={[
                { label: 'Revenus non déclarés', value: totalRevenueNotDeclared },
                { label: 'Revenus déclarés', value: totalRevenueDeclared },

              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}