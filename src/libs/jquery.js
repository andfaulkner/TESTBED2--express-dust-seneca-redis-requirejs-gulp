(function (global$2708, factory$2709) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        // For CommonJS and CommonJS-like environments where a proper `window`
        // is present, execute the factory and get jQuery.
        // For environments that do not have a `window` with a `document`
        // (such as Node.js), expose a factory as module.exports.
        // This accentuates the need for the creation of a real `window`.
        // e.g. var jQuery = require("jquery")(window);
        // See ticket #14549 for more info.
        module.exports = global$2708.document ? factory$2709(global$2708, true) : function (w$2710) {
            if (!w$2710.document) {
                throw new Error('jQuery requires a window with a document');
            }
            return factory$2709(w$2710);
        };
    } else {
        factory$2709(global$2708);
    }
}(typeof window !== 'undefined' ? window : this, function (window$2711, noGlobal$2712) {
    // Support: Firefox 18+
    // Can't be in strict mode, several libs including ASP.NET trace
    // the stack via arguments.caller.callee and Firefox dies if
    // you try to trace through "use strict" call chains. (#13335)
    //
    var arr$2713 = [];
    var slice$2714 = arr$2713.slice;
    var concat$2715 = arr$2713.concat;
    var push$2716 = arr$2713.push;
    var indexOf$2717 = arr$2713.indexOf;
    var class2type$2718 = {};
    var toString$2719 = class2type$2718.toString;
    var hasOwn$2720 = class2type$2718.hasOwnProperty;
    var support$2721 = {};
    var // Use the correct document accordingly with window argument (sandbox)
        document$2722 = window$2711.document, version$2723 = '2.1.4', // Define a local copy of jQuery
        jQuery$2724 = function (selector$2856, context$2857) {
            // The jQuery object is actually just the init constructor 'enhanced'
            // Need init if jQuery is called (just allow error to be thrown if not included)
            return new jQuery$2724.fn.init(selector$2856, context$2857);
        },
        // Support: Android<4.1
        // Make sure we trim BOM and NBSP
        rtrim$2725 = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        // Matches dashed string for camelizing
        rmsPrefix$2726 = /^-ms-/, rdashAlpha$2727 = /-([\da-z])/gi, // Used by jQuery.camelCase as callback to replace()
        fcamelCase$2728 = function (all$2858, letter$2859) {
            return letter$2859.toUpperCase();
        };
    jQuery$2724.fn = jQuery$2724.prototype = {
        // The current version of jQuery being used
        jquery: version$2723,
        constructor: jQuery$2724,
        // Start with an empty selector
        selector: '',
        // The default length of a jQuery object is 0
        length: 0,
        toArray: function () {
            return slice$2714.call(this);
        },
        // Get the Nth element in the matched element set OR
        // Get the whole matched element set as a clean array
        get: function (num$2860) {
            return num$2860 != null ? // Return just the one element from the set
            num$2860 < 0 ? this[num$2860 + this.length] : this[num$2860] : // Return all the elements in a clean array
            slice$2714.call(this);
        },
        // Take an array of elements and push it onto the stack
        // (returning the new matched element set)
        pushStack: function (elems$2861) {
            var // Build a new jQuery matched element set
            ret$2862 = jQuery$2724.merge(this.constructor(), elems$2861);
            // Add the old object onto the stack (as a reference)
            ret$2862.prevObject = this;
            ret$2862.context = this.context;
            // Return the newly-formed element set
            return ret$2862;
        },
        // Execute a callback for every element in the matched set.
        // (You can seed the arguments with an array of args, but this is
        // only used internally.)
        each: function (callback$2863, args$2864) {
            return jQuery$2724.each(this, callback$2863, args$2864);
        },
        map: function (callback$2865) {
            return this.pushStack(jQuery$2724.map(this, function (elem$2866, i$2867) {
                return callback$2865.call(elem$2866, i$2867, elem$2866);
            }));
        },
        slice: function () {
            return this.pushStack(slice$2714.apply(this, arguments));
        },
        first: function () {
            return this.eq(0);
        },
        last: function () {
            return this.eq(-1);
        },
        eq: function (i$2868) {
            var len$2869 = this.length, j$2870 = +i$2868 + (i$2868 < 0 ? len$2869 : 0);
            return this.pushStack(j$2870 >= 0 && j$2870 < len$2869 ? [this[j$2870]] : []);
        },
        end: function () {
            return this.prevObject || this.constructor(null);
        },
        // For internal use only.
        // Behaves like an Array's method, not like a jQuery method.
        push: push$2716,
        sort: arr$2713.sort,
        splice: arr$2713.splice
    };
    jQuery$2724.extend = jQuery$2724.fn.extend = function () {
        var options$2871, name$2872, src$2873, copy$2874, copyIsArray$2875, clone$2876, target$2877 = arguments[0] || {}, i$2878 = 1, length$2879 = arguments.length, deep$2880 = false;
        if (// Handle a deep copy situation
            typeof target$2877 === 'boolean') {
            deep$2880 = target$2877;
            // Skip the boolean and the target
            target$2877 = arguments[i$2878] || {};
            i$2878++;
        }
        if (// Handle case when target is a string or something (possible in deep copy)
            typeof target$2877 !== 'object' && !jQuery$2724.isFunction(target$2877)) {
            target$2877 = {};
        }
        if (// Extend jQuery itself if only one argument is passed
            i$2878 === length$2879) {
            target$2877 = this;
            i$2878--;
        }
        for (; i$2878 < length$2879; i$2878++) {
            if ((// Only deal with non-null/undefined values
                options$2871 = arguments[i$2878]) != null) {
                for (// Extend the base object
                    name$2872 in options$2871) {
                    src$2873 = target$2877[name$2872];
                    copy$2874 = options$2871[name$2872];
                    if (// Prevent never-ending loop
                        target$2877 === copy$2874) {
                        continue;
                    }
                    if (// Recurse if we're merging plain objects or arrays
                        deep$2880 && copy$2874 && (jQuery$2724.isPlainObject(copy$2874) || (copyIsArray$2875 = jQuery$2724.isArray(copy$2874)))) {
                        if (copyIsArray$2875) {
                            copyIsArray$2875 = false;
                            clone$2876 = src$2873 && jQuery$2724.isArray(src$2873) ? src$2873 : [];
                        } else {
                            clone$2876 = src$2873 && jQuery$2724.isPlainObject(src$2873) ? src$2873 : {};
                        }
                        // Never move original objects, clone them
                        target$2877[name$2872] = jQuery$2724.extend(deep$2880, clone$2876, copy$2874);
                    } else if (copy$2874 !== undefined) {
                        target$2877[name$2872] = copy$2874;
                    }
                }
            }
        }
        // Return the modified object
        return target$2877;
    };
    jQuery$2724.extend({
        // Unique for each copy of jQuery on the page
        expando: 'jQuery' + (version$2723 + Math.random()).replace(/\D/g, ''),
        // Assume jQuery is ready without the ready module
        isReady: true,
        error: function (msg$2881) {
            throw new Error(msg$2881);
        },
        noop: function () {
        },
        isFunction: function (obj$2882) {
            return jQuery$2724.type(obj$2882) === 'function';
        },
        isArray: Array.isArray,
        isWindow: function (obj$2883) {
            return obj$2883 != null && obj$2883 === obj$2883.window;
        },
        isNumeric: function (obj$2884) {
            return // parseFloat NaNs numeric-cast false positives (null|true|false|"")
            // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
            // subtraction forces infinities to NaN
            // adding 1 corrects loss of precision from parseFloat (#15100)
            !jQuery$2724.isArray(obj$2884) && obj$2884 - parseFloat(obj$2884) + 1 >= 0;
        },
        isPlainObject: function (obj$2885) {
            if (// Not plain objects:
                // - Any object or value whose internal [[Class]] property is not "[object Object]"
                // - DOM nodes
                // - window
                jQuery$2724.type(obj$2885) !== 'object' || obj$2885.nodeType || jQuery$2724.isWindow(obj$2885)) {
                return false;
            }
            if (obj$2885.constructor && !hasOwn$2720.call(obj$2885.constructor.prototype, 'isPrototypeOf')) {
                return false;
            }
            // If the function hasn't returned already, we're confident that
            // |obj| is a plain object, created by {} or constructed with new Object
            return true;
        },
        isEmptyObject: function (obj$2886) {
            var name$2887;
            for (name$2887 in obj$2886) {
                return false;
            }
            return true;
        },
        type: function (obj$2888) {
            if (obj$2888 == null) {
                return obj$2888 + '';
            }
            return // Support: Android<4.0, iOS<6 (functionish RegExp)
            typeof obj$2888 === 'object' || typeof obj$2888 === 'function' ? class2type$2718[toString$2719.call(obj$2888)] || 'object' : typeof obj$2888;
        },
        // Evaluates a script in a global context
        globalEval: function (code$2889) {
            var script$2890, indirect$2891 = eval;
            code$2889 = jQuery$2724.trim(code$2889);
            if (code$2889) {
                if (// If the code includes a valid, prologue position
                    // strict mode pragma, execute code by injecting a
                    // script tag into the document.
                    code$2889.indexOf('use strict') === 1) {
                    script$2890 = document$2722.createElement('script');
                    script$2890.text = code$2889;
                    document$2722.head.appendChild(script$2890).parentNode.removeChild(script$2890);
                } else {
                    // Otherwise, avoid the DOM node creation, insertion
                    // and removal by using an indirect global eval
                    indirect$2891(code$2889);
                }
            }
        },
        // Convert dashed to camelCase; used by the css and data modules
        // Support: IE9-11+
        // Microsoft forgot to hump their vendor prefix (#9572)
        camelCase: function (string$2892) {
            return string$2892.replace(rmsPrefix$2726, 'ms-').replace(rdashAlpha$2727, fcamelCase$2728);
        },
        nodeName: function (elem$2893, name$2894) {
            return elem$2893.nodeName && elem$2893.nodeName.toLowerCase() === name$2894.toLowerCase();
        },
        // args is for internal usage only
        each: function (obj$2895, callback$2896, args$2897) {
            var value$2898, i$2899 = 0, length$2900 = obj$2895.length, isArray$2901 = isArraylike$2729(obj$2895);
            if (args$2897) {
                if (isArray$2901) {
                    for (; i$2899 < length$2900; i$2899++) {
                        value$2898 = callback$2896.apply(obj$2895[i$2899], args$2897);
                        if (value$2898 === false) {
                            break;
                        }
                    }
                } else {
                    for (i$2899 in obj$2895) {
                        value$2898 = callback$2896.apply(obj$2895[i$2899], args$2897);
                        if (value$2898 === false) {
                            break;
                        }
                    }
                }
            } else {
                if (isArray$2901) {
                    for (; i$2899 < length$2900; i$2899++) {
                        value$2898 = callback$2896.call(obj$2895[i$2899], i$2899, obj$2895[i$2899]);
                        if (value$2898 === false) {
                            break;
                        }
                    }
                } else {
                    for (i$2899 in obj$2895) {
                        value$2898 = callback$2896.call(obj$2895[i$2899], i$2899, obj$2895[i$2899]);
                        if (value$2898 === false) {
                            break;
                        }
                    }
                }
            }
            return obj$2895;
        },
        // Support: Android<4.1
        trim: function (text$2902) {
            return text$2902 == null ? '' : (text$2902 + '').replace(rtrim$2725, '');
        },
        // results is for internal usage only
        makeArray: function (arr$2903, results$2904) {
            var ret$2905 = results$2904 || [];
            if (arr$2903 != null) {
                if (isArraylike$2729(Object(arr$2903))) {
                    jQuery$2724.merge(ret$2905, typeof arr$2903 === 'string' ? [arr$2903] : arr$2903);
                } else {
                    push$2716.call(ret$2905, arr$2903);
                }
            }
            return ret$2905;
        },
        inArray: function (elem$2906, arr$2907, i$2908) {
            return arr$2907 == null ? -1 : indexOf$2717.call(arr$2907, elem$2906, i$2908);
        },
        merge: function (first$2909, second$2910) {
            var len$2911 = +second$2910.length, j$2912 = 0, i$2913 = first$2909.length;
            for (; j$2912 < len$2911; j$2912++) {
                first$2909[i$2913++] = second$2910[j$2912];
            }
            first$2909.length = i$2913;
            return first$2909;
        },
        grep: function (elems$2914, callback$2915, invert$2916) {
            var callbackInverse$2917, matches$2918 = [], i$2919 = 0, length$2920 = elems$2914.length, callbackExpect$2921 = !invert$2916;
            for (; // Go through the array, only saving the items
                // that pass the validator function
                i$2919 < length$2920; i$2919++) {
                callbackInverse$2917 = !callback$2915(elems$2914[i$2919], i$2919);
                if (callbackInverse$2917 !== callbackExpect$2921) {
                    matches$2918.push(elems$2914[i$2919]);
                }
            }
            return matches$2918;
        },
        // arg is for internal usage only
        map: function (elems$2922, callback$2923, arg$2924) {
            var value$2925, i$2926 = 0, length$2927 = elems$2922.length, isArray$2928 = isArraylike$2729(elems$2922), ret$2929 = [];
            if (// Go through the array, translating each of the items to their new values
                isArray$2928) {
                for (; i$2926 < length$2927; i$2926++) {
                    value$2925 = callback$2923(elems$2922[i$2926], i$2926, arg$2924);
                    if (value$2925 != null) {
                        ret$2929.push(value$2925);
                    }
                }
            } else {
                for (i$2926 in elems$2922) {
                    value$2925 = callback$2923(elems$2922[i$2926], i$2926, arg$2924);
                    if (value$2925 != null) {
                        ret$2929.push(value$2925);
                    }
                }
            }
            // Flatten any nested arrays
            return concat$2715.apply([], ret$2929);
        },
        // A global GUID counter for objects
        guid: 1,
        // Bind a function to a context, optionally partially applying any
        // arguments.
        proxy: function (fn$2930, context$2931) {
            var tmp$2932, args$2933, proxy$2934;
            if (typeof context$2931 === 'string') {
                tmp$2932 = fn$2930[context$2931];
                context$2931 = fn$2930;
                fn$2930 = tmp$2932;
            }
            if (// Quick check to determine if target is callable, in the spec
                // this throws a TypeError, but we will just return undefined.
                !jQuery$2724.isFunction(fn$2930)) {
                return undefined;
            }
            // Simulated bind
            args$2933 = slice$2714.call(arguments, 2);
            proxy$2934 = function () {
                return fn$2930.apply(context$2931 || this, args$2933.concat(slice$2714.call(arguments)));
            };
            // Set the guid of unique handler to the same of original handler, so it can be removed
            proxy$2934.guid = fn$2930.guid = fn$2930.guid || jQuery$2724.guid++;
            return proxy$2934;
        },
        now: Date.now,
        // jQuery.support is not used in Core but other projects attach their
        // properties to it so it needs to exist.
        support: support$2721
    });
    // Populate the class2type map
    jQuery$2724.each('Boolean Number String Function Array Date RegExp Object Error'.split(' '), function (i$2935, name$2936) {
        class2type$2718['[object ' + name$2936 + ']'] = name$2936.toLowerCase();
    });
    function isArraylike$2729(obj$2937) {
        var // Support: iOS 8.2 (not reproducible in simulator)
            // `in` check used to prevent JIT error (gh-2145)
            // hasOwn isn't used here due to false negatives
            // regarding Nodelist length in IE
            length$2938 = 'length' in obj$2937 && obj$2937.length, type$2939 = jQuery$2724.type(obj$2937);
        if (type$2939 === 'function' || jQuery$2724.isWindow(obj$2937)) {
            return false;
        }
        if (obj$2937.nodeType === 1 && length$2938) {
            return true;
        }
        return type$2939 === 'array' || length$2938 === 0 || typeof length$2938 === 'number' && length$2938 > 0 && length$2938 - 1 in obj$2937;
    }
    var Sizzle$2730 = function (window$2940) {
        var i$2941, support$2942, Expr$2943, getText$2944, isXML$2945, tokenize$2946, compile$2947, select$2948, outermostContext$2949, sortInput$2950, hasDuplicate$2951,
            // Local document vars
            setDocument$2952, document$2953, docElem$2954, documentIsHTML$2955, rbuggyQSA$2956, rbuggyMatches$2957, matches$2958, contains$2959, // Instance-specific data
            expando$2960 = 'sizzle' + 1 * new Date(), preferredDoc$2961 = window$2940.document, dirruns$2962 = 0, done$2963 = 0, classCache$2964 = createCache$3000(), tokenCache$2965 = createCache$3000(), compilerCache$2966 = createCache$3000(), sortOrder$2967 = function (a$3018, b$3019) {
                if (a$3018 === b$3019) {
                    hasDuplicate$2951 = true;
                }
                return 0;
            }, // General-purpose constants
            MAX_NEGATIVE$2968 = 1 << 31, // Instance methods
            hasOwn$2969 = {}.hasOwnProperty, arr$2970 = [], pop$2971 = arr$2970.pop, push_native$2972 = arr$2970.push, push$2973 = arr$2970.push, slice$2974 = arr$2970.slice, // Use a stripped-down indexOf as it's faster than native
            // http://jsperf.com/thor-indexof-vs-for/5
            indexOf$2975 = function (list$3020, elem$3021) {
                var i$3022 = 0, len$3023 = list$3020.length;
                for (; i$3022 < len$3023; i$3022++) {
                    if (list$3020[i$3022] === elem$3021) {
                        return i$3022;
                    }
                }
                return -1;
            }, booleans$2976 = 'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped',
            // Regular expressions
            // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
            whitespace$2977 = '[\\x20\\t\\r\\n\\f]',
            // http://www.w3.org/TR/css3-syntax/#characters
            characterEncoding$2978 = '(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+', // Loosely modeled on CSS identifier characters
            // An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
            // Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
            identifier$2979 = characterEncoding$2978.replace('w', 'w#'), // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
            attributes$2980 = '\\[' + whitespace$2977 + '*(' + characterEncoding$2978 + ')(?:' + whitespace$2977 + // Operator (capture 2)
            '*([*^$|!~]?=)' + whitespace$2977 + // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
            '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' + identifier$2979 + '))|)' + whitespace$2977 + '*\\]', pseudos$2981 = ':(' + characterEncoding$2978 + ')(?:\\((' + // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
            // 1. quoted (capture 3; capture 4 or capture 5)
            '(\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|' + // 2. simple (capture 6)
            '((?:\\\\.|[^\\\\()[\\]]|' + attributes$2980 + ')*)|' + // 3. anything else (capture 2)
            '.*' + ')\\)|)', // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
            rwhitespace$2982 = new RegExp(whitespace$2977 + '+', 'g'), rtrim$2983 = new RegExp('^' + whitespace$2977 + '+|((?:^|[^\\\\])(?:\\\\.)*)' + whitespace$2977 + '+$', 'g'), rcomma$2984 = new RegExp('^' + whitespace$2977 + '*,' + whitespace$2977 + '*'), rcombinators$2985 = new RegExp('^' + whitespace$2977 + '*([>+~]|' + whitespace$2977 + ')' + whitespace$2977 + '*'), rattributeQuotes$2986 = new RegExp('=' + whitespace$2977 + '*([^\\]\'"]*?)' + whitespace$2977 + '*\\]', 'g'), rpseudo$2987 = new RegExp(pseudos$2981), ridentifier$2988 = new RegExp('^' + identifier$2979 + '$'), matchExpr$2989 = {
                'ID': new RegExp('^#(' + characterEncoding$2978 + ')'),
                'CLASS': new RegExp('^\\.(' + characterEncoding$2978 + ')'),
                'TAG': new RegExp('^(' + characterEncoding$2978.replace('w', 'w*') + ')'),
                'ATTR': new RegExp('^' + attributes$2980),
                'PSEUDO': new RegExp('^' + pseudos$2981),
                'CHILD': new RegExp('^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' + whitespace$2977 + '*(even|odd|(([+-]|)(\\d*)n|)' + whitespace$2977 + '*(?:([+-]|)' + whitespace$2977 + '*(\\d+)|))' + whitespace$2977 + '*\\)|)', 'i'),
                'bool': new RegExp('^(?:' + booleans$2976 + ')$', 'i'),
                // For use in libraries implementing .is()
                // We use this for POS matching in `select`
                'needsContext': new RegExp('^' + whitespace$2977 + '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' + whitespace$2977 + '*((?:-\\d)?\\d*)' + whitespace$2977 + '*\\)|)(?=[^-]|$)', 'i')
            }, rinputs$2990 = /^(?:input|select|textarea|button)$/i, rheader$2991 = /^h\d$/i, rnative$2992 = /^[^{]+\{\s*\[native \w/,
            // Easily-parseable/retrievable ID or TAG or CLASS selectors
            rquickExpr$2993 = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling$2994 = /[+~]/, rescape$2995 = /'|\\/g, // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
            runescape$2996 = new RegExp('\\\\([\\da-f]{1,6}' + whitespace$2977 + '?|(' + whitespace$2977 + ')|.)', 'ig'), funescape$2997 = function (_$3024, escaped$3025, escapedWhitespace$3026) {
                var high$3027 = '0x' + escaped$3025 - 65536;
                return // NaN means non-codepoint
                // Support: Firefox<24
                // Workaround erroneous numeric interpretation of +"0x"
                high$3027 !== high$3027 || escapedWhitespace$3026 ? escaped$3025 : high$3027 < 0 ? // BMP codepoint
                String.fromCharCode(high$3027 + 65536) : // Supplemental Plane codepoint (surrogate pair)
                String.fromCharCode(high$3027 >> 10 | 55296, high$3027 & 1023 | 56320);
            }, // Used for iframes
            // See setDocument()
            // Removing the function wrapper causes a "Permission Denied"
            // error in IE
            unloadHandler$2998 = function () {
                setDocument$2952();
            };
        try {
            // Optimize for push.apply( _, NodeList )
            push$2973.apply(arr$2970 = slice$2974.call(preferredDoc$2961.childNodes), preferredDoc$2961.childNodes);
            // Support: Android<4.0
            // Detect silently failing push.apply
            arr$2970[preferredDoc$2961.childNodes.length].nodeType;
        } catch (e$3028) {
            push$2973 = {
                apply: arr$2970.length ? function (target$3029, els$3030) {
                    push_native$2972.apply(target$3029, slice$2974.call(els$3030));
                } : function (target$3031, els$3032) {
                    var j$3033 = target$3031.length, i$3034 = 0;
                    while (// Can't trust NodeList.length
                        target$3031[j$3033++] = els$3032[i$3034++]) {
                    }
                    target$3031.length = j$3033 - 1;
                }
            };
        }
        function Sizzle$2999(selector$3035, context$3036, results$3037, seed$3038) {
            var match$3039, elem$3040, m$3041, nodeType$3042,
                // QSA vars
                i$3043, groups$3044, old$3045, nid$3046, newContext$3047, newSelector$3048;
            if ((context$3036 ? context$3036.ownerDocument || context$3036 : preferredDoc$2961) !== document$2953) {
                setDocument$2952(context$3036);
            }
            context$3036 = context$3036 || document$2953;
            results$3037 = results$3037 || [];
            nodeType$3042 = context$3036.nodeType;
            if (typeof selector$3035 !== 'string' || !selector$3035 || nodeType$3042 !== 1 && nodeType$3042 !== 9 && nodeType$3042 !== 11) {
                return results$3037;
            }
            if (!seed$3038 && documentIsHTML$2955) {
                if (// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
                    nodeType$3042 !== 11 && (match$3039 = rquickExpr$2993.exec(selector$3035))) {
                    if (// Speed-up: Sizzle("#ID")
                        m$3041 = match$3039[1]) {
                        if (nodeType$3042 === 9) {
                            elem$3040 = context$3036.getElementById(m$3041);
                            if (// Check parentNode to catch when Blackberry 4.6 returns
                                // nodes that are no longer in the document (jQuery #6963)
                                elem$3040 && elem$3040.parentNode) {
                                if (// Handle the case where IE, Opera, and Webkit return items
                                    // by name instead of ID
                                    elem$3040.id === m$3041) {
                                    results$3037.push(elem$3040);
                                    return results$3037;
                                }
                            } else {
                                return results$3037;
                            }
                        } else {
                            if (// Context is not a document
                                context$3036.ownerDocument && (elem$3040 = context$3036.ownerDocument.getElementById(m$3041)) && contains$2959(context$3036, elem$3040) && elem$3040.id === m$3041) {
                                results$3037.push(elem$3040);
                                return results$3037;
                            }
                        }
                    } else if (match$3039[2]) {
                        push$2973.apply(results$3037, context$3036.getElementsByTagName(selector$3035));
                        return results$3037;
                    } else if ((m$3041 = match$3039[3]) && support$2942.getElementsByClassName) {
                        push$2973.apply(results$3037, context$3036.getElementsByClassName(m$3041));
                        return results$3037;
                    }
                }
                if (// QSA path
                    support$2942.qsa && (!rbuggyQSA$2956 || !rbuggyQSA$2956.test(selector$3035))) {
                    nid$3046 = old$3045 = expando$2960;
                    newContext$3047 = context$3036;
                    newSelector$3048 = nodeType$3042 !== 1 && selector$3035;
                    if (// qSA works strangely on Element-rooted queries
                        // We can work around this by specifying an extra ID on the root
                        // and working up from there (Thanks to Andrew Dupont for the technique)
                        // IE 8 doesn't work on object elements
                        nodeType$3042 === 1 && context$3036.nodeName.toLowerCase() !== 'object') {
                        groups$3044 = tokenize$2946(selector$3035);
                        if (old$3045 = context$3036.getAttribute('id')) {
                            nid$3046 = old$3045.replace(rescape$2995, '\\$&');
                        } else {
                            context$3036.setAttribute('id', nid$3046);
                        }
                        nid$3046 = '[id=\'' + nid$3046 + '\'] ';
                        i$3043 = groups$3044.length;
                        while (i$3043--) {
                            groups$3044[i$3043] = nid$3046 + toSelector$3010(groups$3044[i$3043]);
                        }
                        newContext$3047 = rsibling$2994.test(selector$3035) && testContext$3008(context$3036.parentNode) || context$3036;
                        newSelector$3048 = groups$3044.join(',');
                    }
                    if (newSelector$3048) {
                        try {
                            push$2973.apply(results$3037, newContext$3047.querySelectorAll(newSelector$3048));
                            return results$3037;
                        } catch (qsaError$3049) {
                        } finally {
                            if (!old$3045) {
                                context$3036.removeAttribute('id');
                            }
                        }
                    }
                }
            }
            return // All others
            select$2948(selector$3035.replace(rtrim$2983, '$1'), context$3036, results$3037, seed$3038);
        }
        function createCache$3000() {
            var keys$3050 = [];
            function cache$3051(key$3052, value$3053) {
                if (// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
                    keys$3050.push(key$3052 + ' ') > Expr$2943.cacheLength) {
                    delete // Only keep the most recent entries
                    cache$3051[keys$3050.shift()];
                }
                return cache$3051[key$3052 + ' '] = value$3053;
            }
            return cache$3051;
        }
        function markFunction$3001(fn$3054) {
            fn$3054[expando$2960] = true;
            return fn$3054;
        }
        function assert$3002(fn$3055) {
            var div$3056 = document$2953.createElement('div');
            try {
                return !!fn$3055(div$3056);
            } catch (e$3057) {
                return false;
            } finally {
                if (// Remove from its parent by default
                    div$3056.parentNode) {
                    div$3056.parentNode.removeChild(div$3056);
                }
                // release memory in IE
                div$3056 = null;
            }
        }
        function addHandle$3003(attrs$3058, handler$3059) {
            var arr$3060 = attrs$3058.split('|'), i$3061 = attrs$3058.length;
            while (i$3061--) {
                Expr$2943.attrHandle[arr$3060[i$3061]] = handler$3059;
            }
        }
        function siblingCheck$3004(a$3062, b$3063) {
            var cur$3064 = b$3063 && a$3062, diff$3065 = cur$3064 && a$3062.nodeType === 1 && b$3063.nodeType === 1 && (~b$3063.sourceIndex || MAX_NEGATIVE$2968) - (~a$3062.sourceIndex || MAX_NEGATIVE$2968);
            if (// Use IE sourceIndex if available on both nodes
                diff$3065) {
                return diff$3065;
            }
            if (// Check if b follows a
                cur$3064) {
                while (cur$3064 = cur$3064.nextSibling) {
                    if (cur$3064 === b$3063) {
                        return -1;
                    }
                }
            }
            return a$3062 ? 1 : -1;
        }
        function createInputPseudo$3005(type$3066) {
            return function (elem$3067) {
                var name$3068 = elem$3067.nodeName.toLowerCase();
                return name$3068 === 'input' && elem$3067.type === type$3066;
            };
        }
        function createButtonPseudo$3006(type$3069) {
            return function (elem$3070) {
                var name$3071 = elem$3070.nodeName.toLowerCase();
                return (name$3071 === 'input' || name$3071 === 'button') && elem$3070.type === type$3069;
            };
        }
        function createPositionalPseudo$3007(fn$3072) {
            return markFunction$3001(function (argument$3073) {
                argument$3073 = +argument$3073;
                return markFunction$3001(function (seed$3074, matches$3075) {
                    var j$3076, matchIndexes$3077 = fn$3072([], seed$3074.length, argument$3073), i$3078 = matchIndexes$3077.length;
                    while (// Match elements found at the specified indexes
                        i$3078--) {
                        if (seed$3074[j$3076 = matchIndexes$3077[i$3078]]) {
                            seed$3074[j$3076] = !(matches$3075[j$3076] = seed$3074[j$3076]);
                        }
                    }
                });
            });
        }
        function testContext$3008(context$3079) {
            return context$3079 && typeof context$3079.getElementsByTagName !== 'undefined' && context$3079;
        }
        // Expose support vars for convenience
        support$2942 = Sizzle$2999.support = {};
        /**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
        isXML$2945 = Sizzle$2999.isXML = function (elem$3080) {
            var // documentElement is verified for cases where it doesn't yet exist
            // (such as loading iframes in IE - #4833)
            documentElement$3081 = elem$3080 && (elem$3080.ownerDocument || elem$3080).documentElement;
            return documentElement$3081 ? documentElement$3081.nodeName !== 'HTML' : false;
        };
        /**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
        setDocument$2952 = Sizzle$2999.setDocument = function (node$3082) {
            var hasCompare$3083, parent$3084, doc$3085 = node$3082 ? node$3082.ownerDocument || node$3082 : preferredDoc$2961;
            if (// If no document and documentElement is available, return
                doc$3085 === document$2953 || doc$3085.nodeType !== 9 || !doc$3085.documentElement) {
                return document$2953;
            }
            // Set our document
            document$2953 = doc$3085;
            docElem$2954 = doc$3085.documentElement;
            parent$3084 = doc$3085.defaultView;
            if (// Support: IE>8
                // If iframe document is assigned to "document" variable and if iframe has been reloaded,
                // IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
                // IE6-8 do not support the defaultView property so parent will be undefined
                parent$3084 && parent$3084 !== parent$3084.top) {
                if (// IE11 does not have attachEvent, so all must suffer
                    parent$3084.addEventListener) {
                    parent$3084.addEventListener('unload', unloadHandler$2998, false);
                } else if (parent$3084.attachEvent) {
                    parent$3084.attachEvent('onunload', unloadHandler$2998);
                }
            }
            /* Support tests
	---------------------------------------------------------------------- */
            documentIsHTML$2955 = !isXML$2945(doc$3085);
            /* Attributes
	---------------------------------------------------------------------- */
            // Support: IE<8
            // Verify that getAttribute really returns attributes and not properties
            // (excepting IE8 booleans)
            support$2942.attributes = assert$3002(function (div$3086) {
                div$3086.className = 'i';
                return !div$3086.getAttribute('className');
            });
            /* getElement(s)By*
	---------------------------------------------------------------------- */
            // Check if getElementsByTagName("*") returns only elements
            support$2942.getElementsByTagName = assert$3002(function (div$3087) {
                div$3087.appendChild(doc$3085.createComment(''));
                return !div$3087.getElementsByTagName('*').length;
            });
            // Support: IE<9
            support$2942.getElementsByClassName = rnative$2992.test(doc$3085.getElementsByClassName);
            // Support: IE<10
            // Check if getElementById returns elements by name
            // The broken getElementById methods don't pick up programatically-set names,
            // so use a roundabout getElementsByName test
            support$2942.getById = assert$3002(function (div$3088) {
                docElem$2954.appendChild(div$3088).id = expando$2960;
                return !doc$3085.getElementsByName || !doc$3085.getElementsByName(expando$2960).length;
            });
            if (// ID find and filter
                support$2942.getById) {
                Expr$2943.find['ID'] = function (id$3089, context$3090) {
                    if (typeof context$3090.getElementById !== 'undefined' && documentIsHTML$2955) {
                        var m$3091 = context$3090.getElementById(id$3089);
                        return // Check parentNode to catch when Blackberry 4.6 returns
                        // nodes that are no longer in the document #6963
                        m$3091 && m$3091.parentNode ? [m$3091] : [];
                    }
                };
                Expr$2943.filter['ID'] = function (id$3092) {
                    var attrId$3093 = id$3092.replace(runescape$2996, funescape$2997);
                    return function (elem$3094) {
                        return elem$3094.getAttribute('id') === attrId$3093;
                    };
                };
            } else {
                // Support: IE6/7
                // getElementById is not reliable as a find shortcut
                delete Expr$2943.find['ID'];
                Expr$2943.filter['ID'] = function (id$3095) {
                    var attrId$3096 = id$3095.replace(runescape$2996, funescape$2997);
                    return function (elem$3097) {
                        var node$3098 = typeof elem$3097.getAttributeNode !== 'undefined' && elem$3097.getAttributeNode('id');
                        return node$3098 && node$3098.value === attrId$3096;
                    };
                };
            }
            // Tag
            Expr$2943.find['TAG'] = support$2942.getElementsByTagName ? function (tag$3099, context$3100) {
                if (typeof context$3100.getElementsByTagName !== 'undefined') {
                    return context$3100.getElementsByTagName(tag$3099);
                } else if (support$2942.qsa) {
                    return context$3100.querySelectorAll(tag$3099);
                }
            } : function (tag$3101, context$3102) {
                var elem$3103, tmp$3104 = [], i$3105 = 0, // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
                    results$3106 = context$3102.getElementsByTagName(tag$3101);
                if (// Filter out possible comments
                    tag$3101 === '*') {
                    while (elem$3103 = results$3106[i$3105++]) {
                        if (elem$3103.nodeType === 1) {
                            tmp$3104.push(elem$3103);
                        }
                    }
                    return tmp$3104;
                }
                return results$3106;
            };
            // Class
            Expr$2943.find['CLASS'] = support$2942.getElementsByClassName && function (className$3107, context$3108) {
                if (documentIsHTML$2955) {
                    return context$3108.getElementsByClassName(className$3107);
                }
            };
            /* QSA/matchesSelector
	---------------------------------------------------------------------- */
            // QSA and matchesSelector support
            // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
            rbuggyMatches$2957 = [];
            // qSa(:focus) reports false when true (Chrome 21)
            // We allow this because of a bug in IE8/9 that throws an error
            // whenever `document.activeElement` is accessed on an iframe
            // So, we allow :focus to pass through QSA all the time to avoid the IE error
            // See http://bugs.jquery.com/ticket/13378
            rbuggyQSA$2956 = [];
            if (support$2942.qsa = rnative$2992.test(doc$3085.querySelectorAll)) {
                // Build QSA regex
                // Regex strategy adopted from Diego Perini
                assert$3002(function (div$3109) {
                    // Select is set to empty string on purpose
                    // This is to test IE's treatment of not explicitly
                    // setting a boolean content attribute,
                    // since its presence should be enough
                    // http://bugs.jquery.com/ticket/12359
                    docElem$2954.appendChild(div$3109).innerHTML = '<a id=\'' + expando$2960 + '\'></a>' + '<select id=\'' + expando$2960 + '-\f]\' msallowcapture=\'\'>' + '<option selected=\'\'></option></select>';
                    if (// Support: IE8, Opera 11-12.16
                        // Nothing should be selected when empty strings follow ^= or $= or *=
                        // The test attribute must be unknown in Opera but "safe" for WinRT
                        // http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
                        div$3109.querySelectorAll('[msallowcapture^=\'\']').length) {
                        rbuggyQSA$2956.push('[*^$]=' + whitespace$2977 + '*(?:\'\'|"")');
                    }
                    if (// Support: IE8
                        // Boolean attributes and "value" are not treated correctly
                        !div$3109.querySelectorAll('[selected]').length) {
                        rbuggyQSA$2956.push('\\[' + whitespace$2977 + '*(?:value|' + booleans$2976 + ')');
                    }
                    if (!// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
                        div$3109.querySelectorAll('[id~=' + expando$2960 + '-]').length) {
                        rbuggyQSA$2956.push('~=');
                    }
                    if (// Webkit/Opera - :checked should return selected option elements
                        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        // IE8 throws error here and will not see later tests
                        !div$3109.querySelectorAll(':checked').length) {
                        rbuggyQSA$2956.push(':checked');
                    }
                    if (!// Support: Safari 8+, iOS 8+
                        // https://bugs.webkit.org/show_bug.cgi?id=136851
                        // In-page `selector#id sibing-combinator selector` fails
                        div$3109.querySelectorAll('a#' + expando$2960 + '+*').length) {
                        rbuggyQSA$2956.push('.#.+[+~]');
                    }
                });
                assert$3002(function (div$3110) {
                    var // Support: Windows 8 Native Apps
                    // The type and name attributes are restricted during .innerHTML assignment
                    input$3111 = doc$3085.createElement('input');
                    input$3111.setAttribute('type', 'hidden');
                    div$3110.appendChild(input$3111).setAttribute('name', 'D');
                    if (// Support: IE8
                        // Enforce case-sensitivity of name attribute
                        div$3110.querySelectorAll('[name=d]').length) {
                        rbuggyQSA$2956.push('name' + whitespace$2977 + '*[*^$|!~]?=');
                    }
                    if (// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
                        // IE8 throws error here and will not see later tests
                        !div$3110.querySelectorAll(':enabled').length) {
                        rbuggyQSA$2956.push(':enabled', ':disabled');
                    }
                    // Opera 10-11 does not throw on post-comma invalid pseudos
                    div$3110.querySelectorAll('*,:x');
                    rbuggyQSA$2956.push(',.*:');
                });
            }
            if (support$2942.matchesSelector = rnative$2992.test(matches$2958 = docElem$2954.matches || docElem$2954.webkitMatchesSelector || docElem$2954.mozMatchesSelector || docElem$2954.oMatchesSelector || docElem$2954.msMatchesSelector)) {
                assert$3002(function (div$3112) {
                    // Check to see if it's possible to do matchesSelector
                    // on a disconnected node (IE 9)
                    support$2942.disconnectedMatch = matches$2958.call(div$3112, 'div');
                    // This should fail with an exception
                    // Gecko does not error, returns false instead
                    matches$2958.call(div$3112, '[s!=\'\']:x');
                    rbuggyMatches$2957.push('!=', pseudos$2981);
                });
            }
            rbuggyQSA$2956 = rbuggyQSA$2956.length && new RegExp(rbuggyQSA$2956.join('|'));
            rbuggyMatches$2957 = rbuggyMatches$2957.length && new RegExp(rbuggyMatches$2957.join('|'));
            /* Contains
	---------------------------------------------------------------------- */
            hasCompare$3083 = rnative$2992.test(docElem$2954.compareDocumentPosition);
            // Element contains another
            // Purposefully does not implement inclusive descendent
            // As in, an element does not contain itself
            contains$2959 = hasCompare$3083 || rnative$2992.test(docElem$2954.contains) ? function (a$3113, b$3114) {
                var adown$3115 = a$3113.nodeType === 9 ? a$3113.documentElement : a$3113, bup$3116 = b$3114 && b$3114.parentNode;
                return a$3113 === bup$3116 || !!(bup$3116 && bup$3116.nodeType === 1 && (adown$3115.contains ? adown$3115.contains(bup$3116) : a$3113.compareDocumentPosition && a$3113.compareDocumentPosition(bup$3116) & 16));
            } : function (a$3117, b$3118) {
                if (b$3118) {
                    while (b$3118 = b$3118.parentNode) {
                        if (b$3118 === a$3117) {
                            return true;
                        }
                    }
                }
                return false;
            };
            /* Sorting
	---------------------------------------------------------------------- */
            // Document order sorting
            sortOrder$2967 = hasCompare$3083 ? function (a$3119, b$3120) {
                if (// Flag for duplicate removal
                    a$3119 === b$3120) {
                    hasDuplicate$2951 = true;
                    return 0;
                }
                var // Sort on method existence if only one input has compareDocumentPosition
                compare$3121 = !a$3119.compareDocumentPosition - !b$3120.compareDocumentPosition;
                if (compare$3121) {
                    return compare$3121;
                }
                // Calculate position if both inputs belong to the same document
                compare$3121 = (a$3119.ownerDocument || a$3119) === (b$3120.ownerDocument || b$3120) ? a$3119.compareDocumentPosition(b$3120) : // Otherwise we know they are disconnected
                1;
                if (// Disconnected nodes
                    compare$3121 & 1 || !support$2942.sortDetached && b$3120.compareDocumentPosition(a$3119) === compare$3121) {
                    if (// Choose the first element that is related to our preferred document
                        a$3119 === doc$3085 || a$3119.ownerDocument === preferredDoc$2961 && contains$2959(preferredDoc$2961, a$3119)) {
                        return -1;
                    }
                    if (b$3120 === doc$3085 || b$3120.ownerDocument === preferredDoc$2961 && contains$2959(preferredDoc$2961, b$3120)) {
                        return 1;
                    }
                    return // Maintain original order
                    sortInput$2950 ? indexOf$2975(sortInput$2950, a$3119) - indexOf$2975(sortInput$2950, b$3120) : 0;
                }
                return compare$3121 & 4 ? -1 : 1;
            } : function (a$3122, b$3123) {
                if (// Exit early if the nodes are identical
                    a$3122 === b$3123) {
                    hasDuplicate$2951 = true;
                    return 0;
                }
                var cur$3124, i$3125 = 0, aup$3126 = a$3122.parentNode, bup$3127 = b$3123.parentNode, ap$3128 = [a$3122], bp$3129 = [b$3123];
                if (// Parentless nodes are either documents or disconnected
                    !aup$3126 || !bup$3127) {
                    return a$3122 === doc$3085 ? -1 : b$3123 === doc$3085 ? 1 : aup$3126 ? -1 : bup$3127 ? 1 : sortInput$2950 ? indexOf$2975(sortInput$2950, a$3122) - indexOf$2975(sortInput$2950, b$3123) : 0;
                } else if (aup$3126 === bup$3127) {
                    return siblingCheck$3004(a$3122, b$3123);
                }
                // Otherwise we need full lists of their ancestors for comparison
                cur$3124 = a$3122;
                while (cur$3124 = cur$3124.parentNode) {
                    ap$3128.unshift(cur$3124);
                }
                cur$3124 = b$3123;
                while (cur$3124 = cur$3124.parentNode) {
                    bp$3129.unshift(cur$3124);
                }
                while (// Walk down the tree looking for a discrepancy
                    ap$3128[i$3125] === bp$3129[i$3125]) {
                    i$3125++;
                }
                return i$3125 ? // Do a sibling check if the nodes have a common ancestor
                siblingCheck$3004(ap$3128[i$3125], bp$3129[i$3125]) : // Otherwise nodes in our document sort first
                ap$3128[i$3125] === preferredDoc$2961 ? -1 : bp$3129[i$3125] === preferredDoc$2961 ? 1 : 0;
            };
            return doc$3085;
        };
        Sizzle$2999.matches = function (expr$3130, elements$3131) {
            return Sizzle$2999(expr$3130, null, null, elements$3131);
        };
        Sizzle$2999.matchesSelector = function (elem$3132, expr$3133) {
            if (// Set document vars if needed
                (elem$3132.ownerDocument || elem$3132) !== document$2953) {
                setDocument$2952(elem$3132);
            }
            // Make sure that attribute selectors are quoted
            expr$3133 = expr$3133.replace(rattributeQuotes$2986, '=\'$1\']');
            if (support$2942.matchesSelector && documentIsHTML$2955 && (!rbuggyMatches$2957 || !rbuggyMatches$2957.test(expr$3133)) && (!rbuggyQSA$2956 || !rbuggyQSA$2956.test(expr$3133))) {
                try {
                    var ret$3134 = matches$2958.call(elem$3132, expr$3133);
                    if (// IE 9's matchesSelector returns false on disconnected nodes
                        ret$3134 || support$2942.disconnectedMatch || // As well, disconnected nodes are said to be in a document
                        // fragment in IE 9
                        elem$3132.document && elem$3132.document.nodeType !== 11) {
                        return ret$3134;
                    }
                } catch (e$3135) {
                }
            }
            return Sizzle$2999(expr$3133, document$2953, null, [elem$3132]).length > 0;
        };
        Sizzle$2999.contains = function (context$3136, elem$3137) {
            if (// Set document vars if needed
                (context$3136.ownerDocument || context$3136) !== document$2953) {
                setDocument$2952(context$3136);
            }
            return contains$2959(context$3136, elem$3137);
        };
        Sizzle$2999.attr = function (elem$3138, name$3139) {
            if (// Set document vars if needed
                (elem$3138.ownerDocument || elem$3138) !== document$2953) {
                setDocument$2952(elem$3138);
            }
            var fn$3140 = Expr$2943.attrHandle[name$3139.toLowerCase()], // Don't get fooled by Object.prototype properties (jQuery #13807)
                val$3141 = fn$3140 && hasOwn$2969.call(Expr$2943.attrHandle, name$3139.toLowerCase()) ? fn$3140(elem$3138, name$3139, !documentIsHTML$2955) : undefined;
            return val$3141 !== undefined ? val$3141 : support$2942.attributes || !documentIsHTML$2955 ? elem$3138.getAttribute(name$3139) : (val$3141 = elem$3138.getAttributeNode(name$3139)) && val$3141.specified ? val$3141.value : null;
        };
        Sizzle$2999.error = function (msg$3142) {
            throw new Error('Syntax error, unrecognized expression: ' + msg$3142);
        };
        /**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
        Sizzle$2999.uniqueSort = function (results$3143) {
            var elem$3144, duplicates$3145 = [], j$3146 = 0, i$3147 = 0;
            // Unless we *know* we can detect duplicates, assume their presence
            hasDuplicate$2951 = !support$2942.detectDuplicates;
            sortInput$2950 = !support$2942.sortStable && results$3143.slice(0);
            results$3143.sort(sortOrder$2967);
            if (hasDuplicate$2951) {
                while (elem$3144 = results$3143[i$3147++]) {
                    if (elem$3144 === results$3143[i$3147]) {
                        j$3146 = duplicates$3145.push(i$3147);
                    }
                }
                while (j$3146--) {
                    results$3143.splice(duplicates$3145[j$3146], 1);
                }
            }
            // Clear input after sorting to release objects
            // See https://github.com/jquery/sizzle/pull/225
            sortInput$2950 = null;
            return results$3143;
        };
        /**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
        getText$2944 = Sizzle$2999.getText = function (elem$3148) {
            var node$3149, ret$3150 = '', i$3151 = 0, nodeType$3152 = elem$3148.nodeType;
            if (!nodeType$3152) {
                while (// If no nodeType, this is expected to be an array
                    node$3149 = elem$3148[i$3151++]) {
                    // Do not traverse comment nodes
                    ret$3150 += getText$2944(node$3149);
                }
            } else if (nodeType$3152 === 1 || nodeType$3152 === 9 || nodeType$3152 === 11) {
                if (// Use textContent for elements
                    // innerText usage removed for consistency of new lines (jQuery #11153)
                    typeof elem$3148.textContent === 'string') {
                    return elem$3148.textContent;
                } else {
                    for (// Traverse its children
                        elem$3148 = elem$3148.firstChild; elem$3148; elem$3148 = elem$3148.nextSibling) {
                        ret$3150 += getText$2944(elem$3148);
                    }
                }
            } else if (nodeType$3152 === 3 || nodeType$3152 === 4) {
                return elem$3148.nodeValue;
            }
            // Do not include comment or processing instruction nodes
            return ret$3150;
        };
        Expr$2943 = Sizzle$2999.selectors = {
            // Can be adjusted by the user
            cacheLength: 50,
            createPseudo: markFunction$3001,
            match: matchExpr$2989,
            attrHandle: {},
            find: {},
            relative: {
                '>': {
                    dir: 'parentNode',
                    first: true
                },
                ' ': { dir: 'parentNode' },
                '+': {
                    dir: 'previousSibling',
                    first: true
                },
                '~': { dir: 'previousSibling' }
            },
            preFilter: {
                'ATTR': function (match$3153) {
                    match$3153[1] = match$3153[1].replace(runescape$2996, funescape$2997);
                    // Move the given value to match[3] whether quoted or unquoted
                    match$3153[3] = (match$3153[3] || match$3153[4] || match$3153[5] || '').replace(runescape$2996, funescape$2997);
                    if (match$3153[2] === '~=') {
                        match$3153[3] = ' ' + match$3153[3] + ' ';
                    }
                    return match$3153.slice(0, 4);
                },
                'CHILD': function (match$3154) {
                    /* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
                    match$3154[1] = match$3154[1].toLowerCase();
                    if (match$3154[1].slice(0, 3) === 'nth') {
                        if (// nth-* requires argument
                            !match$3154[3]) {
                            Sizzle$2999.error(match$3154[0]);
                        }
                        // numeric x and y parameters for Expr.filter.CHILD
                        // remember that false/true cast respectively to 0/1
                        match$3154[4] = +(match$3154[4] ? match$3154[5] + (match$3154[6] || 1) : 2 * (match$3154[3] === 'even' || match$3154[3] === 'odd'));
                        match$3154[5] = +(match$3154[7] + match$3154[8] || match$3154[3] === 'odd');
                    } else if (match$3154[3]) {
                        Sizzle$2999.error(match$3154[0]);
                    }
                    return match$3154;
                },
                'PSEUDO': function (match$3155) {
                    var excess$3156, unquoted$3157 = !match$3155[6] && match$3155[2];
                    if (matchExpr$2989['CHILD'].test(match$3155[0])) {
                        return null;
                    }
                    if (// Accept quoted arguments as-is
                        match$3155[3]) {
                        match$3155[2] = match$3155[4] || match$3155[5] || '';
                    } else if (unquoted$3157 && rpseudo$2987.test(unquoted$3157) && (// Get excess from tokenize (recursively)
                        excess$3156 = tokenize$2946(unquoted$3157, true)) && (// advance to the next closing parenthesis
                        excess$3156 = unquoted$3157.indexOf(')', unquoted$3157.length - excess$3156) - unquoted$3157.length)) {
                        // excess is a negative index
                        match$3155[0] = match$3155[0].slice(0, excess$3156);
                        match$3155[2] = unquoted$3157.slice(0, excess$3156);
                    }
                    // Return only captures needed by the pseudo filter method (type and argument)
                    return match$3155.slice(0, 3);
                }
            },
            filter: {
                'TAG': function (nodeNameSelector$3158) {
                    var nodeName$3159 = nodeNameSelector$3158.replace(runescape$2996, funescape$2997).toLowerCase();
                    return nodeNameSelector$3158 === '*' ? function () {
                        return true;
                    } : function (elem$3160) {
                        return elem$3160.nodeName && elem$3160.nodeName.toLowerCase() === nodeName$3159;
                    };
                },
                'CLASS': function (className$3161) {
                    var pattern$3162 = classCache$2964[className$3161 + ' '];
                    return pattern$3162 || (pattern$3162 = new RegExp('(^|' + whitespace$2977 + ')' + className$3161 + '(' + whitespace$2977 + '|$)')) && classCache$2964(className$3161, function (elem$3163) {
                        return pattern$3162.test(typeof elem$3163.className === 'string' && elem$3163.className || typeof elem$3163.getAttribute !== 'undefined' && elem$3163.getAttribute('class') || '');
                    });
                },
                'ATTR': function (name$3164, operator$3165, check$3166) {
                    return function (elem$3167) {
                        var result$3168 = Sizzle$2999.attr(elem$3167, name$3164);
                        if (result$3168 == null) {
                            return operator$3165 === '!=';
                        }
                        if (!operator$3165) {
                            return true;
                        }
                        result$3168 += '';
                        return operator$3165 === '=' ? result$3168 === check$3166 : operator$3165 === '!=' ? result$3168 !== check$3166 : operator$3165 === '^=' ? check$3166 && result$3168.indexOf(check$3166) === 0 : operator$3165 === '*=' ? check$3166 && result$3168.indexOf(check$3166) > -1 : operator$3165 === '$=' ? check$3166 && result$3168.slice(-check$3166.length) === check$3166 : operator$3165 === '~=' ? (' ' + result$3168.replace(rwhitespace$2982, ' ') + ' ').indexOf(check$3166) > -1 : operator$3165 === '|=' ? result$3168 === check$3166 || result$3168.slice(0, check$3166.length + 1) === check$3166 + '-' : false;
                    };
                },
                'CHILD': function (type$3169, what$3170, argument$3171, first$3172, last$3173) {
                    var simple$3174 = type$3169.slice(0, 3) !== 'nth', forward$3175 = type$3169.slice(-4) !== 'last', ofType$3176 = what$3170 === 'of-type';
                    return first$3172 === 1 && last$3173 === 0 ? function (elem$3177) {
                        return !!elem$3177.parentNode;
                    } : function (elem$3178, context$3179, xml$3180) {
                        var cache$3181, outerCache$3182, node$3183, diff$3184, nodeIndex$3185, start$3186, dir$3187 = simple$3174 !== forward$3175 ? 'nextSibling' : 'previousSibling', parent$3188 = elem$3178.parentNode, name$3189 = ofType$3176 && elem$3178.nodeName.toLowerCase(), useCache$3190 = !xml$3180 && !ofType$3176;
                        if (parent$3188) {
                            if (// :(first|last|only)-(child|of-type)
                                simple$3174) {
                                while (dir$3187) {
                                    node$3183 = elem$3178;
                                    while (node$3183 = node$3183[dir$3187]) {
                                        if (ofType$3176 ? node$3183.nodeName.toLowerCase() === name$3189 : node$3183.nodeType === 1) {
                                            return false;
                                        }
                                    }
                                    // Reverse direction for :only-* (if we haven't yet done so)
                                    start$3186 = dir$3187 = type$3169 === 'only' && !start$3186 && 'nextSibling';
                                }
                                return true;
                            }
                            start$3186 = [forward$3175 ? parent$3188.firstChild : parent$3188.lastChild];
                            if (// non-xml :nth-child(...) stores cache data on `parent`
                                forward$3175 && useCache$3190) {
                                // Seek `elem` from a previously-cached index
                                outerCache$3182 = parent$3188[expando$2960] || (parent$3188[expando$2960] = {});
                                cache$3181 = outerCache$3182[type$3169] || [];
                                nodeIndex$3185 = cache$3181[0] === dirruns$2962 && cache$3181[1];
                                diff$3184 = cache$3181[0] === dirruns$2962 && cache$3181[2];
                                node$3183 = nodeIndex$3185 && parent$3188.childNodes[nodeIndex$3185];
                                while (node$3183 = ++nodeIndex$3185 && node$3183 && node$3183[dir$3187] || (// Fallback to seeking `elem` from the start
                                    diff$3184 = nodeIndex$3185 = 0) || start$3186.pop()) {
                                    if (// When found, cache indexes on `parent` and break
                                        node$3183.nodeType === 1 && ++diff$3184 && node$3183 === elem$3178) {
                                        outerCache$3182[type$3169] = [
                                            dirruns$2962,
                                            nodeIndex$3185,
                                            diff$3184
                                        ];
                                        break;
                                    }
                                }
                            } else if (useCache$3190 && (cache$3181 = (elem$3178[expando$2960] || (elem$3178[expando$2960] = {}))[type$3169]) && cache$3181[0] === dirruns$2962) {
                                diff$3184 = cache$3181[1];
                            } else {
                                while (// Use the same loop as above to seek `elem` from the start
                                    node$3183 = ++nodeIndex$3185 && node$3183 && node$3183[dir$3187] || (diff$3184 = nodeIndex$3185 = 0) || start$3186.pop()) {
                                    if ((ofType$3176 ? node$3183.nodeName.toLowerCase() === name$3189 : node$3183.nodeType === 1) && ++diff$3184) {
                                        if (// Cache the index of each encountered element
                                            useCache$3190) {
                                            (node$3183[expando$2960] || (node$3183[expando$2960] = {}))[type$3169] = [
                                                dirruns$2962,
                                                diff$3184
                                            ];
                                        }
                                        if (node$3183 === elem$3178) {
                                            break;
                                        }
                                    }
                                }
                            }
                            // Incorporate the offset, then check against cycle size
                            diff$3184 -= last$3173;
                            return diff$3184 === first$3172 || diff$3184 % first$3172 === 0 && diff$3184 / first$3172 >= 0;
                        }
                    };
                },
                'PSEUDO': function (pseudo$3191, argument$3192) {
                    var
                        // pseudo-class names are case-insensitive
                        // http://www.w3.org/TR/selectors/#pseudo-classes
                        // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
                        // Remember that setFilters inherits from pseudos
                        args$3193, fn$3194 = Expr$2943.pseudos[pseudo$3191] || Expr$2943.setFilters[pseudo$3191.toLowerCase()] || Sizzle$2999.error('unsupported pseudo: ' + pseudo$3191);
                    if (// The user may use createPseudo to indicate that
                        // arguments are needed to create the filter function
                        // just as Sizzle does
                        fn$3194[expando$2960]) {
                        return fn$3194(argument$3192);
                    }
                    if (// But maintain support for old signatures
                        fn$3194.length > 1) {
                        args$3193 = [
                            pseudo$3191,
                            pseudo$3191,
                            '',
                            argument$3192
                        ];
                        return Expr$2943.setFilters.hasOwnProperty(pseudo$3191.toLowerCase()) ? markFunction$3001(function (seed$3195, matches$3196) {
                            var idx$3197, matched$3198 = fn$3194(seed$3195, argument$3192), i$3199 = matched$3198.length;
                            while (i$3199--) {
                                idx$3197 = indexOf$2975(seed$3195, matched$3198[i$3199]);
                                seed$3195[idx$3197] = !(matches$3196[idx$3197] = matched$3198[i$3199]);
                            }
                        }) : function (elem$3200) {
                            return fn$3194(elem$3200, 0, args$3193);
                        };
                    }
                    return fn$3194;
                }
            },
            pseudos: {
                // Potentially complex pseudos
                'not': markFunction$3001(function (selector$3201) {
                    var
                        // Trim the selector passed to compile
                        // to avoid treating leading and trailing
                        // spaces as combinators
                        input$3202 = [], results$3203 = [], matcher$3204 = compile$2947(selector$3201.replace(rtrim$2983, '$1'));
                    return matcher$3204[expando$2960] ? markFunction$3001(function (seed$3205, matches$3206, context$3207, xml$3208) {
                        var elem$3209, unmatched$3210 = matcher$3204(seed$3205, null, xml$3208, []), i$3211 = seed$3205.length;
                        while (// Match elements unmatched by `matcher`
                            i$3211--) {
                            if (elem$3209 = unmatched$3210[i$3211]) {
                                seed$3205[i$3211] = !(matches$3206[i$3211] = elem$3209);
                            }
                        }
                    }) : function (elem$3212, context$3213, xml$3214) {
                        input$3202[0] = elem$3212;
                        matcher$3204(input$3202, null, xml$3214, results$3203);
                        // Don't keep the element (issue #299)
                        input$3202[0] = null;
                        return !results$3203.pop();
                    };
                }),
                'has': markFunction$3001(function (selector$3215) {
                    return function (elem$3216) {
                        return Sizzle$2999(selector$3215, elem$3216).length > 0;
                    };
                }),
                'contains': markFunction$3001(function (text$3217) {
                    text$3217 = text$3217.replace(runescape$2996, funescape$2997);
                    return function (elem$3218) {
                        return (elem$3218.textContent || elem$3218.innerText || getText$2944(elem$3218)).indexOf(text$3217) > -1;
                    };
                }),
                // "Whether an element is represented by a :lang() selector
                // is based solely on the element's language value
                // being equal to the identifier C,
                // or beginning with the identifier C immediately followed by "-".
                // The matching of C against the element's language value is performed case-insensitively.
                // The identifier C does not have to be a valid language name."
                // http://www.w3.org/TR/selectors/#lang-pseudo
                'lang': markFunction$3001(function (lang$3219) {
                    if (!// lang value must be a valid identifier
                        ridentifier$2988.test(lang$3219 || '')) {
                        Sizzle$2999.error('unsupported lang: ' + lang$3219);
                    }
                    lang$3219 = lang$3219.replace(runescape$2996, funescape$2997).toLowerCase();
                    return function (elem$3220) {
                        var elemLang$3221;
                        do {
                            if (elemLang$3221 = documentIsHTML$2955 ? elem$3220.lang : elem$3220.getAttribute('xml:lang') || elem$3220.getAttribute('lang')) {
                                elemLang$3221 = elemLang$3221.toLowerCase();
                                return elemLang$3221 === lang$3219 || elemLang$3221.indexOf(lang$3219 + '-') === 0;
                            }
                        } while ((elem$3220 = elem$3220.parentNode) && elem$3220.nodeType === 1);
                        return false;
                    };
                }),
                // Miscellaneous
                'target': function (elem$3222) {
                    var hash$3223 = window$2940.location && window$2940.location.hash;
                    return hash$3223 && hash$3223.slice(1) === elem$3222.id;
                },
                'root': function (elem$3224) {
                    return elem$3224 === docElem$2954;
                },
                'focus': function (elem$3225) {
                    return elem$3225 === document$2953.activeElement && (!document$2953.hasFocus || document$2953.hasFocus()) && !!(elem$3225.type || elem$3225.href || ~elem$3225.tabIndex);
                },
                // Boolean properties
                'enabled': function (elem$3226) {
                    return elem$3226.disabled === false;
                },
                'disabled': function (elem$3227) {
                    return elem$3227.disabled === true;
                },
                'checked': function (elem$3228) {
                    var // In CSS3, :checked should return both checked and selected elements
                    // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                    nodeName$3229 = elem$3228.nodeName.toLowerCase();
                    return nodeName$3229 === 'input' && !!elem$3228.checked || nodeName$3229 === 'option' && !!elem$3228.selected;
                },
                'selected': function (elem$3230) {
                    if (// Accessing this property makes selected-by-default
                        // options in Safari work properly
                        elem$3230.parentNode) {
                        elem$3230.parentNode.selectedIndex;
                    }
                    return elem$3230.selected === true;
                },
                // Contents
                'empty': function (elem$3231) {
                    for (// http://www.w3.org/TR/selectors/#empty-pseudo
                        // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
                        //   but not by others (comment: 8; processing instruction: 7; etc.)
                        // nodeType < 6 works because attributes (2) do not appear as children
                        elem$3231 = elem$3231.firstChild; elem$3231; elem$3231 = elem$3231.nextSibling) {
                        if (elem$3231.nodeType < 6) {
                            return false;
                        }
                    }
                    return true;
                },
                'parent': function (elem$3232) {
                    return !Expr$2943.pseudos['empty'](elem$3232);
                },
                // Element/input types
                'header': function (elem$3233) {
                    return rheader$2991.test(elem$3233.nodeName);
                },
                'input': function (elem$3234) {
                    return rinputs$2990.test(elem$3234.nodeName);
                },
                'button': function (elem$3235) {
                    var name$3236 = elem$3235.nodeName.toLowerCase();
                    return name$3236 === 'input' && elem$3235.type === 'button' || name$3236 === 'button';
                },
                'text': function (elem$3237) {
                    var attr$3238;
                    return elem$3237.nodeName.toLowerCase() === 'input' && elem$3237.type === 'text' && ((// Support: IE<8
                    // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
                    attr$3238 = elem$3237.getAttribute('type')) == null || attr$3238.toLowerCase() === 'text');
                },
                // Position-in-collection
                'first': createPositionalPseudo$3007(function () {
                    return [0];
                }),
                'last': createPositionalPseudo$3007(function (matchIndexes$3239, length$3240) {
                    return [length$3240 - 1];
                }),
                'eq': createPositionalPseudo$3007(function (matchIndexes$3241, length$3242, argument$3243) {
                    return [argument$3243 < 0 ? argument$3243 + length$3242 : argument$3243];
                }),
                'even': createPositionalPseudo$3007(function (matchIndexes$3244, length$3245) {
                    var i$3246 = 0;
                    for (; i$3246 < length$3245; i$3246 += 2) {
                        matchIndexes$3244.push(i$3246);
                    }
                    return matchIndexes$3244;
                }),
                'odd': createPositionalPseudo$3007(function (matchIndexes$3247, length$3248) {
                    var i$3249 = 1;
                    for (; i$3249 < length$3248; i$3249 += 2) {
                        matchIndexes$3247.push(i$3249);
                    }
                    return matchIndexes$3247;
                }),
                'lt': createPositionalPseudo$3007(function (matchIndexes$3250, length$3251, argument$3252) {
                    var i$3253 = argument$3252 < 0 ? argument$3252 + length$3251 : argument$3252;
                    for (; --i$3253 >= 0;) {
                        matchIndexes$3250.push(i$3253);
                    }
                    return matchIndexes$3250;
                }),
                'gt': createPositionalPseudo$3007(function (matchIndexes$3254, length$3255, argument$3256) {
                    var i$3257 = argument$3256 < 0 ? argument$3256 + length$3255 : argument$3256;
                    for (; ++i$3257 < length$3255;) {
                        matchIndexes$3254.push(i$3257);
                    }
                    return matchIndexes$3254;
                })
            }
        };
        Expr$2943.pseudos['nth'] = Expr$2943.pseudos['eq'];
        for (// Add button/input type pseudos
            i$2941 in {
                radio: true,
                checkbox: true,
                file: true,
                password: true,
                image: true
            }) {
            Expr$2943.pseudos[i$2941] = createInputPseudo$3005(i$2941);
        }
        for (i$2941 in {
                submit: true,
                reset: true
            }) {
            Expr$2943.pseudos[i$2941] = createButtonPseudo$3006(i$2941);
        }
        // Easy API for creating new setFilters
        function setFilters$3009() {
        }
        setFilters$3009.prototype = Expr$2943.filters = Expr$2943.pseudos;
        Expr$2943.setFilters = new setFilters$3009();
        tokenize$2946 = Sizzle$2999.tokenize = function (selector$3258, parseOnly$3259) {
            var matched$3260, match$3261, tokens$3262, type$3263, soFar$3264, groups$3265, preFilters$3266, cached$3267 = tokenCache$2965[selector$3258 + ' '];
            if (cached$3267) {
                return parseOnly$3259 ? 0 : cached$3267.slice(0);
            }
            soFar$3264 = selector$3258;
            groups$3265 = [];
            preFilters$3266 = Expr$2943.preFilter;
            while (soFar$3264) {
                if (// Comma and first run
                    !matched$3260 || (match$3261 = rcomma$2984.exec(soFar$3264))) {
                    if (match$3261) {
                        // Don't consume trailing commas as valid
                        soFar$3264 = soFar$3264.slice(match$3261[0].length) || soFar$3264;
                    }
                    groups$3265.push(tokens$3262 = []);
                }
                matched$3260 = false;
                if (// Combinators
                    match$3261 = rcombinators$2985.exec(soFar$3264)) {
                    matched$3260 = match$3261.shift();
                    tokens$3262.push({
                        value: matched$3260,
                        // Cast descendant combinators to space
                        type: match$3261[0].replace(rtrim$2983, ' ')
                    });
                    soFar$3264 = soFar$3264.slice(matched$3260.length);
                }
                for (// Filters
                    type$3263 in Expr$2943.filter) {
                    if ((match$3261 = matchExpr$2989[type$3263].exec(soFar$3264)) && (!preFilters$3266[type$3263] || (match$3261 = preFilters$3266[type$3263](match$3261)))) {
                        matched$3260 = match$3261.shift();
                        tokens$3262.push({
                            value: matched$3260,
                            type: type$3263,
                            matches: match$3261
                        });
                        soFar$3264 = soFar$3264.slice(matched$3260.length);
                    }
                }
                if (!matched$3260) {
                    break;
                }
            }
            return // Return the length of the invalid excess
            // if we're just parsing
            // Otherwise, throw an error or return tokens
            parseOnly$3259 ? soFar$3264.length : soFar$3264 ? Sizzle$2999.error(selector$3258) : // Cache the tokens
            tokenCache$2965(selector$3258, groups$3265).slice(0);
        };
        function toSelector$3010(tokens$3268) {
            var i$3269 = 0, len$3270 = tokens$3268.length, selector$3271 = '';
            for (; i$3269 < len$3270; i$3269++) {
                selector$3271 += tokens$3268[i$3269].value;
            }
            return selector$3271;
        }
        function addCombinator$3011(matcher$3272, combinator$3273, base$3274) {
            var dir$3275 = combinator$3273.dir, checkNonElements$3276 = base$3274 && dir$3275 === 'parentNode', doneName$3277 = done$2963++;
            return combinator$3273.first ? function (elem$3278, context$3279, xml$3280) {
                while (elem$3278 = elem$3278[dir$3275]) {
                    if (elem$3278.nodeType === 1 || checkNonElements$3276) {
                        return matcher$3272(elem$3278, context$3279, xml$3280);
                    }
                }
            } : function (elem$3281, context$3282, xml$3283) {
                var oldCache$3284, outerCache$3285, newCache$3286 = [
                        dirruns$2962,
                        doneName$3277
                    ];
                if (// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
                    xml$3283) {
                    while (elem$3281 = elem$3281[dir$3275]) {
                        if (elem$3281.nodeType === 1 || checkNonElements$3276) {
                            if (matcher$3272(elem$3281, context$3282, xml$3283)) {
                                return true;
                            }
                        }
                    }
                } else {
                    while (elem$3281 = elem$3281[dir$3275]) {
                        if (elem$3281.nodeType === 1 || checkNonElements$3276) {
                            outerCache$3285 = elem$3281[expando$2960] || (elem$3281[expando$2960] = {});
                            if ((oldCache$3284 = outerCache$3285[dir$3275]) && oldCache$3284[0] === dirruns$2962 && oldCache$3284[1] === doneName$3277) {
                                return // Assign to newCache so results back-propagate to previous elements
                                newCache$3286[2] = oldCache$3284[2];
                            } else {
                                // Reuse newcache so results back-propagate to previous elements
                                outerCache$3285[dir$3275] = newCache$3286;
                                if (// A match means we're done; a fail means we have to keep checking
                                    newCache$3286[2] = matcher$3272(elem$3281, context$3282, xml$3283)) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            };
        }
        function elementMatcher$3012(matchers$3287) {
            return matchers$3287.length > 1 ? function (elem$3288, context$3289, xml$3290) {
                var i$3291 = matchers$3287.length;
                while (i$3291--) {
                    if (!matchers$3287[i$3291](elem$3288, context$3289, xml$3290)) {
                        return false;
                    }
                }
                return true;
            } : matchers$3287[0];
        }
        function multipleContexts$3013(selector$3292, contexts$3293, results$3294) {
            var i$3295 = 0, len$3296 = contexts$3293.length;
            for (; i$3295 < len$3296; i$3295++) {
                Sizzle$2999(selector$3292, contexts$3293[i$3295], results$3294);
            }
            return results$3294;
        }
        function condense$3014(unmatched$3297, map$3298, filter$3299, context$3300, xml$3301) {
            var elem$3302, newUnmatched$3303 = [], i$3304 = 0, len$3305 = unmatched$3297.length, mapped$3306 = map$3298 != null;
            for (; i$3304 < len$3305; i$3304++) {
                if (elem$3302 = unmatched$3297[i$3304]) {
                    if (!filter$3299 || filter$3299(elem$3302, context$3300, xml$3301)) {
                        newUnmatched$3303.push(elem$3302);
                        if (mapped$3306) {
                            map$3298.push(i$3304);
                        }
                    }
                }
            }
            return newUnmatched$3303;
        }
        function setMatcher$3015(preFilter$3307, selector$3308, matcher$3309, postFilter$3310, postFinder$3311, postSelector$3312) {
            if (postFilter$3310 && !postFilter$3310[expando$2960]) {
                postFilter$3310 = setMatcher$3015(postFilter$3310);
            }
            if (postFinder$3311 && !postFinder$3311[expando$2960]) {
                postFinder$3311 = setMatcher$3015(postFinder$3311, postSelector$3312);
            }
            return markFunction$3001(function (seed$3313, results$3314, context$3315, xml$3316) {
                var temp$3317, i$3318, elem$3319, preMap$3320 = [], postMap$3321 = [], preexisting$3322 = results$3314.length, // Get initial elements from seed or context
                    elems$3323 = seed$3313 || multipleContexts$3013(selector$3308 || '*', context$3315.nodeType ? [context$3315] : context$3315, []), // Prefilter to get matcher input, preserving a map for seed-results synchronization
                    matcherIn$3324 = preFilter$3307 && (seed$3313 || !selector$3308) ? condense$3014(elems$3323, preMap$3320, preFilter$3307, context$3315, xml$3316) : elems$3323, matcherOut$3325 = matcher$3309 ? // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                    postFinder$3311 || (seed$3313 ? preFilter$3307 : preexisting$3322 || postFilter$3310) ? // ...intermediate processing is necessary
                    [] : // ...otherwise use results directly
                    results$3314 : matcherIn$3324;
                if (// Find primary matches
                    matcher$3309) {
                    matcher$3309(matcherIn$3324, matcherOut$3325, context$3315, xml$3316);
                }
                if (// Apply postFilter
                    postFilter$3310) {
                    temp$3317 = condense$3014(matcherOut$3325, postMap$3321);
                    postFilter$3310(temp$3317, [], context$3315, xml$3316);
                    // Un-match failing elements by moving them back to matcherIn
                    i$3318 = temp$3317.length;
                    while (i$3318--) {
                        if (elem$3319 = temp$3317[i$3318]) {
                            matcherOut$3325[postMap$3321[i$3318]] = !(matcherIn$3324[postMap$3321[i$3318]] = elem$3319);
                        }
                    }
                }
                if (seed$3313) {
                    if (postFinder$3311 || preFilter$3307) {
                        if (postFinder$3311) {
                            // Get the final matcherOut by condensing this intermediate into postFinder contexts
                            temp$3317 = [];
                            i$3318 = matcherOut$3325.length;
                            while (i$3318--) {
                                if (elem$3319 = matcherOut$3325[i$3318]) {
                                    // Restore matcherIn since elem is not yet a final match
                                    temp$3317.push(matcherIn$3324[i$3318] = elem$3319);
                                }
                            }
                            postFinder$3311(null, matcherOut$3325 = [], temp$3317, xml$3316);
                        }
                        // Move matched elements from seed to results to keep them synchronized
                        i$3318 = matcherOut$3325.length;
                        while (i$3318--) {
                            if ((elem$3319 = matcherOut$3325[i$3318]) && (temp$3317 = postFinder$3311 ? indexOf$2975(seed$3313, elem$3319) : preMap$3320[i$3318]) > -1) {
                                seed$3313[temp$3317] = !(results$3314[temp$3317] = elem$3319);
                            }
                        }
                    }
                } else {
                    matcherOut$3325 = condense$3014(matcherOut$3325 === results$3314 ? matcherOut$3325.splice(preexisting$3322, matcherOut$3325.length) : matcherOut$3325);
                    if (postFinder$3311) {
                        postFinder$3311(null, results$3314, matcherOut$3325, xml$3316);
                    } else {
                        push$2973.apply(results$3314, matcherOut$3325);
                    }
                }
            });
        }
        function matcherFromTokens$3016(tokens$3326) {
            var checkContext$3327, matcher$3328, j$3329, len$3330 = tokens$3326.length, leadingRelative$3331 = Expr$2943.relative[tokens$3326[0].type], implicitRelative$3332 = leadingRelative$3331 || Expr$2943.relative[' '], i$3333 = leadingRelative$3331 ? 1 : 0, // The foundational matcher ensures that elements are reachable from top-level context(s)
                matchContext$3334 = addCombinator$3011(function (elem$3337) {
                    return elem$3337 === checkContext$3327;
                }, implicitRelative$3332, true), matchAnyContext$3335 = addCombinator$3011(function (elem$3338) {
                    return indexOf$2975(checkContext$3327, elem$3338) > -1;
                }, implicitRelative$3332, true), matchers$3336 = [function (elem$3339, context$3340, xml$3341) {
                        var ret$3342 = !leadingRelative$3331 && (xml$3341 || context$3340 !== outermostContext$2949) || ((checkContext$3327 = context$3340).nodeType ? matchContext$3334(elem$3339, context$3340, xml$3341) : matchAnyContext$3335(elem$3339, context$3340, xml$3341));
                        // Avoid hanging onto element (issue #299)
                        checkContext$3327 = null;
                        return ret$3342;
                    }];
            for (; i$3333 < len$3330; i$3333++) {
                if (matcher$3328 = Expr$2943.relative[tokens$3326[i$3333].type]) {
                    matchers$3336 = [addCombinator$3011(elementMatcher$3012(matchers$3336), matcher$3328)];
                } else {
                    matcher$3328 = Expr$2943.filter[tokens$3326[i$3333].type].apply(null, tokens$3326[i$3333].matches);
                    if (// Return special upon seeing a positional matcher
                        matcher$3328[expando$2960]) {
                        // Find the next relative operator (if any) for proper handling
                        j$3329 = ++i$3333;
                        for (; j$3329 < len$3330; j$3329++) {
                            if (Expr$2943.relative[tokens$3326[j$3329].type]) {
                                break;
                            }
                        }
                        return setMatcher$3015(i$3333 > 1 && elementMatcher$3012(matchers$3336), i$3333 > 1 && toSelector$3010(// If the preceding token was a descendant combinator, insert an implicit any-element `*`
                        tokens$3326.slice(0, i$3333 - 1).concat({ value: tokens$3326[i$3333 - 2].type === ' ' ? '*' : '' })).replace(rtrim$2983, '$1'), matcher$3328, i$3333 < j$3329 && matcherFromTokens$3016(tokens$3326.slice(i$3333, j$3329)), j$3329 < len$3330 && matcherFromTokens$3016(tokens$3326 = tokens$3326.slice(j$3329)), j$3329 < len$3330 && toSelector$3010(tokens$3326));
                    }
                    matchers$3336.push(matcher$3328);
                }
            }
            return elementMatcher$3012(matchers$3336);
        }
        function matcherFromGroupMatchers$3017(elementMatchers$3343, setMatchers$3344) {
            var bySet$3345 = setMatchers$3344.length > 0, byElement$3346 = elementMatchers$3343.length > 0, superMatcher$3347 = function (seed$3348, context$3349, xml$3350, results$3351, outermost$3352) {
                    var elem$3353, j$3354, matcher$3355, matchedCount$3356 = 0, i$3357 = '0', unmatched$3358 = seed$3348 && [], setMatched$3359 = [], contextBackup$3360 = outermostContext$2949, // We must always have either seed elements or outermost context
                        elems$3361 = seed$3348 || byElement$3346 && Expr$2943.find['TAG']('*', outermost$3352), // Use integer dirruns iff this is the outermost matcher
                        dirrunsUnique$3362 = dirruns$2962 += contextBackup$3360 == null ? 1 : Math.random() || 0.1, len$3363 = elems$3361.length;
                    if (outermost$3352) {
                        outermostContext$2949 = context$3349 !== document$2953 && context$3349;
                    }
                    for (; // Add elements passing elementMatchers directly to results
                        // Keep `i` a string if there are no elements so `matchedCount` will be "00" below
                        // Support: IE<9, Safari
                        // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
                        i$3357 !== len$3363 && (elem$3353 = elems$3361[i$3357]) != null; i$3357++) {
                        if (byElement$3346 && elem$3353) {
                            j$3354 = 0;
                            while (matcher$3355 = elementMatchers$3343[j$3354++]) {
                                if (matcher$3355(elem$3353, context$3349, xml$3350)) {
                                    results$3351.push(elem$3353);
                                    break;
                                }
                            }
                            if (outermost$3352) {
                                dirruns$2962 = dirrunsUnique$3362;
                            }
                        }
                        if (// Track unmatched elements for set filters
                            bySet$3345) {
                            if (// They will have gone through all possible matchers
                                elem$3353 = !matcher$3355 && elem$3353) {
                                matchedCount$3356--;
                            }
                            if (// Lengthen the array for every element, matched or not
                                seed$3348) {
                                unmatched$3358.push(elem$3353);
                            }
                        }
                    }
                    // Apply set filters to unmatched elements
                    matchedCount$3356 += i$3357;
                    if (bySet$3345 && i$3357 !== matchedCount$3356) {
                        j$3354 = 0;
                        while (matcher$3355 = setMatchers$3344[j$3354++]) {
                            matcher$3355(unmatched$3358, setMatched$3359, context$3349, xml$3350);
                        }
                        if (seed$3348) {
                            if (// Reintegrate element matches to eliminate the need for sorting
                                matchedCount$3356 > 0) {
                                while (i$3357--) {
                                    if (!(unmatched$3358[i$3357] || setMatched$3359[i$3357])) {
                                        setMatched$3359[i$3357] = pop$2971.call(results$3351);
                                    }
                                }
                            }
                            // Discard index placeholder values to get only actual matches
                            setMatched$3359 = condense$3014(setMatched$3359);
                        }
                        // Add matches to results
                        push$2973.apply(results$3351, setMatched$3359);
                        if (// Seedless set matches succeeding multiple successful matchers stipulate sorting
                            outermost$3352 && !seed$3348 && setMatched$3359.length > 0 && matchedCount$3356 + setMatchers$3344.length > 1) {
                            Sizzle$2999.uniqueSort(results$3351);
                        }
                    }
                    if (// Override manipulation of globals by nested matchers
                        outermost$3352) {
                        dirruns$2962 = dirrunsUnique$3362;
                        outermostContext$2949 = contextBackup$3360;
                    }
                    return unmatched$3358;
                };
            return bySet$3345 ? markFunction$3001(superMatcher$3347) : superMatcher$3347;
        }
        compile$2947 = Sizzle$2999.compile = function (selector$3364, match$3365) {
            var i$3366, setMatchers$3367 = [], elementMatchers$3368 = [], cached$3369 = compilerCache$2966[selector$3364 + ' '];
            if (!cached$3369) {
                if (// Generate a function of recursive functions that can be used to check each element
                    !match$3365) {
                    match$3365 = tokenize$2946(selector$3364);
                }
                i$3366 = match$3365.length;
                while (i$3366--) {
                    cached$3369 = matcherFromTokens$3016(match$3365[i$3366]);
                    if (cached$3369[expando$2960]) {
                        setMatchers$3367.push(cached$3369);
                    } else {
                        elementMatchers$3368.push(cached$3369);
                    }
                }
                // Cache the compiled function
                cached$3369 = compilerCache$2966(selector$3364, matcherFromGroupMatchers$3017(elementMatchers$3368, setMatchers$3367));
                // Save selector and tokenization
                cached$3369.selector = selector$3364;
            }
            return cached$3369;
        };
        /**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
        select$2948 = Sizzle$2999.select = function (selector$3370, context$3371, results$3372, seed$3373) {
            var i$3374, tokens$3375, token$3376, type$3377, find$3378, compiled$3379 = typeof selector$3370 === 'function' && selector$3370, match$3380 = !seed$3373 && tokenize$2946(selector$3370 = compiled$3379.selector || selector$3370);
            results$3372 = results$3372 || [];
            if (// Try to minimize operations if there is no seed and only one group
                match$3380.length === 1) {
                // Take a shortcut and set the context if the root selector is an ID
                tokens$3375 = match$3380[0] = match$3380[0].slice(0);
                if (tokens$3375.length > 2 && (token$3376 = tokens$3375[0]).type === 'ID' && support$2942.getById && context$3371.nodeType === 9 && documentIsHTML$2955 && Expr$2943.relative[tokens$3375[1].type]) {
                    context$3371 = (Expr$2943.find['ID'](token$3376.matches[0].replace(runescape$2996, funescape$2997), context$3371) || [])[0];
                    if (!context$3371) {
                        return results$3372;
                    } else if (compiled$3379) {
                        context$3371 = context$3371.parentNode;
                    }
                    selector$3370 = selector$3370.slice(tokens$3375.shift().value.length);
                }
                // Fetch a seed set for right-to-left matching
                i$3374 = matchExpr$2989['needsContext'].test(selector$3370) ? 0 : tokens$3375.length;
                while (i$3374--) {
                    token$3376 = tokens$3375[i$3374];
                    if (// Abort if we hit a combinator
                        Expr$2943.relative[type$3377 = token$3376.type]) {
                        break;
                    }
                    if (find$3378 = Expr$2943.find[type$3377]) {
                        if (// Search, expanding context for leading sibling combinators
                            seed$3373 = find$3378(token$3376.matches[0].replace(runescape$2996, funescape$2997), rsibling$2994.test(tokens$3375[0].type) && testContext$3008(context$3371.parentNode) || context$3371)) {
                            // If seed is empty or no tokens remain, we can return early
                            tokens$3375.splice(i$3374, 1);
                            selector$3370 = seed$3373.length && toSelector$3010(tokens$3375);
                            if (!selector$3370) {
                                push$2973.apply(results$3372, seed$3373);
                                return results$3372;
                            }
                            break;
                        }
                    }
                }
            }
            (// Compile and execute a filtering function if one is not provided
            // Provide `match` to avoid retokenization if we modified the selector above
            compiled$3379 || compile$2947(selector$3370, match$3380))(seed$3373, context$3371, !documentIsHTML$2955, results$3372, rsibling$2994.test(selector$3370) && testContext$3008(context$3371.parentNode) || context$3371);
            return results$3372;
        };
        // One-time assignments
        // Sort stability
        support$2942.sortStable = expando$2960.split('').sort(sortOrder$2967).join('') === expando$2960;
        // Support: Chrome 14-35+
        // Always assume duplicates if they aren't passed to the comparison function
        support$2942.detectDuplicates = !!hasDuplicate$2951;
        // Initialize against the default document
        setDocument$2952();
        // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
        // Detached nodes confoundingly follow *each other*
        support$2942.sortDetached = assert$3002(function (div1$3381) {
            return // Should return 1, but returns 4 (following)
            div1$3381.compareDocumentPosition(document$2953.createElement('div')) & 1;
        });
        if (!// Support: IE<8
            // Prevent attribute/property "interpolation"
            // http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
            assert$3002(function (div$3382) {
                div$3382.innerHTML = '<a href=\'#\'></a>';
                return div$3382.firstChild.getAttribute('href') === '#';
            })) {
            addHandle$3003('type|href|height|width', function (elem$3383, name$3384, isXML$3385) {
                if (!isXML$3385) {
                    return elem$3383.getAttribute(name$3384, name$3384.toLowerCase() === 'type' ? 1 : 2);
                }
            });
        }
        if (// Support: IE<9
            // Use defaultValue in place of getAttribute("value")
            !support$2942.attributes || !assert$3002(function (div$3386) {
                div$3386.innerHTML = '<input/>';
                div$3386.firstChild.setAttribute('value', '');
                return div$3386.firstChild.getAttribute('value') === '';
            })) {
            addHandle$3003('value', function (elem$3387, name$3388, isXML$3389) {
                if (!isXML$3389 && elem$3387.nodeName.toLowerCase() === 'input') {
                    return elem$3387.defaultValue;
                }
            });
        }
        if (!// Support: IE<9
            // Use getAttributeNode to fetch booleans when getAttribute lies
            assert$3002(function (div$3390) {
                return div$3390.getAttribute('disabled') == null;
            })) {
            addHandle$3003(booleans$2976, function (elem$3391, name$3392, isXML$3393) {
                var val$3394;
                if (!isXML$3393) {
                    return elem$3391[name$3392] === true ? name$3392.toLowerCase() : (val$3394 = elem$3391.getAttributeNode(name$3392)) && val$3394.specified ? val$3394.value : null;
                }
            });
        }
        return Sizzle$2999;
    }(window$2711);
    jQuery$2724.find = Sizzle$2730;
    jQuery$2724.expr = Sizzle$2730.selectors;
    jQuery$2724.expr[':'] = jQuery$2724.expr.pseudos;
    jQuery$2724.unique = Sizzle$2730.uniqueSort;
    jQuery$2724.text = Sizzle$2730.getText;
    jQuery$2724.isXMLDoc = Sizzle$2730.isXML;
    jQuery$2724.contains = Sizzle$2730.contains;
    var rneedsContext$2731 = jQuery$2724.expr.match.needsContext;
    var rsingleTag$2732 = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
    var risSimple$2733 = /^.[^:#\[\.,]*$/;
    function winnow$2734(elements$3395, qualifier$3396, not$3397) {
        if (jQuery$2724.isFunction(qualifier$3396)) {
            return jQuery$2724.grep(elements$3395, function (elem$3398, i$3399) {
                /* jshint -W018 */
                return !!qualifier$3396.call(elem$3398, i$3399, elem$3398) !== not$3397;
            });
        }
        if (qualifier$3396.nodeType) {
            return jQuery$2724.grep(elements$3395, function (elem$3400) {
                return elem$3400 === qualifier$3396 !== not$3397;
            });
        }
        if (typeof qualifier$3396 === 'string') {
            if (risSimple$2733.test(qualifier$3396)) {
                return jQuery$2724.filter(qualifier$3396, elements$3395, not$3397);
            }
            qualifier$3396 = jQuery$2724.filter(qualifier$3396, elements$3395);
        }
        return jQuery$2724.grep(elements$3395, function (elem$3401) {
            return indexOf$2717.call(qualifier$3396, elem$3401) >= 0 !== not$3397;
        });
    }
    jQuery$2724.filter = function (expr$3402, elems$3403, not$3404) {
        var elem$3405 = elems$3403[0];
        if (not$3404) {
            expr$3402 = ':not(' + expr$3402 + ')';
        }
        return elems$3403.length === 1 && elem$3405.nodeType === 1 ? jQuery$2724.find.matchesSelector(elem$3405, expr$3402) ? [elem$3405] : [] : jQuery$2724.find.matches(expr$3402, jQuery$2724.grep(elems$3403, function (elem$3406) {
            return elem$3406.nodeType === 1;
        }));
    };
    jQuery$2724.fn.extend({
        find: function (selector$3407) {
            var i$3408, len$3409 = this.length, ret$3410 = [], self$3411 = this;
            if (typeof selector$3407 !== 'string') {
                return this.pushStack(jQuery$2724(selector$3407).filter(function () {
                    for (i$3408 = 0; i$3408 < len$3409; i$3408++) {
                        if (jQuery$2724.contains(self$3411[i$3408], this)) {
                            return true;
                        }
                    }
                }));
            }
            for (i$3408 = 0; i$3408 < len$3409; i$3408++) {
                jQuery$2724.find(selector$3407, self$3411[i$3408], ret$3410);
            }
            // Needed because $( selector, context ) becomes $( context ).find( selector )
            ret$3410 = this.pushStack(len$3409 > 1 ? jQuery$2724.unique(ret$3410) : ret$3410);
            ret$3410.selector = this.selector ? this.selector + ' ' + selector$3407 : selector$3407;
            return ret$3410;
        },
        filter: function (selector$3412) {
            return this.pushStack(winnow$2734(this, selector$3412 || [], false));
        },
        not: function (selector$3413) {
            return this.pushStack(winnow$2734(this, selector$3413 || [], true));
        },
        is: function (selector$3414) {
            return !!winnow$2734(this, // If this is a positional/relative selector, check membership in the returned set
            // so $("p:first").is("p:last") won't return true for a doc with two "p".
            typeof selector$3414 === 'string' && rneedsContext$2731.test(selector$3414) ? jQuery$2724(selector$3414) : selector$3414 || [], false).length;
        }
    });
    var
        // Initialize a jQuery object
        // A central reference to the root jQuery(document)
        rootjQuery$2735,
        // A simple way to check for HTML strings
        // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
        // Strict HTML recognition (#11290: must start with <)
        rquickExpr$2736 = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, init$2737 = jQuery$2724.fn.init = function (selector$3415, context$3416) {
            var match$3417, elem$3418;
            if (// HANDLE: $(""), $(null), $(undefined), $(false)
                !selector$3415) {
                return this;
            }
            if (// Handle HTML strings
                typeof selector$3415 === 'string') {
                if (selector$3415[0] === '<' && selector$3415[selector$3415.length - 1] === '>' && selector$3415.length >= 3) {
                    // Assume that strings that start and end with <> are HTML and skip the regex check
                    match$3417 = [
                        null,
                        selector$3415,
                        null
                    ];
                } else {
                    match$3417 = rquickExpr$2736.exec(selector$3415);
                }
                if (// Match html or make sure no context is specified for #id
                    match$3417 && (match$3417[1] || !context$3416)) {
                    if (// HANDLE: $(html) -> $(array)
                        match$3417[1]) {
                        context$3416 = context$3416 instanceof jQuery$2724 ? context$3416[0] : context$3416;
                        // Option to run scripts is true for back-compat
                        // Intentionally let the error be thrown if parseHTML is not present
                        jQuery$2724.merge(this, jQuery$2724.parseHTML(match$3417[1], context$3416 && context$3416.nodeType ? context$3416.ownerDocument || context$3416 : document$2722, true));
                        if (// HANDLE: $(html, props)
                            rsingleTag$2732.test(match$3417[1]) && jQuery$2724.isPlainObject(context$3416)) {
                            for (match$3417 in context$3416) {
                                if (// Properties of context are called as methods if possible
                                    jQuery$2724.isFunction(this[match$3417])) {
                                    this[match$3417](context$3416[match$3417]);
                                } else {
                                    this.attr(match$3417, context$3416[match$3417]);
                                }
                            }
                        }
                        return this;
                    } else {
                        elem$3418 = document$2722.getElementById(match$3417[2]);
                        if (// Support: Blackberry 4.6
                            // gEBID returns nodes no longer in the document (#6963)
                            elem$3418 && elem$3418.parentNode) {
                            // Inject the element directly into the jQuery object
                            this.length = 1;
                            this[0] = elem$3418;
                        }
                        this.context = document$2722;
                        this.selector = selector$3415;
                        return this;
                    }
                } else if (!context$3416 || context$3416.jquery) {
                    return (context$3416 || rootjQuery$2735).find(selector$3415);
                } else {
                    return this.constructor(context$3416).find(selector$3415);
                }
            } else if (selector$3415.nodeType) {
                this.context = this[0] = selector$3415;
                this.length = 1;
                return this;
            } else if (jQuery$2724.isFunction(selector$3415)) {
                return typeof rootjQuery$2735.ready !== 'undefined' ? rootjQuery$2735.ready(selector$3415) : // Execute immediately if ready is not present
                selector$3415(jQuery$2724);
            }
            if (selector$3415.selector !== undefined) {
                this.selector = selector$3415.selector;
                this.context = selector$3415.context;
            }
            return jQuery$2724.makeArray(selector$3415, this);
        };
    // Give the init function the jQuery prototype for later instantiation
    init$2737.prototype = jQuery$2724.fn;
    // Initialize central reference
    rootjQuery$2735 = jQuery$2724(document$2722);
    var rparentsprev$2738 = /^(?:parents|prev(?:Until|All))/, // Methods guaranteed to produce a unique set when starting from a unique set
        guaranteedUnique$2739 = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };
    jQuery$2724.extend({
        dir: function (elem$3419, dir$3420, until$3421) {
            var matched$3422 = [], truncate$3423 = until$3421 !== undefined;
            while ((elem$3419 = elem$3419[dir$3420]) && elem$3419.nodeType !== 9) {
                if (elem$3419.nodeType === 1) {
                    if (truncate$3423 && jQuery$2724(elem$3419).is(until$3421)) {
                        break;
                    }
                    matched$3422.push(elem$3419);
                }
            }
            return matched$3422;
        },
        sibling: function (n$3424, elem$3425) {
            var matched$3426 = [];
            for (; n$3424; n$3424 = n$3424.nextSibling) {
                if (n$3424.nodeType === 1 && n$3424 !== elem$3425) {
                    matched$3426.push(n$3424);
                }
            }
            return matched$3426;
        }
    });
    jQuery$2724.fn.extend({
        has: function (target$3427) {
            var targets$3428 = jQuery$2724(target$3427, this), l$3429 = targets$3428.length;
            return this.filter(function () {
                var i$3430 = 0;
                for (; i$3430 < l$3429; i$3430++) {
                    if (jQuery$2724.contains(this, targets$3428[i$3430])) {
                        return true;
                    }
                }
            });
        },
        closest: function (selectors$3431, context$3432) {
            var cur$3433, i$3434 = 0, l$3435 = this.length, matched$3436 = [], pos$3437 = rneedsContext$2731.test(selectors$3431) || typeof selectors$3431 !== 'string' ? jQuery$2724(selectors$3431, context$3432 || this.context) : 0;
            for (; i$3434 < l$3435; i$3434++) {
                for (cur$3433 = this[i$3434]; cur$3433 && cur$3433 !== context$3432; cur$3433 = cur$3433.parentNode) {
                    if (// Always skip document fragments
                        cur$3433.nodeType < 11 && (pos$3437 ? pos$3437.index(cur$3433) > -1 : // Don't pass non-elements to Sizzle
                        cur$3433.nodeType === 1 && jQuery$2724.find.matchesSelector(cur$3433, selectors$3431))) {
                        matched$3436.push(cur$3433);
                        break;
                    }
                }
            }
            return this.pushStack(matched$3436.length > 1 ? jQuery$2724.unique(matched$3436) : matched$3436);
        },
        // Determine the position of an element within the set
        index: function (elem$3438) {
            if (// No argument, return index in parent
                !elem$3438) {
                return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
            }
            if (// Index in selector
                typeof elem$3438 === 'string') {
                return indexOf$2717.call(jQuery$2724(elem$3438), this[0]);
            }
            return // Locate the position of the desired element
            indexOf$2717.call(this, // If it receives a jQuery object, the first element is used
            elem$3438.jquery ? elem$3438[0] : elem$3438);
        },
        add: function (selector$3439, context$3440) {
            return this.pushStack(jQuery$2724.unique(jQuery$2724.merge(this.get(), jQuery$2724(selector$3439, context$3440))));
        },
        addBack: function (selector$3441) {
            return this.add(selector$3441 == null ? this.prevObject : this.prevObject.filter(selector$3441));
        }
    });
    function sibling$2740(cur$3442, dir$3443) {
        while ((cur$3442 = cur$3442[dir$3443]) && cur$3442.nodeType !== 1) {
        }
        return cur$3442;
    }
    jQuery$2724.each({
        parent: function (elem$3444) {
            var parent$3445 = elem$3444.parentNode;
            return parent$3445 && parent$3445.nodeType !== 11 ? parent$3445 : null;
        },
        parents: function (elem$3446) {
            return jQuery$2724.dir(elem$3446, 'parentNode');
        },
        parentsUntil: function (elem$3447, i$3448, until$3449) {
            return jQuery$2724.dir(elem$3447, 'parentNode', until$3449);
        },
        next: function (elem$3450) {
            return sibling$2740(elem$3450, 'nextSibling');
        },
        prev: function (elem$3451) {
            return sibling$2740(elem$3451, 'previousSibling');
        },
        nextAll: function (elem$3452) {
            return jQuery$2724.dir(elem$3452, 'nextSibling');
        },
        prevAll: function (elem$3453) {
            return jQuery$2724.dir(elem$3453, 'previousSibling');
        },
        nextUntil: function (elem$3454, i$3455, until$3456) {
            return jQuery$2724.dir(elem$3454, 'nextSibling', until$3456);
        },
        prevUntil: function (elem$3457, i$3458, until$3459) {
            return jQuery$2724.dir(elem$3457, 'previousSibling', until$3459);
        },
        siblings: function (elem$3460) {
            return jQuery$2724.sibling((elem$3460.parentNode || {}).firstChild, elem$3460);
        },
        children: function (elem$3461) {
            return jQuery$2724.sibling(elem$3461.firstChild);
        },
        contents: function (elem$3462) {
            return elem$3462.contentDocument || jQuery$2724.merge([], elem$3462.childNodes);
        }
    }, function (name$3463, fn$3464) {
        jQuery$2724.fn[name$3463] = function (until$3465, selector$3466) {
            var matched$3467 = jQuery$2724.map(this, fn$3464, until$3465);
            if (name$3463.slice(-5) !== 'Until') {
                selector$3466 = until$3465;
            }
            if (selector$3466 && typeof selector$3466 === 'string') {
                matched$3467 = jQuery$2724.filter(selector$3466, matched$3467);
            }
            if (this.length > 1) {
                if (// Remove duplicates
                    !guaranteedUnique$2739[name$3463]) {
                    jQuery$2724.unique(matched$3467);
                }
                if (// Reverse order for parents* and prev-derivatives
                    rparentsprev$2738.test(name$3463)) {
                    matched$3467.reverse();
                }
            }
            return this.pushStack(matched$3467);
        };
    });
    var rnotwhite$2741 = /\S+/g;
    // String to Object options format cache
    var optionsCache$2742 = {};
    function createOptions$2743(options$3468) {
        var object$3469 = optionsCache$2742[options$3468] = {};
        jQuery$2724.each(options$3468.match(rnotwhite$2741) || [], function (_$3470, flag$3471) {
            object$3469[flag$3471] = true;
        });
        return object$3469;
    }
    /*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
    jQuery$2724.Callbacks = function (options$3472) {
        // Convert options from String-formatted to Object-formatted if needed
        // (we check in cache first)
        options$3472 = typeof options$3472 === 'string' ? optionsCache$2742[options$3472] || createOptions$2743(options$3472) : jQuery$2724.extend({}, options$3472);
        var
            // Last fire value (for non-forgettable lists)
            memory$3473,
            // Flag to know if list was already fired
            fired$3474,
            // Flag to know if list is currently firing
            firing$3475,
            // First callback to fire (used internally by add and fireWith)
            firingStart$3476,
            // End of the loop when firing
            firingLength$3477,
            // Index of currently firing callback (modified by remove if needed)
            firingIndex$3478,
            // Actual callback list
            list$3479 = [], // Stack of fire calls for repeatable lists
            stack$3480 = !options$3472.once && [], // Fire callbacks
            fire$3481 = function (data$3483) {
                memory$3473 = options$3472.memory && data$3483;
                fired$3474 = true;
                firingIndex$3478 = firingStart$3476 || 0;
                firingStart$3476 = 0;
                firingLength$3477 = list$3479.length;
                firing$3475 = true;
                for (; list$3479 && firingIndex$3478 < firingLength$3477; firingIndex$3478++) {
                    if (list$3479[firingIndex$3478].apply(data$3483[0], data$3483[1]) === false && options$3472.stopOnFalse) {
                        memory$3473 = false;
                        // To prevent further calls using add
                        break;
                    }
                }
                firing$3475 = false;
                if (list$3479) {
                    if (stack$3480) {
                        if (stack$3480.length) {
                            fire$3481(stack$3480.shift());
                        }
                    } else if (memory$3473) {
                        list$3479 = [];
                    } else {
                        self$3482.disable();
                    }
                }
            }, // Actual Callbacks object
            self$3482 = {
                // Add a callback or a collection of callbacks to the list
                add: function () {
                    if (list$3479) {
                        var // First, we save the current length
                        start$3484 = list$3479.length;
                        (function add(args$3485) {
                            jQuery$2724.each(args$3485, function (_$3486, arg$3487) {
                                var type$3488 = jQuery$2724.type(arg$3487);
                                if (type$3488 === 'function') {
                                    if (!options$3472.unique || !self$3482.has(arg$3487)) {
                                        list$3479.push(arg$3487);
                                    }
                                } else if (arg$3487 && arg$3487.length && type$3488 !== 'string') {
                                    // Inspect recursively
                                    add(arg$3487);
                                }
                            });
                        }(arguments));
                        if (// Do we need to add the callbacks to the
                            // current firing batch?
                            firing$3475) {
                            firingLength$3477 = list$3479.length;
                        } else if (memory$3473) {
                            firingStart$3476 = start$3484;
                            fire$3481(memory$3473);
                        }
                    }
                    return this;
                },
                // Remove a callback from the list
                remove: function () {
                    if (list$3479) {
                        jQuery$2724.each(arguments, function (_$3489, arg$3490) {
                            var index$3491;
                            while ((index$3491 = jQuery$2724.inArray(arg$3490, list$3479, index$3491)) > -1) {
                                list$3479.splice(index$3491, 1);
                                if (// Handle firing indexes
                                    firing$3475) {
                                    if (index$3491 <= firingLength$3477) {
                                        firingLength$3477--;
                                    }
                                    if (index$3491 <= firingIndex$3478) {
                                        firingIndex$3478--;
                                    }
                                }
                            }
                        });
                    }
                    return this;
                },
                // Check if a given callback is in the list.
                // If no argument is given, return whether or not list has callbacks attached.
                has: function (fn$3492) {
                    return fn$3492 ? jQuery$2724.inArray(fn$3492, list$3479) > -1 : !!(list$3479 && list$3479.length);
                },
                // Remove all callbacks from the list
                empty: function () {
                    list$3479 = [];
                    firingLength$3477 = 0;
                    return this;
                },
                // Have the list do nothing anymore
                disable: function () {
                    list$3479 = stack$3480 = memory$3473 = undefined;
                    return this;
                },
                // Is it disabled?
                disabled: function () {
                    return !list$3479;
                },
                // Lock the list in its current state
                lock: function () {
                    stack$3480 = undefined;
                    if (!memory$3473) {
                        self$3482.disable();
                    }
                    return this;
                },
                // Is it locked?
                locked: function () {
                    return !stack$3480;
                },
                // Call all callbacks with the given context and arguments
                fireWith: function (context$3493, args$3494) {
                    if (list$3479 && (!fired$3474 || stack$3480)) {
                        args$3494 = args$3494 || [];
                        args$3494 = [
                            context$3493,
                            args$3494.slice ? args$3494.slice() : args$3494
                        ];
                        if (firing$3475) {
                            stack$3480.push(args$3494);
                        } else {
                            fire$3481(args$3494);
                        }
                    }
                    return this;
                },
                // Call all the callbacks with the given arguments
                fire: function () {
                    self$3482.fireWith(this, arguments);
                    return this;
                },
                // To know if the callbacks have already been called at least once
                fired: function () {
                    return !!fired$3474;
                }
            };
        return self$3482;
    };
    jQuery$2724.extend({
        Deferred: function (func$3495) {
            var tuples$3496 = [
                    [
                        // action, add listener, listener list, final state
                        'resolve',
                        'done',
                        jQuery$2724.Callbacks('once memory'),
                        'resolved'
                    ],
                    [
                        'reject',
                        'fail',
                        jQuery$2724.Callbacks('once memory'),
                        'rejected'
                    ],
                    [
                        'notify',
                        'progress',
                        jQuery$2724.Callbacks('memory')
                    ]
                ], state$3497 = 'pending', promise$3498 = {
                    state: function () {
                        return state$3497;
                    },
                    always: function () {
                        deferred$3499.done(arguments).fail(arguments);
                        return this;
                    },
                    then: function () {
                        var fns$3500 = arguments;
                        return jQuery$2724.Deferred(function (newDefer$3501) {
                            jQuery$2724.each(tuples$3496, function (i$3502, tuple$3503) {
                                var fn$3504 = jQuery$2724.isFunction(fns$3500[i$3502]) && fns$3500[i$3502];
                                // deferred[ done | fail | progress ] for forwarding actions to newDefer
                                deferred$3499[tuple$3503[1]](function () {
                                    var returned$3505 = fn$3504 && fn$3504.apply(this, arguments);
                                    if (returned$3505 && jQuery$2724.isFunction(returned$3505.promise)) {
                                        returned$3505.promise().done(newDefer$3501.resolve).fail(newDefer$3501.reject).progress(newDefer$3501.notify);
                                    } else {
                                        newDefer$3501[tuple$3503[0] + 'With'](this === promise$3498 ? newDefer$3501.promise() : this, fn$3504 ? [returned$3505] : arguments);
                                    }
                                });
                            });
                            fns$3500 = null;
                        }).promise();
                    },
                    // Get a promise for this deferred
                    // If obj is provided, the promise aspect is added to the object
                    promise: function (obj$3506) {
                        return obj$3506 != null ? jQuery$2724.extend(obj$3506, promise$3498) : promise$3498;
                    }
                }, deferred$3499 = {};
            // Keep pipe for back-compat
            promise$3498.pipe = promise$3498.then;
            // Add list-specific methods
            jQuery$2724.each(tuples$3496, function (i$3507, tuple$3508) {
                var list$3509 = tuple$3508[2], stateString$3510 = tuple$3508[3];
                // promise[ done | fail | progress ] = list.add
                promise$3498[tuple$3508[1]] = list$3509.add;
                if (// Handle state
                    stateString$3510) {
                    list$3509.add(function () {
                        // state = [ resolved | rejected ]
                        state$3497 = stateString$3510;
                    }, tuples$3496[i$3507 ^ 1][2].disable, tuples$3496[2][2].lock);
                }
                // deferred[ resolve | reject | notify ]
                deferred$3499[tuple$3508[0]] = function () {
                    deferred$3499[tuple$3508[0] + 'With'](this === deferred$3499 ? promise$3498 : this, arguments);
                    return this;
                };
                deferred$3499[tuple$3508[0] + 'With'] = list$3509.fireWith;
            });
            // Make the deferred a promise
            promise$3498.promise(deferred$3499);
            if (// Call given func if any
                func$3495) {
                func$3495.call(deferred$3499, deferred$3499);
            }
            // All done!
            return deferred$3499;
        },
        // Deferred helper
        when: function (subordinate$3511) {
            var i$3512 = 0, resolveValues$3513 = slice$2714.call(arguments), length$3514 = resolveValues$3513.length, // the count of uncompleted subordinates
                remaining$3515 = length$3514 !== 1 || subordinate$3511 && jQuery$2724.isFunction(subordinate$3511.promise) ? length$3514 : 0, // the master Deferred. If resolveValues consist of only a single Deferred, just use that.
                deferred$3516 = remaining$3515 === 1 ? subordinate$3511 : jQuery$2724.Deferred(), // Update function for both resolve and progress values
                updateFunc$3517 = function (i$3521, contexts$3522, values$3523) {
                    return function (value$3524) {
                        contexts$3522[i$3521] = this;
                        values$3523[i$3521] = arguments.length > 1 ? slice$2714.call(arguments) : value$3524;
                        if (values$3523 === progressValues$3518) {
                            deferred$3516.notifyWith(contexts$3522, values$3523);
                        } else if (!--remaining$3515) {
                            deferred$3516.resolveWith(contexts$3522, values$3523);
                        }
                    };
                }, progressValues$3518, progressContexts$3519, resolveContexts$3520;
            if (// Add listeners to Deferred subordinates; treat others as resolved
                length$3514 > 1) {
                progressValues$3518 = new Array(length$3514);
                progressContexts$3519 = new Array(length$3514);
                resolveContexts$3520 = new Array(length$3514);
                for (; i$3512 < length$3514; i$3512++) {
                    if (resolveValues$3513[i$3512] && jQuery$2724.isFunction(resolveValues$3513[i$3512].promise)) {
                        resolveValues$3513[i$3512].promise().done(updateFunc$3517(i$3512, resolveContexts$3520, resolveValues$3513)).fail(deferred$3516.reject).progress(updateFunc$3517(i$3512, progressContexts$3519, progressValues$3518));
                    } else {
                        --remaining$3515;
                    }
                }
            }
            if (// If we're not waiting on anything, resolve the master
                !remaining$3515) {
                deferred$3516.resolveWith(resolveContexts$3520, resolveValues$3513);
            }
            return deferred$3516.promise();
        }
    });
    // The deferred used on DOM ready
    var readyList$2744;
    jQuery$2724.fn.ready = function (fn$3525) {
        // Add the callback
        jQuery$2724.ready.promise().done(fn$3525);
        return this;
    };
    jQuery$2724.extend({
        // Is the DOM ready to be used? Set to true once it occurs.
        isReady: false,
        // A counter to track how many items to wait for before
        // the ready event fires. See #6781
        readyWait: 1,
        // Hold (or release) the ready event
        holdReady: function (hold$3526) {
            if (hold$3526) {
                jQuery$2724.readyWait++;
            } else {
                jQuery$2724.ready(true);
            }
        },
        // Handle when the DOM is ready
        ready: function (wait$3527) {
            if (// Abort if there are pending holds or we're already ready
                wait$3527 === true ? --jQuery$2724.readyWait : jQuery$2724.isReady) {
                return;
            }
            // Remember that the DOM is ready
            jQuery$2724.isReady = true;
            if (// If a normal DOM Ready event fired, decrement, and wait if need be
                wait$3527 !== true && --jQuery$2724.readyWait > 0) {
                return;
            }
            // If there are functions bound, to execute
            readyList$2744.resolveWith(document$2722, [jQuery$2724]);
            if (// Trigger any bound ready events
                jQuery$2724.fn.triggerHandler) {
                jQuery$2724(document$2722).triggerHandler('ready');
                jQuery$2724(document$2722).off('ready');
            }
        }
    });
    function completed$2745() {
        document$2722.removeEventListener('DOMContentLoaded', completed$2745, false);
        window$2711.removeEventListener('load', completed$2745, false);
        jQuery$2724.ready();
    }
    jQuery$2724.ready.promise = function (obj$3528) {
        if (!readyList$2744) {
            readyList$2744 = jQuery$2724.Deferred();
            if (// Catch cases where $(document).ready() is called after the browser event has already occurred.
                // We once tried to use readyState "interactive" here, but it caused issues like the one
                // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
                document$2722.readyState === 'complete') {
                // Handle it asynchronously to allow scripts the opportunity to delay ready
                setTimeout(jQuery$2724.ready);
            } else {
                // Use the handy event callback
                document$2722.addEventListener('DOMContentLoaded', completed$2745, false);
                // A fallback to window.onload, that will always work
                window$2711.addEventListener('load', completed$2745, false);
            }
        }
        return readyList$2744.promise(obj$3528);
    };
    // Kick off the DOM ready check even if the user does not
    jQuery$2724.ready.promise();
    var // Multifunctional method to get and set values of a collection
    // The value/s can optionally be executed if it's a function
    access$2746 = jQuery$2724.access = function (elems$3529, fn$3530, key$3531, value$3532, chainable$3533, emptyGet$3534, raw$3535) {
        var i$3536 = 0, len$3537 = elems$3529.length, bulk$3538 = key$3531 == null;
        if (// Sets many values
            jQuery$2724.type(key$3531) === 'object') {
            chainable$3533 = true;
            for (i$3536 in key$3531) {
                jQuery$2724.access(elems$3529, fn$3530, i$3536, key$3531[i$3536], true, emptyGet$3534, raw$3535);
            }
        } else if (value$3532 !== undefined) {
            chainable$3533 = true;
            if (!jQuery$2724.isFunction(value$3532)) {
                raw$3535 = true;
            }
            if (bulk$3538) {
                if (// Bulk operations run against the entire set
                    raw$3535) {
                    fn$3530.call(elems$3529, value$3532);
                    fn$3530 = null;
                } else {
                    bulk$3538 = fn$3530;
                    fn$3530 = function (elem$3539, key$3540, value$3541) {
                        return bulk$3538.call(jQuery$2724(elem$3539), value$3541);
                    };
                }
            }
            if (fn$3530) {
                for (; i$3536 < len$3537; i$3536++) {
                    fn$3530(elems$3529[i$3536], key$3531, raw$3535 ? value$3532 : value$3532.call(elems$3529[i$3536], i$3536, fn$3530(elems$3529[i$3536], key$3531)));
                }
            }
        }
        return chainable$3533 ? elems$3529 : // Gets
        bulk$3538 ? fn$3530.call(elems$3529) : len$3537 ? fn$3530(elems$3529[0], key$3531) : emptyGet$3534;
    };
    /**
 * Determines whether an object can have data
 */
    jQuery$2724.acceptData = function (owner$3542) {
        return // Accepts only:
        //  - Node
        //    - Node.ELEMENT_NODE
        //    - Node.DOCUMENT_NODE
        //  - Object
        //    - Any
        /* jshint -W018 */
        owner$3542.nodeType === 1 || owner$3542.nodeType === 9 || !+owner$3542.nodeType;
    };
    function Data$2747() {
        // Support: Android<4,
        // Old WebKit does not have Object.preventExtensions/freeze method,
        // return new empty object instead with no [[set]] accessor
        Object.defineProperty(this.cache = {}, 0, {
            get: function () {
                return {};
            }
        });
        this.expando = jQuery$2724.expando + Data$2747.uid++;
    }
    Data$2747.uid = 1;
    Data$2747.accepts = jQuery$2724.acceptData;
    Data$2747.prototype = {
        key: function (owner$3543) {
            if (// We can accept data for non-element nodes in modern browsers,
                // but we should not, see #8335.
                // Always return the key for a frozen object.
                !Data$2747.accepts(owner$3543)) {
                return 0;
            }
            var descriptor$3544 = {}, // Check if the owner object already has a cache key
                unlock$3545 = owner$3543[this.expando];
            if (// If not, create one
                !unlock$3545) {
                unlock$3545 = Data$2747.uid++;
                try {
                    // Secure it in a non-enumerable, non-writable property
                    descriptor$3544[this.expando] = { value: unlock$3545 };
                    Object.defineProperties(owner$3543, descriptor$3544);
                } catch (e$3546) {
                    descriptor$3544[this.expando] = unlock$3545;
                    jQuery$2724.extend(owner$3543, descriptor$3544);
                }
            }
            if (// Ensure the cache object
                !this.cache[unlock$3545]) {
                this.cache[unlock$3545] = {};
            }
            return unlock$3545;
        },
        set: function (owner$3547, data$3548, value$3549) {
            var prop$3550, // There may be an unlock assigned to this node,
                // if there is no entry for this "owner", create one inline
                // and set the unlock as though an owner entry had always existed
                unlock$3551 = this.key(owner$3547), cache$3552 = this.cache[unlock$3551];
            if (// Handle: [ owner, key, value ] args
                typeof data$3548 === 'string') {
                cache$3552[data$3548] = value$3549;
            } else {
                if (// Fresh assignments by object are shallow copied
                    jQuery$2724.isEmptyObject(cache$3552)) {
                    jQuery$2724.extend(this.cache[unlock$3551], data$3548);
                } else {
                    for (prop$3550 in data$3548) {
                        cache$3552[prop$3550] = data$3548[prop$3550];
                    }
                }
            }
            return cache$3552;
        },
        get: function (owner$3553, key$3554) {
            var // Either a valid cache is found, or will be created.
            // New caches will be created and the unlock returned,
            // allowing direct access to the newly created
            // empty data object. A valid owner object must be provided.
            cache$3555 = this.cache[this.key(owner$3553)];
            return key$3554 === undefined ? cache$3555 : cache$3555[key$3554];
        },
        access: function (owner$3556, key$3557, value$3558) {
            var stored$3559;
            if (// In cases where either:
                //
                //   1. No key was specified
                //   2. A string key was specified, but no value provided
                //
                // Take the "read" path and allow the get method to determine
                // which value to return, respectively either:
                //
                //   1. The entire cache object
                //   2. The data stored at the key
                //
                key$3557 === undefined || key$3557 && typeof key$3557 === 'string' && value$3558 === undefined) {
                stored$3559 = this.get(owner$3556, key$3557);
                return stored$3559 !== undefined ? stored$3559 : this.get(owner$3556, jQuery$2724.camelCase(key$3557));
            }
            // [*]When the key is not a string, or both a key and value
            // are specified, set or extend (existing objects) with either:
            //
            //   1. An object of properties
            //   2. A key and value
            //
            this.set(owner$3556, key$3557, value$3558);
            // Since the "set" path can have two possible entry points
            // return the expected data based on which path was taken[*]
            return value$3558 !== undefined ? value$3558 : key$3557;
        },
        remove: function (owner$3560, key$3561) {
            var i$3562, name$3563, camel$3564, unlock$3565 = this.key(owner$3560), cache$3566 = this.cache[unlock$3565];
            if (key$3561 === undefined) {
                this.cache[unlock$3565] = {};
            } else {
                if (// Support array or space separated string of keys
                    jQuery$2724.isArray(key$3561)) {
                    // If "name" is an array of keys...
                    // When data is initially created, via ("key", "val") signature,
                    // keys will be converted to camelCase.
                    // Since there is no way to tell _how_ a key was added, remove
                    // both plain key and camelCase key. #12786
                    // This will only penalize the array argument path.
                    name$3563 = key$3561.concat(key$3561.map(jQuery$2724.camelCase));
                } else {
                    camel$3564 = jQuery$2724.camelCase(key$3561);
                    if (// Try the string as a key before any manipulation
                        key$3561 in cache$3566) {
                        name$3563 = [
                            key$3561,
                            camel$3564
                        ];
                    } else {
                        // If a key with the spaces exists, use it.
                        // Otherwise, create an array by matching non-whitespace
                        name$3563 = camel$3564;
                        name$3563 = name$3563 in cache$3566 ? [name$3563] : name$3563.match(rnotwhite$2741) || [];
                    }
                }
                i$3562 = name$3563.length;
                while (i$3562--) {
                    delete cache$3566[name$3563[i$3562]];
                }
            }
        },
        hasData: function (owner$3567) {
            return !jQuery$2724.isEmptyObject(this.cache[owner$3567[this.expando]] || {});
        },
        discard: function (owner$3568) {
            if (owner$3568[this.expando]) {
                delete this.cache[owner$3568[this.expando]];
            }
        }
    };
    var data_priv$2748 = new Data$2747();
    var data_user$2749 = new Data$2747();
    var
        //	Implementation Summary
        //
        //	1. Enforce API surface and semantic compatibility with 1.9.x branch
        //	2. Improve the module's maintainability by reducing the storage
        //		paths to a single mechanism.
        //	3. Use the same single mechanism to support "private" and "user" data.
        //	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
        //	5. Avoid exposing implementation details on user objects (eg. expando properties)
        //	6. Provide a clear path for implementation upgrade to WeakMap in 2014
        rbrace$2750 = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash$2751 = /([A-Z])/g;
    function dataAttr$2752(elem$3569, key$3570, data$3571) {
        var name$3572;
        if (// If nothing was found internally, try to fetch any
            // data from the HTML5 data-* attribute
            data$3571 === undefined && elem$3569.nodeType === 1) {
            name$3572 = 'data-' + key$3570.replace(rmultiDash$2751, '-$1').toLowerCase();
            data$3571 = elem$3569.getAttribute(name$3572);
            if (typeof data$3571 === 'string') {
                try {
                    data$3571 = data$3571 === 'true' ? true : data$3571 === 'false' ? false : data$3571 === 'null' ? null : // Only convert to a number if it doesn't change the string
                    +data$3571 + '' === data$3571 ? +data$3571 : rbrace$2750.test(data$3571) ? jQuery$2724.parseJSON(data$3571) : data$3571;
                } catch (e$3573) {
                }
                // Make sure we set the data so it isn't changed later
                data_user$2749.set(elem$3569, key$3570, data$3571);
            } else {
                data$3571 = undefined;
            }
        }
        return data$3571;
    }
    jQuery$2724.extend({
        hasData: function (elem$3574) {
            return data_user$2749.hasData(elem$3574) || data_priv$2748.hasData(elem$3574);
        },
        data: function (elem$3575, name$3576, data$3577) {
            return data_user$2749.access(elem$3575, name$3576, data$3577);
        },
        removeData: function (elem$3578, name$3579) {
            data_user$2749.remove(elem$3578, name$3579);
        },
        // TODO: Now that all calls to _data and _removeData have been replaced
        // with direct calls to data_priv methods, these can be deprecated.
        _data: function (elem$3580, name$3581, data$3582) {
            return data_priv$2748.access(elem$3580, name$3581, data$3582);
        },
        _removeData: function (elem$3583, name$3584) {
            data_priv$2748.remove(elem$3583, name$3584);
        }
    });
    jQuery$2724.fn.extend({
        data: function (key$3585, value$3586) {
            var i$3587, name$3588, data$3589, elem$3590 = this[0], attrs$3591 = elem$3590 && elem$3590.attributes;
            if (// Gets all values
                key$3585 === undefined) {
                if (this.length) {
                    data$3589 = data_user$2749.get(elem$3590);
                    if (elem$3590.nodeType === 1 && !data_priv$2748.get(elem$3590, 'hasDataAttrs')) {
                        i$3587 = attrs$3591.length;
                        while (i$3587--) {
                            if (// Support: IE11+
                                // The attrs elements can be null (#14894)
                                attrs$3591[i$3587]) {
                                name$3588 = attrs$3591[i$3587].name;
                                if (name$3588.indexOf('data-') === 0) {
                                    name$3588 = jQuery$2724.camelCase(name$3588.slice(5));
                                    dataAttr$2752(elem$3590, name$3588, data$3589[name$3588]);
                                }
                            }
                        }
                        data_priv$2748.set(elem$3590, 'hasDataAttrs', true);
                    }
                }
                return data$3589;
            }
            if (// Sets multiple values
                typeof key$3585 === 'object') {
                return this.each(function () {
                    data_user$2749.set(this, key$3585);
                });
            }
            return access$2746(this, function (value$3592) {
                var data$3593, camelKey$3594 = jQuery$2724.camelCase(key$3585);
                if (// The calling jQuery object (element matches) is not empty
                    // (and therefore has an element appears at this[ 0 ]) and the
                    // `value` parameter was not undefined. An empty jQuery object
                    // will result in `undefined` for elem = this[ 0 ] which will
                    // throw an exception if an attempt to read a data cache is made.
                    elem$3590 && value$3592 === undefined) {
                    // Attempt to get data from the cache
                    // with the key as-is
                    data$3593 = data_user$2749.get(elem$3590, key$3585);
                    if (data$3593 !== undefined) {
                        return data$3593;
                    }
                    // Attempt to get data from the cache
                    // with the key camelized
                    data$3593 = data_user$2749.get(elem$3590, camelKey$3594);
                    if (data$3593 !== undefined) {
                        return data$3593;
                    }
                    // Attempt to "discover" the data in
                    // HTML5 custom data-* attrs
                    data$3593 = dataAttr$2752(elem$3590, camelKey$3594, undefined);
                    if (data$3593 !== undefined) {
                        return data$3593;
                    }
                    // We tried really hard, but the data doesn't exist.
                    return;
                }
                // Set the data...
                this.each(function () {
                    var // First, attempt to store a copy or reference of any
                    // data that might've been store with a camelCased key.
                    data$3595 = data_user$2749.get(this, camelKey$3594);
                    // For HTML5 data-* attribute interop, we have to
                    // store property names with dashes in a camelCase form.
                    // This might not apply to all properties...*
                    data_user$2749.set(this, camelKey$3594, value$3592);
                    if (// *... In the case of properties that might _actually_
                        // have dashes, we need to also store a copy of that
                        // unchanged property.
                        key$3585.indexOf('-') !== -1 && data$3595 !== undefined) {
                        data_user$2749.set(this, key$3585, value$3592);
                    }
                });
            }, null, value$3586, arguments.length > 1, null, true);
        },
        removeData: function (key$3596) {
            return this.each(function () {
                data_user$2749.remove(this, key$3596);
            });
        }
    });
    jQuery$2724.extend({
        queue: function (elem$3597, type$3598, data$3599) {
            var queue$3600;
            if (elem$3597) {
                type$3598 = (type$3598 || 'fx') + 'queue';
                queue$3600 = data_priv$2748.get(elem$3597, type$3598);
                if (// Speed up dequeue by getting out quickly if this is just a lookup
                    data$3599) {
                    if (!queue$3600 || jQuery$2724.isArray(data$3599)) {
                        queue$3600 = data_priv$2748.access(elem$3597, type$3598, jQuery$2724.makeArray(data$3599));
                    } else {
                        queue$3600.push(data$3599);
                    }
                }
                return queue$3600 || [];
            }
        },
        dequeue: function (elem$3601, type$3602) {
            type$3602 = type$3602 || 'fx';
            var queue$3603 = jQuery$2724.queue(elem$3601, type$3602), startLength$3604 = queue$3603.length, fn$3605 = queue$3603.shift(), hooks$3606 = jQuery$2724._queueHooks(elem$3601, type$3602), next$3607 = function () {
                    jQuery$2724.dequeue(elem$3601, type$3602);
                };
            if (// If the fx queue is dequeued, always remove the progress sentinel
                fn$3605 === 'inprogress') {
                fn$3605 = queue$3603.shift();
                startLength$3604--;
            }
            if (fn$3605) {
                if (// Add a progress sentinel to prevent the fx queue from being
                    // automatically dequeued
                    type$3602 === 'fx') {
                    queue$3603.unshift('inprogress');
                }
                // Clear up the last queue stop function
                delete hooks$3606.stop;
                fn$3605.call(elem$3601, next$3607, hooks$3606);
            }
            if (!startLength$3604 && hooks$3606) {
                hooks$3606.empty.fire();
            }
        },
        // Not public - generate a queueHooks object, or return the current one
        _queueHooks: function (elem$3608, type$3609) {
            var key$3610 = type$3609 + 'queueHooks';
            return data_priv$2748.get(elem$3608, key$3610) || data_priv$2748.access(elem$3608, key$3610, {
                empty: jQuery$2724.Callbacks('once memory').add(function () {
                    data_priv$2748.remove(elem$3608, [
                        type$3609 + 'queue',
                        key$3610
                    ]);
                })
            });
        }
    });
    jQuery$2724.fn.extend({
        queue: function (type$3611, data$3612) {
            var setter$3613 = 2;
            if (typeof type$3611 !== 'string') {
                data$3612 = type$3611;
                type$3611 = 'fx';
                setter$3613--;
            }
            if (arguments.length < setter$3613) {
                return jQuery$2724.queue(this[0], type$3611);
            }
            return data$3612 === undefined ? this : this.each(function () {
                var queue$3614 = jQuery$2724.queue(this, type$3611, data$3612);
                // Ensure a hooks for this queue
                jQuery$2724._queueHooks(this, type$3611);
                if (type$3611 === 'fx' && queue$3614[0] !== 'inprogress') {
                    jQuery$2724.dequeue(this, type$3611);
                }
            });
        },
        dequeue: function (type$3615) {
            return this.each(function () {
                jQuery$2724.dequeue(this, type$3615);
            });
        },
        clearQueue: function (type$3616) {
            return this.queue(type$3616 || 'fx', []);
        },
        // Get a promise resolved when queues of a certain type
        // are emptied (fx is the type by default)
        promise: function (type$3617, obj$3618) {
            var tmp$3619, count$3620 = 1, defer$3621 = jQuery$2724.Deferred(), elements$3622 = this, i$3623 = this.length, resolve$3624 = function () {
                    if (!--count$3620) {
                        defer$3621.resolveWith(elements$3622, [elements$3622]);
                    }
                };
            if (typeof type$3617 !== 'string') {
                obj$3618 = type$3617;
                type$3617 = undefined;
            }
            type$3617 = type$3617 || 'fx';
            while (i$3623--) {
                tmp$3619 = data_priv$2748.get(elements$3622[i$3623], type$3617 + 'queueHooks');
                if (tmp$3619 && tmp$3619.empty) {
                    count$3620++;
                    tmp$3619.empty.add(resolve$3624);
                }
            }
            resolve$3624();
            return defer$3621.promise(obj$3618);
        }
    });
    var pnum$2753 = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
    var cssExpand$2754 = [
        'Top',
        'Right',
        'Bottom',
        'Left'
    ];
    var isHidden$2755 = function (elem$3625, el$3626) {
        // isHidden might be called from jQuery#filter function;
        // in that case, element will be second argument
        elem$3625 = el$3626 || elem$3625;
        return jQuery$2724.css(elem$3625, 'display') === 'none' || !jQuery$2724.contains(elem$3625.ownerDocument, elem$3625);
    };
    var rcheckableType$2756 = /^(?:checkbox|radio)$/i;
    (function () {
        var fragment$3627 = document$2722.createDocumentFragment(), div$3628 = fragment$3627.appendChild(document$2722.createElement('div')), input$3629 = document$2722.createElement('input');
        // Support: Safari<=5.1
        // Check state lost if the name is set (#11217)
        // Support: Windows Web Apps (WWA)
        // `name` and `type` must use .setAttribute for WWA (#14901)
        input$3629.setAttribute('type', 'radio');
        input$3629.setAttribute('checked', 'checked');
        input$3629.setAttribute('name', 't');
        div$3628.appendChild(input$3629);
        // Support: Safari<=5.1, Android<4.2
        // Older WebKit doesn't clone checked state correctly in fragments
        support$2721.checkClone = div$3628.cloneNode(true).cloneNode(true).lastChild.checked;
        // Support: IE<=11+
        // Make sure textarea (and checkbox) defaultValue is properly cloned
        div$3628.innerHTML = '<textarea>x</textarea>';
        support$2721.noCloneChecked = !!div$3628.cloneNode(true).lastChild.defaultValue;
    }());
    var strundefined$2757 = typeof undefined;
    support$2721.focusinBubbles = 'onfocusin' in window$2711;
    var rkeyEvent$2758 = /^key/, rmouseEvent$2759 = /^(?:mouse|pointer|contextmenu)|click/, rfocusMorph$2760 = /^(?:focusinfocus|focusoutblur)$/, rtypenamespace$2761 = /^([^.]*)(?:\.(.+)|)$/;
    function returnTrue$2762() {
        return true;
    }
    function returnFalse$2763() {
        return false;
    }
    function safeActiveElement$2764() {
        try {
            return document$2722.activeElement;
        } catch (err$3630) {
        }
    }
    /*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
    jQuery$2724.event = {
        global: {},
        add: function (elem$3631, types$3632, handler$3633, data$3634, selector$3635) {
            var handleObjIn$3636, eventHandle$3637, tmp$3638, events$3639, t$3640, handleObj$3641, special$3642, handlers$3643, type$3644, namespaces$3645, origType$3646, elemData$3647 = data_priv$2748.get(elem$3631);
            if (// Don't attach events to noData or text/comment nodes (but allow plain objects)
                !elemData$3647) {
                return;
            }
            if (// Caller can pass in an object of custom data in lieu of the handler
                handler$3633.handler) {
                handleObjIn$3636 = handler$3633;
                handler$3633 = handleObjIn$3636.handler;
                selector$3635 = handleObjIn$3636.selector;
            }
            if (// Make sure that the handler has a unique ID, used to find/remove it later
                !handler$3633.guid) {
                handler$3633.guid = jQuery$2724.guid++;
            }
            if (!(// Init the element's event structure and main handler, if this is the first
                events$3639 = elemData$3647.events)) {
                events$3639 = elemData$3647.events = {};
            }
            if (!(eventHandle$3637 = elemData$3647.handle)) {
                eventHandle$3637 = elemData$3647.handle = function (e$3648) {
                    return // Discard the second event of a jQuery.event.trigger() and
                    // when an event is called after a page has unloaded
                    typeof jQuery$2724 !== strundefined$2757 && jQuery$2724.event.triggered !== e$3648.type ? jQuery$2724.event.dispatch.apply(elem$3631, arguments) : undefined;
                };
            }
            // Handle multiple events separated by a space
            types$3632 = (types$3632 || '').match(rnotwhite$2741) || [''];
            t$3640 = types$3632.length;
            while (t$3640--) {
                tmp$3638 = rtypenamespace$2761.exec(types$3632[t$3640]) || [];
                type$3644 = origType$3646 = tmp$3638[1];
                namespaces$3645 = (tmp$3638[2] || '').split('.').sort();
                if (// There *must* be a type, no attaching namespace-only handlers
                    !type$3644) {
                    continue;
                }
                // If event changes its type, use the special event handlers for the changed type
                special$3642 = jQuery$2724.event.special[type$3644] || {};
                // If selector defined, determine special event api type, otherwise given type
                type$3644 = (selector$3635 ? special$3642.delegateType : special$3642.bindType) || type$3644;
                // Update special based on newly reset type
                special$3642 = jQuery$2724.event.special[type$3644] || {};
                // handleObj is passed to all event handlers
                handleObj$3641 = jQuery$2724.extend({
                    type: type$3644,
                    origType: origType$3646,
                    data: data$3634,
                    handler: handler$3633,
                    guid: handler$3633.guid,
                    selector: selector$3635,
                    needsContext: selector$3635 && jQuery$2724.expr.match.needsContext.test(selector$3635),
                    namespace: namespaces$3645.join('.')
                }, handleObjIn$3636);
                if (!(// Init the event handler queue if we're the first
                    handlers$3643 = events$3639[type$3644])) {
                    handlers$3643 = events$3639[type$3644] = [];
                    handlers$3643.delegateCount = 0;
                    if (// Only use addEventListener if the special events handler returns false
                        !special$3642.setup || special$3642.setup.call(elem$3631, data$3634, namespaces$3645, eventHandle$3637) === false) {
                        if (elem$3631.addEventListener) {
                            elem$3631.addEventListener(type$3644, eventHandle$3637, false);
                        }
                    }
                }
                if (special$3642.add) {
                    special$3642.add.call(elem$3631, handleObj$3641);
                    if (!handleObj$3641.handler.guid) {
                        handleObj$3641.handler.guid = handler$3633.guid;
                    }
                }
                if (// Add to the element's handler list, delegates in front
                    selector$3635) {
                    handlers$3643.splice(handlers$3643.delegateCount++, 0, handleObj$3641);
                } else {
                    handlers$3643.push(handleObj$3641);
                }
                // Keep track of which events have ever been used, for event optimization
                jQuery$2724.event.global[type$3644] = true;
            }
        },
        // Detach an event or set of events from an element
        remove: function (elem$3649, types$3650, handler$3651, selector$3652, mappedTypes$3653) {
            var j$3654, origCount$3655, tmp$3656, events$3657, t$3658, handleObj$3659, special$3660, handlers$3661, type$3662, namespaces$3663, origType$3664, elemData$3665 = data_priv$2748.hasData(elem$3649) && data_priv$2748.get(elem$3649);
            if (!elemData$3665 || !(events$3657 = elemData$3665.events)) {
                return;
            }
            // Once for each type.namespace in types; type may be omitted
            types$3650 = (types$3650 || '').match(rnotwhite$2741) || [''];
            t$3658 = types$3650.length;
            while (t$3658--) {
                tmp$3656 = rtypenamespace$2761.exec(types$3650[t$3658]) || [];
                type$3662 = origType$3664 = tmp$3656[1];
                namespaces$3663 = (tmp$3656[2] || '').split('.').sort();
                if (// Unbind all events (on this namespace, if provided) for the element
                    !type$3662) {
                    for (type$3662 in events$3657) {
                        jQuery$2724.event.remove(elem$3649, type$3662 + types$3650[t$3658], handler$3651, selector$3652, true);
                    }
                    continue;
                }
                special$3660 = jQuery$2724.event.special[type$3662] || {};
                type$3662 = (selector$3652 ? special$3660.delegateType : special$3660.bindType) || type$3662;
                handlers$3661 = events$3657[type$3662] || [];
                tmp$3656 = tmp$3656[2] && new RegExp('(^|\\.)' + namespaces$3663.join('\\.(?:.*\\.|)') + '(\\.|$)');
                // Remove matching events
                origCount$3655 = j$3654 = handlers$3661.length;
                while (j$3654--) {
                    handleObj$3659 = handlers$3661[j$3654];
                    if ((mappedTypes$3653 || origType$3664 === handleObj$3659.origType) && (!handler$3651 || handler$3651.guid === handleObj$3659.guid) && (!tmp$3656 || tmp$3656.test(handleObj$3659.namespace)) && (!selector$3652 || selector$3652 === handleObj$3659.selector || selector$3652 === '**' && handleObj$3659.selector)) {
                        handlers$3661.splice(j$3654, 1);
                        if (handleObj$3659.selector) {
                            handlers$3661.delegateCount--;
                        }
                        if (special$3660.remove) {
                            special$3660.remove.call(elem$3649, handleObj$3659);
                        }
                    }
                }
                if (// Remove generic event handler if we removed something and no more handlers exist
                    // (avoids potential for endless recursion during removal of special event handlers)
                    origCount$3655 && !handlers$3661.length) {
                    if (!special$3660.teardown || special$3660.teardown.call(elem$3649, namespaces$3663, elemData$3665.handle) === false) {
                        jQuery$2724.removeEvent(elem$3649, type$3662, elemData$3665.handle);
                    }
                    delete events$3657[type$3662];
                }
            }
            if (// Remove the expando if it's no longer used
                jQuery$2724.isEmptyObject(events$3657)) {
                delete elemData$3665.handle;
                data_priv$2748.remove(elem$3649, 'events');
            }
        },
        trigger: function (event$3666, data$3667, elem$3668, onlyHandlers$3669) {
            var i$3670, cur$3671, tmp$3672, bubbleType$3673, ontype$3674, handle$3675, special$3676, eventPath$3677 = [elem$3668 || document$2722], type$3678 = hasOwn$2720.call(event$3666, 'type') ? event$3666.type : event$3666, namespaces$3679 = hasOwn$2720.call(event$3666, 'namespace') ? event$3666.namespace.split('.') : [];
            cur$3671 = tmp$3672 = elem$3668 = elem$3668 || document$2722;
            if (// Don't do events on text and comment nodes
                elem$3668.nodeType === 3 || elem$3668.nodeType === 8) {
                return;
            }
            if (// focus/blur morphs to focusin/out; ensure we're not firing them right now
                rfocusMorph$2760.test(type$3678 + jQuery$2724.event.triggered)) {
                return;
            }
            if (type$3678.indexOf('.') >= 0) {
                // Namespaced trigger; create a regexp to match event type in handle()
                namespaces$3679 = type$3678.split('.');
                type$3678 = namespaces$3679.shift();
                namespaces$3679.sort();
            }
            ontype$3674 = type$3678.indexOf(':') < 0 && 'on' + type$3678;
            // Caller can pass in a jQuery.Event object, Object, or just an event type string
            event$3666 = event$3666[jQuery$2724.expando] ? event$3666 : new jQuery$2724.Event(type$3678, typeof event$3666 === 'object' && event$3666);
            // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
            event$3666.isTrigger = onlyHandlers$3669 ? 2 : 3;
            event$3666.namespace = namespaces$3679.join('.');
            event$3666.namespace_re = event$3666.namespace ? new RegExp('(^|\\.)' + namespaces$3679.join('\\.(?:.*\\.|)') + '(\\.|$)') : null;
            // Clean up the event in case it is being reused
            event$3666.result = undefined;
            if (!event$3666.target) {
                event$3666.target = elem$3668;
            }
            // Clone any incoming data and prepend the event, creating the handler arg list
            data$3667 = data$3667 == null ? [event$3666] : jQuery$2724.makeArray(data$3667, [event$3666]);
            // Allow special events to draw outside the lines
            special$3676 = jQuery$2724.event.special[type$3678] || {};
            if (!onlyHandlers$3669 && special$3676.trigger && special$3676.trigger.apply(elem$3668, data$3667) === false) {
                return;
            }
            if (// Determine event propagation path in advance, per W3C events spec (#9951)
                // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
                !onlyHandlers$3669 && !special$3676.noBubble && !jQuery$2724.isWindow(elem$3668)) {
                bubbleType$3673 = special$3676.delegateType || type$3678;
                if (!rfocusMorph$2760.test(bubbleType$3673 + type$3678)) {
                    cur$3671 = cur$3671.parentNode;
                }
                for (; cur$3671; cur$3671 = cur$3671.parentNode) {
                    eventPath$3677.push(cur$3671);
                    tmp$3672 = cur$3671;
                }
                if (// Only add window if we got to document (e.g., not plain obj or detached DOM)
                    tmp$3672 === (elem$3668.ownerDocument || document$2722)) {
                    eventPath$3677.push(tmp$3672.defaultView || tmp$3672.parentWindow || window$2711);
                }
            }
            // Fire handlers on the event path
            i$3670 = 0;
            while ((cur$3671 = eventPath$3677[i$3670++]) && !event$3666.isPropagationStopped()) {
                event$3666.type = i$3670 > 1 ? bubbleType$3673 : special$3676.bindType || type$3678;
                // jQuery handler
                handle$3675 = (data_priv$2748.get(cur$3671, 'events') || {})[event$3666.type] && data_priv$2748.get(cur$3671, 'handle');
                if (handle$3675) {
                    handle$3675.apply(cur$3671, data$3667);
                }
                // Native handler
                handle$3675 = ontype$3674 && cur$3671[ontype$3674];
                if (handle$3675 && handle$3675.apply && jQuery$2724.acceptData(cur$3671)) {
                    event$3666.result = handle$3675.apply(cur$3671, data$3667);
                    if (event$3666.result === false) {
                        event$3666.preventDefault();
                    }
                }
            }
            event$3666.type = type$3678;
            if (// If nobody prevented the default action, do it now
                !onlyHandlers$3669 && !event$3666.isDefaultPrevented()) {
                if ((!special$3676._default || special$3676._default.apply(eventPath$3677.pop(), data$3667) === false) && jQuery$2724.acceptData(elem$3668)) {
                    if (// Call a native DOM method on the target with the same name name as the event.
                        // Don't do default actions on window, that's where global variables be (#6170)
                        ontype$3674 && jQuery$2724.isFunction(elem$3668[type$3678]) && !jQuery$2724.isWindow(elem$3668)) {
                        // Don't re-trigger an onFOO event when we call its FOO() method
                        tmp$3672 = elem$3668[ontype$3674];
                        if (tmp$3672) {
                            elem$3668[ontype$3674] = null;
                        }
                        // Prevent re-triggering of the same event, since we already bubbled it above
                        jQuery$2724.event.triggered = type$3678;
                        elem$3668[type$3678]();
                        jQuery$2724.event.triggered = undefined;
                        if (tmp$3672) {
                            elem$3668[ontype$3674] = tmp$3672;
                        }
                    }
                }
            }
            return event$3666.result;
        },
        dispatch: function (event$3680) {
            // Make a writable jQuery.Event from the native event object
            event$3680 = jQuery$2724.event.fix(event$3680);
            var i$3681, j$3682, ret$3683, matched$3684, handleObj$3685, handlerQueue$3686 = [], args$3687 = slice$2714.call(arguments), handlers$3688 = (data_priv$2748.get(this, 'events') || {})[event$3680.type] || [], special$3689 = jQuery$2724.event.special[event$3680.type] || {};
            // Use the fix-ed jQuery.Event rather than the (read-only) native event
            args$3687[0] = event$3680;
            event$3680.delegateTarget = this;
            if (// Call the preDispatch hook for the mapped type, and let it bail if desired
                special$3689.preDispatch && special$3689.preDispatch.call(this, event$3680) === false) {
                return;
            }
            // Determine handlers
            handlerQueue$3686 = jQuery$2724.event.handlers.call(this, event$3680, handlers$3688);
            // Run delegates first; they may want to stop propagation beneath us
            i$3681 = 0;
            while ((matched$3684 = handlerQueue$3686[i$3681++]) && !event$3680.isPropagationStopped()) {
                event$3680.currentTarget = matched$3684.elem;
                j$3682 = 0;
                while ((handleObj$3685 = matched$3684.handlers[j$3682++]) && !event$3680.isImmediatePropagationStopped()) {
                    if (// Triggered event must either 1) have no namespace, or 2) have namespace(s)
                        // a subset or equal to those in the bound event (both can have no namespace).
                        !event$3680.namespace_re || event$3680.namespace_re.test(handleObj$3685.namespace)) {
                        event$3680.handleObj = handleObj$3685;
                        event$3680.data = handleObj$3685.data;
                        ret$3683 = ((jQuery$2724.event.special[handleObj$3685.origType] || {}).handle || handleObj$3685.handler).apply(matched$3684.elem, args$3687);
                        if (ret$3683 !== undefined) {
                            if ((event$3680.result = ret$3683) === false) {
                                event$3680.preventDefault();
                                event$3680.stopPropagation();
                            }
                        }
                    }
                }
            }
            if (// Call the postDispatch hook for the mapped type
                special$3689.postDispatch) {
                special$3689.postDispatch.call(this, event$3680);
            }
            return event$3680.result;
        },
        handlers: function (event$3690, handlers$3691) {
            var i$3692, matches$3693, sel$3694, handleObj$3695, handlerQueue$3696 = [], delegateCount$3697 = handlers$3691.delegateCount, cur$3698 = event$3690.target;
            if (// Find delegate handlers
                // Black-hole SVG <use> instance trees (#13180)
                // Avoid non-left-click bubbling in Firefox (#3861)
                delegateCount$3697 && cur$3698.nodeType && (!event$3690.button || event$3690.type !== 'click')) {
                for (; cur$3698 !== this; cur$3698 = cur$3698.parentNode || this) {
                    if (// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
                        cur$3698.disabled !== true || event$3690.type !== 'click') {
                        matches$3693 = [];
                        for (i$3692 = 0; i$3692 < delegateCount$3697; i$3692++) {
                            handleObj$3695 = handlers$3691[i$3692];
                            // Don't conflict with Object.prototype properties (#13203)
                            sel$3694 = handleObj$3695.selector + ' ';
                            if (matches$3693[sel$3694] === undefined) {
                                matches$3693[sel$3694] = handleObj$3695.needsContext ? jQuery$2724(sel$3694, this).index(cur$3698) >= 0 : jQuery$2724.find(sel$3694, this, null, [cur$3698]).length;
                            }
                            if (matches$3693[sel$3694]) {
                                matches$3693.push(handleObj$3695);
                            }
                        }
                        if (matches$3693.length) {
                            handlerQueue$3696.push({
                                elem: cur$3698,
                                handlers: matches$3693
                            });
                        }
                    }
                }
            }
            if (// Add the remaining (directly-bound) handlers
                delegateCount$3697 < handlers$3691.length) {
                handlerQueue$3696.push({
                    elem: this,
                    handlers: handlers$3691.slice(delegateCount$3697)
                });
            }
            return handlerQueue$3696;
        },
        // Includes some event props shared by KeyEvent and MouseEvent
        props: 'altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which'.split(' '),
        fixHooks: {},
        keyHooks: {
            props: 'char charCode key keyCode'.split(' '),
            filter: function (event$3699, original$3700) {
                if (// Add which for key events
                    event$3699.which == null) {
                    event$3699.which = original$3700.charCode != null ? original$3700.charCode : original$3700.keyCode;
                }
                return event$3699;
            }
        },
        mouseHooks: {
            props: 'button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement'.split(' '),
            filter: function (event$3701, original$3702) {
                var eventDoc$3703, doc$3704, body$3705, button$3706 = original$3702.button;
                if (// Calculate pageX/Y if missing and clientX/Y available
                    event$3701.pageX == null && original$3702.clientX != null) {
                    eventDoc$3703 = event$3701.target.ownerDocument || document$2722;
                    doc$3704 = eventDoc$3703.documentElement;
                    body$3705 = eventDoc$3703.body;
                    event$3701.pageX = original$3702.clientX + (doc$3704 && doc$3704.scrollLeft || body$3705 && body$3705.scrollLeft || 0) - (doc$3704 && doc$3704.clientLeft || body$3705 && body$3705.clientLeft || 0);
                    event$3701.pageY = original$3702.clientY + (doc$3704 && doc$3704.scrollTop || body$3705 && body$3705.scrollTop || 0) - (doc$3704 && doc$3704.clientTop || body$3705 && body$3705.clientTop || 0);
                }
                if (// Add which for click: 1 === left; 2 === middle; 3 === right
                    // Note: button is not normalized, so don't use it
                    !event$3701.which && button$3706 !== undefined) {
                    event$3701.which = button$3706 & 1 ? 1 : button$3706 & 2 ? 3 : button$3706 & 4 ? 2 : 0;
                }
                return event$3701;
            }
        },
        fix: function (event$3707) {
            if (event$3707[jQuery$2724.expando]) {
                return event$3707;
            }
            var
                // Create a writable copy of the event object and normalize some properties
                i$3708, prop$3709, copy$3710, type$3711 = event$3707.type, originalEvent$3712 = event$3707, fixHook$3713 = this.fixHooks[type$3711];
            if (!fixHook$3713) {
                this.fixHooks[type$3711] = fixHook$3713 = rmouseEvent$2759.test(type$3711) ? this.mouseHooks : rkeyEvent$2758.test(type$3711) ? this.keyHooks : {};
            }
            copy$3710 = fixHook$3713.props ? this.props.concat(fixHook$3713.props) : this.props;
            event$3707 = new jQuery$2724.Event(originalEvent$3712);
            i$3708 = copy$3710.length;
            while (i$3708--) {
                prop$3709 = copy$3710[i$3708];
                event$3707[prop$3709] = originalEvent$3712[prop$3709];
            }
            if (// Support: Cordova 2.5 (WebKit) (#13255)
                // All events should have a target; Cordova deviceready doesn't
                !event$3707.target) {
                event$3707.target = document$2722;
            }
            if (// Support: Safari 6.0+, Chrome<28
                // Target should not be a text node (#504, #13143)
                event$3707.target.nodeType === 3) {
                event$3707.target = event$3707.target.parentNode;
            }
            return fixHook$3713.filter ? fixHook$3713.filter(event$3707, originalEvent$3712) : event$3707;
        },
        special: {
            load: {
                // Prevent triggered image.load events from bubbling to window.load
                noBubble: true
            },
            focus: {
                // Fire native event if possible so blur/focus sequence is correct
                trigger: function () {
                    if (this !== safeActiveElement$2764() && this.focus) {
                        this.focus();
                        return false;
                    }
                },
                delegateType: 'focusin'
            },
            blur: {
                trigger: function () {
                    if (this === safeActiveElement$2764() && this.blur) {
                        this.blur();
                        return false;
                    }
                },
                delegateType: 'focusout'
            },
            click: {
                // For checkbox, fire native event so checked state will be right
                trigger: function () {
                    if (this.type === 'checkbox' && this.click && jQuery$2724.nodeName(this, 'input')) {
                        this.click();
                        return false;
                    }
                },
                // For cross-browser consistency, don't fire native .click() on links
                _default: function (event$3714) {
                    return jQuery$2724.nodeName(event$3714.target, 'a');
                }
            },
            beforeunload: {
                postDispatch: function (event$3715) {
                    if (// Support: Firefox 20+
                        // Firefox doesn't alert if the returnValue field is not set.
                        event$3715.result !== undefined && event$3715.originalEvent) {
                        event$3715.originalEvent.returnValue = event$3715.result;
                    }
                }
            }
        },
        simulate: function (type$3716, elem$3717, event$3718, bubble$3719) {
            var // Piggyback on a donor event to simulate a different one.
            // Fake originalEvent to avoid donor's stopPropagation, but if the
            // simulated event prevents default then we do the same on the donor.
            e$3720 = jQuery$2724.extend(new jQuery$2724.Event(), event$3718, {
                type: type$3716,
                isSimulated: true,
                originalEvent: {}
            });
            if (bubble$3719) {
                jQuery$2724.event.trigger(e$3720, null, elem$3717);
            } else {
                jQuery$2724.event.dispatch.call(elem$3717, e$3720);
            }
            if (e$3720.isDefaultPrevented()) {
                event$3718.preventDefault();
            }
        }
    };
    jQuery$2724.removeEvent = function (elem$3721, type$3722, handle$3723) {
        if (elem$3721.removeEventListener) {
            elem$3721.removeEventListener(type$3722, handle$3723, false);
        }
    };
    jQuery$2724.Event = function (src$3724, props$3725) {
        if (!(// Allow instantiation without the 'new' keyword
            this instanceof jQuery$2724.Event)) {
            return new jQuery$2724.Event(src$3724, props$3725);
        }
        if (// Event object
            src$3724 && src$3724.type) {
            this.originalEvent = src$3724;
            this.type = src$3724.type;
            // Events bubbling up the document may have been marked as prevented
            // by a handler lower down the tree; reflect the correct value.
            this.isDefaultPrevented = src$3724.defaultPrevented || src$3724.defaultPrevented === undefined && // Support: Android<4.0
            src$3724.returnValue === false ? returnTrue$2762 : returnFalse$2763;
        } else {
            this.type = src$3724;
        }
        if (// Put explicitly provided properties onto the event object
            props$3725) {
            jQuery$2724.extend(this, props$3725);
        }
        // Create a timestamp if incoming event doesn't have one
        this.timeStamp = src$3724 && src$3724.timeStamp || jQuery$2724.now();
        // Mark it as fixed
        this[jQuery$2724.expando] = true;
    };
    // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
    // http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
    jQuery$2724.Event.prototype = {
        isDefaultPrevented: returnFalse$2763,
        isPropagationStopped: returnFalse$2763,
        isImmediatePropagationStopped: returnFalse$2763,
        preventDefault: function () {
            var e$3726 = this.originalEvent;
            this.isDefaultPrevented = returnTrue$2762;
            if (e$3726 && e$3726.preventDefault) {
                e$3726.preventDefault();
            }
        },
        stopPropagation: function () {
            var e$3727 = this.originalEvent;
            this.isPropagationStopped = returnTrue$2762;
            if (e$3727 && e$3727.stopPropagation) {
                e$3727.stopPropagation();
            }
        },
        stopImmediatePropagation: function () {
            var e$3728 = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue$2762;
            if (e$3728 && e$3728.stopImmediatePropagation) {
                e$3728.stopImmediatePropagation();
            }
            this.stopPropagation();
        }
    };
    // Create mouseenter/leave events using mouseover/out and event-time checks
    // Support: Chrome 15+
    jQuery$2724.each({
        mouseenter: 'mouseover',
        mouseleave: 'mouseout',
        pointerenter: 'pointerover',
        pointerleave: 'pointerout'
    }, function (orig$3729, fix$3730) {
        jQuery$2724.event.special[orig$3729] = {
            delegateType: fix$3730,
            bindType: fix$3730,
            handle: function (event$3731) {
                var ret$3732, target$3733 = this, related$3734 = event$3731.relatedTarget, handleObj$3735 = event$3731.handleObj;
                if (// For mousenter/leave call the handler if related is outside the target.
                    // NB: No relatedTarget if the mouse left/entered the browser window
                    !related$3734 || related$3734 !== target$3733 && !jQuery$2724.contains(target$3733, related$3734)) {
                    event$3731.type = handleObj$3735.origType;
                    ret$3732 = handleObj$3735.handler.apply(this, arguments);
                    event$3731.type = fix$3730;
                }
                return ret$3732;
            }
        };
    });
    if (// Support: Firefox, Chrome, Safari
        // Create "bubbling" focus and blur events
        !support$2721.focusinBubbles) {
        jQuery$2724.each({
            focus: 'focusin',
            blur: 'focusout'
        }, function (orig$3736, fix$3737) {
            var // Attach a single capturing handler on the document while someone wants focusin/focusout
            handler$3738 = function (event$3739) {
                jQuery$2724.event.simulate(fix$3737, event$3739.target, jQuery$2724.event.fix(event$3739), true);
            };
            jQuery$2724.event.special[fix$3737] = {
                setup: function () {
                    var doc$3740 = this.ownerDocument || this, attaches$3741 = data_priv$2748.access(doc$3740, fix$3737);
                    if (!attaches$3741) {
                        doc$3740.addEventListener(orig$3736, handler$3738, true);
                    }
                    data_priv$2748.access(doc$3740, fix$3737, (attaches$3741 || 0) + 1);
                },
                teardown: function () {
                    var doc$3742 = this.ownerDocument || this, attaches$3743 = data_priv$2748.access(doc$3742, fix$3737) - 1;
                    if (!attaches$3743) {
                        doc$3742.removeEventListener(orig$3736, handler$3738, true);
                        data_priv$2748.remove(doc$3742, fix$3737);
                    } else {
                        data_priv$2748.access(doc$3742, fix$3737, attaches$3743);
                    }
                }
            };
        });
    }
    jQuery$2724.fn.extend({
        on: function (types$3744, selector$3745, data$3746, fn$3747, one$3748) {
            var origFn$3749, type$3750;
            if (// Types can be a map of types/handlers
                typeof types$3744 === 'object') {
                if (// ( types-Object, selector, data )
                    typeof selector$3745 !== 'string') {
                    // ( types-Object, data )
                    data$3746 = data$3746 || selector$3745;
                    selector$3745 = undefined;
                }
                for (type$3750 in types$3744) {
                    this.on(type$3750, selector$3745, data$3746, types$3744[type$3750], one$3748);
                }
                return this;
            }
            if (data$3746 == null && fn$3747 == null) {
                // ( types, fn )
                fn$3747 = selector$3745;
                data$3746 = selector$3745 = undefined;
            } else if (fn$3747 == null) {
                if (typeof selector$3745 === 'string') {
                    // ( types, selector, fn )
                    fn$3747 = data$3746;
                    data$3746 = undefined;
                } else {
                    // ( types, data, fn )
                    fn$3747 = data$3746;
                    data$3746 = selector$3745;
                    selector$3745 = undefined;
                }
            }
            if (fn$3747 === false) {
                fn$3747 = returnFalse$2763;
            } else if (!fn$3747) {
                return this;
            }
            if (one$3748 === 1) {
                origFn$3749 = fn$3747;
                fn$3747 = function (event$3751) {
                    // Can use an empty set, since event contains the info
                    jQuery$2724().off(event$3751);
                    return origFn$3749.apply(this, arguments);
                };
                // Use same guid so caller can remove using origFn
                fn$3747.guid = origFn$3749.guid || (origFn$3749.guid = jQuery$2724.guid++);
            }
            return this.each(function () {
                jQuery$2724.event.add(this, types$3744, fn$3747, data$3746, selector$3745);
            });
        },
        one: function (types$3752, selector$3753, data$3754, fn$3755) {
            return this.on(types$3752, selector$3753, data$3754, fn$3755, 1);
        },
        off: function (types$3756, selector$3757, fn$3758) {
            var handleObj$3759, type$3760;
            if (types$3756 && types$3756.preventDefault && types$3756.handleObj) {
                // ( event )  dispatched jQuery.Event
                handleObj$3759 = types$3756.handleObj;
                jQuery$2724(types$3756.delegateTarget).off(handleObj$3759.namespace ? handleObj$3759.origType + '.' + handleObj$3759.namespace : handleObj$3759.origType, handleObj$3759.selector, handleObj$3759.handler);
                return this;
            }
            if (typeof types$3756 === 'object') {
                for (// ( types-object [, selector] )
                    type$3760 in types$3756) {
                    this.off(type$3760, selector$3757, types$3756[type$3760]);
                }
                return this;
            }
            if (selector$3757 === false || typeof selector$3757 === 'function') {
                // ( types [, fn] )
                fn$3758 = selector$3757;
                selector$3757 = undefined;
            }
            if (fn$3758 === false) {
                fn$3758 = returnFalse$2763;
            }
            return this.each(function () {
                jQuery$2724.event.remove(this, types$3756, fn$3758, selector$3757);
            });
        },
        trigger: function (type$3761, data$3762) {
            return this.each(function () {
                jQuery$2724.event.trigger(type$3761, data$3762, this);
            });
        },
        triggerHandler: function (type$3763, data$3764) {
            var elem$3765 = this[0];
            if (elem$3765) {
                return jQuery$2724.event.trigger(type$3763, data$3764, elem$3765, true);
            }
        }
    });
    var rxhtmlTag$2765 = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rtagName$2766 = /<([\w:]+)/, rhtml$2767 = /<|&#?\w+;/, rnoInnerhtml$2768 = /<(?:script|style|link)/i,
        // checked="checked" or checked
        rchecked$2769 = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptType$2770 = /^$|\/(?:java|ecma)script/i, rscriptTypeMasked$2771 = /^true\/(.*)/, rcleanScript$2772 = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, // We have to close these tags to support XHTML (#13200)
        wrapMap$2773 = {
            // Support: IE9
            option: [
                1,
                '<select multiple=\'multiple\'>',
                '</select>'
            ],
            thead: [
                1,
                '<table>',
                '</table>'
            ],
            col: [
                2,
                '<table><colgroup>',
                '</colgroup></table>'
            ],
            tr: [
                2,
                '<table><tbody>',
                '</tbody></table>'
            ],
            td: [
                3,
                '<table><tbody><tr>',
                '</tr></tbody></table>'
            ],
            _default: [
                0,
                '',
                ''
            ]
        };
    // Support: IE9
    wrapMap$2773.optgroup = wrapMap$2773.option;
    wrapMap$2773.tbody = wrapMap$2773.tfoot = wrapMap$2773.colgroup = wrapMap$2773.caption = wrapMap$2773.thead;
    wrapMap$2773.th = wrapMap$2773.td;
    function manipulationTarget$2774(elem$3766, content$3767) {
        return jQuery$2724.nodeName(elem$3766, 'table') && jQuery$2724.nodeName(content$3767.nodeType !== 11 ? content$3767 : content$3767.firstChild, 'tr') ? elem$3766.getElementsByTagName('tbody')[0] || elem$3766.appendChild(elem$3766.ownerDocument.createElement('tbody')) : elem$3766;
    }
    function disableScript$2775(elem$3768) {
        elem$3768.type = (elem$3768.getAttribute('type') !== null) + '/' + elem$3768.type;
        return elem$3768;
    }
    function restoreScript$2776(elem$3769) {
        var match$3770 = rscriptTypeMasked$2771.exec(elem$3769.type);
        if (match$3770) {
            elem$3769.type = match$3770[1];
        } else {
            elem$3769.removeAttribute('type');
        }
        return elem$3769;
    }
    function setGlobalEval$2777(elems$3771, refElements$3772) {
        var i$3773 = 0, l$3774 = elems$3771.length;
        for (; i$3773 < l$3774; i$3773++) {
            data_priv$2748.set(elems$3771[i$3773], 'globalEval', !refElements$3772 || data_priv$2748.get(refElements$3772[i$3773], 'globalEval'));
        }
    }
    function cloneCopyEvent$2778(src$3775, dest$3776) {
        var i$3777, l$3778, type$3779, pdataOld$3780, pdataCur$3781, udataOld$3782, udataCur$3783, events$3784;
        if (dest$3776.nodeType !== 1) {
            return;
        }
        if (// 1. Copy private data: events, handlers, etc.
            data_priv$2748.hasData(src$3775)) {
            pdataOld$3780 = data_priv$2748.access(src$3775);
            pdataCur$3781 = data_priv$2748.set(dest$3776, pdataOld$3780);
            events$3784 = pdataOld$3780.events;
            if (events$3784) {
                delete pdataCur$3781.handle;
                pdataCur$3781.events = {};
                for (type$3779 in events$3784) {
                    for (i$3777 = 0, l$3778 = events$3784[type$3779].length; i$3777 < l$3778; i$3777++) {
                        jQuery$2724.event.add(dest$3776, type$3779, events$3784[type$3779][i$3777]);
                    }
                }
            }
        }
        if (// 2. Copy user data
            data_user$2749.hasData(src$3775)) {
            udataOld$3782 = data_user$2749.access(src$3775);
            udataCur$3783 = jQuery$2724.extend({}, udataOld$3782);
            data_user$2749.set(dest$3776, udataCur$3783);
        }
    }
    function getAll$2779(context$3785, tag$3786) {
        var ret$3787 = context$3785.getElementsByTagName ? context$3785.getElementsByTagName(tag$3786 || '*') : context$3785.querySelectorAll ? context$3785.querySelectorAll(tag$3786 || '*') : [];
        return tag$3786 === undefined || tag$3786 && jQuery$2724.nodeName(context$3785, tag$3786) ? jQuery$2724.merge([context$3785], ret$3787) : ret$3787;
    }
    function fixInput$2780(src$3788, dest$3789) {
        var nodeName$3790 = dest$3789.nodeName.toLowerCase();
        if (// Fails to persist the checked state of a cloned checkbox or radio button.
            nodeName$3790 === 'input' && rcheckableType$2756.test(src$3788.type)) {
            dest$3789.checked = src$3788.checked;
        } else if (nodeName$3790 === 'input' || nodeName$3790 === 'textarea') {
            dest$3789.defaultValue = src$3788.defaultValue;
        }
    }
    jQuery$2724.extend({
        clone: function (elem$3791, dataAndEvents$3792, deepDataAndEvents$3793) {
            var i$3794, l$3795, srcElements$3796, destElements$3797, clone$3798 = elem$3791.cloneNode(true), inPage$3799 = jQuery$2724.contains(elem$3791.ownerDocument, elem$3791);
            if (// Fix IE cloning issues
                !support$2721.noCloneChecked && (elem$3791.nodeType === 1 || elem$3791.nodeType === 11) && !jQuery$2724.isXMLDoc(elem$3791)) {
                // We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
                destElements$3797 = getAll$2779(clone$3798);
                srcElements$3796 = getAll$2779(elem$3791);
                for (i$3794 = 0, l$3795 = srcElements$3796.length; i$3794 < l$3795; i$3794++) {
                    fixInput$2780(srcElements$3796[i$3794], destElements$3797[i$3794]);
                }
            }
            if (// Copy the events from the original to the clone
                dataAndEvents$3792) {
                if (deepDataAndEvents$3793) {
                    srcElements$3796 = srcElements$3796 || getAll$2779(elem$3791);
                    destElements$3797 = destElements$3797 || getAll$2779(clone$3798);
                    for (i$3794 = 0, l$3795 = srcElements$3796.length; i$3794 < l$3795; i$3794++) {
                        cloneCopyEvent$2778(srcElements$3796[i$3794], destElements$3797[i$3794]);
                    }
                } else {
                    cloneCopyEvent$2778(elem$3791, clone$3798);
                }
            }
            // Preserve script evaluation history
            destElements$3797 = getAll$2779(clone$3798, 'script');
            if (destElements$3797.length > 0) {
                setGlobalEval$2777(destElements$3797, !inPage$3799 && getAll$2779(elem$3791, 'script'));
            }
            // Return the cloned set
            return clone$3798;
        },
        buildFragment: function (elems$3800, context$3801, scripts$3802, selection$3803) {
            var elem$3804, tmp$3805, tag$3806, wrap$3807, contains$3808, j$3809, fragment$3810 = context$3801.createDocumentFragment(), nodes$3811 = [], i$3812 = 0, l$3813 = elems$3800.length;
            for (; i$3812 < l$3813; i$3812++) {
                elem$3804 = elems$3800[i$3812];
                if (elem$3804 || elem$3804 === 0) {
                    if (// Add nodes directly
                        jQuery$2724.type(elem$3804) === 'object') {
                        // Support: QtWebKit, PhantomJS
                        // push.apply(_, arraylike) throws on ancient WebKit
                        jQuery$2724.merge(nodes$3811, elem$3804.nodeType ? [elem$3804] : elem$3804);
                    } else if (!rhtml$2767.test(elem$3804)) {
                        nodes$3811.push(context$3801.createTextNode(elem$3804));
                    } else {
                        tmp$3805 = tmp$3805 || fragment$3810.appendChild(context$3801.createElement('div'));
                        // Deserialize a standard representation
                        tag$3806 = (rtagName$2766.exec(elem$3804) || [
                            '',
                            ''
                        ])[1].toLowerCase();
                        wrap$3807 = wrapMap$2773[tag$3806] || wrapMap$2773._default;
                        tmp$3805.innerHTML = wrap$3807[1] + elem$3804.replace(rxhtmlTag$2765, '<$1></$2>') + wrap$3807[2];
                        // Descend through wrappers to the right content
                        j$3809 = wrap$3807[0];
                        while (j$3809--) {
                            tmp$3805 = tmp$3805.lastChild;
                        }
                        // Support: QtWebKit, PhantomJS
                        // push.apply(_, arraylike) throws on ancient WebKit
                        jQuery$2724.merge(nodes$3811, tmp$3805.childNodes);
                        // Remember the top-level container
                        tmp$3805 = fragment$3810.firstChild;
                        // Ensure the created nodes are orphaned (#12392)
                        tmp$3805.textContent = '';
                    }
                }
            }
            // Remove wrapper from fragment
            fragment$3810.textContent = '';
            i$3812 = 0;
            while (elem$3804 = nodes$3811[i$3812++]) {
                if (// #4087 - If origin and destination elements are the same, and this is
                    // that element, do not do anything
                    selection$3803 && jQuery$2724.inArray(elem$3804, selection$3803) !== -1) {
                    continue;
                }
                contains$3808 = jQuery$2724.contains(elem$3804.ownerDocument, elem$3804);
                // Append to fragment
                tmp$3805 = getAll$2779(fragment$3810.appendChild(elem$3804), 'script');
                if (// Preserve script evaluation history
                    contains$3808) {
                    setGlobalEval$2777(tmp$3805);
                }
                if (// Capture executables
                    scripts$3802) {
                    j$3809 = 0;
                    while (elem$3804 = tmp$3805[j$3809++]) {
                        if (rscriptType$2770.test(elem$3804.type || '')) {
                            scripts$3802.push(elem$3804);
                        }
                    }
                }
            }
            return fragment$3810;
        },
        cleanData: function (elems$3814) {
            var data$3815, elem$3816, type$3817, key$3818, special$3819 = jQuery$2724.event.special, i$3820 = 0;
            for (; (elem$3816 = elems$3814[i$3820]) !== undefined; i$3820++) {
                if (jQuery$2724.acceptData(elem$3816)) {
                    key$3818 = elem$3816[data_priv$2748.expando];
                    if (key$3818 && (data$3815 = data_priv$2748.cache[key$3818])) {
                        if (data$3815.events) {
                            for (type$3817 in data$3815.events) {
                                if (special$3819[type$3817]) {
                                    jQuery$2724.event.remove(elem$3816, type$3817);
                                } else {
                                    jQuery$2724.removeEvent(elem$3816, type$3817, data$3815.handle);
                                }
                            }
                        }
                        if (data_priv$2748.cache[key$3818]) {
                            // Discard any remaining `private` data
                            delete data_priv$2748.cache[key$3818];
                        }
                    }
                }
                delete // Discard any remaining `user` data
                data_user$2749.cache[elem$3816[data_user$2749.expando]];
            }
        }
    });
    jQuery$2724.fn.extend({
        text: function (value$3821) {
            return access$2746(this, function (value$3822) {
                return value$3822 === undefined ? jQuery$2724.text(this) : this.empty().each(function () {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        this.textContent = value$3822;
                    }
                });
            }, null, value$3821, arguments.length);
        },
        append: function () {
            return this.domManip(arguments, function (elem$3823) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target$3824 = manipulationTarget$2774(this, elem$3823);
                    target$3824.appendChild(elem$3823);
                }
            });
        },
        prepend: function () {
            return this.domManip(arguments, function (elem$3825) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target$3826 = manipulationTarget$2774(this, elem$3825);
                    target$3826.insertBefore(elem$3825, target$3826.firstChild);
                }
            });
        },
        before: function () {
            return this.domManip(arguments, function (elem$3827) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem$3827, this);
                }
            });
        },
        after: function () {
            return this.domManip(arguments, function (elem$3828) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem$3828, this.nextSibling);
                }
            });
        },
        remove: function (selector$3829, keepData$3830) {
            var elem$3831, elems$3832 = selector$3829 ? jQuery$2724.filter(selector$3829, this) : this, i$3833 = 0;
            for (; (elem$3831 = elems$3832[i$3833]) != null; i$3833++) {
                if (!keepData$3830 && elem$3831.nodeType === 1) {
                    jQuery$2724.cleanData(getAll$2779(elem$3831));
                }
                if (elem$3831.parentNode) {
                    if (keepData$3830 && jQuery$2724.contains(elem$3831.ownerDocument, elem$3831)) {
                        setGlobalEval$2777(getAll$2779(elem$3831, 'script'));
                    }
                    elem$3831.parentNode.removeChild(elem$3831);
                }
            }
            return this;
        },
        empty: function () {
            var elem$3834, i$3835 = 0;
            for (; (elem$3834 = this[i$3835]) != null; i$3835++) {
                if (elem$3834.nodeType === 1) {
                    // Prevent memory leaks
                    jQuery$2724.cleanData(getAll$2779(elem$3834, false));
                    // Remove any remaining nodes
                    elem$3834.textContent = '';
                }
            }
            return this;
        },
        clone: function (dataAndEvents$3836, deepDataAndEvents$3837) {
            dataAndEvents$3836 = dataAndEvents$3836 == null ? false : dataAndEvents$3836;
            deepDataAndEvents$3837 = deepDataAndEvents$3837 == null ? dataAndEvents$3836 : deepDataAndEvents$3837;
            return this.map(function () {
                return jQuery$2724.clone(this, dataAndEvents$3836, deepDataAndEvents$3837);
            });
        },
        html: function (value$3838) {
            return access$2746(this, function (value$3839) {
                var elem$3840 = this[0] || {}, i$3841 = 0, l$3842 = this.length;
                if (value$3839 === undefined && elem$3840.nodeType === 1) {
                    return elem$3840.innerHTML;
                }
                if (// See if we can take a shortcut and just use innerHTML
                    typeof value$3839 === 'string' && !rnoInnerhtml$2768.test(value$3839) && !wrapMap$2773[(rtagName$2766.exec(value$3839) || [
                        '',
                        ''
                    ])[1].toLowerCase()]) {
                    value$3839 = value$3839.replace(rxhtmlTag$2765, '<$1></$2>');
                    try {
                        for (; i$3841 < l$3842; i$3841++) {
                            elem$3840 = this[i$3841] || {};
                            if (// Remove element nodes and prevent memory leaks
                                elem$3840.nodeType === 1) {
                                jQuery$2724.cleanData(getAll$2779(elem$3840, false));
                                elem$3840.innerHTML = value$3839;
                            }
                        }
                        elem$3840 = 0;
                    } catch (e$3843) {
                    }
                }
                if (elem$3840) {
                    this.empty().append(value$3839);
                }
            }, null, value$3838, arguments.length);
        },
        replaceWith: function () {
            var arg$3844 = arguments[0];
            // Make the changes, replacing each context element with the new content
            this.domManip(arguments, function (elem$3845) {
                arg$3844 = this.parentNode;
                jQuery$2724.cleanData(getAll$2779(this));
                if (arg$3844) {
                    arg$3844.replaceChild(elem$3845, this);
                }
            });
            return // Force removal if there was no new content (e.g., from empty arguments)
            arg$3844 && (arg$3844.length || arg$3844.nodeType) ? this : this.remove();
        },
        detach: function (selector$3846) {
            return this.remove(selector$3846, true);
        },
        domManip: function (args$3847, callback$3848) {
            // Flatten any nested arrays
            args$3847 = concat$2715.apply([], args$3847);
            var fragment$3849, first$3850, scripts$3851, hasScripts$3852, node$3853, doc$3854, i$3855 = 0, l$3856 = this.length, set$3857 = this, iNoClone$3858 = l$3856 - 1, value$3859 = args$3847[0], isFunction$3860 = jQuery$2724.isFunction(value$3859);
            if (// We can't cloneNode fragments that contain checked, in WebKit
                isFunction$3860 || l$3856 > 1 && typeof value$3859 === 'string' && !support$2721.checkClone && rchecked$2769.test(value$3859)) {
                return this.each(function (index$3861) {
                    var self$3862 = set$3857.eq(index$3861);
                    if (isFunction$3860) {
                        args$3847[0] = value$3859.call(this, index$3861, self$3862.html());
                    }
                    self$3862.domManip(args$3847, callback$3848);
                });
            }
            if (l$3856) {
                fragment$3849 = jQuery$2724.buildFragment(args$3847, this[0].ownerDocument, false, this);
                first$3850 = fragment$3849.firstChild;
                if (fragment$3849.childNodes.length === 1) {
                    fragment$3849 = first$3850;
                }
                if (first$3850) {
                    scripts$3851 = jQuery$2724.map(getAll$2779(fragment$3849, 'script'), disableScript$2775);
                    hasScripts$3852 = scripts$3851.length;
                    for (; // Use the original fragment for the last item instead of the first because it can end up
                        // being emptied incorrectly in certain situations (#8070).
                        i$3855 < l$3856; i$3855++) {
                        node$3853 = fragment$3849;
                        if (i$3855 !== iNoClone$3858) {
                            node$3853 = jQuery$2724.clone(node$3853, true, true);
                            if (// Keep references to cloned scripts for later restoration
                                hasScripts$3852) {
                                // Support: QtWebKit
                                // jQuery.merge because push.apply(_, arraylike) throws
                                jQuery$2724.merge(scripts$3851, getAll$2779(node$3853, 'script'));
                            }
                        }
                        callback$3848.call(this[i$3855], node$3853, i$3855);
                    }
                    if (hasScripts$3852) {
                        doc$3854 = scripts$3851[scripts$3851.length - 1].ownerDocument;
                        // Reenable scripts
                        jQuery$2724.map(scripts$3851, restoreScript$2776);
                        for (// Evaluate executable scripts on first document insertion
                            i$3855 = 0; i$3855 < hasScripts$3852; i$3855++) {
                            node$3853 = scripts$3851[i$3855];
                            if (rscriptType$2770.test(node$3853.type || '') && !data_priv$2748.access(node$3853, 'globalEval') && jQuery$2724.contains(doc$3854, node$3853)) {
                                if (node$3853.src) {
                                    if (// Optional AJAX dependency, but won't run scripts if not present
                                        jQuery$2724._evalUrl) {
                                        jQuery$2724._evalUrl(node$3853.src);
                                    }
                                } else {
                                    jQuery$2724.globalEval(node$3853.textContent.replace(rcleanScript$2772, ''));
                                }
                            }
                        }
                    }
                }
            }
            return this;
        }
    });
    jQuery$2724.each({
        appendTo: 'append',
        prependTo: 'prepend',
        insertBefore: 'before',
        insertAfter: 'after',
        replaceAll: 'replaceWith'
    }, function (name$3863, original$3864) {
        jQuery$2724.fn[name$3863] = function (selector$3865) {
            var elems$3866, ret$3867 = [], insert$3868 = jQuery$2724(selector$3865), last$3869 = insert$3868.length - 1, i$3870 = 0;
            for (; i$3870 <= last$3869; i$3870++) {
                elems$3866 = i$3870 === last$3869 ? this : this.clone(true);
                jQuery$2724(insert$3868[i$3870])[original$3864](elems$3866);
                // Support: QtWebKit
                // .get() because push.apply(_, arraylike) throws
                push$2716.apply(ret$3867, elems$3866.get());
            }
            return this.pushStack(ret$3867);
        };
    });
    var iframe$2781, elemdisplay$2782 = {};
    function actualDisplay$2783(name$3871, doc$3872) {
        var style$3873, elem$3874 = jQuery$2724(doc$3872.createElement(name$3871)).appendTo(doc$3872.body), // getDefaultComputedStyle might be reliably used only on attached element
            display$3875 = window$2711.getDefaultComputedStyle && (style$3873 = window$2711.getDefaultComputedStyle(elem$3874[0])) ? // Use of this method is a temporary fix (more like optimization) until something better comes along,
            // since it was removed from specification and supported only in FF
            style$3873.display : jQuery$2724.css(elem$3874[0], 'display');
        // We don't have any data stored on the element,
        // so use "detach" method as fast way to get rid of the element
        elem$3874.detach();
        return display$3875;
    }
    function defaultDisplay$2784(nodeName$3876) {
        var doc$3877 = document$2722, display$3878 = elemdisplay$2782[nodeName$3876];
        if (!display$3878) {
            display$3878 = actualDisplay$2783(nodeName$3876, doc$3877);
            if (// If the simple way fails, read from inside an iframe
                display$3878 === 'none' || !display$3878) {
                // Use the already-created iframe if possible
                iframe$2781 = (iframe$2781 || jQuery$2724('<iframe frameborder=\'0\' width=\'0\' height=\'0\'/>')).appendTo(doc$3877.documentElement);
                // Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
                doc$3877 = iframe$2781[0].contentDocument;
                // Support: IE
                doc$3877.write();
                doc$3877.close();
                display$3878 = actualDisplay$2783(nodeName$3876, doc$3877);
                iframe$2781.detach();
            }
            // Store the correct default display
            elemdisplay$2782[nodeName$3876] = display$3878;
        }
        return display$3878;
    }
    var rmargin$2785 = /^margin/;
    var rnumnonpx$2786 = new RegExp('^(' + pnum$2753 + ')(?!px)[a-z%]+$', 'i');
    var getStyles$2787 = function (elem$3879) {
        if (// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
            // IE throws on elements created in popups
            // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
            elem$3879.ownerDocument.defaultView.opener) {
            return elem$3879.ownerDocument.defaultView.getComputedStyle(elem$3879, null);
        }
        return window$2711.getComputedStyle(elem$3879, null);
    };
    function curCSS$2788(elem$3880, name$3881, computed$3882) {
        var width$3883, minWidth$3884, maxWidth$3885, ret$3886, style$3887 = elem$3880.style;
        computed$3882 = computed$3882 || getStyles$2787(elem$3880);
        if (// Support: IE9
            // getPropertyValue is only needed for .css('filter') (#12537)
            computed$3882) {
            ret$3886 = computed$3882.getPropertyValue(name$3881) || computed$3882[name$3881];
        }
        if (computed$3882) {
            if (ret$3886 === '' && !jQuery$2724.contains(elem$3880.ownerDocument, elem$3880)) {
                ret$3886 = jQuery$2724.style(elem$3880, name$3881);
            }
            if (// Support: iOS < 6
                // A tribute to the "awesome hack by Dean Edwards"
                // iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
                // this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
                rnumnonpx$2786.test(ret$3886) && rmargin$2785.test(name$3881)) {
                // Remember the original values
                width$3883 = style$3887.width;
                minWidth$3884 = style$3887.minWidth;
                maxWidth$3885 = style$3887.maxWidth;
                // Put in the new values to get a computed value out
                style$3887.minWidth = style$3887.maxWidth = style$3887.width = ret$3886;
                ret$3886 = computed$3882.width;
                // Revert the changed values
                style$3887.width = width$3883;
                style$3887.minWidth = minWidth$3884;
                style$3887.maxWidth = maxWidth$3885;
            }
        }
        return ret$3886 !== undefined ? // Support: IE
        // IE returns zIndex value as an integer.
        ret$3886 + '' : ret$3886;
    }
    function addGetHookIf(conditionFn$3888, hookFn$3889) {
        return {
            // Define the hook, we'll check on the first run if it's really needed.
            get: function () {
                if (conditionFn$3888()) {
                    // Hook not needed (or it's not possible to use it due
                    // to missing dependency), remove it.
                    delete this.get;
                    return;
                }
                // Hook needed; redefine it so that the support test is not executed again.
                return (this.get = hookFn$3889).apply(this, arguments);
            }
        };
    }
    (function () {
        var pixelPositionVal$3890, boxSizingReliableVal$3891, docElem$3892 = document$2722.documentElement, container$3893 = document$2722.createElement('div'), div$3894 = document$2722.createElement('div');
        if (!div$3894.style) {
            return;
        }
        // Support: IE9-11+
        // Style of cloned element affects source element cloned (#8908)
        div$3894.style.backgroundClip = 'content-box';
        div$3894.cloneNode(true).style.backgroundClip = '';
        support$2721.clearCloneStyle = div$3894.style.backgroundClip === 'content-box';
        container$3893.style.cssText = 'border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;' + 'position:absolute';
        container$3893.appendChild(div$3894);
        function computePixelPositionAndBoxSizingReliable$3895() {
            div$3894.style.cssText = // Support: Firefox<29, Android 2.3
            // Vendor-prefix box-sizing
            '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;' + 'box-sizing:border-box;display:block;margin-top:1%;top:1%;' + 'border:1px;padding:1px;width:4px;position:absolute';
            div$3894.innerHTML = '';
            docElem$3892.appendChild(container$3893);
            var divStyle$3896 = window$2711.getComputedStyle(div$3894, null);
            pixelPositionVal$3890 = divStyle$3896.top !== '1%';
            boxSizingReliableVal$3891 = divStyle$3896.width === '4px';
            docElem$3892.removeChild(container$3893);
        }
        if (// Support: node.js jsdom
            // Don't assume that getComputedStyle is a property of the global object
            window$2711.getComputedStyle) {
            jQuery$2724.extend(support$2721, {
                pixelPosition: function () {
                    // This test is executed only once but we still do memoizing
                    // since we can use the boxSizingReliable pre-computing.
                    // No need to check if the test was already performed, though.
                    computePixelPositionAndBoxSizingReliable$3895();
                    return pixelPositionVal$3890;
                },
                boxSizingReliable: function () {
                    if (boxSizingReliableVal$3891 == null) {
                        computePixelPositionAndBoxSizingReliable$3895();
                    }
                    return boxSizingReliableVal$3891;
                },
                reliableMarginRight: function () {
                    var
                        // Support: Android 2.3
                        // Check if div with explicit width and no margin-right incorrectly
                        // gets computed margin-right based on width of container. (#3333)
                        // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
                        // This support function is only executed once so no memoizing is needed.
                        ret$3897, marginDiv$3898 = div$3894.appendChild(document$2722.createElement('div'));
                    // Reset CSS: box-sizing; display; margin; border; padding
                    marginDiv$3898.style.cssText = div$3894.style.cssText = // Support: Firefox<29, Android 2.3
                    // Vendor-prefix box-sizing
                    '-webkit-box-sizing:content-box;-moz-box-sizing:content-box;' + 'box-sizing:content-box;display:block;margin:0;border:0;padding:0';
                    marginDiv$3898.style.marginRight = marginDiv$3898.style.width = '0';
                    div$3894.style.width = '1px';
                    docElem$3892.appendChild(container$3893);
                    ret$3897 = !parseFloat(window$2711.getComputedStyle(marginDiv$3898, null).marginRight);
                    docElem$3892.removeChild(container$3893);
                    div$3894.removeChild(marginDiv$3898);
                    return ret$3897;
                }
            });
        }
    }());
    // A method for quickly swapping in/out CSS properties to get correct calculations.
    jQuery$2724.swap = function (elem$3899, options$3900, callback$3901, args$3902) {
        var ret$3903, name$3904, old$3905 = {};
        for (// Remember the old values, and insert the new ones
            name$3904 in options$3900) {
            old$3905[name$3904] = elem$3899.style[name$3904];
            elem$3899.style[name$3904] = options$3900[name$3904];
        }
        ret$3903 = callback$3901.apply(elem$3899, args$3902 || []);
        for (// Revert the old values
            name$3904 in options$3900) {
            elem$3899.style[name$3904] = old$3905[name$3904];
        }
        return ret$3903;
    };
    var
        // Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
        // See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
        rdisplayswap$2789 = /^(none|table(?!-c[ea]).+)/, rnumsplit$2790 = new RegExp('^(' + pnum$2753 + ')(.*)$', 'i'), rrelNum$2791 = new RegExp('^([+-])=(' + pnum$2753 + ')', 'i'), cssShow$2792 = {
            position: 'absolute',
            visibility: 'hidden',
            display: 'block'
        }, cssNormalTransform$2793 = {
            letterSpacing: '0',
            fontWeight: '400'
        }, cssPrefixes$2794 = [
            'Webkit',
            'O',
            'Moz',
            'ms'
        ];
    function vendorPropName$2795(style$3906, name$3907) {
        if (// Shortcut for names that are not vendor prefixed
            name$3907 in style$3906) {
            return name$3907;
        }
        var // Check for vendor prefixed names
            capName$3908 = name$3907[0].toUpperCase() + name$3907.slice(1), origName$3909 = name$3907, i$3910 = cssPrefixes$2794.length;
        while (i$3910--) {
            name$3907 = cssPrefixes$2794[i$3910] + capName$3908;
            if (name$3907 in style$3906) {
                return name$3907;
            }
        }
        return origName$3909;
    }
    function setPositiveNumber$2796(elem$3911, value$3912, subtract$3913) {
        var matches$3914 = rnumsplit$2790.exec(value$3912);
        return matches$3914 ? // Guard against undefined "subtract", e.g., when used as in cssHooks
        Math.max(0, matches$3914[1] - (subtract$3913 || 0)) + (matches$3914[2] || 'px') : value$3912;
    }
    function augmentWidthOrHeight$2797(elem$3915, name$3916, extra$3917, isBorderBox$3918, styles$3919) {
        var i$3920 = extra$3917 === (isBorderBox$3918 ? 'border' : 'content') ? // If we already have the right measurement, avoid augmentation
            4 : // Otherwise initialize for horizontal or vertical properties
            name$3916 === 'width' ? 1 : 0, val$3921 = 0;
        for (; i$3920 < 4; i$3920 += 2) {
            if (// Both box models exclude margin, so add it if we want it
                extra$3917 === 'margin') {
                val$3921 += jQuery$2724.css(elem$3915, extra$3917 + cssExpand$2754[i$3920], true, styles$3919);
            }
            if (isBorderBox$3918) {
                if (// border-box includes padding, so remove it if we want content
                    extra$3917 === 'content') {
                    val$3921 -= jQuery$2724.css(elem$3915, 'padding' + cssExpand$2754[i$3920], true, styles$3919);
                }
                if (// At this point, extra isn't border nor margin, so remove border
                    extra$3917 !== 'margin') {
                    val$3921 -= jQuery$2724.css(elem$3915, 'border' + cssExpand$2754[i$3920] + 'Width', true, styles$3919);
                }
            } else {
                // At this point, extra isn't content, so add padding
                val$3921 += jQuery$2724.css(elem$3915, 'padding' + cssExpand$2754[i$3920], true, styles$3919);
                if (// At this point, extra isn't content nor padding, so add border
                    extra$3917 !== 'padding') {
                    val$3921 += jQuery$2724.css(elem$3915, 'border' + cssExpand$2754[i$3920] + 'Width', true, styles$3919);
                }
            }
        }
        return val$3921;
    }
    function getWidthOrHeight$2798(elem$3922, name$3923, extra$3924) {
        var
            // Start with offset property, which is equivalent to the border-box value
            valueIsBorderBox$3925 = true, val$3926 = name$3923 === 'width' ? elem$3922.offsetWidth : elem$3922.offsetHeight, styles$3927 = getStyles$2787(elem$3922), isBorderBox$3928 = jQuery$2724.css(elem$3922, 'boxSizing', false, styles$3927) === 'border-box';
        if (// Some non-html elements return undefined for offsetWidth, so check for null/undefined
            // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
            // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
            val$3926 <= 0 || val$3926 == null) {
            // Fall back to computed then uncomputed css if necessary
            val$3926 = curCSS$2788(elem$3922, name$3923, styles$3927);
            if (val$3926 < 0 || val$3926 == null) {
                val$3926 = elem$3922.style[name$3923];
            }
            if (// Computed unit is not pixels. Stop here and return.
                rnumnonpx$2786.test(val$3926)) {
                return val$3926;
            }
            // Check for style in case a browser which returns unreliable values
            // for getComputedStyle silently falls back to the reliable elem.style
            valueIsBorderBox$3925 = isBorderBox$3928 && (support$2721.boxSizingReliable() || val$3926 === elem$3922.style[name$3923]);
            // Normalize "", auto, and prepare for extra
            val$3926 = parseFloat(val$3926) || 0;
        }
        return // Use the active box-sizing model to add/subtract irrelevant styles
        val$3926 + augmentWidthOrHeight$2797(elem$3922, name$3923, extra$3924 || (isBorderBox$3928 ? 'border' : 'content'), valueIsBorderBox$3925, styles$3927) + 'px';
    }
    function showHide$2799(elements$3929, show$3930) {
        var display$3931, elem$3932, hidden$3933, values$3934 = [], index$3935 = 0, length$3936 = elements$3929.length;
        for (; index$3935 < length$3936; index$3935++) {
            elem$3932 = elements$3929[index$3935];
            if (!elem$3932.style) {
                continue;
            }
            values$3934[index$3935] = data_priv$2748.get(elem$3932, 'olddisplay');
            display$3931 = elem$3932.style.display;
            if (show$3930) {
                if (// Reset the inline display of this element to learn if it is
                    // being hidden by cascaded rules or not
                    !values$3934[index$3935] && display$3931 === 'none') {
                    elem$3932.style.display = '';
                }
                if (// Set elements which have been overridden with display: none
                    // in a stylesheet to whatever the default browser style is
                    // for such an element
                    elem$3932.style.display === '' && isHidden$2755(elem$3932)) {
                    values$3934[index$3935] = data_priv$2748.access(elem$3932, 'olddisplay', defaultDisplay$2784(elem$3932.nodeName));
                }
            } else {
                hidden$3933 = isHidden$2755(elem$3932);
                if (display$3931 !== 'none' || !hidden$3933) {
                    data_priv$2748.set(elem$3932, 'olddisplay', hidden$3933 ? display$3931 : jQuery$2724.css(elem$3932, 'display'));
                }
            }
        }
        for (// Set the display of most of the elements in a second loop
            // to avoid the constant reflow
            index$3935 = 0; index$3935 < length$3936; index$3935++) {
            elem$3932 = elements$3929[index$3935];
            if (!elem$3932.style) {
                continue;
            }
            if (!show$3930 || elem$3932.style.display === 'none' || elem$3932.style.display === '') {
                elem$3932.style.display = show$3930 ? values$3934[index$3935] || '' : 'none';
            }
        }
        return elements$3929;
    }
    jQuery$2724.extend({
        // Add in style property hooks for overriding the default
        // behavior of getting and setting a style property
        cssHooks: {
            opacity: {
                get: function (elem$3937, computed$3938) {
                    if (computed$3938) {
                        var // We should always get a number back from opacity
                        ret$3939 = curCSS$2788(elem$3937, 'opacity');
                        return ret$3939 === '' ? '1' : ret$3939;
                    }
                }
            }
        },
        // Don't automatically add "px" to these possibly-unitless properties
        cssNumber: {
            'columnCount': true,
            'fillOpacity': true,
            'flexGrow': true,
            'flexShrink': true,
            'fontWeight': true,
            'lineHeight': true,
            'opacity': true,
            'order': true,
            'orphans': true,
            'widows': true,
            'zIndex': true,
            'zoom': true
        },
        // Add in properties whose names you wish to fix before
        // setting or getting the value
        cssProps: { 'float': 'cssFloat' },
        // Get and set the style property on a DOM Node
        style: function (elem$3940, name$3941, value$3942, extra$3943) {
            if (// Don't set styles on text and comment nodes
                !elem$3940 || elem$3940.nodeType === 3 || elem$3940.nodeType === 8 || !elem$3940.style) {
                return;
            }
            var
                // Make sure that we're working with the right name
                ret$3944, type$3945, hooks$3946, origName$3947 = jQuery$2724.camelCase(name$3941), style$3948 = elem$3940.style;
            name$3941 = jQuery$2724.cssProps[origName$3947] || (jQuery$2724.cssProps[origName$3947] = vendorPropName$2795(style$3948, origName$3947));
            // Gets hook for the prefixed version, then unprefixed version
            hooks$3946 = jQuery$2724.cssHooks[name$3941] || jQuery$2724.cssHooks[origName$3947];
            if (// Check if we're setting a value
                value$3942 !== undefined) {
                type$3945 = typeof value$3942;
                if (// Convert "+=" or "-=" to relative numbers (#7345)
                    type$3945 === 'string' && (ret$3944 = rrelNum$2791.exec(value$3942))) {
                    value$3942 = (ret$3944[1] + 1) * ret$3944[2] + parseFloat(jQuery$2724.css(elem$3940, name$3941));
                    // Fixes bug #9237
                    type$3945 = 'number';
                }
                if (// Make sure that null and NaN values aren't set (#7116)
                    value$3942 == null || value$3942 !== value$3942) {
                    return;
                }
                if (// If a number, add 'px' to the (except for certain CSS properties)
                    type$3945 === 'number' && !jQuery$2724.cssNumber[origName$3947]) {
                    value$3942 += 'px';
                }
                if (// Support: IE9-11+
                    // background-* props affect original clone's values
                    !support$2721.clearCloneStyle && value$3942 === '' && name$3941.indexOf('background') === 0) {
                    style$3948[name$3941] = 'inherit';
                }
                if (// If a hook was provided, use that value, otherwise just set the specified value
                    !hooks$3946 || !('set' in hooks$3946) || (value$3942 = hooks$3946.set(elem$3940, value$3942, extra$3943)) !== undefined) {
                    style$3948[name$3941] = value$3942;
                }
            } else {
                if (// If a hook was provided get the non-computed value from there
                    hooks$3946 && 'get' in hooks$3946 && (ret$3944 = hooks$3946.get(elem$3940, false, extra$3943)) !== undefined) {
                    return ret$3944;
                }
                // Otherwise just get the value from the style object
                return style$3948[name$3941];
            }
        },
        css: function (elem$3949, name$3950, extra$3951, styles$3952) {
            var val$3953, num$3954, hooks$3955, origName$3956 = jQuery$2724.camelCase(name$3950);
            // Make sure that we're working with the right name
            name$3950 = jQuery$2724.cssProps[origName$3956] || (jQuery$2724.cssProps[origName$3956] = vendorPropName$2795(elem$3949.style, origName$3956));
            // Try prefixed name followed by the unprefixed name
            hooks$3955 = jQuery$2724.cssHooks[name$3950] || jQuery$2724.cssHooks[origName$3956];
            if (// If a hook was provided get the computed value from there
                hooks$3955 && 'get' in hooks$3955) {
                val$3953 = hooks$3955.get(elem$3949, true, extra$3951);
            }
            if (// Otherwise, if a way to get the computed value exists, use that
                val$3953 === undefined) {
                val$3953 = curCSS$2788(elem$3949, name$3950, styles$3952);
            }
            if (// Convert "normal" to computed value
                val$3953 === 'normal' && name$3950 in cssNormalTransform$2793) {
                val$3953 = cssNormalTransform$2793[name$3950];
            }
            if (// Make numeric if forced or a qualifier was provided and val looks numeric
                extra$3951 === '' || extra$3951) {
                num$3954 = parseFloat(val$3953);
                return extra$3951 === true || jQuery$2724.isNumeric(num$3954) ? num$3954 || 0 : val$3953;
            }
            return val$3953;
        }
    });
    jQuery$2724.each([
        'height',
        'width'
    ], function (i$3957, name$3958) {
        jQuery$2724.cssHooks[name$3958] = {
            get: function (elem$3959, computed$3960, extra$3961) {
                if (computed$3960) {
                    return // Certain elements can have dimension info if we invisibly show them
                    // but it must have a current display style that would benefit
                    rdisplayswap$2789.test(jQuery$2724.css(elem$3959, 'display')) && elem$3959.offsetWidth === 0 ? jQuery$2724.swap(elem$3959, cssShow$2792, function () {
                        return getWidthOrHeight$2798(elem$3959, name$3958, extra$3961);
                    }) : getWidthOrHeight$2798(elem$3959, name$3958, extra$3961);
                }
            },
            set: function (elem$3962, value$3963, extra$3964) {
                var styles$3965 = extra$3964 && getStyles$2787(elem$3962);
                return setPositiveNumber$2796(elem$3962, value$3963, extra$3964 ? augmentWidthOrHeight$2797(elem$3962, name$3958, extra$3964, jQuery$2724.css(elem$3962, 'boxSizing', false, styles$3965) === 'border-box', styles$3965) : 0);
            }
        };
    });
    // Support: Android 2.3
    jQuery$2724.cssHooks.marginRight = addGetHookIf(support$2721.reliableMarginRight, function (elem$3966, computed$3967) {
        if (computed$3967) {
            return jQuery$2724.swap(elem$3966, { 'display': 'inline-block' }, curCSS$2788, [
                elem$3966,
                'marginRight'
            ]);
        }
    });
    // These hooks are used by animate to expand properties
    jQuery$2724.each({
        margin: '',
        padding: '',
        border: 'Width'
    }, function (prefix$3968, suffix$3969) {
        jQuery$2724.cssHooks[prefix$3968 + suffix$3969] = {
            expand: function (value$3970) {
                var i$3971 = 0, expanded$3972 = {}, // Assumes a single number if not a string
                    parts$3973 = typeof value$3970 === 'string' ? value$3970.split(' ') : [value$3970];
                for (; i$3971 < 4; i$3971++) {
                    expanded$3972[prefix$3968 + cssExpand$2754[i$3971] + suffix$3969] = parts$3973[i$3971] || parts$3973[i$3971 - 2] || parts$3973[0];
                }
                return expanded$3972;
            }
        };
        if (!rmargin$2785.test(prefix$3968)) {
            jQuery$2724.cssHooks[prefix$3968 + suffix$3969].set = setPositiveNumber$2796;
        }
    });
    jQuery$2724.fn.extend({
        css: function (name$3974, value$3975) {
            return access$2746(this, function (elem$3976, name$3977, value$3978) {
                var styles$3979, len$3980, map$3981 = {}, i$3982 = 0;
                if (jQuery$2724.isArray(name$3977)) {
                    styles$3979 = getStyles$2787(elem$3976);
                    len$3980 = name$3977.length;
                    for (; i$3982 < len$3980; i$3982++) {
                        map$3981[name$3977[i$3982]] = jQuery$2724.css(elem$3976, name$3977[i$3982], false, styles$3979);
                    }
                    return map$3981;
                }
                return value$3978 !== undefined ? jQuery$2724.style(elem$3976, name$3977, value$3978) : jQuery$2724.css(elem$3976, name$3977);
            }, name$3974, value$3975, arguments.length > 1);
        },
        show: function () {
            return showHide$2799(this, true);
        },
        hide: function () {
            return showHide$2799(this);
        },
        toggle: function (state$3983) {
            if (typeof state$3983 === 'boolean') {
                return state$3983 ? this.show() : this.hide();
            }
            return this.each(function () {
                if (isHidden$2755(this)) {
                    jQuery$2724(this).show();
                } else {
                    jQuery$2724(this).hide();
                }
            });
        }
    });
    function Tween$2800(elem$3984, options$3985, prop$3986, end$3987, easing$3988) {
        return new Tween$2800.prototype.init(elem$3984, options$3985, prop$3986, end$3987, easing$3988);
    }
    jQuery$2724.Tween = Tween$2800;
    Tween$2800.prototype = {
        constructor: Tween$2800,
        init: function (elem$3989, options$3990, prop$3991, end$3992, easing$3993, unit$3994) {
            this.elem = elem$3989;
            this.prop = prop$3991;
            this.easing = easing$3993 || 'swing';
            this.options = options$3990;
            this.start = this.now = this.cur();
            this.end = end$3992;
            this.unit = unit$3994 || (jQuery$2724.cssNumber[prop$3991] ? '' : 'px');
        },
        cur: function () {
            var hooks$3995 = Tween$2800.propHooks[this.prop];
            return hooks$3995 && hooks$3995.get ? hooks$3995.get(this) : Tween$2800.propHooks._default.get(this);
        },
        run: function (percent$3996) {
            var eased$3997, hooks$3998 = Tween$2800.propHooks[this.prop];
            if (this.options.duration) {
                this.pos = eased$3997 = jQuery$2724.easing[this.easing](percent$3996, this.options.duration * percent$3996, 0, 1, this.options.duration);
            } else {
                this.pos = eased$3997 = percent$3996;
            }
            this.now = (this.end - this.start) * eased$3997 + this.start;
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this);
            }
            if (hooks$3998 && hooks$3998.set) {
                hooks$3998.set(this);
            } else {
                Tween$2800.propHooks._default.set(this);
            }
            return this;
        }
    };
    Tween$2800.prototype.init.prototype = Tween$2800.prototype;
    Tween$2800.propHooks = {
        _default: {
            get: function (tween$3999) {
                var result$4000;
                if (tween$3999.elem[tween$3999.prop] != null && (!tween$3999.elem.style || tween$3999.elem.style[tween$3999.prop] == null)) {
                    return tween$3999.elem[tween$3999.prop];
                }
                // Passing an empty string as a 3rd parameter to .css will automatically
                // attempt a parseFloat and fallback to a string if the parse fails.
                // Simple values such as "10px" are parsed to Float;
                // complex values such as "rotate(1rad)" are returned as-is.
                result$4000 = jQuery$2724.css(tween$3999.elem, tween$3999.prop, '');
                return // Empty strings, null, undefined and "auto" are converted to 0.
                !result$4000 || result$4000 === 'auto' ? 0 : result$4000;
            },
            set: function (tween$4001) {
                if (// Use step hook for back compat.
                    // Use cssHook if its there.
                    // Use .style if available and use plain properties where available.
                    jQuery$2724.fx.step[tween$4001.prop]) {
                    jQuery$2724.fx.step[tween$4001.prop](tween$4001);
                } else if (tween$4001.elem.style && (tween$4001.elem.style[jQuery$2724.cssProps[tween$4001.prop]] != null || jQuery$2724.cssHooks[tween$4001.prop])) {
                    jQuery$2724.style(tween$4001.elem, tween$4001.prop, tween$4001.now + tween$4001.unit);
                } else {
                    tween$4001.elem[tween$4001.prop] = tween$4001.now;
                }
            }
        }
    };
    // Support: IE9
    // Panic based approach to setting things on disconnected nodes
    Tween$2800.propHooks.scrollTop = Tween$2800.propHooks.scrollLeft = {
        set: function (tween$4002) {
            if (tween$4002.elem.nodeType && tween$4002.elem.parentNode) {
                tween$4002.elem[tween$4002.prop] = tween$4002.now;
            }
        }
    };
    jQuery$2724.easing = {
        linear: function (p$4003) {
            return p$4003;
        },
        swing: function (p$4004) {
            return 0.5 - Math.cos(p$4004 * Math.PI) / 2;
        }
    };
    jQuery$2724.fx = Tween$2800.prototype.init;
    // Back Compat <1.8 extension point
    jQuery$2724.fx.step = {};
    var fxNow$2801, timerId$2802, rfxtypes$2803 = /^(?:toggle|show|hide)$/, rfxnum$2804 = new RegExp('^(?:([+-])=|)(' + pnum$2753 + ')([a-z%]*)$', 'i'), rrun$2805 = /queueHooks$/, animationPrefilters$2806 = [defaultPrefilter$2811], tweeners$2807 = {
            '*': [function (prop$4005, value$4006) {
                    var tween$4007 = this.createTween(prop$4005, value$4006), target$4008 = tween$4007.cur(), parts$4009 = rfxnum$2804.exec(value$4006), unit$4010 = parts$4009 && parts$4009[3] || (jQuery$2724.cssNumber[prop$4005] ? '' : 'px'), // Starting value computation is required for potential unit mismatches
                        start$4011 = (jQuery$2724.cssNumber[prop$4005] || unit$4010 !== 'px' && +target$4008) && rfxnum$2804.exec(jQuery$2724.css(tween$4007.elem, prop$4005)), scale$4012 = 1, maxIterations$4013 = 20;
                    if (start$4011 && start$4011[3] !== unit$4010) {
                        // Trust units reported by jQuery.css
                        unit$4010 = unit$4010 || start$4011[3];
                        // Make sure we update the tween properties later on
                        parts$4009 = parts$4009 || [];
                        // Iteratively approximate from a nonzero starting point
                        start$4011 = +target$4008 || 1;
                        do {
                            // If previous iteration zeroed out, double until we get *something*.
                            // Use string for doubling so we don't accidentally see scale as unchanged below
                            scale$4012 = scale$4012 || '.5';
                            // Adjust and apply
                            start$4011 = start$4011 / scale$4012;
                            jQuery$2724.style(tween$4007.elem, prop$4005, start$4011 + unit$4010);
                        } while (scale$4012 !== (scale$4012 = tween$4007.cur() / target$4008) && scale$4012 !== 1 && --maxIterations$4013);
                    }
                    if (// Update tween properties
                        parts$4009) {
                        start$4011 = tween$4007.start = +start$4011 || +target$4008 || 0;
                        tween$4007.unit = unit$4010;
                        // If a +=/-= token was provided, we're doing a relative animation
                        tween$4007.end = parts$4009[1] ? start$4011 + (parts$4009[1] + 1) * parts$4009[2] : +parts$4009[2];
                    }
                    return tween$4007;
                }]
        };
    function createFxNow$2808() {
        setTimeout(function () {
            fxNow$2801 = undefined;
        });
        return fxNow$2801 = jQuery$2724.now();
    }
    function genFx$2809(type$4014, includeWidth$4015) {
        var which$4016, i$4017 = 0, attrs$4018 = { height: type$4014 };
        // If we include width, step value is 1 to do all cssExpand values,
        // otherwise step value is 2 to skip over Left and Right
        includeWidth$4015 = includeWidth$4015 ? 1 : 0;
        for (; i$4017 < 4; i$4017 += 2 - includeWidth$4015) {
            which$4016 = cssExpand$2754[i$4017];
            attrs$4018['margin' + which$4016] = attrs$4018['padding' + which$4016] = type$4014;
        }
        if (includeWidth$4015) {
            attrs$4018.opacity = attrs$4018.width = type$4014;
        }
        return attrs$4018;
    }
    function createTween$2810(value$4019, prop$4020, animation$4021) {
        var tween$4022, collection$4023 = (tweeners$2807[prop$4020] || []).concat(tweeners$2807['*']), index$4024 = 0, length$4025 = collection$4023.length;
        for (; index$4024 < length$4025; index$4024++) {
            if (tween$4022 = collection$4023[index$4024].call(animation$4021, prop$4020, value$4019)) {
                // We're done with this property
                return tween$4022;
            }
        }
    }
    function defaultPrefilter$2811(elem$4026, props$4027, opts$4028) {
        var
            /* jshint validthis: true */
            prop$4029, value$4030, toggle$4031, tween$4032, hooks$4033, oldfire$4034, display$4035, checkDisplay$4036, anim$4037 = this, orig$4038 = {}, style$4039 = elem$4026.style, hidden$4040 = elem$4026.nodeType && isHidden$2755(elem$4026), dataShow$4041 = data_priv$2748.get(elem$4026, 'fxshow');
        if (// Handle queue: false promises
            !opts$4028.queue) {
            hooks$4033 = jQuery$2724._queueHooks(elem$4026, 'fx');
            if (hooks$4033.unqueued == null) {
                hooks$4033.unqueued = 0;
                oldfire$4034 = hooks$4033.empty.fire;
                hooks$4033.empty.fire = function () {
                    if (!hooks$4033.unqueued) {
                        oldfire$4034();
                    }
                };
            }
            hooks$4033.unqueued++;
            anim$4037.always(function () {
                // Ensure the complete handler is called before this completes
                anim$4037.always(function () {
                    hooks$4033.unqueued--;
                    if (!jQuery$2724.queue(elem$4026, 'fx').length) {
                        hooks$4033.empty.fire();
                    }
                });
            });
        }
        if (// Height/width overflow pass
            elem$4026.nodeType === 1 && ('height' in props$4027 || 'width' in props$4027)) {
            // Make sure that nothing sneaks out
            // Record all 3 overflow attributes because IE9-10 do not
            // change the overflow attribute when overflowX and
            // overflowY are set to the same value
            opts$4028.overflow = [
                style$4039.overflow,
                style$4039.overflowX,
                style$4039.overflowY
            ];
            // Set display property to inline-block for height/width
            // animations on inline elements that are having width/height animated
            display$4035 = jQuery$2724.css(elem$4026, 'display');
            // Test default display if display is currently "none"
            checkDisplay$4036 = display$4035 === 'none' ? data_priv$2748.get(elem$4026, 'olddisplay') || defaultDisplay$2784(elem$4026.nodeName) : display$4035;
            if (checkDisplay$4036 === 'inline' && jQuery$2724.css(elem$4026, 'float') === 'none') {
                style$4039.display = 'inline-block';
            }
        }
        if (opts$4028.overflow) {
            style$4039.overflow = 'hidden';
            anim$4037.always(function () {
                style$4039.overflow = opts$4028.overflow[0];
                style$4039.overflowX = opts$4028.overflow[1];
                style$4039.overflowY = opts$4028.overflow[2];
            });
        }
        for (// show/hide pass
            prop$4029 in props$4027) {
            value$4030 = props$4027[prop$4029];
            if (rfxtypes$2803.exec(value$4030)) {
                delete props$4027[prop$4029];
                toggle$4031 = toggle$4031 || value$4030 === 'toggle';
                if (value$4030 === (hidden$4040 ? 'hide' : 'show')) {
                    if (// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
                        value$4030 === 'show' && dataShow$4041 && dataShow$4041[prop$4029] !== undefined) {
                        hidden$4040 = true;
                    } else {
                        continue;
                    }
                }
                orig$4038[prop$4029] = dataShow$4041 && dataShow$4041[prop$4029] || jQuery$2724.style(elem$4026, prop$4029);
            } else {
                display$4035 = undefined;
            }
        }
        if (!jQuery$2724.isEmptyObject(orig$4038)) {
            if (dataShow$4041) {
                if ('hidden' in dataShow$4041) {
                    hidden$4040 = dataShow$4041.hidden;
                }
            } else {
                dataShow$4041 = data_priv$2748.access(elem$4026, 'fxshow', {});
            }
            if (// Store state if its toggle - enables .stop().toggle() to "reverse"
                toggle$4031) {
                dataShow$4041.hidden = !hidden$4040;
            }
            if (hidden$4040) {
                jQuery$2724(elem$4026).show();
            } else {
                anim$4037.done(function () {
                    jQuery$2724(elem$4026).hide();
                });
            }
            anim$4037.done(function () {
                var prop$4042;
                data_priv$2748.remove(elem$4026, 'fxshow');
                for (prop$4042 in orig$4038) {
                    jQuery$2724.style(elem$4026, prop$4042, orig$4038[prop$4042]);
                }
            });
            for (prop$4029 in orig$4038) {
                tween$4032 = createTween$2810(hidden$4040 ? dataShow$4041[prop$4029] : 0, prop$4029, anim$4037);
                if (!(prop$4029 in dataShow$4041)) {
                    dataShow$4041[prop$4029] = tween$4032.start;
                    if (hidden$4040) {
                        tween$4032.end = tween$4032.start;
                        tween$4032.start = prop$4029 === 'width' || prop$4029 === 'height' ? 1 : 0;
                    }
                }
            }
        } else if ((display$4035 === 'none' ? defaultDisplay$2784(elem$4026.nodeName) : display$4035) === 'inline') {
            style$4039.display = display$4035;
        }
    }
    function propFilter$2812(props$4043, specialEasing$4044) {
        var index$4045, name$4046, easing$4047, value$4048, hooks$4049;
        for (// camelCase, specialEasing and expand cssHook pass
            index$4045 in props$4043) {
            name$4046 = jQuery$2724.camelCase(index$4045);
            easing$4047 = specialEasing$4044[name$4046];
            value$4048 = props$4043[index$4045];
            if (jQuery$2724.isArray(value$4048)) {
                easing$4047 = value$4048[1];
                value$4048 = props$4043[index$4045] = value$4048[0];
            }
            if (index$4045 !== name$4046) {
                props$4043[name$4046] = value$4048;
                delete props$4043[index$4045];
            }
            hooks$4049 = jQuery$2724.cssHooks[name$4046];
            if (hooks$4049 && 'expand' in hooks$4049) {
                value$4048 = hooks$4049.expand(value$4048);
                delete props$4043[name$4046];
                for (// Not quite $.extend, this won't overwrite existing keys.
                    // Reusing 'index' because we have the correct "name"
                    index$4045 in value$4048) {
                    if (!(index$4045 in props$4043)) {
                        props$4043[index$4045] = value$4048[index$4045];
                        specialEasing$4044[index$4045] = easing$4047;
                    }
                }
            } else {
                specialEasing$4044[name$4046] = easing$4047;
            }
        }
    }
    function Animation$2813(elem$4050, properties$4051, options$4052) {
        var result$4053, stopped$4054, index$4055 = 0, length$4056 = animationPrefilters$2806.length, deferred$4057 = jQuery$2724.Deferred().always(function () {
                // Don't match elem in the :animated selector
                delete tick$4058.elem;
            }), tick$4058 = function () {
                if (stopped$4054) {
                    return false;
                }
                var currentTime$4061 = fxNow$2801 || createFxNow$2808(), remaining$4062 = Math.max(0, animation$4059.startTime + animation$4059.duration - currentTime$4061), // Support: Android 2.3
                    // Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
                    temp$4063 = remaining$4062 / animation$4059.duration || 0, percent$4064 = 1 - temp$4063, index$4065 = 0, length$4066 = animation$4059.tweens.length;
                for (; index$4065 < length$4066; index$4065++) {
                    animation$4059.tweens[index$4065].run(percent$4064);
                }
                deferred$4057.notifyWith(elem$4050, [
                    animation$4059,
                    percent$4064,
                    remaining$4062
                ]);
                if (percent$4064 < 1 && length$4066) {
                    return remaining$4062;
                } else {
                    deferred$4057.resolveWith(elem$4050, [animation$4059]);
                    return false;
                }
            }, animation$4059 = deferred$4057.promise({
                elem: elem$4050,
                props: jQuery$2724.extend({}, properties$4051),
                opts: jQuery$2724.extend(true, { specialEasing: {} }, options$4052),
                originalProperties: properties$4051,
                originalOptions: options$4052,
                startTime: fxNow$2801 || createFxNow$2808(),
                duration: options$4052.duration,
                tweens: [],
                createTween: function (prop$4067, end$4068) {
                    var tween$4069 = jQuery$2724.Tween(elem$4050, animation$4059.opts, prop$4067, end$4068, animation$4059.opts.specialEasing[prop$4067] || animation$4059.opts.easing);
                    animation$4059.tweens.push(tween$4069);
                    return tween$4069;
                },
                stop: function (gotoEnd$4070) {
                    var index$4071 = 0, // If we are going to the end, we want to run all the tweens
                        // otherwise we skip this part
                        length$4072 = gotoEnd$4070 ? animation$4059.tweens.length : 0;
                    if (stopped$4054) {
                        return this;
                    }
                    stopped$4054 = true;
                    for (; index$4071 < length$4072; index$4071++) {
                        animation$4059.tweens[index$4071].run(1);
                    }
                    if (// Resolve when we played the last frame; otherwise, reject
                        gotoEnd$4070) {
                        deferred$4057.resolveWith(elem$4050, [
                            animation$4059,
                            gotoEnd$4070
                        ]);
                    } else {
                        deferred$4057.rejectWith(elem$4050, [
                            animation$4059,
                            gotoEnd$4070
                        ]);
                    }
                    return this;
                }
            }), props$4060 = animation$4059.props;
        propFilter$2812(props$4060, animation$4059.opts.specialEasing);
        for (; index$4055 < length$4056; index$4055++) {
            result$4053 = animationPrefilters$2806[index$4055].call(animation$4059, elem$4050, props$4060, animation$4059.opts);
            if (result$4053) {
                return result$4053;
            }
        }
        jQuery$2724.map(props$4060, createTween$2810, animation$4059);
        if (jQuery$2724.isFunction(animation$4059.opts.start)) {
            animation$4059.opts.start.call(elem$4050, animation$4059);
        }
        jQuery$2724.fx.timer(jQuery$2724.extend(tick$4058, {
            elem: elem$4050,
            anim: animation$4059,
            queue: animation$4059.opts.queue
        }));
        return // attach callbacks from options
        animation$4059.progress(animation$4059.opts.progress).done(animation$4059.opts.done, animation$4059.opts.complete).fail(animation$4059.opts.fail).always(animation$4059.opts.always);
    }
    jQuery$2724.Animation = jQuery$2724.extend(Animation$2813, {
        tweener: function (props$4073, callback$4074) {
            if (jQuery$2724.isFunction(props$4073)) {
                callback$4074 = props$4073;
                props$4073 = ['*'];
            } else {
                props$4073 = props$4073.split(' ');
            }
            var prop$4075, index$4076 = 0, length$4077 = props$4073.length;
            for (; index$4076 < length$4077; index$4076++) {
                prop$4075 = props$4073[index$4076];
                tweeners$2807[prop$4075] = tweeners$2807[prop$4075] || [];
                tweeners$2807[prop$4075].unshift(callback$4074);
            }
        },
        prefilter: function (callback$4078, prepend$4079) {
            if (prepend$4079) {
                animationPrefilters$2806.unshift(callback$4078);
            } else {
                animationPrefilters$2806.push(callback$4078);
            }
        }
    });
    jQuery$2724.speed = function (speed$4080, easing$4081, fn$4082) {
        var opt$4083 = speed$4080 && typeof speed$4080 === 'object' ? jQuery$2724.extend({}, speed$4080) : {
            complete: fn$4082 || !fn$4082 && easing$4081 || jQuery$2724.isFunction(speed$4080) && speed$4080,
            duration: speed$4080,
            easing: fn$4082 && easing$4081 || easing$4081 && !jQuery$2724.isFunction(easing$4081) && easing$4081
        };
        opt$4083.duration = jQuery$2724.fx.off ? 0 : typeof opt$4083.duration === 'number' ? opt$4083.duration : opt$4083.duration in jQuery$2724.fx.speeds ? jQuery$2724.fx.speeds[opt$4083.duration] : jQuery$2724.fx.speeds._default;
        if (// Normalize opt.queue - true/undefined/null -> "fx"
            opt$4083.queue == null || opt$4083.queue === true) {
            opt$4083.queue = 'fx';
        }
        // Queueing
        opt$4083.old = opt$4083.complete;
        opt$4083.complete = function () {
            if (jQuery$2724.isFunction(opt$4083.old)) {
                opt$4083.old.call(this);
            }
            if (opt$4083.queue) {
                jQuery$2724.dequeue(this, opt$4083.queue);
            }
        };
        return opt$4083;
    };
    jQuery$2724.fn.extend({
        fadeTo: function (speed$4084, to$4085, easing$4086, callback$4087) {
            return // Show any hidden elements after setting opacity to 0
            this.filter(isHidden$2755).css('opacity', 0).show().end().animate({ opacity: to$4085 }, speed$4084, easing$4086, callback$4087);
        },
        animate: function (prop$4088, speed$4089, easing$4090, callback$4091) {
            var empty$4092 = jQuery$2724.isEmptyObject(prop$4088), optall$4093 = jQuery$2724.speed(speed$4089, easing$4090, callback$4091), doAnimation$4094 = function () {
                    var // Operate on a copy of prop so per-property easing won't be lost
                    anim$4095 = Animation$2813(this, jQuery$2724.extend({}, prop$4088), optall$4093);
                    if (// Empty animations, or finishing resolves immediately
                        empty$4092 || data_priv$2748.get(this, 'finish')) {
                        anim$4095.stop(true);
                    }
                };
            doAnimation$4094.finish = doAnimation$4094;
            return empty$4092 || optall$4093.queue === false ? this.each(doAnimation$4094) : this.queue(optall$4093.queue, doAnimation$4094);
        },
        stop: function (type$4096, clearQueue$4097, gotoEnd$4098) {
            var stopQueue$4099 = function (hooks$4100) {
                var stop$4101 = hooks$4100.stop;
                delete hooks$4100.stop;
                stop$4101(gotoEnd$4098);
            };
            if (typeof type$4096 !== 'string') {
                gotoEnd$4098 = clearQueue$4097;
                clearQueue$4097 = type$4096;
                type$4096 = undefined;
            }
            if (clearQueue$4097 && type$4096 !== false) {
                this.queue(type$4096 || 'fx', []);
            }
            return this.each(function () {
                var dequeue$4102 = true, index$4103 = type$4096 != null && type$4096 + 'queueHooks', timers$4104 = jQuery$2724.timers, data$4105 = data_priv$2748.get(this);
                if (index$4103) {
                    if (data$4105[index$4103] && data$4105[index$4103].stop) {
                        stopQueue$4099(data$4105[index$4103]);
                    }
                } else {
                    for (index$4103 in data$4105) {
                        if (data$4105[index$4103] && data$4105[index$4103].stop && rrun$2805.test(index$4103)) {
                            stopQueue$4099(data$4105[index$4103]);
                        }
                    }
                }
                for (index$4103 = timers$4104.length; index$4103--;) {
                    if (timers$4104[index$4103].elem === this && (type$4096 == null || timers$4104[index$4103].queue === type$4096)) {
                        timers$4104[index$4103].anim.stop(gotoEnd$4098);
                        dequeue$4102 = false;
                        timers$4104.splice(index$4103, 1);
                    }
                }
                if (// Start the next in the queue if the last step wasn't forced.
                    // Timers currently will call their complete callbacks, which
                    // will dequeue but only if they were gotoEnd.
                    dequeue$4102 || !gotoEnd$4098) {
                    jQuery$2724.dequeue(this, type$4096);
                }
            });
        },
        finish: function (type$4106) {
            if (type$4106 !== false) {
                type$4106 = type$4106 || 'fx';
            }
            return this.each(function () {
                var index$4107, data$4108 = data_priv$2748.get(this), queue$4109 = data$4108[type$4106 + 'queue'], hooks$4110 = data$4108[type$4106 + 'queueHooks'], timers$4111 = jQuery$2724.timers, length$4112 = queue$4109 ? queue$4109.length : 0;
                // Enable finishing flag on private data
                data$4108.finish = true;
                // Empty the queue first
                jQuery$2724.queue(this, type$4106, []);
                if (hooks$4110 && hooks$4110.stop) {
                    hooks$4110.stop.call(this, true);
                }
                for (// Look for any active animations, and finish them
                    index$4107 = timers$4111.length; index$4107--;) {
                    if (timers$4111[index$4107].elem === this && timers$4111[index$4107].queue === type$4106) {
                        timers$4111[index$4107].anim.stop(true);
                        timers$4111.splice(index$4107, 1);
                    }
                }
                for (// Look for any animations in the old queue and finish them
                    index$4107 = 0; index$4107 < length$4112; index$4107++) {
                    if (queue$4109[index$4107] && queue$4109[index$4107].finish) {
                        queue$4109[index$4107].finish.call(this);
                    }
                }
                // Turn off finishing flag
                delete data$4108.finish;
            });
        }
    });
    jQuery$2724.each([
        'toggle',
        'show',
        'hide'
    ], function (i$4113, name$4114) {
        var cssFn$4115 = jQuery$2724.fn[name$4114];
        jQuery$2724.fn[name$4114] = function (speed$4116, easing$4117, callback$4118) {
            return speed$4116 == null || typeof speed$4116 === 'boolean' ? cssFn$4115.apply(this, arguments) : this.animate(genFx$2809(name$4114, true), speed$4116, easing$4117, callback$4118);
        };
    });
    // Generate shortcuts for custom animations
    jQuery$2724.each({
        slideDown: genFx$2809('show'),
        slideUp: genFx$2809('hide'),
        slideToggle: genFx$2809('toggle'),
        fadeIn: { opacity: 'show' },
        fadeOut: { opacity: 'hide' },
        fadeToggle: { opacity: 'toggle' }
    }, function (name$4119, props$4120) {
        jQuery$2724.fn[name$4119] = function (speed$4121, easing$4122, callback$4123) {
            return this.animate(props$4120, speed$4121, easing$4122, callback$4123);
        };
    });
    jQuery$2724.timers = [];
    jQuery$2724.fx.tick = function () {
        var timer$4124, i$4125 = 0, timers$4126 = jQuery$2724.timers;
        fxNow$2801 = jQuery$2724.now();
        for (; i$4125 < timers$4126.length; i$4125++) {
            timer$4124 = timers$4126[i$4125];
            if (// Checks the timer has not already been removed
                !timer$4124() && timers$4126[i$4125] === timer$4124) {
                timers$4126.splice(i$4125--, 1);
            }
        }
        if (!timers$4126.length) {
            jQuery$2724.fx.stop();
        }
        fxNow$2801 = undefined;
    };
    jQuery$2724.fx.timer = function (timer$4127) {
        jQuery$2724.timers.push(timer$4127);
        if (timer$4127()) {
            jQuery$2724.fx.start();
        } else {
            jQuery$2724.timers.pop();
        }
    };
    jQuery$2724.fx.interval = 13;
    jQuery$2724.fx.start = function () {
        if (!timerId$2802) {
            timerId$2802 = setInterval(jQuery$2724.fx.tick, jQuery$2724.fx.interval);
        }
    };
    jQuery$2724.fx.stop = function () {
        clearInterval(timerId$2802);
        timerId$2802 = null;
    };
    jQuery$2724.fx.speeds = {
        slow: 600,
        fast: 200,
        // Default speed
        _default: 400
    };
    // Based off of the plugin by Clint Helfers, with permission.
    // http://blindsignals.com/index.php/2009/07/jquery-delay/
    jQuery$2724.fn.delay = function (time$4128, type$4129) {
        time$4128 = jQuery$2724.fx ? jQuery$2724.fx.speeds[time$4128] || time$4128 : time$4128;
        type$4129 = type$4129 || 'fx';
        return this.queue(type$4129, function (next$4130, hooks$4131) {
            var timeout$4132 = setTimeout(next$4130, time$4128);
            hooks$4131.stop = function () {
                clearTimeout(timeout$4132);
            };
        });
    };
    (function () {
        var input$4133 = document$2722.createElement('input'), select$4134 = document$2722.createElement('select'), opt$4135 = select$4134.appendChild(document$2722.createElement('option'));
        input$4133.type = 'checkbox';
        // Support: iOS<=5.1, Android<=4.2+
        // Default value for a checkbox should be "on"
        support$2721.checkOn = input$4133.value !== '';
        // Support: IE<=11+
        // Must access selectedIndex to make default options select
        support$2721.optSelected = opt$4135.selected;
        // Support: Android<=2.3
        // Options inside disabled selects are incorrectly marked as disabled
        select$4134.disabled = true;
        support$2721.optDisabled = !opt$4135.disabled;
        // Support: IE<=11+
        // An input loses its value after becoming a radio
        input$4133 = document$2722.createElement('input');
        input$4133.value = 't';
        input$4133.type = 'radio';
        support$2721.radioValue = input$4133.value === 't';
    }());
    var nodeHook$2814, boolHook$2815, attrHandle$2816 = jQuery$2724.expr.attrHandle;
    jQuery$2724.fn.extend({
        attr: function (name$4136, value$4137) {
            return access$2746(this, jQuery$2724.attr, name$4136, value$4137, arguments.length > 1);
        },
        removeAttr: function (name$4138) {
            return this.each(function () {
                jQuery$2724.removeAttr(this, name$4138);
            });
        }
    });
    jQuery$2724.extend({
        attr: function (elem$4139, name$4140, value$4141) {
            var hooks$4142, ret$4143, nType$4144 = elem$4139.nodeType;
            if (// don't get/set attributes on text, comment and attribute nodes
                !elem$4139 || nType$4144 === 3 || nType$4144 === 8 || nType$4144 === 2) {
                return;
            }
            if (// Fallback to prop when attributes are not supported
                typeof elem$4139.getAttribute === strundefined$2757) {
                return jQuery$2724.prop(elem$4139, name$4140, value$4141);
            }
            if (// All attributes are lowercase
                // Grab necessary hook if one is defined
                nType$4144 !== 1 || !jQuery$2724.isXMLDoc(elem$4139)) {
                name$4140 = name$4140.toLowerCase();
                hooks$4142 = jQuery$2724.attrHooks[name$4140] || (jQuery$2724.expr.match.bool.test(name$4140) ? boolHook$2815 : nodeHook$2814);
            }
            if (value$4141 !== undefined) {
                if (value$4141 === null) {
                    jQuery$2724.removeAttr(elem$4139, name$4140);
                } else if (hooks$4142 && 'set' in hooks$4142 && (ret$4143 = hooks$4142.set(elem$4139, value$4141, name$4140)) !== undefined) {
                    return ret$4143;
                } else {
                    elem$4139.setAttribute(name$4140, value$4141 + '');
                    return value$4141;
                }
            } else if (hooks$4142 && 'get' in hooks$4142 && (ret$4143 = hooks$4142.get(elem$4139, name$4140)) !== null) {
                return ret$4143;
            } else {
                ret$4143 = jQuery$2724.find.attr(elem$4139, name$4140);
                // Non-existent attributes return null, we normalize to undefined
                return ret$4143 == null ? undefined : ret$4143;
            }
        },
        removeAttr: function (elem$4145, value$4146) {
            var name$4147, propName$4148, i$4149 = 0, attrNames$4150 = value$4146 && value$4146.match(rnotwhite$2741);
            if (attrNames$4150 && elem$4145.nodeType === 1) {
                while (name$4147 = attrNames$4150[i$4149++]) {
                    propName$4148 = jQuery$2724.propFix[name$4147] || name$4147;
                    if (// Boolean attributes get special treatment (#10870)
                        jQuery$2724.expr.match.bool.test(name$4147)) {
                        // Set corresponding property to false
                        elem$4145[propName$4148] = false;
                    }
                    elem$4145.removeAttribute(name$4147);
                }
            }
        },
        attrHooks: {
            type: {
                set: function (elem$4151, value$4152) {
                    if (!support$2721.radioValue && value$4152 === 'radio' && jQuery$2724.nodeName(elem$4151, 'input')) {
                        var val$4153 = elem$4151.value;
                        elem$4151.setAttribute('type', value$4152);
                        if (val$4153) {
                            elem$4151.value = val$4153;
                        }
                        return value$4152;
                    }
                }
            }
        }
    });
    // Hooks for boolean attributes
    boolHook$2815 = {
        set: function (elem$4154, value$4155, name$4156) {
            if (value$4155 === false) {
                // Remove boolean attributes when set to false
                jQuery$2724.removeAttr(elem$4154, name$4156);
            } else {
                elem$4154.setAttribute(name$4156, name$4156);
            }
            return name$4156;
        }
    };
    jQuery$2724.each(jQuery$2724.expr.match.bool.source.match(/\w+/g), function (i$4157, name$4158) {
        var getter$4159 = attrHandle$2816[name$4158] || jQuery$2724.find.attr;
        attrHandle$2816[name$4158] = function (elem$4160, name$4161, isXML$4162) {
            var ret$4163, handle$4164;
            if (!isXML$4162) {
                // Avoid an infinite loop by temporarily removing this function from the getter
                handle$4164 = attrHandle$2816[name$4161];
                attrHandle$2816[name$4161] = ret$4163;
                ret$4163 = getter$4159(elem$4160, name$4161, isXML$4162) != null ? name$4161.toLowerCase() : null;
                attrHandle$2816[name$4161] = handle$4164;
            }
            return ret$4163;
        };
    });
    var rfocusable$2817 = /^(?:input|select|textarea|button)$/i;
    jQuery$2724.fn.extend({
        prop: function (name$4165, value$4166) {
            return access$2746(this, jQuery$2724.prop, name$4165, value$4166, arguments.length > 1);
        },
        removeProp: function (name$4167) {
            return this.each(function () {
                delete this[jQuery$2724.propFix[name$4167] || name$4167];
            });
        }
    });
    jQuery$2724.extend({
        propFix: {
            'for': 'htmlFor',
            'class': 'className'
        },
        prop: function (elem$4168, name$4169, value$4170) {
            var ret$4171, hooks$4172, notxml$4173, nType$4174 = elem$4168.nodeType;
            if (// Don't get/set properties on text, comment and attribute nodes
                !elem$4168 || nType$4174 === 3 || nType$4174 === 8 || nType$4174 === 2) {
                return;
            }
            notxml$4173 = nType$4174 !== 1 || !jQuery$2724.isXMLDoc(elem$4168);
            if (notxml$4173) {
                // Fix name and attach hooks
                name$4169 = jQuery$2724.propFix[name$4169] || name$4169;
                hooks$4172 = jQuery$2724.propHooks[name$4169];
            }
            if (value$4170 !== undefined) {
                return hooks$4172 && 'set' in hooks$4172 && (ret$4171 = hooks$4172.set(elem$4168, value$4170, name$4169)) !== undefined ? ret$4171 : elem$4168[name$4169] = value$4170;
            } else {
                return hooks$4172 && 'get' in hooks$4172 && (ret$4171 = hooks$4172.get(elem$4168, name$4169)) !== null ? ret$4171 : elem$4168[name$4169];
            }
        },
        propHooks: {
            tabIndex: {
                get: function (elem$4175) {
                    return elem$4175.hasAttribute('tabindex') || rfocusable$2817.test(elem$4175.nodeName) || elem$4175.href ? elem$4175.tabIndex : -1;
                }
            }
        }
    });
    if (!support$2721.optSelected) {
        jQuery$2724.propHooks.selected = {
            get: function (elem$4176) {
                var parent$4177 = elem$4176.parentNode;
                if (parent$4177 && parent$4177.parentNode) {
                    parent$4177.parentNode.selectedIndex;
                }
                return null;
            }
        };
    }
    jQuery$2724.each([
        'tabIndex',
        'readOnly',
        'maxLength',
        'cellSpacing',
        'cellPadding',
        'rowSpan',
        'colSpan',
        'useMap',
        'frameBorder',
        'contentEditable'
    ], function () {
        jQuery$2724.propFix[this.toLowerCase()] = this;
    });
    var rclass$2818 = /[\t\r\n\f]/g;
    jQuery$2724.fn.extend({
        addClass: function (value$4178) {
            var classes$4179, elem$4180, cur$4181, clazz$4182, j$4183, finalValue$4184, proceed$4185 = typeof value$4178 === 'string' && value$4178, i$4186 = 0, len$4187 = this.length;
            if (jQuery$2724.isFunction(value$4178)) {
                return this.each(function (j$4188) {
                    jQuery$2724(this).addClass(value$4178.call(this, j$4188, this.className));
                });
            }
            if (proceed$4185) {
                // The disjunction here is for better compressibility (see removeClass)
                classes$4179 = (value$4178 || '').match(rnotwhite$2741) || [];
                for (; i$4186 < len$4187; i$4186++) {
                    elem$4180 = this[i$4186];
                    cur$4181 = elem$4180.nodeType === 1 && (elem$4180.className ? (' ' + elem$4180.className + ' ').replace(rclass$2818, ' ') : ' ');
                    if (cur$4181) {
                        j$4183 = 0;
                        while (clazz$4182 = classes$4179[j$4183++]) {
                            if (cur$4181.indexOf(' ' + clazz$4182 + ' ') < 0) {
                                cur$4181 += clazz$4182 + ' ';
                            }
                        }
                        // only assign if different to avoid unneeded rendering.
                        finalValue$4184 = jQuery$2724.trim(cur$4181);
                        if (elem$4180.className !== finalValue$4184) {
                            elem$4180.className = finalValue$4184;
                        }
                    }
                }
            }
            return this;
        },
        removeClass: function (value$4189) {
            var classes$4190, elem$4191, cur$4192, clazz$4193, j$4194, finalValue$4195, proceed$4196 = arguments.length === 0 || typeof value$4189 === 'string' && value$4189, i$4197 = 0, len$4198 = this.length;
            if (jQuery$2724.isFunction(value$4189)) {
                return this.each(function (j$4199) {
                    jQuery$2724(this).removeClass(value$4189.call(this, j$4199, this.className));
                });
            }
            if (proceed$4196) {
                classes$4190 = (value$4189 || '').match(rnotwhite$2741) || [];
                for (; i$4197 < len$4198; i$4197++) {
                    elem$4191 = this[i$4197];
                    // This expression is here for better compressibility (see addClass)
                    cur$4192 = elem$4191.nodeType === 1 && (elem$4191.className ? (' ' + elem$4191.className + ' ').replace(rclass$2818, ' ') : '');
                    if (cur$4192) {
                        j$4194 = 0;
                        while (clazz$4193 = classes$4190[j$4194++]) {
                            while (// Remove *all* instances
                                cur$4192.indexOf(' ' + clazz$4193 + ' ') >= 0) {
                                cur$4192 = cur$4192.replace(' ' + clazz$4193 + ' ', ' ');
                            }
                        }
                        // Only assign if different to avoid unneeded rendering.
                        finalValue$4195 = value$4189 ? jQuery$2724.trim(cur$4192) : '';
                        if (elem$4191.className !== finalValue$4195) {
                            elem$4191.className = finalValue$4195;
                        }
                    }
                }
            }
            return this;
        },
        toggleClass: function (value$4200, stateVal$4201) {
            var type$4202 = typeof value$4200;
            if (typeof stateVal$4201 === 'boolean' && type$4202 === 'string') {
                return stateVal$4201 ? this.addClass(value$4200) : this.removeClass(value$4200);
            }
            if (jQuery$2724.isFunction(value$4200)) {
                return this.each(function (i$4203) {
                    jQuery$2724(this).toggleClass(value$4200.call(this, i$4203, this.className, stateVal$4201), stateVal$4201);
                });
            }
            return this.each(function () {
                if (type$4202 === 'string') {
                    var
                        // Toggle individual class names
                        className$4204, i$4205 = 0, self$4206 = jQuery$2724(this), classNames$4207 = value$4200.match(rnotwhite$2741) || [];
                    while (className$4204 = classNames$4207[i$4205++]) {
                        if (// Check each className given, space separated list
                            self$4206.hasClass(className$4204)) {
                            self$4206.removeClass(className$4204);
                        } else {
                            self$4206.addClass(className$4204);
                        }
                    }
                } else if (type$4202 === strundefined$2757 || type$4202 === 'boolean') {
                    if (this.className) {
                        // store className if set
                        data_priv$2748.set(this, '__className__', this.className);
                    }
                    // If the element has a class name or if we're passed `false`,
                    // then remove the whole classname (if there was one, the above saved it).
                    // Otherwise bring back whatever was previously saved (if anything),
                    // falling back to the empty string if nothing was stored.
                    this.className = this.className || value$4200 === false ? '' : data_priv$2748.get(this, '__className__') || '';
                }
            });
        },
        hasClass: function (selector$4208) {
            var className$4209 = ' ' + selector$4208 + ' ', i$4210 = 0, l$4211 = this.length;
            for (; i$4210 < l$4211; i$4210++) {
                if (this[i$4210].nodeType === 1 && (' ' + this[i$4210].className + ' ').replace(rclass$2818, ' ').indexOf(className$4209) >= 0) {
                    return true;
                }
            }
            return false;
        }
    });
    var rreturn$2819 = /\r/g;
    jQuery$2724.fn.extend({
        val: function (value$4212) {
            var hooks$4213, ret$4214, isFunction$4215, elem$4216 = this[0];
            if (!arguments.length) {
                if (elem$4216) {
                    hooks$4213 = jQuery$2724.valHooks[elem$4216.type] || jQuery$2724.valHooks[elem$4216.nodeName.toLowerCase()];
                    if (hooks$4213 && 'get' in hooks$4213 && (ret$4214 = hooks$4213.get(elem$4216, 'value')) !== undefined) {
                        return ret$4214;
                    }
                    ret$4214 = elem$4216.value;
                    return typeof ret$4214 === 'string' ? // Handle most common string cases
                    ret$4214.replace(rreturn$2819, '') : // Handle cases where value is null/undef or number
                    ret$4214 == null ? '' : ret$4214;
                }
                return;
            }
            isFunction$4215 = jQuery$2724.isFunction(value$4212);
            return this.each(function (i$4217) {
                var val$4218;
                if (this.nodeType !== 1) {
                    return;
                }
                if (isFunction$4215) {
                    val$4218 = value$4212.call(this, i$4217, jQuery$2724(this).val());
                } else {
                    val$4218 = value$4212;
                }
                if (// Treat null/undefined as ""; convert numbers to string
                    val$4218 == null) {
                    val$4218 = '';
                } else if (typeof val$4218 === 'number') {
                    val$4218 += '';
                } else if (jQuery$2724.isArray(val$4218)) {
                    val$4218 = jQuery$2724.map(val$4218, function (value$4219) {
                        return value$4219 == null ? '' : value$4219 + '';
                    });
                }
                hooks$4213 = jQuery$2724.valHooks[this.type] || jQuery$2724.valHooks[this.nodeName.toLowerCase()];
                if (// If set returns undefined, fall back to normal setting
                    !hooks$4213 || !('set' in hooks$4213) || hooks$4213.set(this, val$4218, 'value') === undefined) {
                    this.value = val$4218;
                }
            });
        }
    });
    jQuery$2724.extend({
        valHooks: {
            option: {
                get: function (elem$4220) {
                    var val$4221 = jQuery$2724.find.attr(elem$4220, 'value');
                    return val$4221 != null ? val$4221 : // Support: IE10-11+
                    // option.text throws exceptions (#14686, #14858)
                    jQuery$2724.trim(jQuery$2724.text(elem$4220));
                }
            },
            select: {
                get: function (elem$4222) {
                    var value$4223, option$4224, options$4225 = elem$4222.options, index$4226 = elem$4222.selectedIndex, one$4227 = elem$4222.type === 'select-one' || index$4226 < 0, values$4228 = one$4227 ? null : [], max$4229 = one$4227 ? index$4226 + 1 : options$4225.length, i$4230 = index$4226 < 0 ? max$4229 : one$4227 ? index$4226 : 0;
                    for (; // Loop through all the selected options
                        i$4230 < max$4229; i$4230++) {
                        option$4224 = options$4225[i$4230];
                        if ((// IE6-9 doesn't update selected after form reset (#2551)
                            option$4224.selected || i$4230 === index$4226) && (// Don't return options that are disabled or in a disabled optgroup
                            support$2721.optDisabled ? !option$4224.disabled : option$4224.getAttribute('disabled') === null) && (!option$4224.parentNode.disabled || !jQuery$2724.nodeName(option$4224.parentNode, 'optgroup'))) {
                            // Get the specific value for the option
                            value$4223 = jQuery$2724(option$4224).val();
                            if (// We don't need an array for one selects
                                one$4227) {
                                return value$4223;
                            }
                            // Multi-Selects return an array
                            values$4228.push(value$4223);
                        }
                    }
                    return values$4228;
                },
                set: function (elem$4231, value$4232) {
                    var optionSet$4233, option$4234, options$4235 = elem$4231.options, values$4236 = jQuery$2724.makeArray(value$4232), i$4237 = options$4235.length;
                    while (i$4237--) {
                        option$4234 = options$4235[i$4237];
                        if (option$4234.selected = jQuery$2724.inArray(option$4234.value, values$4236) >= 0) {
                            optionSet$4233 = true;
                        }
                    }
                    if (// Force browsers to behave consistently when non-matching value is set
                        !optionSet$4233) {
                        elem$4231.selectedIndex = -1;
                    }
                    return values$4236;
                }
            }
        }
    });
    // Radios and checkboxes getter/setter
    jQuery$2724.each([
        'radio',
        'checkbox'
    ], function () {
        jQuery$2724.valHooks[this] = {
            set: function (elem$4238, value$4239) {
                if (jQuery$2724.isArray(value$4239)) {
                    return elem$4238.checked = jQuery$2724.inArray(jQuery$2724(elem$4238).val(), value$4239) >= 0;
                }
            }
        };
        if (!support$2721.checkOn) {
            jQuery$2724.valHooks[this].get = function (elem$4240) {
                return elem$4240.getAttribute('value') === null ? 'on' : elem$4240.value;
            };
        }
    });
    // Return jQuery for attributes-only inclusion
    jQuery$2724.each(('blur focus focusin focusout load resize scroll unload click dblclick ' + 'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave ' + 'change select submit keydown keypress keyup error contextmenu').split(' '), function (i$4241, name$4242) {
        // Handle event binding
        jQuery$2724.fn[name$4242] = function (data$4243, fn$4244) {
            return arguments.length > 0 ? this.on(name$4242, null, data$4243, fn$4244) : this.trigger(name$4242);
        };
    });
    jQuery$2724.fn.extend({
        hover: function (fnOver$4245, fnOut$4246) {
            return this.mouseenter(fnOver$4245).mouseleave(fnOut$4246 || fnOver$4245);
        },
        bind: function (types$4247, data$4248, fn$4249) {
            return this.on(types$4247, null, data$4248, fn$4249);
        },
        unbind: function (types$4250, fn$4251) {
            return this.off(types$4250, null, fn$4251);
        },
        delegate: function (selector$4252, types$4253, data$4254, fn$4255) {
            return this.on(types$4253, selector$4252, data$4254, fn$4255);
        },
        undelegate: function (selector$4256, types$4257, fn$4258) {
            return // ( namespace ) or ( selector, types [, fn] )
            arguments.length === 1 ? this.off(selector$4256, '**') : this.off(types$4257, selector$4256 || '**', fn$4258);
        }
    });
    var nonce$2820 = jQuery$2724.now();
    var rquery$2821 = /\?/;
    // Support: Android 2.3
    // Workaround failure to string-cast null input
    jQuery$2724.parseJSON = function (data$4259) {
        return JSON.parse(data$4259 + '');
    };
    // Cross-browser xml parsing
    jQuery$2724.parseXML = function (data$4260) {
        var xml$4261, tmp$4262;
        if (!data$4260 || typeof data$4260 !== 'string') {
            return null;
        }
        try {
            // Support: IE9
            tmp$4262 = new DOMParser();
            xml$4261 = tmp$4262.parseFromString(data$4260, 'text/xml');
        } catch (e$4263) {
            xml$4261 = undefined;
        }
        if (!xml$4261 || xml$4261.getElementsByTagName('parsererror').length) {
            jQuery$2724.error('Invalid XML: ' + data$4260);
        }
        return xml$4261;
    };
    var rhash$2822 = /#.*$/, rts$2823 = /([?&])_=[^&]*/, rheaders$2824 = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        // #7653, #8125, #8152: local protocol detection
        rlocalProtocol$2825 = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent$2826 = /^(?:GET|HEAD)$/, rprotocol$2827 = /^\/\//, rurl$2828 = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        /* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
        prefilters$2829 = {},
        /* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
        transports$2830 = {}, // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
        allTypes$2831 = '*/'.concat('*'), // Document location
        ajaxLocation$2832 = window$2711.location.href, // Segment location into parts
        ajaxLocParts$2833 = rurl$2828.exec(ajaxLocation$2832.toLowerCase()) || [];
    function addToPrefiltersOrTransports$2834(structure$4264) {
        return function (dataTypeExpression$4265, func$4266) {
            if (typeof dataTypeExpression$4265 !== 'string') {
                func$4266 = dataTypeExpression$4265;
                dataTypeExpression$4265 = '*';
            }
            var dataType$4267, i$4268 = 0, dataTypes$4269 = dataTypeExpression$4265.toLowerCase().match(rnotwhite$2741) || [];
            if (jQuery$2724.isFunction(func$4266)) {
                while (// For each dataType in the dataTypeExpression
                    dataType$4267 = dataTypes$4269[i$4268++]) {
                    if (// Prepend if requested
                        dataType$4267[0] === '+') {
                        dataType$4267 = dataType$4267.slice(1) || '*';
                        (structure$4264[dataType$4267] = structure$4264[dataType$4267] || []).unshift(func$4266);
                    } else {
                        (structure$4264[dataType$4267] = structure$4264[dataType$4267] || []).push(func$4266);
                    }
                }
            }
        };
    }
    function inspectPrefiltersOrTransports$2835(structure$4270, options$4271, originalOptions$4272, jqXHR$4273) {
        var inspected$4274 = {}, seekingTransport$4275 = structure$4270 === transports$2830;
        function inspect$4276(dataType$4277) {
            var selected$4278;
            inspected$4274[dataType$4277] = true;
            jQuery$2724.each(structure$4270[dataType$4277] || [], function (_$4279, prefilterOrFactory$4280) {
                var dataTypeOrTransport$4281 = prefilterOrFactory$4280(options$4271, originalOptions$4272, jqXHR$4273);
                if (typeof dataTypeOrTransport$4281 === 'string' && !seekingTransport$4275 && !inspected$4274[dataTypeOrTransport$4281]) {
                    options$4271.dataTypes.unshift(dataTypeOrTransport$4281);
                    inspect$4276(dataTypeOrTransport$4281);
                    return false;
                } else if (seekingTransport$4275) {
                    return !(selected$4278 = dataTypeOrTransport$4281);
                }
            });
            return selected$4278;
        }
        return inspect$4276(options$4271.dataTypes[0]) || !inspected$4274['*'] && inspect$4276('*');
    }
    function ajaxExtend$2836(target$4282, src$4283) {
        var key$4284, deep$4285, flatOptions$4286 = jQuery$2724.ajaxSettings.flatOptions || {};
        for (key$4284 in src$4283) {
            if (src$4283[key$4284] !== undefined) {
                (flatOptions$4286[key$4284] ? target$4282 : deep$4285 || (deep$4285 = {}))[key$4284] = src$4283[key$4284];
            }
        }
        if (deep$4285) {
            jQuery$2724.extend(true, target$4282, deep$4285);
        }
        return target$4282;
    }
    function ajaxHandleResponses$2837(s$4287, jqXHR$4288, responses$4289) {
        var ct$4290, type$4291, finalDataType$4292, firstDataType$4293, contents$4294 = s$4287.contents, dataTypes$4295 = s$4287.dataTypes;
        while (// Remove auto dataType and get content-type in the process
            dataTypes$4295[0] === '*') {
            dataTypes$4295.shift();
            if (ct$4290 === undefined) {
                ct$4290 = s$4287.mimeType || jqXHR$4288.getResponseHeader('Content-Type');
            }
        }
        if (// Check if we're dealing with a known content-type
            ct$4290) {
            for (type$4291 in contents$4294) {
                if (contents$4294[type$4291] && contents$4294[type$4291].test(ct$4290)) {
                    dataTypes$4295.unshift(type$4291);
                    break;
                }
            }
        }
        if (// Check to see if we have a response for the expected dataType
            dataTypes$4295[0] in responses$4289) {
            finalDataType$4292 = dataTypes$4295[0];
        } else {
            for (// Try convertible dataTypes
                type$4291 in responses$4289) {
                if (!dataTypes$4295[0] || s$4287.converters[type$4291 + ' ' + dataTypes$4295[0]]) {
                    finalDataType$4292 = type$4291;
                    break;
                }
                if (!firstDataType$4293) {
                    firstDataType$4293 = type$4291;
                }
            }
            // Or just use first one
            finalDataType$4292 = finalDataType$4292 || firstDataType$4293;
        }
        if (// If we found a dataType
            // We add the dataType to the list if needed
            // and return the corresponding response
            finalDataType$4292) {
            if (finalDataType$4292 !== dataTypes$4295[0]) {
                dataTypes$4295.unshift(finalDataType$4292);
            }
            return responses$4289[finalDataType$4292];
        }
    }
    function ajaxConvert$2838(s$4296, response$4297, jqXHR$4298, isSuccess$4299) {
        var conv2$4300, current$4301, conv$4302, tmp$4303, prev$4304, converters$4305 = {}, // Work with a copy of dataTypes in case we need to modify it for conversion
            dataTypes$4306 = s$4296.dataTypes.slice();
        if (// Create converters map with lowercased keys
            dataTypes$4306[1]) {
            for (conv$4302 in s$4296.converters) {
                converters$4305[conv$4302.toLowerCase()] = s$4296.converters[conv$4302];
            }
        }
        current$4301 = dataTypes$4306.shift();
        while (// Convert to each sequential dataType
            current$4301) {
            if (s$4296.responseFields[current$4301]) {
                jqXHR$4298[s$4296.responseFields[current$4301]] = response$4297;
            }
            if (// Apply the dataFilter if provided
                !prev$4304 && isSuccess$4299 && s$4296.dataFilter) {
                response$4297 = s$4296.dataFilter(response$4297, s$4296.dataType);
            }
            prev$4304 = current$4301;
            current$4301 = dataTypes$4306.shift();
            if (current$4301) {
                if (// There's only work to do if current dataType is non-auto
                    current$4301 === '*') {
                    current$4301 = prev$4304;
                } else if (prev$4304 !== '*' && prev$4304 !== current$4301) {
                    // Seek a direct converter
                    conv$4302 = converters$4305[prev$4304 + ' ' + current$4301] || converters$4305['* ' + current$4301];
                    if (// If none found, seek a pair
                        !conv$4302) {
                        for (conv2$4300 in converters$4305) {
                            // If conv2 outputs current
                            tmp$4303 = conv2$4300.split(' ');
                            if (tmp$4303[1] === current$4301) {
                                // If prev can be converted to accepted input
                                conv$4302 = converters$4305[prev$4304 + ' ' + tmp$4303[0]] || converters$4305['* ' + tmp$4303[0]];
                                if (conv$4302) {
                                    if (// Condense equivalence converters
                                        conv$4302 === true) {
                                        conv$4302 = converters$4305[conv2$4300];
                                    } else if (converters$4305[conv2$4300] !== true) {
                                        current$4301 = tmp$4303[0];
                                        dataTypes$4306.unshift(tmp$4303[1]);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    if (// Apply converter (if not an equivalence)
                        conv$4302 !== true) {
                        if (// Unless errors are allowed to bubble, catch and return them
                            conv$4302 && s$4296['throws']) {
                            response$4297 = conv$4302(response$4297);
                        } else {
                            try {
                                response$4297 = conv$4302(response$4297);
                            } catch (e$4307) {
                                return {
                                    state: 'parsererror',
                                    error: conv$4302 ? e$4307 : 'No conversion from ' + prev$4304 + ' to ' + current$4301
                                };
                            }
                        }
                    }
                }
            }
        }
        return {
            state: 'success',
            data: response$4297
        };
    }
    jQuery$2724.extend({
        // Counter for holding the number of active queries
        active: 0,
        // Last-Modified header cache for next request
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ajaxLocation$2832,
            type: 'GET',
            isLocal: rlocalProtocol$2825.test(ajaxLocParts$2833[1]),
            global: true,
            processData: true,
            async: true,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            /*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/
            accepts: {
                '*': allTypes$2831,
                text: 'text/plain',
                html: 'text/html',
                xml: 'application/xml, text/xml',
                json: 'application/json, text/javascript'
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: 'responseXML',
                text: 'responseText',
                json: 'responseJSON'
            },
            // Data converters
            // Keys separate source (or catchall "*") and destination types with a single space
            converters: {
                // Convert anything to text
                '* text': String,
                // Text to html (true = no transformation)
                'text html': true,
                // Evaluate text as a json expression
                'text json': jQuery$2724.parseJSON,
                // Parse text as xml
                'text xml': jQuery$2724.parseXML
            },
            // For options that shouldn't be deep extended:
            // you can add your own custom options here if
            // and when you create one that shouldn't be
            // deep extended (see ajaxExtend)
            flatOptions: {
                url: true,
                context: true
            }
        },
        // Creates a full fledged settings object into target
        // with both ajaxSettings and settings fields.
        // If target is omitted, writes into ajaxSettings.
        ajaxSetup: function (target$4308, settings$4309) {
            return settings$4309 ? // Building a settings object
            ajaxExtend$2836(ajaxExtend$2836(target$4308, jQuery$2724.ajaxSettings), settings$4309) : // Extending ajaxSettings
            ajaxExtend$2836(jQuery$2724.ajaxSettings, target$4308);
        },
        ajaxPrefilter: addToPrefiltersOrTransports$2834(prefilters$2829),
        ajaxTransport: addToPrefiltersOrTransports$2834(transports$2830),
        // Main method
        ajax: function (url$4310, options$4311) {
            if (// If url is an object, simulate pre-1.5 signature
                typeof url$4310 === 'object') {
                options$4311 = url$4310;
                url$4310 = undefined;
            }
            // Force options to be an object
            options$4311 = options$4311 || {};
            var transport$4312,
                // URL without anti-cache param
                cacheURL$4313,
                // Response headers
                responseHeadersString$4314, responseHeaders$4315,
                // timeout handle
                timeoutTimer$4316,
                // Cross-domain detection vars
                parts$4317,
                // To know if global events are to be dispatched
                fireGlobals$4318,
                // Loop variable
                i$4319, // Create the final options object
                s$4320 = jQuery$2724.ajaxSetup({}, options$4311), // Callbacks context
                callbackContext$4321 = s$4320.context || s$4320, // Context for global events is callbackContext if it is a DOM node or jQuery collection
                globalEventContext$4322 = s$4320.context && (callbackContext$4321.nodeType || callbackContext$4321.jquery) ? jQuery$2724(callbackContext$4321) : jQuery$2724.event, // Deferreds
                deferred$4323 = jQuery$2724.Deferred(), completeDeferred$4324 = jQuery$2724.Callbacks('once memory'), // Status-dependent callbacks
                statusCode$4325 = s$4320.statusCode || {},
                // Headers (they are sent all at once)
                requestHeaders$4326 = {}, requestHeadersNames$4327 = {},
                // The jqXHR state
                state$4328 = 0,
                // Default abort message
                strAbort$4329 = 'canceled', // Fake xhr
                jqXHR$4330 = {
                    readyState: 0,
                    // Builds headers hashtable if needed
                    getResponseHeader: function (key$4332) {
                        var match$4333;
                        if (state$4328 === 2) {
                            if (!responseHeaders$4315) {
                                responseHeaders$4315 = {};
                                while (match$4333 = rheaders$2824.exec(responseHeadersString$4314)) {
                                    responseHeaders$4315[match$4333[1].toLowerCase()] = match$4333[2];
                                }
                            }
                            match$4333 = responseHeaders$4315[key$4332.toLowerCase()];
                        }
                        return match$4333 == null ? null : match$4333;
                    },
                    // Raw string
                    getAllResponseHeaders: function () {
                        return state$4328 === 2 ? responseHeadersString$4314 : null;
                    },
                    // Caches the header
                    setRequestHeader: function (name$4334, value$4335) {
                        var lname$4336 = name$4334.toLowerCase();
                        if (!state$4328) {
                            name$4334 = requestHeadersNames$4327[lname$4336] = requestHeadersNames$4327[lname$4336] || name$4334;
                            requestHeaders$4326[name$4334] = value$4335;
                        }
                        return this;
                    },
                    // Overrides response content-type header
                    overrideMimeType: function (type$4337) {
                        if (!state$4328) {
                            s$4320.mimeType = type$4337;
                        }
                        return this;
                    },
                    // Status-dependent callbacks
                    statusCode: function (map$4338) {
                        var code$4339;
                        if (map$4338) {
                            if (state$4328 < 2) {
                                for (code$4339 in map$4338) {
                                    // Lazy-add the new callback in a way that preserves old ones
                                    statusCode$4325[code$4339] = [
                                        statusCode$4325[code$4339],
                                        map$4338[code$4339]
                                    ];
                                }
                            } else {
                                // Execute the appropriate callbacks
                                jqXHR$4330.always(map$4338[jqXHR$4330.status]);
                            }
                        }
                        return this;
                    },
                    // Cancel the request
                    abort: function (statusText$4340) {
                        var finalText$4341 = statusText$4340 || strAbort$4329;
                        if (transport$4312) {
                            transport$4312.abort(finalText$4341);
                        }
                        done$4331(0, finalText$4341);
                        return this;
                    }
                };
            // Attach deferreds
            deferred$4323.promise(jqXHR$4330).complete = completeDeferred$4324.add;
            jqXHR$4330.success = jqXHR$4330.done;
            jqXHR$4330.error = jqXHR$4330.fail;
            // Remove hash character (#7531: and string promotion)
            // Add protocol if not provided (prefilters might expect it)
            // Handle falsy url in the settings object (#10093: consistency with old signature)
            // We also use the url parameter if available
            s$4320.url = ((url$4310 || s$4320.url || ajaxLocation$2832) + '').replace(rhash$2822, '').replace(rprotocol$2827, ajaxLocParts$2833[1] + '//');
            // Alias method option to type as per ticket #12004
            s$4320.type = options$4311.method || options$4311.type || s$4320.method || s$4320.type;
            // Extract dataTypes list
            s$4320.dataTypes = jQuery$2724.trim(s$4320.dataType || '*').toLowerCase().match(rnotwhite$2741) || [''];
            if (// A cross-domain request is in order when we have a protocol:host:port mismatch
                s$4320.crossDomain == null) {
                parts$4317 = rurl$2828.exec(s$4320.url.toLowerCase());
                s$4320.crossDomain = !!(parts$4317 && (parts$4317[1] !== ajaxLocParts$2833[1] || parts$4317[2] !== ajaxLocParts$2833[2] || (parts$4317[3] || (parts$4317[1] === 'http:' ? '80' : '443')) !== (ajaxLocParts$2833[3] || (ajaxLocParts$2833[1] === 'http:' ? '80' : '443'))));
            }
            if (// Convert data if not already a string
                s$4320.data && s$4320.processData && typeof s$4320.data !== 'string') {
                s$4320.data = jQuery$2724.param(s$4320.data, s$4320.traditional);
            }
            // Apply prefilters
            inspectPrefiltersOrTransports$2835(prefilters$2829, s$4320, options$4311, jqXHR$4330);
            if (// If request was aborted inside a prefilter, stop there
                state$4328 === 2) {
                return jqXHR$4330;
            }
            // We can fire global events as of now if asked to
            // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
            fireGlobals$4318 = jQuery$2724.event && s$4320.global;
            if (// Watch for a new set of requests
                fireGlobals$4318 && jQuery$2724.active++ === 0) {
                jQuery$2724.event.trigger('ajaxStart');
            }
            // Uppercase the type
            s$4320.type = s$4320.type.toUpperCase();
            // Determine if request has content
            s$4320.hasContent = !rnoContent$2826.test(s$4320.type);
            // Save the URL in case we're toying with the If-Modified-Since
            // and/or If-None-Match header later on
            cacheURL$4313 = s$4320.url;
            if (// More options handling for requests with no content
                !s$4320.hasContent) {
                if (// If data is available, append data to url
                    s$4320.data) {
                    cacheURL$4313 = s$4320.url += (rquery$2821.test(cacheURL$4313) ? '&' : '?') + s$4320.data;
                    // #9682: remove data so that it's not used in an eventual retry
                    delete s$4320.data;
                }
                if (// Add anti-cache in url if needed
                    s$4320.cache === false) {
                    s$4320.url = rts$2823.test(cacheURL$4313) ? // If there is already a '_' parameter, set its value
                    cacheURL$4313.replace(rts$2823, '$1_=' + nonce$2820++) : // Otherwise add one to the end
                    cacheURL$4313 + (rquery$2821.test(cacheURL$4313) ? '&' : '?') + '_=' + nonce$2820++;
                }
            }
            if (// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                s$4320.ifModified) {
                if (jQuery$2724.lastModified[cacheURL$4313]) {
                    jqXHR$4330.setRequestHeader('If-Modified-Since', jQuery$2724.lastModified[cacheURL$4313]);
                }
                if (jQuery$2724.etag[cacheURL$4313]) {
                    jqXHR$4330.setRequestHeader('If-None-Match', jQuery$2724.etag[cacheURL$4313]);
                }
            }
            if (// Set the correct header, if data is being sent
                s$4320.data && s$4320.hasContent && s$4320.contentType !== false || options$4311.contentType) {
                jqXHR$4330.setRequestHeader('Content-Type', s$4320.contentType);
            }
            // Set the Accepts header for the server, depending on the dataType
            jqXHR$4330.setRequestHeader('Accept', s$4320.dataTypes[0] && s$4320.accepts[s$4320.dataTypes[0]] ? s$4320.accepts[s$4320.dataTypes[0]] + (s$4320.dataTypes[0] !== '*' ? ', ' + allTypes$2831 + '; q=0.01' : '') : s$4320.accepts['*']);
            for (// Check for headers option
                i$4319 in s$4320.headers) {
                jqXHR$4330.setRequestHeader(i$4319, s$4320.headers[i$4319]);
            }
            if (// Allow custom headers/mimetypes and early abort
                s$4320.beforeSend && (s$4320.beforeSend.call(callbackContext$4321, jqXHR$4330, s$4320) === false || state$4328 === 2)) {
                // Abort if not done already and return
                return jqXHR$4330.abort();
            }
            // Aborting is no longer a cancellation
            strAbort$4329 = 'abort';
            for (// Install callbacks on deferreds
                i$4319 in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) {
                jqXHR$4330[i$4319](s$4320[i$4319]);
            }
            // Get transport
            transport$4312 = inspectPrefiltersOrTransports$2835(transports$2830, s$4320, options$4311, jqXHR$4330);
            if (// If no transport, we auto-abort
                !transport$4312) {
                done$4331(-1, 'No Transport');
            } else {
                jqXHR$4330.readyState = 1;
                if (// Send global event
                    fireGlobals$4318) {
                    globalEventContext$4322.trigger('ajaxSend', [
                        jqXHR$4330,
                        s$4320
                    ]);
                }
                if (// Timeout
                    s$4320.async && s$4320.timeout > 0) {
                    timeoutTimer$4316 = setTimeout(function () {
                        jqXHR$4330.abort('timeout');
                    }, s$4320.timeout);
                }
                try {
                    state$4328 = 1;
                    transport$4312.send(requestHeaders$4326, done$4331);
                } catch (e$4342) {
                    if (// Propagate exception as error if not done
                        state$4328 < 2) {
                        done$4331(-1, e$4342);
                    } else {
                        throw e$4342;
                    }
                }
            }
            function done$4331(status$4343, nativeStatusText$4344, responses$4345, headers$4346) {
                var isSuccess$4347, success$4348, error$4349, response$4350, modified$4351, statusText$4352 = nativeStatusText$4344;
                if (// Called once
                    state$4328 === 2) {
                    return;
                }
                // State is "done" now
                state$4328 = 2;
                if (// Clear timeout if it exists
                    timeoutTimer$4316) {
                    clearTimeout(timeoutTimer$4316);
                }
                // Dereference transport for early garbage collection
                // (no matter how long the jqXHR object will be used)
                transport$4312 = undefined;
                // Cache response headers
                responseHeadersString$4314 = headers$4346 || '';
                // Set readyState
                jqXHR$4330.readyState = status$4343 > 0 ? 4 : 0;
                // Determine if successful
                isSuccess$4347 = status$4343 >= 200 && status$4343 < 300 || status$4343 === 304;
                if (// Get response data
                    responses$4345) {
                    response$4350 = ajaxHandleResponses$2837(s$4320, jqXHR$4330, responses$4345);
                }
                // Convert no matter what (that way responseXXX fields are always set)
                response$4350 = ajaxConvert$2838(s$4320, response$4350, jqXHR$4330, isSuccess$4347);
                if (// If successful, handle type chaining
                    isSuccess$4347) {
                    if (// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                        s$4320.ifModified) {
                        modified$4351 = jqXHR$4330.getResponseHeader('Last-Modified');
                        if (modified$4351) {
                            jQuery$2724.lastModified[cacheURL$4313] = modified$4351;
                        }
                        modified$4351 = jqXHR$4330.getResponseHeader('etag');
                        if (modified$4351) {
                            jQuery$2724.etag[cacheURL$4313] = modified$4351;
                        }
                    }
                    if (// if no content
                        status$4343 === 204 || s$4320.type === 'HEAD') {
                        statusText$4352 = 'nocontent';
                    } else if (status$4343 === 304) {
                        statusText$4352 = 'notmodified';
                    } else {
                        statusText$4352 = response$4350.state;
                        success$4348 = response$4350.data;
                        error$4349 = response$4350.error;
                        isSuccess$4347 = !error$4349;
                    }
                } else {
                    // Extract error from statusText and normalize for non-aborts
                    error$4349 = statusText$4352;
                    if (status$4343 || !statusText$4352) {
                        statusText$4352 = 'error';
                        if (status$4343 < 0) {
                            status$4343 = 0;
                        }
                    }
                }
                // Set data for the fake xhr object
                jqXHR$4330.status = status$4343;
                jqXHR$4330.statusText = (nativeStatusText$4344 || statusText$4352) + '';
                if (// Success/Error
                    isSuccess$4347) {
                    deferred$4323.resolveWith(callbackContext$4321, [
                        success$4348,
                        statusText$4352,
                        jqXHR$4330
                    ]);
                } else {
                    deferred$4323.rejectWith(callbackContext$4321, [
                        jqXHR$4330,
                        statusText$4352,
                        error$4349
                    ]);
                }
                // Status-dependent callbacks
                jqXHR$4330.statusCode(statusCode$4325);
                statusCode$4325 = undefined;
                if (fireGlobals$4318) {
                    globalEventContext$4322.trigger(isSuccess$4347 ? 'ajaxSuccess' : 'ajaxError', [
                        jqXHR$4330,
                        s$4320,
                        isSuccess$4347 ? success$4348 : error$4349
                    ]);
                }
                // Complete
                completeDeferred$4324.fireWith(callbackContext$4321, [
                    jqXHR$4330,
                    statusText$4352
                ]);
                if (fireGlobals$4318) {
                    globalEventContext$4322.trigger('ajaxComplete', [
                        jqXHR$4330,
                        s$4320
                    ]);
                    if (// Handle the global AJAX counter
                        !--jQuery$2724.active) {
                        jQuery$2724.event.trigger('ajaxStop');
                    }
                }
            }
            return jqXHR$4330;
        },
        getJSON: function (url$4353, data$4354, callback$4355) {
            return jQuery$2724.get(url$4353, data$4354, callback$4355, 'json');
        },
        getScript: function (url$4356, callback$4357) {
            return jQuery$2724.get(url$4356, undefined, callback$4357, 'script');
        }
    });
    jQuery$2724.each([
        'get',
        'post'
    ], function (i$4358, method$4359) {
        jQuery$2724[method$4359] = function (url$4360, data$4361, callback$4362, type$4363) {
            if (// Shift arguments if data argument was omitted
                jQuery$2724.isFunction(data$4361)) {
                type$4363 = type$4363 || callback$4362;
                callback$4362 = data$4361;
                data$4361 = undefined;
            }
            return jQuery$2724.ajax({
                url: url$4360,
                type: method$4359,
                dataType: type$4363,
                data: data$4361,
                success: callback$4362
            });
        };
    });
    jQuery$2724._evalUrl = function (url$4364) {
        return jQuery$2724.ajax({
            url: url$4364,
            type: 'GET',
            dataType: 'script',
            async: false,
            global: false,
            'throws': true
        });
    };
    jQuery$2724.fn.extend({
        wrapAll: function (html$4365) {
            var wrap$4366;
            if (jQuery$2724.isFunction(html$4365)) {
                return this.each(function (i$4367) {
                    jQuery$2724(this).wrapAll(html$4365.call(this, i$4367));
                });
            }
            if (this[0]) {
                // The elements to wrap the target around
                wrap$4366 = jQuery$2724(html$4365, this[0].ownerDocument).eq(0).clone(true);
                if (this[0].parentNode) {
                    wrap$4366.insertBefore(this[0]);
                }
                wrap$4366.map(function () {
                    var elem$4368 = this;
                    while (elem$4368.firstElementChild) {
                        elem$4368 = elem$4368.firstElementChild;
                    }
                    return elem$4368;
                }).append(this);
            }
            return this;
        },
        wrapInner: function (html$4369) {
            if (jQuery$2724.isFunction(html$4369)) {
                return this.each(function (i$4370) {
                    jQuery$2724(this).wrapInner(html$4369.call(this, i$4370));
                });
            }
            return this.each(function () {
                var self$4371 = jQuery$2724(this), contents$4372 = self$4371.contents();
                if (contents$4372.length) {
                    contents$4372.wrapAll(html$4369);
                } else {
                    self$4371.append(html$4369);
                }
            });
        },
        wrap: function (html$4373) {
            var isFunction$4374 = jQuery$2724.isFunction(html$4373);
            return this.each(function (i$4375) {
                jQuery$2724(this).wrapAll(isFunction$4374 ? html$4373.call(this, i$4375) : html$4373);
            });
        },
        unwrap: function () {
            return this.parent().each(function () {
                if (!jQuery$2724.nodeName(this, 'body')) {
                    jQuery$2724(this).replaceWith(this.childNodes);
                }
            }).end();
        }
    });
    jQuery$2724.expr.filters.hidden = function (elem$4376) {
        return // Support: Opera <= 12.12
        // Opera reports offsetWidths and offsetHeights less than zero on some elements
        elem$4376.offsetWidth <= 0 && elem$4376.offsetHeight <= 0;
    };
    jQuery$2724.expr.filters.visible = function (elem$4377) {
        return !jQuery$2724.expr.filters.hidden(elem$4377);
    };
    var r20$2839 = /%20/g, rbracket$2840 = /\[\]$/, rCRLF$2841 = /\r?\n/g, rsubmitterTypes$2842 = /^(?:submit|button|image|reset|file)$/i, rsubmittable$2843 = /^(?:input|select|textarea|keygen)/i;
    function buildParams$2844(prefix$4378, obj$4379, traditional$4380, add$4381) {
        var name$4382;
        if (jQuery$2724.isArray(obj$4379)) {
            // Serialize array item.
            jQuery$2724.each(obj$4379, function (i$4383, v$4384) {
                if (traditional$4380 || rbracket$2840.test(prefix$4378)) {
                    // Treat each array item as a scalar.
                    add$4381(prefix$4378, v$4384);
                } else {
                    // Item is non-scalar (array or object), encode its numeric index.
                    buildParams$2844(prefix$4378 + '[' + (typeof v$4384 === 'object' ? i$4383 : '') + ']', v$4384, traditional$4380, add$4381);
                }
            });
        } else if (!traditional$4380 && jQuery$2724.type(obj$4379) === 'object') {
            for (// Serialize object item.
                name$4382 in obj$4379) {
                buildParams$2844(prefix$4378 + '[' + name$4382 + ']', obj$4379[name$4382], traditional$4380, add$4381);
            }
        } else {
            // Serialize scalar item.
            add$4381(prefix$4378, obj$4379);
        }
    }
    // Serialize an array of form elements or a set of
    // key/values into a query string
    jQuery$2724.param = function (a$4385, traditional$4386) {
        var prefix$4387, s$4388 = [], add$4389 = function (key$4390, value$4391) {
                // If value is a function, invoke it and return its value
                value$4391 = jQuery$2724.isFunction(value$4391) ? value$4391() : value$4391 == null ? '' : value$4391;
                s$4388[s$4388.length] = encodeURIComponent(key$4390) + '=' + encodeURIComponent(value$4391);
            };
        if (// Set traditional to true for jQuery <= 1.3.2 behavior.
            traditional$4386 === undefined) {
            traditional$4386 = jQuery$2724.ajaxSettings && jQuery$2724.ajaxSettings.traditional;
        }
        if (// If an array was passed in, assume that it is an array of form elements.
            jQuery$2724.isArray(a$4385) || a$4385.jquery && !jQuery$2724.isPlainObject(a$4385)) {
            // Serialize the form elements
            jQuery$2724.each(a$4385, function () {
                add$4389(this.name, this.value);
            });
        } else {
            for (// If traditional, encode the "old" way (the way 1.3.2 or older
                // did it), otherwise encode params recursively.
                prefix$4387 in a$4385) {
                buildParams$2844(prefix$4387, a$4385[prefix$4387], traditional$4386, add$4389);
            }
        }
        // Return the resulting serialization
        return s$4388.join('&').replace(r20$2839, '+');
    };
    jQuery$2724.fn.extend({
        serialize: function () {
            return jQuery$2724.param(this.serializeArray());
        },
        serializeArray: function () {
            return this.map(function () {
                var // Can add propHook for "elements" to filter or add form elements
                elements$4392 = jQuery$2724.prop(this, 'elements');
                return elements$4392 ? jQuery$2724.makeArray(elements$4392) : this;
            }).filter(function () {
                var type$4393 = this.type;
                return // Use .is( ":disabled" ) so that fieldset[disabled] works
                this.name && !jQuery$2724(this).is(':disabled') && rsubmittable$2843.test(this.nodeName) && !rsubmitterTypes$2842.test(type$4393) && (this.checked || !rcheckableType$2756.test(type$4393));
            }).map(function (i$4394, elem$4395) {
                var val$4396 = jQuery$2724(this).val();
                return val$4396 == null ? null : jQuery$2724.isArray(val$4396) ? jQuery$2724.map(val$4396, function (val$4397) {
                    return {
                        name: elem$4395.name,
                        value: val$4397.replace(rCRLF$2841, '\r\n')
                    };
                }) : {
                    name: elem$4395.name,
                    value: val$4396.replace(rCRLF$2841, '\r\n')
                };
            }).get();
        }
    });
    jQuery$2724.ajaxSettings.xhr = function () {
        try {
            return new XMLHttpRequest();
        } catch (e$4398) {
        }
    };
    var xhrId$2845 = 0, xhrCallbacks$2846 = {}, xhrSuccessStatus$2847 = {
            // file protocol always yields status code 0, assume 200
            0: 200,
            // Support: IE9
            // #1450: sometimes IE returns 1223 when it should be 204
            1223: 204
        }, xhrSupported$2848 = jQuery$2724.ajaxSettings.xhr();
    if (// Support: IE9
        // Open requests must be manually aborted on unload (#5280)
        // See https://support.microsoft.com/kb/2856746 for more info
        window$2711.attachEvent) {
        window$2711.attachEvent('onunload', function () {
            for (var key$4399 in xhrCallbacks$2846) {
                xhrCallbacks$2846[key$4399]();
            }
        });
    }
    support$2721.cors = !!xhrSupported$2848 && 'withCredentials' in xhrSupported$2848;
    support$2721.ajax = xhrSupported$2848 = !!xhrSupported$2848;
    jQuery$2724.ajaxTransport(function (options$4400) {
        var callback$4401;
        if (// Cross domain only allowed if supported through XMLHttpRequest
            support$2721.cors || xhrSupported$2848 && !options$4400.crossDomain) {
            return {
                send: function (headers$4402, complete$4403) {
                    var i$4404, xhr$4405 = options$4400.xhr(), id$4406 = ++xhrId$2845;
                    xhr$4405.open(options$4400.type, options$4400.url, options$4400.async, options$4400.username, options$4400.password);
                    if (// Apply custom fields if provided
                        options$4400.xhrFields) {
                        for (i$4404 in options$4400.xhrFields) {
                            xhr$4405[i$4404] = options$4400.xhrFields[i$4404];
                        }
                    }
                    if (// Override mime type if needed
                        options$4400.mimeType && xhr$4405.overrideMimeType) {
                        xhr$4405.overrideMimeType(options$4400.mimeType);
                    }
                    if (// X-Requested-With header
                        // For cross-domain requests, seeing as conditions for a preflight are
                        // akin to a jigsaw puzzle, we simply never set it to be sure.
                        // (it can always be set on a per-request basis or even using ajaxSetup)
                        // For same-domain requests, won't change header if already provided.
                        !options$4400.crossDomain && !headers$4402['X-Requested-With']) {
                        headers$4402['X-Requested-With'] = 'XMLHttpRequest';
                    }
                    for (// Set headers
                        i$4404 in headers$4402) {
                        xhr$4405.setRequestHeader(i$4404, headers$4402[i$4404]);
                    }
                    // Callback
                    callback$4401 = function (type$4407) {
                        return function () {
                            if (callback$4401) {
                                delete xhrCallbacks$2846[id$4406];
                                callback$4401 = xhr$4405.onload = xhr$4405.onerror = null;
                                if (type$4407 === 'abort') {
                                    xhr$4405.abort();
                                } else if (type$4407 === 'error') {
                                    complete$4403(// file: protocol always yields status 0; see #8605, #14207
                                    xhr$4405.status, xhr$4405.statusText);
                                } else {
                                    complete$4403(xhrSuccessStatus$2847[xhr$4405.status] || xhr$4405.status, xhr$4405.statusText, // Support: IE9
                                    // Accessing binary-data responseText throws an exception
                                    // (#11426)
                                    typeof xhr$4405.responseText === 'string' ? { text: xhr$4405.responseText } : undefined, xhr$4405.getAllResponseHeaders());
                                }
                            }
                        };
                    };
                    // Listen to events
                    xhr$4405.onload = callback$4401();
                    xhr$4405.onerror = callback$4401('error');
                    // Create the abort callback
                    callback$4401 = xhrCallbacks$2846[id$4406] = callback$4401('abort');
                    try {
                        // Do send the request (this may raise an exception)
                        xhr$4405.send(options$4400.hasContent && options$4400.data || null);
                    } catch (e$4408) {
                        if (// #14683: Only rethrow if this hasn't been notified as an error yet
                            callback$4401) {
                            throw e$4408;
                        }
                    }
                },
                abort: function () {
                    if (callback$4401) {
                        callback$4401();
                    }
                }
            };
        }
    });
    // Install script dataType
    jQuery$2724.ajaxSetup({
        accepts: { script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript' },
        contents: { script: /(?:java|ecma)script/ },
        converters: {
            'text script': function (text$4409) {
                jQuery$2724.globalEval(text$4409);
                return text$4409;
            }
        }
    });
    // Handle cache's special case and crossDomain
    jQuery$2724.ajaxPrefilter('script', function (s$4410) {
        if (s$4410.cache === undefined) {
            s$4410.cache = false;
        }
        if (s$4410.crossDomain) {
            s$4410.type = 'GET';
        }
    });
    // Bind script tag hack transport
    jQuery$2724.ajaxTransport('script', function (s$4411) {
        if (// This transport only deals with cross domain requests
            s$4411.crossDomain) {
            var script$4412, callback$4413;
            return {
                send: function (_$4414, complete$4415) {
                    script$4412 = jQuery$2724('<script>').prop({
                        async: true,
                        charset: s$4411.scriptCharset,
                        src: s$4411.url
                    }).on('load error', callback$4413 = function (evt$4416) {
                        script$4412.remove();
                        callback$4413 = null;
                        if (evt$4416) {
                            complete$4415(evt$4416.type === 'error' ? 404 : 200, evt$4416.type);
                        }
                    });
                    document$2722.head.appendChild(script$4412[0]);
                },
                abort: function () {
                    if (callback$4413) {
                        callback$4413();
                    }
                }
            };
        }
    });
    var oldCallbacks$2849 = [], rjsonp$2850 = /(=)\?(?=&|$)|\?\?/;
    // Default jsonp settings
    jQuery$2724.ajaxSetup({
        jsonp: 'callback',
        jsonpCallback: function () {
            var callback$4417 = oldCallbacks$2849.pop() || jQuery$2724.expando + '_' + nonce$2820++;
            this[callback$4417] = true;
            return callback$4417;
        }
    });
    // Detect, normalize options and install callbacks for jsonp requests
    jQuery$2724.ajaxPrefilter('json jsonp', function (s$4418, originalSettings$4419, jqXHR$4420) {
        var callbackName$4421, overwritten$4422, responseContainer$4423, jsonProp$4424 = s$4418.jsonp !== false && (rjsonp$2850.test(s$4418.url) ? 'url' : typeof s$4418.data === 'string' && !(s$4418.contentType || '').indexOf('application/x-www-form-urlencoded') && rjsonp$2850.test(s$4418.data) && 'data');
        if (// Handle iff the expected data type is "jsonp" or we have a parameter to set
            jsonProp$4424 || s$4418.dataTypes[0] === 'jsonp') {
            // Get callback name, remembering preexisting value associated with it
            callbackName$4421 = s$4418.jsonpCallback = jQuery$2724.isFunction(s$4418.jsonpCallback) ? s$4418.jsonpCallback() : s$4418.jsonpCallback;
            if (// Insert callback into url or form data
                jsonProp$4424) {
                s$4418[jsonProp$4424] = s$4418[jsonProp$4424].replace(rjsonp$2850, '$1' + callbackName$4421);
            } else if (s$4418.jsonp !== false) {
                s$4418.url += (rquery$2821.test(s$4418.url) ? '&' : '?') + s$4418.jsonp + '=' + callbackName$4421;
            }
            // Use data converter to retrieve json after script execution
            s$4418.converters['script json'] = function () {
                if (!responseContainer$4423) {
                    jQuery$2724.error(callbackName$4421 + ' was not called');
                }
                return responseContainer$4423[0];
            };
            // force json dataType
            s$4418.dataTypes[0] = 'json';
            // Install callback
            overwritten$4422 = window$2711[callbackName$4421];
            window$2711[callbackName$4421] = function () {
                responseContainer$4423 = arguments;
            };
            // Clean-up function (fires after converters)
            jqXHR$4420.always(function () {
                // Restore preexisting value
                window$2711[callbackName$4421] = overwritten$4422;
                if (// Save back as free
                    s$4418[callbackName$4421]) {
                    // make sure that re-using the options doesn't screw things around
                    s$4418.jsonpCallback = originalSettings$4419.jsonpCallback;
                    // save the callback name for future use
                    oldCallbacks$2849.push(callbackName$4421);
                }
                if (// Call if it was a function and we have a response
                    responseContainer$4423 && jQuery$2724.isFunction(overwritten$4422)) {
                    overwritten$4422(responseContainer$4423[0]);
                }
                responseContainer$4423 = overwritten$4422 = undefined;
            });
            // Delegate to script
            return 'script';
        }
    });
    // data: string of html
    // context (optional): If specified, the fragment will be created in this context, defaults to document
    // keepScripts (optional): If true, will include scripts passed in the html string
    jQuery$2724.parseHTML = function (data$4425, context$4426, keepScripts$4427) {
        if (!data$4425 || typeof data$4425 !== 'string') {
            return null;
        }
        if (typeof context$4426 === 'boolean') {
            keepScripts$4427 = context$4426;
            context$4426 = false;
        }
        context$4426 = context$4426 || document$2722;
        var parsed$4428 = rsingleTag$2732.exec(data$4425), scripts$4429 = !keepScripts$4427 && [];
        if (// Single tag
            parsed$4428) {
            return [context$4426.createElement(parsed$4428[1])];
        }
        parsed$4428 = jQuery$2724.buildFragment([data$4425], context$4426, scripts$4429);
        if (scripts$4429 && scripts$4429.length) {
            jQuery$2724(scripts$4429).remove();
        }
        return jQuery$2724.merge([], parsed$4428.childNodes);
    };
    var // Keep a copy of the old load method
    _load$2851 = jQuery$2724.fn.load;
    /**
 * Load a url into a page
 */
    jQuery$2724.fn.load = function (url$4430, params$4431, callback$4432) {
        if (typeof url$4430 !== 'string' && _load$2851) {
            return _load$2851.apply(this, arguments);
        }
        var selector$4433, type$4434, response$4435, self$4436 = this, off$4437 = url$4430.indexOf(' ');
        if (off$4437 >= 0) {
            selector$4433 = jQuery$2724.trim(url$4430.slice(off$4437));
            url$4430 = url$4430.slice(0, off$4437);
        }
        if (// If it's a function
            jQuery$2724.isFunction(params$4431)) {
            // We assume that it's the callback
            callback$4432 = params$4431;
            params$4431 = undefined;
        } else if (params$4431 && typeof params$4431 === 'object') {
            type$4434 = 'POST';
        }
        if (// If we have elements to modify, make the request
            self$4436.length > 0) {
            jQuery$2724.ajax({
                url: url$4430,
                // if "type" variable is undefined, then "GET" method will be used
                type: type$4434,
                dataType: 'html',
                data: params$4431
            }).done(function (responseText$4438) {
                // Save response for use in complete callback
                response$4435 = arguments;
                self$4436.html(selector$4433 ? // If a selector was specified, locate the right elements in a dummy div
                // Exclude scripts to avoid IE 'Permission Denied' errors
                jQuery$2724('<div>').append(jQuery$2724.parseHTML(responseText$4438)).find(selector$4433) : // Otherwise use the full result
                responseText$4438);
            }).complete(callback$4432 && function (jqXHR$4439, status$4440) {
                self$4436.each(callback$4432, response$4435 || [
                    jqXHR$4439.responseText,
                    status$4440,
                    jqXHR$4439
                ]);
            });
        }
        return this;
    };
    // Attach a bunch of functions for handling common AJAX events
    jQuery$2724.each([
        'ajaxStart',
        'ajaxStop',
        'ajaxComplete',
        'ajaxError',
        'ajaxSuccess',
        'ajaxSend'
    ], function (i$4441, type$4442) {
        jQuery$2724.fn[type$4442] = function (fn$4443) {
            return this.on(type$4442, fn$4443);
        };
    });
    jQuery$2724.expr.filters.animated = function (elem$4444) {
        return jQuery$2724.grep(jQuery$2724.timers, function (fn$4445) {
            return elem$4444 === fn$4445.elem;
        }).length;
    };
    var docElem$2852 = window$2711.document.documentElement;
    function getWindow$2853(elem$4446) {
        return jQuery$2724.isWindow(elem$4446) ? elem$4446 : elem$4446.nodeType === 9 && elem$4446.defaultView;
    }
    jQuery$2724.offset = {
        setOffset: function (elem$4447, options$4448, i$4449) {
            var curPosition$4450, curLeft$4451, curCSSTop$4452, curTop$4453, curOffset$4454, curCSSLeft$4455, calculatePosition$4456, position$4457 = jQuery$2724.css(elem$4447, 'position'), curElem$4458 = jQuery$2724(elem$4447), props$4459 = {};
            if (// Set position first, in-case top/left are set even on static elem
                position$4457 === 'static') {
                elem$4447.style.position = 'relative';
            }
            curOffset$4454 = curElem$4458.offset();
            curCSSTop$4452 = jQuery$2724.css(elem$4447, 'top');
            curCSSLeft$4455 = jQuery$2724.css(elem$4447, 'left');
            calculatePosition$4456 = (position$4457 === 'absolute' || position$4457 === 'fixed') && (curCSSTop$4452 + curCSSLeft$4455).indexOf('auto') > -1;
            if (// Need to be able to calculate position if either
                // top or left is auto and position is either absolute or fixed
                calculatePosition$4456) {
                curPosition$4450 = curElem$4458.position();
                curTop$4453 = curPosition$4450.top;
                curLeft$4451 = curPosition$4450.left;
            } else {
                curTop$4453 = parseFloat(curCSSTop$4452) || 0;
                curLeft$4451 = parseFloat(curCSSLeft$4455) || 0;
            }
            if (jQuery$2724.isFunction(options$4448)) {
                options$4448 = options$4448.call(elem$4447, i$4449, curOffset$4454);
            }
            if (options$4448.top != null) {
                props$4459.top = options$4448.top - curOffset$4454.top + curTop$4453;
            }
            if (options$4448.left != null) {
                props$4459.left = options$4448.left - curOffset$4454.left + curLeft$4451;
            }
            if ('using' in options$4448) {
                options$4448.using.call(elem$4447, props$4459);
            } else {
                curElem$4458.css(props$4459);
            }
        }
    };
    jQuery$2724.fn.extend({
        offset: function (options$4460) {
            if (arguments.length) {
                return options$4460 === undefined ? this : this.each(function (i$4466) {
                    jQuery$2724.offset.setOffset(this, options$4460, i$4466);
                });
            }
            var docElem$4461, win$4462, elem$4463 = this[0], box$4464 = {
                    top: 0,
                    left: 0
                }, doc$4465 = elem$4463 && elem$4463.ownerDocument;
            if (!doc$4465) {
                return;
            }
            docElem$4461 = doc$4465.documentElement;
            if (// Make sure it's not a disconnected DOM node
                !jQuery$2724.contains(docElem$4461, elem$4463)) {
                return box$4464;
            }
            if (// Support: BlackBerry 5, iOS 3 (original iPhone)
                // If we don't have gBCR, just use 0,0 rather than error
                typeof elem$4463.getBoundingClientRect !== strundefined$2757) {
                box$4464 = elem$4463.getBoundingClientRect();
            }
            win$4462 = getWindow$2853(doc$4465);
            return {
                top: box$4464.top + win$4462.pageYOffset - docElem$4461.clientTop,
                left: box$4464.left + win$4462.pageXOffset - docElem$4461.clientLeft
            };
        },
        position: function () {
            if (!this[0]) {
                return;
            }
            var offsetParent$4467, offset$4468, elem$4469 = this[0], parentOffset$4470 = {
                    top: 0,
                    left: 0
                };
            if (// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
                jQuery$2724.css(elem$4469, 'position') === 'fixed') {
                // Assume getBoundingClientRect is there when computed position is fixed
                offset$4468 = elem$4469.getBoundingClientRect();
            } else {
                // Get *real* offsetParent
                offsetParent$4467 = this.offsetParent();
                // Get correct offsets
                offset$4468 = this.offset();
                if (!jQuery$2724.nodeName(offsetParent$4467[0], 'html')) {
                    parentOffset$4470 = offsetParent$4467.offset();
                }
                // Add offsetParent borders
                parentOffset$4470.top += jQuery$2724.css(offsetParent$4467[0], 'borderTopWidth', true);
                parentOffset$4470.left += jQuery$2724.css(offsetParent$4467[0], 'borderLeftWidth', true);
            }
            return {
                // Subtract parent offsets and element margins
                top: offset$4468.top - parentOffset$4470.top - jQuery$2724.css(elem$4469, 'marginTop', true),
                left: offset$4468.left - parentOffset$4470.left - jQuery$2724.css(elem$4469, 'marginLeft', true)
            };
        },
        offsetParent: function () {
            return this.map(function () {
                var offsetParent$4471 = this.offsetParent || docElem$2852;
                while (offsetParent$4471 && (!jQuery$2724.nodeName(offsetParent$4471, 'html') && jQuery$2724.css(offsetParent$4471, 'position') === 'static')) {
                    offsetParent$4471 = offsetParent$4471.offsetParent;
                }
                return offsetParent$4471 || docElem$2852;
            });
        }
    });
    // Create scrollLeft and scrollTop methods
    jQuery$2724.each({
        scrollLeft: 'pageXOffset',
        scrollTop: 'pageYOffset'
    }, function (method$4472, prop$4473) {
        var top$4474 = 'pageYOffset' === prop$4473;
        jQuery$2724.fn[method$4472] = function (val$4475) {
            return access$2746(this, function (elem$4476, method$4477, val$4478) {
                var win$4479 = getWindow$2853(elem$4476);
                if (val$4478 === undefined) {
                    return win$4479 ? win$4479[prop$4473] : elem$4476[method$4477];
                }
                if (win$4479) {
                    win$4479.scrollTo(!top$4474 ? val$4478 : window$2711.pageXOffset, top$4474 ? val$4478 : window$2711.pageYOffset);
                } else {
                    elem$4476[method$4477] = val$4478;
                }
            }, method$4472, val$4475, arguments.length, null);
        };
    });
    // Support: Safari<7+, Chrome<37+
    // Add the top/left cssHooks using jQuery.fn.position
    // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
    // Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
    // getComputedStyle returns percent when specified for top/left/bottom/right;
    // rather than make the css module depend on the offset module, just check for it here
    jQuery$2724.each([
        'top',
        'left'
    ], function (i$4480, prop$4481) {
        jQuery$2724.cssHooks[prop$4481] = addGetHookIf(support$2721.pixelPosition, function (elem$4482, computed$4483) {
            if (computed$4483) {
                computed$4483 = curCSS$2788(elem$4482, prop$4481);
                return // If curCSS returns percentage, fallback to offset
                rnumnonpx$2786.test(computed$4483) ? jQuery$2724(elem$4482).position()[prop$4481] + 'px' : computed$4483;
            }
        });
    });
    // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
    jQuery$2724.each({
        Height: 'height',
        Width: 'width'
    }, function (name$4484, type$4485) {
        jQuery$2724.each({
            padding: 'inner' + name$4484,
            content: type$4485,
            '': 'outer' + name$4484
        }, function (defaultExtra$4486, funcName$4487) {
            // Margin is only for outerHeight, outerWidth
            jQuery$2724.fn[funcName$4487] = function (margin$4488, value$4489) {
                var chainable$4490 = arguments.length && (defaultExtra$4486 || typeof margin$4488 !== 'boolean'), extra$4491 = defaultExtra$4486 || (margin$4488 === true || value$4489 === true ? 'margin' : 'border');
                return access$2746(this, function (elem$4492, type$4493, value$4494) {
                    var doc$4495;
                    if (jQuery$2724.isWindow(elem$4492)) {
                        return // As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
                        // isn't a whole lot we can do. See pull request at this URL for discussion:
                        // https://github.com/jquery/jquery/pull/764
                        elem$4492.document.documentElement['client' + name$4484];
                    }
                    if (// Get document width or height
                        elem$4492.nodeType === 9) {
                        doc$4495 = elem$4492.documentElement;
                        return // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
                        // whichever is greatest
                        Math.max(elem$4492.body['scroll' + name$4484], doc$4495['scroll' + name$4484], elem$4492.body['offset' + name$4484], doc$4495['offset' + name$4484], doc$4495['client' + name$4484]);
                    }
                    return value$4494 === undefined ? // Get width or height on the element, requesting but not forcing parseFloat
                    jQuery$2724.css(elem$4492, type$4493, extra$4491) : // Set width or height on the element
                    jQuery$2724.style(elem$4492, type$4493, value$4494, extra$4491);
                }, type$4485, chainable$4490 ? margin$4488 : undefined, chainable$4490, null);
            };
        });
    });
    // The number of elements contained in the matched element set
    jQuery$2724.fn.size = function () {
        return this.length;
    };
    jQuery$2724.fn.andSelf = jQuery$2724.fn.addBack;
    if (// Register as a named AMD module, since jQuery can be concatenated with other
        // files that may use define, but not via a proper concatenation script that
        // understands anonymous AMD modules. A named AMD is safest and most robust
        // way to register. Lowercase jquery is used because AMD module names are
        // derived from file names, and jQuery is normally delivered in a lowercase
        // file name. Do this after creating the global so that if an AMD module wants
        // to call noConflict to hide this version of jQuery, it will work.
        // Note that for maximum portability, libraries that are not jQuery should
        // declare themselves as anonymous modules, and avoid setting a global if an
        // AMD loader is present. jQuery is a special case. For more information, see
        // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
        typeof define === 'function' && define.amd) {
        define('jquery', [], function () {
            return jQuery$2724;
        });
    }
    var // Map over jQuery in case of overwrite
        _jQuery$2854 = window$2711.jQuery, // Map over the $ in case of overwrite
        _$$2855 = window$2711.$;
    jQuery$2724.noConflict = function (deep$4496) {
        if (window$2711.$ === jQuery$2724) {
            window$2711.$ = _$$2855;
        }
        if (deep$4496 && window$2711.jQuery === jQuery$2724) {
            window$2711.jQuery = _jQuery$2854;
        }
        return jQuery$2724;
    };
    if (// Expose jQuery and $ identifiers, even in AMD
        // (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
        // and CommonJS for browser emulators (#13566)
        typeof noGlobal$2712 === strundefined$2757) {
        window$2711.jQuery = window$2711.$ = jQuery$2724;
    }
    return jQuery$2724;
}));