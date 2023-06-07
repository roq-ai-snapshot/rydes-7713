import * as yup from 'yup';
import { transactionValidationSchema } from 'validationSchema/transactions';

export const mobilityProviderValidationSchema = yup.object().shape({
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  transaction: yup.array().of(transactionValidationSchema),
});
