const Routes = require('./auth-model.js')

const db = require('../database/dbConfig')

describe('Is testing working?', () => {
    test('expect to pass', async () => {
        expect(true).toBe(true)
    })
})

describe('Model testing', () => {
    describe('register test', () => {
        it('should create the users', async () => {
            await Routes.register({ username: "colby1", password: "12345" })
            await Routes.register({ username: "colby2", password: "12345" })

            const users = await db('users')
            expect(users).toHaveLength(2)
        })
    })

    describe('register test', () => {
        it('should return promise', async () => {
            const logged = await Routes.login({ username: "colby1", password: "12345" })

            expect(logged).toContain(expect.anything())
        })
    })
})