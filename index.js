import 'dotenv/config'
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

let teaData = [];
let nextId = 1;


//Create a Tea
app.post('/teas', (req, res) => {
    const { name, price } = req.body;
    const newTea = { id: nextId++, name, price };
    teaData.push(newTea);
    res.status(201).send(newTea);
})


// Get all tea
app.get('/all-tea', (req, res) => {
    res.status(200).send(teaData);
})

// Get Specific tea using id
app.get("/tea/:id", (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send("Tea not found");
    }
    return res.status(201).send(tea);
});

// Update tea
app.put('/tea/:id', (req,res)=>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send("Tea not found");
    }

    const {name,price} = req.body;
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea);

})


// Delete tea
app.delete('/tea/:id', (req,res)=>{
    const teaIndex = teaData.findIndex(t=>t.id === parseInt(req.params.id));
    if(teaIndex === -1){
        return res.status(404).send("Tea not found");
    }

    teaData.splice(teaIndex,1);
    return res.status(204).send("Deleted");
})


app.listen(port, () => {
    console.log('Server running at http://127.0.0.1:8000');
})