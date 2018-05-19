db = connect('localhost/techit');

// Units
db.units.createIndex({
    id: 1
  }, {
    unique: true
  });
  db.units.createIndex({
    name: 1
  }, {
    unique: true
  });

unit1 = db.units.insertOne({
        id: 1,
        name: 'TechOps',        
	}).insertedId;
	
unit2 = db.units.insertOne({
        id: 2,
        name: 'ITC',        
	}).insertedId;

// Users
db.users.createIndex({
    id: 1
  }, {
    unique: true
  });
db.users.createIndex({
    email: 1
  }, {
    unique: true
  });
  db.users.createIndex({
    userName: 1
  }, {
    unique: true
  });
  
 
user1 = db.users.insertOne(
    {
        type: 'ADMIN',
        id: 1,
        userName: 'techit',
        hash:'$2a$10$v2/oF1tdBlXxejoMszKW3eNp/j6x8CxSBURUnVj006PYjYq3isJjO',
        firstName: 'System',
        lastName: 'Admin',
        email: 'techit@localhost.localdomain',
		unit: null		
  }
).insertedId;

user2 = db.users.insertOne(
    {
    
        type: 'SUPERVISOR',
        id: 2,
        userName: 'jsmith',
        hash:'$2a$10$9PJIPq9PMYHd9L8kb66/Nuu7DDQqq29eOsVF1F8SnPZ2UfD6KC/ly',
        firstName: 'John',
        lastName: 'Smith',
        email: 'jsmith@localhost.localdomain',
		unit:unit1
     }
).insertedId;

user3 = db.users.insertOne(
    {
        type: 'SUPERVISOR',
        id: 3,
        userName: 'stiger',
        hash:'$2a$10$9PJIPq9PMYHd9L8kb66/Nuu7DDQqq29eOsVF1F8SnPZ2UfD6KC/ly',
        firstName: 'Scott',
        lastName: 'Tiger',
        email: 'tscott@gmail.com',
		unit:unit2
     }
).insertedId;

user4 = db.users.insertOne(
    {
        type: 'TECHNICIAN',
        id: 4,
        userName: 'jjim',
        hash:'$2a$10$Q8G5BtMC.C5oonZzvBS.0usxJ2fpccf.I46pw3IGi.zorntvTSYbK',
        firstName: 'Jimmy',
        lastName: 'Jim',
        email: 'jjim@localhost.localdomain',
		unit:unit1
  }
).insertedId;

user5 = db.users.insertOne(
    {
        type: 'TECHNICIAN',
        id: 5,
        userName: 'blee',
        hash:'$2a$10$d8lhouzPhxZ.nLCaqjh5gevTyA3tZDUMwuy2WAsWAm.i/ag/btcxe',
        firstName: 'Bob',
        lastName: 'Lee',
        email: 'blee@localhost.localdomain',
		unit:unit1
  }
).insertedId;

user6 = db.users.insertOne(
    {
        type: 'TECHNICIAN',
        id: 6,
        userName: 'tshrey',
        hash:'$2a$10$Q8G5BtMC.C5oonZzvBS.0usxJ2fpccf.I46pw3IGi.zorntvTSYbK',
        firstName: 'Shrey',
        lastName: 'Tarsar',
        email: 'shreyt@gmail.com',
		unit:unit2
  }
).insertedId;

user7 = db.users.insertOne(
    {
        type: 'TECHNICIAN',
        id: 7,
        userName: 'trutu',
        hash:'$2a$10$d8lhouzPhxZ.nLCaqjh5gevTyA3tZDUMwuy2WAsWAm.i/ag/btcxe',
        firstName: 'Rutu',
        lastName: 'Tarsar',
        email: 'rutut@gmail.com',
		unit:unit2
  }
).insertedId;

user8 = db.users.insertOne({
    type: 'REGULAR',
    id: 8,
    userName: 'dhruvalv',
    hash:'$2a$10$d8lhouzPhxZ.nLCaqjh5gevTyA3tZDUMwuy2WAsWAm.i/ag/btcxe',
    firstName: 'Dhruval',
    lastName: 'Variya',
    email: 'dhruvalv@gmail.com',
    unit: null
}).insertedId;

user9 = db.users.insertOne({
    type: 'REGULAR',
    id: 9,
    userName: 'jayv',
    hash:'$2a$10$d8lhouzPhxZ.nLCaqjh5gevTyA3tZDUMwuy2WAsWAm.i/ag/btcxe',
    firstName: 'Jay',
    lastName: 'Variya',
    email: 'jayvariya@gmail.com',
    unit:null	
}).insertedId;

user10 = db.users.insertOne({
    type: 'REGULAR',
    id: 10,
    userName: 'cysun',
    hash:'$2a$10$d8lhouzPhxZ.nLCaqjh5gevTyA3tZDUMwuy2WAsWAm.i/ag/btcxe',
    firstName: 'Chengyu',
    lastName: 'Sun',
    email: 'cysun@calstatela.edu',
    unit: null
}).insertedId;



// Tickets
db.tickets.createIndex({
    id: 1
  }, {
    unique : true
  });

ticket1 = db.tickets.insert(
    {
        id: 1,
        createdBy: user8,
        createdForName: 'Dhruval Variya',
        createdForEmail: 'dhruvalv@gmail.com',
        subject:'Projector Malfunction',
        details: 'The projector is broken in room A220.',
        unit: unit1,
        priority : 'LOW',
        status : 'OPEN',
        technicians : [user4]
      }
).insertedId;

ticket2 = db.tickets.insert({
    id: 2,
    createdBy: user8,
    createdForName: 'Dhruval Variya',
    createdForEmail: 'dhruvalv@gmail.com',
    subject:'Equipment for EE Senior Design Project',
    details: 'One of the EE senior design projects needs some equipment.',
    unit: unit1,
    priority : 'LOW',
    status : 'OPEN',
    technicians : [user5]
    }
).insertedId;


ticket3 = db.tickets.insert(
    {
        id: 3,
        createdBy: user9,
        createdForName: 'Jay Variya',
        createdForEmail: 'jayv@gmail.com',
        subject:'Cant install Java',
        details: 'Asking for permission while installing java.',
        unit: unit2,
        priority : 'LOW',
        status : 'OPEN',
        technicians : [user6]
      }
).insertedId;

ticket4 = db.tickets.insert({
    id: 4,
    createdBy: user9,
    createdForName: 'Jay Variya',
    createdForEmail: 'jayv@gmail.com',
    subject:'PC restarts intermittently',
    details: 'PC restarts after Installing Anti Virus.',
    unit: unit2,
    priority : 'LOW',
    status : 'OPEN',
    technicians : [user7]
    }
).insertedId;

// update units to add supervisors and Technicians
db.units.update(
    { id: 1 },
    { $set:
       {
         supervisors: [user2],
         technicians : [user4,user5]
       }
    }
 );

 db.units.update(
    { id: 2 },
    { $set:
       {
         supervisors: [user3],
         technicians : [user6,user7]
       }
    }
 );
