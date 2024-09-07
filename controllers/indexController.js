const connection = require('../config/db')
const bcrypt = require("bcrypt");


class IndexController{
  //lleva al home donde se ven inmboliarias
  viewHome = (req, res)=>{

    let sql = 'SELECT * FROM real_estate WHERE r_isdeleted = 0'
    connection.query(sql, (err, result)=>{
      if(err) throw err

      res.render('index', {result});
    })
    
  }

  //lleva a la pagina para agregar inmboliarias
  showFormCreateInm = (req, res)=>{
    res.render("addinm");
  }

  createinm = (req, res) => {
    const {name, email, password, r_description, tel} = req.body;
    console.log(req.body);

    //encriptar pass
    let saltRounds = 8;
    bcrypt.hash(password, saltRounds, (hashErr, hash)=>{
      if(hashErr) throw hashErr;
      let data = [name, email, hash, r_description, tel]

      //Insert sin foto
      let sql = 'INSERT INTO real_estate (name, email, password, r_description, tel) VALUES (?,?,?,?,?)'

      //inser con foto
      if(req.file != undefined){
        sql = 'INSERT INTO real_estate (name, email, password, r_description, tel, r_img) VALUES (?,?,?,?,?,?)'
        data.push(req.file.filename);
      }
      
      connection.query(sql, data, (err, result)=>{
        if(err) throw err
        res.redirect('/');
      })

    })
  }


  showOneInm = (req, res)=>{
    const id = req.params.id;

    let sql = `SELECT * FROM real_estate WHERE r_id = ${id} AND r_isdeleted = 0`;
    connection.query(sql, (err, result)=>{
      if (err) throw err
      let sqlHouse = `SELECT * FROM house WHERE r_id = ${id} AND h_isdeleted = 0`
      connection.query(sqlHouse, (err2, resultHouse)=>{
        if (err2) throw err2;
        res.render('oneInm', {inm: result[0], resultHouse})
      })
    })
  }

  showAddHouse = (req, res)=>{
    const id = req.params.id;
    console.log(req.params)
    let sql = `SELECT * FROM real_estate WHERE r_id = ${id} AND r_isdeleted = 0`

    connection.query(sql, (err, result)=>{
      if(err) throw err
      res.render('addhouse', {inm: result[0]})
    })
    
  }

  createHouse = (req, res)=>{
    const id = req.params.id;
    const {location, address, year, mtrs, h_description,} = req.body;
    let data = [location, address, year, mtrs, h_description, req.file.filename, id]
    
    
    let sqlsiimg = `INSERT INTO house (location, address, year, mtrs, h_description, h_img, r_id) VALUES (?,?,?,?,?,?,?)`
    if(req.file != undefined){

      connection.query(sqlsiimg, data,(err, result)=>{
        if (err) throw err
        res.redirect(`/oneinm/${id}`)
      })
      
    }
    else{

      let sqlnoimg = `SELECT * FROM house WHERE h_id = ${id} AND h_isdeleted = 0` 
      connection.query(sqlnoimg, (err, result)=>{
        if (err) throw err
        res.render("oneinm", {result: result[0]})
      })
      
    }   
  }  


}

module.exports = new IndexController;