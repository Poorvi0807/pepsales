// // SwimLaneUI.jsx
// SwimLaneUI.jsx
import React, { useState, useEffect } from 'react';
import { Box, VStack, HStack, Input, Button } from '@chakra-ui/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Lane from './Lane';
import BlockPreview from './BlockPreview';
import DataEntryModal from './DataEntryModal';

const SwimLaneUI = ({ config }) => {
  const [blocks, setBlocks] = useState([]);
  const [filteredBlocks, setFilteredBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [showDataEntryModal, setShowDataEntryModal] = useState(false);
  const [transitionData, setTransitionData] = useState({});
  const [filter, setFilter] = useState('');

  useEffect(() => {
  
    setBlocks([
      { id: 1, title: 'Block 1', state: 'todo', attributes: { type: 'task' } },
      { id: 2, title: 'Block 2', state: 'inProgress', attributes: { type: 'bug' } },
      { id: 3, title: 'Block 3', state: 'done', attributes: { type: 'feature' } },
    ]);
  }, []);

  useEffect(() => {
    // Apply filter
    const filtered = blocks.filter(block => 
      block.title.toLowerCase().includes(filter.toLowerCase()) ||
      block.attributes.type.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredBlocks(filtered);
  }, [blocks, filter]);

  const handleDrop = (blockId, newState) => {
    const block = blocks.find(b => b.id === blockId);
    if (config.allowedTransitions[block.state].includes(newState)) {
      setTransitionData({ blockId, oldState: block.state, newState });
      setShowDataEntryModal(true);
    }
  };

  const handleDataSubmit = (data) => {
    setBlocks(blocks.map(block => 
      block.id === transitionData.blockId 
        ? { ...block, state: transitionData.newState, history: [...(block.history || []), { from: transitionData.oldState, to: transitionData.newState, data }] }
        : block
    ));
    setShowDataEntryModal(false);
  };

  const handleBlockClick = (block) => {
    setSelectedBlock(block);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box>
        <Input 
          placeholder="Filter blocks..." 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)} 
          mb={4}
        />
        <HStack spacing={4} alignItems="flex-start">
          {config.states.map(state => (
            <Lane 
              key={state} 
              state={state} 
              blocks={filteredBlocks.filter(block => block.state === state)}
              onDrop={handleDrop}
              onBlockClick={handleBlockClick}
            />
          ))}
        </HStack>
        {selectedBlock && (
          <BlockPreview 
            block={selectedBlock} 
            onClose={() => setSelectedBlock(null)} 
          />
        )}
        <DataEntryModal 
          isOpen={showDataEntryModal}
          onClose={() => setShowDataEntryModal(false)}
          onSubmit={handleDataSubmit}
          fields={config.transitionFields[transitionData.newState] || []}
        />
      </Box>
    </DndProvider>
  );
};

export default SwimLaneUI;
