const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/delivery',(req,res)=>{
    const {uid, empid, order_id}=req.params;
    db.query("INSERT INTO `delivary` (`order_id`, `emp_id`, `dtimestamp`) VALUES (?, ?, current_timestamp())",[order_id,empid],(err,result)=>{
      if(err){
        console.log(err);
      }
      res.json(result);
    })
  })

module.exports = router;
