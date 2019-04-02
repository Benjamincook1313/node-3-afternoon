const session = require('express-session')
const express = require('express')
require('dotenv').config()
const app = express()
const { SERVER_PORT, SESSION_SECRET } = process.env

const checkForSession = require('./middlewares/checkForSession')

const authCtrl = require('./controllers/auth_controller')
const swagCtrl = require('./controllers/swag_controller')
const cartCtrl = require('./controllers/cart_controller')
const searchCtrl = require('./controllers/search_controller')

app.use(express.json())
app.use( session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(checkForSession)
app.use(express.static(`${}/../build`))

app.get('/api/swag', swagCtrl.read)

app.post('/api/login', authCtrl.login)
app.post('/api/register', authCtrl.register)
app.post('/api/signout', authCtrl.signOut)
app.get('/api/user', authCtrl.getUser)

app.post('/api/cart', cartCtrl.add)
app.post('/api/cart/checkout', cartCtrl.checkout)
app.delete('/api/cart', cartCtrl.delete)

app.get('/api/search', searchCtrl.search)

const port = SERVER_PORT
app.listen(port, () => console.log(`Server listening on ${port}`))