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

    // console.log("Event Id and Calendar ID check");
    // console.log(`Calendar ID: ${req.params.calendarId}`)
    // console.log(`Event ID: ${req.params.eventId}`)

  try {
    const event = await EventsDAO.getEventById(req.params.eventId);
    // console.log("EVENT FOUND: ")
    // console.log(event)
    if (event && event.calendarId == req.params.calendarId) {
        // console.log("calendar ID matches")
        res.json(event);
    } else {
        // console.log("calendar ID DOES NOT match or not found")
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
