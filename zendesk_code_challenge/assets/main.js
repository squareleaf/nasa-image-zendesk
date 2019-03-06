$(function() {
  var client = ZAFClient.init();
  var date;
  var hd_img;
  client.invoke('resize', { width: '100%', height: '300px' });

  $("#potd-date").on("change", function() {
    date = $("#potd-date").val();
    contactNASA(date, client);
  });

  $(".potd-thumb").on("click", function() {
    openHDModal(client);
  });
});

function showPOTD(data) {
  if (data.url) {
    var nasa_img = "<img src=" + data.url + " class='thumbnail-img' style='max-height:275px'>";
    $(".potd-thumb").html(nasa_img);
  }
}

function showError(response) {
  $(".potd-thumb").html(response);
}

function contactNASA(date, client) {
  const api_key = "8tKXFJvk4bzxmNizdRyj62p8ouqTEIo4LCoJO7FP";
  const base_api_url = "https://api.nasa.gov/planetary/apod";
  
  var nasa_apod = {
    url: base_api_url + '?api_key=' + api_key + '&date=' + date,
    type:'GET',
    dataType: 'json'
  };

  client.request(nasa_apod).then(
    function(data) { 
      hd_img = data.hdurl;
      showPOTD(data); 
    },
    function(response) {
      showError(response.responseText);
    }
  );
}

function openHDModal(client) {
  client.invoke('instances.create', {
  location: 'modal',
  url: hd_img,
  size: {
    width: '800px',
    height: '600px'
  }
}).then(function(modalContext) {
  var modalClient = client.instance(modalContext['instances.create'][0].instanceGuid);
});
}
