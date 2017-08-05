const ETSY_SEARCH_URL = 'https://openapi.etsy.com/v2/listings/active.js';

function getDataFromApi(searchTerm, callback) {
    const request = {
      url: ETSY_SEARCH_URL,
      api_key: "zoug3fzmdrpsjesf12llft3h",
      data: {
        tags: ["stationery"],
        keywords: searchTerm,
        category: ["stationery"];
        limit: 15,
        includes: "images",
        listingImage: "75x75" //thumbnail size
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
    searchTermInput.val("");//clear out input
    console.log(dataRequest);
    getDataFromApi(dataRequest, showApiData);
  });
}

$(onSubmit);

function renderResult(result) {
  console.log(result);
  return `
    <div>
     <a class="js-results" href="${result.}" target="_blank"><img src="${result.listingImage}"></a>
    </div>
  `;
}


function showApiData(data) {
  const results = data.items.map((results, index) => renderResult(results));
  $('.results').html(results);
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