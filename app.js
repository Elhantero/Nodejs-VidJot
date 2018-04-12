const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

// map global promise - get rid of warning
mongoose.Promise = global.Promise;

// connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev')
    .then( () => console.log('Mongodb Connected...'))
    .catch( err => console.log(err));

// Load Idea model
require('./models/Idea');
const Idea = mongoose.model('ideas');    


// handlebars middleware
app.engine('handlebars', exphbs({ 
    defaultLayout: 'main' 
}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//  index route
app.get('/', (req, res) => {
    const w = 'Welcome!!!';
    res.render('index', {
        title: w
    });
});

// about page
app.get('/about', (req, res) => {
    res.render('about');
});

// Idea index page
app.get('/ideas', (req, res) => {
    Idea.find({  })
        .sort({ date: 'desc' })
        .then( ideas => {
            res.render('ideas/index', {
                ideas:ideas
            });
        });
});


//  Add Idea form
app.get('/ideas/add', (req, res) => {
    res.render('ideas/add');
});

// Edit idea form
app.get('/ideas/edit/:id', (req, res) => {
    Idea.findOne({
        _id: req.params.id
    })
    .then( idea => {
        res.render('ideas/edit', {
            idea: idea
        });
    });
});

// Process form
app.post('/ideas', (req, res) => {
    let errors = [];
    
    if( !req.body.title ) {
        errors.push({ text: 'Please add a title' });
    }
    if( !req.body.details ) {
        errors.push({ text: 'Please add some details' });
    }

    if(errors.length > 0){
        res.render('ideas/add', {
            errors: errors,
            title: req.body.title,
            details: req.body.details
        });
    } else {
        const newUser = {
            title: req.body.title,
            details: req.body.details
        }
        
        new Idea(newUser)
            .save()
            .then( () => {
                res.redirect('/ideas');
            })
    }
});

const port = 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});