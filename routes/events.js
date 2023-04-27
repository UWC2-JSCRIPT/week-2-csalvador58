const { Router } = require('express');

const CalendarDAO = require('../daos/calendars');
const EventsDAO = require('../daos/events');
const router = Router({ mergeParams: true });

router.get('/', async (req, res, next) => {
//   console.log('EVENTS ROUTER - req.params: ');
//   console.log(req.params.calendarId);
  try {

    // Check if calendar Id exists
    const calendarExists = await CalendarDAO.getById(req.params.calendarId);
    if (!calendarExists) {
      return res.sendStatus(404);
    }

    // If calendar Id exists, query for events
    const events = await EventsDAO.getEventsByCalendarId(req.params.calendarId);
    // console.log('EVENTS found: ');
    // console.log(events);

    if (events) {
    //   console.log('Events sent:');
      res.json(events);
    } else {
    //   console.log('NO events found');
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.get('/:eventId', async (req, res, next) => {
  try {
    const event = await EventDAO.getById(req.params.eventId);
    if (event) {
      res.json(event);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
