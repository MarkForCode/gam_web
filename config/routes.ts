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
          {
            name: '注册页',
            icon: 'smile',
            path: '/user/register',
            component: './UserRegister',
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
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: '首頁',
                icon: 'home',
                component: './AccountCenter',
              },
              {
                path: '/guild',
                name: '公會',
                authority: ['ADMIN'],
                icon: 'crown',
                routes: [
                  // {
                  //   name: '公會管理',
                  //   path: '/guild/advanced',
                  //   component: './GuildAdvanced',
                  // },
                  // {
                  //   name: '公會设置',
                  //   path: '/guild/admin/settings',
                  //   component: './GuildSettings',
                  // },
                  {
                    name: '成員管理',
                    path: '/guild/admin/account',
                    component: './ListAccount',
                  },
                  {
                    name: '建立公告',
                    hideInMenu: true,
                    path: '/guild/admin/announcemnet/form',
                    component: './AnnouncementForm',
                  },
                  {
                    name: '查询公告',
                    authority: ['ADMIN'],
                    path: '/guild/admin/announcement',
                    component: './ListAnnouncementList',
                  },
                ],
              },
              {
                path: '/commodity',
                name: '商品',
                icon: 'gift',
                authority: ['ADMIN', 'NORMAL'],
                routes: [
                  {
                    name: '建立商品',
                    hideInMenu: true,
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
                  {
                    name: '商品管理',
                    icon: 'smile',
                    path: '/commodity/deal',
                    component: './ListDealList',
                  },
                  {
                    name: '我的購買清單',
                    icon: 'smile',
                    path: '/commodity/listmydeallist',
                    component: './ListMyDealList',
                  },
                ],
              },
              {
                path: '/account',
                name: '個人',
                icon: 'smile',
                routes: [
                  {
                    name: '個人管理',
                    icon: 'smile',
                    path: '/account/advanced',
                    component: './AccountAdvanced',
                  },
                  {
                    name: '個人設置',
                    icon: 'smile',
                    path: '/account/settings',
                    component: './AccountSettings',
                  },
                ],
              },
              {
                path: '/announcement/detail/:id',
                component: './AnnouncementBasic',
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
