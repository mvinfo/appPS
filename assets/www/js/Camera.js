    var pictureSource;   // fonte da imagem
    var destinationType; // define o formato de valor retornado

    // Cordova est� pronto para ser usado!
    //
    function configuracao() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }

    // Chamado quando uma foto � recuperado com sucesso
    //
    function onPhotoDataSuccess(imageData) {
      // Descomente para ver os dados de imagem codificados em base64
      // console.log(imageData);

      // Obter identificador imagem
      //
      var smallImage = document.getElementById('smallImage');

      // Reexibir Elementos de imagem
      //
      smallImage.style.display = 'block';

      // Mostrar a foto capturada
      // As regras CSS inline s�o usados ??para redimensionar a imagem
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
    }

    // Chamado quando uma foto � recuperado com sucesso
    //
    function onPhotoURISuccess(imageURI) {
      // Descomente para ver o URI arquivo de imagem
      // console.log(imageURI);

      // Obter identificador imagem
      //
      var largeImage = document.getElementById('largeImage');

      // Reexibir Elementos de imagem
      //
      largeImage.style.display = 'block';

      // Mostrar a foto capturada
      // As regras CSS inline s�o usados ??para redimensionar a imagem
      //
      largeImage.src = imageURI;
    }

    // Um bot�o ir� chamar esta fun��o
    //
    function capturePhoto() {
      configuracao();
      // Tirar uma foto usando a c�mera do dispositivo e recuperar a imagem como uma string base64-codificado
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
    }

    // Um bot�o ir� chamar esta fun��o
    //
    function capturePhotoEdit() {
      // Tirar uma foto usando a c�mera do dispositivo, permitem editar e recuperar a imagem como uma string base64-codificado
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
    }

    // Um bot�o ir� chamar esta fun��o
    //
    function getPhoto(source) {
      // Recuperar localiza��o do arquivo de imagem a partir de fonte especificada
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    // Chamado se algo de ruim acontece.
    // 
    function onFail(message) {
      alert('Failed because: ' + message);
    }
