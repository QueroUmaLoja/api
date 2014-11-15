'use strict';

var connection = require('./index');
var site = require('./site');
var mongoose = connection.mongoose;
var Schema = mongoose.Schema;
var UniformeSchema = new Schema({
    titulo: {
        type: String
    },
    descricao: {
        type: String
    },
    cadastro: {
        type: Date,
        default: Date.now
    },
    imagem: {
        type: Object
    },
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site'
    }
});

var Uniforme = mongoose.model('Uniforme', UniformeSchema);

exports.Uniforme = Uniforme;

exports.list = function(req, res) {
    Uniforme
        .find({
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

exports.get = function(req, res) {
    var id = req.params.id;

    Uniforme
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
        cadastro: data.cadastro,
        site: req.site._id,
        imagem: JSON.parse(data.imagem)
    };

    var uniforme = new Uniforme(dados);
    uniforme.save(function(err, data) {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
};

exports.update = function(req, res) {
    var data = req.body;

    Uniforme.update({
        _id: req.params.id,
        site: req.site._id
    }, data, function(err, data) {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
};

exports.delete = function(req, res) {
    Uniforme.remove({
        _id: req.params.id,
        site: req.site._id
    }, function(err, data) {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
};