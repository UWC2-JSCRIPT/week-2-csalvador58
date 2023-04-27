const Events = require('../models/events');

module.exports = {};

module.exports.create = async (name, date, calendarId) => {
  return await Events.create({ name, date, calendarId });
};

module.exports.getEventsByCalendarId = async (calendarId) => {
  try {
    const events = await Events.find({ calendarId });
    return events;
  } catch (e) {
    return null;
  }
};

module.exports.getEventById = async (id) => {
  try {
    const event = await Events.findOne({ _id: id }).lean();
    return event;
  } catch (e) {
    return null;
  }
};

module.exports.removeById = async (id) => {
    // console.log('DAO - removing event...')
    // console.log(id)
  try {
    const deletedItem = await Events.findOneAndDelete({ _id: id }).lean();
    // console.log('DELETED ITEM:');
    // console.log(deletedItem);
    return deletedItem;
  } catch (e) {
    return null;
  }
};
