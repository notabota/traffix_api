const crypto = require('crypto');
const db = require("../database");

module.exports.hashPassword = async (password) => {
    const salt = crypto.randomBytes(16).toString("hex");
    const buf = (await crypto.scryptSync(password, salt, 64));
    return `${buf.toString("hex")}.${salt}`;
}

module.exports.verifyPassword = async (suppliedPassword, storedPassword) => {
    const [hashedPassword, salt] = storedPassword.split(".");
    const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");
    const suppliedPasswordBuf = (await crypto.scryptSync(suppliedPassword, salt, 64));
    return crypto.timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
}

module.exports.getUser = async (username) => {
    const user = await db.users.findOne({
        where: {
            username: username
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
    })
    if (user === null) return null;
    return user.toJSON();
}