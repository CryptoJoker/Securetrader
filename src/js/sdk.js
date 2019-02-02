/*!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		noModule: true
	};

	function DOMEval( code, doc, node ) {
		doc = doc || document;

		var i,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {
				if ( node[ i ] ) {
					script[ i ] = node[ i ];
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.3.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
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
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
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
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
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
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
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
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc, node );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		div.style.position = "absolute";
		scrollboxSizeVal = div.offsetWidth === 36 || "absolute";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5
		) );
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),
		val = curCSS( elem, dimension, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox;

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = valueIsBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ dimension ] );

	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	if ( val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) {

		val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];

		// offsetWidth/offsetHeight provide border-box values
		valueIsBorderBox = true;
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),
				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra && boxModelAdjustment(
					elem,
					dimension,
					extra,
					isBorderBox,
					styles
				);

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && support.scrollboxSize() === styles.position ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = Date.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

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
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
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
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
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

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.videojs=e()}(this,function(){function t(t,e){return e={exports:{}},t(e,e.exports),e.exports}function e(t,e){Ue(t).forEach(function(n){return e(t[n],n)})}function n(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return Ue(t).reduce(function(n,r){return e(n,t[r],r)},n)}function r(t){for(var n=arguments.length,r=Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];return Object.assign?Object.assign.apply(Object,[t].concat(r)):(r.forEach(function(n){n&&e(n,function(e,n){t[n]=e})}),t)}function i(t){return!!t&&"object"===(void 0===t?"undefined":Re(t))}function o(t){return i(t)&&"[object Object]"===We.call(t)&&t.constructor===Object}function s(t){return t.replace(/\n\r?\s*/g,"")}function a(t,e){if(!t||!e)return"";if("function"==typeof le.getComputedStyle){var n=le.getComputedStyle(t);return n?n[e]:""}return t.currentStyle[e]||""}function l(t){return"string"==typeof t&&/\S/.test(t)}function c(t){if(/\s/.test(t))throw new Error("class has illegal whitespace characters")}function u(t){return new RegExp("(^|\\s)"+t+"($|\\s)")}function h(){return de===le.document&&void 0!==de.createElement}function p(t){return i(t)&&1===t.nodeType}function d(){try{return le.parent!==le.self}catch(t){return!0}}function f(t){return function(e,n){if(!l(e))return de[t](null);l(n)&&(n=de.querySelector(n));var r=p(n)?n:de;return r[t]&&r[t](e)}}function v(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"div",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=arguments[3],i=de.createElement(t);return Object.getOwnPropertyNames(e).forEach(function(t){var n=e[t];-1!==t.indexOf("aria-")||"role"===t||"type"===t?(Ye.warn(Ge($e,t,n)),i.setAttribute(t,n)):"textContent"===t?y(i,n):i[t]=n}),Object.getOwnPropertyNames(n).forEach(function(t){i.setAttribute(t,n[t])}),r&&D(i,r),i}function y(t,e){return void 0===t.textContent?t.innerText=e:t.textContent=e,t}function g(t,e){e.firstChild?e.insertBefore(t,e.firstChild):e.appendChild(t)}function m(t,e){return c(e),t.classList?t.classList.contains(e):u(e).test(t.className)}function _(t,e){return t.classList?t.classList.add(e):m(t,e)||(t.className=(t.className+" "+e).trim()),t}function b(t,e){return t.classList?t.classList.remove(e):(c(e),t.className=t.className.split(/\s+/).filter(function(t){return t!==e}).join(" ")),t}function T(t,e,n){var r=m(t,e);if("function"==typeof n&&(n=n(t,e)),"boolean"!=typeof n&&(n=!r),n!==r)return n?_(t,e):b(t,e),t}function C(t,e){Object.getOwnPropertyNames(e).forEach(function(n){var r=e[n];null===r||void 0===r||!1===r?t.removeAttribute(n):t.setAttribute(n,!0===r?"":r)})}function k(t){var e={};if(t&&t.attributes&&t.attributes.length>0)for(var n=t.attributes,r=n.length-1;r>=0;r--){var i=n[r].name,o=n[r].value;"boolean"!=typeof t[i]&&-1===",autoplay,controls,playsinline,loop,muted,default,defaultMuted,".indexOf(","+i+",")||(o=null!==o),e[i]=o}return e}function E(t,e){return t.getAttribute(e)}function w(t,e,n){t.setAttribute(e,n)}function S(t,e){t.removeAttribute(e)}function x(){de.body.focus(),de.onselectstart=function(){return!1}}function j(){de.onselectstart=function(){return!0}}function A(t){if(t&&t.getBoundingClientRect&&t.parentNode){var e=t.getBoundingClientRect(),n={};return["bottom","height","left","right","top","width"].forEach(function(t){void 0!==e[t]&&(n[t]=e[t])}),n.height||(n.height=parseFloat(a(t,"height"))),n.width||(n.width=parseFloat(a(t,"width"))),n}}function P(t){var e=void 0;if(t.getBoundingClientRect&&t.parentNode&&(e=t.getBoundingClientRect()),!e)return{left:0,top:0};var n=de.documentElement,r=de.body,i=n.clientLeft||r.clientLeft||0,o=le.pageXOffset||r.scrollLeft,s=e.left+o-i,a=n.clientTop||r.clientTop||0,l=le.pageYOffset||r.scrollTop,c=e.top+l-a;return{left:Math.round(s),top:Math.round(c)}}function O(t,e){var n={},r=P(t),i=t.offsetWidth,o=t.offsetHeight,s=r.top,a=r.left,l=e.pageY,c=e.pageX;return e.changedTouches&&(c=e.changedTouches[0].pageX,l=e.changedTouches[0].pageY),n.y=Math.max(0,Math.min(1,(s-l+o)/o)),n.x=Math.max(0,Math.min(1,(c-a)/i)),n}function N(t){return i(t)&&3===t.nodeType}function M(t){for(;t.firstChild;)t.removeChild(t.firstChild);return t}function I(t){return"function"==typeof t&&(t=t()),(Array.isArray(t)?t:[t]).map(function(t){return"function"==typeof t&&(t=t()),p(t)||N(t)?t:"string"==typeof t&&/\S/.test(t)?de.createTextNode(t):void 0}).filter(function(t){return t})}function D(t,e){return I(e).forEach(function(e){return t.appendChild(e)}),t}function L(t,e){return D(M(t),e)}function R(t){return void 0===t.button&&void 0===t.buttons||(0===t.button&&void 0===t.buttons||(9===Oe||0===t.button&&1===t.buttons))}function B(){return tn++}function F(t){var e=t[nn];return e||(e=t[nn]=B()),en[e]||(en[e]={}),en[e]}function V(t){var e=t[nn];return!!e&&!!Object.getOwnPropertyNames(en[e]).length}function H(t){var e=t[nn];if(e){delete en[e];try{delete t[nn]}catch(e){t.removeAttribute?t.removeAttribute(nn):t[nn]=null}}}function W(t,e){var n=F(t);0===n.handlers[e].length&&(delete n.handlers[e],t.removeEventListener?t.removeEventListener(e,n.dispatcher,!1):t.detachEvent&&t.detachEvent("on"+e,n.dispatcher)),Object.getOwnPropertyNames(n.handlers).length<=0&&(delete n.handlers,delete n.dispatcher,delete n.disabled),0===Object.getOwnPropertyNames(n).length&&H(t)}function U(t,e,n,r){n.forEach(function(n){t(e,n,r)})}function z(t){function e(){return!0}function n(){return!1}if(!t||!t.isPropagationStopped){var r=t||le.event;t={};for(var i in r)"layerX"!==i&&"layerY"!==i&&"keyLocation"!==i&&"webkitMovementX"!==i&&"webkitMovementY"!==i&&("returnValue"===i&&r.preventDefault||(t[i]=r[i]));if(t.target||(t.target=t.srcElement||de),t.relatedTarget||(t.relatedTarget=t.fromElement===t.target?t.toElement:t.fromElement),t.preventDefault=function(){r.preventDefault&&r.preventDefault(),t.returnValue=!1,r.returnValue=!1,t.defaultPrevented=!0},t.defaultPrevented=!1,t.stopPropagation=function(){r.stopPropagation&&r.stopPropagation(),t.cancelBubble=!0,r.cancelBubble=!0,t.isPropagationStopped=e},t.isPropagationStopped=n,t.stopImmediatePropagation=function(){r.stopImmediatePropagation&&r.stopImmediatePropagation(),t.isImmediatePropagationStopped=e,t.stopPropagation()},t.isImmediatePropagationStopped=n,null!==t.clientX&&void 0!==t.clientX){var o=de.documentElement,s=de.body;t.pageX=t.clientX+(o&&o.scrollLeft||s&&s.scrollLeft||0)-(o&&o.clientLeft||s&&s.clientLeft||0),t.pageY=t.clientY+(o&&o.scrollTop||s&&s.scrollTop||0)-(o&&o.clientTop||s&&s.clientTop||0)}t.which=t.charCode||t.keyCode,null!==t.button&&void 0!==t.button&&(t.button=1&t.button?0:4&t.button?1:2&t.button?2:0)}return t}function X(t,e,n){if(Array.isArray(e))return U(X,t,e,n);var r=F(t);if(r.handlers||(r.handlers={}),r.handlers[e]||(r.handlers[e]=[]),n.guid||(n.guid=B()),r.handlers[e].push(n),r.dispatcher||(r.disabled=!1,r.dispatcher=function(e,n){if(!r.disabled){e=z(e);var i=r.handlers[e.type];if(i)for(var o=i.slice(0),s=0,a=o.length;s<a&&!e.isImmediatePropagationStopped();s++)try{o[s].call(t,e,n)}catch(t){Ye.error(t)}}}),1===r.handlers[e].length)if(t.addEventListener){var i=!1;rn&&on.indexOf(e)>-1&&(i={passive:!0}),t.addEventListener(e,r.dispatcher,i)}else t.attachEvent&&t.attachEvent("on"+e,r.dispatcher)}function q(t,e,n){if(V(t)){var r=F(t);if(r.handlers){if(Array.isArray(e))return U(q,t,e,n);var i=function(t,e){r.handlers[e]=[],W(t,e)};if(void 0!==e){var o=r.handlers[e];if(o){if(!n)return void i(t,e);if(n.guid)for(var s=0;s<o.length;s++)o[s].guid===n.guid&&o.splice(s--,1);W(t,e)}}else for(var a in r.handlers)Object.prototype.hasOwnProperty.call(r.handlers||{},a)&&i(t,a)}}}function K(t,e,n){var r=V(t)?F(t):{},i=t.parentNode||t.ownerDocument;if("string"==typeof e&&(e={type:e,target:t}),e=z(e),r.dispatcher&&r.dispatcher.call(t,e,n),i&&!e.isPropagationStopped()&&!0===e.bubbles)K.call(null,i,e,n);else if(!i&&!e.defaultPrevented){var o=F(e.target);e.target[e.type]&&(o.disabled=!0,"function"==typeof e.target[e.type]&&e.target[e.type](),o.disabled=!1)}return!e.defaultPrevented}function Y(t,e,n){if(Array.isArray(e))return U(Y,t,e,n);var r=function r(){q(t,e,r),n.apply(this,arguments)};r.guid=n.guid=n.guid||B(),X(t,e,r)}function G(t,e){e&&(ln=e),le.setTimeout(cn,t)}function $(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.eventBusKey;if(n){if(!t[n].nodeName)throw new Error('The eventBusKey "'+n+'" does not refer to an element.');t.eventBusEl_=t[n]}else t.eventBusEl_=v("span",{className:"vjs-event-bus"});return r(t,Cn),t.on("dispose",function(){t.off(),le.setTimeout(function(){t.eventBusEl_=null},0)}),t}function J(t,e){return r(t,kn),t.state=r({},t.state,e),"function"==typeof t.handleStateChanged&&vn(t)&&t.on("statechanged",t.handleStateChanged),t}function Q(t){return"string"!=typeof t?t:t.charAt(0).toUpperCase()+t.slice(1)}function Z(t,e){return Q(t)===Q(e)}function tt(){for(var t={},n=arguments.length,r=Array(n),i=0;i<n;i++)r[i]=arguments[i];return r.forEach(function(n){n&&e(n,function(e,n){if(!o(e))return void(t[n]=e);o(t[n])||(t[n]={}),t[n]=tt(t[n],e)})}),t}function et(t,e,n){if("number"!=typeof e||e<0||e>n)throw new Error("Failed to execute '"+t+"' on 'TimeRanges': The index provided ("+e+") is non-numeric or out of bounds (0-"+n+").")}function nt(t,e,n,r){return et(t,r,n.length-1),n[r][e]}function rt(t){return void 0===t||0===t.length?{length:0,start:function(){throw new Error("This TimeRanges object is empty")},end:function(){throw new Error("This TimeRanges object is empty")}}:{length:t.length,start:nt.bind(null,"start",0,t),end:nt.bind(null,"end",1,t)}}function it(t,e){return Array.isArray(t)?rt(t):void 0===t||void 0===e?rt():rt([[t,e]])}function ot(t,e){var n=0,r=void 0,i=void 0;if(!e)return 0;t&&t.length||(t=it(0,0));for(var o=0;o<t.length;o++)r=t.start(o),i=t.end(o),i>e&&(i=e),n+=i-r;return n/e}function st(t){if(t instanceof st)return t;"number"==typeof t?this.code=t:"string"==typeof t?this.message=t:i(t)&&("number"==typeof t.code&&(this.code=t.code),r(this,t)),this.message||(this.message=st.defaultMessages[this.code]||"")}function at(t,e){var n,r=null;try{n=JSON.parse(t,e)}catch(t){r=t}return[r,n]}function lt(t){return void 0!==t&&"function"==typeof t.then}function ct(t){lt(t)&&t.then(null,function(t){})}function ut(t){var e=or.call(t);return"[object Function]"===e||"function"==typeof t&&"[object RegExp]"!==e||"undefined"!=typeof window&&(t===window.setTimeout||t===window.alert||t===window.confirm||t===window.prompt)}function ht(t,e,n){if(!ir(e))throw new TypeError("iterator must be a function");arguments.length<3&&(n=this),"[object Array]"===lr.call(t)?pt(t,e,n):"string"==typeof t?dt(t,e,n):ft(t,e,n)}function pt(t,e,n){for(var r=0,i=t.length;r<i;r++)cr.call(t,r)&&e.call(n,t[r],r,t)}function dt(t,e,n){for(var r=0,i=t.length;r<i;r++)e.call(n,t.charAt(r),r,t)}function ft(t,e,n){for(var r in t)cr.call(t,r)&&e.call(n,t[r],r,t)}function vt(){for(var t={},e=0;e<arguments.length;e++){var n=arguments[e];for(var r in n)dr.call(n,r)&&(t[r]=n[r])}return t}function yt(t){for(var e in t)if(t.hasOwnProperty(e))return!1;return!0}function gt(t,e,n){var r=t;return ir(e)?(n=e,"string"==typeof t&&(r={uri:t})):r=pr(e,{uri:t}),r.callback=n,r}function mt(t,e,n){return e=gt(t,e,n),_t(e)}function _t(t){function e(){4===a.readyState&&setTimeout(i,0)}function n(){var t=void 0;if(t=a.response?a.response:a.responseText||bt(a),y)try{t=JSON.parse(t)}catch(t){}return t}function r(t){return clearTimeout(u),t instanceof Error||(t=new Error(""+(t||"Unknown XMLHttpRequest Error"))),t.statusCode=0,s(t,g)}function i(){if(!c){var e;clearTimeout(u),e=t.useXDR&&void 0===a.status?200:1223===a.status?204:a.status;var r=g,i=null;return 0!==e?(r={body:n(),statusCode:e,method:p,headers:{},url:h,rawRequest:a},a.getAllResponseHeaders&&(r.headers=hr(a.getAllResponseHeaders()))):i=new Error("Internal XMLHttpRequest Error"),s(i,r,r.body)}}if(void 0===t.callback)throw new Error("callback argument missing");var o=!1,s=function(e,n,r){o||(o=!0,t.callback(e,n,r))},a=t.xhr||null;a||(a=t.cors||t.useXDR?new mt.XDomainRequest:new mt.XMLHttpRequest);var l,c,u,h=a.url=t.uri||t.url,p=a.method=t.method||"GET",d=t.body||t.data,f=a.headers=t.headers||{},v=!!t.sync,y=!1,g={body:void 0,headers:{},statusCode:0,method:p,url:h,rawRequest:a};if("json"in t&&!1!==t.json&&(y=!0,f.accept||f.Accept||(f.Accept="application/json"),"GET"!==p&&"HEAD"!==p&&(f["content-type"]||f["Content-Type"]||(f["Content-Type"]="application/json"),d=JSON.stringify(!0===t.json?d:t.json))),a.onreadystatechange=e,a.onload=i,a.onerror=r,a.onprogress=function(){},a.onabort=function(){c=!0},a.ontimeout=r,a.open(p,h,!v,t.username,t.password),v||(a.withCredentials=!!t.withCredentials),!v&&t.timeout>0&&(u=setTimeout(function(){if(!c){c=!0,a.abort("timeout");var t=new Error("XMLHttpRequest timeout");t.code="ETIMEDOUT",r(t)}},t.timeout)),a.setRequestHeader)for(l in f)f.hasOwnProperty(l)&&a.setRequestHeader(l,f[l]);else if(t.headers&&!yt(t.headers))throw new Error("Headers cannot be set on an XDomainRequest object");return"responseType"in t&&(a.responseType=t.responseType),"beforeSend"in t&&"function"==typeof t.beforeSend&&t.beforeSend(a),a.send(d||null),a}function bt(t){if("document"===t.responseType)return t.responseXML;var e=t.responseXML&&"parsererror"===t.responseXML.documentElement.nodeName;return""!==t.responseType||e?null:t.responseXML}function Tt(){}function Ct(t,e){this.name="ParsingError",this.code=t.code,this.message=e||t.message}function kt(t){function e(t,e,n,r){return 3600*(0|t)+60*(0|e)+(0|n)+(0|r)/1e3}var n=t.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);return n?n[3]?e(n[1],n[2],n[3].replace(":",""),n[4]):n[1]>59?e(n[1],n[2],0,n[4]):e(0,n[1],n[2],n[4]):null}function Et(){this.values=Sr(null)}function wt(t,e,n,r){var i=r?t.split(r):[t];for(var o in i)if("string"==typeof i[o]){var s=i[o].split(n);if(2===s.length){var a=s[0],l=s[1];e(a,l)}}}function St(t,e,n){function r(){var e=kt(t);if(null===e)throw new Ct(Ct.Errors.BadTimeStamp,"Malformed timestamp: "+o);return t=t.replace(/^[^\sa-zA-Z-]+/,""),e}function i(){t=t.replace(/^\s+/,"")}var o=t;if(i(),e.startTime=r(),i(),"--\x3e"!==t.substr(0,3))throw new Ct(Ct.Errors.BadTimeStamp,"Malformed time stamp (time stamps must be separated by '--\x3e'): "+o);t=t.substr(3),i(),e.endTime=r(),i(),function(t,e){var r=new Et;wt(t,function(t,e){switch(t){case"region":for(var i=n.length-1;i>=0;i--)if(n[i].id===e){r.set(t,n[i].region);break}break;case"vertical":r.alt(t,e,["rl","lr"]);break;case"line":var o=e.split(","),s=o[0];r.integer(t,s),r.percent(t,s)&&r.set("snapToLines",!1),r.alt(t,s,["auto"]),2===o.length&&r.alt("lineAlign",o[1],["start","middle","end"]);break;case"position":o=e.split(","),r.percent(t,o[0]),2===o.length&&r.alt("positionAlign",o[1],["start","middle","end"]);break;case"size":r.percent(t,e);break;case"align":r.alt(t,e,["start","middle","end","left","right"])}},/:/,/\s/),e.region=r.get("region",null),e.vertical=r.get("vertical",""),e.line=r.get("line","auto"),e.lineAlign=r.get("lineAlign","start"),e.snapToLines=r.get("snapToLines",!0),e.size=r.get("size",100),e.align=r.get("align","middle"),e.position=r.get("position",{start:0,left:0,middle:50,end:100,right:100},e.align),e.positionAlign=r.get("positionAlign",{start:"start",left:"start",middle:"middle",end:"end",right:"end"},e.align)}(t,e)}function xt(t,e){function n(t){return xr[t]}for(var r,i=t.document.createElement("div"),o=i,s=[];null!==(r=function(){if(!e)return null;var t=e.match(/^([^<]*)(<[^>]+>?)?/);return function(t){return e=e.substr(t.length),t}(t[1]?t[1]:t[2])}());)if("<"!==r[0])o.appendChild(t.document.createTextNode(function(t){for(;c=t.match(/&(amp|lt|gt|lrm|rlm|nbsp);/);)t=t.replace(c[0],n);return t}(r)));else{if("/"===r[1]){s.length&&s[s.length-1]===r.substr(2).replace(">","")&&(s.pop(),o=o.parentNode);continue}var a,l=kt(r.substr(1,r.length-2));if(l){a=t.document.createProcessingInstruction("timestamp",l),o.appendChild(a);continue}var c=r.match(/^<([^.\s\/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/);if(!c)continue;if(!(a=function(e,n){var r=jr[e];if(!r)return null;var i=t.document.createElement(r);i.localName=r;var o=Ar[e];return o&&n&&(i[o]=n.trim()),i}(c[1],c[3])))continue;if(!function(t,e){return!Pr[e.localName]||Pr[e.localName]===t.localName}(o,a))continue;c[2]&&(a.className=c[2].substr(1).replace("."," ")),s.push(c[1]),o.appendChild(a),o=a}return i}function jt(t){for(var e=0;e<Or.length;e++){var n=Or[e];if(t>=n[0]&&t<=n[1])return!0}return!1}function At(t){function e(t,e){for(var n=e.childNodes.length-1;n>=0;n--)t.push(e.childNodes[n])}function n(t){if(!t||!t.length)return null;var r=t.pop(),i=r.textContent||r.innerText;if(i){var o=i.match(/^.*(\n|\r)/);return o?(t.length=0,o[0]):i}return"ruby"===r.tagName?n(t):r.childNodes?(e(t,r),n(t)):void 0}var r,i=[],o="";if(!t||!t.childNodes)return"ltr";for(e(i,t);o=n(i);)for(var s=0;s<o.length;s++)if(r=o.charCodeAt(s),jt(r))return"rtl";return"ltr"}function Pt(t){if("number"==typeof t.line&&(t.snapToLines||t.line>=0&&t.line<=100))return t.line;if(!t.track||!t.track.textTrackList||!t.track.textTrackList.mediaElement)return-1;for(var e=t.track,n=e.textTrackList,r=0,i=0;i<n.length&&n[i]!==e;i++)"showing"===n[i].mode&&r++;return-1*++r}function Ot(){}function Nt(t,e,n){var r=/MSIE\s8\.0/.test(navigator.userAgent),i="rgba(255, 255, 255, 1)",o="rgba(0, 0, 0, 0.8)";r&&(i="rgb(255, 255, 255)",o="rgb(0, 0, 0)"),Ot.call(this),this.cue=e,this.cueDiv=xt(t,e.text);var s={color:i,backgroundColor:o,position:"relative",left:0,right:0,top:0,bottom:0,display:"inline"};r||(s.writingMode=""===e.vertical?"horizontal-tb":"lr"===e.vertical?"vertical-lr":"vertical-rl",s.unicodeBidi="plaintext"),this.applyStyles(s,this.cueDiv),this.div=t.document.createElement("div"),s={textAlign:"middle"===e.align?"center":e.align,font:n.font,whiteSpace:"pre-line",position:"absolute"},r||(s.direction=At(this.cueDiv),s.writingMode=""===e.vertical?"horizontal-tb":"lr"===e.vertical?"vertical-lr":"vertical-rl".stylesunicodeBidi="plaintext"),this.applyStyles(s),this.div.appendChild(this.cueDiv);var a=0;switch(e.positionAlign){case"start":a=e.position;break;case"middle":a=e.position-e.size/2;break;case"end":a=e.position-e.size}""===e.vertical?this.applyStyles({left:this.formatStyle(a,"%"),width:this.formatStyle(e.size,"%")}):this.applyStyles({top:this.formatStyle(a,"%"),height:this.formatStyle(e.size,"%")}),this.move=function(t){this.applyStyles({top:this.formatStyle(t.top,"px"),bottom:this.formatStyle(t.bottom,"px"),left:this.formatStyle(t.left,"px"),right:this.formatStyle(t.right,"px"),height:this.formatStyle(t.height,"px"),width:this.formatStyle(t.width,"px")})}}function Mt(t){var e,n,r,i,o=/MSIE\s8\.0/.test(navigator.userAgent);if(t.div){n=t.div.offsetHeight,r=t.div.offsetWidth,i=t.div.offsetTop;var s=(s=t.div.childNodes)&&(s=s[0])&&s.getClientRects&&s.getClientRects();t=t.div.getBoundingClientRect(),e=s?Math.max(s[0]&&s[0].height||0,t.height/s.length):0}this.left=t.left,this.right=t.right,this.top=t.top||i,this.height=t.height||n,this.bottom=t.bottom||i+(t.height||n),this.width=t.width||r,this.lineHeight=void 0!==e?e:t.lineHeight,o&&!this.lineHeight&&(this.lineHeight=13)}function It(t,e,n,r){var i=new Mt(e),o=e.cue,s=Pt(o),a=[];if(o.snapToLines){var l;switch(o.vertical){case"":a=["+y","-y"],l="height";break;case"rl":a=["+x","-x"],l="width";break;case"lr":a=["-x","+x"],l="width"}var c=i.lineHeight,u=c*Math.round(s),h=n[l]+c,p=a[0];Math.abs(u)>h&&(u=u<0?-1:1,u*=Math.ceil(h/c)*c),s<0&&(u+=""===o.vertical?n.height:n.width,a=a.reverse()),i.move(p,u)}else{var d=i.lineHeight/n.height*100;switch(o.lineAlign){case"middle":s-=d/2;break;case"end":s-=d}switch(o.vertical){case"":e.applyStyles({top:e.formatStyle(s,"%")});break;case"rl":e.applyStyles({left:e.formatStyle(s,"%")});break;case"lr":e.applyStyles({right:e.formatStyle(s,"%")})}a=["+y","-x","+x","-y"],i=new Mt(e)}var f=function(t,e){for(var i,o=new Mt(t),s=1,a=0;a<e.length;a++){for(;t.overlapsOppositeAxis(n,e[a])||t.within(n)&&t.overlapsAny(r);)t.move(e[a]);if(t.within(n))return t;var l=t.intersectPercentage(n);s>l&&(i=new Mt(t),s=l),t=new Mt(o)}return i||o}(i,a);e.move(f.toCSSCompatValues(n))}function Dt(){}function Lt(t){return"string"==typeof t&&(!!Ir[t.toLowerCase()]&&t.toLowerCase())}function Rt(t){return"string"==typeof t&&(!!Dr[t.toLowerCase()]&&t.toLowerCase())}function Bt(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)t[r]=n[r]}return t}function Ft(t,e,n){var r=this,i=/MSIE\s8\.0/.test(navigator.userAgent),o={};i?r=document.createElement("custom"):o.enumerable=!0,r.hasBeenReset=!1;var s="",a=!1,l=t,c=e,u=n,h=null,p="",d=!0,f="auto",v="start",y=50,g="middle",m=50,_="middle";if(Object.defineProperty(r,"id",Bt({},o,{get:function(){return s},set:function(t){s=""+t}})),Object.defineProperty(r,"pauseOnExit",Bt({},o,{get:function(){return a},set:function(t){a=!!t}})),Object.defineProperty(r,"startTime",Bt({},o,{get:function(){return l},set:function(t){if("number"!=typeof t)throw new TypeError("Start time must be set to a number.");l=t,this.hasBeenReset=!0}})),Object.defineProperty(r,"endTime",Bt({},o,{get:function(){return c},set:function(t){if("number"!=typeof t)throw new TypeError("End time must be set to a number.");c=t,this.hasBeenReset=!0}})),Object.defineProperty(r,"text",Bt({},o,{get:function(){return u},set:function(t){u=""+t,this.hasBeenReset=!0}})),Object.defineProperty(r,"region",Bt({},o,{get:function(){return h},set:function(t){h=t,this.hasBeenReset=!0}})),Object.defineProperty(r,"vertical",Bt({},o,{get:function(){return p},set:function(t){var e=Lt(t);if(!1===e)throw new SyntaxError("An invalid or illegal string was specified.");p=e,this.hasBeenReset=!0}})),Object.defineProperty(r,"snapToLines",Bt({},o,{get:function(){return d},set:function(t){d=!!t,this.hasBeenReset=!0}})),Object.defineProperty(r,"line",Bt({},o,{get:function(){return f},set:function(t){if("number"!=typeof t&&t!==Mr)throw new SyntaxError("An invalid number or illegal string was specified.");f=t,this.hasBeenReset=!0}})),Object.defineProperty(r,"lineAlign",Bt({},o,{get:function(){return v},set:function(t){var e=Rt(t);if(!e)throw new SyntaxError("An invalid or illegal string was specified.");v=e,this.hasBeenReset=!0}})),Object.defineProperty(r,"position",Bt({},o,{get:function(){return y},set:function(t){if(t<0||t>100)throw new Error("Position must be between 0 and 100.");y=t,this.hasBeenReset=!0}})),Object.defineProperty(r,"positionAlign",Bt({},o,{get:function(){return g},set:function(t){var e=Rt(t);if(!e)throw new SyntaxError("An invalid or illegal string was specified.");g=e,this.hasBeenReset=!0}})),Object.defineProperty(r,"size",Bt({},o,{get:function(){return m},set:function(t){if(t<0||t>100)throw new Error("Size must be between 0 and 100.");m=t,this.hasBeenReset=!0}})),Object.defineProperty(r,"align",Bt({},o,{get:function(){return _},set:function(t){var e=Rt(t);if(!e)throw new SyntaxError("An invalid or illegal string was specified.");_=e,this.hasBeenReset=!0}})),r.displayState=void 0,i)return r}function Vt(t){return"string"==typeof t&&(!!Rr[t.toLowerCase()]&&t.toLowerCase())}function Ht(t){return"number"==typeof t&&t>=0&&t<=100}function Wt(){var t=100,e=3,n=0,r=100,i=0,o=100,s="";Object.defineProperties(this,{width:{enumerable:!0,get:function(){return t},set:function(e){if(!Ht(e))throw new Error("Width must be between 0 and 100.");t=e}},lines:{enumerable:!0,get:function(){return e},set:function(t){if("number"!=typeof t)throw new TypeError("Lines must be set to a number.");e=t}},regionAnchorY:{enumerable:!0,get:function(){return r},set:function(t){if(!Ht(t))throw new Error("RegionAnchorX must be between 0 and 100.");r=t}},regionAnchorX:{enumerable:!0,get:function(){return n},set:function(t){if(!Ht(t))throw new Error("RegionAnchorY must be between 0 and 100.");n=t}},viewportAnchorY:{enumerable:!0,get:function(){return o},set:function(t){if(!Ht(t))throw new Error("ViewportAnchorY must be between 0 and 100.");o=t}},viewportAnchorX:{enumerable:!0,get:function(){return i},set:function(t){if(!Ht(t))throw new Error("ViewportAnchorX must be between 0 and 100.");i=t}},scroll:{enumerable:!0,get:function(){return s},set:function(t){var e=Vt(t);if(!1===e)throw new SyntaxError("An invalid or illegal string was specified.");s=e}}})}function Ut(t,e,n,r){var i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},o=t.textTracks();i.kind=e,n&&(i.label=n),r&&(i.language=r),i.tech=t;var s=new wr.text.TrackClass(i);return o.addTrack(s),s}function zt(t,e){Hr[t]=Hr[t]||[],Hr[t].push(e)}function Xt(t,e,n){t.setTimeout(function(){return $t(e,Hr[e.type],n,t)},1)}function qt(t,e){t.forEach(function(t){return t.setTech&&t.setTech(e)})}function Kt(t,e,n){return t.reduceRight(Gt(n),e[n]())}function Yt(t,e,n,r){return e[n](t.reduce(Gt(n),r))}function Gt(t){return function(e,n){return n[t]?n[t](e):e}}function $t(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments[2],i=arguments[3],o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:[],s=arguments.length>5&&void 0!==arguments[5]&&arguments[5],a=e[0],l=e.slice(1);if("string"==typeof a)$t(t,Hr[a],n,i,o,s);else if(a){var c=a(i);c.setSource(r({},t),function(e,r){if(e)return $t(t,l,n,i,o,s);o.push(c),$t(r,t.type===r.type?l:Hr[r.type],n,i,o,s)})}else l.length?$t(t,l,n,i,o,s):s?n(t,o):$t(t,Hr["*"],n,i,o,!0)}function Jt(t,e){return"rgba("+parseInt(t[1]+t[1],16)+","+parseInt(t[2]+t[2],16)+","+parseInt(t[3]+t[3],16)+","+e+")"}function Qt(t,e,n){try{t.style[e]=n}catch(t){return}}function Zt(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:t;t=t<0?0:t;var n=Math.floor(t%60),r=Math.floor(t/60%60),i=Math.floor(t/3600),o=Math.floor(e/60%60),s=Math.floor(e/3600);return(isNaN(t)||t===1/0)&&(i=r=n="-"),i=i>0||s>0?i+":":"",r=((i||o>=10)&&r<10?"0"+r:r)+":",n=n<10?"0"+n:n,i+r+n}function te(t,e){if(e&&(t=e(t)),t&&"none"!==t)return t}function ee(t,e){return te(t.options[t.options.selectedIndex].value,e)}function ne(t,e,n){if(e)for(var r=0;r<t.options.length;r++)if(te(t.options[r].value,n)===e){t.selectedIndex=r;break}}function re(t,e,n){var r=void 0;if("string"==typeof t){var o=re.getPlayers();if(0===t.indexOf("#")&&(t=t.slice(1)),o[t])return e&&Ye.warn('Player "'+t+'" is already initialised. Options will not be applied.'),n&&o[t].ready(n),o[t];r=Je("#"+t)}else r=t;if(!r||!r.nodeName)throw new TypeError("The element or ID supplied is not valid. (videojs)");if(r.player||po.players[r.playerId])return r.player||po.players[r.playerId];p(r)&&!de.body.contains(r)&&Ye.warn("The element supplied is not included in the DOM"),e=e||{},re.hooks("beforesetup").forEach(function(t){var n=t(r,tt(e));if(!i(n)||Array.isArray(n))return void Ye.error("please return an object in beforesetup hooks");e=tt(e,n)});var s=En.getComponent("Player"),a=new s(r,e,n);return re.hooks("setup").forEach(function(t){return t(a)}),a}var ie,oe="6.6.3",se="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};ie="undefined"!=typeof window?window:void 0!==se?se:"undefined"!=typeof self?self:{};var ae,le=ie,ce={},ue=(Object.freeze||Object)({default:ce}),he=ue&&ce||ue,pe=void 0!==se?se:"undefined"!=typeof window?window:{};"undefined"!=typeof document?ae=document:(ae=pe["__GLOBAL_DOCUMENT_CACHE@4"])||(ae=pe["__GLOBAL_DOCUMENT_CACHE@4"]=he);var de=ae,fe=le.navigator&&le.navigator.userAgent||"",ve=/AppleWebKit\/([\d.]+)/i.exec(fe),ye=ve?parseFloat(ve.pop()):null,ge=/iPad/i.test(fe),me=/iPhone/i.test(fe)&&!ge,_e=/iPod/i.test(fe),be=me||ge||_e,Te=function(){var t=fe.match(/OS (\d+)_/i);return t&&t[1]?t[1]:null}(),Ce=/Android/i.test(fe),ke=function(){var t=fe.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);if(!t)return null;var e=t[1]&&parseFloat(t[1]),n=t[2]&&parseFloat(t[2]);return e&&n?parseFloat(t[1]+"."+t[2]):e||null}(),Ee=Ce&&/webkit/i.test(fe)&&ke<2.3,we=Ce&&ke<5&&ye<537,Se=/Firefox/i.test(fe),xe=/Edge/i.test(fe),je=!xe&&/Chrome/i.test(fe),Ae=function(){var t=fe.match(/Chrome\/(\d+)/);return t&&t[1]?parseFloat(t[1]):null}(),Pe=/MSIE\s8\.0/.test(fe),Oe=function(){var t=/MSIE\s(\d+)\.\d/.exec(fe),e=t&&parseFloat(t[1]);return!e&&/Trident\/7.0/i.test(fe)&&/rv:11.0/.test(fe)&&(e=11),e}(),Ne=/Safari/i.test(fe)&&!je&&!Ce&&!xe,Me=Ne||be,Ie=h()&&("ontouchstart"in le||le.DocumentTouch&&le.document instanceof le.DocumentTouch),De=h()&&"backgroundSize"in le.document.createElement("video").style,Le=(Object.freeze||Object)({IS_IPAD:ge,IS_IPHONE:me,IS_IPOD:_e,IS_IOS:be,IOS_VERSION:Te,IS_ANDROID:Ce,ANDROID_VERSION:ke,IS_OLD_ANDROID:Ee,IS_NATIVE_ANDROID:we,IS_FIREFOX:Se,IS_EDGE:xe,IS_CHROME:je,CHROME_VERSION:Ae,IS_IE8:Pe,IE_VERSION:Oe,IS_SAFARI:Ne,IS_ANY_SAFARI:Me,TOUCH_ENABLED:Ie,BACKGROUND_SIZE_SUPPORTED:De}),Re="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Be=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},Fe=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},Ve=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},He=function(t,e){return t.raw=e,t},We=Object.prototype.toString,Ue=function(t){return i(t)?Object.keys(t):[]},ze=void 0,Xe="info",qe=[],Ke=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:!!Oe&&Oe<11,r=ze.levels[Xe],o=new RegExp("^("+r+")$");if("log"!==t&&e.unshift(t.toUpperCase()+":"),qe&&qe.push([].concat(e)),e.unshift("VIDEOJS:"),le.console){var s=le.console[t];s||"debug"!==t||(s=le.console.info||le.console.log),s&&r&&o.test(t)&&(n&&(e=e.map(function(t){if(i(t)||Array.isArray(t))try{return JSON.stringify(t)}catch(e){return String(t)}return String(t)}).join(" ")),s.apply?s[Array.isArray(e)?"apply":"call"](le.console,e):s(e))}};ze=function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];Ke("log",e)},ze.levels={all:"debug|log|warn|error",off:"",debug:"debug|log|warn|error",info:"log|warn|error",warn:"warn|error",error:"error",DEFAULT:Xe},ze.level=function(t){if("string"==typeof t){if(!ze.levels.hasOwnProperty(t))throw new Error('"'+t+'" in not a valid log level');Xe=t}return Xe},ze.history=function(){return qe?[].concat(qe):[]},ze.history.clear=function(){qe&&(qe.length=0)},ze.history.disable=function(){null!==qe&&(qe.length=0,qe=null)},ze.history.enable=function(){null===qe&&(qe=[])},ze.error=function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];return Ke("error",e)},ze.warn=function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];return Ke("warn",e)},ze.debug=function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];return Ke("debug",e)};var Ye=ze,Ge=function(t){for(var e="",n=0;n<arguments.length;n++)e+=s(t[n])+(arguments[n+1]||"");return e},$e=He(["Setting attributes in the second argument of createEl()\n                has been deprecated. Use the third argument instead.\n                createEl(type, properties, attributes). Attempting to set "," to ","."],["Setting attributes in the second argument of createEl()\n                has been deprecated. Use the third argument instead.\n                createEl(type, properties, attributes). Attempting to set "," to ","."]),Je=f("querySelector"),Qe=f("querySelectorAll"),Ze=(Object.freeze||Object)({isReal:h,isEl:p,isInFrame:d,createEl:v,textContent:y,prependTo:g,hasClass:m,addClass:_,removeClass:b,toggleClass:T,setAttributes:C,getAttributes:k,getAttribute:E,setAttribute:w,removeAttribute:S,blockTextSelection:x,
unblockTextSelection:j,getBoundingClientRect:A,findPosition:P,getPointerPosition:O,isTextNode:N,emptyEl:M,normalizeContent:I,appendContent:D,insertContent:L,isSingleLeftClick:R,$:Je,$$:Qe}),tn=1,en={},nn="vdata"+(new Date).getTime(),rn=!1;!function(){try{var t=Object.defineProperty({},"passive",{get:function(){rn=!0}});le.addEventListener("test",null,t),le.removeEventListener("test",null,t)}catch(t){}}();var on=["touchstart","touchmove"],sn=(Object.freeze||Object)({fixEvent:z,on:X,off:q,trigger:K,one:Y}),an=!1,ln=void 0,cn=function(){if(h()){var t=de.getElementsByTagName("video"),e=de.getElementsByTagName("audio"),n=de.getElementsByTagName("video-js"),r=[];if(t&&t.length>0)for(var i=0,o=t.length;i<o;i++)r.push(t[i]);if(e&&e.length>0)for(var s=0,a=e.length;s<a;s++)r.push(e[s]);if(n&&n.length>0)for(var l=0,c=n.length;l<c;l++)r.push(n[l]);if(r&&r.length>0)for(var u=0,p=r.length;u<p;u++){var d=r[u];if(!d||!d.getAttribute){G(1);break}if(void 0===d.player){var f=d.getAttribute("data-setup");null!==f&&ln(d)}}else an||G(1)}};h()&&"complete"===de.readyState?an=!0:Y(le,"load",function(){an=!0});var un=function(t){var e=de.createElement("style");return e.className=t,e},hn=function(t,e){t.styleSheet?t.styleSheet.cssText=e:t.textContent=e},pn=function(t,e,n){e.guid||(e.guid=B());var r=function(){return e.apply(t,arguments)};return r.guid=n?n+"_"+e.guid:e.guid,r},dn=function(t,e){var n=Date.now();return function(){var r=Date.now();r-n>=e&&(t.apply(void 0,arguments),n=r)}},fn=function(){};fn.prototype.allowedEvents_={},fn.prototype.on=function(t,e){var n=this.addEventListener;this.addEventListener=function(){},X(this,t,e),this.addEventListener=n},fn.prototype.addEventListener=fn.prototype.on,fn.prototype.off=function(t,e){q(this,t,e)},fn.prototype.removeEventListener=fn.prototype.off,fn.prototype.one=function(t,e){var n=this.addEventListener;this.addEventListener=function(){},Y(this,t,e),this.addEventListener=n},fn.prototype.trigger=function(t){var e=t.type||t;"string"==typeof t&&(t={type:e}),t=z(t),this.allowedEvents_[e]&&this["on"+e]&&this["on"+e](t),K(this,t)},fn.prototype.dispatchEvent=fn.prototype.trigger;var vn=function(t){return t instanceof fn||!!t.eventBusEl_&&["on","one","off","trigger"].every(function(e){return"function"==typeof t[e]})},yn=function(t){return"string"==typeof t&&/\S/.test(t)||Array.isArray(t)&&!!t.length},gn=function(t){if(!t.nodeName&&!vn(t))throw new Error("Invalid target; must be a DOM node or evented object.")},mn=function(t){if(!yn(t))throw new Error("Invalid event type; must be a non-empty string or array.")},_n=function(t){if("function"!=typeof t)throw new Error("Invalid listener; must be a function.")},bn=function(t,e){var n=e.length<3||e[0]===t||e[0]===t.eventBusEl_,r=void 0,i=void 0,o=void 0;return n?(r=t.eventBusEl_,e.length>=3&&e.shift(),i=e[0],o=e[1]):(r=e[0],i=e[1],o=e[2]),gn(r),mn(i),_n(o),o=pn(t,o),{isTargetingSelf:n,target:r,type:i,listener:o}},Tn=function(t,e,n,r){gn(t),t.nodeName?sn[e](t,n,r):t[e](n,r)},Cn={on:function(){for(var t=this,e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];var i=bn(this,n),o=i.isTargetingSelf,s=i.target,a=i.type,l=i.listener;if(Tn(s,"on",a,l),!o){var c=function(){return t.off(s,a,l)};c.guid=l.guid;var u=function(){return t.off("dispose",c)};u.guid=l.guid,Tn(this,"on","dispose",c),Tn(s,"on","dispose",u)}},one:function(){for(var t=this,e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];var i=bn(this,n),o=i.isTargetingSelf,s=i.target,a=i.type,l=i.listener;if(o)Tn(s,"one",a,l);else{var c=function e(){for(var n=arguments.length,r=Array(n),i=0;i<n;i++)r[i]=arguments[i];t.off(s,a,e),l.apply(null,r)};c.guid=l.guid,Tn(s,"one",a,c)}},off:function(t,e,n){if(!t||yn(t))q(this.eventBusEl_,t,e);else{var r=t,i=e;gn(r),mn(i),_n(n),n=pn(this,n),this.off("dispose",n),r.nodeName?(q(r,i,n),q(r,"dispose",n)):vn(r)&&(r.off(i,n),r.off("dispose",n))}},trigger:function(t,e){return K(this.eventBusEl_,t,e)}},kn={state:{},setState:function(t){var n=this;"function"==typeof t&&(t=t());var r=void 0;return e(t,function(t,e){n.state[e]!==t&&(r=r||{},r[e]={from:n.state[e],to:t}),n.state[e]=t}),r&&vn(this)&&this.trigger({changes:r,type:"statechanged"}),r}},En=function(){function t(e,n,r){if(Be(this,t),!e&&this.play?this.player_=e=this:this.player_=e,this.options_=tt({},this.options_),n=this.options_=tt(this.options_,n),this.id_=n.id||n.el&&n.el.id,!this.id_){var i=e&&e.id&&e.id()||"no_player";this.id_=i+"_component_"+B()}this.name_=n.name||null,n.el?this.el_=n.el:!1!==n.createEl&&(this.el_=this.createEl()),!1!==n.evented&&$(this,{eventBusKey:this.el_?"el_":null}),J(this,this.constructor.defaultState),this.children_=[],this.childIndex_={},this.childNameIndex_={},!1!==n.initChildren&&this.initChildren(),this.ready(r),!1!==n.reportTouchActivity&&this.enableTouchActivity()}return t.prototype.dispose=function(){if(this.trigger({type:"dispose",bubbles:!1}),this.children_)for(var t=this.children_.length-1;t>=0;t--)this.children_[t].dispose&&this.children_[t].dispose();this.children_=null,this.childIndex_=null,this.childNameIndex_=null,this.el_&&(this.el_.parentNode&&this.el_.parentNode.removeChild(this.el_),H(this.el_),this.el_=null),this.player_=null},t.prototype.player=function(){return this.player_},t.prototype.options=function(t){return Ye.warn("this.options() has been deprecated and will be moved to the constructor in 6.0"),t?(this.options_=tt(this.options_,t),this.options_):this.options_},t.prototype.el=function(){return this.el_},t.prototype.createEl=function(t,e,n){return v(t,e,n)},t.prototype.localize=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:t,r=this.player_.language&&this.player_.language(),i=this.player_.languages&&this.player_.languages(),o=i&&i[r],s=r&&r.split("-")[0],a=i&&i[s],l=n;return o&&o[t]?l=o[t]:a&&a[t]&&(l=a[t]),e&&(l=l.replace(/\{(\d+)\}/g,function(t,n){var r=e[n-1],i=r;return void 0===r&&(i=t),i})),l},t.prototype.contentEl=function(){return this.contentEl_||this.el_},t.prototype.id=function(){return this.id_},t.prototype.name=function(){return this.name_},t.prototype.children=function(){return this.children_},t.prototype.getChildById=function(t){return this.childIndex_[t]},t.prototype.getChild=function(t){if(t)return t=Q(t),this.childNameIndex_[t]},t.prototype.addChild=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this.children_.length,i=void 0,o=void 0;if("string"==typeof e){o=Q(e);var s=n.componentClass||o;n.name=o;var a=t.getComponent(s);if(!a)throw new Error("Component "+s+" does not exist");if("function"!=typeof a)return null;i=new a(this.player_||this,n)}else i=e;if(this.children_.splice(r,0,i),"function"==typeof i.id&&(this.childIndex_[i.id()]=i),o=o||i.name&&Q(i.name()),o&&(this.childNameIndex_[o]=i),"function"==typeof i.el&&i.el()){var l=this.contentEl().children,c=l[r]||null;this.contentEl().insertBefore(i.el(),c)}return i},t.prototype.removeChild=function(t){if("string"==typeof t&&(t=this.getChild(t)),t&&this.children_){for(var e=!1,n=this.children_.length-1;n>=0;n--)if(this.children_[n]===t){e=!0,this.children_.splice(n,1);break}if(e){this.childIndex_[t.id()]=null,this.childNameIndex_[t.name()]=null;var r=t.el();r&&r.parentNode===this.contentEl()&&this.contentEl().removeChild(t.el())}}},t.prototype.initChildren=function(){var e=this,n=this.options_.children;if(n){var r=this.options_,i=function(t){var n=t.name,i=t.opts;if(void 0!==r[n]&&(i=r[n]),!1!==i){!0===i&&(i={}),i.playerOptions=e.options_.playerOptions;var o=e.addChild(n,i);o&&(e[n]=o)}},o=void 0,s=t.getComponent("Tech");o=Array.isArray(n)?n:Object.keys(n),o.concat(Object.keys(this.options_).filter(function(t){return!o.some(function(e){return"string"==typeof e?t===e:t===e.name})})).map(function(t){var r=void 0,i=void 0;return"string"==typeof t?(r=t,i=n[r]||e.options_[r]||{}):(r=t.name,i=t),{name:r,opts:i}}).filter(function(e){var n=t.getComponent(e.opts.componentClass||Q(e.name));return n&&!s.isTech(n)}).forEach(i)}},t.prototype.buildCSSClass=function(){return""},t.prototype.ready=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(t)return this.isReady_?void(e?t.call(this):this.setTimeout(t,1)):(this.readyQueue_=this.readyQueue_||[],void this.readyQueue_.push(t))},t.prototype.triggerReady=function(){this.isReady_=!0,this.setTimeout(function(){var t=this.readyQueue_;this.readyQueue_=[],t&&t.length>0&&t.forEach(function(t){t.call(this)},this),this.trigger("ready")},1)},t.prototype.$=function(t,e){return Je(t,e||this.contentEl())},t.prototype.$$=function(t,e){return Qe(t,e||this.contentEl())},t.prototype.hasClass=function(t){return m(this.el_,t)},t.prototype.addClass=function(t){_(this.el_,t)},t.prototype.removeClass=function(t){b(this.el_,t)},t.prototype.toggleClass=function(t,e){T(this.el_,t,e)},t.prototype.show=function(){this.removeClass("vjs-hidden")},t.prototype.hide=function(){this.addClass("vjs-hidden")},t.prototype.lockShowing=function(){this.addClass("vjs-lock-showing")},t.prototype.unlockShowing=function(){this.removeClass("vjs-lock-showing")},t.prototype.getAttribute=function(t){return E(this.el_,t)},t.prototype.setAttribute=function(t,e){w(this.el_,t,e)},t.prototype.removeAttribute=function(t){S(this.el_,t)},t.prototype.width=function(t,e){return this.dimension("width",t,e)},t.prototype.height=function(t,e){return this.dimension("height",t,e)},t.prototype.dimensions=function(t,e){this.width(t,!0),this.height(e)},t.prototype.dimension=function(t,e,n){if(void 0!==e)return null!==e&&e===e||(e=0),-1!==(""+e).indexOf("%")||-1!==(""+e).indexOf("px")?this.el_.style[t]=e:this.el_.style[t]="auto"===e?"":e+"px",void(n||this.trigger("componentresize"));if(!this.el_)return 0;var r=this.el_.style[t],i=r.indexOf("px");return-1!==i?parseInt(r.slice(0,i),10):parseInt(this.el_["offset"+Q(t)],10)},t.prototype.currentDimension=function(t){var e=0;if("width"!==t&&"height"!==t)throw new Error("currentDimension only accepts width or height value");if("function"==typeof le.getComputedStyle){var n=le.getComputedStyle(this.el_);e=n.getPropertyValue(t)||n[t]}if(0===(e=parseFloat(e))){var r="offset"+Q(t);e=this.el_[r]}return e},t.prototype.currentDimensions=function(){return{width:this.currentDimension("width"),height:this.currentDimension("height")}},t.prototype.currentWidth=function(){return this.currentDimension("width")},t.prototype.currentHeight=function(){return this.currentDimension("height")},t.prototype.focus=function(){this.el_.focus()},t.prototype.blur=function(){this.el_.blur()},t.prototype.emitTapEvents=function(){var t=0,e=null,n=void 0;this.on("touchstart",function(r){1===r.touches.length&&(e={pageX:r.touches[0].pageX,pageY:r.touches[0].pageY},t=(new Date).getTime(),n=!0)}),this.on("touchmove",function(t){if(t.touches.length>1)n=!1;else if(e){var r=t.touches[0].pageX-e.pageX,i=t.touches[0].pageY-e.pageY,o=Math.sqrt(r*r+i*i);o>10&&(n=!1)}});var r=function(){n=!1};this.on("touchleave",r),this.on("touchcancel",r),this.on("touchend",function(r){if(e=null,!0===n){(new Date).getTime()-t<200&&(r.preventDefault(),this.trigger("tap"))}})},t.prototype.enableTouchActivity=function(){if(this.player()&&this.player().reportUserActivity){var t=pn(this.player(),this.player().reportUserActivity),e=void 0;this.on("touchstart",function(){t(),this.clearInterval(e),e=this.setInterval(t,250)});var n=function(n){t(),this.clearInterval(e)};this.on("touchmove",t),this.on("touchend",n),this.on("touchcancel",n)}},t.prototype.setTimeout=function(t,e){var n=this;t=pn(this,t);var r=le.setTimeout(t,e),i=function(){return n.clearTimeout(r)};return i.guid="vjs-timeout-"+r,this.on("dispose",i),r},t.prototype.clearTimeout=function(t){le.clearTimeout(t);var e=function(){};return e.guid="vjs-timeout-"+t,this.off("dispose",e),t},t.prototype.setInterval=function(t,e){var n=this;t=pn(this,t);var r=le.setInterval(t,e),i=function(){return n.clearInterval(r)};return i.guid="vjs-interval-"+r,this.on("dispose",i),r},t.prototype.clearInterval=function(t){le.clearInterval(t);var e=function(){};return e.guid="vjs-interval-"+t,this.off("dispose",e),t},t.prototype.requestAnimationFrame=function(t){var e=this;if(this.supportsRaf_){t=pn(this,t);var n=le.requestAnimationFrame(t),r=function(){return e.cancelAnimationFrame(n)};return r.guid="vjs-raf-"+n,this.on("dispose",r),n}return this.setTimeout(t,1e3/60)},t.prototype.cancelAnimationFrame=function(t){if(this.supportsRaf_){le.cancelAnimationFrame(t);var e=function(){};return e.guid="vjs-raf-"+t,this.off("dispose",e),t}return this.clearTimeout(t)},t.registerComponent=function(e,n){if("string"!=typeof e||!e)throw new Error('Illegal component name, "'+e+'"; must be a non-empty string.');var r=t.getComponent("Tech"),i=r&&r.isTech(n),o=t===n||t.prototype.isPrototypeOf(n.prototype);if(i||!o){var s=void 0;throw s=i?"techs must be registered using Tech.registerTech()":"must be a Component subclass",new Error('Illegal component, "'+e+'"; '+s+".")}e=Q(e),t.components_||(t.components_={});var a=t.getComponent("Player");if("Player"===e&&a&&a.players){var l=a.players,c=Object.keys(l);if(l&&c.length>0&&c.map(function(t){return l[t]}).every(Boolean))throw new Error("Can not register Player component after player has been created.")}return t.components_[e]=n,n},t.getComponent=function(e){if(e)return e=Q(e),t.components_&&t.components_[e]?t.components_[e]:void 0},t}();En.prototype.supportsRaf_="function"==typeof le.requestAnimationFrame&&"function"==typeof le.cancelAnimationFrame,En.registerComponent("Component",En);for(var wn={},Sn=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],xn=Sn[0],jn=void 0,An=0;An<Sn.length;An++)if(Sn[An][1]in de){jn=Sn[An];break}if(jn)for(var Pn=0;Pn<jn.length;Pn++)wn[xn[Pn]]=jn[Pn];st.prototype.code=0,st.prototype.message="",st.prototype.status=null,st.errorTypes=["MEDIA_ERR_CUSTOM","MEDIA_ERR_ABORTED","MEDIA_ERR_NETWORK","MEDIA_ERR_DECODE","MEDIA_ERR_SRC_NOT_SUPPORTED","MEDIA_ERR_ENCRYPTED"],st.defaultMessages={1:"You aborted the media playback",2:"A network error caused the media download to fail part-way.",3:"The media playback was aborted due to a corruption problem or because the media used features your browser did not support.",4:"The media could not be loaded, either because the server or network failed or because the format is not supported.",5:"The media is encrypted and we do not have the keys to decrypt it."};for(var On=0;On<st.errorTypes.length;On++)st[st.errorTypes[On]]=On,st.prototype[st.errorTypes[On]]=On;var Nn=at,Mn=function(t){return["kind","label","language","id","inBandMetadataTrackDispatchType","mode","src"].reduce(function(e,n,r){return t[n]&&(e[n]=t[n]),e},{cues:t.cues&&Array.prototype.map.call(t.cues,function(t){return{startTime:t.startTime,endTime:t.endTime,text:t.text,id:t.id}})})},In=function(t){var e=t.$$("track"),n=Array.prototype.map.call(e,function(t){return t.track});return Array.prototype.map.call(e,function(t){var e=Mn(t.track);return t.src&&(e.src=t.src),e}).concat(Array.prototype.filter.call(t.textTracks(),function(t){return-1===n.indexOf(t)}).map(Mn))},Dn=function(t,e){return t.forEach(function(t){var n=e.addRemoteTextTrack(t).track;!t.src&&t.cues&&t.cues.forEach(function(t){return n.addCue(t)})}),e.textTracks()},Ln={textTracksToJson:In,jsonToTextTracks:Dn,trackToJson_:Mn},Rn="vjs-modal-dialog",Bn=function(t){function e(n,r){Be(this,e);var i=Ve(this,t.call(this,n,r));return i.opened_=i.hasBeenOpened_=i.hasBeenFilled_=!1,i.closeable(!i.options_.uncloseable),i.content(i.options_.content),i.contentEl_=v("div",{className:Rn+"-content"},{role:"document"}),i.descEl_=v("p",{className:Rn+"-description vjs-control-text",id:i.el().getAttribute("aria-describedby")}),y(i.descEl_,i.description()),i.el_.appendChild(i.descEl_),i.el_.appendChild(i.contentEl_),i}return Fe(e,t),e.prototype.createEl=function(){return t.prototype.createEl.call(this,"div",{className:this.buildCSSClass(),tabIndex:-1},{"aria-describedby":this.id()+"_description","aria-hidden":"true","aria-label":this.label(),role:"dialog"})},e.prototype.dispose=function(){this.contentEl_=null,this.descEl_=null,this.previouslyActiveEl_=null,t.prototype.dispose.call(this)},e.prototype.buildCSSClass=function(){return Rn+" vjs-hidden "+t.prototype.buildCSSClass.call(this)},e.prototype.handleKeyPress=function(t){27===t.which&&this.closeable()&&this.close()},e.prototype.label=function(){return this.localize(this.options_.label||"Modal Window")},e.prototype.description=function(){var t=this.options_.description||this.localize("This is a modal window.");return this.closeable()&&(t+=" "+this.localize("This modal can be closed by pressing the Escape key or activating the close button.")),t},e.prototype.open=function(){if(!this.opened_){var t=this.player();this.trigger("beforemodalopen"),this.opened_=!0,(this.options_.fillAlways||!this.hasBeenOpened_&&!this.hasBeenFilled_)&&this.fill(),this.wasPlaying_=!t.paused(),this.options_.pauseOnOpen&&this.wasPlaying_&&t.pause(),this.closeable()&&this.on(this.el_.ownerDocument,"keydown",pn(this,this.handleKeyPress)),this.hadControls_=t.controls(),t.controls(!1),this.show(),this.conditionalFocus_(),this.el().setAttribute("aria-hidden","false"),this.trigger("modalopen"),this.hasBeenOpened_=!0}},e.prototype.opened=function(t){return"boolean"==typeof t&&this[t?"open":"close"](),this.opened_},e.prototype.close=function(){if(this.opened_){var t=this.player();this.trigger("beforemodalclose"),this.opened_=!1,this.wasPlaying_&&this.options_.pauseOnOpen&&t.play(),this.closeable()&&this.off(this.el_.ownerDocument,"keydown",pn(this,this.handleKeyPress)),this.hadControls_&&t.controls(!0),this.hide(),this.el().setAttribute("aria-hidden","true"),this.trigger("modalclose"),this.conditionalBlur_(),this.options_.temporary&&this.dispose()}},e.prototype.closeable=function(t){if("boolean"==typeof t){var e=this.closeable_=!!t,n=this.getChild("closeButton");if(e&&!n){var r=this.contentEl_;this.contentEl_=this.el_,n=this.addChild("closeButton",{controlText:"Close Modal Dialog"}),this.contentEl_=r,this.on(n,"close",this.close)}!e&&n&&(this.off(n,"close",this.close),this.removeChild(n),n.dispose())}return this.closeable_},e.prototype.fill=function(){this.fillWith(this.content())},e.prototype.fillWith=function(t){var e=this.contentEl(),n=e.parentNode,r=e.nextSibling;this.trigger("beforemodalfill"),this.hasBeenFilled_=!0,n.removeChild(e),this.empty(),L(e,t),this.trigger("modalfill"),r?n.insertBefore(e,r):n.appendChild(e);var i=this.getChild("closeButton");i&&n.appendChild(i.el_)},e.prototype.empty=function(){this.trigger("beforemodalempty"),M(this.contentEl()),this.trigger("modalempty")},e.prototype.content=function(t){return void 0!==t&&(this.content_=t),this.content_},e.prototype.conditionalFocus_=function(){var t=de.activeElement,e=this.player_.el_;this.previouslyActiveEl_=null,(e.contains(t)||e===t)&&(this.previouslyActiveEl_=t,this.focus(),this.on(de,"keydown",this.handleKeyDown))},e.prototype.conditionalBlur_=function(){this.previouslyActiveEl_&&(this.previouslyActiveEl_.focus(),this.previouslyActiveEl_=null),this.off(de,"keydown",this.handleKeyDown)},e.prototype.handleKeyDown=function(t){if(9===t.which){for(var e=this.focusableEls_(),n=this.el_.querySelector(":focus"),r=void 0,i=0;i<e.length;i++)if(n===e[i]){r=i;break}de.activeElement===this.el_&&(r=0),t.shiftKey&&0===r?(e[e.length-1].focus(),t.preventDefault()):t.shiftKey||r!==e.length-1||(e[0].focus(),t.preventDefault())}},e.prototype.focusableEls_=function(){var t=this.el_.querySelectorAll("*");return Array.prototype.filter.call(t,function(t){return(t instanceof le.HTMLAnchorElement||t instanceof le.HTMLAreaElement)&&t.hasAttribute("href")||(t instanceof le.HTMLInputElement||t instanceof le.HTMLSelectElement||t instanceof le.HTMLTextAreaElement||t instanceof le.HTMLButtonElement)&&!t.hasAttribute("disabled")||t instanceof le.HTMLIFrameElement||t instanceof le.HTMLObjectElement||t instanceof le.HTMLEmbedElement||t.hasAttribute("tabindex")&&-1!==t.getAttribute("tabindex")||t.hasAttribute("contenteditable")})},e}(En);Bn.prototype.options_={pauseOnOpen:!0,temporary:!0},En.registerComponent("ModalDialog",Bn);var Fn=function(t){function e(){var n,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;Be(this,e);var o=Ve(this,t.call(this));if(!i&&(i=o,Pe)){i=de.createElement("custom");for(var s in e.prototype)"constructor"!==s&&(i[s]=e.prototype[s])}i.tracks_=[],Object.defineProperty(i,"length",{get:function(){return this.tracks_.length}});for(var a=0;a<r.length;a++)i.addTrack(r[a]);return n=i,Ve(o,n)}return Fe(e,t),e.prototype.addTrack=function(t){var e=this.tracks_.length;""+e in this||Object.defineProperty(this,e,{get:function(){return this.tracks_[e]}}),-1===this.tracks_.indexOf(t)&&(this.tracks_.push(t),this.trigger({track:t,type:"addtrack"}))},e.prototype.removeTrack=function(t){for(var e=void 0,n=0,r=this.length;n<r;n++)if(this[n]===t){e=this[n],e.off&&e.off(),this.tracks_.splice(n,1);break}e&&this.trigger({track:e,type:"removetrack"})},e.prototype.getTrackById=function(t){for(var e=null,n=0,r=this.length;n<r;n++){var i=this[n];if(i.id===t){e=i;break}}return e},e}(fn);Fn.prototype.allowedEvents_={change:"change",addtrack:"addtrack",removetrack:"removetrack"};for(var Vn in Fn.prototype.allowedEvents_)Fn.prototype["on"+Vn]=null;var Hn=function(t,e){for(var n=0;n<t.length;n++)Object.keys(t[n]).length&&e.id!==t[n].id&&(t[n].enabled=!1)},Wn=function(t){function e(){var n,r,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];Be(this,e);for(var o=void 0,s=i.length-1;s>=0;s--)if(i[s].enabled){Hn(i,i[s]);break}if(Pe){o=de.createElement("custom");for(var a in Fn.prototype)"constructor"!==a&&(o[a]=Fn.prototype[a]);for(var l in e.prototype)"constructor"!==l&&(o[l]=e.prototype[l])}return o=n=Ve(this,t.call(this,i,o)),o.changing_=!1,r=o,Ve(n,r)}return Fe(e,t),e.prototype.addTrack=function(e){var n=this;e.enabled&&Hn(this,e),t.prototype.addTrack.call(this,e),e.addEventListener&&e.addEventListener("enabledchange",function(){n.changing_||(n.changing_=!0,Hn(n,e),n.changing_=!1,n.trigger("change"))})},e}(Fn),Un=function(t,e){for(var n=0;n<t.length;n++)Object.keys(t[n]).length&&e.id!==t[n].id&&(t[n].selected=!1)},zn=function(t){function e(){var n,r,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];Be(this,e);for(var o=void 0,s=i.length-1;s>=0;s--)if(i[s].selected){Un(i,i[s]);break}if(Pe){o=de.createElement("custom");for(var a in Fn.prototype)"constructor"!==a&&(o[a]=Fn.prototype[a]);for(var l in e.prototype)"constructor"!==l&&(o[l]=e.prototype[l])}return o=n=Ve(this,t.call(this,i,o)),o.changing_=!1,Object.defineProperty(o,"selectedIndex",{get:function(){for(var t=0;t<this.length;t++)if(this[t].selected)return t;return-1},set:function(){}}),r=o,Ve(n,r)}return Fe(e,t),e.prototype.addTrack=function(e){var n=this;e.selected&&Un(this,e),t.prototype.addTrack.call(this,e),e.addEventListener&&e.addEventListener("selectedchange",function(){n.changing_||(n.changing_=!0,Un(n,e),n.changing_=!1,n.trigger("change"))})},e}(Fn),Xn=function(t){function e(){var n,r,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];Be(this,e);var o=void 0;if(Pe){o=de.createElement("custom");for(var s in Fn.prototype)"constructor"!==s&&(o[s]=Fn.prototype[s]);for(var a in e.prototype)"constructor"!==a&&(o[a]=e.prototype[a])}return o=n=Ve(this,t.call(this,i,o)),r=o,Ve(n,r)}return Fe(e,t),e.prototype.addTrack=function(e){t.prototype.addTrack.call(this,e),e.addEventListener("modechange",pn(this,function(){this.trigger("change")})),-1===["metadata","chapters"].indexOf(e.kind)&&e.addEventListener("modechange",pn(this,function(){this.trigger("selectedlanguagechange")}))},e}(Fn),qn=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];Be(this,t);var n=this;if(Pe){n=de.createElement("custom");for(var r in t.prototype)"constructor"!==r&&(n[r]=t.prototype[r])}n.trackElements_=[],Object.defineProperty(n,"length",{get:function(){return this.trackElements_.length}});for(var i=0,o=e.length;i<o;i++)n.addTrackElement_(e[i]);if(Pe)return n}return t.prototype.addTrackElement_=function(t){var e=this.trackElements_.length;""+e in this||Object.defineProperty(this,e,{get:function(){return this.trackElements_[e]}}),-1===this.trackElements_.indexOf(t)&&this.trackElements_.push(t)},t.prototype.getTrackElementByTrack_=function(t){for(var e=void 0,n=0,r=this.trackElements_.length;n<r;n++)if(t===this.trackElements_[n].track){e=this.trackElements_[n];break}return e},t.prototype.removeTrackElement_=function(t){for(var e=0,n=this.trackElements_.length;e<n;e++)if(t===this.trackElements_[e]){this.trackElements_.splice(e,1);break}},t}(),Kn=function(){function t(e){Be(this,t);var n=this;if(Pe){n=de.createElement("custom");for(var r in t.prototype)"constructor"!==r&&(n[r]=t.prototype[r])}if(t.prototype.setCues_.call(n,e),Object.defineProperty(n,"length",{get:function(){return this.length_}}),Pe)return n}return t.prototype.setCues_=function(t){var e=this.length||0,n=0,r=t.length;this.cues_=t,this.length_=t.length;var i=function(t){""+t in this||Object.defineProperty(this,""+t,{get:function(){return this.cues_[t]}})};if(e<r)for(n=e;n<r;n++)i.call(this,n)},t.prototype.getCueById=function(t){for(var e=null,n=0,r=this.length;n<r;n++){var i=this[n];if(i.id===t){e=i;break}}return e},t}(),Yn={alternative:"alternative",captions:"captions",main:"main",sign:"sign",subtitles:"subtitles",commentary:"commentary"},Gn={alternative:"alternative",descriptions:"descriptions",main:"main","main-desc":"main-desc",translation:"translation",commentary:"commentary"},$n={subtitles:"subtitles",captions:"captions",descriptions:"descriptions",chapters:"chapters",metadata:"metadata"},Jn={disabled:"disabled",hidden:"hidden",showing:"showing"},Qn=function(t){function e(){var n,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Be(this,e);var i=Ve(this,t.call(this)),o=i;if(Pe){o=de.createElement("custom");for(var s in e.prototype)"constructor"!==s&&(o[s]=e.prototype[s])}var a={id:r.id||"vjs_track_"+B(),kind:r.kind||"",label:r.label||"",language:r.language||""};for(var l in a)!function(t){Object.defineProperty(o,t,{get:function(){return a[t]},set:function(){}})}(l);return n=o,Ve(i,n)}return Fe(e,t),e}(fn),Zn=function(t){var e=["protocol","hostname","port","pathname","search","hash","host"],n=de.createElement("a");n.href=t;var r=""===n.host&&"file:"!==n.protocol,i=void 0;r&&(i=de.createElement("div"),i.innerHTML='<a href="'+t+'"></a>',n=i.firstChild,i.setAttribute("style","display:none; position:absolute;"),de.body.appendChild(i));for(var o={},s=0;s<e.length;s++)o[e[s]]=n[e[s]];return"http:"===o.protocol&&(o.host=o.host.replace(/:80$/,"")),"https:"===o.protocol&&(o.host=o.host.replace(/:443$/,"")),o.protocol||(o.protocol=le.location.protocol),r&&de.body.removeChild(i),o},tr=function(t){if(!t.match(/^https?:\/\//)){var e=de.createElement("div");e.innerHTML='<a href="'+t+'">x</a>',t=e.firstChild.href}return t},er=function(t){if("string"==typeof t){var e=/^(\/?)([\s\S]*?)((?:\.{1,2}|[^\/]+?)(\.([^\.\/\?]+)))(?:[\/]*|[\?].*)$/i,n=e.exec(t);if(n)return n.pop().toLowerCase()}return""},nr=function(t){var e=le.location,n=Zn(t);return(":"===n.protocol?e.protocol:n.protocol)+n.host!==e.protocol+e.host},rr=(Object.freeze||Object)({parseUrl:Zn,getAbsoluteURL:tr,getFileExtension:er,isCrossOrigin:nr}),ir=ut,or=Object.prototype.toString,sr=t(function(t,e){function n(t){return t.replace(/^\s*|\s*$/g,"")}e=t.exports=n,e.left=function(t){return t.replace(/^\s*/,"")},e.right=function(t){return t.replace(/\s*$/,"")}}),ar=ht,lr=Object.prototype.toString,cr=Object.prototype.hasOwnProperty,ur=function(t){return"[object Array]"===Object.prototype.toString.call(t)},hr=function(t){if(!t)return{};var e={};return ar(sr(t).split("\n"),function(t){var n=t.indexOf(":"),r=sr(t.slice(0,n)).toLowerCase(),i=sr(t.slice(n+1));void 0===e[r]?e[r]=i:ur(e[r])?e[r].push(i):e[r]=[e[r],i]}),e},pr=vt,dr=Object.prototype.hasOwnProperty,fr=mt;mt.XMLHttpRequest=le.XMLHttpRequest||Tt,mt.XDomainRequest="withCredentials"in new mt.XMLHttpRequest?mt.XMLHttpRequest:le.XDomainRequest,function(t,e){for(var n=0;n<t.length;n++)e(t[n])}(["get","put","post","patch","head","delete"],function(t){mt["delete"===t?"del":t]=function(e,n,r){return n=gt(e,n,r),n.method=t.toUpperCase(),_t(n)}});var vr=function(t,e){var n=new le.WebVTT.Parser(le,le.vttjs,le.WebVTT.StringDecoder()),r=[];n.oncue=function(t){e.addCue(t)},n.onparsingerror=function(t){r.push(t)},n.onflush=function(){e.trigger({type:"loadeddata",target:e})},n.parse(t),r.length>0&&(le.console&&le.console.groupCollapsed&&le.console.groupCollapsed("Text Track parsing errors for "+e.src),r.forEach(function(t){return Ye.error(t)}),le.console&&le.console.groupEnd&&le.console.groupEnd()),n.flush()},yr=function(t,e){var n={uri:t},r=nr(t);r&&(n.cors=r),fr(n,pn(this,function(t,n,r){if(t)return Ye.error(t,n);if(e.loaded_=!0,"function"!=typeof le.WebVTT){if(e.tech_){var i=function(){return vr(r,e)};e.tech_.on("vttjsloaded",i),e.tech_.on("vttjserror",function(){Ye.error("vttjs failed to load, stopping trying to process "+e.src),e.tech_.off("vttjsloaded",i)})}}else vr(r,e)}))},gr=function(t){function e(){var n,r,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(Be(this,e),!i.tech)throw new Error("A tech was not provided.");var o=tt(i,{kind:$n[i.kind]||"subtitles",language:i.language||i.srclang||""}),s=Jn[o.mode]||"disabled",a=o.default;"metadata"!==o.kind&&"chapters"!==o.kind||(s="hidden");var l=n=Ve(this,t.call(this,o));if(l.tech_=o.tech,Pe)for(var c in e.prototype)"constructor"!==c&&(l[c]=e.prototype[c]);l.cues_=[],l.activeCues_=[];var u=new Kn(l.cues_),h=new Kn(l.activeCues_),p=!1,d=pn(l,function(){this.activeCues,p&&(this.trigger("cuechange"),p=!1)});return"disabled"!==s&&l.tech_.ready(function(){l.tech_.on("timeupdate",d)},!0),Object.defineProperty(l,"default",{get:function(){return a},set:function(){}}),Object.defineProperty(l,"mode",{get:function(){return s},set:function(t){var e=this;Jn[t]&&(s=t,"showing"===s&&this.tech_.ready(function(){e.tech_.on("timeupdate",d)},!0),this.trigger("modechange"))}}),Object.defineProperty(l,"cues",{get:function(){return this.loaded_?u:null},set:function(){}}),Object.defineProperty(l,"activeCues",{get:function(){if(!this.loaded_)return null;if(0===this.cues.length)return h;for(var t=this.tech_.currentTime(),e=[],n=0,r=this.cues.length;n<r;n++){var i=this.cues[n];i.startTime<=t&&i.endTime>=t?e.push(i):i.startTime===i.endTime&&i.startTime<=t&&i.startTime+.5>=t&&e.push(i)}if(p=!1,e.length!==this.activeCues_.length)p=!0;else for(var o=0;o<e.length;o++)-1===this.activeCues_.indexOf(e[o])&&(p=!0);return this.activeCues_=e,h.setCues_(this.activeCues_),h},set:function(){}}),o.src?(l.src=o.src,yr(o.src,l)):l.loaded_=!0,r=l,Ve(n,r)}return Fe(e,t),e.prototype.addCue=function(t){var e=t;if(le.vttjs&&!(t instanceof le.vttjs.VTTCue)){e=new le.vttjs.VTTCue(t.startTime,t.endTime,t.text);for(var n in t)n in e||(e[n]=t[n]);e.id=t.id,e.originalCue_=t}for(var r=this.tech_.textTracks(),i=0;i<r.length;i++)r[i]!==this&&r[i].removeCue(e);this.cues_.push(e),this.cues.setCues_(this.cues_)},e.prototype.removeCue=function(t){for(var e=this.cues_.length;e--;){var n=this.cues_[e];if(n===t||n.originalCue_&&n.originalCue_===t){this.cues_.splice(e,1),this.cues.setCues_(this.cues_);break}}},e}(Qn)
;gr.prototype.allowedEvents_={cuechange:"cuechange"};var mr=function(t){function e(){var n,r,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Be(this,e);var o=tt(i,{kind:Gn[i.kind]||""}),s=n=Ve(this,t.call(this,o)),a=!1;if(Pe)for(var l in e.prototype)"constructor"!==l&&(s[l]=e.prototype[l]);return Object.defineProperty(s,"enabled",{get:function(){return a},set:function(t){"boolean"==typeof t&&t!==a&&(a=t,this.trigger("enabledchange"))}}),o.enabled&&(s.enabled=o.enabled),s.loaded_=!0,r=s,Ve(n,r)}return Fe(e,t),e}(Qn),_r=function(t){function e(){var n,r,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Be(this,e);var o=tt(i,{kind:Yn[i.kind]||""}),s=n=Ve(this,t.call(this,o)),a=!1;if(Pe)for(var l in e.prototype)"constructor"!==l&&(s[l]=e.prototype[l]);return Object.defineProperty(s,"selected",{get:function(){return a},set:function(t){"boolean"==typeof t&&t!==a&&(a=t,this.trigger("selectedchange"))}}),o.selected&&(s.selected=o.selected),r=s,Ve(n,r)}return Fe(e,t),e}(Qn),br=0,Tr=2,Cr=function(t){function e(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Be(this,e);var r=Ve(this,t.call(this)),i=void 0,o=r;if(Pe){o=de.createElement("custom");for(var s in e.prototype)"constructor"!==s&&(o[s]=e.prototype[s])}var a=new gr(n);if(o.kind=a.kind,o.src=a.src,o.srclang=a.language,o.label=a.label,o.default=a.default,Object.defineProperty(o,"readyState",{get:function(){return i}}),Object.defineProperty(o,"track",{get:function(){return a}}),i=br,a.addEventListener("loadeddata",function(){i=Tr,o.trigger({type:"load",target:o})}),Pe){var l;return l=o,Ve(r,l)}return r}return Fe(e,t),e}(fn);Cr.prototype.allowedEvents_={load:"load"},Cr.NONE=br,Cr.LOADING=1,Cr.LOADED=Tr,Cr.ERROR=3;var kr={audio:{ListClass:Wn,TrackClass:mr,capitalName:"Audio"},video:{ListClass:zn,TrackClass:_r,capitalName:"Video"},text:{ListClass:Xn,TrackClass:gr,capitalName:"Text"}};Object.keys(kr).forEach(function(t){kr[t].getterName=t+"Tracks",kr[t].privateName=t+"Tracks_"});var Er={remoteText:{ListClass:Xn,TrackClass:gr,capitalName:"RemoteText",getterName:"remoteTextTracks",privateName:"remoteTextTracks_"},remoteTextEl:{ListClass:qn,TrackClass:Cr,capitalName:"RemoteTextTrackEls",getterName:"remoteTextTrackEls",privateName:"remoteTextTrackEls_"}},wr=tt(kr,Er);Er.names=Object.keys(Er),kr.names=Object.keys(kr),wr.names=[].concat(Er.names).concat(kr.names);var Sr=Object.create||function(){function t(){}return function(e){if(1!==arguments.length)throw new Error("Object.create shim only accepts one parameter.");return t.prototype=e,new t}}();Ct.prototype=Sr(Error.prototype),Ct.prototype.constructor=Ct,Ct.Errors={BadSignature:{code:0,message:"Malformed WebVTT signature."},BadTimeStamp:{code:1,message:"Malformed time stamp."}},Et.prototype={set:function(t,e){this.get(t)||""===e||(this.values[t]=e)},get:function(t,e,n){return n?this.has(t)?this.values[t]:e[n]:this.has(t)?this.values[t]:e},has:function(t){return t in this.values},alt:function(t,e,n){for(var r=0;r<n.length;++r)if(e===n[r]){this.set(t,e);break}},integer:function(t,e){/^-?\d+$/.test(e)&&this.set(t,parseInt(e,10))},percent:function(t,e){return!!(e.match(/^([\d]{1,3})(\.[\d]*)?%$/)&&(e=parseFloat(e))>=0&&e<=100)&&(this.set(t,e),!0)}};var xr={"&amp;":"&","&lt;":"<","&gt;":">","&lrm;":"‎","&rlm;":"‏","&nbsp;":" "},jr={c:"span",i:"i",b:"b",u:"u",ruby:"ruby",rt:"rt",v:"span",lang:"span"},Ar={v:"title",lang:"lang"},Pr={rt:"ruby"},Or=[[1470,1470],[1472,1472],[1475,1475],[1478,1478],[1488,1514],[1520,1524],[1544,1544],[1547,1547],[1549,1549],[1563,1563],[1566,1610],[1645,1647],[1649,1749],[1765,1766],[1774,1775],[1786,1805],[1807,1808],[1810,1839],[1869,1957],[1969,1969],[1984,2026],[2036,2037],[2042,2042],[2048,2069],[2074,2074],[2084,2084],[2088,2088],[2096,2110],[2112,2136],[2142,2142],[2208,2208],[2210,2220],[8207,8207],[64285,64285],[64287,64296],[64298,64310],[64312,64316],[64318,64318],[64320,64321],[64323,64324],[64326,64449],[64467,64829],[64848,64911],[64914,64967],[65008,65020],[65136,65140],[65142,65276],[67584,67589],[67592,67592],[67594,67637],[67639,67640],[67644,67644],[67647,67669],[67671,67679],[67840,67867],[67872,67897],[67903,67903],[67968,68023],[68030,68031],[68096,68096],[68112,68115],[68117,68119],[68121,68147],[68160,68167],[68176,68184],[68192,68223],[68352,68405],[68416,68437],[68440,68466],[68472,68479],[68608,68680],[126464,126467],[126469,126495],[126497,126498],[126500,126500],[126503,126503],[126505,126514],[126516,126519],[126521,126521],[126523,126523],[126530,126530],[126535,126535],[126537,126537],[126539,126539],[126541,126543],[126545,126546],[126548,126548],[126551,126551],[126553,126553],[126555,126555],[126557,126557],[126559,126559],[126561,126562],[126564,126564],[126567,126570],[126572,126578],[126580,126583],[126585,126588],[126590,126590],[126592,126601],[126603,126619],[126625,126627],[126629,126633],[126635,126651],[1114109,1114109]];Ot.prototype.applyStyles=function(t,e){e=e||this.div;for(var n in t)t.hasOwnProperty(n)&&(e.style[n]=t[n])},Ot.prototype.formatStyle=function(t,e){return 0===t?0:t+e},Nt.prototype=Sr(Ot.prototype),Nt.prototype.constructor=Nt,Mt.prototype.move=function(t,e){switch(e=void 0!==e?e:this.lineHeight,t){case"+x":this.left+=e,this.right+=e;break;case"-x":this.left-=e,this.right-=e;break;case"+y":this.top+=e,this.bottom+=e;break;case"-y":this.top-=e,this.bottom-=e}},Mt.prototype.overlaps=function(t){return this.left<t.right&&this.right>t.left&&this.top<t.bottom&&this.bottom>t.top},Mt.prototype.overlapsAny=function(t){for(var e=0;e<t.length;e++)if(this.overlaps(t[e]))return!0;return!1},Mt.prototype.within=function(t){return this.top>=t.top&&this.bottom<=t.bottom&&this.left>=t.left&&this.right<=t.right},Mt.prototype.overlapsOppositeAxis=function(t,e){switch(e){case"+x":return this.left<t.left;case"-x":return this.right>t.right;case"+y":return this.top<t.top;case"-y":return this.bottom>t.bottom}},Mt.prototype.intersectPercentage=function(t){return Math.max(0,Math.min(this.right,t.right)-Math.max(this.left,t.left))*Math.max(0,Math.min(this.bottom,t.bottom)-Math.max(this.top,t.top))/(this.height*this.width)},Mt.prototype.toCSSCompatValues=function(t){return{top:this.top-t.top,bottom:t.bottom-this.bottom,left:this.left-t.left,right:t.right-this.right,height:this.height,width:this.width}},Mt.getSimpleBoxPosition=function(t){var e=t.div?t.div.offsetHeight:t.tagName?t.offsetHeight:0,n=t.div?t.div.offsetWidth:t.tagName?t.offsetWidth:0,r=t.div?t.div.offsetTop:t.tagName?t.offsetTop:0;return t=t.div?t.div.getBoundingClientRect():t.tagName?t.getBoundingClientRect():t,{left:t.left,right:t.right,top:t.top||r,height:t.height||e,bottom:t.bottom||r+(t.height||e),width:t.width||n}},Dt.StringDecoder=function(){return{decode:function(t){if(!t)return"";if("string"!=typeof t)throw new Error("Error - expected string data.");return decodeURIComponent(encodeURIComponent(t))}}},Dt.convertCueToDOMTree=function(t,e){return t&&e?xt(t,e):null};Dt.processCues=function(t,e,n){if(!t||!e||!n)return null;for(;n.firstChild;)n.removeChild(n.firstChild);var r=t.document.createElement("div");if(r.style.position="absolute",r.style.left="0",r.style.right="0",r.style.top="0",r.style.bottom="0",r.style.margin="1.5%",n.appendChild(r),function(t){for(var e=0;e<t.length;e++)if(t[e].hasBeenReset||!t[e].displayState)return!0;return!1}(e)){var i=[],o=Mt.getSimpleBoxPosition(r),s=Math.round(.05*o.height*100)/100,a={font:s+"px sans-serif"};!function(){for(var n,s,l=0;l<e.length;l++)s=e[l],n=new Nt(t,s,a),r.appendChild(n.div),It(t,n,o,i),s.displayState=n.div,i.push(Mt.getSimpleBoxPosition(n))}()}else for(var l=0;l<e.length;l++)r.appendChild(e[l].displayState)},Dt.Parser=function(t,e,n){n||(n=e,e={}),e||(e={}),this.window=t,this.vttjs=e,this.state="INITIAL",this.buffer="",this.decoder=n||new TextDecoder("utf8"),this.regionList=[]},Dt.Parser.prototype={reportOrThrowError:function(t){if(!(t instanceof Ct))throw t;this.onparsingerror&&this.onparsingerror(t)},parse:function(t){function e(){for(var t=i.buffer,e=0;e<t.length&&"\r"!==t[e]&&"\n"!==t[e];)++e;var n=t.substr(0,e);return"\r"===t[e]&&++e,"\n"===t[e]&&++e,i.buffer=t.substr(e),n}function n(t){var e=new Et;if(wt(t,function(t,n){switch(t){case"id":e.set(t,n);break;case"width":e.percent(t,n);break;case"lines":e.integer(t,n);break;case"regionanchor":case"viewportanchor":var r=n.split(",");if(2!==r.length)break;var i=new Et;if(i.percent("x",r[0]),i.percent("y",r[1]),!i.has("x")||!i.has("y"))break;e.set(t+"X",i.get("x")),e.set(t+"Y",i.get("y"));break;case"scroll":e.alt(t,n,["up"])}},/=/,/\s/),e.has("id")){var n=new(i.vttjs.VTTRegion||i.window.VTTRegion);n.width=e.get("width",100),n.lines=e.get("lines",3),n.regionAnchorX=e.get("regionanchorX",0),n.regionAnchorY=e.get("regionanchorY",100),n.viewportAnchorX=e.get("viewportanchorX",0),n.viewportAnchorY=e.get("viewportanchorY",100),n.scroll=e.get("scroll",""),i.onregion&&i.onregion(n),i.regionList.push({id:e.get("id"),region:n})}}function r(t){var e=new Et;wt(t,function(t,n){switch(t){case"MPEGT":e.integer(t+"S",n);break;case"LOCA":e.set(t+"L",kt(n))}},/[^\d]:/,/,/),i.ontimestampmap&&i.ontimestampmap({MPEGTS:e.get("MPEGTS"),LOCAL:e.get("LOCAL")})}var i=this;t&&(i.buffer+=i.decoder.decode(t,{stream:!0}));try{var o;if("INITIAL"===i.state){if(!/\r\n|\n/.test(i.buffer))return this;o=e();var s=o.match(/^WEBVTT([ \t].*)?$/);if(!s||!s[0])throw new Ct(Ct.Errors.BadSignature);i.state="HEADER"}for(var a=!1;i.buffer;){if(!/\r\n|\n/.test(i.buffer))return this;switch(a?a=!1:o=e(),i.state){case"HEADER":/:/.test(o)?function(t){t.match(/X-TIMESTAMP-MAP/)?wt(t,function(t,e){switch(t){case"X-TIMESTAMP-MAP":r(e)}},/=/):wt(t,function(t,e){switch(t){case"Region":n(e)}},/:/)}(o):o||(i.state="ID");continue;case"NOTE":o||(i.state="ID");continue;case"ID":if(/^NOTE($|[ \t])/.test(o)){i.state="NOTE";break}if(!o)continue;if(i.cue=new(i.vttjs.VTTCue||i.window.VTTCue)(0,0,""),i.state="CUE",-1===o.indexOf("--\x3e")){i.cue.id=o;continue}case"CUE":try{St(o,i.cue,i.regionList)}catch(t){i.reportOrThrowError(t),i.cue=null,i.state="BADCUE";continue}i.state="CUETEXT";continue;case"CUETEXT":var l=-1!==o.indexOf("--\x3e");if(!o||l&&(a=!0)){i.oncue&&i.oncue(i.cue),i.cue=null,i.state="ID";continue}i.cue.text&&(i.cue.text+="\n"),i.cue.text+=o;continue;case"BADCUE":o||(i.state="ID");continue}}}catch(t){i.reportOrThrowError(t),"CUETEXT"===i.state&&i.cue&&i.oncue&&i.oncue(i.cue),i.cue=null,i.state="INITIAL"===i.state?"BADWEBVTT":"BADCUE"}return this},flush:function(){var t=this;try{if(t.buffer+=t.decoder.decode(),(t.cue||"HEADER"===t.state)&&(t.buffer+="\n\n",t.parse()),"INITIAL"===t.state)throw new Ct(Ct.Errors.BadSignature)}catch(e){t.reportOrThrowError(e)}return t.onflush&&t.onflush(),this}};var Nr=Dt,Mr="auto",Ir={"":!0,lr:!0,rl:!0},Dr={start:!0,middle:!0,end:!0,left:!0,right:!0};Ft.prototype.getCueAsHTML=function(){return WebVTT.convertCueToDOMTree(window,this.text)};var Lr=Ft,Rr={"":!0,up:!0},Br=Wt,Fr=t(function(t){var e=t.exports={WebVTT:Nr,VTTCue:Lr,VTTRegion:Br};le.vttjs=e,le.WebVTT=e.WebVTT;var n=e.VTTCue,r=e.VTTRegion,i=le.VTTCue,o=le.VTTRegion;e.shim=function(){le.VTTCue=n,le.VTTRegion=r},e.restore=function(){le.VTTCue=i,le.VTTRegion=o},le.VTTCue||e.shim()}),Vr=function(t){function e(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};Be(this,e),n.reportTouchActivity=!1;var i=Ve(this,t.call(this,null,n,r));return i.hasStarted_=!1,i.on("playing",function(){this.hasStarted_=!0}),i.on("loadstart",function(){this.hasStarted_=!1}),wr.names.forEach(function(t){var e=wr[t];n&&n[e.getterName]&&(i[e.privateName]=n[e.getterName])}),i.featuresProgressEvents||i.manualProgressOn(),i.featuresTimeupdateEvents||i.manualTimeUpdatesOn(),["Text","Audio","Video"].forEach(function(t){!1===n["native"+t+"Tracks"]&&(i["featuresNative"+t+"Tracks"]=!1)}),!1===n.nativeCaptions||!1===n.nativeTextTracks?i.featuresNativeTextTracks=!1:!0!==n.nativeCaptions&&!0!==n.nativeTextTracks||(i.featuresNativeTextTracks=!0),i.featuresNativeTextTracks||i.emulateTextTracks(),i.autoRemoteTextTracks_=new wr.text.ListClass,i.initTrackListeners(),n.nativeControlsForTouch||i.emitTapEvents(),i.constructor&&(i.name_=i.constructor.name||"Unknown Tech"),i}return Fe(e,t),e.prototype.manualProgressOn=function(){this.on("durationchange",this.onDurationChange),this.manualProgress=!0,this.one("ready",this.trackProgress)},e.prototype.manualProgressOff=function(){this.manualProgress=!1,this.stopTrackingProgress(),this.off("durationchange",this.onDurationChange)},e.prototype.trackProgress=function(t){this.stopTrackingProgress(),this.progressInterval=this.setInterval(pn(this,function(){var t=this.bufferedPercent();this.bufferedPercent_!==t&&this.trigger("progress"),this.bufferedPercent_=t,1===t&&this.stopTrackingProgress()}),500)},e.prototype.onDurationChange=function(t){this.duration_=this.duration()},e.prototype.buffered=function(){return it(0,0)},e.prototype.bufferedPercent=function(){return ot(this.buffered(),this.duration_)},e.prototype.stopTrackingProgress=function(){this.clearInterval(this.progressInterval)},e.prototype.manualTimeUpdatesOn=function(){this.manualTimeUpdates=!0,this.on("play",this.trackCurrentTime),this.on("pause",this.stopTrackingCurrentTime)},e.prototype.manualTimeUpdatesOff=function(){this.manualTimeUpdates=!1,this.stopTrackingCurrentTime(),this.off("play",this.trackCurrentTime),this.off("pause",this.stopTrackingCurrentTime)},e.prototype.trackCurrentTime=function(){this.currentTimeInterval&&this.stopTrackingCurrentTime(),this.currentTimeInterval=this.setInterval(function(){this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})},250)},e.prototype.stopTrackingCurrentTime=function(){this.clearInterval(this.currentTimeInterval),this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})},e.prototype.dispose=function(){this.clearTracks(kr.names),this.manualProgress&&this.manualProgressOff(),this.manualTimeUpdates&&this.manualTimeUpdatesOff(),t.prototype.dispose.call(this)},e.prototype.clearTracks=function(t){var e=this;t=[].concat(t),t.forEach(function(t){for(var n=e[t+"Tracks"]()||[],r=n.length;r--;){var i=n[r];"text"===t&&e.removeRemoteTextTrack(i),n.removeTrack(i)}})},e.prototype.cleanupAutoTextTracks=function(){for(var t=this.autoRemoteTextTracks_||[],e=t.length;e--;){var n=t[e];this.removeRemoteTextTrack(n)}},e.prototype.reset=function(){},e.prototype.error=function(t){return void 0!==t&&(this.error_=new st(t),this.trigger("error")),this.error_},e.prototype.played=function(){return this.hasStarted_?it(0,0):it()},e.prototype.setCurrentTime=function(){this.manualTimeUpdates&&this.trigger({type:"timeupdate",target:this,manuallyTriggered:!0})},e.prototype.initTrackListeners=function(){var t=this;kr.names.forEach(function(e){var n=kr[e],r=function(){t.trigger(e+"trackchange")},i=t[n.getterName]();i.addEventListener("removetrack",r),i.addEventListener("addtrack",r),t.on("dispose",function(){i.removeEventListener("removetrack",r),i.removeEventListener("addtrack",r)})})},e.prototype.addWebVttScript_=function(){var t=this;if(!le.WebVTT)if(de.body.contains(this.el())){if(!this.options_["vtt.js"]&&o(Fr)&&Object.keys(Fr).length>0)return void this.trigger("vttjsloaded");var e=de.createElement("script");e.src=this.options_["vtt.js"]||"https://vjs.zencdn.net/vttjs/0.12.4/vtt.min.js",e.onload=function(){t.trigger("vttjsloaded")},e.onerror=function(){t.trigger("vttjserror")},this.on("dispose",function(){e.onload=null,e.onerror=null}),le.WebVTT=!0,this.el().parentNode.appendChild(e)}else this.ready(this.addWebVttScript_)},e.prototype.emulateTextTracks=function(){var t=this,e=this.textTracks(),n=this.remoteTextTracks(),r=function(t){return e.addTrack(t.track)},i=function(t){return e.removeTrack(t.track)};n.on("addtrack",r),n.on("removetrack",i),this.addWebVttScript_();var o=function(){return t.trigger("texttrackchange")},s=function(){o();for(var t=0;t<e.length;t++){var n=e[t];n.removeEventListener("cuechange",o),"showing"===n.mode&&n.addEventListener("cuechange",o)}};s(),e.addEventListener("change",s),e.addEventListener("addtrack",s),e.addEventListener("removetrack",s),this.on("dispose",function(){n.off("addtrack",r),n.off("removetrack",i),e.removeEventListener("change",s),e.removeEventListener("addtrack",s),e.removeEventListener("removetrack",s);for(var t=0;t<e.length;t++){e[t].removeEventListener("cuechange",o)}})},e.prototype.addTextTrack=function(t,e,n){if(!t)throw new Error("TextTrack kind is required but was not provided");return Ut(this,t,e,n)},e.prototype.createRemoteTextTrack=function(t){var e=tt(t,{tech:this});return new Er.remoteTextEl.TrackClass(e)},e.prototype.addRemoteTextTrack=function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments[1],r=this.createRemoteTextTrack(e);return!0!==n&&!1!==n&&(Ye.warn('Calling addRemoteTextTrack without explicitly setting the "manualCleanup" parameter to `true` is deprecated and default to `false` in future version of video.js'),n=!0),this.remoteTextTrackEls().addTrackElement_(r),this.remoteTextTracks().addTrack(r.track),!0!==n&&this.ready(function(){return t.autoRemoteTextTracks_.addTrack(r.track)}),r},e.prototype.removeRemoteTextTrack=function(t){var e=this.remoteTextTrackEls().getTrackElementByTrack_(t);this.remoteTextTrackEls().removeTrackElement_(e),this.remoteTextTracks().removeTrack(t),this.autoRemoteTextTracks_.removeTrack(t)},e.prototype.getVideoPlaybackQuality=function(){return{}},e.prototype.setPoster=function(){},e.prototype.playsinline=function(){},e.prototype.setPlaysinline=function(){},e.prototype.canPlayType=function(){return""},e.canPlayType=function(){return""},e.canPlaySource=function(t,n){return e.canPlayType(t.type)},e.isTech=function(t){return t.prototype instanceof e||t instanceof e||t===e},e.registerTech=function(t,n){if(e.techs_||(e.techs_={}),!e.isTech(n))throw new Error("Tech "+t+" must be a Tech");if(!e.canPlayType)throw new Error("Techs must have a static canPlayType method on them");if(!e.canPlaySource)throw new Error("Techs must have a static canPlaySource method on them");return t=Q(t),e.techs_[t]=n,"Tech"!==t&&e.defaultTechOrder_.push(t),n},e.getTech=function(t){if(t)return t=Q(t),e.techs_&&e.techs_[t]?e.techs_[t]:le&&le.videojs&&le.videojs[t]?(Ye.warn("The "+t+" tech was added to the videojs object when it should be registered using videojs.registerTech(name, tech)"),le.videojs[t]):void 0},e}(En);wr.names.forEach(function(t){var e=wr[t];Vr.prototype[e.getterName]=function(){return this[e.privateName]=this[e.privateName]||new e.ListClass,this[e.privateName]}}),Vr.prototype.featuresVolumeControl=!0,Vr.prototype.featuresFullscreenResize=!1,Vr.prototype.featuresPlaybackRate=!1,Vr.prototype.featuresProgressEvents=!1,Vr.prototype.featuresTimeupdateEvents=!1,Vr.prototype.featuresNativeTextTracks=!1,Vr.withSourceHandlers=function(t){t.registerSourceHandler=function(e,n){var r=t.sourceHandlers;r||(r=t.sourceHandlers=[]),void 0===n&&(n=r.length),r.splice(n,0,e)},t.canPlayType=function(e){for(var n=t.sourceHandlers||[],r=void 0,i=0;i<n.length;i++)if(r=n[i].canPlayType(e))return r;return""},t.selectSourceHandler=function(e,n){for(var r=t.sourceHandlers||[],i=0;i<r.length;i++)if(r[i].canHandleSource(e,n))return r[i];return null},t.canPlaySource=function(e,n){var r=t.selectSourceHandler(e,n);return r?r.canHandleSource(e,n):""},["seekable","duration"].forEach(function(t){var e=this[t];"function"==typeof e&&(this[t]=function(){return this.sourceHandler_&&this.sourceHandler_[t]?this.sourceHandler_[t].apply(this.sourceHandler_,arguments):e.apply(this,arguments)})},t.prototype),t.prototype.setSource=function(e){var n=t.selectSourceHandler(e,this.options_);n||(t.nativeSourceHandler?n=t.nativeSourceHandler:Ye.error("No source hander found for the current source.")),this.disposeSourceHandler(),this.off("dispose",this.disposeSourceHandler),n!==t.nativeSourceHandler&&(this.currentSource_=e),this.sourceHandler_=n.handleSource(e,this,this.options_),this.on("dispose",this.disposeSourceHandler)},t.prototype.disposeSourceHandler=function(){this.currentSource_&&(this.clearTracks(["audio","video"]),this.currentSource_=null),this.cleanupAutoTextTracks(),this.sourceHandler_&&(this.sourceHandler_.dispose&&this.sourceHandler_.dispose(),this.sourceHandler_=null)}},En.registerComponent("Tech",Vr),Vr.registerTech("Tech",Vr),Vr.defaultTechOrder_=[];var Hr={},Wr={buffered:1,currentTime:1,duration:1,seekable:1,played:1},Ur={setCurrentTime:1},zr=function t(e){if(Array.isArray(e)){var n=[];e.forEach(function(e){e=t(e),Array.isArray(e)?n=n.concat(e):i(e)&&n.push(e)}),e=n}else e="string"==typeof e&&e.trim()?[{src:e}]:i(e)&&"string"==typeof e.src&&e.src&&e.src.trim()?[e]:[];return e},Xr=function(t){function e(n,r,i){Be(this,e);var o=tt({createEl:!1},r),s=Ve(this,t.call(this,n,o,i));if(r.playerOptions.sources&&0!==r.playerOptions.sources.length)n.src(r.playerOptions.sources);else for(var a=0,l=r.playerOptions.techOrder;a<l.length;a++){var c=Q(l[a]),u=Vr.getTech(c);if(c||(u=En.getComponent(c)),u&&u.isSupported()){n.loadTech_(c);break}}return s}return Fe(e,t),e}(En);En.registerComponent("MediaLoader",Xr);var qr=function(t){function e(n,r){Be(this,e);var i=Ve(this,t.call(this,n,r));return i.emitTapEvents(),i.enable(),i}return Fe(e,t),e.prototype.createEl=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"div",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};n=r({innerHTML:'<span aria-hidden="true" class="vjs-icon-placeholder"></span>',className:this.buildCSSClass(),tabIndex:0},n),"button"===e&&Ye.error("Creating a ClickableComponent with an HTML element of "+e+" is not supported; use a Button instead."),i=r({role:"button","aria-live":"polite"},i),this.tabIndex_=n.tabIndex;var o=t.prototype.createEl.call(this,e,n,i);return this.createControlTextEl(o),o},e.prototype.dispose=function(){this.controlTextEl_=null,t.prototype.dispose.call(this)},e.prototype.createControlTextEl=function(t){return this.controlTextEl_=v("span",{className:"vjs-control-text"}),t&&t.appendChild(this.controlTextEl_),this.controlText(this.controlText_,t),this.controlTextEl_},e.prototype.controlText=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.el();if(void 0===t)return this.controlText_||"Need Text";var n=this.localize(t);this.controlText_=t,y(this.controlTextEl_,n),this.nonIconControl||e.setAttribute("title",n)},e.prototype.buildCSSClass=function(){return"vjs-control vjs-button "+t.prototype.buildCSSClass.call(this)},e.prototype.enable=function(){this.enabled_||(this.enabled_=!0,this.removeClass("vjs-disabled"),this.el_.setAttribute("aria-disabled","false"),void 0!==this.tabIndex_&&this.el_.setAttribute("tabIndex",this.tabIndex_),this.on(["tap","click"],this.handleClick),this.on("focus",this.handleFocus),this.on("blur",this.handleBlur))},e.prototype.disable=function(){this.enabled_=!1,this.addClass("vjs-disabled"),this.el_.setAttribute("aria-disabled","true"),void 0!==this.tabIndex_&&this.el_.removeAttribute("tabIndex"),this.off(["tap","click"],this.handleClick),this.off("focus",this.handleFocus),this.off("blur",this.handleBlur)},e.prototype.handleClick=function(t){},e.prototype.handleFocus=function(t){X(de,"keydown",pn(this,this.handleKeyPress))},e.prototype.handleKeyPress=function(e){32===e.which||13===e.which?(e.preventDefault(),this.trigger("click")):t.prototype.handleKeyPress&&t.prototype.handleKeyPress.call(this,e)},e.prototype.handleBlur=function(t){q(de,"keydown",pn(this,this.handleKeyPress))},e}(En);En.registerComponent("ClickableComponent",qr);var Kr=function(t){function e(n,r){Be(this,e);var i=Ve(this,t.call(this,n,r));return i.update(),n.on("posterchange",pn(i,i.update)),i}return Fe(e,t),e.prototype.dispose=function(){this.player().off("posterchange",this.update),t.prototype.dispose.call(this)},e.prototype.createEl=function(){var t=v("div",{className:"vjs-poster",tabIndex:-1});return De||(this.fallbackImg_=v("img"),t.appendChild(this.fallbackImg_)),t},e.prototype.update=function(t){var e=this.player().poster();this.setSrc(e),e?this.show():this.hide()},e.prototype.setSrc=function(t){if(this.fallbackImg_)this.fallbackImg_.src=t;else{var e="";t&&(e='url("'+t+'")'),this.el_.style.backgroundImage=e}},e.prototype.handleClick=function(t){this.player_.controls()&&(this.player_.paused()?this.player_.play():this.player_.pause())},e}(qr);En.registerComponent("PosterImage",Kr);var Yr={monospace:"monospace",sansSerif:"sans-serif",serif:"serif",monospaceSansSerif:'"Andale Mono", "Lucida Console", monospace',monospaceSerif:'"Courier New", monospace',proportionalSansSerif:"sans-serif",proportionalSerif:"serif",casual:'"Comic Sans MS", Impact, fantasy',script:'"Monotype Corsiva", cursive',smallcaps:'"Andale Mono", "Lucida Console", monospace, sans-serif'},Gr=function(t){function e(n,r,i){Be(this,e);var o=Ve(this,t.call(this,n,r,i));return n.on("loadstart",pn(o,o.toggleDisplay)),n.on("texttrackchange",pn(o,o.updateDisplay)),n.on("loadstart",pn(o,o.preselectTrack)),n.ready(pn(o,function(){if(n.tech_&&n.tech_.featuresNativeTextTracks)return void this.hide();n.on("fullscreenchange",pn(this,this.updateDisplay));for(var t=this.options_.playerOptions.tracks||[],e=0;e<t.length;e++)this.player_.addRemoteTextTrack(t[e],!0);this.preselectTrack()})),o}return Fe(e,t),e.prototype.preselectTrack=function(){for(var t={captions:1,subtitles:1},e=this.player_.textTracks(),n=this.player_.cache_.selectedLanguage,r=void 0,i=void 0,o=void 0,s=0;s<e.length;s++){var a=e[s];n&&n.enabled&&n.language===a.language?a.kind===n.kind?o=a:o||(o=a):n&&!n.enabled?(o=null,r=null,i=null):a.default&&("descriptions"!==a.kind||r?a.kind in t&&!i&&(i=a):r=a)}o?o.mode="showing":i?i.mode="showing":r&&(r.mode="showing")},e.prototype.toggleDisplay=function(){this.player_.tech_&&this.player_.tech_.featuresNativeTextTracks?this.hide():this.show()},e.prototype.createEl=function(){return t.prototype.createEl.call(this,"div",{className:"vjs-text-track-display"},{"aria-live":"off","aria-atomic":"true"})},e.prototype.clearDisplay=function(){"function"==typeof le.WebVTT&&le.WebVTT.processCues(le,[],this.el_)},e.prototype.updateDisplay=function(){var t=this.player_.textTracks();this.clearDisplay();for(var e=null,n=null,r=t.length;r--;){var i=t[r];"showing"===i.mode&&("descriptions"===i.kind?e=i:n=i)}n?("off"!==this.getAttribute("aria-live")&&this.setAttribute("aria-live","off"),this.updateForTrack(n)):e&&("assertive"!==this.getAttribute("aria-live")&&this.setAttribute("aria-live","assertive"),this.updateForTrack(e))},e.prototype.updateForTrack=function(t){if("function"==typeof le.WebVTT&&t.activeCues){for(var e=this.player_.textTrackSettings.getValues(),n=[],r=0;r<t.activeCues.length;r++)n.push(t.activeCues[r]);le.WebVTT.processCues(le,n,this.el_);for(var i=n.length;i--;){var o=n[i];if(o){var s=o.displayState;if(e.color&&(s.firstChild.style.color=e.color),e.textOpacity&&Qt(s.firstChild,"color",Jt(e.color||"#fff",e.textOpacity)),e.backgroundColor&&(s.firstChild.style.backgroundColor=e.backgroundColor),e.backgroundOpacity&&Qt(s.firstChild,"backgroundColor",Jt(e.backgroundColor||"#000",e.backgroundOpacity)),e.windowColor&&(e.windowOpacity?Qt(s,"backgroundColor",Jt(e.windowColor,e.windowOpacity)):s.style.backgroundColor=e.windowColor),e.edgeStyle&&("dropshadow"===e.edgeStyle?s.firstChild.style.textShadow="2px 2px 3px #222, 2px 2px 4px #222, 2px 2px 5px #222":"raised"===e.edgeStyle?s.firstChild.style.textShadow="1px 1px #222, 2px 2px #222, 3px 3px #222":"depressed"===e.edgeStyle?s.firstChild.style.textShadow="1px 1px #ccc, 0 1px #ccc, -1px -1px #222, 0 -1px #222":"uniform"===e.edgeStyle&&(s.firstChild.style.textShadow="0 0 4px #222, 0 0 4px #222, 0 0 4px #222, 0 0 4px #222")),e.fontPercent&&1!==e.fontPercent){var a=le.parseFloat(s.style.fontSize);s.style.fontSize=a*e.fontPercent+"px",s.style.height="auto",s.style.top="auto",s.style.bottom="2px"}e.fontFamily&&"default"!==e.fontFamily&&("small-caps"===e.fontFamily?s.firstChild.style.fontVariant="small-caps":s.firstChild.style.fontFamily=Yr[e.fontFamily])}}}},e}(En);En.registerComponent("TextTrackDisplay",Gr);var $r=function(t){function e(){return Be(this,e),Ve(this,t.apply(this,arguments))}return Fe(e,t),e.prototype.createEl=function(){return t.prototype.createEl.call(this,"div",{className:"vjs-loading-spinner",dir:"ltr"})},e}(En);En.registerComponent("LoadingSpinner",$r);var Jr=function(t){function e(){return Be(this,e),Ve(this,t.apply(this,arguments))}return Fe(e,t),e.prototype.createEl=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};t="button",e=r({innerHTML:'<span aria-hidden="true" class="vjs-icon-placeholder"></span>',className:this.buildCSSClass()},e),n=r({type:"button","aria-live":"polite"},n);var i=En.prototype.createEl.call(this,t,e,n);return this.createControlTextEl(i),i},e.prototype.addChild=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=this.constructor.name;return Ye.warn("Adding an actionable (user controllable) child to a Button ("+n+") is not supported; use a ClickableComponent instead."),En.prototype.addChild.call(this,t,e)},e.prototype.enable=function(){t.prototype.enable.call(this),this.el_.removeAttribute("disabled")},e.prototype.disable=function(){t.prototype.disable.call(this),this.el_.setAttribute("disabled","disabled")},e.prototype.handleKeyPress=function(e){32!==e.which&&13!==e.which&&t.prototype.handleKeyPress.call(this,e)},e}(qr);En.registerComponent("Button",Jr);var Qr=function(t){function e(n,r){Be(this,e);var i=Ve(this,t.call(this,n,r));return i.mouseused_=!1,i.on("mousedown",i.handleMouseDown),i}return Fe(e,t),e.prototype.buildCSSClass=function(){return"vjs-big-play-button"},e.prototype.handleClick=function(t){var e=this.player_.play();if(!(this.mouseused_&&t.clientX&&t.clientY)){var n=this.player_.getChild("controlBar"),r=n&&n.getChild("playToggle");if(!r)return void this.player_.focus();var i=function(){return r.focus()};lt(e)?e.then(i,function(){}):this.setTimeout(i,1)}},e.prototype.handleKeyPress=function(e){this.mouseused_=!1,t.prototype.handleKeyPress.call(this,e)},e.prototype.handleMouseDown=function(t){this.mouseused_=!0},e}(Jr);Qr.prototype.controlText_="Play Video",En.registerComponent("BigPlayButton",Qr);var Zr=function(t){function e(n,r){Be(this,e);var i=Ve(this,t.call(this,n,r));return i.controlText(r&&r.controlText||i.localize("Close")),i}return Fe(e,t),e.prototype.buildCSSClass=function(){return"vjs-close-button "+t.prototype.buildCSSClass.call(this)},e.prototype.handleClick=function(t){this.trigger({type:"close",bubbles:!1})},e}(Jr);En.registerComponent("CloseButton",Zr);var ti=function(t){function e(n,r){Be(this,e);var i=Ve(this,t.call(this,n,r));return i.on(n,"play",i.handlePlay),i.on(n,"pause",i.handlePause),i.on(n,"ended",i.handleEnded),i}return Fe(e,t),e.prototype.buildCSSClass=function(){return"vjs-play-control "+t.prototype.buildCSSClass.call(this)},e.prototype.handleClick=function(t){this.player_.paused()?this.player_.play():this.player_.pause()},e.prototype.handleSeeked=function(t){this.removeClass("vjs-ended"),this.player_.paused()?this.handlePause(t):this.handlePlay(t)},e.prototype.handlePlay=function(t){this.removeClass("vjs-ended"),this.removeClass("vjs-paused"),this.addClass("vjs-playing"),this.controlText("Pause")},e.prototype.handlePause=function(t){this.removeClass("vjs-playing"),this.addClass("vjs-paused"),this.controlText("Play")},e.prototype.handleEnded=function(t){this.removeClass("vjs-playing"),this.addClass("vjs-ended"),this.controlText("Replay"),this.one(this.player_,"seeked",this.handleSeeked)},e}(Jr);ti.prototype.controlText_="Play",En.registerComponent("PlayToggle",ti);var ei=function(t){function e(n,r){Be(this,e);var i=Ve(this,t.call(this,n,r));return i.throttledUpdateContent=dn(pn(i,i.updateContent),25),i.on(n,"timeupdate",i.throttledUpdateContent),i}return Fe(e,t),e.prototype.createEl=function(e){
var n=this.buildCSSClass(),r=t.prototype.createEl.call(this,"div",{className:n+" vjs-time-control vjs-control"});return this.contentEl_=v("div",{className:n+"-display"},{"aria-live":"off"},v("span",{className:"vjs-control-text",textContent:this.localize(this.controlText_)})),this.updateTextNode_(),r.appendChild(this.contentEl_),r},e.prototype.dispose=function(){this.contentEl_=null,this.textNode_=null,t.prototype.dispose.call(this)},e.prototype.updateTextNode_=function(){if(this.contentEl_){for(;this.contentEl_.firstChild;)this.contentEl_.removeChild(this.contentEl_.firstChild);this.textNode_=de.createTextNode(this.formattedTime_||"0:00"),this.contentEl_.appendChild(this.textNode_)}},e.prototype.formatTime_=function(t){return Zt(t)},e.prototype.updateFormattedTime_=function(t){var e=this.formatTime_(t);e!==this.formattedTime_&&(this.formattedTime_=e,this.requestAnimationFrame(this.updateTextNode_))},e.prototype.updateContent=function(t){},e}(En);ei.prototype.controlText_="Time",En.registerComponent("TimeDisplay",ei);var ni=function(t){function e(n,r){Be(this,e);var i=Ve(this,t.call(this,n,r));return i.on(n,"ended",i.handleEnded),i}return Fe(e,t),e.prototype.buildCSSClass=function(){return"vjs-current-time"},e.prototype.updateContent=function(t){var e=this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime();this.updateFormattedTime_(e)},e.prototype.handleEnded=function(t){this.player_.duration()&&this.updateFormattedTime_(this.player_.duration())},e}(ei);ni.prototype.controlText_="Current Time",En.registerComponent("CurrentTimeDisplay",ni);var ri=function(t){function e(n,r){Be(this,e);var i=Ve(this,t.call(this,n,r));return i.on(n,"durationchange",i.updateContent),i.on(n,"loadedmetadata",i.throttledUpdateContent),i}return Fe(e,t),e.prototype.buildCSSClass=function(){return"vjs-duration"},e.prototype.updateContent=function(t){var e=this.player_.duration();e&&this.duration_!==e&&(this.duration_=e,this.updateFormattedTime_(e))},e}(ei);ri.prototype.controlText_="Duration Time",En.registerComponent("DurationDisplay",ri);var ii=function(t){function e(){return Be(this,e),Ve(this,t.apply(this,arguments))}return Fe(e,t),e.prototype.createEl=function(){return t.prototype.createEl.call(this,"div",{className:"vjs-time-control vjs-time-divider",innerHTML:"<div><span>/</span></div>"})},e}(En);En.registerComponent("TimeDivider",ii);var oi=function(t){function e(n,r){Be(this,e);var i=Ve(this,t.call(this,n,r));return i.on(n,"durationchange",i.throttledUpdateContent),i.on(n,"ended",i.handleEnded),i}return Fe(e,t),e.prototype.buildCSSClass=function(){return"vjs-remaining-time"},e.prototype.formatTime_=function(e){return"-"+t.prototype.formatTime_.call(this,e)},e.prototype.updateContent=function(t){this.player_.duration()&&(this.player_.remainingTimeDisplay?this.updateFormattedTime_(this.player_.remainingTimeDisplay()):this.updateFormattedTime_(this.player_.remainingTime()))},e.prototype.handleEnded=function(t){this.player_.duration()&&this.updateFormattedTime_(0)},e}(ei);oi.prototype.controlText_="Remaining Time",En.registerComponent("RemainingTimeDisplay",oi);var si=function(t){function e(n,r){Be(this,e);var i=Ve(this,t.call(this,n,r));return i.updateShowing(),i.on(i.player(),"durationchange",i.updateShowing),i}return Fe(e,t),e.prototype.createEl=function(){var e=t.prototype.createEl.call(this,"div",{className:"vjs-live-control vjs-control"});return this.contentEl_=v("div",{className:"vjs-live-display",innerHTML:'<span class="vjs-control-text">'+this.localize("Stream Type")+"</span>"+this.localize("LIVE")},{"aria-live":"off"}),e.appendChild(this.contentEl_),e},e.prototype.dispose=function(){this.contentEl_=null,t.prototype.dispose.call(this)},e.prototype.updateShowing=function(t){this.player().duration()===1/0?this.show():this.hide()},e}(En);En.registerComponent("LiveDisplay",si);var ai=function(t){function e(n,r){Be(this,e);var i=Ve(this,t.call(this,n,r));return i.bar=i.getChild(i.options_.barName),i.vertical(!!i.options_.vertical),i.enable(),i}return Fe(e,t),e.prototype.enabled=function(){return this.enabled_},e.prototype.enable=function(){this.enabled()||(this.on("mousedown",this.handleMouseDown),this.on("touchstart",this.handleMouseDown),this.on("focus",this.handleFocus),this.on("blur",this.handleBlur),this.on("click",this.handleClick),this.on(this.player_,"controlsvisible",this.update),this.playerEvent&&this.on(this.player_,this.playerEvent,this.update),this.removeClass("disabled"),this.setAttribute("tabindex",0),this.enabled_=!0)},e.prototype.disable=function(){if(this.enabled()){var t=this.bar.el_.ownerDocument;this.off("mousedown",this.handleMouseDown),this.off("touchstart",this.handleMouseDown),this.off("focus",this.handleFocus),this.off("blur",this.handleBlur),this.off("click",this.handleClick),this.off(this.player_,"controlsvisible",this.update),this.off(t,"mousemove",this.handleMouseMove),this.off(t,"mouseup",this.handleMouseUp),this.off(t,"touchmove",this.handleMouseMove),this.off(t,"touchend",this.handleMouseUp),this.removeAttribute("tabindex"),this.addClass("disabled"),this.playerEvent&&this.off(this.player_,this.playerEvent,this.update),this.enabled_=!1}},e.prototype.createEl=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return n.className=n.className+" vjs-slider",n=r({tabIndex:0},n),i=r({role:"slider","aria-valuenow":0,"aria-valuemin":0,"aria-valuemax":100,tabIndex:0},i),t.prototype.createEl.call(this,e,n,i)},e.prototype.handleMouseDown=function(t){var e=this.bar.el_.ownerDocument;t.preventDefault(),x(),this.addClass("vjs-sliding"),this.trigger("slideractive"),this.on(e,"mousemove",this.handleMouseMove),this.on(e,"mouseup",this.handleMouseUp),this.on(e,"touchmove",this.handleMouseMove),this.on(e,"touchend",this.handleMouseUp),this.handleMouseMove(t)},e.prototype.handleMouseMove=function(t){},e.prototype.handleMouseUp=function(){var t=this.bar.el_.ownerDocument;j(),this.removeClass("vjs-sliding"),this.trigger("sliderinactive"),this.off(t,"mousemove",this.handleMouseMove),this.off(t,"mouseup",this.handleMouseUp),this.off(t,"touchmove",this.handleMouseMove),this.off(t,"touchend",this.handleMouseUp),this.update()},e.prototype.update=function(){if(this.el_){var t=this.getPercent(),e=this.bar;if(e){("number"!=typeof t||t!==t||t<0||t===1/0)&&(t=0);var n=(100*t).toFixed(2)+"%",r=e.el().style;return this.vertical()?r.height=n:r.width=n,t}}},e.prototype.calculateDistance=function(t){var e=O(this.el_,t);return this.vertical()?e.y:e.x},e.prototype.handleFocus=function(){this.on(this.bar.el_.ownerDocument,"keydown",this.handleKeyPress)},e.prototype.handleKeyPress=function(t){37===t.which||40===t.which?(t.preventDefault(),this.stepBack()):38!==t.which&&39!==t.which||(t.preventDefault(),this.stepForward())},e.prototype.handleBlur=function(){this.off(this.bar.el_.ownerDocument,"keydown",this.handleKeyPress)},e.prototype.handleClick=function(t){t.stopImmediatePropagation(),t.preventDefault()},e.prototype.vertical=function(t){if(void 0===t)return this.vertical_||!1;this.vertical_=!!t,this.vertical_?this.addClass("vjs-slider-vertical"):this.addClass("vjs-slider-horizontal")},e}(En);En.registerComponent("Slider",ai);var li=function(t){function e(n,r){Be(this,e);var i=Ve(this,t.call(this,n,r));return i.partEls_=[],i.on(n,"progress",i.update),i}return Fe(e,t),e.prototype.createEl=function(){return t.prototype.createEl.call(this,"div",{className:"vjs-load-progress",innerHTML:'<span class="vjs-control-text"><span>'+this.localize("Loaded")+"</span>: 0%</span>"})},e.prototype.dispose=function(){this.partEls_=null,t.prototype.dispose.call(this)},e.prototype.update=function(t){var e=this.player_.buffered(),n=this.player_.duration(),r=this.player_.bufferedEnd(),i=this.partEls_,o=function(t,e){var n=t/e||0;return 100*(n>=1?1:n)+"%"};this.el_.style.width=o(r,n);for(var s=0;s<e.length;s++){var a=e.start(s),l=e.end(s),c=i[s];c||(c=this.el_.appendChild(v()),i[s]=c),c.style.left=o(a,r),c.style.width=o(l-a,r)}for(var u=i.length;u>e.length;u--)this.el_.removeChild(i[u-1]);i.length=e.length},e}(En);En.registerComponent("LoadProgressBar",li);var ci=function(t){function e(){return Be(this,e),Ve(this,t.apply(this,arguments))}return Fe(e,t),e.prototype.createEl=function(){return t.prototype.createEl.call(this,"div",{className:"vjs-time-tooltip"})},e.prototype.update=function(t,e,n){var r=A(this.el_),i=A(this.player_.el()),o=t.width*e;if(i&&r){var s=t.left-i.left+o,a=t.width-o+(i.right-t.right),l=r.width/2;s<l?l+=l-s:a<l&&(l=a),l<0?l=0:l>r.width&&(l=r.width),this.el_.style.right="-"+l+"px",y(this.el_,n)}},e}(En);En.registerComponent("TimeTooltip",ci);var ui=function(t){function e(){return Be(this,e),Ve(this,t.apply(this,arguments))}return Fe(e,t),e.prototype.createEl=function(){return t.prototype.createEl.call(this,"div",{className:"vjs-play-progress vjs-slider-bar",innerHTML:'<span class="vjs-control-text"><span>'+this.localize("Progress")+"</span>: 0%</span>"})},e.prototype.update=function(t,e){var n=this;this.rafId_&&this.cancelAnimationFrame(this.rafId_),this.rafId_=this.requestAnimationFrame(function(){var r=n.player_.scrubbing()?n.player_.getCache().currentTime:n.player_.currentTime(),i=Zt(r,n.player_.duration()),o=n.getChild("timeTooltip");o&&o.update(t,e,i)})},e}(En);ui.prototype.options_={children:[]},Oe&&!(Oe>8)||be||Ce||ui.prototype.options_.children.push("timeTooltip"),En.registerComponent("PlayProgressBar",ui);var hi=function(t){function e(n,r){Be(this,e);var i=Ve(this,t.call(this,n,r));return i.update=dn(pn(i,i.update),25),i}return Fe(e,t),e.prototype.createEl=function(){return t.prototype.createEl.call(this,"div",{className:"vjs-mouse-display"})},e.prototype.update=function(t,e){var n=this;this.rafId_&&this.cancelAnimationFrame(this.rafId_),this.rafId_=this.requestAnimationFrame(function(){var r=n.player_.duration(),i=Zt(e*r,r);n.el_.style.left=t.width*e+"px",n.getChild("timeTooltip").update(t,e,i)})},e}(En);hi.prototype.options_={children:["timeTooltip"]},En.registerComponent("MouseTimeDisplay",hi);var pi=30,di=function(t){function e(n,r){Be(this,e);var i=Ve(this,t.call(this,n,r));return i.update=dn(pn(i,i.update),pi),i.on(n,"timeupdate",i.update),i.on(n,"ended",i.handleEnded),i.updateInterval=null,i.on(n,["playing"],function(){i.clearInterval(i.updateInterval),i.updateInterval=i.setInterval(function(){i.requestAnimationFrame(function(){i.update()})},pi)}),i.on(n,["ended","pause","waiting"],function(){i.clearInterval(i.updateInterval)}),i.on(n,["timeupdate","ended"],i.update),i}return Fe(e,t),e.prototype.createEl=function(){return t.prototype.createEl.call(this,"div",{className:"vjs-progress-holder"},{"aria-label":this.localize("Progress Bar")})},e.prototype.update_=function(t,e){var n=this.player_.duration();this.el_.setAttribute("aria-valuenow",(100*e).toFixed(2)),this.el_.setAttribute("aria-valuetext",this.localize("progress bar timing: currentTime={1} duration={2}",[Zt(t,n),Zt(n,n)],"{1} of {2}")),this.bar.update(A(this.el_),e)},e.prototype.update=function(e){var n=t.prototype.update.call(this);return this.update_(this.getCurrentTime_(),n),n},e.prototype.getCurrentTime_=function(){return this.player_.scrubbing()?this.player_.getCache().currentTime:this.player_.currentTime()},e.prototype.handleEnded=function(t){this.update_(this.player_.duration(),1)},e.prototype.getPercent=function(){var t=this.getCurrentTime_()/this.player_.duration();return t>=1?1:t},e.prototype.handleMouseDown=function(e){R(e)&&(this.player_.scrubbing(!0),this.videoWasPlaying=!this.player_.paused(),this.player_.pause(),t.prototype.handleMouseDown.call(this,e))},e.prototype.handleMouseMove=function(t){if(R(t)){var e=this.calculateDistance(t)*this.player_.duration();e===this.player_.duration()&&(e-=.1),this.player_.currentTime(e)}},e.prototype.enable=function(){t.prototype.enable.call(this);var e=this.getChild("mouseTimeDisplay");e&&e.show()},e.prototype.disable=function(){t.prototype.disable.call(this);var e=this.getChild("mouseTimeDisplay");e&&e.hide()},e.prototype.handleMouseUp=function(e){t.prototype.handleMouseUp.call(this,e),this.player_.scrubbing(!1),this.player_.trigger({type:"timeupdate",target:this,manuallyTriggered:!0}),this.videoWasPlaying&&ct(this.player_.play())},e.prototype.stepForward=function(){this.player_.currentTime(this.player_.currentTime()+5)},e.prototype.stepBack=function(){this.player_.currentTime(this.player_.currentTime()-5)},e.prototype.handleAction=function(t){this.player_.paused()?this.player_.play():this.player_.pause()},e.prototype.handleKeyPress=function(e){32===e.which||13===e.which?(e.preventDefault(),this.handleAction(e)):t.prototype.handleKeyPress&&t.prototype.handleKeyPress.call(this,e)},e}(ai);di.prototype.options_={children:["loadProgressBar","playProgressBar"],barName:"playProgressBar"},Oe&&!(Oe>8)||be||Ce||di.prototype.options_.children.splice(1,0,"mouseTimeDisplay"),di.prototype.playerEvent="timeupdate",En.registerComponent("SeekBar",di);var fi=function(t){function e(n,r){Be(this,e);var i=Ve(this,t.call(this,n,r));return i.handleMouseMove=dn(pn(i,i.handleMouseMove),25),i.throttledHandleMouseSeek=dn(pn(i,i.handleMouseSeek),25),i.enable(),i}return Fe(e,t),e.prototype.createEl=function(){return t.prototype.createEl.call(this,"div",{className:"vjs-progress-control vjs-control"})},e.prototype.handleMouseMove=function(t){var e=this.getChild("seekBar"),n=e.getChild("mouseTimeDisplay"),r=e.el(),i=A(r),o=O(r,t).x;o>1?o=1:o<0&&(o=0),n&&n.update(i,o)},e.prototype.handleMouseSeek=function(t){this.getChild("seekBar").handleMouseMove(t)},e.prototype.enabled=function(){return this.enabled_},e.prototype.disable=function(){this.children().forEach(function(t){return t.disable&&t.disable()}),this.enabled()&&(this.off(["mousedown","touchstart"],this.handleMouseDown),this.off(this.el_,"mousemove",this.handleMouseMove),this.handleMouseUp(),this.addClass("disabled"),this.enabled_=!1)},e.prototype.enable=function(){this.children().forEach(function(t){return t.enable&&t.enable()}),this.enabled()||(this.on(["mousedown","touchstart"],this.handleMouseDown),this.on(this.el_,"mousemove",this.handleMouseMove),this.removeClass("disabled"),this.enabled_=!0)},e.prototype.handleMouseDown=function(t){var e=this.el_.ownerDocument;this.on(e,"mousemove",this.throttledHandleMouseSeek),this.on(e,"touchmove",this.throttledHandleMouseSeek),this.on(e,"mouseup",this.handleMouseUp),this.on(e,"touchend",this.handleMouseUp)},e.prototype.handleMouseUp=function(t){var e=this.el_.ownerDocument;this.off(e,"mousemove",this.throttledHandleMouseSeek),this.off(e,"touchmove",this.throttledHandleMouseSeek),this.off(e,"mouseup",this.handleMouseUp),this.off(e,"touchend",this.handleMouseUp)},e}(En);fi.prototype.options_={children:["seekBar"]},En.registerComponent("ProgressControl",fi);var vi=function(t){function e(n,r){Be(this,e);var i=Ve(this,t.call(this,n,r));return i.on(n,"fullscreenchange",i.handleFullscreenChange),i}return Fe(e,t),e.prototype.buildCSSClass=function(){return"vjs-fullscreen-control "+t.prototype.buildCSSClass.call(this)},e.prototype.handleFullscreenChange=function(t){this.player_.isFullscreen()?this.controlText("Non-Fullscreen"):this.controlText("Fullscreen")},e.prototype.handleClick=function(t){this.player_.isFullscreen()?this.player_.exitFullscreen():this.player_.requestFullscreen()},e}(Jr);vi.prototype.controlText_="Fullscreen",En.registerComponent("FullscreenToggle",vi);var yi=function(t,e){e.tech_&&!e.tech_.featuresVolumeControl&&t.addClass("vjs-hidden"),t.on(e,"loadstart",function(){e.tech_.featuresVolumeControl?t.removeClass("vjs-hidden"):t.addClass("vjs-hidden")})},gi=function(t){function e(){return Be(this,e),Ve(this,t.apply(this,arguments))}return Fe(e,t),e.prototype.createEl=function(){return t.prototype.createEl.call(this,"div",{className:"vjs-volume-level",innerHTML:'<span class="vjs-control-text"></span>'})},e}(En);En.registerComponent("VolumeLevel",gi);var mi=function(t){function e(n,r){Be(this,e);var i=Ve(this,t.call(this,n,r));return i.on("slideractive",i.updateLastVolume_),i.on(n,"volumechange",i.updateARIAAttributes),n.ready(function(){return i.updateARIAAttributes()}),i}return Fe(e,t),e.prototype.createEl=function(){return t.prototype.createEl.call(this,"div",{className:"vjs-volume-bar vjs-slider-bar"},{"aria-label":this.localize("Volume Level"),"aria-live":"polite"})},e.prototype.handleMouseDown=function(e){R(e)&&t.prototype.handleMouseDown.call(this,e)},e.prototype.handleMouseMove=function(t){R(t)&&(this.checkMuted(),this.player_.volume(this.calculateDistance(t)))},e.prototype.checkMuted=function(){this.player_.muted()&&this.player_.muted(!1)},e.prototype.getPercent=function(){return this.player_.muted()?0:this.player_.volume()},e.prototype.stepForward=function(){this.checkMuted(),this.player_.volume(this.player_.volume()+.1)},e.prototype.stepBack=function(){this.checkMuted(),this.player_.volume(this.player_.volume()-.1)},e.prototype.updateARIAAttributes=function(t){var e=this.player_.muted()?0:this.volumeAsPercentage_();this.el_.setAttribute("aria-valuenow",e),this.el_.setAttribute("aria-valuetext",e+"%")},e.prototype.volumeAsPercentage_=function(){return Math.round(100*this.player_.volume())},e.prototype.updateLastVolume_=function(){var t=this,e=this.player_.volume();this.one("sliderinactive",function(){0===t.player_.volume()&&t.player_.lastVolume_(e)})},e}(ai);mi.prototype.options_={children:["volumeLevel"],barName:"volumeLevel"},mi.prototype.playerEvent="volumechange",En.registerComponent("VolumeBar",mi);var _i=function(t){function e(n){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};Be(this,e),r.vertical=r.vertical||!1,(void 0===r.volumeBar||o(r.volumeBar))&&(r.volumeBar=r.volumeBar||{},r.volumeBar.vertical=r.vertical);var i=Ve(this,t.call(this,n,r));return yi(i,n),i.throttledHandleMouseMove=dn(pn(i,i.handleMouseMove),25),i.on("mousedown",i.handleMouseDown),i.on("touchstart",i.handleMouseDown),i.on(i.volumeBar,["focus","slideractive"],function(){i.volumeBar.addClass("vjs-slider-active"),i.addClass("vjs-slider-active"),i.trigger("slideractive")}),i.on(i.volumeBar,["blur","sliderinactive"],function(){i.volumeBar.removeClass("vjs-slider-active"),i.removeClass("vjs-slider-active"),i.trigger("sliderinactive")}),i}return Fe(e,t),e.prototype.createEl=function(){var e="vjs-volume-horizontal";return this.options_.vertical&&(e="vjs-volume-vertical"),t.prototype.createEl.call(this,"div",{className:"vjs-volume-control vjs-control "+e})},e.prototype.handleMouseDown=function(t){var e=this.el_.ownerDocument;this.on(e,"mousemove",this.throttledHandleMouseMove),this.on(e,"touchmove",this.throttledHandleMouseMove),this.on(e,"mouseup",this.handleMouseUp),this.on(e,"touchend",this.handleMouseUp)},e.prototype.handleMouseUp=function(t){var e=this.el_.ownerDocument;this.off(e,"mousemove",this.throttledHandleMouseMove),this.off(e,"touchmove",this.throttledHandleMouseMove),this.off(e,"mouseup",this.handleMouseUp),this.off(e,"touchend",this.handleMouseUp)},e.prototype.handleMouseMove=function(t){this.volumeBar.handleMouseMove(t)},e}(En);_i.prototype.options_={children:["volumeBar"]},En.registerComponent("VolumeControl",_i);var bi=function(t){function e(n,r){Be(this,e);var i=Ve(this,t.call(this,n,r));return yi(i,n),i.on(n,["loadstart","volumechange"],i.update),i}return Fe(e,t),e.prototype.buildCSSClass=function(){return"vjs-mute-control "+t.prototype.buildCSSClass.call(this)},e.prototype.handleClick=function(t){var e=this.player_.volume(),n=this.player_.lastVolume_();if(0===e){var r=n<.1?.1:n;this.player_.volume(r),this.player_.muted(!1)}else this.player_.muted(!this.player_.muted())},e.prototype.update=function(t){this.updateIcon_(),this.updateControlText_()},e.prototype.updateIcon_=function(){var t=this.player_.volume(),e=3;0===t||this.player_.muted()?e=0:t<.33?e=1:t<.67&&(e=2);for(var n=0;n<4;n++)b(this.el_,"vjs-vol-"+n);_(this.el_,"vjs-vol-"+e)},e.prototype.updateControlText_=function(){var t=this.player_.muted()||0===this.player_.volume(),e=t?"Unmute":"Mute";this.controlText()!==e&&this.controlText(e)},e}(Jr);bi.prototype.controlText_="Mute",En.registerComponent("MuteToggle",bi);var Ti=function(t){function e(n){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};Be(this,e),void 0!==r.inline?r.inline=r.inline:r.inline=!0,(void 0===r.volumeControl||o(r.volumeControl))&&(r.volumeControl=r.volumeControl||{},r.volumeControl.vertical=!r.inline);var i=Ve(this,t.call(this,n,r));return yi(i,n),i.on(i.volumeControl,["slideractive"],i.sliderActive_),i.on(i.volumeControl,["sliderinactive"],i.sliderInactive_),i}return Fe(e,t),e.prototype.sliderActive_=function(){this.addClass("vjs-slider-active")},e.prototype.sliderInactive_=function(){this.removeClass("vjs-slider-active")},e.prototype.createEl=function(){var e="vjs-volume-panel-horizontal";return this.options_.inline||(e="vjs-volume-panel-vertical"),t.prototype.createEl.call(this,"div",{className:"vjs-volume-panel vjs-control "+e})},e}(En);Ti.prototype.options_={children:["muteToggle","volumeControl"]},En.registerComponent("VolumePanel",Ti);var Ci=function(t){function e(n,r){Be(this,e);var i=Ve(this,t.call(this,n,r));return r&&(i.menuButton_=r.menuButton),i.focusedChild_=-1,i.on("keydown",i.handleKeyPress),i}return Fe(e,t),e.prototype.addItem=function(t){this.addChild(t),t.on("click",pn(this,function(e){this.menuButton_&&(this.menuButton_.unpressButton(),"CaptionSettingsMenuItem"!==t.name()&&this.menuButton_.focus())}))},e.prototype.createEl=function(){var e=this.options_.contentElType||"ul";this.contentEl_=v(e,{className:"vjs-menu-content"}),this.contentEl_.setAttribute("role","menu");var n=t.prototype.createEl.call(this,"div",{append:this.contentEl_,className:"vjs-menu"});return n.appendChild(this.contentEl_),X(n,"click",function(t){t.preventDefault(),t.stopImmediatePropagation()}),n},e.prototype.dispose=function(){this.contentEl_=null,t.prototype.dispose.call(this)},e.prototype.handleKeyPress=function(t){37===t.which||40===t.which?(t.preventDefault(),this.stepForward()):38!==t.which&&39!==t.which||(t.preventDefault(),this.stepBack())},e.prototype.stepForward=function(){var t=0;void 0!==this.focusedChild_&&(t=this.focusedChild_+1),this.focus(t)},e.prototype.stepBack=function(){var t=0;void 0!==this.focusedChild_&&(t=this.focusedChild_-1),this.focus(t)},e.prototype.focus=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=this.children().slice();e.length&&e[0].className&&/vjs-menu-title/.test(e[0].className)&&e.shift(),e.length>0&&(t<0?t=0:t>=e.length&&(t=e.length-1),this.focusedChild_=t,e[t].el_.focus())},e}(En);En.registerComponent("Menu",Ci);var ki=function(t){function e(n){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};Be(this,e);var i=Ve(this,t.call(this,n,r));i.menuButton_=new Jr(n,r),i.menuButton_.controlText(i.controlText_),i.menuButton_.el_.setAttribute("aria-haspopup","true");var o=Jr.prototype.buildCSSClass();return i.menuButton_.el_.className=i.buildCSSClass()+" "+o,i.menuButton_.removeClass("vjs-control"),i.addChild(i.menuButton_),i.update(),i.enabled_=!0,i.on(i.menuButton_,"tap",i.handleClick),i.on(i.menuButton_,"click",i.handleClick),i.on(i.menuButton_,"focus",i.handleFocus),i.on(i.menuButton_,"blur",i.handleBlur),i.on("keydown",i.handleSubmenuKeyPress),i}return Fe(e,t),e.prototype.update=function(){var t=this.createMenu();this.menu&&(this.menu.dispose(),this.removeChild(this.menu)),this.menu=t,this.addChild(t),this.buttonPressed_=!1,this.menuButton_.el_.setAttribute("aria-expanded","false"),this.items&&this.items.length<=this.hideThreshold_?this.hide():this.show()},e.prototype.createMenu=function(){var t=new Ci(this.player_,{menuButton:this});if(this.hideThreshold_=0,this.options_.title){var e=v("li",{className:"vjs-menu-title",innerHTML:Q(this.options_.title),tabIndex:-1});this.hideThreshold_+=1,t.children_.unshift(e),g(e,t.contentEl())}if(this.items=this.createItems(),this.items)for(var n=0;n<this.items.length;n++)t.addItem(this.items[n]);return t},e.prototype.createItems=function(){},e.prototype.createEl=function(){return t.prototype.createEl.call(this,"div",{className:this.buildWrapperCSSClass()},{})},e.prototype.buildWrapperCSSClass=function(){var e="vjs-menu-button";return!0===this.options_.inline?e+="-inline":e+="-popup","vjs-menu-button "+e+" "+Jr.prototype.buildCSSClass()+" "+t.prototype.buildCSSClass.call(this)},e.prototype.buildCSSClass=function(){var e="vjs-menu-button";return!0===this.options_.inline?e+="-inline":e+="-popup","vjs-menu-button "+e+" "+t.prototype.buildCSSClass.call(this)},e.prototype.controlText=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.menuButton_.el();return this.menuButton_.controlText(t,e)},e.prototype.handleClick=function(t){this.one(this.menu.contentEl(),"mouseleave",pn(this,function(t){this.unpressButton(),this.el_.blur()})),this.buttonPressed_?this.unpressButton():this.pressButton()},e.prototype.focus=function(){this.menuButton_.focus()},e.prototype.blur=function(){this.menuButton_.blur()},e.prototype.handleFocus=function(){X(de,"keydown",pn(this,this.handleKeyPress))},e.prototype.handleBlur=function(){q(de,"keydown",pn(this,this.handleKeyPress))},e.prototype.handleKeyPress=function(t){27===t.which||9===t.which?(this.buttonPressed_&&this.unpressButton(),9!==t.which&&(t.preventDefault(),this.menuButton_.el_.focus())):38!==t.which&&40!==t.which||this.buttonPressed_||(this.pressButton(),t.preventDefault())},e.prototype.handleSubmenuKeyPress=function(t){27!==t.which&&9!==t.which||(this.buttonPressed_&&this.unpressButton(),9!==t.which&&(t.preventDefault(),this.menuButton_.el_.focus()))},e.prototype.pressButton=function(){if(this.enabled_){if(this.buttonPressed_=!0,this.menu.lockShowing(),this.menuButton_.el_.setAttribute("aria-expanded","true"),be&&d())return;this.menu.focus()}},e.prototype.unpressButton=function(){this.enabled_&&(this.buttonPressed_=!1,this.menu.unlockShowing(),this.menuButton_.el_.setAttribute("aria-expanded","false"))},e.prototype.disable=function(){this.unpressButton(),this.enabled_=!1,this.addClass("vjs-disabled"),this.menuButton_.disable()},e.prototype.enable=function(){this.enabled_=!0,this.removeClass("vjs-disabled"),this.menuButton_.enable()},e}(En);En.registerComponent("MenuButton",ki);var Ei=function(t){function e(n,r){Be(this,e);var i=r.tracks,o=Ve(this,t.call(this,n,r));if(o.items.length<=1&&o.hide(),!i)return Ve(o);var s=pn(o,o.update);return i.addEventListener("removetrack",s),i.addEventListener("addtrack",s),o.player_.on("ready",s),o.player_.on("dispose",function(){i.removeEventListener("removetrack",s),i.removeEventListener("addtrack",s)}),o}return Fe(e,t),e}(ki);En.registerComponent("TrackButton",Ei);var wi=function(t){function e(n,r){Be(this,e);var i=Ve(this,t.call(this,n,r));return i.selectable=r.selectable,i.selected(r.selected),i.selectable?i.el_.setAttribute("role","menuitemcheckbox"):i.el_.setAttribute("role","menuitem"),i}return Fe(e,t),e.prototype.createEl=function(e,n,i){return this.nonIconControl=!0,t.prototype.createEl.call(this,"li",r({className:"vjs-menu-item",innerHTML:'<span class="vjs-menu-item-text">'+this.localize(this.options_.label)+"</span>",tabIndex:-1},n),i)},e.prototype.handleClick=function(t){this.selected(!0)},e.prototype.selected=function(t){this.selectable&&(t?(this.addClass("vjs-selected"),this.el_.setAttribute("aria-checked","true"),this.controlText(", selected")):(this.removeClass("vjs-selected"),this.el_.setAttribute("aria-checked","false"),this.controlText("")))},e}(qr);En.registerComponent("MenuItem",wi);var Si=function(t){function e(n,r){Be(this,e);var i=r.track,o=n.textTracks();r.label=i.label||i.language||"Unknown",r.selected="showing"===i.mode;var s=Ve(this,t.call(this,n,r));s.track=i;var a=function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];s.handleTracksChange.apply(s,e)},l=function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];s.handleSelectedLanguageChange.apply(s,e)};if(n.on(["loadstart","texttrackchange"],a),o.addEventListener("change",a),o.addEventListener("selectedlanguagechange",l),s.on("dispose",function(){n.off(["loadstart","texttrackchange"],a),o.removeEventListener("change",a),o.removeEventListener("selectedlanguagechange",l)}),void 0===o.onchange){var c=void 0;s.on(["tap","click"],function(){if("object"!==Re(le.Event))try{c=new le.Event("change")}catch(t){}c||(c=de.createEvent("Event"),c.initEvent("change",!0,!0)),o.dispatchEvent(c)})}return s.handleTracksChange(),s}return Fe(e,t),e.prototype.handleClick=function(e){var n=this.track.kind,r=this.track.kinds,i=this.player_.textTracks();if(r||(r=[n]),t.prototype.handleClick.call(this,e),i)for(var o=0;o<i.length;o++){var s=i[o];s===this.track&&r.indexOf(s.kind)>-1?"showing"!==s.mode&&(s.mode="showing"):"disabled"!==s.mode&&(s.mode="disabled")}},e.prototype.handleTracksChange=function(t){this.selected("showing"===this.track.mode)},e.prototype.handleSelectedLanguageChange=function(t){if("showing"===this.track.mode){var e=this.player_.cache_.selectedLanguage;if(e&&e.enabled&&e.language===this.track.language&&e.kind!==this.track.kind)return;this.player_.cache_.selectedLanguage={enabled:!0,language:this.track.language,kind:this.track.kind}}},e.prototype.dispose=function(){this.track=null,t.prototype.dispose.call(this)},e}(wi);En.registerComponent("TextTrackMenuItem",Si);var xi=function(t){function e(n,r){return Be(this,e),r.track={player:n,kind:r.kind,kinds:r.kinds,default:!1,mode:"disabled"},r.kinds||(r.kinds=[r.kind]),r.label?r.track.label=r.label:r.track.label=r.kinds.join(" and ")+" off",r.selectable=!0,Ve(this,t.call(this,n,r))}return Fe(e,t),e.prototype.handleTracksChange=function(t){for(var e=this.player().textTracks(),n=!0,r=0,i=e.length;r<i;r++){var o=e[r];if(this.options_.kinds.indexOf(o.kind)>-1&&"showing"===o.mode){n=!1;break}}this.selected(n)},e.prototype.handleSelectedLanguageChange=function(t){for(var e=this.player().textTracks(),n=!0,r=0,i=e.length;r<i;r++){var o=e[r];if(["captions","descriptions","subtitles"].indexOf(o.kind)>-1&&"showing"===o.mode){n=!1;break}}n&&(this.player_.cache_.selectedLanguage={enabled:!1})},e}(Si);En.registerComponent("OffTextTrackMenuItem",xi);var ji=function(t){function e(n){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Be(this,e),r.tracks=n.textTracks(),Ve(this,t.call(this,n,r))}return Fe(e,t),e.prototype.createItems=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Si,n=void 0;this.label_&&(n=this.label_+" off"),t.push(new xi(this.player_,{kinds:this.kinds_,kind:this.kind_,label:n})),this.hideThreshold_+=1;var r=this.player_.textTracks();Array.isArray(this.kinds_)||(this.kinds_=[this.kind_]);for(var i=0;i<r.length;i++){var o=r[i];if(this.kinds_.indexOf(o.kind)>-1){var s=new e(this.player_,{track:o,selectable:!0});s.addClass("vjs-"+o.kind+"-menu-item"),t.push(s)}}return t},e}(Ei);En.registerComponent("TextTrackButton",ji);var Ai=function(t){function e(n,r){Be(this,e);var i=r.track,o=r.cue,s=n.currentTime();r.selectable=!0,r.label=o.text,r.selected=o.startTime<=s&&s<o.endTime;var a=Ve(this,t.call(this,n,r));return a.track=i,a.cue=o,i.addEventListener("cuechange",pn(a,a.update)),a}return Fe(e,t),e.prototype.handleClick=function(e){t.prototype.handleClick.call(this),this.player_.currentTime(this.cue.startTime),this.update(this.cue.startTime)},e.prototype.update=function(t){var e=this.cue,n=this.player_.currentTime();this.selected(e.startTime<=n&&n<e.endTime)},e}(wi);En.registerComponent("ChaptersTrackMenuItem",Ai);var Pi=function(t){function e(n,r,i){return Be(this,e),Ve(this,t.call(this,n,r,i))}return Fe(e,t),e.prototype.buildCSSClass=function(){return"vjs-chapters-button "+t.prototype.buildCSSClass.call(this)},e.prototype.buildWrapperCSSClass=function(){return"vjs-chapters-button "+t.prototype.buildWrapperCSSClass.call(this)},e.prototype.update=function(e){
this.track_&&(!e||"addtrack"!==e.type&&"removetrack"!==e.type)||this.setTrack(this.findChaptersTrack()),t.prototype.update.call(this)},e.prototype.setTrack=function(t){if(this.track_!==t){if(this.updateHandler_||(this.updateHandler_=this.update.bind(this)),this.track_){var e=this.player_.remoteTextTrackEls().getTrackElementByTrack_(this.track_);e&&e.removeEventListener("load",this.updateHandler_),this.track_=null}if(this.track_=t,this.track_){this.track_.mode="hidden";var n=this.player_.remoteTextTrackEls().getTrackElementByTrack_(this.track_);n&&n.addEventListener("load",this.updateHandler_)}}},e.prototype.findChaptersTrack=function(){for(var t=this.player_.textTracks()||[],e=t.length-1;e>=0;e--){var n=t[e];if(n.kind===this.kind_)return n}},e.prototype.getMenuCaption=function(){return this.track_&&this.track_.label?this.track_.label:this.localize(Q(this.kind_))},e.prototype.createMenu=function(){return this.options_.title=this.getMenuCaption(),t.prototype.createMenu.call(this)},e.prototype.createItems=function(){var t=[];if(!this.track_)return t;var e=this.track_.cues;if(!e)return t;for(var n=0,r=e.length;n<r;n++){var i=e[n],o=new Ai(this.player_,{track:this.track_,cue:i});t.push(o)}return t},e}(ji);Pi.prototype.kind_="chapters",Pi.prototype.controlText_="Chapters",En.registerComponent("ChaptersButton",Pi);var Oi=function(t){function e(n,r,i){Be(this,e);var o=Ve(this,t.call(this,n,r,i)),s=n.textTracks(),a=pn(o,o.handleTracksChange);return s.addEventListener("change",a),o.on("dispose",function(){s.removeEventListener("change",a)}),o}return Fe(e,t),e.prototype.handleTracksChange=function(t){for(var e=this.player().textTracks(),n=!1,r=0,i=e.length;r<i;r++){var o=e[r];if(o.kind!==this.kind_&&"showing"===o.mode){n=!0;break}}n?this.disable():this.enable()},e.prototype.buildCSSClass=function(){return"vjs-descriptions-button "+t.prototype.buildCSSClass.call(this)},e.prototype.buildWrapperCSSClass=function(){return"vjs-descriptions-button "+t.prototype.buildWrapperCSSClass.call(this)},e}(ji);Oi.prototype.kind_="descriptions",Oi.prototype.controlText_="Descriptions",En.registerComponent("DescriptionsButton",Oi);var Ni=function(t){function e(n,r,i){return Be(this,e),Ve(this,t.call(this,n,r,i))}return Fe(e,t),e.prototype.buildCSSClass=function(){return"vjs-subtitles-button "+t.prototype.buildCSSClass.call(this)},e.prototype.buildWrapperCSSClass=function(){return"vjs-subtitles-button "+t.prototype.buildWrapperCSSClass.call(this)},e}(ji);Ni.prototype.kind_="subtitles",Ni.prototype.controlText_="Subtitles",En.registerComponent("SubtitlesButton",Ni);var Mi=function(t){function e(n,r){Be(this,e),r.track={player:n,kind:r.kind,label:r.kind+" settings",selectable:!1,default:!1,mode:"disabled"},r.selectable=!1,r.name="CaptionSettingsMenuItem";var i=Ve(this,t.call(this,n,r));return i.addClass("vjs-texttrack-settings"),i.controlText(", opens "+r.kind+" settings dialog"),i}return Fe(e,t),e.prototype.handleClick=function(t){this.player().getChild("textTrackSettings").open()},e}(Si);En.registerComponent("CaptionSettingsMenuItem",Mi);var Ii=function(t){function e(n,r,i){return Be(this,e),Ve(this,t.call(this,n,r,i))}return Fe(e,t),e.prototype.buildCSSClass=function(){return"vjs-captions-button "+t.prototype.buildCSSClass.call(this)},e.prototype.buildWrapperCSSClass=function(){return"vjs-captions-button "+t.prototype.buildWrapperCSSClass.call(this)},e.prototype.createItems=function(){var e=[];return this.player().tech_&&this.player().tech_.featuresNativeTextTracks||(e.push(new Mi(this.player_,{kind:this.kind_})),this.hideThreshold_+=1),t.prototype.createItems.call(this,e)},e}(ji);Ii.prototype.kind_="captions",Ii.prototype.controlText_="Captions",En.registerComponent("CaptionsButton",Ii);var Di=function(t){function e(){return Be(this,e),Ve(this,t.apply(this,arguments))}return Fe(e,t),e.prototype.createEl=function(e,n,i){var o='<span class="vjs-menu-item-text">'+this.localize(this.options_.label);return"captions"===this.options_.track.kind&&(o+='\n        <span aria-hidden="true" class="vjs-icon-placeholder"></span>\n        <span class="vjs-control-text"> '+this.localize("Captions")+"</span>\n      "),o+="</span>",t.prototype.createEl.call(this,e,r({innerHTML:o},n),i)},e}(Si);En.registerComponent("SubsCapsMenuItem",Di);var Li=function(t){function e(n){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};Be(this,e);var i=Ve(this,t.call(this,n,r));return i.label_="subtitles",["en","en-us","en-ca","fr-ca"].indexOf(i.player_.language_)>-1&&(i.label_="captions"),i.menuButton_.controlText(Q(i.label_)),i}return Fe(e,t),e.prototype.buildCSSClass=function(){return"vjs-subs-caps-button "+t.prototype.buildCSSClass.call(this)},e.prototype.buildWrapperCSSClass=function(){return"vjs-subs-caps-button "+t.prototype.buildWrapperCSSClass.call(this)},e.prototype.createItems=function(){var e=[];return this.player().tech_&&this.player().tech_.featuresNativeTextTracks||(e.push(new Mi(this.player_,{kind:this.label_})),this.hideThreshold_+=1),e=t.prototype.createItems.call(this,e,Di)},e}(ji);Li.prototype.kinds_=["captions","subtitles"],Li.prototype.controlText_="Subtitles",En.registerComponent("SubsCapsButton",Li);var Ri=function(t){function e(n,r){Be(this,e);var i=r.track,o=n.audioTracks();r.label=i.label||i.language||"Unknown",r.selected=i.enabled;var s=Ve(this,t.call(this,n,r));s.track=i;var a=function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];s.handleTracksChange.apply(s,e)};return o.addEventListener("change",a),s.on("dispose",function(){o.removeEventListener("change",a)}),s}return Fe(e,t),e.prototype.handleClick=function(e){var n=this.player_.audioTracks();t.prototype.handleClick.call(this,e);for(var r=0;r<n.length;r++){var i=n[r];i.enabled=i===this.track}},e.prototype.handleTracksChange=function(t){this.selected(this.track.enabled)},e}(wi);En.registerComponent("AudioTrackMenuItem",Ri);var Bi=function(t){function e(n){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Be(this,e),r.tracks=n.audioTracks(),Ve(this,t.call(this,n,r))}return Fe(e,t),e.prototype.buildCSSClass=function(){return"vjs-audio-button "+t.prototype.buildCSSClass.call(this)},e.prototype.buildWrapperCSSClass=function(){return"vjs-audio-button "+t.prototype.buildWrapperCSSClass.call(this)},e.prototype.createItems=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];this.hideThreshold_=1;for(var e=this.player_.audioTracks(),n=0;n<e.length;n++){var r=e[n];t.push(new Ri(this.player_,{track:r,selectable:!0}))}return t},e}(Ei);Bi.prototype.controlText_="Audio Track",En.registerComponent("AudioTrackButton",Bi);var Fi=function(t){function e(n,r){Be(this,e);var i=r.rate,o=parseFloat(i,10);r.label=i,r.selected=1===o,r.selectable=!0;var s=Ve(this,t.call(this,n,r));return s.label=i,s.rate=o,s.on(n,"ratechange",s.update),s}return Fe(e,t),e.prototype.handleClick=function(e){t.prototype.handleClick.call(this),this.player().playbackRate(this.rate)},e.prototype.update=function(t){this.selected(this.player().playbackRate()===this.rate)},e}(wi);Fi.prototype.contentElType="button",En.registerComponent("PlaybackRateMenuItem",Fi);var Vi=function(t){function e(n,r){Be(this,e);var i=Ve(this,t.call(this,n,r));return i.updateVisibility(),i.updateLabel(),i.on(n,"loadstart",i.updateVisibility),i.on(n,"ratechange",i.updateLabel),i}return Fe(e,t),e.prototype.createEl=function(){var e=t.prototype.createEl.call(this);return this.labelEl_=v("div",{className:"vjs-playback-rate-value",innerHTML:"1x"}),e.appendChild(this.labelEl_),e},e.prototype.dispose=function(){this.labelEl_=null,t.prototype.dispose.call(this)},e.prototype.buildCSSClass=function(){return"vjs-playback-rate "+t.prototype.buildCSSClass.call(this)},e.prototype.buildWrapperCSSClass=function(){return"vjs-playback-rate "+t.prototype.buildWrapperCSSClass.call(this)},e.prototype.createMenu=function(){var t=new Ci(this.player()),e=this.playbackRates();if(e)for(var n=e.length-1;n>=0;n--)t.addChild(new Fi(this.player(),{rate:e[n]+"x"}));return t},e.prototype.updateARIAAttributes=function(){this.el().setAttribute("aria-valuenow",this.player().playbackRate())},e.prototype.handleClick=function(t){for(var e=this.player().playbackRate(),n=this.playbackRates(),r=n[0],i=0;i<n.length;i++)if(n[i]>e){r=n[i];break}this.player().playbackRate(r)},e.prototype.playbackRates=function(){return this.options_.playbackRates||this.options_.playerOptions&&this.options_.playerOptions.playbackRates},e.prototype.playbackRateSupported=function(){return this.player().tech_&&this.player().tech_.featuresPlaybackRate&&this.playbackRates()&&this.playbackRates().length>0},e.prototype.updateVisibility=function(t){this.playbackRateSupported()?this.removeClass("vjs-hidden"):this.addClass("vjs-hidden")},e.prototype.updateLabel=function(t){this.playbackRateSupported()&&(this.labelEl_.innerHTML=this.player().playbackRate()+"x")},e}(ki);Vi.prototype.controlText_="Playback Rate",En.registerComponent("PlaybackRateMenuButton",Vi);var Hi=function(t){function e(){return Be(this,e),Ve(this,t.apply(this,arguments))}return Fe(e,t),e.prototype.buildCSSClass=function(){return"vjs-spacer "+t.prototype.buildCSSClass.call(this)},e.prototype.createEl=function(){return t.prototype.createEl.call(this,"div",{className:this.buildCSSClass()})},e}(En);En.registerComponent("Spacer",Hi);var Wi=function(t){function e(){return Be(this,e),Ve(this,t.apply(this,arguments))}return Fe(e,t),e.prototype.buildCSSClass=function(){return"vjs-custom-control-spacer "+t.prototype.buildCSSClass.call(this)},e.prototype.createEl=function(){var e=t.prototype.createEl.call(this,{className:this.buildCSSClass()});return e.innerHTML=" ",e},e}(Hi);En.registerComponent("CustomControlSpacer",Wi);var Ui=function(t){function e(){return Be(this,e),Ve(this,t.apply(this,arguments))}return Fe(e,t),e.prototype.createEl=function(){return t.prototype.createEl.call(this,"div",{className:"vjs-control-bar",dir:"ltr"},{role:"group"})},e}(En);Ui.prototype.options_={children:["playToggle","volumePanel","currentTimeDisplay","timeDivider","durationDisplay","progressControl","liveDisplay","remainingTimeDisplay","customControlSpacer","playbackRateMenuButton","chaptersButton","descriptionsButton","subsCapsButton","audioTrackButton","fullscreenToggle"]},En.registerComponent("ControlBar",Ui);var zi=function(t){function e(n,r){Be(this,e);var i=Ve(this,t.call(this,n,r));return i.on(n,"error",i.open),i}return Fe(e,t),e.prototype.buildCSSClass=function(){return"vjs-error-display "+t.prototype.buildCSSClass.call(this)},e.prototype.content=function(){var t=this.player().error();return t?this.localize(t.message):""},e}(Bn);zi.prototype.options_=tt(Bn.prototype.options_,{pauseOnOpen:!1,fillAlways:!0,temporary:!1,uncloseable:!0}),En.registerComponent("ErrorDisplay",zi);var Xi=["#000","Black"],qi=["#00F","Blue"],Ki=["#0FF","Cyan"],Yi=["#0F0","Green"],Gi=["#F0F","Magenta"],$i=["#F00","Red"],Ji=["#FFF","White"],Qi=["#FF0","Yellow"],Zi=["1","Opaque"],to=["0.5","Semi-Transparent"],eo=["0","Transparent"],no={backgroundColor:{selector:".vjs-bg-color > select",id:"captions-background-color-%s",label:"Color",options:[Xi,Ji,$i,Yi,qi,Qi,Gi,Ki]},backgroundOpacity:{selector:".vjs-bg-opacity > select",id:"captions-background-opacity-%s",label:"Transparency",options:[Zi,to,eo]},color:{selector:".vjs-fg-color > select",id:"captions-foreground-color-%s",label:"Color",options:[Ji,Xi,$i,Yi,qi,Qi,Gi,Ki]},edgeStyle:{selector:".vjs-edge-style > select",id:"%s",label:"Text Edge Style",options:[["none","None"],["raised","Raised"],["depressed","Depressed"],["uniform","Uniform"],["dropshadow","Dropshadow"]]},fontFamily:{selector:".vjs-font-family > select",id:"captions-font-family-%s",label:"Font Family",options:[["proportionalSansSerif","Proportional Sans-Serif"],["monospaceSansSerif","Monospace Sans-Serif"],["proportionalSerif","Proportional Serif"],["monospaceSerif","Monospace Serif"],["casual","Casual"],["script","Script"],["small-caps","Small Caps"]]},fontPercent:{selector:".vjs-font-percent > select",id:"captions-font-size-%s",label:"Font Size",options:[["0.50","50%"],["0.75","75%"],["1.00","100%"],["1.25","125%"],["1.50","150%"],["1.75","175%"],["2.00","200%"],["3.00","300%"],["4.00","400%"]],default:2,parser:function(t){return"1.00"===t?null:Number(t)}},textOpacity:{selector:".vjs-text-opacity > select",id:"captions-foreground-opacity-%s",label:"Transparency",options:[Zi,to]},windowColor:{selector:".vjs-window-color > select",id:"captions-window-color-%s",label:"Color"},windowOpacity:{selector:".vjs-window-opacity > select",id:"captions-window-opacity-%s",label:"Transparency",options:[eo,to,Zi]}};no.windowColor.options=no.backgroundColor.options;var ro=function(t){function r(n,i){Be(this,r),i.temporary=!1;var o=Ve(this,t.call(this,n,i));return o.updateDisplay=pn(o,o.updateDisplay),o.fill(),o.hasBeenOpened_=o.hasBeenFilled_=!0,o.endDialog=v("p",{className:"vjs-control-text",textContent:o.localize("End of dialog window.")}),o.el().appendChild(o.endDialog),o.setDefaults(),void 0===i.persistTextTrackSettings&&(o.options_.persistTextTrackSettings=o.options_.playerOptions.persistTextTrackSettings),o.on(o.$(".vjs-done-button"),"click",function(){o.saveSettings(),o.close()}),o.on(o.$(".vjs-default-button"),"click",function(){o.setDefaults(),o.updateDisplay()}),e(no,function(t){o.on(o.$(t.selector),"change",o.updateDisplay)}),o.options_.persistTextTrackSettings&&o.restoreSettings(),o}return Fe(r,t),r.prototype.dispose=function(){this.endDialog=null,t.prototype.dispose.call(this)},r.prototype.createElSelect_=function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"label",i=no[t],o=i.id.replace("%s",this.id_);return["<"+r+' id="'+o+'" class="'+("label"===r?"vjs-label":"")+'">',this.localize(i.label),"</"+r+">",'<select aria-labelledby="'+(""!==n?n+" ":"")+o+'">'].concat(i.options.map(function(t){var r=o+"-"+t[1];return['<option id="'+r+'" value="'+t[0]+'" ','aria-labelledby="'+(""!==n?n+" ":"")+o+" "+r+'">',e.localize(t[1]),"</option>"].join("")})).concat("</select>").join("")},r.prototype.createElFgColor_=function(){var t="captions-text-legend-"+this.id_;return['<fieldset class="vjs-fg-color vjs-track-setting">','<legend id="'+t+'">',this.localize("Text"),"</legend>",this.createElSelect_("color",t),'<span class="vjs-text-opacity vjs-opacity">',this.createElSelect_("textOpacity",t),"</span>","</fieldset>"].join("")},r.prototype.createElBgColor_=function(){var t="captions-background-"+this.id_;return['<fieldset class="vjs-bg-color vjs-track-setting">','<legend id="'+t+'">',this.localize("Background"),"</legend>",this.createElSelect_("backgroundColor",t),'<span class="vjs-bg-opacity vjs-opacity">',this.createElSelect_("backgroundOpacity",t),"</span>","</fieldset>"].join("")},r.prototype.createElWinColor_=function(){var t="captions-window-"+this.id_;return['<fieldset class="vjs-window-color vjs-track-setting">','<legend id="'+t+'">',this.localize("Window"),"</legend>",this.createElSelect_("windowColor",t),'<span class="vjs-window-opacity vjs-opacity">',this.createElSelect_("windowOpacity",t),"</span>","</fieldset>"].join("")},r.prototype.createElColors_=function(){return v("div",{className:"vjs-track-settings-colors",innerHTML:[this.createElFgColor_(),this.createElBgColor_(),this.createElWinColor_()].join("")})},r.prototype.createElFont_=function(){return v("div",{className:'vjs-track-settings-font">',innerHTML:['<fieldset class="vjs-font-percent vjs-track-setting">',this.createElSelect_("fontPercent","","legend"),"</fieldset>",'<fieldset class="vjs-edge-style vjs-track-setting">',this.createElSelect_("edgeStyle","","legend"),"</fieldset>",'<fieldset class="vjs-font-family vjs-track-setting">',this.createElSelect_("fontFamily","","legend"),"</fieldset>"].join("")})},r.prototype.createElControls_=function(){var t=this.localize("restore all settings to the default values");return v("div",{className:"vjs-track-settings-controls",innerHTML:['<button class="vjs-default-button" title="'+t+'">',this.localize("Reset"),'<span class="vjs-control-text"> '+t+"</span>","</button>",'<button class="vjs-done-button">'+this.localize("Done")+"</button>"].join("")})},r.prototype.content=function(){return[this.createElColors_(),this.createElFont_(),this.createElControls_()]},r.prototype.label=function(){return this.localize("Caption Settings Dialog")},r.prototype.description=function(){return this.localize("Beginning of dialog window. Escape will cancel and close the window.")},r.prototype.buildCSSClass=function(){return t.prototype.buildCSSClass.call(this)+" vjs-text-track-settings"},r.prototype.getValues=function(){var t=this;return n(no,function(e,n,r){var i=ee(t.$(n.selector),n.parser);return void 0!==i&&(e[r]=i),e},{})},r.prototype.setValues=function(t){var n=this;e(no,function(e,r){ne(n.$(e.selector),t[r],e.parser)})},r.prototype.setDefaults=function(){var t=this;e(no,function(e){var n=e.hasOwnProperty("default")?e.default:0;t.$(e.selector).selectedIndex=n})},r.prototype.restoreSettings=function(){var t=void 0;try{t=JSON.parse(le.localStorage.getItem("vjs-text-track-settings"))}catch(t){Ye.warn(t)}t&&this.setValues(t)},r.prototype.saveSettings=function(){if(this.options_.persistTextTrackSettings){var t=this.getValues();try{Object.keys(t).length?le.localStorage.setItem("vjs-text-track-settings",JSON.stringify(t)):le.localStorage.removeItem("vjs-text-track-settings")}catch(t){Ye.warn(t)}}},r.prototype.updateDisplay=function(){var t=this.player_.getChild("textTrackDisplay");t&&t.updateDisplay()},r.prototype.conditionalBlur_=function(){this.previouslyActiveEl_=null,this.off(de,"keydown",this.handleKeyDown);var t=this.player_.controlBar,e=t&&t.subsCapsButton,n=t&&t.captionsButton;e?e.focus():n&&n.focus()},r}(Bn);En.registerComponent("TextTrackSettings",ro);var io=He(["Text Tracks are being loaded from another origin but the crossorigin attribute isn't used.\n            This may prevent text tracks from loading."],["Text Tracks are being loaded from another origin but the crossorigin attribute isn't used.\n            This may prevent text tracks from loading."]),oo=function(t){function e(n,r){Be(this,e);var i=Ve(this,t.call(this,n,r)),o=n.source,s=!1;if(o&&(i.el_.currentSrc!==o.src||n.tag&&3===n.tag.initNetworkState_)?i.setSource(o):i.handleLateInit_(i.el_),i.el_.hasChildNodes()){for(var a=i.el_.childNodes,l=a.length,c=[];l--;){var u=a[l];"track"===u.nodeName.toLowerCase()&&(i.featuresNativeTextTracks?(i.remoteTextTrackEls().addTrackElement_(u),i.remoteTextTracks().addTrack(u.track),i.textTracks().addTrack(u.track),s||i.el_.hasAttribute("crossorigin")||!nr(u.src)||(s=!0)):c.push(u))}for(var h=0;h<c.length;h++)i.el_.removeChild(c[h])}return i.proxyNativeTracks_(),i.featuresNativeTextTracks&&s&&Ye.warn(Ge(io)),i.restoreMetadataTracksInIOSNativePlayer_(),(Ie||me||we)&&!0===n.nativeControlsForTouch&&i.setControls(!0),i.proxyWebkitFullscreen_(),i.triggerReady(),i}return Fe(e,t),e.prototype.dispose=function(){e.disposeMediaElement(this.el_),this.options_=null,t.prototype.dispose.call(this)},e.prototype.restoreMetadataTracksInIOSNativePlayer_=function(){var t=this.textTracks(),e=void 0,n=function(){e=[];for(var n=0;n<t.length;n++){var r=t[n];"metadata"===r.kind&&e.push({track:r,storedMode:r.mode})}};n(),t.addEventListener("change",n),this.on("dispose",function(){return t.removeEventListener("change",n)});var r=function n(){for(var r=0;r<e.length;r++){var i=e[r];"disabled"===i.track.mode&&i.track.mode!==i.storedMode&&(i.track.mode=i.storedMode)}t.removeEventListener("change",n)};this.on("webkitbeginfullscreen",function(){t.removeEventListener("change",n),t.removeEventListener("change",r),t.addEventListener("change",r)}),this.on("webkitendfullscreen",function(){t.removeEventListener("change",n),t.addEventListener("change",n),t.removeEventListener("change",r)})},e.prototype.proxyNativeTracks_=function(){var t=this;kr.names.forEach(function(e){var n=kr[e],r=t.el()[n.getterName],i=t[n.getterName]();if(t["featuresNative"+n.capitalName+"Tracks"]&&r&&r.addEventListener){var o={change:function(t){i.trigger({type:"change",target:i,currentTarget:i,srcElement:i})},addtrack:function(t){i.addTrack(t.track)},removetrack:function(t){i.removeTrack(t.track)}},s=function(){for(var t=[],e=0;e<i.length;e++){for(var n=!1,o=0;o<r.length;o++)if(r[o]===i[e]){n=!0;break}n||t.push(i[e])}for(;t.length;)i.removeTrack(t.shift())};Object.keys(o).forEach(function(e){var n=o[e];r.addEventListener(e,n),t.on("dispose",function(t){return r.removeEventListener(e,n)})}),t.on("loadstart",s),t.on("dispose",function(e){return t.off("loadstart",s)})}})},e.prototype.createEl=function(){var t=this.options_.tag;if(!t||!this.options_.playerElIngest&&!this.movingMediaElementInDOM){if(t){var n=t.cloneNode(!0);t.parentNode&&t.parentNode.insertBefore(n,t),e.disposeMediaElement(t),t=n}else{t=de.createElement("video");var i=this.options_.tag&&k(this.options_.tag),o=tt({},i);Ie&&!0===this.options_.nativeControlsForTouch||delete o.controls,C(t,r(o,{id:this.options_.techId,class:"vjs-tech"}))}t.playerId=this.options_.playerId}void 0!==this.options_.preload&&w(t,"preload",this.options_.preload);for(var s=["loop","muted","playsinline","autoplay"],a=0;a<s.length;a++){var l=s[a],c=this.options_[l];void 0!==c&&(c?w(t,l,l):S(t,l),t[l]=c)}return t},e.prototype.handleLateInit_=function(t){if(0!==t.networkState&&3!==t.networkState){if(0===t.readyState){var e=!1,n=function(){e=!0};this.on("loadstart",n);var r=function(){e||this.trigger("loadstart")};return this.on("loadedmetadata",r),void this.ready(function(){this.off("loadstart",n),this.off("loadedmetadata",r),e||this.trigger("loadstart")})}var i=["loadstart"];i.push("loadedmetadata"),t.readyState>=2&&i.push("loadeddata"),t.readyState>=3&&i.push("canplay"),t.readyState>=4&&i.push("canplaythrough"),this.ready(function(){i.forEach(function(t){this.trigger(t)},this)})}},e.prototype.setCurrentTime=function(t){try{this.el_.currentTime=t}catch(t){Ye(t,"Video is not ready. (Video.js)")}},e.prototype.duration=function(){var t=this;if(this.el_.duration===1/0&&Ce&&je&&0===this.el_.currentTime){var e=function e(){t.el_.currentTime>0&&(t.el_.duration===1/0&&t.trigger("durationchange"),t.off("timeupdate",e))};return this.on("timeupdate",e),NaN}return this.el_.duration||NaN},e.prototype.width=function(){return this.el_.offsetWidth},e.prototype.height=function(){return this.el_.offsetHeight},e.prototype.proxyWebkitFullscreen_=function(){var t=this;if("webkitDisplayingFullscreen"in this.el_){var e=function(){this.trigger("fullscreenchange",{isFullscreen:!1})},n=function(){"webkitPresentationMode"in this.el_&&"picture-in-picture"!==this.el_.webkitPresentationMode&&(this.one("webkitendfullscreen",e),this.trigger("fullscreenchange",{isFullscreen:!0}))};this.on("webkitbeginfullscreen",n),this.on("dispose",function(){t.off("webkitbeginfullscreen",n),t.off("webkitendfullscreen",e)})}},e.prototype.supportsFullScreen=function(){if("function"==typeof this.el_.webkitEnterFullScreen){var t=le.navigator&&le.navigator.userAgent||"";if(/Android/.test(t)||!/Chrome|Mac OS X 10.5/.test(t))return!0}return!1},e.prototype.enterFullScreen=function(){var t=this.el_;t.paused&&t.networkState<=t.HAVE_METADATA?(this.el_.play(),this.setTimeout(function(){t.pause(),t.webkitEnterFullScreen()},0)):t.webkitEnterFullScreen()},e.prototype.exitFullScreen=function(){this.el_.webkitExitFullScreen()},e.prototype.src=function(t){if(void 0===t)return this.el_.src;this.setSrc(t)},e.prototype.reset=function(){e.resetMediaElement(this.el_)},e.prototype.currentSrc=function(){return this.currentSource_?this.currentSource_.src:this.el_.currentSrc},e.prototype.setControls=function(t){this.el_.controls=!!t},e.prototype.addTextTrack=function(e,n,r){return this.featuresNativeTextTracks?this.el_.addTextTrack(e,n,r):t.prototype.addTextTrack.call(this,e,n,r)},e.prototype.createRemoteTextTrack=function(e){if(!this.featuresNativeTextTracks)return t.prototype.createRemoteTextTrack.call(this,e);var n=de.createElement("track");return e.kind&&(n.kind=e.kind),e.label&&(n.label=e.label),(e.language||e.srclang)&&(n.srclang=e.language||e.srclang),e.default&&(n.default=e.default),e.id&&(n.id=e.id),e.src&&(n.src=e.src),n},e.prototype.addRemoteTextTrack=function(e,n){var r=t.prototype.addRemoteTextTrack.call(this,e,n);return this.featuresNativeTextTracks&&this.el().appendChild(r),r},e.prototype.removeRemoteTextTrack=function(e){if(t.prototype.removeRemoteTextTrack.call(this,e),this.featuresNativeTextTracks)for(var n=this.$$("track"),r=n.length;r--;)e!==n[r]&&e!==n[r].track||this.el().removeChild(n[r])},e.prototype.getVideoPlaybackQuality=function(){if("function"==typeof this.el().getVideoPlaybackQuality)return this.el().getVideoPlaybackQuality();var t={};return void 0!==this.el().webkitDroppedFrameCount&&void 0!==this.el().webkitDecodedFrameCount&&(t.droppedVideoFrames=this.el().webkitDroppedFrameCount,t.totalVideoFrames=this.el().webkitDecodedFrameCount),le.performance&&"function"==typeof le.performance.now?t.creationTime=le.performance.now():le.performance&&le.performance.timing&&"number"==typeof le.performance.timing.navigationStart&&(t.creationTime=le.Date.now()-le.performance.timing.navigationStart),t},e}(Vr);if(h()){oo.TEST_VID=de.createElement("video");var so=de.createElement("track");so.kind="captions",so.srclang="en",so.label="English",oo.TEST_VID.appendChild(so)}oo.isSupported=function(){try{oo.TEST_VID.volume=.5}catch(t){return!1}return!(!oo.TEST_VID||!oo.TEST_VID.canPlayType)},oo.canPlayType=function(t){return oo.TEST_VID.canPlayType(t)},oo.canPlaySource=function(t,e){return oo.canPlayType(t.type)},oo.canControlVolume=function(){try{var t=oo.TEST_VID.volume;return oo.TEST_VID.volume=t/2+.1,t!==oo.TEST_VID.volume}catch(t){return!1}},oo.canControlPlaybackRate=function(){if(Ce&&je&&Ae<58)return!1;try{var t=oo.TEST_VID.playbackRate;return oo.TEST_VID.playbackRate=t/2+.1,t!==oo.TEST_VID.playbackRate}catch(t){return!1}},oo.supportsNativeTextTracks=function(){return Me},oo.supportsNativeVideoTracks=function(){return!(!oo.TEST_VID||!oo.TEST_VID.videoTracks)},oo.supportsNativeAudioTracks=function(){return!(!oo.TEST_VID||!oo.TEST_VID.audioTracks)},oo.Events=["loadstart","suspend","abort","error","emptied","stalled","loadedmetadata","loadeddata","canplay","canplaythrough","playing","waiting","seeking","seeked","ended","durationchange","timeupdate","progress","play","pause","ratechange","resize","volumechange"],oo.prototype.featuresVolumeControl=oo.canControlVolume(),oo.prototype.featuresPlaybackRate=oo.canControlPlaybackRate(),oo.prototype.movingMediaElementInDOM=!be,oo.prototype.featuresFullscreenResize=!0,oo.prototype.featuresProgressEvents=!0,oo.prototype.featuresTimeupdateEvents=!0,oo.prototype.featuresNativeTextTracks=oo.supportsNativeTextTracks(),oo.prototype.featuresNativeVideoTracks=oo.supportsNativeVideoTracks(),oo.prototype.featuresNativeAudioTracks=oo.supportsNativeAudioTracks();var ao=oo.TEST_VID&&oo.TEST_VID.constructor.prototype.canPlayType,lo=/^application\/(?:x-|vnd\.apple\.)mpegurl/i,co=/^video\/mp4/i;oo.patchCanPlayType=function(){ke>=4&&!Se?oo.TEST_VID.constructor.prototype.canPlayType=function(t){return t&&lo.test(t)?"maybe":ao.call(this,t)}:Ee&&(oo.TEST_VID.constructor.prototype.canPlayType=function(t){return t&&co.test(t)?"maybe":ao.call(this,t)})},oo.unpatchCanPlayType=function(){var t=oo.TEST_VID.constructor.prototype.canPlayType;return oo.TEST_VID.constructor.prototype.canPlayType=ao,t},oo.patchCanPlayType(),oo.disposeMediaElement=function(t){if(t){for(t.parentNode&&t.parentNode.removeChild(t);t.hasChildNodes();)t.removeChild(t.firstChild);t.removeAttribute("src"),"function"==typeof t.load&&function(){try{t.load()}catch(t){}}()}},oo.resetMediaElement=function(t){if(t){for(var e=t.querySelectorAll("source"),n=e.length;n--;)t.removeChild(e[n]);t.removeAttribute("src"),"function"==typeof t.load&&function(){try{t.load()}catch(t){}}()}},["muted","defaultMuted","autoplay","controls","loop","playsinline"].forEach(function(t){oo.prototype[t]=function(){return this.el_[t]||this.el_.hasAttribute(t)}}),["muted","defaultMuted","autoplay","loop","playsinline"].forEach(function(t){oo.prototype["set"+Q(t)]=function(e){this.el_[t]=e,e?this.el_.setAttribute(t,t):this.el_.removeAttribute(t)}}),["paused","currentTime","buffered","volume","poster","preload","error","seeking","seekable","ended","playbackRate","defaultPlaybackRate","played","networkState","readyState","videoWidth","videoHeight"].forEach(function(t){oo.prototype[t]=function(){return this.el_[t]}}),["volume","src","poster","preload","playbackRate","defaultPlaybackRate"].forEach(function(t){oo.prototype["set"+Q(t)]=function(e){this.el_[t]=e}}),["pause","load","play"].forEach(function(t){oo.prototype[t]=function(){return this.el_[t]()}}),Vr.withSourceHandlers(oo),oo.nativeSourceHandler={},oo.nativeSourceHandler.canPlayType=function(t){try{return oo.TEST_VID.canPlayType(t)}catch(t){return""}},oo.nativeSourceHandler.canHandleSource=function(t,e){if(t.type)return oo.nativeSourceHandler.canPlayType(t.type);if(t.src){var n=er(t.src);return oo.nativeSourceHandler.canPlayType("video/"+n)}return""},oo.nativeSourceHandler.handleSource=function(t,e,n){e.setSrc(t.src)},oo.nativeSourceHandler.dispose=function(){},oo.registerSourceHandler(oo.nativeSourceHandler),Vr.registerTech("Html5",oo);var uo=He(["\n        Using the tech directly can be dangerous. I hope you know what you're doing.\n        See https://github.com/videojs/video.js/issues/2617 for more info.\n      "],["\n        Using the tech directly can be dangerous. I hope you know what you're doing.\n        See https://github.com/videojs/video.js/issues/2617 for more info.\n      "]),ho=["progress","abort","suspend","emptied","stalled","loadedmetadata","loadeddata","timeupdate","ratechange","resize","volumechange","texttrackchange"],po=function(t){function e(n,i,o){if(Be(this,e),n.id=n.id||"vjs_video_"+B(),i=r(e.getTagSettings(n),i),i.initChildren=!1,i.createEl=!1,i.evented=!1,i.reportTouchActivity=!1,!i.language)if("function"==typeof n.closest){var s=n.closest("[lang]");s&&s.getAttribute&&(i.language=s.getAttribute("lang"))}else for(var a=n;a&&1===a.nodeType;){if(k(a).hasOwnProperty("lang")){i.language=a.getAttribute("lang");break}a=a.parentNode}var l=Ve(this,t.call(this,null,i,o));if(l.isReady_=!1,l.hasStarted_=!1,l.userActive_=!1,!l.options_||!l.options_.techOrder||!l.options_.techOrder.length)throw new Error("No techOrder specified. Did you overwrite videojs.options instead of just changing the properties you want to override?");if(l.tag=n,l.tagAttributes=n&&k(n),l.language(l.options_.language),i.languages){var c={};Object.getOwnPropertyNames(i.languages).forEach(function(t){c[t.toLowerCase()]=i.languages[t]}),l.languages_=c}else l.languages_=e.prototype.options_.languages;l.cache_={},l.poster_=i.poster||"",l.controls_=!!i.controls,l.cache_.lastVolume=1,n.controls=!1,n.removeAttribute("controls"),l.scrubbing_=!1,l.el_=l.createEl(),$(l,{eventBusKey:"el_"});var u=tt(l.options_);if(i.plugins){var h=i.plugins;Object.keys(h).forEach(function(t){if("function"!=typeof this[t])throw new Error('plugin "'+t+'" does not exist');this[t](h[t])},l)}l.options_.playerOptions=u,l.middleware_=[],l.initChildren(),l.isAudio("audio"===n.nodeName.toLowerCase()),l.controls()?l.addClass("vjs-controls-enabled"):l.addClass("vjs-controls-disabled"),l.el_.setAttribute("role","region"),l.isAudio()?l.el_.setAttribute("aria-label",l.localize("Audio Player")):l.el_.setAttribute("aria-label",l.localize("Video Player")),l.isAudio()&&l.addClass("vjs-audio"),l.flexNotSupported_()&&l.addClass("vjs-no-flex"),be||l.addClass("vjs-workinghover"),e.players[l.id_]=l;var p=oe.split(".")[0];return l.addClass("vjs-v"+p),l.userActive(!0),l.reportUserActivity(),l.listenForUserActivity_(),l.on("fullscreenchange",l.handleFullscreenChange_),l.on("stageclick",l.handleStageClick_),l.changingSrc_=!1,l.playWaitingForReady_=!1,l.playOnLoadstart_=null,
l.forceAutoplayInChrome_(),l}return Fe(e,t),e.prototype.dispose=function(){this.trigger("dispose"),this.off("dispose"),this.styleEl_&&this.styleEl_.parentNode&&(this.styleEl_.parentNode.removeChild(this.styleEl_),this.styleEl_=null),e.players[this.id_]=null,this.tag&&this.tag.player&&(this.tag.player=null),this.el_&&this.el_.player&&(this.el_.player=null),this.tech_&&this.tech_.dispose(),this.playerElIngest_&&(this.playerElIngest_=null),this.tag&&(this.tag=null),t.prototype.dispose.call(this)},e.prototype.createEl=function(){var e=this.tag,n=void 0,r=this.playerElIngest_=e.parentNode&&e.parentNode.hasAttribute&&e.parentNode.hasAttribute("data-vjs-player"),i="video-js"===this.tag.tagName.toLowerCase();r?n=this.el_=e.parentNode:i||(n=this.el_=t.prototype.createEl.call(this,"div"));var o=k(e);if(i){for(n=this.el_=e,e=this.tag=de.createElement("video");n.children.length;)e.appendChild(n.firstChild);m(n,"video-js")||_(n,"video-js"),n.appendChild(e),r=this.playerElIngest_=n}if(e.setAttribute("tabindex","-1"),e.removeAttribute("width"),e.removeAttribute("height"),Object.getOwnPropertyNames(o).forEach(function(t){"class"===t?(n.className+=" "+o[t],i&&(e.className+=" "+o[t])):(n.setAttribute(t,o[t]),i&&e.setAttribute(t,o[t]))}),e.playerId=e.id,e.id+="_html5_api",e.className="vjs-tech",e.player=n.player=this,this.addClass("vjs-paused"),!0!==le.VIDEOJS_NO_DYNAMIC_STYLE){this.styleEl_=un("vjs-styles-dimensions");var s=Je(".vjs-styles-defaults"),a=Je("head");a.insertBefore(this.styleEl_,s?s.nextSibling:a.firstChild)}this.width(this.options_.width),this.height(this.options_.height),this.fluid(this.options_.fluid),this.aspectRatio(this.options_.aspectRatio);for(var l=e.getElementsByTagName("a"),c=0;c<l.length;c++){var u=l.item(c);_(u,"vjs-hidden"),u.setAttribute("hidden","hidden")}return e.initNetworkState_=e.networkState,e.parentNode&&!r&&e.parentNode.insertBefore(n,e),g(e,n),this.children_.unshift(e),this.el_.setAttribute("lang",this.language_),this.el_=n,n},e.prototype.width=function(t,e){return this.dimension("width",t,e)},e.prototype.height=function(t,e){return this.dimension("height",t,e)},e.prototype.dimension=function(t,e,n){var r=t+"_";if(void 0===e)return this[r]||0;if(""===e)return this[r]=void 0,void this.updateStyleEl_();var i=parseFloat(e);if(isNaN(i))return void Ye.error('Improper value "'+e+'" supplied for for '+t);this[r]=i,this.updateStyleEl_(),this.isReady_&&!n&&this.trigger("playerresize")},e.prototype.fluid=function(t){if(void 0===t)return!!this.fluid_;this.fluid_=!!t,t?this.addClass("vjs-fluid"):this.removeClass("vjs-fluid"),this.updateStyleEl_()},e.prototype.aspectRatio=function(t){if(void 0===t)return this.aspectRatio_;if(!/^\d+\:\d+$/.test(t))throw new Error("Improper value supplied for aspect ratio. The format should be width:height, for example 16:9.");this.aspectRatio_=t,this.fluid(!0),this.updateStyleEl_()},e.prototype.updateStyleEl_=function(){if(!0===le.VIDEOJS_NO_DYNAMIC_STYLE){var t="number"==typeof this.width_?this.width_:this.options_.width,e="number"==typeof this.height_?this.height_:this.options_.height,n=this.tech_&&this.tech_.el();return void(n&&(t>=0&&(n.width=t),e>=0&&(n.height=e)))}var r=void 0,i=void 0,o=void 0,s=void 0;o=void 0!==this.aspectRatio_&&"auto"!==this.aspectRatio_?this.aspectRatio_:this.videoWidth()>0?this.videoWidth()+":"+this.videoHeight():"16:9";var a=o.split(":"),l=a[1]/a[0];r=void 0!==this.width_?this.width_:void 0!==this.height_?this.height_/l:this.videoWidth()||300,i=void 0!==this.height_?this.height_:r*l,s=/^[^a-zA-Z]/.test(this.id())?"dimensions-"+this.id():this.id()+"-dimensions",this.addClass(s),hn(this.styleEl_,"\n      ."+s+" {\n        width: "+r+"px;\n        height: "+i+"px;\n      }\n\n      ."+s+".vjs-fluid {\n        padding-top: "+100*l+"%;\n      }\n    ")},e.prototype.loadTech_=function(t,e){var n=this;this.tech_&&this.unloadTech_();var i=Q(t),o=t.charAt(0).toLowerCase()+t.slice(1);"Html5"!==i&&this.tag&&(Vr.getTech("Html5").disposeMediaElement(this.tag),this.tag.player=null,this.tag=null),this.techName_=i,this.isReady_=!1;var s={source:e,nativeControlsForTouch:this.options_.nativeControlsForTouch,playerId:this.id(),techId:this.id()+"_"+i+"_api",autoplay:this.options_.autoplay,playsinline:this.options_.playsinline,preload:this.options_.preload,loop:this.options_.loop,muted:this.options_.muted,poster:this.poster(),language:this.language(),playerElIngest:this.playerElIngest_||!1,"vtt.js":this.options_["vtt.js"]};wr.names.forEach(function(t){var e=wr[t];s[e.getterName]=n[e.privateName]}),r(s,this.options_[i]),r(s,this.options_[o]),r(s,this.options_[t.toLowerCase()]),this.tag&&(s.tag=this.tag),e&&e.src===this.cache_.src&&this.cache_.currentTime>0&&(s.startTime=this.cache_.currentTime);var a=Vr.getTech(t);if(!a)throw new Error("No Tech named '"+i+"' exists! '"+i+"' should be registered using videojs.registerTech()'");this.tech_=new a(s),this.tech_.ready(pn(this,this.handleTechReady_),!0),Ln.jsonToTextTracks(this.textTracksJson_||[],this.tech_),ho.forEach(function(t){n.on(n.tech_,t,n["handleTech"+Q(t)+"_"])}),this.on(this.tech_,"loadstart",this.handleTechLoadStart_),this.on(this.tech_,"waiting",this.handleTechWaiting_),this.on(this.tech_,"canplay",this.handleTechCanPlay_),this.on(this.tech_,"canplaythrough",this.handleTechCanPlayThrough_),this.on(this.tech_,"playing",this.handleTechPlaying_),this.on(this.tech_,"ended",this.handleTechEnded_),this.on(this.tech_,"seeking",this.handleTechSeeking_),this.on(this.tech_,"seeked",this.handleTechSeeked_),this.on(this.tech_,"play",this.handleTechPlay_),this.on(this.tech_,"firstplay",this.handleTechFirstPlay_),this.on(this.tech_,"pause",this.handleTechPause_),this.on(this.tech_,"durationchange",this.handleTechDurationChange_),this.on(this.tech_,"fullscreenchange",this.handleTechFullscreenChange_),this.on(this.tech_,"error",this.handleTechError_),this.on(this.tech_,"loadedmetadata",this.updateStyleEl_),this.on(this.tech_,"posterchange",this.handleTechPosterChange_),this.on(this.tech_,"textdata",this.handleTechTextData_),this.usingNativeControls(this.techGet_("controls")),this.controls()&&!this.usingNativeControls()&&this.addTechControlsListeners_(),this.tech_.el().parentNode===this.el()||"Html5"===i&&this.tag||g(this.tech_.el(),this.el()),this.tag&&(this.tag.player=null,this.tag=null)},e.prototype.unloadTech_=function(){var t=this;wr.names.forEach(function(e){var n=wr[e];t[n.privateName]=t[n.getterName]()}),this.textTracksJson_=Ln.textTracksToJson(this.tech_),this.isReady_=!1,this.tech_.dispose(),this.tech_=!1},e.prototype.tech=function(t){return void 0===t&&Ye.warn(Ge(uo)),this.tech_},e.prototype.addTechControlsListeners_=function(){this.removeTechControlsListeners_(),this.on(this.tech_,"mousedown",this.handleTechClick_),this.on(this.tech_,"touchstart",this.handleTechTouchStart_),this.on(this.tech_,"touchmove",this.handleTechTouchMove_),this.on(this.tech_,"touchend",this.handleTechTouchEnd_),this.on(this.tech_,"tap",this.handleTechTap_)},e.prototype.removeTechControlsListeners_=function(){this.off(this.tech_,"tap",this.handleTechTap_),this.off(this.tech_,"touchstart",this.handleTechTouchStart_),this.off(this.tech_,"touchmove",this.handleTechTouchMove_),this.off(this.tech_,"touchend",this.handleTechTouchEnd_),this.off(this.tech_,"mousedown",this.handleTechClick_)},e.prototype.handleTechReady_=function(){if(this.triggerReady(),this.cache_.volume&&this.techCall_("setVolume",this.cache_.volume),this.handleTechPosterChange_(),this.handleTechDurationChange_(),(this.src()||this.currentSrc())&&this.tag&&this.options_.autoplay&&this.paused())try{delete this.tag.poster}catch(t){Ye("deleting tag.poster throws in some browsers",t)}},e.prototype.handleTechLoadStart_=function(){this.removeClass("vjs-ended"),this.removeClass("vjs-seeking"),this.error(null),this.paused()?(this.hasStarted(!1),this.trigger("loadstart")):(this.trigger("loadstart"),this.trigger("firstplay"))},e.prototype.hasStarted=function(t){if(void 0===t)return this.hasStarted_;t!==this.hasStarted_&&(this.hasStarted_=t,this.hasStarted_?(this.addClass("vjs-has-started"),this.trigger("firstplay")):this.removeClass("vjs-has-started"))},e.prototype.handleTechPlay_=function(){this.removeClass("vjs-ended"),this.removeClass("vjs-paused"),this.addClass("vjs-playing"),this.hasStarted(!0),this.trigger("play")},e.prototype.handleTechWaiting_=function(){var t=this;this.addClass("vjs-waiting"),this.trigger("waiting"),this.one("timeupdate",function(){return t.removeClass("vjs-waiting")})},e.prototype.handleTechCanPlay_=function(){this.removeClass("vjs-waiting"),this.trigger("canplay")},e.prototype.handleTechCanPlayThrough_=function(){this.removeClass("vjs-waiting"),this.trigger("canplaythrough")},e.prototype.handleTechPlaying_=function(){this.removeClass("vjs-waiting"),this.trigger("playing")},e.prototype.handleTechSeeking_=function(){this.addClass("vjs-seeking"),this.trigger("seeking")},e.prototype.handleTechSeeked_=function(){this.removeClass("vjs-seeking"),this.trigger("seeked")},e.prototype.handleTechFirstPlay_=function(){this.options_.starttime&&(Ye.warn("Passing the `starttime` option to the player will be deprecated in 6.0"),this.currentTime(this.options_.starttime)),this.addClass("vjs-has-started"),this.trigger("firstplay")},e.prototype.handleTechPause_=function(){this.removeClass("vjs-playing"),this.addClass("vjs-paused"),this.trigger("pause")},e.prototype.handleTechEnded_=function(){this.addClass("vjs-ended"),this.options_.loop?(this.currentTime(0),this.play()):this.paused()||this.pause(),this.trigger("ended")},e.prototype.handleTechDurationChange_=function(){this.duration(this.techGet_("duration"))},e.prototype.handleTechClick_=function(t){R(t)&&this.controls_&&(this.paused()?this.play():this.pause())},e.prototype.handleTechTap_=function(){this.userActive(!this.userActive())},e.prototype.handleTechTouchStart_=function(){this.userWasActive=this.userActive()},e.prototype.handleTechTouchMove_=function(){this.userWasActive&&this.reportUserActivity()},e.prototype.handleTechTouchEnd_=function(t){t.preventDefault()},e.prototype.handleFullscreenChange_=function(){this.isFullscreen()?this.addClass("vjs-fullscreen"):this.removeClass("vjs-fullscreen")},e.prototype.handleStageClick_=function(){this.reportUserActivity()},e.prototype.handleTechFullscreenChange_=function(t,e){e&&this.isFullscreen(e.isFullscreen),this.trigger("fullscreenchange")},e.prototype.handleTechError_=function(){var t=this.tech_.error();this.error(t)},e.prototype.handleTechTextData_=function(){var t=null;arguments.length>1&&(t=arguments[1]),this.trigger("textdata",t)},e.prototype.getCache=function(){return this.cache_},e.prototype.techCall_=function(t,e){this.ready(function(){if(t in Ur)return Yt(this.middleware_,this.tech_,t,e);try{this.tech_&&this.tech_[t](e)}catch(t){throw Ye(t),t}},!0)},e.prototype.techGet_=function(t){if(this.tech_&&this.tech_.isReady_){if(t in Wr)return Kt(this.middleware_,this.tech_,t);try{return this.tech_[t]()}catch(e){if(void 0===this.tech_[t])throw Ye("Video.js: "+t+" method not defined for "+this.techName_+" playback technology.",e),e;if("TypeError"===e.name)throw Ye("Video.js: "+t+" unavailable on "+this.techName_+" playback technology element.",e),this.tech_.isReady_=!1,e;throw Ye(e),e}}},e.prototype.play=function(){var t=this;if(this.playOnLoadstart_&&this.off("loadstart",this.playOnLoadstart_),this.isReady_){if(!this.changingSrc_&&(this.src()||this.currentSrc()))return this.techGet_("play");this.playOnLoadstart_=function(){t.playOnLoadstart_=null,ct(t.play())},this.one("loadstart",this.playOnLoadstart_)}else{if(this.playWaitingForReady_)return;this.playWaitingForReady_=!0,this.ready(function(){t.playWaitingForReady_=!1,ct(t.play())})}},e.prototype.pause=function(){this.techCall_("pause")},e.prototype.paused=function(){return!1!==this.techGet_("paused")},e.prototype.played=function(){return this.techGet_("played")||it(0,0)},e.prototype.scrubbing=function(t){if(void 0===t)return this.scrubbing_;this.scrubbing_=!!t,t?this.addClass("vjs-scrubbing"):this.removeClass("vjs-scrubbing")},e.prototype.currentTime=function(t){return void 0!==t?(t<0&&(t=0),void this.techCall_("setCurrentTime",t)):(this.cache_.currentTime=this.techGet_("currentTime")||0,this.cache_.currentTime)},e.prototype.duration=function(t){if(void 0===t)return void 0!==this.cache_.duration?this.cache_.duration:NaN;t=parseFloat(t),t<0&&(t=1/0),t!==this.cache_.duration&&(this.cache_.duration=t,t===1/0?this.addClass("vjs-live"):this.removeClass("vjs-live"),this.trigger("durationchange"))},e.prototype.remainingTime=function(){return this.duration()-this.currentTime()},e.prototype.remainingTimeDisplay=function(){return Math.floor(this.duration())-Math.floor(this.currentTime())},e.prototype.buffered=function(){var t=this.techGet_("buffered");return t&&t.length||(t=it(0,0)),t},e.prototype.bufferedPercent=function(){return ot(this.buffered(),this.duration())},e.prototype.bufferedEnd=function(){var t=this.buffered(),e=this.duration(),n=t.end(t.length-1);return n>e&&(n=e),n},e.prototype.volume=function(t){var e=void 0;return void 0!==t?(e=Math.max(0,Math.min(1,parseFloat(t))),this.cache_.volume=e,this.techCall_("setVolume",e),void(e>0&&this.lastVolume_(e))):(e=parseFloat(this.techGet_("volume")),isNaN(e)?1:e)},e.prototype.muted=function(t){return void 0!==t?void this.techCall_("setMuted",t):this.techGet_("muted")||!1},e.prototype.defaultMuted=function(t){return void 0!==t?this.techCall_("setDefaultMuted",t):this.techGet_("defaultMuted")||!1},e.prototype.lastVolume_=function(t){return void 0!==t&&0!==t?void(this.cache_.lastVolume=t):this.cache_.lastVolume},e.prototype.supportsFullScreen=function(){return this.techGet_("supportsFullScreen")||!1},e.prototype.isFullscreen=function(t){return void 0!==t?void(this.isFullscreen_=!!t):!!this.isFullscreen_},e.prototype.requestFullscreen=function(){var t=wn;this.isFullscreen(!0),t.requestFullscreen?(X(de,t.fullscreenchange,pn(this,function e(n){this.isFullscreen(de[t.fullscreenElement]),!1===this.isFullscreen()&&q(de,t.fullscreenchange,e),this.trigger("fullscreenchange")})),this.el_[t.requestFullscreen]()):this.tech_.supportsFullScreen()?this.techCall_("enterFullScreen"):(this.enterFullWindow(),this.trigger("fullscreenchange"))},e.prototype.exitFullscreen=function(){var t=wn;this.isFullscreen(!1),t.requestFullscreen?de[t.exitFullscreen]():this.tech_.supportsFullScreen()?this.techCall_("exitFullScreen"):(this.exitFullWindow(),this.trigger("fullscreenchange"))},e.prototype.enterFullWindow=function(){this.isFullWindow=!0,this.docOrigOverflow=de.documentElement.style.overflow,X(de,"keydown",pn(this,this.fullWindowOnEscKey)),de.documentElement.style.overflow="hidden",_(de.body,"vjs-full-window"),this.trigger("enterFullWindow")},e.prototype.fullWindowOnEscKey=function(t){27===t.keyCode&&(!0===this.isFullscreen()?this.exitFullscreen():this.exitFullWindow())},e.prototype.exitFullWindow=function(){this.isFullWindow=!1,q(de,"keydown",this.fullWindowOnEscKey),de.documentElement.style.overflow=this.docOrigOverflow,b(de.body,"vjs-full-window"),this.trigger("exitFullWindow")},e.prototype.canPlayType=function(t){for(var e=void 0,n=0,r=this.options_.techOrder;n<r.length;n++){var i=r[n],o=Vr.getTech(i);if(o||(o=En.getComponent(i)),o){if(o.isSupported()&&(e=o.canPlayType(t)))return e}else Ye.error('The "'+i+'" tech is undefined. Skipped browser support check for that tech.')}return""},e.prototype.selectSource=function(t){var e=this,n=this.options_.techOrder.map(function(t){return[t,Vr.getTech(t)]}).filter(function(t){var e=t[0],n=t[1];return n?n.isSupported():(Ye.error('The "'+e+'" tech is undefined. Skipped browser support check for that tech.'),!1)}),r=function(t,e,n){var r=void 0;return t.some(function(t){return e.some(function(e){if(r=n(t,e))return!0})}),r},i=function(t,n){var r=t[0];if(t[1].canPlaySource(n,e.options_[r.toLowerCase()]))return{source:n,tech:r}};return(this.options_.sourceOrder?r(t,n,function(t){return function(e,n){return t(n,e)}}(i)):r(n,t,i))||!1},e.prototype.src=function(t){var e=this;if(void 0===t)return this.cache_.src||"";var n=zr(t);if(!n.length)return void this.setTimeout(function(){this.error({code:4,message:this.localize(this.options_.notSupportedMessage)})},0);this.cache_.sources=n,this.changingSrc_=!0,this.cache_.source=n[0],Xt(this,n[0],function(t,r){if(e.middleware_=r,e.src_(t))return n.length>1?e.src(n.slice(1)):(e.setTimeout(function(){this.error({code:4,message:this.localize(this.options_.notSupportedMessage)})},0),void e.triggerReady());e.changingSrc_=!1,e.cache_.src=t.src,qt(r,e.tech_)})},e.prototype.src_=function(t){var e=this.selectSource([t]);return!e||(Z(e.tech,this.techName_)?(this.ready(function(){this.tech_.constructor.prototype.hasOwnProperty("setSource")?this.techCall_("setSource",t):this.techCall_("src",t.src),"auto"===this.options_.preload&&this.load()},!0),!1):(this.changingSrc_=!0,this.loadTech_(e.tech,e.source),!1))},e.prototype.load=function(){this.techCall_("load")},e.prototype.reset=function(){this.loadTech_(this.options_.techOrder[0],null),this.techCall_("reset")},e.prototype.currentSources=function(){var t=this.currentSource(),e=[];return 0!==Object.keys(t).length&&e.push(t),this.cache_.sources||e},e.prototype.currentSource=function(){return this.cache_.source||{}},e.prototype.currentSrc=function(){return this.currentSource()&&this.currentSource().src||""},e.prototype.currentType=function(){return this.currentSource()&&this.currentSource().type||""},e.prototype.preload=function(t){return void 0!==t?(this.techCall_("setPreload",t),void(this.options_.preload=t)):this.techGet_("preload")},e.prototype.autoplay=function(t){return void 0!==t?(this.techCall_("setAutoplay",t),this.options_.autoplay=t,void this.ready(this.forceAutoplayInChrome_)):this.techGet_("autoplay",t)},e.prototype.forceAutoplayInChrome_=function(){this.paused()&&(this.autoplay()||this.options_.autoplay)&&je&&!Ce&&this.play()},e.prototype.playsinline=function(t){return void 0!==t?(this.techCall_("setPlaysinline",t),this.options_.playsinline=t,this):this.techGet_("playsinline")},e.prototype.loop=function(t){return void 0!==t?(this.techCall_("setLoop",t),void(this.options_.loop=t)):this.techGet_("loop")},e.prototype.poster=function(t){if(void 0===t)return this.poster_;t||(t=""),this.poster_=t,this.techCall_("setPoster",t),this.trigger("posterchange")},e.prototype.handleTechPosterChange_=function(){!this.poster_&&this.tech_&&this.tech_.poster&&(this.poster_=this.tech_.poster()||"",this.trigger("posterchange"))},e.prototype.controls=function(t){if(void 0===t)return!!this.controls_;t=!!t,this.controls_!==t&&(this.controls_=t,this.usingNativeControls()&&this.techCall_("setControls",t),this.controls_?(this.removeClass("vjs-controls-disabled"),this.addClass("vjs-controls-enabled"),this.trigger("controlsenabled"),this.usingNativeControls()||this.addTechControlsListeners_()):(this.removeClass("vjs-controls-enabled"),this.addClass("vjs-controls-disabled"),this.trigger("controlsdisabled"),this.usingNativeControls()||this.removeTechControlsListeners_()))},e.prototype.usingNativeControls=function(t){if(void 0===t)return!!this.usingNativeControls_;t=!!t,this.usingNativeControls_!==t&&(this.usingNativeControls_=t,this.usingNativeControls_?(this.addClass("vjs-using-native-controls"),this.trigger("usingnativecontrols")):(this.removeClass("vjs-using-native-controls"),this.trigger("usingcustomcontrols")))},e.prototype.error=function(t){return void 0===t?this.error_||null:null===t?(this.error_=t,this.removeClass("vjs-error"),void(this.errorDisplay&&this.errorDisplay.close())):(this.error_=new st(t),this.addClass("vjs-error"),Ye.error("(CODE:"+this.error_.code+" "+st.errorTypes[this.error_.code]+")",this.error_.message,this.error_),void this.trigger("error"))},e.prototype.reportUserActivity=function(t){this.userActivity_=!0},e.prototype.userActive=function(t){if(void 0===t)return this.userActive_;if((t=!!t)!==this.userActive_){if(this.userActive_=t,this.userActive_)return this.userActivity_=!0,this.removeClass("vjs-user-inactive"),this.addClass("vjs-user-active"),void this.trigger("useractive");this.tech_&&this.tech_.one("mousemove",function(t){t.stopPropagation(),t.preventDefault()}),this.userActivity_=!1,this.removeClass("vjs-user-active"),this.addClass("vjs-user-inactive"),this.trigger("userinactive")}},e.prototype.listenForUserActivity_=function(){var t=void 0,e=void 0,n=void 0,r=pn(this,this.reportUserActivity),i=function(t){t.screenX===e&&t.screenY===n||(e=t.screenX,n=t.screenY,r())},o=function(){r(),this.clearInterval(t),t=this.setInterval(r,250)},s=function(e){r(),this.clearInterval(t)};this.on("mousedown",o),this.on("mousemove",i),this.on("mouseup",s),this.on("keydown",r),this.on("keyup",r);var a=void 0;this.setInterval(function(){if(this.userActivity_){this.userActivity_=!1,this.userActive(!0),this.clearTimeout(a);var t=this.options_.inactivityTimeout;t<=0||(a=this.setTimeout(function(){this.userActivity_||this.userActive(!1)},t))}},250)},e.prototype.playbackRate=function(t){return void 0!==t?void this.techCall_("setPlaybackRate",t):this.tech_&&this.tech_.featuresPlaybackRate?this.techGet_("playbackRate"):1},e.prototype.defaultPlaybackRate=function(t){return void 0!==t?this.techCall_("setDefaultPlaybackRate",t):this.tech_&&this.tech_.featuresPlaybackRate?this.techGet_("defaultPlaybackRate"):1},e.prototype.isAudio=function(t){return void 0!==t?void(this.isAudio_=!!t):!!this.isAudio_},e.prototype.addTextTrack=function(t,e,n){if(this.tech_)return this.tech_.addTextTrack(t,e,n)},e.prototype.addRemoteTextTrack=function(t,e){if(this.tech_)return this.tech_.addRemoteTextTrack(t,e)},e.prototype.removeRemoteTextTrack=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.track,n=void 0===e?arguments[0]:e;if(this.tech_)return this.tech_.removeRemoteTextTrack(n)},e.prototype.getVideoPlaybackQuality=function(){return this.techGet_("getVideoPlaybackQuality")},e.prototype.videoWidth=function(){return this.tech_&&this.tech_.videoWidth&&this.tech_.videoWidth()||0},e.prototype.videoHeight=function(){return this.tech_&&this.tech_.videoHeight&&this.tech_.videoHeight()||0},e.prototype.language=function(t){if(void 0===t)return this.language_;this.language_=String(t).toLowerCase()},e.prototype.languages=function(){return tt(e.prototype.options_.languages,this.languages_)},e.prototype.toJSON=function(){var t=tt(this.options_),e=t.tracks;t.tracks=[];for(var n=0;n<e.length;n++){var r=e[n];r=tt(r),r.player=void 0,t.tracks[n]=r}return t},e.prototype.createModal=function(t,e){var n=this;e=e||{},e.content=t||"";var r=new Bn(this,e);return this.addChild(r),r.on("dispose",function(){n.removeChild(r)}),r.open(),r},e.getTagSettings=function(t){var e={sources:[],tracks:[]},n=k(t),i=n["data-setup"];if(m(t,"vjs-fluid")&&(n.fluid=!0),null!==i){var o=Nn(i||"{}"),s=o[0],a=o[1];s&&Ye.error(s),r(n,a)}if(r(e,n),t.hasChildNodes())for(var l=t.childNodes,c=0,u=l.length;c<u;c++){var h=l[c],p=h.nodeName.toLowerCase();"source"===p?e.sources.push(k(h)):"track"===p&&e.tracks.push(k(h))}return e},e.prototype.flexNotSupported_=function(){var t=de.createElement("i");return!("flexBasis"in t.style||"webkitFlexBasis"in t.style||"mozFlexBasis"in t.style||"msFlexBasis"in t.style||"msFlexOrder"in t.style)},e}(En);wr.names.forEach(function(t){var e=wr[t];po.prototype[e.getterName]=function(){return this.tech_?this.tech_[e.getterName]():(this[e.privateName]=this[e.privateName]||new e.ListClass,this[e.privateName])}}),po.players={};var fo=le.navigator;po.prototype.options_={techOrder:Vr.defaultTechOrder_,html5:{},flash:{},inactivityTimeout:2e3,playbackRates:[],children:["mediaLoader","posterImage","textTrackDisplay","loadingSpinner","bigPlayButton","controlBar","errorDisplay","textTrackSettings"],language:fo&&(fo.languages&&fo.languages[0]||fo.userLanguage||fo.language)||"en",languages:{},notSupportedMessage:"No compatible source was found for this media."},["ended","seeking","seekable","networkState","readyState"].forEach(function(t){po.prototype[t]=function(){return this.techGet_(t)}}),ho.forEach(function(t){po.prototype["handleTech"+Q(t)+"_"]=function(){return this.trigger(t)}}),En.registerComponent("Player",po);var vo={},yo=function(t){return vo.hasOwnProperty(t)},go=function(t){return yo(t)?vo[t]:void 0},mo=function(t,e){t.activePlugins_=t.activePlugins_||{},t.activePlugins_[e]=!0},_o=function(t,e,n){var r=(n?"before":"")+"pluginsetup";t.trigger(r,e),t.trigger(r+":"+e.name,e)},bo=function(t,e){var n=function(){_o(this,{name:t,plugin:e,instance:null},!0);var n=e.apply(this,arguments);return mo(this,t),_o(this,{name:t,plugin:e,instance:n}),n};return Object.keys(e).forEach(function(t){n[t]=e[t]}),n},To=function(t,e){return e.prototype.name=t,function(){_o(this,{name:t,plugin:e,instance:null},!0);for(var n=arguments.length,r=Array(n),i=0;i<n;i++)r[i]=arguments[i];var o=new(Function.prototype.bind.apply(e,[null].concat([this].concat(r))));return this[t]=function(){return o},_o(this,o.getEventHash()),o}},Co=function(){function t(e){if(Be(this,t),this.constructor===t)throw new Error("Plugin must be sub-classed; not directly instantiated.");this.player=e,$(this),delete this.trigger,J(this,this.constructor.defaultState),mo(e,this.name),this.dispose=pn(this,this.dispose),e.on("dispose",this.dispose)}return t.prototype.version=function(){return this.constructor.VERSION},t.prototype.getEventHash=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return t.name=this.name,t.plugin=this.constructor,t.instance=this,t},t.prototype.trigger=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return K(this.eventBusEl_,t,this.getEventHash(e))},t.prototype.handleStateChanged=function(t){},t.prototype.dispose=function(){var t=this.name,e=this.player;this.trigger("dispose"),this.off(),e.off("dispose",this.dispose),e.activePlugins_[t]=!1,this.player=this.state=null,e[t]=To(t,vo[t])},t.isBasic=function(e){var n="string"==typeof e?go(e):e;return"function"==typeof n&&!t.prototype.isPrototypeOf(n.prototype)},t.registerPlugin=function(e,n){if("string"!=typeof e)throw new Error('Illegal plugin name, "'+e+'", must be a string, was '+(void 0===e?"undefined":Re(e))+".");if(yo(e))Ye.warn('A plugin named "'+e+'" already exists. You may want to avoid re-registering plugins!');else if(po.prototype.hasOwnProperty(e))throw new Error('Illegal plugin name, "'+e+'", cannot share a name with an existing player method!');if("function"!=typeof n)throw new Error('Illegal plugin for "'+e+'", must be a function, was '+(void 0===n?"undefined":Re(n))+".");return vo[e]=n,"plugin"!==e&&(t.isBasic(n)?po.prototype[e]=bo(e,n):po.prototype[e]=To(e,n)),n},t.deregisterPlugin=function(t){if("plugin"===t)throw new Error("Cannot de-register base plugin.");yo(t)&&(delete vo[t],delete po.prototype[t])},t.getPlugins=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Object.keys(vo),e=void 0;return t.forEach(function(t){var n=go(t);n&&(e=e||{},e[t]=n)}),e},t.getPluginVersion=function(t){var e=go(t);return e&&e.VERSION||""},t}();Co.getPlugin=go,Co.BASE_PLUGIN_NAME="plugin",Co.registerPlugin("plugin",Co),po.prototype.usingPlugin=function(t){return!!this.activePlugins_&&!0===this.activePlugins_[t]},po.prototype.hasPlugin=function(t){return!!yo(t)};var ko=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+(void 0===e?"undefined":Re(e)));t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(t.super_=e)},Eo=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=function(){t.apply(this,arguments)},r={};"object"===(void 0===e?"undefined":Re(e))?(e.constructor!==Object.prototype.constructor&&(n=e.constructor),r=e):"function"==typeof e&&(n=e),ko(n,t);for(var i in r)r.hasOwnProperty(i)&&(n.prototype[i]=r[i]);return n};if("undefined"==typeof HTMLVideoElement&&h()&&(de.createElement("video"),de.createElement("audio"),de.createElement("track"),de.createElement("video-js")),re.hooks_={},re.hooks=function(t,e){return re.hooks_[t]=re.hooks_[t]||[],e&&(re.hooks_[t]=re.hooks_[t].concat(e)),re.hooks_[t]},re.hook=function(t,e){re.hooks(t,e)},re.hookOnce=function(t,e){re.hooks(t,[].concat(e).map(function(e){return function n(){return re.removeHook(t,n),e.apply(void 0,arguments)}}))},re.removeHook=function(t,e){var n=re.hooks(t).indexOf(e);return!(n<=-1)&&(re.hooks_[t]=re.hooks_[t].slice(),re.hooks_[t].splice(n,1),!0)},!0!==le.VIDEOJS_NO_DYNAMIC_STYLE&&h()){var wo=Je(".vjs-styles-defaults");if(!wo){wo=un("vjs-styles-defaults");var So=Je("head");So&&So.insertBefore(wo,So.firstChild),hn(wo,"\n      .video-js {\n        width: 300px;\n        height: 150px;\n      }\n\n      .vjs-fluid {\n        padding-top: 56.25%\n      }\n    ")}}return G(1,re),re.VERSION=oe,re.options=po.prototype.options_,re.getPlayers=function(){return po.players},re.players=po.players,re.getComponent=En.getComponent,re.registerComponent=function(t,e){Vr.isTech(e)&&Ye.warn("The "+t+" tech was registered as a component. It should instead be registered using videojs.registerTech(name, tech)"),En.registerComponent.call(En,t,e)},re.getTech=Vr.getTech,re.registerTech=Vr.registerTech,re.use=zt,re.browser=Le,re.TOUCH_ENABLED=Ie,re.extend=Eo,re.mergeOptions=tt,re.bind=pn,re.registerPlugin=Co.registerPlugin,re.plugin=function(t,e){return Ye.warn("videojs.plugin() is deprecated; use videojs.registerPlugin() instead"),Co.registerPlugin(t,e)},re.getPlugins=Co.getPlugins,re.getPlugin=Co.getPlugin,re.getPluginVersion=Co.getPluginVersion,re.addLanguage=function(t,e){var n;return t=(""+t).toLowerCase(),re.options.languages=tt(re.options.languages,(n={},n[t]=e,n)),re.options.languages[t]},re.log=Ye,re.createTimeRange=re.createTimeRanges=it,re.formatTime=Zt,re.parseUrl=Zn,re.isCrossOrigin=nr,re.EventTarget=fn,re.on=X,re.one=Y,re.off=q,re.trigger=K,re.xhr=fr,re.TextTrack=gr,re.AudioTrack=mr,re.VideoTrack=_r,["isEl","isTextNode","createEl","hasClass","addClass","removeClass","toggleClass","setAttributes","getAttributes","emptyEl","appendContent","insertContent"].forEach(function(t){re[t]=function(){return Ye.warn("videojs."+t+"() is deprecated; use videojs.dom."+t+"() instead"),Ze[t].apply(null,arguments)}}),re.computedStyle=a,re.dom=Ze,re.url=rr,re});

