const { Router } = require('express');

const CalendarDAO = require('../daos/calendars');
const EventDAO = require('../daos/events');
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
    const events = await EventDAO.getEventsByCalendarId(req.params.calendarId);
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
    const event = await EventDAO.getEventById(req.params.eventId);
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

router.post('/', async (req, res, next) => {
  //   console.log('ROUTE POST - req.body');
  const newEvent = req.body;
  //   console.log(newEvent);

  if (newEvent.name && newEvent.date) {
    const savedEvent = await EventDAO.create(
      newEvent.name,
      newEvent.date,
      req.params.calendarId
    );
    // console.log('New event item created');
    // console.log(savedEvent)
    res.sendStatus(200);
  } else {
    // console.log('New event NOT created, missing name');
    res.sendStatus(400);
  }
});

router.delete('/:eventId', async (req, res, next) => {
//   console.log('Event Id and Calendar ID check');
//   console.log(`Calendar ID: ${req.params.calendarId}`);
//   console.log(`Event ID: ${req.params.eventId}`);

  try {
    const event = await EventDAO.getEventById(req.params.eventId);
    // console.log("EVENT FOUND: ")
    // console.log(event)
    if (event && event.calendarId == req.params.calendarId) {
        // console.log('Remove Event: ')
      const event = await EventDAO.removeById(req.params.eventId);
      if (event) {
        // delete event if found
        res.sendStatus(200);
      } else {
        // event not found
        // console.log("event not found")
        res.sendStatus(404);
      }
    } else {
    //   console.log("calendar ID DOES NOT match or not found")
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }

  //        console.log('EVENTS ROUTER - req.params: ');
  //     console.log(req.params.calendarId);
  //   try {
  //      // Check if calendar Id exists
  //      const calendarExists = await CalendarDAO.getById(req.params.calendarId);
  //      if (!calendarExists) {
  //        return res.sendStatus(404);
  //      }

  //      // If calendar Id exists, query to delete event
  //     const event = await EventDAO.removeById(req.params.eventId);
  //     if (event) {
  //       res.sendStatus(200);
  //     } else {
  //       res.sendStatus(404);
  //     }
  //   } catch (e) {
  //     next(e);
  //   }
});

module.exports = router;
