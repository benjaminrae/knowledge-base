import { LoginForm } from '../../components/LoginForm';
import { Page } from '../../components/Page';

export const LoginPage = () => {
  return (
    <Page
      breadcrumbs={[
        {
          content: 'Login',
          link: '/login',
        },
      ]}
    >
      <LoginForm />
    </Page>
  );
};
