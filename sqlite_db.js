const sqlite3 = require('sqlite3');
const fs = require('fs');
const { resolve } = require('path');

class DB {
    constructor() {
        this.DB = null;
        this.DBVersion = 1;
        this.initializeDB();
    }

    initializeDB(){
        let fileLocation = `${__dirname}/infrabot.db`;
        if(fs.existsSync(fileLocation) === false){
            console.log('sqlite_db::initializeDB::creating new db');
            this.DB = new sqlite3.Database(fileLocation, (err) => {
                if (err) {
                  console.error('sqlite_db::initializeDB::creating::error', new Error(err));
                  return console.error(`sqlite_db::initializeDB::creating::err${err.message}`); 
                }});
            // apply db creation script
            //
            this.createDB(this.DB);
            console.log('sqlite_db::initializeDB::db created');
            this.validateDBUpdates();
        } else {
            console.log('sqlite_db::initializeDB::loading::begin');
            this.DB = new sqlite3.Database(fileLocation, (err) => {
                if (err) { 
                  console.error('sqlite_db::initializeDB::loading::error', new Error(err));
                  return console.error(`sqlite3_db::initializeDB::err${err.message}`);
                  }
                });
            this.validateDBUpdates();
            console.log('sqlite_db::initializeDB::loading::end');
        }
      }
    
      createDB(db){
        console.log('sqlite_db::createDB');
        let data = fs.readFileSync('./db_updates/CREATE.sql', 'utf8');
        if (data == null) return console.error('sqlite_db::createDB::CREATE file not found');
        console.log('sqlite_db::createDB::creating database');
        db.serialize( () => { 
            db.exec(data);
        });
      }
      validateDBUpdates(){
        //   return Promise
        console.log('sqlite_db::validateDBUpdates');
        this.DB.serialize(() =>{
          this.DB.get("PRAGMA user_version", (err, db) => {
            if (err) {
              console.error(`sqlite3_db::validateDBUpdates::get user_version::err - ${err}`);
              return;
            }
            if(db == undefined || db.length === 0) return;
            console.log(`sqlite3_db::validateDBUpdates::dbVersion[${db.user_version}]`);
            if (db.user_version === this.DBVersion) {
                console.info(`sqlite3_db::validateDBUpdates::db up to date`);
                // resolve()
            }
            return console.log('returning');
            const file = `./db_updates/UPDATE_FOR_${this.DBVersion}.sql`;
            console.log(`sqlite3_db::validateDBUpdates::db applying[${file}]`);
            if(fs.existsSync(file)){
                fs.readFile(file, 'utf8', (err, data) => {
                    if (err) { 
                        console.info(`sqlite3_db::validateDBUpdates::db error reading update file[${file}]`);
                        return; // error reading update file
                    // throw err; // error reading update file
                    }
                    console.log(`sqlite3_db::validateDBUpdates::validateDBUpdates::db update begin[${file}]`);
                    this.DB.serialize( () => { 
                        try{
                          this.DB.exec(data); 
                        }
                        catch(e){
                          console.error(e);
                        }
                        // resolve(this.validateDBUpdates());
                    });
                    console.log(`sqlite3_db::validateDBUpdates::update end[${file}]`);
                });
            }
            else{
              console.error(`sqlite3_db::update update[${file}] not found.`);
            }
          });
        });
      }





    createSpecifier(params) {
        let specifier = '';
        if (params) {
            if (params && typeof params === 'object') {
                for (let key in params) {
                    if (specifier !== '') specifier += ' AND ';
                    else specifier = 'WHERE ';
                    if (typeof params[key] === 'string') specifier += `${key} = "${params[key]}"`;
                    else if (typeof params[key] === 'number') specifier += `${key} = ${params[key]}`;
                }
            } else if (typeof params === 'string') {
                specifier += `WHERE ${key} = "${params[key]}"`;
            } else if (typeof params !== 'string') {
                specifier += `WHERE ${key} = ${params[key]}`;
            }
        }
        return specifier;
    }

    setUser(params) {
        return new Promise((resolve, reject) => {
            let user_id = params.user_id || "";
            let username = params.username || "";
            let date_joined = params.date_joined || "";
            this.DB.all(`INSERT OR REPLACE INTO users (user_id, username, date_joined) VALUES ("${user_id}", "${username}", "${date_joined}")`).then((err, rows) => {
                if (err) {
                    console.log(`sqlite_db::setUser::insert - ${err}`);
                    return reject(err);
                }
                resolve(rows)
            });
        });
    }
    getUser(params) {
        return new Promise((resolve, reject) => {
            let specifier = this.createSpecifier(params);
            this.DB.all(`SELECT * FROM channels ${specifier}`).then((err, rows) => {
                if (err) {
                    console.log(`sqlite_db::getUser::select - ${err}`);
                    return reject(err);
                }
                resolve(rows)
            });
        });
    }
    setChannel(params) {
        return new Promise((resolve, reject) => {
            let channel_id = params.channel_id || "";
            let channel_name = params.channel_name || "";
            let date_added = params.date_added || "";
            this.DB.all(`INSERT OR REPLACE INTO users (user_id, username, date_joined) VALUES ("${channel_id}", "${channel_name}", "${date_added}")`).then((err, rows) => {
                if (err) {
                    console.log(`sqlite_db::setChannel::insert - ${err}`);
                    return reject(err);
                }
                resolve(rows)
            });
        });
    }
    getChannel(params) {
        return new Promise((resolve, reject) => {
            let specifier = this.createSpecifier(params);
            this.DB.all(`SELECT * FROM channels ${specifier}`).then((err, rows) => {
                if (err) {
                    console.log(`sqlite_db::getChannel::select - ${err}`);
                    return reject(err);
                }
                resolve(rows)
            });
        });
    }
}

module.exports = new DB();