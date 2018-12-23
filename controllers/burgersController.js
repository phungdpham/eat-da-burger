var express = require('express');

var router = express.Router();
var burger = require('../models/burger.js');

//get route -> index
router.get('/', function(req, res) {
    res.redirect('/burgers');
});

router.get('/burgers', function(req, res) {
    //express callback response by calling burger.selectAllBurger
    burger.all(function(burgerData) {
        //wrapper for orm.js that using mysql query call back will return burger_data and render to index with handlebar
        res.render('index', { burger_data: burgerData });
    });
})

//post route -> back to index
router.post('/burgers/create', function(req, res) {
    burger.create(req.body.burger_name, function(result) {
        console.log(result);
        res.redirect('/');
    });
});

//put route -> back to index
router.put('/burgers/:id', function(req, res) {
    burger.update(req.params.id, function(result) {
        console.log(result);
        res.sendStatus(200);
    });
});

module.exports = router;

