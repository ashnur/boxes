void function(root){
    var boxes = require('../')
        , test = require('tape')
        , fs = require('fs')
        , tpl1 = '<div id="test1"><p></p></div>'
        , tpl2 = '<div id="test2"></div>'
        , tpl3 = '<div id="test3"></div>'
        , box1 = boxes.make(tpl1)
        , box2 = boxes.make(tpl2)
        , box3 = boxes.make(tpl3)
        ;


    test('boxes', function(t){
        t.plan(3)

        box1.change({'#test1 p':{ _text: 'whatever'}})
        t.equal(box1+'', '<div id="test1"><p>whatever</p></div>')

        box1.change({'#test1 p':{_text:'dafuq'}})
        box3.change({'#test3':{_node:box1.self}})
        box2.change({'#test2':{_node:box3.self}})
        t.equal(box2+'', '<div id="test2"><div id="test3"><div id="test1"><p>dafuq</p></div></div></div>')

        box1.change({'#test1 p':{ _text:'whatever'}})
        box1.appendTo(document.body)
        t.equal(document.getElementById('test1').outerHTML, '<div id="test1"><p>whatever</p></div>')
    })

}(this)
