import { useState } from 'react';
import AppLayout from 'layout/app-layout';
import NextLink from 'next/link';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text, Button, Link } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getTransactions, deleteTransactionById } from 'apiSdk/transactions';
import { TransactionInterface } from 'interfaces/transaction';
import { Error } from 'components/error';
import { AccessOperationEnum, AccessServiceEnum, useAuthorizationApi, withAuthorization } from '@roq/nextjs';

function TransactionListPage() {
  const { hasAccess } = useAuthorizationApi();
  const { data, error, isLoading, mutate } = useSWR<TransactionInterface[]>(
    () => '/transactions',
    () =>
      getTransactions({
        relations: ['employee', 'mobility_provider'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);

  const handleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteTransactionById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Transaction
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {hasAccess('transaction', AccessOperationEnum.CREATE, AccessServiceEnum.PROJECT) && (
          <Link href={`/transactions/create`}>
            <Button colorScheme="blue" mr="4">
              Create
            </Button>
          </Link>
        )}
        {error && <Error error={error} />}
        {deleteError && <Error error={deleteError} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>amount</Th>
                  <Th>transaction_date</Th>
                  {hasAccess('employee', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && <Th>employee</Th>}
                  {hasAccess('mobility_provider', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                    <Th>mobility_provider</Th>
                  )}

                  {hasAccess('transaction', AccessOperationEnum.UPDATE, AccessServiceEnum.PROJECT) && <Th>Edit</Th>}
                  {hasAccess('transaction', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && <Th>View</Th>}
                  {hasAccess('transaction', AccessOperationEnum.DELETE, AccessServiceEnum.PROJECT) && <Th>Delete</Th>}
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.amount}</Td>
                    <Td>{record.transaction_date as unknown as string}</Td>
                    {hasAccess('employee', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                      <Td>
                        <Link as={NextLink} href={`/employees/view/${record.employee?.id}`}>
                          {record.employee?.user_id}
                        </Link>
                      </Td>
                    )}
                    {hasAccess('mobility_provider', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                      <Td>
                        <Link as={NextLink} href={`/mobility-providers/view/${record.mobility_provider?.id}`}>
                          {record.mobility_provider?.name}
                        </Link>
                      </Td>
                    )}

                    {hasAccess('transaction', AccessOperationEnum.UPDATE, AccessServiceEnum.PROJECT) && (
                      <Td>
                        <NextLink href={`/transactions/edit/${record.id}`} passHref legacyBehavior>
                          <Button as="a">Edit</Button>
                        </NextLink>
                      </Td>
                    )}
                    {hasAccess('transaction', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                      <Td>
                        <NextLink href={`/transactions/view/${record.id}`} passHref legacyBehavior>
                          <Button as="a">View</Button>
                        </NextLink>
                      </Td>
                    )}
                    {hasAccess('transaction', AccessOperationEnum.DELETE, AccessServiceEnum.PROJECT) && (
                      <Td>
                        <Button onClick={() => handleDelete(record.id)}>Delete</Button>
                      </Td>
                    )}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </AppLayout>
  );
}
export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'transaction',
  operation: AccessOperationEnum.READ,
})(TransactionListPage);
