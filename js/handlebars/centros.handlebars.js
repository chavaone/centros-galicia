(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['centros'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<article class=\"centro\" data-cod-centro=\""
    + alias4(((helper = (helper = helpers.cod || (depth0 != null ? depth0.cod : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cod","hash":{},"data":data}) : helper)))
    + "\">\n    <header>\n        <h4>"
    + alias4(((helper = (helper = helpers.nombre || (depth0 != null ? depth0.nombre : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nombre","hash":{},"data":data}) : helper)))
    + "</h4>\n        <div class=\"pull-right\">\n            <div>"
    + alias4(((helper = (helper = helpers.concello || (depth0 != null ? depth0.concello : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"concello","hash":{},"data":data}) : helper)))
    + "</div>\n            <div>"
    + alias4(((helper = (helper = helpers.provincia || (depth0 != null ? depth0.provincia : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"provincia","hash":{},"data":data}) : helper)))
    + "</div>\n        </div>\n        <i class=\"fa fa-arrows-alt sortable-handle\" aria-hidden=\"true\"></i>\n        <i class=\"fa fa-trash\" aria-hidden=\"true\" onclick=\"app.trash.push("
    + alias4(((helper = (helper = helpers.cod || (depth0 != null ? depth0.cod : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cod","hash":{},"data":data}) : helper)))
    + "); app.load_data();\"></i>\n    </header>\n</article>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.centros : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
})();