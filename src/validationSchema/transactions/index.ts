import * as yup from 'yup';

export const transactionValidationSchema = yup.object().shape({
  amount: yup.number().integer().required(),
  transaction_date: yup.date().required(),
  employee_id: yup.string().nullable().required(),
  mobility_provider_id: yup.string().nullable().required(),
});
