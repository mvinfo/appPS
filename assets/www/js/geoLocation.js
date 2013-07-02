//Cordova está pronto
function onDeviceReady() {
  navigator.geolocation.getCurrentPosition(onSuccess, onError,{enableHighAccuracy:true});
}
//Pega as coordenadas
function onSuccess(position) {
  document.getElementById('lat').value = position.coords.latitude;
  document.getElementById('long').value = position.coords.longitude;
  }

function onError(error) {
     var erroDescricao = 'Erro: ';
      switch( error.code ) {
        case error.PERMISSION_DENIED:
          erroDescricao += 'usuário não autorizou a Geolocation.';
        break;
        case error.POSITION_UNAVAILABLE:
          erroDescricao += 'localização indisponível.';
        break;
        case error.TIMEOUT:
          erroDescricao += 'tempo expirado.';
        break;
        case error.UNKNOWN_ERROR:
         erroDescricao += 'desconhecido!';
        break;
      }
      alert(erroDescricao);
}

//Cordova está pronto
function onDeviceReadyUSU() {
  navigator.geolocation.getCurrentPosition(onSuccessUSU, onError,{enableHighAccuracy:true});
}
//Pega as coordenadas
function onSuccessUSU(position) {
  Usuario.posicao.latitude = position.coords.latitude;
  Usuario.posicao.longitude = position.coords.longitude;
  }

//Aguarde Cordova para carregar
function init() {
  document.addEventListener("deviceready", onDeviceReady, false);
}