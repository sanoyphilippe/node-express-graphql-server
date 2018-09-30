import Express from 'express';
import GraphHTTP from 'express-graphql';
import Schema from './database/schema';
import config from './configuration/config';

// config
const PORT = typeof config.get('APP_PORT') !== 'undefined' ? config.get('APP_PORT') : 3000;

const app = Express();

// graphql search api for users and properties
app.use('/search', GraphHTTP({
  schema: Schema,
  // graphiql: true,
}));

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
