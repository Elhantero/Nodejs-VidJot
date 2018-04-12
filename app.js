const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

// handlebars middleware
app.engine('handlebars', exphbs({ 
    defaultLayout: 'main' 
}));
app.set('view engine', 'handlebars');

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

const port = 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});