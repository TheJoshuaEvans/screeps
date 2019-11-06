const roleHarvester = require('roles.harvester');
const roleBuilder = require('roles.builder');
const makeCreeps = require('spawns.makeCreeps');

/**
 * Maps role identifiers to the objects responsible for handling those roles
 */
const roleMap = {
  HARVESTER: roleHarvester,
  BUILDER: roleBuilder
};

/**
 * The primary game loop
 */
module.exports.loop = function () {
  // Clear dead creeps from memory
  for(const name in Memory.creeps) {
    if(!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }
  
  // Check to see if we need to spawn any creeps
  makeCreeps();

  // Run all the creep code based on role
  for(const name in Game.creeps) {
    const creep = Game.creeps[name];

    // Don't run the creep if it is still spawning
    if (creep.spawning) continue;

    roleMap[creep.memory.role].run(creep);

    // Death message
    if (creep.ticksToLive === 1) {
      creep.say('Goodby 👻');
    }
  }
}