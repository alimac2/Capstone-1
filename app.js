
/*GOOGLE MAPS FUNCTIONALITY*/
var GOOGLEMAPS_SEARCH_URL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAZCRrXZqy0vdPMrfNPZy8DBM4ywFFflwU&libraries=places";

function getDataFromGoogleApi(searchTerm, callback) {
  var request = {
    url: GOOGLEMAPS_SEARCH_URL,
    dataType: "jsonp",
    type: "GET", 
    success: callback
  };
  $.ajax(request);
}

var map;
var myLatLngn = {lat: 37.09024, lng: -95.712891}

function initMap() {
  map = new google.maps.Map(document.getElementById("map-display"), {
    center: myLatLngn,
    zoom: 5,
    mapTypeId: 'roadmap'
    });

  var input = document.getElementById("search-box");
  var searchBox = new google.maps.places.SearchBox(input);

  map.addListener("bounds_changed", function() {
          searchBox.setBounds(map.getBounds());
        });

  var markers = [];
  searchBox.addListener("places_changed", function() {
    var places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    };
  });
    
  /* Clears out old markers */  
  markers.forEach(function(marker) {
  marker.setMap(null);
  });
  markers = [];

  var bounds = new google.maps.LatLngBounds();
  places.forEach(function(place) {
    if (!place.geometry) {
      console.log("Returned place contains no geometry");
      return;
    }
    var icon = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

// Create a marker for each place.
    markers.push(new google.maps.Marker({
      map: map,
      icon: icon,
      title: place.name,
      position: place.geometry.location
    }));

    if (place.geometry.viewport) {
      // Only geocodes have viewport.
     bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
  });
    map.fitBounds(bounds);


var infowindow = new google.maps.InfoWindow();
// var marker = new google.maps.Marker({
//     // position: 
//     map: map,
//     // title: 
//   });
//   marker.addListener('click', function() {
//     infowindow.open(map, marker);
//   });
// }

function onSubmit() {
  $(".map-search-form").submit(event => {
    event.preventDefault();
    const mapInput = $(".map-input");
    const dataRequest = mapInput.val(); 
    //clear out input
    mapInput.val("");
    console.log(dataRequest);
    getDataFromGoogleApi(dataRequest, showGoogleApiData);
  });
}

function showGoogleApiData(data) {
  console.log(data);
  const googleResults = ;
  
  // console.log(etsyResults);
  return googleResults;
}


initMap();









/*ETSY FUNCTIONALITY*/
const ETSY_SEARCH_URL = "https://openapi.etsy.com/v2/listings/active.js";

function getDataFromEtsyApi(searchTerm, callback) {
    const request = {
      url: ETSY_SEARCH_URL, 
      data: {
        keywords: searchTerm,
        category: "Stationery",
        tags: "stationery",
        limit: 50,
        includes: "Images",
        api_key: "zoug3fzmdrpsjesf12llft3h"
      },
      dataType: "jsonp",
      type: "GET", 
      success: callback
    };
    $.ajax(request);
}

function onStationerySubmit() {
  $(".search-form").submit(event => {
    // console.log('submitted');
    event.preventDefault();
    const searchTermInput = $(".main-input");
    const dataRequest = searchTermInput.val(); 
    //clear out input
    searchTermInput.val("");
    $(".loading").removeClass("hidden");
    console.log(dataRequest);
    getDataFromEtsyApi(dataRequest, showEtsyApiData);
  });
}

function renderEtsyResult(result) {
  console.log(result);
  return `
    <div class="js-displayed-results-box">
     <a class="js-displayed-results" href="${result.url}" target="_blank"><img src="${result.Images[0].url_170x135}"></a>
    </div>
  `;
}

$(".back-btn-div").on("click", function(event){
  $(".js-stationery-results").addClass("hidden");
  $(".back-btn-div").addClass("hidden");
  $("main").removeClass("hidden");
});

function showEtsyApiData(data) {
  console.log(data);
  const etsyResults = data.results.map(renderEtsyResult);
  $(".js-stationery-results").html(etsyResults);
  $("main").addClass("hidden");
  $(".back-btn-div").removeClass("hidden");
  $(".js-stationery-results").removeClass("hidden");
  $(".loading").addClass('hidden');
  // console.log(etsyResults);
  return etsyResults;
}

$(onStationerySubmit);



// function initMap(button) {
//     var info = button.parent();
//     var latitude = info.find($('.lat')).val();
//     var longitude = info.find($('.lng')).val();
//     var location = {lat: Number(latitude), lng: Number(longitude)};
//     var map = new google.maps.Map(document.getElementById('map'), {
//       zoom: 16,
//       center: location
//     });
//     var marker = new google.maps.Marker({
//       position: location,
//       map: map
//     });
// }
