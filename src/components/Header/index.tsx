import { memo } from 'react';

import { Container } from 'react-bootstrap';

import {
  BigLed,
  BigLedShine,
  HeaderContainer,
  SmallLed,
  UnderHeader,
} from './style';

const Header: React.FC = () => (
  <>
    <HeaderContainer>
      <Container className="d-flex py-5">
        <BigLed>
          <BigLedShine />
        </BigLed>
        <div className="d-flex gap-5">
          <SmallLed color="#8f0028" />
          <SmallLed color="#f1d647" />
          <SmallLed color="#3ba635" />
        </div>
      </Container>
    </HeaderContainer>
    <UnderHeader />
  </>
);

export default memo(Header);
