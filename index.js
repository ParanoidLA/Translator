const express =require('express');
const path= require("path"); 
const app=express();
const fs=require('fs');
const port = 3000;
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Translator');

    console.log("We are in the database")
}

//Express
// Set content type for HTML pages
app.use((req, res, next) => {
    res.setHeader("Content-Type", "text/html");
    next();
  });
app.use('/assets',express.static('assets'))
app.use('/assets/style', express.static('/assets/style'));
// app.use(express.urlencoded())

// PUG SPECIFIC STUFF
// app.set('vlew engine', 'pug') // Set the template engine as pug app.set views , path.join dirname,
// app.set('views' , path.join(__dirname,'views'))

// //End points
// app.get('/',(req,res)=>{
//     const para= {};

//     res.status(200).render('homepage.pug')
// }) 


//Page linking
const home = fs.readFileSync('homePage.html');
const about = fs.readFileSync('./about.html');
const login = fs.readFileSync('./loginPage.html');
const dashboard = fs.readFileSync('./translated.html');
const index = fs.readFileSync('./index.html');
const contact = fs.readFileSync('./contact.html');

app.get("/", (req, res) => {
  res.status(200).send(home);
});

app.get("/about", (req, res) => {
  res.status(200).send(about);
});

app.get("/login", (req, res) => {
  res.status(200).send(login);
});

app.get("/translated", (req, res) => {
  res.status(200).send(dashboard);
});

app.get("/index", (req, res) => {
  res.status(200).send(index);
});

app.get("/contact", (req, res) => {
  res.status(200).send(contact);
});

// Define a schema for your collection
const translatedSchema = new mongoose.Schema({

  Senteces: String,
  Hindi: String,
  Marathi: String,
  Bhojprui: String,
  inHindi: Boolean,
  inMarathi: Boolean,
  inBhojpuri: Boolean,
  hindiUser: mongoose.SchemaTypes.ObjectId,
  marathiUser: mongoose.SchemaTypes.ObjectId,
  bhojpuriUser: mongoose.SchemaTypes.ObjectId
});



// Provide the explicit collection name "Translated" when creating the model
const Translated = mongoose.model('Translated', translatedSchema, 'Translated');
async function accessTranslatedCollection() {
  try {
    const translatedSentences = await Translated.find(); // Retrieve all documents from the "Translated" collection
    console.log(translatedSentences);
  } catch (error) {
    console.error(error);
  }
}

accessTranslatedCollection();


module.exports = Translated;
app.get('/sentences', async (req, res) => {
  try {
    const sentences = await Translated.find({}, 'Senteces');
    res.json(sentences); // Send the sentences as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//Server hosting

app.listen(port,()=>{
    console.log(`This application started successfully on port ${port}`);
}); 

