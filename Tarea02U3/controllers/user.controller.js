const http = require('http');
const path = require('path');
const csv = require('fast-csv');
const status = require('http-status');
const jwt = require('jsonwebtoken');
const _config = require("../_config");


let _user;

const createUser = (req, res) => {
    const user = req.body;

    _user.create(user)
        .then((data)=> {
            res.status(200);
            res.json({msg:"Usuario creado correctamente", data: data});
        })
        .catch((err)=> {
            res.status(400);
            res.json({msg:"Error!!!!", data:err});
        })
}

const findAll = (req, res) =>{
    _user.find()
    .then((data) => {
        if(data.length == 0){
            res.status(status.NO_CONTENT);
            res.json({msg:"No se encontraron usuarios"});
        }else{
            res.status(status.OK);
            res.json({msg:" Exito!!! ",data:data});
        }
    })
    .catch((err)=>{
        res.status(status.BAD_REQUEST);
        res.json({msg:"Error!!!"});
    });
}

const deleteById = (req,res) =>{x
    const {id} = req.params;

    const params = {
        _id : id
    };
    //const id = req.params.id;
    _user.findByIdAndRemove(id)
    .then((data) => {
            res.status(status.OK);
            res.json({msg:"Exito!!!", data:data});
    })
    .catch((err)=>{
        res.status(status.NOT_FOUND);
        res.json({msg:"Error!!! No se encontraron",err:err});
    });

} 

const findAndUpdate = (req,res) => {
    
    _brand.findOneAndUpdate(params,req.body)
    .then((data)=>{
        
        res.status(status.OK);
        res.json({msg:"Exito!!!", data:data});

    }).catch((err)=>{
        res.status(status.NOT_FOUND);
        res.json({msg:"Error!!! No se encontraron",err:err});
    });

    
}
const findByOne = (req,res) => {
    const {id} = req.params;

    const params = {
        _id : id
    };

    _brand.findById(params)
    .then((data)=>{
        
        res.status(status.OK);
        res.json({msg:"Exito!!!", data:data});

    }).catch((err)=>{
        res.status(status.NOT_FOUND);
        res.json({msg:"Error!!! No se encontraron",err:err});
    });

    
}
/* mio
const login = (req,res) => {
    
    _user.findOne( {email: req.body.email,password: req.body.password})
    .then((data)=>{
        
        res.status(status.OK);
        res.json({msg:"Exito!!!", data:data});

    }).catch((err)=>{
        res.status(status.NOT_FOUND);
        res.json({msg:"Error!!! No se encontraron",err:err});
    });
    
} */
//dekl profe

const login = (req,res) => {
    const { email, password } = req.params;
    let query = {email:email,password:password};
    _user.findOne(query,"-password")
    .then((user)=>{
        if (user){
            const token = jwt.sign({email:email},_config.SECRETJWT);
            res.status(status.OK);
            res.json({
                msg:"Acceso exitoso",
                data: {
                    user:user,
                    token: token
                }
            });
        }else{
            res.status(status.NOT_FOUND);
            res.json({msg:"Error!!! No se encontro"})
        }
    })
    .catch((err) => {
        res.status(status.NOT_FOUND);
        res.json({msg:"Error!!! no se encontro",data:err})
    })
}

const muchos = async (req, res) => {
    const csvFilePath =
      "C:\\Users\\Keylord\\Documents\\Empresariales\\U3\\Tarea02\\users.csv";
    const csv = require("csvtojson");
    csv()
      .fromFile(csvFilePath)
      .then(jsonObj => {
        console.log(jsonObj);
       
      });
  
    const jsonArray = await csv().fromFile(csvFilePath);
  
    _user
      .create(jsonArray)
      .then(data => {
        res.status(200);
        res.json({ msg: "Usuarios han sido insertados ", data: data });
      })
      .catch(err => {
        res.status(400);
        res.json({ msg: "Error!!!!", data: err });
      });
  };


module.exports = (User) => {
    _user = User;
    return({
        createUser,
        findAll,
        deleteById,
        findAndUpdate,
        findByOne,
        login,
        muchos
    });
}
