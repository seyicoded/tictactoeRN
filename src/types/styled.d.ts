import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      title: string;
      subtitle: string;
      transparent: string;
    };
  }
}