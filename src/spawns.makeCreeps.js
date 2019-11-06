const config = require('config');

/*
 * This method handles the spawning of new creeps
 */
module.exports = function() {
  // Get counts for each creep role
  // TODO: Handle this in memory on creep creation and death
  const roleCounts = {};
  for (const role in config.CREEP_COUNTS) {
    roleCounts[role] = 0;
  }

  for (const name in Game.creeps) {
    const creepRole = Game.creeps[name].memory.role;

    roleCounts[creepRole]++;
  }

  for (const name in Game.spawns) {
    const spawner = Game.spawns[name];

    // SPECIAL CASES
    // Builders should only spawn if there are things to build
    if (spawner.room.find(FIND_MY_CONSTRUCTION_SITES).length === 0) delete roleCounts.BUILDER

    // Don't do anything if the spawner is already busy
    if (spawner.spawning) continue;

    // Spawn a new creep if there are too few of the given role
    for (const role in roleCounts) {
      if (roleCounts[role] >= config.CREEP_COUNTS[role]) continue;

      const newName = `${role} ${Game.time}`;
      const spawnRes = spawner.spawnCreep(config.CREEP_BUILDS[role], newName, {memory: { role }});

      // Only say we are making a new creep if the spawn request is successful
      if (spawnRes === OK) {
        const visualStyle = {
          backgroundColor: 'white',
          color: 'black'
        };
        spawner.room.visual.text('🛠️' + newName, spawner.pos.x, spawner.pos.y-2, visualStyle);
        console.log(`Spawning new creep with name ${newName}`)
        roleCounts[role]++;
      }
    }
  }
};