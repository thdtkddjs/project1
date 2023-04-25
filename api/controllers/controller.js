const md5=require('md5');
const todoModel = require("../models/user_model");

const todoController = {
    selectId:(req,res)=>{
        const id = req.body.id;
        todoModel.selectId(id, (error,result)=>{
            if(error){
                if(error){
                    res.send(error);
                }else{
                    res.json(result.rows);
                }
            }
        })
    },

    insertUser:(req,res)=>{
        //암호화를 위한 salt 생성
        const salt = crypto.randomBytes(5).toString('base64');
        
        const id= req.body.id;
        const pwd = md5(req.body.pwd + salt);

        //const pwd = salt + md5(req.body.pwd + salt);
        const name=req.body.name;

        todoController.insertUser(id, pwd, name, salt, (error,result)=>{
            if(error){
                res.sendStatus(500);
            }else{
                res.json(param.id);
            }
        })
    }
}

module.exports=todoController;