import colors from '@/styles/colors';

import styled from 'styled-components/native';

export const HeaderBlock = styled.View`
  margin-bottom: 24px;
`;

export const Title = styled.Text`
  font-size: 26px;
  font-weight: 700;
  color: ${colors.text.secondary};
  margin-bottom: 6px;
`;

export const Description = styled.Text`
  font-size: 15px;
  color: ${colors.text.secondary};
`;

export const FooterBlock = styled.View`
  flex: 1;
  justify-content: flex-end;
`;
