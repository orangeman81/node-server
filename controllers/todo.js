const Todo = require('../models/todo');

exports.findAll = (req, res, next) => {
    Todo.find()
        .then(results => {
            res.status(200).json({
                message: "Todo list fetched",
                data: results
            })
        })
        .catch(err => console.log(err));
}

exports.findOne = (req, res, next) => {
    const id = req.params.id;
    Todo.findById(id)
        .populate('userId', 'email')
        .then(results => {
            res.status(200).json({
                message: "Todo fetched",
                data: results
            })
        })
        .catch(err => console.log(err));
}

exports.create = (req, res, next) => {
    const payload = req.body;
    const todo = new Todo({
        title: payload.title,
        description: payload.description,
        userId: req.session.userId
    })

    todo.save()
        .then(results => {
            res.status(201).json({
                message: "todo created successfully",
                data: results
            })
        })
        .catch(err => console.log(err));
}

exports.update = (req, res, next) => {
    const id = req.params.id;
    const payload = req.body;

    Todo.findById(id)
        .then(results => {
            results.title = payload.title;
            results.description = payload.description;
            results.updatedAt = Date.now();
            return results.save();
        })
        .then(results => {
            res.status(200).json({
                message: "Todo updated",
                data: results
            })
        })
        .catch(err => console.log(err));
}

exports.delete = (req, res, next) => {
    const id = req.params.id;

    Todo.findByIdAndRemove(id)
        .then(results => {
            res.status(200).json({
                message: "Todo deleted",
                data: results
            })
        })
        .catch(err => console.log(err));
}