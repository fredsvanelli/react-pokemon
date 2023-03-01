import styled from 'styled-components';

const headerColor = '#c21d1d';

export const HeaderContainer = styled.header`
  display: flex;
  background-color: ${headerColor};
  box-shadow: 0 17px 0 #7a0023;
  height: 80px;
`;

export const BigLed = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  background-color: #fff;
  border-radius: 50%;
  border: solid 2px #000;
  box-shadow: 5px 5px 5px #0006;
  margin-right: 30px;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    width: 80px;
    height: 80px;
    background-color: #6eb6f9;
    border-radius: 50%;
    border: solid 2px #000;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 14px;
    right: 14px;
    display: block;
    width: 65px;
    height: 65px;
    background-color: #0006;
    border-radius: 50%;
  }
`;

export const BigLedShine = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  width: 40px;
  height: 40px;
  background-color: #6eb6f9;
  border-radius: 50%;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 8px;
    display: block;
    width: 15px;
    height: 15px;
    background-color: #b5e1fa;
    border-radius: 50%;
  }
`;

interface ISmallLedProps {
  color: string;
}

export const SmallLed = styled.div<ISmallLedProps>`
  position: relative;
  width: 30px;
  height: 30px;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  border: solid 2px #000;
  box-shadow: 2px 2px 4px #0006;

  &::before {
    content: '●';
    position: absolute;
    top: 2px;
    left: 2px;
    display: block;
    width: 15px;
    height: 15px;
    color: #fffa;
    font-size: 8px;
    background-color: ${({ color }) => color};
    border-radius: 50%;
    z-index: 1;
  }

  &::after {
    content: '';
    display: block;
    width: 28px;
    height: 28px;
    background-color: #0002;
    border-radius: 50%;
  }
`;

export const UnderHeader = styled.div`
  position: relative;
  width: 50%;
  height: 80px;
  background-color: ${headerColor};
  box-shadow: 0 20px 0 #7a0023;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: -100px;
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 100px 100px;
    border-color: transparent transparent transparent #7a0023;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: -80px;
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 80px 80px;
    border-color: transparent transparent transparent ${headerColor};
  }
`;
