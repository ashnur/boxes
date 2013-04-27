void function(root){
    var boxes = require('../')
        , expect = require('expect.js')
        , fs = require('fs')
        , tpl1 = '#test1.box \n  %p= this.content'
        , tpl2 = '#test2.box  != this.content'
        , tpl3 = '#test3.box  != this.content'
        , box1 = boxes.make(tpl1)
        , box2 = boxes.make(tpl2)
        , box3 = boxes.make(tpl3)
        , bonzo = require('bonzo')
        ;


    describe('boxes', function(){
        it('expects to compile the variable into the template', function(){
            box1.content = 'whatever'
            expect(box1+'').to.be('<div class="box" id="test1"><p>whatever</p></div>')
        })

        it('expects boxes to be embeddadle ', function(){
            box2.content = box3
            box3.content = box1
            box1.content = 'dafuq'
            expect(box2+'').to.be('<div class="box" id="test2"><div class="box" id="test3"><div class="box" id="test1"><p>dafuq</p></div></div></div>')
        })

        it('expects boxes to beadded to the dom', function(done){
            box1.content = 'whatever'
            box1.appendTo(document.body)
            expect(document.getElementById('test1').outerHTML).to.be('<div class="box" id="test1"><p>whatever</p></div>')
            done()
        })
        it('expects boxes to update the dom when content is changed', function(done){
            box1.set('content', 'dafuq')
            expect(document.getElementById('test1').outerHTML).to.be('<div class="box" id="test1"><p>dafuq</p></div>')
            done()
        })
    })

}(this)
