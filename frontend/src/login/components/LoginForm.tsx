import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@mui/material';
import Button from 'common/components/material/Button';
import Email from 'common/components/material/input/Email';
import Password from 'common/components/material/input/Password';
import useForm from 'common/hooks/useForm';
import useLoginApi from 'login/hooks/useLoginApi';
import { LoginSchema } from 'login/schemas/login.schema';
import { FormProvider } from 'react-hook-form';

const LoginForm: React.FC = () => {
  const { isLoading, mutate: loginUser } = useLoginApi();

  const form = useForm<{ email: string; password: string }>({
    resolver: yupResolver(LoginSchema),
    defaultValues: { email: '' },
  });

  const handleLoginFormSubmit = (formData: any) => {
    loginUser(formData);
  };

  return (
    <FormProvider {...form}>
      <form noValidate onSubmit={form.handleSubmit(handleLoginFormSubmit)}>
        <Stack width="100%" spacing={3}>
          <Email required sx={{ width: 500 }} />
          <Password required />
          <Button btntype="primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
