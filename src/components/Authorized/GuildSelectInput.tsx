import { Select } from 'antd';
import React, { useEffect, useState } from 'react';

interface SelectInputValue {
  value1?: string;
}
interface SelectInputProps {
  value?: SelectInputValue;
  onChange?: (value: SelectInputValue) => void;
}


interface UserValue {
  label: string;
  value: string;
}

async function fetchUserList(username: string): Promise<UserValue[]> {
  console.log('fetching user', username);

  return fetch('https://randomuser.me/api/?results=5')
    .then(response => response.json())
    .then(body =>
      body.results.map(
        (user: { name: { first: string; last: string }; login: { username: string } }) => ({
          label: `${user.name.first} ${user.name.last}`,
          value: user.login.username,
        }),
      ),
    );
}


const GuildSelectInput: React.FC<SelectInputProps> = ({value = {}, onChange}) => {
  const [valueInput1, setValueInput1] = useState<string>('');
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<UserValue[]>([]);

  const triggerChange = (changedValue: { value1: string }) => {
    if (onChange) {
      onChange({...changedValue});
    }
  };

  const onChangeInput = (value: string) => {
    console.log(`selected ${value}`);
    setValueInput1(value);
    triggerChange({value1: value});
  };

  const onSearchInput = (value: string) => {
    console.log('search:', value);
    fetchUserList(value).then((newOptions) => {
      setOptions(newOptions);
      setFetching(false);
    })
  };

  return (
    <Select
      showSearch
      placeholder="Select a person"
      onChange={onChangeInput}
      onSearch={onSearchInput}
      options={options}
    >
    </Select>
  );
}


export default GuildSelectInput;