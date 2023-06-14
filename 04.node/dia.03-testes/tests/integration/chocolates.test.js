const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/app');
const fs = require('fs');
const sinon = require('sinon');
const { expect } = chai;

chai.use(chaiHttp);

const mockFile = JSON.stringify( {"brands": [
    {"id": 1,"name": "Lindt & Sprungli" },
    {"id": 2,"name": "Ferrero" },
    {"id": 3,"name": "Ghirardelli" }
],
"chocolates": [
    {"id": 1,"name": "Mint Intense","brandId": 1 },
    {"id": 2,"name": "White Coconut","brandId": 1},
    {"id": 3,"name": "Mon Chéri","brandId": 2 },
    {"id": 4,"name": "Mounds","brandId": 3 }
]})

describe('Usando o método GET em /chocolates', function () {

    beforeEach(function () {
        sinon.stub(fs.promises, 'readFile').resolves(mockFile);
        sinon.stub(fs.promises, 'writeFile').resolves();
      });
    
      afterEach(function () {
        sinon.restore();
      });

    it('Retorna a lista completa de chocolates!', async function () {
        const response = await chai.request(app).get('/chocolates');
        expect(response.status).to.be.equal(200);
        expect(response.body.chocolates).to.be.deep.equal(JSON.parse(mockFile).chocolates);
    });

    it('Retorna um chocolate específico!', async function () {
        const response = await chai.request(app).get('/chocolates/1');
        expect(response.status).to.be.equal(200);
        expect(response.body.chocolate).to.be.deep.equal(JSON.parse(mockFile).chocolates[0]);
    });

    it('Cria um chocolate /chocolates', async function () {
        const response = await chai.request(app).post('/chocolates').send({
            name: 'Mint NOT So Intense',
            brandId: 2,
          });
          expect(response.status).to.be.equal(201);
          expect(response.body.chocolate).to.be.deep.equal({
            id: 5,
            name: 'Mint NOT So Intense',
            brandId: 2,
          });
    });
});