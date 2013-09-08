pinocchio
=========

Collection of front-end javascript libraries with custom code and examples.  For straight forward prototyping of one-page web applications.

How the hell do I get started?
------------------------------
That's coming soon.  Just start with pinocchio.html file and good luck for now.


Structure
---------
This "stack" is presented as a very bland web page.  As such, the structure is given similar to a web page.  The general layout is given below.

### main files
/
/pinocchio.html
/server.py

The above include the example application entry point as well as a bottle.py based web server to play with the system locally on your machine.


### general web files
/css
/img

Stylesheets and image resources are unsurprisingly located here.


### javascript
/js
/js/lib
/js/pinocchio

All javascript files are in the js directory.  Within the lib folder are all of the 3rd party resources this whole stack heavily leans on.  The pinocchio folder is the glue for the core App / View / Model / Service approach customized for this stack.

## templates
/templates

This system uses Handlebars and ICanHaz to template out HTML resources.  It dynamically loads templates for the applications, and I like to keep them all together in this folder.

Pinocchio Classes
-----------------
### pinocchio
    + EVENT
    View
    Model
    App
    Service

### pinocchio.security
    SecurityCredential
    BasicAuthSecurity
    CookieSecurity
    PassiveSecurity

### pinocchio.util
    + get_expansion


Other Libraries
--------------

### Core
    "js/lib/jquery-1.7.2.min.js",
    "js/lib/ICanHandlebarz.js",
    "js/lib/handlebars-1.0.0.beta.6.js",
    "js/lib/extend.min.js",
    "js/lib/my.class.min.js",
    "js/lib/radio.min.js",
    "js/lib/murmurhash3_gc.js"

### UI
    "js/lib/jquery.pajinate.min.js",
    "js/lib/bootstrap.min.js",
    "js/lib/toastr.min.js"

### Util
    "js/lib/underscore-min.js",
    "js/lib/date.js",
    "js/lib/LocalDB.min.js",
    "js/lib/jquery.cookie.js",
    "js/lib/rainbowvis.js"

### Internationalization
    "js/lib/i18next-1.3.3.js"

### Mobile
    "js/lib/ua.js",
    "js/lib/swipe.min.js"

### Charting
    "js/lib/jquery.sparkline.min.js",
    "js/lib/d3.v3.min.js"


Included Example
----------------
Follow the pinocchio.html source to walk through most of the intended strucutre
and overall goal of the "stack".  There isn't much to it, and that's sort of the
point of this thing.  More specifics to be added here later.

