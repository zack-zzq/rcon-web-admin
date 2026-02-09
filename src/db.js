"use strict";

var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
var fs = require("fs");
var hash = require(__dirname + "/hash");

/**
 * LowDB helper
 */
var db = {};

/**
 * The db defaults
 * @type {object<string, *>}
 * @private
 */
db._defaults = {
    "steamapi": {},
    "servers": {},
    "settings": {},
    "users": {},
    "widgets": { "list": [] }
};

/**
 * Cache for db instances
 * @type {object}
 * @private
 */
db._cache = {};

/**
 * Get lowdb instance
 * @param {string} file
 * @param {string=} folder
 * @returns {Low}
 */
db.get = function (file, folder) {
    var path = __dirname + '/../db';
    if (folder) path += "/" + folder;
    path += "/" + file + ".json";

    // Use cached instance if available
    if (db._cache[path]) {
        return db._cache[path];
    }

    // Ensure directory exists
    var dir = require("path").dirname(path);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // Create adapter and db instance
    var adapter = new FileSync(path);
    var inst = low(adapter);

    // Set defaults if defined
    if (typeof db._defaults[file] != "undefined") {
        var defaults = Object.assign({}, db._defaults[file]);
        if (file == "settings") {
            defaults.salt = hash.random(64);
        }
        inst.defaults(defaults).write();
    }

    // Cache the instance
    db._cache[path] = inst;

    return inst;
};

module.exports = db;