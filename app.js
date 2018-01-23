let express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    cors = require('cors'),
    _ = require('lodash');

let validator = require('express-validator');
let routes = require('./app/routes/index');
let app = express();

app.set('port', process.env.PORT || 8000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use(validator());

routes(app);

app.listen(app.get('port'),  () => { console.log('Listening on ' + app.get('port')) });