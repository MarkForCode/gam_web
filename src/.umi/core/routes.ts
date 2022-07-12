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
