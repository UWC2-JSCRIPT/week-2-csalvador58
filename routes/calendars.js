const { Router } = require('express');

const CalendarDAO = require('../daos/calendars');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const calendars = await CalendarDAO.getAll();
    res.json(calendars);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    // console.log(`ROUTES = req.params.id: ${req.params.id}`);
    const calendar = await CalendarDAO.getById(req.params.id);
    if (calendar) {
      // console.log(`ROUTES - calendar found: `)
      // console.log(calendar)
      res.json(calendar);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  // console.log('ROUTE POST - req.body');
  const calendar = req.body;
  // console.log('calendar');
  // console.log(calendar);
  // console.log('calendar.name');
  // console.log(calendar.name);
  if (calendar.name) {
    const savedCalendar = await CalendarDAO.create(calendar.name);
    // console.log('Calendar item created');
    // console.log(savedCalendar);
    res.sendStatus(200);
  } else {
    // console.log('Calendar NOT created, missing name');
    res.sendStatus(400);
  }
});

router.put('/:id', async (req, res, next) => {
  // console.log('req.params.id');
  // console.log(req.params.id);
  // console.log('req.body');
  // console.log(req.body);

  const calendar = req.body;

  if (calendar.name) {
    const tx = await CalendarDAO.updateById(req.params.id, calendar);
    // console.log('tx');
    // console.log(tx);
    if (tx) {
      res.json(tx);
      // res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(400);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const calendar = await CalendarDAO.removeById(req.params.id);
    if (calendar) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
