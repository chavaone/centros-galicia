(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['modalexport'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<p>No seguinte cadro podes ver os códigos de todos os centros que tiñas na lista por orde:</p>\n<code class=\"codigos\">\n"
    + container.escapeExpression(((helper = (helper = helpers.paste || (depth0 != null ? depth0.paste : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"paste","hash":{},"data":data}) : helper)))
    + "\n</code>\n<p>\n   Para empregar esta lista directamente na aplicación da Xunta de Galicia do CAPD copia os códigos anteriores seleccionandoos todos e premendo <kbd>Ctrl</kbd> + <kbd>C</kbd> ou a opción de copiar pulsando o botón dereito do rato. A continuación arrastra a seguinte ligazón a túa barra de marcadores:\n</p>\n<p style=\"text-align:center;\"><a class=\"btn btn-dark\" href=\"javascript:(function(){function%20add_place%20%28code%29%20%7B%20%20%20%20document.getElementsByName%28%22cenloc%22%29%5B0%5D.value%20%3D%20code%3B%20%20%20%20aplicarCambio%28%29%3B%7Dvar%20centros%20%3D%20prompt%28%22Introduce%20os%20c%F3digos%20dos%20centros%20separados%20con%20espacios%22%29%2C%20%20%20%20lista_centros%20%3D%20centros.split%28%22%20%22%29%3Bfor%20%28var%20i%20%3D%200%3B%20i%20%3C%20lista_centros.length%3B%20i++%29%20%7B%20%20%20%20add_place%28lista_centros%5Bi%5D%29%3B%7D}());\">Engadir Códigos CAPD/CXT</a></p>\n<p>Debemos marcar as opcións de Corpo de participación, Especialidade, Linguas, Afín ou Itinerante e marcar a opción de “debe engadirse ao final da lista”. Facemos click sobre o marcador que arrastramos anteriormente a barra de marcadores e pegamos os códigos no cadro que aparece prendendo OK a continuación.</p>\n";
},"useData":true});
})();
