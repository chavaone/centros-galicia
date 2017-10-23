
app = {};

app.trash = [];

app.centros = [];

app.sort_enabled_method = "nome";

app.sort_methods = {
    'nome' : function (centro_a, centro_b) {
        return centro_a.nombre.localeCompare(centro_b.nombre);
    },
    'time' : function (centro_a, centro_b) {
        if (! centro_a.osm.tiempo || ! centro_b.osm.tiempo) return 0;
        return centro_a.osm.tiempo < centro_b.osm.tiempo ? -1 : 1;
    },
    'distance' : function (centro_a, centro_b) {
        return centro_a.osm.distancia < centro_b.osm.distancia ? -1 : 1;
    },
};

app.export = function () {
    var codigos = $.map($("main#list>article"), function (centro) {return centro.dataset.codCentro;}).join(" ");
    $("#modal").html(Handlebars.templates.modalexport({
        paste: codigos
    }));
    $('#modal').iziModal('open');
};

app._function_update_distancias = function (index, callback) {
        return function (data) {
            for (var j = index; j < index + data.distance.length -1; j++){
                app.centros[j].osm = {
                    tiempo: data.time[j-index+1],
                    distancia: data.distance[j-index+1]
                };
            }
            callback();
        };
};

app.get_distancias = function (lat, long, callback) {
    var search_local;
    var end;
    var localizaciones = app.centros.map(function(centro) {
        return centro.coordenadas.lat.toString() + "," + centro.coordenadas.lon.toString();
    });

    for (var index = 0; index < localizaciones.length; index = index + 99) {
        end = index+99 < localizaciones.length ? index + 99 : localizaciones.length;
        search_local = [lat.toString() + "," + long.toString()].concat(localizaciones.slice(index, end));
        $.ajax({
            method: "POST",
            url:    "http://www.mapquestapi.com/directions/v2/routematrix?key=JsCa8woMcgAnVKccq8Qww0c1wLx7JNmd",
            data:   JSON.stringify({"locations": search_local}),
            dataType: "json",
            contentType: "application/json"
        }).done(app._function_update_distancias(index, callback));
    }
};

app.sort = function (centros) {
    if (! app.position && (app.sort_enabled_method == "time" || app.sort_enabled_method == "distance")) {
        navigator.geolocation.getCurrentPosition (function(pos) {
            app.position = {
                lat: pos.coords.latitude,
                long: pos.coords.longitude
            };
            app.get_distancias(app.position.lat, app.position.long, app.load_data);
        });
        return centros;
    }
    return centros.sort(app.sort_methods[app.sort_enabled_method]);
};

app.filter = function (centros) {
    var filtered_centros = centros;

    filtered_centros = filtered_centros.filter(function (c) {
        return  ($("#acoruna-checkbox").is(':checked') && c.provincia === "A Coruña") ||
                ($("#lugo-checkbox").is(':checked') && c.provincia === "Lugo") ||
                ($("#ourense-checkbox").is(':checked') && c.provincia === "Ourense") ||
                ($("#pontevedra-checkbox").is(':checked') && c.provincia === "Pontevedra");
    });

    filtered_centros = filtered_centros.filter(function (c) {
        return  ($("#eso-checkbox").is(':checked') && c.ensinanzas.indexOf("eso") !== -1) ||
                ($("#bac-checkbox").is(':checked') && c.ensinanzas.indexOf("bac") !== -1) ||
                ($("#fp-checkbox").is(':checked') &&  c.ensinanzas.indexOf("fp") !== -1) ||
                ($("#esa-checkbox").is(':checked') &&  c.ensinanzas.indexOf("eso") !== -1) ||
                ($("#baca-checkbox").is(':checked') &&  c.ensinanzas.indexOf("baca") !== -1);
    });

    filtered_centros = filtered_centros.filter(function (c) {
        return app.trash.indexOf(c.cod) === -1;
    });

    filtered_centros = filtered_centros.filter(function (c) {
        return  ($("#ies-checkbox").is(':checked') && c.nombre.startsWith("IES")) ||
                ($("#cifp-checkbox").is(':checked') && c.nombre.startsWith("CIFP")) ||
                ($("#cpi-checkbox").is(':checked') && c.nombre.startsWith("CPI")) ||
                ($("#cee-checkbox").is(':checked') && c.nombre.startsWith("CEE")) ||
                ($("#epapu-checkbox").is(':checked') && c.nombre.startsWith("EPAPU")) ||
                ($("#cfea-checkbox").is(':checked') && c.nombre.startsWith("CFEA"));
    });

    return filtered_centros;
};

app.load_data = function () {
    if (app.centros)
        app.centros = db.get_centros();

    var centros = app.filter(app.centros);
    centros = app.sort(centros);

    var innerHTML = Handlebars.templates.centros({
        "centros": centros
    });

    $("main#list").html(innerHTML);
};
