require('dotenv').config();
const sinon = require('sinon');
const connection = require('../../../config/connection');
const { expect } = require('chai');
const ProductsController = require('../../../controllers/productsController');
const ProductsService = require('../../../services/productsService');
const productsMock = require('../mocks/productsMock');

describe('ProductsController', () => {

  describe('getAll', () => {

    describe('Quando a tabela `products` retornar vazia', () => {
      const req = {};
      const res = {};
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();

        sinon.stub(ProductsService, 'getAll').resolves(productsMock.empty);
      });
      after(() => {
        ProductsService.getAll.restore();
      });
      it('deve chamar a função `res.json` com uma array vazia', async () => {
        await ProductsController.getAll(req, res);
        expect(res.json.calledWith(productsMock.empty)).to.be.true;
      });
    });

    describe('Quando a tabela `products` retornar uma lista de produtos', () => {
      const req = {};
      const res = {};
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();

        sinon.stub(ProductsService, 'getAll').resolves(productsMock.full);
      });
      after(() => {
        ProductsService.getAll.restore();
      });
      it('deve chamar a função `res.status` com o valor 200', async () => {
        await ProductsController.getAll(req, res);
        expect(res.status.calledWith(200)).to.be.true;
      });
      it('deve chamar a função `res.json` com um objeto', async () => {
        await ProductsController.getAll(req, res);
        expect(res.json.calledWith(productsMock.full)).to.be.true;
      });
    });
  });

  describe('findById', () => {

    describe('Quando for feita a procura por um id que não existe', () => {
      const req = {};
      const res = {};

      req.params = {
        "id": 5,
      };

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();

        sinon.stub(ProductsService, 'findById').resolves();
      });
      after(() => {
        ProductsService.findById.restore();
      });
      it('deve chamar a função `res.status` com o valor 404', async () => {
        await ProductsController.findById(req, res);
        expect(res.status.calledWith(404)).to.be.true;
      });
      it('deve chamar a função `res.json` com uma mensagem de erro', async () => {
        await ProductsController.findById(req, res);
        expect(res.json.calledWith({ message: "Product not found" })).to.be.true;
      });
    });
    describe('Quando for feita a procura por um id que existe', () => {
      const req = {};
      const res = {};

      req.params = {
        "id": 1,
      };

      const product = {
        "id": 1,
        "name": "produto A",
        "quantity": 10
      };

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();

        sinon.stub(ProductsService, 'findById').resolves(product);
      });
      after(() =>{
        ProductsService.findById.restore();
      });
      it('deve chamar a função `res.status`com o valor 200', async () => {
        await ProductsController.findById(req, res);
        expect(res.status.calledWith(200)).to.be.true;
      });
      it('deve chamar a função `res.json` com o objeto do produto', async () => {
        await ProductsController.findById(req, res);
        expect(res.json.calledWith(product)).to.be.true;
      });
    });
  });
});