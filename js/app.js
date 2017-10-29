
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
        if (! centro_a.osm.distancia || ! centro_b.osm.distancia) return 0;
        return centro_a.osm.distancia < centro_b.osm.distancia ? -1 : 1;
    }
};

app.export = function () {
    var codigos = $.map($("main#list>article"), function (centro) {return centro.dataset.codCentro;}).join(" ");
    $("#modal").html(Handlebars.templates.modalexport({
        paste: codigos
    }));
    $('#modal').iziModal('open');
};

app.get_osm = function (lat, long, callback) {
    var localizaciones = app.centros.map(function(centro) {
        return centro.coordenadas.lon.toString()  + "," +  centro.coordenadas.lat.toString();
    });
    $.ajax({
        method: "GET",
        url: "https://osrm.aquelando.info/table/v1/driving/" + long.toString() + "," +  lat.toString() + ";" + localizaciones.join(";"),
        data: {
            sources: 0
        }
    }).done(function(data) {

        for (var i = 1; i < data.destinations.length; i++) {
            app.centros[i-1].osm = {
                tiempo: data.durations[0][i],
                distancia: app.calcular_distancia_coordenadas(lat, long, app.centros[i-1].coordenadas.lat, app.centros[i-1].coordenadas.lon)
            };
        }
        callback();
    });
};

app.calcular_distancia_coordenadas = function(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = (lat2 - lat1) * Math.PI / 180;  // deg2rad below
  var dLon = (lon2 - lon1) * Math.PI / 180;
  var a =
     0.5 - Math.cos(dLat)/2 +
     Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
     (1 - Math.cos(dLon))/2;

  return R * 2 * Math.asin(Math.sqrt(a));
};

app.sort = function (centros) {
    if (! app.position && (app.sort_enabled_method == "time" || app.sort_enabled_method == "distance")) {
        navigator.geolocation.getCurrentPosition (function(pos) {
            app.position = {
                lat: pos.coords.latitude,
                long: pos.coords.longitude
            };
            app.get_osm(app.position.lat, app.position.long, app.load_data);
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
