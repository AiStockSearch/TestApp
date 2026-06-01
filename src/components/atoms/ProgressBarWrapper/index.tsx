import colors from '@/styles/colors';

import styled from 'styled-components/native';
const ProgressContainer = styled.View`
  flex-direction: row;
  padding-horizontal: 16px;
  gap: 8px;
  margin-top: 8px;
  margin-bottom: 28px;
`;

const ProgressBar = styled.View<{ $active: boolean }>`
  flex: 1;
  height: 4px;
  background-color: ${({ $active }) =>
    $active ? colors.text.link : colors.input.border};
  border-radius: 2px;
`;

export default function ProgressBarWrapper(deps: {
  $active: boolean[];
}): React.JSX.Element {
  return (
    <ProgressContainer>
      {deps.$active.map((x, idx) => (
        <ProgressBar key={idx} $active={x} />
      ))}
    </ProgressContainer>
  );
}
