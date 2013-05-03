void function(root){
    var boxes = require('../')
        , expect = require('expect.js')
        , fs = require('fs')
        , tpl1 = '<div id="test1"><p></p></div>'
        , tpl2 = '<div id="test2"></div>'
        , tpl3 = '<div id="test3"></div>'
        , box1 = boxes.make(tpl1)
        , box2 = boxes.make(tpl2)
        , box3 = boxes.make(tpl3)
        ;


    describe('boxes', function(){
        it('expects to compile the variable into the template', function(){
            box1.change({'#test1 p':{ _text: 'whatever'}})
            expect(box1+'').to.be('<div id="test1"><p>whatever</p></div>')
        })

        it('expects boxes to be embeddadle ', function(){
            box1.change({'#test1 p':{_text:'dafuq'}})
            box3.change({'#test3':{_node:box1.self}})
            box2.change({'#test2':{_node:box3.self}})
            expect(box2+'').to.be('<div id="test2"><div id="test3"><div id="test1"><p>dafuq</p></div></div></div>')
        })

        it('expects boxes to be added to the dom', function(done){
            box1.change({'#test1 p':{ _text:'whatever'}})
            box1.appendTo(document.body)
            expect(document.getElementById('test1').outerHTML).to.be('<div id="test1"><p>whatever</p></div>')
            done()
        })
    })

}(this)
