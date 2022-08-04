// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from '/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@/components/PageLoading/index';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BlankLayout' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/layouts/BlankLayout'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/user",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__UserLayout' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/layouts/UserLayout'), loading: LoadingComponent}),
        "routes": [
          {
            "name": "login",
            "path": "/user/login",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__User__login' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/pages/User/login'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "注册页",
            "icon": "smile",
            "path": "/user/register",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__UserRegister' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/pages/UserRegister'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      },
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__SecurityLayout' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/layouts/SecurityLayout'), loading: LoadingComponent}),
        "routes": [
          {
            "path": "/",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BasicLayout' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/layouts/BasicLayout'), loading: LoadingComponent}),
            "authority": [
              "ADMIN",
              "NORMAL"
            ],
            "routes": [
              {
                "path": "/",
                "redirect": "/welcome",
                "exact": true
              },
              {
                "path": "/welcome",
                "name": "welcome",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AccountCenter' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/pages/AccountCenter'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/admin",
                "name": "admin",
                "icon": "crown",
                "authority": [
                  "ADMIN",
                  "NORMAL"
                ],
                "routes": [
                  {
                    "name": "帳號管理",
                    "icon": "smile",
                    "path": "/admin/account",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__ListAccount' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/pages/ListAccount'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "name": "建立公告",
                    "icon": "smile",
                    "path": "/admin/announcemnet/form",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AnnouncementForm' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/pages/AnnouncementForm'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "name": "查询表格",
                    "icon": "smile",
                    "path": "/admin/announcement",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__ListAnnouncementList' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/pages/ListAnnouncementList'), loading: LoadingComponent}),
                    "exact": true
                  }
                ]
              },
              {
                "path": "/commodity",
                "name": "商品",
                "icon": "crown",
                "authority": [
                  "ADMIN",
                  "NORMAL"
                ],
                "routes": [
                  {
                    "name": "建立商品",
                    "icon": "smile",
                    "path": "/commodity/form",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__CommodityForm' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/pages/CommodityForm'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "name": "商品查詢",
                    "icon": "smile",
                    "path": "/commodity/list",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__ListCommodity' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/pages/ListCommodity'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "name": "商品明細",
                    "hideInMenu": true,
                    "path": "/commodity/detail/:id",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__CommodityBasic' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/pages/CommodityBasic'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "name": "查询交易",
                    "icon": "smile",
                    "path": "/commodity/deal",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__ListDealList' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/pages/ListDealList'), loading: LoadingComponent}),
                    "exact": true
                  }
                ]
              },
              {
                "name": "个人设置",
                "icon": "smile",
                "path": "/accountsettings",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AccountSettings' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/pages/AccountSettings'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "name": "公會資訊",
                "icon": "smile",
                "path": "/guild",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__GuildAdvanced' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/pages/GuildAdvanced'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/pages/404'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/pages/404'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      }
    ]
  },
  {
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/pages/404'), loading: LoadingComponent}),
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
