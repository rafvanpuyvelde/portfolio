import Dashboard from './components/Dashboard';
import Order from './components/Order';
import CustomMix from './components/CustomMix';

export const routes = [
  { path: '', component: Dashboard },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true }  },
  { path: '/order', component: Order, meta: { requiresAuth: true }  },
  { path: '/custom-mix', component: CustomMix, meta: { requiresAuth: true }  },
  { path: '*', component: Dashboard, meta: { requiresAuth: true }  }
];

// TODO: Create routes Auth
