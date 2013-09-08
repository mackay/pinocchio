
extend('pinocchio.data',{
    mock: {

        some_list: [
            {
                id: "/thing/1",
                message: "Hello, world!"
            },
            {
                id: "/thing/2",
                message: "Goodbye, world!"
            }
        ]
    }
});

extend('pinocchio.mock',{

    App: my.Class(pinocchio.App, {

        STATIC: {
            MOCK_SERVICE: "mock_svc",

            MOCK_MODEL: "mock_model",

            MOCK_VIEW_DELAY: "mock_delayed_view",

            _generic_svc_failure: function( message ) {
                toastr.error( "Service call failed with message... " + message + "  You may need to refresh the page on your browser, sorry!");
            },
        },

        _some_bag: { },


        constructor: function( name, security, services ) {
            pinocchio.mock.App.Super.call(this, name, security, services);

            radio('/mock_event/yack').subscribe([this.respond_to_a_yack, this]);

            //just in case someone stops toastr from being loaded...
            if( !toastr ) {
                var msg = function(message) {
                    console.log(message);
                };

                toastr = {
                    error: msg,
                    info: msg,
                    success: msg,
                    warning: msg
                };
            }
            //validate some of the current service info
            try {
                if( this.services[pinocchio.mock.App.MOCK_SERVICE] === null ) {
                    toastr.error("Missing a required service for the Mock application!");
                    return;
                }
            }
            catch(ex) {
                toastr.error("Critical error validating required services.");
            }
        },
        init: function( ) {
            var app = this;

            //we've got to "initialize" our application, so make some calls
            this.services[pinocchio.mock.App.MOCK_SERVICE].get_some_data( "param", function(data) { app.set_the_yack_data(data); }, pinocchio.mock.App._generic_svc_failure );
            this.services[pinocchio.mock.App.MOCK_SERVICE].get_some_data_and_fail( "param", function(data) { app.set_the_yack_data(data); }, pinocchio.mock.App._generic_svc_failure );

            //validate some of the current views
            try {
                var view = this.get_view(pinocchio.mock.App.MOCK_VIEW_DELAY);
            }
            catch(ex) {
                toastr.error("Critical error - we don't have all of our demo views");
            }
        },
        set_the_yack_data: function(data) {

            //we got some data!  what a great day.  we can store it here if we
            //   really have some oddball reason to do it.
            this._some_bag["data"] = data;

            //get the model that we know our business logic should mess with
            var model = this.get_model(pinocchio.mock.App.MOCK_MODEL);
            model.set_a_list(data);

            //now we should have had any views auto-updating be updated by now,
            //   but a straggler view should not be auto-updating, we have to
            //   manually render this guy, so we do it on a long delay for fun
            var view = this.get_view(pinocchio.mock.App.MOCK_VIEW_DELAY);
            setTimeout(function() {
                view.render();
            }, 2500);
        },
        respond_to_a_yack: function(id) {
            //make a new yack
            var yack = { id:"/yack/" + murmurhash3_32_gc( Date().valueOf().toString() ), message: "Yacked back to " + id + "!" };
            this._some_bag["data"].push(yack);

            this.set_the_yack_data( this._some_bag["data"] );
        }
    }),

    View: my.Class(pinocchio.View, {
        update_count: 0,

        constructor: function( id, selector, model, update_on_change, render_on_change ) {
            pinocchio.mock.View.Super.call(this, id, selector, model, update_on_change, render_on_change );
        },

        update: function() {
            //do all kinds of stuff here...
            this.update_count++;

            //and THEN call the super (this is really important, or else RENDER
            //   can't get auto called).  Yes, there is a better way to do this,
            //   sure, I should get around to it...
            pinocchio.mock.View.Super.prototype.update.call(this);
        },

        render: function() {
            $(this.selector).html( ich.hello_world({}) );

            $(this.selector).append( ich.mock_template({mock_data:this.model.the_list}) );
        }
    }),

    Model: my.Class(pinocchio.Model, {
        the_list: null,

        constructor: function( id ) {
            pinocchio.mock.Model.Super.call(this, id);

            this.the_list = [ ];
        },

        set_a_list: function( some_list ) {
            this.the_list = some_list;
            this.changed();
        }
    }),

    Service: my.Class(pinocchio.Service, {
        constructor: function( base_url, security_credentials ) {
            pinocchio.mock.Service.Super.call(this, base_url, security_credentials );

        },

        get_some_data: function( some_param, callback_success, callback_failure ) {
            //delay the callback on our mock call to introduce some fake latency
            setTimeout( function() {
                callback_success( pinocchio.data.mock.some_list );
            }, 250);
        },

        get_some_data_and_fail: function( some_param, callback_success, callback_failure ) {

            //delay the callback on our mock call to introduce some fake latency
            setTimeout( function() {
                callback_failure( "All kinds of errors! You tried to use param " + some_param + ", which was an odd choice on your part." );
            }, 250);
        }
    }),
});

