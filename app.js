const express = require('express');
const path = require('path');
const bodyParser= require('body-parser');
const cors = require('cors')
const app = express();
const users= require('./routes/users');
const uploads= require('./routes/uploads');
const deletions= require('./routes/deletions');
const mongoose = require('mongoose');
const { upload } = require('./helpers/storage');
const port = 5000;


const fs = require('fs')
// path to the builder webpack 5 config
const webpackFile = 'node_modules/@angular-devkit/build-angular/src/webpack/configs/browser.js'


fs.readFile(webpackFile, 'utf8', function(err, data) {
  if (err) {
    return console.log(err)
  }

  // make sure the file is not already patched
  const alreadyPatched = data.match(/fallback: {/g);
  if (alreadyPatched && alreadyPatched.length > 0) return;
  
  // if not patched already add the fallback options for the packages you need
  // it is possible to add "false" instead of providing a browserify package
  // you can add all packages required by your app here
  var result = data.replace(/resolve: {/g, `resolve: {
    fallback: {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        fs: require.resolve('browserify-fs')
    },`)

  fs.writeFile(webpackFile, result, 'utf8', function(err) {
    if (err) return console.log(err)
  })
});


//|| 'mongodb://localhost:27017/houseRent'
mongoose.connect("mongodb://localhost:27017/houseRentRefined" , {
    useNewUrlParser: true,
    useUnifiedTopology:true,
});

mongoose.connection.on('connected', ()=> {
    console.log('Database Connected to  '+ 'mongodb://localhost:27017/houseRentRefined')})

app.use(cors());
    

app.use(bodyParser.json());
app.use("/images", express.static(path.join("images")));  
app.use('/users', users);
app.use('/uploads', uploads);
app.use('/deletions', deletions);


 




app.listen(port, ()=> {
    console.log('Server Connected to' + port)
})

