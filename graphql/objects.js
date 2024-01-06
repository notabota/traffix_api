const gql = require('apollo-server-express').gql;
const db = require('../database');

module.exports.typeDefs = gql`
    extend type Query {
        objects(sort: String, where: JSON, start: Int, limit: Int): [Object]
        object(id: ID!): Object
    }
    type Object {
        id: ID!
        ts: DateTime
        speed: Float
        type: String
        record_id: Int
        record: Record
    }
`

module.exports.resolvers = {
    Query: {
        objects: async (obj, args, context, info) => db.objects.findAll({
            order: args.sort === undefined ? undefined : args.sort.split(',').map((v) => v.split(':')),
            where: args.where,
            offset: args.start,
            limit: args.limit
        }),
        object: async (obj, args, context, info) =>
            db.objects.findByPk(args.id),
    },
    Object: {
        record: async (obj, args, context, info) => db.records.findOne({
            where: {
                id: obj.record_id
            }
        })
    }
}