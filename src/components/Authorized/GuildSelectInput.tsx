import { Select } from 'antd';
import React, { useEffect, useState } from 'react';

interface SelectInputValue {
  platform?: string;
  guild?: string;
}
interface SelectInputProps {
  value?: SelectInputValue;
  onChange?: (value: SelectInputValue) => void;
}


interface UserValue {
  label: string;
  value: string;
}

async function fetchPlatformList(): Promise<UserValue[]> {
  return fetch(API_URL + '/api/v1/guild/login/platform')
    .then(response => response.json())
    .then(body => {
      console.log(body);
      return body.map(
        (platform: { id: string, name: string }) => ({
          label: `${platform.name}`,
          value: platform.id,
        }),
      );
    });
}

async function fetchGuildList(platformId: string): Promise<UserValue[]> {
  console.log('fetching guild', platformId);

  return fetch(API_URL + '/api/v1/guild/login/guild?platformId=' + platformId)
    .then(response => response.json())
    .then(body =>
      body.map(
        (guild: { id: string, name: string }) => ({
          label: guild.name,
          value: guild.id,
        }),
      ),
    );
}


const GuildSelectInput: React.FC<SelectInputProps> = ({ onChange }) => {
  const [platformInput, setPlatformInput] = useState<string>('');
  const [guildInput, setGuildInput] = useState<string>('');
  const [platformFetching, setPlatformFetching] = useState(false);
  const [guildFetching, setGuildFetching] = useState(false);
  const [platformOptions, setPlatformOptions] = useState<UserValue[]>([]);
  const [guildOptions, setGuildOptions] = useState<UserValue[]>([]);

  useEffect(() => {
    fetchPlatformList().then((newOptions) => {
      setPlatformOptions(newOptions);
      setPlatformFetching(false);
    })
  }, []);

  const triggerChange = (changedValue: { platform: string, guild: string }) => {
    if (onChange) {
      onChange({ ...changedValue });
    }
  };

  const onChangePlatformInput = (platform: string) => {
    console.log(`selected ${platform}`);
    setPlatformInput(platform);
    setGuildInput('');
    triggerChange({ guild: '', platform: platform });
    
    fetchGuildList(platform).then((newOptions) => {
      setGuildOptions(newOptions);
      setGuildFetching(false);
    })
  };

  const onChangeGuildInput = (guild: string) => {
    console.log(`selected ${guild}`);
    setGuildInput(guild);
    triggerChange({ guild: guild, platform: platformInput });
  };


  return (
    <><Select
      showSearch
      placeholder="Select a platform"
      onChange={onChangePlatformInput}
      options={platformOptions}
      value={platformInput}
    >
    </Select>
      <Select
        showSearch
        placeholder="Select a guild"
        onChange={onChangeGuildInput}
        options={guildOptions}
        value={guildInput}
      >
      </Select></>
  );
}


export default GuildSelectInput;