(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		? _Json_wrap(
			/**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}


/*
 * Copyright (c) 2010 Mozilla Corporation
 * Copyright (c) 2010 Vladimir Vukicevic
 * Copyright (c) 2013 John Mayer
 * Copyright (c) 2018 Andrey Kuzmin
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

// Vector2

var _MJS_v2 = F2(function(x, y) {
    return new Float64Array([x, y]);
});

var _MJS_v2getX = function(a) {
    return a[0];
};

var _MJS_v2getY = function(a) {
    return a[1];
};

var _MJS_v2setX = F2(function(x, a) {
    return new Float64Array([x, a[1]]);
});

var _MJS_v2setY = F2(function(y, a) {
    return new Float64Array([a[0], y]);
});

var _MJS_v2toRecord = function(a) {
    return { x: a[0], y: a[1] };
};

var _MJS_v2fromRecord = function(r) {
    return new Float64Array([r.x, r.y]);
};

var _MJS_v2add = F2(function(a, b) {
    var r = new Float64Array(2);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    return r;
});

var _MJS_v2sub = F2(function(a, b) {
    var r = new Float64Array(2);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    return r;
});

var _MJS_v2negate = function(a) {
    var r = new Float64Array(2);
    r[0] = -a[0];
    r[1] = -a[1];
    return r;
};

var _MJS_v2direction = F2(function(a, b) {
    var r = new Float64Array(2);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    var im = 1.0 / _MJS_v2lengthLocal(r);
    r[0] = r[0] * im;
    r[1] = r[1] * im;
    return r;
});

function _MJS_v2lengthLocal(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
}
var _MJS_v2length = _MJS_v2lengthLocal;

var _MJS_v2lengthSquared = function(a) {
    return a[0] * a[0] + a[1] * a[1];
};

var _MJS_v2distance = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    return Math.sqrt(dx * dx + dy * dy);
});

var _MJS_v2distanceSquared = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    return dx * dx + dy * dy;
});

var _MJS_v2normalize = function(a) {
    var r = new Float64Array(2);
    var im = 1.0 / _MJS_v2lengthLocal(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    return r;
};

var _MJS_v2scale = F2(function(k, a) {
    var r = new Float64Array(2);
    r[0] = a[0] * k;
    r[1] = a[1] * k;
    return r;
});

var _MJS_v2dot = F2(function(a, b) {
    return a[0] * b[0] + a[1] * b[1];
});

// Vector3

var _MJS_v3temp1Local = new Float64Array(3);
var _MJS_v3temp2Local = new Float64Array(3);
var _MJS_v3temp3Local = new Float64Array(3);

var _MJS_v3 = F3(function(x, y, z) {
    return new Float64Array([x, y, z]);
});

var _MJS_v3getX = function(a) {
    return a[0];
};

var _MJS_v3getY = function(a) {
    return a[1];
};

var _MJS_v3getZ = function(a) {
    return a[2];
};

var _MJS_v3setX = F2(function(x, a) {
    return new Float64Array([x, a[1], a[2]]);
});

var _MJS_v3setY = F2(function(y, a) {
    return new Float64Array([a[0], y, a[2]]);
});

var _MJS_v3setZ = F2(function(z, a) {
    return new Float64Array([a[0], a[1], z]);
});

var _MJS_v3toRecord = function(a) {
    return { x: a[0], y: a[1], z: a[2] };
};

var _MJS_v3fromRecord = function(r) {
    return new Float64Array([r.x, r.y, r.z]);
};

var _MJS_v3add = F2(function(a, b) {
    var r = new Float64Array(3);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    r[2] = a[2] + b[2];
    return r;
});

function _MJS_v3subLocal(a, b, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    return r;
}
var _MJS_v3sub = F2(_MJS_v3subLocal);

var _MJS_v3negate = function(a) {
    var r = new Float64Array(3);
    r[0] = -a[0];
    r[1] = -a[1];
    r[2] = -a[2];
    return r;
};

function _MJS_v3directionLocal(a, b, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    return _MJS_v3normalizeLocal(_MJS_v3subLocal(a, b, r), r);
}
var _MJS_v3direction = F2(_MJS_v3directionLocal);

function _MJS_v3lengthLocal(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
}
var _MJS_v3length = _MJS_v3lengthLocal;

var _MJS_v3lengthSquared = function(a) {
    return a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
};

var _MJS_v3distance = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
});

var _MJS_v3distanceSquared = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    return dx * dx + dy * dy + dz * dz;
});

function _MJS_v3normalizeLocal(a, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    var im = 1.0 / _MJS_v3lengthLocal(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    r[2] = a[2] * im;
    return r;
}
var _MJS_v3normalize = _MJS_v3normalizeLocal;

var _MJS_v3scale = F2(function(k, a) {
    return new Float64Array([a[0] * k, a[1] * k, a[2] * k]);
});

var _MJS_v3dotLocal = function(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};
var _MJS_v3dot = F2(_MJS_v3dotLocal);

function _MJS_v3crossLocal(a, b, r) {
    if (r === undefined) {
        r = new Float64Array(3);
    }
    r[0] = a[1] * b[2] - a[2] * b[1];
    r[1] = a[2] * b[0] - a[0] * b[2];
    r[2] = a[0] * b[1] - a[1] * b[0];
    return r;
}
var _MJS_v3cross = F2(_MJS_v3crossLocal);

var _MJS_v3mul4x4 = F2(function(m, v) {
    var w;
    var tmp = _MJS_v3temp1Local;
    var r = new Float64Array(3);

    tmp[0] = m[3];
    tmp[1] = m[7];
    tmp[2] = m[11];
    w = _MJS_v3dotLocal(v, tmp) + m[15];
    tmp[0] = m[0];
    tmp[1] = m[4];
    tmp[2] = m[8];
    r[0] = (_MJS_v3dotLocal(v, tmp) + m[12]) / w;
    tmp[0] = m[1];
    tmp[1] = m[5];
    tmp[2] = m[9];
    r[1] = (_MJS_v3dotLocal(v, tmp) + m[13]) / w;
    tmp[0] = m[2];
    tmp[1] = m[6];
    tmp[2] = m[10];
    r[2] = (_MJS_v3dotLocal(v, tmp) + m[14]) / w;
    return r;
});

// Vector4

var _MJS_v4 = F4(function(x, y, z, w) {
    return new Float64Array([x, y, z, w]);
});

var _MJS_v4getX = function(a) {
    return a[0];
};

var _MJS_v4getY = function(a) {
    return a[1];
};

var _MJS_v4getZ = function(a) {
    return a[2];
};

var _MJS_v4getW = function(a) {
    return a[3];
};

var _MJS_v4setX = F2(function(x, a) {
    return new Float64Array([x, a[1], a[2], a[3]]);
});

var _MJS_v4setY = F2(function(y, a) {
    return new Float64Array([a[0], y, a[2], a[3]]);
});

var _MJS_v4setZ = F2(function(z, a) {
    return new Float64Array([a[0], a[1], z, a[3]]);
});

var _MJS_v4setW = F2(function(w, a) {
    return new Float64Array([a[0], a[1], a[2], w]);
});

var _MJS_v4toRecord = function(a) {
    return { x: a[0], y: a[1], z: a[2], w: a[3] };
};

var _MJS_v4fromRecord = function(r) {
    return new Float64Array([r.x, r.y, r.z, r.w]);
};

var _MJS_v4add = F2(function(a, b) {
    var r = new Float64Array(4);
    r[0] = a[0] + b[0];
    r[1] = a[1] + b[1];
    r[2] = a[2] + b[2];
    r[3] = a[3] + b[3];
    return r;
});

var _MJS_v4sub = F2(function(a, b) {
    var r = new Float64Array(4);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    r[3] = a[3] - b[3];
    return r;
});

var _MJS_v4negate = function(a) {
    var r = new Float64Array(4);
    r[0] = -a[0];
    r[1] = -a[1];
    r[2] = -a[2];
    r[3] = -a[3];
    return r;
};

var _MJS_v4direction = F2(function(a, b) {
    var r = new Float64Array(4);
    r[0] = a[0] - b[0];
    r[1] = a[1] - b[1];
    r[2] = a[2] - b[2];
    r[3] = a[3] - b[3];
    var im = 1.0 / _MJS_v4lengthLocal(r);
    r[0] = r[0] * im;
    r[1] = r[1] * im;
    r[2] = r[2] * im;
    r[3] = r[3] * im;
    return r;
});

function _MJS_v4lengthLocal(a) {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3]);
}
var _MJS_v4length = _MJS_v4lengthLocal;

var _MJS_v4lengthSquared = function(a) {
    return a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3];
};

var _MJS_v4distance = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    var dw = a[3] - b[3];
    return Math.sqrt(dx * dx + dy * dy + dz * dz + dw * dw);
});

var _MJS_v4distanceSquared = F2(function(a, b) {
    var dx = a[0] - b[0];
    var dy = a[1] - b[1];
    var dz = a[2] - b[2];
    var dw = a[3] - b[3];
    return dx * dx + dy * dy + dz * dz + dw * dw;
});

var _MJS_v4normalize = function(a) {
    var r = new Float64Array(4);
    var im = 1.0 / _MJS_v4lengthLocal(a);
    r[0] = a[0] * im;
    r[1] = a[1] * im;
    r[2] = a[2] * im;
    r[3] = a[3] * im;
    return r;
};

var _MJS_v4scale = F2(function(k, a) {
    var r = new Float64Array(4);
    r[0] = a[0] * k;
    r[1] = a[1] * k;
    r[2] = a[2] * k;
    r[3] = a[3] * k;
    return r;
});

var _MJS_v4dot = F2(function(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
});

// Matrix4

var _MJS_m4x4temp1Local = new Float64Array(16);
var _MJS_m4x4temp2Local = new Float64Array(16);

var _MJS_m4x4identity = new Float64Array([
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
]);

var _MJS_m4x4fromRecord = function(r) {
    var m = new Float64Array(16);
    m[0] = r.m11;
    m[1] = r.m21;
    m[2] = r.m31;
    m[3] = r.m41;
    m[4] = r.m12;
    m[5] = r.m22;
    m[6] = r.m32;
    m[7] = r.m42;
    m[8] = r.m13;
    m[9] = r.m23;
    m[10] = r.m33;
    m[11] = r.m43;
    m[12] = r.m14;
    m[13] = r.m24;
    m[14] = r.m34;
    m[15] = r.m44;
    return m;
};

var _MJS_m4x4toRecord = function(m) {
    return {
        m11: m[0], m21: m[1], m31: m[2], m41: m[3],
        m12: m[4], m22: m[5], m32: m[6], m42: m[7],
        m13: m[8], m23: m[9], m33: m[10], m43: m[11],
        m14: m[12], m24: m[13], m34: m[14], m44: m[15]
    };
};

var _MJS_m4x4inverse = function(m) {
    var r = new Float64Array(16);

    r[0] = m[5] * m[10] * m[15] - m[5] * m[11] * m[14] - m[9] * m[6] * m[15] +
        m[9] * m[7] * m[14] + m[13] * m[6] * m[11] - m[13] * m[7] * m[10];
    r[4] = -m[4] * m[10] * m[15] + m[4] * m[11] * m[14] + m[8] * m[6] * m[15] -
        m[8] * m[7] * m[14] - m[12] * m[6] * m[11] + m[12] * m[7] * m[10];
    r[8] = m[4] * m[9] * m[15] - m[4] * m[11] * m[13] - m[8] * m[5] * m[15] +
        m[8] * m[7] * m[13] + m[12] * m[5] * m[11] - m[12] * m[7] * m[9];
    r[12] = -m[4] * m[9] * m[14] + m[4] * m[10] * m[13] + m[8] * m[5] * m[14] -
        m[8] * m[6] * m[13] - m[12] * m[5] * m[10] + m[12] * m[6] * m[9];
    r[1] = -m[1] * m[10] * m[15] + m[1] * m[11] * m[14] + m[9] * m[2] * m[15] -
        m[9] * m[3] * m[14] - m[13] * m[2] * m[11] + m[13] * m[3] * m[10];
    r[5] = m[0] * m[10] * m[15] - m[0] * m[11] * m[14] - m[8] * m[2] * m[15] +
        m[8] * m[3] * m[14] + m[12] * m[2] * m[11] - m[12] * m[3] * m[10];
    r[9] = -m[0] * m[9] * m[15] + m[0] * m[11] * m[13] + m[8] * m[1] * m[15] -
        m[8] * m[3] * m[13] - m[12] * m[1] * m[11] + m[12] * m[3] * m[9];
    r[13] = m[0] * m[9] * m[14] - m[0] * m[10] * m[13] - m[8] * m[1] * m[14] +
        m[8] * m[2] * m[13] + m[12] * m[1] * m[10] - m[12] * m[2] * m[9];
    r[2] = m[1] * m[6] * m[15] - m[1] * m[7] * m[14] - m[5] * m[2] * m[15] +
        m[5] * m[3] * m[14] + m[13] * m[2] * m[7] - m[13] * m[3] * m[6];
    r[6] = -m[0] * m[6] * m[15] + m[0] * m[7] * m[14] + m[4] * m[2] * m[15] -
        m[4] * m[3] * m[14] - m[12] * m[2] * m[7] + m[12] * m[3] * m[6];
    r[10] = m[0] * m[5] * m[15] - m[0] * m[7] * m[13] - m[4] * m[1] * m[15] +
        m[4] * m[3] * m[13] + m[12] * m[1] * m[7] - m[12] * m[3] * m[5];
    r[14] = -m[0] * m[5] * m[14] + m[0] * m[6] * m[13] + m[4] * m[1] * m[14] -
        m[4] * m[2] * m[13] - m[12] * m[1] * m[6] + m[12] * m[2] * m[5];
    r[3] = -m[1] * m[6] * m[11] + m[1] * m[7] * m[10] + m[5] * m[2] * m[11] -
        m[5] * m[3] * m[10] - m[9] * m[2] * m[7] + m[9] * m[3] * m[6];
    r[7] = m[0] * m[6] * m[11] - m[0] * m[7] * m[10] - m[4] * m[2] * m[11] +
        m[4] * m[3] * m[10] + m[8] * m[2] * m[7] - m[8] * m[3] * m[6];
    r[11] = -m[0] * m[5] * m[11] + m[0] * m[7] * m[9] + m[4] * m[1] * m[11] -
        m[4] * m[3] * m[9] - m[8] * m[1] * m[7] + m[8] * m[3] * m[5];
    r[15] = m[0] * m[5] * m[10] - m[0] * m[6] * m[9] - m[4] * m[1] * m[10] +
        m[4] * m[2] * m[9] + m[8] * m[1] * m[6] - m[8] * m[2] * m[5];

    var det = m[0] * r[0] + m[1] * r[4] + m[2] * r[8] + m[3] * r[12];

    if (det === 0) {
        return $elm$core$Maybe$Nothing;
    }

    det = 1.0 / det;

    for (var i = 0; i < 16; i = i + 1) {
        r[i] = r[i] * det;
    }

    return $elm$core$Maybe$Just(r);
};

var _MJS_m4x4inverseOrthonormal = function(m) {
    var r = _MJS_m4x4transposeLocal(m);
    var t = [m[12], m[13], m[14]];
    r[3] = r[7] = r[11] = 0;
    r[12] = -_MJS_v3dotLocal([r[0], r[4], r[8]], t);
    r[13] = -_MJS_v3dotLocal([r[1], r[5], r[9]], t);
    r[14] = -_MJS_v3dotLocal([r[2], r[6], r[10]], t);
    return r;
};

function _MJS_m4x4makeFrustumLocal(left, right, bottom, top, znear, zfar) {
    var r = new Float64Array(16);

    r[0] = 2 * znear / (right - left);
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = 2 * znear / (top - bottom);
    r[6] = 0;
    r[7] = 0;
    r[8] = (right + left) / (right - left);
    r[9] = (top + bottom) / (top - bottom);
    r[10] = -(zfar + znear) / (zfar - znear);
    r[11] = -1;
    r[12] = 0;
    r[13] = 0;
    r[14] = -2 * zfar * znear / (zfar - znear);
    r[15] = 0;

    return r;
}
var _MJS_m4x4makeFrustum = F6(_MJS_m4x4makeFrustumLocal);

var _MJS_m4x4makePerspective = F4(function(fovy, aspect, znear, zfar) {
    var ymax = znear * Math.tan(fovy * Math.PI / 360.0);
    var ymin = -ymax;
    var xmin = ymin * aspect;
    var xmax = ymax * aspect;

    return _MJS_m4x4makeFrustumLocal(xmin, xmax, ymin, ymax, znear, zfar);
});

function _MJS_m4x4makeOrthoLocal(left, right, bottom, top, znear, zfar) {
    var r = new Float64Array(16);

    r[0] = 2 / (right - left);
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = 2 / (top - bottom);
    r[6] = 0;
    r[7] = 0;
    r[8] = 0;
    r[9] = 0;
    r[10] = -2 / (zfar - znear);
    r[11] = 0;
    r[12] = -(right + left) / (right - left);
    r[13] = -(top + bottom) / (top - bottom);
    r[14] = -(zfar + znear) / (zfar - znear);
    r[15] = 1;

    return r;
}
var _MJS_m4x4makeOrtho = F6(_MJS_m4x4makeOrthoLocal);

var _MJS_m4x4makeOrtho2D = F4(function(left, right, bottom, top) {
    return _MJS_m4x4makeOrthoLocal(left, right, bottom, top, -1, 1);
});

function _MJS_m4x4mulLocal(a, b) {
    var r = new Float64Array(16);
    var a11 = a[0];
    var a21 = a[1];
    var a31 = a[2];
    var a41 = a[3];
    var a12 = a[4];
    var a22 = a[5];
    var a32 = a[6];
    var a42 = a[7];
    var a13 = a[8];
    var a23 = a[9];
    var a33 = a[10];
    var a43 = a[11];
    var a14 = a[12];
    var a24 = a[13];
    var a34 = a[14];
    var a44 = a[15];
    var b11 = b[0];
    var b21 = b[1];
    var b31 = b[2];
    var b41 = b[3];
    var b12 = b[4];
    var b22 = b[5];
    var b32 = b[6];
    var b42 = b[7];
    var b13 = b[8];
    var b23 = b[9];
    var b33 = b[10];
    var b43 = b[11];
    var b14 = b[12];
    var b24 = b[13];
    var b34 = b[14];
    var b44 = b[15];

    r[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
    r[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
    r[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
    r[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
    r[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
    r[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
    r[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
    r[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
    r[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
    r[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
    r[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
    r[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
    r[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
    r[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
    r[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
    r[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

    return r;
}
var _MJS_m4x4mul = F2(_MJS_m4x4mulLocal);

var _MJS_m4x4mulAffine = F2(function(a, b) {
    var r = new Float64Array(16);
    var a11 = a[0];
    var a21 = a[1];
    var a31 = a[2];
    var a12 = a[4];
    var a22 = a[5];
    var a32 = a[6];
    var a13 = a[8];
    var a23 = a[9];
    var a33 = a[10];
    var a14 = a[12];
    var a24 = a[13];
    var a34 = a[14];

    var b11 = b[0];
    var b21 = b[1];
    var b31 = b[2];
    var b12 = b[4];
    var b22 = b[5];
    var b32 = b[6];
    var b13 = b[8];
    var b23 = b[9];
    var b33 = b[10];
    var b14 = b[12];
    var b24 = b[13];
    var b34 = b[14];

    r[0] = a11 * b11 + a12 * b21 + a13 * b31;
    r[1] = a21 * b11 + a22 * b21 + a23 * b31;
    r[2] = a31 * b11 + a32 * b21 + a33 * b31;
    r[3] = 0;
    r[4] = a11 * b12 + a12 * b22 + a13 * b32;
    r[5] = a21 * b12 + a22 * b22 + a23 * b32;
    r[6] = a31 * b12 + a32 * b22 + a33 * b32;
    r[7] = 0;
    r[8] = a11 * b13 + a12 * b23 + a13 * b33;
    r[9] = a21 * b13 + a22 * b23 + a23 * b33;
    r[10] = a31 * b13 + a32 * b23 + a33 * b33;
    r[11] = 0;
    r[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14;
    r[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24;
    r[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34;
    r[15] = 1;

    return r;
});

var _MJS_m4x4makeRotate = F2(function(angle, axis) {
    var r = new Float64Array(16);
    axis = _MJS_v3normalizeLocal(axis, _MJS_v3temp1Local);
    var x = axis[0];
    var y = axis[1];
    var z = axis[2];
    var c = Math.cos(angle);
    var c1 = 1 - c;
    var s = Math.sin(angle);

    r[0] = x * x * c1 + c;
    r[1] = y * x * c1 + z * s;
    r[2] = z * x * c1 - y * s;
    r[3] = 0;
    r[4] = x * y * c1 - z * s;
    r[5] = y * y * c1 + c;
    r[6] = y * z * c1 + x * s;
    r[7] = 0;
    r[8] = x * z * c1 + y * s;
    r[9] = y * z * c1 - x * s;
    r[10] = z * z * c1 + c;
    r[11] = 0;
    r[12] = 0;
    r[13] = 0;
    r[14] = 0;
    r[15] = 1;

    return r;
});

var _MJS_m4x4rotate = F3(function(angle, axis, m) {
    var r = new Float64Array(16);
    var im = 1.0 / _MJS_v3lengthLocal(axis);
    var x = axis[0] * im;
    var y = axis[1] * im;
    var z = axis[2] * im;
    var c = Math.cos(angle);
    var c1 = 1 - c;
    var s = Math.sin(angle);
    var xs = x * s;
    var ys = y * s;
    var zs = z * s;
    var xyc1 = x * y * c1;
    var xzc1 = x * z * c1;
    var yzc1 = y * z * c1;
    var t11 = x * x * c1 + c;
    var t21 = xyc1 + zs;
    var t31 = xzc1 - ys;
    var t12 = xyc1 - zs;
    var t22 = y * y * c1 + c;
    var t32 = yzc1 + xs;
    var t13 = xzc1 + ys;
    var t23 = yzc1 - xs;
    var t33 = z * z * c1 + c;
    var m11 = m[0], m21 = m[1], m31 = m[2], m41 = m[3];
    var m12 = m[4], m22 = m[5], m32 = m[6], m42 = m[7];
    var m13 = m[8], m23 = m[9], m33 = m[10], m43 = m[11];
    var m14 = m[12], m24 = m[13], m34 = m[14], m44 = m[15];

    r[0] = m11 * t11 + m12 * t21 + m13 * t31;
    r[1] = m21 * t11 + m22 * t21 + m23 * t31;
    r[2] = m31 * t11 + m32 * t21 + m33 * t31;
    r[3] = m41 * t11 + m42 * t21 + m43 * t31;
    r[4] = m11 * t12 + m12 * t22 + m13 * t32;
    r[5] = m21 * t12 + m22 * t22 + m23 * t32;
    r[6] = m31 * t12 + m32 * t22 + m33 * t32;
    r[7] = m41 * t12 + m42 * t22 + m43 * t32;
    r[8] = m11 * t13 + m12 * t23 + m13 * t33;
    r[9] = m21 * t13 + m22 * t23 + m23 * t33;
    r[10] = m31 * t13 + m32 * t23 + m33 * t33;
    r[11] = m41 * t13 + m42 * t23 + m43 * t33;
    r[12] = m14,
    r[13] = m24;
    r[14] = m34;
    r[15] = m44;

    return r;
});

function _MJS_m4x4makeScale3Local(x, y, z) {
    var r = new Float64Array(16);

    r[0] = x;
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = y;
    r[6] = 0;
    r[7] = 0;
    r[8] = 0;
    r[9] = 0;
    r[10] = z;
    r[11] = 0;
    r[12] = 0;
    r[13] = 0;
    r[14] = 0;
    r[15] = 1;

    return r;
}
var _MJS_m4x4makeScale3 = F3(_MJS_m4x4makeScale3Local);

var _MJS_m4x4makeScale = function(v) {
    return _MJS_m4x4makeScale3Local(v[0], v[1], v[2]);
};

var _MJS_m4x4scale3 = F4(function(x, y, z, m) {
    var r = new Float64Array(16);

    r[0] = m[0] * x;
    r[1] = m[1] * x;
    r[2] = m[2] * x;
    r[3] = m[3] * x;
    r[4] = m[4] * y;
    r[5] = m[5] * y;
    r[6] = m[6] * y;
    r[7] = m[7] * y;
    r[8] = m[8] * z;
    r[9] = m[9] * z;
    r[10] = m[10] * z;
    r[11] = m[11] * z;
    r[12] = m[12];
    r[13] = m[13];
    r[14] = m[14];
    r[15] = m[15];

    return r;
});

var _MJS_m4x4scale = F2(function(v, m) {
    var r = new Float64Array(16);
    var x = v[0];
    var y = v[1];
    var z = v[2];

    r[0] = m[0] * x;
    r[1] = m[1] * x;
    r[2] = m[2] * x;
    r[3] = m[3] * x;
    r[4] = m[4] * y;
    r[5] = m[5] * y;
    r[6] = m[6] * y;
    r[7] = m[7] * y;
    r[8] = m[8] * z;
    r[9] = m[9] * z;
    r[10] = m[10] * z;
    r[11] = m[11] * z;
    r[12] = m[12];
    r[13] = m[13];
    r[14] = m[14];
    r[15] = m[15];

    return r;
});

function _MJS_m4x4makeTranslate3Local(x, y, z) {
    var r = new Float64Array(16);

    r[0] = 1;
    r[1] = 0;
    r[2] = 0;
    r[3] = 0;
    r[4] = 0;
    r[5] = 1;
    r[6] = 0;
    r[7] = 0;
    r[8] = 0;
    r[9] = 0;
    r[10] = 1;
    r[11] = 0;
    r[12] = x;
    r[13] = y;
    r[14] = z;
    r[15] = 1;

    return r;
}
var _MJS_m4x4makeTranslate3 = F3(_MJS_m4x4makeTranslate3Local);

var _MJS_m4x4makeTranslate = function(v) {
    return _MJS_m4x4makeTranslate3Local(v[0], v[1], v[2]);
};

var _MJS_m4x4translate3 = F4(function(x, y, z, m) {
    var r = new Float64Array(16);
    var m11 = m[0];
    var m21 = m[1];
    var m31 = m[2];
    var m41 = m[3];
    var m12 = m[4];
    var m22 = m[5];
    var m32 = m[6];
    var m42 = m[7];
    var m13 = m[8];
    var m23 = m[9];
    var m33 = m[10];
    var m43 = m[11];

    r[0] = m11;
    r[1] = m21;
    r[2] = m31;
    r[3] = m41;
    r[4] = m12;
    r[5] = m22;
    r[6] = m32;
    r[7] = m42;
    r[8] = m13;
    r[9] = m23;
    r[10] = m33;
    r[11] = m43;
    r[12] = m11 * x + m12 * y + m13 * z + m[12];
    r[13] = m21 * x + m22 * y + m23 * z + m[13];
    r[14] = m31 * x + m32 * y + m33 * z + m[14];
    r[15] = m41 * x + m42 * y + m43 * z + m[15];

    return r;
});

var _MJS_m4x4translate = F2(function(v, m) {
    var r = new Float64Array(16);
    var x = v[0];
    var y = v[1];
    var z = v[2];
    var m11 = m[0];
    var m21 = m[1];
    var m31 = m[2];
    var m41 = m[3];
    var m12 = m[4];
    var m22 = m[5];
    var m32 = m[6];
    var m42 = m[7];
    var m13 = m[8];
    var m23 = m[9];
    var m33 = m[10];
    var m43 = m[11];

    r[0] = m11;
    r[1] = m21;
    r[2] = m31;
    r[3] = m41;
    r[4] = m12;
    r[5] = m22;
    r[6] = m32;
    r[7] = m42;
    r[8] = m13;
    r[9] = m23;
    r[10] = m33;
    r[11] = m43;
    r[12] = m11 * x + m12 * y + m13 * z + m[12];
    r[13] = m21 * x + m22 * y + m23 * z + m[13];
    r[14] = m31 * x + m32 * y + m33 * z + m[14];
    r[15] = m41 * x + m42 * y + m43 * z + m[15];

    return r;
});

var _MJS_m4x4makeLookAt = F3(function(eye, center, up) {
    var z = _MJS_v3directionLocal(eye, center, _MJS_v3temp1Local);
    var x = _MJS_v3normalizeLocal(_MJS_v3crossLocal(up, z, _MJS_v3temp2Local), _MJS_v3temp2Local);
    var y = _MJS_v3normalizeLocal(_MJS_v3crossLocal(z, x, _MJS_v3temp3Local), _MJS_v3temp3Local);
    var tm1 = _MJS_m4x4temp1Local;
    var tm2 = _MJS_m4x4temp2Local;

    tm1[0] = x[0];
    tm1[1] = y[0];
    tm1[2] = z[0];
    tm1[3] = 0;
    tm1[4] = x[1];
    tm1[5] = y[1];
    tm1[6] = z[1];
    tm1[7] = 0;
    tm1[8] = x[2];
    tm1[9] = y[2];
    tm1[10] = z[2];
    tm1[11] = 0;
    tm1[12] = 0;
    tm1[13] = 0;
    tm1[14] = 0;
    tm1[15] = 1;

    tm2[0] = 1; tm2[1] = 0; tm2[2] = 0; tm2[3] = 0;
    tm2[4] = 0; tm2[5] = 1; tm2[6] = 0; tm2[7] = 0;
    tm2[8] = 0; tm2[9] = 0; tm2[10] = 1; tm2[11] = 0;
    tm2[12] = -eye[0]; tm2[13] = -eye[1]; tm2[14] = -eye[2]; tm2[15] = 1;

    return _MJS_m4x4mulLocal(tm1, tm2);
});


function _MJS_m4x4transposeLocal(m) {
    var r = new Float64Array(16);

    r[0] = m[0]; r[1] = m[4]; r[2] = m[8]; r[3] = m[12];
    r[4] = m[1]; r[5] = m[5]; r[6] = m[9]; r[7] = m[13];
    r[8] = m[2]; r[9] = m[6]; r[10] = m[10]; r[11] = m[14];
    r[12] = m[3]; r[13] = m[7]; r[14] = m[11]; r[15] = m[15];

    return r;
}
var _MJS_m4x4transpose = _MJS_m4x4transposeLocal;

var _MJS_m4x4makeBasis = F3(function(vx, vy, vz) {
    var r = new Float64Array(16);

    r[0] = vx[0];
    r[1] = vx[1];
    r[2] = vx[2];
    r[3] = 0;
    r[4] = vy[0];
    r[5] = vy[1];
    r[6] = vy[2];
    r[7] = 0;
    r[8] = vz[0];
    r[9] = vz[1];
    r[10] = vz[2];
    r[11] = 0;
    r[12] = 0;
    r[13] = 0;
    r[14] = 0;
    r[15] = 1;

    return r;
});


var _WebGL_guid = 0;

function _WebGL_listEach(fn, list) {
  for (; list.b; list = list.b) {
    fn(list.a);
  }
}

function _WebGL_listLength(list) {
  var length = 0;
  for (; list.b; list = list.b) {
    length++;
  }
  return length;
}

var _WebGL_rAF = typeof requestAnimationFrame !== 'undefined' ?
  requestAnimationFrame :
  function (cb) { setTimeout(cb, 1000 / 60); };

// eslint-disable-next-line no-unused-vars
var _WebGL_entity = F5(function (settings, vert, frag, mesh, uniforms) {
  return {
    $: 0,
    a: settings,
    b: vert,
    c: frag,
    d: mesh,
    e: uniforms
  };
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableBlend = F2(function (cache, setting) {
  var blend = cache.blend;
  blend.toggle = cache.toggle;

  if (!blend.enabled) {
    cache.gl.enable(cache.gl.BLEND);
    blend.enabled = true;
  }

  // a   b   c   d   e   f   g h i j
  // eq1 f11 f12 eq2 f21 f22 r g b a
  if (blend.a !== setting.a || blend.d !== setting.d) {
    cache.gl.blendEquationSeparate(setting.a, setting.d);
    blend.a = setting.a;
    blend.d = setting.d;
  }
  if (blend.b !== setting.b || blend.c !== setting.c || blend.e !== setting.e || blend.f !== setting.f) {
    cache.gl.blendFuncSeparate(setting.b, setting.c, setting.e, setting.f);
    blend.b = setting.b;
    blend.c = setting.c;
    blend.e = setting.e;
    blend.f = setting.f;
  }
  if (blend.g !== setting.g || blend.h !== setting.h || blend.i !== setting.i || blend.j !== setting.j) {
    cache.gl.blendColor(setting.g, setting.h, setting.i, setting.j);
    blend.g = setting.g;
    blend.h = setting.h;
    blend.i = setting.i;
    blend.j = setting.j;
  }
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableDepthTest = F2(function (cache, setting) {
  var depthTest = cache.depthTest;
  depthTest.toggle = cache.toggle;

  if (!depthTest.enabled) {
    cache.gl.enable(cache.gl.DEPTH_TEST);
    depthTest.enabled = true;
  }

  // a    b    c    d
  // func mask near far
  if (depthTest.a !== setting.a) {
    cache.gl.depthFunc(setting.a);
    depthTest.a = setting.a;
  }
  if (depthTest.b !== setting.b) {
    cache.gl.depthMask(setting.b);
    depthTest.b = setting.b;
  }
  if (depthTest.c !== setting.c || depthTest.d !== setting.d) {
    cache.gl.depthRange(setting.c, setting.d);
    depthTest.c = setting.c;
    depthTest.d = setting.d;
  }
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableStencilTest = F2(function (cache, setting) {
  var stencilTest = cache.stencilTest;
  stencilTest.toggle = cache.toggle;

  if (!stencilTest.enabled) {
    cache.gl.enable(cache.gl.STENCIL_TEST);
    stencilTest.enabled = true;
  }

  // a   b    c         d     e     f      g      h     i     j      k
  // ref mask writeMask test1 fail1 zfail1 zpass1 test2 fail2 zfail2 zpass2
  if (stencilTest.d !== setting.d || stencilTest.a !== setting.a || stencilTest.b !== setting.b) {
    cache.gl.stencilFuncSeparate(cache.gl.FRONT, setting.d, setting.a, setting.b);
    stencilTest.d = setting.d;
    // a and b are set in the cache.gl.BACK diffing because they should be the same
  }
  if (stencilTest.e !== setting.e || stencilTest.f !== setting.f || stencilTest.g !== setting.g) {
    cache.gl.stencilOpSeparate(cache.gl.FRONT, setting.e, setting.f, setting.g);
    stencilTest.e = setting.e;
    stencilTest.f = setting.f;
    stencilTest.g = setting.g;
  }
  if (stencilTest.c !== setting.c) {
    cache.gl.stencilMask(setting.c);
    stencilTest.c = setting.c;
  }
  if (stencilTest.h !== setting.h || stencilTest.a !== setting.a || stencilTest.b !== setting.b) {
    cache.gl.stencilFuncSeparate(cache.gl.BACK, setting.h, setting.a, setting.b);
    stencilTest.h = setting.h;
    stencilTest.a = setting.a;
    stencilTest.b = setting.b;
  }
  if (stencilTest.i !== setting.i || stencilTest.j !== setting.j || stencilTest.k !== setting.k) {
    cache.gl.stencilOpSeparate(cache.gl.BACK, setting.i, setting.j, setting.k);
    stencilTest.i = setting.i;
    stencilTest.j = setting.j;
    stencilTest.k = setting.k;
  }
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableScissor = F2(function (cache, setting) {
  var scissor = cache.scissor;
  scissor.toggle = cache.toggle;

  if (!scissor.enabled) {
    cache.gl.enable(cache.gl.SCISSOR_TEST);
    scissor.enabled = true;
  }

  if (scissor.a !== setting.a || scissor.b !== setting.b || scissor.c !== setting.c || scissor.d !== setting.d) {
    cache.gl.scissor(setting.a, setting.b, setting.c, setting.d);
    scissor.a = setting.a;
    scissor.b = setting.b;
    scissor.c = setting.c;
    scissor.d = setting.d;
  }
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableColorMask = F2(function (cache, setting) {
  var colorMask = cache.colorMask;
  colorMask.toggle = cache.toggle;
  colorMask.enabled = true;

  if (colorMask.a !== setting.a || colorMask.b !== setting.b || colorMask.c !== setting.c || colorMask.d !== setting.d) {
    cache.gl.colorMask(setting.a, setting.b, setting.c, setting.d);
    colorMask.a = setting.a;
    colorMask.b = setting.b;
    colorMask.c = setting.c;
    colorMask.d = setting.d;
  }
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableCullFace = F2(function (cache, setting) {
  var cullFace = cache.cullFace;
  cullFace.toggle = cache.toggle;

  if (!cullFace.enabled) {
    cache.gl.enable(cache.gl.CULL_FACE);
    cullFace.enabled = true;
  }

  if (cullFace.a !== setting.a) {
    cache.gl.cullFace(setting.a);
    cullFace.a = setting.a;
  }
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enablePolygonOffset = F2(function (cache, setting) {
  var polygonOffset = cache.polygonOffset;
  polygonOffset.toggle = cache.toggle;

  if (!polygonOffset.enabled) {
    cache.gl.enable(cache.gl.POLYGON_OFFSET_FILL);
    polygonOffset.enabled = true;
  }

  if (polygonOffset.a !== setting.a || polygonOffset.b !== setting.b) {
    cache.gl.polygonOffset(setting.a, setting.b);
    polygonOffset.a = setting.a;
    polygonOffset.b = setting.b;
  }
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableSampleCoverage = F2(function (cache, setting) {
  var sampleCoverage = cache.sampleCoverage;
  sampleCoverage.toggle = cache.toggle;

  if (!sampleCoverage.enabled) {
    cache.gl.enable(cache.gl.SAMPLE_COVERAGE);
    sampleCoverage.enabled = true;
  }

  if (sampleCoverage.a !== setting.a || sampleCoverage.b !== setting.b) {
    cache.gl.sampleCoverage(setting.a, setting.b);
    sampleCoverage.a = setting.a;
    sampleCoverage.b = setting.b;
  }
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableSampleAlphaToCoverage = function (cache) {
  var sampleAlphaToCoverage = cache.sampleAlphaToCoverage;
  sampleAlphaToCoverage.toggle = cache.toggle;

  if (!sampleAlphaToCoverage.enabled) {
    cache.gl.enable(cache.gl.SAMPLE_ALPHA_TO_COVERAGE);
    sampleAlphaToCoverage.enabled = true;
  }
};

var _WebGL_disableBlend = function (cache) {
  if (cache.blend.enabled) {
    cache.gl.disable(cache.gl.BLEND);
    cache.blend.enabled = false;
  }
};

var _WebGL_disableDepthTest = function (cache) {
  if (cache.depthTest.enabled) {
    cache.gl.disable(cache.gl.DEPTH_TEST);
    cache.depthTest.enabled = false;
  }
};

var _WebGL_disableStencilTest = function (cache) {
  if (cache.stencilTest.enabled) {
    cache.gl.disable(cache.gl.STENCIL_TEST);
    cache.stencilTest.enabled = false;
  }
};

var _WebGL_disableScissor = function (cache) {
  if (cache.scissor.enabled) {
    cache.gl.disable(cache.gl.SCISSOR_TEST);
    cache.scissor.enabled = false;
  }
};

var _WebGL_disableColorMask = function (cache) {
  var colorMask = cache.colorMask;
  if (!colorMask.a || !colorMask.b || !colorMask.c || !colorMask.d) {
    cache.gl.colorMask(true, true, true, true);
    colorMask.a = true;
    colorMask.b = true;
    colorMask.c = true;
    colorMask.d = true;
  }
};

var _WebGL_disableCullFace = function (cache) {
  cache.gl.disable(cache.gl.CULL_FACE);
};

var _WebGL_disablePolygonOffset = function (cache) {
  cache.gl.disable(cache.gl.POLYGON_OFFSET_FILL);
};

var _WebGL_disableSampleCoverage = function (cache) {
  cache.gl.disable(cache.gl.SAMPLE_COVERAGE);
};

var _WebGL_disableSampleAlphaToCoverage = function (cache) {
  cache.gl.disable(cache.gl.SAMPLE_ALPHA_TO_COVERAGE);
};

var _WebGL_settings = ['blend', 'depthTest', 'stencilTest', 'scissor', 'colorMask', 'cullFace', 'polygonOffset', 'sampleCoverage', 'sampleAlphaToCoverage'];
var _WebGL_disableFunctions = [_WebGL_disableBlend, _WebGL_disableDepthTest, _WebGL_disableStencilTest, _WebGL_disableScissor, _WebGL_disableColorMask, _WebGL_disableCullFace, _WebGL_disablePolygonOffset, _WebGL_disableSampleCoverage, _WebGL_disableSampleAlphaToCoverage];

function _WebGL_doCompile(gl, src, type) {
  var shader = gl.createShader(type);
  // Enable OES_standard_derivatives extension
  gl.shaderSource(shader, '#extension GL_OES_standard_derivatives : enable\n' + src);
  gl.compileShader(shader);
  return shader;
}

function _WebGL_doLink(gl, vshader, fshader) {
  var program = gl.createProgram();

  gl.attachShader(program, vshader);
  gl.attachShader(program, fshader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw ('Link failed: ' + gl.getProgramInfoLog(program) +
      '\nvs info-log: ' + gl.getShaderInfoLog(vshader) +
      '\nfs info-log: ' + gl.getShaderInfoLog(fshader));
  }

  return program;
}

function _WebGL_getAttributeInfo(gl, type) {
  switch (type) {
    case gl.FLOAT:
      return { size: 1, arraySize: 1, type: Float32Array, baseType: gl.FLOAT };
    case gl.FLOAT_VEC2:
      return { size: 2, arraySize: 1, type: Float32Array, baseType: gl.FLOAT };
    case gl.FLOAT_VEC3:
      return { size: 3, arraySize: 1, type: Float32Array, baseType: gl.FLOAT };
    case gl.FLOAT_VEC4:
      return { size: 4, arraySize: 1, type: Float32Array, baseType: gl.FLOAT };
    case gl.FLOAT_MAT4:
      return { size: 4, arraySize: 4, type: Float32Array, baseType: gl.FLOAT };
    case gl.INT:
      return { size: 1, arraySize: 1, type: Int32Array, baseType: gl.INT };
  }
}

/**
 *  Form the buffer for a given attribute.
 *
 *  @param {WebGLRenderingContext} gl context
 *  @param {WebGLActiveInfo} attribute the attribute to bind to.
 *         We use its name to grab the record by name and also to know
 *         how many elements we need to grab.
 *  @param {Mesh} mesh The mesh coming in from Elm.
 *  @param {Object} attributes The mapping between the attribute names and Elm fields
 *  @return {WebGLBuffer}
 */
function _WebGL_doBindAttribute(gl, attribute, mesh, attributes) {
  // The length of the number of vertices that
  // complete one 'thing' based on the drawing mode.
  // ie, 2 for Lines, 3 for Triangles, etc.
  var elemSize = mesh.a.elemSize;

  var idxKeys = [];
  for (var i = 0; i < elemSize; i++) {
    idxKeys.push(String.fromCharCode(97 + i));
  }

  function dataFill(data, cnt, fillOffset, elem, key) {
    var i;
    if (elemSize === 1) {
      for (i = 0; i < cnt; i++) {
        data[fillOffset++] = cnt === 1 ? elem[key] : elem[key][i];
      }
    } else {
      idxKeys.forEach(function (idx) {
        for (i = 0; i < cnt; i++) {
          data[fillOffset++] = cnt === 1 ? elem[idx][key] : elem[idx][key][i];
        }
      });
    }
  }

  var attributeInfo = _WebGL_getAttributeInfo(gl, attribute.type);

  if (attributeInfo === undefined) {
    throw new Error('No info available for: ' + attribute.type);
  }

  var dataIdx = 0;
  var dataOffset = attributeInfo.size * attributeInfo.arraySize * elemSize;
  var array = new attributeInfo.type(_WebGL_listLength(mesh.b) * dataOffset);

  _WebGL_listEach(function (elem) {
    dataFill(array, attributeInfo.size * attributeInfo.arraySize, dataIdx, elem, attributes[attribute.name] || attribute.name);
    dataIdx += dataOffset;
  }, mesh.b);

  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
  return buffer;
}

/**
 *  This sets up the binding caching buffers.
 *
 *  We don't actually bind any buffers now except for the indices buffer.
 *  The problem with filling the buffers here is that it is possible to
 *  have a buffer shared between two webgl shaders;
 *  which could have different active attributes. If we bind it here against
 *  a particular program, we might not bind them all. That final bind is now
 *  done right before drawing.
 *
 *  @param {WebGLRenderingContext} gl context
 *  @param {Mesh} mesh a mesh object from Elm
 *  @return {Object} buffer - an object with the following properties
 *  @return {Number} buffer.numIndices
 *  @return {WebGLBuffer|null} buffer.indexBuffer - optional index buffer
 *  @return {Object} buffer.buffers - will be used to buffer attributes
 */
function _WebGL_doBindSetup(gl, mesh) {
  if (mesh.a.indexSize > 0) {
    var indexBuffer = gl.createBuffer();
    var indices = _WebGL_makeIndexedBuffer(mesh.c, mesh.a.indexSize);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    return {
      numIndices: indices.length,
      indexBuffer: indexBuffer,
      buffers: {}
    };
  } else {
    return {
      numIndices: mesh.a.elemSize * _WebGL_listLength(mesh.b),
      indexBuffer: null,
      buffers: {}
    };
  }
}

/**
 *  Create an indices array and fill it from indices
 *  based on the size of the index
 *
 *  @param {List} indicesList the list of indices
 *  @param {Number} indexSize the size of the index
 *  @return {Uint32Array} indices
 */
function _WebGL_makeIndexedBuffer(indicesList, indexSize) {
  var indices = new Uint32Array(_WebGL_listLength(indicesList) * indexSize);
  var fillOffset = 0;
  var i;
  _WebGL_listEach(function (elem) {
    if (indexSize === 1) {
      indices[fillOffset++] = elem;
    } else {
      for (i = 0; i < indexSize; i++) {
        indices[fillOffset++] = elem[String.fromCharCode(97 + i)];
      }
    }
  }, indicesList);
  return indices;
}

function _WebGL_getProgID(vertID, fragID) {
  return vertID + '#' + fragID;
}

var _WebGL_drawGL = F2(function (model, domNode) {
  var cache = model.f;
  var gl = cache.gl;

  if (!gl) {
    return domNode;
  }

  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

  if (!cache.depthTest.b) {
    gl.depthMask(true);
    cache.depthTest.b = true;
  }
  if (cache.stencilTest.c !== cache.STENCIL_WRITEMASK) {
    gl.stencilMask(cache.STENCIL_WRITEMASK);
    cache.stencilTest.c = cache.STENCIL_WRITEMASK;
  }
  _WebGL_disableScissor(cache);
  _WebGL_disableColorMask(cache);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);

  function drawEntity(entity) {
    if (!entity.d.b.b) {
      return; // Empty list
    }

    var progid;
    var program;
    var i;

    if (entity.b.id && entity.c.id) {
      progid = _WebGL_getProgID(entity.b.id, entity.c.id);
      program = cache.programs[progid];
    }

    if (!program) {

      var vshader;
      if (entity.b.id) {
        vshader = cache.shaders[entity.b.id];
      } else {
        entity.b.id = _WebGL_guid++;
      }

      if (!vshader) {
        vshader = _WebGL_doCompile(gl, entity.b.src, gl.VERTEX_SHADER);
        cache.shaders[entity.b.id] = vshader;
      }

      var fshader;
      if (entity.c.id) {
        fshader = cache.shaders[entity.c.id];
      } else {
        entity.c.id = _WebGL_guid++;
      }

      if (!fshader) {
        fshader = _WebGL_doCompile(gl, entity.c.src, gl.FRAGMENT_SHADER);
        cache.shaders[entity.c.id] = fshader;
      }

      var glProgram = _WebGL_doLink(gl, vshader, fshader);

      program = {
        glProgram: glProgram,
        attributes: Object.assign({}, entity.b.attributes, entity.c.attributes),
        currentUniforms: {},
        activeAttributes: [],
        activeAttributeLocations: []
      };

      program.uniformSetters = _WebGL_createUniformSetters(
        gl,
        model,
        program,
        Object.assign({}, entity.b.uniforms, entity.c.uniforms)
      );

      var numActiveAttributes = gl.getProgramParameter(glProgram, gl.ACTIVE_ATTRIBUTES);
      for (i = 0; i < numActiveAttributes; i++) {
        var attribute = gl.getActiveAttrib(glProgram, i);
        var attribLocation = gl.getAttribLocation(glProgram, attribute.name);
        program.activeAttributes.push(attribute);
        program.activeAttributeLocations.push(attribLocation);
      }

      progid = _WebGL_getProgID(entity.b.id, entity.c.id);
      cache.programs[progid] = program;
    }

    if (cache.lastProgId !== progid) {
      gl.useProgram(program.glProgram);
      cache.lastProgId = progid;
    }

    _WebGL_setUniforms(program.uniformSetters, entity.e);

    var buffer = cache.buffers.get(entity.d);

    if (!buffer) {
      buffer = _WebGL_doBindSetup(gl, entity.d);
      cache.buffers.set(entity.d, buffer);
    }

    for (i = 0; i < program.activeAttributes.length; i++) {
      attribute = program.activeAttributes[i];
      attribLocation = program.activeAttributeLocations[i];

      if (buffer.buffers[attribute.name] === undefined) {
        buffer.buffers[attribute.name] = _WebGL_doBindAttribute(gl, attribute, entity.d, program.attributes);
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer.buffers[attribute.name]);

      var attributeInfo = _WebGL_getAttributeInfo(gl, attribute.type);
      if (attributeInfo.arraySize === 1) {
        gl.enableVertexAttribArray(attribLocation);
        gl.vertexAttribPointer(attribLocation, attributeInfo.size, attributeInfo.baseType, false, 0, 0);
      } else {
        // Point to four vec4 in case of mat4
        var offset = attributeInfo.size * 4; // float32 takes 4 bytes
        var stride = offset * attributeInfo.arraySize;
        for (var m = 0; m < attributeInfo.arraySize; m++) {
          gl.enableVertexAttribArray(attribLocation + m);
          gl.vertexAttribPointer(attribLocation + m, attributeInfo.size, attributeInfo.baseType, false, stride, offset * m);
        }
      }
    }

    // Apply all the new settings
    cache.toggle = !cache.toggle;
    _WebGL_listEach($elm_explorations$webgl$WebGL$Internal$enableSetting(cache), entity.a);
    // Disable the settings that were applied in the previous draw call
    for (i = 0; i < _WebGL_settings.length; i++) {
      var setting = cache[_WebGL_settings[i]];
      if (setting.toggle !== cache.toggle && setting.enabled) {
        _WebGL_disableFunctions[i](cache);
        setting.enabled = false;
        setting.toggle = cache.toggle;
      }
    }

    if (buffer.indexBuffer) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer.indexBuffer);
      gl.drawElements(entity.d.a.mode, buffer.numIndices, gl.UNSIGNED_INT, 0);
    } else {
      gl.drawArrays(entity.d.a.mode, 0, buffer.numIndices);
    }
  }

  _WebGL_listEach(drawEntity, model.g);
  return domNode;
});

