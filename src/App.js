import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Select from './components/Select';
import Heading from './components/Heading';
import { usePersistentState } from './localstorage';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 24px 40px;
`;

const FormBody = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 4px;
  margin: 24px 0 0 0;
  width: 200px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #ebebeb;
    transform: scale(1.04);
  }
`;

const RoomContainer = styled.section`
  padding: 48px;
  background-color: white;
  margin-top: 16px;
  margin-right: ${props => props.marginRight || 0}px;
  box-shadow: 5px 5px 20px 0px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border-radius: 12px;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 5px 5px 20px 0px rgba(0, 0, 0, 0.15);
  }
`;

const SelectWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SubmitWrapper = styled.div`
	margin-top: 48px;
	width: 360px;
`;


function App() {
  const [submitted, setSubmitted] = useState(false);

  const [roomValuesAll, setRoomValuesAll] = usePersistentState('data', [
    {
      room: 1,
      adult: 0,
      child: 0,
      hasCheck: false,
      isChecked: null,
      isDisabled: false
    },
    {
      room: 2,
      adult: 0,
      child: 0,
      hasCheck: true,
      isChecked: false,
      isDisabled: true
    },
    {
      room: 3,
      adult: 0,
      child: 0,
      hasCheck: true,
      isChecked: false,
      isDisabled: true
    },
    {
      room: 4,
      adult: 0,
      child: 0,
      hasCheck: true,
      isChecked: false,
      isDisabled: true
    }
  ]);

  // When Room 4 is changed
  useEffect(() => {
    setRoomValuesAll(
      roomValuesAll.map(item => {
        // If Room 4 is checked, all rooms get checked
        if (roomValuesAll[3].isChecked === true && item.room <= 3) {
          return {
            ...item,
            isChecked: roomValuesAll[3].isChecked
          };
        }
        // If Room 4 is unchecked, all other rooms keep their state
        if (roomValuesAll[3].isChecked === false && item.room <= 3) {
          return item;
        }
        // If Room 4 is unchecked, clear Room 4 values
        if (roomValuesAll[3].isChecked === false && item.room === 4) {
          return {
            ...item,
            adult: 0,
            child: 0
          };
        }
        return item;
      })
    );
  }, [roomValuesAll[3].isChecked]);

  // When Room 3 is changed
  useEffect(() => {
    setRoomValuesAll(
      roomValuesAll.map(item => {
        // If Room 3 is checked, Room 2 gets checked
        if (roomValuesAll[2].isChecked === true && item.room <= 2) {
          return {
            ...item,
            isChecked: roomValuesAll[2].isChecked
          };
        }
        // If Room 3 is unchecked, Room 4 must be unchecked and Room 4 values cleared
        if (roomValuesAll[2].isChecked === false && item.room >= 4) {
          return {
            ...item,
            isChecked: roomValuesAll[2].isChecked,
            adult: 0,
            child: 0
          };
        }
        // If Room 3 is unchecked, clear Room 3 values
        if (roomValuesAll[2].isChecked === false && item.room === 3) {
          return {
            ...item,
            adult: 0,
            child: 0
          };
        }
        return item;
      })
    );
  }, [roomValuesAll[2].isChecked]);

  // When Room 2 is changed
  useEffect(() => {
    setRoomValuesAll(
      roomValuesAll.map(item => {
        // If Room 2 is unchecked, Room 3 & 4 must be unchecked, and Room 3 & 4 values cleared
        if (roomValuesAll[1].isChecked === false && item.room >= 3) {
          return {
            ...item,
            isChecked: roomValuesAll[1].isChecked,
            adult: 0,
            child: 0
          };
        }
        // If Room 2 is unchecked, clear Room 2 values
        if (roomValuesAll[2].isChecked === false && item.room === 2) {
          return {
            ...item,
            adult: 0,
            child: 0
          };
        }
        return item;
      })
    );
  }, [roomValuesAll[1].isChecked]);

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    console.table(roomValuesAll);
  };

  const handleCheckboxChange = roomNum => {
    setRoomValuesAll(
      roomValuesAll.map(item => {
        if (item.room === roomNum) {
          return {
            ...item,
            isChecked: !item.isChecked
          };
        }
        return item;
      })
    );
  };

  const handleSelectChange = (name, roomNum, e) => {
    setRoomValuesAll(
      roomValuesAll.map(item => {
        if (name === 'adult' && item.room === roomNum) {
          return {
            ...item,
            adult: e.target.value
          };
        }
        if (name === 'child' && item.room === roomNum) {
          return {
            ...item,
            child: e.target.value
          };
        }
        return item;
      })
    );
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormBody>
          {roomValuesAll.map(item => (
            <RoomContainer key={item.room} marginRight={item.room < 4 ? 16 : 0}>
              <Heading
                hasCheck={item.hasCheck}
                roomNum={item.room}
                isChecked={item.isChecked}
                onCheckboxChange={() => handleCheckboxChange(item.room)}
                isDisabled={item.isDisabled}
              />

              <SelectWrapper>
                {/* ADULT DROPDOWN */}
                <Select
                  userType={'Adult'}
                  margin={'0 16px 0 0'}
                  ageNum={'18+'}
                  isDisabled={item.room < 2 ? false : !item.isChecked}
                  selectValue={item.adult}
                  handleSelectChange={e =>
                    handleSelectChange('adult', item.room, e)
                  }
                  name={'adult'}
                  roomNum={item.room}
                />

                {/* CHILD DROPDOWN */}
                <Select
									margin={'0'}
                  userType={'Child'}
                  ageNum={'0-17'}
                  isDisabled={item.room < 2 ? false : !item.isChecked}
                  selectValue={item.child}
                  handleSelectChange={e =>
                    handleSelectChange('child', item.room, e)
                  }
                  name={'child'}
                  roomNum={item.room}
                />
              </SelectWrapper>
            </RoomContainer>
          ))}
        </FormBody>

        <Button data-testid={'app-button-submit'} type="submit">
          SUBMIT
        </Button>
      </Form>

      {submitted && (
        <SubmitWrapper
          data-testid={'app-div-data'}
        >
          <>
            <strong>Submitted User Data (also printed to console):</strong>
            <br />
            {roomValuesAll.map(item => (
              <div key={item.room}>
                <p>Room: {item.room}</p>
                <p>Adults: {item.adult}</p>
                <p>Children: {item.child}</p>
                <hr />
              </div>
            ))}
          </>
        </SubmitWrapper>
      )}
    </Container>
  );
}

export default App;
