require('dotenv').config();
const sinon = require('sinon');
const connection = require('../../../config/connection');
const { expect } = require('chai');
const SalesModel = require('../../../models/SalesModel');
const salesMock = require('../mocks/salesMock');

describe('SalesModel', () => {

  describe('getAll', () => {

    describe('Quando o conteúdo de vendas retornar vazio', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([salesMock.empty]);
      });
      after(() => {
        connection.execute.restore();
      });
      it('retorno será vazio', async () => {
        const sales = await SalesModel.getAll();
        expect(sales).to.be.deep.eq(salesMock.empty);
      });
    });

    describe('Quando o conteúdo de vendas retornar conforme o esperado', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([salesMock.full]);
      });
      after(() => {
        connection.execute.restore();
      });
      it('retorno será um array de objetos', async () => {
        const sales = await SalesModel.getAll();
        expect(sales).to.be.deep.eq(salesMock.full);
      });
    });
  });
});