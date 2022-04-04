require('dotenv').config();
const sinon = require('sinon');
const connection = require('../../../config/connection');
const { expect } = require('chai');
const ProductsModel = require('../../../models/ProductsModel');
const productsMock = require('../mocks/productsMock');

describe('ProductsModel', () => {
  describe('getAll', () => {
    describe('Quando a tabela `products` retornar vazia', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([productsMock.empty]);
        });
      after(() => {
        connection.execute.restore();
        });
      it('retorno será uma array vazia', async () => {
        const products = await ProductsModel.getAll();
        expect(products).to.be.deep.eq(productsMock.empty);
        });
      });
    describe('Quando a tabela `products` retornar uma lista de produtos', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([productsMock.full]);
      });
      after(() => {
        connection.execute.restore();
      });
      it('retorno será uma array de objetos', async () => {
        const products = await ProductsModel.getAll();
        expect(products).to.be.deep.eq(productsMock.full);
      })
    });
  });
});
