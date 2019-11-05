const getDistance = require('utils.getDistance');

/**
 * Takes an object, and an array of objects, and returns the object in the array
 * that is closest to the "current object"
 * 
 * @param {RoomObject} currentTarget The "current" object to check against the array objects
 * @param {RoomObject} roomObjectArray Array of objects to check the distance for
 * 
 * @return {RoomObject} Room object from the provided array that is closes to the current object
 */
module.exports = (currentObject, roomObjectArray) => {
  let closestObject = roomObjectArray[0];
  let closestDistance = getDistance(currentObject, closestObject);
  
  for (let i=1; i<roomObjectArray.length; i++) {
    const roomObject = roomObjectArray[i];
    const newDistance = getDistance(currentObject, roomObject);
    
    if (newDistance < closestDistance) {
      closestDistance = newDistance;
      closestObject = roomObject;
    }
  }
  
  return closestObject;
}
