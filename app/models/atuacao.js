'use strict';

var pagination  = require('mongoose-paginate');
var mongoose = require(__dirname + '/index').mongoose;
var Schema = mongoose.Schema;
var AtuacaoSchema = new Schema({
    titulo: {
        type: String,
        default: ''
    },
    descricao: {
        type: String,
        default: ''
    },
    cadastro: {
        type: Date,
        default: Date.now
    },
    site: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Site'
    }
}, {
    collection: 'atuacoes'
});

AtuacaoSchema.plugin(pagination);

var Atuacao = mongoose.model('Atuacao', AtuacaoSchema);

exports.Atuacao = Atuacao;

exports.list = function(req, res) {
    Atuacao
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

    Atuacao
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
        cadastro: (new Date()),
        site: req.site._id
    };

    var atuacao = new Atuacao(dados);
    atuacao.save(function(err, data) {
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
        site: req.site._id
    };

    Atuacao.update({
        _id: id,
        site: dados.site
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

    Atuacao.remove({
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