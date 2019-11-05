var roleHarvester = require('roles.harvester');
var roleUpgrader = require('roles.upgrader');
const roleBuilder = require('roles.builder');
var spawnMakeCreeps = require('spawns.makeCreeps');

module.exports.loop = function () {

  for(var name in Memory.creeps) {
    if(!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }
  
  spawnMakeCreeps();

  for(var name in Game.creeps) {
    var creep = Game.creeps[name];

    // Don't run the creep if it is still spawning
    if (creep.spawning) continue;

    if(creep.memory.role == 'UPGRADER' || creep.memory.role === 'HARVESTER') {
      roleHarvester.run(creep);
    }
    if(creep.memory.role === 'BUILDER') {
      roleBuilder.run(creep);
    }
  }
}