import * as yup from 'yup';
import { transactionValidationSchema } from 'validationSchema/transactions';

export const employeeValidationSchema = yup.object().shape({
  mobility_allowance: yup.number().integer().required(),
  user_id: yup.string().nullable().required(),
  company_id: yup.string().nullable().required(),
  transaction: yup.array().of(transactionValidationSchema),
});
