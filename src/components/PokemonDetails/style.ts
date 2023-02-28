import { ProgressBar, Row } from 'react-bootstrap';
import styled from 'styled-components';

import { BACKGROUND_COLOR_MAP, FOREGROUND_COLOR_MAP } from '../../constants';

interface ICardProps {
  color: string;
}

export const AnimationContainer = styled.div`
  animation: slide-fadein 0.5s ease-out both;

  @keyframes slide-fadein {
    0% {
      opacity: 0;
      transform: translateY(100px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Card = styled.div<ICardProps>`
  width: 100%;
  border-radius: 2rem;
  padding: 3rem;
  color: ${({ color }) =>
    FOREGROUND_COLOR_MAP[color]
      ? FOREGROUND_COLOR_MAP[color]
      : FOREGROUND_COLOR_MAP.default};
  background-color: ${({ color }) =>
    BACKGROUND_COLOR_MAP[color]
      ? BACKGROUND_COLOR_MAP[color]
      : BACKGROUND_COLOR_MAP.default};

  transition: transform 300ms;

  &:hover {
    transform: scale(1.2);
    box-shadow: 0 0 10px #3332;
    z-index: 1;
  }

  @media (max-width: 767px) {
    padding: 1em;
  }
`;

export const Index = styled.span`
  font-size: 3em;
  font-weight: bold;
  opacity: 0.3;
  line-height: 1;

  @media (max-width: 767px) {
    font-size: 1.4em;
  }

  @media (max-width: 575px) {
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 1.2em;
  }
`;

export const ImageContainer = styled.div`
  text-align: center;
  z-index: 1;

  & > img {
    max-width: 350px;
    min-width: 255px;

    @media (max-width: 767px) {
      max-width: 60%;
    }
  }

  &.is-leaving {
    animation: slide-out-right 0.3s both;

    @keyframes slide-out-right {
      0% {
        transform: translateX(0);
        opacity: 1;
      }
      100% {
        transform: translateX(200px);
        opacity: 0;
      }
    }
  }
`;

export const ContentContainer = styled.div`
  background-color: white;
  border-radius: 2rem;
  margin-top: -6rem;
  color: ${BACKGROUND_COLOR_MAP.black};
  padding-top: 60px;

  &.is-leaving {
    animation: slide-out-left 0.3s both;

    @keyframes slide-out-left {
      0% {
        transform: translateX(0);
        opacity: 1;
      }
      100% {
        transform: translateX(-200px);
        opacity: 0;
      }
    }
  }
`;

export const ContentTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
`;

export const MainFeaturesRow = styled(Row)`
  & > .col {
    border-left: solid 1px #e0e0e0;
    border-right: solid 1px #e0e0e0;

    &:first-child {
      border-left: none;
    }

    &:last-child {
      border-right: none;
    }
  }
`;

export const SmallLabel = styled.span`
  font-size: 1.2rem;
  color: #767676;
`;

export const Progress = styled(ProgressBar)`
  height: 3px;
  margin-top: 10px;
`;
