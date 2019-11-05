const config = require('./config');

// Utils
const findClosest = require('./utils.findClosest');

// Helpers
const changeCreepState = require('./helpers.changeCreepState');

/**
 * Gets the closest source to the provided creep
 * 
 * @param {Creep} creep A creep
 * 
 * @return {string} The ID of the nearest source
 */
function getClosestSourceId(creep) {
  return findClosest(creep, creep.room.find(FIND_SOURCES)).id;
}

/**
 * Helper function handles harvesting. This function assumes that
 * 
 * @param {Creep} creep The creep that is harvesting
 * @param {string} [nextState] State to change the creep to when it is done harvesting. Optional
 */
module.exports = (creep, nextState = null) => {
  const memory = creep.memory;

  // Find the nearest energy node if we don't have one in memory
  if (!memory.targetNodeId) {
    memory.targetNodeId = getClosestSourceId(creep);
  }
  
  let targetNode = Game.getObjectById(memory.targetNodeId);

  // If the target node isn't a Source, find the nearest source
  if (!targetNode instanceof Source) {
    memory.targetNodeId = getClosestSourceId(creep);
    targetNode = Game.getObjectById(memory.targetNodeId);
  }
  
  // Harvest! Or move to the node if it fails
  if(creep.harvest(targetNode) === ERR_NOT_IN_RANGE) {
    const moveRes = creep.moveTo(targetNode, {visualizePathStyle: {stroke: '#ffaaff'}});

    // Keep track of the number of ticks that go by with no path
    if (moveRes === ERR_NO_PATH) {
      if (!memory.ticksWithNoPath) {
        memory.ticksWithNoPath = 1;
      } else {
        memory.ticksWithNoPath++;
      }

      // If we have had no path for too long, pick a different source
      if (memory.ticksWithNoPath >= config.MAX_TICKS_WITH_NO_PATH) {
        const sources = creep.room.find(FIND_SOURCES);

        for (var i=0; i<sources.length; i++) {
          const source = sources[i];
          
          if (source.id !== memory.targetNodeId) {
            memory.targetNodeId = source.id;
            creep.say('Changing 🎯')
            break;
          }
        }
      }
    } else {
      memory.ticksWithNoPath = 0;
    }
  }

  // Change state if we are full on resources
  if (nextState && creep.store.getFreeCapacity() <= 0) changeCreepState(creep, nextState);
}
