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
        where: options !== {} ?{
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

module.exports = {
    create,
    getAll,
    getSingle,
    getCount,
    mealSearch
}