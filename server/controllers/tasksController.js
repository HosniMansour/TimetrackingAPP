const taskModel = require('../models/taskModel.js');

module.exports = {

    /**
     * taskController.list()
     */
    list: async function (req, res) {
        const page = req.params.page-1;

        let nbr = 0;
        let tsk = null;

        await taskModel.count({}, function( err, count){
            nbr = count;
        });

        taskModel.find(function (err, tasks) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting tasks.',
                    error: err
                });
            }
            tsk = tasks;
            return res.json({ nbr:nbr, tasks:tsk});
        }).skip(3*page)
          .limit(3);
    },

    /**
     * taskController.search()
     */
    search: async function (req, res) {
        const page = req.params.page-1;
        const query = req.params.query;

        let nbr = 0;
        let tsk = null;

        await taskModel.count({name: new RegExp(query, "i")}, function( err, count){
            nbr = count;
        });

        taskModel.find({name: new RegExp(query, "i")},function (err, tasks) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting tasks.',
                    error: err
                });
            }
            tsk = tasks;
            return res.json({ nbr:nbr, tasks:tsk});
        }).skip(3*page).limit(3);
    },

    /**
     * taskController.create()
     */
    create: function (req, res) {
        const task = new taskModel({
            name : req.body.name,
            desc : req.body.desc,
            startDate : req.body.startedDate,
            endDate : req.body.endDate,
            duration : req.body.duration

        });

        task.save(function (err, task) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating task',
                    error: err
                });
            }
            return res.status(201).json(task);
        });
    },

    /**
     * taskController.update()
     */
    update: function (req, res) {
        const id = req.params.id;
        taskModel.findOne({_id: id}, function (err, task) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting task',
                    error: err
                });
            }
            if (!task) {
                return res.status(404).json({
                    message: 'No such task'
                });
            }

            task.name = req.body.name ? req.body.name : task.name;
            task.desc = req.body.desc ? req.body.desc : task.desc;
            task.startDate = req.body.startDate ? req.body.startDate : task.startDate;
            task.endDate = req.body.endDate ? req.body.endDate : task.endDate;
            task.duration = req.body.duration ? req.body.duration : task.duration;

            task.save(function (err, task) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating task.',
                        error: err
                    });
                }

                return res.json(task);
            });
        });
    },

    /**
     * taskController.remove()
     */
    remove: function (req, res) {
        const id = req.params.id;
        taskModel.findByIdAndRemove(id, function (err, task) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the task.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
