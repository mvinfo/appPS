var localDB = null;

var Posto = {
	posicao : {
		latitude : -25.435946,
		longitude: -49.273365
	}
}

Usuario = {
	posicao : {
		latitude : 0,
		longitude: 0
	}
}

//quando inicializa a pagina
function onInit(){
    try {
        if (!window.openDatabase) {
            AtualizaStatus("Erro: Seu navegador não está habilitado para trabalhar com banco de dados.");
        }
        else {
            initDB();
            CriarTabelas();
            AtualizaLista();
            AtualizaListaPS();
        }
    }
    catch (e) {
        if (e == 2) {
            AtualizaStatus("Erro: Versão de banco de dados inválida.");
        }
        else {
            AtualizaStatus("Erro: Erro desconhecido: " + e + ".");
        }
        return;
    }
}

//inicializa banco de dados
function initDB(){
    var shortName = 'UsuarioPS';
    var version = '1.0';
    var displayName = 'UsuarioPS';
    var maxSize = 65536; // Em bytes
    localDB = window.openDatabase(shortName, version, displayName, maxSize);
}

function AtualizaLista(){

	//pega o nº de linhas existentes na lista
    var dataRows = document.getElementById("itemData").getElementsByClassName("data");
	
	//deleta linha a linha na lista
    while (dataRows.length > 0) {
        row = dataRows[0];
        document.getElementById("itemData").removeChild(row);
    };
    
	//Realiza a leitura no banco e cria novas linhas na tabela.
    var query = "SELECT * FROM Cidadao;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [], function(transaction, results){
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    var li = document.createElement("li");
					li.setAttribute("id", row['id']);
                    li.setAttribute("class", "data");
                    li.setAttribute("style", "background-color:gray;color:yellow");
                    li.setAttribute("onclick", "onSelect(this)");
                    var liText = document.createTextNode(row['id']+' | '+ row['nome']);
                    li.appendChild(liText);
                    document.getElementById("itemData").appendChild(li);
                }
            }, function(transaction, error){
                AtualizaStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    } 
    catch (e) {
        AtualizaStatus("Error: SELECT não realizado " + e + ".");
    }
}

function AtualizaListaPS(){

	//pega o nº de linhas existentes na lista
    var dataRows = document.getElementById("itemDataPS").getElementsByClassName("dataPS");

	//deleta linha a linha na lista
    while (dataRows.length > 0) {
        row = dataRows[0];
        document.getElementById("itemDataPS").removeChild(row);
    };

	//Realiza a leitura no banco e cria novas linhas na tabela.
    var query = "SELECT * FROM PS;";
    try {
        localDB.transaction(function(transaction){

            transaction.executeSql(query, [], function(transaction, results){
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    var li = document.createElement("li");
					li.setAttribute("id", row['id']);
                    li.setAttribute("class", "dataPS");
                    li.setAttribute("style", "background-color:gray;color:yellow");
                    li.setAttribute("onclick", "onSelectPS(this)");
                    var liText = document.createTextNode(row['id']+' | '+ row['nomePS']);
                    li.appendChild(liText);
                    document.getElementById("itemDataPS").appendChild(li);
                }
            }, function(transaction, error){
                AtualizaStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    }
    catch (e) {
        AtualizaStatus("Error: SELECT não realizado " + e + ".");
    }
}

//manipulador de erro
errorHandler = function(transaction, error){
    AtualizaStatus("Erro: " + error.message);
    return true;
}

nullDataHandler = function(transaction, results){
}

//preenche o formulario com os dados selecionado
function AtualizaForm(id, nome, endereco, numero, bairro, cidade, uf, cep, qtpessoas, qtmenores, distancia, obs){
  document.getElementById('id').value = id;
  document.getElementById('nome').value = nome;
  document.getElementById('endereco').value = endereco;
  document.getElementById('numero').value = numero;
  document.getElementById('bairro').value = bairro;
  document.getElementById('cidade').value = cidade;
  document.getElementById('estado').value = uf;
  document.getElementById('cep').value = cep;
  document.getElementById('qtpessoas').value = qtpessoas;
  document.getElementById('qtmenores').value = qtmenores;
  document.getElementById('distancia').value = distancia;
  document.getElementById('obs').value = obs;
}

//preenche o formulario PS com os dados selecionado
function AtualizaFormPS(id,nomePS, lat, longit){
  document.getElementById('id').value = id;
  document.getElementById('nomePS').value = nomePS;
  document.getElementById('lat').value = lat;
  document.getElementById('long').value = longit;
}

function AtualizaStatus(status){
    document.getElementById('status').innerHTML = status;
}

function AtualizaStatusPS(status){
    document.getElementById('statusPS').innerHTML = status;
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function onCalcular(){
    onDeviceReadyUSU();
    Posto.posicao.latitude = document.getElementById('lat').value;
    Posto.posicao.longitude= document.getElementById('long').value;
    var distancia = getDistanceFromLatLonInKm(Usuario.posicao.latitude, Usuario.posicao.longitude,
                                              Posto.posicao.latitude, Posto.posicao.longitude);
    distancia = (distancia).toFixed(2);
    document.getElementById('distancia').value = distancia + ' Km';
    AtualizaStatus('Cálculo efetuado.'+' Latitude: '+ Usuario.posicao.latitude+' Longitude: '+Usuario.posicao.longitude);
}

function onNew(){
    AtualizaForm('', '', '', '', '', '', '', '', '', '', '', '');
    onCalcular();
}

function onNewPS(){
    AtualizaFormPS('', '', '', '');
    onDeviceReady();
    init();
}
    