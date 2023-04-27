const Events = require('../models/events');

module.exports = {};

module.exports.getEventsByCalendarId = async (calendarId) => {
    try {
      const events = await Events.find({ calendarId })
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