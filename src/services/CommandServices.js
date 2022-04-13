const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const create = async (type, options) => {
    switch (type) {
        case "announcement":
            return await prisma.announc_commands.create({
                data: {
                    announcement_id : options.announcement_id,
                    quantity: options.quantity,
                    total_price : options.price * options.quantity,
                    global_announ_commands : {
                        create: [
                            {global_commands: {connect : {command_number: options.command_number}}}
                        ]
                    }
                }
            });
            break;

        case "meal":
            return await prisma.meal_commands.create({
                data: {
                    meal_id : options.meal_id,
                    quantity: options.quantity,
                    total_price : options.price * options.quantity,
                    global_meals_commands : {
                        create: [
                            {global_commands: {connect : {command_number: options.command_number}}}
                        ]
                    }
                }
            });
            break;

        case "global":
            return await prisma.global_commands.create({
                data: {
                    user_id: options.user_id
                }
            });
            break;
    
        default:
            break;
    }
}

const getSingle = async (id , allData = true) => {
    if (allData) {
        let totalPrice = 0;
        let totalQuantity = 0;
        let totalMealsPricesArray = await prisma.meal_commands.groupBy({
            by: ['meal_id'],
            _sum: {
                total_price : true,
                quantity : true
            },
            where : {
                global_meals_commands: {
                    some: {
                        gl_command_num: id
                    }
                }
            }
        })

        let totalAnnouncPricesArray = await prisma.announc_commands.groupBy({
            by: ['announcement_id'],
            _sum: {
                total_price : true,
                quantity : true
            },
            where : {
                global_announ_commands: {
                    some: {
                        gl_command_num: id
                    }
                }
            }
        })
        
        await totalMealsPricesArray.forEach(element => {
            totalPrice += element._sum.total_price;
            totalQuantity += element._sum.quantity;
        });

        await totalAnnouncPricesArray.forEach(element => {
            totalPrice += element._sum.total_price;
            totalQuantity += element._sum.quantity;
        });

        await prisma.global_commands.update({
            where: {
                command_number: id
            },
            data : {
                total_price: totalPrice,
                total_quantity: totalQuantity
            }
        })
    }
    
    return await prisma.global_commands.findUnique({
        where: {
            command_number: id
        },
        select : !allData ? {
            command_number: true,
            status: true,
            taken: true
        } : false,
        include: allData ? {
            global_meals_commands: {
                include: {
                    meal_commands: true
                }
            },
            global_announ_commands: {
                include: {
                    announc_commands: true
                }
            },
        } : false
    })

}

const getAll = async (options) => {
    return await prisma.global_commands.findMany({
        where: options ? options : {},
        select :{
            command_number: true,
            status: true,
            taken: true
        } 
    })
}

const checkCommandAvailability = async (id) => {
    return  await prisma.global_commands.findMany({
        where: {
            user_id: id
        },
        select :{
            command_number: true,
        }          
    })
}

const getCount = async (options) => {
    return await prisma.global_commands.aggregate({
        where : options ? {
            [options.type] : options.value
        } : {},
        _count : {
            command_number: true
        }
    })
}

const take = async (idCommand , idDeliverer) => {
    return await prisma.global_commands.update({
        where: {
            command_number: idCommand
        },
        data: {
            taken: true,
            deliverer_id: idDeliverer
        }
    })
}

const untake = async (idCommand) => {
    return await prisma.global_commands.update({
        where: {
            command_number: idCommand
        },
        data: {
            taken: false,
            deliverer_id: null
        }
    })

}

const updateC = async (idCommand, options) => {
    return await prisma.global_commands.update({
        where: {
            command_number: idCommand
        },
        data: options
    })
}


module.exports = {
    create,
    getSingle, 
    getAll, 
    getCount,
    checkCommandAvailability,
    take,
    untake,
    updateC
}