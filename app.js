const express = require('express')
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

const services = require("./services/services");
app.use("/api", services);


app.listen(5400, () => console.log('Listening on port 5400'))


// app.get('/api/getquotes', (req,res) => {
//     res.send(quotes);
// });


// app.get('/api/getquotes/:id', (req,res) => {
//     const id = quotes.find(quote => quote.id === parseInt(req.params.id))
//     if (!id) res.status(404).send('the quote with the given id nt found');
//     res.send(id);
// });

// app.post('/api/addquotes', (req,res) => {
//     const quote = {
//         id: quotes.length +1,
//         content: req.body.content,
//         writer: req.body.writer,
//     }
//     quotes.push(quote);
//     res.send(quotes)
// });

// app.put('/api/changewriter/:id', (req,res) => {
//     const id = quotes.find(quote => quote.id === parseInt(req.params.id))
//     if (!id) res.status(404).send('the quote with the given id nt found');

//     id.writer = req.body.writer
//     res.send(quotes)

// });

// app.get('/api/getrandom', (req, res) => {
//     const rand = getRandomElementFromArray(quotes)
//     // const id = quotes.find(quote => quote.id === parseInt(rand))
//     // if (!id) res.status(404).send('the quote with the given id nt found');

//     res.send(rand)

// })

// function getRandomElementFromArray(arr) {

//     // Generate a random index within the range of the array's length
//     const randomIndex = Math.floor(Math.random() * arr.length);

//     // Return the element at the random index
//     return arr[randomIndex];
// }