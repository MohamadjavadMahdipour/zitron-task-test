
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('zitron-task', 'your-username', 'your-pass', {
  host: 'localhost',
  dialect:'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.'.cyan.underline.bold);
  } catch (error) {
    console.error('Unable to connect to the database:'.red.underline.bold, error);
  }
  // await syncDb()  //!just we want change my db schema 
};

const syncDb=async()=>{
  (await sequelize.sync()).sync({force:true}) //!set off in production

}

module.exports = {
  sequelize,
  connectDB,
  syncDb
};

// module.exports=sequelize