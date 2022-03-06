/*
 * This module handles global configurations
 */
module.exports = {
  /**
   * Minimum number of creeps to maintain. Some additional conditions may be required
   * before spawning can occur
   */
  CREEP_COUNTS: {
    HARVESTER: 15,
    UPGRADER: 0,
    BUILDER: 4
  },
  
  /**
   * Build arrays for each type of creep
   */
  CREEP_BUILDS: {
    HARVESTER: [WORK,MOVE,CARRY],
    UPGRADER: [WORK,CARRY,MOVE],
    BUILDER: [WORK,CARRY,MOVE]
  },

  /**
   * The number of ticks with no path to a target to allow before selecting a new target
   */
  MAX_TICKS_WITH_NO_PATH: 5
};
