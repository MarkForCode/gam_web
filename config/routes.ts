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
                component: './AccountCenter',
              }, // {
              //   path: '/admin',
              //   name: 'admin',
              //   icon: 'crown',
              //   authority: ['ADMIN', 'NORMAL'],
              //   routes: [
              //     {
              //       name: '公會设置',
              //       icon: 'smile',
              //       path: '/admin/guildsettings',
              //       component: './GuildSettings',
              //     },
              //     {
              //       name: '帳號管理',
              //       icon: 'smile',
              //       path: '/admin/account',
              //       component: './ListAccount',
              //     },
              //     {
              //       name: '建立公告',
              //       icon: 'smile',
              //       path: '/admin/announcemnet/form',
              //       component: './AnnouncementForm',
              //     },
              //     {
              //       name: '查询公告',
              //       icon: 'smile',
              //       path: '/admin/announcement',
              //       component: './ListAnnouncementList',
              //     },
              //     {
              //       name: '帳務管理',
              //       icon: 'smile',
              //       path: '/admin/listfinancelist',
              //       component: './ListFinanceList',
              //     },
              //   ],
              // },
              {
                path: '/commodity',
                name: '商品',
                icon: 'crown',
                authority: ['ADMIN', 'NORMAL'],
                routes: [
                  {
                    // name: '建立商品',
                    // icon: 'smile',
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
                name: '个人设置',
                icon: 'smile',
                path: '/accountsettings',
                component: './AccountSettings',
              },
              {
                path: '/announcement/detail/:id',
                component: './AnnouncementBasic',
              }, 
              // {
              //   name: '公會資訊',
              //   icon: 'smile',
              //   path: '/guild',
              //   component: './GuildAdvanced',
              // },
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
