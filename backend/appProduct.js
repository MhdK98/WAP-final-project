const express = require('express');
const cors = require('cors');
const productRouter = require('./routers/productRouter');
const UserRouter = require('./routers/UserRouter');


const app = express();

app.use(express.json());
app.use(cors());

app.use('/products', productRouter);
app.use('/Users', UserRouter);


app.listen(3000, () => console.log('listen on 3000'));