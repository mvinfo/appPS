function CriarTabelas(){
  var query = 'CREATE TABLE IF NOT EXISTS Cidadao(\n\
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,\n\
    nome varchar not null, \n\
    endereco varchar not null, \n\
    numero integer, \n\
    bairro varchar, \n\
    cidade varchar, \n\
    uf varchar, cep varchar, \n\
    qtpessoas integer, \n\
    qtmenores integer, \n\
    distancia integer, \n\
    obs varchar,\n\
    nomePS);';
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], nullDataHandler, errorHandler);
            AtualizaStatus("Tabela 'Cidadao' status: OK.");
        });
    } 
    catch (e) {
        AtualizaStatus("Erro: Tabela 'Cidadao' não criada " + e + ".");
        return;
    };

    var query1 = 'CREATE TABLE IF NOT EXISTS PS(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,'+
        'nomePS varchar not null,'+
        'lat integer,'+
        'long integer);';
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query1, [], nullDataHandler, errorHandler);
            AtualizaStatus("Tabela 'PS' status: OK.");
        });
    }
    catch (e) {
        AtualizaStatus("Erro: Tabela 'PS' não criada " + e + ".");
        return;
    };
}

//insere dados do form
function onInsert(){
    var nome     = document.getElementById('nome').value;
	var endereco = document.getElementById('endereco').value;
	var numero 	 = document.getElementById('numero').value;
	var bairro   = document.getElementById('bairro').value;
	var cidade 	 = document.getElementById('cidade').value;
    var uf       = document.getElementById('estado').value;
    var cep      = document.getElementById('cep').value;
    var qtpessoas= document.getElementById('qtpessoas').value;
    var qtmenores= document.getElementById('qtmenores').value;
    var distancia= document.getElementById('distancia').value;
    var obs 	 = document.getElementById('obs').value;
    var posto    = document.getElementById('posto').value;

    //verifica se os campos obrigatorios nao estao vazios
    if (nome == "" || bairro == "" || endereco== "") {
        AtualizaStatus("'Nome', 'Endereço e 'Bairro' são campos obrigatórios!");
    }
    else {
        var queryPS = "select nomePS from PS";
        try {
            localDB.transaction(function(transaction){
            transaction.executeSql(queryPS, [], function(transaction, results){
                var row = results.rows.item(0);
                document.getElementById('posto').value = row['nomePS'];
                }, errorHandler);
            });
        }
        catch (e){
            AtualizaStatus("Erro"+e);
        }

    var query = "insert into Cidadao (nome, endereco, numero, bairro, cidade, uf, cep, qtpessoas, qtmenores, distancia, obs, nomePS) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?);";
        try {
            localDB.transaction(function(transaction){
                transaction.executeSql(query, [nome, endereco, numero, bairro, cidade, uf, cep, qtpessoas, qtmenores, distancia, obs, posto], function(transaction, results){
					//senão inseriu
                    if (!results.rowsAffected) {
                        AtualizaStatus("Erro: Inserção não realizada");
                    }
                    else {
                        AtualizaForm("","","","","","","","","","","","");
                        AtualizaStatus("Inserção realizada");
                        AtualizaLista();
                    }
                }, errorHandler);
            });
        }
        catch (e) {
            AtualizaStatus("Erro: INSERÇÃO não realizada " + e + ".");
        }
    }
}

//insere dados do form Posto Saúde
function onInsertPS(){
    var id     = document.getElementById('id').value;
    var nomePS = document.getElementById('nomePS').value;
	var lat    = document.getElementById('lat').value;
	var longit = document.getElementById('long').value;

	//verifica se os campos obrigatorios nao estao vazios
    if (nome == "" || lat == "" || longit== "") {
        AtualizaStatusPS("'Nome do posto', 'Latitude e 'Longitude' são campos obrigatórios!");
    }
    else {
        var query = "insert into PS (nomePS, lat, long) VALUES (?, ?, ?);";
          //var query = "update PS set nomePS=?, lat=?, long=? where id=?;"
        try {
            localDB.transaction(function(transaction){
                transaction.executeSql(query, [nomePS, lat, longit], function(transaction, results){
					//senão inseriu
                    if (!results.rowsAffected) {
                        AtualizaStatusPS("Erro: Inserção não realizada");
                    }
                    else {
                        AtualizaFormPS("","","","");
                        AtualizaStatusPS("Inserção realizada");
                        AtualizaListaPS();
                    }
                }, errorHandler);
            });
        }
        catch (e) {
            AtualizaStatusPS("Erro: INSERÇÃO não realizada " + e + ".");
        }
    }
}

