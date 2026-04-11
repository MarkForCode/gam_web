export default [
  {
    path: "/",
    component: "../layouts/BlankLayout",
    routes: [
      {
        path: "/user",
        component: "../layouts/UserLayout",
        routes: [
          {
            name: "login",
            path: "/user/login",
            component: "./User/login",
          },
          {
            name: "注册页",
            icon: "smile",
            path: "/user/register",
            component: "./UserRegister",
          },
        ],
      },
      {
        path: "/",
        component: "../layouts/SecurityLayout",
        routes: [
          {
            path: "/",
            component: "../layouts/BasicLayout",
            routes: [
              {
                path: "/",
                redirect: "/welcome",
              },
              {
                path: "/welcome",
                name: "首頁",
                icon: "home",
                component: "./AccountCenter",
              },
              {
                path: "/commodity",
                name: "商品",
                icon: "gift",
                routes: [
                  {
                    name: "商品查詢",
                    icon: "smile",
                    path: "/commodity/list",
                    component: "./ListCommodity",
                  },
                  {
                    name: "商品明細",
                    hideInMenu: true,
                    path: "/commodity/detail/:id",
                    component: "./CommodityBasic",
                  },
                  {
                    name: "我的購買清單",
                    icon: "smile",
                    path: "/commodity/listmydeallist",
                    component: "./ListMyDealList",
                  },
                  {
                    name: "商品管理",
                    icon: "tool",
                    path: "/commodity/manage",
                    component: "./CommodityManage",
                    authority: ['commodity:list', 'commodity:create', 'commodity:edit', 'commodity:delete'],
                  },
                  {
                    name: "交易管理",
                    icon: "shopping",
                    path: "/deal/manage",
                    component: "./DealManage",
                    authority: ['deal:list', 'deal:process', 'commodity:edit'],
                  },
                ],
              },
              {
                path: "/account",
                name: "個人",
                icon: "smile",
                routes: [
                  {
                    name: "個人管理",
                    icon: "smile",
                    path: "/account/advanced",
                    component: "./AccountAdvanced",
                  },
                  {
                    name: "個人設置",
                    icon: "smile",
                    path: "/account/settings",
                    component: "./AccountSettings",
                  },
                ],
              },
              {
                path: "/wallet",
                name: "錢包",
                icon: "wallet",
                component: "./Wallet",
              },
              {
                path: "/fund",
                name: "資金",
                icon: "fund",
                component: "./Fund",
                authority: ['guild:fund:view', 'guild:fund:manage'],
              },
              {
                path: "/files",
                name: "檔案",
                icon: "file",
                component: "./Files",
              },
              {
                path: "/member",
                name: "會員",
                icon: "team",
                component: "./Member",
                authority: ['member:list', 'member:create', 'member:edit', 'member:delete'],
              },
              {
                path: "/role",
                name: "角色",
                icon: "user",
                component: "./GuildRole",
                authority: ['guild:role:manage'],
              },
              {
                path: "/invite",
                name: "邀請",
                icon: "mail",
                component: "./Invite",
                authority: ['member:invite', 'member:list'],
              },
              {
                component: "./404",
              },
            ],
          },
          {
            component: "./404",
          },
        ],
      },
    ],
  },
  {
    component: "./404",
  },
];