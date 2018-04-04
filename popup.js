'use strict';

var listOfTherapists = ["Jeffrey Tambor", "Casey Affleck"];

var pageContent;


changeColor.onclick = function(element) {
	  
	 function modifyDOM() {
        //You can play with your DOM here or check URL against your regex
        console.log('Tab script:');
        console.log(document.body);
        return document.body.innerHTML;
    }

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
};
 
function scanForTherapists() {
	listOfTherapists.forEach(function(therapist) {
		var found = pageContent.search(therapist);
        if (found >= 0) {
            addTherapist(therapist);
        }
    });  
}
  
function addTherapist (therapist) { 
    // create a new div element 
    var newDiv = document.createElement("div"); 
    var newContent = document.createTextNode(therapist); 
    newDiv.appendChild(newContent);  

    document.getElementById("listOfPeopleDiv").appendChild(newDiv);
}
