var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=ef2598c17941cd91d64a966c6013bd6a&format=json", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));


    