const express = require('express')
const app = express();
const path = require('path');
const fs = require('fs');
const e = require('express');
const { name } = require('ejs');
const { log } = require('console');


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));


app.use('/', (req, res, next) => {
    console.log("chal rha hai");
    next();
});

app.get('/', function(req, res) {
    fs.readdir(`./tasks`, function (err, files) {
        if (err) {
            console.log("something went wrong!!");
        }
        console.log(files);
        res.render('index', {files: files});
    });
});

app.get('/tasks/:fileName', (req, res)=> {
    fs.readFile(`./tasks/${req.params.fileName}`, "utf-8", (err, data)=> {
        if(err) console.log(err);
        res.render('show', { fileName: req.params.fileName, fileContent: data });
    })
})


app.post('/create', function(req, res) {
   fs.writeFile(`./tasks/${req.body.title.split(' ').join('')}.txt`, req.body.task, (err)=> {
    if (err) console.log(err);
    else {
        console.log("task created successfully");
        res.redirect('/');
    }
   })
})

app.post('/delete', (req, res) => {
    const filePath = `./tasks/${req.body.fileName}`;
    fs.unlink(filePath, (err)=> {
        if (err) console.log(err);
        else {
            console.log("task deleted successfully");
            res.redirect('/');
        }
    })
})


app.listen(3000)