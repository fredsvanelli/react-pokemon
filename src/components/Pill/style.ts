import styled from 'styled-components';

interface IPillContainerProps {
  size: string;
  theme: string;
}

export const PillContainer = styled.div<IPillContainerProps>`
  display: inline-block;
  padding: 5px 20px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 40px;
  font-size: 1.6rem;

  @media (max-width: 767px) {
    font-size: 1.2rem;
  }

  @media (max-width: 575px) {
    font-size: 1rem;
    padding: 3px 10px;
  }
`;
