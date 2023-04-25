module.exports= (app, session, ejs) => {
    const router=require('express').Router();


    app.get('/',(req, res)=>{
        res.render('index',{
            session: req.session.userId
        })

    })

    app.get('/signup',(req, res)=>{
        res.render('signup', {

        })

        console.log(req.query.id+req.query.pwd);
    })

    app.get('/login',(req, res)=>{
        res.render('login', {

        })

        console.log(req.query.id+req.query.pwd);
    })
    return router;
}