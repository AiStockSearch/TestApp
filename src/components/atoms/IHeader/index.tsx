import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import type { RootStackParamList } from '@/navigation/types';
import { useChangeActivatedLocale } from '@/provider/locales/hooks/useChangeActivatedLocale';
import colors from '@/styles/colors';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
type CustomHeaderProps = {
  onBack?: () => void;
  onClose?: () => void;
  title: string;
  localized?: boolean;
};

const HEADER_HEIGHT = 48;
const ICON_SLOT_SIZE = 48;
const TITLE_FONT_SIZE = 16;
const ICON_FONT_SIZE = 24;

const BACK_ICON = '‹';
const CLOSE_ICON = '×';

export const CustomHeader = ({
  onBack,
  onClose,
  localized,
  title,
}: CustomHeaderProps): React.JSX.Element => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList>
    >();
  const { handleChangeLocale, lang } =
    useChangeActivatedLocale();
  if (localized) {
    onClose = () => {
      handleChangeLocale('en');
    };
  }
  return (
    <View style={styles.navBar}>
      {navigation.canGoBack() && (
        <TouchableOpacity
          disabled={!onBack}
          onPress={onBack}
          style={styles.navButton}
        >
          {onBack ? (
            <Text style={styles.navIcon}>{BACK_ICON}</Text>
          ) : (
            <View style={styles.iconPlaceholder} />
          )}
        </TouchableOpacity>
      )}
      <Text numberOfLines={3} style={styles.navTitle}>
        {title}
      </Text>
      <TouchableOpacity
        disabled={!onClose}
        onPress={onClose}
        style={styles.navButton}
      >
        {onClose ? (
          <Text
            style={[
              styles.navIcon,
              localized ? { fontSize: 16 } : {},
            ]}
          >
            {localized ? lang : CLOSE_ICON}
          </Text>
        ) : (
          <View style={styles.iconPlaceholder} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  iconPlaceholder: {
    height: ICON_SLOT_SIZE,
    width: ICON_SLOT_SIZE,
  },
  navButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: ICON_SLOT_SIZE,
    width: ICON_SLOT_SIZE,
  },
  navBar: {
    alignItems: 'center',
    flexDirection: 'row',
    height: HEADER_HEIGHT,
    justifyContent: 'space-between',
  },
  navIcon: {
    color: colors.text.primary,
    fontSize: ICON_FONT_SIZE,
    fontWeight: '600',
  },
  navTitle: {
    color: colors.text.primary,
    flex: 1,
    paddingHorizontal: 16,
    fontSize: TITLE_FONT_SIZE,
    fontWeight: '600',
    textAlign: 'left',
  },
});
