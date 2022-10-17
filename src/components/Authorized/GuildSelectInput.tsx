import { Select, Spin } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
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

export async function fetchPlatformList(): Promise<UserValue[]> {
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

async function fetchGuildList(platformId: string, key?: string): Promise<UserValue[]> {
  console.log('fetching guild', platformId);
  let url = API_URL + '/api/v1/guild/login/guild?platformId=' + platformId;
  if (key) {
    url += `&key=${key}`
  }
  return fetch(url)
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


  const fetchRef = useRef(0);
  const onSearchGuildInput = useMemo(() => {
    const loadOptions = (playfrom: string, value: string) => {

      console.log(playfrom, value);
      fetchGuildList(playfrom, value).then(newOptions => {
        console.log(newOptions)
        setGuildOptions(newOptions);
        setGuildFetching(false);
      });
    };

    return debounce(loadOptions, 800);
  }, [fetchGuildList]);


  const onChangeGuildInput = (guild: string) => {
    console.log(`selected ${guild}`);
    setGuildInput(guild);
    triggerChange({ guild: guild, platform: platformInput });
  };

  return (
    <>
      <Select
        showSearch
        placeholder="Select a platform"
        onChange={onChangePlatformInput}
        options={platformOptions}
        value={platformInput}
      >
      </Select>
      <Select
        showSearch
        filterOption={false}
        placeholder="Select a guild"
        onSearch={(value) => {
          onSearchGuildInput(platformInput, value)
        }}
        notFoundContent={guildFetching ? <Spin size="small" /> : null}
        onChange={onChangeGuildInput}
        options={guildOptions}
        value={guildInput}
      >
      </Select>
    </>
  );
}


export default GuildSelectInput;