import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createTransaction } from 'apiSdk/transactions';
import { Error } from 'components/error';
import { transactionValidationSchema } from 'validationSchema/transactions';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { EmployeeInterface } from 'interfaces/employee';
import { MobilityProviderInterface } from 'interfaces/mobility-provider';
import { getEmployees } from 'apiSdk/employees';
import { getMobilityProviders } from 'apiSdk/mobility-providers';
import { TransactionInterface } from 'interfaces/transaction';

function TransactionCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TransactionInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTransaction(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TransactionInterface>({
    initialValues: {
      amount: 0,
      transaction_date: new Date(new Date().toDateString()),
      employee_id: (router.query.employee_id as string) ?? null,
      mobility_provider_id: (router.query.mobility_provider_id as string) ?? null,
    },
    validationSchema: transactionValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Transaction
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="amount" mb="4" isInvalid={!!formik.errors?.amount}>
            <FormLabel>Amount</FormLabel>
            <NumberInput
              name="amount"
              value={formik.values?.amount}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('amount', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.amount && <FormErrorMessage>{formik.errors?.amount}</FormErrorMessage>}
          </FormControl>
          <FormControl id="transaction_date" mb="4">
            <FormLabel>Transaction Date</FormLabel>
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              selected={formik.values?.transaction_date}
              onChange={(value: Date) => formik.setFieldValue('transaction_date', value)}
            />
          </FormControl>
          <AsyncSelect<EmployeeInterface>
            formik={formik}
            name={'employee_id'}
            label={'Select Employee'}
            placeholder={'Select Employee'}
            fetcher={getEmployees}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.user_id}
              </option>
            )}
          />
          <AsyncSelect<MobilityProviderInterface>
            formik={formik}
            name={'mobility_provider_id'}
            label={'Select Mobility Provider'}
            placeholder={'Select Mobility Provider'}
            fetcher={getMobilityProviders}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'transaction',
  operation: AccessOperationEnum.CREATE,
})(TransactionCreatePage);
