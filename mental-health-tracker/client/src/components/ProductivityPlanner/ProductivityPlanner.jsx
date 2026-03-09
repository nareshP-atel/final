import React from 'react';
import { Box, Heading, Input, Button, VStack } from '@chakra-ui/react';

const ProductivityPlanner = () => {
  return (
    <Box maxW="600px" mx="auto" py={10}>
      <Heading as="h2" size="lg" mb={4}>
        Productivity Planner
      </Heading>
      <VStack spacing={4}>
        <Input placeholder="Add a task..." />
        <Button colorScheme="teal">Add Task</Button>
      </VStack>
    </Box>
  );
};

export default ProductivityPlanner;