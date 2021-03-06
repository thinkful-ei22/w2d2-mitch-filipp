'use strict';
/* global, store  $*/

const API_KEY = 'AIzaSyAWRQkgTKvb4jbDgSrWDZv5ZpaUSW--IFA';

const Api = (function() {

  const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
  
  const fetchVideos = function(searchTerm, callback) {
    const query = {
      q: searchTerm,
      part: 'snippet',
      key: API_KEY,
      maxResults: 10
    };
    $.getJSON(BASE_URL, query, callback);
  };

  const fetchNextVideos = function(searchTerm, callback) {
    const query = {
      q: searchTerm,
      part: 'snippet',
      key: API_KEY,
      maxResults: 10,
      pageToken: store.nextPageToken
    };
    $.getJSON(BASE_URL, query, callback);
  };

  const fetchPrevVideos = function(searchTerm, callback) {
    const query = {
      q: searchTerm,
      part: 'snippet',
      key: API_KEY,
      maxResults: 10,
      pageToken: store.prevPageToken
    };
    $.getJSON(BASE_URL, query, callback);
  };


  return {
    fetchVideos, fetchNextVideos, fetchPrevVideos
  };
}());