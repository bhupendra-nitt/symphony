const express = require('express');
const fs = require('fs'); 
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const port = 5000;
const app = express();
app.use(cors())
app.use(bodyParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'public')
},
  filename: function (req, file, cb) {
    cb(null, 'hello.txt' )
  }
})

var upload = multer({ storage: storage }).single('file')
const mockData = [
  {name: 'hello', state: 'Boston', address: "123  any street", zipcode: 53453},
  {name: 'hello', state: 'Boston', address: "123  any street", zipcode: 53453},
  {name: 'hello', state: 'Boston', address: "123  any street", zipcode: 53453}
];

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  next();
});

app.get('/list', (req, res) => {
  const filePath = path.join(__dirname, '/public/hello.txt')
  fs.readFile(filePath, (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const delimiter = req.query.delimter
  const lines = req.query.lines;
  const json = csvUpload(data.toString(), delimiter)
  const result = json.slice(0, lines);
    return res.send(result)
  })
})

app.post('/upload-file', (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }
    return res.status(200).send(req.file)
  })
})

function csvUpload(csvText, delimiter){
  const allTextLines = csvText.split(/\r\n|\n/);
  const result = [];

  for (var i=0; i<allTextLines.length; i++) {
      const data = allTextLines[i].split(delimiter);
      const res = {name: data[0], state :data[1], address:data[2], zipcode: data[3]};
      result.push(res);
  }
  return result;
}

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))
