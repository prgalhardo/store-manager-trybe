require('dotenv').config();
const sinon = require('sinon');
const connection = require('../../../config/connection');
const { expect } = require('chai');
const SalesController = require('../../../controllers/salesController');
const SalesService = require('../../../services/salesService');
const salesMock = require('../mocks/salesMock');

describe('SalesController', () => {

    describe('getAll', () => {

      describe('Quando o conteúdo de vendas retornar vazio', () => {
        const req = {};
        const res = {};
        before(() => {
          res.status = sinon.stub(res);
          res.json = sinon.stub();

          sinon.stub(SalesService, 'getAll').resolves(salesMock.empty);
        });
        after(() => {
          SalesService.getAll.restore();
        });
        it('deve chamar a função `res.json` com uma array vazia', async () => {
          await SalesController.getAll(req, res);
          expect(res.json.calledWith(salesMock.empty)).to.be.true;
        });
      });

      
    });

})