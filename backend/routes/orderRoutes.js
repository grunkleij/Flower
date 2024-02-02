const express = require('express');
const router = express.Router();
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

router.get("/buyflower", (req, res) => {
    const { flowerData, username, total, stock,state,city, address, street, pincode, instruction } = req.query;
  
    if (!Array.isArray(flowerData)) {
      console.log("not an array");
      return res.status(400).json({ error: "flowerData must be an array" });
    }
  
    // Step 1: Insert a new order
    getUid(username)
      .then((uid) => {
        console.log(uid);
        db.query("INSERT INTO orders (user_id,address,state,street,pincode,instruction) VALUES (?,?,?,?,?,?)", [uid,address,state,street,pincode,instruction], (err, orderResult) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: "Error creating order" });
          }
  
          const orderId = orderResult.insertId; // Get the order_id from the inserted order
  
          const queries = flowerData.map((flower) => {
            return new Promise((resolve, reject) => {
              db.query(
                "INSERT INTO order_details (order_id, flower_id, quantity, total_price) VALUES (?, ?, ?, ?)",
                [orderId, flower.fid, stock, total],
                (detailErr, detailResult) => {
                  if (detailErr) {
                    console.log(detailErr);
                    reject({ error: "Error inserting order details" });
                  } else {
                    resolve(detailResult);
                    db.query('UPDATE `flowers` SET `stock` = ? WHERE `flowers`.`fid` = ? ',[flower.stock-stock,flower.fid],(err,result)=>{
                      if(err){
                        console.log(err);
                      }
                    })
                  }
                }
              );
            });
          });
  
          // Execute all queries in parallel
          Promise.all(queries)
            .then((results) => {
              res.json({ message: "Order placed successfully", results });
              db.query('delete from cart where uid =?',uid,(err,result)=>{
                if(err){
                  console.log(err)
                }
                // res.json(result);
                
              })
            })
            .catch((error) => {
              res.status(500).json(error);
            });
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Error getting user ID"});
      });
  });

  router.get('/getorder',(req,res)=>{
    db.query("select * from orders",(err,result)=>{
      if(err){
        console.log(err);
      }
      res.json(result);
    })
  })

module.exports = router;
