const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (title, description, price, type) => {
    return await prisma.meals.create({
        data: {
            title,
            description,
            price,
            type
        }
    })
}

module.exports = {
    create
}