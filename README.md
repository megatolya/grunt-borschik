# grunt-borschik

> Extendable builder for text-based file  formats

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-borschik --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-borschik');
```

## The "borschik" task

### Overview
In your project's Gruntfile, add a section named `borschik` to the data object passed into `grunt.initConfig()`.

### Example of use

```js
grunt.initConfig({
    borschik: {
        firefox: {
            src: ['pages-desktop/common/common.css'],
            options: {
                minimize: false
            }
        },
        ie: {
            src: ['pages-desktop/common/common.ie**.css'],
            options: {
                minimize: true,
                tech: './techs/css-fast',
                beforeBuild: function() {
                    console.log('it will be in console before all imports');
                },
                afterBuild: function(err) {
                    // err can be Error or null
                    !err && console.log('it will be in consoled if succeed');
                }
            }
        },
        chrome: {
            src: ['pages-desktop/common/common.ch.css'],
            dest: ['pages-desktop/common/common.min.css'],
            options: {
                minimize: false
            }
        }
    }
})
```
