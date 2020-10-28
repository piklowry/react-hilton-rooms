import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  margin: ${props => props.margin};
  display: flex;
  flex-direction: column;
  width: 50px;
`;

const Label = styled.label`
  line-height: 1.2;
  margin: 0 0 8px 0;
  text-align: center;
`;

const Select = ({
  margin,
  userType,
  ageNum,
  isDisabled,
  selectValue,
  handleSelectChange,
  name,
  roomNum
}) => {
  return (
    <Container margin={margin}>
      <Label
        htmlFor={`select-${userType}-${roomNum}`}
        data-testid={'select-label-tag'}
      >
        {userType}
        <br />({ageNum})
      </Label>

      <select
        name={name}
        id={`select-${userType}-${roomNum}`}
        value={selectValue}
        onChange={handleSelectChange}
        disabled={isDisabled}
      >
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
    </Container>
  );
};

Container.propTypes = {
  margin: PropTypes.string,
};

Select.propTypes = {
  margin: PropTypes.string,
  userType: PropTypes.string.isRequired,
  ageNum: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  handleSelectChange: PropTypes.func,
  selectValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Select;
