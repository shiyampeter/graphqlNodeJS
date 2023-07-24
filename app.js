const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const graphQlSchema = require('./graphql/schema')
const graphQlResolvers = require('./graphql/resolvers')
const app = express();
app.use(bodyParser.json());

app.use('/graphql',graphqlHttp({
    schema:graphQlSchema,
    rootValue:graphQlResolvers,
    graphiql:true
}));
mongoose.connect(`mongodb+srv://shiyampeter:shiyam123@cluster0.dlumgnd.mongodb.net/graphql`).then(()=>{
    app.listen(3000);
}).catch(err=>{
    console.log(err);
});
