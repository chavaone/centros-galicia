(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['modallocalizacion'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"modal-content\">\n<p>Por defecto este sitio emprega a túa localización actual solicitandolle esta información ó teu navegador. Para modificar esta posición haciendo click en el siguiente mapa:</p>\n <div id=\"mapaposicion\"></div>\n <script type=\"text/javascript\">\n    app.map = L.map('mapaposicion').setView([43, -8], 8);\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n         attribution: '&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>',\n         maxZoom: 20,\n     }).addTo(app.map);\n     app.map.on('click', app.map_click);\n </script>\n</div>\n";
},"useData":true});
})();