/**
 * Gets the raw distance between two RoomObjects
 * 
 * @param {RoomObject} obj1 The first room object
 * @param {RoomObject} obj2 The second room object
 * 
 * @return {number} The distance between the two objects
 */
module.exports = (obj1, obj2) => {
  return Math.hypot(obj2.pos.x-obj1.pos.x, obj2.pos.y-obj1.pos.y);
}