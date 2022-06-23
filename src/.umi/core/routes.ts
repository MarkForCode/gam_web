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
          }
        ]
      },
      {
        "path": "/backstage",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__UserLayout' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/layouts/UserLayout'), loading: LoadingComponent}),
        "routes": [
          {
            "name": "login",
            "path": "/backstage/login",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Backstage__User__login' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/pages/Backstage/User/login'), loading: LoadingComponent}),
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
              "admin",
              "user"
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
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Welcome' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/pages/Welcome'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/admin",
                "name": "admin",
                "icon": "crown",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Admin' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/pages/Admin'), loading: LoadingComponent}),
                "authority": [
                  "admin"
                ],
                "routes": [
                  {
                    "path": "/admin/sub-page",
                    "name": "sub-page",
                    "icon": "smile",
                    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Welcome' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/pages/Welcome'), loading: LoadingComponent}),
                    "authority": [
                      "admin"
                    ],
                    "exact": true
                  }
                ]
              },
              {
                "name": "list.table-list",
                "icon": "table",
                "path": "/list",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__TableList' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/pages/TableList'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "name": "群組",
                "icon": "smile",
                "path": "/chatroom",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Chatroom' */'/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/pages/Chatroom'), loading: LoadingComponent}),
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
