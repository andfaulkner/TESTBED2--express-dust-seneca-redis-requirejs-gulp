var
    /** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.1.20 Copyright (c) 2010-2015, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
    //Not using strict: uneven strict support in browsers, #392, and causes
    //problems with requirejs.exec()/transpiler plugins that may not be strict.
    /*jslint regexp: true, nomen: true, sloppy: true */
    /*global window, navigator, document, importScripts, setTimeout, opera */
    requirejs$6823, require$6824, define$6825;
(function (global$6826) {
    var req$6827, s$6828, head$6829, baseElement$6830, dataMain$6831, src$6832, interactiveScript$6833, currentlyAddingScript$6834, mainScript$6835, subPath$6836, version$6837 = '2.1.20', commentRegExp$6838 = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm, cjsRequireRegExp$6839 = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g, jsSuffixRegExp$6840 = /\.js$/, currDirRegExp$6841 = /^\.\//, op$6842 = Object.prototype, ostring$6843 = op$6842.toString, hasOwn$6844 = op$6842.hasOwnProperty, ap$6845 = Array.prototype, isBrowser$6846 = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document), isWebWorker$6847 = !isBrowser$6846 && typeof importScripts !== 'undefined', //PS3 indicates loaded and complete, but need to wait for complete
        //specifically. Sequence is 'loading', 'loaded', execution,
        // then 'complete'. The UA check is unfortunate, but not sure how
        //to feature test w/o causing perf issues.
        readyRegExp$6848 = isBrowser$6846 && navigator.platform === 'PLAYSTATION 3' ? /^complete$/ : /^(complete|loaded)$/, defContextName$6849 = '_', //Oh the tragedy, detecting opera. See the usage of isOpera for reason.
        isOpera$6850 = typeof opera !== 'undefined' && opera.toString() === '[object Opera]', contexts$6851 = {}, cfg$6852 = {}, globalDefQueue$6853 = [], useInteractive$6854 = false;
    function isFunction$6855(it$6870) {
        return ostring$6843.call(it$6870) === '[object Function]';
    }
    function isArray$6856(it$6871) {
        return ostring$6843.call(it$6871) === '[object Array]';
    }
    function each$6857(ary$6872, func$6873) {
        if (ary$6872) {
            var i$6874;
            for (i$6874 = 0; i$6874 < ary$6872.length; i$6874 += 1) {
                if (ary$6872[i$6874] && func$6873(ary$6872[i$6874], i$6874, ary$6872)) {
                    break;
                }
            }
        }
    }
    function eachReverse$6858(ary$6875, func$6876) {
        if (ary$6875) {
            var i$6877;
            for (i$6877 = ary$6875.length - 1; i$6877 > -1; i$6877 -= 1) {
                if (ary$6875[i$6877] && func$6876(ary$6875[i$6877], i$6877, ary$6875)) {
                    break;
                }
            }
        }
    }
    function hasProp$6859(obj$6878, prop$6879) {
        return hasOwn$6844.call(obj$6878, prop$6879);
    }
    function getOwn$6860(obj$6880, prop$6881) {
        return hasProp$6859(obj$6880, prop$6881) && obj$6880[prop$6881];
    }
    function eachProp$6861(obj$6882, func$6883) {
        var prop$6884;
        for (prop$6884 in obj$6882) {
            if (hasProp$6859(obj$6882, prop$6884)) {
                if (func$6883(obj$6882[prop$6884], prop$6884)) {
                    break;
                }
            }
        }
    }
    function mixin$6862(target$6885, source$6886, force$6887, deepStringMixin$6888) {
        if (source$6886) {
            eachProp$6861(source$6886, function (value$6889, prop$6890) {
                if (force$6887 || !hasProp$6859(target$6885, prop$6890)) {
                    if (deepStringMixin$6888 && typeof value$6889 === 'object' && value$6889 && !isArray$6856(value$6889) && !isFunction$6855(value$6889) && !(value$6889 instanceof RegExp)) {
                        if (!target$6885[prop$6890]) {
                            target$6885[prop$6890] = {};
                        }
                        mixin$6862(target$6885[prop$6890], value$6889, force$6887, deepStringMixin$6888);
                    } else {
                        target$6885[prop$6890] = value$6889;
                    }
                }
            });
        }
        return target$6885;
    }
    function bind$6863(obj$6891, fn$6892) {
        return function () {
            return fn$6892.apply(obj$6891, arguments);
        };
    }
    function scripts$6864() {
        return document.getElementsByTagName('script');
    }
    function defaultOnError$6865(err$6893) {
        throw err$6893;
    }
    function getGlobal$6866(value$6894) {
        if (!value$6894) {
            return value$6894;
        }
        var g$6895 = global$6826;
        each$6857(value$6894.split('.'), function (part$6896) {
            g$6895 = g$6895[part$6896];
        });
        return g$6895;
    }
    function makeError$6867(id$6897, msg$6898, err$6899, requireModules$6900) {
        var e$6901 = new Error(msg$6898 + '\nhttp://requirejs.org/docs/errors.html#' + id$6897);
        e$6901.requireType = id$6897;
        e$6901.requireModules = requireModules$6900;
        if (err$6899) {
            e$6901.originalError = err$6899;
        }
        return e$6901;
    }
    if (typeof define$6825 !== 'undefined') {
        //If a define is already in play via another AMD loader,
        //do not overwrite.
        return;
    }
    if (typeof requirejs$6823 !== 'undefined') {
        if (isFunction$6855(requirejs$6823)) {
            //Do not overwrite an existing requirejs instance.
            return;
        }
        cfg$6852 = requirejs$6823;
        requirejs$6823 = undefined;
    }
    if (//Allow for a require config object
        typeof require$6824 !== 'undefined' && !isFunction$6855(require$6824)) {
        //assume it is a config object.
        cfg$6852 = require$6824;
        require$6824 = undefined;
    }
    function newContext$6868(contextName$6902) {
        var inCheckLoaded$6903, Module$6904, context$6905, handlers$6906, checkLoadedTimeoutId$6907, config$6908 = {
                //Defaults. Do not set a default for map
                //config to speed up normalize(), which
                //will run faster if there is no default.
                waitSeconds: 7,
                baseUrl: './',
                paths: {},
                bundles: {},
                pkgs: {},
                shim: {},
                config: {}
            }, registry$6909 = {},
            //registry of just enabled modules, to speed
            //cycle breaking code when lots of modules
            //are registered, but not activated.
            enabledRegistry$6910 = {}, undefEvents$6911 = {}, defQueue$6912 = [], defined$6913 = {}, urlFetched$6914 = {}, bundlesMap$6915 = {}, requireCounter$6916 = 1, unnormalizedCounter$6917 = 1;
        function trimDots$6918(ary$6935) {
            var i$6936, part$6937;
            for (i$6936 = 0; i$6936 < ary$6935.length; i$6936++) {
                part$6937 = ary$6935[i$6936];
                if (part$6937 === '.') {
                    ary$6935.splice(i$6936, 1);
                    i$6936 -= 1;
                } else if (part$6937 === '..') {
                    if (// If at the start, or previous value is still ..,
                        // keep them so that when converted to a path it may
                        // still work when converted to a path, even though
                        // as an ID it is less than ideal. In larger point
                        // releases, may be better to just kick out an error.
                        i$6936 === 0 || i$6936 === 1 && ary$6935[2] === '..' || ary$6935[i$6936 - 1] === '..') {
                        continue;
                    } else if (i$6936 > 0) {
                        ary$6935.splice(i$6936 - 1, 2);
                        i$6936 -= 2;
                    }
                }
            }
        }
        function normalize$6919(name$6938, baseName$6939, applyMap$6940) {
            var pkgMain$6941, mapValue$6942, nameParts$6943, i$6944, j$6945, nameSegment$6946, lastIndex$6947, foundMap$6948, foundI$6949, foundStarMap$6950, starI$6951, normalizedBaseParts$6952, baseParts$6953 = baseName$6939 && baseName$6939.split('/'), map$6954 = config$6908.map, starMap$6955 = map$6954 && map$6954['*'];
            if (//Adjust any relative paths.
                name$6938) {
                name$6938 = name$6938.split('/');
                lastIndex$6947 = name$6938.length - 1;
                if (// If wanting node ID compatibility, strip .js from end
                    // of IDs. Have to do this here, and not in nameToUrl
                    // because node allows either .js or non .js to map
                    // to same file.
                    config$6908.nodeIdCompat && jsSuffixRegExp$6840.test(name$6938[lastIndex$6947])) {
                    name$6938[lastIndex$6947] = name$6938[lastIndex$6947].replace(jsSuffixRegExp$6840, '');
                }
                if (// Starts with a '.' so need the baseName
                    name$6938[0].charAt(0) === '.' && baseParts$6953) {
                    //Convert baseName to array, and lop off the last part,
                    //so that . matches that 'directory' and not name of the baseName's
                    //module. For instance, baseName of 'one/two/three', maps to
                    //'one/two/three.js', but we want the directory, 'one/two' for
                    //this normalization.
                    normalizedBaseParts$6952 = baseParts$6953.slice(0, baseParts$6953.length - 1);
                    name$6938 = normalizedBaseParts$6952.concat(name$6938);
                }
                trimDots$6918(name$6938);
                name$6938 = name$6938.join('/');
            }
            if (//Apply map config if available.
                applyMap$6940 && map$6954 && (baseParts$6953 || starMap$6955)) {
                nameParts$6943 = name$6938.split('/');
                outerLoop:
                    for (i$6944 = nameParts$6943.length; i$6944 > 0; i$6944 -= 1) {
                        nameSegment$6946 = nameParts$6943.slice(0, i$6944).join('/');
                        if (baseParts$6953) {
                            for (//Find the longest baseName segment match in the config.
                                //So, do joins on the biggest to smallest lengths of baseParts.
                                j$6945 = baseParts$6953.length; j$6945 > 0; j$6945 -= 1) {
                                mapValue$6942 = getOwn$6860(map$6954, baseParts$6953.slice(0, j$6945).join('/'));
                                if (//baseName segment has config, find if it has one for
                                    //this name.
                                    mapValue$6942) {
                                    mapValue$6942 = getOwn$6860(mapValue$6942, nameSegment$6946);
                                    if (mapValue$6942) {
                                        //Match, update name to the new value.
                                        foundMap$6948 = mapValue$6942;
                                        foundI$6949 = i$6944;
                                        break outerLoop;
                                    }
                                }
                            }
                        }
                        if (//Check for a star map match, but just hold on to it,
                            //if there is a shorter segment match later in a matching
                            //config, then favor over this star map.
                            !foundStarMap$6950 && starMap$6955 && getOwn$6860(starMap$6955, nameSegment$6946)) {
                            foundStarMap$6950 = getOwn$6860(starMap$6955, nameSegment$6946);
                            starI$6951 = i$6944;
                        }
                    }
                if (!foundMap$6948 && foundStarMap$6950) {
                    foundMap$6948 = foundStarMap$6950;
                    foundI$6949 = starI$6951;
                }
                if (foundMap$6948) {
                    nameParts$6943.splice(0, foundI$6949, foundMap$6948);
                    name$6938 = nameParts$6943.join('/');
                }
            }
            // If the name points to a package's name, use
            // the package main instead.
            pkgMain$6941 = getOwn$6860(config$6908.pkgs, name$6938);
            return pkgMain$6941 ? pkgMain$6941 : name$6938;
        }
        function removeScript$6920(name$6956) {
            if (isBrowser$6846) {
                each$6857(scripts$6864(), function (scriptNode$6957) {
                    if (scriptNode$6957.getAttribute('data-requiremodule') === name$6956 && scriptNode$6957.getAttribute('data-requirecontext') === context$6905.contextName) {
                        scriptNode$6957.parentNode.removeChild(scriptNode$6957);
                        return true;
                    }
                });
            }
        }
        function hasPathFallback$6921(id$6958) {
            var pathConfig$6959 = getOwn$6860(config$6908.paths, id$6958);
            if (pathConfig$6959 && isArray$6856(pathConfig$6959) && pathConfig$6959.length > 1) {
                //Pop off the first array value, since it failed, and
                //retry
                pathConfig$6959.shift();
                context$6905.require.undef(id$6958);
                //Custom require that does not do map translation, since
                //ID is "absolute", already mapped/resolved.
                context$6905.makeRequire(null, { skipMap: true })([id$6958]);
                return true;
            }
        }
        function splitPrefix$6922(name$6960) {
            var prefix$6961, index$6962 = name$6960 ? name$6960.indexOf('!') : -1;
            if (index$6962 > -1) {
                prefix$6961 = name$6960.substring(0, index$6962);
                name$6960 = name$6960.substring(index$6962 + 1, name$6960.length);
            }
            return [
                prefix$6961,
                name$6960
            ];
        }
        function makeModuleMap$6923(name$6963, parentModuleMap$6964, isNormalized$6965, applyMap$6966) {
            var url$6967, pluginModule$6968, suffix$6969, nameParts$6970, prefix$6971 = null, parentName$6972 = parentModuleMap$6964 ? parentModuleMap$6964.name : null, originalName$6973 = name$6963, isDefine$6974 = true, normalizedName$6975 = '';
            if (//If no name, then it means it is a require call, generate an
                //internal name.
                !name$6963) {
                isDefine$6974 = false;
                name$6963 = '_@r' + (requireCounter$6916 += 1);
            }
            nameParts$6970 = splitPrefix$6922(name$6963);
            prefix$6971 = nameParts$6970[0];
            name$6963 = nameParts$6970[1];
            if (prefix$6971) {
                prefix$6971 = normalize$6919(prefix$6971, parentName$6972, applyMap$6966);
                pluginModule$6968 = getOwn$6860(defined$6913, prefix$6971);
            }
            if (//Account for relative paths if there is a base name.
                name$6963) {
                if (prefix$6971) {
                    if (pluginModule$6968 && pluginModule$6968.normalize) {
                        //Plugin is loaded, use its normalize method.
                        normalizedName$6975 = pluginModule$6968.normalize(name$6963, function (name$6976) {
                            return normalize$6919(name$6976, parentName$6972, applyMap$6966);
                        });
                    } else {
                        // If nested plugin references, then do not try to
                        // normalize, as it will not normalize correctly. This
                        // places a restriction on resourceIds, and the longer
                        // term solution is not to normalize until plugins are
                        // loaded and all normalizations to allow for async
                        // loading of a loader plugin. But for now, fixes the
                        // common uses. Details in #1131
                        normalizedName$6975 = name$6963.indexOf('!') === -1 ? normalize$6919(name$6963, parentName$6972, applyMap$6966) : name$6963;
                    }
                } else {
                    //A regular module.
                    normalizedName$6975 = normalize$6919(name$6963, parentName$6972, applyMap$6966);
                    //Normalized name may be a plugin ID due to map config
                    //application in normalize. The map config values must
                    //already be normalized, so do not need to redo that part.
                    nameParts$6970 = splitPrefix$6922(normalizedName$6975);
                    prefix$6971 = nameParts$6970[0];
                    normalizedName$6975 = nameParts$6970[1];
                    isNormalized$6965 = true;
                    url$6967 = context$6905.nameToUrl(normalizedName$6975);
                }
            }
            //If the id is a plugin id that cannot be determined if it needs
            //normalization, stamp it with a unique ID so two matching relative
            //ids that may conflict can be separate.
            suffix$6969 = prefix$6971 && !pluginModule$6968 && !isNormalized$6965 ? '_unnormalized' + (unnormalizedCounter$6917 += 1) : '';
            return {
                prefix: prefix$6971,
                name: normalizedName$6975,
                parentMap: parentModuleMap$6964,
                unnormalized: !!suffix$6969,
                url: url$6967,
                originalName: originalName$6973,
                isDefine: isDefine$6974,
                id: (prefix$6971 ? prefix$6971 + '!' + normalizedName$6975 : normalizedName$6975) + suffix$6969
            };
        }
        function getModule$6924(depMap$6977) {
            var id$6978 = depMap$6977.id, mod$6979 = getOwn$6860(registry$6909, id$6978);
            if (!mod$6979) {
                mod$6979 = registry$6909[id$6978] = new context$6905.Module(depMap$6977);
            }
            return mod$6979;
        }
        function on$6925(depMap$6980, name$6981, fn$6982) {
            var id$6983 = depMap$6980.id, mod$6984 = getOwn$6860(registry$6909, id$6983);
            if (hasProp$6859(defined$6913, id$6983) && (!mod$6984 || mod$6984.defineEmitComplete)) {
                if (name$6981 === 'defined') {
                    fn$6982(defined$6913[id$6983]);
                }
            } else {
                mod$6984 = getModule$6924(depMap$6980);
                if (mod$6984.error && name$6981 === 'error') {
                    fn$6982(mod$6984.error);
                } else {
                    mod$6984.on(name$6981, fn$6982);
                }
            }
        }
        function onError$6926(err$6985, errback$6986) {
            var ids$6987 = err$6985.requireModules, notified$6988 = false;
            if (errback$6986) {
                errback$6986(err$6985);
            } else {
                each$6857(ids$6987, function (id$6989) {
                    var mod$6990 = getOwn$6860(registry$6909, id$6989);
                    if (mod$6990) {
                        //Set error on module, so it skips timeout checks.
                        mod$6990.error = err$6985;
                        if (mod$6990.events.error) {
                            notified$6988 = true;
                            mod$6990.emit('error', err$6985);
                        }
                    }
                });
                if (!notified$6988) {
                    req$6827.onError(err$6985);
                }
            }
        }
        function takeGlobalQueue$6927() {
            if (//Push all the globalDefQueue items into the context's defQueue
                globalDefQueue$6853.length) {
                each$6857(globalDefQueue$6853, function (queueItem$6991) {
                    var id$6992 = queueItem$6991[0];
                    if (typeof id$6992 === 'string') {
                        context$6905.defQueueMap[id$6992] = true;
                    }
                    defQueue$6912.push(queueItem$6991);
                });
                globalDefQueue$6853 = [];
            }
        }
        handlers$6906 = {
            'require': function (mod$6993) {
                if (mod$6993.require) {
                    return mod$6993.require;
                } else {
                    return mod$6993.require = context$6905.makeRequire(mod$6993.map);
                }
            },
            'exports': function (mod$6994) {
                mod$6994.usingExports = true;
                if (mod$6994.map.isDefine) {
                    if (mod$6994.exports) {
                        return defined$6913[mod$6994.map.id] = mod$6994.exports;
                    } else {
                        return mod$6994.exports = defined$6913[mod$6994.map.id] = {};
                    }
                }
            },
            'module': function (mod$6995) {
                if (mod$6995.module) {
                    return mod$6995.module;
                } else {
                    return mod$6995.module = {
                        id: mod$6995.map.id,
                        uri: mod$6995.map.url,
                        config: function () {
                            return getOwn$6860(config$6908.config, mod$6995.map.id) || {};
                        },
                        exports: mod$6995.exports || (mod$6995.exports = {})
                    };
                }
            }
        };
        function cleanRegistry$6928(id$6996) {
            //Clean up machinery used for waiting modules.
            delete registry$6909[id$6996];
            delete enabledRegistry$6910[id$6996];
        }
        function breakCycle$6929(mod$6997, traced$6998, processed$6999) {
            var id$7000 = mod$6997.map.id;
            if (mod$6997.error) {
                mod$6997.emit('error', mod$6997.error);
            } else {
                traced$6998[id$7000] = true;
                each$6857(mod$6997.depMaps, function (depMap$7001, i$7002) {
                    var depId$7003 = depMap$7001.id, dep$7004 = getOwn$6860(registry$6909, depId$7003);
                    if (//Only force things that have not completed
                        //being defined, so still in the registry,
                        //and only if it has not been matched up
                        //in the module already.
                        dep$7004 && !mod$6997.depMatched[i$7002] && !processed$6999[depId$7003]) {
                        if (getOwn$6860(traced$6998, depId$7003)) {
                            mod$6997.defineDep(i$7002, defined$6913[depId$7003]);
                            mod$6997.check();
                        } else {
                            breakCycle$6929(dep$7004, traced$6998, processed$6999);
                        }
                    }
                });
                processed$6999[id$7000] = true;
            }
        }
        function checkLoaded$6930() {
            var err$7005, usingPathFallback$7006, waitInterval$7007 = config$6908.waitSeconds * 1000, //It is possible to disable the wait interval by using waitSeconds of 0.
                expired$7008 = waitInterval$7007 && context$6905.startTime + waitInterval$7007 < new Date().getTime(), noLoads$7009 = [], reqCalls$7010 = [], stillLoading$7011 = false, needCycleCheck$7012 = true;
            if (//Do not bother if this call was a result of a cycle break.
                inCheckLoaded$6903) {
                return;
            }
            inCheckLoaded$6903 = true;
            //Figure out the state of all the modules.
            eachProp$6861(enabledRegistry$6910, function (mod$7013) {
                var map$7014 = mod$7013.map, modId$7015 = map$7014.id;
                if (//Skip things that are not enabled or in error state.
                    !mod$7013.enabled) {
                    return;
                }
                if (!map$7014.isDefine) {
                    reqCalls$7010.push(mod$7013);
                }
                if (!mod$7013.error) {
                    if (//If the module should be executed, and it has not
                        //been inited and time is up, remember it.
                        !mod$7013.inited && expired$7008) {
                        if (hasPathFallback$6921(modId$7015)) {
                            usingPathFallback$7006 = true;
                            stillLoading$7011 = true;
                        } else {
                            noLoads$7009.push(modId$7015);
                            removeScript$6920(modId$7015);
                        }
                    } else if (!mod$7013.inited && mod$7013.fetched && map$7014.isDefine) {
                        stillLoading$7011 = true;
                        if (!map$7014.prefix) {
                            //No reason to keep looking for unfinished
                            //loading. If the only stillLoading is a
                            //plugin resource though, keep going,
                            //because it may be that a plugin resource
                            //is waiting on a non-plugin cycle.
                            return needCycleCheck$7012 = false;
                        }
                    }
                }
            });
            if (expired$7008 && noLoads$7009.length) {
                //If wait time expired, throw error of unloaded modules.
                err$7005 = makeError$6867('timeout', 'Load timeout for modules: ' + noLoads$7009, null, noLoads$7009);
                err$7005.contextName = context$6905.contextName;
                return onError$6926(err$7005);
            }
            if (//Not expired, check for a cycle.
                needCycleCheck$7012) {
                each$6857(reqCalls$7010, function (mod$7016) {
                    breakCycle$6929(mod$7016, {}, {});
                });
            }
            if (//If still waiting on loads, and the waiting load is something
                //other than a plugin resource, or there are still outstanding
                //scripts, then just try back later.
                (!expired$7008 || usingPathFallback$7006) && stillLoading$7011) {
                if (//Something is still waiting to load. Wait for it, but only
                    //if a timeout is not already in effect.
                    (isBrowser$6846 || isWebWorker$6847) && !checkLoadedTimeoutId$6907) {
                    checkLoadedTimeoutId$6907 = setTimeout(function () {
                        checkLoadedTimeoutId$6907 = 0;
                        checkLoaded$6930();
                    }, 50);
                }
            }
            inCheckLoaded$6903 = false;
        }
        Module$6904 = function (map$7017) {
            this.events = getOwn$6860(undefEvents$6911, map$7017.id) || {};
            this.map = map$7017;
            this.shim = getOwn$6860(config$6908.shim, map$7017.id);
            this.depExports = [];
            this.depMaps = [];
            this.depMatched = [];
            this.pluginMaps = {};
            this.depCount = 0;
        };
        Module$6904.prototype = {
            init: function (depMaps$7018, factory$7019, errback$7020, options$7021) {
                options$7021 = options$7021 || {};
                if (//Do not do more inits if already done. Can happen if there
                    //are multiple define calls for the same module. That is not
                    //a normal, common case, but it is also not unexpected.
                    this.inited) {
                    return;
                }
                this.factory = factory$7019;
                if (errback$7020) {
                    //Register for errors on this module.
                    this.on('error', errback$7020);
                } else if (this.events.error) {
                    //If no errback already, but there are error listeners
                    //on this module, set up an errback to pass to the deps.
                    errback$7020 = bind$6863(this, function (err$7022) {
                        this.emit('error', err$7022);
                    });
                }
                //Do a copy of the dependency array, so that
                //source inputs are not modified. For example
                //"shim" deps are passed in here directly, and
                //doing a direct modification of the depMaps array
                //would affect that config.
                this.depMaps = depMaps$7018 && depMaps$7018.slice(0);
                this.errback = errback$7020;
                //Indicate this module has be initialized
                this.inited = true;
                this.ignore = options$7021.ignore;
                if (//Could have option to init this module in enabled mode,
                    //or could have been previously marked as enabled. However,
                    //the dependencies are not known until init is called. So
                    //if enabled previously, now trigger dependencies as enabled.
                    options$7021.enabled || this.enabled) {
                    //Enable this module and dependencies.
                    //Will call this.check()
                    this.enable();
                } else {
                    this.check();
                }
            },
            defineDep: function (i$7023, depExports$7024) {
                if (//Because of cycles, defined callback for a given
                    //export can be called more than once.
                    !this.depMatched[i$7023]) {
                    this.depMatched[i$7023] = true;
                    this.depCount -= 1;
                    this.depExports[i$7023] = depExports$7024;
                }
            },
            fetch: function () {
                if (this.fetched) {
                    return;
                }
                this.fetched = true;
                context$6905.startTime = new Date().getTime();
                var map$7025 = this.map;
                if (//If the manager is for a plugin managed resource,
                    //ask the plugin to load it now.
                    this.shim) {
                    context$6905.makeRequire(this.map, { enableBuildCallback: true })(this.shim.deps || [], bind$6863(this, function () {
                        return map$7025.prefix ? this.callPlugin() : this.load();
                    }));
                } else {
                    return //Regular dependency.
                    map$7025.prefix ? this.callPlugin() : this.load();
                }
            },
            load: function () {
                var url$7026 = this.map.url;
                if (//Regular dependency.
                    !urlFetched$6914[url$7026]) {
                    urlFetched$6914[url$7026] = true;
                    context$6905.load(this.map.id, url$7026);
                }
            },
            /**
             * Checks if the module is ready to define itself, and if so,
             * define it.
             */
            check: function () {
                if (!this.enabled || this.enabling) {
                    return;
                }
                var err$7027, cjsModule$7028, id$7029 = this.map.id, depExports$7030 = this.depExports, exports$7031 = this.exports, factory$7032 = this.factory;
                if (!this.inited) {
                    if (!// Only fetch if not already in the defQueue.
                        hasProp$6859(context$6905.defQueueMap, id$7029)) {
                        this.fetch();
                    }
                } else if (this.error) {
                    this.emit('error', this.error);
                } else if (!this.defining) {
                    //The factory could trigger another require call
                    //that would result in checking this module to
                    //define itself again. If already in the process
                    //of doing that, skip this work.
                    this.defining = true;
                    if (this.depCount < 1 && !this.defined) {
                        if (isFunction$6855(factory$7032)) {
                            if (//If there is an error listener, favor passing
                                //to that instead of throwing an error. However,
                                //only do it for define()'d  modules. require
                                //errbacks should not be called for failures in
                                //their callbacks (#699). However if a global
                                //onError is set, use that.
                                this.events.error && this.map.isDefine || req$6827.onError !== defaultOnError$6865) {
                                try {
                                    exports$7031 = context$6905.execCb(id$7029, factory$7032, depExports$7030, exports$7031);
                                } catch (e$7033) {
                                    err$7027 = e$7033;
                                }
                            } else {
                                exports$7031 = context$6905.execCb(id$7029, factory$7032, depExports$7030, exports$7031);
                            }
                            if (// Favor return value over exports. If node/cjs in play,
                                // then will not have a return value anyway. Favor
                                // module.exports assignment over exports object.
                                this.map.isDefine && exports$7031 === undefined) {
                                cjsModule$7028 = this.module;
                                if (cjsModule$7028) {
                                    exports$7031 = cjsModule$7028.exports;
                                } else if (this.usingExports) {
                                    //exports already set the defined value.
                                    exports$7031 = this.exports;
                                }
                            }
                            if (err$7027) {
                                err$7027.requireMap = this.map;
                                err$7027.requireModules = this.map.isDefine ? [this.map.id] : null;
                                err$7027.requireType = this.map.isDefine ? 'define' : 'require';
                                return onError$6926(this.error = err$7027);
                            }
                        } else {
                            //Just a literal value
                            exports$7031 = factory$7032;
                        }
                        this.exports = exports$7031;
                        if (this.map.isDefine && !this.ignore) {
                            defined$6913[id$7029] = exports$7031;
                            if (req$6827.onResourceLoad) {
                                req$6827.onResourceLoad(context$6905, this.map, this.depMaps);
                            }
                        }
                        //Clean up
                        cleanRegistry$6928(id$7029);
                        this.defined = true;
                    }
                    //Finished the define stage. Allow calling check again
                    //to allow define notifications below in the case of a
                    //cycle.
                    this.defining = false;
                    if (this.defined && !this.defineEmitted) {
                        this.defineEmitted = true;
                        this.emit('defined', this.exports);
                        this.defineEmitComplete = true;
                    }
                }
            },
            callPlugin: function () {
                var map$7034 = this.map, id$7035 = map$7034.id, //Map already normalized the prefix.
                    pluginMap$7036 = makeModuleMap$6923(map$7034.prefix);
                //Mark this as a dependency for this plugin, so it
                //can be traced for cycles.
                this.depMaps.push(pluginMap$7036);
                on$6925(pluginMap$7036, 'defined', bind$6863(this, function (plugin$7037) {
                    var load$7038, normalizedMap$7039, normalizedMod$7040, bundleId$7041 = getOwn$6860(bundlesMap$6915, this.map.id), name$7042 = this.map.name, parentName$7043 = this.map.parentMap ? this.map.parentMap.name : null, localRequire$7044 = context$6905.makeRequire(map$7034.parentMap, { enableBuildCallback: true });
                    if (//If current map is not normalized, wait for that
                        //normalized name to load instead of continuing.
                        this.map.unnormalized) {
                        if (//Normalize the ID if the plugin allows it.
                            plugin$7037.normalize) {
                            name$7042 = plugin$7037.normalize(name$7042, function (name$7045) {
                                return normalize$6919(name$7045, parentName$7043, true);
                            }) || '';
                        }
                        //prefix and name should already be normalized, no need
                        //for applying map config again either.
                        normalizedMap$7039 = makeModuleMap$6923(map$7034.prefix + '!' + name$7042, this.map.parentMap);
                        on$6925(normalizedMap$7039, 'defined', bind$6863(this, function (value$7046) {
                            this.init([], function () {
                                return value$7046;
                            }, null, {
                                enabled: true,
                                ignore: true
                            });
                        }));
                        normalizedMod$7040 = getOwn$6860(registry$6909, normalizedMap$7039.id);
                        if (normalizedMod$7040) {
                            //Mark this as a dependency for this plugin, so it
                            //can be traced for cycles.
                            this.depMaps.push(normalizedMap$7039);
                            if (this.events.error) {
                                normalizedMod$7040.on('error', bind$6863(this, function (err$7047) {
                                    this.emit('error', err$7047);
                                }));
                            }
                            normalizedMod$7040.enable();
                        }
                        return;
                    }
                    if (//If a paths config, then just load that file instead to
                        //resolve the plugin, as it is built into that paths layer.
                        bundleId$7041) {
                        this.map.url = context$6905.nameToUrl(bundleId$7041);
                        this.load();
                        return;
                    }
                    load$7038 = bind$6863(this, function (value$7048) {
                        this.init([], function () {
                            return value$7048;
                        }, null, { enabled: true });
                    });
                    load$7038.error = bind$6863(this, function (err$7049) {
                        this.inited = true;
                        this.error = err$7049;
                        err$7049.requireModules = [id$7035];
                        //Remove temp unnormalized modules for this module,
                        //since they will never be resolved otherwise now.
                        eachProp$6861(registry$6909, function (mod$7050) {
                            if (mod$7050.map.id.indexOf(id$7035 + '_unnormalized') === 0) {
                                cleanRegistry$6928(mod$7050.map.id);
                            }
                        });
                        onError$6926(err$7049);
                    });
                    //Allow plugins to load other code without having to know the
                    //context or how to 'complete' the load.
                    load$7038.fromText = bind$6863(this, function (text$7051, textAlt$7052) {
                        var /*jslint evil: true */
                            moduleName$7053 = map$7034.name, moduleMap$7054 = makeModuleMap$6923(moduleName$7053), hasInteractive$7055 = useInteractive$6854;
                        if (//As of 2.1.0, support just passing the text, to reinforce
                            //fromText only being called once per resource. Still
                            //support old style of passing moduleName but discard
                            //that moduleName in favor of the internal ref.
                            textAlt$7052) {
                            text$7051 = textAlt$7052;
                        }
                        if (//Turn off interactive script matching for IE for any define
                            //calls in the text, then turn it back on at the end.
                            hasInteractive$7055) {
                            useInteractive$6854 = false;
                        }
                        //Prime the system by creating a module instance for
                        //it.
                        getModule$6924(moduleMap$7054);
                        if (//Transfer any config to this other module.
                            hasProp$6859(config$6908.config, id$7035)) {
                            config$6908.config[moduleName$7053] = config$6908.config[id$7035];
                        }
                        try {
                            req$6827.exec(text$7051);
                        } catch (e$7056) {
                            return onError$6926(makeError$6867('fromtexteval', 'fromText eval for ' + id$7035 + ' failed: ' + e$7056, e$7056, [id$7035]));
                        }
                        if (hasInteractive$7055) {
                            useInteractive$6854 = true;
                        }
                        //Mark this as a dependency for the plugin
                        //resource
                        this.depMaps.push(moduleMap$7054);
                        //Support anonymous modules.
                        context$6905.completeLoad(moduleName$7053);
                        //Bind the value of that module to the value for this
                        //resource ID.
                        localRequire$7044([moduleName$7053], load$7038);
                    });
                    //Use parentName here since the plugin's name is not reliable,
                    //could be some weird string with no path that actually wants to
                    //reference the parentName's path.
                    plugin$7037.load(map$7034.name, localRequire$7044, load$7038, config$6908);
                }));
                context$6905.enable(pluginMap$7036, this);
                this.pluginMaps[pluginMap$7036.id] = pluginMap$7036;
            },
            enable: function () {
                enabledRegistry$6910[this.map.id] = this;
                this.enabled = true;
                //Set flag mentioning that the module is enabling,
                //so that immediate calls to the defined callbacks
                //for dependencies do not trigger inadvertent load
                //with the depCount still being zero.
                this.enabling = true;
                //Enable each dependency
                each$6857(this.depMaps, bind$6863(this, function (depMap$7057, i$7058) {
                    var id$7059, mod$7060, handler$7061;
                    if (typeof depMap$7057 === 'string') {
                        //Dependency needs to be converted to a depMap
                        //and wired up to this module.
                        depMap$7057 = makeModuleMap$6923(depMap$7057, this.map.isDefine ? this.map : this.map.parentMap, false, !this.skipMap);
                        this.depMaps[i$7058] = depMap$7057;
                        handler$7061 = getOwn$6860(handlers$6906, depMap$7057.id);
                        if (handler$7061) {
                            this.depExports[i$7058] = handler$7061(this);
                            return;
                        }
                        this.depCount += 1;
                        on$6925(depMap$7057, 'defined', bind$6863(this, function (depExports$7062) {
                            if (this.undefed) {
                                return;
                            }
                            this.defineDep(i$7058, depExports$7062);
                            this.check();
                        }));
                        if (this.errback) {
                            on$6925(depMap$7057, 'error', bind$6863(this, this.errback));
                        } else if (this.events.error) {
                            // No direct errback on this module, but something
                            // else is listening for errors, so be sure to
                            // propagate the error correctly.
                            on$6925(depMap$7057, 'error', bind$6863(this, function (err$7063) {
                                this.emit('error', err$7063);
                            }));
                        }
                    }
                    id$7059 = depMap$7057.id;
                    mod$7060 = registry$6909[id$7059];
                    if (//Skip special modules like 'require', 'exports', 'module'
                        //Also, don't call enable if it is already enabled,
                        //important in circular dependency cases.
                        !hasProp$6859(handlers$6906, id$7059) && mod$7060 && !mod$7060.enabled) {
                        context$6905.enable(depMap$7057, this);
                    }
                }));
                //Enable each plugin that is used in
                //a dependency
                eachProp$6861(this.pluginMaps, bind$6863(this, function (pluginMap$7064) {
                    var mod$7065 = getOwn$6860(registry$6909, pluginMap$7064.id);
                    if (mod$7065 && !mod$7065.enabled) {
                        context$6905.enable(pluginMap$7064, this);
                    }
                }));
                this.enabling = false;
                this.check();
            },
            on: function (name$7066, cb$7067) {
                var cbs$7068 = this.events[name$7066];
                if (!cbs$7068) {
                    cbs$7068 = this.events[name$7066] = [];
                }
                cbs$7068.push(cb$7067);
            },
            emit: function (name$7069, evt$7070) {
                each$6857(this.events[name$7069], function (cb$7071) {
                    cb$7071(evt$7070);
                });
                if (name$7069 === 'error') {
                    //Now that the error handler was triggered, remove
                    //the listeners, since this broken Module instance
                    //can stay around for a while in the registry.
                    delete this.events[name$7069];
                }
            }
        };
        function callGetModule$6931(args$7072) {
            if (//Skip modules already defined.
                !hasProp$6859(defined$6913, args$7072[0])) {
                getModule$6924(makeModuleMap$6923(args$7072[0], null, true)).init(args$7072[1], args$7072[2]);
            }
        }
        function removeListener$6932(node$7073, func$7074, name$7075, ieName$7076) {
            if (//Favor detachEvent because of IE9
                //issue, see attachEvent/addEventListener comment elsewhere
                //in this file.
                node$7073.detachEvent && !isOpera$6850) {
                if (//Probably IE. If not it will throw an error, which will be
                    //useful to know.
                    ieName$7076) {
                    node$7073.detachEvent(ieName$7076, func$7074);
                }
            } else {
                node$7073.removeEventListener(name$7075, func$7074, false);
            }
        }
        function getScriptData$6933(evt$7077) {
            var //Using currentTarget instead of target for Firefox 2.0's sake. Not
            //all old browsers will be supported, but this one was easy enough
            //to support and still makes sense.
            node$7078 = evt$7077.currentTarget || evt$7077.srcElement;
            //Remove the listeners once here.
            removeListener$6932(node$7078, context$6905.onScriptLoad, 'load', 'onreadystatechange');
            removeListener$6932(node$7078, context$6905.onScriptError, 'error');
            return {
                node: node$7078,
                id: node$7078 && node$7078.getAttribute('data-requiremodule')
            };
        }
        function intakeDefines$6934() {
            var args$7079;
            //Any defined modules in the global queue, intake them now.
            takeGlobalQueue$6927();
            while (//Make sure any remaining defQueue items get properly processed.
                defQueue$6912.length) {
                args$7079 = defQueue$6912.shift();
                if (args$7079[0] === null) {
                    return onError$6926(makeError$6867('mismatch', 'Mismatched anonymous define() module: ' + args$7079[args$7079.length - 1]));
                } else {
                    //args are id, deps, factory. Should be normalized by the
                    //define() function.
                    callGetModule$6931(args$7079);
                }
            }
            context$6905.defQueueMap = {};
        }
        context$6905 = {
            config: config$6908,
            contextName: contextName$6902,
            registry: registry$6909,
            defined: defined$6913,
            urlFetched: urlFetched$6914,
            defQueue: defQueue$6912,
            defQueueMap: {},
            Module: Module$6904,
            makeModuleMap: makeModuleMap$6923,
            nextTick: req$6827.nextTick,
            onError: onError$6926,
            /**
             * Set a configuration for the context.
             * @param {Object} cfg config object to integrate.
             */
            configure: function (cfg$7080) {
                if (//Make sure the baseUrl ends in a slash.
                    cfg$7080.baseUrl) {
                    if (cfg$7080.baseUrl.charAt(cfg$7080.baseUrl.length - 1) !== '/') {
                        cfg$7080.baseUrl += '/';
                    }
                }
                var //Save off the paths since they require special processing,
                    //they are additive.
                    shim$7081 = config$6908.shim, objs$7082 = {
                        paths: true,
                        bundles: true,
                        config: true,
                        map: true
                    };
                eachProp$6861(cfg$7080, function (value$7083, prop$7084) {
                    if (objs$7082[prop$7084]) {
                        if (!config$6908[prop$7084]) {
                            config$6908[prop$7084] = {};
                        }
                        mixin$6862(config$6908[prop$7084], value$7083, true, true);
                    } else {
                        config$6908[prop$7084] = value$7083;
                    }
                });
                if (//Reverse map the bundles
                    cfg$7080.bundles) {
                    eachProp$6861(cfg$7080.bundles, function (value$7085, prop$7086) {
                        each$6857(value$7085, function (v$7087) {
                            if (v$7087 !== prop$7086) {
                                bundlesMap$6915[v$7087] = prop$7086;
                            }
                        });
                    });
                }
                if (//Merge shim
                    cfg$7080.shim) {
                    eachProp$6861(cfg$7080.shim, function (value$7088, id$7089) {
                        if (//Normalize the structure
                            isArray$6856(value$7088)) {
                            value$7088 = { deps: value$7088 };
                        }
                        if ((value$7088.exports || value$7088.init) && !value$7088.exportsFn) {
                            value$7088.exportsFn = context$6905.makeShimExports(value$7088);
                        }
                        shim$7081[id$7089] = value$7088;
                    });
                    config$6908.shim = shim$7081;
                }
                if (//Adjust packages if necessary.
                    cfg$7080.packages) {
                    each$6857(cfg$7080.packages, function (pkgObj$7090) {
                        var location$7091, name$7092;
                        pkgObj$7090 = typeof pkgObj$7090 === 'string' ? { name: pkgObj$7090 } : pkgObj$7090;
                        name$7092 = pkgObj$7090.name;
                        location$7091 = pkgObj$7090.location;
                        if (location$7091) {
                            config$6908.paths[name$7092] = pkgObj$7090.location;
                        }
                        //Save pointer to main module ID for pkg name.
                        //Remove leading dot in main, so main paths are normalized,
                        //and remove any trailing .js, since different package
                        //envs have different conventions: some use a module name,
                        //some use a file name.
                        config$6908.pkgs[name$7092] = pkgObj$7090.name + '/' + (pkgObj$7090.main || 'main').replace(currDirRegExp$6841, '').replace(jsSuffixRegExp$6840, '');
                    });
                }
                //If there are any "waiting to execute" modules in the registry,
                //update the maps for them, since their info, like URLs to load,
                //may have changed.
                eachProp$6861(registry$6909, function (mod$7093, id$7094) {
                    if (//If module already has init called, since it is too
                        //late to modify them, and ignore unnormalized ones
                        //since they are transient.
                        !mod$7093.inited && !mod$7093.map.unnormalized) {
                        mod$7093.map = makeModuleMap$6923(id$7094, null, true);
                    }
                });
                if (//If a deps array or a config callback is specified, then call
                    //require with those args. This is useful when require is defined as a
                    //config object before require.js is loaded.
                    cfg$7080.deps || cfg$7080.callback) {
                    context$6905.require(cfg$7080.deps || [], cfg$7080.callback);
                }
            },
            makeShimExports: function (value$7095) {
                function fn$7096() {
                    var ret$7097;
                    if (value$7095.init) {
                        ret$7097 = value$7095.init.apply(global$6826, arguments);
                    }
                    return ret$7097 || value$7095.exports && getGlobal$6866(value$7095.exports);
                }
                return fn$7096;
            },
            makeRequire: function (relMap$7098, options$7099) {
                options$7099 = options$7099 || {};
                function localRequire$7100(deps$7101, callback$7102, errback$7103) {
                    var id$7104, map$7105, requireMod$7106;
                    if (options$7099.enableBuildCallback && callback$7102 && isFunction$6855(callback$7102)) {
                        callback$7102.__requireJsBuild = true;
                    }
                    if (typeof deps$7101 === 'string') {
                        if (isFunction$6855(callback$7102)) {
                            return //Invalid call
                            onError$6926(makeError$6867('requireargs', 'Invalid require call'), errback$7103);
                        }
                        if (//If require|exports|module are requested, get the
                            //value for them from the special handlers. Caveat:
                            //this only works while module is being defined.
                            relMap$7098 && hasProp$6859(handlers$6906, deps$7101)) {
                            return handlers$6906[deps$7101](registry$6909[relMap$7098.id]);
                        }
                        if (//Synchronous access to one module. If require.get is
                            //available (as in the Node adapter), prefer that.
                            req$6827.get) {
                            return req$6827.get(context$6905, deps$7101, relMap$7098, localRequire$7100);
                        }
                        //Normalize module name, if it contains . or ..
                        map$7105 = makeModuleMap$6923(deps$7101, relMap$7098, false, true);
                        id$7104 = map$7105.id;
                        if (!hasProp$6859(defined$6913, id$7104)) {
                            return onError$6926(makeError$6867('notloaded', 'Module name "' + id$7104 + '" has not been loaded yet for context: ' + contextName$6902 + (relMap$7098 ? '' : '. Use require([])')));
                        }
                        return defined$6913[id$7104];
                    }
                    //Grab defines waiting in the global queue.
                    intakeDefines$6934();
                    //Mark all the dependencies as needing to be loaded.
                    context$6905.nextTick(function () {
                        //Some defines could have been added since the
                        //require call, collect them.
                        intakeDefines$6934();
                        requireMod$7106 = getModule$6924(makeModuleMap$6923(null, relMap$7098));
                        //Store if map config should be applied to this require
                        //call for dependencies.
                        requireMod$7106.skipMap = options$7099.skipMap;
                        requireMod$7106.init(deps$7101, callback$7102, errback$7103, { enabled: true });
                        checkLoaded$6930();
                    });
                    return localRequire$7100;
                }
                mixin$6862(localRequire$7100, {
                    isBrowser: isBrowser$6846,
                    /**
                     * Converts a module name + .extension into an URL path.
                     * *Requires* the use of a module name. It does not support using
                     * plain URLs like nameToUrl.
                     */
                    toUrl: function (moduleNamePlusExt$7107) {
                        var ext$7108, index$7109 = moduleNamePlusExt$7107.lastIndexOf('.'), segment$7110 = moduleNamePlusExt$7107.split('/')[0], isRelative$7111 = segment$7110 === '.' || segment$7110 === '..';
                        if (//Have a file extension alias, and it is not the
                            //dots from a relative path.
                            index$7109 !== -1 && (!isRelative$7111 || index$7109 > 1)) {
                            ext$7108 = moduleNamePlusExt$7107.substring(index$7109, moduleNamePlusExt$7107.length);
                            moduleNamePlusExt$7107 = moduleNamePlusExt$7107.substring(0, index$7109);
                        }
                        return context$6905.nameToUrl(normalize$6919(moduleNamePlusExt$7107, relMap$7098 && relMap$7098.id, true), ext$7108, true);
                    },
                    defined: function (id$7112) {
                        return hasProp$6859(defined$6913, makeModuleMap$6923(id$7112, relMap$7098, false, true).id);
                    },
                    specified: function (id$7113) {
                        id$7113 = makeModuleMap$6923(id$7113, relMap$7098, false, true).id;
                        return hasProp$6859(defined$6913, id$7113) || hasProp$6859(registry$6909, id$7113);
                    }
                });
                if (//Only allow undef on top level require calls
                    !relMap$7098) {
                    localRequire$7100.undef = function (id$7114) {
                        //Bind any waiting define() calls to this context,
                        //fix for #408
                        takeGlobalQueue$6927();
                        var map$7115 = makeModuleMap$6923(id$7114, relMap$7098, true), mod$7116 = getOwn$6860(registry$6909, id$7114);
                        mod$7116.undefed = true;
                        removeScript$6920(id$7114);
                        delete defined$6913[id$7114];
                        delete urlFetched$6914[map$7115.url];
                        delete undefEvents$6911[id$7114];
                        //Clean queued defines too. Go backwards
                        //in array so that the splices do not
                        //mess up the iteration.
                        eachReverse$6858(defQueue$6912, function (args$7117, i$7118) {
                            if (args$7117[0] === id$7114) {
                                defQueue$6912.splice(i$7118, 1);
                            }
                        });
                        delete context$6905.defQueueMap[id$7114];
                        if (mod$7116) {
                            if (//Hold on to listeners in case the
                                //module will be attempted to be reloaded
                                //using a different config.
                                mod$7116.events.defined) {
                                undefEvents$6911[id$7114] = mod$7116.events;
                            }
                            cleanRegistry$6928(id$7114);
                        }
                    };
                }
                return localRequire$7100;
            },
            /**
             * Called to enable a module if it is still in the registry
             * awaiting enablement. A second arg, parent, the parent module,
             * is passed in for context, when this method is overridden by
             * the optimizer. Not shown here to keep code compact.
             */
            enable: function (depMap$7119) {
                var mod$7120 = getOwn$6860(registry$6909, depMap$7119.id);
                if (mod$7120) {
                    getModule$6924(depMap$7119).enable();
                }
            },
            /**
             * Internal method used by environment adapters to complete a load event.
             * A load event could be a script load or just a load pass from a synchronous
             * load call.
             * @param {String} moduleName the name of the module to potentially complete.
             */
            completeLoad: function (moduleName$7121) {
                var found$7122, args$7123, mod$7124, shim$7125 = getOwn$6860(config$6908.shim, moduleName$7121) || {}, shExports$7126 = shim$7125.exports;
                takeGlobalQueue$6927();
                while (defQueue$6912.length) {
                    args$7123 = defQueue$6912.shift();
                    if (args$7123[0] === null) {
                        args$7123[0] = moduleName$7121;
                        if (//If already found an anonymous module and bound it
                            //to this name, then this is some other anon module
                            //waiting for its completeLoad to fire.
                            found$7122) {
                            break;
                        }
                        found$7122 = true;
                    } else if (args$7123[0] === moduleName$7121) {
                        //Found matching define call for this script!
                        found$7122 = true;
                    }
                    callGetModule$6931(args$7123);
                }
                context$6905.defQueueMap = {};
                //Do this after the cycle of callGetModule in case the result
                //of those calls/init calls changes the registry.
                mod$7124 = getOwn$6860(registry$6909, moduleName$7121);
                if (!found$7122 && !hasProp$6859(defined$6913, moduleName$7121) && mod$7124 && !mod$7124.inited) {
                    if (config$6908.enforceDefine && (!shExports$7126 || !getGlobal$6866(shExports$7126))) {
                        if (hasPathFallback$6921(moduleName$7121)) {
                            return;
                        } else {
                            return onError$6926(makeError$6867('nodefine', 'No define call for ' + moduleName$7121, null, [moduleName$7121]));
                        }
                    } else {
                        //A script that does not call define(), so just simulate
                        //the call for it.
                        callGetModule$6931([
                            moduleName$7121,
                            shim$7125.deps || [],
                            shim$7125.exportsFn
                        ]);
                    }
                }
                checkLoaded$6930();
            },
            /**
             * Converts a module name to a file path. Supports cases where
             * moduleName may actually be just an URL.
             * Note that it **does not** call normalize on the moduleName,
             * it is assumed to have already been normalized. This is an
             * internal API, not a public one. Use toUrl for the public API.
             */
            nameToUrl: function (moduleName$7127, ext$7128, skipExt$7129) {
                var paths$7130, syms$7131, i$7132, parentModule$7133, url$7134, parentPath$7135, bundleId$7136, pkgMain$7137 = getOwn$6860(config$6908.pkgs, moduleName$7127);
                if (pkgMain$7137) {
                    moduleName$7127 = pkgMain$7137;
                }
                bundleId$7136 = getOwn$6860(bundlesMap$6915, moduleName$7127);
                if (bundleId$7136) {
                    return context$6905.nameToUrl(bundleId$7136, ext$7128, skipExt$7129);
                }
                if (//If a colon is in the URL, it indicates a protocol is used and it is just
                    //an URL to a file, or if it starts with a slash, contains a query arg (i.e. ?)
                    //or ends with .js, then assume the user meant to use an url and not a module id.
                    //The slash is important for protocol-less URLs as well as full paths.
                    req$6827.jsExtRegExp.test(moduleName$7127)) {
                    //Just a plain path, not module name lookup, so just return it.
                    //Add extension if it is included. This is a bit wonky, only non-.js things pass
                    //an extension, this method probably needs to be reworked.
                    url$7134 = moduleName$7127 + (ext$7128 || '');
                } else {
                    //A module that needs to be converted to a path.
                    paths$7130 = config$6908.paths;
                    syms$7131 = moduleName$7127.split('/');
                    for (//For each module name segment, see if there is a path
                        //registered for it. Start with most specific name
                        //and work up from it.
                        i$7132 = syms$7131.length; i$7132 > 0; i$7132 -= 1) {
                        parentModule$7133 = syms$7131.slice(0, i$7132).join('/');
                        parentPath$7135 = getOwn$6860(paths$7130, parentModule$7133);
                        if (parentPath$7135) {
                            if (//If an array, it means there are a few choices,
                                //Choose the one that is desired
                                isArray$6856(parentPath$7135)) {
                                parentPath$7135 = parentPath$7135[0];
                            }
                            syms$7131.splice(0, i$7132, parentPath$7135);
                            break;
                        }
                    }
                    //Join the path parts together, then figure out if baseUrl is needed.
                    url$7134 = syms$7131.join('/');
                    url$7134 += ext$7128 || (/^data\:|\?/.test(url$7134) || skipExt$7129 ? '' : '.js');
                    url$7134 = (url$7134.charAt(0) === '/' || url$7134.match(/^[\w\+\.\-]+:/) ? '' : config$6908.baseUrl) + url$7134;
                }
                return config$6908.urlArgs ? url$7134 + ((url$7134.indexOf('?') === -1 ? '?' : '&') + config$6908.urlArgs) : url$7134;
            },
            //Delegates to req.load. Broken out as a separate function to
            //allow overriding in the optimizer.
            load: function (id$7138, url$7139) {
                req$6827.load(context$6905, id$7138, url$7139);
            },
            /**
             * Executes a module callback function. Broken out as a separate function
             * solely to allow the build system to sequence the files in the built
             * layer in the right sequence.
             *
             * @private
             */
            execCb: function (name$7140, callback$7141, args$7142, exports$7143) {
                return callback$7141.apply(exports$7143, args$7142);
            },
            /**
             * callback for script loads, used to check status of loading.
             *
             * @param {Event} evt the event from the browser for the script
             * that was loaded.
             */
            onScriptLoad: function (evt$7144) {
                if (//Using currentTarget instead of target for Firefox 2.0's sake. Not
                    //all old browsers will be supported, but this one was easy enough
                    //to support and still makes sense.
                    evt$7144.type === 'load' || readyRegExp$6848.test((evt$7144.currentTarget || evt$7144.srcElement).readyState)) {
                    //Reset interactive script so a script node is not held onto for
                    //to long.
                    interactiveScript$6833 = null;
                    var //Pull out the name of the module and the context.
                    data$7145 = getScriptData$6933(evt$7144);
                    context$6905.completeLoad(data$7145.id);
                }
            },
            /**
             * Callback for script errors.
             */
            onScriptError: function (evt$7146) {
                var data$7147 = getScriptData$6933(evt$7146);
                if (!hasPathFallback$6921(data$7147.id)) {
                    return onError$6926(makeError$6867('scripterror', 'Script error for: ' + data$7147.id, evt$7146, [data$7147.id]));
                }
            }
        };
        context$6905.require = context$6905.makeRequire();
        return context$6905;
    }
    /**
     * Main entry point.
     *
     * If the only argument to require is a string, then the module that
     * is represented by that string is fetched for the appropriate context.
     *
     * If the first argument is an array, then it will be treated as an array
     * of dependency string names to fetch. An optional function callback can
     * be specified to execute when all of those dependencies are available.
     *
     * Make a local req variable to help Caja compliance (it assumes things
     * on a require that are not standardized), and to give a short
     * name for minification/local scope use.
     */
    req$6827 = requirejs$6823 = function (deps$7148, callback$7149, errback$7150, optional$7151) {
        var
            //Find the right context, use default
            context$7152, config$7153, contextName$7154 = defContextName$6849;
        if (// Determine if have config object in the call.
            !isArray$6856(deps$7148) && typeof deps$7148 !== 'string') {
            // deps is a config object
            config$7153 = deps$7148;
            if (isArray$6856(callback$7149)) {
                // Adjust args if there are dependencies
                deps$7148 = callback$7149;
                callback$7149 = errback$7150;
                errback$7150 = optional$7151;
            } else {
                deps$7148 = [];
            }
        }
        if (config$7153 && config$7153.context) {
            contextName$7154 = config$7153.context;
        }
        context$7152 = getOwn$6860(contexts$6851, contextName$7154);
        if (!context$7152) {
            context$7152 = contexts$6851[contextName$7154] = req$6827.s.newContext(contextName$7154);
        }
        if (config$7153) {
            context$7152.configure(config$7153);
        }
        return context$7152.require(deps$7148, callback$7149, errback$7150);
    };
    /**
     * Support require.config() to make it easier to cooperate with other
     * AMD loaders on globally agreed names.
     */
    req$6827.config = function (config$7155) {
        return req$6827(config$7155);
    };
    /**
     * Execute something after the current tick
     * of the event loop. Override for other envs
     * that have a better solution than setTimeout.
     * @param  {Function} fn function to execute later.
     */
    req$6827.nextTick = typeof setTimeout !== 'undefined' ? function (fn$7156) {
        setTimeout(fn$7156, 4);
    } : function (fn$7157) {
        fn$7157();
    };
    if (/**
     * Export require as a global, but only if it does not already exist.
     */
        !require$6824) {
        require$6824 = req$6827;
    }
    req$6827.version = version$6837;
    //Used to filter out dependencies that are already paths.
    req$6827.jsExtRegExp = /^\/|:|\?|\.js$/;
    req$6827.isBrowser = isBrowser$6846;
    s$6828 = req$6827.s = {
        contexts: contexts$6851,
        newContext: newContext$6868
    };
    //Create default context.
    req$6827({});
    //Exports some context-sensitive methods on global require.
    each$6857([
        'toUrl',
        'undef',
        'defined',
        'specified'
    ], function (prop$7158) {
        //Reference from contexts instead of early binding to default context,
        //so that during builds, the latest instance of the default context
        //with its config gets used.
        req$6827[prop$7158] = function () {
            var ctx$7159 = contexts$6851[defContextName$6849];
            return ctx$7159.require[prop$7158].apply(ctx$7159, arguments);
        };
    });
    if (isBrowser$6846) {
        head$6829 = s$6828.head = document.getElementsByTagName('head')[0];
        //If BASE tag is in play, using appendChild is a problem for IE6.
        //When that browser dies, this can be removed. Details in this jQuery bug:
        //http://dev.jquery.com/ticket/2709
        baseElement$6830 = document.getElementsByTagName('base')[0];
        if (baseElement$6830) {
            head$6829 = s$6828.head = baseElement$6830.parentNode;
        }
    }
    /**
     * Any errors that require explicitly generates will be passed to this
     * function. Intercept/override it if you want custom error handling.
     * @param {Error} err the error object.
     */
    req$6827.onError = defaultOnError$6865;
    /**
     * Creates the node for the load command. Only used in browser envs.
     */
    req$6827.createNode = function (config$7160, moduleName$7161, url$7162) {
        var node$7163 = config$7160.xhtml ? document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script') : document.createElement('script');
        node$7163.type = config$7160.scriptType || 'text/javascript';
        node$7163.charset = 'utf-8';
        node$7163.async = true;
        return node$7163;
    };
    /**
     * Does the request to load a module for the browser case.
     * Make this a separate function to allow other environments
     * to override it.
     *
     * @param {Object} context the require context to find state.
     * @param {String} moduleName the name of the module.
     * @param {Object} url the URL to the module.
     */
    req$6827.load = function (context$7164, moduleName$7165, url$7166) {
        var config$7167 = context$7164 && context$7164.config || {}, node$7168;
        if (isBrowser$6846) {
            //In the browser so use a script tag
            node$7168 = req$6827.createNode(config$7167, moduleName$7165, url$7166);
            if (config$7167.onNodeCreated) {
                config$7167.onNodeCreated(node$7168, config$7167, moduleName$7165, url$7166);
            }
            node$7168.setAttribute('data-requirecontext', context$7164.contextName);
            node$7168.setAttribute('data-requiremodule', moduleName$7165);
            if (//Set up load listener. Test attachEvent first because IE9 has
                //a subtle issue in its addEventListener and script onload firings
                //that do not match the behavior of all other browsers with
                //addEventListener support, which fire the onload event for a
                //script right after the script execution. See:
                //https://connect.microsoft.com/IE/feedback/details/648057/script-onload-event-is-not-fired-immediately-after-script-execution
                //UNFORTUNATELY Opera implements attachEvent but does not follow the script
                //script execution mode.
                node$7168.attachEvent && !(//Check if node.attachEvent is artificially added by custom script or
                //natively supported by browser
                //read https://github.com/jrburke/requirejs/issues/187
                //if we can NOT find [native code] then it must NOT natively supported.
                //in IE8, node.attachEvent does not have toString()
                //Note the test for "[native code" with no closing brace, see:
                //https://github.com/jrburke/requirejs/issues/273
                node$7168.attachEvent.toString && node$7168.attachEvent.toString().indexOf('[native code') < 0) && !isOpera$6850) {
                //Probably IE. IE (at least 6-8) do not fire
                //script onload right after executing the script, so
                //we cannot tie the anonymous define call to a name.
                //However, IE reports the script as being in 'interactive'
                //readyState at the time of the define call.
                useInteractive$6854 = true;
                node$7168.attachEvent('onreadystatechange', context$7164.onScriptLoad);
            } else {
                node$7168.addEventListener('load', context$7164.onScriptLoad, false);
                node$7168.addEventListener('error', context$7164.onScriptError, false);
            }
            node$7168.src = url$7166;
            //For some cache cases in IE 6-8, the script executes before the end
            //of the appendChild execution, so to tie an anonymous define
            //call to the module name (which is stored on the node), hold on
            //to a reference to this node, but clear after the DOM insertion.
            currentlyAddingScript$6834 = node$7168;
            if (baseElement$6830) {
                head$6829.insertBefore(node$7168, baseElement$6830);
            } else {
                head$6829.appendChild(node$7168);
            }
            currentlyAddingScript$6834 = null;
            return node$7168;
        } else if (isWebWorker$6847) {
            try {
                //In a web worker, use importScripts. This is not a very
                //efficient use of importScripts, importScripts will block until
                //its script is downloaded and evaluated. However, if web workers
                //are in play, the expectation that a build has been done so that
                //only one script needs to be loaded anyway. This may need to be
                //reevaluated if other use cases become common.
                importScripts(url$7166);
                //Account for anonymous modules
                context$7164.completeLoad(moduleName$7165);
            } catch (e$7169) {
                context$7164.onError(makeError$6867('importscripts', 'importScripts failed for ' + moduleName$7165 + ' at ' + url$7166, e$7169, [moduleName$7165]));
            }
        }
    };
    function getInteractiveScript$6869() {
        if (interactiveScript$6833 && interactiveScript$6833.readyState === 'interactive') {
            return interactiveScript$6833;
        }
        eachReverse$6858(scripts$6864(), function (script$7170) {
            if (script$7170.readyState === 'interactive') {
                return interactiveScript$6833 = script$7170;
            }
        });
        return interactiveScript$6833;
    }
    if (//Look for a data-main script attribute, which could also adjust the baseUrl.
        isBrowser$6846 && !cfg$6852.skipDataMain) {
        //Figure out baseUrl. Get it from the script tag with require.js in it.
        eachReverse$6858(scripts$6864(), function (script$7171) {
            if (//Set the 'head' where we can append children by
                //using the script's parent.
                !head$6829) {
                head$6829 = script$7171.parentNode;
            }
            //Look for a data-main attribute to set main script for the page
            //to load. If it is there, the path to data main becomes the
            //baseUrl, if it is not already set.
            dataMain$6831 = script$7171.getAttribute('data-main');
            if (dataMain$6831) {
                //Preserve dataMain in case it is a path (i.e. contains '?')
                mainScript$6835 = dataMain$6831;
                if (//Set final baseUrl if there is not already an explicit one.
                    !cfg$6852.baseUrl) {
                    //Pull off the directory of data-main for use as the
                    //baseUrl.
                    src$6832 = mainScript$6835.split('/');
                    mainScript$6835 = src$6832.pop();
                    subPath$6836 = src$6832.length ? src$6832.join('/') + '/' : './';
                    cfg$6852.baseUrl = subPath$6836;
                }
                //Strip off any trailing .js since mainScript is now
                //like a module name.
                mainScript$6835 = mainScript$6835.replace(jsSuffixRegExp$6840, '');
                if (//If mainScript is still a path, fall back to dataMain
                    req$6827.jsExtRegExp.test(mainScript$6835)) {
                    mainScript$6835 = dataMain$6831;
                }
                //Put the data-main script in the files to load.
                cfg$6852.deps = cfg$6852.deps ? cfg$6852.deps.concat(mainScript$6835) : [mainScript$6835];
                return true;
            }
        });
    }
    /**
     * The function that handles definitions of modules. Differs from
     * require() in that a string for the module should be the first argument,
     * and the function to execute after dependencies are loaded should
     * return a value to define the module corresponding to the first argument's
     * name.
     */
    define$6825 = function (name$7172, deps$7173, callback$7174) {
        var node$7175, context$7176;
        if (//Allow for anonymous modules
            typeof name$7172 !== 'string') {
            //Adjust args appropriately
            callback$7174 = deps$7173;
            deps$7173 = name$7172;
            name$7172 = null;
        }
        if (//This module may not have dependencies
            !isArray$6856(deps$7173)) {
            callback$7174 = deps$7173;
            deps$7173 = null;
        }
        if (//If no name, and callback is a function, then figure out if it a
            //CommonJS thing with dependencies.
            !deps$7173 && isFunction$6855(callback$7174)) {
            deps$7173 = [];
            if (//Remove comments from the callback string,
                //look for require calls, and pull them into the dependencies,
                //but only if there are function args.
                callback$7174.length) {
                callback$7174.toString().replace(commentRegExp$6838, '').replace(cjsRequireRegExp$6839, function (match$7177, dep$7178) {
                    deps$7173.push(dep$7178);
                });
                //May be a CommonJS thing even without require calls, but still
                //could use exports, and module. Avoid doing exports and module
                //work though if it just needs require.
                //REQUIRES the function to expect the CommonJS variables in the
                //order listed below.
                deps$7173 = (callback$7174.length === 1 ? ['require'] : [
                    'require',
                    'exports',
                    'module'
                ]).concat(deps$7173);
            }
        }
        if (//If in IE 6-8 and hit an anonymous define() call, do the interactive
            //work.
            useInteractive$6854) {
            node$7175 = currentlyAddingScript$6834 || getInteractiveScript$6869();
            if (node$7175) {
                if (!name$7172) {
                    name$7172 = node$7175.getAttribute('data-requiremodule');
                }
                context$7176 = contexts$6851[node$7175.getAttribute('data-requirecontext')];
            }
        }
        if (//Always save off evaluating the def call until the script onload handler.
            //This allows multiple modules to be in a file without prematurely
            //tracing dependencies, and allows for anonymous module support,
            //where the module name is not known until the script onload event
            //occurs. If no context, use the global queue, and get it processed
            //in the onscript load callback.
            context$7176) {
            context$7176.defQueue.push([
                name$7172,
                deps$7173,
                callback$7174
            ]);
            context$7176.defQueueMap[name$7172] = true;
        } else {
            globalDefQueue$6853.push([
                name$7172,
                deps$7173,
                callback$7174
            ]);
        }
    };
    define$6825.amd = { jQuery: true };
    /**
     * Executes the text. Normally just uses eval, but can be modified
     * to use a better, environment-specific call. Only used for transpiling
     * loader plugins, not for plain JS modules.
     * @param {String} text the text to execute/evaluate.
     */
    req$6827.exec = function (text$7179) {
        /*jslint evil: true */
        return eval(text$7179);
    };
    //Set up with config info.
    req$6827(cfg$6852);
}(this));