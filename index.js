import Express from 'express';
import GraphHTTP from 'express-graphql';
import cors from 'cors';
import Schema from './database/schema';
import config from './configuration/config';

// config
const PORT = typeof config.get('APP_PORT') !== 'undefined' ? config.get('APP_PORT') : 3000;
const ENABLE_GRAPHIQL = typeof config.get('ENABLE_GRAPHIQL') !== 'undefined' ? config.get('ENABLE_GRAPHIQL') : false;

const app = Express();

app.options('/search', cors());

// graphql search api for users and properties
app.use('/search', cors(), GraphHTTP({
  schema: Schema,
  graphiql: ENABLE_GRAPHIQL,
}));

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