/*!
 * Copyright Vidit (heminei)
 */
(function () {
	'use strict';

	if (typeof window.videojs === 'undefined') {
		console.error("Videojs is undefined");
	}

	function vidit(options) {
		var player = this;
		var firstPlay = true;

		var MenuButton = videojs.getComponent('MenuButton');
		var MenuItem = videojs.getComponent('MenuItem');


		var ResolutionMenuItem = videojs.extend(MenuItem, {
			constructor: function (player, options) {
				MenuItem.call(this, player, options);
//				console.log("ResolutionMenuItem", this);

				this.controlText(this.options_.label);
				if (this.options_.selectedSource.label == this.options_.label) {
					this.selected(true);
				}
				this.enableTouchActivity();
			},
			handleClick: function () {
				var currentTime = this.player_.currentTime();
				var isPaused = this.player_.paused();

				this.player_.controlBar.resolutionMenuButton.items.forEach(function (item) {
					item.selected(false);
				});
				this.selected(true);

				this.player_.controlBar.resolutionMenuButton.label.innerHTML = this.options_.label;

				this.player_.src({type: this.options_.type, src: this.options_.src});

				if (this.player_.controls()) {
					this.player_.play();
				}

				this.player_.one("loadeddata", function () {
					this.player_.currentTime(currentTime);
					if (isPaused) {
						this.player_.pause();
					} else {
						this.player_.play();
					}
					this.player_.trigger('resolutionchange');
				});
				this.player_.controlBar.resolutionMenuButton.unpressButton();
			}
		});

		var ResolutionMenuButton = videojs.extend(MenuButton, {
			constructor: function (player, options) {
				MenuButton.call(this, player, options);
				this.controlText('Quality');
				this.enableTouchActivity();

				this.label = document.createElement("div");
				this.label.classList.add('vjs-resolution-button-label');
				this.label.innerHTML = this.options_.selectedSource.label;
				this.el().appendChild(this.label);

				this.addClass("vjs-resolution-button");

//				var myButton = this.addChild('MyButton');
			},
			handleClick: function () {

			},
			createItems: function () {
				var menuButton = this;
				var menuItems = [];
				this.options_.sources.forEach(function (item) {
					item.selectedSource = menuButton.options_.selectedSource;
					menuItems.push(new ResolutionMenuItem(menuButton.player_, item));
				});
				return menuItems;
			}
		});

		player.viditSrc = function (sources) {
			var selectedSource = null;
			var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

			var src = [];
			sources.forEach(function (item) {
				if (item.type == "video/mp4") {
					if (selectedSource === null) {
						selectedSource = item;
					}
					if (windowWidth > item.res) {
						selectedSource = item;
					}
				}
			});

			src.push({type: selectedSource.type, src: selectedSource.src});

			sources.forEach(function (item) {
				if (item.type != "video/mp4") {
					src.push({type: item.type, src: item.src});
				}
			});

			player.src(src);

			if (player.controlBar.resolutionMenuButton) {
				player.controlBar.resolutionMenuButton.dispose();
			}

			player.controlBar.resolutionMenuButton = new ResolutionMenuButton(player, {
				sources: sources.filter(function (item) {
					if (item.type == "video/mp4") {
						return item;
					}
				}),
				selectedSource: selectedSource,
			});
			player.controlBar.el_.insertBefore(player.controlBar.resolutionMenuButton.el_, player.controlBar.getChild('fullscreenToggle').el_);
		};


		player.one("play", function () {
			firstPlay = false;
		});

		player.on("click", function (e) {
			togglePlayPause(e);
		});
		player.on("touchstart", function (e) {
			togglePlayPause(e);
		});

		function togglePlayPause(e) {
			if (firstPlay === false && e.target.nodeName == "VIDEO" && player.controls() === false) {
				if (player.paused()) {
					player.play();
				} else {
					player.pause();
				}
			}
		}

	}

	// register the plugin
	videojs.registerPlugin('vidit', vidit);
})();

