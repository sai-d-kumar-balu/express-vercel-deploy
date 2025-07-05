const prisma = require('../utils/prisma');

exports.createItem = async (data) => {
    return await prisma.item.create({ data });
};

exports.getAllItems = async () => {
    return await prisma.item.findMany();
};

exports.getItemById = async (id) => {
    return await prisma.item.findUnique({ where: { id: parseInt(id) } });
};

exports.updateItem = async (id, data) => {
    return await prisma.item.update({
        where: { id: parseInt(id) },
        data,
    });
};

exports.deleteItem = async (id) => {
    return await prisma.item.delete({ where: { id: parseInt(id) } });
};
