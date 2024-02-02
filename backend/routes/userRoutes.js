const express = require('express');
const router  = express.Router();
const db = require('../db');

router.post('/create', (req, res) => {
    const username = req.body.username;
    const email= req.body.email;
    const password = req.body.password;

    db.query("INSERT INTO `users` ( `email`, `username`, `password`, `timestamp`) VALUES (?, ?, ?, current_timestamp());", [email,username, password], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log(result);
            res.json(result);
        }
    });
});

router.get('/users',(req,res)=>{
    const email=req.query.email;
    db.query("select * from users where email=?",email,(err,result)=>{
        if(err){
            console.log(err);
        }
        res.json(result);
    })
})

module.exports = router;
