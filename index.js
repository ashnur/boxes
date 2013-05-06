void function(root){
    'use strict'

    function toString(box){
        return elements(box.self).map(function(el){ return el.outerHTML }).join('')
    }

    function elements(els){
        return els.map(function(el){return el})
    }

    function find(box, selector){
        var elements = qwery(selector, box.self)
            , id = 'asldjkwquealkfmasivyyzxyciweooruaksdjaswaljd'
        if ( ! elements.length ) {
            elements = qwery('#'+id+' > '+selector, bonzo(bonzo.create('<div>')).attr('id', id).append(box.self))
        }
        return elements
    }

    function change(box, updates){
        u.forEachOwn(updates, function(selector){
            var elements = find(box, selector)
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

    function appendTo(box, elem){ bonzo(box.self).appendTo(elem) }
    function prependTo(box, elem){ bonzo(box.self).prependTo(elem) }

    var viral = require('viral')
        , u = require('totemizer')
        , domify = require('domify')
        , qwery = require('qwery')
        , bonzo = require('bonzo')
        , boxes = viral.extend({
            init: function(tpl){ this.self = bonzo(domify(tpl)) }
            , toString: u.enslave(toString)
            , change: u.enslave(change)
            , appendTo: u.enslave(appendTo)
            , prependTo: u.enslave(prependTo)
            , find: u.enslave(find)
        })


    if ( module !== undefined && module.exports ) {
        module.exports = boxes
    } else {
        root.factory = boxes
    }

}(this)
