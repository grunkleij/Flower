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
    const username=req.body.username;
    db.query("select * from users where uname=?",username,(err,result)=>{
        if(err){
            console.log(err);
        }
        res.json(result);
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