/*!
 * Copyright Vidit (heminei)
 */
(function () {
	'use strict';

	if (typeof window.videojs === 'undefined') {
		console.error("Videojs is undefined");
	}

	function unmuteButton(options) {
		var player = this;
		var VjsButton = videojs.getComponent('Button');
		var unmuteButton = new VjsButton(player);

		unmuteButton.addClass("vjs-big-unmute-button");
		unmuteButton.removeClass("vjs-control");
		unmuteButton.on("click", function (e) {
			player.muted(false);
		});
		unmuteButton.on("touchend", function (e) {
			player.muted(false);
		});

		player.on("playing", function () {
			checkButtonVisibility();
		});
		player.on("pause", function () {
			checkButtonVisibility();
		});
		player.on("volumechange", function () {
			checkButtonVisibility();
		});

		player.addChild(unmuteButton);
		checkButtonVisibility();

		function checkButtonVisibility() {
			if (player.muted() === false || player.paused() === true) {
				unmuteButton.hide();
			} else {
				unmuteButton.show();
			}
		}
	}

	unmuteButton.VERSION = "1.0.1";

	// register the plugin
	videojs.registerPlugin('unmuteButton', unmuteButton);
})();

(function (window, document, console, jQuery, videojs) {
    if (typeof window.Vidit !== "undefined") {
        sendError("Vidit script already included");
        return;
    }

    var $ = jQuery.noConflict(true);
    //	videojs.options.flash.swf = "https://media.vidit.io/scripts/v2/video-js.swf";
    var date = new Date();
    loadjscssfile("https://media.vidit.io/scripts/v2/vidit-player.css?v=" + date.getFullYear().toString() + date.getMonth().toString() + date.getDay().toString() + date.getHours().toString(), "css");

    window.Vidit = function () {
        var vidit = {};
        vidit.getVersion = function () {
            return "2.3.1";
        };
        vidit.player = function (options) {
            var player = {};
            var videojsInstance = null;
            var events = [];
            var trackingData = {};
            var lastCurrentTimeSend = null;
            var location = null;

            if (window != window.top && document.referrer) {
                location = document.referrer;
            } else {
                location = window.location.href;
            }

            var trackEvent = function (data) {
                if (trackingData.tracking == 1) {
                    data.url = location;
                    data.trackingViewId = trackingData.viewId;
                    data.currentTime = videojsInstance.currentTime();
                    data.code = options.code;

                    $.ajax({
                        method: "POST",
                        url: "https://vidit.io/load/Src::Site::Controllers::Ajax::Video::Tracking",
                        dataType: "json",
                        data: data
                    }).done(function (json) {

                    }).fail(function (json) {
                        sendError(json.responseJSON.message);
                    }).always(function () {});
                }
            };

            player.on = function (name, fn) {
                if (typeof fn !== "function") {
                    sendError("Callback is not a function");
                }
                if (typeof events[name] !== "object") {
                    events[name] = [];
                }
                events[name].push(fn);

                return player;
            };
            player.trigger = function (name, arg1) {
                if (events[name]) {
                    $.each(events[name], function (key, item) {
                        item(player, arg1);
                    });
                }
                return player;
            };
            player.play = function () {
                if (videojsInstance !== null) {
                    videojsInstance.play();
                }
                return player;
            };
            player.pause = function () {
                if (videojsInstance !== null) {
                    videojsInstance.pause();
                }
                return player;
            };
            player.paused = function () {
                if (videojsInstance !== null) {
                    return videojsInstance.paused();
                }
                return true;
            };
            player.getVideoJsInstance = function () {
                return videojsInstance;
            };
            player.getCurrentTime = function () {
                if (videojsInstance !== null) {
                    return videojsInstance.currentTime();
                }
                return null;
            };
            player.setCurrentTime = function (time) {
                if (videojsInstance !== null) {
                    videojsInstance.currentTime(time);
                }
                return player;
            };
            player.destroy = function (time) {
                if (videojsInstance !== null) {
                    videojsInstance.dispose();
                    player.$container.removeData("vidit.player");
                    player.$container.removeClass("vidit-player video-js");
                    player.$container.off('contextmenu');
                    //					$(".vidit-asset").remove();
                    videojsInstance = null;
                }
                player.trigger("destroy");
                delete player;
                return player;
            };
            player.getOptions = function () {
                return options;
            };

            /**
             * Validation
             */
            if (typeof options.code !== "string") {
                sendError("Code is invalid");
                return player;
            }

            if (typeof options.container === "string") {
                player.$container = $(options.container);
            } else if (typeof options.container === "object") {
                if (options.container.jquery) {
                    player.$container = $(options.container.get(0));
                } else {
                    sendError("Only jQuery object");
                }
            } else {
                player.$container = $("[data-vidit-player='" + options.code + "']");
            }

            if (player.$container.length === 0) {
                sendError("Container not found");
                return player;
            }

            if (typeof player.$container.data("vidit.player") !== "undefined") {
                sendError("Vidit player already initialized");
                return player.$container.data("vidit.player");
            }

            player.$container.data("vidit.player", player);
            player.$container.addClass("vidit-player");

            $.ajax({
                method: "POST",
                url: "https://vidit.io/load/Src::Site::Controllers::Ajax::Video::Play",
                dataType: "json",
                data: {
                    code: options.code,
                    url: location,
                }
            }).done(function (json) {
                player.videoTag = $("<video>").addClass("vidit-video-tag video-js vjs-big-play-centered").appendTo(player.$container);
                json.data.tracks.forEach(function (item) {
                    var track = $("<track>").attr("src", item.src).attr("label", item.label);
                    player.videoTag.append(track);
                });

                trackingData.viewId = json.tracking.viewId;
                trackingData.tracking = json.data.tracking;

                var playerOptions = {
                    plugins: {
                        vidit: {},
                        unmuteButton: {}
                    },
                    preload: "none",
                    poster: json.data.poster,
                    autoplay: json.data.autoplay == "1",
                    controls: json.data.controls == "1",
                    loop: json.data.loop == "1",
                    techOrder: ["html5"],
                    playbackRates: [0.25, 0.5, 1, 1.5, 2, 2.5]
                };

                var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
                if (isChrome && json.data.disableAutoplayOnChrome == 1) {
                    playerOptions.autoplay = false;
                }

                if ($.isArray(options.tracks)) {
                    options.tracks.forEach(function (item, key) {
                        if (item.src) {
                            var track = {
                                label: item.label ? item.label : "Track " + (key + 1),
                                default: item.default == true,
                                src: item.src
                            };

                            playerOptions.tracks.push(track);
                        }
                    });
                }

                if (typeof options.player === "object") {
                    playerOptions = $.extend({}, playerOptions, options.player);
                }

                /**
                 * Disable right click
                 */
                player.$container.on('contextmenu', function (e) {
                    e.preventDefault();
                });

                videojsInstance = videojs(player.videoTag.get(0), playerOptions, function () {
                    var sources = [];
                    $.each(json.data.sources, function (key, item) {
                        var res;
                        if (item.name == "360p") {
                            res = 360;
                        } else if (item.name == "480p") {
                            res = 480;
                        } else if (item.name == "720p") {
                            res = 720;
                        }
                        sources.push({
                            type: item.mimeType,
                            src: item.path,
                            label: item.name,
                            res: res,
                        });
                    });

                    videojsInstance.viditSrc(sources);

                    // Fix chrome autoplay
                    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
                    if (isChrome) {
                        if (videojsInstance.autoplay() && this.paused()) {
                            var promise = videojsInstance.el().firstChild.play();
                            if (promise !== undefined) {
                                promise.then(function () {
                                    // Autoplay started!
                                }).catch(function () {
                                    // Autoplay was prevented.
                                    // Show a "Play" button so that user can start playback.
                                    videojsInstance.muted(true);
                                    videojsInstance.play();
                                });
                            }
                        }
                    }

                    player.trigger("ready");
                });

                videojsInstance.one("play", function () {
                    trackEvent({
                        event: "firstPlay"
                    });
                });

                videojsInstance.on("play", function (event) {
                    player.trigger("play", event);
                });
                videojsInstance.on("pause", function (event) {
                    player.trigger("pause", event);
                });
                videojsInstance.on("ended", function (event) {
                    player.trigger("ended", event);
                    trackEvent({
                        event: "updateCurrentTime"
                    });
                });
                videojsInstance.on("loadeddata", function (event) {
                    player.trigger("loadeddata", event);
                });
                videojsInstance.on("error", function (event) {
                    player.trigger("error", event);
                });
                videojsInstance.on("timeupdate", function (event) {
                    player.trigger("timeupdate", event);

                    if (lastCurrentTimeSend === null || videojsInstance.currentTime() - lastCurrentTimeSend >= 10) {
                        lastCurrentTimeSend = videojsInstance.currentTime();
                        trackEvent({
                            event: "updateCurrentTime"
                        });
                    }
                });
            }).fail(function (json) {
                sendError(json.responseJSON.message);
                var errorMessage = $("<div>").addClass("error-message").html(json.responseJSON.message);
                var errorMessageHolder = $("<div>").addClass("error-message-holder").html(errorMessage);
                player.$container.append(errorMessageHolder);
            }).always(function (response, status) {
                var json;
                if (status === "success") {
                    json = response;
                } else {
                    json = response.responseJSON;
                }
            });

            return player;
        };



        return vidit;
    };


    if (typeof window.viditAsync === "function") {
        window.viditAsync();
    }

    function loadjscssfile(filename, filetype) {
        if (filetype == "js") {
            var fileref = document.createElement('script');
            fileref.setAttribute("class", "vidit-asset");
            fileref.setAttribute("type", "text/javascript");
            fileref.setAttribute("src", filename);
        } else if (filetype == "css") {
            var fileref = document.createElement("link");
            fileref.setAttribute("class", "vidit-asset");
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);
        }
        if (typeof fileref != "undefined") {
            document.getElementsByTagName("head")[0].appendChild(fileref);
        }
    }

    function sendError(message) {
        console.error("Vidit: " + message);
    }

    function sendInfo(message) {
        console.info("Vidit: " + message);
    }

}(window, document, console, jQuery, videojs));
