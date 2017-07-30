var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var env = process.env;
var db = mongojs(`mongodb://${env.DB_USER}:${env.DB_PASS}@${env.DB_HOST}:${env.DB_PORT}/deliverytruck`, ['redirects']);

// db.redirects.insert({title: 'title', url: 'https://example.com'}, function(err, data){
//     if(err) res.json(err);
//     res.json({data);
// })

router.get('/redirects', function(req, res, next) {

    db.redirects.find({}, function(err, data){
        if(err) res.json(err);
        res.json(data);
    })
    
});

router.get('/redirects/:id', function(req, res, next) {
    db.redirects.findOne(
        {
            // _id: mongojs.ObjectId(req.params.id)
            title: req.params.id
        },
        function(err, data){
            if(err) res.json(err);
            res.json(data);
        })
});

module.exports = router;