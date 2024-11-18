const express = require("express")
const app = express()
const db = require("./config/database")
const PORT = 3000

app.use(express.json())

//Crea endpoint de base de datos 
app.get("/createdb", (req, res)=>{
    let sql = "CREATE DATABASE expressDB"
    db.query(sql, (err, result)=>{
        if(err) throw err;
        res.send("Base de datos creada con éxitoo")
    })

})

//Crea las siguientes tablas usando Express y MySQL como hemos visto en clase
app.get("/createTableProducts", (req, res)=>{
    let sql = "CREATE TABLE Products(id INT AUTO_INCREMENT,name_product VARCHAR(50),price INT, PRIMARY KEY(id))"
    db.query(sql, (err, result)=>{
        if(err) throw err;
            res.send("Tabla creada con éxitoo")
    })
})
    
app.get("/createTableCategories", (req, res)=>{
    let sql = "CREATE TABLE Categories(id INT AUTO_INCREMENT, name_category VARCHAR(50), description VARCHAR(50), PRIMARY KEY(id));"
    db.query(sql, (err, result)=>{
        if(err) throw err;
            res.send("Tabla creada con éxitoo")
    })

})

//*Recuerda que en el caso de una relación muchos a muchos necesitarás una tabla intermedia.
app.get("/createTableCat-Prod", (req, res)=>{
    let sql = "CREATE TABLE Categories_products(id INT AUTO_INCREMENT, id_cat INT, id_prod INT, FOREIGN KEY(id_cat) REFERENCES Products(id), FOREIGN KEY(id_prod) REFERENCES Categories(id), PRIMARY KEY(id))"
    db.query(sql, (err, result)=>{
        if(err) throw err;
            res.send("Tabla creada con éxitoo")
    })

})

//Crea un endpoint para añadir un producto nuevo y añade 2 productos nuevos desde el postman
app.post("/addProductPostman", (req, res)=>{
    let sql = `INSERT INTO Products(name_product, price) values ("${req.body.name}", ${req.body.price})`
    db.query(sql, (err, result)=>{
        if(err) throw err;
            res.send("Producto añadido con éxito")
    })

})

//Crea un endpoint para crear una categoría y añade 2 categorías nuevas desde el postman
app.post("/addCategoryPostman", (req, res)=>{
    let sql = `INSERT INTO Categories(name_category, description) values ("${req.body.name}", "${req.body.description}")`
    db.query(sql, (err, result)=>{
        if(err) throw err;
            res.send("Categoria añadida con éxito")
    })

})

// Crea un endpoint para actualizar un producto.
app.put("/updateProduct/:id", (req, res)=>{
    let sql = `UPDATE Products SET price = ${req.body.price} WHERE id = ${req.params.id}`
    db.query(sql, (err, result)=>{
        if(err) throw err;
            res.send("Producto actualizado con éxito")
    })

})

// Crea un endpoint para actualizar una categoría.
app.put("/updateCategory/:id", (req, res)=>{
    let sql = `UPDATE Categories SET name_category = "${req.body.name}" WHERE id = ${req.params.id}`
    db.query(sql, (err, result)=>{
        if(err) throw err;
            res.send("Categoria actualizada con éxito")
    })

})

//Crea un endpoint que muestre todos los productos HECHO
app.get("/showProducts", (req, res)=>{
    let sql = "SELECT * FROM Products"
    db.query(sql, (err, result)=>{
        if(err) throw err;
            res.send(result)
    })

})

// Crea un endpoint que muestre todas las categorías HECHO
app.get("/showCategories", (req, res)=>{
    let sql = "SELECT * FROM Categories"
    db.query(sql, (err, result)=>{
        if(err) throw err;
            res.send(result)
    })

})

// Crea un endpoint que muestra todos los productos con sus categorías FALLA
app.get("/showProductsAndCategories", (req, res)=>{
    let sql = "SELECT name_prodcut, name_category FROM Categories_products INNER JOIN Categories ON Categories.id = Categories_products.id_cat INNER JOIN Products ON Products.id = Categories_products.id_prod"
    db.query(sql, (err, result)=>{
        if(err) throw err;
            res.send(result)
    })

})

// Crea un endpoint donde puedas seleccionar un producto por id HECHO
app.get("/showProductById/:id", (req, res)=>{
    let sql = `SELECT * FROM Products WHERE id = ${req.params.id}`
    db.query(sql, (err, result)=>{
        if(err) throw err;
            res.send(result)
    })

})

// Crea un endpoint que muestre de forma descendente los productos. HECHO
app.get("/showProductsDesc", (req, res)=>{
    let sql = "SELECT * FROM Products ORDER BY id DESC"
    db.query(sql, (err, result)=>{
        if(err) throw err;
            res.send(result)
    })

})
// Crea un endpoint donde puedas seleccionar una categoría por id HECHO
app.get("/showCategoryById/:id", (req, res)=>{
    let sql = `SELECT * FROM Categories WHERE id = ${req.params.id}`
    db.query(sql, (err, result)=>{
        if(err) throw err;
            res.send(result)
    })

})
// Crea un endpoint donde puedas buscar un producto por su nombre HECHO
app.get("/showProductByName/:name", (req, res)=>{
    let sql = `SELECT * FROM Products WHERE name_product = '${req.params.name}'`
    db.query(sql, (err, result)=>{
        if(err) throw err;
            res.send(result)
    })

})
// Crea un endpoint donde puedas eliminar un producto por su id HECHO
app.delete("/deleteProduct/:id", (req, res)=>{
    let sql = `DELETE FROM Products WHERE id = ${req.params.id}`
    db.query(sql, (err, result)=>{
        if(err) throw err;
            res.send("Producto eliminado correctamente")
    })

})


app.listen(PORT, ()=>{
    console.log("El servidor está actualizado");
})