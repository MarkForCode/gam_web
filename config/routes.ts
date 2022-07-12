export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/backstage',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/backstage/login',
            component: './Backstage/User/login',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
