describe('oval-compiler', function () {
  var compiler = require('../../lib/compilers/tag-file')
  it('compiles', function () {
    var content = `<tag-name>
    <script>
      var constructorCode = true
    </script>
    <h1>html test</h1>
  </tag-name>
`

    var expectedCompiledCode = `class Tag {
    constructor (root, props, attrs) {
      var tag = this
      var tagAttrs = {}
      attrs = attrs || {}
      for (var key in tagAttrs) {
        attrs[key] = attrs[key] || tagAttrs[key]
      }
      oval.BaseTag(tag, root, props, attrs)
      var constructorCode = true
      tag.render = function (createElement) {
        return <virtual><h1>html test</h1></virtual>
      }
    }
  }
  oval.registerTag('tag-name', Tag)
  export default Tag
`

    var compiled = compiler.compile(content)
    expect(compiled.trim().replace(/ /g, '').replace(/\n/g, '')).to.eq(expectedCompiledCode.trim().replace(/ /g, '').replace(/\n/g, ''))
  })
})