function _WebGL_createUniformSetters(gl, model, program, uniformsMap) {
  var glProgram = program.glProgram;
  var currentUniforms = program.currentUniforms;
  var textureCounter = 0;
  var cache = model.f;
  function createUniformSetter(glProgram, uniform) {
    var uniformName = uniform.name;
    var uniformLocation = gl.getUniformLocation(glProgram, uniformName);
    switch (uniform.type) {
      case gl.INT:
        return function (value) {
          if (currentUniforms[uniformName] !== value) {
            gl.uniform1i(uniformLocation, value);
            currentUniforms[uniformName] = value;
          }
        };
      case gl.FLOAT:
        return function (value) {
          if (currentUniforms[uniformName] !== value) {
            gl.uniform1f(uniformLocation, value);
            currentUniforms[uniformName] = value;
          }
        };
      case gl.FLOAT_VEC2:
        return function (value) {
          if (currentUniforms[uniformName] !== value) {
            gl.uniform2f(uniformLocation, value[0], value[1]);
            currentUniforms[uniformName] = value;
          }
        };
      case gl.FLOAT_VEC3:
        return function (value) {
          if (currentUniforms[uniformName] !== value) {
            gl.uniform3f(uniformLocation, value[0], value[1], value[2]);
            currentUniforms[uniformName] = value;
          }
        };
      case gl.FLOAT_VEC4:
        return function (value) {
          if (currentUniforms[uniformName] !== value) {
            gl.uniform4f(uniformLocation, value[0], value[1], value[2], value[3]);
            currentUniforms[uniformName] = value;
          }
        };
      case gl.FLOAT_MAT4:
        return function (value) {
          if (currentUniforms[uniformName] !== value) {
            gl.uniformMatrix4fv(uniformLocation, false, new Float32Array(value));
            currentUniforms[uniformName] = value;
          }
        };
      case gl.SAMPLER_2D:
        var currentTexture = textureCounter++;
        return function (texture) {
          gl.activeTexture(gl.TEXTURE0 + currentTexture);
          var tex = cache.textures.get(texture);
          if (!tex) {
            tex = texture.createTexture(gl);
            cache.textures.set(texture, tex);
          }
          gl.bindTexture(gl.TEXTURE_2D, tex);
          if (currentUniforms[uniformName] !== texture) {
            gl.uniform1i(uniformLocation, currentTexture);
            currentUniforms[uniformName] = texture;
          }
        };
      case gl.BOOL:
        return function (value) {
          if (currentUniforms[uniformName] !== value) {
            gl.uniform1i(uniformLocation, value);
            currentUniforms[uniformName] = value;
          }
        };
      default:
        return function () { };
    }
  }

  var uniformSetters = {};
  var numUniforms = gl.getProgramParameter(glProgram, gl.ACTIVE_UNIFORMS);
  for (var i = 0; i < numUniforms; i++) {
    var uniform = gl.getActiveUniform(glProgram, i);
    uniformSetters[uniformsMap[uniform.name] || uniform.name] = createUniformSetter(glProgram, uniform);
  }

  return uniformSetters;
}

function _WebGL_setUniforms(setters, values) {
  Object.keys(values).forEach(function (name) {
    var setter = setters[name];
    if (setter) {
      setter(values[name]);
    }
  });
}

// VIRTUAL-DOM WIDGET

// eslint-disable-next-line no-unused-vars
var _WebGL_toHtml = F3(function (options, factList, entities) {
  return _VirtualDom_custom(
    factList,
    {
      g: entities,
      f: {},
      h: options
    },
    _WebGL_render,
    _WebGL_diff
  );
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableAlpha = F2(function (options, option) {
  options.contextAttributes.alpha = true;
  options.contextAttributes.premultipliedAlpha = option.a;
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableDepth = F2(function (options, option) {
  options.contextAttributes.depth = true;
  options.sceneSettings.push(function (gl) {
    gl.clearDepth(option.a);
  });
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableStencil = F2(function (options, option) {
  options.contextAttributes.stencil = true;
  options.sceneSettings.push(function (gl) {
    gl.clearStencil(option.a);
  });
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableAntialias = F2(function (options, option) {
  options.contextAttributes.antialias = true;
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enableClearColor = F2(function (options, option) {
  options.sceneSettings.push(function (gl) {
    gl.clearColor(option.a, option.b, option.c, option.d);
  });
});

// eslint-disable-next-line no-unused-vars
var _WebGL_enablePreserveDrawingBuffer = F2(function (options, option) {
  options.contextAttributes.preserveDrawingBuffer = true;
});

/**
 *  Creates canvas and schedules initial _WebGL_drawGL
 *  @param {Object} model
 *  @param {Object} model.f that may contain the following properties:
           gl, shaders, programs, buffers, textures
 *  @param {List<Option>} model.h list of options coming from Elm
 *  @param {List<Entity>} model.g list of entities coming from Elm
 *  @return {HTMLElement} <canvas> if WebGL is supported, otherwise a <div>
 */
function _WebGL_render(model) {
  var options = {
    contextAttributes: {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false
    },
    sceneSettings: []
  };

  _WebGL_listEach(function (option) {
    return A2($elm_explorations$webgl$WebGL$Internal$enableOption, options, option);
  }, model.h);

  var canvas = _VirtualDom_doc.createElement('canvas');
  var gl = canvas.getContext && (
    canvas.getContext('webgl', options.contextAttributes) ||
    canvas.getContext('experimental-webgl', options.contextAttributes)
  );

  if (gl && typeof WeakMap !== 'undefined') {
    options.sceneSettings.forEach(function (sceneSetting) {
      sceneSetting(gl);
    });

    // Activate extensions
    gl.getExtension('OES_standard_derivatives');
    gl.getExtension('OES_element_index_uint');

    model.f.gl = gl;

    // Cache the current settings in order to diff them to avoid redundant calls
    // https://emscripten.org/docs/optimizing/Optimizing-WebGL.html#avoid-redundant-calls
    model.f.toggle = false; // used to diff the settings from the previous and current draw calls
    model.f.blend = { enabled: false, toggle: false };
    model.f.depthTest = { enabled: false, toggle: false };
    model.f.stencilTest = { enabled: false, toggle: false };
    model.f.scissor = { enabled: false, toggle: false };
    model.f.colorMask = { enabled: false, toggle: false };
    model.f.cullFace = { enabled: false, toggle: false };
    model.f.polygonOffset = { enabled: false, toggle: false };
    model.f.sampleCoverage = { enabled: false, toggle: false };
    model.f.sampleAlphaToCoverage = { enabled: false, toggle: false };

    model.f.shaders = [];
    model.f.programs = {};
    model.f.lastProgId = null;
    model.f.buffers = new WeakMap();
    model.f.textures = new WeakMap();
    // Memorize the initial stencil write mask, because
    // browsers may have different number of stencil bits
    model.f.STENCIL_WRITEMASK = gl.getParameter(gl.STENCIL_WRITEMASK);

    // Render for the first time.
    // This has to be done in animation frame,
    // because the canvas is not in the DOM yet
    _WebGL_rAF(function () {
      return A2(_WebGL_drawGL, model, canvas);
    });

  } else {
    canvas = _VirtualDom_doc.createElement('div');
    canvas.innerHTML = '<a href="https://get.webgl.org/">Enable WebGL</a> to see this content!';
  }

  return canvas;
}

function _WebGL_diff(oldModel, newModel) {
  newModel.f = oldModel.f;
  return _WebGL_drawGL(newModel);
}



// SEND REQUEST

var _Http_toTask = F2(function(request, maybeProgress)
{
	return _Scheduler_binding(function(callback)
	{
		var xhr = new XMLHttpRequest();

		_Http_configureProgress(xhr, maybeProgress);

		xhr.addEventListener('error', function() {
			callback(_Scheduler_fail($elm$http$Http$NetworkError));
		});
		xhr.addEventListener('timeout', function() {
			callback(_Scheduler_fail($elm$http$Http$Timeout));
		});
		xhr.addEventListener('load', function() {
			callback(_Http_handleResponse(xhr, request.expect.a));
		});

		try
		{
			xhr.open(request.method, request.url, true);
		}
		catch (e)
		{
			return callback(_Scheduler_fail($elm$http$Http$BadUrl(request.url)));
		}

		_Http_configureRequest(xhr, request);

		var body = request.body;
		xhr.send($elm$http$Http$Internal$isStringBody(body)
			? (xhr.setRequestHeader('Content-Type', body.a), body.b)
			: body.a
		);

		return function() { xhr.abort(); };
	});
});

function _Http_configureProgress(xhr, maybeProgress)
{
	if (!$elm$core$Maybe$isJust(maybeProgress))
	{
		return;
	}

	xhr.addEventListener('progress', function(event) {
		if (!event.lengthComputable)
		{
			return;
		}
		_Scheduler_rawSpawn(maybeProgress.a({
			bytes: event.loaded,
			bytesExpected: event.total
		}));
	});
}

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.headers; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}

	xhr.responseType = request.expect.b;
	xhr.withCredentials = request.withCredentials;

	$elm$core$Maybe$isJust(request.timeout) && (xhr.timeout = request.timeout.a);
}


// RESPONSES

function _Http_handleResponse(xhr, responseToResult)
{
	var response = _Http_toResponse(xhr);

	if (xhr.status < 200 || 300 <= xhr.status)
	{
		response.body = xhr.responseText;
		return _Scheduler_fail($elm$http$Http$BadStatus(response));
	}

	var result = responseToResult(response);

	if ($elm$core$Result$isOk(result))
	{
		return _Scheduler_succeed(result.a);
	}
	else
	{
		response.body = xhr.responseText;
		return _Scheduler_fail(A2($elm$http$Http$BadPayload, result.a, response));
	}
}

function _Http_toResponse(xhr)
{
	return {
		url: xhr.responseURL,
		status: { code: xhr.status, message: xhr.statusText },
		headers: _Http_parseHeaders(xhr.getAllResponseHeaders()),
		body: xhr.response
	};
}

function _Http_parseHeaders(rawHeaders)
{
	var headers = $elm$core$Dict$empty;

	if (!rawHeaders)
	{
		return headers;
	}

	var headerPairs = rawHeaders.split('\u000d\u000a');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf('\u003a\u0020');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3($elm$core$Dict$update, key, function(oldValue) {
				return $elm$core$Maybe$Just($elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}

	return headers;
}


// EXPECTORS

function _Http_expectStringResponse(responseToResult)
{
	return {
		$: 0,
		b: 'text',
		a: responseToResult
	};
}

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		b: expect.b,
		a: function(response) {
			var convertedResponse = expect.a(response);
			return A2($elm$core$Result$map, func, convertedResponse);
		}
	};
});


// BODY

function _Http_multipart(parts)
{


	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}

	return $elm$http$Http$Internal$FormDataBody(formData);
}




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$document = _Browser_document;
var $author$project$Main$ResetView = {$: 'ResetView'};
var $author$project$Main$ToggleShowEditor = {$: 'ToggleShowEditor'};
var $author$project$Main$ToggleShowRailCount = {$: 'ToggleShowRailCount'};
var $author$project$Main$UpdateScript = function (a) {
	return {$: 'UpdateScript', a: a};
};
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$autocomplete = function (bool) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'autocomplete',
		bool ? 'on' : 'off');
};
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$map = F2(
	function (func, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				A2(func, key, value),
				A2($elm$core$Dict$map, func, left),
				A2($elm$core$Dict$map, func, right));
		}
	});
var $elm$core$Dict$values = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2($elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var $author$project$Main$formatRailCount = function (dict) {
	return A2(
		$elm$core$String$join,
		'\n',
		$elm$core$Dict$values(
			A2(
				$elm$core$Dict$map,
				F2(
					function (name, count) {
						return name + (': ' + $elm$core$String$fromInt(count));
					}),
				dict))) + ('\n\nTotal: ' + $elm$core$String$fromInt(
		A3(
			$elm$core$Dict$foldl,
			F3(
				function (_v0, count, accum) {
					return count + accum;
				}),
			0,
			dict)));
};
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$Main$makeButton = F3(
	function (title, action, isButtonOn) {
		return A2(
			$elm$html$Html$button,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'font-size', '30px'),
					A2($elm$html$Html$Attributes$style, 'box-sizing', 'border-box'),
					A2($elm$html$Html$Attributes$style, 'width', '50px'),
					A2($elm$html$Html$Attributes$style, 'height', '50px'),
					A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
					A2($elm$html$Html$Attributes$style, 'user-select', 'none'),
					A2($elm$html$Html$Attributes$style, '-webkit-user-select', 'none'),
					A2($elm$html$Html$Attributes$style, 'border', 'outset 3px black'),
					A2($elm$html$Html$Attributes$style, 'touch-action', 'none'),
					A2(
					$elm$html$Html$Attributes$style,
					'background-color',
					isButtonOn ? 'white' : 'lightgray'),
					$elm$html$Html$Events$onClick(action)
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(title)
				]));
	});
var $elm_explorations$linear_algebra$Math$Matrix4$makeOrtho = _MJS_m4x4makeOrtho;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $author$project$Graphics$OrbitControlImpl$makeProjectionMatrix = function (_v0) {
	var model = _v0.a;
	var w = (model.scale * model.viewportWidth) / 2;
	var h = (model.scale * model.viewportHeight) / 2;
	var cameraClipDistance = 100000;
	return A6($elm_explorations$linear_algebra$Math$Matrix4$makeOrtho, -w, w, -h, h, -cameraClipDistance, cameraClipDistance);
};
var $author$project$Graphics$OrbitControl$makeProjectionMatrix = function (_v0) {
	var model = _v0.a;
	return $author$project$Graphics$OrbitControlImpl$makeProjectionMatrix(model.ocImpl);
};
var $elm_explorations$linear_algebra$Math$Vector3$add = _MJS_v3add;
var $elm$core$Basics$cos = _Basics_cos;
var $elm_explorations$linear_algebra$Math$Matrix4$makeLookAt = _MJS_m4x4makeLookAt;
var $elm$core$Basics$sin = _Basics_sin;
var $elm_explorations$linear_algebra$Math$Vector3$vec3 = _MJS_v3;
var $author$project$Graphics$OrbitControlImpl$makeViewMatrix = function (_v0) {
	var model = _v0.a;
	var upVector = A3(
		$elm_explorations$linear_algebra$Math$Vector3$vec3,
		-($elm$core$Basics$sin(model.altitude) * $elm$core$Basics$cos(model.azimuth)),
		-($elm$core$Basics$sin(model.altitude) * $elm$core$Basics$sin(model.azimuth)),
		$elm$core$Basics$cos(model.altitude));
	var eyeDistance = 10000;
	var eyePosition = A3(
		$elm_explorations$linear_algebra$Math$Vector3$vec3,
		(eyeDistance * $elm$core$Basics$cos(model.altitude)) * $elm$core$Basics$cos(model.azimuth),
		(eyeDistance * $elm$core$Basics$cos(model.altitude)) * $elm$core$Basics$sin(model.azimuth),
		eyeDistance * $elm$core$Basics$sin(model.altitude));
	return A3(
		$elm_explorations$linear_algebra$Math$Matrix4$makeLookAt,
		A2($elm_explorations$linear_algebra$Math$Vector3$add, model.target, eyePosition),
		model.target,
		upVector);
};
var $author$project$Graphics$OrbitControl$makeViewMatrix = function (_v0) {
	var model = _v0.a;
	return $author$project$Graphics$OrbitControlImpl$makeViewMatrix(model.ocImpl);
};
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$json$Json$Decode$string = _Json_decodeString;
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $author$project$Main$SplitBarBeginMove = function (a) {
	return {$: 'SplitBarBeginMove', a: a};
};
var $author$project$PointerEvent$PointerEvent = F5(
	function (pointerId, clientX, clientY, shiftKey, event) {
		return {clientX: clientX, clientY: clientY, event: event, pointerId: pointerId, shiftKey: shiftKey};
	});
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$json$Json$Decode$map5 = _Json_map5;
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $author$project$PointerEvent$decode = A6(
	$elm$json$Json$Decode$map5,
	$author$project$PointerEvent$PointerEvent,
	A2($elm$json$Json$Decode$field, 'pointerId', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'clientX', $elm$json$Json$Decode$float),
	A2($elm$json$Json$Decode$field, 'clientY', $elm$json$Json$Decode$float),
	A2($elm$json$Json$Decode$field, 'shiftKey', $elm$json$Json$Decode$bool),
	$elm$json$Json$Decode$value);
var $author$project$Main$preventDefaultDecoder = $elm$json$Json$Decode$map(
	function (a) {
		return _Utils_Tuple2(a, true);
	});
var $elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 'MayPreventDefault', a: a};
};
var $elm$html$Html$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
	});
var $author$project$Main$onSplitBarDragBegin = function (_v0) {
	return A2(
		$elm$html$Html$Events$preventDefaultOn,
		'pointerdown',
		$author$project$Main$preventDefaultDecoder(
			A2($elm$json$Json$Decode$map, $author$project$Main$SplitBarBeginMove, $author$project$PointerEvent$decode)));
};
var $author$project$Main$SplitBarEndMove = function (a) {
	return {$: 'SplitBarEndMove', a: a};
};
var $author$project$Main$onSplitBarDragEnd = function (_v0) {
	return A2(
		$elm$html$Html$Events$preventDefaultOn,
		'pointerup',
		$author$project$Main$preventDefaultDecoder(
			A2($elm$json$Json$Decode$map, $author$project$Main$SplitBarEndMove, $author$project$PointerEvent$decode)));
};
var $author$project$Main$SplitBarUpdateMove = function (a) {
	return {$: 'SplitBarUpdateMove', a: a};
};
var $author$project$Main$onSplitBarDragMove = function (_v0) {
	return A2(
		$elm$html$Html$Events$preventDefaultOn,
		'pointermove',
		$author$project$Main$preventDefaultDecoder(
			A2($elm$json$Json$Decode$map, $author$project$Main$SplitBarUpdateMove, $author$project$PointerEvent$decode)));
};
var $elm$html$Html$pre = _VirtualDom_node('pre');
var $elm$core$String$fromFloat = _String_fromNumber;
var $author$project$Main$px = function (x) {
	return $elm$core$String$fromFloat(x) + 'px';
};
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$spellcheck = $elm$html$Html$Attributes$boolProperty('spellcheck');
var $elm$html$Html$textarea = _VirtualDom_node('textarea');
var $elm_explorations$webgl$WebGL$Internal$Alpha = function (a) {
	return {$: 'Alpha', a: a};
};
var $elm_explorations$webgl$WebGL$alpha = $elm_explorations$webgl$WebGL$Internal$Alpha;
var $elm_explorations$webgl$WebGL$Internal$Antialias = {$: 'Antialias'};
var $elm_explorations$webgl$WebGL$antialias = $elm_explorations$webgl$WebGL$Internal$Antialias;
var $elm_explorations$webgl$WebGL$Internal$ClearColor = F4(
	function (a, b, c, d) {
		return {$: 'ClearColor', a: a, b: b, c: c, d: d};
	});
