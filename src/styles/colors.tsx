type Theme = 'light' | 'dark';
import React, { useContext } from 'react';
interface ThemeContextType {
  changeTheme: () => void;
  getCurrentTheme: () => Theme;
}
export const ThemeContext =
  React.createContext<ThemeContextType>({
    changeTheme: () => {},
    getCurrentTheme: () => 'light',
  });

class Colors {
  private static instance: Colors | null = null;
  // 1. Добавляем состояние для хранения текущей темы
  private currentTheme: Theme = 'light';

  // Приватный конструктор для Singleton
  private constructor() {}

  static getInstance() {
    if (!Colors.instance) {
      Colors.instance = new Colors();
    }
    return Colors.instance;
  }

  // 2. Метод для установки конкретной темы
  setTheme(theme: Theme) {
    this.currentTheme = theme;
  }

  // 3. Метод для быстрой смены (инверсии) темы
  toggleTheme() {
    this.currentTheme =
      this.currentTheme === 'light' ? 'dark' : 'light';
  }

  // 4. Получение текущей темы (если понадобится в коде)
  getCurrentTheme(): Theme {
    return this.currentTheme;
  }

  // 5. Метод возвращает цвета в зависимости от выбранной темы
  getColors() {
    const isDark = this.currentTheme === 'dark';

    return {
      text: {
        // Инвертируем: светлый текст на темном фоне, темный на светлом
        primary: isDark ? '#FFFFFF' : '#252526',
        secondary: isDark ? '#BABABA' : '#454545',
        // Акцентные цвета обычно остаются яркими, но можно слегка адаптировать под темный фон
        link: isDark ? '#5CE1E6' : '#05C0E6',
        success: '#00C950',
      },
      input: {
        background: isDark ? '#1E1E1E' : '#FFFFFF',
        disabled: isDark ? '#2D2D2D' : '#F4F5F4',
        border: isDark ? '#454545' : '#D9D9D9',
        text: isDark ? '#FFFFFF' : '#252526',
        error: '#FB2C36',
        placeholder: isDark ? '#A0A0A5' : '#787884',
      },
      checkbox: {
        background: isDark ? '#1E1E1E' : '#FFFFFF',
        border: isDark ? '#454545' : '#D9D9D9',
        text: isDark ? '#FFFFFF' : '#252526',
      },
      background: {
        primary: isDark ? '#1E1E1E' : '#FFFFFF',
        secondary: isDark ? '#252526' : '#F4F5F4',
        tertiary: isDark ? '#454545' : '#D9D9D9',
        quaternary: isDark ? '#787884' : '#A0A0A5',
      },
    };
  }
}
const colors = Colors.getInstance().getColors();

export const useTheme = () => {
  const { changeTheme, getCurrentTheme } =
    useContext(ThemeContext);
  return { theme: getCurrentTheme(), changeTheme };
};

export const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const changeTheme = () => {
    Colors.getInstance().setTheme(
      Colors.getInstance().getCurrentTheme() === 'dark'
        ? 'light'
        : 'dark',
    );
  };
  const getCurrentTheme = () => {
    return Colors.getInstance().getCurrentTheme();
  };
  const value = React.useMemo(
    () => ({
      changeTheme,
      getCurrentTheme,
    }),
    [changeTheme, getCurrentTheme],
  );
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default colors;
