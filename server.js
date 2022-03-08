const path = require('path');
const express = require('express');
const expHandlebar = require('express-handlebars');
const sequelize = require('./config/connection');
const session = require('express-session');
const sequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: "Super duper secret stuff",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new sequelizeStore({
        db: sequelize
    })
};

app.use(session(sess)); 
const handlebars = expHandlebar.create({});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(require('./controllers'));

// acitvate server and database connection
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Application Now listening'));
  });
  