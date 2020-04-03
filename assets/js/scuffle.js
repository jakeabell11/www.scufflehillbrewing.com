$( document ).ready(function() {
    makeBrewList();
});

function makeBrew(jsonObject)
{
	var html = "";
	html += "<h2>" + jsonObject.name + "</h2>";
	html += "<h3>" + jsonObject.style + "</h3>";
	html += "<p>"
	html += "ABV " + jsonObject.abv + "% - IBU " + jsonObject.ibu;
	html += "<br />"
	html += jsonObject.description + "</p>";

	return html;
}

function makeBrewList()
{
	$.ajax({
        url: 'assets/data/beerlist.json',
        dataType: 'json',
        type: 'get',
        success: function (data) {
        	var availableNowHTML = "";
        	var comingSoonHTML = ""

        	for(var i = 0; i < data.beer.length; i++)
        	{
        		availableNowHTML += makeBrew(data.beer[i]);
        		availableNowHTML += "<hr></hr>";
        	}
        	var html = "<h1>Available Now</h1>";
        	html += "<hr></hr>";
        	html += availableNowHTML;
        	html += "<br />";
        	html += "<h1>Coming Soon</h1>";
        	html += "<hr></hr>";
        	html += comingSoonHTML;

        	$("#brews").append(html);
        }
    });
}