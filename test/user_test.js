var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://qatest-env1.us-west-2.elasticbeanstalk.com/api/users');

describe('User api', function () {
    
    before(function (done) {
        /*
        api.post('/reset')
            .set('Accept', 'application/x-www-form-urlencoded')
            .send({
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function (err, res) {
            });
        */
        api.post('')
            .set('Accept', 'application/x-www-form-urlencoded')
            .send({
                firstName: "Winnipeg",
                lastName: "Storms",
                email: "actenum@example.comR",
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function (err, res) {
                done();
            });
        
    });

    it('should return 201 on POST request', function (done) {
        api.post('')
            .set('Accept', 'application/x-www-form-urlencoded')
            .send({
                firstName: "Winnipeg",
                lastName: "Storms",
                email: "actenum@example.comR",
            })
            .expect('Content-Type', /json/)
            .expect(201, done);
    });

    it('should return 200 on GET request with valid url', function (done) {
        api.get('')
            .set('Accept', 'application/json')
            .expect(200, done);
    });

    it('should return 201 on PUT ', function (done) {
        api.put('/winnipegstorms')
            .set('Accept', 'application/x-www-form-urlencoded')
            .send({
                firstName: "BaharehUpdated",
                lastName: "LastNameUpdated",
                email: "QA@example.com",

            })
            .expect(201, done);
    });

    it('should return 405 on unsupported verb', function (done) {
        api.delete('')
            .set('Accept', 'application/json')
            .expect(405, done);
    });

    it('should return 404 on PUT if ID does not exist', function (done) {
        api.put('/randomNonExistenceID')
            .set('Accept', 'application/x-www-form-urlencoded')
            .send({
                firstName: "BaharehUpdated",
                lastName: "LastNameUpdated",
                email: "QA@example.com",

            })
            .expect(404, done);
    });

    it('should be updated with new properties after PUT', function (done) {
        api.put('/winnipegstorms')
            .set('Accept', 'application/x-www-form-urlencoded')
            .send({
                firstName: "BaharehUpdated",
                lastName: "LastNameUpdated",
                email: "QA@example.com",

            })
            .expect(201)
            .end(function (err, res) {
                api.get('/winnipegstorms')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        expect(res.body.firstName).to.equal("BaharehUpdated");
                        expect(res.body.email).to.equal("QA@example.com");
                        expect(res.body.lastName).to.equal("LastNameUpdated");
                        expect(res.body.id).to.equal('winnipegstorms');
                        done();
                    });
            });
    });

    it('should not return empty body on PUT (have all properties)', function (done) {
        api.put('/winnipegstorms')
            .set('Accept', 'application/x-www-form-urlencoded')
            .send({
                firstName: "BaharehUpdated",
                lastName: "LastNameUpdated",
                email: "QA@example.com",

            })
            .expect(201)
            .end(function (err, res) {               
                expect(res.body.firstName).to.equal("BaharehUpdated");
                expect(res.body.email).to.equal("QA@example.com");
                expect(res.body.lastName).to.equal("LastNameUpdated");
                expect(res.body.id).to.equal('winnipegstorms');
                done();                   
            });
    });

        it('should only update expected properties on PUT', function (done) {
            api.put('/thomasbrown')
            .set('Accept', 'application/x-www-form-urlencoded')
            .send({
                lastName: "LastNameUpdated",
                email: "QA@example.com",

            })
            .expect(201)
            .end(function (err, res) {
                api.get('/thomasbrown')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        expect(res.body.firstName).to.be.a('string');
                        done();
                    });
            });
        });

    it('should return all expected properties with expected types on GET', function (done) {
        api.get('/winnipegstorms')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                expect(res.body).to.have.property("firstName");
                expect(res.body.firstName).to.not.equal(null);
                expect(res.body.firstName).to.be.a('string');

                expect(res.body).to.have.property("lastName");
                expect(res.body.lastName).to.not.equal(null);
                expect(res.body.lastName).to.be.a('string');

                expect(res.body).to.have.property("email");
                expect(res.body.email).to.not.equal(null);
                expect(res.body.email).to.be.a('string');

                expect(res.body).to.have.property("id");
                expect(res.body.id).to.not.equal(null);
                expect(res.body.id).to.be.a('string');

                expect(res.body).to.have.property("created");
                expect(res.body.created).to.not.equal(null);
                expect(res.body.created).to.be.a('string');

                expect(res.body).to.have.property("isactive");
                expect(res.body.isactive).to.not.equal(null);
                expect(res.body.isactive).to.be.a('boolean');

                expect(res.body).to.have.property("lastLogin");
                expect(res.body.lastLogin).to.not.equal(null);
                expect(res.body.lastLogin).to.be.number;
                done();
            });
    });

    it('should return 404 on GET when id not found ', function (done) {
        api.get('/randomTestGuid')
            .set('Accept', 'application/json')
            .expect(404, done);
    });



});