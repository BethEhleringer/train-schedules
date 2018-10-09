// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve trains from the train database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBpdh09KvoZi8e_XZ_ltJwABAWXggTGUHc",
    authDomain: "mythirdprojectehe.firebaseapp.com",
    databaseURL: "https://mythirdprojectehe.firebaseio.com",
    projectId: "mythirdprojectehe",
    storageBucket: "mythirdprojectehe.appspot.com",
    messagingSenderId: "620553267630"
  };
  firebase.initializeApp(config);



var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var firstTime = moment($("#start-input").val().trim(), "HH:MM").format("X");
  var tFrequency = $("#frequency-input").val().trim();

  // Creates local "ttrainorary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: firstTime,
    frequency: tFrequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  alert("train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var firstTime = childSnapshot.val().start;
  var tFrequency = childSnapshot.val().frequency;

  // train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(firstTime);
  console.log(tFrequency);

  // First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


  // Prettify the train start
  //var firstTimePretty = moment.unix(firstTime).format("MM/DD/YYYY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  //var trainMonths = moment().diff(moment(firstTime, "X"), "months");
  //console.log(trainMonths);

  // Calculate the total billed rate
  //var trainBilled = trainMonths * tFrequency;
  //console.log(trainBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(tFrequency),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain),
  
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

// Assumptions
//var tFrequency = 3;

// Time is 3:30 AM
//ar firstTime = "03:30";

