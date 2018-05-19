const request = require("request");

const api = request.defaults({
  baseUrl: 'http://localhost:3000/api',
  json: true
});

describe('Ticket API Tests:', function () {

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

  //	Create a new ticket. + 
  it('Positive Create a Ticket', function (done) {
    api.post({
      url: 'tickets',
      headers: {
        'Authorization': 'Bearer ' + jwtToken
      },
      body: {
       subject : 'Clock is Dead.',
       createdForEmail : 'dhruvalv@gmail.com',
       unit:1
      }
    }, function (err, res, body) {    
      expect(res.statusCode).toBe(200);
      expect(body.subject).toBe("Clock is Dead.");
      expect(body.unit.id).toBe(1);
      done();
    });
  });

  //	Create a new ticket. - 
  it('Negative Create a Ticket', function (done) {
    api.post({
      url: 'tickets',
      headers: {
        'Authorization': 'Bearer ' + jwtToken
      },
      body: {
       createdForEmail : 'dhruvalv@gmail.com',
       unit:1
      }
    }, function (err, res, body) {    
      expect(res.statusCode).toBe(200);
      expect(body.errorcode).toBe(400);
      expect(body.message).toBe("CreatedBy and/or Email and/or Subject and/or Unit is/are missing in the request");
      done();
    });
  });


  // Get the technicians assigned to a ticket.
  it('Positive Get the technicians assigned to a ticket', function (done) {
    api.get({
      url: 'tickets/1/technicians',
      headers: {
        'Authorization': 'Bearer ' + jwtToken
      }
    }, function (err, res, body) {    
      expect(res.statusCode).toBe(200);
      expect(body[0].type).toBe("TECHNICIAN");
      expect(body[0].firstName).toBe("Jimmy");
      done();
    });
  });

  // Get the technicians assigned to a ticket.
  it('Negative Get the technicians assigned to a ticket', function (done) {
    api.get({
      url: 'tickets/3/technicians',
      headers: {
        'Authorization': 'Bearer ' + jwtToken
      }
    }, function (err, res, body) {    
      expect(res.statusCode).toBe(200);
      expect(body.errorcode).toBe(403);
      expect(body.message).toBe("Access Forbidden");
      done();
    });
  });
});

  describe('Ticket Status & Priority Tests:', function () {
    
    let jwt = '';
    
      beforeAll(function (done) {
        api.post({
          url: '/login',
          body: {
            username: 'jjim',
            password: 'abcd'
          }
        }, function (err, res, body) {
          expect(res.statusCode).toBe(200);
          jwt = body.token;
          done();
        });
      });
  
  it('Positive Set the status of a ticket', function (done) {
    api.put({
      url: 'tickets/1/status/completed',
      headers: {
        'Authorization': 'Bearer ' + jwt
      }
    }, function (err, res, body) {    
      expect(res.statusCode).toBe(200);
      expect(body.status).toBe("COMPLETED");
      expect(body.updates.length).toBeGreaterThanOrEqual(1);
      done();
    });
  });

  // Set the status of a ticket.
  it('Negative Set the status of a ticket', function (done) {
    api.put({
      url: 'tickets/1/status/onclick',
      headers: {
        'Authorization': 'Bearer ' + jwt
      }
    }, function (err, res, body) {    
      expect(res.statusCode).toBe(200);
      expect(body.errorcode).toBe(500);
      expect(body.message).toBe("onclick is not a valid Status");
      done();
    });
  });


  it('Positive Set the Priority of a ticket', function (done) {
    api.put({
      url: 'tickets/1/priority/high',
      headers: {
        'Authorization': 'Bearer ' + jwt
      }
    }, function (err, res, body) {    
      expect(res.statusCode).toBe(200);
      expect(body.priority).toBe("HIGH");
      done();
    });
  });

  // Set the status of a ticket.
  it('Negative Set the Priority of a ticket', function (done) {
    api.put({
      url: 'tickets/1/priority/higher',
      headers: {
        'Authorization': 'Bearer ' + jwt
      }
    }, function (err, res, body) {    
      expect(res.statusCode).toBe(200);
      expect(body.errorcode).toBe(500);
      expect(body.message).toBe("higher is not a valid priority");
      done();
    });
  });
 
});
