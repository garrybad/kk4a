//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
const { request } = require('http');
const { response } = require('express');
const app = express();

//Create Connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'biodata_db'
});

//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});

//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set folder public as static folder for static file
app.use('/assets',express.static(__dirname + '/public'));

//route for homepage
app.get('/',(req, res) => {
  let sql = "SELECT * FROM biodata";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('product_view',{
      results: results
    });
  });
});

//route for detail biodata
app.get('/detail',(req, res) => {
  let sql = "SELECT * FROM biodata WHERE biodata_id"; 
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('biodata_detail',{
      results: results
    });
  });
});

//route for insert data
app.post('/save',(req, res) => {
  let data = {nama: req.body.nama, ttl: req.body.ttl, alamat: req.body.alamat, email: req.body.email, no_hp_siswa: req.body.no_hp_siswa, agama: req.body.agama, anak_ke: req.body.anak_ke, nama_ayah: req.body.anak_ke, nama_ibu: req.body.nama_ibu, no_hp_ortu: req.body.no_hp_ortu, alamat_ortu: req.body.alamat_ortu, pekerjaan_ayah: req.body.pekerjaan_ayah, pekerjaan_ibu: req.body.pekerjaan_ibu, jenis_kelamin: req.body.jenis_kelamin};
  let sql = "INSERT INTO biodata SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});

//route for update data
app.post('/update',(req, res) => {
  let sql = "UPDATE biodata SET nama='"+req.body.nama+"', ttl='"+req.body.ttl+"', alamat='"+req.body.alamat+"', email='"+req.body.email+"', no_hp_siswa='"+req.body.no_hp_siswa+"', agama='"+req.body.agama+"', anak_ke='"+req.body.anak_ke+"', nama_ayah='"+req.body.nama_ayah+"', nama_ibu='"+req.body.nama_ibu+"', no_hp_ortu='"+req.body.no_hp_ortu+"', alamat_ortu='"+req.body.alamat_ortu+"', pekerjaan_ayah='"+req.body.pekerjaan_ayah+"', pekerjaan_ibu='"+req.body.pekerjaan_ibu+"', jenis_kelamin='"+req.body.jenis_kelamin+"' WHERE biodata_id="+req.body.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});

//route for delete data
app.post('/delete',(req, res) => {
  let sql = "DELETE FROM biodata WHERE biodata_id="+req.body.biodata_id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/');
  });
});

//server listening
app.listen(3000, () => {
  console.log('Server is running at port 3000');
});
