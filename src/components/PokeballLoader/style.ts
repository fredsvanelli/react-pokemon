import styled from 'styled-components';

export const Animation = styled.div`
  display: flex;
  justify-content: center;

  & > div {
    animation: pulse 0.8s infinite;

    @keyframes pulse {
      0% {
        transform: scale(0.3);
        opacity: 1;
      }
      100% {
        transform: scale(0.6);
        opacity: 0;
      }
    }
  }
`;

export const Pokeball = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  background-color: red;
  border-radius: 50%;
  outline: solid 15px black;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 300px;
    height: 150px;
    background-color: white;
    border-radius: 0 0 150px 150px;
    border-top: solid 15px black;
    outline: solid 15px black;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    background-color: white;
    border-radius: 50%;
    outline: solid 15px black;
  }
`;
