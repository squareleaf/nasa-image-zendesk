$(function() {
  var client = ZAFClient.init();
  const thumbSize = 210;

  var windowWidth = $(".gallery").width();
  var imagesFit = parseInt(windowWidth / thumbSize );
  var startingDate = new Date();

  for (var i=1; i < imagesFit; i++) {
    var randDate = new Date();
    randDate = randDate.setDate(startingDate.getDate() - (i * 5));
    randDate = new Date(randDate).toISOString().slice(0,10);
    contactNASA(client, randDate).then(
      function([thumbImg, hdImg]) {
        if (thumbImg.includes(".jpg")) {
          $(".gallery").append("<a href=" + hdImg + " target='_blank'>" + thumbImg + "</a>");
        }
      }
    );
  }
});
