const fs = require('fs');

if (fs.existsSync('./public')) {
  process.env.NODE_ENV = 'production';
  process.env.databaseUri = 'mongodb://root:06143242@ds157723.mlab.com:57723/bd_clinica_odontologica'; // Databse URI and database name
  process.env.databaseName = 'production database: angular-2-app'; // Database name
} else {
  process.env.NODE_ENV = 'development';
  process.env.databaseUri = 'mongodb://root:06143242@ds157723.mlab.com:57723/bd_clinica_odontologica'; // Databse URI and database name
  process.env.databaseName = 'development database: mean-angular-2'; // Database name
}
