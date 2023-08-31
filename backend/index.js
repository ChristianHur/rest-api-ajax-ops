const express = require('express');
const app = express();
const cors = require('cors');
const {books} = require('./models/books');

const port = 8080;
const server = `http://localhost:${port}`;
app.listen(port,()=> console.log(`Server is running at: ${server}`));

//CORS - cross-origin resource sharing
app.use(cors())

//encode document
app.use(express.urlencoded({extended: false}));

//parsing JSON
app.use(express.json());


// APIs and rest code

//Test server
app.get('/',(req,res)=>{
    res.json({"msg":"It's working!"});
})

//GET ALL records:  /api/
app.get('/api/',(req,res)=>{    
    // setTimeout(()=>{
    //     res.json(books);
    // },5000);
    res.json(books);
})

//GET ONE records:  /api/:id
app.get('/api/:id',(req,res)=>{
    const id = req.params.id;
    
    //if found record, return index position
    //else return -1
    const index = books.findIndex( (book)=> book.id==id )    
    const record = (index != -1) ? [books[index]] : ["No Record Found."];
    res.json(record);
})

//DELETE ONE Record:  /api/:id
app.delete('/api/:id',(req,res)=>{
    const id = req.params.id;
    let message = "No Record Found.";
    //if found record, return index position
    //else return -1
    const index = books.findIndex( (book)=> book.id==id )
    
    if(index != -1){
        books.splice(index,1);
        message = "Record Deleted."
    }
    res.json(message);
})

//DELETE ALL Records:  /api/
app.delete('/api/',(req,res)=>{
    books.splice(0);
    res.json('All Records Deleted.');
});

//POST - Inserting a new record:  /api/
app.post('/api/',(req,res)=>{
    const newBook = req.body;
    console.log(newBook);
    //newBook = JSON.parse(Object.keys(newBook));
    //console.log(newBook);
    books.push(newBook);
    
    //Should check for duplicates
    res.json("New Book Added.");
})

//PUT - Updating an existing record:  /api/:id
app.put('/api/:id',(req,res)=>{
    let message = "No Record Found.";
    const newBook = req.body;
    const id = req.params.id;
    const index = books.findIndex( (book)=> book.id==id )
    
    if(index != -1){
        books[index] = newBook;
        message = "Record Updated."
    }
    res.json(message);
})
