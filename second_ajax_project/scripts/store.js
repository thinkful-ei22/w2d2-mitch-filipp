'use strict';

const store =(function () {
  const videos = [];

  function setVideos(vids) {
    this.videos = vids;
  }

  return {
    videos: videos, setVideos,
  };
});

