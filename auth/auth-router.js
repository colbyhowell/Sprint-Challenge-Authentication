const router = require('express').Router();
const bcrypt = require('bcryptjs')
const Regis = require('./auth-model')
const secret = require('../secrets/secrets')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
  // implement registration
  let newUser = req.body
  const hash = bcrypt.hashSync(newUser.password, 10)
  newUser.password = hash
  try {
    const newU = Regis.register(newUser)
    res.status(201).json({ Message: "New user created" })
  } catch{
    res.status(500).json({ Message: "The server could not be reached at this time" })
  }

});

router.post('/login', (req, res) => {
  let { username, password } = req.body

  Regis.login({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = makeToken(user)

        res.status(200).json({
          message: `welcome ${user.username}`,
          token: token
        })
      } else {
        res.status(401).json({ message: 'invalid login creds' })
      }
    }).catch(err => {
      res.status(500).json({ message: 'server could not be reached' })
    })
})

function makeToken(user) {
  const payload = {
    username: user.username,
    userID: user.id
  }
  const options = {
    expiresIn: '1d'
  }
  const token = jwt.sign(payload, secret.jwtSecret, options)

  return token
}

module.exports = router;
