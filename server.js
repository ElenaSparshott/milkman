import express from "express"
import pg from "pg"
const app = express();

// app.set("view engine", "ejs")

app.listen(3000)

const pool = new pg.Pool({
    database: "milkman"
})

// app.get("/", (req, res) => {
//     res.render("index")
// })

app.get("/order/:customer_name", (req,res) => {
    let name = req.params.customer_name
    let dbquery = {
        text: 'SELECT * from public.order WHERE customer = $1',
        values: [name]
    }
    console.log(name)
    pool.query(
        dbquery,
        (err, dbresult) => {

        let orders = dbresult.rows.map(row => {
            return {
                product: row.product,
                quantity: row.quantity
            }
        })
        // let orders = []
        // for(let row of dbresult.rows) {
        //     orders.push({
        //         product: row.product,
        //         quantity: row.quantity
        //     })
        // }

        res.json(orders)
          
    })
})

app.use(express.static('public'))
