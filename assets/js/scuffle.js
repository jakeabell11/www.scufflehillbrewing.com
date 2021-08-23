$( document ).ready(function() {
    makeAllPageInfo();
    makeBrewList();
});

function makeBrew(jsonObject)
{
    var html = "";

    html += "<h2>" + jsonObject.name + "</h2>";
    if(jsonObject.style != "");
       html += "<h3>" + jsonObject.style + "</h3>";

    html += "<p>";

    if(jsonObject.abv != "")
       html += "<b>ABV " + jsonObject.abv + "%</b>";

    if(jsonObject.abv != "" && jsonObject.ibu != "")
        html += "<b> - </b>"; 

    if(jsonObject.ibu != "")
        html += "<b>IBU " + jsonObject.ibu + "</b>";

    html += "<br />"
    html += jsonObject.description 

    if(jsonObject.available == "yes" && Object.keys(jsonObject.tap_room).length > 0)
    {
        html += "<br />"
        html += "<b>"
        for(var i = 0; i < Object.keys(jsonObject.tap_room).length; i++){
            html += Object.keys(jsonObject.tap_room)[i] + " - " + Object.values(jsonObject.tap_room)[i] + "<br />";
        }
        html += "</b>";
    }
    
    html += "</p>";

    return html;
}

function makeBrewList()
{
    $.ajax({
        url: 'assets/data/beerlist.json?' + Math.random(),
        dataType: 'json',
        type: 'get',
        success: function (data) {
            var availableNowHTML = "";
            var comingSoonHTML = ""

            for(var i = 0; i < data.beer.length; i++)
            {
                if(data.beer[i].available == "yes")
                {
                  availableNowHTML += makeBrew(data.beer[i]);
                  availableNowHTML += "<hr></hr>";
                }
                else if(data.beer[i].comingSoon == "yes")
                {
                    comingSoonHTML += makeBrew(data.beer[i]);
                    comingSoonHTML += "<hr></hr>";
                }
            }

            var html = "";
            if(availableNowHTML != "")
            { 
                html += "<h1>Available Now</h1>";
                html += "<hr></hr>";
                html += availableNowHTML;
                html += "<br /><br /><br />";
            }

            if(comingSoonHTML != ""){
                html += "<h1>Coming Soon</h1>";
                html += "<hr></hr>";
                html += comingSoonHTML;
            }

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