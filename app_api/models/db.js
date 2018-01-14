var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/wict';
if(process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGODB_URI;
}

mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected from ' + dbURI);
});

//Handlers for Process Termination
var gracefulShutdown = function (msg, shutdownType, callback) {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through ' + msg);
    console.log(shutdownType);
    callback();
  });
};
process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', 'SIGUSR2', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});
process.on('SIGINT', function() {
  gracefulShutdown('app termination', 'SIGINT', function() {
    process.exit(0);
  });
});
process.on('SIGTERM', function() {
  gracefulShutdown('Heroku app shutdown', 'SIGTERM', function() {
    process.exit(0);
  });
});

require('./dishes');
