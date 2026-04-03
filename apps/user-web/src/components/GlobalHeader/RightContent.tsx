import { Tooltip, Tag } from 'antd';
import type { Settings as ProSettings } from '@ant-design/pro-layout';
import { BgColorsOutlined } from '@ant-design/icons';
import React from 'react';
import type { ConnectProps, Dispatch } from 'umi';
import { connect, SelectLang } from 'umi';
import type { ConnectState } from '@/models/connect';
import Avatar from './AvatarDropdown';
import styles from './index.less';

export type GlobalHeaderRightProps = {
  theme?: ProSettings['navTheme'] | 'realDark';
  darkMode?: boolean;
  dispatch?: Dispatch;
} & Partial<ConnectProps> &
  Partial<ProSettings>;

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = (props) => {
  const { theme, layout, darkMode, dispatch } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }

  const handleDarkModeToggle = () => {
    if (dispatch) {
      dispatch({
        type: 'settings/changeSetting',
        payload: {
          darkMode: !darkMode,
        },
      });
    }
  };

  return (
    <div className={className}>
      <Tooltip title="Toggle Dark Mode">
        <a
          style={{
            color: 'inherit',
          }}
          onClick={handleDarkModeToggle}
          className={styles.action}
        >
          <BgColorsOutlined />
        </a>
      </Tooltip>
      <Avatar />
      {REACT_APP_ENV && (
        <span>
          <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
        </span>
      )}
      <SelectLang className={styles.action} />
    </div>
  );
};

export default connect(({ settings }: ConnectState) => ({
  theme: settings.navTheme,
  layout: settings.layout,
  darkMode: settings.darkMode,
}))(GlobalHeaderRight);
