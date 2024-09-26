// DataEntryModal.jsx
import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';

const DataEntryModal = ({ isOpen, onClose, onSubmit, fields }) => {
  const [formData, setFormData] = useState({});

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({});
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Enter Transition Data</ModalHeader>
        <ModalBody>
          <VStack spacing={4}>
            {fields.map(field => (
              <FormControl key={field.name}>
                <FormLabel>{field.label}</FormLabel>
                <Input 
                  type={field.type} 
                  value={formData[field.name] || ''} 
                  onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                />
              </FormControl>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DataEntryModal;