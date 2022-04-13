const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (options) => {
    let user = await prisma.users.create({
        data: { 
            user_name: options.user_name,
            first_name: options.first_name,
            last_name: options.last_name,
            password: options.password,
            email: options.email,
            phone_number: options.phone_number,
            role: options.role,
            image: options.image,
            clients : options.role === 'client' ? {
                create: {
                    address: options.address
                }
            } : {},
            deliverers : options.role === 'deliverer' ? {
                create: {
                }
            } : {}
        }
    })
    return user;
}

const getAll = async (role) => {
    return await prisma.users.findMany({
        where: {
            role
        }
    });
}

const getSingle = async (options) => {
    return await prisma.users.findUnique({

        where: options.email
        ? {email: options.email}
        : {user_id: options.id},

        include: options.role ? {
            clients: options.role === 'client' ? true : false,
            deliverers: options.role === 'deliverer' ? true : false,
            admins: options.role === 'admin' ? true : false
        } : false

    });
}

const getCount = async(options) => {
    return await prisma.users.aggregate({
        where: options ? {
            role: options.role ? options.role : {},
            email: options.email ? options.email : {}
        } : {},
        _count: options ? {
            role: options.role ? true : false,
            email: options.email ? true : false
        } 
        : {user_id: true}
    });
}

const filterByName = async(first_name) => {
    return await prisma.users.findMany({
        where: {
            first_name: {
                startsWith: first_name
            }
        }
    });
}

module.exports = {
    create,
    getAll,
    getSingle,
    getCount,
    filterByName
}