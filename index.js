void function(root){
    var viral = require('viral')
        , haml= require('haml')
        , boxes = viral.extend({
            init: function(tpl){ this.tpl = haml.optimize(haml.compile(tpl))}
            , toString: function(){ return haml.execute(this.tpl, this) }

        })
        ;

    if ( module !== undefined && module.exports ) {
        module.exports = boxes
    } else {
        root.factory = boxes
    }
}(this)
