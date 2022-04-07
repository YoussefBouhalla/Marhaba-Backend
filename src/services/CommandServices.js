const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// options.announ_commands_connections:Array Ex : => [{announc_commands: {connect: {command_id : 11}}},{announc_commands: {connect: {command_id : 1}}}]
// options.meals_commands_connections:Array Ex : => [{meal_commands: {connect: {command_id : 11}}},{meal_commands: {connect: {command_id : 1}}}]
const create = async (type, options) => {
    switch (type) {
        case "announcement":
            return await prisma.announc_commands.create({
                data: {
                    announcement_id : options.announcement_id,
                    quantity: options.quantity,
                    total_price : options.price * options.quantity
                }
            });
            break;

        case "meal":
            return await prisma.meal_commands.create({
                data: {
                    meal_id : options.meal_id,
                    quantity: options.quantity,
                    total_price : options.price * options.quantity
                }
            });
            break;

        case "global":
            return await prisma.global_commands.create({
                data: {
                    global_announ_commands : options && options.announ_commands_connections ? {
                        create : options.announ_commands_connections
                    } : {},

                    global_meals_commands : options && options.meals_commands_connections ? {
                        create : options.meals_commands_connections
                    } : {}
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
    
    let commands =  await prisma.global_commands.findUnique({
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

    return commands;
}

module.exports = {
    create,
    getSingle
}