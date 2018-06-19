'use strict';
/* global store, store, Api, $*/


const videoList = (function() {

  function generateListItem(video) {
    return `
    <li data-id="${video.id}">
      <h3>${video.title}</h3>
      <a href="https://www.youtube.com/embed/${video.id}?rel=0" data-featherlight="iframe" 
        data-featherlight-iframe-width="640" data-featherlight-iframe-height="480" 
        data-featherlight-iframe-frameborder="0" data-featherlight-iframe-allow="autoplay; 
        encrypted-media" data-featherlight-iframe-allowfullscreen="true">
      <img src="${video.thumbnail}">
      </a>
      <a href="https://www.youtube.com/channel/${video.channelId}" target="_blank">${video.channelTitle}</a>
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
        thumbnail: item.snippet.thumbnails.default.url,
        channelId: item.snippet.channelId,
        channelTitle: item.snippet.channelTitle,
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