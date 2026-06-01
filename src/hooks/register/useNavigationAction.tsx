import type { RootStackParamList } from '@/navigation/types';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const useNavigationActions = ({
  onBack,
  onClose,
}: {
  onBack?: () => void;
  onClose?: () => void;
}) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList>
    >();

  return {
    onBack: () => {
      if (onBack) {
        onBack();
      } else {
        navigation.goBack();
      }
    },
    onClose: () => {
      if (onClose) {
        onClose();
      } else {
        navigation.goBack();
      }
    },
  };
};
