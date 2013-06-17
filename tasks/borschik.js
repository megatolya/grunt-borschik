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
        async = require('async'),
        Q = require('q');

    grunt.registerMultiTask('borschik', 'Implements original borschik functionality.', function() {
        var options = this.options({
                filePrefix: '_',
                beforeBuild: function() {},
                afterBuild: function() {}
            }),
            promises = [],
            done = this.async(),
            tasks = [];

        options.beforeBuild();
        this.files.forEach(function (f) {
            f.src.filter(function (filePath) {
                var outputPath = path.join(
                        path.dirname(filePath),
                        (options.filePrefix + path.basename(filePath))
                    ),
                    _opts = extend({}, options),
                    opts = extend(_opts, {
                        input: filePath,
                        output: outputPath
                    });

                tasks.push(function (callback) {
                    borschik(extend({}, opts)).then(function () {
                        grunt.log.write(outputPath + '...').ok();
                        callback(null);
                    }).fail(function (err) {
                        callback(err);
                    });
                });
            });
        });
        async.series(tasks, function (err) {
            if (err)
                return grunt.log.error(err);

            options.afterBuild();
            done();
        });

    });

};
