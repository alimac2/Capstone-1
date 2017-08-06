const ETSY_SEARCH_URL = 'https://openapi.etsy.com/v2/listings/active.js';

function getDataFromApi(searchTerm, callback) {
    const request = {
      url: ETSY_SEARCH_URL, 
      data: {
        keywords: searchTerm,
        q: "stationery",
        category: "Stationery",
        tags: "stationery",
        description: "greeting cards",
        limit: 15,
        includes: "Images",
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
    console.log('submitted');
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
  // console.log(result);
  return `
    <div>
     <a class="js-displayed-results" href="${result.url}" target="_blank"><img src="${result.Images[0].url_75x75}"></a>
    </div>
  `;
}


function showApiData(data) {
  // console.log(data);
  const etsyResults = data.results.map(renderResult);
  $('.js-stationery-results').html(etsyResults);
  console.log(etsyResults);
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