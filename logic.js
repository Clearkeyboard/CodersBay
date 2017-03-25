// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCdNnNwQcrneDMKJEtqJ9thR8T53QDdm-E",
    authDomain: "codersbay-bbd0d.firebaseapp.com",
    databaseURL: "https://codersbay-bbd0d.firebaseio.com",
    storageBucket: "codersbay-bbd0d.appspot.com",
    messagingSenderId: "384543610330"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Initial Values
var initialBid = 0;
var initialBidder = "No one :-(";
var highPrice = initialBid;
var highBidder = initialBidder;

// --------------------------------------------------------------

// At the initial load, get a snapshot of the current data.
database.ref().on("value", function(snapshot) {

  // If Firebase has a highPrice and highBidder stored (first case)
  if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {

    // Set the initial variables for highBidder equal to the stored values.
    highBidder = snapshot.val().highBidder;
    highPrice = snapshot.val().highPrice;

    // Change the HTML to reflect the initial value
    $('#highest-bidder').html(highBidder);
    $('#highest-price').html("$" + highPrice);

    // Print the initial data to the console.
    console.log(highBidder);
    console.log(highPrice);

  }

  // Keep the initial variables for highBidder equal to the initial values
  else { 
    highBidder = initialBidder;
    highPrice = initialBid;

    // Change the HTML to reflect the initial value
    $('#highest-bidder').html(highBidder);
    $('#highest-price').html(highPrice);

    // Print the initial data to the console.
    console.log(highBidder);
    console.log(highPrice);

  }


// If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// --------------------------------------------------------------

// Whenever a user clicks the submit-bid button
$("#submit-bid").on("click", function(event) {
  // Prevent form from submitting
  event.preventDefault();

  // Get the input values
  var bidderPrice = $('#bidder-price').val();
  var Bidder = $('#bidder-name').val();
  // Log the Bidder and Price (Even if not the highest)
      console.log(bidderPrice);
      console.log(name);
  if (bidderPrice > highPrice) {

    // Alert
    alert("You are now the highest bidder.");

    // Save the new price in Firebase
        database.ref().set({
    highBidder: Bidder,
    highPrice: bidderPrice
});

    // Log the new High Price
    console.log(highPrice);

    // Store the new high price and bidder name as a local variable (could have also used the Firebase variable)
newPrice = highPrice;
newName = Bidder;

    // Change the HTML to reflect the new high price and bidder
$('#highest-bidder').html(newName);
$('#highest-price').html(newPrice);
  }

  else {
    // Alert
    alert("Sorry that bid is too low. Try again.");
  }

});
