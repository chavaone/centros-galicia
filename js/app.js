
app = {};

app.trash = [];

app.centros = [];

app.sort_enabled_method = "none";

app.sort_methods = {
    'nome' : function (centro_a, centro_b) {
        return centro_a.nombre.localeCompare(centro_b.nombre);
    },
    'time' : function (centro_a, centro_b) {
        if (! centro_a.osm || ! centro_b.osm || ! centro_a.osm.tiempo || ! centro_b.osm.tiempo) return 0;
        return centro_a.osm.tiempo < centro_b.osm.tiempo ? -1 : 1;
    },
    'distance' : function (centro_a, centro_b) {
        if (! centro_a.osm || ! centro_b.osm || ! centro_a.osm.distancia || ! centro_b.osm.distancia) return 0;
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
    var request_max_size = 300,
        ajax_calls = [],
        localizaciones = "";

    for (var i = 0; i < app.centros.length; i += request_max_size) {
        localizaciones = app.centros.slice(i, i + request_max_size - 1).map(function(centro) {
            return centro.coordenadas.lon.toString()  + "," +  centro.coordenadas.lat.toString();
        });
        ajax_calls.push(
            $.ajax({
                method: "GET",
                url: "https://osrm.aquelando.info/table/v1/driving/" + long.toString() + "," +  lat.toString() + ";" + localizaciones.join(";"),
                data: {
                    sources: 0
                }
            })
        );
    }

    $.when.apply($, ajax_calls).then(function() {
        for (var i = 0; i < arguments.length; i++){
            for(j = 0; j < arguments[i][0].durations[0].length - 1; j++) {
                app.centros[i*300 + j].osm = {
                    tiempo: arguments[i][0].durations[0][j+1],
                    distancia: app.calcular_distancia_coordenadas(lat, long, app.centros[i*300 + j].coordenadas.lat, app.centros[i*300 + j].coordenadas.lon)
                };
            }
        }
        callback();
    }, function(e) {
         console.log("My ajax failed");
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
    if (app.sort_enabled_method == "none")
        return centros;

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
        return  ($("#inf-checkbox").is(':checked') && c.ensinanzas.indexOf("inf") !== -1) ||
                ($("#prim-checkbox").is(':checked') && c.ensinanzas.indexOf("prim") !== -1) ||
                ($("#esp-checkbox").is(':checked') && c.ensinanzas.indexOf("esp") !== -1) ||
                ($("#eso-checkbox").is(':checked') && c.ensinanzas.indexOf("eso") !== -1) ||
                ($("#bac-checkbox").is(':checked') && c.ensinanzas.indexOf("bac") !== -1) ||
                ($("#fp-checkbox").is(':checked') &&  c.ensinanzas.indexOf("fp") !== -1) ||
                ($("#esa-checkbox").is(':checked') &&  c.ensinanzas.indexOf("eso") !== -1) ||
                ($("#baca-checkbox").is(':checked') &&  c.ensinanzas.indexOf("baca") !== -1);
    });

    filtered_centros = filtered_centros.filter(function (c) {
        return app.trash.indexOf(c.cod) === -1;
    });

    filtered_centros = filtered_centros.filter(function (c) {
        return  ($("#ceip-checkbox").is(':checked') && c.nombre.startsWith("CEIP")) ||
                ($("#eei-checkbox").is(':checked') && c.nombre.startsWith("EEI")) ||
                ($("#cep-checkbox").is(':checked') && c.nombre.startsWith("CEP")) ||
                ($("#cra-checkbox").is(':checked') && c.nombre.startsWith("CRA")) ||
                ($("#ies-checkbox").is(':checked') && c.nombre.startsWith("IES")) ||
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

    var centros = app.centros;
    centros = app.filter(centros);
    centros = app.sort(centros);

    var innerHTML = Handlebars.templates.centros({
        "centros": centros
    });

    $("main#list").html(innerHTML);
};
