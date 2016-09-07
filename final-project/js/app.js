//setup 
var url = "http://api.shopstyle.com/api/v2/products?pid=uid3904-35452852-63&cat=dresses";
var resultsTemplate = document.querySelector("#results-template");

//structure
var results = document.querySelector("#results");

//event listeners



//event handlers



//compile handlebars template with array
function getResults(json) {
	var template = Handlebars.compile(resultsTemplate.innerHTML);
	results.innerHTML = template(json);
}


//handlebars helpers

Handlebars.registerHelper('grouped_each', function(every, context, options) {
    var out = "", subcontext = [], i;
    if (context && context.length > 0) {
        for (i = 0; i < context.length; i++) {
            if (i > 0 && i % every === 0) {
                out += options.fn(subcontext);
                subcontext = [];
            }
            subcontext.push(context[i]);
        }
        out += options.fn(subcontext);
    }
    return out;
});

getResults(mockdata);