const path = require('path');
const express = require('express');
const expHandlebar = require('express-handlebars');
const sequelize = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const sess = {
    secret: "Super duper secret stuff",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const handlebars = expHandlebar.create({});

const app = express();
const PORT = process.env.PORT || 3001;


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess)); 

// turn on routes
app.use(require('./controllers'));

// acitvate server and database connection
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Application Now listening'));
  });
  