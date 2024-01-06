const gql = require('apollo-server-express').gql;
const db = require('../database');

module.exports.typeDefs = gql`
    input CameraInput {
        lat: Float
        lng: Float
        name: String
        counting_state: Boolean
        url: String
        camera_type: String
        url_type: String
        description: String
    }
    input editCameraInput {
        lat: Float
        lng: Float
        name: String
        counting_state: Boolean
        url: String
        camera_type: String
        url_type: String
        description: String
    }
    input InputID {
        id: ID!
    }
    input createCameraInput {
        data: CameraInput
    }
    input updateCameraInput {
        data: editCameraInput
        where: InputID
    }
    input deleteCameraInput {
        where: InputID
    }
    type createCameraPayload {
        camera: Camera
    }
    type updateCameraPayload {
        camera: Camera
    }
    type deleteCameraPayload {
        camera: Camera
    }
    type Camera {
        id: ID!
        lat: Float
        lng: Float
        name: String
        counting_state: Boolean
        url: String
        camera_type: String
        url_type: String
        description: String
        records: [Record]
    }
    extend type Query {
        cameras(sort: String, where: JSON, start: Int, limit: Int): [Camera]
        camera(id: ID!): Camera
    }
    extend type Mutation {
        createCamera(input: createCameraInput): createCameraPayload
        updateCamera(input: updateCameraInput): Camera
        deleteCamera(input: deleteCameraInput): deleteCameraPayload
    }
`

module.exports.resolvers = {
    Query: {
        cameras: async (obj, args, context, info) => {
            return await db.cameras.findAll({
                order: args.sort === undefined ? undefined : args.sort.split(',').map((v) => v.split(':')),
                where: args.where,
                offset: args.start,
                limit: args.limit
            });
        },
        camera: async (obj, args, context, info) =>
            db.cameras.findByPk(args.id),
    },
    Mutation: {
        createCamera: async (obj, args, context, info) => {
            const camera = db.cameras.build({
                ...args.input.data
            })
            return await camera.save();
        },
        updateCamera: async (obj, args, context, info) => {
            console.log(context)
            const camera = await db.cameras.findOne({
                where: args.input.where
            });
            camera.set({...args.input.data});
            return camera.save();
        },
        deleteCamera: async (obj, args, context, info) => {
            const camera = await db.cameras.findOne({
                where: args.input.where
            });
            return camera.destroy();
        }
    },
    Camera: {
        records: async (obj, args, context, info) =>
            db.records.findAll({
                where: {
                    camera_id: obj.id
                }
            }),
    }
}