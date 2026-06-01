import React, { useState } from 'react';

import {
  ActionText,
  Container,
  Dot,
  DotsContainer,
  KeyboardContainer,
  KeyButton,
  KeyText,
  Row,
} from './styled';
import { Header, Title } from './styled';

export default function CreatePinScreen({
  onComplete,
  onClose,
  title,
}: {
  onComplete: (pin: string) => void;
  onClose: () => void;
  title: string;
}): React.JSX.Element {
  const [currentPin, setCurrentPin] = useState('');

  const handleKeyPress = (val: string) => {
    if (currentPin.length < 4) {
      const newPin = currentPin + val;
      setCurrentPin(newPin);

      if (newPin.length === 4) {
        setTimeout(() => {
          onComplete(newPin);
        }, 300);
      }
    }
  };

  const handleBackspace = () => {
    setCurrentPin(currentPin.slice(0, -1));
  };

  return (
    <Container>
      <Header>
        <Title>{title}</Title>
      </Header>
      <DotsContainer>
        {[0, 1, 2, 3].map((index) => (
          <Dot
            key={index}
            isActive={index < currentPin.length}
          />
        ))}
      </DotsContainer>
      <KeyboardContainer>
        {[
          ['1', '2', '3'],
          ['4', '5', '6'],
          ['7', '8', '9'],
        ].map((row, rIdx) => (
          <Row key={rIdx}>
            {row.map((num) => (
              <KeyButton
                key={num}
                onPress={() => handleKeyPress(num)}
              >
                <KeyText>{num}</KeyText>
              </KeyButton>
            ))}
          </Row>
        ))}

        <Row>
          <KeyButton onPress={onClose}>
            <ActionText>Выйти</ActionText>
          </KeyButton>
          <KeyButton onPress={() => handleKeyPress('0')}>
            <KeyText>0</KeyText>
          </KeyButton>
          <KeyButton onPress={handleBackspace}>
            <KeyText style={{ fontSize: 24 }}>⌫</KeyText>
          </KeyButton>
        </Row>
      </KeyboardContainer>
    </Container>
  );
}
