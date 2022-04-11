const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (options) => {
    return await prisma.meals.create({
        data: options
    })
}

const getAll = async (type = 'none') => {
    return await prisma.meals.findMany({
        where: type === 'none' ? {} : {
            type
        }
    });
}

const getSingle = async (id) => {
    return await prisma.meals.findUnique({
        where: {
            meal_id: id
        },
    });
}

const getCount = async (type = 'none') => {
    return await prisma.meals.aggregate({
        where: type === 'none' ? {} : {
            type
        },
        _count: {
            meal_id: true
        }
    })
}

const mealSearch = async (options) => {
    return await prisma.meals.findMany({
        where: options ? {
            AND: {
                title: options.title ? {
                    startsWith: options.title
                } : {},
                type : options.type ? options.type : {},
                price: options.priceMax && options.priceMin ? {
                    gte: options.priceMin,
                    lte: options.priceMax
                } : {}
            }
        } : {}
    })
}

const deleteM = async (id) => {
    return await prisma.meals.delete({
        where: {
            meal_id: id
        }
    })
}

const updateM = async (id, options) => {
    return await prisma.meals.update({
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
    getCount,
    mealSearch,
    deleteM,
    updateM
}