(function ($) {
    Core.traitize = function ()
    {
        var args = [].slice.call(arguments),
            module = args.shift().prototype,
            traits = args.map(function (trait) {
                return trait.prototype;
            });
        $.extend.bind(null, module).apply(null, traits);
        return module;
    };

    $.extend($, Core);
})(jQuery);