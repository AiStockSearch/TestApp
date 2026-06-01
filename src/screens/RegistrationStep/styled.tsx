import colors from '@/styles/colors';

import styled from 'styled-components/native';

export const InfoRowContainerWrapper = styled.View`
  gap: 12;
  margin-top:32px;
  margin-bottom: 32px;
  justify-content: space-between;
  border-bottom-width: 1, 
  border-bottom-color: ${colors.input.border},
`;

export const CardContainer = styled.View`
  padding: 16px;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.input.border};
`;

export const InfoRowContainer = styled.View`
  gap: 12;
  justify-content: space-between;
  flex-direction: row;
  align-items: flex-end;
  border-bottom-width: 1, 
  border-bottom-color: ${colors.input.border},
`;
