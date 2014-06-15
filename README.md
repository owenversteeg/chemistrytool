chemistryassistant
==================

Type anything into a box and Chemistry Assistant will recognize what it is and tell you about it.

Fixed electron data scraped from Wikipedia with:

```
var configs = []
for (var i=0; i<table.children.length; i++) {
if (Math.round((i-2)/3) === (i-2)/3) configs.push(table.children[i].innerHTML.split(':')[1].replace(/<\/th>/g,'').replace(/\n/g,'').replace(/ /g,''));
}
```
