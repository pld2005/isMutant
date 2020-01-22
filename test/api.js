const chai = require('chai');
const request = require('supertest');
const app = require('../src/config/server/server').default;
const DnaModel = require('../src/components/Dna/model').default;
chai.should();

/**
 * API tests
 */
describe('API', () => {
    it('is mutant', (done) => {
        const dna = {
            dna: ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
        }
        request(app)
            .post('/api/mutant')
            .send(dna)
            .expect((res) => {
                res.status.should.equal(200);
            })
            .end(done);
    });

    it('Not is mutant', (done) => {
        const dna = {
            dna: ["ATCG","GCTA","TGCA","CAGT"]
        }
        request(app)
            .post('/api/mutant')
            .send(dna)
            .expect((res) => {
                res.status.should.equal(403);
            })
            .end(done);
    });

    it('is mutant whitout parameters', (done) => {
        
        request(app)
            .post('/api/mutant')
            .expect((res) => {
                res.status.should.equal(500);
            })
            .end(done);
    });

    it('Get Stats', (done) => {
        request(app)
            .get('/api/stats')
            .expect((res) => {
                res.status.should.equal(200);
            })
            .end(done);
    });

    it('Error 404', (done) => {
        request(app)
            .get('/api/xxxx')
            .expect((res) => {
                res.status.should.equal(404);
            })
            .end(done);
    });
});

/**
 * clear database after tests
 */
// after(async () => {
//     try {
//         await DnaModel.collection.drop();
//     } catch (error) {
//         console.log('Something went wrong after tests, seems your database doesnt cleaned');
//     }
// });
