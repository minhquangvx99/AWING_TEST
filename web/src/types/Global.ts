export type NullableString = string | null | undefined;

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export interface IGlobalTheme {
  [key: string]: any;
  themeColor?: any;
  ligtMode?: any;
  darkMode?: any;
  rtl?: boolean;
  topMenu?: boolean;
  mainContent?: string;
}
