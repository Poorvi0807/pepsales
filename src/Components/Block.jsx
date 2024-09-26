// Block.jsx
import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useDrag } from 'react-dnd';

const Block = ({ block, onClick }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'block',
    item: { id: block.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Box
      ref={drag}
      bg="white"
      p={2}
      borderRadius="md"
      boxShadow="md"
      opacity={isDragging ? 0.5 : 1}
      cursor="move"
      onClick={onClick}
    >
      <Text>{block.title}</Text>
      <Text fontSize="sm" color="gray.500">{block.attributes.type}</Text>
    </Box>
  );
};

export default Block;