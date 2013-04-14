void function(root){
    var viral = require('viral')
        , hamlcoffee = require('haml-coffee')
        , boxes = viral.extend({
            init: function(tpl){
                this.tpl = hamlcoffee.compile(tpl)
            }
            , toString: function(){ return this.tpl(this) }

        })
        ;

    if ( module !== undefined && module.exports ) {
        module.exports = boxes
    } else {
        root.factory = boxes
    }
}(this)
