const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'node_db'
})

module.exports = {
    getConnection: () => {
        return new Promise(
            (resolve,reject) => {
                pool.getConnection()
                    .then((connection => {
                        resolve(connection)
                    }))
                .catch((error) => {
                    reject(error)
                })
            }
        )
    }
};