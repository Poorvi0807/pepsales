// Lane.jsx
import React from 'react';
import { VStack, Box, Text } from '@chakra-ui/react';
import { useDrop } from 'react-dnd';
import Block from './Block';

const Lane = ({ state, blocks, onDrop, onBlockClick }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'block',
    drop: (item) => onDrop(item.id, state),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <Box 
      ref={drop} 
      bg={isOver ? 'gray.100' : 'gray.50'} 
      p={4} 
      borderRadius="md" 
      minWidth="200px"
    >
      <Text fontWeight="bold" mb={2}>{state}</Text>
      <VStack spacing={2} align="stretch">
        {blocks.map(block => (
          <Block 
            key={block.id} 
            block={block} 
            onClick={() => onBlockClick(block)} 
          />
        ))}
      </VStack>
    </Box>
  );
};

export default Lane;