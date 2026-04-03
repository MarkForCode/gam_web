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
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['ROOT', 'OPERATOR'],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: 'welcome',
                icon: 'smile',
                component: './Welcome',
              },
              {
                path: '/admin',
                name: 'admin',
                icon: 'crown',
                component: './Admin',
                authority: ['ROOT'],
                routes: [
                  {
                    path: '/admin/sub-page',
                    name: 'sub-page',
                    icon: 'smile',
                    component: './Welcome',
                    authority: ['ROOT'],
                  },
                ],
              },
              {
                name: '帳號查詢',
                icon: 'smile',
                path: '/account',
                component: './ListAccount',
              },
              {
                name: '商品查詢',
                icon: 'smile',
                path: '/commodity',
                component: './ListCommodity',
              },
              {
                name: '帳單查詢',
                icon: 'smile',
                path: '/payment',
                component: './ListPayment',
              },
              {
                path: '/announcement',
                name: '公告',
                icon: 'crown',
                routes: [
                  {
                    name: '建立公告',
                    icon: 'smile',
                    path: '/announcement/form',
                    component: './AnnouncementForm',
                  },
                  {
                    name: '公告查詢',
                    icon: 'smile',
                    path: '/announcement/list',
                    component: './ListAnnouncement',
                  },
                ],
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
