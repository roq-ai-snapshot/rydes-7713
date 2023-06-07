import AppLayout from 'layout/app-layout';
import NextLink from 'next/link';
import React, { useState } from 'react';
import { Text, Box, Spinner, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, Link } from '@chakra-ui/react';
import { UserSelect } from 'components/user-select';
import { getTransactionById } from 'apiSdk/transactions';
import { Error } from 'components/error';
import { TransactionInterface } from 'interfaces/transaction';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AccessOperationEnum, AccessServiceEnum, useAuthorizationApi, withAuthorization } from '@roq/nextjs';

function TransactionViewPage() {
  const { hasAccess } = useAuthorizationApi();
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<TransactionInterface>(
    () => (id ? `/transactions/${id}` : null),
    () =>
      getTransactionById(id, {
        relations: ['employee', 'mobility_provider'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);
  const [createError, setCreateError] = useState(null);

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Transaction Detail View
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Text fontSize="lg" fontWeight="bold" as="span">
              Amount:
            </Text>
            <Text fontSize="md" as="span" ml={3}>
              {data?.amount}
            </Text>
            <br />
            <Text fontSize="lg" fontWeight="bold" as="span">
              Transaction Date:
            </Text>
            <Text fontSize="md" as="span" ml={3}>
              {data?.transaction_date as unknown as string}
            </Text>
            <br />
            {hasAccess('employee', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
              <>
                <Text fontSize="lg" fontWeight="bold" as="span">
                  Employee:
                </Text>
                <Text fontSize="md" as="span" ml={3}>
                  <Link as={NextLink} href={`/employees/view/${data?.employee?.id}`}>
                    {data?.employee?.user_id}
                  </Link>
                </Text>
              </>
            )}
            {hasAccess('mobility_provider', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
              <>
                <Text fontSize="lg" fontWeight="bold" as="span">
                  Mobility Provider:
                </Text>
                <Text fontSize="md" as="span" ml={3}>
                  <Link as={NextLink} href={`/mobility-providers/view/${data?.mobility_provider?.id}`}>
                    {data?.mobility_provider?.name}
                  </Link>
                </Text>
              </>
            )}
          </>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'transaction',
  operation: AccessOperationEnum.READ,
})(TransactionViewPage);
