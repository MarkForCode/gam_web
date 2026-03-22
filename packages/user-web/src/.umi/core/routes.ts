// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from '/home/markhuang/Documents/workspace/gam_web/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@/components/PageLoading/index';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BlankLayout' */'/home/markhuang/Documents/workspace/gam_web/packages/user-web/src/layouts/BlankLayout'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/user",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__UserLayout' */'/home/markhuang/Documents/workspace/gam_web/packages/user-web/src/layouts/UserLayout'), loading: LoadingComponent}),
        "routes": [
          {
            "name": "login",
            "path": "/user/login",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__User__login' */'/home/markhuang/Documents/workspace/gam_web/packages/user-web/src/pages/User/login'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "注册页",
            "icon": "smile",
            "path": "/user/register",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__UserRegister' */'/home/markhuang/Documents/workspace/gam_web/packages/user-web/src/pages/UserRegister'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      },
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__SecurityLayout' */'/home/markhuang/Documents/workspace/gam_web/packages/user-web/src/layouts/SecurityLayout'), loading: LoadingComponent}),
        "routes": [
          {
            "path": "/",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BasicLayout' */'/home/markhuang/Documents/workspace/gam_web/packages/user-web/src/layouts/BasicLayout'), loading: LoadingComponent}),
            "routes": [
              {
                "path": "/",
                "redirect": "/welcome",
                "exact": true
              },
              {
                "path": "/welcome",
                "name": "首頁",
                "icon": "home",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AccountCenter' */'/home/markhuang/Documents/workspace/gam_web/packages/user-web/src/pages/AccountCenter'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/commodity",
                "name": "商品",
                "icon": "gift",
                "routes": [
                  {
                    "name": "商品查詢",
                    "icon": "smile",
                    "path": "/commodity/list",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__ListCommodity' */'/home/markhuang/Documents/workspace/gam_web/packages/user-web/src/pages/ListCommodity'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "name": "商品明細",
                    "hideInMenu": true,
                    "path": "/commodity/detail/:id",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__CommodityBasic' */'/home/markhuang/Documents/workspace/gam_web/packages/user-web/src/pages/CommodityBasic'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "name": "我的購買清單",
                    "icon": "smile",
                    "path": "/commodity/listmydeallist",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__ListMyDealList' */'/home/markhuang/Documents/workspace/gam_web/packages/user-web/src/pages/ListMyDealList'), loading: LoadingComponent}),
                    "exact": true
                  }
                ]
              },
              {
                "path": "/account",
                "name": "個人",
                "icon": "smile",
                "routes": [
                  {
                    "name": "個人管理",
                    "icon": "smile",
                    "path": "/account/advanced",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AccountAdvanced' */'/home/markhuang/Documents/workspace/gam_web/packages/user-web/src/pages/AccountAdvanced'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "name": "個人設置",
                    "icon": "smile",
                    "path": "/account/settings",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AccountSettings' */'/home/markhuang/Documents/workspace/gam_web/packages/user-web/src/pages/AccountSettings'), loading: LoadingComponent}),
                    "exact": true
                  }
                ]
              },
              {
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/home/markhuang/Documents/workspace/gam_web/packages/user-web/src/pages/404'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/home/markhuang/Documents/workspace/gam_web/packages/user-web/src/pages/404'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      }
    ]
  },
  {
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/home/markhuang/Documents/workspace/gam_web/packages/user-web/src/pages/404'), loading: LoadingComponent}),
    "exact": true
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
