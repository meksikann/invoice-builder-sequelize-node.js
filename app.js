let express = require('express'),
    bodyParser = require('body-parser'),
    http = require('http'),
    path = require('path'),
    cors = require('cors'),

    _ = require('lodash');

let routes = require('./app/routes/index');
let app = express();

app.set('port', process.env.PORT || 8000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));

routes(app);

app.listen(app.get('port'),  () => { console.log('Listening on ' + app.get('port')) });