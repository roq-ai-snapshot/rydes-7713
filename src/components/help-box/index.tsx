import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Owner'];
  const roles = ['Owner', 'Employee', 'Accounting', 'Mobility Provider'];
  const applicationName = 'RYDES';
  const tenantName = 'Company';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `Role: Owner (of one Company)

1. As an owner, I want to be able to create and manage my company's account on the RYDES platform, so that I can provide my employees with a mobility budget.

2. As an owner, I want to be able to set and adjust the monthly mobility allowance for each employee, so that I can control the budget and ensure it meets the needs of my team.

3. As an owner, I want to be able to view and monitor the usage of the mobility budget by my employees, so that I can ensure they are using it effectively and sustainably.

4. As an owner, I want to be able to access reports and analytics on my company's mobility budget usage, so that I can make informed decisions about the program and its impact on my business.

5. As an owner, I want to be able to add and remove employees from the RYDES platform, so that I can manage my team's access to the mobility budget.

Role: Employee (member of a Company)

1. As an employee, I want to be able to access and use my monthly mobility allowance through the RYDES Mobility Budget Card, so that I can easily pay for various modes of transportation.

2. As an employee, I want to be able to view my remaining mobility budget balance, so that I can plan my transportation expenses accordingly.

3. As an employee, I want to be able to access a list of available mobility providers, so that I can choose the most convenient and suitable transportation options for my needs.

4. As an employee, I want to be able to track my mobility budget usage history, so that I can review my transportation expenses and make adjustments if necessary.

Role: Accounting (member of a Company)

1. As an accounting member, I want to be able to access and review the company's overall mobility budget usage, so that I can ensure accurate financial reporting and budgeting.

2. As an accounting member, I want to be able to access detailed reports on individual employee mobility budget usage, so that I can monitor and manage expenses effectively.

3. As an accounting member, I want to be able to export mobility budget data in various formats, so that I can easily integrate it into our existing accounting systems and processes.

Role: Mobility Provider (not a member of the Company)

1. As a mobility provider, I want to be able to register and manage my company's profile on the RYDES platform, so that I can offer my services to RYDES users.

2. As a mobility provider, I want to be able to receive payments from RYDES users through the Mobility Budget Card, so that I can easily process transactions and grow my business.

3. As a mobility provider, I want to be able to access analytics and reports on my company's performance within the RYDES platform, so that I can make informed decisions about my offerings and marketing strategies.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="20px" bottom="20px" zIndex={3}>
      <Popover placement="top">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody maxH="400px" overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application. Feel free to remove this tutorial with the{' '}
              <Box as="span" bg="yellow.300" p={1}>
                NEXT_PUBLIC_SHOW_BRIEFING
              </Box>{' '}
              environment variable.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
