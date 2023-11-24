import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';

export const LoginForm = () => {
  const showPassword = false;

  return (
    <>
      <form>
        <Typography variant="h4" component="h2" gutterBottom>
          Login
        </Typography>
        <Typography variant="body1" gutterBottom>
          Don't have an account? <Link href="/register">Register here</Link>
        </Typography>
        <Stack spacing={2}>
          <FormControl variant="outlined">
            <InputLabel htmlFor="username">Userame</InputLabel>
            <OutlinedInput id="username" required label="Username" />
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              required
              type={showPassword ? 'text' : 'password'}
              label="Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {}}
                    onMouseDown={() => {}}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Button variant="contained" type="submit">
            Log in
          </Button>
        </Stack>
      </form>
    </>
  );
};
