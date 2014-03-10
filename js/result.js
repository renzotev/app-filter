var sPageURL = window.location.search;
console.log(sPageURL);

var $consultas_bateria = function (id) {

    var consulta_get = "php/consult_baterias.php"+sPageURL;

    $.getJSON( consulta_get, function( data ) {
      var items = [];
      $.each( data.baterias, function( key, val ) {
            
            items.push( '<div class="col-sm-6"> \
                            <div class="thumbnail"> \
                                    <div class="caption"> \
                                    <h3>'+val.marca+'</h3> \
                                    <p>'+val.modelo+'</p> \
                                    <p>'+val.sku+'</p> \
                                </div> \
                            </div> \
                        </div> ' );
            
        });
        
        $( id ).append(items);

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
