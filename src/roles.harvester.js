// Utils
const findClosest = require('./utils.findClosest');
const STATES = require('./utils.states');

// Helpers
const changeCreepState = require('./helpers.changeCreepState');
const harvest = require('./helpers.harvest');

/**
 * Gets the nearest structure id that needs energy. If no structures can be found will return the ID of the creep's
 * current room's controller
 * 
 * @param {Creep} creep The current creep
 * 
 * @return {string} ID of the nearest structure or the room controller
 */
function getNearestLanguidStructureId(creep) {
  // Get all the structures in the room
  let structures = creep.room.find(FIND_MY_STRUCTURES);

  // Filter out all the structures that don't need energy
  structures = structures.filter((structure) => {
    return structure.store && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
  });

  if (structures.length === 0) return creep.room.controller.id;

  // Return the ID of the nearest structure
  return findClosest(creep, structures).id;
}

/**
 * Map of state methods used by this creep
 */
const stateMethods = {
  /**
   * Handles gathering. Will automatically find the nearest energy node and gather
   * from that node until the creep is full of energy
   * 
   * @param {Creep} creep The current creep
   */
  GATHER: (creep) => {
    harvest(creep, STATES.DELIVER);
  },
  
  /**
   * Handles delivering gathered energy to structures. Will default to delivering energy to the room controller if there
   * are no other structures that require energy
   * 
   * @param {Creep} creep The current creep
   */
  DELIVER: (creep) => {
    const memory = creep.memory;

    if (!memory.targetNodeId) memory.targetNodeId = getNearestLanguidStructureId(creep);
    
    let targetNode = Game.getObjectById(memory.targetNodeId);

    // Make sure the target is actually a structure
    if (!targetNode instanceof Structure) {
      memory.targetNodeId = getNearestLanguidStructureId(creep);
      targetNode = Game.getObjectById(memory.targetNodeId);
    }

    const transferCode = creep.transfer(targetNode, RESOURCE_ENERGY);

    // Move to the target if not in range
    if (transferCode === ERR_NOT_IN_RANGE) creep.moveTo(targetNode, {visualizePathStyle: {stroke: '#ffaaff'}});

    // Clear the target node id if the current node is full on energy
    if (targetNode.store && targetNode.store.getFreeCapacity(RESOURCE_ENERGY) <= 0) delete memory.targetNodeId;

    // STATE CHANGE
    // Change the state to "GATHER" if empty
    if (creep.store.getUsedCapacity(RESOURCE_ENERGY) <= 0) changeCreepState(creep, STATES.GATHER);
  }
}

/**
 * This module handles the running of builders
 */
module.exports = {
  run: (creep) => {
    // Run the current state, set the default state to GATHER
    if (!creep.memory.state) creep.memory.state = STATES.GATHER;
    
    stateMethods[creep.memory.state](creep);
  }
};