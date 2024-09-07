const connection = require('../config/db');

class HousesController{ 


  getall = (req,res)=>{
    const id = req.params.id;
    let sql =`SELECT * FROM house WHERE h_isdeleted = 0`
    connection.query(sql, (err, result)=>{
      if (err) throw err
      res.render('houses', {houses: result})
    })
  }


  showFormEdit = (req, res)=>{
    const id = req.params.id
    let sql = `SELECT * FROM house WHERE h_id = ${id} AND h_isdeleted = 0`
    connection.query(sql, (err, result)=>{
      if(err) throw err
      res.render('formEditHouse', {edit:result[0]})
    })
  }

  edit = (req, res)=>{
    const id = req.params.id
    const inmoid = req.params.inmoid
    const {location, address, year, mtrs, h_description} = req.body

    let sql = `UPDATE house SET location = ?, address = ?, year = ?, mtrs = ?, h_description = ? WHERE h_id = ${id}`
    let values = [location, address, year, mtrs, h_description]

    connection.query(sql, values,(err, result)=>{
      if(err) throw err
      res.redirect(`/oneinm/${inmoid}`)
    })

  }

  delete = (req, res)=>{
    let id = req.params.id
    let inmoid = req.params.inmoid

    let sql = `DELETE FROM house WHERE h_id = ${id}`

    connection.query(sql, (err, result)=>{
      if (err) throw err
      res.redirect(`/oneinm/${inmoid}`)
    })
  }

  logicDelete = (req, res)=>{
    let id = req.params.id
    let sql = `UPDATE house SET h_isdeleted = 1 WHERE h_id = ${id}`

    connection.query(sql, (err, result)=>{
      if(err) throw err
      res.redirect('/')
    })
  }


}


module.exports = new HousesController;