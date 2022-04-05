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

const getAll = async () => {
    return await prisma.announcements.findMany({
        include: {
            announcement_meal: {
                include: {
                    meals: true
                }
            }
        }
    });
}

const getSingle = async (id) => {
    return await prisma.announcements.findUnique({
        where : {
            announcement_id : id    
        },
        include: {
            announcement_meal: {
                include: {
                    meals: true
                }
            }
        }
    });
}

const getCount = async () => {
    return await prisma.announcements.aggregate({
        _count: {
            announcement_id: true
        }
    })
}

const announcementSearch = async (options) => {
    return await prisma.announcements.findMany({
        where: options ? {
            AND: {
                title: options.title ? {
                    startsWith: options.title
                } : {},
                price: options.priceMax && options.priceMin ? {
                    gte: options.priceMin,
                    lte: options.priceMax
                } : {}
            }
        } : {},
        include: {
            announcement_meal: {
                include: {
                    meals: true
                }
            }
        }
    })
}

module.exports = {
    create,
    getAll,
    getSingle,
    announcementSearch,
    getCount
}