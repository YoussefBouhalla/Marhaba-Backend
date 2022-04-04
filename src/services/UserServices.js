const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (role, user_name, first_name, last_name, email, phone_number, password, image, address = "") => {
    let user = await prisma.users.create({
        data: {
            user_name,
            first_name,
            last_name,
            email,
            phone_number,
            password,
            role,
            image
        }
    })

    switch (role) {
        case 'client':
            await prisma.clients.create({
                data: {
                    address,
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

const getSingle = async (role,id) => {
    return await prisma.users.findUnique({
        where: {
            user_id: id
        },
        include: {
            clients: role === 'client' ? true : false,
            deliverers: role === 'deliverer' ? true : false,
            admins: role === 'admin' ? true : false
        }
    });
}

const getCount = async(role = 'user') => {
    return await prisma.users.aggregate({
        where: role === 'user' ? {} : {role} ,
        _count: {
            role: true
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