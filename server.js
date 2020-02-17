const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/api/accounts', (req,res) => {
    db('accounts')
        .then(accounts => res.status(200).json(accounts))
        .catch(err => res.status(500).json({error: 'Sorry something went wrong'}))
})

server.get('/api/accounts/:id', (req,res) => {


    db('accounts').where({id:req.params.id})
    .first()
        .then(accounts => res.status(200).json(accounts))
        .catch(err => res.status(500).json({error: 'Sorry something went wrong'}))
})

server.post('/api/accounts', (req,res) => {

    console.log(req.body)
    db('accounts').insert(req.body,"id")
        .then(ids => res.status(201).json(ids))
        .catch(err =>res.status(500).json({error: 'Sorry something went wrong'}))
})

server.put('/api/accounts/:id', (req,res) => {

    console.log(req.body)
    db('accounts').where({id: req.params.id}).update(req.body)
        .then(count => res.status(200).json(count))
        .catch(err =>res.status(500).json({error: 'Sorry something went wrong'}))
})

server.delete('/api/accounts/:id', (req,res) => {

    
    db('accounts').where({id: req.params.id}).del()
        .then(count => res.status(200).json(count))
        .catch(err =>res.status(500).json({error: 'Sorry something went wrong'}))
})

module.exports = server;                          