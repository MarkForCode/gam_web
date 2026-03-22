import React, {useState, useEffect} from 'react';
import {Input, message} from 'antd';
import {SafetyCertificateOutlined} from '@ant-design/icons';
import {useIntl} from "umi";

interface CaptchaInputValue {
  code?: string;
  codeId?: string;
}

interface CaptchaInputProps {
  value?: CaptchaInputValue;
  onChange?: (value: CaptchaInputValue) => void;
}

/**
 * 获取验证码
 */
const getCaptcha = async () => {
  try {
    const data = await fetch(API_URL + `/api/v1/guild/login/captcha/code`, );
    if (data.status == 200) {
      return JSON.parse(await data.text());
    }
  } catch (error) {
    message.error('获取部门树失败,请重试');
    return {};
  }
  message.error('获取部门树失败,请重试');
  return {};
}

const CaptchaInput: React.FC<CaptchaInputProps> = ({value = {}, onChange}) => {

  const intl = useIntl();
  const [uri, setUri] = React.useState<string>('')
  const [codeId, setCodeId] = React.useState('')
  const [code, setCode] = React.useState('')

  // 触发改变
  const triggerChange = (changedValue: { codeId?: string, code?: string }) => {
    if (onChange) {
      onChange({codeId, code, ...value, ...changedValue});
    }
  };

  useEffect(() => {
    getCaptcha().then((data: any) => {
      const url = API_URL + '/api/v1/guild/login/captcha?id=' + data.id;
      setCodeId(codeId);
      setUri(url);
      triggerChange({codeId: data.id});
    })
  }, []);


  // 输入框变化
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value || '';
    if (code != '') {
        setCode(code);
    }
    triggerChange({code: code});
  }

  // 时间类型变化
  const onClickImage = async () => {
    const response = await getCaptcha();
    setCodeId(response.id);
    setUri(API_URL + '/api/v1/guild/login/captcha?id=' + response.id);
    triggerChange({codeId: response.id});
  };

  return (
    <span>
       <Input.Group compact>
          <Input prefix={<SafetyCertificateOutlined style={{color: "#319cff"}}/>} placeholder={intl.formatMessage({
            id: 'pages.login.captcha.placeholder',
            defaultMessage: '请输入验证码',
          })}
                 onChange={onChangeInput}
                 style={{width: '75%', marginRight: 5, padding: '6.5px 11px 6.5px 11px', verticalAlign: 'middle'}}/>
                   <img style={{width: '23%', height: '35px', verticalAlign: 'middle', padding: '0px 0px 0px 0px'}}
                        src={uri} onClick={onClickImage}/>
       </Input.Group>
    </span>
  );
};
export default CaptchaInput;