const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

const app = express();

app.use(cors());

app.use(express.static('./public'));
const port = 3000;

const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        const ext = file.originalname.split('.').pop();
        //split divide por partes y lo "mete en un array",entonces todo el primer item y pop saca el ultimo elemento del array
        const fileNameOriginal = file.originalname.split('.')[0];
        const fileName = Date.now();
        callback(null, `${fileNameOriginal}-${fileName}.${ext}`);
    },

    destination: function (req, file, callback) {
        callback(null, './public');
    }
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.body);
    res.send({ data: "OK", url: "http://localhost:3000/" + req.file.filename });
});

app.listen(port, () => {
    console.log(`Escuchando en el puerto http://localhost:${port}`);
}
);

//get all the files in the carpet named public
app.get('/files', (req, res) => {
    fs.readdir('./public', (err, files) => {
        if (err) {
            console.log(err);
            res.send({ error: err });
        } else {
            res.send({ files });
        }
    });
});

//download a file from the public folder by name 
app.get('/download/:name', (req, res) => {
    const { name } = req.params;
    res.download(`./public/${name}`);
}
);

app.get('/bienvenidomag', (req, res) => {
    res.send({ data: "Estás conectao a la mejor api de esta mondá " })
});