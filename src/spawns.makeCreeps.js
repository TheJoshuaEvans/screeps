const config = require('config');

/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawn.make-creeps');
 * mod.thing == 'a thing'; // true
 */
module.exports = function() {
  const spawner = Game.spawns['Spawn1'];
  if (spawner.spawning) {
    // Don't do anything if we are already spawning
    return;
  }
  var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' || creep.memory.role === 'HARVESTER');
  var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader' || creep.memory.role === 'UPGRADER');
  const builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder' || creep.memory.role === 'BUILDER');

  if(harvesters.length < config.CREEP_COUNTS.HARVESTER) {
    var newName = 'Harvester' + Game.time;
    console.log('Spawning new harvester: ' + newName);
    spawner.spawnCreep(config.CREEP_BUILDS.HARVESTER, newName, {memory: {role: 'HARVESTER'}});
  }
  if(upgraders.length < config.CREEP_COUNTS.UPGRADER) {
    var newName = 'Upgrader' + Game.time;
    console.log('Spawning new upgrader: ' + newName);
    spawner.spawnCreep([WORK,CARRY,MOVE,MOVE], newName, {memory: {role: 'UPGRADER'}});
  }
  if(builders.length < config.CREEP_COUNTS.BUILDER && spawner.room.find(FIND_MY_CONSTRUCTION_SITES).length) {
    const newName = 'Builder' + Game.time;
    console.log('Spawning new builder: ' + newName);
    spawner.spawnCreep([WORK,CARRY,MOVE,MOVE], newName, {memory: {role: 'BUILDER'}});
  }
  
  if(Game.spawns['Spawn1'].spawning) { 
    var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
    Game.spawns['Spawn1'].room.visual.text(
      '🛠️' + spawningCreep.memory.role,
      Game.spawns['Spawn1'].pos.x + 1, 
      Game.spawns['Spawn1'].pos.y, 
      {align: 'left', opacity: 0.8}
    );
  }
};