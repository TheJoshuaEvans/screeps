module.exports = function(grunt) {
  require('time-grunt')(grunt);

  var config = require('./.env.json')
  var branch = grunt.option('branch') || config.branch;
  var email = grunt.option('email') || config.email;
  var password = grunt.option('password') || config.password;
  var ptr = grunt.option('ptr') ? false : config.ptr

  grunt.loadNpmTasks('grunt-screeps')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-copy')

  grunt.initConfig({
    screeps: {
      options: {
        email: email,
        password: password,
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