// component
import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;



const sideConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'clients',
    path: '/dashboard/client',
    icon: icon('ic_user'),
  },
  {
    title: 'missions',
    path: '/dashboard/mission',
    icon: icon('ic_cart'),
  },
  {
    title: 'nouvelle mission',
    path: '/dashboard/newmission',
    icon: icon('ic_addmission'),
  },
  {
    title: 'nouveau client',
    path: '/dashboard/newclient',
    icon: icon('ic_addclient'),
  },

];

export default sideConfig;