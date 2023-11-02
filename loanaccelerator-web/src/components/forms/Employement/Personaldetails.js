import {onChange,onSearch} from 'react' ;
const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };
  const App = () => (
    <Select
      showSearch
      placeholder="Select a person"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={[
        {
          value: 'accepted',
          label: 'Accepted',
        },
        {
          value: 'pending',
          label: 'Pending',
        },
        {
          value: 'rejected',
          label: 'Rejected',
        },
      ]}
    />
  );