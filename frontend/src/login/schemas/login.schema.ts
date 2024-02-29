import * as yup from 'yup';
import { EmailSchema } from 'common/validation-schemas/Common.schema';

export const LoginSchema = yup.object({
  email: EmailSchema,
  // Instead of using password creation rules, we'll just let the server validate
  password: yup.string().label('Password').required(),
});
