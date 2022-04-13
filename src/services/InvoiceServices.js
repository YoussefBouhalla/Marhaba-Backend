const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (options) => {
    return await  prisma.invoices.create({
        data : options
    })

}

const getAll = async () => {
    return await  prisma.invoices.findMany({
        include: {
            global_commands: {
                include: {
                    global_announ_commands: {
                        include: {
                            announc_commands: true
                        }
                    },
                    global_meals_commands: {
                        include: {
                            meal_commands: true
                        }
                    }
                }
            },
            clients: {
                include: {
                    users: true
                }
            }
        }
    })
}

const getSingle = async (id) => {
    return await  prisma.invoices.findUnique({
        where: {
            invoice_id: id
        },
        include: {
            global_commands: {
                include: {
                    global_announ_commands: {
                        include: {
                            announc_commands: true
                        }
                    },
                    global_meals_commands: {
                        include: {
                            meal_commands: true
                        }
                    }
                }
            },
            clients: {
                include: {
                    users: true
                }
            }
        }
    })
}

const deleteI = async (id) => {
    return await  prisma.invoices.delete({
        where: {
            invoice_id: id
        }
    })
}

module.exports = {
    create,
    getAll,
    getSingle,
    deleteI
}