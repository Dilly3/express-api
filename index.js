
 const express = require("express");
 const router = require('./Routes/blogRoutes')
 const msgJson = require('./utils/utils')
 
 const app = express();
 
 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));
 app.use('/blog', router)


app.listen(5000);