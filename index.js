const express = require("express")
const app = express()
const db = require("./config/database")
const PORT = 3000

app.get("/createdb", (req, res)=>{
    let sql = "CREATE DATABASE expressDB"
    db.query(sql, (err, result)=>{
        if(err) throw err;
        res.send("Base de datos creada con éxitoo")
    })

})

app.get("/createTableProducts", (req, res)=>{
    let sql = "CREATE TABLE Products(id INT AUTO_INCREMENT,title VARCHAR(50), body VARCHAR(255), PRIMARY KEY(id))"
    db.query(sql, (err, result)=>{
        if(err) throw err;
            res.send("Tabla creada con éxitoo")
    })
})
    
app.get("/createTableCategories", (req, res)=>{
    let sql = "CREATE TABLE Categories(id INT AUTO_INCREMENT,title VARCHAR(50), body VARCHAR(255), PRIMARY KEY(id))"
    db.query(sql, (err, result)=>{
        if(err) throw err;
            res.send("Tabla creada con éxitoo")
    })

})

app.get("/createTableCat-Prod", (req, res)=>{
    let sql = "CREATE TABLE Categories_products(id INT AUTO_INCREMENT, id_cat INT, id_prod INT, FOREIGN KEY(id_cat) REFERENCES Products(id), FOREIGN KEY(id_prod) REFERENCES Categories(id), PRIMARY KEY(id))"
    db.query(sql, (err, result)=>{
        if(err) throw err;
            res.send("Tabla creada con éxitoo")
    })

})


app.listen(PORT, ()=>{
    console.log("El servidor está levantado");
})