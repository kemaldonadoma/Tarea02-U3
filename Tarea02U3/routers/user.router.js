const router = require('express').Router();
const multer = require('multer');
const csv = require('fast-csv');
const upload = multer({ dest: 'tmp/csv/' });
const fs = require('fs');




module.exports = (wagner) => {
    
    const userCtrl = wagner.invoke((User) => 
        require('../controllers/user.controller')(User));

    router.post('/', (req, res) =>
        userCtrl.createUser(req, res));

    router.get('/', (req, res) =>
        userCtrl.findAll(req, res));

    router.delete('/:id', (req, res) =>
        userCtrl.deleteById(req, res));

    router.put('/:id', (req, res) =>
        userCtrl.findAndUpdate(req, res));

    router.get('/:id', (req, res) =>
        userCtrl.findByOne(req, res));

    router.get('/login/:email/:password', (req, res) =>
        userCtrl.login(req, res));

    router.post('/muchos', (req, res) =>
        userCtrl.muchos(req, res));



    return router;
}