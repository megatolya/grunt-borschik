/*
 * grunt-borschik
 * https://github.com/megatolya/grunt-borschik
 *
 * Copyright (c) 2013 Anatoliy Ostrovskiy
 * Licensed under the MIT license.
 */

"use strict";

function extend (a, b) { for (var x in b) {a[x] = b[x];  } return a; }

module.exports = function (grunt) {
    var borschik = require('borschik').api,
        path = require('path'),
        q = require('q');

    grunt.registerMultiTask('borschik', 'Implements original borschik functionality.', function() {
        var options = this.options({
                filePrefix: '_',
                beforeBuild: function() {},
                afterBuild: function() {}
            }),
            promises = [],
            done = this.async();

        options.beforeBuild();
        this.files.forEach(function (file) {
            file.src.filter(function (filePath) {

                var outputPath = file.dest ? file.dest : path.join(
                        path.dirname(filePath),
                        (options.filePrefix + path.basename(filePath))
                    ),
                    _opts = extend({}, options),
                    opts = extend(_opts, {
                        input: filePath,
                        output: outputPath
                    });
                    
                if (file.dest && !grunt.file.exists(path.dirname(outputPath))) {
                    grunt.file.mkdir(path.dirname(outputPath));
                }

                grunt.log.writeln(filePath);
                promises.push(borschik(extend({}, opts)));
            });
        });

        q.all(promises).then(function() {
            options.afterBuild(null);
            done();
        }).fail(function(err) {
            options.afterBuild(err);
            grunt.fail.warn(err);
        });

    });

};
