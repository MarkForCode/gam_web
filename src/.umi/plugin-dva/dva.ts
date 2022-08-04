// @ts-nocheck
import { Component } from 'react';
import { ApplyPluginsType } from 'umi';
import dva from 'dva';
// @ts-ignore
import createLoading from '/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/node_modules/dva-loading/dist/index.esm.js';
import { plugin, history } from '../core/umiExports';
import ModelAnnouncement0 from '/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/models/announcement.ts';
import ModelCommodity1 from '/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/models/commodity.ts';
import ModelDeal2 from '/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/models/deal.ts';
import ModelFile3 from '/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/models/file.ts';
import ModelGlobal4 from '/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/models/global.ts';
import ModelLogin5 from '/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/models/login.ts';
import ModelSetting6 from '/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/models/setting.ts';
import ModelUser7 from '/Users/bo_mac01/Documents/workspace/nodejs_workspace/gam_web/src/models/user.ts';

let app:any = null;

export function _onCreate(options = {}) {
  const runtimeDva = plugin.applyPlugins({
    key: 'dva',
    type: ApplyPluginsType.modify,
    initialValue: {},
  });
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    // @ts-ignore
    ...(typeof window !== 'undefined' && window.g_useSSR ? { initialState: window.g_initialProps } : {}),
    ...(options || {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach((plugin:any) => {
    app.use(plugin);
  });
  app.model({ namespace: 'announcement', ...ModelAnnouncement0 });
app.model({ namespace: 'commodity', ...ModelCommodity1 });
app.model({ namespace: 'deal', ...ModelDeal2 });
app.model({ namespace: 'file', ...ModelFile3 });
app.model({ namespace: 'global', ...ModelGlobal4 });
app.model({ namespace: 'login', ...ModelLogin5 });
app.model({ namespace: 'setting', ...ModelSetting6 });
app.model({ namespace: 'user', ...ModelUser7 });
  return app;
}

export function getApp() {
  return app;
}

/**
 * whether browser env
 * 
 * @returns boolean
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
}

export class _DvaContainer extends Component {
  constructor(props: any) {
    super(props);
    // run only in client, avoid override server _onCreate()
    if (isBrowser()) {
      _onCreate()
    }
  }

  componentWillUnmount() {
    let app = getApp();
    app._models.forEach((model:any) => {
      app.unmodel(model.namespace);
    });
    app._models = [];
    try {
      // 释放 app，for gc
      // immer 场景 app 是 read-only 的，这里 try catch 一下
      app = null;
    } catch(e) {
      console.error(e);
    }
  }

  render() {
    let app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
