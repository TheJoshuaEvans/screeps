# Newtsuck Screeps
This repository contains [Newtuck's](https://screeps.com/a/#!/profile/Newtsuck) Screeps code

[Link to Documentation](https://docs.screeps.com/api/)

# Project Structure
All code is in the [src](./src) folder. Since Screeps does not support directories, different namespaces are currently handled by using the following pattern:
```
<namespace>.<filename>.js
```

In the future, I will find a way to get directories to work through a build function. [The recommended Grunt setup](https://docs.screeps.com/contributed/advanced_grunt.html#Using-Folders) is inadequate since it does not correctly mutate `require` statements, breaking intellisense

# Building / Publishing
Building and publishing is currently done using Grunt. The build system expects a file in the base directory named `.screeps.json` with the following parameters:
```JSON
{
  "email": "user email",
  "password": "user password",
  "branch": "the default build branch",
  "ptr": "boolean. If the code should be sent to the ptr"
}
```

The above parameters can also be provided to the Grunt build by using cli flags
```
grunt --email=email --password=password --branch=branch --ptr=boolean
```

The Gruntfile currently has only one task named `screeps` which will upload the contents of the [src](./src) directory to Screeps. This is also the default task

# Project Setup
Setup for this project was pretty straightforward. The [screeps](https://www.npmjs.com/package/@types/screeps) and [lodash](https://www.npmjs.com/package/@types/lodash) type libraries are used to allow for autocompletion of Screeps code. The Grunt setup is also basic, based entirely off of the existing Screeps documentation

# Todo
- [ ] Get directories working with autocomplete
- [ ] Build setup for drop / container harvesting
- [ ] Combine builder and harvester roles
- [ ] Implement viable setup for new start
