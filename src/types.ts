/**
 * MD2HTML Converter Types
 */

export interface IConfigOption {
  id?: string;
  label: string;
  value: string;
  desc?: string;
}

export interface Theme {
  base?: Record<string, string>;
  block?: Record<string, Record<string, string>>;
  inline?: Record<string, Record<string, string>>;
}

export interface ThemeStyles {
  [key: string]: string;
}

export interface IOpts {
  theme: Theme;
  fonts: string;
  size: string;
  isUseIndent: boolean;
}

export interface ExtendedProperties {
  [key: string]: any;
}
