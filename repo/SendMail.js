var fs = require('fs');
var path = require('path');
var ageGroupEnum = require('../models/AgeGroupEnum.json');
module.exports = function(basicDetailsObject) {
    var filePath = path.join(__dirname, '../Templates/emailtemplateRegistration.html');
    var content = fs.readFileSync(filePath);
    var emailConfiguration = require('../EmailConfiguration.json');
    //  var email = require("../node_modules/emailjs/email");

    var nodemailer = require('nodemailer');
    var ses = require('nodemailer-ses-transport');

//fails if secret or key has a '/' in it... so I had to regenerate until there were none
    var transporter = nodemailer.createTransport(ses({
        accessKeyId: emailConfiguration.smtp.user,
        secretAccessKey: emailConfiguration.smtp.password,
    }));
    
    var id =  basicDetailsObject.id.toString();
    var shortPlayerId = id.substr(id.length - 5)

    content = content.toString().replace("{{PlayerID}}",shortPlayerId);
    content = content.toString().replace("{{Salutation}}", basicDetailsObject.playerName.toString());
    content = content.toString().replace("{{PlayerName}}", basicDetailsObject.playerName.toString());

    function returnDashString(paramName) {
        return content.toString().replace("{{" + paramName + "}}", "-");
    }
    if (basicDetailsObject.fFANumber !== undefined && basicDetailsObject.fFANumber !== null && basicDetailsObject.fFANumber !== '') {
        content = content.toString().replace("{{fFANumber}}", basicDetailsObject.fFANumber);
    }
    else {
        content = returnDashString("fFANumber");
    }

    if (basicDetailsObject.birthDate !== undefined && basicDetailsObject.birthDate !== null && basicDetailsObject.birthDate !== '') {
        var date = new Date(basicDetailsObject.birthDate);
        content = content.toString().replace("{{birthDate}}", date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
    }
    else {
        content = returnDashString("birthDate");
    }
    if (basicDetailsObject.preferredPlayingPosition !== undefined && basicDetailsObject.preferredPlayingPosition !== null && basicDetailsObject.preferredPlayingPosition !== '') {
        content = content.toString().replace("{{preferredPlayingPosition}}", ageGroupEnum["enum"][basicDetailsObject.preferredPlayingPosition]);
    }
    else {
        content = returnDashString("preferredPlayingPosition");
    }
    if (basicDetailsObject.gender !== undefined && basicDetailsObject.gender !== null && basicDetailsObject.gender !== '') {
        content = content.toString().replace("{{gender}}", basicDetailsObject.gender);
    }
    else {
        content = returnDashString("gender");
    }

    if (basicDetailsObject.ageGroup !== undefined && basicDetailsObject.ageGroup !== null && basicDetailsObject.ageGroup !== '') {
        content = content.toString().replace("{{ageGroup}}", basicDetailsObject.ageGroup);
    }
    else {
        content = returnDashString("ageGroup");
    }
    if (basicDetailsObject.residentialAddress !== undefined && basicDetailsObject.residentialAddress !== null && basicDetailsObject.residentialAddress !== '') {
        content = content.toString().replace("{{residentialAddress}}", basicDetailsObject.residentialAddress);
    }
    else {
        content = returnDashString("residentialAddress");
    }
    if (basicDetailsObject.homeNumber !== undefined && basicDetailsObject.homeNumber !== null && basicDetailsObject.homeNumber !== '') {
        content = content.toString().replace("{{homeNumber}}", basicDetailsObject.homeNumber);
    }
    else {
        content = returnDashString("homeNumber");
    }
    if (basicDetailsObject.mobileNumber !== undefined && basicDetailsObject.mobileNumber !== null && basicDetailsObject.mobileNumber !== '') {
        content = content.toString().replace("{{mobileNumber}}", basicDetailsObject.mobileNumber);
    }
    else {
        content = returnDashString("mobileNumber");
    }
    if (basicDetailsObject.email !== undefined && basicDetailsObject.email !== null && basicDetailsObject.email !== '') {
        content = content.toString().replace("{{email}}", basicDetailsObject.email);
    }
    else {
        content = returnDashString("email");
    }

    if (basicDetailsObject.objectivesAmbitions !== undefined && basicDetailsObject.objectivesAmbitions !== null && basicDetailsObject.objectivesAmbitions !== '') {
        content = content.toString().replace("{{objectivesAmbitions}}", basicDetailsObject.objectivesAmbitions);
    }
    else {
        content = returnDashString("objectivesAmbitions");
    }

    if (basicDetailsObject.contactPerson1 != undefined && basicDetailsObject.contactPerson1 != null) {
        if (basicDetailsObject.contactPerson1.personName !== undefined && basicDetailsObject.contactPerson1.personName !== null && basicDetailsObject.contactPerson1.personName !== '') {
            content = content.toString().replace("{{contactPerson1.personName}}", basicDetailsObject.contactPerson1.personName);
        }
        else {
            content = returnDashString("contactPerson1.personName");
        }
        if (basicDetailsObject.contactPerson1.relationship !== undefined && basicDetailsObject.contactPerson1.relationship !== null && basicDetailsObject.contactPerson1.relationship !== '') {
            content = content.toString().replace("{{contactPerson1.relationship}}", basicDetailsObject.contactPerson1.relationship);
        }
        else {
            content = returnDashString("contactPerson1.relationship");
        }
        if (basicDetailsObject.contactPerson1.contactNumber !== undefined && basicDetailsObject.contactPerson1.contactNumber !== null && basicDetailsObject.contactPerson1.contactNumber !== '') {
            content = content.toString().replace("{{contactPerson1.contactNumber}}", basicDetailsObject.contactPerson1.contactNumber);
        }
        else {
            content = returnDashString("contactPerson1.contactNumber");
        }

        if (basicDetailsObject.contactPerson1.email !== undefined && basicDetailsObject.contactPerson1.email !== null && basicDetailsObject.contactPerson1.email !== '') {
            content = content.toString().replace("{{contactPerson1.email}}", basicDetailsObject.contactPerson1.email);
        }
        else {
            content = returnDashString("contactPerson1.email");
        }
    }

    if (basicDetailsObject.contactPerson2 != undefined && basicDetailsObject.contactPerson2 != null) {
        if (basicDetailsObject.contactPerson2.personName !== undefined && basicDetailsObject.contactPerson2.personName !== null && basicDetailsObject.contactPerson2.personName !== '') {
            content = content.toString().replace("{{contactPerson2.personName}}", basicDetailsObject.contactPerson2.personName.toString());
        }
        else {
            content = returnDashString("contactPerson2.personName");
        }
        if (basicDetailsObject.contactPerson2.relationship !== undefined && basicDetailsObject.contactPerson2.relationship !== null && basicDetailsObject.contactPerson2.relationship !== '') {
            content = content.toString().replace("{{contactPerson2.relationship}}", basicDetailsObject.contactPerson2.relationship.toString());
        }
        else {
            content = returnDashString("contactPerson2.relationship");
        }
        if (basicDetailsObject.contactPerson2.contactNumber !== undefined && basicDetailsObject.contactPerson2.contactNumber !== null && basicDetailsObject.contactPerson2.contactNumber !== '') {
            content = content.toString().replace("{{contactPerson2.contactNumber}}", basicDetailsObject.contactPerson2.contactNumber.toString());
        }
        else {
            content = returnDashString("contactPerson2.contactNumber");
        }
        if (basicDetailsObject.contactPerson2.email !== undefined && basicDetailsObject.contactPerson2.email !== null && basicDetailsObject.contactPerson2.email !== '') {
            content = content.toString().replace("{{contactPerson2.email}}", basicDetailsObject.contactPerson2.email.toString());
        }
        else {
            content = returnDashString("contactPerson2.email");
        }
    }

    if (basicDetailsObject.studyWorkDetails != undefined && basicDetailsObject.studyWorkDetails != null) {
        if (basicDetailsObject.studyWorkDetails.schoolDetails !== undefined && basicDetailsObject.studyWorkDetails.schoolDetails !== null && basicDetailsObject.studyWorkDetails.schoolDetails !== '') {
            content = content.toString().replace("{{studyWorkDetails.schoolDetails}}", basicDetailsObject.studyWorkDetails.schoolDetails.toString());
        }
        else {
            content = returnDashString("studyWorkDetails.schoolDetails");
        }
        if (basicDetailsObject.studyWorkDetails.employementDetails !== undefined && basicDetailsObject.studyWorkDetails.employementDetails !== null && basicDetailsObject.studyWorkDetails.employementDetails !== '') {
            content = content.toString().replace("{{studyWorkDetails.employementDetails}}", basicDetailsObject.studyWorkDetails.employementDetails.toString());
        }
        else {
            content = returnDashString("studyWorkDetails.employementDetails");
        }
    }

    if (basicDetailsObject.playingHistory != undefined && basicDetailsObject.playingHistory != null) {
        if (basicDetailsObject.playingHistory.previousClub2016 !== undefined && basicDetailsObject.playingHistory.previousClub2016 !== null && basicDetailsObject.playingHistory.previousClub2016 !== '') {
            content = content.toString().replace("{{playingHistory.previousClub2016}}", basicDetailsObject.playingHistory.previousClub2016.toString());
        }
        else {
            content = returnDashString("playingHistory.previousClub2016");
        }
        if (basicDetailsObject.playingHistory.previousClub2015 !== undefined && basicDetailsObject.playingHistory.previousClub2015 !== null && basicDetailsObject.playingHistory.previousClub2015 !== '') {
            content = content.toString().replace("{{playingHistory.previousClub2015}}", basicDetailsObject.playingHistory.previousClub2015.toString());
        }
        else {
            content = returnDashString("playingHistory.previousClub2015");
        }
        if (basicDetailsObject.playingHistory.suspensionsDetails !== undefined && basicDetailsObject.playingHistory.suspensionsDetails !== null && basicDetailsObject.playingHistory.suspensionsDetails !== '') {
            content = content.toString().replace("{{playingHistory.suspensionsDetails}}", basicDetailsObject.playingHistory.suspensionsDetails.toString());
        }
        else {
            content = returnDashString("playingHistory.suspensionsDetails");
        }
        if (basicDetailsObject.playingHistory.injuriesDetails !== undefined && basicDetailsObject.playingHistory.injuriesDetails !== null && basicDetailsObject.playingHistory.injuriesDetails !== '') {
            content = content.toString().replace("{{playingHistory.injuriesDetails}}", basicDetailsObject.playingHistory.injuriesDetails.toString());
        }
        else {
            content = returnDashString("playingHistory.injuriesDetails");
        }
    }

    if (basicDetailsObject.ageGroup != undefined && basicDetailsObject.ageGroup != null) {
        if (basicDetailsObject.ageGroup == "Under 9s") {
            content = content.toString().replace("{{trialLocation}}", "SAP Trials held at Magdala Park, North Ryde)");
            content = content.toString().replace("{{trial}}", "<p><strong>U9 (born 2008 & 2009)</strong><p></p><p>Monday, 24 October 6.00pm</p><p>Wednesday, 26 October 7.00pm</p><p>Friday, 28 October 6.00pm</p>");
        }
        else
        if (basicDetailsObject.ageGroup == "Under 10s") {
            content = content.toString().replace("{{trialLocation}}", "SAP Trials held at Magdala Park, North Ryde)");
            content = content.toString().replace("{{trial}}", "<p><strong>U10 (born 2007)</strong><p></p><p>Monday, 24 October 7:15pm</p><p>Wednesday, 26 October 7.00pm</p><p>Friday, 28 October 6.00pm</p>");
        }
        else
        if (basicDetailsObject.ageGroup == "Under 11s") {
            content = content.toString().replace("{{trialLocation}}", "SAP Trials held at Magdala Park, North Ryde)");
            content = content.toString().replace("{{trial}}", "<p><strong>U11 (born 2006)</strong><p></p><p>Tuesday, 25 October  6:00pm</p><p>Thursday, 27 October 7.00pm</p><p>Friday, 28 October 7.00pm</p>");
        }
        else
        if (basicDetailsObject.ageGroup == "Under 12s") {
            content = content.toString().replace("{{trialLocation}}", "SAP Trials held at Magdala Park, North Ryde)");
            content = content.toString().replace("{{trial}}", "<p><strong>U12 (born 2005)</strong><p></p><p>Tuesday, 25 October  7:15pm</p><p>Thursday, 27 October 7.00pm</p><p>Friday, 28 October 7.00pm</p>");
        }
        else
        if (basicDetailsObject.ageGroup == "Under 13s") {
            content = content.toString().replace("{{trialLocation}}", "Youth Trials held at Magdala Park, North Ryde");
            content = content.toString().replace("{{trial}}", "<p><strong>U13 (born 2004)</strong><p></p><p>Sunday, 30 October 8.30am</p><p>Tuesday, 1 November 6.30pm</p>");
        }
        else
        if (basicDetailsObject.ageGroup == "Under 14s") {
            content = content.toString().replace("{{trialLocation}}", "Youth Trials held at Magdala Park, North Ryde");
            content = content.toString().replace("{{trial}}", "<p><strong>U14 (born 2003)</strong><p></p><p>Sunday, 30 October 8.30am</p><p>Tuesday, 1 November 6.30pm</p>");
        }
        else
        if (basicDetailsObject.ageGroup == "Under 15s") {
            content = content.toString().replace("{{trialLocation}}", "Youth Trials held at Magdala Park, North Ryde");
            content = content.toString().replace("{{trial}}", "<p><strong>U15 (born 2002)</strong><p></p><p>Sunday, 30 October 10.30am</p><p>Tuesday, 1 November 7.30pm</p>");
        }
        else
        if (basicDetailsObject.ageGroup == "Under 16s") {
            content = content.toString().replace("{{trialLocation}}", "Youth Trials held at Magdala Park, North Ryde");
            content = content.toString().replace("{{trial}}", "<p><strong>U16 (born 2001)</strong><p></p><p>Sunday, 30 October 10.30am</p><p>Tuesday, 1 November 7.30pm</p>");
        }
        else
        if (basicDetailsObject.ageGroup == "Under 18s") {
            content = content.toString().replace("{{trialLocation}}", "Senior Trials held at Magdala Park, North Ryde");
            content = content.toString().replace("{{trial}}", "<p><strong>U18 (born 2000 and 1999)</strong><p></p><p>Monday, 31 October 7.30pm</p><p>Wednesday, 2 November 7.30pm</p>");
        }
        else
        if (basicDetailsObject.ageGroup == "Under 20s") {
            content = content.toString().replace("{{trialLocation}}", "Senior Trials held at Magdala Park, North Ryde");
            content = content.toString().replace("{{trial}}", "<p><strong>U20 (born 1998 and prior)</strong><p></p><p>Monday, 31 October 6.30pm</p><p>Wednesday, 2 November 6.30pm</p>");
        }
    }

    if (basicDetailsObject.footballAcademyDetails != undefined && basicDetailsObject.footballAcademyDetails != null) {
        if (basicDetailsObject.footballAcademyDetails.headCoachName !== undefined && basicDetailsObject.footballAcademyDetails.headCoachName !== null && basicDetailsObject.footballAcademyDetails.headCoachName !== '') {
            content = content.toString().replace("{{footballAcademyDetails.headCoachName}}", basicDetailsObject.footballAcademyDetails.headCoachName.toString());
        }
        else {
            content = returnDashString("footballAcademyDetails.headCoachName");
        }
        if (basicDetailsObject.footballAcademyDetails.contactDetails !== undefined && basicDetailsObject.footballAcademyDetails.contactDetails !== null && basicDetailsObject.footballAcademyDetails.contactDetails !== '') {
            content = content.toString().replace("{{footballAcademyDetails.contactDetails}}", basicDetailsObject.footballAcademyDetails.contactDetails.toString());
        }
        else {
            content = returnDashString("footballAcademyDetails.contactDetails");
        }
        if (basicDetailsObject.footballAcademyDetails.academicSessionPerWeekCount !== undefined && basicDetailsObject.footballAcademyDetails.academicSessionPerWeekCount !== null && basicDetailsObject.footballAcademyDetails.academicSessionPerWeekCount !== '') {
            content = content.toString().replace("{{footballAcademyDetails.academicSessionPerWeekCount}}", basicDetailsObject.footballAcademyDetails.academicSessionPerWeekCount.toString());
        }
        else {
            content = returnDashString("footballAcademyDetails.academicSessionPerWeekCount");
        }
        if (basicDetailsObject.footballAcademyDetails.arrangedBy !== undefined && basicDetailsObject.footballAcademyDetails.arrangedBy !== null && basicDetailsObject.footballAcademyDetails.arrangedBy !== '') {
            content = content.toString().replace("{{footballAcademyDetails.arrangedBy}}", basicDetailsObject.footballAcademyDetails.arrangedBy.toString());
        }
        else {
            content = returnDashString("footballAcademyDetails.arrangedBy");
        }
        if (basicDetailsObject.footballAcademyDetails.destination !== undefined && basicDetailsObject.footballAcademyDetails.destination !== null && basicDetailsObject.footballAcademyDetails.destination !== '') {
            content = content.toString().replace("{{footballAcademyDetails.destination}}", basicDetailsObject.footballAcademyDetails.destination.toString());
        }
        else {
            content = returnDashString("footballAcademyDetails.destination");
        }
        if (basicDetailsObject.footballAcademyDetails.purposeOfTrip !== undefined && basicDetailsObject.footballAcademyDetails.purposeOfTrip !== null && basicDetailsObject.footballAcademyDetails.purposeOfTrip !== '') {
            content = content.toString().replace("{{footballAcademyDetails.purposeOfTrip}}", basicDetailsObject.footballAcademyDetails.purposeOfTrip.toString());
        }
        else {
            content = returnDashString("footballAcademyDetails.purposeOfTrip");
        }
    }

// transporter.sendMail({
//   from:  emailConfiguration.smtp.user,
//   to: 'destination@gmail.com',
//   subject: 'My Amazon SES Email with Attachment',
//   text: 'Amazon SES Attachment is cool',
//   attachments: [
//     {
//       filename: 'My Cool Document',
//       path: 'https://path/to/cool-document.docx',
//       contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
//     }
//   ]
// });


    
   transporter.sendMail({
        from: emailConfiguration.email.fromEmail,
        to: basicDetailsObject.email,
        subject: emailConfiguration.email.subject,
        cc: basicDetailsObject.contactPerson1.email,
        bcc: emailConfiguration.email.bcc,
        html: content
    }, function(err, message) {
        console.log(err || message);
    });
    return true;
}
