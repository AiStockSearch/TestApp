import styled from 'styled-components/native';

interface IActiveDotProps {
  isActive: boolean;
}

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 40px;
`;

export const Header = styled.View`
  margin-top: 40px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: #131a29;
`;

export const DotsContainer = styled.View`
  flex-direction: row;
  gap: 16px;
  margin-vertical: 20px;
`;

// Динамически меняем цвет в зависимости от состояния заполнения точки
export const Dot = styled.View<IActiveDotProps>`
  width: 14px;
  height: 14px;
  border-radius: 7px;
  background-color: ${(props) =>
    props.isActive ? '#00C2E0' : '#E4E7EC'};
`;

export const KeyboardContainer = styled.View`
  width: 85%;
  gap: 24px;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const KeyButton = styled.Pressable`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  justify-content: center;
  align-items: center;
`;

export const KeyText = styled.Text`
  font-size: 28px;
  font-weight: 400;
  color: #131a29;
`;

export const ActionText = styled.Text`
  font-size: 16px;
  color: #131a29;
`;

export const ForgotButton = styled.Pressable`
  margin-bottom: 10px;
  padding: 10px;
`;

export const ForgotText = styled.Text`
  font-size: 16px;
  color: #131a29;
  font-weight: 500;
`;
