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
            var elements = qwery(selector, box.self)
                , id = 'asldjkwquealkfmasivyyzxyciweooruaksdjaswaljd'

            if ( ! elements.length ) {
                elements = qwery('#'+id+' > '+selector, bonzo(bonzo.create('<div>')).attr('id', id).append(box.self))
            }

            if ( elements.length ) {
                elements = bonzo(elements)
                u.forEachOwn(updates[selector], function(name){
                    var value = updates[selector][name]
                    switch ( name ) {
                        case '_text':
                            elements.text(value)
                            break
                        case '_html':
                            elements.html(domify(value))
                            break
                        case '_node':
                            elements.empty()
                            elements.append(value)
                            break
                        default:
                            elements.attr(name, domify(value))
                    }
                })
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
