const express = require('express')
const handlebars = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')
const passport = require('passport')
const appRoutes = require('./routes/app.routes')
const viewsRoutes = require ('./routes/views.routes')
const productsRouter = require('./routes/products.routes')



const PORT = 8080

const app = express()

//Plantillas de handlebars
app.engine('handlebars', handlebars.engine() )
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(session({
    store:MongoStore.create({
        mongoUrl:'mongodb+srv://juangobb:19972003@cluster0.qv2r5u5.mongodb.net/test?retryWrites=true&w=majority'
    }),
    secret: 'secretCoder',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize())
app.use(passport.session())

//Rutas
app.use('/api', appRoutes)
app.use('/', viewsRoutes)
app.use('/products', productsRouter)

//Atlas DB conection
const database = 'ecommerce'
mongoose.set('strictQuery', true)
mongoose.connect( `mongodb+srv://juangobb:19972003@cluster0.qv2r5u5.mongodb.net/${database}?retryWrites=true&w=majority` , (error)=>{
    if(error){
        console.log("cannot connect to database: " + error)
        process.exit()
    }
})

app.listen(PORT, ()=> {
    console.log('The server is working in port ', PORT)
})

/*app.get('/', (req, res) =>{
    res.render('login')
})*/