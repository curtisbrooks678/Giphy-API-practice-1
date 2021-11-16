import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import GifService from './gif-service.js';

$(document).ready(function () {
  $('#gifSearch').click(function () {
    const clear = document.getElementById("display");
    clear.innerHTML = '';
    const clearErrors = document.getElementById("showErrors");
    clearErrors.innerHTML = '';
    const key = $('#search').val();
    $('#search').val("");
    const type = $("input[name=query]:checked").val();
    let promise = GifService.getGif(type, key);
    promise.then(function(response) {
      const body = JSON.parse(response);
      getElements(body);
    }, function(error) {
      $('#showErrors').text(`There was an error processing your request: ${error}`);
    });
    function getElements(body) {
      if (type === "random") {
        $('#display').append("<img src ='" + body.data.images.original.url + "'/>");
      } else {
        for (let i = 0; i < body.data.length; i++) {
          $('#display').append("<img src ='" + body.data[i].images.original.url + "'/>");
        }
      }
    }
  });
});
