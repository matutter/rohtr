rohtr
=================

A classic router for nodejs built around pug.compileTemplate. Page defined modules can be use by naming the script the same as the folder, or index.js/.pug.


```javascript
//from ./test

var options = {
	root : './tests/sample/',       // this is the path to the site root, by default this is './routes'
	rewrite: {		                // simple rewrite rules, if the folder is named 'sample' it's url will not be '/'
		'sample' : '/'
	},
	defaultUrl:  '/',               // When no route can be found this one is used instead
	template : {                    // options passed to pug.compileFile
		pretty: true
	}
}

require('rohtr')(options)
.then(router => {
	route = router.getRoute('/')
})
.catch(error => {
	console.log(error.stack)
})

```

Folder structure
```
root
├── root.js         // 1. This is loaded and is called as the handler
├── root.pug        // 2. This is loaded into a Route.render method
├─┬ page            // 3. This page is empty and uses a default handler, urls that go here are routed to the Router.defaultRoute
│ └─┬ page2         // 4. This is accessible as /page/page2, even though /page is not accessible 
│   └── index.pug   
└─┬ leafpage
  └── leafpage.js   // 5. If this route overrides the 'isLeaf' property, it will be routed to when 
                    //    urls contain '/leafpage' in it's path such as '/leafpage/data/123'
                    //    The handler will receive ['data', '123'] as an argument
```