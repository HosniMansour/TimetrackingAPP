const express = require('express');
const router = express.Router();
const taskController = require('../../controllers/tasksController');

/*
 * Get tasks with pagination
 */
router.get('/:page', taskController.list);

/*
 * Get Filtres tasks with pagination
 */
router.get('/searsh/:query/:page', taskController.search);

/*
 * POST
 */
router.post('/', taskController.create);

/*
 * PUT
 */
router.put('/:id', taskController.update);

/*
 * DELETE
 */
router.delete('/:id', taskController.remove);


module.exports = router;
