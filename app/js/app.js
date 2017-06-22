
$('.modal').modal({
      dismissible: true,
      opacity: .8,
      inDuration: 400,
      outDuration: 200, 
      startingTop: '4%',
      endingTop: '10%'
    }
  );

document.getElementById('to-top').onclick = function () {
    scrollTo(document.body, 0, 100);
}

    function scrollTo(element, to, duration) {
        if (duration < 0) return;
        var difference = to - element.scrollTop;
        var perTick = difference / duration * 2;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        scrollTo(element, to, duration - 2);
    }, 10);
}

function _cb_findItemsByKeywords(root) {
  var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
  var html = [];
  html.push('<div class="col s12">');
  for (var i = 0; i < items.length; ++i) {
    var item     = items[i];
    var title    = item.title;
    var pic      = item.galleryPlusPictureURL;
    var viewitem = item.viewItemURL;
	var local = item.location;
	var postcode = item.postalCode;
    if (null != title && null != viewitem) {
      html.push('<div class="col s12 m6 l4"><div class="card"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + pic + '"></div><div class="card-content"><span class="card-title activator e-blue truncate">' + title + '<i class="material-icons right">more_vert</i></span><p class="">Global ID: <span class="e-red">' + item.globalId + '</span></p><p class="">Price: <span class="e-red">' + item.sellingStatus[0].currentPrice[0].__value__ + 'AUD</span></p><p class="">Location: <span class="e-red">' + local + '</span></p><p class="">Shipping: <span class="e-red">' + item.shippingInfo[0].shippingType + '</span></p></div><div class="card-action"><a href="' + viewitem + '" target="_blank">View item</a></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">Item Info<i class="material-icons right">close</i></span><p>Title: <span class="e-blue">' + title + '</span></p><p>ID: <span class="e-blue">' + item.itemId + '</span></p><p>Category: <span class="e-blue">' + item.primaryCategory[0].categoryName + '</span></p><p>location: <span class="e-blue">' + local + '</span></p><p>country: <span class="e-blue">' + item.country + '</span></p><p>postcode: <span class="e-blue">' + postcode + '</span></p><p>condition: <span class="e-blue">' + item.condition[0].conditionDisplayName + '</span></p><p>Selling Status: <span class="e-blue">' + item.sellingStatus[0].currentPrice[0].__value__ + '</span></p><p>shipping cost: <span class="e-blue">' + item.shippingInfo[0].shippingServiceCost[0].__value__ + '</span></p><p>Shipping Type: <span class="e-blue">' + item.shippingInfo[0].shippingType + '</span></p><p>shipping To: <span class="e-blue">' + item.shippingInfo[0].shipToLocations + '</span></p></div></div></div>');
    }
  }
  html.push('</div>');
  document.getElementById("results").innerHTML = html.join("");
}

var filterarray = [{
    "name": "MaxPrice",
    "value": "1000",
    "paramName": "Currency",
    "paramValue": "AUD"
}, {
    "name": "FreeShippingOnly",
    "value": "true",
    "paramName": "",
    "paramValue": ""
}, {
    "name": "ListingType",
    "value": "FixedPrice",
    "paramName": "",
    "paramValue": ""
}, ];


var urlfilter = "";

function  buildURLArray() {
  for(var i=0; i<filterarray.length; i++) {
    var itemfilter = filterarray[i];
    for(var index in itemfilter) {
      if (itemfilter[index] !== "") {
        if (itemfilter[index] instanceof Array) {
          for(var r=0; r<itemfilter[index].length; r++) {
          var value = itemfilter[index][r];
          urlfilter += "&itemFilter\(" + i + "\)." + index + "\(" + r + "\)=" + value ;
          }
        } 
        else {
          urlfilter += "&itemFilter\(" + i + "\)." + index + "=" + itemfilter[index];
        }
      }
    }
  }
}
buildURLArray(filterarray);


(function() {
	$(document).ready(function() {
		$('#driver').click(function(event, val) {
		
			var operation = "findItemsByKeywords",
			apikey = "beneaves-devApp-PRD-78df3d054-db1dc4cd",
			locale = "EBAY-AU",
			kw = $('#jsonSearch').val(),
			entries = 50;

			var url = "//svcs.ebay.com/services/search/FindingService/v3?OPERATION-NAME=" + operation + "&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=" + apikey + "&GLOBAL-ID=" + locale + "&RESPONSE-DATA-FORMAT=JSON&callback=_cb_" + operation + "&REST-PAYLOAD&keywords=" + kw + urlfilter + "&paginationInput.entriesPerPage=" + entries + "&paginationInput.pageNumber=2";

			$.getScript(url);

		});
	});
}).call(this);