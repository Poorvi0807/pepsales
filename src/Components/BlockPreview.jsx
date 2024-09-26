// BlockPreview.jsx
import React from 'react';
import { 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalCloseButton,
  VStack,
  Text,
  Box
} from '@chakra-ui/react';

const BlockPreview = ({ block, onClose }) => {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{block.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="stretch" spacing={4}>
            <Box>
              <Text fontWeight="bold">Current State:</Text>
              <Text>{block.state}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Type:</Text>
              <Text>{block.attributes.type}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Transition History:</Text>
              {block.history && block.history.length > 0 ? (
                block.history.map((transition, index) => (
                  <Box key={index} mt={2}>
                    <Text>{`From ${transition.from} to ${transition.to}`}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {JSON.stringify(transition.data)}
                    </Text>
                  </Box>
                ))
              ) : (
                <Text>No transitions yet</Text>
              )}
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BlockPreview;