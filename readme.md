# Usage
```npm install``` to install dependencies
`gulp` to start a Live Reload enabled Browser-Sync server
`gulp build` to build static assets
`gulp deploy` to build static assets & upload them to GH Pages

## Slim
We need Slim in version 3.0.2 or greater. If you don't have Slim installed, please install Ruby (and RubyGems) first and run
`gem install slim -v '>= 3.0.2'`

If you already have Slim installed, make sure you are using the latest version:
`gem update slim`


This framework is using:
- [PostCSS](https://github.com/postcss/postcss)
- [Lost](https://github.com/peterramsing/lost)
- [Rucksack](https://simplaio.github.io/rucksack/)
- [Autoprefixer(through Rucksack)](http://simplaio.github.io/rucksack/docs/#autoprefixing)
- [Browser-Sync](https://www.browsersync.io/)

## To Do
- [x] move HTML, images to src folder
- [x] add minification to build process
- [x] optimize images
- [x] minify css