var $elm_explorations$webgl$WebGL$clearColor = $elm_explorations$webgl$WebGL$Internal$ClearColor;
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm_explorations$webgl$WebGL$Internal$Depth = function (a) {
	return {$: 'Depth', a: a};
};
var $elm_explorations$webgl$WebGL$depth = $elm_explorations$webgl$WebGL$Internal$Depth;
var $elm$html$Html$Attributes$height = function (n) {
	return A2(
		_VirtualDom_attribute,
		'height',
		$elm$core$String$fromInt(n));
};
var $author$project$Main$ContextMenu = {$: 'ContextMenu'};
var $author$project$Main$onContextMenuHandler = A2(
	$elm$html$Html$Events$preventDefaultOn,
	'contextmenu',
	$author$project$Main$preventDefaultDecoder(
		$elm$json$Json$Decode$succeed($author$project$Main$ContextMenu)));
var $author$project$Main$PointerDown = function (a) {
	return {$: 'PointerDown', a: a};
};
var $author$project$Main$onPointerDownHandler = A2(
	$elm$html$Html$Events$on,
	'pointerdown',
	A2($elm$json$Json$Decode$map, $author$project$Main$PointerDown, $author$project$PointerEvent$decode));
var $author$project$Main$PointerMove = function (a) {
	return {$: 'PointerMove', a: a};
};
var $author$project$Main$onPointerMoveHandler = A2(
	$elm$html$Html$Events$on,
	'pointermove',
	A2($elm$json$Json$Decode$map, $author$project$Main$PointerMove, $author$project$PointerEvent$decode));
var $author$project$Main$PointerUp = function (a) {
	return {$: 'PointerUp', a: a};
};
var $author$project$Main$onPointerUpHandler = A2(
	$elm$html$Html$Events$on,
	'pointerup',
	A2($elm$json$Json$Decode$map, $author$project$Main$PointerUp, $author$project$PointerEvent$decode));
var $author$project$Main$Wheel = function (a) {
	return {$: 'Wheel', a: a};
};
var $author$project$Main$wheelEventDecoder = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (x, y) {
			return _Utils_Tuple2(x, y);
		}),
	A2($elm$json$Json$Decode$field, 'deltaX', $elm$json$Json$Decode$float),
	A2($elm$json$Json$Decode$field, 'deltaY', $elm$json$Json$Decode$float));
var $author$project$Main$onWheelHandler = A2(
	$elm$html$Html$Events$preventDefaultOn,
	'wheel',
	$author$project$Main$preventDefaultDecoder(
		A2($elm$json$Json$Decode$map, $author$project$Main$Wheel, $author$project$Main$wheelEventDecoder)));
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm_explorations$webgl$WebGL$Mesh3 = F2(
	function (a, b) {
		return {$: 'Mesh3', a: a, b: b};
	});
var $elm_explorations$webgl$WebGL$triangles = $elm_explorations$webgl$WebGL$Mesh3(
	{elemSize: 3, indexSize: 0, mode: 4});
var $author$project$Graphics$MeshLoader$dummyMesh = $elm_explorations$webgl$WebGL$triangles(_List_Nil);
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $author$project$Types$Pier$toString = function (pier) {
	switch (pier.$) {
		case 'Single':
			return 'pier_single';
		case 'Wide':
			return 'pier_double';
		default:
			return 'pier_mini';
	}
};
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Graphics$MeshLoader$getPierMesh = F2(
	function (model, pier) {
		return A2(
			$elm$core$Maybe$withDefault,
			$author$project$Graphics$MeshLoader$dummyMesh,
			A2(
				$elm$core$Dict$get,
				$author$project$Types$Pier$toString(pier),
				model.meshes));
	});
var $elm_explorations$webgl$WebGL$Settings$FaceMode = function (a) {
	return {$: 'FaceMode', a: a};
};
var $elm_explorations$webgl$WebGL$Settings$back = $elm_explorations$webgl$WebGL$Settings$FaceMode(1029);
var $elm_explorations$webgl$WebGL$Internal$CullFace = function (a) {
	return {$: 'CullFace', a: a};
};
var $elm_explorations$webgl$WebGL$Settings$cullFace = function (_v0) {
	var faceMode = _v0.a;
	return $elm_explorations$webgl$WebGL$Internal$CullFace(faceMode);
};
var $elm_explorations$webgl$WebGL$Internal$DepthTest = F4(
	function (a, b, c, d) {
		return {$: 'DepthTest', a: a, b: b, c: c, d: d};
	});
var $elm_explorations$webgl$WebGL$Settings$DepthTest$less = function (_v0) {
	var write = _v0.write;
	var near = _v0.near;
	var far = _v0.far;
	return A4($elm_explorations$webgl$WebGL$Internal$DepthTest, 513, write, near, far);
};
var $elm_explorations$webgl$WebGL$Settings$DepthTest$default = $elm_explorations$webgl$WebGL$Settings$DepthTest$less(
	{far: 1, near: 0, write: true});
var $elm_explorations$webgl$WebGL$Internal$enableOption = F2(
	function (ctx, option) {
		switch (option.$) {
			case 'Alpha':
				return A2(_WebGL_enableAlpha, ctx, option);
			case 'Depth':
				return A2(_WebGL_enableDepth, ctx, option);
			case 'Stencil':
				return A2(_WebGL_enableStencil, ctx, option);
			case 'Antialias':
				return A2(_WebGL_enableAntialias, ctx, option);
			case 'ClearColor':
				return A2(_WebGL_enableClearColor, ctx, option);
			default:
				return A2(_WebGL_enablePreserveDrawingBuffer, ctx, option);
		}
	});
var $elm_explorations$webgl$WebGL$Internal$enableSetting = F2(
	function (cache, setting) {
		switch (setting.$) {
			case 'Blend':
				return A2(_WebGL_enableBlend, cache, setting);
			case 'DepthTest':
				return A2(_WebGL_enableDepthTest, cache, setting);
			case 'StencilTest':
				return A2(_WebGL_enableStencilTest, cache, setting);
			case 'Scissor':
				return A2(_WebGL_enableScissor, cache, setting);
			case 'ColorMask':
				return A2(_WebGL_enableColorMask, cache, setting);
			case 'CullFace':
				return A2(_WebGL_enableCullFace, cache, setting);
			case 'PolygonOffset':
				return A2(_WebGL_enablePolygonOffset, cache, setting);
			case 'SampleCoverage':
				return A2(_WebGL_enableSampleCoverage, cache, setting);
			default:
				return _WebGL_enableSampleAlphaToCoverage(cache);
		}
	});
var $elm_explorations$webgl$WebGL$entityWith = _WebGL_entity;
var $elm_explorations$linear_algebra$Math$Vector3$normalize = _MJS_v3normalize;
var $author$project$Graphics$Render$lightFromAbove = $elm_explorations$linear_algebra$Math$Vector3$normalize(
	A3($elm_explorations$linear_algebra$Math$Vector3$vec3, 2, 1, 5));
var $author$project$Graphics$Render$makeHighlight = function (vecs) {
	var inf = A3($elm_explorations$linear_algebra$Math$Vector3$vec3, 10000000, 10000000, 10000000);
	if (!vecs.b) {
		return _Utils_Tuple3(inf, inf, inf);
	} else {
		if (!vecs.b.b) {
			var x = vecs.a;
			return _Utils_Tuple3(x, inf, inf);
		} else {
			if (!vecs.b.b.b) {
				var x = vecs.a;
				var _v1 = vecs.b;
				var y = _v1.a;
				return _Utils_Tuple3(x, y, inf);
			} else {
				var x = vecs.a;
				var _v2 = vecs.b;
				var y = _v2.a;
				var _v3 = _v2.b;
				var z = _v3.a;
				return _Utils_Tuple3(x, y, z);
			}
		}
	}
};
var $elm_explorations$linear_algebra$Math$Matrix4$makeRotate = _MJS_m4x4makeRotate;
var $elm_explorations$linear_algebra$Math$Matrix4$makeTranslate = _MJS_m4x4makeTranslate;
var $elm_explorations$linear_algebra$Math$Matrix4$mul = _MJS_m4x4mul;
var $author$project$Graphics$Render$makeMeshMatrix = F2(
	function (origin, angle) {
		var rotate = A2(
			$elm_explorations$linear_algebra$Math$Matrix4$makeRotate,
			angle,
			A3($elm_explorations$linear_algebra$Math$Vector3$vec3, 0, 0, 1));
		var position = $elm_explorations$linear_algebra$Math$Matrix4$makeTranslate(origin);
		return A2($elm_explorations$linear_algebra$Math$Matrix4$mul, position, rotate);
	});
var $elm_explorations$linear_algebra$Math$Matrix4$identity = _MJS_m4x4identity;
var $elm_explorations$linear_algebra$Math$Matrix4$inverse = _MJS_m4x4inverse;
var $elm_explorations$linear_algebra$Math$Matrix4$fromRecord = _MJS_m4x4fromRecord;
var $elm_explorations$linear_algebra$Math$Matrix4$toRecord = _MJS_m4x4toRecord;
var $author$project$Graphics$Render$toMat3 = function (mat) {
	var record = $elm_explorations$linear_algebra$Math$Matrix4$toRecord(mat);
	return $elm_explorations$linear_algebra$Math$Matrix4$fromRecord(
		_Utils_update(
			record,
			{m14: 0.0, m24: 0.0, m34: 0.0, m41: 0.0, m42: 0.0, m43: 0.0, m44: 1.0}));
};
var $elm_explorations$linear_algebra$Math$Matrix4$transpose = _MJS_m4x4transpose;
var $author$project$Graphics$Render$normalMatrix = function (mat) {
	var _v0 = $elm_explorations$linear_algebra$Math$Matrix4$inverse(
		$author$project$Graphics$Render$toMat3(mat));
	if (_v0.$ === 'Just') {
		var inverted = _v0.a;
		return $elm_explorations$linear_algebra$Math$Matrix4$transpose(inverted);
	} else {
		return $elm_explorations$linear_algebra$Math$Matrix4$identity;
	}
};
var $author$project$Graphics$Render$railFragmentShader = {
	src: '\n        uniform highp vec3 light;\n        uniform highp vec3 albedo;\n        uniform highp float roughness;\n\n        uniform highp vec3 highlight1;\n        uniform highp vec3 highlight2;\n        uniform highp vec3 highlight3;\n\n        varying highp vec3 varyingViewPosition;\n        varying highp vec3 varyingNormal;\n\n        highp float getHighlightIntensity(in highp vec3 highlight) {\n            return min(pow((distance(-varyingViewPosition, highlight) + 1.0) / 15.0, -2.5), 1.0);\n        }\n\n        void main() {\n            highp vec3 nLight = normalize(light);\n            highp vec3 nViewPosition = normalize(varyingViewPosition);\n            highp vec3 nNormal = normalize(varyingNormal);\n            highp vec3 nHalfway = normalize(nLight + nViewPosition);\n\n            highp vec3 ambient = 0.3 * albedo;\n\n            // https://mimosa-pudica.net/improved-oren-nayar.html\n            highp float dotLightNormal = dot(nLight, nNormal);\n            highp float dotViewNormal = dot(nViewPosition, nNormal);\n            highp float s = dot(nLight, nViewPosition) - dotLightNormal * dotViewNormal;\n            highp float t = mix(1.0, max(dotLightNormal, dotViewNormal), step(0.0, s));\n            highp float orenNayerA = 1.0 - 0.5 * (roughness / (roughness + 0.33));\n            highp float orenNayerB = 0.45 * (roughness / (roughness + 0.09));\n\n            highp vec3 diffuse = 0.8 * albedo * max(dotLightNormal, 0.0) * (orenNayerA + orenNayerB * s / t);\n            highp vec3 specular = vec3(0.2 * pow(clamp(dot(nHalfway, nNormal), 0.0, 1.0), 30.0));\n\n            highp float highlight =max(getHighlightIntensity(highlight1), max(getHighlightIntensity(highlight2), getHighlightIntensity(highlight3)));\n\n\n            highp vec3 fragmentColor = mix(ambient + diffuse + specular, vec3(1.0, 1.0, 1.0), highlight);\n\n\n            gl_FragColor = vec4(vec3(fragmentColor), 1.0);\n        }\n    ',
	attributes: {},
	uniforms: {albedo: 'albedo', highlight1: 'highlight1', highlight2: 'highlight2', highlight3: 'highlight3', light: 'light', roughness: 'roughness'}
};
var $author$project$Graphics$Render$railVertexShader = {
	src: '\n        attribute vec3 position;\n        attribute vec3 normal;\n        \n        uniform mat4 modelViewMatrix;\n        uniform mat4 projectionMatrix;\n        uniform mat4 normalMatrix;\n\n        varying highp vec3 varyingViewPosition;\n        varying highp vec3 varyingNormal;\n\n\n        void main() {\n            highp vec4 cameraPosition = modelViewMatrix * vec4(position, 1.0);\n            varyingNormal = (normalMatrix * vec4(normal, 0.0)).xyz;\n            varyingViewPosition = -cameraPosition.xyz;\n\n            gl_Position = projectionMatrix * cameraPosition;\n        }\n    ',
	attributes: {normal: 'normal', position: 'position'},
	uniforms: {modelViewMatrix: 'modelViewMatrix', normalMatrix: 'normalMatrix', projectionMatrix: 'projectionMatrix'}
};
var $elm_explorations$linear_algebra$Math$Matrix4$transform = _MJS_v3mul4x4;
var $author$project$Graphics$Render$renderRail = F7(
	function (viewMatrix, projectionMatrix, mesh, origin, angle, color, minusTerminals) {
		var modelMatrix = A2($author$project$Graphics$Render$makeMeshMatrix, origin, angle);
		var modelViewMatrix = A2($elm_explorations$linear_algebra$Math$Matrix4$mul, viewMatrix, modelMatrix);
		var normalMat = $author$project$Graphics$Render$normalMatrix(modelViewMatrix);
		var _v0 = $author$project$Graphics$Render$makeHighlight(
			A2(
				$elm$core$List$map,
				$elm_explorations$linear_algebra$Math$Matrix4$transform(modelViewMatrix),
				minusTerminals));
		var highlight1 = _v0.a;
		var highlight2 = _v0.b;
		var highlight3 = _v0.c;
		return _List_fromArray(
			[
				A5(
				$elm_explorations$webgl$WebGL$entityWith,
				_List_fromArray(
					[
						$elm_explorations$webgl$WebGL$Settings$DepthTest$default,
						$elm_explorations$webgl$WebGL$Settings$cullFace($elm_explorations$webgl$WebGL$Settings$back)
					]),
				$author$project$Graphics$Render$railVertexShader,
				$author$project$Graphics$Render$railFragmentShader,
				mesh,
				{
					albedo: color,
					highlight1: highlight1,
					highlight2: highlight2,
					highlight3: highlight3,
					light: A2(
						$elm_explorations$linear_algebra$Math$Matrix4$transform,
						$author$project$Graphics$Render$normalMatrix(viewMatrix),
						$author$project$Graphics$Render$lightFromAbove),
					modelViewMatrix: modelViewMatrix,
					normalMatrix: normalMat,
					projectionMatrix: projectionMatrix,
					roughness: 1.0
				})
			]);
	});
var $author$project$Graphics$Render$renderPier = F5(
	function (viewMatrix, projectionMatrix, mesh, origin, angle) {
		return A7(
			$author$project$Graphics$Render$renderRail,
			viewMatrix,
			projectionMatrix,
			mesh,
			origin,
			angle,
			A3($elm_explorations$linear_algebra$Math$Vector3$vec3, 1.0, 0.85, 0.3),
			_List_Nil);
	});
var $author$project$Graphics$MeshLoader$renderPiers = F4(
	function (model, piers, viewMatrix, projectionMatrix) {
		return A2(
			$elm$core$List$concatMap,
			function (pier) {
				return A5(
					$author$project$Graphics$Render$renderPier,
					viewMatrix,
					projectionMatrix,
					A2($author$project$Graphics$MeshLoader$getPierMesh, model, pier.pier),
					pier.position,
					pier.angle);
			},
			piers);
	});
var $author$project$Graphics$MeshLoader$getRailColor = function (rail) {
	var skyblue = A3($elm_explorations$linear_algebra$Math$Vector3$vec3, 0.47, 0.8, 1.0);
	var red = A3($elm_explorations$linear_algebra$Math$Vector3$vec3, 1.0, 0.2, 0.4);
	var green = A3($elm_explorations$linear_algebra$Math$Vector3$vec3, 0.12, 1.0, 0.56);
	var gray = A3($elm_explorations$linear_algebra$Math$Vector3$vec3, 0.8, 0.8, 0.8);
	var darkblue = A3($elm_explorations$linear_algebra$Math$Vector3$vec3, 0.12, 0.4, 0.7);
	var blue = A3($elm_explorations$linear_algebra$Math$Vector3$vec3, 0.12, 0.56, 1.0);
	switch (rail.$) {
		case 'UTurn':
			return red;
		case 'Oneway':
			return gray;
		case 'WideCross':
			return gray;
		case 'Forward':
			return green;
		case 'Backward':
			return skyblue;
		case 'OuterCurve45':
			return darkblue;
		default:
			return blue;
	}
};
var $author$project$Types$Rail$isFlippedToString = function (isFlipped) {
	if (isFlipped.$ === 'NotFlipped') {
		return '';
	} else {
		return '_flip';
	}
};
var $author$project$Types$Rail$isInvertedToString = function (inverted) {
	if (inverted.$ === 'NotInverted') {
		return '';
	} else {
		return '_plus';
	}
};
var $author$project$Types$Rail$toStringWith = F3(
	function (flipped, inverted, rail) {
		switch (rail.$) {
			case 'Straight1':
				var inv = rail.a;
				return 'straight1' + inverted(inv);
			case 'Straight2':
				var inv = rail.a;
				return 'straight2' + inverted(inv);
			case 'Straight4':
				var inv = rail.a;
				return 'straight4' + inverted(inv);
			case 'Straight8':
				var inv = rail.a;
				return 'straight8' + inverted(inv);
			case 'DoubleStraight4':
				var inv = rail.a;
				return 'double_track_straight4' + inverted(inv);
			case 'Curve45':
				var flip = rail.a;
				var inv = rail.b;
				return 'curve45' + (inverted(inv) + flipped(flip));
			case 'Curve90':
				var flip = rail.a;
				var inv = rail.b;
				return 'curve90' + (inverted(inv) + flipped(flip));
			case 'OuterCurve45':
				var flip = rail.a;
				var inv = rail.b;
				return 'outer_curve45' + (inverted(inv) + flipped(flip));
			case 'DoubleCurve45':
				var flip = rail.a;
				var inv = rail.b;
				return 'double_track_curve45' + (inverted(inv) + flipped(flip));
			case 'Turnout':
				var flip = rail.a;
				var inv = rail.b;
				return 'turnout' + (inverted(inv) + flipped(flip));
			case 'SingleDouble':
				var flip = rail.a;
				var inv = rail.b;
				return 'single_double' + (inverted(inv) + flipped(flip));
			case 'DoubleWide':
				var flip = rail.a;
				var inv = rail.b;
				return 'double_wide' + (inverted(inv) + flipped(flip));
			case 'EightPoint':
				var flip = rail.a;
				var inv = rail.b;
				return 'eight' + (inverted(inv) + flipped(flip));
			case 'JointChange':
				var inv = rail.a;
				return 'joint' + inverted(inv);
			case 'Slope':
				var flip = rail.a;
				var inv = rail.b;
				return 'slope' + (inverted(inv) + flipped(flip));
			case 'Shift':
				var flip = rail.a;
				var inv = rail.b;
				return 'shift' + (inverted(inv) + flipped(flip));
			case 'SlopeCurveA':
				return 'slope_curve_A';
			case 'SlopeCurveB':
				return 'slope_curve_B';
			case 'Stop':
				var inv = rail.a;
				return 'stop' + inverted(inv);
			case 'AutoTurnout':
				return 'auto_turnout';
			case 'AutoPoint':
				return 'auto_point';
			case 'AutoCross':
				return 'auto_cross';
			case 'UTurn':
				return 'uturn';
			case 'Oneway':
				var flip = rail.a;
				return 'oneway' + flipped(flip);
			case 'WideCross':
				return 'wide_cross';
			case 'Forward':
				var inv = rail.a;
				return 'forward' + inverted(inv);
			default:
				var inv = rail.a;
				return 'backward' + inverted(inv);
		}
	});
var $author$project$Types$Rail$toString = A2($author$project$Types$Rail$toStringWith, $author$project$Types$Rail$isFlippedToString, $author$project$Types$Rail$isInvertedToString);
var $author$project$Graphics$MeshLoader$getRailMesh = F2(
	function (model, rail) {
		return A2(
			$elm$core$Maybe$withDefault,
			$author$project$Graphics$MeshLoader$dummyMesh,
			A2(
				$elm$core$Dict$get,
				$author$project$Types$Rail$toString(rail),
				model.meshes));
	});
var $author$project$Forth$Geometry$Joint$Minus = {$: 'Minus'};
var $author$project$Forth$Geometry$Joint$Plus = {$: 'Plus'};
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $author$project$Types$Rail$Inverted = {$: 'Inverted'};
var $author$project$Forth$Geometry$Location$make = F4(
	function (single, _double, height, dir) {
		return {dir: dir, _double: _double, height: height, single: single};
	});
var $author$project$Forth$Geometry$Rot45$Rot45 = F4(
	function (a, b, c, d) {
		return {$: 'Rot45', a: a, b: b, c: c, d: d};
	});
var $author$project$Forth$Geometry$Rot45$make = F4(
	function (a, b, c, d) {
		return A4($author$project$Forth$Geometry$Rot45$Rot45, a, b, c, d);
	});
var $author$project$Forth$Geometry$Dir$Dir = function (a) {
	return {$: 'Dir', a: a};
};
var $author$project$Forth$Geometry$Dir$ne = $author$project$Forth$Geometry$Dir$Dir(1);
var $author$project$Forth$LocationDefinition$doubleRightAndOuterLeft45 = A4(
	$author$project$Forth$Geometry$Location$make,
	A4($author$project$Forth$Geometry$Rot45$make, 0, 0, 8, -8),
	A4($author$project$Forth$Geometry$Rot45$make, 0, 0, 0, -2),
	0,
	$author$project$Forth$Geometry$Dir$ne);
var $author$project$Forth$Geometry$Rot45$conj = function (_v0) {
	var a = _v0.a;
	var b = _v0.b;
	var c = _v0.c;
	var d = _v0.d;
	return A4($author$project$Forth$Geometry$Rot45$make, a, -d, -c, -b);
};
var $author$project$Forth$Geometry$Dir$inv = function (_v0) {
	var d = _v0.a;
	return (!d) ? $author$project$Forth$Geometry$Dir$Dir(0) : $author$project$Forth$Geometry$Dir$Dir(8 - d);
};
var $author$project$Forth$Geometry$Location$flip = function (loc) {
	return {
		dir: $author$project$Forth$Geometry$Dir$inv(loc.dir),
		_double: $author$project$Forth$Geometry$Rot45$conj(loc._double),
		height: -loc.height,
		single: $author$project$Forth$Geometry$Rot45$conj(loc.single)
	};
};
var $author$project$Forth$Geometry$RailLocation$flip = function (loc) {
	return _Utils_update(
		loc,
		{
			location: $author$project$Forth$Geometry$Location$flip(loc.location)
		});
};
var $mgold$elm_nonempty_list$List$Nonempty$Nonempty = F2(
	function (a, b) {
		return {$: 'Nonempty', a: a, b: b};
	});
var $mgold$elm_nonempty_list$List$Nonempty$map = F2(
	function (f, _v0) {
		var x = _v0.a;
		var xs = _v0.b;
		return A2(
			$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
			f(x),
			A2($elm$core$List$map, f, xs));
	});
var $author$project$Util$reverseTail = function (_v0) {
	var x = _v0.a;
	var xs = _v0.b;
	return A2(
		$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
		x,
		$elm$core$List$reverse(xs));
};
var $author$project$Forth$RailPiece$flip = F2(
	function (flipped, piece) {
		if (flipped.$ === 'NotFlipped') {
			return piece;
		} else {
			return {
				origin: $author$project$Forth$Geometry$RailLocation$flip(piece.origin),
				railLocations: A2(
					$mgold$elm_nonempty_list$List$Nonempty$map,
					$author$project$Forth$Geometry$RailLocation$flip,
					$author$project$Util$reverseTail(piece.railLocations))
			};
		}
	});
var $author$project$Forth$Geometry$Dir$e = $author$project$Forth$Geometry$Dir$Dir(0);
var $author$project$Forth$Geometry$RailLocation$make = F5(
	function (single, _double, height, dir, joint) {
		return {
			joint: joint,
			location: A4($author$project$Forth$Geometry$Location$make, single, _double, height, dir)
		};
	});
var $author$project$Forth$Geometry$Rot45$zero = A4($author$project$Forth$Geometry$Rot45$make, 0, 0, 0, 0);
var $author$project$Forth$Geometry$RailLocation$zero = A5($author$project$Forth$Geometry$RailLocation$make, $author$project$Forth$Geometry$Rot45$zero, $author$project$Forth$Geometry$Rot45$zero, 0, $author$project$Forth$Geometry$Dir$e, $author$project$Forth$Geometry$Joint$Minus);
var $author$project$Forth$RailPiece$make = function (list) {
	return {origin: $author$project$Forth$Geometry$RailLocation$zero, railLocations: list};
};
var $author$project$Forth$RailPiece$fourEnds = F4(
	function (a, b, c, d) {
		return $author$project$Forth$RailPiece$make(
			A2(
				$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
				a,
				_List_fromArray(
					[b, c, d])));
	});
var $author$project$Forth$Geometry$Joint$invert = function (p) {
	if (p.$ === 'Plus') {
		return $author$project$Forth$Geometry$Joint$Minus;
	} else {
		return $author$project$Forth$Geometry$Joint$Plus;
	}
};
var $author$project$Forth$Geometry$RailLocation$invertJoint = function (loc) {
	return _Utils_update(
		loc,
		{
			joint: $author$project$Forth$Geometry$Joint$invert(loc.joint)
		});
};
var $author$project$Forth$RailPiece$invert = F2(
	function (inverted, piece) {
		if (inverted.$ === 'NotInverted') {
			return piece;
		} else {
			return {
				origin: $author$project$Forth$Geometry$RailLocation$invertJoint(piece.origin),
				railLocations: A2($mgold$elm_nonempty_list$List$Nonempty$map, $author$project$Forth$Geometry$RailLocation$invertJoint, piece.railLocations)
			};
		}
	});
var $author$project$Forth$LocationDefinition$left45 = A4(
	$author$project$Forth$Geometry$Location$make,
	A4($author$project$Forth$Geometry$Rot45$make, 0, 0, 8, -8),
	$author$project$Forth$Geometry$Rot45$zero,
	0,
	$author$project$Forth$Geometry$Dir$ne);
var $author$project$Forth$LocationDefinition$left45AndUp = A4(
	$author$project$Forth$Geometry$Location$make,
	A4($author$project$Forth$Geometry$Rot45$make, 0, 0, 8, -8),
	$author$project$Forth$Geometry$Rot45$zero,
	1,
	$author$project$Forth$Geometry$Dir$ne);
var $author$project$Forth$Geometry$Dir$n = $author$project$Forth$Geometry$Dir$Dir(2);
var $author$project$Forth$LocationDefinition$left90 = A4(
	$author$project$Forth$Geometry$Location$make,
	A4($author$project$Forth$Geometry$Rot45$make, 8, 0, 8, 0),
	$author$project$Forth$Geometry$Rot45$zero,
	0,
	$author$project$Forth$Geometry$Dir$n);
var $author$project$Forth$Geometry$RailLocation$minus = function (loc) {
	return {joint: $author$project$Forth$Geometry$Joint$Minus, location: loc};
};
var $author$project$Forth$LocationDefinition$outerLeft45 = A4(
	$author$project$Forth$Geometry$Location$make,
	A4($author$project$Forth$Geometry$Rot45$make, 0, 0, 8, -8),
	A4($author$project$Forth$Geometry$Rot45$make, 0, 0, 2, -2),
	0,
	$author$project$Forth$Geometry$Dir$ne);
var $author$project$Forth$Geometry$RailLocation$plus = function (loc) {
	return {joint: $author$project$Forth$Geometry$Joint$Plus, location: loc};
};
var $author$project$Forth$Geometry$Dir$se = $author$project$Forth$Geometry$Dir$Dir(7);
var $author$project$Forth$LocationDefinition$right45 = A4(
	$author$project$Forth$Geometry$Location$make,
	A4($author$project$Forth$Geometry$Rot45$make, 0, 8, -8, 0),
	$author$project$Forth$Geometry$Rot45$zero,
	0,
	$author$project$Forth$Geometry$Dir$se);
var $author$project$Forth$LocationDefinition$right45AndUp = A4(
	$author$project$Forth$Geometry$Location$make,
	A4($author$project$Forth$Geometry$Rot45$make, 0, 8, -8, 0),
	$author$project$Forth$Geometry$Rot45$zero,
	1,
	$author$project$Forth$Geometry$Dir$se);
var $author$project$Forth$LocationDefinition$straight = function (n) {
	return A4(
		$author$project$Forth$Geometry$Location$make,
		A4($author$project$Forth$Geometry$Rot45$make, 2 * n, 0, 0, 0),
		$author$project$Forth$Geometry$Rot45$zero,
		0,
		$author$project$Forth$Geometry$Dir$e);
};
var $author$project$Forth$LocationDefinition$straightAndLeft45 = function (n) {
	return A4(
		$author$project$Forth$Geometry$Location$make,
		A4($author$project$Forth$Geometry$Rot45$make, 2 * n, 0, 8, -8),
		$author$project$Forth$Geometry$Rot45$zero,
		0,
		$author$project$Forth$Geometry$Dir$ne);
};
var $author$project$Forth$LocationDefinition$straightAndUp = F2(
	function (h, n) {
		return A4(
			$author$project$Forth$Geometry$Location$make,
			A4($author$project$Forth$Geometry$Rot45$make, 2 * n, 0, 0, 0),
			$author$project$Forth$Geometry$Rot45$zero,
			h,
			$author$project$Forth$Geometry$Dir$e);
	});
var $author$project$Forth$LocationDefinition$straightDoubleLeft = function (n) {
	return A4(
		$author$project$Forth$Geometry$Location$make,
		A4($author$project$Forth$Geometry$Rot45$make, 2 * n, 0, 0, 0),
		A4($author$project$Forth$Geometry$Rot45$make, 0, 0, 2, 0),
		0,
		$author$project$Forth$Geometry$Dir$e);
};
var $author$project$Forth$LocationDefinition$straightDoubleRight = function (n) {
	return A4(
		$author$project$Forth$Geometry$Location$make,
		A4($author$project$Forth$Geometry$Rot45$make, 2 * n, 0, 0, 0),
		A4($author$project$Forth$Geometry$Rot45$make, 0, 0, -2, 0),
		0,
		$author$project$Forth$Geometry$Dir$e);
};
var $author$project$Forth$LocationDefinition$straightWideLeft = function (n) {
	return A4(
		$author$project$Forth$Geometry$Location$make,
		A4($author$project$Forth$Geometry$Rot45$make, 2 * n, 0, 4, 0),
		$author$project$Forth$Geometry$Rot45$zero,
		0,
		$author$project$Forth$Geometry$Dir$e);
};
var $author$project$Forth$LocationDefinition$straightWideRight = function (n) {
	return A4(
		$author$project$Forth$Geometry$Location$make,
		A4($author$project$Forth$Geometry$Rot45$make, 2 * n, 0, -4, 0),
		$author$project$Forth$Geometry$Rot45$zero,
		0,
		$author$project$Forth$Geometry$Dir$e);
};
var $author$project$Forth$RailPiece$threeEnds = F3(
	function (a, b, c) {
		return $author$project$Forth$RailPiece$make(
			A2(
				$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
				a,
				_List_fromArray(
					[b, c])));
	});
var $author$project$Forth$RailPiece$twoEnds = F2(
	function (a, b) {
		return $author$project$Forth$RailPiece$make(
			A2(
				$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
				a,
				_List_fromArray(
					[b])));
	});
var $author$project$Forth$Geometry$Dir$w = $author$project$Forth$Geometry$Dir$Dir(4);
var $author$project$Forth$LocationDefinition$zero = A4($author$project$Forth$Geometry$Location$make, $author$project$Forth$Geometry$Rot45$zero, $author$project$Forth$Geometry$Rot45$zero, 0, $author$project$Forth$Geometry$Dir$w);
var $author$project$Forth$LocationDefinition$zeroDoubleLeft = A4(
	$author$project$Forth$Geometry$Location$make,
	$author$project$Forth$Geometry$Rot45$zero,
	A4($author$project$Forth$Geometry$Rot45$make, 0, 0, 2, 0),
	0,
	$author$project$Forth$Geometry$Dir$w);
var $author$project$Forth$LocationDefinition$zeroDoubleRight = A4(
	$author$project$Forth$Geometry$Location$make,
	$author$project$Forth$Geometry$Rot45$zero,
	A4($author$project$Forth$Geometry$Rot45$make, 0, 0, -2, 0),
	0,
	$author$project$Forth$Geometry$Dir$w);
var $author$project$Forth$LocationDefinition$zeroWideRight = A4(
	$author$project$Forth$Geometry$Location$make,
	A4($author$project$Forth$Geometry$Rot45$make, 0, 0, -4, 0),
	$author$project$Forth$Geometry$Rot45$zero,
	0,
	$author$project$Forth$Geometry$Dir$w);
