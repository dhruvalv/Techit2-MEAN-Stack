TechIT is a work order system.

It incorporates following use-cases:
1) User reports an issue(raise a ticket) to a particular Unit in the organization. 
2) Supervisor of a unit assigns that ticket to Technician(s) of same unit.
3) Technician(s) work on that ticket to resolve and updates the status as and when required.
4) User, Technician, Supervisor, Admin all can track end to end flow of the ticket based on their roles.

Tech-Spec:

Implementation : (MEAN stack)
1) Redesigned all the models for Mongoose.
2) Redeveloped all Rest endpoints using Node.j-Express.js with JWT Authentication which uses passport.js
3) Unit and integration of endpoints testing using Jasmine.
4) Used NoSQL database MongoDB.
5) Created Single Page Application using Angular CLI.
6) Created different Angular Components, Services for front end along with Bootstrap for styling.
7) Deployed it successfully on Ubuntu. (creating /dist in angular and pointing it to node server).
8) Used GitHub for version control.
