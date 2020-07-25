const Message = require('../models/message');
const io = require('../socket');

exports.findAll = (req, res, next) => {
    Message.find()
        .then(results => {
            res.status(200).json({
                message: "Message list fetched",
                data: results
            })
        })
        .catch(err => console.log(err));
}

exports.findOne = (req, res, next) => {
    const id = req.params.id;
    Message.findById(id)
        .populate('userId', 'email')
        .then(results => {
            res.status(200).json({
                message: "Message fetched",
                data: results
            })
        })
        .catch(err => console.log(err));
}

exports.search = (req, res, next) => {
    const term = req.params.query;
    const query = {
        $text: { $search: term }
    };
    Message.find(query)
        .then(results => {
            res.status(200).json({
                message: "Message fetched",
                data: results
            })
        })
        .catch(err => console.log(err));
}

exports.create = (req, res, next) => {
    const payload = req.body;
    const message = new Message({
        title: payload.title,
        description: payload.description,
        userId: req.session.userId
    });

    io.getIO().emit('messages', {
        action: 'create',
        message: message
    });

    message.save()
        .then(results => {
            res.status(201).json({
                message: "Message created successfully",
                data: results
            })
        })
        .catch(err => console.log(err));
}

exports.update = (req, res, next) => {
    const id = req.params.id;
    const payload = req.body;

    Message.findById(id)
        .then(results => {
            results.title = payload.title;
            results.description = payload.description;
            results.updatedAt = Date.now();

            io.getIO().emit('messages', {
                action: 'update',
                message: results
            });

            return results.save();
        })
        .then(results => {
            res.status(200).json({
                message: "Message updated",
                data: results
            })
        })
        .catch(err => console.log(err));
}

exports.delete = (req, res, next) => {
    const id = req.params.id;

    io.getIO().emit('messages', {
        action: 'delete',
        message: id
    });

    Message.findByIdAndRemove(id)
        .then(results => {
            res.status(200).json({
                message: "Message deleted",
                data: results
            })
        })
        .catch(err => console.log(err));
}