const db = require('../database/dbConfig')

function register(user) {
    return db('users')
        .insert(user)
        .then(res => {
            return db('users')
                .where({ id: res[0] })
                .first()
                .then(newUser => {
                    return newUser
                })
        })
}

function login(filter) {
    return db('users')
        .where(filter)
}


module.exports = {
    register,
    login
}