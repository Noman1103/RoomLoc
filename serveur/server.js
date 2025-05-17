const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());

// Configuration de Multer pour stocker les fichiers dans le répertoire "uploads"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const userId = req.body.id;
        const uploadDir = path.join('public/img/id_logement', userId);;
        if (!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.array('images', 10), (req, res) => {
    try {
        res.json({ message: 'Images uploaded successfully!', files: req.files });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while uploading images');
    }
});

app.listen(5000, () => {
    console.log('Server started on http://localhost:5000');
});
