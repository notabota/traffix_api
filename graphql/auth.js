const gql = require('apollo-server-express').gql;
const db = require('../database');
const auth = require('../services/auth')
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const {GraphQLError} = require('graphql');

dotenv.config()

const credentialsError = new GraphQLError('Invalid credentials', {
    extensions: {
        code: 'FORBIDDEN',
    },
});

module.exports.typeDefs = gql`
    input CredentialInput {
        username: String!
        password: String!
    }
    extend type Mutation {
        login(input: CredentialInput!): Credential
    }
    type Credential {
        jwt: String
    }
`

module.exports.resolvers = {
    Mutation: {
        login: async (obj, args, context, info) => {
            const user = await db.users.findOne({
                where: {
                    username: args.input.username
                }
            })
            if (user === null) {
                throw credentialsError;
            }
            if (await auth.verifyPassword(args.input.password, user.password)) {
                return {
                    jwt: jwt.sign({
                        user: await auth.getUser(args.input.username)
                    }, process.env.JWT_SECRET)
                }
            }
            throw credentialsError;
        }
    },
}