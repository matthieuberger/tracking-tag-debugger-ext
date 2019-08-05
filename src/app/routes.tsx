import CloudQueue from '@material-ui/icons/CloudQueue';

// Components
import CookiesContainer from './components/cookiesContainer';
import EventsContainer from './components/eventsContainer';
import ApiCallsContainer from './components/apiCallsContainer';

const Routes = [
  {
    path: '/api-calls',
    sidebarName: 'API Calls',
    navbarName: 'API Calls',
    icon: CloudQueue,
    component: ApiCallsContainer
  },
  {
    path: '/cookies',
    sidebarName: 'Cookies',
    navbarName: 'Cookies',
    icon: CloudQueue,
    component: CookiesContainer,
  },
  {
    path: '/events',
    sidebarName: 'Events',
    navbarName: 'Events',
    icon: CloudQueue,
    component: EventsContainer,
  }

];

export default Routes;
