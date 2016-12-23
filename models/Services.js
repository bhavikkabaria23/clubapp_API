var mongoose = require('mongoose');

var ServiceSchema = new mongoose.Schema({
    name: String,
    description: String,
    image:String,
    isActive: { type: Boolean, default: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner' }
});
var Service = mongoose.model('Service', ServiceSchema);
// Mock Data for Service
// var services = [];
// services.push(
//     new Service({
//     name: "Facebook",
//     description: "Facebook description",
//     image: ""
// }));     
// services.push( 
//     new Service({
//     name: "Twitter",
//     description: "Twitter description",
//     image: ""
// }));     
// services.push(
//     new Service({
//     name: "Cloud Service",
//     description: "Cloud Service description",
//     image: ""
// }));     
// services.push(
//     new Service({
//     name: "Chat application",
//     description: "Chat application description",
//     image: ""
// }));     
// services.push(
//     new Service({
//     name: "ClubMate",
//     description: "ClubMate description",
//     image: ""
// }));     

// services.forEach(function (item) {
//     item.save(function (err) {        
//     });
// });