var $author$project$Forth$RailPieceDefinition$getRailPiece = function (rail) {
	switch (rail.$) {
		case 'Straight1':
			var i = rail.a;
			return A2(
				$author$project$Forth$RailPiece$invert,
				i,
				A2(
					$author$project$Forth$RailPiece$twoEnds,
					$author$project$Forth$Geometry$RailLocation$minus($author$project$Forth$LocationDefinition$zero),
					$author$project$Forth$Geometry$RailLocation$plus(
						$author$project$Forth$LocationDefinition$straight(1))));
		case 'Straight2':
			var i = rail.a;
			return A2(
				$author$project$Forth$RailPiece$invert,
				i,
				A2(
					$author$project$Forth$RailPiece$twoEnds,
					$author$project$Forth$Geometry$RailLocation$minus($author$project$Forth$LocationDefinition$zero),
					$author$project$Forth$Geometry$RailLocation$plus(
						$author$project$Forth$LocationDefinition$straight(2))));
		case 'Straight4':
			var i = rail.a;
			return A2(
				$author$project$Forth$RailPiece$invert,
				i,
				A2(
					$author$project$Forth$RailPiece$twoEnds,
					$author$project$Forth$Geometry$RailLocation$minus($author$project$Forth$LocationDefinition$zero),
					$author$project$Forth$Geometry$RailLocation$plus(
						$author$project$Forth$LocationDefinition$straight(4))));
		case 'Straight8':
			var i = rail.a;
			return A2(
				$author$project$Forth$RailPiece$invert,
				i,
				A2(
					$author$project$Forth$RailPiece$twoEnds,
					$author$project$Forth$Geometry$RailLocation$minus($author$project$Forth$LocationDefinition$zero),
					$author$project$Forth$Geometry$RailLocation$plus(
						$author$project$Forth$LocationDefinition$straight(8))));
		case 'DoubleStraight4':
			var i = rail.a;
			return A2(
				$author$project$Forth$RailPiece$invert,
				i,
				A4(
					$author$project$Forth$RailPiece$fourEnds,
					$author$project$Forth$Geometry$RailLocation$minus($author$project$Forth$LocationDefinition$zero),
					$author$project$Forth$Geometry$RailLocation$minus($author$project$Forth$LocationDefinition$zeroDoubleRight),
					$author$project$Forth$Geometry$RailLocation$plus(
						$author$project$Forth$LocationDefinition$straightDoubleRight(4)),
					$author$project$Forth$Geometry$RailLocation$plus(
						$author$project$Forth$LocationDefinition$straight(4))));
		case 'Curve45':
			var f = rail.a;
			var i = rail.b;
			return A2(
				$author$project$Forth$RailPiece$invert,
				i,
				A2(
					$author$project$Forth$RailPiece$flip,
					f,
					A2(
						$author$project$Forth$RailPiece$twoEnds,
						$author$project$Forth$Geometry$RailLocation$minus($author$project$Forth$LocationDefinition$zero),
						$author$project$Forth$Geometry$RailLocation$plus($author$project$Forth$LocationDefinition$left45))));
		case 'Curve90':
			var f = rail.a;
			var i = rail.b;
			return A2(
				$author$project$Forth$RailPiece$invert,
				i,
				A2(
					$author$project$Forth$RailPiece$flip,
					f,
					A2(
						$author$project$Forth$RailPiece$twoEnds,
						$author$project$Forth$Geometry$RailLocation$minus($author$project$Forth$LocationDefinition$zero),
						$author$project$Forth$Geometry$RailLocation$plus($author$project$Forth$LocationDefinition$left90))));
		case 'OuterCurve45':
			var f = rail.a;
			var i = rail.b;
			return A2(
				$author$project$Forth$RailPiece$invert,
				i,
				A2(
					$author$project$Forth$RailPiece$flip,
					f,
					A2(
						$author$project$Forth$RailPiece$twoEnds,
						$author$project$Forth$Geometry$RailLocation$minus($author$project$Forth$LocationDefinition$zero),
						$author$project$Forth$Geometry$RailLocation$plus($author$project$Forth$LocationDefinition$outerLeft45))));
		case 'DoubleCurve45':
			var f = rail.a;
			var i = rail.b;
			return A2(
				$author$project$Forth$RailPiece$invert,
				i,
				A2(
					$author$project$Forth$RailPiece$flip,
					f,
					A4(
						$author$project$Forth$RailPiece$fourEnds,
						$author$project$Forth$Geometry$RailLocation$minus($author$project$Forth$LocationDefinition$zero),
						$author$project$Forth$Geometry$RailLocation$minus($author$project$Forth$LocationDefinition$zeroDoubleRight),
						$author$project$Forth$Geometry$RailLocation$plus($author$project$Forth$LocationDefinition$doubleRightAndOuterLeft45),
						$author$project$Forth$Geometry$RailLocation$plus($author$project$Forth$LocationDefinition$left45))));
		case 'Turnout':
			var f = rail.a;
			var i = rail.b;
			return A2(
				$author$project$Forth$RailPiece$invert,
				i,
				A2(
					$author$project$Forth$RailPiece$flip,
					f,
					A3(
						$author$project$Forth$RailPiece$threeEnds,
						$author$project$Forth$Geometry$RailLocation$minus($author$project$Forth$LocationDefinition$zero),
						$author$project$Forth$Geometry$RailLocation$plus(
							$author$project$Forth$LocationDefinition$straight(4)),
						$author$project$Forth$Geometry$RailLocation$plus($author$project$Forth$LocationDefinition$left45))));
		case 'SingleDouble':
			var f = rail.a;
			var i = rail.b;
			return A2(
				$author$project$Forth$RailPiece$invert,
				i,
				A2(
					$author$project$Forth$RailPiece$flip,
					f,
					A3(
						$author$project$Forth$RailPiece$threeEnds,
						$author$project$Forth$Geometry$RailLocation$minus($author$project$Forth$LocationDefinition$zero),
						$author$project$Forth$Geometry$RailLocation$plus(
							$author$project$Forth$LocationDefinition$straight(4)),
						$author$project$Forth$Geometry$RailLocation$plus(
							$author$project$Forth$LocationDefinition$straightDoubleLeft(4)))));
		case 'DoubleWide':
			var f = rail.a;
			var i = rail.b;
			return A2(
				$author$project$Forth$RailPiece$invert,
				i,
				A2(
					$author$project$Forth$RailPiece$flip,
					f,
					A4(
						$author$project$Forth$RailPiece$fourEnds,
						$author$project$Forth$Geometry$RailLocation$minus($author$project$Forth$LocationDefinition$zero),
						$author$project$Forth$Geometry$RailLocation$minus(
							$author$project$Forth$LocationDefinition$straight(5)),
						$author$project$Forth$Geometry$RailLocation$plus(
							$author$project$Forth$LocationDefinition$straightWideLeft(5)),
						$author$project$Forth$Geometry$RailLocation$minus($author$project$Forth$LocationDefinition$zeroDoubleLeft))));
		case 'EightPoint':
			var f = rail.a;
			var i = rail.b;
			return A2(
				$author$project$Forth$RailPiece$invert,
				i,
				A2(
					$author$project$Forth$RailPiece$flip,
					f,
					A3(
						$author$project$Forth$RailPiece$threeEnds,
						$author$project$Forth$Geometry$RailLocation$minus($author$project$Forth$LocationDefinition$zero),
						$author$project$Forth$Geometry$RailLocation$minus($author$project$Forth$LocationDefinition$right45),
						$author$project$Forth$Geometry$RailLocation$plus($author$project$Forth$LocationDefinition$left45))));
		case 'JointChange':
			var i = rail.a;
			return A2(
				$author$project$Forth$RailPiece$invert,
				i,
				A2(
					$author$project$Forth$RailPiece$twoEnds,
					$author$project$Forth$Geometry$RailLocation$minus($author$project$Forth$LocationDefinition$zero),
					$author$project$Forth$Geometry$RailLocation$minus(
						$author$project$Forth$LocationDefinition$straight(1))));
		case 'Slope':
			var f = rail.a;
			var i = rail.b;
			return A2(
				$author$project$Forth$RailPiece$invert,
				i,
				A2(
					$author$project$Forth$RailPiece$flip,
					f,
					A2(
						$author$project$Forth$RailPiece$twoEnds,
						$author$project$Forth$Geometry$RailLocation$minus($author$project$Forth$LocationDefinition$zero),
						$author$project$Forth$Geometry$RailLocation$plus(
							A2($author$project$Forth$LocationDefinition$straightAndUp, 4, 8)))));
		case 'Shift':
			var f = rail.a;
			var i = rail.b;
			return A2(
				$author$project$Forth$RailPiece$invert,
				i,
				A2(
					$author$project$Forth$RailPiece$flip,
					f,
					A2(
						$author$project$Forth$RailPiece$twoEnds,
						$author$project$Forth$Geometry$RailLocation$minus($author$project$Forth$LocationDefinition$zero),
						$author$project$Forth$Geometry$RailLocation$plus(
							$author$project$Forth$LocationDefinition$straightDoubleLeft(4)))));
		case 'SlopeCurveA':
			return A2(
				$author$project$Forth$RailPiece$twoEnds,
				$author$project$Forth$Geometry$RailLocation$plus($author$project$Forth$LocationDefinition$zero),
				$author$project$Forth$Geometry$RailLocation$minus($author$project$Forth$LocationDefinition$right45AndUp));
		case 'SlopeCurveB':
			return A2(
				$author$project$Forth$RailPiece$twoEnds,
				$author$project$Forth$Geometry$RailLocation$minus($author$project$Forth$LocationDefinition$zero),
				$author$project$Forth$Geometry$RailLocation$plus($author$project$Forth$LocationDefinition$left45AndUp));
		case 'Stop':
			var i = rail.a;
			return A2(
				$author$project$Forth$RailPiece$invert,
				i,
				A2(
					$author$project$Forth$RailPiece$twoEnds,
					$author$project$Forth$Geometry$RailLocation$minus($author$project$Forth$LocationDefinition$zero),
					$author$project$Forth$Geometry$RailLocation$plus(
						$author$project$Forth$LocationDefinition$straight(4))));
		case 'AutoTurnout':
			return A3(
				$author$project$Forth$RailPiece$threeEnds,
				$author$project$Forth$Geometry$RailLocation$minus($author$project$Forth$LocationDefinition$zero),
				$author$project$Forth$Geometry$RailLocation$plus(
					$author$project$Forth$LocationDefinition$straight(6)),
				$author$project$Forth$Geometry$RailLocation$plus(
					$author$project$Forth$LocationDefinition$straightAndLeft45(2)));
		case 'AutoPoint':
			return A4(
				$author$project$Forth$RailPiece$fourEnds,
				$author$project$Forth$Geometry$RailLocation$minus($author$project$Forth$LocationDefinition$zero),
				$author$project$Forth$Geometry$RailLocation$plus(
					$author$project$Forth$LocationDefinition$straightDoubleRight(6)),
				$author$project$Forth$Geometry$RailLocation$plus(
					$author$project$Forth$LocationDefinition$straight(6)),
				$author$project$Forth$Geometry$RailLocation$plus(
					$author$project$Forth$LocationDefinition$straightAndLeft45(2)));
		case 'AutoCross':
			return A4(
				$author$project$Forth$RailPiece$fourEnds,
				$author$project$Forth$Geometry$RailLocation$minus($author$project$Forth$LocationDefinition$zero),
				$author$project$Forth$Geometry$RailLocation$minus($author$project$Forth$LocationDefinition$zeroDoubleRight),
				$author$project$Forth$Geometry$RailLocation$plus(
					$author$project$Forth$LocationDefinition$straightDoubleRight(4)),
				$author$project$Forth$Geometry$RailLocation$plus(
					$author$project$Forth$LocationDefinition$straight(4)));
		case 'UTurn':
			return A2(
				$author$project$Forth$RailPiece$twoEnds,
				$author$project$Forth$Geometry$RailLocation$minus($author$project$Forth$LocationDefinition$zero),
				$author$project$Forth$Geometry$RailLocation$minus($author$project$Forth$LocationDefinition$zeroDoubleLeft));
		case 'Oneway':
			var f = rail.a;
			return A2(
				$author$project$Forth$RailPiece$invert,
				$author$project$Types$Rail$Inverted,
				A2(
					$author$project$Forth$RailPiece$flip,
					f,
					A3(
						$author$project$Forth$RailPiece$threeEnds,
						$author$project$Forth$Geometry$RailLocation$minus($author$project$Forth$LocationDefinition$zero),
						$author$project$Forth$Geometry$RailLocation$plus(
							$author$project$Forth$LocationDefinition$straight(4)),
						$author$project$Forth$Geometry$RailLocation$plus($author$project$Forth$LocationDefinition$left45))));
		case 'WideCross':
			return A4(
				$author$project$Forth$RailPiece$fourEnds,
				$author$project$Forth$Geometry$RailLocation$minus($author$project$Forth$LocationDefinition$zero),
				$author$project$Forth$Geometry$RailLocation$plus($author$project$Forth$LocationDefinition$zeroWideRight),
				$author$project$Forth$Geometry$RailLocation$minus(
					$author$project$Forth$LocationDefinition$straightWideRight(4)),
				$author$project$Forth$Geometry$RailLocation$plus(
					$author$project$Forth$LocationDefinition$straight(4)));
		case 'Forward':
			var i = rail.a;
			return A2(
				$author$project$Forth$RailPiece$invert,
				i,
				A2(
					$author$project$Forth$RailPiece$twoEnds,
					$author$project$Forth$Geometry$RailLocation$minus($author$project$Forth$LocationDefinition$zero),
					$author$project$Forth$Geometry$RailLocation$plus(
						$author$project$Forth$LocationDefinition$straight(2))));
		default:
			var i = rail.a;
			return A2(
				$author$project$Forth$RailPiece$invert,
				i,
				A2(
					$author$project$Forth$RailPiece$twoEnds,
					$author$project$Forth$Geometry$RailLocation$minus($author$project$Forth$LocationDefinition$zero),
					$author$project$Forth$Geometry$RailLocation$plus(
						$author$project$Forth$LocationDefinition$straight(2))));
	}
};
var $mgold$elm_nonempty_list$List$Nonempty$toList = function (_v0) {
	var x = _v0.a;
	var xs = _v0.b;
	return A2($elm$core$List$cons, x, xs);
};
var $elm$core$Basics$sqrt = _Basics_sqrt;
var $author$project$Forth$Geometry$Rot45$toFloat = function (_v0) {
	var a = _v0.a;
	var b = _v0.b;
	var c = _v0.c;
	var d = _v0.d;
	return _Utils_Tuple2(
		a + ($elm$core$Basics$sqrt(1.0 / 2.0) * (b - d)),
		c + ($elm$core$Basics$sqrt(1.0 / 2.0) * (b + d)));
};
var $author$project$Forth$Geometry$Location$toVec3 = function (tie) {
	var singleUnit = 27;
	var heightUnit = 16.5;
	var h = tie.height;
	var doubleUnit = 30;
	var _v0 = $author$project$Forth$Geometry$Rot45$toFloat(tie.single);
	var sx = _v0.a;
	var sy = _v0.b;
	var _v1 = $author$project$Forth$Geometry$Rot45$toFloat(tie._double);
	var dx = _v1.a;
	var dy = _v1.b;
	return A3($elm_explorations$linear_algebra$Math$Vector3$vec3, (singleUnit * sx) + (doubleUnit * dx), (singleUnit * sy) + (doubleUnit * dy), heightUnit * h);
};
var $author$project$Forth$Geometry$RailLocation$toVec3 = function (loc) {
	return $author$project$Forth$Geometry$Location$toVec3(loc.location);
};
var $author$project$Forth$RailPieceLogic$getRailTerminals = function (rail) {
	var railPiece = $author$project$Forth$RailPieceDefinition$getRailPiece(rail);
	return {
		minus: A2(
			$elm$core$List$map,
			$author$project$Forth$Geometry$RailLocation$toVec3,
			A2(
				$elm$core$List$filter,
				function (loc) {
					return _Utils_eq(loc.joint, $author$project$Forth$Geometry$Joint$Minus);
				},
				$mgold$elm_nonempty_list$List$Nonempty$toList(railPiece.railLocations))),
		plus: A2(
			$elm$core$List$map,
			$author$project$Forth$Geometry$RailLocation$toVec3,
			A2(
				$elm$core$List$filter,
				function (loc) {
					return _Utils_eq(loc.joint, $author$project$Forth$Geometry$Joint$Plus);
				},
				$mgold$elm_nonempty_list$List$Nonempty$toList(railPiece.railLocations)))
	};
};
var $author$project$Graphics$MeshLoader$renderRails = F4(
	function (model, rails, viewMatrix, projectionMatrix) {
		return A2(
			$elm$core$List$concatMap,
			function (railPosition) {
				return A7(
					$author$project$Graphics$Render$renderRail,
					viewMatrix,
					projectionMatrix,
					A2($author$project$Graphics$MeshLoader$getRailMesh, model, railPosition.rail),
					railPosition.position,
					railPosition.angle,
					$author$project$Graphics$MeshLoader$getRailColor(railPosition.rail),
					$author$project$Forth$RailPieceLogic$getRailTerminals(railPosition.rail).minus);
			},
			rails);
	});
var $elm$core$Basics$round = _Basics_round;
var $elm_explorations$webgl$WebGL$Internal$Stencil = function (a) {
	return {$: 'Stencil', a: a};
};
var $elm_explorations$webgl$WebGL$stencil = $elm_explorations$webgl$WebGL$Internal$Stencil;
var $elm_explorations$webgl$WebGL$toHtmlWith = F3(
	function (options, attributes, entities) {
		return A3(_WebGL_toHtml, options, attributes, entities);
	});
var $elm$html$Html$Attributes$width = function (n) {
	return A2(
		_VirtualDom_attribute,
		'width',
		$elm$core$String$fromInt(n));
};
var $author$project$Main$viewCanvas = function (_v0) {
	var right = _v0.right;
	var top = _v0.top;
	var width = _v0.width;
	var height = _v0.height;
	var meshes = _v0.meshes;
	var rails = _v0.rails;
	var piers = _v0.piers;
	var viewMatrix = _v0.viewMatrix;
	var projectionMatrix = _v0.projectionMatrix;
	return A3(
		$elm_explorations$webgl$WebGL$toHtmlWith,
		_List_fromArray(
			[
				$elm_explorations$webgl$WebGL$alpha(true),
				$elm_explorations$webgl$WebGL$antialias,
				$elm_explorations$webgl$WebGL$depth(1),
				$elm_explorations$webgl$WebGL$stencil(0),
				A4($elm_explorations$webgl$WebGL$clearColor, 1.0, 1.0, 1.0, 1.0)
			]),
		_List_fromArray(
			[
				$elm$html$Html$Attributes$width(
				$elm$core$Basics$round(2.0 * width)),
				$elm$html$Html$Attributes$height(
				$elm$core$Basics$round(2.0 * height)),
				A2($elm$html$Html$Attributes$style, 'display', 'block'),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
				A2(
				$elm$html$Html$Attributes$style,
				'right',
				$author$project$Main$px(right)),
				A2(
				$elm$html$Html$Attributes$style,
				'top',
				$author$project$Main$px(top)),
				A2(
				$elm$html$Html$Attributes$style,
				'width',
				$author$project$Main$px(width)),
				A2(
				$elm$html$Html$Attributes$style,
				'height',
				$author$project$Main$px(height)),
				A2($elm$html$Html$Attributes$style, 'touch-action', 'none'),
				A2($elm$html$Html$Attributes$style, 'user-select', 'none'),
				A2($elm$html$Html$Attributes$style, '-webkit-user-select', 'none'),
				$author$project$Main$onWheelHandler,
				$author$project$Main$onPointerDownHandler,
				$author$project$Main$onPointerMoveHandler,
				$author$project$Main$onPointerUpHandler,
				$author$project$Main$onContextMenuHandler
			]),
		$elm$core$List$concat(
			_List_fromArray(
				[
					A4($author$project$Graphics$MeshLoader$renderRails, meshes, rails, viewMatrix, projectionMatrix),
					A4($author$project$Graphics$MeshLoader$renderPiers, meshes, piers, viewMatrix, projectionMatrix)
				])));
};
var $author$project$Main$view = function (model) {
	var splitBarPosition = model.showEditor ? model.splitBarPosition : 0;
	var railViewTop = 0;
	var railViewRight = 0;
	var railViewHeight = model.viewport.height;
	var editorTop = 0;
	var editorLeft = 0;
	var editorHeight = model.viewport.height;
	var barTop = 0;
	var barThickness = 8;
	var barWidth = barThickness;
	var editorWidth = splitBarPosition - (barThickness / 2);
	var railViewWidth = (model.viewport.width - splitBarPosition) - (barThickness / 2);
	var barLeft = splitBarPosition - (barThickness / 2);
	var barHeight = model.viewport.height;
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				$author$project$Main$viewCanvas(
				{
					height: railViewHeight,
					meshes: model.meshes,
					piers: model.execResult.piers,
					projectionMatrix: $author$project$Graphics$OrbitControl$makeProjectionMatrix(model.orbitControl),
					rails: model.execResult.rails,
					right: railViewRight,
					top: railViewTop,
					viewMatrix: $author$project$Graphics$OrbitControl$makeViewMatrix(model.orbitControl),
					width: railViewWidth
				}),
				A2(
				$elm$html$Html$pre,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$Attributes$style,
						'display',
						((!_Utils_eq(model.execResult.errMsg, $elm$core$Maybe$Nothing)) || model.showRailCount) ? 'block' : 'none'),
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2(
						$elm$html$Html$Attributes$style,
						'top',
						$author$project$Main$px(railViewTop)),
						A2(
						$elm$html$Html$Attributes$style,
						'right',
						$author$project$Main$px(railViewRight)),
						A2(
						$elm$html$Html$Attributes$style,
						'width',
						$author$project$Main$px(railViewWidth)),
						A2(
						$elm$html$Html$Attributes$style,
						'height',
						$author$project$Main$px(railViewHeight)),
						A2($elm$html$Html$Attributes$style, 'font-size', '1rem'),
						A2($elm$html$Html$Attributes$style, 'pointer-events', 'none'),
						A2($elm$html$Html$Attributes$style, 'touch-action', 'none'),
						A2($elm$html$Html$Attributes$style, 'margin', '0'),
						A2($elm$html$Html$Attributes$style, 'padding', '1em'),
						A2($elm$html$Html$Attributes$style, 'box-sizing', 'border-box'),
						A2($elm$html$Html$Attributes$style, 'z-index', '100')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(
						(!_Utils_eq(model.execResult.errMsg, $elm$core$Maybe$Nothing)) ? A2($elm$core$Maybe$withDefault, '', model.execResult.errMsg) : (model.showRailCount ? $author$project$Main$formatRailCount(model.execResult.railCount) : ''))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$Attributes$style,
						'display',
						model.showEditor ? 'block' : 'none'),
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2(
						$elm$html$Html$Attributes$style,
						'top',
						$author$project$Main$px(barTop)),
						A2(
						$elm$html$Html$Attributes$style,
						'left',
						$author$project$Main$px(barLeft)),
						A2(
						$elm$html$Html$Attributes$style,
						'width',
						$author$project$Main$px(barWidth)),
						A2(
						$elm$html$Html$Attributes$style,
						'height',
						$author$project$Main$px(barHeight)),
						A2($elm$html$Html$Attributes$style, 'cursor', 'col-resize'),
						A2($elm$html$Html$Attributes$style, 'box-sizing', 'border-box'),
						A2($elm$html$Html$Attributes$style, 'background-color', 'lightgrey'),
						A2($elm$html$Html$Attributes$style, 'border-style', 'outset'),
						A2($elm$html$Html$Attributes$style, 'border-width', '1px'),
						A2($elm$html$Html$Attributes$style, 'touch-action', 'none'),
						A2($elm$html$Html$Attributes$style, 'user-select', 'none'),
						A2($elm$html$Html$Attributes$style, '-webkit-user-select', 'none'),
						$author$project$Main$onSplitBarDragBegin(model),
						$author$project$Main$onSplitBarDragMove(model),
						$author$project$Main$onSplitBarDragEnd(model)
					]),
				_List_Nil),
				A2(
				$elm$html$Html$textarea,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$Attributes$style,
						'display',
						model.showEditor ? 'block' : 'none'),
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'resize', 'none'),
						A2(
						$elm$html$Html$Attributes$style,
						'top',
						$author$project$Main$px(editorTop)),
						A2(
						$elm$html$Html$Attributes$style,
						'left',
						$author$project$Main$px(editorLeft)),
						A2(
						$elm$html$Html$Attributes$style,
						'width',
						$author$project$Main$px(editorWidth)),
						A2(
						$elm$html$Html$Attributes$style,
						'height',
						$author$project$Main$px(editorHeight)),
						A2($elm$html$Html$Attributes$style, 'margin', '0'),
						A2($elm$html$Html$Attributes$style, 'padding', '0.5em'),
						A2($elm$html$Html$Attributes$style, 'border', 'none'),
						A2($elm$html$Html$Attributes$style, 'outline', 'none'),
						A2($elm$html$Html$Attributes$style, 'font-family', 'monospace'),
						A2($elm$html$Html$Attributes$style, 'font-size', 'large'),
						A2($elm$html$Html$Attributes$style, 'box-sizing', 'border-box'),
						A2($elm$html$Html$Attributes$style, 'touch-action', 'pan-x pan-y'),
						$elm$html$Html$Attributes$spellcheck(false),
						$elm$html$Html$Attributes$autocomplete(false),
						$elm$html$Html$Events$onInput($author$project$Main$UpdateScript)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(model.program)
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2(
						$elm$html$Html$Attributes$style,
						'top',
						$author$project$Main$px(railViewTop)),
						A2(
						$elm$html$Html$Attributes$style,
						'right',
						$author$project$Main$px(railViewRight)),
						A2($elm$html$Html$Attributes$style, 'touch-action', 'none'),
						A2($elm$html$Html$Attributes$style, 'z-index', '1000')
					]),
				_List_fromArray(
					[
						A3($author$project$Main$makeButton, '📝', $author$project$Main$ToggleShowEditor, model.showEditor),
						A3($author$project$Main$makeButton, '👀', $author$project$Main$ResetView, true),
						A3($author$project$Main$makeButton, '🛒', $author$project$Main$ToggleShowRailCount, model.showRailCount)
					]))
			]));
};
var $author$project$Main$document = function (model) {
	return {
		body: _List_fromArray(
			[
				$author$project$Main$view(model)
			]),
		title: 'Railforth prototype'
	};
};
var $author$project$Main$LoadMesh = function (a) {
	return {$: 'LoadMesh', a: a};
};
var $author$project$Main$SetViewport = function (a) {
	return {$: 'SetViewport', a: a};
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Basics$pi = _Basics_pi;
var $elm$core$Basics$degrees = function (angleInDegrees) {
	return (angleInDegrees * $elm$core$Basics$pi) / 180;
};
var $author$project$Forth$Interpreter$ExecError = F2(
	function (message, status) {
		return {message: message, status: status};
	});
var $author$project$Forth$Interpreter$analyzeComment = F2(
	function (depth, toks) {
		analyzeComment:
		while (true) {
			if (depth <= 0) {
				return $elm$core$Result$Ok(
					_Utils_Tuple2($elm$core$Result$Ok, toks));
			} else {
				if (!toks.b) {
					return $elm$core$Result$Err('コメント文の終了が見つかりません');
				} else {
					switch (toks.a) {
						case '(':
							var ts = toks.b;
							var $temp$depth = depth + 1,
								$temp$toks = ts;
							depth = $temp$depth;
							toks = $temp$toks;
							continue analyzeComment;
						case ')':
							var ts = toks.b;
							var $temp$depth = depth - 1,
								$temp$toks = ts;
							depth = $temp$depth;
							toks = $temp$toks;
							continue analyzeComment;
						default:
							var ts = toks.b;
							var $temp$depth = depth,
								$temp$toks = ts;
							depth = $temp$depth;
							toks = $temp$toks;
							continue analyzeComment;
					}
				}
			}
		}
	});
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === 'RBNode_elm_builtin') {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === 'RBNode_elm_builtin') {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === 'RBNode_elm_builtin') {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $author$project$Forth$Interpreter$doLoad = F2(
	function (name, status) {
		var _v0 = status.savepoints;
		if (_v0.b) {
			var env = _v0.a;
			var envs = _v0.b;
			var _v1 = A2($elm$core$Dict$get, name, env);
			if (_v1.$ === 'Just') {
				var val = _v1.a;
				return $elm$core$Result$Ok(
					_Utils_update(
						status,
						{
							savepoints: A2(
								$elm$core$List$cons,
								A2($elm$core$Dict$remove, name, env),
								envs),
							stack: A2($elm$core$List$cons, val, status.stack)
						}));
			} else {
				return $elm$core$Result$Err(
					A2($author$project$Forth$Interpreter$ExecError, 'セーブポイント (' + (name + ') が見つかりません'), status));
			}
		} else {
			return $elm$core$Result$Err(
				A2($author$project$Forth$Interpreter$ExecError, '致命的なエラーがloadで発生しました', status));
		}
	});
var $author$project$Forth$Interpreter$analyzeLoad = function (toks) {
	if (toks.b) {
		var name = toks.a;
		var restToks = toks.b;
		return $elm$core$Result$Ok(
			_Utils_Tuple2(
				$author$project$Forth$Interpreter$doLoad(name),
				restToks));
	} else {
		return $elm$core$Result$Err('ロードする定数の名前を与えてください');
	}
};
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $author$project$Forth$Interpreter$doSave = F2(
	function (name, status) {
		var _v0 = status.savepoints;
		if (_v0.b) {
			var env = _v0.a;
			var envs = _v0.b;
			var _v1 = status.stack;
			if (_v1.b) {
				var top = _v1.a;
				var restOfStack = _v1.b;
				return $elm$core$Result$Ok(
					_Utils_update(
						status,
						{
							savepoints: A2(
								$elm$core$List$cons,
								A3($elm$core$Dict$insert, name, top, env),
								envs),
							stack: restOfStack
						}));
			} else {
				return $elm$core$Result$Err(
					A2($author$project$Forth$Interpreter$ExecError, 'save時のスタックが空です', status));
			}
		} else {
			return $elm$core$Result$Err(
				A2($author$project$Forth$Interpreter$ExecError, '致命的なエラーがsaveで発生しました', status));
		}
	});
var $author$project$Forth$Interpreter$analyzeSave = function (toks) {
	if (toks.b) {
		var name = toks.a;
		var restToks = toks.b;
		return $elm$core$Result$Ok(
			_Utils_Tuple2(
				$author$project$Forth$Interpreter$doSave(name),
				restToks));
	} else {
		return $elm$core$Result$Err('セーブする定数の名前を与えてください');
	}
};
var $author$project$Forth$Interpreter$Thread = function (a) {
	return {$: 'Thread', a: a};
};
var $author$project$Forth$Interpreter$buildWordDef = F3(
	function (name, thread, status) {
		var _v0 = status.frame;
		if (_v0.b) {
			var f = _v0.a;
			var fs = _v0.b;
			return $elm$core$Result$Ok(
				_Utils_update(
					status,
					{
						frame: A2(
							$elm$core$List$cons,
							A3(
								$elm$core$Dict$insert,
								name,
								$author$project$Forth$Interpreter$Thread(thread),
								f),
							fs)
					}));
		} else {
			return $elm$core$Result$Err(
				A2($author$project$Forth$Interpreter$ExecError, '致命的エラーがワードの定義時に発生しました', status));
		}
	});
var $author$project$Forth$Interpreter$executeDrop = function (status) {
	var _v0 = status.stack;
	if (!_v0.b) {
		return $elm$core$Result$Err(
			A2($author$project$Forth$Interpreter$ExecError, 'スタックが空です', status));
	} else {
		var restOfStack = _v0.b;
		return $elm$core$Result$Ok(
			_Utils_update(
				status,
				{stack: restOfStack}));
	}
};
var $author$project$Forth$Interpreter$executeInverseRot = function (status) {
	var _v0 = status.stack;
	if ((_v0.b && _v0.b.b) && _v0.b.b.b) {
		var x = _v0.a;
		var _v1 = _v0.b;
		var y = _v1.a;
		var _v2 = _v1.b;
		var z = _v2.a;
		var restOfStack = _v2.b;
		return $elm$core$Result$Ok(
			_Utils_update(
				status,
				{
					stack: A2(
						$elm$core$List$cons,
						y,
						A2(
							$elm$core$List$cons,
							z,
							A2($elm$core$List$cons, x, restOfStack)))
				}));
	} else {
		return $elm$core$Result$Err(
			A2($author$project$Forth$Interpreter$ExecError, 'スタックに最低3つの要素がある必要があります', status));
	}
};
var $author$project$Forth$Interpreter$executeNip = function (status) {
	var _v0 = status.stack;
	if (_v0.b && _v0.b.b) {
		var x = _v0.a;
		var _v1 = _v0.b;
		var restOfStack = _v1.b;
		return $elm$core$Result$Ok(
			_Utils_update(
				status,
				{
					stack: A2($elm$core$List$cons, x, restOfStack)
				}));
	} else {
		return $elm$core$Result$Err(
			A2($author$project$Forth$Interpreter$ExecError, 'スタックに最低2つの要素がある必要があります', status));
	}
};
var $author$project$Forth$Interpreter$executeRot = function (status) {
	var _v0 = status.stack;
	if ((_v0.b && _v0.b.b) && _v0.b.b.b) {
		var x = _v0.a;
		var _v1 = _v0.b;
		var y = _v1.a;
		var _v2 = _v1.b;
		var z = _v2.a;
		var restOfStack = _v2.b;
		return $elm$core$Result$Ok(
			_Utils_update(
				status,
				{
					stack: A2(
						$elm$core$List$cons,
						z,
						A2(
							$elm$core$List$cons,
							x,
							A2($elm$core$List$cons, y, restOfStack)))
				}));
	} else {
		return $elm$core$Result$Err(
			A2($author$project$Forth$Interpreter$ExecError, 'スタックに最低3つの要素がある必要があります', status));
	}
};
var $author$project$Forth$Interpreter$executeSwap = function (status) {
	var _v0 = status.stack;
	if (_v0.b && _v0.b.b) {
		var x = _v0.a;
		var _v1 = _v0.b;
		var y = _v1.a;
		var restOfStack = _v1.b;
		return $elm$core$Result$Ok(
			_Utils_update(
				status,
				{
					stack: A2(
						$elm$core$List$cons,
						y,
						A2($elm$core$List$cons, x, restOfStack))
				}));
	} else {
		return $elm$core$Result$Err(
			A2($author$project$Forth$Interpreter$ExecError, 'スタックに最低2つの要素がある必要があります', status));
	}
};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $author$project$Forth$Interpreter$coreGlossary = $elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2('', $elm$core$Result$Ok),
			_Utils_Tuple2('.', $author$project$Forth$Interpreter$executeDrop),
			_Utils_Tuple2('drop', $author$project$Forth$Interpreter$executeDrop),
			_Utils_Tuple2('swap', $author$project$Forth$Interpreter$executeSwap),
			_Utils_Tuple2('rot', $author$project$Forth$Interpreter$executeRot),
			_Utils_Tuple2('-rot', $author$project$Forth$Interpreter$executeInverseRot),
			_Utils_Tuple2('nip', $author$project$Forth$Interpreter$executeNip)
		]));
var $author$project$Forth$Interpreter$executeInNestedFrame = F2(
	function (exec, status) {
		var extendedStatus = _Utils_update(
			status,
			{
				frame: A2($elm$core$List$cons, $elm$core$Dict$empty, status.frame),
				savepoints: A2($elm$core$List$cons, $elm$core$Dict$empty, status.savepoints)
			});
		var _v0 = exec(extendedStatus);
		if (_v0.$ === 'Ok') {
			var status2 = _v0.a;
			var _v1 = _Utils_Tuple2(status2.frame, status2.savepoints);
			if (_v1.a.b && _v1.b.b) {
				var _v2 = _v1.a;
				var oldFrame = _v2.b;
				var _v3 = _v1.b;
				var oldSavepoints = _v3.b;
				return $elm$core$Result$Ok(
					_Utils_update(
						status2,
						{frame: oldFrame, savepoints: oldSavepoints}));
			} else {
				return $elm$core$Result$Err(
					A2($author$project$Forth$Interpreter$ExecError, 'フレームがなんか変です', status2));
			}
		} else {
			var err = _v0.a;
			return $elm$core$Result$Err(err);
		}
	});
