var sPageURL = window.location.search;
console.log(sPageURL);

var $consultas_bateria = function (id) {

    var consulta_get = "php/consult_baterias.php"+sPageURL;

    $.getJSON( consulta_get, function( data ) {
      var items = [];
      $.each( data.baterias, function( key, val ) {
            
            items.push( '<div class="row"> \
                            <div class="result-wrapper"> \
                                <div class="thumbnail"><img src="img/'+val.marca+'.jpg"></div> \
                                <div class="desc"> \
                                    <p>Marca: '+val.marca+'</p> \
                                    <p>Modelo: '+val.modelo+'</p> \
                                    <p>SKU: '+val.sku+'</p> \
                                </div> \
                            </div> \
                            <div class="line"><div> \
                        </div>' );
            
        });
        
        $( id ).append(items);
        $('#loadingDiv').hide();

    });
};

$consultas_bateria("#resultados");

/*var template = function () {

                     '  <div class="col-sm-6"> //
                            <div class="thumbnail"> //
                                    <div class="caption"> //
                                    <h3>CAPSA</h3> //
                                    <p>SKU: 564656165165</p>//
                                </div> //
                            </div> //
                        </div> //'
                }*/
