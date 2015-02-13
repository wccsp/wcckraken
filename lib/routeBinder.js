
module.exports =  {
    bind: function(router, routes, controller) {

        for (var i = 0; i < routes.length; i ++) {
            var route = routes[i],
                http = route.http || 'get',
                args = [];

            if (route.methods instanceof Array) {
                args = route.methods.map(function(method) {
                    return controller[method];
                });
            } else {
                args = [controller[route.methods]];
            }
            args.unshift(route.path);

            router[http].apply(router, args);
        }
    }
};
