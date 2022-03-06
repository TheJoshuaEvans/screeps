module.exports = function(grunt) {
  require('time-grunt')(grunt);

  var config = require('./.screeps.json')
  var branch = grunt.option('branch') || config.branch;
  var email = grunt.option('email') || config.email;
  var token = grunt.option('token') || config.token;
  var ptr = grunt.option('ptr') ? false : config.ptr

  grunt.loadNpmTasks('grunt-screeps')

  grunt.initConfig({
    screeps: {
      options: {
        email: email,
        token: token,
        branch: branch,
        ptr: ptr
      },
      dist: {
        src: ['src/*.js']
      }
    }
  });

  grunt.registerTask('default',  ['screeps']);
}