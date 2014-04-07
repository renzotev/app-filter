/* Guardamos los GETS en una varible */
var sPageURL = window.location.search;


/* Guardamos nuestro html de resultado en una variable */
var result_baterias = function (marca, modelo, sku) {
    return '<div class="row"> \
                <div class="result-wrapper"> \
                    <div class="thumbnail"><img src="img/'+marca+'.jpg"></div> \
                    <div class="desc"> \
                        <p>Marca: '+marca+'</p> \
                        <p>Modelo: '+modelo+'</p> \
                        <p>SKU: '+sku+'</p> \
                    </div> \
                </div> \
                <div class="line"><div> \
            </div>';
} 


/* Creamos nuestra funcion la cual renderizara los valores del JSON en HTML */
var $consultas_bateria = function (id) {

    /* Guardamos la ruta de nuestro JSON con la consulta en una variable */
    var consulta_get = "php/consult_baterias.php"+sPageURL;

    /* Hacemos la llamada al JSON */
    $.getJSON( consulta_get, function( data ) {
        var items = [];

        /* Pintamos los datos del JSON en el html que a su vez seran guardados en un Array */
        $.each( data.baterias, function( key, val ) {
            items.push( result_baterias(val.marca, val.modelo, val.sku) );
        });
        
        /* Renderizamos el Array en el HTML */
        $( id ).append(items);

        /* Ocultamos el Loader*/
        $('#loadingDiv').hide();

    });
};

/* Llamamos a nuestra funcion y mandamos como parametro el ID contenedor donde se pintaran los resultados */
$consultas_bateria("#resultados");
