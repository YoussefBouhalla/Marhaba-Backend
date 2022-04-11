const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (options) => {
    return await prisma.announcements.create({
        data: await {
            ...options
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

const deleteA = async (id) => {
    const delete_announcement_meals = prisma.announcement_meal.deleteMany({
        where: {
            announcement_id : id
        }
    })
    
    const delete_announcement = prisma.announcements.delete({
        where: {
            announcement_id : id
        }
    })

    return await prisma.$transaction([delete_announcement_meals, delete_announcement])
}

const updateA = async (id, options) => {
    return await prisma.announcements.update({
        where: {
            meal_id: id
        },
        data: options ? options : {}
    })
}

module.exports = {
    create,
    getAll,
    getSingle,
    announcementSearch,
    getCount,
    deleteA,
    updateA
}