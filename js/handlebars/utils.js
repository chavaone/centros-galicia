

/**
	@param {UNIX timestamp} timestamp - an unix timestamp in seconds
*/
Handlebars.registerHelper("prettyTime", function (seconds) {
    var ret = "",
        hours = Math.floor(seconds / 3600),
        minutes = Math.floor((seconds % 3600) / 60);
        secs = (seconds % 3600) % 60;

        if (hours) {
            ret = hours.toString() + "h ";
        }

        if (minutes) {
            ret = ret + minutes.toString() + "min. ";
        }

        if (seconds && ! ret) {
            ret = ret + secs.toString() + "sec. ";
        }

        return ret;

});

Handlebars.registerHelper("prettyDistance", function (distance) {

    if (distance < 1) {
        return (distance * 1000).toString() + " m.";
    }

    return Math.floor(distance).toString() + " km.";
});
