Gofer Pro APIs
=

##Unit testing and e2e testing

####1) To install mocha and chai. [Reference](http://mherman.org/blog/2015/09/10/testing-node-js-with-mocha-and-chai/#.WDU4VSRaSsw)
>
    // install mocha
    npm install -g mocha@2.3.1
    // install chai
    npm install chai@3.2.0 chai-http@1.0.0 --save-dev

####2) To install insanbul for code coverage. [Reference](https://www.npmjs.com/package/istanbul)
>
    npm install -g istanbul
    
####3) To run unit test with code coverage
>        
    npm run unit_test

####4) To run e2e test code coverage
>            
    npm run e2e_test  

##API Documentation
Users
-
###/users/get/ ```get```
Get all users.

###users/get/:userID  ```get```
Get an user by "userID". "userID" is to be passed as objectId of "_id".
>
    id

###users/createRootUser/  ```post```
Create a root user with static data to be passed.
>
	fFANumber = "123456"  
    role = "1"
    setPassword("test@123")
>
    Available roles
     "1": "Root",
     "2": "Admin",
     "3": "Coach",
     "4": "Technical_Director",
     "5": "Player"
    
###users/signup  ```post```
Register an user to be passed below parameters.
#####Parameters of req.body
>
	fFANumber
    role
    password
    address
    mobileNumber
    
###users/signin  ```post```
User sign in.
>
	fFANumber
	password
	

Services
-

###/allservices    ```get```
Get all services

###/allservices/:serviceID   ```put```
Get a service by "serviceID". "serviceID" is to be passed as objectId of "_id".
>
	serviceID
    
###/allservices/:serviceID   ```delete```
Delete a service based on serviceID. serviceID is to be passed as objectId of "_id".
>
	serviceID

###/owner/services/:ownerID  ```post```
Create a service and a collection in mongo of that service based on owner.ownerID is to be passed as objectId of "_id" of Owner.
>
	ownerID,    // pass as a URL parameter
    name,
    description,
    image,    
    owner       // owner is a ref type of "Owner" schema.


###/services/:serviceID   ```get```
Get a service by "serviceID". "serviceID" is to be passed as objectId of "_id".
> 
    serviceID

###/services/:serviceID   ```put```
Update a service by "serviceID". "serviceID" is to be passed as objectId of "_id".
> 
    serviceID

###/services/:serviceID   ```delete```
Delete a service by "serviceID". "serviceID" is to be passed as objectId of "_id".
> 
    serviceID

Registrations
-
###/registration  ```get```
Get all registered players.
###/registration  ```post```
Register based on given parameters as below.
#####Parameters of req.body
>
    playerName    
    fFANumber
    birthDate
    ageGroup
    preferredPlayingPosition
    gender
    objectivesAmbitions
    residentialAddress
    homeNumber
    mobileNumber
    email
>
    contact1_personName
    contact1_relationship
    contact1_contactNumber
    contact1_email
>
    contact2_personName
    contact2_relationship
    contact2_contactNumber
    contact2_email
>
    schoolDetails
    employementDetails
>
    previousClub2015
    previousClub2016
    suspensionsDetails
    injuriesDetails
>
    headCoachName
    contactDetails
    academicSessionPerWeekCount
    arrangedBy
    destination
    purposeOfTrip

###/registration  ```put```
Update registartion based on given parameters as below. "_id" is an objectID to be passed.
#####Parameters of req.body
>
    _id
    playerName    
    fFANumber
    birthDate
    ageGroup
    preferredPlayingPosition
    gender
    objectivesAmbitions
    residentialAddress
    homeNumber
    mobileNumber
    email
>
    contactPerson1_id
    contact1_personName
    contact1_relationship
    contact1_contactNumber
    contact1_email
>
    contactPerson2_id
    contact2_personName
    contact2_relationship
    contact2_contactNumber
    contact2_email
>
    studyWorkDetails_id
    schoolDetails
    employementDetails
>
    playingHistory_id
    previousClub2015
    previousClub2016
    suspensionsDetails
    injuriesDetails
>
    footballAcademyDetails_id
    headCoachName
    contactDetails
    academicSessionPerWeekCount
    arrangedBy
    destination
    purposeOfTrip        

###/registration/:registerID  ```get```
Get a registration by "registerID". "registerID" is to be passed as objectId of "_id".
> 
    registerID

###/registration/getAgeGroup:maxAge  ```get```
Get age groups based on maximum age to be passed.
> 
    maxAge

###/registration/emailExist  ```post```
Check whether email exist based on passing email.
#####Parameters of req.body
>
    email

Players
-
       
###/playerprofile  ```get```
Get all players profile
###/playerprofile  ```post```
Create player based on given parameters as below and then remove that player from registartion.
#####Parameters of req.body
>    
    contactPerson1_id            // objectID of registration contact person 1 to remove record
    contactPerson2_id            // objectID of registration contact person 2 to remove record
    studyWorkDetails_id          // objectID of registration study and work details to remove record
    playingHistory_id            // objectID of registration playing history to remove record
    footballAcademyDetails_id    // objectID of registration football and academy details to remove record
    _id                          // objectID of registration to remove record
