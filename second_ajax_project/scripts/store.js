'use strict';

const store =(function () {
  const videos = [];
  let searchTerm = '';
  let nextPageToken = '';
  let prevPageToken = '';

  function setVideos(vids) {
    this.videos = vids;
  }

  function updateNextPageToken(token) {
    this.nextPageToken = token;
  }

  function updatePreviousPageToken(token) {
    this.prevPageToken = token;
  }

  function updateSearchTerm(term) {
    this.searchTerm = term;
  }

  return {
    videos: videos, setVideos, nextPageToken, prevPageToken, updatePreviousPageToken, updateNextPageToken, searchTerm, updateSearchTerm
  };
}());

