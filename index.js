import express from 'express'
import router from '../junctionX_wise/routes/index'


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
  });
app.use('/', router)

const port = process.env.PORT || 3000;

app.listen(port, console.log(`server started at:...${port}`));

export default app;