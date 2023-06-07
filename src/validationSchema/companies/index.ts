import * as yup from 'yup';
import { employeeValidationSchema } from 'validationSchema/employees';

export const companyValidationSchema = yup.object().shape({
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  employee: yup.array().of(employeeValidationSchema),
});
