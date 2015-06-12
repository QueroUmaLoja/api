'use strict';

var pagination  = require('mongoose-paginate');
var mongoose = require(__dirname + '/index').mongoose;
var Schema = mongoose.Schema;
var EmpregoSchema = new Schema({
    titulo: {
        type: String,
        default: ''
    },
    descricao: {
        type: String,
        default: ''
    },
    tags: {
        type: [],
        default: ''
    },
    cadastro: {
        type: Date,
        default: Date.now
    },
    salario: {
        type: String,
        default: ''
    },
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site'
    }
});

EmpregoSchema.plugin(pagination);

var Emprego = mongoose.model('Emprego', EmpregoSchema);

exports.Emprego = Emprego;

exports.list = function(req, res) {
    Emprego
        .find({
            site: req.site._id
        })
        .sort({
            cadastro: -1
        })
        .exec(function(err, products) {
            if (err) {
                console.log(err);
            } else {
                res.json(products);
            }
        });
};

exports.get = function(req, res) {
    var id = req.params.id;

    Emprego
        .findOne({
            _id: id,
            site: req.site._id
        })
        .exec(function(err, products) {
            if (err) {
                console.log(err);
            } else {
                res.json(products);
            }
        });
};

exports.create = function(req, res) {
    var data = req.body;
    var dados = {
        titulo: data.titulo,
        descricao: data.descricao,
        cadastro: (new Date),
        tags: data.tags.split(','),
        salario: data.salario,
        site: req.site._id
    };

    var emprego = new Emprego(dados);
    emprego.save(function(err, data) {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
};

exports.update = function(req, res) {
    var id = req.params.id;
    var data = req.body;
    var dados = {
        titulo: data.titulo,
        descricao: data.descricao,
        tags: data.tags.toString().split(','),
        salario: data.salario
    };

    Emprego.update({
        _id: id,
        site: req.site._id
    }, dados, function(err, data) {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
};

exports.delete = function(req, res) {
    var id = req.params.id;

    Emprego.remove({
        _id: id,
        site: req.site._id
    }, function(err, data) {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
};