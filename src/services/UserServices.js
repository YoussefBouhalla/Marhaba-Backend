const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (role, user_name, first_name, last_name, email, phone_number, password, image) => {
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

const getAll = () => {

}

const getSingle = () => {

}

const getCount = () => {

}