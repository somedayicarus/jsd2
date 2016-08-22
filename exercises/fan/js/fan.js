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
messageBoard.addEventListener("click", deletePost);



// Event Handlers
// ------------------------------------------------
function addMessage(event) {
    event.preventDefault();
	console.log(event);

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
    console.log(event.target);
	var listID = event.target.closest("li").dataset.id;
	app.messages.forEach(function(item) {
		//delete matched message
		if(item.id === listID)	{
			var index = app.messages.indexOf(item);
			app.messages.splice(index, 1);
		}
	});

	saveApp();
}

// Update page functions
// ------------------------------------------------
function createPost(app) {
    var template = Handlebars.compile(messageTemplate.innerHTML);
    messageBoard.innerHTML = template(app.messages);
    
 
    // Step 1: create new html
    // ----------------------------------------------------------------
    /*var li         = document.createElement("li"),
        trash      = document.createElement("i"),
        thumbsUp   = document.createElement("i"),
        thumbsDown = document.createElement("i");
        voteCount  = document.createElement("div");

    // Step 2: add event listeners, attributes, and content to new html
    // ----------------------------------------------------------------
    li.textContent = message.content;
    li.dataset.id = message.id;
    trash.classList.add("fa", "fa-trash", "pull-right", "delete");
    thumbsUp.classList.add("fa", "fa-thumbs-up", "pull-right");
    thumbsDown.classList.add("fa", "fa-thumbs-down", "pull-right");
    voteCount.classList.add("pull-right");
    voteCount.textContent = message.voteCount;

    // Step 3: add new html to DOM
    // ----------------------------------------------------------------
    li.appendChild(trash);
    li.appendChild(thumbsUp);
    li.appendChild(thumbsDown);
    li.appendChild(voteCount);
    messageBoard.appendChild(li);*/
};


// Firebase Functions
// ------------------------------------------------
function dataChanged(snapshot) {

    if (snapshot.val() === null) {
        return;
    }

    app = snapshot.val();

    messageBoard.innerHTML = "";
   createPost(app);
   
};

function getApp() {
    firebaseRef.on("value", dataChanged);
};

function saveApp() {
    firebaseRef.set(app); 
};


//helper functions
function uniqueID() {
  return Math.random().toString(36).substr(2, 16);
};


