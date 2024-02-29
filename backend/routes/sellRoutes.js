const express = require('express');
const router  = express.Router();
const db = require('../db');

const getUid = (username) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE username=?', username, (err, userResult) => {
        if (err) {
          console.log(err);
          reject('Internal Server Error');
          return;
        }
  
        if (userResult.length === 0) {
          // User not found
          reject('User not found');
          return;
        }
        const uid = userResult[0].uid; // Assuming 'user_id' is the column name
        resolve(uid);
      });
    });
  };

  const getEmp=(empEmail)=>{
    return new Promise((resolve,reject)=>{
      db.query("select * from employee where empemail = ?",empEmail,(err,result)=>{
        if(err){
          console.log(err);
          reject("error");
          return;
        }
        if(result.length==0){
          reject("user not found")
          return;
        }
        const empid=result[0].eid;
        resolve(empid);
      })
    })
  }

router.post('/sellflower',(req,res)=>{
    const {user, address, qty, fid} = req.body;
    getUid(user)
        .then((uid)=>{
            console.log(uid);
            db.query("INSERT INTO `selling` ( `uid`, `fid`, `address`, `qty`, `date`) VALUES (?, ?, ?, ?, current_timestamp()); ",[uid,fid,address,qty],(err,result)=>{
                if(err){
                    console.log(err);
                }
                res.json(result);
            })
        })
        .catch((err)=>{
            console.log(err);
        })
})

router.get('/getselling',(req,res)=>{
    db.query("SELECT s.*, f.flowerName FROM selling s, flowers f WHERE s.sid = f.fid", (err,result)=>{
        if(err){
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(result);
    });
});

router.post('/setsellingemp',(req,res)=>{
    const {eid,sid} =req.body;
    db.query("UPDATE `selling` SET `eid` = ? WHERE `selling`.`sid` = ? ",[eid,sid],(err,result)=>{
        if(err){
            console.log(err);
        }
        res.json(result);
    })
})

router.get('/getsellingdel',(req,res)=>{
    const {user} = req.query;
    getEmp(user)
        .then((eid)=>{
            db.query("select s.*,f.flowerName from selling s, flowers f where s.sid=f.fid and eid = ?",eid,(err,result)=>{
                if(err){
                    console.log(err);
                }
                res.json(result);
            })
        })
})

router.post('/pickedup', (req, res) => {
  const { dornot, sid } = req.body;
  db.query("UPDATE `selling` SET `dornot` = ? WHERE `selling`.`sid` = ?", [dornot, sid], (err, result) => {
      if (err) {
          console.log(err);
          return res.status(500).json({ error: "Database error" });
      }
      db.query("SELECT * FROM selling WHERE sid = ?", sid, (error, sellingRows) => {
          if (error) {
              console.log(error);
              return res.status(500).json({ error: "Database error" });
          }
          const sellingRow = sellingRows[0]; // Assuming there's only one selling row for a given sid
          db.query("SELECT * FROM flowers WHERE fid = ?", sellingRow.fid, (er, flowerRows) => {
              if (er) {
                  console.log(er);
                  return res.status(500).json({ error: "Database error" });
              }
              const flowerRow = flowerRows[0]; // Assuming there's only one flower row for a given fid
              const updatedStock = flowerRow.stock + sellingRow.qty;
              db.query("UPDATE `flowers` SET `stock` = ? WHERE `flowers`.`fid` = ? ", [updatedStock, flowerRow.fid], (huh, okay) => {
                  if (huh) {
                      console.log(huh);
                      return res.status(500).json({ error: "Database error" });
                  }
                  res.json(okay);
              });
          });
      });
  });
});





module.exports = router;