var $author$project$Util$foldlResult = F3(
	function (f, b, list) {
		foldlResult:
		while (true) {
			if (!list.b) {
				return $elm$core$Result$Ok(b);
			} else {
				var x = list.a;
				var xs = list.b;
				var _v1 = A2(f, x, b);
				if (_v1.$ === 'Ok') {
					var b2 = _v1.a;
					var $temp$f = f,
						$temp$b = b2,
						$temp$list = xs;
					f = $temp$f;
					b = $temp$b;
					list = $temp$list;
					continue foldlResult;
				} else {
					var err = _v1.a;
					return $elm$core$Result$Err(err);
				}
			}
		}
	});
var $author$project$Forth$Interpreter$executeMulti = F2(
	function (execs, status) {
		return A3($author$project$Util$foldlResult, $elm$core$Basics$apL, status, execs);
	});
var $author$project$Forth$Interpreter$getFromDicts = F2(
	function (k, dicts) {
		getFromDicts:
		while (true) {
			if (!dicts.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var d = dicts.a;
				var ds = dicts.b;
				var _v1 = A2($elm$core$Dict$get, k, d);
				if (_v1.$ === 'Just') {
					var v = _v1.a;
					return $elm$core$Maybe$Just(v);
				} else {
					var $temp$k = k,
						$temp$dicts = ds;
					k = $temp$k;
					dicts = $temp$dicts;
					continue getFromDicts;
				}
			}
		}
	});
var $author$project$Forth$Interpreter$executeWordInFrame = F2(
	function (word, status) {
		var _v0 = A2($author$project$Forth$Interpreter$getFromDicts, word, status.frame);
		if (_v0.$ === 'Just') {
			var code = _v0.a.a;
			return A2(
				$author$project$Forth$Interpreter$executeInNestedFrame,
				$author$project$Forth$Interpreter$executeMulti(code),
				status);
		} else {
			return $elm$core$Result$Err(
				A2($author$project$Forth$Interpreter$ExecError, '未定義のワードです: ' + word, status));
		}
	});
var $author$project$Types$Rail$AutoCross = {$: 'AutoCross'};
var $author$project$Types$Rail$AutoPoint = {$: 'AutoPoint'};
var $author$project$Types$Rail$AutoTurnout = {$: 'AutoTurnout'};
var $author$project$Types$Rail$Backward = function (a) {
	return {$: 'Backward', a: a};
};
var $author$project$Types$Rail$Curve45 = F2(
	function (a, b) {
		return {$: 'Curve45', a: a, b: b};
	});
var $author$project$Types$Rail$Curve90 = F2(
	function (a, b) {
		return {$: 'Curve90', a: a, b: b};
	});
var $author$project$Types$Rail$DoubleCurve45 = F2(
	function (a, b) {
		return {$: 'DoubleCurve45', a: a, b: b};
	});
var $author$project$Types$Rail$DoubleStraight4 = function (a) {
	return {$: 'DoubleStraight4', a: a};
};
var $author$project$Types$Rail$DoubleWide = F2(
	function (a, b) {
		return {$: 'DoubleWide', a: a, b: b};
	});
var $author$project$Types$Rail$EightPoint = F2(
	function (a, b) {
		return {$: 'EightPoint', a: a, b: b};
	});
var $author$project$Types$Rail$Flipped = {$: 'Flipped'};
var $author$project$Types$Rail$Forward = function (a) {
	return {$: 'Forward', a: a};
};
var $author$project$Types$Rail$JointChange = function (a) {
	return {$: 'JointChange', a: a};
};
var $author$project$Types$Rail$NotFlipped = {$: 'NotFlipped'};
var $author$project$Types$Rail$Oneway = function (a) {
	return {$: 'Oneway', a: a};
};
var $author$project$Types$Rail$OuterCurve45 = F2(
	function (a, b) {
		return {$: 'OuterCurve45', a: a, b: b};
	});
var $author$project$Types$Rail$Shift = F2(
	function (a, b) {
		return {$: 'Shift', a: a, b: b};
	});
var $author$project$Types$Rail$SingleDouble = F2(
	function (a, b) {
		return {$: 'SingleDouble', a: a, b: b};
	});
var $author$project$Types$Rail$Slope = F2(
	function (a, b) {
		return {$: 'Slope', a: a, b: b};
	});
var $author$project$Types$Rail$SlopeCurveA = {$: 'SlopeCurveA'};
var $author$project$Types$Rail$SlopeCurveB = {$: 'SlopeCurveB'};
var $author$project$Types$Rail$Stop = function (a) {
	return {$: 'Stop', a: a};
};
var $author$project$Types$Rail$Straight1 = function (a) {
	return {$: 'Straight1', a: a};
};
var $author$project$Types$Rail$Straight2 = function (a) {
	return {$: 'Straight2', a: a};
};
var $author$project$Types$Rail$Straight4 = function (a) {
	return {$: 'Straight4', a: a};
};
var $author$project$Types$Rail$Straight8 = function (a) {
	return {$: 'Straight8', a: a};
};
var $author$project$Types$Rail$Turnout = F2(
	function (a, b) {
		return {$: 'Turnout', a: a, b: b};
	});
var $author$project$Types$Rail$UTurn = {$: 'UTurn'};
var $author$project$Types$Rail$WideCross = {$: 'WideCross'};
var $author$project$Forth$Geometry$Location$addHeight = F2(
	function (diffHeight, location) {
		return _Utils_update(
			location,
			{height: location.height + diffHeight});
	});
var $author$project$Forth$Geometry$RailLocation$addHeight = F2(
	function (diffHeight, railLocation) {
		return _Utils_update(
			railLocation,
			{
				location: A2($author$project$Forth$Geometry$Location$addHeight, diffHeight, railLocation.location)
			});
	});
var $author$project$Forth$Interpreter$executeAscend = F2(
	function (amount, status) {
		var _v0 = status.stack;
		if (!_v0.b) {
			return $elm$core$Result$Err(
				A2($author$project$Forth$Interpreter$ExecError, 'スタックが空です', status));
		} else {
			var top = _v0.a;
			var restOfStack = _v0.b;
			return $elm$core$Result$Ok(
				_Utils_update(
					status,
					{
						stack: A2(
							$elm$core$List$cons,
							A2($author$project$Forth$Geometry$RailLocation$addHeight, amount, top),
							restOfStack)
					}));
		}
	});
var $author$project$Forth$Interpreter$executeInvert = function (status) {
	var _v0 = status.stack;
	if (!_v0.b) {
		return $elm$core$Result$Err(
			A2($author$project$Forth$Interpreter$ExecError, 'スタックが空です', status));
	} else {
		var top = _v0.a;
		var restOfStack = _v0.b;
		return $elm$core$Result$Ok(
			_Utils_update(
				status,
				{
					stack: A2(
						$elm$core$List$cons,
						$author$project$Forth$Geometry$RailLocation$invertJoint(top),
						restOfStack)
				}));
	}
};
var $author$project$Types$Rail$NotInverted = {$: 'NotInverted'};
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $mgold$elm_nonempty_list$List$Nonempty$head = function (_v0) {
	var x = _v0.a;
	var xs = _v0.b;
	return x;
};
var $author$project$Util$loop = F3(
	function (n, f, a) {
		loop:
		while (true) {
			if (n <= 0) {
				return a;
			} else {
				var $temp$n = n - 1,
					$temp$f = f,
					$temp$a = f(a);
				n = $temp$n;
				f = $temp$f;
				a = $temp$a;
				continue loop;
			}
		}
	});
var $author$project$Types$Rail$map = F2(
	function (f, rail) {
		switch (rail.$) {
			case 'Straight1':
				var a = rail.a;
				return $author$project$Types$Rail$Straight1(
					f(a));
			case 'Straight2':
				var a = rail.a;
				return $author$project$Types$Rail$Straight2(
					f(a));
			case 'Straight4':
				var a = rail.a;
				return $author$project$Types$Rail$Straight4(
					f(a));
			case 'Straight8':
				var a = rail.a;
				return $author$project$Types$Rail$Straight8(
					f(a));
			case 'DoubleStraight4':
				var a = rail.a;
				return $author$project$Types$Rail$DoubleStraight4(
					f(a));
			case 'Curve45':
				var a = rail.a;
				var b = rail.b;
				return A2(
					$author$project$Types$Rail$Curve45,
					a,
					f(b));
			case 'Curve90':
				var a = rail.a;
				var b = rail.b;
				return A2(
					$author$project$Types$Rail$Curve90,
					a,
					f(b));
			case 'OuterCurve45':
				var a = rail.a;
				var b = rail.b;
				return A2(
					$author$project$Types$Rail$OuterCurve45,
					a,
					f(b));
			case 'DoubleCurve45':
				var a = rail.a;
				var b = rail.b;
				return A2(
					$author$project$Types$Rail$DoubleCurve45,
					a,
					f(b));
			case 'SingleDouble':
				var a = rail.a;
				var b = rail.b;
				return A2(
					$author$project$Types$Rail$SingleDouble,
					a,
					f(b));
			case 'DoubleWide':
				var a = rail.a;
				var b = rail.b;
				return A2(
					$author$project$Types$Rail$DoubleWide,
					a,
					f(b));
			case 'EightPoint':
				var a = rail.a;
				var b = rail.b;
				return A2(
					$author$project$Types$Rail$EightPoint,
					a,
					f(b));
			case 'Turnout':
				var a = rail.a;
				var b = rail.b;
				return A2(
					$author$project$Types$Rail$Turnout,
					a,
					f(b));
			case 'JointChange':
				var a = rail.a;
				return $author$project$Types$Rail$JointChange(
					f(a));
			case 'Slope':
				var a = rail.a;
				var b = rail.b;
				return A2(
					$author$project$Types$Rail$Slope,
					a,
					f(b));
			case 'Shift':
				var a = rail.a;
				var b = rail.b;
				return A2(
					$author$project$Types$Rail$Shift,
					a,
					f(b));
			case 'SlopeCurveA':
				return $author$project$Types$Rail$SlopeCurveA;
			case 'SlopeCurveB':
				return $author$project$Types$Rail$SlopeCurveB;
			case 'Stop':
				var a = rail.a;
				return $author$project$Types$Rail$Stop(
					f(a));
			case 'AutoTurnout':
				return $author$project$Types$Rail$AutoTurnout;
			case 'AutoPoint':
				return $author$project$Types$Rail$AutoPoint;
			case 'AutoCross':
				return $author$project$Types$Rail$AutoCross;
			case 'UTurn':
				return $author$project$Types$Rail$UTurn;
			case 'Oneway':
				var a = rail.a;
				return $author$project$Types$Rail$Oneway(a);
			case 'WideCross':
				return $author$project$Types$Rail$WideCross;
			case 'Forward':
				var a = rail.a;
				return $author$project$Types$Rail$Forward(
					f(a));
			default:
				var a = rail.a;
				return $author$project$Types$Rail$Backward(
					f(a));
		}
	});
var $author$project$Forth$Geometry$Joint$match = F2(
	function (x, y) {
		return !_Utils_eq(x, y);
	});
var $author$project$Forth$Geometry$Rot45$mul = F2(
	function (_v0, _v1) {
		var xa = _v0.a;
		var xb = _v0.b;
		var xc = _v0.c;
		var xd = _v0.d;
		var ya = _v1.a;
		var yb = _v1.b;
		var yc = _v1.c;
		var yd = _v1.d;
		return A4($author$project$Forth$Geometry$Rot45$make, (((xa * ya) - (xb * yd)) - (xc * yc)) - (xd * yb), (((xa * yb) + (xb * ya)) - (xc * yd)) - (xd * yc), (((xa * yc) + (xb * yb)) + (xc * ya)) - (xd * yd), (((xa * yd) + (xb * yc)) + (xc * yb)) + (xd * ya));
	});
var $author$project$Forth$Geometry$Rot45$negate = function (_v0) {
	var a = _v0.a;
	var b = _v0.b;
	var c = _v0.c;
	var d = _v0.d;
	return A4($author$project$Forth$Geometry$Rot45$make, -a, -b, -c, -d);
};
var $author$project$Forth$Geometry$Dir$toRot45 = function (_v0) {
	var d = _v0.a;
	var aux = F3(
		function (a, b, x) {
			return _Utils_eq(x, a) ? 1 : (_Utils_eq(x, b) ? (-1) : 0);
		});
	return A4(
		$author$project$Forth$Geometry$Rot45$make,
		A3(aux, 0, 4, d),
		A3(aux, 1, 5, d),
		A3(aux, 2, 6, d),
		A3(aux, 3, 7, d));
};
var $author$project$Forth$Geometry$Location$inv = function (x) {
	var invDir = $author$project$Forth$Geometry$Dir$inv(x.dir);
	var invDirRot = $author$project$Forth$Geometry$Dir$toRot45(invDir);
	var single = A2(
		$author$project$Forth$Geometry$Rot45$mul,
		invDirRot,
		$author$project$Forth$Geometry$Rot45$negate(x.single));
	var _double = A2(
		$author$project$Forth$Geometry$Rot45$mul,
		invDirRot,
		$author$project$Forth$Geometry$Rot45$negate(x._double));
	return {dir: invDir, _double: _double, height: -x.height, single: single};
};
var $author$project$Forth$Geometry$RailLocation$inv = function (loc) {
	return {
		joint: loc.joint,
		location: $author$project$Forth$Geometry$Location$inv(loc.location)
	};
};
var $author$project$Forth$Geometry$Rot45$add = F2(
	function (_v0, _v1) {
		var xa = _v0.a;
		var xb = _v0.b;
		var xc = _v0.c;
		var xd = _v0.d;
		var ya = _v1.a;
		var yb = _v1.b;
		var yc = _v1.c;
		var yd = _v1.d;
		return A4($author$project$Forth$Geometry$Rot45$make, xa + ya, xb + yb, xc + yc, xd + yd);
	});
var $elm$core$Basics$ge = _Utils_ge;
var $author$project$Forth$Geometry$Dir$mul = F2(
	function (_v0, _v1) {
		var d1 = _v0.a;
		var d2 = _v1.a;
		return ((d1 + d2) >= 8) ? $author$project$Forth$Geometry$Dir$Dir((d1 + d2) - 8) : $author$project$Forth$Geometry$Dir$Dir(d1 + d2);
	});
var $author$project$Forth$Geometry$Location$mul = F2(
	function (global, local) {
		var single = A2(
			$author$project$Forth$Geometry$Rot45$add,
			global.single,
			A2(
				$author$project$Forth$Geometry$Rot45$mul,
				$author$project$Forth$Geometry$Dir$toRot45(global.dir),
				local.single));
		var _double = A2(
			$author$project$Forth$Geometry$Rot45$add,
			global._double,
			A2(
				$author$project$Forth$Geometry$Rot45$mul,
				$author$project$Forth$Geometry$Dir$toRot45(global.dir),
				local._double));
		var dir = A2($author$project$Forth$Geometry$Dir$mul, local.dir, global.dir);
		return {dir: dir, _double: _double, height: global.height + local.height, single: single};
	});
var $author$project$Forth$Geometry$RailLocation$mul = F2(
	function (global, local) {
		return {
			joint: local.joint,
			location: A2($author$project$Forth$Geometry$Location$mul, global, local.location)
		};
	});
var $author$project$Util$rotate = function (_v0) {
	var x = _v0.a;
	var xs = _v0.b;
	if (!xs.b) {
		return A2($mgold$elm_nonempty_list$List$Nonempty$Nonempty, x, xs);
	} else {
		var y = xs.a;
		var ys = xs.b;
		return A2(
			$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
			y,
			_Utils_ap(
				ys,
				_List_fromArray(
					[x])));
	}
};
var $author$project$Forth$RailPiece$rotate = function (piece) {
	var _v0 = piece.railLocations;
	if (!_v0.b.b) {
		return piece;
	} else {
		var current = _v0.a;
		var _v1 = _v0.b;
		var next = _v1.a;
		var rot = A2(
			$author$project$Forth$Geometry$RailLocation$mul,
			current.location,
			$author$project$Forth$Geometry$RailLocation$inv(next));
		return {
			origin: A2($author$project$Forth$Geometry$RailLocation$mul, rot.location, piece.origin),
			railLocations: $author$project$Util$rotate(
				A2(
					$mgold$elm_nonempty_list$List$Nonempty$map,
					$author$project$Forth$Geometry$RailLocation$mul(rot.location),
					piece.railLocations))
		};
	}
};
var $author$project$Forth$RailPieceLogic$getAppropriateRailAndPieceForJoint = F3(
	function (joint, railType, rotation) {
		var railNotInverted = A2(
			$author$project$Types$Rail$map,
			$elm$core$Basics$always($author$project$Types$Rail$NotInverted),
			railType);
		var railPieceMinus = A3(
			$author$project$Util$loop,
			rotation,
			$author$project$Forth$RailPiece$rotate,
			$author$project$Forth$RailPieceDefinition$getRailPiece(railNotInverted));
		var railInverted = A2(
			$author$project$Types$Rail$map,
			$elm$core$Basics$always($author$project$Types$Rail$Inverted),
			railType);
		var railPiecePlus = A3(
			$author$project$Util$loop,
			rotation,
			$author$project$Forth$RailPiece$rotate,
			$author$project$Forth$RailPieceDefinition$getRailPiece(railInverted));
		return A2(
			$author$project$Forth$Geometry$Joint$match,
			joint,
			$mgold$elm_nonempty_list$List$Nonempty$head(railPieceMinus.railLocations).joint) ? $elm$core$Maybe$Just(
			_Utils_Tuple2(railNotInverted, railPieceMinus)) : (A2(
			$author$project$Forth$Geometry$Joint$match,
			joint,
			$mgold$elm_nonempty_list$List$Nonempty$head(railPiecePlus.railLocations).joint) ? $elm$core$Maybe$Just(
			_Utils_Tuple2(railInverted, railPiecePlus)) : $elm$core$Maybe$Nothing);
	});
var $author$project$Forth$RailPlacement$make = F2(
	function (rail, location) {
		return {location: location, rail: rail};
	});
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $mgold$elm_nonempty_list$List$Nonempty$tail = function (_v0) {
	var x = _v0.a;
	var xs = _v0.b;
	return xs;
};
var $author$project$Forth$RailPieceLogic$placeRail = F2(
	function (railType, rotation) {
		var plusCase = A3($author$project$Forth$RailPieceLogic$getAppropriateRailAndPieceForJoint, $author$project$Forth$Geometry$Joint$Plus, railType, rotation);
		var minusCase = A3($author$project$Forth$RailPieceLogic$getAppropriateRailAndPieceForJoint, $author$project$Forth$Geometry$Joint$Minus, railType, rotation);
		return function (railLocation) {
			return A2(
				$elm$core$Maybe$map,
				function (_v0) {
					var rail = _v0.a;
					var railPiece = _v0.b;
					return {
						nextLocations: A2(
							$elm$core$List$map,
							$author$project$Forth$Geometry$RailLocation$mul(railLocation.location),
							$mgold$elm_nonempty_list$List$Nonempty$tail(railPiece.railLocations)),
						railPlacement: A2(
							$author$project$Forth$RailPlacement$make,
							rail,
							A2($author$project$Forth$Geometry$RailLocation$mul, railLocation.location, railPiece.origin).location)
					};
				},
				_Utils_eq(railLocation.joint, $author$project$Forth$Geometry$Joint$Plus) ? plusCase : minusCase);
		};
	});
var $author$project$Forth$Interpreter$executePlaceRail = F2(
	function (railType, rotation) {
		var railPlaceFunc = A2($author$project$Forth$RailPieceLogic$placeRail, railType, rotation);
		return function (status) {
			var _v0 = status.stack;
			if (!_v0.b) {
				return $elm$core$Result$Err(
					A2($author$project$Forth$Interpreter$ExecError, 'スタックが空です', status));
			} else {
				var top = _v0.a;
				var restOfStack = _v0.b;
				var _v1 = railPlaceFunc(top);
				if (_v1.$ === 'Just') {
					var nextLocations = _v1.a.nextLocations;
					var railPlacement = _v1.a.railPlacement;
					return $elm$core$Result$Ok(
						_Utils_update(
							status,
							{
								global: {
									rails: A2($elm$core$List$cons, railPlacement, status.global.rails)
								},
								stack: _Utils_ap(nextLocations, restOfStack)
							}));
				} else {
					return $elm$core$Result$Err(
						A2($author$project$Forth$Interpreter$ExecError, '配置するレールの凹凸が合いません', status));
				}
			}
		};
	});
var $author$project$Forth$Interpreter$railForthGlossary = $elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2(
			'q',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				$author$project$Types$Rail$Straight1(_Utils_Tuple0),
				0)),
			_Utils_Tuple2(
			'h',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				$author$project$Types$Rail$Straight2(_Utils_Tuple0),
				0)),
			_Utils_Tuple2(
			's',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				$author$project$Types$Rail$Straight4(_Utils_Tuple0),
				0)),
			_Utils_Tuple2(
			'ss',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				$author$project$Types$Rail$Straight8(_Utils_Tuple0),
				0)),
			_Utils_Tuple2(
			'dts',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				$author$project$Types$Rail$DoubleStraight4(_Utils_Tuple0),
				0)),
			_Utils_Tuple2(
			'dts1',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				$author$project$Types$Rail$DoubleStraight4(_Utils_Tuple0),
				1)),
			_Utils_Tuple2(
			'l',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$Curve45, $author$project$Types$Rail$NotFlipped, _Utils_Tuple0),
				0)),
			_Utils_Tuple2(
			'll',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$Curve90, $author$project$Types$Rail$NotFlipped, _Utils_Tuple0),
				0)),
			_Utils_Tuple2(
			'r',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$Curve45, $author$project$Types$Rail$Flipped, _Utils_Tuple0),
				0)),
			_Utils_Tuple2(
			'rr',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$Curve90, $author$project$Types$Rail$Flipped, _Utils_Tuple0),
				0)),
			_Utils_Tuple2(
			'ol',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$OuterCurve45, $author$project$Types$Rail$NotFlipped, _Utils_Tuple0),
				0)),
			_Utils_Tuple2(
			'or',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$OuterCurve45, $author$project$Types$Rail$Flipped, _Utils_Tuple0),
				0)),
			_Utils_Tuple2(
			'dtl',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$DoubleCurve45, $author$project$Types$Rail$NotFlipped, _Utils_Tuple0),
				0)),
			_Utils_Tuple2(
			'dtl1',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$DoubleCurve45, $author$project$Types$Rail$NotFlipped, _Utils_Tuple0),
				1)),
			_Utils_Tuple2(
			'dtr',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$DoubleCurve45, $author$project$Types$Rail$Flipped, _Utils_Tuple0),
				0)),
			_Utils_Tuple2(
			'dtr3',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$DoubleCurve45, $author$project$Types$Rail$Flipped, _Utils_Tuple0),
				3)),
			_Utils_Tuple2(
			'tl',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$Turnout, $author$project$Types$Rail$NotFlipped, _Utils_Tuple0),
				0)),
			_Utils_Tuple2(
			'tl1',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$Turnout, $author$project$Types$Rail$NotFlipped, _Utils_Tuple0),
				1)),
			_Utils_Tuple2(
			'tl2',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$Turnout, $author$project$Types$Rail$NotFlipped, _Utils_Tuple0),
				2)),
			_Utils_Tuple2(
			'tr',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$Turnout, $author$project$Types$Rail$Flipped, _Utils_Tuple0),
				0)),
			_Utils_Tuple2(
			'tr1',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$Turnout, $author$project$Types$Rail$Flipped, _Utils_Tuple0),
				1)),
			_Utils_Tuple2(
			'tr2',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$Turnout, $author$project$Types$Rail$Flipped, _Utils_Tuple0),
				2)),
			_Utils_Tuple2(
			'dl',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$SingleDouble, $author$project$Types$Rail$NotFlipped, _Utils_Tuple0),
				0)),
			_Utils_Tuple2(
			'dl1',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$SingleDouble, $author$project$Types$Rail$NotFlipped, _Utils_Tuple0),
				1)),
			_Utils_Tuple2(
			'dl2',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$SingleDouble, $author$project$Types$Rail$NotFlipped, _Utils_Tuple0),
				2)),
			_Utils_Tuple2(
			'dr',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$SingleDouble, $author$project$Types$Rail$Flipped, _Utils_Tuple0),
				0)),
			_Utils_Tuple2(
			'dr1',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$SingleDouble, $author$project$Types$Rail$Flipped, _Utils_Tuple0),
				1)),
			_Utils_Tuple2(
			'dr2',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$SingleDouble, $author$project$Types$Rail$Flipped, _Utils_Tuple0),
				2)),
			_Utils_Tuple2(
			'dwl',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$DoubleWide, $author$project$Types$Rail$NotFlipped, _Utils_Tuple0),
				0)),
			_Utils_Tuple2(
			'dwl1',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$DoubleWide, $author$project$Types$Rail$NotFlipped, _Utils_Tuple0),
				1)),
			_Utils_Tuple2(
			'dwl2',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$DoubleWide, $author$project$Types$Rail$NotFlipped, _Utils_Tuple0),
				2)),
			_Utils_Tuple2(
			'dwl3',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$DoubleWide, $author$project$Types$Rail$NotFlipped, _Utils_Tuple0),
				3)),
			_Utils_Tuple2(
			'dwr',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$DoubleWide, $author$project$Types$Rail$Flipped, _Utils_Tuple0),
				0)),
			_Utils_Tuple2(
			'dwr1',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$DoubleWide, $author$project$Types$Rail$Flipped, _Utils_Tuple0),
				1)),
			_Utils_Tuple2(
			'dwr2',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$DoubleWide, $author$project$Types$Rail$Flipped, _Utils_Tuple0),
				2)),
			_Utils_Tuple2(
			'dwr3',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$DoubleWide, $author$project$Types$Rail$Flipped, _Utils_Tuple0),
				3)),
			_Utils_Tuple2(
			'el',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$EightPoint, $author$project$Types$Rail$NotFlipped, _Utils_Tuple0),
				0)),
			_Utils_Tuple2(
			'el1',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$EightPoint, $author$project$Types$Rail$NotFlipped, _Utils_Tuple0),
				1)),
			_Utils_Tuple2(
			'el2',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$EightPoint, $author$project$Types$Rail$NotFlipped, _Utils_Tuple0),
				2)),
			_Utils_Tuple2(
			'er',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$EightPoint, $author$project$Types$Rail$Flipped, _Utils_Tuple0),
				0)),
			_Utils_Tuple2(
			'er1',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$EightPoint, $author$project$Types$Rail$Flipped, _Utils_Tuple0),
				1)),
			_Utils_Tuple2(
			'er2',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$EightPoint, $author$project$Types$Rail$Flipped, _Utils_Tuple0),
				2)),
			_Utils_Tuple2(
			'j',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				$author$project$Types$Rail$JointChange(_Utils_Tuple0),
				0)),
			_Utils_Tuple2(
			'up',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$Slope, $author$project$Types$Rail$NotFlipped, _Utils_Tuple0),
				0)),
			_Utils_Tuple2(
			'dn',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$Slope, $author$project$Types$Rail$Flipped, _Utils_Tuple0),
				0)),
			_Utils_Tuple2(
			'sa',
			A2($author$project$Forth$Interpreter$executePlaceRail, $author$project$Types$Rail$SlopeCurveA, 0)),
			_Utils_Tuple2(
			'sa1',
			A2($author$project$Forth$Interpreter$executePlaceRail, $author$project$Types$Rail$SlopeCurveA, 1)),
			_Utils_Tuple2(
			'sb',
			A2($author$project$Forth$Interpreter$executePlaceRail, $author$project$Types$Rail$SlopeCurveB, 0)),
			_Utils_Tuple2(
			'sb1',
			A2($author$project$Forth$Interpreter$executePlaceRail, $author$project$Types$Rail$SlopeCurveB, 1)),
			_Utils_Tuple2(
			'shl',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$Shift, $author$project$Types$Rail$NotFlipped, _Utils_Tuple0),
				0)),
			_Utils_Tuple2(
			'shr',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Types$Rail$Shift, $author$project$Types$Rail$Flipped, _Utils_Tuple0),
				0)),
			_Utils_Tuple2(
			'stop',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				$author$project$Types$Rail$Stop(_Utils_Tuple0),
				0)),
			_Utils_Tuple2(
			'at',
			A2($author$project$Forth$Interpreter$executePlaceRail, $author$project$Types$Rail$AutoTurnout, 0)),
			_Utils_Tuple2(
			'at1',
			A2($author$project$Forth$Interpreter$executePlaceRail, $author$project$Types$Rail$AutoTurnout, 1)),
			_Utils_Tuple2(
			'at2',
			A2($author$project$Forth$Interpreter$executePlaceRail, $author$project$Types$Rail$AutoTurnout, 2)),
			_Utils_Tuple2(
			'ap',
			A2($author$project$Forth$Interpreter$executePlaceRail, $author$project$Types$Rail$AutoPoint, 0)),
			_Utils_Tuple2(
			'ap1',
			A2($author$project$Forth$Interpreter$executePlaceRail, $author$project$Types$Rail$AutoPoint, 1)),
			_Utils_Tuple2(
			'ap2',
			A2($author$project$Forth$Interpreter$executePlaceRail, $author$project$Types$Rail$AutoPoint, 2)),
			_Utils_Tuple2(
			'ap3',
			A2($author$project$Forth$Interpreter$executePlaceRail, $author$project$Types$Rail$AutoPoint, 3)),
			_Utils_Tuple2(
			'ac',
			A2($author$project$Forth$Interpreter$executePlaceRail, $author$project$Types$Rail$AutoCross, 0)),
			_Utils_Tuple2(
			'ac1',
			A2($author$project$Forth$Interpreter$executePlaceRail, $author$project$Types$Rail$AutoCross, 1)),
			_Utils_Tuple2(
			'ac2',
			A2($author$project$Forth$Interpreter$executePlaceRail, $author$project$Types$Rail$AutoCross, 2)),
			_Utils_Tuple2(
			'ac3',
			A2($author$project$Forth$Interpreter$executePlaceRail, $author$project$Types$Rail$AutoCross, 3)),
			_Utils_Tuple2(
			'uturn',
			A2($author$project$Forth$Interpreter$executePlaceRail, $author$project$Types$Rail$UTurn, 0)),
			_Utils_Tuple2(
			'uturn1',
			A2($author$project$Forth$Interpreter$executePlaceRail, $author$project$Types$Rail$UTurn, 1)),
			_Utils_Tuple2(
			'owl',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				$author$project$Types$Rail$Oneway($author$project$Types$Rail$NotFlipped),
				0)),
			_Utils_Tuple2(
			'owl1',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				$author$project$Types$Rail$Oneway($author$project$Types$Rail$NotFlipped),
				1)),
			_Utils_Tuple2(
			'owl2',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				$author$project$Types$Rail$Oneway($author$project$Types$Rail$NotFlipped),
				2)),
			_Utils_Tuple2(
			'owr',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				$author$project$Types$Rail$Oneway($author$project$Types$Rail$Flipped),
				0)),
			_Utils_Tuple2(
			'owr1',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				$author$project$Types$Rail$Oneway($author$project$Types$Rail$Flipped),
				1)),
			_Utils_Tuple2(
			'owr2',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				$author$project$Types$Rail$Oneway($author$project$Types$Rail$Flipped),
				2)),
			_Utils_Tuple2(
			'dc',
			A2($author$project$Forth$Interpreter$executePlaceRail, $author$project$Types$Rail$WideCross, 0)),
			_Utils_Tuple2(
			'dc1',
			A2($author$project$Forth$Interpreter$executePlaceRail, $author$project$Types$Rail$WideCross, 1)),
			_Utils_Tuple2(
			'fw',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				$author$project$Types$Rail$Forward(_Utils_Tuple0),
				0)),
			_Utils_Tuple2(
			'bk',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				$author$project$Types$Rail$Backward(_Utils_Tuple0),
				0)),
			_Utils_Tuple2(
			'ascend',
			$author$project$Forth$Interpreter$executeAscend(4)),
			_Utils_Tuple2('invert', $author$project$Forth$Interpreter$executeInvert)
		]));
var $author$project$Forth$Interpreter$analyzeWord = function (toks) {
	if (!toks.b) {
		return $elm$core$Result$Err('empty word list');
	} else {
		var t = toks.a;
		var ts = toks.b;
		var _v9 = A2(
			$elm$core$Dict$get,
			t,
			$author$project$Forth$Interpreter$cyclic$controlWords());
		if (_v9.$ === 'Just') {
			var analyzer = _v9.a;
			return analyzer(ts);
		} else {
			var _v10 = A2($elm$core$Dict$get, t, $author$project$Forth$Interpreter$coreGlossary);
			if (_v10.$ === 'Just') {
				var exec = _v10.a;
				return $elm$core$Result$Ok(
					_Utils_Tuple2(exec, ts));
			} else {
				var _v11 = A2($elm$core$Dict$get, t, $author$project$Forth$Interpreter$railForthGlossary);
				if (_v11.$ === 'Just') {
					var exec = _v11.a;
					return $elm$core$Result$Ok(
						_Utils_Tuple2(exec, ts));
				} else {
					return $elm$core$Result$Ok(
						_Utils_Tuple2(
							$author$project$Forth$Interpreter$executeWordInFrame(t),
							ts));
				}
			}
		}
	}
};
var $author$project$Forth$Interpreter$analyzeWordDef = function (toks) {
	if (toks.b) {
		var name = toks.a;
		var toks2 = toks.b;
		var _v4 = $author$project$Forth$Interpreter$analyzeWordsUntilEndOfWordDef(toks2);
		if (_v4.$ === 'Ok') {
			var _v5 = _v4.a;
			var thread = _v5.a;
			var restToks = _v5.b;
			return $elm$core$Result$Ok(
				_Utils_Tuple2(
					A2($author$project$Forth$Interpreter$buildWordDef, name, thread),
					restToks));
		} else {
			var err = _v4.a;
			return $elm$core$Result$Err(err);
		}
	} else {
		return $elm$core$Result$Err('ワード定義の名前がありません');
	}
};
var $author$project$Forth$Interpreter$analyzeWordsUntilEndOfWordDef = function (toks) {
	return A2($author$project$Forth$Interpreter$analyzeWordsUntilEndOfWordDefRec, _List_Nil, toks);
};
var $author$project$Forth$Interpreter$analyzeWordsUntilEndOfWordDefRec = F2(
	function (accum, toks) {
		analyzeWordsUntilEndOfWordDefRec:
		while (true) {
			if (!toks.b) {
				return $elm$core$Result$Err('ワードの定義の末尾に ; がありません');
			} else {
				if (toks.a === ';') {
					var ts = toks.b;
					return $elm$core$Result$Ok(
						_Utils_Tuple2(
							$elm$core$List$reverse(accum),
							ts));
				} else {
					var t = toks.a;
					var ts = toks.b;
					var _v1 = $author$project$Forth$Interpreter$analyzeWord(
						A2($elm$core$List$cons, t, ts));
					if (_v1.$ === 'Ok') {
						var _v2 = _v1.a;
						var exec = _v2.a;
						var ts2 = _v2.b;
						var $temp$accum = A2($elm$core$List$cons, exec, accum),
							$temp$toks = ts2;
						accum = $temp$accum;
						toks = $temp$toks;
						continue analyzeWordsUntilEndOfWordDefRec;
					} else {
						var err = _v1.a;
						return $elm$core$Result$Err(err);
					}
				}
			}
		}
	});
