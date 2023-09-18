require('./config/db')

const app = require('express')()
const port = 3000

const PatientRouter = require('./api/Patient')
const DoctorRouter = require('./api/Doctor')
const AuthRouter = require('./api/auth')
const RoleRouter = require('./api/Roles')

/*const RoleRouter = require('./api/Role')
const LoginRouter = require('./api/login')*/


const bodyParser = require('express').json
app.use(bodyParser())

app.use('/patient', PatientRouter)
app.use('/doctor', DoctorRouter)
app.use('/auth', AuthRouter)
app.use('/role', RoleRouter)


/*app.use('/role', RoleRouter)
app.use('/login', LoginRouter)*/

app.listen(port, () => {
    console.log(`mandeha tsara le port ${port}`)
})