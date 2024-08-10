const express = require('express');
const cors = require('cors');
const {sequelize} = require('./config/config');
const path = require('path');
const fileUpload = require('express-fileupload');
const {config} = require('./config/config')
const router = require('./routes/attendance.route');
const employeerouter = require('./routes/employee.route');
const salaryrouter = require('./routes/salaries.route');
const authrouter = require('./routes/auth.route')
const helperrouter = require('./routes/helper.route')
const settingrouter = require('./routes/setting.route')

const CURRENT_WORKING_DIR = process.cwd();
const app = express();
const port = 3032;


sequelize.authenticate().then(() => {
  console.error('Database connected successfully')
})
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })

app.use(cors({
  origin:['http://localhost:3000'], 
  methods: ['GET','POST','PUT'],
  credentials:true,
}));  
app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
  })
);

app.use("/dist", express.static(path.join(config.rootDir, "dist")));
app.use(`/assets`, express.static(config.assetsDir));
app.use(
  `/download`,
  express.static("/home/nikhil/production/staff_panel/download/")
);
app.use(express.json());




app.use('/', router);
app.use('/', employeerouter);
app.use('/', salaryrouter);
app.use('/', authrouter,helperrouter,settingrouter)




app.listen(port, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Server is running on port http://localhost:${port}`);
});

module.exports = sequelize;