function $author$project$Forth$Interpreter$cyclic$controlWords() {
	return $elm$core$Dict$fromList(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'(',
				$author$project$Forth$Interpreter$analyzeComment(1)),
				_Utils_Tuple2(
				')',
				function (_v6) {
					return $elm$core$Result$Err('余分なコメント終了文字 ) があります');
				}),
				_Utils_Tuple2('save', $author$project$Forth$Interpreter$analyzeSave),
				_Utils_Tuple2('load', $author$project$Forth$Interpreter$analyzeLoad),
				_Utils_Tuple2(':', $author$project$Forth$Interpreter$analyzeWordDef),
				_Utils_Tuple2(
				';',
				function (_v7) {
					return $elm$core$Result$Err('ワードの定義の外で ; が出現しました');
				})
			]));
}
try {
	var $author$project$Forth$Interpreter$controlWords = $author$project$Forth$Interpreter$cyclic$controlWords();
	$author$project$Forth$Interpreter$cyclic$controlWords = function () {
		return $author$project$Forth$Interpreter$controlWords;
	};
} catch ($) {
	throw 'Some top-level definitions from `Forth.Interpreter` are causing infinite recursion:\n\n  ┌─────┐\n  │    analyzeWord\n  │     ↓\n  │    controlWords\n  │     ↓\n  │    analyzeWordDef\n  │     ↓\n  │    analyzeWordsUntilEndOfWordDef\n  │     ↓\n  │    analyzeWordsUntilEndOfWordDefRec\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.1/bad-recursion to learn how to fix it!';}
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $author$project$Forth$Interpreter$analyzeWordsRec = F2(
	function (accum, toks) {
		analyzeWordsRec:
		while (true) {
			if ($elm$core$List$isEmpty(toks)) {
				return $elm$core$Result$Ok(
					$elm$core$List$reverse(accum));
			} else {
				var _v0 = $author$project$Forth$Interpreter$analyzeWord(toks);
				if (_v0.$ === 'Ok') {
					var _v1 = _v0.a;
					var exec = _v1.a;
					var ts = _v1.b;
					var $temp$accum = A2($elm$core$List$cons, exec, accum),
						$temp$toks = ts;
					accum = $temp$accum;
					toks = $temp$toks;
					continue analyzeWordsRec;
				} else {
					var err = _v0.a;
					return $elm$core$Result$Err(err);
				}
			}
		}
	});
var $author$project$Forth$Interpreter$analyzeWords = function (toks) {
	return A2($author$project$Forth$Interpreter$analyzeWordsRec, _List_Nil, toks);
};
var $author$project$Types$RailRenderData$make = F3(
	function (rail, position, angle) {
		return {angle: angle, position: position, rail: rail};
	});
var $author$project$Forth$Geometry$Dir$toRadian = function (_v0) {
	var d = _v0.a;
	return ($elm$core$Basics$pi / 4.0) * d;
};
var $author$project$Forth$RailPlacement$toRailRenderData = function (placement) {
	return A3(
		$author$project$Types$RailRenderData$make,
		placement.rail,
		$author$project$Forth$Geometry$Location$toVec3(placement.location),
		$author$project$Forth$Geometry$Dir$toRadian(placement.location.dir));
};
var $author$project$Forth$Interpreter$haltWithError = function (err) {
	return {
		errMsg: $elm$core$Maybe$Just(err.message),
		piers: _List_Nil,
		railCount: $elm$core$Dict$empty,
		rails: A2($elm$core$List$map, $author$project$Forth$RailPlacement$toRailRenderData, err.status.global.rails)
	};
};
var $author$project$Forth$PierConstraint$concat = function (xs) {
	return {
		may: $elm$core$List$concat(
			A2(
				$elm$core$List$map,
				function (x) {
					return x.may;
				},
				xs)),
		must: $elm$core$List$concat(
			A2(
				$elm$core$List$map,
				function (x) {
					return x.must;
				},
				xs)),
		mustNot: $elm$core$List$concat(
			A2(
				$elm$core$List$map,
				function (x) {
					return x.mustNot;
				},
				xs))
	};
};
var $author$project$Forth$Geometry$Dir$toString = function (_v0) {
	var d = _v0.a;
	return 'Dir ' + $elm$core$String$fromInt(d);
};
var $author$project$Forth$Geometry$Rot45$toString = function (_v0) {
	var a = _v0.a;
	var b = _v0.b;
	var c = _v0.c;
	var d = _v0.d;
	return A2(
		$elm$core$String$join,
		' ',
		A2(
			$elm$core$List$cons,
			'Rot45',
			A2(
				$elm$core$List$map,
				$elm$core$String$fromInt,
				_List_fromArray(
					[a, b, c, d]))));
};
var $author$project$Forth$PierConstraction$Impl$pierPlanarKey = function (_v0) {
	var single = _v0.single;
	var _double = _v0._double;
	var dir = _v0.dir;
	return A2(
		$elm$core$String$join,
		',',
		_List_fromArray(
			[
				$author$project$Forth$Geometry$Rot45$toString(single),
				$author$project$Forth$Geometry$Rot45$toString(_double),
				$author$project$Forth$Geometry$Dir$toString(dir)
			]));
};
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $author$project$Forth$Geometry$PierLocation$PierLocation = F2(
	function (location, margin) {
		return {location: location, margin: margin};
	});
var $author$project$Forth$Geometry$PierLocation$merge = F2(
	function (x, y) {
		return A2(
			$author$project$Forth$Geometry$PierLocation$PierLocation,
			x.location,
			{
				bottom: A2($elm$core$Basics$max, x.margin.bottom, y.margin.bottom),
				top: A2($elm$core$Basics$max, x.margin.top, y.margin.top)
			});
	});
var $mgold$elm_nonempty_list$List$Nonempty$reverse = function (_v0) {
	var x = _v0.a;
	var xs = _v0.b;
	var revapp = function (_v1) {
		revapp:
		while (true) {
			var ls = _v1.a;
			var c = _v1.b;
			var rs = _v1.c;
			if (!rs.b) {
				return A2($mgold$elm_nonempty_list$List$Nonempty$Nonempty, c, ls);
			} else {
				var r = rs.a;
				var rss = rs.b;
				var $temp$_v1 = _Utils_Tuple3(
					A2($elm$core$List$cons, c, ls),
					r,
					rss);
				_v1 = $temp$_v1;
				continue revapp;
			}
		}
	};
	return revapp(
		_Utils_Tuple3(_List_Nil, x, xs));
};
var $author$project$Forth$Geometry$PierLocation$mergePierLocations = function (list) {
	var rec = F3(
		function (accum, prev, ls) {
			rec:
			while (true) {
				if (!ls.b) {
					return $mgold$elm_nonempty_list$List$Nonempty$reverse(
						A2($mgold$elm_nonempty_list$List$Nonempty$Nonempty, prev, accum));
				} else {
					var l = ls.a;
					var rest = ls.b;
					if (_Utils_eq(prev.location.height, l.location.height)) {
						var $temp$accum = accum,
							$temp$prev = A2($author$project$Forth$Geometry$PierLocation$merge, prev, l),
							$temp$ls = rest;
						accum = $temp$accum;
						prev = $temp$prev;
						ls = $temp$ls;
						continue rec;
					} else {
						var $temp$accum = A2($elm$core$List$cons, prev, accum),
							$temp$prev = l,
							$temp$ls = rest;
						accum = $temp$accum;
						prev = $temp$prev;
						ls = $temp$ls;
						continue rec;
					}
				}
			}
		});
	return A3(
		rec,
		_List_Nil,
		$mgold$elm_nonempty_list$List$Nonempty$head(list),
		$mgold$elm_nonempty_list$List$Nonempty$tail(list));
};
var $author$project$Forth$Geometry$Dir$compare = F2(
	function (_v0, _v1) {
		var a = _v0.a;
		var b = _v1.a;
		return A2($elm$core$Basics$compare, a, b);
	});
var $author$project$Util$lexicographic = F2(
	function (x, y) {
		return (!_Utils_eq(x, $elm$core$Basics$EQ)) ? x : y;
	});
var $author$project$Forth$Geometry$Rot45$compare = F2(
	function (_v0, _v1) {
		var xa = _v0.a;
		var xb = _v0.b;
		var xc = _v0.c;
		var xd = _v0.d;
		var ya = _v1.a;
		var yb = _v1.b;
		var yc = _v1.c;
		var yd = _v1.d;
		return A2(
			$author$project$Util$lexicographic,
			A2($elm$core$Basics$compare, xa, ya),
			A2(
				$author$project$Util$lexicographic,
				A2($elm$core$Basics$compare, xb, yb),
				A2(
					$author$project$Util$lexicographic,
					A2($elm$core$Basics$compare, xc, yc),
					A2($elm$core$Basics$compare, xd, yd))));
	});
var $author$project$Forth$Geometry$Location$compare = F2(
	function (a, b) {
		return A2(
			$author$project$Util$lexicographic,
			A2($author$project$Forth$Geometry$Rot45$compare, a.single, b.single),
			A2(
				$author$project$Util$lexicographic,
				A2($author$project$Forth$Geometry$Rot45$compare, a._double, b._double),
				A2(
					$author$project$Util$lexicographic,
					A2($elm$core$Basics$compare, a.height, b.height),
					A2($author$project$Forth$Geometry$Dir$compare, a.dir, b.dir))));
	});
var $author$project$Forth$Geometry$PierLocation$compare = F2(
	function (x, y) {
		return A2(
			$author$project$Util$lexicographic,
			A2($author$project$Forth$Geometry$Location$compare, x.location, y.location),
			A2(
				$author$project$Util$lexicographic,
				A2($elm$core$Basics$compare, x.margin.top, y.margin.top),
				A2($elm$core$Basics$compare, x.margin.bottom, y.margin.bottom)));
	});
var $elm$core$List$sortWith = _List_sortWith;
var $mgold$elm_nonempty_list$List$Nonempty$insertWith = F3(
	function (cmp, hd, aList) {
		if (aList.b) {
			var x = aList.a;
			var xs = aList.b;
			return _Utils_eq(
				A2(cmp, x, hd),
				$elm$core$Basics$LT) ? A2(
				$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
				x,
				A2(
					$elm$core$List$sortWith,
					cmp,
					A2($elm$core$List$cons, hd, xs))) : A2($mgold$elm_nonempty_list$List$Nonempty$Nonempty, hd, aList);
		} else {
			return A2($mgold$elm_nonempty_list$List$Nonempty$Nonempty, hd, _List_Nil);
		}
	});
var $mgold$elm_nonempty_list$List$Nonempty$sortWith = F2(
	function (f, _v0) {
		var x = _v0.a;
		var xs = _v0.b;
		return A3(
			$mgold$elm_nonempty_list$List$Nonempty$insertWith,
			f,
			x,
			A2($elm$core$List$sortWith, f, xs));
	});
var $author$project$Forth$Geometry$PierLocation$sortPierLocations = $mgold$elm_nonempty_list$List$Nonempty$sortWith($author$project$Forth$Geometry$PierLocation$compare);
var $author$project$Forth$Geometry$PierLocation$sortAndMergePierLocations = A2($elm$core$Basics$composeR, $author$project$Forth$Geometry$PierLocation$sortPierLocations, $author$project$Forth$Geometry$PierLocation$mergePierLocations);
var $mgold$elm_nonempty_list$List$Nonempty$cons = F2(
	function (y, _v0) {
		var x = _v0.a;
		var xs = _v0.b;
		return A2(
			$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
			y,
			A2($elm$core$List$cons, x, xs));
	});
var $mgold$elm_nonempty_list$List$Nonempty$singleton = function (x) {
	return A2($mgold$elm_nonempty_list$List$Nonempty$Nonempty, x, _List_Nil);
};
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (_v0.$ === 'Just') {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $author$project$Util$appendToDictNonempty = F2(
	function (key, value) {
		return A2(
			$elm$core$Dict$update,
			key,
			function (oldValue) {
				if (oldValue.$ === 'Nothing') {
					return $elm$core$Maybe$Just(
						$mgold$elm_nonempty_list$List$Nonempty$singleton(value));
				} else {
					var values = oldValue.a;
					return $elm$core$Maybe$Just(
						A2($mgold$elm_nonempty_list$List$Nonempty$cons, value, values));
				}
			});
	});
var $author$project$Util$splitByKey = function (keyOf) {
	return A2(
		$elm$core$List$foldl,
		F2(
			function (loc, dict) {
				return A3(
					$author$project$Util$appendToDictNonempty,
					keyOf(loc),
					loc,
					dict);
			}),
		$elm$core$Dict$empty);
};
var $author$project$Forth$PierConstraction$Impl$buildPierKeyDict = function (locs) {
	return A2(
		$elm$core$Dict$map,
		F2(
			function (_v0, list) {
				return $author$project$Forth$Geometry$PierLocation$sortAndMergePierLocations(list);
			}),
		A2(
			$author$project$Util$splitByKey,
			function (pl) {
				return $author$project$Forth$PierConstraction$Impl$pierPlanarKey(pl.location);
			},
			locs));
};
var $author$project$Forth$Geometry$Dir$toUndirectedDir = function (_v0) {
	var x = _v0.a;
	return (x >= 4) ? $author$project$Forth$Geometry$Dir$Dir(x - 4) : $author$project$Forth$Geometry$Dir$Dir(x);
};
var $author$project$Forth$PierConstraction$Impl$cleansePierLocations = function (placement) {
	var loc = placement.location;
	return _Utils_update(
		placement,
		{
			location: _Utils_update(
				loc,
				{
					dir: $author$project$Forth$Geometry$Dir$toUndirectedDir(loc.dir)
				})
		});
};
var $author$project$Types$Pier$Wide = {$: 'Wide'};
var $author$project$Types$Pier$Mini = {$: 'Mini'};
var $author$project$Types$Pier$Single = {$: 'Single'};
var $author$project$Types$Pier$getHeight = function (pier) {
	switch (pier.$) {
		case 'Single':
			return 4;
		case 'Wide':
			return 4;
		default:
			return 1;
	}
};
var $author$project$Forth$PierPlacement$PierPlacement = F2(
	function (pier, location) {
		return {location: location, pier: pier};
	});
var $author$project$Forth$PierPlacement$make = $author$project$Forth$PierPlacement$PierPlacement;
var $author$project$Forth$Geometry$Location$setHeight = F2(
	function (newHeight, location) {
		return _Utils_update(
			location,
			{height: newHeight});
	});
var $author$project$Forth$PierConstraction$Impl$constructSinglePierRec = F3(
	function (current, pierLocations, accum) {
		var buildSingleUpto = F3(
			function (currentHeight, targetLocation, placementAccum) {
				var canBuildPier = function (targetPier) {
					return _Utils_cmp(
						currentHeight + $author$project$Types$Pier$getHeight(targetPier),
						targetLocation.location.height - targetLocation.margin.bottom) < 1;
				};
				var buildPierAndRec = function (targetPier) {
					var nextLocation = A2($author$project$Forth$Geometry$Location$setHeight, currentHeight, targetLocation.location);
					return A3(
						buildSingleUpto,
						currentHeight + $author$project$Types$Pier$getHeight(targetPier),
						targetLocation,
						A2(
							$elm$core$List$cons,
							A2($author$project$Forth$PierPlacement$make, targetPier, nextLocation),
							placementAccum));
				};
				return canBuildPier($author$project$Types$Pier$Single) ? buildPierAndRec($author$project$Types$Pier$Single) : (canBuildPier($author$project$Types$Pier$Mini) ? buildPierAndRec($author$project$Types$Pier$Mini) : placementAccum);
			});
		if (!pierLocations.b) {
			return $elm$core$List$reverse(accum);
		} else {
			var pierLocation = pierLocations.a;
			var rest = pierLocations.b;
			return A3(
				$author$project$Forth$PierConstraction$Impl$constructSinglePierRec,
				pierLocation.location.height,
				rest,
				A3(buildSingleUpto, current, pierLocation, accum));
		}
	});
var $author$project$Forth$Geometry$Dir$s = $author$project$Forth$Geometry$Dir$Dir(6);
var $author$project$Forth$Geometry$Location$moveRightByDoubleTrackLength = function (loc) {
	return A2(
		$author$project$Forth$Geometry$Location$mul,
		loc,
		A4(
			$author$project$Forth$Geometry$Location$make,
			$author$project$Forth$Geometry$Rot45$zero,
			A2(
				$author$project$Forth$Geometry$Rot45$add,
				$author$project$Forth$Geometry$Dir$toRot45($author$project$Forth$Geometry$Dir$s),
				$author$project$Forth$Geometry$Dir$toRot45($author$project$Forth$Geometry$Dir$s)),
			0,
			$author$project$Forth$Geometry$Dir$e));
};
var $author$project$Forth$PierConstraction$Impl$getRight = function (location) {
	return $author$project$Forth$Geometry$Location$moveRightByDoubleTrackLength(location);
};
var $author$project$Forth$Geometry$PierLocation$setHeight = F2(
	function (newHeight, loc) {
		return _Utils_update(
			loc,
			{
				location: A2($author$project$Forth$Geometry$Location$setHeight, newHeight, loc.location)
			});
	});
var $author$project$Forth$PierConstraction$Impl$constructDoublePier = F2(
	function (primaryPierLocations, secondaryPierLocations) {
		var buildUpto = F3(
			function (targetLocation, placementAccum, currentHeight) {
				var canBuildPier = function (targetPier) {
					return _Utils_cmp(
						(currentHeight + targetLocation.margin.bottom) + $author$project$Types$Pier$getHeight(targetPier),
						targetLocation.location.height - targetLocation.margin.bottom) < 1;
				};
				var buildPierAndRec = function (targetPier) {
					var nextLocation = A2($author$project$Forth$Geometry$Location$setHeight, currentHeight, targetLocation.location);
					return A3(
						buildUpto,
						targetLocation,
						A2(
							$elm$core$List$cons,
							A2($author$project$Forth$PierPlacement$make, targetPier, nextLocation),
							placementAccum),
						currentHeight + $author$project$Types$Pier$getHeight(targetPier));
				};
				var buildDoublePierForTargetLocation = function (targetPier) {
					var doublePierLocationForArbitraryHeight = A2(
						$author$project$Forth$Geometry$Location$setHeight,
						targetLocation.location.height - $author$project$Types$Pier$getHeight(targetPier),
						targetLocation.location);
					return A2(
						$elm$core$List$cons,
						A2($author$project$Forth$PierPlacement$make, targetPier, doublePierLocationForArbitraryHeight),
						placementAccum);
				};
				return canBuildPier($author$project$Types$Pier$Wide) ? buildPierAndRec($author$project$Types$Pier$Wide) : (_Utils_eq(targetLocation.location.height, currentHeight) ? placementAccum : buildDoublePierForTargetLocation($author$project$Types$Pier$Wide));
			});
		var doubleRec = F4(
			function (current, primary, secondary, accum) {
				var _v0 = _Utils_Tuple2(primary, secondary);
				if (_v0.a.b) {
					if (_v0.b.b) {
						var _v1 = _v0.a;
						var p = _v1.a;
						var pRest = _v1.b;
						var _v2 = _v0.b;
						var s = _v2.a;
						var sRest = _v2.b;
						return (_Utils_cmp(p.location.height, s.location.height) > 0) ? A4(
							doubleRec,
							s.location.height,
							A2($elm$core$List$cons, p, pRest),
							sRest,
							A3(
								buildUpto,
								A2($author$project$Forth$Geometry$PierLocation$setHeight, s.location.height, p),
								accum,
								current)) : ((_Utils_cmp(p.location.height, s.location.height) < 0) ? A4(
							doubleRec,
							p.location.height,
							pRest,
							A2($elm$core$List$cons, s, sRest),
							A3(buildUpto, p, accum, current)) : A4(
							doubleRec,
							p.location.height,
							pRest,
							sRest,
							A3(buildUpto, p, accum, current)));
					} else {
						var _v3 = _v0.a;
						var primaryLocation = _v3.a;
						var primaryLocations = _v3.b;
						var doublePierLocation = A2($author$project$Forth$Geometry$Location$setHeight, current, primaryLocation.location);
						return A3(
							$author$project$Forth$PierConstraction$Impl$constructSinglePierRec,
							current + $author$project$Types$Pier$getHeight($author$project$Types$Pier$Wide),
							A2($elm$core$List$cons, primaryLocation, primaryLocations),
							A2(
								$elm$core$List$cons,
								A2($author$project$Forth$PierPlacement$make, $author$project$Types$Pier$Wide, doublePierLocation),
								accum));
					}
				} else {
					if (!_v0.b.b) {
						return $elm$core$List$reverse(accum);
					} else {
						var _v4 = _v0.b;
						var secondaryLocation = _v4.a;
						var secondaryLocations = _v4.b;
						var doublePierLocation = $author$project$Forth$PierConstraction$Impl$getRight(
							A2($author$project$Forth$Geometry$Location$setHeight, current, secondaryLocation.location));
						return A3(
							$author$project$Forth$PierConstraction$Impl$constructSinglePierRec,
							current + $author$project$Types$Pier$getHeight($author$project$Types$Pier$Wide),
							A2($elm$core$List$cons, secondaryLocation, secondaryLocations),
							A2(
								$elm$core$List$cons,
								A2($author$project$Forth$PierPlacement$make, $author$project$Types$Pier$Wide, doublePierLocation),
								accum));
					}
				}
			});
		return A4(doubleRec, 0, primaryPierLocations, secondaryPierLocations, _List_Nil);
	});
var $elm$core$Set$Set_elm_builtin = function (a) {
	return {$: 'Set_elm_builtin', a: a};
};
var $elm$core$Set$empty = $elm$core$Set$Set_elm_builtin($elm$core$Dict$empty);
var $author$project$Forth$Geometry$Location$moveLeftByDoubleTrackLength = function (loc) {
	return A2(
		$author$project$Forth$Geometry$Location$mul,
		loc,
		A4(
			$author$project$Forth$Geometry$Location$make,
			$author$project$Forth$Geometry$Rot45$zero,
			A2(
				$author$project$Forth$Geometry$Rot45$add,
				$author$project$Forth$Geometry$Dir$toRot45($author$project$Forth$Geometry$Dir$n),
				$author$project$Forth$Geometry$Dir$toRot45($author$project$Forth$Geometry$Dir$n)),
			0,
			$author$project$Forth$Geometry$Dir$e));
};
var $author$project$Forth$PierConstraction$Impl$getLeft = function (location) {
	return $author$project$Forth$Geometry$Location$moveLeftByDoubleTrackLength(location);
};
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return $elm$core$Set$Set_elm_builtin(
			A3($elm$core$Dict$insert, key, _Utils_Tuple0, dict));
	});
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (_v0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return A2($elm$core$Dict$member, key, dict);
	});
var $author$project$Forth$PierConstraction$Impl$constructDoubleTrackPiers = function (locationDict) {
	var rec = F4(
		function (closed, single, _double, list) {
			rec:
			while (true) {
				if (!list.b) {
					return {_double: _double, single: single};
				} else {
					var _v1 = list.a;
					var key = _v1.a;
					var pierLocations = _v1.b;
					var rest = list.b;
					var left = $author$project$Forth$PierConstraction$Impl$pierPlanarKey(
						$author$project$Forth$PierConstraction$Impl$getLeft(
							$mgold$elm_nonempty_list$List$Nonempty$head(pierLocations).location));
					if (A2($elm$core$Set$member, key, closed)) {
						var $temp$closed = closed,
							$temp$single = single,
							$temp$double = _double,
							$temp$list = rest;
						closed = $temp$closed;
						single = $temp$single;
						_double = $temp$double;
						list = $temp$list;
						continue rec;
					} else {
						var _v2 = A2($elm$core$Dict$get, left, single);
						if (_v2.$ === 'Nothing') {
							var $temp$closed = A2($elm$core$Set$insert, key, closed),
								$temp$single = single,
								$temp$double = _double,
								$temp$list = rest;
							closed = $temp$closed;
							single = $temp$single;
							_double = $temp$double;
							list = $temp$list;
							continue rec;
						} else {
							var doubleLocations = _v2.a;
							var $temp$closed = A2(
								$elm$core$Set$insert,
								key,
								A2($elm$core$Set$insert, left, closed)),
								$temp$single = A2(
								$elm$core$Dict$remove,
								key,
								A2($elm$core$Dict$remove, left, single)),
								$temp$double = A3(
								$elm$core$Dict$insert,
								key,
								_Utils_Tuple2(pierLocations, doubleLocations),
								_double),
								$temp$list = rest;
							closed = $temp$closed;
							single = $temp$single;
							_double = $temp$double;
							list = $temp$list;
							continue rec;
						}
					}
				}
			}
		});
	return A4(
		rec,
		$elm$core$Set$empty,
		locationDict,
		$elm$core$Dict$empty,
		$elm$core$Dict$toList(locationDict));
};
var $author$project$Forth$PierConstraction$Impl$constructSinglePier = function (locations) {
	return A3($author$project$Forth$PierConstraction$Impl$constructSinglePierRec, 0, locations, _List_Nil);
};
var $author$project$Forth$PierConstraction$Impl$pierSpatialKey = function (_v0) {
	var single = _v0.single;
	var _double = _v0._double;
	var dir = _v0.dir;
	var height = _v0.height;
	return A2(
		$elm$core$String$join,
		',',
		_List_fromArray(
			[
				$author$project$Forth$Geometry$Rot45$toString(single),
				$author$project$Forth$Geometry$Rot45$toString(_double),
				$author$project$Forth$Geometry$Dir$toString(dir),
				$elm$core$String$fromInt(height)
			]));
};
var $author$project$Forth$PierConstraction$Impl$findNeighborMayLocations = F2(
	function (mustList, mayList) {
		var transferIfFound = F2(
			function (location, _v3) {
				var accum = _v3.a;
				var mayDict = _v3.b;
				var _v2 = A2(
					$elm$core$Dict$get,
					$author$project$Forth$PierConstraction$Impl$pierSpatialKey(location),
					mayDict);
				if (_v2.$ === 'Just') {
					var foundLocation = _v2.a;
					return _Utils_Tuple2(
						A2($elm$core$List$cons, foundLocation, accum),
						A2(
							$elm$core$Dict$remove,
							$author$project$Forth$PierConstraction$Impl$pierSpatialKey(location),
							mayDict));
				} else {
					return _Utils_Tuple2(accum, mayDict);
				}
			});
		var rec = F2(
			function (list, _v0) {
				var accum = _v0.a;
				var mayDict = _v0.b;
				if (!list.b) {
					return accum;
				} else {
					var loc = list.a;
					var locs = list.b;
					return A2(
						rec,
						locs,
						A2(
							transferIfFound,
							$author$project$Forth$PierConstraction$Impl$getRight(loc.location),
							A2(
								transferIfFound,
								$author$project$Forth$PierConstraction$Impl$getLeft(loc.location),
								_Utils_Tuple2(accum, mayDict))));
				}
			});
		var initialMayDict = $elm$core$Dict$fromList(
			A2(
				$elm$core$List$map,
				function (pl) {
					return _Utils_Tuple2(
						$author$project$Forth$PierConstraction$Impl$pierSpatialKey(pl.location),
						pl);
				},
				mayList));
		return A2(
			rec,
			mustList,
			_Utils_Tuple2(_List_Nil, initialMayDict));
	});
var $author$project$Forth$PierConstraction$Impl$construct = function (_v0) {
	var must = _v0.must;
	var may = _v0.may;
	var mustNot = _v0.mustNot;
	var cleanesedMustLocations = A2($elm$core$List$map, $author$project$Forth$PierConstraction$Impl$cleansePierLocations, must);
	var cleanesedMayLocations = A2($elm$core$List$map, $author$project$Forth$PierConstraction$Impl$cleansePierLocations, may);
	var mayLocationsToBePlaced = A2($author$project$Forth$PierConstraction$Impl$findNeighborMayLocations, cleanesedMustLocations, cleanesedMayLocations);
	var mustPierKeyDict = $author$project$Forth$PierConstraction$Impl$buildPierKeyDict(
		_Utils_ap(cleanesedMustLocations, mayLocationsToBePlaced));
	var pierDict = $author$project$Forth$PierConstraction$Impl$constructDoubleTrackPiers(mustPierKeyDict);
	var doublePlacements = A2(
		$elm$core$List$concatMap,
		function (_v1) {
			var primary = _v1.a;
			var secondary = _v1.b;
			return A2(
				$author$project$Forth$PierConstraction$Impl$constructDoublePier,
				$mgold$elm_nonempty_list$List$Nonempty$toList(primary),
				$mgold$elm_nonempty_list$List$Nonempty$toList(secondary));
		},
		$elm$core$Dict$values(pierDict._double));
	var singlePlacements = A2(
		$elm$core$List$concatMap,
		A2($elm$core$Basics$composeR, $mgold$elm_nonempty_list$List$Nonempty$toList, $author$project$Forth$PierConstraction$Impl$constructSinglePier),
		$elm$core$Dict$values(pierDict.single));
	var finalResult = _Utils_ap(singlePlacements, doublePlacements);
	return {error: $elm$core$Maybe$Nothing, pierPlacements: finalResult};
};
var $author$project$Forth$PierConstraintDefinition$flatRailMargin = {bottom: 0, top: 4};
var $author$project$Forth$PierConstraintDefinition$flat = function (loc) {
	return {location: loc, margin: $author$project$Forth$PierConstraintDefinition$flatRailMargin};
};
var $author$project$Forth$PierConstraintDefinition$flatConstraint = F2(
	function (must, mustNot) {
		return {
			may: _List_Nil,
			must: A2($elm$core$List$map, $author$project$Forth$PierConstraintDefinition$flat, must),
			mustNot: mustNot
		};
	});
var $author$project$Forth$Geometry$PierLocation$flip = function (loc) {
	return {
		location: $author$project$Forth$Geometry$Location$flip(loc.location),
		margin: loc.margin
	};
};
var $author$project$Forth$PierConstraint$flip = F2(
	function (flipped, constraint) {
		if (flipped.$ === 'NotFlipped') {
			return constraint;
		} else {
			return {
				may: A2($elm$core$List$map, $author$project$Forth$Geometry$PierLocation$flip, constraint.may),
				must: A2($elm$core$List$map, $author$project$Forth$Geometry$PierLocation$flip, constraint.must),
				mustNot: A2($elm$core$List$map, $author$project$Forth$Geometry$Location$flip, constraint.mustNot)
			};
		}
	});
var $author$project$Forth$PierConstraintDefinition$plainConstraint = function (must) {
	return A2($author$project$Forth$PierConstraintDefinition$flatConstraint, must, _List_Nil);
};
var $author$project$Forth$PierConstraintDefinition$slopeCurveMargin = {bottom: 1, top: 4};
var $author$project$Forth$PierConstraintDefinition$slopeCurve = function (loc) {
	return {location: loc, margin: $author$project$Forth$PierConstraintDefinition$slopeCurveMargin};
};
var $author$project$Forth$PierConstraintDefinition$slopeCurveConstraint = F2(
	function (origin, up) {
		return {
			may: _List_Nil,
			must: _List_fromArray(
				[
					$author$project$Forth$PierConstraintDefinition$flat(origin),
					$author$project$Forth$PierConstraintDefinition$slopeCurve(up)
				]),
			mustNot: _List_Nil
		};
	});
var $author$project$Forth$PierConstraintDefinition$straightConstraint = function (n) {
	return {
		may: A2(
			$elm$core$List$map,
			function (i) {
				return $author$project$Forth$PierConstraintDefinition$flat(
					$author$project$Forth$LocationDefinition$straight(i));
			},
			A2($elm$core$List$range, 1, n - 1)),
		must: _List_fromArray(
			[
				$author$project$Forth$PierConstraintDefinition$flat($author$project$Forth$LocationDefinition$zero),
				$author$project$Forth$PierConstraintDefinition$flat(
				$author$project$Forth$LocationDefinition$straight(n))
			]),
		mustNot: _List_Nil
	};
};
var $author$project$Forth$Geometry$Dir$nw = $author$project$Forth$Geometry$Dir$Dir(3);
var $author$project$Forth$Geometry$Dir$sw = $author$project$Forth$Geometry$Dir$Dir(5);
var $author$project$Forth$PierConstraintDefinition$uturnLocations = _List_fromArray(
	[
		$author$project$Forth$LocationDefinition$zero,
		A4(
		$author$project$Forth$Geometry$Location$make,
		A4($author$project$Forth$Geometry$Rot45$make, 10, -5, 0, 0),
		A4($author$project$Forth$Geometry$Rot45$make, 0, 0, 1, 0),
		0,
		$author$project$Forth$Geometry$Dir$se),
		A4(
		$author$project$Forth$Geometry$Location$make,
		A4($author$project$Forth$Geometry$Rot45$make, 10, 0, -5, 0),
		A4($author$project$Forth$Geometry$Rot45$make, 0, 0, 1, 0),
		0,
		$author$project$Forth$Geometry$Dir$e),
		A4(
		$author$project$Forth$Geometry$Location$make,
		A4($author$project$Forth$Geometry$Rot45$make, 10, 0, 0, -5),
		A4($author$project$Forth$Geometry$Rot45$make, 0, 0, 1, 0),
		0,
		$author$project$Forth$Geometry$Dir$ne),
		A4(
		$author$project$Forth$Geometry$Location$make,
		A4($author$project$Forth$Geometry$Rot45$make, 15, 0, 0, 0),
		A4($author$project$Forth$Geometry$Rot45$make, 0, 0, 1, 0),
		0,
		$author$project$Forth$Geometry$Dir$n),
		A4(
		$author$project$Forth$Geometry$Location$make,
		A4($author$project$Forth$Geometry$Rot45$make, 10, 5, 0, 0),
		A4($author$project$Forth$Geometry$Rot45$make, 0, 0, 1, 0),
		0,
		$author$project$Forth$Geometry$Dir$nw),
		A4(
		$author$project$Forth$Geometry$Location$make,
		A4($author$project$Forth$Geometry$Rot45$make, 10, 0, 5, 0),
		A4($author$project$Forth$Geometry$Rot45$make, 0, 0, 1, 0),
		0,
		$author$project$Forth$Geometry$Dir$w),
		A4(
		$author$project$Forth$Geometry$Location$make,
		A4($author$project$Forth$Geometry$Rot45$make, 10, 0, 0, 5),
		A4($author$project$Forth$Geometry$Rot45$make, 0, 0, 1, 0),
		0,
		$author$project$Forth$Geometry$Dir$sw),
		$author$project$Forth$LocationDefinition$zeroDoubleLeft
	]);
