import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import {getGifs} from './business.js';

$(document).ready(function () {
  $('#gifSearch').click(function () {
    const key = $('#search').val();
    $('#search').val("");
    const type = $("#query").val();
    $("#query").val("");

    let request = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/${type}?api_key=${process.env.API_KEY}&q=${key}&limit=25&offset=0&lang=en`;

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      for (let i = 0; i < response.data.length; i++) {
        $('#display').append("<img src ='" + response.data[i].images.original.url + "'/>");
      }
    }
  });

  $('#gifTrending').click(function(){
    const key = $('#search').val();
    $('#search').val("");

    let request = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&q=${key}&limit=25&offset=0&lang=en`;

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      for (let i = 0; i < response.data.length; i++) {
        $('#display').append("<img src ='" + response.data[i].images.original.url + "'/>");
      }
    }
  });
});