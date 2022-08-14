const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./dbConnect');

//middlewares
app.use(express.json());
app.use(cors());

// this method return date string in (20 Apr 2022) form
const returnDateString= ()=>{
    const d = new Date();

    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)

    const finalDate = `${da} ${mo} ${ye}`;
    return finalDate;
};
console.log("heyyyyyyy");
console.log(returnDateString());

// 1- get all restaurents api // checked
app.get('/restaurents', async (req, res)=>{
    try{
        const response = await pool.query('SELECT * FROM restaurent');
        res.json(await response.rows);
    }catch(err){
        res.send("error");
    }
});

// 2- add a restaurent api. // checked
app.post('/restaurent', async (req, res)=>{

    try{
        var {name, location, contact, openingtime, closingtime} = req.body;
        const response = await pool.query("INSERT INTO restaurent (name, location, contact, openingtime, closingtime) VALUES($1,$2,$3,$4,$5) RETURNING *",[name,location,contact,openingtime,closingtime]);
        const length = response.rows.length;
        res.json(response.rows[length -1]);
    }catch(err){
        res.send("error");
    }
});

// 3- update a restaurent api. // checked
app.put('/restaurent/:id', async(req,res)=>{
        var id = req.params.id;
        console.log(id);
    try{
        let { name, location, contact, openingtime, closingtime} = req.body;
        console.log(name,location,contact,openingtime,closingtime);
        let response = await pool.query("UPDATE restaurent SET name=$1, location=$2, contact=$3, openingTime=$4, closingTime=$5 WHERE id=$6 RETURNING *", [name,location,contact,openingtime,closingtime, id]);
        let length = response.rows.length;
        res.json(response.rows[id]);
    }catch(error){
        res.send(error.message + id);
    }

});

// delete a restaurent api //check
app.delete('/restaurent/:id', async (req,res)=>{
    let id = req.params.id;
    try{
           let response =  await pool.query("DELETE FROM restaurent WHERE id=$1 RETURNING *",[id]);
            //show a notification
            const length = response.rows.length;
            res.json(response.rows[length-1]);
           
    }catch(error){
        res.send(error.message);
    }
})





// 4 - Log in api. // checked
app.get('/user', async (req, res)=>{
    var q = req.query;
    try{
        const response = await pool.query("SELECT * FROM users WHERE email=$1 AND password=$2 ", [q.email, q.password]);
        res.json(await response.rows);
    }catch(err){
        res.send("error");
    }
});

// 5 - signUp api. //checked
app.post('/user', async(req,res) =>{
    try{
        var {name, email, password} = req.body;
        const response = await pool.query("INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING *",[name, email,password]);
        let length = response.rows.length;
        res.json(response.rows[length-1]);
    }catch(err){
        res.send("error");
    }
});


app.listen(5100);