var $author$project$Forth$PierConstraintDefinition$getPierConstraint = function (rail) {
	switch (rail.$) {
		case 'Straight1':
			return $author$project$Forth$PierConstraintDefinition$straightConstraint(1);
		case 'Straight2':
			return $author$project$Forth$PierConstraintDefinition$straightConstraint(2);
		case 'Straight4':
			return $author$project$Forth$PierConstraintDefinition$straightConstraint(4);
		case 'Straight8':
			return $author$project$Forth$PierConstraintDefinition$straightConstraint(8);
		case 'DoubleStraight4':
			return A2(
				$author$project$Forth$PierConstraintDefinition$flatConstraint,
				_List_fromArray(
					[
						$author$project$Forth$LocationDefinition$zero,
						$author$project$Forth$LocationDefinition$zeroDoubleRight,
						$author$project$Forth$LocationDefinition$straightDoubleRight(4),
						$author$project$Forth$LocationDefinition$straight(4)
					]),
				_Utils_ap(
					A2(
						$elm$core$List$map,
						$author$project$Forth$LocationDefinition$straight,
						A2($elm$core$List$range, 1, 3)),
					A2(
						$elm$core$List$map,
						$author$project$Forth$LocationDefinition$straightDoubleRight,
						A2($elm$core$List$range, 1, 3))));
		case 'Curve45':
			var f = rail.a;
			return A2(
				$author$project$Forth$PierConstraint$flip,
				f,
				$author$project$Forth$PierConstraintDefinition$plainConstraint(
					_List_fromArray(
						[$author$project$Forth$LocationDefinition$zero, $author$project$Forth$LocationDefinition$left45])));
		case 'Curve90':
			var f = rail.a;
			return A2(
				$author$project$Forth$PierConstraint$flip,
				f,
				$author$project$Forth$PierConstraintDefinition$plainConstraint(
					_List_fromArray(
						[$author$project$Forth$LocationDefinition$zero, $author$project$Forth$LocationDefinition$left45, $author$project$Forth$LocationDefinition$left90])));
		case 'OuterCurve45':
			var f = rail.a;
			return A2(
				$author$project$Forth$PierConstraint$flip,
				f,
				$author$project$Forth$PierConstraintDefinition$plainConstraint(
					_List_fromArray(
						[$author$project$Forth$LocationDefinition$zero, $author$project$Forth$LocationDefinition$outerLeft45])));
		case 'DoubleCurve45':
			var f = rail.a;
			return A2(
				$author$project$Forth$PierConstraint$flip,
				f,
				$author$project$Forth$PierConstraintDefinition$plainConstraint(
					_List_fromArray(
						[$author$project$Forth$LocationDefinition$zero, $author$project$Forth$LocationDefinition$zeroDoubleRight, $author$project$Forth$LocationDefinition$doubleRightAndOuterLeft45, $author$project$Forth$LocationDefinition$left45])));
		case 'Turnout':
			var f = rail.a;
			return A2(
				$author$project$Forth$PierConstraint$flip,
				f,
				A2(
					$author$project$Forth$PierConstraintDefinition$flatConstraint,
					_List_fromArray(
						[
							$author$project$Forth$LocationDefinition$zero,
							$author$project$Forth$LocationDefinition$straight(4),
							$author$project$Forth$LocationDefinition$left45
						]),
					A2(
						$elm$core$List$map,
						$author$project$Forth$LocationDefinition$straight,
						A2($elm$core$List$range, 1, 3))));
		case 'SingleDouble':
			var f = rail.a;
			return A2(
				$author$project$Forth$PierConstraint$flip,
				f,
				A2(
					$author$project$Forth$PierConstraintDefinition$flatConstraint,
					_List_fromArray(
						[
							$author$project$Forth$LocationDefinition$zero,
							$author$project$Forth$LocationDefinition$straight(4),
							$author$project$Forth$LocationDefinition$straightDoubleLeft(4)
						]),
					A2(
						$elm$core$List$map,
						$author$project$Forth$LocationDefinition$straight,
						A2($elm$core$List$range, 1, 3))));
		case 'DoubleWide':
			var f = rail.a;
			return A2(
				$author$project$Forth$PierConstraint$flip,
				f,
				A2(
					$author$project$Forth$PierConstraintDefinition$flatConstraint,
					_List_fromArray(
						[
							$author$project$Forth$LocationDefinition$zero,
							$author$project$Forth$LocationDefinition$straight(5),
							$author$project$Forth$LocationDefinition$straightWideLeft(5),
							$author$project$Forth$LocationDefinition$zeroDoubleLeft
						]),
					A2(
						$elm$core$List$map,
						$author$project$Forth$LocationDefinition$straight,
						A2($elm$core$List$range, 1, 4))));
		case 'EightPoint':
			var f = rail.a;
			return A2(
				$author$project$Forth$PierConstraint$flip,
				f,
				$author$project$Forth$PierConstraintDefinition$plainConstraint(
					_List_fromArray(
						[$author$project$Forth$LocationDefinition$zero, $author$project$Forth$LocationDefinition$right45, $author$project$Forth$LocationDefinition$left45])));
		case 'JointChange':
			return $author$project$Forth$PierConstraintDefinition$straightConstraint(1);
		case 'Slope':
			var f = rail.a;
			return A2(
				$author$project$Forth$PierConstraint$flip,
				f,
				A2(
					$author$project$Forth$PierConstraintDefinition$flatConstraint,
					_List_fromArray(
						[
							$author$project$Forth$LocationDefinition$zero,
							A2($author$project$Forth$LocationDefinition$straightAndUp, 4, 8)
						]),
					_Utils_ap(
						A2(
							$elm$core$List$map,
							$author$project$Forth$LocationDefinition$straight,
							A2($elm$core$List$range, 1, 7)),
						A2(
							$elm$core$List$map,
							$author$project$Forth$LocationDefinition$straightAndUp(4),
							A2($elm$core$List$range, 1, 7)))));
		case 'Shift':
			var f = rail.a;
			return A2(
				$author$project$Forth$PierConstraint$flip,
				f,
				$author$project$Forth$PierConstraintDefinition$plainConstraint(
					_List_fromArray(
						[
							$author$project$Forth$LocationDefinition$zero,
							$author$project$Forth$LocationDefinition$straightDoubleLeft(4)
						])));
		case 'SlopeCurveA':
			return A2($author$project$Forth$PierConstraintDefinition$slopeCurveConstraint, $author$project$Forth$LocationDefinition$zero, $author$project$Forth$LocationDefinition$right45AndUp);
		case 'SlopeCurveB':
			return A2($author$project$Forth$PierConstraintDefinition$slopeCurveConstraint, $author$project$Forth$LocationDefinition$zero, $author$project$Forth$LocationDefinition$left45AndUp);
		case 'Stop':
			return A2(
				$author$project$Forth$PierConstraintDefinition$flatConstraint,
				_List_fromArray(
					[
						$author$project$Forth$LocationDefinition$zero,
						$author$project$Forth$LocationDefinition$straight(4)
					]),
				A2(
					$elm$core$List$map,
					$author$project$Forth$LocationDefinition$straight,
					A2($elm$core$List$range, 1, 3)));
		case 'AutoTurnout':
			return A2(
				$author$project$Forth$PierConstraintDefinition$flatConstraint,
				_List_fromArray(
					[
						$author$project$Forth$LocationDefinition$zero,
						$author$project$Forth$LocationDefinition$straight(6),
						$author$project$Forth$LocationDefinition$straightAndLeft45(2)
					]),
				A2(
					$elm$core$List$map,
					$author$project$Forth$LocationDefinition$straight,
					A2($elm$core$List$range, 1, 5)));
		case 'AutoPoint':
			return A2(
				$author$project$Forth$PierConstraintDefinition$flatConstraint,
				_List_fromArray(
					[
						$author$project$Forth$LocationDefinition$zero,
						$author$project$Forth$LocationDefinition$straightDoubleRight(6),
						$author$project$Forth$LocationDefinition$straight(6),
						$author$project$Forth$LocationDefinition$straightAndLeft45(2)
					]),
				A2(
					$elm$core$List$map,
					$author$project$Forth$LocationDefinition$straight,
					A2($elm$core$List$range, 1, 5)));
		case 'AutoCross':
			return A2(
				$author$project$Forth$PierConstraintDefinition$flatConstraint,
				_List_fromArray(
					[
						$author$project$Forth$LocationDefinition$zero,
						$author$project$Forth$LocationDefinition$zeroDoubleRight,
						$author$project$Forth$LocationDefinition$straightDoubleRight(4),
						$author$project$Forth$LocationDefinition$straight(4)
					]),
				_Utils_ap(
					A2(
						$elm$core$List$map,
						$author$project$Forth$LocationDefinition$straight,
						A2($elm$core$List$range, 1, 3)),
					A2(
						$elm$core$List$map,
						$author$project$Forth$LocationDefinition$straightDoubleRight,
						A2($elm$core$List$range, 1, 3))));
		case 'UTurn':
			return $author$project$Forth$PierConstraintDefinition$plainConstraint($author$project$Forth$PierConstraintDefinition$uturnLocations);
		case 'Oneway':
			var f = rail.a;
			return A2(
				$author$project$Forth$PierConstraint$flip,
				f,
				A2(
					$author$project$Forth$PierConstraintDefinition$flatConstraint,
					_List_fromArray(
						[
							$author$project$Forth$LocationDefinition$zero,
							$author$project$Forth$LocationDefinition$straight(4),
							$author$project$Forth$LocationDefinition$left45
						]),
					A2(
						$elm$core$List$map,
						$author$project$Forth$LocationDefinition$straight,
						A2($elm$core$List$range, 1, 3))));
		case 'WideCross':
			return A2(
				$author$project$Forth$PierConstraintDefinition$flatConstraint,
				_List_fromArray(
					[
						$author$project$Forth$LocationDefinition$zero,
						$author$project$Forth$LocationDefinition$zeroWideRight,
						$author$project$Forth$LocationDefinition$straightWideRight(4),
						$author$project$Forth$LocationDefinition$straight(4)
					]),
				_Utils_ap(
					A2(
						$elm$core$List$map,
						$author$project$Forth$LocationDefinition$straight,
						A2($elm$core$List$range, 1, 3)),
					A2(
						$elm$core$List$map,
						$author$project$Forth$LocationDefinition$straightWideRight,
						A2($elm$core$List$range, 1, 3))));
		case 'Forward':
			return $author$project$Forth$PierConstraintDefinition$straightConstraint(2);
		default:
			return $author$project$Forth$PierConstraintDefinition$straightConstraint(2);
	}
};
var $author$project$Forth$PierConstraint$map = F2(
	function (f, constraint) {
		return {
			may: A2(
				$elm$core$List$map,
				function (pl) {
					return _Utils_update(
						pl,
						{
							location: f(pl.location)
						});
				},
				constraint.may),
			must: A2(
				$elm$core$List$map,
				function (pl) {
					return _Utils_update(
						pl,
						{
							location: f(pl.location)
						});
				},
				constraint.must),
			mustNot: A2($elm$core$List$map, f, constraint.mustNot)
		};
	});
var $author$project$Forth$RailPieceLogic$getPierConstraintFromRailPlacement = function (railPlacement) {
	return A2(
		$author$project$Forth$PierConstraint$map,
		$author$project$Forth$Geometry$Location$mul(railPlacement.location),
		$author$project$Forth$PierConstraintDefinition$getPierConstraint(railPlacement.rail));
};
var $author$project$Types$PierRenderData$make = F3(
	function (pier, position, angle) {
		return {angle: angle, pier: pier, position: position};
	});
var $author$project$Forth$PierPlacement$toPierRenderData = function (placement) {
	return A3(
		$author$project$Types$PierRenderData$make,
		placement.pier,
		$author$project$Forth$Geometry$Location$toVec3(placement.location),
		$author$project$Forth$Geometry$Dir$toRadian(placement.location.dir));
};
var $author$project$Forth$PierConstruction$construct = function (list) {
	var _v0 = $author$project$Forth$PierConstraction$Impl$construct(
		$author$project$Forth$PierConstraint$concat(
			A2($elm$core$List$map, $author$project$Forth$RailPieceLogic$getPierConstraintFromRailPlacement, list)));
	var pierPlacements = _v0.pierPlacements;
	var error = _v0.error;
	return {
		error: error,
		pierRenderData: A2($elm$core$List$map, $author$project$Forth$PierPlacement$toPierRenderData, pierPlacements)
	};
};
var $author$project$Forth$Statistics$getPierCount = function (piers) {
	return A3(
		$elm$core$List$foldl,
		function (pier) {
			return A2(
				$elm$core$Dict$update,
				pier,
				function (x) {
					if (x.$ === 'Nothing') {
						return $elm$core$Maybe$Just(1);
					} else {
						var n = x.a;
						return $elm$core$Maybe$Just(n + 1);
					}
				});
		},
		$elm$core$Dict$empty,
		A2($elm$core$List$map, $author$project$Types$Pier$toString, piers));
};
var $author$project$Forth$Statistics$railToStringRegardlessOfFlipped = function (rail) {
	return A3(
		$author$project$Types$Rail$toStringWith,
		function (_v0) {
			return '';
		},
		$author$project$Types$Rail$isInvertedToString,
		rail);
};
var $author$project$Forth$Statistics$getRailCount = function (rails) {
	return A3(
		$elm$core$List$foldl,
		function (rail) {
			return A2(
				$elm$core$Dict$update,
				rail,
				function (x) {
					if (x.$ === 'Nothing') {
						return $elm$core$Maybe$Just(1);
					} else {
						var n = x.a;
						return $elm$core$Maybe$Just(n + 1);
					}
				});
		},
		$elm$core$Dict$empty,
		A2($elm$core$List$map, $author$project$Forth$Statistics$railToStringRegardlessOfFlipped, rails));
};
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $author$project$Forth$Interpreter$haltWithSuccess = function (status) {
	var _v0 = $author$project$Forth$PierConstruction$construct(status.global.rails);
	var pierRenderData = _v0.pierRenderData;
	var error = _v0.error;
	return {
		errMsg: error,
		piers: pierRenderData,
		railCount: A2(
			$elm$core$Dict$union,
			$author$project$Forth$Statistics$getRailCount(
				A2(
					$elm$core$List$map,
					function (x) {
						return x.rail;
					},
					status.global.rails)),
			$author$project$Forth$Statistics$getPierCount(
				A2(
					$elm$core$List$map,
					function (x) {
						return x.pier;
					},
					pierRenderData))),
		rails: A2($elm$core$List$map, $author$project$Forth$RailPlacement$toRailRenderData, status.global.rails)
	};
};
var $elm$core$String$words = _String_words;
var $author$project$Forth$Interpreter$execute = function (src) {
	var tokens = $elm$core$String$words(src);
	var initialLocation = $author$project$Forth$Geometry$RailLocation$invertJoint($author$project$Forth$Geometry$RailLocation$zero);
	var initialStatus = {
		frame: _List_fromArray(
			[$elm$core$Dict$empty]),
		global: {rails: _List_Nil},
		savepoints: _List_fromArray(
			[$elm$core$Dict$empty]),
		stack: _List_fromArray(
			[initialLocation])
	};
	var _v0 = $author$project$Forth$Interpreter$analyzeWords(tokens);
	if (_v0.$ === 'Ok') {
		var execs = _v0.a;
		var _v1 = A2($author$project$Forth$Interpreter$executeMulti, execs, initialStatus);
		if (_v1.$ === 'Ok') {
			var finalStatus = _v1.a;
			return $author$project$Forth$Interpreter$haltWithSuccess(finalStatus);
		} else {
			var execError = _v1.a;
			return $author$project$Forth$Interpreter$haltWithError(execError);
		}
	} else {
		var analyzeError = _v0.a;
		return $author$project$Forth$Interpreter$haltWithError(
			A2($author$project$Forth$Interpreter$ExecError, analyzeError, initialStatus));
	}
};
var $author$project$Forth$execute = $author$project$Forth$Interpreter$execute;
var $elm$browser$Browser$Dom$getViewport = _Browser_withWindow(_Browser_getViewport);
var $author$project$Graphics$MeshLoader$init = {errors: _List_Nil, meshes: $elm$core$Dict$empty};
var $author$project$Graphics$OrbitControl$Model = function (a) {
	return {$: 'Model', a: a};
};
var $author$project$Graphics$OrbitControlImpl$Model = function (a) {
	return {$: 'Model', a: a};
};
var $author$project$Graphics$OrbitControlImpl$init = F4(
	function (azimuth, altitude, scale, eyeTarget) {
		return $author$project$Graphics$OrbitControlImpl$Model(
			{altitude: altitude, azimuth: azimuth, scale: scale, target: eyeTarget, viewportHeight: 0, viewportWidth: 0});
	});
var $author$project$Graphics$OrbitControl$init = F4(
	function (azimuth, altitude, scale, eyeTarget) {
		return $author$project$Graphics$OrbitControl$Model(
			{
				draggingState: $elm$core$Maybe$Nothing,
				ocImpl: A4($author$project$Graphics$OrbitControlImpl$init, azimuth, altitude, scale, eyeTarget),
				points: $elm$core$Dict$empty
			});
	});
var $author$project$Graphics$MeshLoader$LoadMesh = F2(
	function (a, b) {
		return {$: 'LoadMesh', a: a, b: b};
	});
var $author$project$Types$Pier$allPiers = _List_fromArray(
	[$author$project$Types$Pier$Single, $author$project$Types$Pier$Wide, $author$project$Types$Pier$Mini]);
var $author$project$Types$Rail$allRails = _Utils_ap(
	_List_fromArray(
		[$author$project$Types$Rail$SlopeCurveA, $author$project$Types$Rail$SlopeCurveB, $author$project$Types$Rail$AutoTurnout, $author$project$Types$Rail$AutoPoint, $author$project$Types$Rail$AutoCross, $author$project$Types$Rail$UTurn, $author$project$Types$Rail$WideCross]),
	_Utils_ap(
		A2(
			$elm$core$List$concatMap,
			function (flipped) {
				return _List_fromArray(
					[
						$author$project$Types$Rail$Oneway(flipped)
					]);
			},
			_List_fromArray(
				[$author$project$Types$Rail$Flipped, $author$project$Types$Rail$NotFlipped])),
		_Utils_ap(
			A2(
				$elm$core$List$concatMap,
				function (invert) {
					return _List_fromArray(
						[
							$author$project$Types$Rail$Straight1(invert),
							$author$project$Types$Rail$Straight2(invert),
							$author$project$Types$Rail$Straight4(invert),
							$author$project$Types$Rail$Straight8(invert),
							$author$project$Types$Rail$DoubleStraight4(invert),
							$author$project$Types$Rail$JointChange(invert),
							$author$project$Types$Rail$Stop(invert),
							$author$project$Types$Rail$Forward(invert),
							$author$project$Types$Rail$Backward(invert)
						]);
				},
				_List_fromArray(
					[$author$project$Types$Rail$Inverted, $author$project$Types$Rail$NotInverted])),
			A2(
				$elm$core$List$concatMap,
				function (invert) {
					return A2(
						$elm$core$List$concatMap,
						function (flip) {
							return _List_fromArray(
								[
									A2($author$project$Types$Rail$Curve45, flip, invert),
									A2($author$project$Types$Rail$Curve90, flip, invert),
									A2($author$project$Types$Rail$OuterCurve45, flip, invert),
									A2($author$project$Types$Rail$DoubleCurve45, flip, invert),
									A2($author$project$Types$Rail$Turnout, flip, invert),
									A2($author$project$Types$Rail$SingleDouble, flip, invert),
									A2($author$project$Types$Rail$DoubleWide, flip, invert),
									A2($author$project$Types$Rail$EightPoint, flip, invert),
									A2($author$project$Types$Rail$Slope, flip, invert),
									A2($author$project$Types$Rail$Shift, flip, invert)
								]);
						},
						_List_fromArray(
							[$author$project$Types$Rail$Flipped, $author$project$Types$Rail$NotFlipped]));
				},
				_List_fromArray(
					[$author$project$Types$Rail$Inverted, $author$project$Types$Rail$NotInverted])))));
var $author$project$Graphics$MeshLoader$allMeshNames = _Utils_ap(
	A2($elm$core$List$map, $author$project$Types$Rail$toString, $author$project$Types$Rail$allRails),
	A2($elm$core$List$map, $author$project$Types$Pier$toString, $author$project$Types$Pier$allPiers));
var $author$project$Graphics$MeshLoader$buildMeshUri = function (name) {
	return './assets/' + (name + '.off');
};
var $elm$core$Result$andThen = F2(
	function (callback, result) {
		if (result.$ === 'Ok') {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return $elm$core$Result$Err(msg);
		}
	});
var $elm$http$Http$Internal$EmptyBody = {$: 'EmptyBody'};
var $elm$http$Http$emptyBody = $elm$http$Http$Internal$EmptyBody;
var $elm$http$Http$BadPayload = F2(
	function (a, b) {
		return {$: 'BadPayload', a: a, b: b};
	});
var $elm$http$Http$BadStatus = function (a) {
	return {$: 'BadStatus', a: a};
};
var $elm$http$Http$BadUrl = function (a) {
	return {$: 'BadUrl', a: a};
};
var $elm$http$Http$Internal$FormDataBody = function (a) {
	return {$: 'FormDataBody', a: a};
};
var $elm$http$Http$NetworkError = {$: 'NetworkError'};
var $elm$http$Http$Timeout = {$: 'Timeout'};
var $elm$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var $elm$http$Http$Internal$isStringBody = function (body) {
	if (body.$ === 'StringBody') {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $elm$http$Http$expectStringResponse = _Http_expectStringResponse;
var $elm$http$Http$expectString = $elm$http$Http$expectStringResponse(
	function (response) {
		return $elm$core$Result$Ok(response.body);
	});
var $elm$http$Http$Internal$Request = function (a) {
	return {$: 'Request', a: a};
};
var $elm$http$Http$request = $elm$http$Http$Internal$Request;
var $elm$http$Http$getString = function (url) {
	return $elm$http$Http$request(
		{body: $elm$http$Http$emptyBody, expect: $elm$http$Http$expectString, headers: _List_Nil, method: 'GET', timeout: $elm$core$Maybe$Nothing, url: url, withCredentials: false});
};
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 'Bad', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 'Good', a: a, b: b, c: c};
	});
var $elm$parser$Parser$Advanced$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var $elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _v0) {
		var parseA = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parseA(s0);
				if (_v1.$ === 'Bad') {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					var _v2 = callback(a);
					var parseB = _v2.a;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var p2 = _v3.a;
						var x = _v3.b;
						return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _v3.a;
						var b = _v3.b;
						var s2 = _v3.c;
						return A3($elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
					}
				}
			});
	});
var $elm$parser$Parser$andThen = $elm$parser$Parser$Advanced$andThen;
var $elm$parser$Parser$Advanced$map2 = F3(
	function (func, _v0, _v1) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v2 = parseA(s0);
				if (_v2.$ === 'Bad') {
					var p = _v2.a;
					var x = _v2.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _v2.a;
					var a = _v2.b;
					var s1 = _v2.c;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var p2 = _v3.a;
						var x = _v3.b;
						return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _v3.a;
						var b = _v3.b;
						var s2 = _v3.c;
						return A3(
							$elm$parser$Parser$Advanced$Good,
							p1 || p2,
							A2(func, a, b),
							s2);
					}
				}
			});
	});
var $elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$always, keepParser, ignoreParser);
	});
var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
var $elm$parser$Parser$ExpectingInt = {$: 'ExpectingInt'};
var $elm$parser$Parser$Advanced$consumeBase = _Parser_consumeBase;
var $elm$parser$Parser$Advanced$consumeBase16 = _Parser_consumeBase16;
var $elm$parser$Parser$Advanced$bumpOffset = F2(
	function (newOffset, s) {
		return {col: s.col + (newOffset - s.offset), context: s.context, indent: s.indent, offset: newOffset, row: s.row, src: s.src};
	});
var $elm$parser$Parser$Advanced$chompBase10 = _Parser_chompBase10;
var $elm$parser$Parser$Advanced$isAsciiCode = _Parser_isAsciiCode;
var $elm$parser$Parser$Advanced$consumeExp = F2(
	function (offset, src) {
		if (A3($elm$parser$Parser$Advanced$isAsciiCode, 101, offset, src) || A3($elm$parser$Parser$Advanced$isAsciiCode, 69, offset, src)) {
			var eOffset = offset + 1;
			var expOffset = (A3($elm$parser$Parser$Advanced$isAsciiCode, 43, eOffset, src) || A3($elm$parser$Parser$Advanced$isAsciiCode, 45, eOffset, src)) ? (eOffset + 1) : eOffset;
			var newOffset = A2($elm$parser$Parser$Advanced$chompBase10, expOffset, src);
			return _Utils_eq(expOffset, newOffset) ? (-newOffset) : newOffset;
		} else {
			return offset;
		}
	});
var $elm$parser$Parser$Advanced$consumeDotAndExp = F2(
	function (offset, src) {
		return A3($elm$parser$Parser$Advanced$isAsciiCode, 46, offset, src) ? A2(
			$elm$parser$Parser$Advanced$consumeExp,
			A2($elm$parser$Parser$Advanced$chompBase10, offset + 1, src),
			src) : A2($elm$parser$Parser$Advanced$consumeExp, offset, src);
	});
var $elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 'AddRight', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {col: col, contextStack: contextStack, problem: problem, row: row};
	});
var $elm$parser$Parser$Advanced$Empty = {$: 'Empty'};
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.row, s.col, x, s.context));
	});
var $elm$parser$Parser$Advanced$finalizeInt = F5(
	function (invalid, handler, startOffset, _v0, s) {
		var endOffset = _v0.a;
		var n = _v0.b;
		if (handler.$ === 'Err') {
			var x = handler.a;
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				true,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		} else {
			var toValue = handler.a;
			return _Utils_eq(startOffset, endOffset) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				_Utils_cmp(s.offset, startOffset) < 0,
				A2($elm$parser$Parser$Advanced$fromState, s, invalid)) : A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				toValue(n),
				A2($elm$parser$Parser$Advanced$bumpOffset, endOffset, s));
		}
	});
var $elm$parser$Parser$Advanced$fromInfo = F4(
	function (row, col, x, context) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, row, col, x, context));
	});
var $elm$core$String$toFloat = _String_toFloat;
var $elm$parser$Parser$Advanced$finalizeFloat = F6(
	function (invalid, expecting, intSettings, floatSettings, intPair, s) {
		var intOffset = intPair.a;
		var floatOffset = A2($elm$parser$Parser$Advanced$consumeDotAndExp, intOffset, s.src);
		if (floatOffset < 0) {
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				true,
				A4($elm$parser$Parser$Advanced$fromInfo, s.row, s.col - (floatOffset + s.offset), invalid, s.context));
		} else {
			if (_Utils_eq(s.offset, floatOffset)) {
				return A2(
					$elm$parser$Parser$Advanced$Bad,
					false,
					A2($elm$parser$Parser$Advanced$fromState, s, expecting));
			} else {
				if (_Utils_eq(intOffset, floatOffset)) {
					return A5($elm$parser$Parser$Advanced$finalizeInt, invalid, intSettings, s.offset, intPair, s);
				} else {
					if (floatSettings.$ === 'Err') {
						var x = floatSettings.a;
						return A2(
							$elm$parser$Parser$Advanced$Bad,
							true,
							A2($elm$parser$Parser$Advanced$fromState, s, invalid));
					} else {
						var toValue = floatSettings.a;
						var _v1 = $elm$core$String$toFloat(
							A3($elm$core$String$slice, s.offset, floatOffset, s.src));
						if (_v1.$ === 'Nothing') {
							return A2(
								$elm$parser$Parser$Advanced$Bad,
								true,
								A2($elm$parser$Parser$Advanced$fromState, s, invalid));
						} else {
							var n = _v1.a;
							return A3(
								$elm$parser$Parser$Advanced$Good,
								true,
								toValue(n),
								A2($elm$parser$Parser$Advanced$bumpOffset, floatOffset, s));
						}
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$number = function (c) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			if (A3($elm$parser$Parser$Advanced$isAsciiCode, 48, s.offset, s.src)) {
				var zeroOffset = s.offset + 1;
				var baseOffset = zeroOffset + 1;
				return A3($elm$parser$Parser$Advanced$isAsciiCode, 120, zeroOffset, s.src) ? A5(
					$elm$parser$Parser$Advanced$finalizeInt,
					c.invalid,
					c.hex,
					baseOffset,
					A2($elm$parser$Parser$Advanced$consumeBase16, baseOffset, s.src),
					s) : (A3($elm$parser$Parser$Advanced$isAsciiCode, 111, zeroOffset, s.src) ? A5(
					$elm$parser$Parser$Advanced$finalizeInt,
					c.invalid,
					c.octal,
					baseOffset,
					A3($elm$parser$Parser$Advanced$consumeBase, 8, baseOffset, s.src),
					s) : (A3($elm$parser$Parser$Advanced$isAsciiCode, 98, zeroOffset, s.src) ? A5(
					$elm$parser$Parser$Advanced$finalizeInt,
					c.invalid,
					c.binary,
					baseOffset,
					A3($elm$parser$Parser$Advanced$consumeBase, 2, baseOffset, s.src),
					s) : A6(
					$elm$parser$Parser$Advanced$finalizeFloat,
					c.invalid,
					c.expecting,
					c._int,
					c._float,
					_Utils_Tuple2(zeroOffset, 0),
					s)));
			} else {
				return A6(
					$elm$parser$Parser$Advanced$finalizeFloat,
					c.invalid,
					c.expecting,
					c._int,
					c._float,
					A3($elm$parser$Parser$Advanced$consumeBase, 10, s.offset, s.src),
					s);
			}
		});
};
var $elm$parser$Parser$Advanced$int = F2(
	function (expecting, invalid) {
		return $elm$parser$Parser$Advanced$number(
			{
				binary: $elm$core$Result$Err(invalid),
				expecting: expecting,
				_float: $elm$core$Result$Err(invalid),
				hex: $elm$core$Result$Err(invalid),
				_int: $elm$core$Result$Ok($elm$core$Basics$identity),
				invalid: invalid,
				octal: $elm$core$Result$Err(invalid)
			});
	});
var $elm$parser$Parser$int = A2($elm$parser$Parser$Advanced$int, $elm$parser$Parser$ExpectingInt, $elm$parser$Parser$ExpectingInt);
var $elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$apL, parseFunc, parseArg);
	});
var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
var $elm$parser$Parser$Problem = function (a) {
	return {$: 'Problem', a: a};
};
var $elm$parser$Parser$Advanced$problem = function (x) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var $elm$parser$Parser$problem = function (msg) {
	return $elm$parser$Parser$Advanced$problem(
		$elm$parser$Parser$Problem(msg));
};
var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var $elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.src);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					$elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.offset, offset) < 0,
					_Utils_Tuple0,
					{col: col, context: s0.context, indent: s0.indent, offset: offset, row: row, src: s0.src});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A5($elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.offset, s.row, s.col, s);
		});
};
var $elm$parser$Parser$Advanced$spaces = $elm$parser$Parser$Advanced$chompWhile(
	function (c) {
		return _Utils_eq(
			c,
			_Utils_chr(' ')) || (_Utils_eq(
			c,
			_Utils_chr('\n')) || _Utils_eq(
			c,
			_Utils_chr('\r')));
	});
var $elm$parser$Parser$spaces = $elm$parser$Parser$Advanced$spaces;
var $elm$parser$Parser$Advanced$succeed = function (a) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$Good, false, a, s);
		});
};
var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
var $elm$parser$Parser$chompWhile = $elm$parser$Parser$Advanced$chompWhile;
var $author$project$Graphics$OFF$whitespaces = $elm$parser$Parser$chompWhile(
	function (c) {
		return _Utils_eq(
			c,
			_Utils_chr(' ')) || _Utils_eq(
			c,
			_Utils_chr('\t'));
	});
var $author$project$Graphics$OFF$facetLine = A2(
	$elm$parser$Parser$andThen,
	function (count) {
		switch (count) {
			case 3:
				return A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$keeper,
							A2(
								$elm$parser$Parser$ignorer,
								$elm$parser$Parser$succeed(
									F3(
										function (a, b, c) {
											return _List_fromArray(
												[
													_Utils_Tuple3(a, b, c)
												]);
										})),
								$author$project$Graphics$OFF$whitespaces),
							A2($elm$parser$Parser$ignorer, $elm$parser$Parser$int, $author$project$Graphics$OFF$whitespaces)),
						A2($elm$parser$Parser$ignorer, $elm$parser$Parser$int, $author$project$Graphics$OFF$whitespaces)),
					A2($elm$parser$Parser$ignorer, $elm$parser$Parser$int, $elm$parser$Parser$spaces));
			case 4:
				return A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$keeper,
							A2(
								$elm$parser$Parser$keeper,
								A2(
									$elm$parser$Parser$ignorer,
									$elm$parser$Parser$succeed(
										F4(
											function (a, b, c, d) {
												return _List_fromArray(
													[
														_Utils_Tuple3(a, b, c),
														_Utils_Tuple3(a, c, d)
													]);
											})),
									$author$project$Graphics$OFF$whitespaces),
								A2($elm$parser$Parser$ignorer, $elm$parser$Parser$int, $author$project$Graphics$OFF$whitespaces)),
							A2($elm$parser$Parser$ignorer, $elm$parser$Parser$int, $author$project$Graphics$OFF$whitespaces)),
						A2($elm$parser$Parser$ignorer, $elm$parser$Parser$int, $elm$parser$Parser$spaces)),
					A2($elm$parser$Parser$ignorer, $elm$parser$Parser$int, $elm$parser$Parser$spaces));
			default:
				return $elm$parser$Parser$problem(
					'required 3 or 4 but got ' + $elm$core$String$fromInt(count));
		}
	},
	$elm$parser$Parser$int);
var $elm$parser$Parser$Advanced$map = F2(
	function (func, _v0) {
		var parse = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var p = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p,
						func(a),
						s1);
				} else {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				}
			});
	});
var $elm$parser$Parser$map = $elm$parser$Parser$Advanced$map;
var $elm$parser$Parser$Done = function (a) {
	return {$: 'Done', a: a};
};
var $elm$parser$Parser$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var $elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _v0 = callback(state);
			var parse = _v0.a;
			var _v1 = parse(s0);
			if (_v1.$ === 'Good') {
				var p1 = _v1.a;
				var step = _v1.b;
				var s1 = _v1.c;
				if (step.$ === 'Loop') {
					var newState = step.a;
					var $temp$p = p || p1,
						$temp$state = newState,
						$temp$callback = callback,
						$temp$s0 = s1;
					p = $temp$p;
					state = $temp$state;
					callback = $temp$callback;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = step.a;
					return A3($elm$parser$Parser$Advanced$Good, p || p1, result, s1);
				}
			} else {
				var p1 = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p || p1, x);
			}
		}
	});
