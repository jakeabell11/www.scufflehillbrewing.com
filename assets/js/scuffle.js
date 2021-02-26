$( document ).ready(function() {
    makeAllPageInfo();
    makeBrewList();
    getMerch();
});

var merchData;
var merchSelectedOptions = [];
var merchSelects = [];

var selectedProductName = "";
var orignalPrice;
var shippingPrice = 0;
var taxPrice;
var total;

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

function makeMerchPreview(id, name, photos, price)
{
    var html = "";
    html += "<a href='#productPage' onclick='makeProductPage(" + id + ")'>";
    html += "<div class='card'>";
    html += "<img src='" + photos[0] + "' alt='Avatar' style='width:100%''>";
    html += "<div class='cardContainer'>";
    html += "<h4><b>" + name + "</b></h4>";
    html += "<p>" + price + "</p>";
    html += "</div>";
    html += "</div>";
    html += "</a>";

    if(id % 2 != 0)
        html += "<br />";

    $("#store_description").append(html);
}

function getMerch()
{
    $.ajax({
        url: 'https://spreadsheets.google.com/feeds/list/1JKu3JK8l5kBBoSfHi-PvPorqSCYAXZnzkI3FyQ65sOg/1/public/values?alt=json&asdfgh=' + Math.random(),
        dataType: 'json',
        type: 'get',
        success: function (data) {
            merchData = data;

            for(var i = 0; i < merchData.feed.entry.length; i++)
            {
                var id = i;
                var name = data.feed.entry[i].gsx$name.$t;
                var description = data.feed.entry[i].gsx$description.$t;
                var price = data.feed.entry[i].gsx$price.$t;
                var shipping = data.feed.entry[i].gsx$shipping.$t;
                var photos = data.feed.entry[i].gsx$photos.$t.split("|");

                makeMerchPreview(id, name, photos, price);
            }
        }
    });
}

function makeProductPage(id)
{
    var name = merchData.feed.entry[id].gsx$name.$t;
    var description = merchData.feed.entry[id].gsx$description.$t;
    var price = merchData.feed.entry[id].gsx$price.$t;
    var shipping = merchData.feed.entry[id].gsx$shipping.$t;
    var photos = merchData.feed.entry[id].gsx$photos.$t.split("|");
    var optionTitles = merchData.feed.entry[id].gsx$optiontitles.$t.split("|");
    var options1 = merchData.feed.entry[id].gsx$options1.$t.split("|");
    var options2 = merchData.feed.entry[id].gsx$options2.$t.split("|");
    var options3 = merchData.feed.entry[id].gsx$options3.$t.split("|");
    var options4 = merchData.feed.entry[id].gsx$options4.$t.split("|");
    var options5 = merchData.feed.entry[id].gsx$options5.$t.split("|");
    var options6 = merchData.feed.entry[id].gsx$options6.$t.split("|");
    var options7 = merchData.feed.entry[id].gsx$options7.$t.split("|");
    var options8 = merchData.feed.entry[id].gsx$options8.$t.split("|");
    var options9 = merchData.feed.entry[id].gsx$options9.$t.split("|");
    var options10 = merchData.feed.entry[id].gsx$options10.$t.split("|");

    var optionsList = [options1, options2, options3, options4, options5, options6, options7, options8, options9, options10];

    $("#activeProduct").text(name);
    selectedProductName = name;

    var html = "";


    //html += "<img src='" + photos[0] + "' alt='Avatar' style='width:100%''>";

    html += slideshowHTML(photos);

    html += "<br />";
    html += "<p>" + description + "</p>";

    for(var i = 0; i < optionsList.length; i++)
    {
        if(optionsList[i].length > 1)
            html += makeProductOptionHTML("select" + i, optionTitles[i], optionsList[i], shipping);
    }

    html += "<p>Note, if you choose local pickup; you may pickup your product in Collinsville, VA</p>";

    orignalPrice = price;
    taxPrice = getTaxPrice(orignalPrice);
    total = parseFloat(orignalPrice) + parseFloat(taxPrice) + parseFloat(shippingPrice);

    html += "<div> <p style='float: left; padding-right: 10px;'>Price: </p> <p style='inline' id='price'> " + price + "</p></div>";
    html += "<div> <p style='float: left; padding-right: 10px;'>Tax: </p> <p id='taxPrice'> " + taxPrice + "</p></div>";
    html += "<div> <p style='float: left; padding-right: 10px;'>Shipping: </p> <p id='shippingPrice'>" + shippingPrice + "</p></div>";
    html += "<div> <p style='float: left; padding-right: 10px;'>Total: </p> <p id='productTotal'>" + total + "</p></div>";

    $("#activeProductDescription").html(html);

    plusSlides(0);

    makePaypalButton(total);
}

function slideshowHTML(images)
{
    var html = "";

    html += '<!-- Slideshow container -->';
    html += '<div class="slideshow-container">';

    html += '<!-- Full-width images with number and caption text -->';

    for (var i = 0; i < images.length; i++)
    {
        html += '<div class="mySlides fade">';
        html += '<div class="numbertext">' + parseFloat(i+1) + '/' + images.length + '</div>';
        html += '<img src="' + images[i] + '" style="width:100%">';
        html += '</div>';
    }

    html += '<!-- Next and previous buttons -->';
    html += '<a class="prev" onclick="plusSlides(-1)">&#10094;</a>';
    html += '<a class="next" onclick="plusSlides(1)">&#10095;</a>';
    html += '</div>';
    html += '<br>';

    html += '<!-- The dots/circles -->';
    html += '<div style="text-align:center">';
    for (var i = 0; i < images.length; i++)
    {
        html += '<span class="dot" onclick="currentSlide(' + parseFloat(i+1) + ')"></span>';
    }
    html += '</div> ';

    return html;
}

