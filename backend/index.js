const express = require('express');
const db = require('./db');
const cors = require('cors');

const app = express();

const PORT = 4000;

app.use(cors());
app.use(express.json());

app.post('/api/create', (req, res) => {
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

app.get('/api/users',(req,res)=>{
    const email=req.query.email;
    db.query("select * from users where email=?",email,(err,result)=>{
        if(err){
            console.log(err);
        }
        res.json(result);
    })
})

app.get('/api/flowers',(req,res)=>{
    db.query("select * from flowers",(err,result)=>{
        if(err){
            console.log(err);
        }
        res.json(result);
    });
    
})

//updating the stocks

app.post('/api/updatestock', (req, res) => {
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

  //employee singup
  app.post('/api/emp', (req, res) => {
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

//employee login
app.get('/api/emplogin',(req,res)=>{
  const email=req.query.email;
  db.query("select * from employee where empemail=?",email,(err,result)=>{
      if(err){
          console.log(err);
      }
      res.json(result);
  })
})

//flower add
app.post('/api/floweradd',(req,res)=>{
  const {fname, price, stock} = req.body;

  db.query("INSERT INTO `flowers` (`flowerName`, `fprice`, `stock`) VALUES (?, ?, ?);",[fname,price,stock],(err,result)=>{
    if(err){
      console.log(err);
    }
  res.json(result);   
  })
})

// add to cart 
app.post('/api/addtocart',(req,res)=>{
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

//cartnumber

app.get('/api/cartnum',(req,res)=>{
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

app.get('/api/cartflower', (req, res) => {
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

      res.json(result);
    });
  });
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
