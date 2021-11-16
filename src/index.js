import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import {getGifs} from './business.js';

$(document).ready(function () {
  $('#gifSearch').click(function () {
    const clear = document.getElementById("display");
    clear.innerHTML = '';
    const key = $('#search').val();
    $('#search').val("");
    const type = $("input[name=query]:checked").val();

    let request = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/${type}?api_key=${process.env.API_KEY}&q=${key}&limit=25&offset=0&lang=en`;

    console.log(url);
    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };
    
    request.open("GET", url, true);
    request.send();
    
    function getElements(response) {
      if (type === "random") {
        $('#display').append("<img src ='" + response.data.images.original.url + "'/>");
      } else {
        for (let i = 0; i < response.data.length; i++) {
          $('#display').append("<img src ='" + response.data[i].images.original.url + "'/>");
        }
      }
    }
  });
});
