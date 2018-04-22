if(process.env.NODE_ENV === 'production'){
    module.exports = {
        mongoURI: 'mongodb://mydb_username:mydbpassword@ds255309.mlab.com:55309/vidjot'
    }
} else {
    module.exports = {
        mongoURI: 'mongodb://localhost/vidjot-dev'
    }
}