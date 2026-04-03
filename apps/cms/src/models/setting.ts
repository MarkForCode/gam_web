import type { Reducer } from 'umi';
import type { DefaultSettings } from '../../config/defaultSettings';
import defaultSettings from '../../config/defaultSettings';

export type SettingModelType = {
  namespace: 'settings';
  state: DefaultSettings;
  reducers: {
    changeSetting: Reducer<DefaultSettings>;
  };
};

const updateColorWeak: (colorWeak: boolean) => void = (colorWeak) => {
  const root = document.getElementById('root');
  if (root) {
    root.className = colorWeak ? 'colorWeak' : '';
  }
};

const updateDarkMode: (darkMode: boolean) => void = (darkMode) => {
  const root = document.getElementById('root');
  if (root) {
    if (darkMode) {
      root.classList.add('dark-mode');
    } else {
      root.classList.remove('dark-mode');
    }
  }
};

const SettingModel: SettingModelType = {
  namespace: 'settings',
  state: defaultSettings,
  reducers: {
    changeSetting(state = defaultSettings, { payload }) {
      const { colorWeak, contentWidth, darkMode } = payload;

      if (state.contentWidth !== contentWidth && window.dispatchEvent) {
        window.dispatchEvent(new Event('resize'));
      }
      updateColorWeak(!!colorWeak);
      updateDarkMode(!!darkMode);
      return {
        ...state,
        ...payload,
      };
    },
  },
};
export default SettingModel;
