const Calendars = require('../models/calendars');

module.exports = {};


module.exports.getAll = async () => {
  return await Calendars.find();
}
  
module.exports.create = async (name) => {
  return await Calendars.create({ name });
};

module.exports.getById = async (id) => {
  try {
    console.log(`DAOS - id`)
    console.log(id)
    const calendar = await Calendars.findOne({ _id: id }).lean();
    console.log(`calendar: `)
    console.log(calendar)
    return calendar;
  } catch (e) {
    return null;
  }
};

module.exports.updateById = async (id, newData) => {
  try {
    const calendar = await Calendars.findOneAndUpdate({ _id: id }, newData, { new: true }).lean();
    return calendar;
  } catch (e) {
    return null;
  }
};
