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
            authority: ['ADMIN', 'NORMAL'],
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
                authority: ['ADMIN', 'NORMAL'],
                routes: [
                  {
                    name: '帳號管理',
                    icon: 'smile',
                    path: '/admin/account',
                    component: './ListAccount',
                  },
                  {
                    name: '建立公告',
                    icon: 'smile',
                    path: '/admin/announcemnetform',
                    component: './AnnouncementForm',
                  },
                ],
              },
              {
                path: '/commodity',
                name: '商品',
                icon: 'crown',
                authority: ['ADMIN', 'NORMAL'],
                routes: [
                  {
                    name: '建立商品',
                    icon: 'smile',
                    path: '/commodity/form',
                    component: './CommodityForm',
                  },
                  {
                    name: '商品查詢',
                    icon: 'smile',
                    path: '/commodity/list',
                    component: './ListCommodity',
                  },
                  {
                    name: '商品明細',
                    hideInMenu: true,
                    path: '/commodity/detail/:id',
                    component: './CommodityBasic',
                  },
                ],
              },
              {
                name: '个人设置',
                icon: 'smile',
                path: '/accountsettings',
                component: './AccountSettings',
              },
              {
                name: '个人中心',
                icon: 'smile',
                path: '/accountcenter',
                component: './AccountCenter',
              },
              {
                name: '公會資訊',
                icon: 'smile',
                path: '/guild',
                component: './GuildAdvanced',
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
