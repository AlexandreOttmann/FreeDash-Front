import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import dayjs from 'dayjs';
// components
import MotionSection from '../../../sections/@dashboard/user/MotionSection';
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


import { axiosPrivateInstance } from '../../../api/axios'



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
    const today = dayjs(); // Date d'aujourd'hui
    const elevenMonthsAgo = today.subtract(11, 'month'); // 11 mois avant aujourd'hui

    const filteredMissions = missions.filter(mission => mission.status === 'Terminé'); // Filtrer les missions avec le statut "Terminé"

    const initialRevenue = filteredMissions
      .filter(mission => dayjs(mission.endDate).isBefore(elevenMonthsAgo)) // Récupérer les missions terminées avant le début de l'année en cours
      .reduce((total, mission) => total + +mission.totalPrice, 0); // Calculer la somme des prix totaux

    const revenueArray = [initialRevenue]; // Tableau initial avec la somme des prix totaux

    // Ajouter le totalPrice des missions aux mois suivants
    for (let i = 1; i < 11; i++) {
      const currentMonth = elevenMonthsAgo.add(i, 'month');
      const totalRevenue = filteredMissions
        .filter(mission => dayjs(mission.endDate).isSame(currentMonth, 'month')) // Filtrer les missions avec une endDate dans le mois courant
        .reduce((total, mission) => total + +mission.totalPrice, revenueArray[i - 1]); // Calculer la somme en tenant compte de la valeur précédente
      revenueArray.push(totalRevenue);
    }
    return revenueArray;
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
    return monthlyRevenue.reverse();
  };



  const getClients = useCallback(async () => {
    try {
      const response = await axiosPrivateInstance.get(`/clients`);


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

  return (
    <>
      <Helmet>
        <title> Dashboard | FreeDash </title>
      </Helmet>

      <Container maxWidth="xl">


        <Grid container spacing={5}>
          <Grid item xs={12} md={12} xl={8}>
            <MotionSection delayTime={0}>
              <WelcomeSection />
            </MotionSection>
          </Grid>

          <Grid item xs={12} lg={12} xl={4} >
            <MotionSection delayTime={0.1}>
              <CurrentMission displayMissions={currentMissions} />
            </MotionSection>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <MotionSection delayTime={0.2}>
              <AppWidgetSummary title="Total de Missons" total={totalMission} color="info" icon={'material-symbols:add-box-outline-rounded'} />
            </MotionSection>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <MotionSection delayTime={0.4}>
              <AppWidgetSummary title="Total de Clients" total={totalClient} color="warning" icon={'material-symbols:person'} />
            </MotionSection>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <MotionSection delayTime={0.6}>
              <AppWidgetSummary title="Missions non déclarées" total={totalMissionNotDeclared} price={totalRevenueNotDeclared} color="error" icon={'ic:round-access-time-filled'} />
            </MotionSection>
          </Grid>


          <Grid item xs={12} sm={6} md={4}>
            <MotionSection delayTime={0.8}>
              <TopClientsSection clients={topClients} />
            </MotionSection>
          </Grid>

          <Grid item xs={12} sm={12} md={8}>
            <MotionSection delayTime={1}>
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
            </MotionSection>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <MotionSection delayTime={1}>
              <CalendarSection />
            </MotionSection>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <MotionSection delayTime={1}>
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
            </MotionSection>
          </Grid>

        </Grid>
      </Container>
    </>
  )
}