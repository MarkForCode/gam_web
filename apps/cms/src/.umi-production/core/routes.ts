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
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BlankLayout' */'/home/markhuang/Documents/workspace/gam_web/packages/cms/src/layouts/BlankLayout'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/user",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__UserLayout' */'/home/markhuang/Documents/workspace/gam_web/packages/cms/src/layouts/UserLayout'), loading: LoadingComponent}),
        "routes": [
          {
            "name": "login",
            "path": "/user/login",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__User__login' */'/home/markhuang/Documents/workspace/gam_web/packages/cms/src/pages/User/login'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      },
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__SecurityLayout' */'/home/markhuang/Documents/workspace/gam_web/packages/cms/src/layouts/SecurityLayout'), loading: LoadingComponent}),
        "routes": [
          {
            "path": "/",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BasicLayout' */'/home/markhuang/Documents/workspace/gam_web/packages/cms/src/layouts/BasicLayout'), loading: LoadingComponent}),
            "authority": [
              "ROOT",
              "OPERATOR"
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
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Welcome' */'/home/markhuang/Documents/workspace/gam_web/packages/cms/src/pages/Welcome'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/admin",
                "name": "admin",
                "icon": "crown",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Admin' */'/home/markhuang/Documents/workspace/gam_web/packages/cms/src/pages/Admin'), loading: LoadingComponent}),
                "authority": [
                  "ROOT"
                ],
                "routes": [
                  {
                    "path": "/admin/sub-page",
                    "name": "sub-page",
                    "icon": "smile",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Welcome' */'/home/markhuang/Documents/workspace/gam_web/packages/cms/src/pages/Welcome'), loading: LoadingComponent}),
                    "authority": [
                      "ROOT"
                    ],
                    "exact": true
                  }
                ]
              },
              {
                "name": "帳號查詢",
                "icon": "smile",
                "path": "/account",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__ListAccount' */'/home/markhuang/Documents/workspace/gam_web/packages/cms/src/pages/ListAccount'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "name": "商品查詢",
                "icon": "smile",
                "path": "/commodity",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__ListCommodity' */'/home/markhuang/Documents/workspace/gam_web/packages/cms/src/pages/ListCommodity'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "name": "帳單查詢",
                "icon": "smile",
                "path": "/payment",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__ListPayment' */'/home/markhuang/Documents/workspace/gam_web/packages/cms/src/pages/ListPayment'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/announcement",
                "name": "公告",
                "icon": "crown",
                "routes": [
                  {
                    "name": "建立公告",
                    "icon": "smile",
                    "path": "/announcement/form",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AnnouncementForm' */'/home/markhuang/Documents/workspace/gam_web/packages/cms/src/pages/AnnouncementForm'), loading: LoadingComponent}),
                    "exact": true
                  },
                  {
                    "name": "公告查詢",
                    "icon": "smile",
                    "path": "/announcement/list",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__ListAnnouncement' */'/home/markhuang/Documents/workspace/gam_web/packages/cms/src/pages/ListAnnouncement'), loading: LoadingComponent}),
                    "exact": true
                  }
                ]
              },
              {
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/home/markhuang/Documents/workspace/gam_web/packages/cms/src/pages/404'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/home/markhuang/Documents/workspace/gam_web/packages/cms/src/pages/404'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      }
    ]
  },
  {
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/home/markhuang/Documents/workspace/gam_web/packages/cms/src/pages/404'), loading: LoadingComponent}),
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
