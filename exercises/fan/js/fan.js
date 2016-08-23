// Structure
// ------------------------------------------------
var form = document.querySelector("#message-form"); 
var post = document.querySelector("#message");
var messageBoard = document.querySelector(".message-board");
var messageTemplate = document.querySelector("#messages-template");

// Setup
// ------------------------------------------------
var app = {
	"messages": []
};

//Firebase Ref
var firebaseRef = new Firebase("https://message-board-83c31.firebaseio.com/");

// Events
// ------------------------------------------------
window.addEventListener("load", getApp);
form.addEventListener("submit", addMessage);
messageBoard.addEventListener("click", upVote);
messageBoard.addEventListener("click", downVote);
messageBoard.addEventListener("click", deletePost);


// Event Handlers
// ------------------------------------------------
function addMessage(event) {
    event.preventDefault();

    // create JSON for new item
    var message = {
    	id: uniqueID(),
    	content: post.value,
    	voteCount: 0
    };

    app.messages.push(message);
    createPost(app);
    saveApp();

    post.value = "";
};


function upVote(event) {
	event.preventDefault();

	//disregard clicks on anything but thumbs up icon
	if(event.target.className != "fa fa-thumbs-up pull-right") {
		return
	}

	//check clicked list id against message id
	var listID = event.target.closest("li").dataset.id;

	app.messages.forEach(function(item) {
		//update votecount for matched message
		if(item.id === listID)	{
			item.voteCount += 1;
		}
	});

	//run to update votecount in firebase
    saveApp();
};

function deletePost(event) {
	event.preventDefault();
	//disregard events on anything but trash icon
	if(event.target.className != "fa fa-trash pull-right delete") {
		return
	}

	var listID = event.target.closest("li").dataset.id;
	app.messages.forEach(function(item, index) {
		//delete matched message
		if(item.id === listID)	{
			app.messages.splice(index, 1);
		}
	});

	saveApp();
	createPost(app);
};


function downVote(event) {
	event.preventDefault();

	var listID = event.target.closest("li").dataset.id;
	if(event.target.className != "fa fa-thumbs-up pull-right") {
		app.messages.forEach(function(item) {
		//update votecount for matched message
			if(item.id === listID && item.voteCount != 0)	{
				item.voteCount -= 1;
			}
		});
	}

	saveApp();
};

// Update page functions
// ------------------------------------------------
function createPost(app) {
    var template = Handlebars.compile(messageTemplate.innerHTML);
    messageBoard.innerHTML = template(app.messages);
};


// Firebase Functions
// ------------------------------------------------
function saveApp() {
    firebaseRef.set(app); 
};

function dataChanged(snapshot) {

    if (snapshot.val() === null) {
        return;
    }
    messageBoard.innerHTML = "";
    app = snapshot.val();
    createPost(app);
};

function getApp() {
    firebaseRef.on("value", dataChanged);
};


//helper functions
function uniqueID() {
  return Math.random().toString(36).substr(2, 16);
};


