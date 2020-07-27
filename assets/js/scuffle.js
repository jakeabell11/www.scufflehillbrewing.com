$( document ).ready(function() {
    makeAllPageInfo();
    makeBrewList();
});

function makeBrew(jsonObject)
{
	var html = "";

	html += "<h2>" + jsonObject.gsx$name.$t + "</h2>";
    if(jsonObject.gsx$style.$t != "");
	   html += "<h3>" + jsonObject.gsx$style.$t + "</h3>";

	html += "<p>";

    if(jsonObject.gsx$abv.$t != "")
	   html += "ABV " + jsonObject.gsx$abv.$t + "%";

    if(jsonObject.gsx$abv.$t != "" && jsonObject.gsx$ibu.$t != "")
        html += " - "; 

    if(jsonObject.gsx$ibu.$t != "")
        html += "IBU " + jsonObject.gsx$ibu.$t;
    
	html += "<br />"
	html += jsonObject.gsx$description.$t + "</p>";

	return html;
}

function makeBrewList()
{
	$.ajax({
        url: 'https://spreadsheets.google.com/feeds/list/1UNMbaiEQi6Im6rcd8ATxnZb3_tm_hq_Vxp-bL6SDGXg/od6/public/values?alt=json&asdfgh=' + Math.random(),
        dataType: 'json',
        type: 'get',
        success: function (data) {
        	var availableNowHTML = "";
        	var comingSoonHTML = ""

        	for(var i = 0; i < data.feed.entry.length; i++)
        	{
                if(data.feed.entry[i].gsx$oz.$t > 0 || data.feed.entry[i].gsx$oz_2.$t > 0 || data.feed.entry[i].gsx$oz_3.$t > 0 && data.feed.entry[i].gsx$comingsoon.$t == "no")
                {
        		    availableNowHTML += makeBrew(data.feed.entry[i]);
        		    availableNowHTML += "<hr></hr>";
                }
                else if (data.feed.entry[i].gsx$comingsoon.$t == "yes")
                {
                    comingSoonHTML += makeBrew(data.feed.entry[i]);
                    comingSoonHTML += "<hr></hr>";
                }
        	}
        	var html = "<h1>Available Now</h1>";
        	html += "<hr></hr>";
        	html += availableNowHTML;
        	html += "<br /><br /><br />";
        	html += "<h1>Coming Soon</h1>";
        	html += "<hr></hr>";
        	html += comingSoonHTML;

        	$("#brews").append(html);
        }
    });
}

function makeAllPageInfo()
{
    makeHomeTitle();
    makeHomeSubTitle();
    makeCopyright();
    makeBrewsDescription();
    makeSupportDescription();
    makeAboutDescription();
    makeContactDescription();
}

function makeHomeTitle()
{
    $.ajax({
        url: 'assets/data/home_title.txt?' + Math.random(),
        dataType: 'text',
        type: 'get',
        success: function (data) {
            $("#home_title").append(data);
        }
    });
}

function makeHomeSubTitle()
{
    $.ajax({
        url: 'assets/data/home_subtitle.txt?' + Math.random(),
        dataType: 'text',
        type: 'get',
        success: function (data) {
            $("#home_subtitle").append(data);
        }
    });
}

function makeCopyright()
{
    $.ajax({
        url: 'assets/data/copyright.txt?' + Math.random(),
        dataType: 'text',
        type: 'get',
        success: function (data) {
            $("#copyright").append(data);
        }
    });
}

function makeBrewsDescription()
{
    $.ajax({
        url: 'assets/data/brews_description.txt?' + Math.random(),
        dataType: 'text',
        type: 'get',
        success: function (data) {
            $("#brews_description").append(data);
        }
    });
}

function makeSupportDescription()
{
    $.ajax({
        url: 'assets/data/support_description.txt?' + Math.random(),
        dataType: 'text',
        type: 'get',
        success: function (data) {
            $("#support_description").append(data);
        }
    });
}

function makeAboutDescription()
{
    $.ajax({
        url: 'assets/data/about_description.txt?' + Math.random(),
        dataType: 'text',
        type: 'get',
        success: function (data) {
            $("#about_description").append(data);
        }
    });
}

function makeContactDescription()
{
    $.ajax({
        url: 'assets/data/contact_description.txt?' + Math.random(),
        dataType: 'text',
        type: 'get',
        success: function (data) {
            $("#contact_description").append(data);
        }
    });
}