import { Theme } from '@mui/material/styles';
import 'styled-components';
import { spaces } from './theme/spaces';

interface CustomTheme {
  spaces: typeof spaces;
  text: typeof typography; // mui already has a typography property
}

declare module '@mui/material/styles' {
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
