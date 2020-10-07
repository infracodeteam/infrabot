const sqlite3 = require('sqlite3');

class DB {
    constructor() {
        this.DB = null;
        this.connectDatabase();
    }
    
    connectDatabase() {
        this.DB = new sqlite3.Database(`${__dirname}/infrabot.db`, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.log(`sqlite_db::Error connecting to SQLite DB - ${err}`);
            }
            console.log('sqlite_db::connected to the infrabot sqlite database');
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