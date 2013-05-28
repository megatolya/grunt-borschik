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

    grunt.registerMultiTask('borschik', 'Your task description goes here.', function() {
        var options = this.options({
                filePrefix: '_'
            }),
            promises = [],
            done = this.async(),
            tasks = [];

        this.files.forEach(function (f) {
            f.src.filter(function (filePath) {
                var outputPath = path.join(
                        path.dirname(filePath),
                        (options.filePrefix + path.basename(filePath))
                    ),
                    borschikOpts = extend(options, {
                        input: filePath,
                        output: outputPath
                    });

                tasks.push(function (callback) {
                    borschik(extend({}, borschikOpts)).then(function () {
                        callback(null);
                    }).fail(function (err) {
                        callback(err);
                    });
                    grunt.log.writeln('Done for file ' + outputPath);
                });
            });
        });
        async.series(tasks, function (err) {
            if (err)
                return grunt.log.error(err);
            done();
        });

    });

};
