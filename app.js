const { Console } = require("console");
const express = require("express");
const app = express();
const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const dontenv = require('dotenv');
const bodyParser = require('body-parser');



 const app = express();
app.set('view engine', 'ejs');


// const { MongoClient } = require('mongodb');
const MongoClient = require('mongodb').MongoClient

class Blog {
    constructor(blog_title, blog_content,blog_image,entry_date ) {
      this.blog_title = blog_title;
      this.blog_content = blog_content;
      this.blog_image = blog_image;
      this.entry_date = entry_date;
    }
  }

const uri = "mongodb+srv://temka:Tz20020325@cluster0.pcbbn.mongodb.net/temkaDB?retryWrites=true&w=majority";
            // "mongodb+srv://dbDawa:<password>@cluster0.pcbbn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const collection = client.db("temka").collection("Blog");


app.set('view engine', 'ejs');

app.get('/', function (req, res) {

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true }); 
    let blog_arr = [];

    client.connect((error, result) => {
    const collection = client.db("DawaDB").collection("Blog");
    collection.find().toArray()
        .then(result => {
            blog_arr = result.slice();
        })
        .catch(error => console.error(error))
    });
    console.log(blog_arr)
    client.close();

    res.render('index', { blogs: blog_arr});
    // res.sendFile(__dirname +"/index.html")
    })


app.get("/CreateBlog", function(req, res) {
    res.sendFile(__dirname +"/CreateBlog.html")    
})

app.post('/CreateBlog', function (req, res) {

    var _title  = "blog 1"; 
    var _image_file  ="file1.jpg"; 
    var _content  = "this is content 1";
    var is_special = "0";//


    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect((error, result) => {
    const collection = client.db("temkaDB").collection("Blog");
    // collection.find().toArray()
    collection.insertOne({blog_content: "Content1", blog_title: "my blog1",isSpecial:"0", blog_image: "", entry_date: Date.now})
        .then(result => {
        console.log(result)
        })
        .catch(error => console.error(error))
    });
    client.close();
    });
app.use('/CSS', express.static('CSS'));
app.use('/CSS', express.static('CSS'));
app.use('/Images', express.static('Images'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(4000, function() {
    console.log("Server is started and listening at 4000");
})