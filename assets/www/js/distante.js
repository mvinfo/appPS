// Objeto posto com as coordenadas do posto
var Posto = {
	posicao : {
		latitude : -25.435946,
		longitude: -49.273365	
	},

	// Funcao que ira calcular a distancia do posto com o usuário
	calculaKM : function( posicao ){                   //   usuário         PS
		var distancia = Distancia.distanciaEntreDoisPontos( posicao, this.posicao );
        alert(distancia);
	} 
}; 

// Objeto localizacao, aqui estao as funcoes para trabalhar com a api geolocation
var Localizacao = {
	// Inicia
	inicia : function(){
		// Funcao que serah chamada quando retornar a posicao do usuario
		var sucesso = function( posicao ){
			Posto.calculaKM( posicao.coords );
		};

		// Funcao que serah chamada caso de algum erro nesse processo de obter a posicao
		var erro = function( erro ){
			var erroDescricao = 'Erro, ';
			switch( erro.code ) {
				case erro.PERMISSION_DENIED:
						erroDescricao += 'usuário não autorizou a Geolocation.';
				break;
				case erro.POSITION_UNAVAILABLE:
						erroDescricao += 'localização indisponível.';
				break;
				case erro.TIMEOUT:
						erroDescricao += 'tempo expirado.';
				break;
				case erro.UNKNOWN_ERROR:
						erroDescricao += 'desconhecido!';
				break;
			}
			alert( erroDescricao )
		};

		// Verifica se o dispositivo do usuario tem suporte a geolocation
		if ( navigator.geolocation ){
			navigator.geolocation.getCurrentPosition( sucesso, erro );
		} else {
			erro();
		}
	}
};

// Objeto para calcular a distancia entre dois pontos
// Adaptado dessa formula http://stackoverflow.com/questions/27928/how-do-i-calculate-distance-between-two-latitude-longitude-points
var Distancia = {
	distanciaEntreDoisPontos : function( pontoInicial, pontoFinal ){
		var R = 6371; // Radio da Terra
		var dLat = this.graus2Radianos( pontoFinal.latitude - pontoInicial.latitude ); 
		var dLon = this.graus2Radianos( pontoFinal.longitude - pontoInicial.longitude ); 
		var a = Math.sin( dLat/2 ) * Math.sin( dLat/2 ) + Math.cos( this.graus2Radianos( pontoInicial.latitude ) ) * Math.cos( this.graus2Radianos( pontoFinal.latitude ) ) * Math.sin( dLon/2 ) * Math.sin( dLon/2 ); 
		var c = 2 * Math.atan2( Math.sqrt( a ), Math.sqrt( 1-a ) ); 
		var d = R * c; 
		return d;
	},
	graus2Radianos : function( graus ){
		return graus * ( Math.PI/180 )
	}
};

