const gql = require('apollo-server-express').gql;
const db = require('../database');

module.exports.typeDefs = gql`
    extend type Query {
        records(sort: String, where: JSON, start: Int, limit: Int): [Record]
        record(id: ID!): Record
    }
    type Record {
        id: ID!
        name: String
        begin_ts: DateTime
        end_ts: DateTime
        camera_id: Int
        camera: Camera
        description: String
        objects(sort: String, where: JSON, start: Int, limit: Int): [Object]
    }
`

module.exports.resolvers = {
    Query: {
        records: async (obj, args, context, info) => db.records.findAll({
            order: args.sort === undefined ? undefined : args.sort.split(',').map((v) => v.split(':')),
            where: args.where,
            offset: args.start,
            limit: args.limit
        }),
        record: async (obj, args, context, info) =>
            db.records.findByPk(args.id),
    },
    Record: {
        camera: async (obj, args, context, info) => db.cameras.findOne({
            where: {
                id: obj.camera_id
            }
        }),
        objects: async (obj, args, context, info) => db.objects.findAll({
            order: args.sort === undefined ? undefined : [[...(args.sort.split(':'))]],
            where: {
                ...args.where,
                record_id: obj.id
            },
            offset: args.start,
            limit: args.limit,
        }),
    }
}