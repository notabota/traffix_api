const db = require('./database')
const auth = require('./services/auth')
const jwt = require("jsonwebtoken");
const {verifyPassword} = require("./services/auth");

// db.users.sync({force: true}).then(value => {
//     console.log("Synced")
// }).then(value => {
//     db.users.create({
//         username: "thanhphohuevn",
//         password: "=95d0K!61F^FR$^",
//         role_id: 1
//     }).then(
//         value => {
//
//         }
//     )
// })

// (async () => {
//     const password = await auth.hashPassword("=95d0K!61F^FR$^")
//     console.log(password);
//     console.log(await auth.verifyPassword("=95d0K!61F^FR$^", password))
//     console.log(await auth.verifyPassword("=95d0K!61F^FR$", password))
//     await db.users.create({
//         username: "thanhphohuevn",
//         password,
//         role_id: 1
//     })
// })()

// db.users.create({
//     username: "thanhphohuevn",
//     password: "=95d0K!61F^FR$^",
//     role_id: 1
// }).then(
//     value => {
//
//     }
// )
//
db.users.findOne({
    where: {
        username: "thanhphohuevn"
    }, include: {
        model: db.roles,
        as: 'role',
        include: {
            model: db.role_permissions,
            as: 'role_permissions',
            include: {
                model: db.permissions,
                as: 'permission'
            }
        }
    }
}).then(async (user) => {
    const userJson = user.toJSON();
    console.log(await auth.verifyPassword("=95d0K!61F^FR$^", userJson.password))
    console.log(await auth.verifyPassword("=95d0K!61F^FR", userJson.password))
})
