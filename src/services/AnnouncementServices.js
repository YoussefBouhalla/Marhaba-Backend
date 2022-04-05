const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// meals_connections:Array Ex : => [{meals: {connect: {meal_id : 11}}},{meals: {connect: {meal_id : 1}}}]
const create = async (title, description, price , meals_connections) => {
    return await prisma.announcements.create({
        data: {
            title,
            description,
            price,
            announcement_meal : meals_connections ? {
                create : meals_connections
            } : {}
        }
    });
}

module.exports = {
    create
}