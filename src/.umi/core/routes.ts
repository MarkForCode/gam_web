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
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AccountCenter' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/pages/AccountCenter'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/guild",
                "name": "公會",
                "authority": [
                  "ADMIN"
                ],
                "icon": "crown",
                "routes": [
                  {
                    "name": "成員管理",
                    "path": "/guild/admin/account",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__ListAccount' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/pages/ListAccount'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "name": "建立公告",
                    "hideInMenu": true,
                    "path": "/guild/admin/announcement/form",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AnnouncementForm' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/pages/AnnouncementForm'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "name": "查询公告",
                    "authority": [
                      "ADMIN"
                    ],
                    "path": "/guild/admin/announcement",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__ListAnnouncementList' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/pages/ListAnnouncementList'), loading: LoadingComponent}),
                    "exact": true
                  }
                ]
              },
              {
                "path": "/commodity",
                "name": "商品",
                "icon": "gift",
                "authority": [
                  "ADMIN",
                  "NORMAL"
                ],
                "routes": [
                  {
                    "name": "建立商品",
                    "hideInMenu": true,
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
                    "name": "商品管理",
                    "icon": "smile",
                    "path": "/commodity/deal",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__ListDealList' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/pages/ListDealList'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "name": "我的購買清單",
                    "icon": "smile",
                    "path": "/commodity/listmydeallist",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__ListMyDealList' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/pages/ListMyDealList'), loading: LoadingComponent}),
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
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AccountAdvanced' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/pages/AccountAdvanced'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "name": "個人設置",
                    "icon": "smile",
                    "path": "/account/settings",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AccountSettings' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/pages/AccountSettings'), loading: LoadingComponent}),
                    "exact": true
                  }
                ]
              },
              {
                "path": "/guild-announcement/detail/:id",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AnnouncementBasic' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/pages/AnnouncementBasic'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/system-announcement/detail/:id",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AnnouncementBasic' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/pages/AnnouncementBasic'), loading: LoadingComponent}),
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
