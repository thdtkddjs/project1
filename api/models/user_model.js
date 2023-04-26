const MybatisMapper=require('mybatis-mapper');
const {Pool} = require('pg');

const pool = new Pool({
    user: "test",
    host: "localhost",
    database: "postgres",
    password: "2119",
    port: 5432
});
MybatisMapper.createMapper(['./resources/testmapper.xml']);
let format = {language: 'sql', indent: ' '};

const testModel = {
    selectId:(id, callback)=>{
        let param = {
            id:id
        };
        let query = MybatisMapper.getStatement('testMapper','selectId',param,format);
        pool.query(query,pool);
    },

    insertUser:(id, pwd, name, salt, callback)=>{
        let param = {
            id: id,
            pwd: pwd,
            salt: salt,
            name: name
        };

        let query = MybatisMapper.getStatement('testMapper','insertUser',param,format);
        pool.query(query,pool)
    
    }

}
module.exports=testModel;