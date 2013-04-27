void function(root){

    function toString(box, locals){
        return haml.execute(box.tpl, box, locals)
    }

    function element(box, force){
        if ( force || !box.self ){
            box.self = bonzo.create(toString(box))
        }
        return box.self
    }

    function draw(box){
        var elem = element(box)
        bonzo(elem).replaceWith(element(box, true))
    }

    function set(box, name, value){
        box[name] = value
        bean.fire(boxes, 'draw', [box])
    }

    function appendTo(box, elem){ bonzo(elem).append(element(box)) }
    function prependTo(box, elem){ bonzo(elem).prepend(element(box)) }

    var viral = require('viral')
        , haml= require('haml')
        , u = require('totemizer')
        , boxes = viral.extend({
            init: function(tpl){ this.tpl = haml.optimize(haml.compile(tpl)) }
            , toString: u.enslave(toString)
            , element: u.enslave(element)
            , set: u.enslave(set)
            , draw: u.enslave(draw)
            , appendTo: u.enslave(appendTo)
        })
        , bonzo = require('bonzo')
        , bean = require('bean')
        ;

    bean.on(boxes, 'draw', function(box){
        draw(box)
    })

    if ( module !== undefined && module.exports ) {
        module.exports = boxes
    } else {
        root.factory = boxes
    }

}(this)
