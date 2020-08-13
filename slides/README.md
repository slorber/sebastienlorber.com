Slides are using Spectacle

Run (in folder):

```
spectacle --src gatsby-expo.mdx --theme theme.js --template template.js
```

Build (in folder):

```
rm -rf dist && spectacle --src gatsby-expo.mdx --theme theme.js --template template.js --action build && cp -R logos dist/logos && cp *.png *.jpg *.jpeg dist && serve dist
```


