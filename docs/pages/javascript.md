## Methods

All of these achieve the same thing.

``` js
const o = {
  fn: function () {
      // do something
  }
}

const o = {
  fn: () => {
      // do something
  }
}

const o = {
  fn () {
      // do something
  }
}

// run - do something
o.fn
```

## Base of Full Pathname

``` js
const path = require('path')
const file = '/home/user/dir/file.txt'

path.parse(file).base // file.txt
path.basename(file) // file.txt
```