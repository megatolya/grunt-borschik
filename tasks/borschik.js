/*
 * grunt-borschik
 * https://github.com/megatolya/grunt-borschik
 *
 * Copyright (c) 2013 Anatoliy Ostrovskiy
 * Licensed under the MIT license.
 */

"use strict";

function extend (a, b) { for (var x in b) {a[x] = b[x]; return a; } }

module.exports = function (grunt) {
    var borschik = require('borschik').api,
        path = require('path'),
        async = require('async'),
        Q = require('q');

    grunt.registerMultiTask('borschik', 'Your task description goes here.', function() {
        var options = this.options({
                filePrefix: '_'
            }),
            promises = [],
            done = this.async(),
            tasks = [];

        this.files.forEach(function (f) {
            f.src.filter(function (filepath) {
                var outputPath = path.join(
                    path.dirname(filepath),
                    (options.filePrefix + path.basename(filepath))
                );

                (function (filePath) {
                    tasks.push(function (callback) {
                        borschik(extend(options, {
                            input: filePath,
                            output: outputPath
                        })).then(function () {
                            callback(null);
                        }).fail(function (err) {
                            callback(err);
                        });
                    });
                })(filepath);
            });
        });
        async.series(tasks, function () {
            console.log('done');
            done();
        });

    });

};
