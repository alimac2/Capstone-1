const ETSY_SEARCH_URL = 'https://openapi.etsy.com/v2/listings/active.js?';

function getDataFromApi(searchTerm, callback) {
    const request = {
      url: ETSY_SEARCH_URL, 
      data: {
        // tags: ["stationery"],
        keywords: searchTerm,
        category: "Stationery",
        limit: 15,
        includes: "Images",
        // listingImage: "75x75" //thumbnail size unsure about syntax
        api_key: "zoug3fzmdrpsjesf12llft3h"
      },
      dataType: "jsonp",
      type: "GET", 
      success: callback
    };
    $.ajax(request);
}

function onSubmit() {
  $('.search-form').submit(event => {
    // console.log('submitted');
    event.preventDefault();
    const searchTermInput = $('.main-input');
    const dataRequest = searchTermInput.val(); 
    //clear out input
    searchTermInput.val("");
    console.log(dataRequest);
    getDataFromApi(dataRequest, showApiData);
  });
}

function renderResult(result) {
  console.log(result);
  return `
    <div>
     <a class="js-results" href="${result.url}" target="_blank"><img src="${result.Images[0]}"></a>
    </div>
  `;
}


function showApiData(data) {
  const etsyResults = data.results.forEach((results) => renderResult(etsyResults));
  $('.results').html(etsyResults);
  return etsyResults;
}

$(onSubmit);

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