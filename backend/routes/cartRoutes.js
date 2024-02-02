const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/addtocart',(req,res)=>{
    const {fid,username,qty}=req.body;
    db.query("select * from users where username=?",username,(err,result)=>{
      if(err){
        console.log(err);
      }
      const uid=result[0].uid;
      db.query("INSERT INTO `cart` ( `uid`, `fid`, `quantity`) VALUES ( ?, ?, ?)",[uid,fid,qty],(err,result)=>{
        if(err){
          console.log(err);
        }
        res.json(result);
      })
    })
  })

  router.get('/cartnum',(req,res)=>{
    const username=req.query.username
    db.query("select * from users where username=?",username,(err,result)=>{
      if(err){
        console.log(err);
      }
      const uid=result[0].uid;
      console.log(uid)
      db.query("select * from cart where uid = ?",uid,(err,result)=>{
        if(err){
          console.log(err);
        }
        res.json(result);
      })
    })
  })

  router.get('/cartflower', (req, res) => {
    const username = req.query.username;
  
    db.query('SELECT * FROM users WHERE username=?', username, (err, userResult) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      if (userResult.length === 0) {
        // User not found
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      const uid = userResult[0].uid;
  
      db.query('SELECT flowers.* FROM cart JOIN flowers ON cart.fid = flowers.fid WHERE cart.uid = ?', uid, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
  
        db.query('select * from cart where uid = ?', uid, (cartErr, cartResult) => {
          if (cartErr) {
            console.log(cartErr);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }
  
          res.json({ flowers: result, cart: cartResult });
        });
      });
    });
  });

module.exports = router;