var $elm$parser$Parser$Advanced$loop = F2(
	function (state, callback) {
		return $elm$parser$Parser$Advanced$Parser(
			function (s) {
				return A4($elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
			});
	});
var $elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 'Done', a: a};
};
var $elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var $elm$parser$Parser$toAdvancedStep = function (step) {
	if (step.$ === 'Loop') {
		var s = step.a;
		return $elm$parser$Parser$Advanced$Loop(s);
	} else {
		var a = step.a;
		return $elm$parser$Parser$Advanced$Done(a);
	}
};
var $elm$parser$Parser$loop = F2(
	function (state, callback) {
		return A2(
			$elm$parser$Parser$Advanced$loop,
			state,
			function (s) {
				return A2(
					$elm$parser$Parser$map,
					$elm$parser$Parser$toAdvancedStep,
					callback(s));
			});
	});
var $author$project$Graphics$OFF$replicate = F2(
	function (n, p) {
		return A2(
			$elm$parser$Parser$loop,
			_Utils_Tuple2(0, _List_Nil),
			function (_v0) {
				var i = _v0.a;
				var revAccum = _v0.b;
				return (_Utils_cmp(i, n) < 0) ? A2(
					$elm$parser$Parser$map,
					function (a) {
						return $elm$parser$Parser$Loop(
							_Utils_Tuple2(
								i + 1,
								A2($elm$core$List$cons, a, revAccum)));
					},
					p) : $elm$parser$Parser$succeed(
					$elm$parser$Parser$Done(
						$elm$core$List$reverse(revAccum)));
			});
	});
var $author$project$Graphics$OFF$facets = function (n) {
	return A2(
		$elm$parser$Parser$map,
		$elm$core$List$concat,
		A2($author$project$Graphics$OFF$replicate, n, $author$project$Graphics$OFF$facetLine));
};
var $elm$parser$Parser$ExpectingKeyword = function (a) {
	return {$: 'ExpectingKeyword', a: a};
};
var $elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 'Token', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var $elm$core$Basics$not = _Basics_not;
var $elm$parser$Parser$Advanced$keyword = function (_v0) {
	var kwd = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(kwd);
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v1 = A5($elm$parser$Parser$Advanced$isSubString, kwd, s.offset, s.row, s.col, s.src);
			var newOffset = _v1.a;
			var newRow = _v1.b;
			var newCol = _v1.c;
			return (_Utils_eq(newOffset, -1) || (0 <= A3(
				$elm$parser$Parser$Advanced$isSubChar,
				function (c) {
					return $elm$core$Char$isAlphaNum(c) || _Utils_eq(
						c,
						_Utils_chr('_'));
				},
				newOffset,
				s.src))) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
				$elm$parser$Parser$Advanced$Good,
				progress,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var $elm$parser$Parser$keyword = function (kwd) {
	return $elm$parser$Parser$Advanced$keyword(
		A2(
			$elm$parser$Parser$Advanced$Token,
			kwd,
			$elm$parser$Parser$ExpectingKeyword(kwd)));
};
var $author$project$Graphics$OFF$header = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$ignorer,
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(
						F3(
							function (nv, nf, ne) {
								return _Utils_Tuple3(nv, nf, ne);
							})),
					$elm$parser$Parser$keyword('OFF')),
				$elm$parser$Parser$spaces),
			A2($elm$parser$Parser$ignorer, $elm$parser$Parser$int, $elm$parser$Parser$spaces)),
		A2($elm$parser$Parser$ignorer, $elm$parser$Parser$int, $elm$parser$Parser$spaces)),
	A2($elm$parser$Parser$ignorer, $elm$parser$Parser$int, $elm$parser$Parser$spaces));
var $elm$parser$Parser$ExpectingFloat = {$: 'ExpectingFloat'};
var $elm$parser$Parser$Advanced$float = F2(
	function (expecting, invalid) {
		return $elm$parser$Parser$Advanced$number(
			{
				binary: $elm$core$Result$Err(invalid),
				expecting: expecting,
				_float: $elm$core$Result$Ok($elm$core$Basics$identity),
				hex: $elm$core$Result$Err(invalid),
				_int: $elm$core$Result$Ok($elm$core$Basics$toFloat),
				invalid: invalid,
				octal: $elm$core$Result$Err(invalid)
			});
	});
var $elm$parser$Parser$float = A2($elm$parser$Parser$Advanced$float, $elm$parser$Parser$ExpectingFloat, $elm$parser$Parser$ExpectingFloat);
var $elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 'Append', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2($elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a.a;
				var remainingParsers = parsers.b;
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var step = _v1;
					return step;
				} else {
					var step = _v1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2($elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$oneOfHelp, s, $elm$parser$Parser$Advanced$Empty, parsers);
		});
};
var $elm$parser$Parser$oneOf = $elm$parser$Parser$Advanced$oneOf;
var $elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 'ExpectingSymbol', a: a};
};
var $elm$parser$Parser$Advanced$token = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(str);
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v1 = A5($elm$parser$Parser$Advanced$isSubString, str, s.offset, s.row, s.col, s.src);
			var newOffset = _v1.a;
			var newRow = _v1.b;
			var newCol = _v1.c;
			return _Utils_eq(newOffset, -1) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
				$elm$parser$Parser$Advanced$Good,
				progress,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var $elm$parser$Parser$Advanced$symbol = $elm$parser$Parser$Advanced$token;
var $elm$parser$Parser$symbol = function (str) {
	return $elm$parser$Parser$Advanced$symbol(
		A2(
			$elm$parser$Parser$Advanced$Token,
			str,
			$elm$parser$Parser$ExpectingSymbol(str)));
};
var $author$project$Graphics$OFF$float = $elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed($elm$core$Basics$negate),
				$elm$parser$Parser$symbol('-')),
			$elm$parser$Parser$float),
			$elm$parser$Parser$float
		]));
var $author$project$Graphics$OFF$vertexLine = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			$elm$parser$Parser$succeed($elm_explorations$linear_algebra$Math$Vector3$vec3),
			A2($elm$parser$Parser$ignorer, $author$project$Graphics$OFF$float, $author$project$Graphics$OFF$whitespaces)),
		A2($elm$parser$Parser$ignorer, $author$project$Graphics$OFF$float, $author$project$Graphics$OFF$whitespaces)),
	A2($elm$parser$Parser$ignorer, $author$project$Graphics$OFF$float, $elm$parser$Parser$spaces));
var $author$project$Graphics$OFF$vertices = function (n) {
	return A2($author$project$Graphics$OFF$replicate, n, $author$project$Graphics$OFF$vertexLine);
};
var $author$project$Graphics$OFF$parser = A2(
	$elm$parser$Parser$andThen,
	function (_v0) {
		var nv = _v0.a;
		var nf = _v0.b;
		return A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$keeper,
				$elm$parser$Parser$succeed(
					F2(
						function (vs, fs) {
							return {indices: fs, vertices: vs};
						})),
				$author$project$Graphics$OFF$vertices(nv)),
			$author$project$Graphics$OFF$facets(nf));
	},
	$author$project$Graphics$OFF$header);
var $elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {col: col, problem: problem, row: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.row, p.col, p.problem);
};
var $elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 'Empty':
					return list;
				case 'AddRight':
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var $elm$parser$Parser$Advanced$run = F2(
	function (_v0, src) {
		var parse = _v0.a;
		var _v1 = parse(
			{col: 1, context: _List_Nil, indent: 1, offset: 0, row: 1, src: src});
		if (_v1.$ === 'Good') {
			var value = _v1.b;
			return $elm$core$Result$Ok(value);
		} else {
			var bag = _v1.b;
			return $elm$core$Result$Err(
				A2($elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var $elm$parser$Parser$run = F2(
	function (parser, source) {
		var _v0 = A2($elm$parser$Parser$Advanced$run, parser, source);
		if (_v0.$ === 'Ok') {
			var a = _v0.a;
			return $elm$core$Result$Ok(a);
		} else {
			var problems = _v0.a;
			return $elm$core$Result$Err(
				A2($elm$core$List$map, $elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var $author$project$Graphics$OFF$parse = function (input) {
	return A2(
		$elm$core$Result$mapError,
		A2(
			$elm$core$Basics$composeR,
			$elm$core$List$map(
				function (deadend) {
					return 'dead end at (line, col) = (' + ($elm$core$String$fromInt(deadend.row) + (', ' + ($elm$core$String$fromInt(deadend.col) + ')')));
				}),
			$elm$core$String$join('\n')),
		A2($elm$parser$Parser$run, $author$project$Graphics$OFF$parser, input));
};
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$core$Task$onError = _Scheduler_onError;
var $elm$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2(
					$elm$core$Task$onError,
					A2(
						$elm$core$Basics$composeL,
						A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
						$elm$core$Result$Err),
					A2(
						$elm$core$Task$andThen,
						A2(
							$elm$core$Basics$composeL,
							A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
							$elm$core$Result$Ok),
						task))));
	});
var $elm$http$Http$toTask = function (_v0) {
	var request_ = _v0.a;
	return A2(_Http_toTask, request_, $elm$core$Maybe$Nothing);
};
var $elm$http$Http$send = F2(
	function (resultToMessage, request_) {
		return A2(
			$elm$core$Task$attempt,
			resultToMessage,
			$elm$http$Http$toTask(request_));
	});
var $author$project$Graphics$OFF$load = F2(
	function (url, msg) {
		return A2(
			$elm$http$Http$send,
			function (result) {
				return msg(
					A2(
						$elm$core$Result$andThen,
						$author$project$Graphics$OFF$parse,
						A2(
							$elm$core$Result$mapError,
							function (_v0) {
								return 'HTTP Error';
							},
							result)));
			},
			$elm$http$Http$getString(url));
	});
var $elm$core$Platform$Cmd$map = _Platform_map;
var $author$project$Graphics$MeshLoader$loadMeshCmd = function (f) {
	return A2(
		$elm$core$Platform$Cmd$map,
		f,
		$elm$core$Platform$Cmd$batch(
			A2(
				$elm$core$List$map,
				function (name) {
					return A2(
						$author$project$Graphics$OFF$load,
						$author$project$Graphics$MeshLoader$buildMeshUri(name),
						$author$project$Graphics$MeshLoader$LoadMesh(name));
				},
				$author$project$Graphics$MeshLoader$allMeshNames)));
};
var $author$project$Main$init = function (flags) {
	var execResult = $author$project$Forth$execute(flags.program);
	return _Utils_Tuple2(
		{
			execResult: execResult,
			isSplitBarDragging: false,
			meshes: $author$project$Graphics$MeshLoader$init,
			orbitControl: A4(
				$author$project$Graphics$OrbitControl$init,
				$elm$core$Basics$degrees(0),
				$elm$core$Basics$degrees(90),
				10,
				A3($elm_explorations$linear_algebra$Math$Vector3$vec3, 1800, 2240, 0)),
			program: flags.program,
			showEditor: false,
			showRailCount: false,
			splitBarPosition: 300.0,
			viewport: {height: 0, width: 0}
		},
		$elm$core$Platform$Cmd$batch(
			_List_fromArray(
				[
					A2($elm$core$Task$perform, $author$project$Main$SetViewport, $elm$browser$Browser$Dom$getViewport),
					$author$project$Graphics$MeshLoader$loadMeshCmd($author$project$Main$LoadMesh)
				])));
};
var $author$project$Main$Resize = F2(
	function (a, b) {
		return {$: 'Resize', a: a, b: b};
	});
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$browser$Browser$Events$Window = {$: 'Window'};
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 'MySub', a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {pids: pids, subs: subs};
	});
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (node.$ === 'Document') {
		return 'd_';
	} else {
		return 'w_';
	}
};
var $elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			$elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {event: event, key: key};
	});
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (node.$ === 'Document') {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			$elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						$elm$core$Platform$sendToSelf,
						router,
						A2($elm$browser$Browser$Events$Event, key, event));
				}));
	});
var $elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _v6) {
				var deads = _v6.a;
				var lives = _v6.b;
				var news = _v6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						$elm$core$List$cons,
						A3($elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_v4, pid, _v5) {
				var deads = _v5.a;
				var lives = _v5.b;
				var news = _v5.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _v2, _v3) {
				var deads = _v3.a;
				var lives = _v3.b;
				var news = _v3.c;
				return _Utils_Tuple3(
					deads,
					A3($elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2($elm$core$List$map, $elm$browser$Browser$Events$addKey, subs);
		var _v0 = A6(
			$elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.pids,
			$elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, $elm$core$Dict$empty, _List_Nil));
		var deadPids = _v0.a;
		var livePids = _v0.b;
		var makeNewPids = _v0.c;
		return A2(
			$elm$core$Task$andThen,
			function (pids) {
				return $elm$core$Task$succeed(
					A2(
						$elm$browser$Browser$Events$State,
						newSubs,
						A2(
							$elm$core$Dict$union,
							livePids,
							$elm$core$Dict$fromList(pids))));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$sequence(makeNewPids);
				},
				$elm$core$Task$sequence(
					A2($elm$core$List$map, $elm$core$Process$kill, deadPids))));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _v0, state) {
		var key = _v0.key;
		var event = _v0.event;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.subs);
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Platform$sendToApp(router),
					messages)));
	});
var $elm$browser$Browser$Events$subMap = F2(
	function (func, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var decoder = _v0.c;
		return A3(
			$elm$browser$Browser$Events$MySub,
			node,
			name,
			A2($elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager($elm$browser$Browser$Events$init, $elm$browser$Browser$Events$onEffects, $elm$browser$Browser$Events$onSelfMsg, 0, $elm$browser$Browser$Events$subMap);
var $elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var $elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return $elm$browser$Browser$Events$subscription(
			A3($elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var $elm$browser$Browser$Events$onResize = function (func) {
	return A3(
		$elm$browser$Browser$Events$on,
		$elm$browser$Browser$Events$Window,
		'resize',
		A2(
			$elm$json$Json$Decode$field,
			'target',
			A3(
				$elm$json$Json$Decode$map2,
				func,
				A2($elm$json$Json$Decode$field, 'innerWidth', $elm$json$Json$Decode$int),
				A2($elm$json$Json$Decode$field, 'innerHeight', $elm$json$Json$Decode$int))));
};
var $author$project$Main$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				$elm$browser$Browser$Events$onResize(
				F2(
					function (w, h) {
						return A2($author$project$Main$Resize, w, h);
					}))
			]));
};
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Graphics$OrbitControlImpl$updateViewport = F3(
	function (_v0, w, h) {
		var model = _v0.a;
		return $author$project$Graphics$OrbitControlImpl$Model(
			_Utils_update(
				model,
				{viewportHeight: h, viewportWidth: w}));
	});
var $author$project$Graphics$OrbitControl$updateViewport = F3(
	function (w, h, _v0) {
		var model = _v0.a;
		return $author$project$Graphics$OrbitControl$Model(
			_Utils_update(
				model,
				{
					ocImpl: A3($author$project$Graphics$OrbitControlImpl$updateViewport, model.ocImpl, w, h)
				}));
	});
var $author$project$Main$recalculateOC = function (model) {
	var width = model.showEditor ? ((model.viewport.width - model.splitBarPosition) - 4) : model.viewport.width;
	return _Utils_update(
		model,
		{
			orbitControl: A3($author$project$Graphics$OrbitControl$updateViewport, width, model.viewport.height, model.orbitControl)
		});
};
var $author$project$Storage$save = _Platform_outgoingPort('save', $elm$json$Json$Encode$string);
var $author$project$PointerEvent$setPointerCaptureImpl = _Platform_outgoingPort('setPointerCaptureImpl', $elm$core$Basics$identity);
var $author$project$PointerEvent$setPointerCapture = function (_v0) {
	var event = _v0.event;
	return $author$project$PointerEvent$setPointerCaptureImpl(event);
};
var $elm_explorations$linear_algebra$Math$Vector3$cross = _MJS_v3cross;
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{nodeList: nodeList, nodeListSize: nodeListSize, tail: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $elm$core$Result$fromMaybe = F2(
	function (err, maybe) {
		if (maybe.$ === 'Just') {
			var v = maybe.a;
			return $elm$core$Result$Ok(v);
		} else {
			return $elm$core$Result$Err(err);
		}
	});
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_v0.$ === 'SubTree') {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $elm$core$Maybe$map3 = F4(
	function (func, ma, mb, mc) {
		if (ma.$ === 'Nothing') {
			return $elm$core$Maybe$Nothing;
		} else {
			var a = ma.a;
			if (mb.$ === 'Nothing') {
				return $elm$core$Maybe$Nothing;
			} else {
				var b = mb.a;
				if (mc.$ === 'Nothing') {
					return $elm$core$Maybe$Nothing;
				} else {
					var c = mc.a;
					return $elm$core$Maybe$Just(
						A3(func, a, b, c));
				}
			}
		}
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $author$project$Graphics$MeshLoader$sequence = function (list) {
	var rec = F2(
		function (ls, accum) {
			if (!ls.b) {
				return $elm$core$Result$Ok(
					$elm$core$List$reverse(accum));
			} else {
				var x = ls.a;
				var xs = ls.b;
				return A2(
					$elm$core$Result$andThen,
					function (x1) {
						return A2(
							rec,
							xs,
							A2($elm$core$List$cons, x1, accum));
					},
					x);
			}
		});
	return A2(rec, list, _List_Nil);
};
var $elm_explorations$linear_algebra$Math$Vector3$sub = _MJS_v3sub;
var $author$project$Graphics$MeshLoader$convertMesh = function (_v0) {
	var vertices = _v0.vertices;
	var indices = _v0.indices;
	var verticesArray = $elm$core$Array$fromList(vertices);
	var calcNormal = F3(
		function (v0, v1, v2) {
			return $elm_explorations$linear_algebra$Math$Vector3$normalize(
				A2(
					$elm_explorations$linear_algebra$Math$Vector3$cross,
					A2($elm_explorations$linear_algebra$Math$Vector3$sub, v1, v0),
					A2($elm_explorations$linear_algebra$Math$Vector3$sub, v2, v0)));
		});
	var calcTriangle = F2(
		function (i, _v1) {
			var a = _v1.a;
			var b = _v1.b;
			var c = _v1.c;
			var errMsg = 'invalid face: (' + (A2(
				$elm$core$String$join,
				', ',
				A2(
					$elm$core$List$map,
					$elm$core$String$fromInt,
					_List_fromArray(
						[a, b, c]))) + ')');
			return A2(
				$elm$core$Result$fromMaybe,
				errMsg,
				A4(
					$elm$core$Maybe$map3,
					F3(
						function (x, y, z) {
							var normal = A3(calcNormal, x, y, z);
							return _Utils_Tuple2(
								_List_fromArray(
									[
										{normal: normal, position: x},
										{normal: normal, position: y},
										{normal: normal, position: z}
									]),
								_Utils_Tuple3(3 * i, (3 * i) + 1, (3 * i) + 2));
						}),
					A2($elm$core$Array$get, a, verticesArray),
					A2($elm$core$Array$get, b, verticesArray),
					A2($elm$core$Array$get, c, verticesArray)));
		});
	return A2(
		$elm$core$Result$map,
		function (vs) {
			return _Utils_Tuple2(
				A2($elm$core$List$concatMap, $elm$core$Tuple$first, vs),
				A2($elm$core$List$map, $elm$core$Tuple$second, vs));
		},
		$author$project$Graphics$MeshLoader$sequence(
			A2($elm$core$List$indexedMap, calcTriangle, indices)));
};
var $elm_explorations$webgl$WebGL$MeshIndexed3 = F3(
	function (a, b, c) {
		return {$: 'MeshIndexed3', a: a, b: b, c: c};
	});
var $elm_explorations$webgl$WebGL$indexedTriangles = $elm_explorations$webgl$WebGL$MeshIndexed3(
	{elemSize: 1, indexSize: 3, mode: 4});
var $author$project$Graphics$MeshLoader$update = F2(
	function (msg, model) {
		var name = msg.a;
		var meshOrErr = msg.b;
		if (meshOrErr.$ === 'Err') {
			var e = meshOrErr.a;
			return _Utils_update(
				model,
				{
					errors: A2($elm$core$List$cons, e, model.errors)
				});
		} else {
			var mesh = meshOrErr.a;
			var _v2 = $author$project$Graphics$MeshLoader$convertMesh(mesh);
			if (_v2.$ === 'Err') {
				var e = _v2.a;
				return _Utils_update(
					model,
					{
						errors: A2($elm$core$List$cons, e, model.errors)
					});
			} else {
				var _v3 = _v2.a;
				var vertices = _v3.a;
				var indices = _v3.b;
				var updatedMeshes = A2(
					$elm$core$Dict$union,
					model.meshes,
					$elm$core$Dict$fromList(
						_List_fromArray(
							[
								_Utils_Tuple2(
								name,
								A2($elm_explorations$webgl$WebGL$indexedTriangles, vertices, indices))
							])));
				return _Utils_update(
					model,
					{meshes: updatedMeshes});
			}
		}
	});
var $author$project$Graphics$OrbitControl$Panning = {$: 'Panning'};
var $author$project$Graphics$OrbitControl$Rotating = {$: 'Rotating'};
var $author$project$Graphics$OrbitControl$updatePointerDown = F4(
	function (_v0, pointerId, pos, shiftKey) {
		var model = _v0.a;
		var next = shiftKey ? $author$project$Graphics$OrbitControl$Panning : $author$project$Graphics$OrbitControl$Rotating;
		return $author$project$Graphics$OrbitControl$Model(
			_Utils_update(
				model,
				{
					draggingState: $elm$core$Maybe$Just(next),
					points: A3($elm$core$Dict$insert, pointerId, pos, model.points)
				}));
	});
var $elm_explorations$linear_algebra$Math$Vector3$scale = _MJS_v3scale;
var $author$project$Graphics$OrbitControlImpl$doPanning = F3(
	function (_v0, dx, dy) {
		var model = _v0.a;
		var sb = $elm$core$Basics$sin(model.altitude);
		var sa = $elm$core$Basics$sin(model.azimuth);
		var os = model.scale;
		var cb = $elm$core$Basics$cos(model.altitude);
		var ca = $elm$core$Basics$cos(model.azimuth);
		var tanx = A2(
			$elm_explorations$linear_algebra$Math$Vector3$scale,
			os * dx,
			A3($elm_explorations$linear_algebra$Math$Vector3$vec3, sa, -ca, 0));
		var tany = A2(
			$elm_explorations$linear_algebra$Math$Vector3$scale,
			os * (-dy),
			A3($elm_explorations$linear_algebra$Math$Vector3$vec3, ca * sb, sa * sb, -cb));
		var trans = A2(
			$elm_explorations$linear_algebra$Math$Vector3$add,
			model.target,
			A2($elm_explorations$linear_algebra$Math$Vector3$add, tanx, tany));
		return $author$project$Graphics$OrbitControlImpl$Model(
			_Utils_update(
				model,
				{target: trans}));
	});
var $author$project$Graphics$OrbitControl$doPanning = F3(
	function (ocImpl, _v0, _v1) {
		var newX = _v0.a;
		var newY = _v0.b;
		var oldX = _v1.a;
		var oldY = _v1.b;
		return A3($author$project$Graphics$OrbitControlImpl$doPanning, ocImpl, newX - oldX, newY - oldY);
	});
var $author$project$Graphics$OrbitControlImpl$doRotation = F3(
	function (_v0, radX, radY) {
		var model = _v0.a;
		var azimuth = model.azimuth + radX;
		var altitude = A3(
			$elm$core$Basics$clamp,
			$elm$core$Basics$degrees(0),
			$elm$core$Basics$degrees(90),
			model.altitude + radY);
		return $author$project$Graphics$OrbitControlImpl$Model(
			_Utils_update(
				model,
				{altitude: altitude, azimuth: azimuth}));
	});
var $author$project$Graphics$OrbitControl$doRotation = F3(
	function (ocImpl, _v0, _v1) {
		var newX = _v0.a;
		var newY = _v0.b;
		var oldX = _v1.a;
		var oldY = _v1.b;
		var radY = (-(newY - oldY)) * $elm$core$Basics$degrees(0.3);
		var radX = (-(newX - oldX)) * $elm$core$Basics$degrees(0.3);
		return A3($author$project$Graphics$OrbitControlImpl$doRotation, ocImpl, radX, radY);
	});
var $elm$core$Basics$pow = _Basics_pow;
var $author$project$Graphics$OrbitControl$distance = F2(
	function (_v0, _v1) {
		var px = _v0.a;
		var py = _v0.b;
		var qx = _v1.a;
		var qy = _v1.b;
		return $elm$core$Basics$sqrt(
			A2($elm$core$Basics$pow, px - qx, 2) + A2($elm$core$Basics$pow, py - qy, 2));
	});
var $author$project$Graphics$OrbitControlImpl$doScaleMult = F2(
	function (_v0, mult) {
		var model = _v0.a;
		return $author$project$Graphics$OrbitControlImpl$Model(
			_Utils_update(
				model,
				{
					scale: A3($elm$core$Basics$clamp, 0.1, 100, model.scale * mult)
				}));
	});
var $author$project$Graphics$OrbitControl$sub2 = F2(
	function (_v0, _v1) {
		var px = _v0.a;
		var py = _v0.b;
		var qx = _v1.a;
		var qy = _v1.b;
		return _Utils_Tuple2((px - qx) / 2, (py - qy) / 2);
	});
var $author$project$Graphics$OrbitControl$doTwoPointersMove = F2(
	function (ocImpl, _v0) {
		var oldPoint = _v0.oldPoint;
		var newPoint = _v0.newPoint;
		var otherPoint = _v0.otherPoint;
		var scale = A2($author$project$Graphics$OrbitControl$distance, oldPoint, otherPoint) / A2($author$project$Graphics$OrbitControl$distance, newPoint, otherPoint);
		var _v1 = A2($author$project$Graphics$OrbitControl$sub2, newPoint, oldPoint);
		var dx = _v1.a;
		var dy = _v1.b;
		return A2(
			$author$project$Graphics$OrbitControlImpl$doScaleMult,
			A3($author$project$Graphics$OrbitControlImpl$doPanning, ocImpl, dx, dy),
			scale);
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Dict$partition = F2(
	function (isGood, dict) {
		var add = F3(
			function (key, value, _v0) {
				var t1 = _v0.a;
				var t2 = _v0.b;
				return A2(isGood, key, value) ? _Utils_Tuple2(
					A3($elm$core$Dict$insert, key, value, t1),
					t2) : _Utils_Tuple2(
					t1,
					A3($elm$core$Dict$insert, key, value, t2));
			});
		return A3(
			$elm$core$Dict$foldl,
			add,
			_Utils_Tuple2($elm$core$Dict$empty, $elm$core$Dict$empty),
			dict);
	});
var $author$project$Graphics$OrbitControl$getOtherElement = function (key) {
	return A2(
		$elm$core$Basics$composeR,
		$elm$core$Dict$partition(
			F2(
				function (k, _v0) {
					return !_Utils_eq(k, key);
				})),
		A2(
			$elm$core$Basics$composeR,
			$elm$core$Tuple$first,
			A2($elm$core$Basics$composeR, $elm$core$Dict$values, $elm$core$List$head)));
};
var $elm$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var left = dict.d;
				var right = dict.e;
				var $temp$n = A2($elm$core$Dict$sizeHelp, n + 1, right),
					$temp$dict = left;
				n = $temp$n;
				dict = $temp$dict;
				continue sizeHelp;
			}
		}
	});
var $elm$core$Dict$size = function (dict) {
	return A2($elm$core$Dict$sizeHelp, 0, dict);
};
var $author$project$Graphics$OrbitControl$updatePointerMove = F3(
	function (_v0, pointerId, newPoint) {
		var model = _v0.a;
		var updatedPoints = A3($elm$core$Dict$insert, pointerId, newPoint, model.points);
		var _v1 = _Utils_Tuple3(
			$elm$core$Dict$size(model.points),
			model.draggingState,
			A2($elm$core$Dict$get, pointerId, model.points));
		_v1$3:
		while (true) {
			if (_v1.c.$ === 'Just') {
				switch (_v1.a) {
					case 1:
						if (_v1.b.$ === 'Just') {
							if (_v1.b.a.$ === 'Rotating') {
								var _v2 = _v1.b.a;
								var oldPoint = _v1.c.a;
								return $author$project$Graphics$OrbitControl$Model(
									_Utils_update(
										model,
										{
											ocImpl: A3($author$project$Graphics$OrbitControl$doRotation, model.ocImpl, newPoint, oldPoint),
											points: updatedPoints
										}));
							} else {
								var _v3 = _v1.b.a;
								var oldPoint = _v1.c.a;
								return $author$project$Graphics$OrbitControl$Model(
									_Utils_update(
										model,
										{
											ocImpl: A3($author$project$Graphics$OrbitControl$doPanning, model.ocImpl, newPoint, oldPoint),
											points: updatedPoints
										}));
							}
						} else {
							break _v1$3;
						}
					case 2:
						var oldPoint = _v1.c.a;
						var _v4 = A2($author$project$Graphics$OrbitControl$getOtherElement, pointerId, model.points);
						if (_v4.$ === 'Just') {
							var otherPoint = _v4.a;
							return $author$project$Graphics$OrbitControl$Model(
								_Utils_update(
									model,
									{
										ocImpl: A2(
											$author$project$Graphics$OrbitControl$doTwoPointersMove,
											model.ocImpl,
											{newPoint: newPoint, oldPoint: oldPoint, otherPoint: otherPoint}),
										points: updatedPoints
									}));
						} else {
							return $author$project$Graphics$OrbitControl$Model(
								_Utils_update(
									model,
									{points: updatedPoints}));
						}
					default:
						break _v1$3;
				}
			} else {
				break _v1$3;
			}
		}
		return $author$project$Graphics$OrbitControl$Model(
			_Utils_update(
				model,
				{points: updatedPoints}));
	});
var $author$project$Graphics$OrbitControl$updatePointerUp = F2(
	function (_v0, pointerId) {
		var model = _v0.a;
		return $author$project$Graphics$OrbitControl$Model(
			_Utils_update(
				model,
				{
					draggingState: $elm$core$Maybe$Nothing,
					points: A2($elm$core$Dict$remove, pointerId, model.points)
				}));
	});
var $author$project$Main$updateViewport = F3(
	function (w, h, model) {
		var splitBarPosition = A3($elm$core$Basics$clamp, 10, w - 10, w * 0.3);
		return $author$project$Main$recalculateOC(
			_Utils_update(
				model,
				{
					splitBarPosition: splitBarPosition,
					viewport: {height: h, width: w}
				}));
	});
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $author$project$Graphics$OrbitControl$doDolly = F3(
	function (ocImpl, dx, dy) {
		return (_Utils_cmp(
			$elm$core$Basics$abs(dx),
			$elm$core$Basics$abs(dy)) > -1) ? ocImpl : A2(
			$author$project$Graphics$OrbitControlImpl$doScaleMult,
			ocImpl,
			A2($elm$core$Basics$pow, 1.002, dy));
	});
var $author$project$Graphics$OrbitControl$updateWheel = F2(
	function (_v0, _v1) {
		var model = _v0.a;
		var dx = _v1.a;
		var dy = _v1.b;
		return $author$project$Graphics$OrbitControl$Model(
			_Utils_update(
				model,
				{
					ocImpl: A3($author$project$Graphics$OrbitControl$doDolly, model.ocImpl, dx, dy)
				}));
	});
var $author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'LoadMesh':
				var meshMsg = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							meshes: A2($author$project$Graphics$MeshLoader$update, meshMsg, model.meshes)
						}),
					$elm$core$Platform$Cmd$none);
			case 'PointerDown':
				var event = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							orbitControl: A4(
								$author$project$Graphics$OrbitControl$updatePointerDown,
								model.orbitControl,
								event.pointerId,
								_Utils_Tuple2(event.clientX, event.clientY),
								event.shiftKey)
						}),
					$author$project$PointerEvent$setPointerCapture(event));
			case 'PointerMove':
				var event = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							orbitControl: A3(
								$author$project$Graphics$OrbitControl$updatePointerMove,
								model.orbitControl,
								event.pointerId,
								_Utils_Tuple2(event.clientX, event.clientY))
						}),
					$elm$core$Platform$Cmd$none);
			case 'PointerUp':
				var event = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							orbitControl: A2($author$project$Graphics$OrbitControl$updatePointerUp, model.orbitControl, event.pointerId)
						}),
					$elm$core$Platform$Cmd$none);
			case 'Wheel':
				var pos = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							orbitControl: A2($author$project$Graphics$OrbitControl$updateWheel, model.orbitControl, pos)
						}),
					$elm$core$Platform$Cmd$none);
			case 'ContextMenu':
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			case 'SetViewport':
				var viewport = msg.a;
				return _Utils_Tuple2(
					A3($author$project$Main$updateViewport, viewport.viewport.width, viewport.viewport.height, model),
					$elm$core$Platform$Cmd$none);
			case 'Resize':
				var width = msg.a;
				var height = msg.b;
				return _Utils_Tuple2(
					A3($author$project$Main$updateViewport, width, height, model),
					$elm$core$Platform$Cmd$none);
			case 'UpdateScript':
				var program = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							execResult: $author$project$Forth$execute(program),
							program: program
						}),
					$author$project$Storage$save(program));
			case 'SplitBarBeginMove':
				var event = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{isSplitBarDragging: true}),
					$author$project$PointerEvent$setPointerCapture(event));
			case 'SplitBarUpdateMove':
				var event = msg.a;
				if (model.isSplitBarDragging) {
					var splitBarPosition = A3($elm$core$Basics$clamp, 100, model.viewport.width - 100, event.clientX);
					return _Utils_Tuple2(
						$author$project$Main$recalculateOC(
							_Utils_update(
								model,
								{splitBarPosition: splitBarPosition})),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 'SplitBarEndMove':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{isSplitBarDragging: false}),
					$elm$core$Platform$Cmd$none);
			case 'ToggleShowEditor':
				return _Utils_Tuple2(
					$author$project$Main$recalculateOC(
						_Utils_update(
							model,
							{showEditor: !model.showEditor})),
					$elm$core$Platform$Cmd$none);
			case 'ToggleShowRailCount':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{showRailCount: !model.showRailCount}),
					$elm$core$Platform$Cmd$none);
			default:
				var newOC = A4(
					$author$project$Graphics$OrbitControl$init,
					$elm$core$Basics$degrees(0),
					$elm$core$Basics$degrees(90),
					1,
					A3($elm_explorations$linear_algebra$Math$Vector3$vec3, 0, 0, 0));
				return _Utils_Tuple2(
					$author$project$Main$recalculateOC(
						_Utils_update(
							model,
							{orbitControl: newOC})),
					$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Main$main = $elm$browser$Browser$document(
	{init: $author$project$Main$init, subscriptions: $author$project$Main$subscriptions, update: $author$project$Main$update, view: $author$project$Main$document});
_Platform_export({'Main':{'init':$author$project$Main$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (program) {
			return $elm$json$Json$Decode$succeed(
				{program: program});
		},
		A2($elm$json$Json$Decode$field, 'program', $elm$json$Json$Decode$string)))(0)}});}(this));