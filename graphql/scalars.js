const gql = require('apollo-server-express').gql;
const db = require('../database');

module.exports.typeDefs = gql`
    scalar JSON
    scalar DateTime
`