import { createTheme } from '@mui/material';
import { spaces } from './spaces';
import { typography } from './typography';

const theme = createTheme({
  spaces,
  text: typography,
});

export default theme;