function showPurchaseButton()
{
    var everythingSelected = true;

    if(merchSelectedOptions.length == 0)
    {
        everythingSelected = false;
    }
    else
    {
        for(var i = 0; i < merchSelectedOptions.length; i++)
        {
            if(merchSelectedOptions[i]== "--Select--")
                everythingSelected = false;
        }
    }

    if(everythingSelected){
        $('#paypal-button-container').show();
    }
    else{
        $('#paypal-button-container').hide();
    }
}

function makePaypalButton(price)
{
    removeElement('paypal-button-container');
    $('#activeProductDescription').append("<div id='paypal-button-container' style='display: none;'></div>")
    showPurchaseButton();

     paypal.Buttons({
          style: {
              shape: 'rect',
              color: 'gold',
              layout: 'vertical',
              label: 'buynow',
              
          },
          createOrder: function(data, actions) {
              return actions.order.create({
                  purchase_units: [{
                      description: selectedProductName + " - " + getOrderDetails(),
                      amount: {
                          value: price
                      }
                  }]
              });
          },
          onApprove: function(data, actions) {
              return actions.order.capture().then(function(details) {
                  $("#thanksHeader").html("Thanks for your order! ");

                  var thanksBodyHTML = "";
                  thanksBodyHTML += "Thanks for your order " + details.payer.name.given_name + "!";
                  thanksBodyHTML += "<br />";
                  thanksBodyHTML += "Your order number is <b>" + details.purchase_units[0].payments.captures[0].id + "</b>";
                  thanksBodyHTML += "<br />";
                  thanksBodyHTML += "We will be in touch when your product ships or is ready to pick up. Our products are made-to-ship so please give us a few weeks. If you have any questions, please send an email to contact@scufflehillbrewing.com or send us a message on Facebook!";

                  $("#thanksBody").html(thanksBodyHTML);

                  location.hash = ("#thanks");

                  resetProducts();
              });
          }
      }).render('#paypal-button-container');
}

function getOrderDetails()
{
    var details = "";

    for(var i = 0; i < merchSelectedOptions.length; i++)
    {
        details += merchSelectedOptions[i]
        if(i != merchSelectedOptions.length-1)
            details += ", "
    }

    return details;
}

function makeProductOptionHTML(selectID, optionTitle, options, shipping)
{
    var html = "";
    var optionsHTML = "";
    var onclick = "showPurchaseButton()";
    html += optionTitle + ":";
    html += "<select id='" + selectID + "' onchange='updateSelectedOptions(); showPurchaseButton(); adjustShipping()'>";
    html += "<option selected='true' disabled='disabled' value='--Select--'>--Select--</option>";
    for(var i = 0; i < options.length; i++)
    {
        if(optionTitle == "Shipping")
        {
            if(options[i] == "Shipped")
                onclick = "adjustShipping(" + shipping + ")";
            else
                onclick = "adjustShipping(" + 0 + ")";
        }

        optionsHTML += "<option onclick='" + onclick + "' value='" + options[i] + "'>" + options[i] + "</option>";
    }


    html += optionsHTML;
    html += "</select>";

    merchSelects.push(selectID);

    return html;
}

function adjustShipping()
{
    if(document.getElementById("select3").value == "Shipped")
        shippingPrice = 8;
    else
        shippingPrice = 0
    adjustPrice();
}

function adjustPrice()
{
    var productTotal = parseFloat(parseFloat(getTaxPrice(orignalPrice)) + parseFloat(orignalPrice) + parseFloat(shippingPrice));
    productTotal = productTotal.toFixed(2);

    $("#price").html(orignalPrice);
    $("#taxPrice").html(taxPrice);
    $("#shippingPrice").html(shippingPrice);
    $("#productTotal").html(productTotal);
    makePaypalButton(productTotal);
}

function getTaxPrice(price)
{
    taxPrice = (price * .063);
    return taxPrice.toFixed(2);
}

function resetProducts()
{
    merchSelectedOptions = [];
    merchSelects = [];
    selectedProductName = "";
    orignalPrice = null;
    shippingPrice = 0;
    taxPrice = null;
    total = null;

    $("#activeProductDescription").html("");
}

function updateSelectedOptions()
{
    merchSelectedOptions = [];

    for(var i = 0; i < merchSelects.length; i++)
    {
        merchSelectedOptions.push(document.getElementById(merchSelects[i]).value);
    }
}

function removeElement(elementId) {
    var element = document.getElementById(elementId);

    if(element != null)
        element.parentNode.removeChild(element);
}

function makeBrewList()
{
	$.ajax({
        url: 'https://spreadsheets.google.com/feeds/list/1UNMbaiEQi6Im6rcd8ATxnZb3_tm_hq_Vxp-bL6SDGXg/2/public/values?alt=json&asdfgh=' + Math.random(),
        dataType: 'json',
        type: 'get',
        success: function (data) {
        	var availableNowHTML = "";
        	var comingSoonHTML = ""

        	for(var i = 0; i < data.feed.entry.length; i++)
        	{
                if(data.feed.entry[i].gsx$available.$t == "true")
                {
        		    availableNowHTML += makeBrew(data.feed.entry[i]);
        		    availableNowHTML += "<hr></hr>";
                }
                
                if (data.feed.entry[i].gsx$comingsoon.$t == "true")
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


/***** Slideshow *****/
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
} 
