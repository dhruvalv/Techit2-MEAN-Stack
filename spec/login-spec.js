const request = require("request");

const api = request.defaults({
  baseUrl: 'http://localhost:3000/api',
  json: true
});

describe('Login Service Tests:', function () {

  // login +
  it('Positive login', function (done) {
    api.post({
      url: '/login',
      body: {
        username: 'dhruvalv',
        password: 'abcd'
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      done();
    });
  });


  // login -
  it('Negative login', function (done) {
    api.post({
      url: '/login',
      body: {
        username: 'dhruvalv',
        password: 'abcde'
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      expect(body.errorcode).toBe('404');
      expect(body.message).toBe("Invalid Username/Password");
      done();
    });
  });
  
});
