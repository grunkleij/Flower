const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/emp', (req, res) => {
    const username = req.body.username;
    const email= req.body.email;
    const password = req.body.password;

    db.query("INSERT INTO `employee` (`empname`, `emppassword`, `empemail`) VALUES ( ?, ?,? );", [username,password, email], (err, result) => {    
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            console.log(result);
            res.json(result);
        }
    });
});

router.get('/emplogin',(req,res)=>{
    const email=req.query.email;
    db.query("select * from employee where empemail=?",email,(err,result)=>{
        if(err){
            console.log(err);
        }
        res.json(result);
    })
  })

  router.get('/getemp',(req,res)=>{
    db.query("select * from employee",(err,result)=>{
      if(err){
        console.log(err);
      }
      res.json(result);
    })
  })



module.exports = router;
