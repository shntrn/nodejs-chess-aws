vvar mongoose = require( 'mongoose' );
var DB_URL = process.env.DB_URL || 'mongodb://nodejs-chess-mongo:JPq5LvfCEtN0Y170nmMXY04jVB4yiu7HLzOOEnWoLWcWrrKyVeuF389HgOywPkOqBzFGXUZamX8CM2N6AfdixQ==@nodejs-chess-mongo.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@nodejs-chess-mongo@';
mongoose.connect(DB_URL);

function seedDB(){
  console.log('Seeding DB...');
  mongoose.connection.db.dropDatabase(function (err) { 
    if (err) { console.log('Drop db error: ' + err) };
  });
  require('./seedDBData')().then(function(){
    mongoose.connection.close();
    console.log('Done!');
  })
};

mongoose.connection.on('connected', function () { 
 console.log('Mongoose connected to ' + DB_URL);
 seedDB();
}); 

mongoose.connection.on('error', function (err) { 
 console.log('Mongoose connection error: ' + err); 
}); 

mongoose.connection.on('disconnected', function () { 
 console.log('Mongoose disconnected'); 
});


