import React from 'react';

// 3rd party imports
import styled from 'styled-components';

const Select = styled.select`
  border: 0;
  border-radius: 2px;
  padding: 8px;
  margin: 5px;
`;

const select = props => {
  let selectOptions = [];
  for (let [key, value] of Object.entries(props.options))
    selectOptions.push(
      <option key={key} value={key}>
        {value}
      </option>
    );

  return (
    <Select {...props.domProps}>
      {selectOptions}
    </Select>
  );
};

export default select;
