const express = require('express');
const router = express.Router();
const db = require('../db');

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

  router.get('/getpack', (req, res) => {
    db.query("SELECT * FROM packs", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        console.log(result);
        res.json(result);
    });
});


router.post('/buypack', (req, res) => {
    const { pack_id, user, address, state, street, pincode, instruction } = req.body;
    getUid(user)
        .then((result) => {
            console.log("id", result);
            db.query("INSERT INTO `pack_orders` (`pack_id`, `user_id`, `address`, `state`, `street`, `pincode`, `instruction`, `date`) VALUES (?, ?, ?, ?, ?, ?, ?, current_timestamp())", [pack_id, result, address, state, street, pincode, instruction], (err, val) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }
                res.json(val);
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json({ error: 'User not found' });
        });
});

router.get('/getpackorder',(req,res)=>{
    db.query("select * from pack_orders",null,(err,result)=>{
        if(err){
            console.log(err);
        }
        res.json(result);
    })
})

router.post('/setpackemp',(req,res)=>{
    const {eid,pid}=req.body;
    db.query("UPDATE `pack_orders` SET `emp_id` = ? WHERE `pack_orders`.`packs_order_id` = ?; ",[eid,pid],(err,result)=>{
        if(err){
            console.log(err);
        }
        res.json(result);
    })
})

router.get('/getpackdelivery',(req,res)=>{
    const {empEmail}=req.query;
    console.log(empEmail);
    getEmp(empEmail)
        .then((eid)=>{
            db.query("select * from pack_orders where emp_id = ?",eid,(err,result)=>{
                if(err){
                    console.log(err);
                }
                res.json(result);
            })
        })
})

router.post('/emppackdel',(req,res)=>{
    const {dornot,pid} = req.body;
    db.query("UPDATE `pack_orders` SET `dornot` = ? WHERE `pack_orders`.`packs_order_id` = ?; ",[dornot,pid],(err,result)=>{
        if(err){
            console.log(err);
        }
        res.json(result);
    })
})


module.exports = router;