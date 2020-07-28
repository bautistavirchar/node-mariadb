const express = require('express');
const router = express.Router();

const pool = require('../db/db.config');

router.get('/', async (req,res) => {
    var conn = await pool.getConnection()
    var skip = parseInt(req.body.skip),
        length = parseInt(req.body.length);
    
    console.log(typeof NaN)

    if(isNaN(skip)) skip = 0
    if(isNaN(length)) length = 0

    var sql = `select * from users LIMIT ${skip},${length}`
    var query = await conn.query(sql)
    res.send(query)
})

router.get('/user/:username', async (req,res) => {
    var conn = await pool.getConnection()
    var sql = 'select * from users where username=?'
    var query = await conn.query(sql,[req.params.username], (err,results, fields) => {
        if(err){
            console.log('Error: '+ err)
            res.sendStatus(500)
            return
        }
        console.log(results.length)
    })
    if(query.length) res.send(query[0])
    else res.send('not found')
})

router.post('/register',async (req,res) => {
    try {
        var conn = await pool.getConnection()
        var sql = 'INSERT INTO users(name,username,password) values(?,?,MD5(?))'
        await conn.query(sql,[req.body.name,req.body.username,req.body.password], (err,results,fields) => {
            if(err){
                res.sendStatus(500)
                return
            }
        })
    } catch (error) {
        res.sendStatus(500)
    }
})

router.delete('/delete/:id', async (req,res) => {
    try {
        var conn = await pool.getConnection();
        var sql = 'DELETE FROM users WHERE id=?'
        var result = await conn.query(sql,[req.params.id], (err,results,fields) => {
            if(err){
                res.sendStatus(500)
                return
            }
        })
        if(result.affectedRows == 1) res.sendStatus(200)
        if(result.affectedRows == 0) res.sendStatus(403)
    } catch (error) {
        rres.sendStatus(500)
    }
})

module.exports = router