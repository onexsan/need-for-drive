import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Order from '../views/Order.vue';
import Login from '../views/Login.vue';
import Sidebar from '../components/layout/Sidebar.vue';
import OrderBlank from '../views/OrderBlank.vue';
import OrderDetailsData from '../views/OrderDetailsData.vue';
import OrderList from '../views/OrderList.vue';

import AdminSidebar from '../components/layout/admin/AdminSidebar.vue';
import AdminHeader from '../components/layout/admin/AdminHeader.vue';
import AdminFooter from '../components/layout/admin/AdminFooter.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    components: {
      default: Home,
      Sidebar: Sidebar,
    },
    meta: {
      title: 'Need For Drive',
    },
  },
  {
    path: '/order/',
    name: 'Order',
    components: {
      default: Order,
      Sidebar: Sidebar,
    },
    meta: {
      title: 'Need For Drive',
    },
  },
  {
    path: '/admin/order-list',
    name: 'OrderList',
    components: {
      default: OrderList,
      Sidebar: AdminSidebar,
      Header: AdminHeader,
      Footer: AdminFooter,
    },
    meta: {
      title: 'Need For Drive',
      layout: 'admin-layout',
    },
  },
  {
    path: '/login/',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Need For Drive',
      layout: 'auth-layout',
    },
  },
  {
    path: '/order-details/:id',
    components: {
      default: OrderBlank,
      Sidebar: Sidebar,
    },
    meta: {
      title: 'Need For Drive',
    },
    children: [{ path: '', component: OrderDetailsData }],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if (previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  next();
});

export default router;
