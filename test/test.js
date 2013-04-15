void function(root){
    var boxes = require('../')
        , expect = require('expect.js')
        , fs = require('fs')
        , tpl1 = '#test1\n  %p= @content'
        , tpl2 = '#test2 != @content'
        , tpl3 = '#test3 != @content'
        , box1 = boxes.make(tpl1)
        , box2 = boxes.make(tpl2)
        , box3 = boxes.make(tpl3)
        ;


    describe('boxes', function(){
        it('expects to compile the variable into the template', function(){
            box1.content = 'whatever'
            expect(box1+'').to.be('<div id=\'test1\'>\n  <p>whatever</p>\n</div>')
        })

        it('expects boxes to be embeddadle ', function(){
            box2.content = box3
            box3.content = box1
            box1.content = 'dafuq'
            expect(box2+'').to.be('<div id=\'test2\'><div id=\'test3\'><div id=\'test1\'>\n  <p>dafuq</p>\n</div></div></div>')
        })
    })

}(this)