>
    images	
    playerID
    playerName
    givenName
    familyName
    fFANumber
    birthDate
    ageGroup
    preferredPlayingPosition
    gender
    objectivesAmbitions
    residentialAddress
    homeNumber
    mobileNumber
    email
>
    contact1_personName
    contact1_relationship
    contact1_contactNumber
    contact1_email
>
    contact2_personName
    contact2_relationship
    contact2_contactNumber
    contact2_email
>
    schoolDetails
    employementDetails
>
    previousClub2015
    previousClub2016
    suspensionsDetails
    injuriesDetails
>
    headCoachName
    contactDetails
    academicSessionPerWeekCount
    arrangedBy
    destination
    purposeOfTrip    

###/playerprofile  ```put```
Update player profile based on given parameters as below.
#####Parameters of req.body
>    
    _id
    images	
    playerID
    playerName
    givenName
    familyName
    fFANumber
    birthDate
    ageGroup
    preferredPlayingPosition
    gender
    objectivesAmbitions
    residentialAddress
    homeNumber
    mobileNumber
    email
>
    contact1_personName
    contact1_relationship
    contact1_contactNumber
    contact1_email
>
    contact2_personName
    contact2_relationship
    contact2_contactNumber
    contact2_email
>
    schoolDetails
    employementDetails
>
    previousClub2015
    previousClub2016
    suspensionsDetails
    injuriesDetails
>
    headCoachName
    contactDetails
    academicSessionPerWeekCount
    arrangedBy
    destination
    purposeOfTrip

###/playerprofile/:id  ```get```
Get a plyer by "id". "id" is to be passed as objectId of "_id".
> 
    id

###/playerprofile/:id  ```delete```
Delete a player based on "id"."id" is to be passed as objectId of "_id".
> 
    id
###/playerprofile/emailExist  ```post```
Check whether email exist based on passing email.
#####Parameters of req.body
>
    email

###/playerprofile/sendToCoach  ```put```
Update player with session key to be passed.
#####Parameters of req.body
>
    sessionKey

Coaches
-
       
###/coach  ```get```
Get all coaches
###/coach  ```post```
Create coach based on given parameters as below.
#####Parameters of req.body
>    
    images	    
    coachName
    givenName
    familyName
    birthDate
    fFANumber    
    coachingLicence
    childrenRegistration    
    gender    
    residentialAddress
    homeNumber
    mobileNumber
    email
>
    contact1_personName
    contact1_relationship
    contact1_contactNumber
    contact1_email    
>
    previousClub2015
    previousClub2016
    suspensionsDetails    

###/coach  ```put```
Update coach based on given parameters as below.
#####Parameters of req.body
>    
    images	    
    coachName
    givenName
    familyName
    birthDate
    fFANumber    
    coachingLicence
    childrenRegistration    
    gender    
    residentialAddress
    homeNumber
    mobileNumber
    email
>
    contact1_personName
    contact1_relationship
    contact1_contactNumber
    contact1_email    
>
    previousClub2015
    previousClub2016
    suspensionsDetails

###/coach/:coachID  ```get```
Get a coach by "coachID". "coachID" is to be passed as objectId of "_id".
> 
    id

###/coach/emailExist  ```post```
Check whether email exist based on passing email.
#####Parameters of req.body
>
    email

###/coach/assignToSession  ```put```
Update coach with one or more sessions to be passed as an array of sessionKey.
#####Parameters of req.body
>
    sessions

###/coach/signin  ```post```
Coach sign in with email and FFA Number.
#####Parameters of req.body
>
    email
    fFANumber

Sessions
-
###/sessions  ```get```
Get all active (enable) sessions.

###/sessions  ```post```
Create session based on given parameters as below.
#####Parameters of req.body
>
    sessionKey

###/sessions  ```put```
Update session based on given parameters as below. "_id" is an objectID to be passed.
#####Parameters of req.body
>
    _id
    sessionKey

###/sessions/:id  ```get```
Get a plyer by "id". "id" is to be passed as objectId of "_id".
> 
    id

###/sessions/getAllBySession/:sessionKey  ```get```
Get a session, assigned players and coaches to that session based on sessionKey to be passed. 
> 
    sessionKey

Skills
-
###/skills  ```get```
Get all skills.

###/skills  ```post```
Create skill based on given parameters as below.
#####Parameters of req.body
>
    name
    description
    
###/skills  ```put```
Update skill based on given parameters as below. "_id" is an objectID to be passed.
#####Parameters of req.body
>
    _id
    name
    description

###/skills/:id  ```get```
Get a skill by "id". "id" is to be passed as objectId of "_id".
> 
    id
