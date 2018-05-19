const request = require("request");

const api = request.defaults({
  baseUrl: 'http://localhost:3000/api',
  json: true
});

describe('User API Tests:', function () {

  let jwtToken = '';

  beforeAll(function (done) {
    api.post({
      url: '/login',
      body: {
        username: 'dhruvalv',
        password: 'abcd'
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      jwtToken = body.token;
      done();
    });
  });


  //Get the tickets submitted by a user. + 
  it('Positive Get the technicians of a unit', function (done) {
    api.get({
      url: 'users/8/tickets',
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

  //Get the tickets submitted by a user. -
  it('Negative Get the technicians of a unit', function (done) {
    api.get({
      url: 'users/9/tickets',
      headers: {
        'Authorization': 'Bearer ' + jwtToken
      }
    }, function (err, res, body) {    
      expect(body.errorcode).toBe(403);
      expect(body.message).toBe("Access Forbidden.");
      done();
    });
  });
  
});
