// Utils
const findClosest = require('./utils.findClosest');
const STATES = require('./utils.states');

// Helpers
const changeCreepState = require('./helpers.changeCreepState');
const harvest = require('./helpers.harvest');

/**
 * Map of state methods used by this creep
 */
const stateMethods = {
  /**
   * Handles gathering. Will automatically find the nearest energy node and gather
   * from that node until the creep is full of energy
   */
  GATHER: (creep) => {
    harvest(creep, STATES.BUILD);
  },
  
  /**
   * Handles building tasks. While this creep has energy it will find the nearest
   * construction site, move to the site, and build
   */
  BUILD: (creep) => {
    // Find the nearest construction site
    if (!creep.memory.targetNodeId) {
      const constructionSites = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
      
      // STATE CHANGE
      // Change to "GATHER" if there aren't any construction sites
      if (constructionSites.length === 0) {
        changeCreepState(creep, STATES.GATHER);
        return;
      }
      
      creep.memory.targetNodeId = findClosest(creep, constructionSites).id;
    }
    
    const targetNode = Game.getObjectById(creep.memory.targetNodeId);
    
    // Clear the target node ID and restart if the target node doesn't exist anymore
    if (!targetNode) { 
      delete creep.memory.targetNodeId;
      return;
    }
    
    // Build! Or move to the node if it fails
    if (creep.build(targetNode) === ERR_NOT_IN_RANGE) {
      creep.moveTo(targetNode, {visualizePathStyle: {stroke: '#ffaaff'}});
    }
    
    // STATE CHANGE
    // Change to "GATHER" if we run out of energy
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