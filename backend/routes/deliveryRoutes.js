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

router.post('/delivery', (req, res) => {
  const { order_id, eid } = req.body; 
  console.log(order_id);

  db.query("INSERT INTO `delivary` (`order_id`, `emp_id`, `dtimestamp`) VALUES (?, ?, current_timestamp())", [order_id, eid], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(result);
  });
});

router.get('/getdelivery', (req, res) => {
  const { empEmail } = req.query;
  console.log(empEmail);
  getEmp(empEmail)
    .then((eid) => {
      console.log(eid);
      db.query("SELECT * FROM delivary WHERE emp_id = ?", eid, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.length === 0) {
          return res.status(404).json({ error: 'No deliveries found for this employee' });
        }

        const orderIds = result.map(delivery => delivery.order_id);

        db.query("SELECT * FROM orders WHERE order_id IN (?)", [orderIds], (err, del) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
          }

          db.query("SELECT * FROM users WHERE uid IN (?)", [del.map(order => order.user_id)], (err, userD) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ error: 'Internal Server Error' });
            }

            const response = {
              delivery: result, // Including delivery details
              orders: del, // Including order details
              users: userD, // Including user details
            };

            res.json(response);
          });
        });
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

router.get('/getudelivery', (req, res) => {
  const { userName } = req.query;
  db.query('SELECT * FROM users WHERE username = ?', userName, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const uid = result[0].uid;
    db.query('SELECT order_id FROM orders WHERE user_id = ?', uid, (err, oresult) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      const orderIds = oresult.map(row => row.order_id);

      // Fetch delivery details for each order
      db.query('SELECT * FROM delivary WHERE order_id IN (?)', [orderIds], (err, dresult) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        // Combine order and delivery details
        const deliveryDetails = oresult.map(order => {
          const deliveryDetail = dresult.find(delivery => delivery.order_id === order.order_id);
          return {
            delivery_detail: deliveryDetail
          };
        });

        res.status(200).json(deliveryDetails);
      });
    });
  });
});

router.post('/delivered',(req,res)=>{
  const {dornot,did} = req.body;
  console.log("blah:",dornot,did)
  db.query("UPDATE `delivary` SET `dornot` = ? WHERE `delivary`.`did` = ?; ",[dornot,did],(err,del)=>{
    if(err){
      console.log(err);
    }
    res.json(del);
  })
})









module.exports = router;
