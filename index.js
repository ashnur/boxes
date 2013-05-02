void function(root){

    function toString(box){
        return elements(box.self).map(function(el){ return el.outerHTML }).join('')
    }

    function elements(els){
        return els.map(function(el){return el})
    }
    function draw(box){
        var elem = element(box)
        bonzo(elem).replaceWith(element(box, true))
    }

    function change(box, updates){
        u.forEachOwn(updates, function(selector){
            var parts = selector.match(/(.*)(_(text|html))/)
            var elements = qwery(parts[1], box.self)
            var id = 'asldjkwquealkfmasivyyzxyciweooruaksdjaswaljd'

            if ( ! elements.length ) {
                elements = qwery('#'+id+' > '+parts[1], bonzo(bonzo.create('<div>')).attr('id', id).append(box.self))
            }

            var value = updates[selector]

            if ( elements.length ) {
                switch ( parts[2] ) {
                    case '_text':
                        bonzo(elements).text(value)
                        break
                    case '_html':
                        bonzo(elements).html(domify(value))
                        break
                    default:
                        bonzo(elements).html(domify(value))
                }
            }
        })
    }

    function set(box, name, value){
        box[name] = value
        bean.fire(boxes, 'draw', [box])
    }

    function appendTo(box, elem){ bonzo(box.self).appendTo(elem) }
    function prependTo(box, elem){ dom(box.self).prependTo(elem) }

    var viral = require('viral')
        , u = require('totemizer')
        , bonzo = require('bonzo')
        , qwery = require('qwery')
        , domify = require('domify')
        , boxes = viral.extend({
            init: function(tpl){
                this.self = bonzo(domify(tpl))
            }
            , toString: u.enslave(toString)
            , change: u.enslave(change)
            , draw: u.enslave(draw)
            , appendTo: u.enslave(appendTo)
            , prependTo: u.enslave(prependTo)
        })
        , bean = require('bean')
        ;


    bean.on(boxes, 'draw', draw)

    if ( module !== undefined && module.exports ) {
        module.exports = boxes
    } else {
        root.factory = boxes
    }

}(this)
