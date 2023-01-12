import React from 'react';
import { Text, Stack, Box } from '@chakra-ui/react';

import { ConnectedUserCardType } from '../types';

export const ConnectedUserInfo = ({
  username,
  icon
}: ConnectedUserCardType) => {
  return (
    <Stack spacing={1} alignItems="center" flexDirection='row'>
      {username && (
        <>
          <Box
            display={icon ? 'block' : 'none'}
            minW={10}
            maxW={20}
            w={10}
            minH={10}
            maxH={20}
            h={10}
            mx={2}
            borderRadius="full"
            overflow="hidden"
          >
            {icon}
          </Box>
          <Text fontSize={{ md: 'l' }} fontWeight="semibold" pr={3}>
            {username}
          </Text>
        </>
      )}
    </Stack>
  );
};
