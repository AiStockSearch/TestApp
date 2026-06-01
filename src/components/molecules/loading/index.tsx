import { HeaderBlock } from '../../atoms/styled';
import { Title } from '../../atoms/styled';
import { Description } from '../../atoms/styled';
import { ContainerBlock } from '../registerBlock/ContainerBlock';

export const LoadingScreen = () => {
  const actions = {
    onBack: () => {},
    onClose: () => {},
  };
  const translation = {
    navBarTitle: 'Loading...',
    title: 'Loading...',
    description: 'Loading...',
  };
  const progressBarActive = [false, false, false, false];
  return (
    <ContainerBlock
      actions={actions}
      translation={translation}
      progressBarActive={progressBarActive}
    >
      <HeaderBlock>
        <Title>Loading...</Title>
        <Description>Loading...</Description>
      </HeaderBlock>
    </ContainerBlock>
  );
};
