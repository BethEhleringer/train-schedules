

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

  //Button for adding trains
  $("#add-train-btn").on("click", function(event) {
      event.preventDefault();

      //Grabs user input
      var trainName = $("#train-name-input").val();
      var trainDestination = $("#destination-input").val().trim();
      var firstTrainTime = $("#first-train-time-input").val().trim();
      var trainFrequency = $("#frequency-input").val().trim();

      //Create local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        firstTime: firstTrainTime,
        frequency: trainFrequency
    };

    // Upload train data to the database
    database.ref().push(newTrain);

    // Log everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTime);
    console.log(newTrain.frequency);

    alert("Train successfully added");

    //Clears all of the text boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");
});

// Create firebase event for adding train to the database and a row in the html when a user adds an entry
      database.ref().on("child_added", function(childSnapshot) {
          console.log(childSnapshot.val());

          //Store everything into a variable
          var trainName = childSnapshot.val().name;
          var trainDestination = childSnapshot.val().destination;
          var firstTrainTime = childSnapshot.val().firstTime;
          var trainFrequency = childSnapshot.val().frequency;

          //Train Info
          console.log(trainName);
          console.log(trainDestination);
          console.log(firstTrainTime);
          console.log(trainFrequency);

          //Prettify first train time
        //  var firstTimePretty = moment(firstTrainTime).format("LT");
        //  console.log(firstTimePretty);
          

          //Calculate the minutes left until the next train comes
          //do this later
          

          //Create the new row
          var newRow = $("<tr>").append(
              $("<td>").text(trainName),
              $("<td>").text(trainDestination),
              $("<td>").text(firstTrainTime),
              $("<td>").text(trainFrequency)
          );

          //Append the new row to the table
          $("#train-table > tbody").append(newRow);

      });


    
  