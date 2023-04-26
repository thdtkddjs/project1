const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
app.set('view engine', 'pug')

app.get('/api', (req,res) => {

    var messages=[
        'bear',
        'mouse',
        'donkey'
    ];

    var output = messages[req.query.id];
    res.render('index', {
        title : 'Hey',
        message : output, 
        content : 'i wanna be all i can be!',
        time : "지금 이 순간"})
})

app.listen(port, () => {
    console.log(`server is listening at localhost:${process.env.PORT}`);
});