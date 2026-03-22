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
