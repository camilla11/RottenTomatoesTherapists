'use strict';

var listOfTherapists = [
"Jeffrey Tambor",
"Casey Affleck",
"Weinstein",
"Kevin Spacey",
"Russell Simmons",
"Dustin Hoffman",
"James Toback",
"Matt Lauer",
"Charlie Rose",
"Brett Ratner",
"Tom Sizemore",
"Steven Seagal",
"Louis C.K.",
"Danny Masterson",
"T.J. Miller",
"Jeremy Piven",
"Ed Westwick",
"Paul Haggis",
"Mark Schwahn",
"Gary Goddard",
"Robert Knepper"];

var pageContent;
var alreadyScanned = false;

scanButton.onclick = function(element) {
	  
	 function modifyDOM() {
        //You can play with your DOM here or check URL against your regex
        console.log('Tab script:');
        console.log(document.body);
        return document.body.innerHTML;
    }
	
	if (!alreadyScanned){
	
		//We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
		chrome.tabs.executeScript({
			code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
		}, (results) => {
			//Here we have just the innerHTML and not DOM structure
			console.log('Popup script:')
			console.log(results[0]);
			pageContent = results[0];
			// Search through page and add list of problematic people	  
			scanForTherapists();
		});   
	alreadyScanned = true;
	}
};
 
function scanForTherapists() {
	listOfTherapists.forEach(function(therapist) {
		var found = pageContent.search(therapist);
        if (found >= 0) {
            addTherapist(therapist);
        }
    });  
}

function openNewTab() {
    chrome.tabs.create({url: this.href});
    return false;
}
  
function addTherapist (therapist) { 
    // create a new div element 
	var link = "https://www.google.ca/search?q=sexual+assault+allegations+against+" +therapist.replace(" ","+");
    var newDiv = document.createElement("a"); 
	newDiv.setAttribute('href', link);
    newDiv.innerHTML =  therapist;
	newDiv.onclick = openNewTab;

    document.getElementById("listOfPeopleDiv").appendChild(newDiv);
}

