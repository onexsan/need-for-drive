import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Order from '../views/Order.vue';
import OrderBlank from '../views/OrderBlank.vue';
import OrderDetailsData from '../views/OrderDetailsData.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Need For Drive',
    },
  },
  {
    path: '/order/',
    name: 'Order',
    component: Order,
    meta: {
      title: 'Need For Drive',
    },
  },
  {
    path: '/order-details/:id',
    component: OrderBlank,
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
