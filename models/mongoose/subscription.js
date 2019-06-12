const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const SubSchema = new Schema({
    userId: { type: ObjectId, required: true, index: 1},
    url: { type: String, required: true},
});

const SubModel = mongoose.model('sub', SubSchema);

async function insert(sub) {
    const sub = await SubModel.create(sub);
    return sub;
}

async function list(params) {
    const match = {};
    const flow = SubModel.find(match);
    const subs = await flow.exec();
    return subs;
}

async function findOneById(userId) {
    return await SubModel.findOne({ userId });
}

module.exports = {
    insert,
    list,
    findOneById
}