//atualização Cidadão
function onUpdate(){
	//atribui os dados do form as variaveis
    var id 		 = document.getElementById('id').value;
    var nome     = document.getElementById('nome').value;
	var endereco = document.getElementById('endereco').value;
	var numero 	 = document.getElementById('numero').value;
	var bairro   = document.getElementById('bairro').value;
	var cidade 	 = document.getElementById('cidade').value;
    var uf       = document.getElementById('estado').value;
    var cep      = document.getElementById('cep').value;
    var qtpessoas= document.getElementById('qtpessoas').value;
    var qtmenores= document.getElementById('qtmenores').value;
    var distancia= document.getElementById('distancia').value;
    var obs 	 = document.getElementById('obs').value;
	//verifica se os campos obrigatorios nao estao vazios
    if (nome == "" || bairro == "" || endereco== "") {
        AtualizaStatus("'Nome', 'Endereço e 'Bairro' são campos obrigatórios!");
    }
    else {
        var query = "update Cidadao set nome=?, endereco=?, numero=?, bairro=?, cidade=?, uf=?, cep=?, qtpessoas=?, qtmenores=?, distancia=?, obs=? where id=?;";
        try {
            localDB.transaction(function(transaction){
                transaction.executeSql(query, [nome, endereco, numero, bairro, cidade, uf, cep, qtpessoas, qtmenores, distancia, obs, id], function(transaction, results){
					//senão atualizou
                    
                    if (!results.rowsAffected) {
                        AtualizaStatus("Erro: Atualização não realizada.");
                    }
                    else {
                        AtualizaForm("","","","","","","","","","","","");
                        AtualizaStatus("Atualização realizada");
                        AtualizaLista();
                    }
                }, errorHandler);
            });
        } 
        catch (e) {
            AtualizaStatus("Erro: ATUALIZAÇÃO não realizada " + e + ".");
        }
    }
}

function onUpdatePS(){
	//atribui os dados do form as variaveis
    var id 	   = document.getElementById('id').value;
    var nomePS = document.getElementById('nomePS').value;
	var lat    = document.getElementById('lat').value;
	var longit = document.getElementById('long').value;
	//verifica se os campos obrigatorios nao estao vazios
    if (nomePS == "" || lat == "" || longit== "") {
        AtualizaStatusPS("'Nome do Posto', 'Latitude e 'Longitude' são campos obrigatórios!");
    }
    else {
        var query = "update PS set nomePS=?, lat=?, long=? where id=?;";
        try {
            localDB.transaction(function(transaction){
                transaction.executeSql(query, [nomePS, lat, longit, id], function(transaction, results){
					//senão atualizou

                    if (!results.rowsAffected) {
                        AtualizaStatusPS("Erro: Atualização não realizada.");
                    }
                    else {
                        AtualizaFormPS("","","","");
                        AtualizaStatusPS("Atualização realizada" );
                        AtualizaListaPS();
                    }
                }, errorHandler);
            });
        }
        catch (e) {
            AtualizaStatus("Erro: ATUALIZAÇÃO não realizada " + e + ".");
        }
    }
}

function onDelete(){
    var id = document.getElementById('id').value;
    
    var query = "delete from Cidadao where id=?;";
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [id], function(transaction, results){
				//senão deletou
                if (!results.rowsAffected) {
                    AtualizaStatus("Erro: Exclusão não realizada.");
                }
                else {
                    AtualizaForm("","","","","","","","","","","","");
                    AtualizaStatus("Registro excluído");
                    AtualizaLista();
                }
            }, errorHandler);
        });
    } 
    catch (e) {
        AtualizaStatus("Erro: EXCLUSÃO não realizada " + e + ".");
    }
}

function onDeletePS(){
    var id = document.getElementById('id').value;

    var query = "delete from PS where id=?;";
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [id], function(transaction, results){
				//senão deletou
                if (!results.rowsAffected) {
                    AtualizaStatus("Erro: Exclusão não realizada.");
                }
                else {
                    AtualizaFormPS("","","","");
                    AtualizaStatusPS("Registro excluído");
                    AtualizaListaPS();
                }
            }, errorHandler);
        });
    }
    catch (e) {
        AtualizaStatus("Erro: EXCLUSÃO não realizada " + e + ".");
    }
}

function onSelect(htmlLIElement){
	var id = htmlLIElement.getAttribute("id");
	
	query = "SELECT * FROM Cidadao where id=?;";
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [id], function(transaction, results){
                var row = results.rows.item(0);
                AtualizaForm(row['id'], row['nome'], row['endereco'], row['numero'], row['bairro'], row['cidade'], row['uf'], row['cep'], row['qtpessoas'], row['qtmenores'], row['distancia'], row['obs']);
            }, function(transaction, error){
                AtualizaStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    } 
    catch (e) {
        AtualizaStatus("Error: CONSULTA não realizada " + e + ".");
    }
}

function onSelectPS(htmlLIElement){
	var id = htmlLIElement.getAttribute("id");

	query = "SELECT * FROM PS where id=?;";
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [id], function(transaction, results){
                var row = results.rows.item(0);
                AtualizaFormPS(row['id'], row['nomePS'], row['lat'], row['long']);
            }, function(transaction, error){
                AtualizaStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    }
    catch (e) {
        AtualizaStatus("Error: CONSULTA não realizada " + e + ".");
    }
}

//carrega os dados nas caixas de texto do PS
function carregaPS(){
	query = "SELECT * FROM PS;";
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], function(transaction, results){
                var row = results.rows.item(0);
                AtualizaFormPS(row['id'], row['nomePS'], row['lat'], row['long']);
                Posto.posicao.latitude = row['lat'];
                Posto.posicao.longitude = row['long'];
            }, function(transaction, error){
                AtualizaStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    }
    catch (e) {
        AtualizaStatus("Error: CONSULTA não realizada " + e + ".");
    }
}