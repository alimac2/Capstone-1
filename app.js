
/*GOOGLE MAPS FUNCTIONALITY*/
const map;
const myLatLngn = {lat: 37.09024, lng: -95.712891}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLngn,
    zoom: 5
    });

  const marker = new google.maps.Marker({
    position: myLatLngn,
    map: map,
    title: 'This is where you are'
    });
}









/*ETSY FUNCTIONALITY*/
const ETSY_SEARCH_URL = 'https://openapi.etsy.com/v2/listings/active.js';

function getDataFromApi(searchTerm, callback) {
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

function onSubmit() {
  $('.search-form').submit(event => {
    // console.log('submitted');
    event.preventDefault();
    const searchTermInput = $('.main-input');
    const dataRequest = searchTermInput.val(); 
    //clear out input
    searchTermInput.val("");
    $('.loading').removeClass('hidden');
    console.log(dataRequest);
    getDataFromApi(dataRequest, showApiData);
  });
}

function renderResult(result) {
  console.log(result);
  return `
    <div class="js-displayed-results-box">
     <a class="js-displayed-results" href="${result.url}" target="_blank"><img src="${result.Images[0].url_170x135}"></a>
    </div>
  `;
}

$('.back-btn-div').on("click", function(event){
  $('.js-stationery-results').addClass('hidden');
  $('.back-btn-div').addClass('hidden');
  $('main').removeClass('hidden');
});

function showApiData(data) {
  // console.log(data);
  const etsyResults = data.results.map(renderResult);
  $('.js-stationery-results').html(etsyResults);
  $('main').addClass('hidden');
  $('.back-btn-div').removeClass('hidden');
  $('.js-stationery-results').removeClass('hidden');
  $('.loading').addClass('hidden');
  // console.log(etsyResults);
  return etsyResults;
}

$(onSubmit);




//EXAMPLE CODEN FOR GOOGLE MAPS

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
