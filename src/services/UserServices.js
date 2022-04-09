const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (options) => {
    let user = await prisma.users.create({
        data: options
    })

    switch (options.role) {
        case 'client':
            await prisma.clients.create({
                data: {
                    address: options.address,
                    user_id : user.user_id
                }
            })
            break;

        case 'deliverer':
            await prisma.deliverers.create({
                data: {
                    user_id : user.user_id
                }
            })
            break;
    
        default:
            break;
    }

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
        where: {
            role: options.role ? options.role : {},
            email: options.email ? options.email : {}
        } ,
        _count: {
            role: options.role ? true : false,
            email: options.email ? true : false
        }
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