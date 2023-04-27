module.exports= (app, dbClient, mapper, format, session) => {
    const router=require('express').Router();
    const md5= require('md5');
    const crypto=require('crypto');
    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({extended : true}));

    app.use(session({
        secret: 'your_secret_key_here',
        resave: false,
        saveUninitialized: false
    }));

    app.get('/api/createTable', (req,res)=>{
        let param={};
        const query = mapper.getStatement('testMapper', 'createTester', param, format);
        const result = dbClient.query(query, (error, result)=>{
            if(error){
                res.sendStatus(500);
            }else{
                res.sendStatus(201);
            }
        })
    })

    app.get('/api/select', (req, res)=>{
        let param = {};
        const query = mapper.getStatement('testMapper', 'selectAll', param, format);
        const result = dbClient.query(query, (error, result) =>{
            if(error){
                res.sendStatus(500);
            }else{
                const data = res.json(result.rows);
            }
        });
    });
    app.get('/api/insertjunk',(req, res)=>{
        let param = {
            name : 'junk',
            addr : 'chunk'
        };
        const query = mapper.getStatement('testMapper', 'insertJunk', param, format);
        const result = dbClient.query(query, (error, result) =>{
            if(error){
                res.sendStatus(500);
            }else{
                res.json(result.rows);
            }
        });
    })
    
    app.get('/api/updateIt',(req, res)=>{
        let param = {
            name : 'junk',
            addr : 'chunk2'
        };
        const query = mapper.getStatement('testMapper', 'updateIt', param, format);
        const result = dbClient.query(query, (error, result) =>{
            if(error){
                res.sendStatus(500);
            }else{
                res.sendStatus(200);
            }
        });
    })
    
    app.get('/api/deleteThis',(req, res)=>{
        let param = {
            name : 'junk'
        };
        const query = mapper.getStatement('testMapper', 'deleteThis', param, format);
        const result = dbClient.query(query, (error, result) =>{
            if(error){
                res.sendStatus(500);
            }else{
                res.sendStatus(200);
            }
        });
    })

    app.post('/api/signup', (req,res)=>{
        //암호화를 위한 salt 생성
        const salt = crypto.randomBytes(5).toString('base64');
        
        const id = req.body.id;
        //pwd와 조합하여 암호화한 값을 DB에 등록
        const pwd = md5(req.body.pwd + salt);
        //pwd에 salt까지 포함한 버전
        //const pwd = salt + md5(req.body.pwd + salt);
        const name = req.body.name;

        let param = {
            id : id,
            pwd : pwd,
            salt : salt,
            name : name
        };

        console.log(param);
        const query = mapper.getStatement('testMapper', 'insertUser', param, format);
        const result = dbClient.query(query, (error, result) =>{
            if(error){
                res.sendStatus(500);
            }else{
                res.json(param.id);
            }
        });
    })

    app.post('/api/login', (req,res) =>{
        const id = req.body.id;
        const name = req.body.name;
        const pwd = req.body.pwd;

        param = {
            id : id
        };

        //ID로부터 타겟 데이터 뽑아내기
        const query = mapper.getStatement('testMapper', 'selectId', param, format);
        const result = dbClient.query(query, (error, result) =>{
            if(error){
                res.sendStatus(500);
            }else{
                //result로부터 salt 추출
                const salt = result.rows[0].salt;
                //result의 pwd에 포함된 salt 추출
                //const pwd = result.rows[0].pwd;
                //const salt = pwd.charAt(4);
                
                //salt와 조합하여 md5로 암호화된 pwd 얻어내기
                const pwd2 = md5(pwd + salt);
                const Dpwd=result.rows[0].pwd;
                //pwd에서 salt를 제거한 pwd
                //const Dpwd=result.rows[0].pwd.charAt(5,100);
                
                //비밀번호가 일치시
                if(pwd2==result.rows[0].pwd){
                    //세션에 아이디 담기
                    req.session.userId=id;
                    //성공 메시지 출력(추후 팝업창으로 대체)
                    res.json({message:'success!'});
                    console.log('success!');
                }else{
                    //실패 메시지 출력
                    res.json({message:'invalid credentials!'})
                }
            }
        });
    })

    return router;
}