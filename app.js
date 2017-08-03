const ETSY_SEARCH_URL = 'https://openapi.etsy.com/v2/listings/active.js';

function getDataFromApi(callback) {
    const request = {
      url: ETSY_SEARCH_URL,
      api_key: "zoug3fzmdrpsjesf12llft3h",
      data: {
        tags: ["stationery"],
        params: keywords["stationery"],
        limit: 15,
        includes: "images",
        state: "active",
        listingImage: "75x75" //thumbnail size
      },
      dataType: "jsonp",
      type: "GET", 
      success: callback
    };
    $.ajax(request);
}

//OR
// function getDataFromApi(callback) {
//   return $ajax({
//     url: ETSY_SEARCH_URL,
//     api_key: "zoug3fzmdrpsjesf12llft3h",
//    data: {
      //   tags: ["stationery"],
      //   params: keywords["stationery"],
      //   limit: 15,
      //   includes: "images",
      //   state: "active",
      //   listingImage: "75x75" //thumbnail size
      // },
//     dataType: "jsonp",
//     method: "GET",
//     success: callback
//   });
// }

function showApiData(data) {
  const results = data.items.map(index) //returns nodes of all indexes and create a new array with the results
  //render results inside a div
  return results
}








// const GOOGLEMAPS_SEARCH_URL = 'endpoint';

// function getDataFromApi(searchTerm, callback) {
//   const request = {
//     key: 'AIzaSyAZCRrXZqy0vdPMrfNPZy8DBM4ywFFflwU',
//     q: searchTerm

//   };
//   $.getJSON(GOOGLEMAPS_SEARCH_URL, request, callback);
// }



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