'use strict';

var Site = require('../../schemas/site');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var should = require('should');

describe('Site Model', function () {
    it('inicia sem erros', function (done) {
        var site = new Site();

        should(site.isNew).is.exactly(true);

        done();
    });

    it('iniciando sem item e comprador deve retornar os atributos informados como parâmetros', function (done) {
        var dados = {
            nome: 'Foo'
        };

        var site = new Site(dados);
            site.should.have.property('nome', dados.nome);

        should(site.isNew).is.exactly(true);

        done();
    });

    it('converter para json', function (done) {
        var produto = (new Site()).toJSON();

        produto.should.have.property('_id');

        should(produto.config).is.exactly(undefined);
        should(produto.ativo).is.exactly(undefined);

        done();
    });
});