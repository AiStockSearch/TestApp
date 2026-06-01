import colors from '@/styles/colors';

import styled from 'styled-components/native';

export const CardsContainer = styled.View`
  flex: 1;
  gap: 16px;
  margin-bottom: 24px;
`;
export const ClientCard = styled.TouchableOpacity<{
  $isSelected: boolean;
}>`
  flex-direction: row;
  padding: 24px;
  border-radius: 24px;
  border-width: 1px;
  align-items: center;
  border-color: ${({ $isSelected }) =>
    $isSelected ? colors.text.link : colors.text.primary};
  background-color: ${({ $isSelected }) =>
    $isSelected
      ? colors.text.link
      : colors.background.primary};
`;
export const CarrierCard = styled.TouchableOpacity<{
  $isSelected: boolean;
}>`
  flex-direction: row;
  padding: 24px;
  border-radius: 24px;
  border-width: 1px;
  align-items: center;
  border-color: ${({ $isSelected }) =>
    $isSelected ? colors.text.link : colors.text.primary};
  background-color: ${({ $isSelected }) =>
    $isSelected
      ? colors.text.link
      : colors.background.primary};
`;

export const IconContainer = styled.View<{
  $isSelected: boolean;
}>`
  padding: 12px;
  border-radius: 16px;
  background-color: ${({ $isSelected }) =>
    $isSelected
      ? colors.background.primary
      : colors.background.secondary};
`;

export const CardText = styled.View`
  flex: 1;
  margin-left: 16px;
  color: ${colors.text.secondary};
`;
export const CardTitle = styled.Text<{
  $isSelected: boolean;
}>`
  font-size: 18px;
  font-weight: bold;
  color: ${({ $isSelected }) =>
    $isSelected
      ? colors.background.primary
      : colors.text.secondary};
`;

export const CardDescription = styled.Text<{
  $isSelected: boolean;
}>`
  font-size: 14px;
  font-weight: 400;
  color: ${({ $isSelected }) =>
    $isSelected
      ? colors.background.secondary
      : colors.background.quaternary};
`;
