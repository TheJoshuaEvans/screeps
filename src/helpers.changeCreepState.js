/**
 * Helper function will change a creep's state. Will also clear the creep's "target node" unless told not to
 * 
 * @param {Creep} creep The creep who's state will change
 * @param {string} newState The string representation of the new state
 * @param {boolean} [clearTarget] If the creep's target should be cleared. Default true
 */
module.exports = (creep, newState, clearTarget = true) => {
  // Clear creep target id
  if (clearTarget) delete creep.memory.targetNodeId;
  
  // Set the new state
  creep.memory.state = newState;
  
  // Let everybody know the new state
  creep.say('❗ ' + newState);
}
