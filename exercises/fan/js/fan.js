// Structure
// ------------------------------------------------
var form = document.querySelector("#message-form"); 
var post = document.querySelector("#message");
var messageBoard = document.querySelector(".message-board");


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

    createPost(message);

    app.messages.push(message);
    saveApp();

    post.value = "";

};


function upVote(event) {
	console.log(event.target)
	var listID = event.target.closest("li").dataset.id;

	//console.log(listID);


	app.messages.forEach(function(item) {
		if(item.id === listID)	{
			item.voteCount += 1;
		}
	})
    saveApp();
};


// Update page functions
// ------------------------------------------------
function createPost(message) {    
    // Step 1: create new html
    // ----------------------------------------------------------------
    var li         = document.createElement("li"),
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

    li.addEventListener("click", upVote);
    //trash.addEventListener("click", deletePost)


    // Step 3: add new html to DOM
    // ----------------------------------------------------------------
    li.appendChild(trash);
    li.appendChild(thumbsUp);
    li.appendChild(thumbsDown);
    li.appendChild(voteCount);
    messageBoard.appendChild(li);

    // Optionally, add a due date if one was set
    //if (item.date !== undefined && item.date.length > 0) {
    //    var time = document.createElement("time");
    //    time.textContent = "(" + item.date + ")";
    //    li.appendChild(time);
    //}

    //list.appendChild(li);
};


// Firebase Functions
// ------------------------------------------------
function dataChanged(snapshot) {

    if (snapshot.val() === null) {
        return;
    }

    app = snapshot.val();

    messageBoard.innerHTML = "";
    app.messages.forEach(createPost);
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


