const http = require('http');
const path = require('path');
const status = require('http-status');

let _brand;

const createBrand = (req, res) => {
    const brand = req.body;

    _brand.create(brand)
        .then((data)=> {
            res.status(200);
            res.json({msg:"Marca creada correctamente", data: data});
        })
        .catch((err)=> {
            res.status(400);
            res.json({msg:"Error!!!!", data:err});
        })
}

const findAll = (req, res) =>{
    _brand.find()
    .then((data) => {
        if(data.length == 0){
            res.status(status.NO_CONTENT);
            res.json({msg:"No se encontraron marcas"});
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
    _brand.findByIdAndRemove(id)
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


module.exports = (Brand) => {
    _brand = Brand;
    return({
        createBrand,
        findAll,
        deleteById,
        findAndUpdate,
        findByOne
    });
}
