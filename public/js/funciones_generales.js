function generar_datatable(id_tabla, url, columns, columnDefs,eventos_tabla){
    grilla = $(`#${id_tabla}`).DataTable({
        ajax: {
            url: url,
            // ajax es el metodo a traves del cual va a recibir de la url especificada el array de objetos para mostrar en la tabla que lo obtengo 
            //consultando a la base de datos

        },
        dataSrc: function(json) {//de donde le estoy mandando ese json?
            console.log(json);
            return json.data;
        },
        columns,
        columnDefs,
        pageLength: 5, // Número de registros por página
        lengthMenu: [5, 10, 20],
    });

    eventos_tabla();
}


function mostrarConfirmacion(titulo, mensaje, confirmCallback) {
    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, ¡hazlo!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si se hace clic en "Sí, ¡hazlo!", ejecuta la función de confirmación
            if (confirmCallback && typeof confirmCallback === 'function') {
                confirmCallback();
            }
        }
    });
}



const mostrar_mensaje =  (mensaje) => {
Swal.fire({
    title: '¡Notificacion!',
    text: mensaje,
    icon: 'info',
    confirmButtonText: 'Aceptar'
});
}


const limpiar_campos =  (clase) => {
    $(clase).val('') //asi limpiamos los campos
    }


const nueva_fila= (clase) => {

    //me ejecute
    $(clase).val(0)    
    
    console.log("me ejecute")
    
    }



const cargar_sucursales_por_libro = async (select_libro,select_id_sucursal) => {

        let id = $(select_libro).val()//esto me da el id del libro cuando lo selecciono y dispara el onchange
    
        try {
            const url = `http://localhost:3090/branches/select_branch_by_libro/${id}`;
    
    
            const response = await fetch(url);
            const data = await response.text();
    
    
    
    
            $(`#${select_id_sucursal}`).html(data)
            //este pisa todo el tiempo la info del select , ya que al cambiar todo el tiempo  , queda la info de la sucursal anterior
            $(`#${select_id_sucursal}`).prepend("<option value=''>Seleccione sucursal</option>");
            //lo puse despues del insert porque sino se pisa con el html
            $(`#${select_id_sucursal}`).val($(`#${select_id_sucursal}`).attr('data-valor'))
            //selecciona el atributo que tengo en data valor y me marca la pelicula que corresponda
    
    
        } catch (error) {
            console.log(error)
        }
    }

    function aplicar_multiselect(id){
        $(`#${id}`).multiSelect({
            selectableHeader: `<input type='text' class='search-input' style='padding: 6px; width: 168px' autocomplete='off' placeholder='Buscar...'><button type='button' onclick="multiselect_marcar_todos('${id}')">Marcar Todos</button>`,
            selectionHeader: `<input type='text' class='search-input' style='padding: 6px; width: 168px' autocomplete='off' placeholder='Buscar...'><button type='button' onclick="multiselect_desmarcar_todos('${id}')">Desmarcar Todos</button>`,
            afterInit: function(ms){
              var that = this,
                  $selectableSearch = that.$selectableUl.prev(),
                  $selectionSearch = that.$selectionUl.prev(),
                  selectableSearchString = '#'+that.$container.attr('id')+' .ms-elem-selectable:not(.ms-selected)',
                  selectionSearchString = '#'+that.$container.attr('id')+' .ms-elem-selection.ms-selected';
          
              that.qs1 = $selectableSearch.quicksearch(selectableSearchString)
              .on('keydown', function(e){
                if (e.which === 40){
                  that.$selectableUl.focus();
                  return false;
                }
              });
          
              that.qs2 = $selectionSearch.quicksearch(selectionSearchString)
              .on('keydown', function(e){
                if (e.which == 40){
                  that.$selectionUl.focus();
                  return false;
                }
              });
            },
            afterSelect: function(){
              this.qs1.cache();
              this.qs2.cache();
            },
            afterDeselect: function(){
              this.qs1.cache();
              this.qs2.cache();
            }
          });
    }

    function multiselect_marcar_todos(id){
        $(`#${id}`).multiSelect('select_all');
    }

    function multiselect_desmarcar_todos(id){
        $(`#${id}`).multiSelect('deselect_all');
    }