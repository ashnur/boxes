void function(root){
    var boxes = require('../')
        , tape = require('tape')
        , fs = require('fs')
        , tpl = fs.readFileSync(__dirname +'/tpl.hamlc', 'utf8')
        , box = boxes.make(tpl)
        ;

    box.content = 'whatever'

    console.log(root.document)

    tape('compile', function(t){
        t.equal(box+'', '<div id=\'test\'>\n  <p>whatever</p>\n</div>')
        t.end()
    })


}(this)
