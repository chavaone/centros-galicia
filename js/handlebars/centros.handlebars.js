(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['centros'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<article class=\"centro\" data-cod-centro=\""
    + alias4(((helper = (helper = helpers.cod || (depth0 != null ? depth0.cod : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cod","hash":{},"data":data}) : helper)))
    + "\">\n    <header class=\"row\">\n        <div class=\"col-sm-8\">\n            <h4>"
    + alias4(((helper = (helper = helpers.nombre || (depth0 != null ? depth0.nombre : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nombre","hash":{},"data":data}) : helper)))
    + "</h4>\n            <span class=\"codigo\">"
    + alias4(((helper = (helper = helpers.cod || (depth0 != null ? depth0.cod : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cod","hash":{},"data":data}) : helper)))
    + "</span>\n        </div>\n        <div class=\"col-sm-3\">\n            <div>"
    + alias4(((helper = (helper = helpers.concello || (depth0 != null ? depth0.concello : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"concello","hash":{},"data":data}) : helper)))
    + "</div>\n            <div>"
    + alias4(((helper = (helper = helpers.provincia || (depth0 != null ? depth0.provincia : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"provincia","hash":{},"data":data}) : helper)))
    + "</div>\n        </div>\n        <div class=\"col-sm-1\">\n            <i class=\"fa fa-arrows-alt sortable-handle\" aria-hidden=\"true\"></i>\n            <i class=\"fa fa-trash\" aria-hidden=\"true\" onclick=\"app.trash.push("
    + alias4(((helper = (helper = helpers.cod || (depth0 != null ? depth0.cod : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cod","hash":{},"data":data}) : helper)))
    + "); app.load_data();\"></i>\n        </div>\n    </header>\n\n    <section class=\"row osm align-items-end\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.osm : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </section>\n</article>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "            <div class=\"col-md-2\">\n                <img width=\"25\" src=\"img/distanceicon.png\" alt=\"Distancia en linea recta\" /><span>"
    + alias3((helpers.prettyDistance || (depth0 && depth0.prettyDistance) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.osm : depth0)) != null ? stack1.distancia : stack1),{"name":"prettyDistance","hash":{},"data":data}))
    + "</span>\n            </div>\n            <div class=\"col-md-2\">\n                <img width=\"25\" src=\"img/timeicon.png\" alt=\"Tiempo en coche\" /><span>"
    + alias3((helpers.prettyTime || (depth0 && depth0.prettyTime) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.osm : depth0)) != null ? stack1.tiempo : stack1),{"name":"prettyTime","hash":{},"data":data}))
    + "</span>\n            </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.centros : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
})();