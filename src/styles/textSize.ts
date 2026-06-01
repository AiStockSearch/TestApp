type TextSizeName =
  | 'title'
  | 'description'
  | 'medium'
  | 'small'
  | 'thin';

export const TextSize: Record<TextSizeName, number> = {
  title: 24,
  description: 16,
  medium: 14,
  small: 12,
  thin: 10,
};
