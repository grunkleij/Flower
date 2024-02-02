const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/flowers',(req,res)=>{
    db.query("select * from flowers",(err,result)=>{
        if(err){
            console.log(err);
        }
        res.json(result);
    });
    
})

router.post('/floweradd',(req,res)=>{
    const {fname, price, stock} = req.body;
  
    db.query("INSERT INTO `flowers` (`flowerName`, `fprice`, `stock`) VALUES (?, ?, ?);",[fname,price,stock],(err,result)=>{
      if(err){
        console.log(err);
      }
    res.json(result);   
    })
  })

  router.post('/updatestock', (req, res) => {
    const newStock = req.query.newStock;
    const id = req.query.fid;
  
    db.query("SELECT * FROM flowers WHERE fid=?", id, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      if (result.length === 0) {
        res.status(404).json({ error: 'Flower not found' });
        return;
      }
  
      const currentStock = result[0].stock;
      const updatedStock = currentStock + parseInt(newStock);
  
      db.query("UPDATE flowers SET stock=? WHERE fid=?", [updatedStock, id], (err, updateResult) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
  
        // Send the updated stock value in the response
        res.json({ updatedStock });
      });
    });
  });


module.exports = router;
