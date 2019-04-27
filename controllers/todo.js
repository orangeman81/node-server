const Todo = require('../models/todo');

exports.getTodo = (req, res, next) => {
    Todo.find()
        .then(results => {
            res.status(200).json({
                data: results
            })
        })
        .catch(err => console.log(err));
}

exports.createTodo = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const todo = new Todo({
        title: title,
        description: description
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