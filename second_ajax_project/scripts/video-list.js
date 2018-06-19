'use strict';
/* global store, store, Api, $*/


const videoList = (function() {

  function generateListItem(video) {
    return `
    <li data-id="${video.id}">
      <h3>${video.title}</h3>
      <img src="${video.thumbnail}">
    </li>`;
  }

  function generateListItemString(videoList) {
    const videos = videoList.map((video) => generateListItem(video));
    return videos.join('');
  }
  
  function render() {
    let videos = store.videos;

    const listItemString = generateListItemString(videos);

    $('.results').html(listItemString);
  }
    
  function decorateResponse(response) {
    return response.items.map(item =>
      ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.default.url
      }));
  }

  function handleFormSubmit() {
    $('form').on('submit', event => {
      event.preventDefault();
      const input = $('#search-term').val();
      $('#search-term').val('');
       
  
      function callback(response){
        const videos = decorateResponse(response);
        store.setVideos(videos);
        render();
      }

      Api.fetchVideos(input, callback);
    });
  }
  
  function bindEventListeners() {
    handleFormSubmit();
  }
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
}());