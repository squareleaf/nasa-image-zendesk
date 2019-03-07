$(function() {
  var client = ZAFClient.init();
  var date;
  client.invoke('resize', { width: '100%', height: '300px' });

  if (client) {
    contactNASA(client).then(
      function([thumbImg, hdImg]) {
        $(".potd-thumb").html(thumbImg);
        $(".potd-thumb").data("hd", hdImg);
      }
    );
  }

  $("#potd-date").on("change", function() {
    date = $("#potd-date").val();
    contactNASA(client, date).then(
      function([thumbImg, hdImg]) {
        $(".potd-thumb").html(result);
        $(".potd-thumb").data("hd", hdImg);
      }
    );
  });

  $(".potd-thumb").on("click", function() {
    var hdimg = $(".potd-thumb").data("hd");
    openHDModal(client, hdimg);
  });
});

function showError(response) {
  $(".potd-thumb").html(response);
}

function contactNASA(client, date = "none") {
  return new Promise(function(resolve, reject) {

    const api_key = "8tKXFJvk4bzxmNizdRyj62p8ouqTEIo4LCoJO7FP";
    const base_api_url = "https://api.nasa.gov/planetary/apod";
    
    var nasa_apod = {};
    if (date == "none") {
      nasa_apod = {
        url: base_api_url + '?api_key=' + api_key,
        type:'GET',
        dataType: 'json'
      };  
    } else {
      nasa_apod = {
        url: base_api_url + '?api_key=' + api_key + '&date=' + date,
        type:'GET',
        dataType: 'json'
      };
    }

    client.request(nasa_apod).then(
      function(data) { 
        hd_img = data.hdurl;
        if (data.url) {
          hdImg = hd_img;
          thumbImg = "<img src=" + data.url + " class='thumbnail-img' style='max-width:200px; margin:10px'>";
          resolve([thumbImg, hdImg]);
        } 
      },
      function(response) {
        showError(response.responseText);
      }
    );
  })
}

function openHDModal(client, hdimg) {
  client.invoke('instances.create', {
  location: 'modal',
  url: hdimg,
  size: {
    width: '800px',
    height: '600px'
  }
}).then(function(modalContext) {
  var modalClient = client.instance(modalContext['instances.create'][0].instanceGuid);
});
}
