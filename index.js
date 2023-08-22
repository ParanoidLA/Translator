const express =require('express');
const path= require("path"); 
const app=express();
const fs=require('fs');
const port = 80;

//Express

app.use('/static',express.static('static'))
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
// app.set('vlew engine', 'pug') // Set the template engine as pug app.set views , path.join dirname,
// app.set('views' , path.join(__dirname,'views'))

// //End points
// app.get('/',(req,res)=>{
//     const para= {};

//     res.status(200).render('homepage.pug')
// }) 


//Page linking

// const home=fs.readFileSync('homePage.html');
// const about=fs.readFileSync('./about.html');
// const login=fs.readFileSync('./loginPage.html');
// const dashboard=fs.readFileSync('./translated.html');
// const index=fs.readFileSync('./index.html');
// const contact=fs.readFileSync('./contact.html');


// app.get("/",(req,res)=>{
//     res.status(200).send(home);
// });
// app.get("/about",(req,res)=>{
//     res.status(200).send(about);
// });
// app.get("/login",(req,res)=>{
//     res.status(200).send(login);
// });
// app.get("/translated",(req,res)=>{
//     res.status(200).send(about);
// });
// app.get("/index",(req,res)=>{
//     res.status(200).send(index);
// });
// app.get("/contact",(req,res)=>{
//     res.status(200).send(contact);
// });


app.get("/",(req,res)=>{
    res.status(200).sendFile(path.join(__dirname, 'homePage.html'));
});
app.get("/about",(req,res)=>{
    res.status(200).sendFile(path.join(__dirname, 'about.html'));
});
app.get("/login",(req,res)=>{
    res.status(200).sendFile(path.join(__dirname, 'loginPage.html'));
});
app.get("/translated",(req,res)=>{
    res.status(200).sendFile(path.join(__dirname, 'translated.html'));
});
app.get("/index",(req,res)=>{
    res.status(200).sendFile(path.join(__dirname, 'index.html'));
});
app.get("/contact",(req,res)=>{
    res.status(200).sendFile(path.join(__dirname, 'contact.html'));
});



//Server hosting

app.listen(port,()=>{
    console.log(`This application started successfully on port ${port}`);
}); 