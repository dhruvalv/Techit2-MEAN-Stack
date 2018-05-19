const request = require("request");

const api = request.defaults({
  baseUrl: 'http://localhost:3000/api',
  json: true
});

describe('Units API Tests:', function () {

  let jwtToken = '';

  beforeAll(function (done) {
    api.post({
      url: '/login',
      body: {
        username: 'jsmith',
        password: 'abcd'
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      jwtToken = body.token;
      done();
    });
  });

  // Get the technicians of a unit +
  it('Positive Get the technicians of a unit', function (done) {
    api.get({
      url: 'units/1/technicians',
      headers: {
        'Authorization': 'Bearer ' + jwtToken
      }
    }, function (err, res, body) {    
      expect(res.statusCode).toBe(200);
      expect(body.length).toBe(2);
      expect(body[0].firstName).toBe("Jimmy");
      expect(body[1].firstName).toBe("Bob");
      done();
    });
  });

    // Get the technicians of a unit -
  it('Negative Get the technicians of a unit -', function (done) {
      api.get({
        url: 'units/2/technicians',
        headers: {
          'Authorization': 'Bearer ' + jwtToken
        }
      }, function (err, res, body) {   
        expect(body.errorcode).toBe('403');
        expect(body.message).toBe("Access Forbidden");
        done();
      });
    });

  // Get the tickets submitted to a unit. +
  it('Positive Get the tickets submitted to a unit.', function (done) {
    api.get({
      url: 'units/1/tickets',
      headers: {
        'Authorization': 'Bearer ' + jwtToken
      }
    }, function (err, res, body) {    
      expect(res.statusCode).toBe(200);
      expect(body.length).toBeGreaterThanOrEqual(2);
      expect(body[0].createdBy.firstName).toBe("Dhruval");
      expect(body[1].createdBy.firstName).toBe("Dhruval");
      done();
    });
});

  // Get the tickets submitted to a unit. -
  it('Negative Get the tickets submitted to a unit.', function (done) {
    api.get({
      url: 'units/2/tickets',
      headers: {
        'Authorization': 'Bearer ' + jwtToken
      }
    }, function (err, res, body) {    
      expect(body.errorcode).toBe('403');
      expect(body.message).toBe('Access Forbidden');
      done();
    });
  });
});
