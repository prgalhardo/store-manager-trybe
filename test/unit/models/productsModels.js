require('dotenv').config();
const sinon = require('sinon');
const connection = require('../../../config/connection');
const { expect } = require('chai');
const ProductsModel = require('../../../models/ProductsModel');

describe('ProductsModel', () => {
  describe('getAll', () => {
    describe('Quando a tabela `products` retornar vazia', () => {
      const productsMock = [];
        before(() => {
          sinon.stub(connection, 'execute').resolves([productsMock]);
        });
        after(() => {
          connection.execute.restore();
        })
        it('retorno será uma array vazia', async () => {
          const products = await ProductsModel.getAll();
          expect(products).to.be.deep.eq(productsMock);
        })
      });
    describe('Quando a tabela `products` retornar uma lista de produtos', () => {
      const productsMock =  [
        {
          "id": 1,
          "name": "produto A",
          "quantity": 10
        },
        {
          "id": 2,
          "name": "produto B",
          "quantity": 20
        }
      ];
      before(() => {
        sinon.stub(connection, 'execute').resolves([productsMock]);
      });
      after(() => {
        connection.execute.restore();
      });
      it('retorno será uma array de objetos', async () => {
        const products = await ProductsModel.getAll();
        expect(products).to.be.deep.eq(productsMock);
      })
    });
  });
});
