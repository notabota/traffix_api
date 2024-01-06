const express = require('express');
const cors = require('cors');
const {typeDefs: scalarTypeDefs} = require('graphql-scalars');
const {resolvers: scalarResolvers} = require('graphql-scalars');
const fs = require('fs');
const {ApolloServer, gql, AuthenticationError} = require("apollo-server-express");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {createServer} = require('http');

const app = express();
const httpServer = createServer(app);

dotenv.config()

const verifyJwt = (jwtToken, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(jwtToken, secret, function (err, decoded) {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};

async function contextObject({req, res}) {

    if (req.headers.authorization === undefined) return {};
    const values = req.headers.authorization.split(' ');

    try {
        let verified = await verifyJwt(values[1], process.env.JWT_SECRET);
        return {
            user: verified.user
        };
    } catch (err) {
        return {}
    }
}

const graphqlModules = []

fs.readdirSync('./graphql').forEach(file => {
    graphqlModules.push(require(`./graphql/${file}`));
})


const apolloServer = new ApolloServer({
    typeDefs: [
        ...scalarTypeDefs
    ],
    resolvers: {
        ...scalarResolvers,
    },
    modules: graphqlModules,
    context: contextObject
})

app.use(cors({origin: true, credentials: true}));

apolloServer.start().then(() => {
    apolloServer.applyMiddleware({app, path: '/api'});

    httpServer.listen(9000, (err) => {
        console.log(`🚀 Server ready at http://localhost:9000/api`);
    })
});