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

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
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

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
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


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
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
	if (region.bL.cp === region.ca.cp)
	{
		return 'on line ' + region.bL.cp;
	}
	return 'on lines ' + region.bL.cp + ' through ' + region.ca.cp;
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

	/**_UNUSED/
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

	/**/
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

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
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

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


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



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


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



/**_UNUSED/
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

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

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
		impl.dU,
		impl.eL,
		impl.eB,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_enqueueEffects(managers, result.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, result.b, subscriptions(model));

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


function _Platform_export(exports)
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


function _Platform_export_UNUSED(exports)
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

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
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


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
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
		ae: func(record.ae),
		bM: record.bM,
		bG: record.bG
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
		var message = !tag ? value : tag < 3 ? value.a : value.ae;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.bM;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.bG) && event.preventDefault(),
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
		impl.dU,
		impl.eL,
		impl.eB,
		function(sendToApp, initialModel) {
			var view = impl.eM;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
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
		impl.dU,
		impl.eL,
		impl.eB,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.bK && impl.bK(sendToApp)
			var view = impl.eM;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.$7);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.eI) && (_VirtualDom_doc.title = title = doc.eI);
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
	var onUrlChange = impl.ee;
	var onUrlRequest = impl.ef;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		bK: function(sendToApp)
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
							&& curr.cZ === next.cZ
							&& curr.cj === next.cj
							&& curr.cW.a === next.cW.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		dU: function(flags)
		{
			return A3(impl.dU, flags, _Browser_getUrl(), key);
		},
		eM: impl.eM,
		eL: impl.eL,
		eB: impl.eB
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
		? { dQ: 'hidden', du: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { dQ: 'mozHidden', du: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { dQ: 'msHidden', du: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { dQ: 'webkitHidden', du: 'webkitvisibilitychange' }
		: { dQ: 'hidden', du: 'visibilitychange' };
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
		c3: _Browser_getScene(),
		p: {
			Z: _Browser_window.pageXOffset,
			_: _Browser_window.pageYOffset,
			G: _Browser_doc.documentElement.clientWidth,
			s: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		G: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		s: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
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
			c3: {
				G: node.scrollWidth,
				s: node.scrollHeight
			},
			p: {
				Z: node.scrollLeft,
				_: node.scrollTop,
				G: node.clientWidth,
				s: node.clientHeight
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
			c3: _Browser_getScene(),
			p: {
				Z: x,
				_: y,
				G: _Browser_doc.documentElement.clientWidth,
				s: _Browser_doc.documentElement.clientHeight
			},
			dJ: {
				Z: x + rect.left,
				_: y + rect.top,
				G: rect.width,
				s: rect.height
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
    return { Z: a[0], _: a[1] };
};

var _MJS_v2fromRecord = function(r) {
    return new Float64Array([r.Z, r._]);
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
    return { Z: a[0], _: a[1], a_: a[2] };
};

var _MJS_v3fromRecord = function(r) {
    return new Float64Array([r.Z, r._, r.a_]);
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
    return { Z: a[0], _: a[1], a_: a[2], df: a[3] };
};

var _MJS_v4fromRecord = function(r) {
    return new Float64Array([r.Z, r._, r.a_, r.df]);
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
    m[0] = r.cr;
    m[1] = r.cv;
    m[2] = r.cz;
    m[3] = r.cD;
    m[4] = r.cs;
    m[5] = r.cw;
    m[6] = r.cA;
    m[7] = r.cE;
    m[8] = r.ct;
    m[9] = r.cx;
    m[10] = r.cB;
    m[11] = r.cF;
    m[12] = r.cu;
    m[13] = r.cy;
    m[14] = r.cC;
    m[15] = r.cG;
    return m;
};

var _MJS_m4x4toRecord = function(m) {
    return {
        cr: m[0], cv: m[1], cz: m[2], cD: m[3],
        cs: m[4], cw: m[5], cA: m[6], cE: m[7],
        ct: m[8], cx: m[9], cB: m[10], cF: m[11],
        cu: m[12], cy: m[13], cC: m[14], cG: m[15]
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
  var elemSize = mesh.a.b9;

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
  if (mesh.a.ck > 0) {
    var indexBuffer = gl.createBuffer();
    var indices = _WebGL_makeIndexedBuffer(mesh.c, mesh.a.ck);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    return {
      numIndices: indices.length,
      indexBuffer: indexBuffer,
      buffers: {}
    };
  } else {
    return {
      numIndices: mesh.a.b9 * _WebGL_listLength(mesh.b),
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
      gl.drawElements(entity.d.a.cH, buffer.numIndices, gl.UNSIGNED_INT, 0);
    } else {
      gl.drawArrays(entity.d.a.cH, 0, buffer.numIndices);
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
            tex = texture.dA(gl);
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
			callback(_Http_handleResponse(xhr, request.cc.a));
		});

		try
		{
			xhr.open(request.d_, request.bR, true);
		}
		catch (e)
		{
			return callback(_Scheduler_fail($elm$http$Http$BadUrl(request.bR)));
		}

		_Http_configureRequest(xhr, request);

		var body = request.$7;
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
			ds: event.loaded,
			dt: event.total
		}));
	});
}

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.ci; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}

	xhr.responseType = request.cc.b;
	xhr.withCredentials = request.eN;

	$elm$core$Maybe$isJust(request.dd) && (xhr.timeout = request.dd.a);
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
		bR: xhr.responseURL,
		eA: { dy: xhr.status, ae: xhr.statusText },
		ci: _Http_parseHeaders(xhr.getAllResponseHeaders()),
		$7: xhr.response
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


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.cK) { flags += 'm'; }
	if (options.b0) { flags += 'i'; }

	try
	{
		return $elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return $elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		out.push(A4($elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		return replacer(A4($elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
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
			if (t.$ === -2) {
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
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$LT = 0;
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
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
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
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
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
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
		return {$: 0, a: a, b: b, c: c, d: d};
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
	return {$: 1, a: a};
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
	return {$: 0, a: a};
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
		if (!builder.f) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.h),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.h);
		} else {
			var treeLen = builder.f * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.i) : builder.i;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.f);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.h) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.h);
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
					{i: nodeList, f: (len / $elm$core$Array$branchFactor) | 0, h: tail});
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
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
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
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {ce: fragment, cj: host, cU: path, cW: port_, cZ: protocol, c_: query};
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
					if (_v1.$ === 1) {
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
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
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
		var task = _v0;
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
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$browser$Browser$document = _Browser_document;
var $author$project$Main$TouchEvent = function (a) {
	return {$: 17, a: a};
};
var $author$project$Main$UpdateScript = function (a) {
	return {$: 10, a: a};
};
var $elm_explorations$webgl$WebGL$Internal$Alpha = function (a) {
	return {$: 0, a: a};
};
var $elm_explorations$webgl$WebGL$alpha = $elm_explorations$webgl$WebGL$Internal$Alpha;
var $elm_explorations$webgl$WebGL$Internal$Antialias = {$: 3};
var $elm_explorations$webgl$WebGL$antialias = $elm_explorations$webgl$WebGL$Internal$Antialias;
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
var $elm_explorations$webgl$WebGL$Internal$ClearColor = F4(
	function (a, b, c, d) {
		return {$: 4, a: a, b: b, c: c, d: d};
	});
var $elm_explorations$webgl$WebGL$clearColor = $elm_explorations$webgl$WebGL$Internal$ClearColor;
var $elm_explorations$webgl$WebGL$Internal$Depth = function (a) {
	return {$: 1, a: a};
};
var $elm_explorations$webgl$WebGL$depth = $elm_explorations$webgl$WebGL$Internal$Depth;
var $elm$html$Html$div = _VirtualDom_node('div');
var $dullbananas$elm_touch$Touch$Msg = $elm$core$Basics$identity;
var $dullbananas$elm_touch$Touch$Internal$Event = $elm$core$Basics$identity;
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$defaultOptions = {bG: true, bM: false};
var $elm$virtual_dom$VirtualDom$Custom = function (a) {
	return {$: 3, a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$custom = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Custom(decoder));
	});
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$Event = F4(
	function (keys, changedTouches, targetTouches, touches) {
		return {dv: changedTouches, dX: keys, eF: targetTouches, eJ: touches};
	});
var $elm$json$Json$Decode$field = _Json_decodeField;
var $mpizenberg$elm_pointer_events$Internal$Decode$Keys = F3(
	function (alt, ctrl, shift) {
		return {dj: alt, dB: ctrl, ez: shift};
	});
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$json$Json$Decode$map3 = _Json_map3;
var $mpizenberg$elm_pointer_events$Internal$Decode$keys = A4(
	$elm$json$Json$Decode$map3,
	$mpizenberg$elm_pointer_events$Internal$Decode$Keys,
	A2($elm$json$Json$Decode$field, 'altKey', $elm$json$Json$Decode$bool),
	A2($elm$json$Json$Decode$field, 'ctrlKey', $elm$json$Json$Decode$bool),
	A2($elm$json$Json$Decode$field, 'shiftKey', $elm$json$Json$Decode$bool));
var $elm$json$Json$Decode$map4 = _Json_map4;
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$Touch = F4(
	function (identifier, clientPos, pagePos, screenPos) {
		return {dx: clientPos, dR: identifier, ei: pagePos, ey: screenPos};
	});
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $mpizenberg$elm_pointer_events$Internal$Decode$clientPos = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (a, b) {
			return _Utils_Tuple2(a, b);
		}),
	A2($elm$json$Json$Decode$field, 'clientX', $elm$json$Json$Decode$float),
	A2($elm$json$Json$Decode$field, 'clientY', $elm$json$Json$Decode$float));
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $mpizenberg$elm_pointer_events$Internal$Decode$pagePos = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (a, b) {
			return _Utils_Tuple2(a, b);
		}),
	A2($elm$json$Json$Decode$field, 'pageX', $elm$json$Json$Decode$float),
	A2($elm$json$Json$Decode$field, 'pageY', $elm$json$Json$Decode$float));
var $mpizenberg$elm_pointer_events$Internal$Decode$screenPos = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (a, b) {
			return _Utils_Tuple2(a, b);
		}),
	A2($elm$json$Json$Decode$field, 'screenX', $elm$json$Json$Decode$float),
	A2($elm$json$Json$Decode$field, 'screenY', $elm$json$Json$Decode$float));
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$touchDecoder = A5(
	$elm$json$Json$Decode$map4,
	$mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$Touch,
	A2($elm$json$Json$Decode$field, 'identifier', $elm$json$Json$Decode$int),
	$mpizenberg$elm_pointer_events$Internal$Decode$clientPos,
	$mpizenberg$elm_pointer_events$Internal$Decode$pagePos,
	$mpizenberg$elm_pointer_events$Internal$Decode$screenPos);
var $mpizenberg$elm_pointer_events$Internal$Decode$all = A2(
	$elm$core$List$foldr,
	$elm$json$Json$Decode$map2($elm$core$List$cons),
	$elm$json$Json$Decode$succeed(_List_Nil));
var $mpizenberg$elm_pointer_events$Internal$Decode$dynamicListOf = function (itemDecoder) {
	var decodeOne = function (n) {
		return A2(
			$elm$json$Json$Decode$field,
			$elm$core$String$fromInt(n),
			itemDecoder);
	};
	var decodeN = function (n) {
		return $mpizenberg$elm_pointer_events$Internal$Decode$all(
			A2(
				$elm$core$List$map,
				decodeOne,
				A2($elm$core$List$range, 0, n - 1)));
	};
	return A2(
		$elm$json$Json$Decode$andThen,
		decodeN,
		A2($elm$json$Json$Decode$field, 'length', $elm$json$Json$Decode$int));
};
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$touchListDecoder = $mpizenberg$elm_pointer_events$Internal$Decode$dynamicListOf;
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$eventDecoder = A5(
	$elm$json$Json$Decode$map4,
	$mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$Event,
	$mpizenberg$elm_pointer_events$Internal$Decode$keys,
	A2(
		$elm$json$Json$Decode$field,
		'changedTouches',
		$mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$touchListDecoder($mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$touchDecoder)),
	A2(
		$elm$json$Json$Decode$field,
		'targetTouches',
		$mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$touchListDecoder($mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$touchDecoder)),
	A2(
		$elm$json$Json$Decode$field,
		'touches',
		$mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$touchListDecoder($mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$touchDecoder)));
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onWithOptions = F3(
	function (event, options, tag) {
		return A2(
			$elm$html$Html$Events$custom,
			event,
			A2(
				$elm$json$Json$Decode$map,
				function (ev) {
					return {
						ae: tag(ev),
						bG: options.bG,
						bM: options.bM
					};
				},
				$mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$eventDecoder));
	});
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onCancel = A2($mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onWithOptions, 'touchcancel', $mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$defaultOptions);
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onEnd = A2($mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onWithOptions, 'touchend', $mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$defaultOptions);
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onMove = A2($mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onWithOptions, 'touchmove', $mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$defaultOptions);
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onStart = A2($mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onWithOptions, 'touchstart', $mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$defaultOptions);
var $dullbananas$elm_touch$Touch$Internal$attrs = _List_fromArray(
	[
		$mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onStart($elm$core$Basics$identity),
		$mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onMove($elm$core$Basics$identity),
		$mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onEnd($elm$core$Basics$identity),
		$mpizenberg$elm_pointer_events$Html$Events$Extra$Touch$onCancel($elm$core$Basics$identity)
	]);
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$virtual_dom$VirtualDom$mapAttribute = _VirtualDom_mapAttribute;
var $elm$html$Html$Attributes$map = $elm$virtual_dom$VirtualDom$mapAttribute;
var $dullbananas$elm_touch$Touch$element = F2(
	function (customAttrs, msgWrapper) {
		var attrs = A2(
			$elm$core$List$map,
			$elm$html$Html$Attributes$map(
				A2($elm$core$Basics$composeR, $elm$core$Basics$identity, msgWrapper)),
			$dullbananas$elm_touch$Touch$Internal$attrs);
		return A2(
			$elm$html$Html$div,
			_Utils_ap(customAttrs, attrs),
			_List_Nil);
	});
var $elm$core$String$fromFloat = _String_fromNumber;
var $elm$html$Html$Attributes$height = function (n) {
	return A2(
		_VirtualDom_attribute,
		'height',
		$elm$core$String$fromInt(n));
};
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 1, a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
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
var $author$project$Main$BeginPan = function (a) {
	return {$: 1, a: a};
};
var $author$project$Main$BeginRotate = function (a) {
	return {$: 4, a: a};
};
var $author$project$Main$mouseEventDecoder = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (x, y) {
			return _Utils_Tuple2(x, y);
		}),
	A2($elm$json$Json$Decode$field, 'clientX', $elm$json$Json$Decode$float),
	A2($elm$json$Json$Decode$field, 'clientY', $elm$json$Json$Decode$float));
var $author$project$Main$mouseEventDecoderWithModifier = F2(
	function (normal, shift) {
		return A3(
			$elm$json$Json$Decode$map2,
			function (shiftPressed) {
				return shiftPressed ? shift : normal;
			},
			A2($elm$json$Json$Decode$field, 'shiftKey', $elm$json$Json$Decode$bool),
			$author$project$Main$mouseEventDecoder);
	});
var $author$project$Main$preventDefaultDecoder = $elm$json$Json$Decode$map(
	function (a) {
		return _Utils_Tuple2(a, true);
	});
var $elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 2, a: a};
};
var $elm$html$Html$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
	});
var $author$project$Main$onMouseDownHandler = function (_v0) {
	return A2(
		$elm$html$Html$Events$preventDefaultOn,
		'mousedown',
		$author$project$Main$preventDefaultDecoder(
			A2($author$project$Main$mouseEventDecoderWithModifier, $author$project$Main$BeginPan, $author$project$Main$BeginRotate)));
};
var $author$project$Main$UpdateRotate = function (a) {
	return {$: 5, a: a};
};
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $author$project$Main$onMouseMoveHandler = function (_v0) {
	return A2(
		$elm$html$Html$Events$on,
		'mousemove',
		A2($elm$json$Json$Decode$map, $author$project$Main$UpdateRotate, $author$project$Main$mouseEventDecoder));
};
var $author$project$Main$EndRotate = function (a) {
	return {$: 6, a: a};
};
var $author$project$Main$onMouseUpHandler = function (_v0) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseup',
		A2($elm$json$Json$Decode$map, $author$project$Main$EndRotate, $author$project$Main$mouseEventDecoder));
};
var $author$project$Main$SplitBarBeginDrag = function (a) {
	return {$: 11, a: a};
};
var $author$project$Main$onSplitBarDragBegin = function (_v0) {
	return A2(
		$elm$html$Html$Events$on,
		'mousedown',
		A2($elm$json$Json$Decode$map, $author$project$Main$SplitBarBeginDrag, $author$project$Main$mouseEventDecoder));
};
var $author$project$Main$Wheel = function (a) {
	return {$: 7, a: a};
};
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $author$project$Main$wheelEventDecoder = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (x, y) {
			return _Utils_Tuple2(x, -y);
		}),
	A2($elm$json$Json$Decode$field, 'deltaX', $elm$json$Json$Decode$float),
	A2($elm$json$Json$Decode$field, 'deltaY', $elm$json$Json$Decode$float));
var $author$project$Main$onWheelHandler = function (_v0) {
	return A2(
		$elm$html$Html$Events$preventDefaultOn,
		'wheel',
		$author$project$Main$preventDefaultDecoder(
			A2($elm$json$Json$Decode$map, $author$project$Main$Wheel, $author$project$Main$wheelEventDecoder)));
};
var $author$project$Main$px = function (x) {
	return $elm$core$String$fromFloat(x) + 'px';
};
var $elm$core$Basics$round = _Basics_round;
var $elm_explorations$webgl$WebGL$Mesh3 = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $elm_explorations$webgl$WebGL$triangles = $elm_explorations$webgl$WebGL$Mesh3(
	{b9: 3, ck: 0, cH: 4});
var $author$project$Graphics$Mesh$dummyMesh = $elm_explorations$webgl$WebGL$triangles(_List_Nil);
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
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
var $author$project$Forth$Pier$toString = function (pier) {
	switch (pier) {
		case 0:
			return 'pier';
		case 1:
			return 'pier_wide';
		default:
			return 'pier_4';
	}
};
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Graphics$Mesh$getPierMesh = F2(
	function (model, pier) {
		return A2(
			$elm$core$Maybe$withDefault,
			$author$project$Graphics$Mesh$dummyMesh,
			A2(
				$elm$core$Dict$get,
				$author$project$Forth$Pier$toString(pier),
				model.ax));
	});
var $elm_explorations$linear_algebra$Math$Vector3$add = _MJS_v3add;
var $elm$core$Basics$cos = _Basics_cos;
var $elm_explorations$linear_algebra$Math$Matrix4$makeLookAt = _MJS_m4x4makeLookAt;
var $elm$core$Basics$sin = _Basics_sin;
var $elm_explorations$linear_algebra$Math$Vector3$vec3 = _MJS_v3;
var $author$project$Main$makeLookAt = F3(
	function (azimuth, altitude, target) {
		var distance = 10000;
		var x = (distance * $elm$core$Basics$cos(altitude)) * $elm$core$Basics$cos(azimuth);
		var y = distance * $elm$core$Basics$sin(altitude);
		var z = (distance * $elm$core$Basics$cos(altitude)) * (-$elm$core$Basics$sin(azimuth));
		return A3(
			$elm_explorations$linear_algebra$Math$Matrix4$makeLookAt,
			A2(
				$elm_explorations$linear_algebra$Math$Vector3$add,
				target,
				A3($elm_explorations$linear_algebra$Math$Vector3$vec3, x, y, z)),
			target,
			A3($elm_explorations$linear_algebra$Math$Vector3$vec3, 0, 1, 0));
	});
var $elm_explorations$linear_algebra$Math$Matrix4$makeOrtho = _MJS_m4x4makeOrtho;
var $author$project$Main$orthoScale = function (ppu) {
	return 216.0 / ppu;
};
var $author$project$Main$makeOrtho = F3(
	function (width, height, ppu) {
		var w = ($author$project$Main$orthoScale(ppu) * width) / 2;
		var h = ($author$project$Main$orthoScale(ppu) * height) / 2;
		return A6($elm_explorations$linear_algebra$Math$Matrix4$makeOrtho, -w, w, -h, h, -100000, 100000);
	});
var $elm_explorations$webgl$WebGL$Internal$CullFace = function (a) {
	return {$: 5, a: a};
};
var $elm_explorations$webgl$WebGL$Settings$cullFace = function (_v0) {
	var faceMode = _v0;
	return $elm_explorations$webgl$WebGL$Internal$CullFace(faceMode);
};
var $elm_explorations$webgl$WebGL$Internal$DepthTest = F4(
	function (a, b, c, d) {
		return {$: 1, a: a, b: b, c: c, d: d};
	});
var $elm_explorations$webgl$WebGL$Settings$DepthTest$less = function (_v0) {
	var write = _v0.R;
	var near = _v0.L;
	var far = _v0.K;
	return A4($elm_explorations$webgl$WebGL$Internal$DepthTest, 513, write, near, far);
};
var $elm_explorations$webgl$WebGL$Settings$DepthTest$default = $elm_explorations$webgl$WebGL$Settings$DepthTest$less(
	{K: 1, L: 0, R: true});
var $elm_explorations$webgl$WebGL$Internal$enableOption = F2(
	function (ctx, option) {
		switch (option.$) {
			case 0:
				return A2(_WebGL_enableAlpha, ctx, option);
			case 1:
				return A2(_WebGL_enableDepth, ctx, option);
			case 2:
				return A2(_WebGL_enableStencil, ctx, option);
			case 3:
				return A2(_WebGL_enableAntialias, ctx, option);
			case 4:
				return A2(_WebGL_enableClearColor, ctx, option);
			default:
				return A2(_WebGL_enablePreserveDrawingBuffer, ctx, option);
		}
	});
var $elm_explorations$webgl$WebGL$Internal$enableSetting = F2(
	function (cache, setting) {
		switch (setting.$) {
			case 0:
				return A2(_WebGL_enableBlend, cache, setting);
			case 1:
				return A2(_WebGL_enableDepthTest, cache, setting);
			case 2:
				return A2(_WebGL_enableStencilTest, cache, setting);
			case 3:
				return A2(_WebGL_enableScissor, cache, setting);
			case 4:
				return A2(_WebGL_enableColorMask, cache, setting);
			case 5:
				return A2(_WebGL_enableCullFace, cache, setting);
			case 6:
				return A2(_WebGL_enablePolygonOffset, cache, setting);
			case 7:
				return A2(_WebGL_enableSampleCoverage, cache, setting);
			default:
				return _WebGL_enableSampleAlphaToCoverage(cache);
		}
	});
var $elm_explorations$webgl$WebGL$entityWith = _WebGL_entity;
var $elm_explorations$webgl$WebGL$Settings$FaceMode = $elm$core$Basics$identity;
var $elm_explorations$webgl$WebGL$Settings$front = 1028;
var $author$project$Main$lightFromAbove = A3($elm_explorations$linear_algebra$Math$Vector3$vec3, 2.0 / 27.0, 26.0 / 27.0, 7.0 / 27.0);
var $elm_explorations$linear_algebra$Math$Matrix4$makeRotate = _MJS_m4x4makeRotate;
var $elm_explorations$linear_algebra$Math$Matrix4$makeTranslate = _MJS_m4x4makeTranslate;
var $elm_explorations$linear_algebra$Math$Matrix4$mul = _MJS_m4x4mul;
var $author$project$Main$makeMeshMatrix = F2(
	function (origin, angle) {
		var rotate = A2(
			$elm_explorations$linear_algebra$Math$Matrix4$makeRotate,
			angle,
			A3($elm_explorations$linear_algebra$Math$Vector3$vec3, 0, 1, 0));
		var position = $elm_explorations$linear_algebra$Math$Matrix4$makeTranslate(origin);
		return A2($elm_explorations$linear_algebra$Math$Matrix4$mul, position, rotate);
	});
var $author$project$Main$pierFragmentShader = {
	src: '\n        varying highp vec3 color;\n\n        void main() {\n            gl_FragColor = vec4(color, 1.0);\n        }\n    ',
	attributes: {},
	uniforms: {}
};
var $author$project$Main$pierVertexShader = {
	src: '\n        attribute vec3 position;\n        attribute vec3 normal;\n        \n        uniform mat4 modelTransform;\n        uniform mat4 viewTransform;\n        uniform mat4 projectionTransform;\n        uniform vec3 light;\n\n        varying highp vec3 color;\n\n        void main() {\n            highp vec4 worldPosition = modelTransform * vec4(position, 1.0);\n            highp vec4 worldNormal = normalize(modelTransform * vec4(normal, 0.0));\n\n            const highp vec3 yellow = vec3(1.0, 1.0, 0.3);\n            highp float lambertFactor = dot(worldNormal, vec4(light, 0));\n            highp float intensity = 0.5 + 0.5 * lambertFactor;\n            color = intensity * yellow;\n\n            gl_Position = projectionTransform * viewTransform * worldPosition;\n        }\n    ',
	attributes: {normal: 'cP', position: 'eo'},
	uniforms: {light: 'bz', modelTransform: 'bD', projectionTransform: 'bH', viewTransform: 'bS'}
};
var $author$project$Main$showPier = F5(
	function (projectionTransform, viewTransform, mesh, origin, angle) {
		var modelTransform = A2($author$project$Main$makeMeshMatrix, origin, angle);
		return A5(
			$elm_explorations$webgl$WebGL$entityWith,
			_List_fromArray(
				[
					$elm_explorations$webgl$WebGL$Settings$DepthTest$default,
					$elm_explorations$webgl$WebGL$Settings$cullFace($elm_explorations$webgl$WebGL$Settings$front)
				]),
			$author$project$Main$pierVertexShader,
			$author$project$Main$pierFragmentShader,
			mesh,
			{bz: $author$project$Main$lightFromAbove, bD: modelTransform, bH: projectionTransform, bS: viewTransform});
	});
var $author$project$Main$showPiers = F2(
	function (model, piers) {
		var viewTransform = A3($author$project$Main$makeLookAt, model.ac, model.aa, model.aA);
		var projectionTransform = A3($author$project$Main$makeOrtho, model.p.G, model.ag, model.ap);
		return A2(
			$elm$core$List$map,
			function (pierPlacement) {
				return A5(
					$author$project$Main$showPier,
					projectionTransform,
					viewTransform,
					A2($author$project$Graphics$Mesh$getPierMesh, model.ax, pierPlacement.ej),
					pierPlacement.eo,
					pierPlacement.dk);
			},
			piers);
	});
var $author$project$Rail$isFlippedToString = function (isFlipped) {
	if (!isFlipped) {
		return '';
	} else {
		return '_flip';
	}
};
var $author$project$Rail$isInvertedToString = function (isInverted) {
	if (!isInverted) {
		return '_minus';
	} else {
		return '_plus';
	}
};
var $author$project$Rail$toStringWith = F3(
	function (flipped, inverted, rail) {
		switch (rail.$) {
			case 0:
				var inv = rail.a;
				return 'straight4' + inverted(inv);
			case 1:
				var inv = rail.a;
				return 'straight2' + inverted(inv);
			case 2:
				var inv = rail.a;
				return 'straight1' + inverted(inv);
			case 3:
				var inv = rail.a;
				return 'straight0' + inverted(inv);
			case 4:
				var flip = rail.a;
				var inv = rail.b;
				return 'curve8' + (inverted(inv) + flipped(flip));
			case 5:
				var flip = rail.a;
				var inv = rail.b;
				return 'curve4' + (inverted(inv) + flipped(flip));
			case 6:
				var flip = rail.a;
				var inv = rail.b;
				return 'outercurve' + (inverted(inv) + flipped(flip));
			case 7:
				var flip = rail.a;
				var inv = rail.b;
				return 'turnout' + (inverted(inv) + flipped(flip));
			case 8:
				var flip = rail.a;
				var inv = rail.b;
				return 'singledouble' + (inverted(inv) + flipped(flip));
			case 9:
				var flip = rail.a;
				var inv = rail.b;
				return 'eight' + (inverted(inv) + flipped(flip));
			case 10:
				var inv = rail.a;
				return 'pole' + inverted(inv);
			case 11:
				var flip = rail.a;
				var inv = rail.b;
				return 'slope' + (inverted(inv) + flipped(flip));
			case 12:
				return 'slopecurveA_plus';
			case 13:
				return 'slopecurveB_minus';
			case 14:
				var inv = rail.a;
				return 'stop' + inverted(inv);
			case 15:
				return 'autoturnout_minus';
			default:
				return 'autopoint_minus';
		}
	});
var $author$project$Rail$toString = A2($author$project$Rail$toStringWith, $author$project$Rail$isFlippedToString, $author$project$Rail$isInvertedToString);
var $author$project$Graphics$Mesh$getRailMesh = F2(
	function (model, rail) {
		return A2(
			$elm$core$Maybe$withDefault,
			$author$project$Graphics$Mesh$dummyMesh,
			A2(
				$elm$core$Dict$get,
				$author$project$Rail$toString(rail),
				model.ax));
	});
var $author$project$Main$railFragmentShader = {
	src: '\n        varying highp float edge;\n        varying highp vec3 color;\n\n        void main() {\n            highp float dist_density = min(edge / 30.0 + 0.2, 1.0);\n            gl_FragColor = vec4(color, dist_density);\n        }\n    ',
	attributes: {},
	uniforms: {}
};
var $author$project$Main$railVertexShader = {
	src: '\n        attribute vec3 position;\n        attribute vec3 normal;\n        \n        uniform mat4 modelTransform;\n        uniform mat4 viewTransform;\n        uniform mat4 projectionTransform;\n        uniform vec3 light;\n        \n        varying highp float edge;\n        varying highp vec3 color;\n\n        void main() {\n            highp vec4 worldPosition = modelTransform * vec4(position, 1.0);\n            highp vec4 worldNormal = normalize(modelTransform * vec4(normal, 0.0));\n\n            // blue to green ratio. 0 <--- blue   green ---> 1.0\n            highp float ratio = clamp(worldPosition[1] / 660.0, 0.0, 1.0);\n\n            const highp vec3 blue = vec3(0.12, 0.56, 1.0);\n            const highp vec3 green = vec3(0.12, 1.0, 0.56);\n\n            highp float lambertFactor = dot(worldNormal, vec4(light, 0));\n            highp float intensity = 0.3 + 0.7 * lambertFactor;\n            color = intensity * (ratio * green + (1.0 - ratio) * blue);\n\n            edge = distance(vec3(0.0, 0.0, 0.0), position);\n\n            gl_Position = projectionTransform * viewTransform * worldPosition;\n        }\n    ',
	attributes: {normal: 'cP', position: 'eo'},
	uniforms: {light: 'bz', modelTransform: 'bD', projectionTransform: 'bH', viewTransform: 'bS'}
};
var $author$project$Main$showRail = F5(
	function (projectionTransform, viewTransform, mesh, origin, angle) {
		var modelTransform = A2($author$project$Main$makeMeshMatrix, origin, angle);
		return A5(
			$elm_explorations$webgl$WebGL$entityWith,
			_List_fromArray(
				[
					$elm_explorations$webgl$WebGL$Settings$DepthTest$default,
					$elm_explorations$webgl$WebGL$Settings$cullFace($elm_explorations$webgl$WebGL$Settings$front)
				]),
			$author$project$Main$railVertexShader,
			$author$project$Main$railFragmentShader,
			mesh,
			{bz: $author$project$Main$lightFromAbove, bD: modelTransform, bH: projectionTransform, bS: viewTransform});
	});
var $author$project$Main$showRails = F2(
	function (model, rails) {
		var viewTransform = A3($author$project$Main$makeLookAt, model.ac, model.aa, model.aA);
		var projectionTransform = A3($author$project$Main$makeOrtho, model.p.G, model.ag, model.ap);
		return A2(
			$elm$core$List$map,
			function (railPosition) {
				return A5(
					$author$project$Main$showRail,
					projectionTransform,
					viewTransform,
					A2($author$project$Graphics$Mesh$getRailMesh, model.ax, railPosition.c$),
					railPosition.eo,
					railPosition.dk);
			},
			rails);
	});
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$spellcheck = $elm$html$Html$Attributes$boolProperty('spellcheck');
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $elm$html$Html$textarea = _VirtualDom_node('textarea');
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
var $author$project$Main$view = function (model) {
	var railViewTop = 0;
	var railViewHeight = model.ag;
	var barTop = model.ag;
	var barHeight = 8;
	var editorTop = barTop + barHeight;
	var editorHeight = (model.p.s - editorTop) - barHeight;
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A3(
				$elm_explorations$webgl$WebGL$toHtmlWith,
				_List_fromArray(
					[
						$elm_explorations$webgl$WebGL$alpha(true),
						$elm_explorations$webgl$WebGL$antialias,
						$elm_explorations$webgl$WebGL$depth(1),
						A4($elm_explorations$webgl$WebGL$clearColor, 1.0, 1.0, 1.0, 1.0)
					]),
				_List_fromArray(
					[
						$elm$html$Html$Attributes$width(
						$elm$core$Basics$round(2.0 * model.p.G)),
						$elm$html$Html$Attributes$height(
						$elm$core$Basics$round(2.0 * barTop)),
						A2($elm$html$Html$Attributes$style, 'display', 'block'),
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2(
						$elm$html$Html$Attributes$style,
						'left',
						$author$project$Main$px(0)),
						A2(
						$elm$html$Html$Attributes$style,
						'top',
						$author$project$Main$px(railViewTop)),
						A2(
						$elm$html$Html$Attributes$style,
						'width',
						$author$project$Main$px(model.p.G)),
						A2(
						$elm$html$Html$Attributes$style,
						'height',
						$author$project$Main$px(railViewHeight))
					]),
				_Utils_ap(
					A2($author$project$Main$showRails, model, model.u),
					A2($author$project$Main$showPiers, model, model.U))),
				A2(
				$dullbananas$elm_touch$Touch$element,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'display', 'block'),
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2(
						$elm$html$Html$Attributes$style,
						'left',
						$author$project$Main$px(0)),
						A2(
						$elm$html$Html$Attributes$style,
						'top',
						$author$project$Main$px(railViewTop)),
						A2(
						$elm$html$Html$Attributes$style,
						'width',
						$author$project$Main$px(model.p.G)),
						A2(
						$elm$html$Html$Attributes$style,
						'height',
						$author$project$Main$px(railViewHeight)),
						A2($elm$html$Html$Attributes$style, 'z-index', '10'),
						$author$project$Main$onMouseUpHandler(model),
						$author$project$Main$onMouseMoveHandler(model),
						$author$project$Main$onMouseDownHandler(model),
						$author$project$Main$onWheelHandler(model)
					]),
				$author$project$Main$TouchEvent),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$Attributes$style,
						'display',
						_Utils_eq(model.a5, $elm$core$Maybe$Nothing) ? 'none' : 'block'),
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2(
						$elm$html$Html$Attributes$style,
						'left',
						$author$project$Main$px(0)),
						A2(
						$elm$html$Html$Attributes$style,
						'top',
						$author$project$Main$px(railViewTop)),
						A2(
						$elm$html$Html$Attributes$style,
						'width',
						$author$project$Main$px(model.p.G)),
						A2(
						$elm$html$Html$Attributes$style,
						'height',
						$author$project$Main$px(railViewHeight)),
						A2($elm$html$Html$Attributes$style, 'font-size', '2rem'),
						A2($elm$html$Html$Attributes$style, 'pointer-events', 'none'),
						A2($elm$html$Html$Attributes$style, 'touch-action', 'none'),
						A2($elm$html$Html$Attributes$style, 'z-index', '100')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(
						A2($elm$core$Maybe$withDefault, '', model.a5))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'display', 'block'),
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2(
						$elm$html$Html$Attributes$style,
						'left',
						$author$project$Main$px(0)),
						A2(
						$elm$html$Html$Attributes$style,
						'top',
						$author$project$Main$px(barTop)),
						A2($elm$html$Html$Attributes$style, 'cursor', 'row-resize'),
						A2(
						$elm$html$Html$Attributes$style,
						'width',
						$author$project$Main$px(model.p.G)),
						A2(
						$elm$html$Html$Attributes$style,
						'height',
						$author$project$Main$px(barHeight)),
						A2($elm$html$Html$Attributes$style, 'box-sizing', 'border-box'),
						A2($elm$html$Html$Attributes$style, 'background-color', 'lightgrey'),
						A2($elm$html$Html$Attributes$style, 'border-style', 'outset'),
						A2($elm$html$Html$Attributes$style, 'border-width', '1px'),
						A2($elm$html$Html$Attributes$style, 'touch-action', 'none'),
						$author$project$Main$onSplitBarDragBegin(model)
					]),
				_List_Nil),
				A2(
				$elm$html$Html$textarea,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'display', 'block'),
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2($elm$html$Html$Attributes$style, 'resize', 'none'),
						A2(
						$elm$html$Html$Attributes$style,
						'top',
						$author$project$Main$px(editorTop)),
						A2(
						$elm$html$Html$Attributes$style,
						'left',
						$author$project$Main$px(0)),
						A2(
						$elm$html$Html$Attributes$style,
						'width',
						$elm$core$String$fromFloat(model.p.G - 8) + 'px'),
						A2(
						$elm$html$Html$Attributes$style,
						'height',
						$author$project$Main$px(editorHeight)),
						A2($elm$html$Html$Attributes$style, 'margin', '3px'),
						A2($elm$html$Html$Attributes$style, 'padding', '0'),
						A2($elm$html$Html$Attributes$style, 'border', 'solid 1px'),
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
						$elm$html$Html$text(model.V)
					]))
			]));
};
var $author$project$Main$document = function (model) {
	return {
		$7: _List_fromArray(
			[
				$author$project$Main$view(model)
			]),
		eI: 'Railforth prototype'
	};
};
var $author$project$Main$LoadMesh = function (a) {
	return {$: 0, a: a};
};
var $author$project$Main$OnTouchMove = F2(
	function (a, b) {
		return {$: 15, a: a, b: b};
	});
var $author$project$Main$OnTouchPinch = function (a) {
	return {$: 16, a: a};
};
var $author$project$Main$OnTouchRotate = F2(
	function (a, b) {
		return {$: 14, a: a, b: b};
	});
var $author$project$Main$SetViewport = function (a) {
	return {$: 8, a: a};
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Basics$pi = _Basics_pi;
var $elm$core$Basics$degrees = function (angleInDegrees) {
	return (angleInDegrees * $elm$core$Basics$pi) / 180;
};
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $author$project$Forth$Interpreter$haltWithError = F2(
	function (errMsg, status) {
		return {
			a5: $elm$core$Maybe$Just(errMsg),
			U: _List_Nil,
			bk: $elm$core$Dict$empty,
			u: status.u
		};
	});
var $author$project$Forth$Interpreter$executeDrop = F2(
	function (cont, status) {
		var _v0 = status.k;
		if (!_v0.b) {
			return A2($author$project$Forth$Interpreter$haltWithError, 'スタックが空です', status);
		} else {
			var restOfStack = _v0.b;
			return cont(
				_Utils_update(
					status,
					{k: restOfStack}));
		}
	});
var $author$project$Forth$Interpreter$executeInverseRot = F2(
	function (cont, status) {
		var _v0 = status.k;
		if ((_v0.b && _v0.b.b) && _v0.b.b.b) {
			var x = _v0.a;
			var _v1 = _v0.b;
			var y = _v1.a;
			var _v2 = _v1.b;
			var z = _v2.a;
			var restOfStack = _v2.b;
			return cont(
				_Utils_update(
					status,
					{
						k: A2(
							$elm$core$List$cons,
							y,
							A2(
								$elm$core$List$cons,
								z,
								A2($elm$core$List$cons, x, restOfStack)))
					}));
		} else {
			return A2($author$project$Forth$Interpreter$haltWithError, 'スタックに最低3つの要素がある必要があります', status);
		}
	});
var $author$project$Forth$Interpreter$executeNip = F2(
	function (cont, status) {
		var _v0 = status.k;
		if (_v0.b && _v0.b.b) {
			var x = _v0.a;
			var _v1 = _v0.b;
			var restOfStack = _v1.b;
			return cont(
				_Utils_update(
					status,
					{
						k: A2($elm$core$List$cons, x, restOfStack)
					}));
		} else {
			return A2($author$project$Forth$Interpreter$haltWithError, 'スタックに最低2つの要素がある必要があります', status);
		}
	});
var $author$project$Forth$Interpreter$executeRot = F2(
	function (cont, status) {
		var _v0 = status.k;
		if ((_v0.b && _v0.b.b) && _v0.b.b.b) {
			var x = _v0.a;
			var _v1 = _v0.b;
			var y = _v1.a;
			var _v2 = _v1.b;
			var z = _v2.a;
			var restOfStack = _v2.b;
			return cont(
				_Utils_update(
					status,
					{
						k: A2(
							$elm$core$List$cons,
							z,
							A2(
								$elm$core$List$cons,
								x,
								A2($elm$core$List$cons, y, restOfStack)))
					}));
		} else {
			return A2($author$project$Forth$Interpreter$haltWithError, 'スタックに最低3つの要素がある必要があります', status);
		}
	});
var $author$project$Forth$Interpreter$executeSwap = F2(
	function (cont, status) {
		var _v0 = status.k;
		if (_v0.b && _v0.b.b) {
			var x = _v0.a;
			var _v1 = _v0.b;
			var y = _v1.a;
			var restOfStack = _v1.b;
			return cont(
				_Utils_update(
					status,
					{
						k: A2(
							$elm$core$List$cons,
							y,
							A2($elm$core$List$cons, x, restOfStack))
					}));
		} else {
			return A2($author$project$Forth$Interpreter$haltWithError, 'スタックに最低2つの要素がある必要があります', status);
		}
	});
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
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
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
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
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
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
			_Utils_Tuple2('', $elm$core$Basics$identity),
			_Utils_Tuple2('.', $author$project$Forth$Interpreter$executeDrop),
			_Utils_Tuple2('drop', $author$project$Forth$Interpreter$executeDrop),
			_Utils_Tuple2('swap', $author$project$Forth$Interpreter$executeSwap),
			_Utils_Tuple2('rot', $author$project$Forth$Interpreter$executeRot),
			_Utils_Tuple2('-rot', $author$project$Forth$Interpreter$executeInverseRot),
			_Utils_Tuple2('nip', $author$project$Forth$Interpreter$executeNip)
		]));
var $author$project$Forth$Statistics$railToStringRegardlessOfFlipped = function (rail) {
	return A3(
		$author$project$Rail$toStringWith,
		function (_v0) {
			return '';
		},
		$author$project$Rail$isInvertedToString,
		rail);
};
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
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
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
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
				0,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
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
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
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
				0,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
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
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
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
				A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
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
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
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
				if (_v4.$ === -1) {
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
		if (dict.$ === -2) {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
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
						if (_v7.$ === -1) {
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
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === -1) {
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
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (!_v0.$) {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $author$project$Forth$Statistics$getRailCount = function (rails) {
	return A3(
		$elm$core$List$foldl,
		function (rail) {
			return A2(
				$elm$core$Dict$update,
				rail,
				function (x) {
					if (x.$ === 1) {
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
var $elm$core$Result$andThen = F2(
	function (callback, result) {
		if (!result.$) {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return $elm$core$Result$Err(msg);
		}
	});
var $author$project$Forth$Geometry$Dir$Dir = $elm$core$Basics$identity;
var $elm$core$Basics$ge = _Utils_ge;
var $author$project$Forth$Geometry$Dir$toUndirectedDir = function (_v0) {
	var x = _v0;
	return (x >= 4) ? (x - 4) : x;
};
var $author$project$Forth$PierConstruction$cleansePierPlacements = $elm$core$List$map(
	function (placement) {
		var loc = placement.E;
		return _Utils_update(
			placement,
			{
				E: _Utils_update(
					loc,
					{
						C: $author$project$Forth$Geometry$Dir$toUndirectedDir(loc.C)
					})
			});
	});
var $author$project$Forth$PierConstruction$foldlResult = F3(
	function (f, b, list) {
		if (!list.b) {
			return $elm$core$Result$Ok(b);
		} else {
			var x = list.a;
			var xs = list.b;
			return A2(
				$elm$core$Result$andThen,
				function (b2) {
					return A3($author$project$Forth$PierConstruction$foldlResult, f, b2, xs);
				},
				A2(f, x, b));
		}
	});
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
var $author$project$Forth$PierConstruction$pierKey = function (loc) {
	return $author$project$Forth$Geometry$Rot45$toString(loc.P) + (',' + $author$project$Forth$Geometry$Rot45$toString(loc.J));
};
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (!ra.$) {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $author$project$Forth$PierConstruction$updateWithResult = F3(
	function (key, f, dict) {
		return A2(
			$elm$core$Result$map,
			function (v) {
				return A3($elm$core$Dict$insert, key, v, dict);
			},
			f(
				A2($elm$core$Dict$get, key, dict)));
	});
var $author$project$Forth$PierConstruction$divideIntoDict = A2(
	$author$project$Forth$PierConstruction$foldlResult,
	function (loc) {
		return A2(
			$author$project$Forth$PierConstruction$updateWithResult,
			$author$project$Forth$PierConstruction$pierKey(loc.E),
			function (maybe) {
				if (maybe.$ === 1) {
					return $elm$core$Result$Ok(
						_Utils_Tuple2(
							loc.E.C,
							_List_fromArray(
								[loc])));
				} else {
					var _v1 = maybe.a;
					var dir = _v1.a;
					var lis = _v1.b;
					return _Utils_eq(dir, loc.E.C) ? $elm$core$Result$Ok(
						_Utils_Tuple2(
							dir,
							A2($elm$core$List$cons, loc, lis))) : $elm$core$Result$Err(
						'橋脚の方向が一致しません ' + $author$project$Forth$PierConstruction$pierKey(loc.E));
				}
			});
	},
	$elm$core$Dict$empty);
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $author$project$Forth$Pier$Wide = 1;
var $author$project$Forth$Pier$getHeight = function (pier) {
	switch (pier) {
		case 0:
			return 4;
		case 1:
			return 4;
		default:
			return 1;
	}
};
var $author$project$Forth$Geometry$Dir$toRadian = function (_v0) {
	var d = _v0;
	return ($elm$core$Basics$pi / 4.0) * d;
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
	var singleUnit = 54;
	var heightUnit = 16.5;
	var h = tie.s;
	var doubleUnit = 60;
	var _v0 = $author$project$Forth$Geometry$Rot45$toFloat(tie.P);
	var sx = _v0.a;
	var sy = _v0.b;
	var _v1 = $author$project$Forth$Geometry$Rot45$toFloat(tie.J);
	var dx = _v1.a;
	var dy = _v1.b;
	return A3($elm_explorations$linear_algebra$Math$Vector3$vec3, (singleUnit * sx) + (doubleUnit * dx), heightUnit * h, -((singleUnit * sy) + (doubleUnit * dy)));
};
var $author$project$Forth$Geometry$PierLocation$toVec3 = function (loc) {
	return $author$project$Forth$Geometry$Location$toVec3(loc.E);
};
var $author$project$Forth$PierConstruction$pierLocationToPlacement = F2(
	function (kind, loc) {
		return {
			dk: $author$project$Forth$Geometry$Dir$toRadian(loc.E.C),
			ej: kind,
			eo: $author$project$Forth$Geometry$PierLocation$toVec3(loc)
		};
	});
var $author$project$Forth$Geometry$Location$setHeight = F2(
	function (newHeight, location) {
		return _Utils_update(
			location,
			{s: newHeight});
	});
var $author$project$Forth$Geometry$PierLocation$setHeight = F2(
	function (newHeight, loc) {
		return _Utils_update(
			loc,
			{
				E: A2($author$project$Forth$Geometry$Location$setHeight, newHeight, loc.E)
			});
	});
var $author$project$Forth$PierConstruction$buildDoubleUpto = F4(
	function (template, accum, to, from) {
		buildDoubleUpto:
		while (true) {
			if (_Utils_cmp(from, to) > -1) {
				return accum;
			} else {
				var $temp$template = template,
					$temp$accum = A2(
					$elm$core$List$cons,
					A2(
						$author$project$Forth$PierConstruction$pierLocationToPlacement,
						1,
						A2($author$project$Forth$Geometry$PierLocation$setHeight, from, template)),
					accum),
					$temp$to = to,
					$temp$from = from + $author$project$Forth$Pier$getHeight(1);
				template = $temp$template;
				accum = $temp$accum;
				to = $temp$to;
				from = $temp$from;
				continue buildDoubleUpto;
			}
		}
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
var $author$project$Forth$PierConstruction$maximumHeight = function (ls) {
	return A3(
		$elm$core$List$foldl,
		function (loc) {
			return $elm$core$Basics$max(loc.E.s);
		},
		0,
		ls);
};
var $author$project$Forth$PierConstruction$constructDoublePier = F2(
	function (center, left) {
		var maxHeight = A2(
			$elm$core$Basics$max,
			$author$project$Forth$PierConstruction$maximumHeight(center),
			$author$project$Forth$PierConstruction$maximumHeight(left));
		var _v0 = $elm$core$List$head(center);
		if (_v0.$ === 1) {
			return $elm$core$Result$Err('複線橋脚の構築で内部的なエラーが発生しました');
		} else {
			var loc = _v0.a;
			return $elm$core$Result$Ok(
				A4($author$project$Forth$PierConstruction$buildDoubleUpto, loc, _List_Nil, maxHeight, 0));
		}
	});
var $author$project$Forth$PierConstruction$doublePier = function (_double) {
	return A3(
		$author$project$Forth$PierConstruction$foldlResult,
		F2(
			function (_v0, result) {
				var _v1 = _v0.b;
				var centerLocs = _v1.b;
				var leftLocs = _v1.c;
				return A2(
					$elm$core$Result$map,
					function (r1) {
						return A2($elm$core$List$append, r1, result);
					},
					A2($author$project$Forth$PierConstruction$constructDoublePier, centerLocs, leftLocs));
			}),
		_List_Nil,
		$elm$core$Dict$toList(_double));
};
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (!_v0.$) {
			return true;
		} else {
			return false;
		}
	});
var $author$project$Forth$Geometry$Dir$e = 0;
var $author$project$Forth$Geometry$Location$make = F4(
	function (single, _double, height, dir) {
		return {C: dir, J: _double, s: height, P: single};
	});
var $author$project$Forth$Geometry$Rot45$Rot45 = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $author$project$Forth$Geometry$Rot45$make = F4(
	function (a, b, c, d) {
		return A4($author$project$Forth$Geometry$Rot45$Rot45, a, b, c, d);
	});
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
var $author$project$Forth$Geometry$Dir$mul = F2(
	function (_v0, _v1) {
		var d1 = _v0;
		var d2 = _v1;
		return ((d1 + d2) >= 8) ? ((d1 + d2) - 8) : (d1 + d2);
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
var $author$project$Forth$Geometry$Dir$aux = F3(
	function (a, b, x) {
		return _Utils_eq(x, a) ? 1 : (_Utils_eq(x, b) ? (-1) : 0);
	});
var $author$project$Forth$Geometry$Dir$toRot45 = function (_v0) {
	var d = _v0;
	return A4(
		$author$project$Forth$Geometry$Rot45$make,
		A3($author$project$Forth$Geometry$Dir$aux, 0, 4, d),
		A3($author$project$Forth$Geometry$Dir$aux, 1, 5, d),
		A3($author$project$Forth$Geometry$Dir$aux, 2, 6, d),
		A3($author$project$Forth$Geometry$Dir$aux, 3, 7, d));
};
var $author$project$Forth$Geometry$Location$mul = F2(
	function (global, local) {
		var single = A2(
			$author$project$Forth$Geometry$Rot45$add,
			global.P,
			A2(
				$author$project$Forth$Geometry$Rot45$mul,
				$author$project$Forth$Geometry$Dir$toRot45(global.C),
				local.P));
		var _double = A2(
			$author$project$Forth$Geometry$Rot45$add,
			global.J,
			A2(
				$author$project$Forth$Geometry$Rot45$mul,
				$author$project$Forth$Geometry$Dir$toRot45(global.C),
				local.J));
		var dir = A2($author$project$Forth$Geometry$Dir$mul, local.C, global.C);
		return {C: dir, J: _double, s: global.s + local.s, P: single};
	});
var $author$project$Forth$Geometry$Dir$n = 2;
var $author$project$Forth$Geometry$Rot45$zero = A4($author$project$Forth$Geometry$Rot45$make, 0, 0, 0, 0);
var $author$project$Forth$Geometry$Location$moveLeftByDoubleTrackLength = function (loc) {
	return A2(
		$author$project$Forth$Geometry$Location$mul,
		loc,
		A4(
			$author$project$Forth$Geometry$Location$make,
			$author$project$Forth$Geometry$Rot45$zero,
			$author$project$Forth$Geometry$Dir$toRot45($author$project$Forth$Geometry$Dir$n),
			0,
			$author$project$Forth$Geometry$Dir$e));
};
var $author$project$Forth$PierConstruction$doubleTrackPiersRec = F4(
	function (single, _double, open, list) {
		doubleTrackPiersRec:
		while (true) {
			if (!list.b) {
				return $elm$core$Result$Ok(
					_Utils_Tuple2(single, _double));
			} else {
				var _v1 = list.a;
				var key = _v1.a;
				var _v2 = _v1.b;
				var dir = _v2.a;
				var pierLocs = _v2.b;
				var xs = list.b;
				var _v3 = $elm$core$List$head(pierLocs);
				if (_v3.$ === 1) {
					return $elm$core$Result$Err('複線橋脚の構築で内部的なエラーが発生しました');
				} else {
					var pierLoc = _v3.a;
					if (A2($elm$core$Dict$member, key, open)) {
						var leftKey = $author$project$Forth$PierConstruction$pierKey(
							$author$project$Forth$Geometry$Location$moveLeftByDoubleTrackLength(pierLoc.E));
						var _v4 = _Utils_Tuple2(
							A2($elm$core$Dict$get, leftKey, single),
							A2($elm$core$Dict$get, leftKey, open));
						if (!_v4.a.$) {
							var _v5 = _v4.a.a;
							var dir2 = _v5.a;
							var pierLocs2 = _v5.b;
							if (_Utils_eq(dir, dir2)) {
								var $temp$single = A2($elm$core$Dict$remove, leftKey, single),
									$temp$double = A3(
									$elm$core$Dict$insert,
									key,
									_Utils_Tuple3(dir, pierLocs, pierLocs2),
									_double),
									$temp$open = A2($elm$core$Dict$remove, key, open),
									$temp$list = xs;
								single = $temp$single;
								_double = $temp$double;
								open = $temp$open;
								list = $temp$list;
								continue doubleTrackPiersRec;
							} else {
								return $elm$core$Result$Err('複線橋脚の構築時に隣のレールとの方向が合いません');
							}
						} else {
							if (!_v4.b.$) {
								var _v6 = _v4.b.a;
								var dir2 = _v6.a;
								var pierLocs2 = _v6.b;
								if (_Utils_eq(dir, dir2)) {
									var $temp$single = single,
										$temp$double = A3(
										$elm$core$Dict$insert,
										key,
										_Utils_Tuple3(dir, pierLocs, pierLocs2),
										_double),
										$temp$open = A2(
										$elm$core$Dict$remove,
										leftKey,
										A2($elm$core$Dict$remove, key, open)),
										$temp$list = xs;
									single = $temp$single;
									_double = $temp$double;
									open = $temp$open;
									list = $temp$list;
									continue doubleTrackPiersRec;
								} else {
									return $elm$core$Result$Err('複線橋脚の構築時に隣のレールとの方向が合いません');
								}
							} else {
								var $temp$single = A3(
									$elm$core$Dict$insert,
									key,
									_Utils_Tuple2(dir, pierLocs),
									single),
									$temp$double = _double,
									$temp$open = A2($elm$core$Dict$remove, key, open),
									$temp$list = xs;
								single = $temp$single;
								_double = $temp$double;
								open = $temp$open;
								list = $temp$list;
								continue doubleTrackPiersRec;
							}
						}
					} else {
						var $temp$single = single,
							$temp$double = _double,
							$temp$open = open,
							$temp$list = xs;
						single = $temp$single;
						_double = $temp$double;
						open = $temp$open;
						list = $temp$list;
						continue doubleTrackPiersRec;
					}
				}
			}
		}
	});
var $author$project$Forth$PierConstruction$doubleTrackPiers = function (dict) {
	return A4(
		$author$project$Forth$PierConstruction$doubleTrackPiersRec,
		$elm$core$Dict$empty,
		$elm$core$Dict$empty,
		dict,
		$elm$core$Dict$toList(dict));
};
var $elm$core$Result$map2 = F3(
	function (func, ra, rb) {
		if (ra.$ === 1) {
			var x = ra.a;
			return $elm$core$Result$Err(x);
		} else {
			var a = ra.a;
			if (rb.$ === 1) {
				var x = rb.a;
				return $elm$core$Result$Err(x);
			} else {
				var b = rb.a;
				return $elm$core$Result$Ok(
					A2(func, a, b));
			}
		}
	});
var $author$project$Forth$Pier$Mini = 2;
var $author$project$Forth$Pier$Single = 0;
var $author$project$Forth$PierConstruction$buildSingleUpto = F4(
	function (template, accum, to, from) {
		buildSingleUpto:
		while (true) {
			if (_Utils_cmp(from, to) > -1) {
				return accum;
			} else {
				if (_Utils_cmp(
					to,
					from + $author$project$Forth$Pier$getHeight(0)) > -1) {
					var $temp$template = template,
						$temp$accum = A2(
						$elm$core$List$cons,
						A2(
							$author$project$Forth$PierConstruction$pierLocationToPlacement,
							0,
							A2($author$project$Forth$Geometry$PierLocation$setHeight, from, template)),
						accum),
						$temp$to = to,
						$temp$from = from + $author$project$Forth$Pier$getHeight(0);
					template = $temp$template;
					accum = $temp$accum;
					to = $temp$to;
					from = $temp$from;
					continue buildSingleUpto;
				} else {
					var $temp$template = template,
						$temp$accum = A2(
						$elm$core$List$cons,
						A2(
							$author$project$Forth$PierConstruction$pierLocationToPlacement,
							2,
							A2($author$project$Forth$Geometry$PierLocation$setHeight, from, template)),
						accum),
						$temp$to = to,
						$temp$from = from + $author$project$Forth$Pier$getHeight(2);
					template = $temp$template;
					accum = $temp$accum;
					to = $temp$to;
					from = $temp$from;
					continue buildSingleUpto;
				}
			}
		}
	});
var $author$project$Forth$PierConstruction$constructSinglePierRec = F4(
	function (accum, current, top, locs) {
		constructSinglePierRec:
		while (true) {
			if (!locs.b) {
				return $elm$core$Result$Ok(accum);
			} else {
				var _v1 = locs.a;
				var h = _v1.a;
				var l = _v1.b;
				var ls = locs.b;
				if (_Utils_cmp(top, h - l.an.bt) > 0) {
					return $elm$core$Result$Err('ブロックの付いたレールとかの位置関係的に配置ができません');
				} else {
					var $temp$accum = A4($author$project$Forth$PierConstruction$buildSingleUpto, l, accum, h - l.an.bt, current),
						$temp$current = h,
						$temp$top = h + l.an.bQ,
						$temp$locs = ls;
					accum = $temp$accum;
					current = $temp$current;
					top = $temp$top;
					locs = $temp$locs;
					continue constructSinglePierRec;
				}
			}
		}
	});
var $author$project$Forth$PierConstruction$mergeMargin = F2(
	function (x, y) {
		return {
			bt: A2($elm$core$Basics$max, x.bt, y.bt),
			bQ: A2($elm$core$Basics$max, x.bQ, y.bQ)
		};
	});
var $author$project$Forth$PierConstruction$mergePierLocations = function (list) {
	return $elm$core$Dict$toList(
		A3(
			$elm$core$List$foldl,
			function (loc) {
				return A2(
					$elm$core$Dict$update,
					loc.E.s,
					function (elem) {
						if (elem.$ === 1) {
							return $elm$core$Maybe$Just(loc);
						} else {
							var x = elem.a;
							return $elm$core$Maybe$Just(
								_Utils_update(
									x,
									{
										an: A2($author$project$Forth$PierConstruction$mergeMargin, x.an, loc.an)
									}));
						}
					});
			},
			$elm$core$Dict$empty,
			list));
};
var $author$project$Forth$PierConstruction$constructSinglePier = function (list) {
	return A4(
		$author$project$Forth$PierConstruction$constructSinglePierRec,
		_List_Nil,
		0,
		0,
		$author$project$Forth$PierConstruction$mergePierLocations(list));
};
var $author$project$Forth$PierConstruction$singlePier = function (single) {
	return A3(
		$author$project$Forth$PierConstruction$foldlResult,
		F2(
			function (_v0, result) {
				var _v1 = _v0.b;
				var pierLocs = _v1.b;
				return A2(
					$elm$core$Result$map,
					function (r1) {
						return A2($elm$core$List$append, r1, result);
					},
					$author$project$Forth$PierConstruction$constructSinglePier(pierLocs));
			}),
		_List_Nil,
		$elm$core$Dict$toList(single));
};
var $author$project$Forth$PierConstruction$toPierPlacement = function (list) {
	return A2(
		$elm$core$Result$andThen,
		function (_v0) {
			var single = _v0.a;
			var _double = _v0.b;
			return A3(
				$elm$core$Result$map2,
				F2(
					function (s, d) {
						return _Utils_ap(s, d);
					}),
				$author$project$Forth$PierConstruction$singlePier(single),
				$author$project$Forth$PierConstruction$doublePier(_double));
		},
		A2(
			$elm$core$Result$andThen,
			$author$project$Forth$PierConstruction$doubleTrackPiers,
			A2(
				$elm$core$Result$andThen,
				$author$project$Forth$PierConstruction$divideIntoDict,
				A2(
					$elm$core$Result$map,
					$author$project$Forth$PierConstruction$cleansePierPlacements,
					$elm$core$Result$Ok(list)))));
};
var $author$project$Forth$Interpreter$haltWithSuccess = function (status) {
	var _v0 = $author$project$Forth$PierConstruction$toPierPlacement(status.U);
	if (!_v0.$) {
		var pierPlacement = _v0.a;
		return {
			a5: $elm$core$Maybe$Nothing,
			U: pierPlacement,
			bk: $author$project$Forth$Statistics$getRailCount(
				A2(
					$elm$core$List$map,
					function (x) {
						return x.c$;
					},
					status.u)),
			u: status.u
		};
	} else {
		var err = _v0.a;
		return {
			a5: $elm$core$Maybe$Just(err),
			U: _List_Nil,
			bk: $author$project$Forth$Statistics$getRailCount(
				A2(
					$elm$core$List$map,
					function (x) {
						return x.c$;
					},
					status.u)),
			u: status.u
		};
	}
};
var $author$project$Rail$AutoPoint = {$: 16};
var $author$project$Rail$AutoTurnout = {$: 15};
var $author$project$Rail$Curve45 = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $author$project$Rail$Curve90 = F2(
	function (a, b) {
		return {$: 5, a: a, b: b};
	});
var $author$project$Rail$EightPoint = F2(
	function (a, b) {
		return {$: 9, a: a, b: b};
	});
var $author$project$Rail$Flipped = 1;
var $author$project$Rail$JointChange = function (a) {
	return {$: 10, a: a};
};
var $author$project$Rail$NotFlipped = 0;
var $author$project$Rail$OuterCurve45 = F2(
	function (a, b) {
		return {$: 6, a: a, b: b};
	});
var $author$project$Rail$SingleDouble = F2(
	function (a, b) {
		return {$: 8, a: a, b: b};
	});
var $author$project$Rail$Slope = F2(
	function (a, b) {
		return {$: 11, a: a, b: b};
	});
var $author$project$Rail$SlopeCurveA = {$: 12};
var $author$project$Rail$SlopeCurveB = {$: 13};
var $author$project$Rail$Stop = function (a) {
	return {$: 14, a: a};
};
var $author$project$Rail$Straight1 = function (a) {
	return {$: 0, a: a};
};
var $author$project$Rail$Straight2 = function (a) {
	return {$: 1, a: a};
};
var $author$project$Rail$Straight4 = function (a) {
	return {$: 2, a: a};
};
var $author$project$Rail$Straight8 = function (a) {
	return {$: 3, a: a};
};
var $author$project$Rail$Turnout = F2(
	function (a, b) {
		return {$: 7, a: a, b: b};
	});
var $author$project$Forth$Geometry$Location$addHeight = F2(
	function (diffHeight, location) {
		return _Utils_update(
			location,
			{s: location.s + diffHeight});
	});
var $author$project$Forth$Geometry$RailLocation$addHeight = F2(
	function (diffHeight, railLocation) {
		return _Utils_update(
			railLocation,
			{
				E: A2($author$project$Forth$Geometry$Location$addHeight, diffHeight, railLocation.E)
			});
	});
var $author$project$Forth$Interpreter$executeAscend = F3(
	function (amount, cont, status) {
		var _v0 = status.k;
		if (!_v0.b) {
			return A2($author$project$Forth$Interpreter$haltWithError, 'スタックが空です', status);
		} else {
			var top = _v0.a;
			var restOfStack = _v0.b;
			return cont(
				_Utils_update(
					status,
					{
						k: A2(
							$elm$core$List$cons,
							A2($author$project$Forth$Geometry$RailLocation$addHeight, amount, top),
							restOfStack)
					}));
		}
	});
var $author$project$Rail$Inverted = 1;
var $author$project$Rail$NotInverted = 0;
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $author$project$Rail$map = F2(
	function (f, rail) {
		switch (rail.$) {
			case 0:
				var a = rail.a;
				return $author$project$Rail$Straight1(
					f(a));
			case 1:
				var a = rail.a;
				return $author$project$Rail$Straight2(
					f(a));
			case 2:
				var a = rail.a;
				return $author$project$Rail$Straight4(
					f(a));
			case 3:
				var a = rail.a;
				return $author$project$Rail$Straight8(
					f(a));
			case 4:
				var a = rail.a;
				var b = rail.b;
				return A2(
					$author$project$Rail$Curve45,
					a,
					f(b));
			case 5:
				var a = rail.a;
				var b = rail.b;
				return A2(
					$author$project$Rail$Curve90,
					a,
					f(b));
			case 6:
				var a = rail.a;
				var b = rail.b;
				return A2(
					$author$project$Rail$OuterCurve45,
					a,
					f(b));
			case 8:
				var a = rail.a;
				var b = rail.b;
				return A2(
					$author$project$Rail$SingleDouble,
					a,
					f(b));
			case 9:
				var a = rail.a;
				var b = rail.b;
				return A2(
					$author$project$Rail$EightPoint,
					a,
					f(b));
			case 7:
				var a = rail.a;
				var b = rail.b;
				return A2(
					$author$project$Rail$Turnout,
					a,
					f(b));
			case 10:
				var a = rail.a;
				return $author$project$Rail$JointChange(
					f(a));
			case 11:
				var a = rail.a;
				var b = rail.b;
				return A2(
					$author$project$Rail$Slope,
					a,
					f(b));
			case 12:
				return $author$project$Rail$SlopeCurveA;
			case 13:
				return $author$project$Rail$SlopeCurveB;
			case 14:
				var a = rail.a;
				return $author$project$Rail$Stop(
					f(a));
			case 15:
				return $author$project$Rail$AutoTurnout;
			default:
				return $author$project$Rail$AutoPoint;
		}
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $author$project$Rail$canInvert = function (rail) {
	return !_Utils_eq(
		A2(
			$author$project$Rail$map,
			$elm$core$Basics$always(true),
			rail),
		A2(
			$author$project$Rail$map,
			$elm$core$Basics$always(false),
			rail));
};
var $mgold$elm_nonempty_list$List$Nonempty$Nonempty = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$Forth$Geometry$Joint$Plus = 0;
var $author$project$Forth$Geometry$RailLocation$make = F5(
	function (single, _double, height, dir, joint) {
		return {
			S: joint,
			E: A4($author$project$Forth$Geometry$Location$make, single, _double, height, dir)
		};
	});
var $author$project$Forth$RailPiece$doubleTrackLeft = A5(
	$author$project$Forth$Geometry$RailLocation$make,
	A4($author$project$Forth$Geometry$Rot45$make, 4, 0, 0, 0),
	A4($author$project$Forth$Geometry$Rot45$make, 0, 0, 1, 0),
	0,
	$author$project$Forth$Geometry$Dir$e,
	0);
var $author$project$Forth$RailPiece$doubleTrackRight = A5(
	$author$project$Forth$Geometry$RailLocation$make,
	A4($author$project$Forth$Geometry$Rot45$make, 4, 0, 0, 0),
	A4($author$project$Forth$Geometry$Rot45$make, 0, 0, -1, 0),
	0,
	$author$project$Forth$Geometry$Dir$e,
	0);
var $author$project$Forth$Geometry$PierLocation$flatRailMargin = {bt: 0, bQ: 4};
var $author$project$Forth$Geometry$Rot45$conj = function (_v0) {
	var a = _v0.a;
	var b = _v0.b;
	var c = _v0.c;
	var d = _v0.d;
	return A4($author$project$Forth$Geometry$Rot45$make, a, -d, -c, -b);
};
var $author$project$Forth$Geometry$Dir$inv = function (_v0) {
	var d = _v0;
	return (!d) ? 0 : (8 - d);
};
var $author$project$Forth$Geometry$Location$flip = function (loc) {
	return {
		C: $author$project$Forth$Geometry$Dir$inv(loc.C),
		J: $author$project$Forth$Geometry$Rot45$conj(loc.J),
		s: -loc.s,
		P: $author$project$Forth$Geometry$Rot45$conj(loc.P)
	};
};
var $author$project$Forth$Geometry$PierLocation$flip = function (loc) {
	return {
		E: $author$project$Forth$Geometry$Location$flip(loc.E),
		an: loc.an
	};
};
var $author$project$Forth$Geometry$RailLocation$flip = function (loc) {
	return _Utils_update(
		loc,
		{
			E: $author$project$Forth$Geometry$Location$flip(loc.E)
		});
};
var $mgold$elm_nonempty_list$List$Nonempty$map = F2(
	function (f, _v0) {
		var x = _v0.a;
		var xs = _v0.b;
		return A2(
			$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
			f(x),
			A2($elm$core$List$map, f, xs));
	});
var $author$project$Forth$RailPiece$reverseTail = function (_v0) {
	var x = _v0.a;
	var xs = _v0.b;
	return A2(
		$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
		x,
		$elm$core$List$reverse(xs));
};
var $author$project$Forth$RailPiece$flip = F2(
	function (flipped, piece) {
		if (!flipped) {
			return piece;
		} else {
			return {
				A: $author$project$Forth$Geometry$RailLocation$flip(piece.A),
				ek: A2($elm$core$List$map, $author$project$Forth$Geometry$PierLocation$flip, piece.ek),
				o: A2(
					$mgold$elm_nonempty_list$List$Nonempty$map,
					$author$project$Forth$Geometry$RailLocation$flip,
					$author$project$Forth$RailPiece$reverseTail(piece.o))
			};
		}
	});
var $author$project$Forth$Geometry$PierLocation$fromRailLocation = F2(
	function (margin, loc) {
		return {E: loc.E, an: margin};
	});
var $mgold$elm_nonempty_list$List$Nonempty$toList = function (_v0) {
	var x = _v0.a;
	var xs = _v0.b;
	return A2($elm$core$List$cons, x, xs);
};
var $author$project$Forth$Geometry$Joint$Minus = 1;
var $author$project$Forth$Geometry$RailLocation$zero = A5($author$project$Forth$Geometry$RailLocation$make, $author$project$Forth$Geometry$Rot45$zero, $author$project$Forth$Geometry$Rot45$zero, 0, $author$project$Forth$Geometry$Dir$e, 1);
var $author$project$Forth$RailPiece$makeFlatRailPiece = function (list) {
	return {
		A: $author$project$Forth$Geometry$RailLocation$zero,
		ek: A2(
			$elm$core$List$map,
			$author$project$Forth$Geometry$PierLocation$fromRailLocation($author$project$Forth$Geometry$PierLocation$flatRailMargin),
			$mgold$elm_nonempty_list$List$Nonempty$toList(list)),
		o: list
	};
};
var $author$project$Forth$RailPiece$fourEnds = F4(
	function (a, b, c, d) {
		return $author$project$Forth$RailPiece$makeFlatRailPiece(
			A2(
				$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
				a,
				_List_fromArray(
					[b, c, d])));
	});
var $author$project$Forth$RailPiece$goStraight1 = A5(
	$author$project$Forth$Geometry$RailLocation$make,
	A4($author$project$Forth$Geometry$Rot45$make, 1, 0, 0, 0),
	$author$project$Forth$Geometry$Rot45$zero,
	0,
	$author$project$Forth$Geometry$Dir$e,
	0);
var $author$project$Forth$RailPiece$goStraight1Minus = A5(
	$author$project$Forth$Geometry$RailLocation$make,
	A4($author$project$Forth$Geometry$Rot45$make, 1, 0, 0, 0),
	$author$project$Forth$Geometry$Rot45$zero,
	0,
	$author$project$Forth$Geometry$Dir$e,
	1);
var $author$project$Forth$Geometry$RailLocation$mul = F2(
	function (global, local) {
		return {
			S: local.S,
			E: A2($author$project$Forth$Geometry$Location$mul, global, local.E)
		};
	});
var $author$project$Forth$RailPiece$goStraight2 = A2($author$project$Forth$Geometry$RailLocation$mul, $author$project$Forth$RailPiece$goStraight1.E, $author$project$Forth$RailPiece$goStraight1);
var $author$project$Forth$RailPiece$goStraight4 = A2($author$project$Forth$Geometry$RailLocation$mul, $author$project$Forth$RailPiece$goStraight2.E, $author$project$Forth$RailPiece$goStraight2);
var $author$project$Forth$RailPiece$goStraight6 = A2($author$project$Forth$Geometry$RailLocation$mul, $author$project$Forth$RailPiece$goStraight2.E, $author$project$Forth$RailPiece$goStraight4);
var $author$project$Forth$RailPiece$goStraight8 = A2($author$project$Forth$Geometry$RailLocation$mul, $author$project$Forth$RailPiece$goStraight4.E, $author$project$Forth$RailPiece$goStraight4);
var $author$project$Forth$Geometry$Dir$w = 4;
var $author$project$Forth$RailPiece$minusZero = A5($author$project$Forth$Geometry$RailLocation$make, $author$project$Forth$Geometry$Rot45$zero, $author$project$Forth$Geometry$Rot45$zero, 0, $author$project$Forth$Geometry$Dir$w, 1);
var $author$project$Forth$RailPiece$plusZero = A5($author$project$Forth$Geometry$RailLocation$make, $author$project$Forth$Geometry$Rot45$zero, $author$project$Forth$Geometry$Rot45$zero, 0, $author$project$Forth$Geometry$Dir$w, 0);
var $author$project$Forth$Geometry$RailLocation$setHeight = F2(
	function (newHeight, railLocation) {
		return _Utils_update(
			railLocation,
			{
				E: A2($author$project$Forth$Geometry$Location$setHeight, newHeight, railLocation.E)
			});
	});
var $author$project$Forth$Geometry$Dir$se = 7;
var $author$project$Forth$RailPiece$slopeCurveA = A5(
	$author$project$Forth$Geometry$RailLocation$make,
	A4($author$project$Forth$Geometry$Rot45$make, 0, 4, -4, 0),
	$author$project$Forth$Geometry$Rot45$zero,
	1,
	$author$project$Forth$Geometry$Dir$se,
	1);
var $author$project$Forth$Geometry$Dir$ne = 1;
var $author$project$Forth$RailPiece$slopeCurveB = A5(
	$author$project$Forth$Geometry$RailLocation$make,
	A4($author$project$Forth$Geometry$Rot45$make, 0, 0, 4, -4),
	$author$project$Forth$Geometry$Rot45$zero,
	1,
	$author$project$Forth$Geometry$Dir$ne,
	0);
var $author$project$Forth$Geometry$PierLocation$slopeCurveMargin = {bt: 1, bQ: 4};
var $author$project$Forth$RailPiece$threeEnds = F3(
	function (a, b, c) {
		return $author$project$Forth$RailPiece$makeFlatRailPiece(
			A2(
				$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
				a,
				_List_fromArray(
					[b, c])));
	});
var $author$project$Forth$RailPiece$turnLeft45deg = A5(
	$author$project$Forth$Geometry$RailLocation$make,
	A4($author$project$Forth$Geometry$Rot45$make, 0, 0, 4, -4),
	$author$project$Forth$Geometry$Rot45$zero,
	0,
	$author$project$Forth$Geometry$Dir$ne,
	0);
var $author$project$Forth$RailPiece$turnLeft90deg = A2($author$project$Forth$Geometry$RailLocation$mul, $author$project$Forth$RailPiece$turnLeft45deg.E, $author$project$Forth$RailPiece$turnLeft45deg);
var $author$project$Forth$RailPiece$turnLeftOuter45deg = A5(
	$author$project$Forth$Geometry$RailLocation$make,
	A4($author$project$Forth$Geometry$Rot45$make, 0, 0, 4, -4),
	A4($author$project$Forth$Geometry$Rot45$make, 0, 0, 1, -1),
	0,
	$author$project$Forth$Geometry$Dir$ne,
	0);
var $author$project$Forth$RailPiece$turnRight45deg = $author$project$Forth$Geometry$RailLocation$flip($author$project$Forth$RailPiece$turnLeft45deg);
var $author$project$Forth$RailPiece$twoEnds = F2(
	function (a, b) {
		return $author$project$Forth$RailPiece$makeFlatRailPiece(
			A2(
				$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
				a,
				_List_fromArray(
					[b])));
	});
var $author$project$Forth$RailPiece$getRailPiece = function (rail) {
	switch (rail.$) {
		case 0:
			return A2($author$project$Forth$RailPiece$twoEnds, $author$project$Forth$RailPiece$minusZero, $author$project$Forth$RailPiece$goStraight1);
		case 1:
			return A2($author$project$Forth$RailPiece$twoEnds, $author$project$Forth$RailPiece$minusZero, $author$project$Forth$RailPiece$goStraight2);
		case 2:
			return A2($author$project$Forth$RailPiece$twoEnds, $author$project$Forth$RailPiece$minusZero, $author$project$Forth$RailPiece$goStraight4);
		case 3:
			return A2($author$project$Forth$RailPiece$twoEnds, $author$project$Forth$RailPiece$minusZero, $author$project$Forth$RailPiece$goStraight8);
		case 4:
			var f = rail.a;
			return A2(
				$author$project$Forth$RailPiece$flip,
				f,
				A2($author$project$Forth$RailPiece$twoEnds, $author$project$Forth$RailPiece$minusZero, $author$project$Forth$RailPiece$turnLeft45deg));
		case 5:
			var f = rail.a;
			return A2(
				$author$project$Forth$RailPiece$flip,
				f,
				{
					A: $author$project$Forth$Geometry$RailLocation$zero,
					ek: A2(
						$elm$core$List$map,
						$author$project$Forth$Geometry$PierLocation$fromRailLocation($author$project$Forth$Geometry$PierLocation$flatRailMargin),
						_List_fromArray(
							[$author$project$Forth$RailPiece$minusZero, $author$project$Forth$RailPiece$turnLeft45deg, $author$project$Forth$RailPiece$turnLeft90deg])),
					o: A2(
						$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
						$author$project$Forth$RailPiece$minusZero,
						_List_fromArray(
							[$author$project$Forth$RailPiece$turnLeft90deg]))
				});
		case 6:
			var f = rail.a;
			return A2(
				$author$project$Forth$RailPiece$flip,
				f,
				A2($author$project$Forth$RailPiece$twoEnds, $author$project$Forth$RailPiece$minusZero, $author$project$Forth$RailPiece$turnLeftOuter45deg));
		case 7:
			var f = rail.a;
			return A2(
				$author$project$Forth$RailPiece$flip,
				f,
				A3($author$project$Forth$RailPiece$threeEnds, $author$project$Forth$RailPiece$minusZero, $author$project$Forth$RailPiece$goStraight4, $author$project$Forth$RailPiece$turnLeft45deg));
		case 8:
			var f = rail.a;
			return A2(
				$author$project$Forth$RailPiece$flip,
				f,
				A3($author$project$Forth$RailPiece$threeEnds, $author$project$Forth$RailPiece$minusZero, $author$project$Forth$RailPiece$goStraight4, $author$project$Forth$RailPiece$doubleTrackLeft));
		case 9:
			var f = rail.a;
			return A2(
				$author$project$Forth$RailPiece$flip,
				f,
				A3($author$project$Forth$RailPiece$threeEnds, $author$project$Forth$RailPiece$minusZero, $author$project$Forth$RailPiece$turnRight45deg, $author$project$Forth$RailPiece$turnLeft45deg));
		case 10:
			return A2($author$project$Forth$RailPiece$twoEnds, $author$project$Forth$RailPiece$minusZero, $author$project$Forth$RailPiece$goStraight1Minus);
		case 11:
			var f = rail.a;
			return A2(
				$author$project$Forth$RailPiece$flip,
				f,
				A2(
					$author$project$Forth$RailPiece$twoEnds,
					$author$project$Forth$RailPiece$minusZero,
					A2($author$project$Forth$Geometry$RailLocation$setHeight, 4, $author$project$Forth$RailPiece$goStraight8)));
		case 12:
			return {
				A: $author$project$Forth$Geometry$RailLocation$zero,
				ek: _List_fromArray(
					[
						{E: $author$project$Forth$RailPiece$plusZero.E, an: $author$project$Forth$Geometry$PierLocation$flatRailMargin},
						{E: $author$project$Forth$RailPiece$slopeCurveA.E, an: $author$project$Forth$Geometry$PierLocation$slopeCurveMargin}
					]),
				o: A2(
					$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
					$author$project$Forth$RailPiece$plusZero,
					_List_fromArray(
						[$author$project$Forth$RailPiece$slopeCurveA]))
			};
		case 13:
			return {
				A: $author$project$Forth$Geometry$RailLocation$zero,
				ek: _List_fromArray(
					[
						{E: $author$project$Forth$RailPiece$plusZero.E, an: $author$project$Forth$Geometry$PierLocation$flatRailMargin},
						{E: $author$project$Forth$RailPiece$slopeCurveB.E, an: $author$project$Forth$Geometry$PierLocation$slopeCurveMargin}
					]),
				o: A2(
					$mgold$elm_nonempty_list$List$Nonempty$Nonempty,
					$author$project$Forth$RailPiece$minusZero,
					_List_fromArray(
						[$author$project$Forth$RailPiece$slopeCurveB]))
			};
		case 14:
			return A2($author$project$Forth$RailPiece$twoEnds, $author$project$Forth$RailPiece$minusZero, $author$project$Forth$RailPiece$goStraight4);
		case 15:
			return A3(
				$author$project$Forth$RailPiece$threeEnds,
				$author$project$Forth$RailPiece$minusZero,
				$author$project$Forth$RailPiece$goStraight6,
				A2($author$project$Forth$Geometry$RailLocation$mul, $author$project$Forth$RailPiece$goStraight2.E, $author$project$Forth$RailPiece$turnLeft45deg));
		default:
			return A4(
				$author$project$Forth$RailPiece$fourEnds,
				$author$project$Forth$RailPiece$minusZero,
				A2($author$project$Forth$Geometry$RailLocation$mul, $author$project$Forth$RailPiece$goStraight2.E, $author$project$Forth$RailPiece$doubleTrackRight),
				$author$project$Forth$RailPiece$goStraight6,
				A2($author$project$Forth$Geometry$RailLocation$mul, $author$project$Forth$RailPiece$goStraight2.E, $author$project$Forth$RailPiece$turnLeft45deg));
	}
};
var $mgold$elm_nonempty_list$List$Nonempty$head = function (_v0) {
	var x = _v0.a;
	var xs = _v0.b;
	return x;
};
var $author$project$Forth$Geometry$Joint$invert = function (p) {
	if (!p) {
		return 1;
	} else {
		return 0;
	}
};
var $author$project$Forth$Geometry$RailLocation$invertJoint = function (loc) {
	return _Utils_update(
		loc,
		{
			S: $author$project$Forth$Geometry$Joint$invert(loc.S)
		});
};
var $author$project$Forth$RailPiece$invert = F2(
	function (inverted, piece) {
		if (!inverted) {
			return piece;
		} else {
			return {
				A: $author$project$Forth$Geometry$RailLocation$invertJoint(piece.A),
				ek: piece.ek,
				o: A2($mgold$elm_nonempty_list$List$Nonempty$map, $author$project$Forth$Geometry$RailLocation$invertJoint, piece.o)
			};
		}
	});
var $author$project$Forth$RailPiece$loop = F3(
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
var $author$project$Forth$Geometry$Joint$match = F2(
	function (x, y) {
		return !_Utils_eq(x, y);
	});
var $author$project$Forth$Geometry$Rot45$negate = function (_v0) {
	var a = _v0.a;
	var b = _v0.b;
	var c = _v0.c;
	var d = _v0.d;
	return A4($author$project$Forth$Geometry$Rot45$make, -a, -b, -c, -d);
};
var $author$project$Forth$Geometry$Location$inv = function (x) {
	var invDir = $author$project$Forth$Geometry$Dir$inv(x.C);
	var invDirRot = $author$project$Forth$Geometry$Dir$toRot45(invDir);
	var single = A2(
		$author$project$Forth$Geometry$Rot45$mul,
		invDirRot,
		$author$project$Forth$Geometry$Rot45$negate(x.P));
	var _double = A2(
		$author$project$Forth$Geometry$Rot45$mul,
		invDirRot,
		$author$project$Forth$Geometry$Rot45$negate(x.J));
	return {C: invDir, J: _double, s: -x.s, P: single};
};
var $author$project$Forth$Geometry$RailLocation$inv = function (loc) {
	return {
		S: loc.S,
		E: $author$project$Forth$Geometry$Location$inv(loc.E)
	};
};
var $author$project$Forth$Geometry$PierLocation$mul = F2(
	function (global, local) {
		return {
			E: A2($author$project$Forth$Geometry$Location$mul, global, local.E),
			an: local.an
		};
	});
var $author$project$Forth$RailPiece$rotate = function (_v0) {
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
var $author$project$Forth$RailPiece$rotateRailPiece = function (piece) {
	var _v0 = piece.o;
	if (!_v0.b.b) {
		return piece;
	} else {
		var current = _v0.a;
		var _v1 = _v0.b;
		var next = _v1.a;
		var rot = A2(
			$author$project$Forth$Geometry$RailLocation$mul,
			current.E,
			$author$project$Forth$Geometry$RailLocation$inv(next));
		return {
			A: A2($author$project$Forth$Geometry$RailLocation$mul, rot.E, piece.A),
			ek: A2(
				$elm$core$List$map,
				$author$project$Forth$Geometry$PierLocation$mul(rot.E),
				piece.ek),
			o: $author$project$Forth$RailPiece$rotate(
				A2(
					$mgold$elm_nonempty_list$List$Nonempty$map,
					$author$project$Forth$Geometry$RailLocation$mul(rot.E),
					piece.o))
		};
	}
};
var $author$project$Forth$RailPiece$getAppropriateRailAndPieceForJoint = F3(
	function (joint, railType, rotation) {
		var railPiece = A3(
			$author$project$Forth$RailPiece$loop,
			rotation,
			$author$project$Forth$RailPiece$rotateRailPiece,
			$author$project$Forth$RailPiece$getRailPiece(railType));
		return A2(
			$author$project$Forth$Geometry$Joint$match,
			joint,
			$mgold$elm_nonempty_list$List$Nonempty$head(railPiece.o).S) ? $elm$core$Maybe$Just(
			_Utils_Tuple2(
				A2(
					$author$project$Rail$map,
					$elm$core$Basics$always(0),
					railType),
				railPiece)) : ($author$project$Rail$canInvert(railType) ? $elm$core$Maybe$Just(
			_Utils_Tuple2(
				A2(
					$author$project$Rail$map,
					$elm$core$Basics$always(1),
					railType),
				A2($author$project$Forth$RailPiece$invert, 1, railPiece))) : $elm$core$Maybe$Nothing);
	});
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
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
var $author$project$RailPlacement$make = F3(
	function (rail, position, angle) {
		return {dk: angle, eo: position, c$: rail};
	});
var $author$project$Forth$Geometry$RailLocation$toVec3 = function (loc) {
	return $author$project$Forth$Geometry$Location$toVec3(loc.E);
};
var $author$project$Forth$RailPiece$toRailPlacement = F2(
	function (rail, location) {
		return A3(
			$author$project$RailPlacement$make,
			rail,
			$author$project$Forth$Geometry$RailLocation$toVec3(location),
			$author$project$Forth$Geometry$Dir$toRadian(location.E.C));
	});
var $author$project$Forth$RailPiece$placeRail = function (params) {
	return A2(
		$elm$core$Maybe$map,
		function (_v0) {
			var rail = _v0.a;
			var railPiece = _v0.b;
			return {
				d4: A2(
					$elm$core$List$map,
					$author$project$Forth$Geometry$RailLocation$mul(params.E.E),
					$mgold$elm_nonempty_list$List$Nonempty$tail(railPiece.o)),
				ek: A2(
					$elm$core$List$map,
					$author$project$Forth$Geometry$PierLocation$mul(params.E.E),
					railPiece.ek),
				c$: rail,
				eq: A2(
					$author$project$Forth$RailPiece$toRailPlacement,
					rail,
					A2($author$project$Forth$Geometry$RailLocation$mul, params.E.E, railPiece.A))
			};
		},
		A3($author$project$Forth$RailPiece$getAppropriateRailAndPieceForJoint, params.E.S, params.er, params.ex));
};
var $author$project$Forth$Interpreter$executePlaceRail = F4(
	function (railType, rotation, cont, status) {
		var _v0 = status.k;
		if (!_v0.b) {
			return A2($author$project$Forth$Interpreter$haltWithError, 'スタックが空です', status);
		} else {
			var top = _v0.a;
			var restOfStack = _v0.b;
			var _v1 = $author$project$Forth$RailPiece$placeRail(
				{E: top, er: railType, ex: rotation});
			if (!_v1.$) {
				var nextLocations = _v1.a.d4;
				var railPlacement = _v1.a.eq;
				var pierLocations = _v1.a.ek;
				return cont(
					_Utils_update(
						status,
						{
							U: _Utils_ap(pierLocations, status.U),
							u: A2($elm$core$List$cons, railPlacement, status.u),
							k: _Utils_ap(nextLocations, restOfStack)
						}));
			} else {
				return A2($author$project$Forth$Interpreter$haltWithError, '配置するレールの凹凸が合いません', status);
			}
		}
	});
var $author$project$Forth$Interpreter$railForthGlossary = $elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2(
			'q',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				$author$project$Rail$Straight1(0),
				0)),
			_Utils_Tuple2(
			'h',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				$author$project$Rail$Straight2(0),
				0)),
			_Utils_Tuple2(
			's',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				$author$project$Rail$Straight4(0),
				0)),
			_Utils_Tuple2(
			'ss',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				$author$project$Rail$Straight8(0),
				0)),
			_Utils_Tuple2(
			'l',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Rail$Curve45, 0, 0),
				0)),
			_Utils_Tuple2(
			'll',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Rail$Curve90, 0, 0),
				0)),
			_Utils_Tuple2(
			'r',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Rail$Curve45, 1, 0),
				0)),
			_Utils_Tuple2(
			'rr',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Rail$Curve90, 1, 0),
				0)),
			_Utils_Tuple2(
			'ol',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Rail$OuterCurve45, 0, 0),
				0)),
			_Utils_Tuple2(
			'or',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Rail$OuterCurve45, 1, 0),
				0)),
			_Utils_Tuple2(
			'tl',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Rail$Turnout, 0, 0),
				0)),
			_Utils_Tuple2(
			'tl1',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Rail$Turnout, 0, 0),
				1)),
			_Utils_Tuple2(
			'tl2',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Rail$Turnout, 0, 0),
				2)),
			_Utils_Tuple2(
			'tr',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Rail$Turnout, 1, 0),
				0)),
			_Utils_Tuple2(
			'tr1',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Rail$Turnout, 1, 0),
				1)),
			_Utils_Tuple2(
			'tr2',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Rail$Turnout, 1, 0),
				2)),
			_Utils_Tuple2(
			'dl',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Rail$SingleDouble, 0, 0),
				0)),
			_Utils_Tuple2(
			'dl1',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Rail$SingleDouble, 0, 0),
				1)),
			_Utils_Tuple2(
			'dl2',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Rail$SingleDouble, 0, 0),
				2)),
			_Utils_Tuple2(
			'dr',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Rail$SingleDouble, 1, 0),
				0)),
			_Utils_Tuple2(
			'dr1',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Rail$SingleDouble, 1, 0),
				1)),
			_Utils_Tuple2(
			'dr2',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Rail$SingleDouble, 1, 0),
				2)),
			_Utils_Tuple2(
			'el',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Rail$EightPoint, 0, 0),
				0)),
			_Utils_Tuple2(
			'el1',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Rail$EightPoint, 0, 0),
				1)),
			_Utils_Tuple2(
			'el2',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Rail$EightPoint, 0, 0),
				2)),
			_Utils_Tuple2(
			'er',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Rail$EightPoint, 1, 0),
				0)),
			_Utils_Tuple2(
			'er1',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Rail$EightPoint, 1, 0),
				1)),
			_Utils_Tuple2(
			'er2',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Rail$EightPoint, 1, 0),
				2)),
			_Utils_Tuple2(
			'j',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				$author$project$Rail$JointChange(0),
				0)),
			_Utils_Tuple2(
			'up',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Rail$Slope, 0, 0),
				0)),
			_Utils_Tuple2(
			'dn',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				A2($author$project$Rail$Slope, 1, 0),
				0)),
			_Utils_Tuple2(
			'sa',
			A2($author$project$Forth$Interpreter$executePlaceRail, $author$project$Rail$SlopeCurveA, 0)),
			_Utils_Tuple2(
			'sa1',
			A2($author$project$Forth$Interpreter$executePlaceRail, $author$project$Rail$SlopeCurveA, 1)),
			_Utils_Tuple2(
			'sb',
			A2($author$project$Forth$Interpreter$executePlaceRail, $author$project$Rail$SlopeCurveB, 0)),
			_Utils_Tuple2(
			'sb1',
			A2($author$project$Forth$Interpreter$executePlaceRail, $author$project$Rail$SlopeCurveB, 1)),
			_Utils_Tuple2(
			'stop',
			A2(
				$author$project$Forth$Interpreter$executePlaceRail,
				$author$project$Rail$Stop(0),
				0)),
			_Utils_Tuple2(
			'at',
			A2($author$project$Forth$Interpreter$executePlaceRail, $author$project$Rail$AutoTurnout, 0)),
			_Utils_Tuple2(
			'at1',
			A2($author$project$Forth$Interpreter$executePlaceRail, $author$project$Rail$AutoTurnout, 1)),
			_Utils_Tuple2(
			'at2',
			A2($author$project$Forth$Interpreter$executePlaceRail, $author$project$Rail$AutoTurnout, 2)),
			_Utils_Tuple2(
			'ap',
			A2($author$project$Forth$Interpreter$executePlaceRail, $author$project$Rail$AutoPoint, 0)),
			_Utils_Tuple2(
			'ap1',
			A2($author$project$Forth$Interpreter$executePlaceRail, $author$project$Rail$AutoPoint, 1)),
			_Utils_Tuple2(
			'ap2',
			A2($author$project$Forth$Interpreter$executePlaceRail, $author$project$Rail$AutoPoint, 2)),
			_Utils_Tuple2(
			'ap3',
			A2($author$project$Forth$Interpreter$executePlaceRail, $author$project$Rail$AutoPoint, 3)),
			_Utils_Tuple2(
			'ascend',
			$author$project$Forth$Interpreter$executeAscend(4))
		]));
var $author$project$Forth$Interpreter$executeComment = F3(
	function (depth, tok, status) {
		executeComment:
		while (true) {
			if (depth <= 0) {
				return A2($author$project$Forth$Interpreter$executeRec, tok, status);
			} else {
				if (!tok.b) {
					return A2($author$project$Forth$Interpreter$haltWithError, '[コメント文]', status);
				} else {
					var t = tok.a;
					var ts = tok.b;
					switch (t) {
						case '(':
							var $temp$depth = depth + 1,
								$temp$tok = ts,
								$temp$status = status;
							depth = $temp$depth;
							tok = $temp$tok;
							status = $temp$status;
							continue executeComment;
						case ')':
							var $temp$depth = depth - 1,
								$temp$tok = ts,
								$temp$status = status;
							depth = $temp$depth;
							tok = $temp$tok;
							status = $temp$status;
							continue executeComment;
						default:
							var $temp$depth = depth,
								$temp$tok = ts,
								$temp$status = status;
							depth = $temp$depth;
							tok = $temp$tok;
							status = $temp$status;
							continue executeComment;
					}
				}
			}
		}
	});
var $author$project$Forth$Interpreter$executeRec = F2(
	function (toks, status) {
		if (!toks.b) {
			return $author$project$Forth$Interpreter$haltWithSuccess(status);
		} else {
			var t = toks.a;
			var ts = toks.b;
			var _v1 = A2(
				$elm$core$Dict$get,
				t,
				$author$project$Forth$Interpreter$cyclic$controlWords());
			if (!_v1.$) {
				var thread = _v1.a;
				return A2(thread, ts, status);
			} else {
				var _v2 = A2($elm$core$Dict$get, t, $author$project$Forth$Interpreter$coreGlossary);
				if (!_v2.$) {
					var thread = _v2.a;
					return A2(
						thread,
						$author$project$Forth$Interpreter$executeRec(ts),
						status);
				} else {
					var _v3 = A2($elm$core$Dict$get, t, $author$project$Forth$Interpreter$railForthGlossary);
					if (!_v3.$) {
						var thread = _v3.a;
						return A2(
							thread,
							$author$project$Forth$Interpreter$executeRec(ts),
							status);
					} else {
						return A2($author$project$Forth$Interpreter$haltWithError, '未定義のワードです: ' + t, status);
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
				$author$project$Forth$Interpreter$executeComment(1)),
				_Utils_Tuple2(
				')',
				function (_v6) {
					return $author$project$Forth$Interpreter$haltWithError('余分なコメント終了文字 ) があります');
				})
			]));
}
var $author$project$Forth$Interpreter$controlWords = $author$project$Forth$Interpreter$cyclic$controlWords();
$author$project$Forth$Interpreter$cyclic$controlWords = function () {
	return $author$project$Forth$Interpreter$controlWords;
};
var $author$project$Forth$RailPiece$initialLocation = A5($author$project$Forth$Geometry$RailLocation$make, $author$project$Forth$Geometry$Rot45$zero, $author$project$Forth$Geometry$Rot45$zero, 0, $author$project$Forth$Geometry$Dir$e, 0);
var $author$project$Forth$Interpreter$initialStatus = {
	U: _List_Nil,
	u: _List_Nil,
	k: _List_fromArray(
		[$author$project$Forth$RailPiece$initialLocation])
};
var $elm$core$String$words = _String_words;
var $author$project$Forth$Interpreter$tokenize = function (string) {
	return $elm$core$String$words(string);
};
var $author$project$Forth$Interpreter$execute = function (src) {
	return A2(
		$author$project$Forth$Interpreter$executeRec,
		$author$project$Forth$Interpreter$tokenize(src),
		$author$project$Forth$Interpreter$initialStatus);
};
var $elm$browser$Browser$Dom$getViewport = _Browser_withWindow(_Browser_getViewport);
var $author$project$Graphics$Mesh$init = {aJ: _List_Nil, ax: $elm$core$Dict$empty};
var $dullbananas$elm_touch$Touch$Model = $elm$core$Basics$identity;
var $dullbananas$elm_touch$Touch$Internal$initModel = function (listeners) {
	return {aI: $elm$core$Dict$empty, bA: listeners, bi: $elm$core$Dict$empty};
};
var $dullbananas$elm_touch$Touch$initModel = A2($elm$core$Basics$composeR, $dullbananas$elm_touch$Touch$Internal$initModel, $elm$core$Basics$identity);
var $author$project$Graphics$Mesh$LoadMesh = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $author$project$Graphics$Mesh$allMeshNames = _List_fromArray(
	['straight0_minus', 'straight0_plus', 'straight1_minus', 'straight1_plus', 'straight2_minus', 'straight2_plus', 'straight4_minus', 'straight4_plus', 'curve8_minus', 'curve8_plus', 'curve4_minus', 'curve4_plus', 'outercurve_minus', 'outercurve_plus', 'turnout_minus', 'turnout_plus', 'singledouble_minus', 'singledouble_plus', 'eight_minus', 'eight_plus', 'pole_minus', 'pole_plus', 'stop_minus', 'stop_plus', 'slope_minus', 'slope_plus', 'slopecurveA_plus', 'slopecurveB_minus', 'autoturnout_minus', 'autopoint_minus', 'pier', 'pier_wide', 'pier_4']);
var $author$project$Graphics$Mesh$buildMeshUri = function (name) {
	return './assets/' + (name + '.obj');
};
var $declension$elm_obj_loader$OBJ$defaultSettings = {bT: false};
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$core$Task$onError = _Scheduler_onError;
var $elm$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return $elm$core$Task$command(
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
					task)));
	});
var $elm$http$Http$Internal$EmptyBody = {$: 0};
var $elm$http$Http$emptyBody = $elm$http$Http$Internal$EmptyBody;
var $elm$http$Http$BadPayload = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $elm$http$Http$BadStatus = function (a) {
	return {$: 3, a: a};
};
var $elm$http$Http$BadUrl = function (a) {
	return {$: 0, a: a};
};
var $elm$http$Http$Internal$FormDataBody = function (a) {
	return {$: 2, a: a};
};
var $elm$http$Http$NetworkError = {$: 2};
var $elm$http$Http$Timeout = {$: 1};
var $elm$core$Maybe$isJust = function (maybe) {
	if (!maybe.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$http$Http$Internal$isStringBody = function (body) {
	if (body.$ === 1) {
		return true;
	} else {
		return false;
	}
};
var $elm$http$Http$expectStringResponse = _Http_expectStringResponse;
var $elm$http$Http$expectString = $elm$http$Http$expectStringResponse(
	function (response) {
		return $elm$core$Result$Ok(response.$7);
	});
var $elm$http$Http$Internal$Request = $elm$core$Basics$identity;
var $elm$http$Http$request = $elm$core$Basics$identity;
var $elm$http$Http$getString = function (url) {
	return $elm$http$Http$request(
		{$7: $elm$http$Http$emptyBody, cc: $elm$http$Http$expectString, ci: _List_Nil, d_: 'GET', dd: $elm$core$Maybe$Nothing, bR: url, eN: false});
};
var $declension$elm_obj_loader$OBJ$httpErrorFor = function (e) {
	switch (e.$) {
		case 0:
			var url = e.a;
			return 'Bad URL: ' + url;
		case 1:
			return 'Timed out';
		case 2:
			return 'Network error';
		case 3:
			var response = e.a;
			return 'Failed';
		default:
			var string = e.a;
			var response = e.b;
			return $elm$core$String$fromInt(response.eA.dy) + (': invalid request in ' + response.$7);
	}
};
var $elm$core$Dict$isEmpty = function (dict) {
	if (dict.$ === -2) {
		return true;
	} else {
		return false;
	}
};
var $declension$elm_obj_loader$OBJ$Assembler$addCurrentGroup = function (state) {
	return $elm$core$Dict$isEmpty(state.ak) ? state : _Utils_update(
		state,
		{
			ak: $elm$core$Dict$empty,
			aL: A3($elm$core$Dict$insert, state.aG, state.ak, state.aL)
		});
};
var $declension$elm_obj_loader$OBJ$Types$WithTexture = function (a) {
	return {$: 1, a: a};
};
var $declension$elm_obj_loader$OBJ$Types$WithTextureAndTangent = function (a) {
	return {$: 2, a: a};
};
var $declension$elm_obj_loader$OBJ$Types$WithoutTexture = function (a) {
	return {$: 0, a: a};
};
var $elm_explorations$linear_algebra$Math$Vector3$cross = _MJS_v3cross;
var $elm_explorations$linear_algebra$Math$Vector3$dot = _MJS_v3dot;
var $elm_explorations$linear_algebra$Math$Vector3$lengthSquared = _MJS_v3lengthSquared;
var $elm_explorations$linear_algebra$Math$Vector3$normalize = _MJS_v3normalize;
var $elm_explorations$linear_algebra$Math$Vector3$scale = _MJS_v3scale;
var $elm_explorations$linear_algebra$Math$Vector3$sub = _MJS_v3sub;
var $elm_explorations$linear_algebra$Math$Vector3$toRecord = _MJS_v3toRecord;
var $elm_explorations$linear_algebra$Math$Vector4$vec4 = _MJS_v4;
var $declension$elm_obj_loader$OBJ$Assembler$reducer = F2(
	function (_v0, acc) {
		var position = _v0.eo;
		var texCoord = _v0.dc;
		var normal = _v0.cP;
		var sdir = _v0.bJ;
		var tdir = _v0.bO;
		var w = (A2(
			$elm_explorations$linear_algebra$Math$Vector3$dot,
			A2($elm_explorations$linear_algebra$Math$Vector3$cross, normal, sdir),
			tdir) < 0) ? (-1) : 1;
		var _v1 = (!(!$elm_explorations$linear_algebra$Math$Vector3$lengthSquared(sdir))) ? $elm_explorations$linear_algebra$Math$Vector3$toRecord(
			$elm_explorations$linear_algebra$Math$Vector3$normalize(
				A2(
					$elm_explorations$linear_algebra$Math$Vector3$sub,
					sdir,
					A2(
						$elm_explorations$linear_algebra$Math$Vector3$scale,
						A2($elm_explorations$linear_algebra$Math$Vector3$dot, normal, sdir),
						normal)))) : $elm_explorations$linear_algebra$Math$Vector3$toRecord(
			A2(
				$elm_explorations$linear_algebra$Math$Vector3$cross,
				$elm_explorations$linear_algebra$Math$Vector3$normalize(
					A2(
						$elm_explorations$linear_algebra$Math$Vector3$sub,
						tdir,
						A2(
							$elm_explorations$linear_algebra$Math$Vector3$scale,
							A2($elm_explorations$linear_algebra$Math$Vector3$dot, normal, tdir),
							normal))),
				normal));
		var x = _v1.Z;
		var y = _v1._;
		var z = _v1.a_;
		return A2(
			$elm$core$List$cons,
			{
				cP: normal,
				eo: position,
				eE: A4($elm_explorations$linear_algebra$Math$Vector4$vec4, x, y, z, w),
				dc: texCoord
			},
			acc);
	});
var $declension$elm_obj_loader$OBJ$Assembler$finalizeMesh = function (mesh) {
	switch (mesh.$) {
		case 1:
			var m = mesh.a;
			return $declension$elm_obj_loader$OBJ$Types$WithTexture(m);
		case 0:
			var m = mesh.a;
			return $declension$elm_obj_loader$OBJ$Types$WithoutTexture(m);
		default:
			var m = mesh.a;
			return $declension$elm_obj_loader$OBJ$Types$WithTextureAndTangent(
				{
					ba: m.ba,
					bs: A3($elm$core$Array$foldr, $declension$elm_obj_loader$OBJ$Assembler$reducer, _List_Nil, m.bs)
				});
	}
};
var $declension$elm_obj_loader$OBJ$Assembler$addCurrentMesh = function (state) {
	var _v0 = state.I;
	if (!_v0.$) {
		var m = _v0.a;
		return _Utils_update(
			state,
			{
				ak: A3(
					$elm$core$Dict$insert,
					state.a3,
					$declension$elm_obj_loader$OBJ$Assembler$finalizeMesh(m),
					state.ak),
				I: $elm$core$Maybe$Nothing,
				aM: $elm$core$Dict$empty,
				aN: $elm$core$Dict$empty,
				aO: $elm$core$Dict$empty
			});
	} else {
		return state;
	}
};
var $declension$elm_obj_loader$OBJ$InternalTypes$WithTextureAndTangentT = function (a) {
	return {$: 2, a: a};
};
var $declension$elm_obj_loader$OBJ$InternalTypes$WithTextureT = function (a) {
	return {$: 1, a: a};
};
var $declension$elm_obj_loader$OBJ$InternalTypes$WithoutTextureT = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$appendN = _JsArray_appendN;
var $elm$core$Elm$JsArray$slice = _JsArray_slice;
var $elm$core$Array$appendHelpBuilder = F2(
	function (tail, builder) {
		var tailLen = $elm$core$Elm$JsArray$length(tail);
		var notAppended = ($elm$core$Array$branchFactor - $elm$core$Elm$JsArray$length(builder.h)) - tailLen;
		var appended = A3($elm$core$Elm$JsArray$appendN, $elm$core$Array$branchFactor, builder.h, tail);
		return (notAppended < 0) ? {
			i: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.i),
			f: builder.f + 1,
			h: A3($elm$core$Elm$JsArray$slice, notAppended, tailLen, tail)
		} : ((!notAppended) ? {
			i: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.i),
			f: builder.f + 1,
			h: $elm$core$Elm$JsArray$empty
		} : {i: builder.i, f: builder.f, h: appended});
	});
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Elm$JsArray$push = _JsArray_push;
var $elm$core$Elm$JsArray$singleton = _JsArray_singleton;
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var $elm$core$Array$insertTailInTree = F4(
	function (shift, index, tail, tree) {
		var pos = $elm$core$Array$bitMask & (index >>> shift);
		if (_Utils_cmp(
			pos,
			$elm$core$Elm$JsArray$length(tree)) > -1) {
			if (shift === 5) {
				return A2(
					$elm$core$Elm$JsArray$push,
					$elm$core$Array$Leaf(tail),
					tree);
			} else {
				var newSub = $elm$core$Array$SubTree(
					A4($elm$core$Array$insertTailInTree, shift - $elm$core$Array$shiftStep, index, tail, $elm$core$Elm$JsArray$empty));
				return A2($elm$core$Elm$JsArray$push, newSub, tree);
			}
		} else {
			var value = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!value.$) {
				var subTree = value.a;
				var newSub = $elm$core$Array$SubTree(
					A4($elm$core$Array$insertTailInTree, shift - $elm$core$Array$shiftStep, index, tail, subTree));
				return A3($elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			} else {
				var newSub = $elm$core$Array$SubTree(
					A4(
						$elm$core$Array$insertTailInTree,
						shift - $elm$core$Array$shiftStep,
						index,
						tail,
						$elm$core$Elm$JsArray$singleton(value)));
				return A3($elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			}
		}
	});
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Array$unsafeReplaceTail = F2(
	function (newTail, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		var originalTailLen = $elm$core$Elm$JsArray$length(tail);
		var newTailLen = $elm$core$Elm$JsArray$length(newTail);
		var newArrayLen = len + (newTailLen - originalTailLen);
		if (_Utils_eq(newTailLen, $elm$core$Array$branchFactor)) {
			var overflow = _Utils_cmp(newArrayLen >>> $elm$core$Array$shiftStep, 1 << startShift) > 0;
			if (overflow) {
				var newShift = startShift + $elm$core$Array$shiftStep;
				var newTree = A4(
					$elm$core$Array$insertTailInTree,
					newShift,
					len,
					newTail,
					$elm$core$Elm$JsArray$singleton(
						$elm$core$Array$SubTree(tree)));
				return A4($elm$core$Array$Array_elm_builtin, newArrayLen, newShift, newTree, $elm$core$Elm$JsArray$empty);
			} else {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					newArrayLen,
					startShift,
					A4($elm$core$Array$insertTailInTree, startShift, len, newTail, tree),
					$elm$core$Elm$JsArray$empty);
			}
		} else {
			return A4($elm$core$Array$Array_elm_builtin, newArrayLen, startShift, tree, newTail);
		}
	});
var $elm$core$Array$appendHelpTree = F2(
	function (toAppend, array) {
		var len = array.a;
		var tree = array.c;
		var tail = array.d;
		var itemsToAppend = $elm$core$Elm$JsArray$length(toAppend);
		var notAppended = ($elm$core$Array$branchFactor - $elm$core$Elm$JsArray$length(tail)) - itemsToAppend;
		var appended = A3($elm$core$Elm$JsArray$appendN, $elm$core$Array$branchFactor, tail, toAppend);
		var newArray = A2($elm$core$Array$unsafeReplaceTail, appended, array);
		if (notAppended < 0) {
			var nextTail = A3($elm$core$Elm$JsArray$slice, notAppended, itemsToAppend, toAppend);
			return A2($elm$core$Array$unsafeReplaceTail, nextTail, newArray);
		} else {
			return newArray;
		}
	});
var $elm$core$Elm$JsArray$foldl = _JsArray_foldl;
var $elm$core$Array$builderFromArray = function (_v0) {
	var len = _v0.a;
	var tree = _v0.c;
	var tail = _v0.d;
	var helper = F2(
		function (node, acc) {
			if (!node.$) {
				var subTree = node.a;
				return A3($elm$core$Elm$JsArray$foldl, helper, acc, subTree);
			} else {
				return A2($elm$core$List$cons, node, acc);
			}
		});
	return {
		i: A3($elm$core$Elm$JsArray$foldl, helper, _List_Nil, tree),
		f: (len / $elm$core$Array$branchFactor) | 0,
		h: tail
	};
};
var $elm$core$Array$append = F2(
	function (a, _v0) {
		var aTail = a.d;
		var bLen = _v0.a;
		var bTree = _v0.c;
		var bTail = _v0.d;
		if (_Utils_cmp(bLen, $elm$core$Array$branchFactor * 4) < 1) {
			var foldHelper = F2(
				function (node, array) {
					if (!node.$) {
						var tree = node.a;
						return A3($elm$core$Elm$JsArray$foldl, foldHelper, array, tree);
					} else {
						var leaf = node.a;
						return A2($elm$core$Array$appendHelpTree, leaf, array);
					}
				});
			return A2(
				$elm$core$Array$appendHelpTree,
				bTail,
				A3($elm$core$Elm$JsArray$foldl, foldHelper, a, bTree));
		} else {
			var foldHelper = F2(
				function (node, builder) {
					if (!node.$) {
						var tree = node.a;
						return A3($elm$core$Elm$JsArray$foldl, foldHelper, builder, tree);
					} else {
						var leaf = node.a;
						return A2($elm$core$Array$appendHelpBuilder, leaf, builder);
					}
				});
			return A2(
				$elm$core$Array$builderToArray,
				true,
				A2(
					$elm$core$Array$appendHelpBuilder,
					bTail,
					A3(
						$elm$core$Elm$JsArray$foldl,
						foldHelper,
						$elm$core$Array$builderFromArray(a),
						bTree)));
		}
	});
var $declension$elm_obj_loader$OBJ$Assembler$applyForFace = F3(
	function (f, _v0, s_0) {
		var i1 = _v0.a;
		var i2 = _v0.b;
		var i3 = _v0.c;
		var _v1 = A2(f, i1, s_0);
		var s_1 = _v1.a;
		var vs_1 = _v1.b;
		var i_1 = _v1.c;
		var _v2 = A2(f, i2, s_1);
		var s_2 = _v2.a;
		var vs_2 = _v2.b;
		var i_2 = _v2.c;
		var _v3 = A2(f, i3, s_2);
		var s_3 = _v3.a;
		var vs_3 = _v3.b;
		var i_3 = _v3.c;
		return _Utils_Tuple3(
			s_3,
			_Utils_ap(
				vs_1,
				_Utils_ap(vs_2, vs_3)),
			_Utils_Tuple3(i_3, i_2, i_1));
	});
var $declension$elm_obj_loader$OBJ$Assembler$applyForFaceA = F3(
	function (f, _v0, s_0) {
		var i1 = _v0.a;
		var i2 = _v0.b;
		var i3 = _v0.c;
		var _v1 = A2(f, i1, s_0);
		var s_1 = _v1.a;
		var vs_1 = _v1.b;
		var i_1 = _v1.c;
		var _v2 = A2(f, i2, s_1);
		var s_2 = _v2.a;
		var vs_2 = _v2.b;
		var i_2 = _v2.c;
		var _v3 = A2(f, i3, s_2);
		var s_3 = _v3.a;
		var vs_3 = _v3.b;
		var i_3 = _v3.c;
		return _Utils_Tuple3(
			s_3,
			A2(
				$elm$core$Array$append,
				A2($elm$core$Array$append, vs_1, vs_2),
				vs_3),
			_Utils_Tuple3(i_3, i_2, i_1));
	});
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_v0.$) {
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
var $declension$elm_obj_loader$OBJ$Assembler$get3 = F4(
	function (_v0, a1, a2, a3) {
		var a = _v0.a;
		var b = _v0.b;
		var c = _v0.c;
		var _v1 = _Utils_Tuple3(
			A2($elm$core$Array$get, a - 1, a1),
			A2($elm$core$Array$get, b - 1, a2),
			A2($elm$core$Array$get, c - 1, a3));
		if (((!_v1.a.$) && (!_v1.b.$)) && (!_v1.c.$)) {
			var a_ = _v1.a.a;
			var b_ = _v1.b.a;
			var c_ = _v1.c.a;
			return $elm$core$Maybe$Just(
				_Utils_Tuple3(a_, b_, c_));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $declension$elm_obj_loader$OBJ$Assembler$t3map = F2(
	function (f, _v0) {
		var a = _v0.a;
		var b = _v0.b;
		var c = _v0.c;
		return _Utils_Tuple3(
			f(a),
			f(b),
			f(c));
	});
var $elm_explorations$linear_algebra$Math$Vector2$toRecord = _MJS_v2toRecord;
var $declension$elm_obj_loader$OBJ$Assembler$getFaceTangent = F2(
	function (index, _v3) {
		var _v0 = index.a;
		var pi1 = _v0.a;
		var ti1 = _v0.b;
		var ni1 = _v0.c;
		var _v1 = index.b;
		var pi2 = _v1.a;
		var ti2 = _v1.b;
		var ni2 = _v1.c;
		var _v2 = index.c;
		var pi3 = _v2.a;
		var ti3 = _v2.b;
		var ni3 = _v2.c;
		var vs = _v3.Y;
		var vts = _v3.ai;
		var vns = _v3.X;
		var _v4 = _Utils_Tuple2(
			A4(
				$declension$elm_obj_loader$OBJ$Assembler$get3,
				_Utils_Tuple3(pi1, pi2, pi3),
				vs,
				vs,
				vs),
			A4(
				$declension$elm_obj_loader$OBJ$Assembler$get3,
				_Utils_Tuple3(ti1, ti2, ti3),
				vts,
				vts,
				vts));
		if ((!_v4.a.$) && (!_v4.b.$)) {
			var _v5 = _v4.a.a;
			var v1 = _v5.a;
			var v2 = _v5.b;
			var v3 = _v5.c;
			var _v6 = _v4.b.a;
			var w1 = _v6.a;
			var w2 = _v6.b;
			var w3 = _v6.c;
			var _v7 = A2(
				$declension$elm_obj_loader$OBJ$Assembler$t3map,
				$elm_explorations$linear_algebra$Math$Vector2$toRecord,
				_Utils_Tuple3(w1, w2, w3));
			var ww1 = _v7.a;
			var ww2 = _v7.b;
			var ww3 = _v7.c;
			var _v8 = A2(
				$declension$elm_obj_loader$OBJ$Assembler$t3map,
				$elm_explorations$linear_algebra$Math$Vector3$toRecord,
				_Utils_Tuple3(v1, v2, v3));
			var vv1 = _v8.a;
			var vv2 = _v8.b;
			var vv3 = _v8.c;
			var _v9 = _Utils_Tuple3(
				_Utils_Tuple2(vv2.Z - vv1.Z, vv3.Z - vv1.Z),
				_Utils_Tuple2(vv2._ - vv1._, vv3._ - vv1._),
				_Utils_Tuple2(vv2.a_ - vv1.a_, vv3.a_ - vv1.a_));
			var _v10 = _v9.a;
			var x1 = _v10.a;
			var x2 = _v10.b;
			var _v11 = _v9.b;
			var y1 = _v11.a;
			var y2 = _v11.b;
			var _v12 = _v9.c;
			var z1 = _v12.a;
			var z2 = _v12.b;
			var _v13 = _Utils_Tuple2(
				_Utils_Tuple2(ww2.Z - ww1.Z, ww3.Z - ww1.Z),
				_Utils_Tuple2(ww2._ - ww1._, ww3._ - ww1._));
			var _v14 = _v13.a;
			var s1 = _v14.a;
			var s2 = _v14.b;
			var _v15 = _v13.b;
			var t1 = _v15.a;
			var t2 = _v15.b;
			var denom = (s1 * t2) - (s2 * t1);
			var r = ($elm$core$Basics$abs(denom) <= 0.000001) ? 0.1 : (1 / denom);
			var tdir = A3($elm_explorations$linear_algebra$Math$Vector3$vec3, ((s1 * x2) - (s2 * x1)) * r, ((s1 * y2) - (s2 * y1)) * r, ((s1 * z2) - (s2 * z1)) * r);
			var sdir = A3($elm_explorations$linear_algebra$Math$Vector3$vec3, ((t2 * x1) - (t1 * x2)) * r, ((t2 * y1) - (t1 * y2)) * r, ((t2 * z1) - (t1 * z2)) * r);
			return _Utils_Tuple2(sdir, tdir);
		} else {
			return _Utils_Tuple2(
				A3($elm_explorations$linear_algebra$Math$Vector3$vec3, -999, -999, -999),
				A3($elm_explorations$linear_algebra$Math$Vector3$vec3, -999, -999, -999));
		}
	});
var $declension$elm_obj_loader$OBJ$Types$Vertex = F2(
	function (position, normal) {
		return {cP: normal, eo: position};
	});
var $declension$elm_obj_loader$OBJ$Assembler$get2 = F3(
	function (_v0, a1, a2) {
		var a = _v0.a;
		var b = _v0.b;
		var _v1 = _Utils_Tuple2(
			A2($elm$core$Array$get, a - 1, a1),
			A2($elm$core$Array$get, b - 1, a2));
		if ((!_v1.a.$) && (!_v1.b.$)) {
			var a_ = _v1.a.a;
			var b_ = _v1.b.a;
			return $elm$core$Maybe$Just(
				_Utils_Tuple2(a_, b_));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $declension$elm_obj_loader$OBJ$Assembler$getOrInsertVN = F2(
	function (index, state) {
		var vs = state.Y;
		var vns = state.X;
		var knownVertex = state.aM;
		var currentIndex = state.H;
		var _v0 = A2($elm$core$Dict$get, index, knownVertex);
		if (!_v0.$) {
			var i = _v0.a;
			return _Utils_Tuple3(state, _List_Nil, i);
		} else {
			var _v1 = A3($declension$elm_obj_loader$OBJ$Assembler$get2, index, vs, vns);
			if (!_v1.$) {
				var _v2 = _v1.a;
				var p = _v2.a;
				var n = _v2.b;
				return _Utils_Tuple3(
					_Utils_update(
						state,
						{
							H: currentIndex + 1,
							aM: A3($elm$core$Dict$insert, index, currentIndex, knownVertex)
						}),
					_List_fromArray(
						[
							A2($declension$elm_obj_loader$OBJ$Types$Vertex, p, n)
						]),
					currentIndex);
			} else {
				return _Utils_Tuple3(state, _List_Nil, -999);
			}
		}
	});
var $declension$elm_obj_loader$OBJ$Types$VertexWithTexture = F3(
	function (position, texCoord, normal) {
		return {cP: normal, eo: position, dc: texCoord};
	});
var $declension$elm_obj_loader$OBJ$Assembler$getOrInsertVTN = F2(
	function (index, state) {
		var vs = state.Y;
		var vts = state.ai;
		var vns = state.X;
		var knownVertexTextures = state.aN;
		var currentIndex = state.H;
		var _v0 = A2($elm$core$Dict$get, index, knownVertexTextures);
		if (!_v0.$) {
			var i = _v0.a;
			return _Utils_Tuple3(state, _List_Nil, i);
		} else {
			var _v1 = A4($declension$elm_obj_loader$OBJ$Assembler$get3, index, vs, vts, vns);
			if (!_v1.$) {
				var _v2 = _v1.a;
				var p = _v2.a;
				var t = _v2.b;
				var n = _v2.c;
				return _Utils_Tuple3(
					_Utils_update(
						state,
						{
							H: currentIndex + 1,
							aN: A3($elm$core$Dict$insert, index, currentIndex, knownVertexTextures)
						}),
					_List_fromArray(
						[
							A3($declension$elm_obj_loader$OBJ$Types$VertexWithTexture, p, t, n)
						]),
					currentIndex);
			} else {
				return _Utils_Tuple3(state, _List_Nil, -999);
			}
		}
	});
var $declension$elm_obj_loader$OBJ$InternalTypes$VertexWithTextureAndTangentT = F5(
	function (position, texCoord, normal, sdir, tdir) {
		return {cP: normal, eo: position, bJ: sdir, bO: tdir, dc: texCoord};
	});
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
					{i: nodeList, f: nodeListSize, h: jsArray});
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
var $elm$core$Array$setHelp = F4(
	function (shift, index, value, tree) {
		var pos = $elm$core$Array$bitMask & (index >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
		if (!_v0.$) {
			var subTree = _v0.a;
			var newSub = A4($elm$core$Array$setHelp, shift - $elm$core$Array$shiftStep, index, value, subTree);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$SubTree(newSub),
				tree);
		} else {
			var values = _v0.a;
			var newLeaf = A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, values);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$Leaf(newLeaf),
				tree);
		}
	});
var $elm$core$Array$set = F3(
	function (index, value, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? array : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			tree,
			A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, tail)) : A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A4($elm$core$Array$setHelp, startShift, index, value, tree),
			tail));
	});
var $declension$elm_obj_loader$OBJ$Assembler$updateArray = F3(
	function (i, f, a) {
		var _v0 = A2($elm$core$Array$get, i, a);
		if (!_v0.$) {
			var v = _v0.a;
			return A3(
				$elm$core$Array$set,
				i,
				f(v),
				a);
		} else {
			return a;
		}
	});
var $declension$elm_obj_loader$OBJ$Assembler$getOrInsertVTNT = F3(
	function (_v0, index, state) {
		var s_dir = _v0.a;
		var t_dir = _v0.b;
		var vs = state.Y;
		var vts = state.ai;
		var vns = state.X;
		var knownVertexTexturesTangents = state.aO;
		var currentIndex = state.H;
		var _v1 = A2($elm$core$Dict$get, index, knownVertexTexturesTangents);
		if (!_v1.$) {
			var i = _v1.a;
			var _v2 = state.I;
			if ((!_v2.$) && (_v2.a.$ === 2)) {
				var m = _v2.a.a;
				return _Utils_Tuple3(
					_Utils_update(
						state,
						{
							I: $elm$core$Maybe$Just(
								$declension$elm_obj_loader$OBJ$InternalTypes$WithTextureAndTangentT(
									_Utils_update(
										m,
										{
											bs: A3(
												$declension$elm_obj_loader$OBJ$Assembler$updateArray,
												i,
												function (v) {
													var sdir = v.bJ;
													var tdir = v.bO;
													return _Utils_update(
														v,
														{
															bJ: A2($elm_explorations$linear_algebra$Math$Vector3$add, sdir, s_dir),
															bO: A2($elm_explorations$linear_algebra$Math$Vector3$add, tdir, t_dir)
														});
												},
												m.bs)
										})))
						}),
					$elm$core$Array$empty,
					i);
			} else {
				return _Utils_Tuple3(state, $elm$core$Array$empty, i);
			}
		} else {
			var _v3 = A4($declension$elm_obj_loader$OBJ$Assembler$get3, index, vs, vts, vns);
			if (!_v3.$) {
				var _v4 = _v3.a;
				var p = _v4.a;
				var t = _v4.b;
				var n = _v4.c;
				return _Utils_Tuple3(
					_Utils_update(
						state,
						{
							H: currentIndex + 1,
							aO: A3($elm$core$Dict$insert, index, currentIndex, knownVertexTexturesTangents)
						}),
					$elm$core$Array$fromList(
						_List_fromArray(
							[
								A5($declension$elm_obj_loader$OBJ$InternalTypes$VertexWithTextureAndTangentT, p, t, n, s_dir, t_dir)
							])),
					currentIndex);
			} else {
				return _Utils_Tuple3(state, $elm$core$Array$empty, -999);
			}
		}
	});
var $declension$elm_obj_loader$OBJ$Assembler$addFaceToMesh = F3(
	function (f, mesh, state) {
		var vs = state.Y;
		var vts = state.ai;
		var vns = state.X;
		var currentIndex = state.H;
		var _v0 = _Utils_Tuple2(f, mesh);
		_v0$3:
		while (true) {
			if (!_v0.a.$) {
				switch (_v0.b.$) {
					case 1:
						var _v1 = _v0.a.a;
						var v1 = _v1.a;
						var v2 = _v1.b;
						var v3 = _v1.c;
						var m = _v0.b.a;
						var _v2 = A3(
							$declension$elm_obj_loader$OBJ$Assembler$applyForFace,
							$declension$elm_obj_loader$OBJ$Assembler$getOrInsertVTN,
							_Utils_Tuple3(v1, v2, v3),
							state);
						var newState = _v2.a;
						var newVs = _v2.b;
						var newIs = _v2.c;
						var newMesh = $declension$elm_obj_loader$OBJ$InternalTypes$WithTextureT(
							_Utils_update(
								m,
								{
									ba: A2($elm$core$List$cons, newIs, m.ba),
									bs: _Utils_ap(m.bs, newVs)
								}));
						return _Utils_update(
							newState,
							{
								I: $elm$core$Maybe$Just(newMesh)
							});
					case 2:
						var _v3 = _v0.a.a;
						var v1 = _v3.a;
						var v2 = _v3.b;
						var v3 = _v3.c;
						var m = _v0.b.a;
						var tangents = A2(
							$declension$elm_obj_loader$OBJ$Assembler$getFaceTangent,
							_Utils_Tuple3(v1, v2, v3),
							state);
						var _v4 = A3(
							$declension$elm_obj_loader$OBJ$Assembler$applyForFaceA,
							$declension$elm_obj_loader$OBJ$Assembler$getOrInsertVTNT(tangents),
							_Utils_Tuple3(v1, v2, v3),
							state);
						var newState = _v4.a;
						var newVs = _v4.b;
						var newIs = _v4.c;
						var newMesh = $declension$elm_obj_loader$OBJ$InternalTypes$WithTextureAndTangentT(
							_Utils_update(
								m,
								{
									ba: A2($elm$core$List$cons, newIs, m.ba),
									bs: A2($elm$core$Array$append, m.bs, newVs)
								}));
						return _Utils_update(
							newState,
							{
								I: $elm$core$Maybe$Just(newMesh)
							});
					default:
						break _v0$3;
				}
			} else {
				if (!_v0.b.$) {
					var _v5 = _v0.a.a;
					var v1 = _v5.a;
					var v2 = _v5.b;
					var v3 = _v5.c;
					var m = _v0.b.a;
					var _v6 = A3(
						$declension$elm_obj_loader$OBJ$Assembler$applyForFace,
						$declension$elm_obj_loader$OBJ$Assembler$getOrInsertVN,
						_Utils_Tuple3(v1, v2, v3),
						state);
					var newState = _v6.a;
					var newVs = _v6.b;
					var newIs = _v6.c;
					var newMesh = $declension$elm_obj_loader$OBJ$InternalTypes$WithoutTextureT(
						_Utils_update(
							m,
							{
								ba: A2($elm$core$List$cons, newIs, m.ba),
								bs: _Utils_ap(m.bs, newVs)
							}));
					return _Utils_update(
						newState,
						{
							I: $elm$core$Maybe$Just(newMesh)
						});
				} else {
					break _v0$3;
				}
			}
		}
		return {
			bu: {bT: false},
			ak: $elm$core$Dict$empty,
			aG: '(error)',
			H: 0,
			a3: '(error)',
			I: $elm$core$Maybe$Nothing,
			aL: $elm$core$Dict$empty,
			aM: $elm$core$Dict$empty,
			aN: $elm$core$Dict$empty,
			aO: $elm$core$Dict$empty,
			X: $elm$core$Array$empty,
			Y: $elm$core$Array$empty,
			ai: $elm$core$Array$empty
		};
	});
var $declension$elm_obj_loader$OBJ$Assembler$createMesh = F2(
	function (withTangents, f) {
		var emptyMeshT = {ba: _List_Nil, bs: $elm$core$Array$empty};
		var emptyMesh = {ba: _List_Nil, bs: _List_Nil};
		if (!f.$) {
			return withTangents ? $declension$elm_obj_loader$OBJ$InternalTypes$WithTextureAndTangentT(emptyMeshT) : $declension$elm_obj_loader$OBJ$InternalTypes$WithTextureT(emptyMesh);
		} else {
			return $declension$elm_obj_loader$OBJ$InternalTypes$WithoutTextureT(emptyMesh);
		}
	});
var $declension$elm_obj_loader$OBJ$Assembler$addFace = F2(
	function (f, state) {
		var _v0 = state.I;
		if (_v0.$ === 1) {
			return A3(
				$declension$elm_obj_loader$OBJ$Assembler$addFaceToMesh,
				f,
				A2($declension$elm_obj_loader$OBJ$Assembler$createMesh, state.bu.bT, f),
				_Utils_update(
					state,
					{H: 0}));
		} else {
			var m = _v0.a;
			return A3($declension$elm_obj_loader$OBJ$Assembler$addFaceToMesh, f, m, state);
		}
	});
var $elm$core$Array$push = F2(
	function (a, array) {
		var tail = array.d;
		return A2(
			$elm$core$Array$unsafeReplaceTail,
			A2($elm$core$Elm$JsArray$push, a, tail),
			array);
	});
var $declension$elm_obj_loader$OBJ$InternalTypes$FTVertexNormal = function (a) {
	return {$: 1, a: a};
};
var $declension$elm_obj_loader$OBJ$InternalTypes$FTVertexTextureNormal = function (a) {
	return {$: 0, a: a};
};
var $declension$elm_obj_loader$OBJ$Assembler$triangulate = function (threeOrFour) {
	if (!threeOrFour.$) {
		var a = threeOrFour.a.bV;
		var b = threeOrFour.a.bZ;
		var c = threeOrFour.a.b$;
		return _List_fromArray(
			[
				_Utils_Tuple3(a, b, c)
			]);
	} else {
		var a = threeOrFour.a.bV;
		var b = threeOrFour.a.bZ;
		var c = threeOrFour.a.b$;
		var d = threeOrFour.a.dC;
		return _List_fromArray(
			[
				_Utils_Tuple3(a, b, c),
				_Utils_Tuple3(d, a, c)
			]);
	}
};
var $declension$elm_obj_loader$OBJ$Assembler$triangulateFace = function (f) {
	if (!f.$) {
		var a = f.a;
		return A2(
			$elm$core$List$map,
			$declension$elm_obj_loader$OBJ$InternalTypes$FTVertexTextureNormal,
			$declension$elm_obj_loader$OBJ$Assembler$triangulate(a));
	} else {
		var a = f.a;
		return A2(
			$elm$core$List$map,
			$declension$elm_obj_loader$OBJ$InternalTypes$FTVertexNormal,
			$declension$elm_obj_loader$OBJ$Assembler$triangulate(a));
	}
};
var $declension$elm_obj_loader$OBJ$Assembler$insertLine = F2(
	function (line, state) {
		switch (line.$) {
			case 4:
				var s = line.a;
				return function (st) {
					return _Utils_update(
						st,
						{aG: s});
				}(
					$declension$elm_obj_loader$OBJ$Assembler$addCurrentGroup(state));
			case 7:
				var s = line.a;
				return state;
			case 5:
				var s = line.a;
				return function (st) {
					return _Utils_update(
						st,
						{aG: s});
				}(
					$declension$elm_obj_loader$OBJ$Assembler$addCurrentGroup(state));
			case 6:
				var s = line.a;
				return state;
			case 8:
				var s = line.a;
				return function (st) {
					return _Utils_update(
						st,
						{a3: s});
				}(
					$declension$elm_obj_loader$OBJ$Assembler$addCurrentMesh(state));
			case 0:
				var v = line.a;
				return _Utils_update(
					state,
					{
						Y: A2($elm$core$Array$push, v, state.Y)
					});
			case 1:
				var v = line.a;
				return _Utils_update(
					state,
					{
						ai: A2($elm$core$Array$push, v, state.ai)
					});
			case 2:
				var v = line.a;
				return _Utils_update(
					state,
					{
						X: A2($elm$core$Array$push, v, state.X)
					});
			default:
				var f = line.a;
				return A3(
					$elm$core$List$foldr,
					$declension$elm_obj_loader$OBJ$Assembler$addFace,
					state,
					$declension$elm_obj_loader$OBJ$Assembler$triangulateFace(f));
		}
	});
var $declension$elm_obj_loader$OBJ$Assembler$compileHelper = F2(
	function (state, lines) {
		compileHelper:
		while (true) {
			if (!lines.b) {
				return state;
			} else {
				var l = lines.a;
				var ls = lines.b;
				var $temp$state = A2($declension$elm_obj_loader$OBJ$Assembler$insertLine, l, state),
					$temp$lines = ls;
				state = $temp$state;
				lines = $temp$lines;
				continue compileHelper;
			}
		}
	});
var $declension$elm_obj_loader$OBJ$Assembler$emptyCompileState = function (config) {
	return {bu: config, ak: $elm$core$Dict$empty, aG: '__default__', H: 0, a3: '__default__', I: $elm$core$Maybe$Nothing, aL: $elm$core$Dict$empty, aM: $elm$core$Dict$empty, aN: $elm$core$Dict$empty, aO: $elm$core$Dict$empty, X: $elm$core$Array$empty, Y: $elm$core$Array$empty, ai: $elm$core$Array$empty};
};
var $declension$elm_obj_loader$OBJ$Assembler$compile = F2(
	function (config, lines) {
		return $declension$elm_obj_loader$OBJ$Assembler$addCurrentGroup(
			$declension$elm_obj_loader$OBJ$Assembler$addCurrentMesh(
				A2(
					$declension$elm_obj_loader$OBJ$Assembler$compileHelper,
					$declension$elm_obj_loader$OBJ$Assembler$emptyCompileState(config),
					lines))).aL;
	});
var $elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {dT: index, aQ: match, ec: number, c9: submatches};
	});
var $elm$regex$Regex$contains = _Regex_contains;
var $elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var $elm$regex$Regex$fromString = function (string) {
	return A2(
		$elm$regex$Regex$fromStringWith,
		{b0: false, cK: false},
		string);
};
var $declension$elm_obj_loader$OBJ$Parser$regexMatches = F2(
	function (regexStr, str) {
		return A2(
			$elm$core$Maybe$withDefault,
			false,
			A2(
				$elm$core$Maybe$map,
				function (regex) {
					return A2($elm$regex$Regex$contains, regex, str);
				},
				$elm$regex$Regex$fromString(regexStr)));
	});
var $declension$elm_obj_loader$OBJ$Parser$canSkip = $declension$elm_obj_loader$OBJ$Parser$regexMatches('^((\\s*)|(\\s*#.*\\r?))$');
var $andre_dietrich$parser_combinators$Combine$ParseLocation = F3(
	function (source, line, column) {
		return {b2: column, cp: line, c6: source};
	});
var $andre_dietrich$parser_combinators$Combine$currentLocation = function (stream) {
	var find = F3(
		function (position, currentLine_, lines) {
			find:
			while (true) {
				if (!lines.b) {
					return A3($andre_dietrich$parser_combinators$Combine$ParseLocation, '', currentLine_, position);
				} else {
					var line = lines.a;
					var rest = lines.b;
					var length = $elm$core$String$length(line);
					var lengthPlusNL = length + 1;
					if (_Utils_eq(position, length)) {
						return A3($andre_dietrich$parser_combinators$Combine$ParseLocation, line, currentLine_, position);
					} else {
						if (_Utils_cmp(position, length) > 0) {
							var $temp$position = position - lengthPlusNL,
								$temp$currentLine_ = currentLine_ + 1,
								$temp$lines = rest;
							position = $temp$position;
							currentLine_ = $temp$currentLine_;
							lines = $temp$lines;
							continue find;
						} else {
							return A3($andre_dietrich$parser_combinators$Combine$ParseLocation, line, currentLine_, position);
						}
					}
				}
			}
		});
	return A3(
		find,
		stream.eo,
		0,
		A2($elm$core$String$split, '\n', stream.b5));
};
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $elm$core$String$padLeft = F3(
	function (n, _char, string) {
		return _Utils_ap(
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)),
			string);
	});
var $declension$elm_obj_loader$OBJ$Parser$formatError = F2(
	function (ms, stream) {
		var separator = '| ';
		var separatorOffset = $elm$core$String$length(separator);
		var location = $andre_dietrich$parser_combinators$Combine$currentLocation(stream);
		var padding = (location.b2 + separatorOffset) + 2;
		var lineNumberOffset = $elm$core$Basics$floor(
			A2($elm$core$Basics$logBase, 10, location.cp)) + 1;
		var expectationSeparator = '\n  * ';
		return 'Parse error around line:\n\n' + ($elm$core$String$fromInt(location.cp) + (separator + (location.c6 + ('\n' + (A3($elm$core$String$padLeft, padding, ' ', '^') + ('\nI expected one of the following:\n' + (expectationSeparator + A2($elm$core$String$join, expectationSeparator, ms))))))));
	});
var $declension$elm_obj_loader$OBJ$InternalTypes$F = function (a) {
	return {$: 3, a: a};
};
var $declension$elm_obj_loader$OBJ$InternalTypes$Group = function (a) {
	return {$: 5, a: a};
};
var $declension$elm_obj_loader$OBJ$InternalTypes$MtlLib = function (a) {
	return {$: 7, a: a};
};
var $declension$elm_obj_loader$OBJ$InternalTypes$Object = function (a) {
	return {$: 4, a: a};
};
var $declension$elm_obj_loader$OBJ$InternalTypes$Smooth = function (a) {
	return {$: 6, a: a};
};
var $declension$elm_obj_loader$OBJ$InternalTypes$UseMtl = function (a) {
	return {$: 8, a: a};
};
var $declension$elm_obj_loader$OBJ$InternalTypes$V = function (a) {
	return {$: 0, a: a};
};
var $declension$elm_obj_loader$OBJ$InternalTypes$Vn = function (a) {
	return {$: 2, a: a};
};
var $declension$elm_obj_loader$OBJ$InternalTypes$Vt = function (a) {
	return {$: 1, a: a};
};
var $andre_dietrich$parser_combinators$Combine$Parser = $elm$core$Basics$identity;
var $andre_dietrich$parser_combinators$Combine$emptyErr = F2(
	function (state, stream) {
		return _Utils_Tuple3(
			state,
			stream,
			$elm$core$Result$Err(_List_Nil));
	});
var $andre_dietrich$parser_combinators$Combine$app = function (_v0) {
	var inner = _v0;
	return inner;
};
var $andre_dietrich$parser_combinators$Combine$or = F2(
	function (lp, rp) {
		return F2(
			function (state, stream) {
				var _v0 = A3($andre_dietrich$parser_combinators$Combine$app, lp, state, stream);
				if (!_v0.c.$) {
					var res = _v0;
					return res;
				} else {
					var lms = _v0.c.a;
					var _v1 = A3($andre_dietrich$parser_combinators$Combine$app, rp, state, stream);
					if (!_v1.c.$) {
						var res = _v1;
						return res;
					} else {
						var rms = _v1.c.a;
						return _Utils_Tuple3(
							state,
							stream,
							$elm$core$Result$Err(
								_Utils_ap(lms, rms)));
					}
				}
			});
	});
var $andre_dietrich$parser_combinators$Combine$choice = function (xs) {
	return A3($elm$core$List$foldr, $andre_dietrich$parser_combinators$Combine$or, $andre_dietrich$parser_combinators$Combine$emptyErr, xs);
};
var $andre_dietrich$parser_combinators$Combine$fail = function (m) {
	return F2(
		function (state, stream) {
			return _Utils_Tuple3(
				state,
				stream,
				$elm$core$Result$Err(
					_List_fromArray(
						[m])));
		});
};
var $andre_dietrich$parser_combinators$Combine$andThen = F2(
	function (f, p) {
		return F2(
			function (state, stream) {
				var _v0 = A3($andre_dietrich$parser_combinators$Combine$app, p, state, stream);
				if (!_v0.c.$) {
					var rstate = _v0.a;
					var rstream = _v0.b;
					var res = _v0.c.a;
					return A3(
						$andre_dietrich$parser_combinators$Combine$app,
						f(res),
						rstate,
						rstream);
				} else {
					var estate = _v0.a;
					var estream = _v0.b;
					var ms = _v0.c.a;
					return _Utils_Tuple3(
						estate,
						estream,
						$elm$core$Result$Err(ms));
				}
			});
	});
var $andre_dietrich$parser_combinators$Combine$bimap = F3(
	function (fok, ferr, p) {
		return F2(
			function (state, stream) {
				var _v0 = A3($andre_dietrich$parser_combinators$Combine$app, p, state, stream);
				if (!_v0.c.$) {
					var rstate = _v0.a;
					var rstream = _v0.b;
					var res = _v0.c.a;
					return _Utils_Tuple3(
						rstate,
						rstream,
						$elm$core$Result$Ok(
							fok(res)));
				} else {
					var estate = _v0.a;
					var estream = _v0.b;
					var ms = _v0.c.a;
					return _Utils_Tuple3(
						estate,
						estream,
						$elm$core$Result$Err(
							ferr(ms)));
				}
			});
	});
var $andre_dietrich$parser_combinators$Combine$map = F2(
	function (f, p) {
		return A3($andre_dietrich$parser_combinators$Combine$bimap, f, $elm$core$Basics$identity, p);
	});
var $andre_dietrich$parser_combinators$Combine$mapError = $andre_dietrich$parser_combinators$Combine$bimap($elm$core$Basics$identity);
var $andre_dietrich$parser_combinators$Combine$onerror = F2(
	function (m, p) {
		return A2(
			$andre_dietrich$parser_combinators$Combine$mapError,
			$elm$core$Basics$always(
				_List_fromArray(
					[m])),
			p);
	});
var $elm$regex$Regex$findAtMost = _Regex_findAtMost;
var $elm$regex$Regex$never = _Regex_never;
var $andre_dietrich$parser_combinators$Combine$regexer = F5(
	function (input, output, pat, state, stream) {
		var pattern = A2($elm$core$String$startsWith, '^', pat) ? pat : ('^' + pat);
		var _v0 = A3(
			$elm$regex$Regex$findAtMost,
			1,
			A2(
				$elm$core$Maybe$withDefault,
				$elm$regex$Regex$never,
				input(pattern)),
			stream.z);
		if (_v0.b && (!_v0.b.b)) {
			var match = _v0.a;
			var len = $elm$core$String$length(match.aQ);
			var pos = stream.eo + len;
			var rem = A2($elm$core$String$dropLeft, len, stream.z);
			return _Utils_Tuple3(
				state,
				_Utils_update(
					stream,
					{z: rem, eo: pos}),
				$elm$core$Result$Ok(
					output(match)));
		} else {
			return _Utils_Tuple3(
				state,
				stream,
				$elm$core$Result$Err(
					_List_fromArray(
						['expected input matching Regexp /' + (pattern + '/')])));
		}
	});
var $andre_dietrich$parser_combinators$Combine$regex = A2(
	$elm$core$Basics$composeR,
	A2(
		$andre_dietrich$parser_combinators$Combine$regexer,
		$elm$regex$Regex$fromString,
		function ($) {
			return $.aQ;
		}),
	$elm$core$Basics$identity);
var $andre_dietrich$parser_combinators$Combine$succeed = function (res) {
	return F2(
		function (state, stream) {
			return _Utils_Tuple3(
				state,
				stream,
				$elm$core$Result$Ok(res));
		});
};
var $andre_dietrich$parser_combinators$Combine$Num$unwrap = function (value) {
	if (!value.$) {
		var v = value.a;
		return $andre_dietrich$parser_combinators$Combine$succeed(v);
	} else {
		return $andre_dietrich$parser_combinators$Combine$fail('impossible state in Combine.Num.unwrap');
	}
};
var $andre_dietrich$parser_combinators$Combine$Num$int = A2(
	$andre_dietrich$parser_combinators$Combine$onerror,
	'expected an int',
	A2(
		$andre_dietrich$parser_combinators$Combine$andThen,
		$andre_dietrich$parser_combinators$Combine$Num$unwrap,
		A2(
			$andre_dietrich$parser_combinators$Combine$map,
			$elm$core$String$toInt,
			$andre_dietrich$parser_combinators$Combine$regex('-?(?:0|[1-9]\\d*)'))));
var $pilatch$flip$Flip$flip = F3(
	function (_function, argB, argA) {
		return A2(_function, argA, argB);
	});
var $andre_dietrich$parser_combinators$Combine$andMap = F2(
	function (rp, lp) {
		return A2(
			$andre_dietrich$parser_combinators$Combine$andThen,
			A2($pilatch$flip$Flip$flip, $andre_dietrich$parser_combinators$Combine$map, rp),
			lp);
	});
var $andre_dietrich$parser_combinators$Combine$keep = F2(
	function (p1, p2) {
		return A2(
			$andre_dietrich$parser_combinators$Combine$andMap,
			p1,
			A2(
				$andre_dietrich$parser_combinators$Combine$map,
				$pilatch$flip$Flip$flip($elm$core$Basics$always),
				p2));
	});
var $declension$elm_obj_loader$OBJ$InternalTypes$Four = function (a) {
	return {$: 1, a: a};
};
var $declension$elm_obj_loader$OBJ$InternalTypes$Three = function (a) {
	return {$: 0, a: a};
};
var $declension$elm_obj_loader$OBJ$Parser$spaces = $andre_dietrich$parser_combinators$Combine$regex('[ \t]+');
var $declension$elm_obj_loader$OBJ$Parser$fourValues = F2(
	function (tagger, parser) {
		return A2(
			$andre_dietrich$parser_combinators$Combine$andMap,
			A2($andre_dietrich$parser_combinators$Combine$keep, parser, $declension$elm_obj_loader$OBJ$Parser$spaces),
			A2(
				$andre_dietrich$parser_combinators$Combine$andMap,
				A2($andre_dietrich$parser_combinators$Combine$keep, parser, $declension$elm_obj_loader$OBJ$Parser$spaces),
				A2(
					$andre_dietrich$parser_combinators$Combine$andMap,
					A2($andre_dietrich$parser_combinators$Combine$keep, parser, $declension$elm_obj_loader$OBJ$Parser$spaces),
					A2($andre_dietrich$parser_combinators$Combine$map, tagger, parser))));
	});
var $declension$elm_obj_loader$OBJ$Parser$threeValues = F2(
	function (tagger, parser) {
		return A2(
			$andre_dietrich$parser_combinators$Combine$andMap,
			A2($andre_dietrich$parser_combinators$Combine$keep, parser, $declension$elm_obj_loader$OBJ$Parser$spaces),
			A2(
				$andre_dietrich$parser_combinators$Combine$andMap,
				A2($andre_dietrich$parser_combinators$Combine$keep, parser, $declension$elm_obj_loader$OBJ$Parser$spaces),
				A2($andre_dietrich$parser_combinators$Combine$map, tagger, parser)));
	});
var $declension$elm_obj_loader$OBJ$Parser$threeOrFourValues = function (elementType) {
	return A2(
		$andre_dietrich$parser_combinators$Combine$or,
		A2(
			$andre_dietrich$parser_combinators$Combine$map,
			$declension$elm_obj_loader$OBJ$InternalTypes$Four,
			A2(
				$declension$elm_obj_loader$OBJ$Parser$fourValues,
				F4(
					function (a, b, c, d) {
						return {bV: a, bZ: b, b$: c, dC: d};
					}),
				elementType)),
		A2(
			$andre_dietrich$parser_combinators$Combine$map,
			$declension$elm_obj_loader$OBJ$InternalTypes$Three,
			A2(
				$declension$elm_obj_loader$OBJ$Parser$threeValues,
				F3(
					function (a, b, c) {
						return {bV: a, bZ: b, b$: c};
					}),
				elementType)));
};
var $declension$elm_obj_loader$OBJ$Parser$fVertex = A2(
	$andre_dietrich$parser_combinators$Combine$keep,
	$andre_dietrich$parser_combinators$Combine$fail('Models with no precalculated vertex normals are not supported!'),
	$declension$elm_obj_loader$OBJ$Parser$threeOrFourValues($andre_dietrich$parser_combinators$Combine$Num$int));
var $declension$elm_obj_loader$OBJ$InternalTypes$FVertexNormal = function (a) {
	return {$: 1, a: a};
};
var $andre_dietrich$parser_combinators$Combine$string = function (s) {
	return F2(
		function (state, stream) {
			if (A2($elm$core$String$startsWith, s, stream.z)) {
				var len = $elm$core$String$length(s);
				var pos = stream.eo + len;
				var rem = A2($elm$core$String$dropLeft, len, stream.z);
				return _Utils_Tuple3(
					state,
					_Utils_update(
						stream,
						{z: rem, eo: pos}),
					$elm$core$Result$Ok(s));
			} else {
				return _Utils_Tuple3(
					state,
					stream,
					$elm$core$Result$Err(
						_List_fromArray(
							['expected \"' + (s + '\"')])));
			}
		});
};
var $declension$elm_obj_loader$OBJ$Parser$tuple2 = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $declension$elm_obj_loader$OBJ$Parser$int__int = A2(
	$andre_dietrich$parser_combinators$Combine$andMap,
	A2(
		$andre_dietrich$parser_combinators$Combine$keep,
		$andre_dietrich$parser_combinators$Combine$Num$int,
		$andre_dietrich$parser_combinators$Combine$string('//')),
	A2($andre_dietrich$parser_combinators$Combine$map, $declension$elm_obj_loader$OBJ$Parser$tuple2, $andre_dietrich$parser_combinators$Combine$Num$int));
var $declension$elm_obj_loader$OBJ$Parser$fVertexNormal = A2(
	$andre_dietrich$parser_combinators$Combine$map,
	$declension$elm_obj_loader$OBJ$InternalTypes$FVertexNormal,
	$declension$elm_obj_loader$OBJ$Parser$threeOrFourValues($declension$elm_obj_loader$OBJ$Parser$int__int));
var $declension$elm_obj_loader$OBJ$Parser$int_int = A2(
	$andre_dietrich$parser_combinators$Combine$andMap,
	A2(
		$andre_dietrich$parser_combinators$Combine$keep,
		$andre_dietrich$parser_combinators$Combine$Num$int,
		$andre_dietrich$parser_combinators$Combine$string('/')),
	A2($andre_dietrich$parser_combinators$Combine$map, $declension$elm_obj_loader$OBJ$Parser$tuple2, $andre_dietrich$parser_combinators$Combine$Num$int));
var $declension$elm_obj_loader$OBJ$Parser$fVertexTexture = A2(
	$andre_dietrich$parser_combinators$Combine$keep,
	$andre_dietrich$parser_combinators$Combine$fail('Models with no precalculated vertex normals are not supported!'),
	$declension$elm_obj_loader$OBJ$Parser$threeOrFourValues($declension$elm_obj_loader$OBJ$Parser$int_int));
var $declension$elm_obj_loader$OBJ$InternalTypes$FVertexTextureNormal = function (a) {
	return {$: 0, a: a};
};
var $declension$elm_obj_loader$OBJ$Parser$tuple3 = F3(
	function (a, b, c) {
		return _Utils_Tuple3(a, b, c);
	});
var $declension$elm_obj_loader$OBJ$Parser$int_int_int = A2(
	$andre_dietrich$parser_combinators$Combine$andMap,
	A2(
		$andre_dietrich$parser_combinators$Combine$keep,
		$andre_dietrich$parser_combinators$Combine$Num$int,
		$andre_dietrich$parser_combinators$Combine$string('/')),
	A2(
		$andre_dietrich$parser_combinators$Combine$andMap,
		A2(
			$andre_dietrich$parser_combinators$Combine$keep,
			$andre_dietrich$parser_combinators$Combine$Num$int,
			$andre_dietrich$parser_combinators$Combine$string('/')),
		A2($andre_dietrich$parser_combinators$Combine$map, $declension$elm_obj_loader$OBJ$Parser$tuple3, $andre_dietrich$parser_combinators$Combine$Num$int)));
var $declension$elm_obj_loader$OBJ$Parser$fVertexTextureNormal = A2(
	$andre_dietrich$parser_combinators$Combine$map,
	$declension$elm_obj_loader$OBJ$InternalTypes$FVertexTextureNormal,
	$declension$elm_obj_loader$OBJ$Parser$threeOrFourValues($declension$elm_obj_loader$OBJ$Parser$int_int_int));
var $declension$elm_obj_loader$OBJ$Parser$face = A2(
	$andre_dietrich$parser_combinators$Combine$keep,
	$andre_dietrich$parser_combinators$Combine$choice(
		_List_fromArray(
			[$declension$elm_obj_loader$OBJ$Parser$fVertexTextureNormal, $declension$elm_obj_loader$OBJ$Parser$fVertexNormal, $declension$elm_obj_loader$OBJ$Parser$fVertex, $declension$elm_obj_loader$OBJ$Parser$fVertexTexture])),
	$andre_dietrich$parser_combinators$Combine$regex('f[ \t]+'));
var $andre_dietrich$parser_combinators$Combine$primitive = $elm$core$Basics$identity;
var $andre_dietrich$parser_combinators$Combine$Char$satisfy = function (pred) {
	return $andre_dietrich$parser_combinators$Combine$primitive(
		F2(
			function (state, stream) {
				var message = 'could not satisfy predicate';
				var _v0 = $elm$core$String$uncons(stream.z);
				if (!_v0.$) {
					var _v1 = _v0.a;
					var h = _v1.a;
					var rest = _v1.b;
					return pred(h) ? _Utils_Tuple3(
						state,
						_Utils_update(
							stream,
							{z: rest, eo: stream.eo + 1}),
						$elm$core$Result$Ok(h)) : _Utils_Tuple3(
						state,
						stream,
						$elm$core$Result$Err(
							_List_fromArray(
								[message])));
				} else {
					return _Utils_Tuple3(
						state,
						stream,
						$elm$core$Result$Err(
							_List_fromArray(
								[message])));
				}
			}));
};
var $andre_dietrich$parser_combinators$Combine$Char$char = function (c) {
	return A2(
		$andre_dietrich$parser_combinators$Combine$onerror,
		'expected ' + $elm$core$String$fromChar(c),
		$andre_dietrich$parser_combinators$Combine$Char$satisfy(
			$elm$core$Basics$eq(c)));
};
var $declension$elm_obj_loader$OBJ$Parser$group = A2(
	$andre_dietrich$parser_combinators$Combine$or,
	A2(
		$andre_dietrich$parser_combinators$Combine$keep,
		$andre_dietrich$parser_combinators$Combine$regex('.+'),
		$andre_dietrich$parser_combinators$Combine$regex('g[ \t]+')),
	A2(
		$andre_dietrich$parser_combinators$Combine$keep,
		$andre_dietrich$parser_combinators$Combine$succeed(''),
		$andre_dietrich$parser_combinators$Combine$Char$char('g')));
var $declension$elm_obj_loader$OBJ$Parser$mtllib = A2(
	$andre_dietrich$parser_combinators$Combine$keep,
	$andre_dietrich$parser_combinators$Combine$regex('.+'),
	$andre_dietrich$parser_combinators$Combine$regex('mtllib[ \t]+'));
var $declension$elm_obj_loader$OBJ$Parser$objectName = A2(
	$andre_dietrich$parser_combinators$Combine$keep,
	$andre_dietrich$parser_combinators$Combine$regex('.+'),
	$andre_dietrich$parser_combinators$Combine$regex('o[ \t]+'));
var $declension$elm_obj_loader$OBJ$Parser$smooth = A2(
	$andre_dietrich$parser_combinators$Combine$keep,
	$andre_dietrich$parser_combinators$Combine$regex('.+'),
	$andre_dietrich$parser_combinators$Combine$regex('s[ \t]+'));
var $declension$elm_obj_loader$OBJ$Parser$usemtl = A2(
	$andre_dietrich$parser_combinators$Combine$keep,
	$andre_dietrich$parser_combinators$Combine$regex('.+'),
	$andre_dietrich$parser_combinators$Combine$regex('usemtl[ \t]+'));
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $elm$core$Result$withDefault = F2(
	function (def, result) {
		if (!result.$) {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var $declension$elm_obj_loader$OBJ$Parser$parseFloatOrZero = function (s) {
	return A2(
		$elm$core$Result$withDefault,
		0,
		A2($elm$json$Json$Decode$decodeString, $elm$json$Json$Decode$float, s));
};
var $declension$elm_obj_loader$OBJ$Parser$betterFloat = A2(
	$andre_dietrich$parser_combinators$Combine$map,
	$declension$elm_obj_loader$OBJ$Parser$parseFloatOrZero,
	$andre_dietrich$parser_combinators$Combine$regex('[-+]?[0-9]*\\.?[0-9]+([eE][-+]?[0-9]+)?'));
var $declension$elm_obj_loader$OBJ$Parser$vector3 = A2($declension$elm_obj_loader$OBJ$Parser$threeValues, $elm_explorations$linear_algebra$Math$Vector3$vec3, $declension$elm_obj_loader$OBJ$Parser$betterFloat);
var $declension$elm_obj_loader$OBJ$Parser$vertex = A2(
	$andre_dietrich$parser_combinators$Combine$keep,
	$declension$elm_obj_loader$OBJ$Parser$vector3,
	$andre_dietrich$parser_combinators$Combine$regex('v[ \t]+'));
var $declension$elm_obj_loader$OBJ$Parser$vertexNormal = A2(
	$andre_dietrich$parser_combinators$Combine$keep,
	A2($andre_dietrich$parser_combinators$Combine$map, $elm_explorations$linear_algebra$Math$Vector3$normalize, $declension$elm_obj_loader$OBJ$Parser$vector3),
	$andre_dietrich$parser_combinators$Combine$regex('vn[ \t]+'));
var $elm_explorations$linear_algebra$Math$Vector2$vec2 = _MJS_v2;
var $declension$elm_obj_loader$OBJ$Parser$ignoreZ = function (v) {
	var _v0 = $elm_explorations$linear_algebra$Math$Vector3$toRecord(v);
	var x = _v0.Z;
	var y = _v0._;
	var z = _v0.a_;
	return A2($elm_explorations$linear_algebra$Math$Vector2$vec2, x, y);
};
var $declension$elm_obj_loader$OBJ$Parser$vector2 = A2(
	$andre_dietrich$parser_combinators$Combine$andMap,
	A2($andre_dietrich$parser_combinators$Combine$keep, $declension$elm_obj_loader$OBJ$Parser$betterFloat, $declension$elm_obj_loader$OBJ$Parser$spaces),
	A2($andre_dietrich$parser_combinators$Combine$map, $elm_explorations$linear_algebra$Math$Vector2$vec2, $declension$elm_obj_loader$OBJ$Parser$betterFloat));
var $declension$elm_obj_loader$OBJ$Parser$vertexTexture = A2(
	$andre_dietrich$parser_combinators$Combine$keep,
	A2(
		$andre_dietrich$parser_combinators$Combine$or,
		A2($andre_dietrich$parser_combinators$Combine$map, $declension$elm_obj_loader$OBJ$Parser$ignoreZ, $declension$elm_obj_loader$OBJ$Parser$vector3),
		$declension$elm_obj_loader$OBJ$Parser$vector2),
	$andre_dietrich$parser_combinators$Combine$regex('vt[ \t]+'));
var $declension$elm_obj_loader$OBJ$Parser$line = A2(
	$andre_dietrich$parser_combinators$Combine$keep,
	$andre_dietrich$parser_combinators$Combine$choice(
		_List_fromArray(
			[
				A2($andre_dietrich$parser_combinators$Combine$map, $declension$elm_obj_loader$OBJ$InternalTypes$V, $declension$elm_obj_loader$OBJ$Parser$vertex),
				A2($andre_dietrich$parser_combinators$Combine$map, $declension$elm_obj_loader$OBJ$InternalTypes$Vt, $declension$elm_obj_loader$OBJ$Parser$vertexTexture),
				A2($andre_dietrich$parser_combinators$Combine$map, $declension$elm_obj_loader$OBJ$InternalTypes$Vn, $declension$elm_obj_loader$OBJ$Parser$vertexNormal),
				A2($andre_dietrich$parser_combinators$Combine$map, $declension$elm_obj_loader$OBJ$InternalTypes$F, $declension$elm_obj_loader$OBJ$Parser$face),
				A2($andre_dietrich$parser_combinators$Combine$map, $declension$elm_obj_loader$OBJ$InternalTypes$Object, $declension$elm_obj_loader$OBJ$Parser$objectName),
				A2($andre_dietrich$parser_combinators$Combine$map, $declension$elm_obj_loader$OBJ$InternalTypes$Group, $declension$elm_obj_loader$OBJ$Parser$group),
				A2($andre_dietrich$parser_combinators$Combine$map, $declension$elm_obj_loader$OBJ$InternalTypes$Smooth, $declension$elm_obj_loader$OBJ$Parser$smooth),
				A2($andre_dietrich$parser_combinators$Combine$map, $declension$elm_obj_loader$OBJ$InternalTypes$UseMtl, $declension$elm_obj_loader$OBJ$Parser$usemtl),
				A2($andre_dietrich$parser_combinators$Combine$map, $declension$elm_obj_loader$OBJ$InternalTypes$MtlLib, $declension$elm_obj_loader$OBJ$Parser$mtllib)
			])),
	$andre_dietrich$parser_combinators$Combine$regex('[ \t]*'));
var $andre_dietrich$parser_combinators$Combine$InputStream = F3(
	function (data, input, position) {
		return {b5: data, z: input, eo: position};
	});
var $andre_dietrich$parser_combinators$Combine$initStream = function (s) {
	return A3($andre_dietrich$parser_combinators$Combine$InputStream, s, s, 0);
};
var $andre_dietrich$parser_combinators$Combine$runParser = F3(
	function (p, st, s) {
		var _v0 = A3(
			$andre_dietrich$parser_combinators$Combine$app,
			p,
			st,
			$andre_dietrich$parser_combinators$Combine$initStream(s));
		if (!_v0.c.$) {
			var state = _v0.a;
			var stream = _v0.b;
			var res = _v0.c.a;
			return $elm$core$Result$Ok(
				_Utils_Tuple3(state, stream, res));
		} else {
			var state = _v0.a;
			var stream = _v0.b;
			var ms = _v0.c.a;
			return $elm$core$Result$Err(
				_Utils_Tuple3(state, stream, ms));
		}
	});
var $andre_dietrich$parser_combinators$Combine$parse = function (p) {
	return A2($andre_dietrich$parser_combinators$Combine$runParser, p, 0);
};
var $declension$elm_obj_loader$OBJ$Parser$parseLine = function (l) {
	var _v0 = A2($andre_dietrich$parser_combinators$Combine$parse, $declension$elm_obj_loader$OBJ$Parser$line, l);
	if (!_v0.$) {
		var _v1 = _v0.a;
		var stream = _v1.b;
		var result = _v1.c;
		return $elm$core$Result$Ok(result);
	} else {
		var _v2 = _v0.a;
		var stream = _v2.b;
		var errors = _v2.c;
		return $elm$core$Result$Err(
			A2($declension$elm_obj_loader$OBJ$Parser$formatError, errors, stream));
	}
};
var $declension$elm_obj_loader$OBJ$Parser$parseLineAcc = F2(
	function (line_, acc) {
		if (!acc.$) {
			var lines = acc.a;
			return $declension$elm_obj_loader$OBJ$Parser$canSkip(line_) ? $elm$core$Result$Ok(lines) : A2(
				$elm$core$Result$andThen,
				function (l) {
					return $elm$core$Result$Ok(
						A2($elm$core$List$cons, l, lines));
				},
				$declension$elm_obj_loader$OBJ$Parser$parseLine(line_));
		} else {
			var e = acc.a;
			return $elm$core$Result$Err(e);
		}
	});
var $declension$elm_obj_loader$OBJ$Parser$parse = function (input) {
	return A3(
		$elm$core$List$foldr,
		$declension$elm_obj_loader$OBJ$Parser$parseLineAcc,
		$elm$core$Result$Ok(_List_Nil),
		A2($elm$core$String$split, '\n', input));
};
var $declension$elm_obj_loader$OBJ$parseObjStringWith = F2(
	function (config, input) {
		return A2(
			$elm$core$Result$map,
			$declension$elm_obj_loader$OBJ$Assembler$compile(config),
			$declension$elm_obj_loader$OBJ$Parser$parse(input));
	});
var $elm$http$Http$toTask = function (_v0) {
	var request_ = _v0;
	return A2(_Http_toTask, request_, $elm$core$Maybe$Nothing);
};
var $declension$elm_obj_loader$OBJ$loadObjFileWith = F3(
	function (settings, url, msg) {
		return A2(
			$elm$core$Task$attempt,
			function (r) {
				if (!r.$) {
					if (!r.a.$) {
						var m = r.a.a;
						return msg(
							$elm$core$Result$Ok(m));
					} else {
						var e = r.a.a;
						return msg(
							$elm$core$Result$Err(e));
					}
				} else {
					var e = r.a;
					return msg(
						$elm$core$Result$Err(e));
				}
			},
			A2(
				$elm$core$Task$onError,
				function (e) {
					return $elm$core$Task$succeed(
						$elm$core$Result$Err(
							$declension$elm_obj_loader$OBJ$httpErrorFor(e)));
				},
				A2(
					$elm$core$Task$andThen,
					function (s) {
						return $elm$core$Task$succeed(
							A2($declension$elm_obj_loader$OBJ$parseObjStringWith, settings, s));
					},
					$elm$http$Http$toTask(
						$elm$http$Http$getString(url)))));
	});
var $declension$elm_obj_loader$OBJ$loadObjFile = $declension$elm_obj_loader$OBJ$loadObjFileWith($declension$elm_obj_loader$OBJ$defaultSettings);
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
var $declension$elm_obj_loader$OBJ$loadMeshWithoutTexture = F2(
	function (url, msg) {
		return A2(
			$declension$elm_obj_loader$OBJ$loadObjFile,
			url,
			function (res) {
				if (!res.$) {
					var f = res.a;
					var _v1 = A2(
						$elm$core$List$map,
						$elm$core$Dict$values,
						$elm$core$Dict$values(f));
					if ((((_v1.b && _v1.a.b) && (!_v1.a.a.$)) && (!_v1.a.b.b)) && (!_v1.b.b)) {
						var _v2 = _v1.a;
						var m = _v2.a.a;
						return msg(
							$elm$core$Result$Ok(m));
					} else {
						return msg(
							$elm$core$Result$Err('file loaded correctly, but there were more than one models.'));
					}
				} else {
					var e = res.a;
					return msg(
						$elm$core$Result$Err(e));
				}
			});
	});
var $elm$core$Platform$Cmd$map = _Platform_map;
var $author$project$Graphics$Mesh$loadMeshCmd = function (f) {
	return A2(
		$elm$core$Platform$Cmd$map,
		f,
		$elm$core$Platform$Cmd$batch(
			A2(
				$elm$core$List$map,
				function (name) {
					return A2(
						$declension$elm_obj_loader$OBJ$loadMeshWithoutTexture,
						$author$project$Graphics$Mesh$buildMeshUri(name),
						$author$project$Graphics$Mesh$LoadMesh(name));
				},
				$author$project$Graphics$Mesh$allMeshNames)));
};
var $dullbananas$elm_touch$Touch$Internal$OnMove = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $dullbananas$elm_touch$Touch$onMove = $dullbananas$elm_touch$Touch$Internal$OnMove;
var $dullbananas$elm_touch$Touch$Internal$OnPinch = function (a) {
	return {$: 1, a: a};
};
var $dullbananas$elm_touch$Touch$onPinch = $dullbananas$elm_touch$Touch$Internal$OnPinch;
var $author$project$Main$init = function (flags) {
	var execResult = $author$project$Forth$Interpreter$execute(flags.V);
	return _Utils_Tuple2(
		{
			aa: $elm$core$Basics$degrees(90),
			ac: $elm$core$Basics$degrees(0),
			w: $elm$core$Maybe$Nothing,
			a5: execResult.a5,
			ax: $author$project$Graphics$Mesh$init,
			U: execResult.U,
			ap: 100,
			V: flags.V,
			u: execResult.u,
			aS: $elm$core$Maybe$Nothing,
			ag: 1100.0,
			aA: A3($elm_explorations$linear_algebra$Math$Vector3$vec3, 500, 0, -1000),
			bp: $dullbananas$elm_touch$Touch$initModel(
				_List_fromArray(
					[
						A2(
						$dullbananas$elm_touch$Touch$onMove,
						{cd: 1},
						$author$project$Main$OnTouchRotate),
						A2(
						$dullbananas$elm_touch$Touch$onMove,
						{cd: 2},
						$author$project$Main$OnTouchMove),
						$dullbananas$elm_touch$Touch$onPinch($author$project$Main$OnTouchPinch)
					])),
			p: {s: 0, G: 0}
		},
		$elm$core$Platform$Cmd$batch(
			_List_fromArray(
				[
					A2($elm$core$Task$perform, $author$project$Main$SetViewport, $elm$browser$Browser$Dom$getViewport),
					$author$project$Graphics$Mesh$loadMeshCmd($author$project$Main$LoadMesh)
				])));
};
var $author$project$Main$Resize = F2(
	function (a, b) {
		return {$: 9, a: a, b: b};
	});
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$browser$Browser$Events$Window = 1;
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {cV: pids, da: subs};
	});
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (!node) {
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
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
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
		return {cb: event, cm: key};
	});
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (!node) {
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
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
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
			state.cV,
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
		if (!_v0.$) {
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
		var key = _v0.cm;
		var event = _v0.cb;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.da);
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
		1,
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
var $author$project$Main$EndPan = function (a) {
	return {$: 3, a: a};
};
var $author$project$Main$UpdatePan = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $elm$browser$Browser$Events$Document = 0;
var $elm$browser$Browser$Events$onMouseMove = A2($elm$browser$Browser$Events$on, 0, 'mousemove');
var $elm$browser$Browser$Events$onMouseUp = A2($elm$browser$Browser$Events$on, 0, 'mouseup');
var $author$project$Main$subscriptionPan = function (model) {
	var _v0 = model.w;
	if ((!_v0.$) && (!_v0.a.$)) {
		return $elm$core$Platform$Sub$batch(
			_List_fromArray(
				[
					$elm$browser$Browser$Events$onMouseMove(
					A2($elm$json$Json$Decode$map, $author$project$Main$UpdatePan, $author$project$Main$mouseEventDecoder)),
					$elm$browser$Browser$Events$onMouseUp(
					A2($elm$json$Json$Decode$map, $author$project$Main$EndPan, $author$project$Main$mouseEventDecoder))
				]));
	} else {
		return $elm$core$Platform$Sub$none;
	}
};
var $author$project$Main$subscriptionRotate = function (model) {
	var _v0 = model.w;
	if ((!_v0.$) && (!_v0.a.$)) {
		return $elm$core$Platform$Sub$batch(
			_List_fromArray(
				[
					$elm$browser$Browser$Events$onMouseMove(
					A2($elm$json$Json$Decode$map, $author$project$Main$UpdateRotate, $author$project$Main$mouseEventDecoder)),
					$elm$browser$Browser$Events$onMouseUp(
					A2($elm$json$Json$Decode$map, $author$project$Main$EndRotate, $author$project$Main$mouseEventDecoder))
				]));
	} else {
		return $elm$core$Platform$Sub$none;
	}
};
var $author$project$Main$SplitBarEndDrag = function (a) {
	return {$: 13, a: a};
};
var $author$project$Main$SplitBarUpdateDrag = function (a) {
	return {$: 12, a: a};
};
var $author$project$Main$subscriptionSplitBar = function (model) {
	var _v0 = model.aS;
	if (!_v0.$) {
		return $elm$core$Platform$Sub$batch(
			_List_fromArray(
				[
					$elm$browser$Browser$Events$onMouseMove(
					A2($elm$json$Json$Decode$map, $author$project$Main$SplitBarUpdateDrag, $author$project$Main$mouseEventDecoder)),
					$elm$browser$Browser$Events$onMouseUp(
					A2($elm$json$Json$Decode$map, $author$project$Main$SplitBarEndDrag, $author$project$Main$mouseEventDecoder))
				]));
	} else {
		return $elm$core$Platform$Sub$none;
	}
};
var $author$project$Main$subscriptions = function (model) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				$elm$browser$Browser$Events$onResize(
				F2(
					function (w, h) {
						return A2($author$project$Main$Resize, w, h);
					})),
				$author$project$Main$subscriptionPan(model),
				$author$project$Main$subscriptionRotate(model),
				$author$project$Main$subscriptionSplitBar(model)
			]));
};
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $author$project$Main$doDolly = F2(
	function (model, dy) {
		var multiplier = 1.02;
		var delta = (dy < 0) ? (1 / multiplier) : ((dy > 0) ? (1 * multiplier) : 1);
		var next = A3($elm$core$Basics$clamp, 20, 1000, model.ap * delta);
		return _Utils_update(
			model,
			{ap: next});
	});
var $author$project$Main$doPanning = F4(
	function (model, newState, _v0, _v1) {
		var x0 = _v0.a;
		var y0 = _v0.b;
		var x = _v1.a;
		var y = _v1.b;
		var sb = $elm$core$Basics$sin(model.aa);
		var sa = $elm$core$Basics$sin(model.ac);
		var os = $author$project$Main$orthoScale(model.ap);
		var dy = -(y - y0);
		var dx = x - x0;
		var cb = $elm$core$Basics$cos(model.aa);
		var ca = $elm$core$Basics$cos(model.ac);
		var tanx = A2(
			$elm_explorations$linear_algebra$Math$Vector3$scale,
			os * dx,
			A3($elm_explorations$linear_algebra$Math$Vector3$vec3, sa, 0, ca));
		var tany = A2(
			$elm_explorations$linear_algebra$Math$Vector3$scale,
			os * dy,
			A3($elm_explorations$linear_algebra$Math$Vector3$vec3, ca * sb, -cb, -(sa * sb)));
		var trans = A2(
			$elm_explorations$linear_algebra$Math$Vector3$add,
			model.aA,
			A2($elm_explorations$linear_algebra$Math$Vector3$add, tanx, tany));
		return _Utils_update(
			model,
			{w: newState, aA: trans});
	});
var $author$project$Main$doRotation = F4(
	function (model, newState, _v0, _v1) {
		var x0 = _v0.a;
		var y0 = _v0.b;
		var x = _v1.a;
		var y = _v1.b;
		var dy = y - y0;
		var dx = x - x0;
		var azimuth = model.ac - (dx * $elm$core$Basics$degrees(0.3));
		var altitude = A3(
			$elm$core$Basics$clamp,
			$elm$core$Basics$degrees(0),
			$elm$core$Basics$degrees(90),
			model.aa - (dy * $elm$core$Basics$degrees(0.3)));
		return _Utils_update(
			model,
			{aa: altitude, ac: azimuth, w: newState});
	});
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Storage$save = _Platform_outgoingPort('save', $elm$json$Json$Encode$string);
var $elm$core$String$append = _String_append;
var $elm_explorations$linear_algebra$Math$Vector3$getX = _MJS_v3getX;
var $elm_explorations$linear_algebra$Math$Vector3$getY = _MJS_v3getY;
var $elm_explorations$linear_algebra$Math$Vector3$getZ = _MJS_v3getZ;
var $author$project$Graphics$Mesh$flipVec3 = function (v) {
	return A3(
		$elm_explorations$linear_algebra$Math$Vector3$vec3,
		$elm_explorations$linear_algebra$Math$Vector3$getX(v),
		-$elm_explorations$linear_algebra$Math$Vector3$getY(v),
		-$elm_explorations$linear_algebra$Math$Vector3$getZ(v));
};
var $author$project$Graphics$Mesh$flipVertex = function (vertex) {
	return {
		cP: $author$project$Graphics$Mesh$flipVec3(vertex.cP),
		eo: $author$project$Graphics$Mesh$flipVec3(vertex.eo)
	};
};
var $author$project$Graphics$Mesh$flipMesh = function (meshWith) {
	return {
		ba: meshWith.ba,
		bs: A2($elm$core$List$map, $author$project$Graphics$Mesh$flipVertex, meshWith.bs)
	};
};
var $elm_explorations$webgl$WebGL$MeshIndexed3 = F3(
	function (a, b, c) {
		return {$: 3, a: a, b: b, c: c};
	});
var $elm_explorations$webgl$WebGL$indexedTriangles = $elm_explorations$webgl$WebGL$MeshIndexed3(
	{b9: 1, ck: 3, cH: 4});
var $author$project$Graphics$Mesh$update = F2(
	function (msg, model) {
		var name = msg.a;
		var meshOrErr = msg.b;
		if (meshOrErr.$ === 1) {
			var e = meshOrErr.a;
			return _Utils_update(
				model,
				{
					aJ: A2($elm$core$List$cons, e, model.aJ)
				});
		} else {
			var meshWith = meshOrErr.a;
			var mesh = A2($elm_explorations$webgl$WebGL$indexedTriangles, meshWith.bs, meshWith.ba);
			var flippedMeshWith = $author$project$Graphics$Mesh$flipMesh(meshWith);
			var flippedMesh = A2($elm_explorations$webgl$WebGL$indexedTriangles, flippedMeshWith.bs, flippedMeshWith.ba);
			var updatedMeshes = A2(
				$elm$core$Dict$union,
				model.ax,
				$elm$core$Dict$fromList(
					_List_fromArray(
						[
							_Utils_Tuple2(name, mesh),
							_Utils_Tuple2(
							A2($elm$core$String$append, name, '_flip'),
							flippedMesh)
						])));
			return _Utils_update(
				model,
				{ax: updatedMeshes});
		}
	});
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $elm$core$List$sum = function (numbers) {
	return A3($elm$core$List$foldl, $elm$core$Basics$add, 0, numbers);
};
var $dullbananas$elm_touch$Touch$Internal$average = function (nums) {
	return $elm$core$List$sum(nums) / $elm$core$List$length(nums);
};
var $elm$core$Basics$atan2 = _Basics_atan2;
var $dullbananas$elm_touch$Touch$Internal$calcAngle = F2(
	function (a, b) {
		var v = {Z: b.Z - a.Z, _: b._ - a._};
		var largestComponent = A2(
			$elm$core$Basics$max,
			$elm$core$Basics$abs(v.Z),
			$elm$core$Basics$abs(v._));
		if (!largestComponent) {
			return $elm$core$Maybe$Nothing;
		} else {
			var scaledY = v._ / largestComponent;
			var scaledX = v.Z / largestComponent;
			var scaledLength = $elm$core$Basics$sqrt((scaledX * scaledX) + (scaledY * scaledY));
			var angle = A2($elm$core$Basics$atan2, scaledY / scaledLength, scaledX / scaledLength);
			return $elm$core$Maybe$Just(
				(angle >= 0) ? angle : (angle + ($elm$core$Basics$pi * 2)));
		}
	});
var $dullbananas$elm_touch$Touch$Internal$calcDistance = F2(
	function (a, b) {
		var c = {Z: a.Z - b.Z, _: a._ - b._};
		return $elm$core$Basics$sqrt((c.Z * c.Z) + (c._ * c._));
	});
var $elm$core$Dict$map = F2(
	function (func, dict) {
		if (dict.$ === -2) {
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
var $elm$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		if (ma.$ === 1) {
			return $elm$core$Maybe$Nothing;
		} else {
			var a = ma.a;
			if (mb.$ === 1) {
				return $elm$core$Maybe$Nothing;
			} else {
				var b = mb.a;
				return $elm$core$Maybe$Just(
					A2(func, a, b));
			}
		}
	});
var $dullbananas$elm_touch$Touch$Internal$triggerListener = F2(
	function (model, listener) {
		var touchPositions = A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			$elm$core$Dict$values(
				A2(
					$elm$core$Dict$map,
					F2(
						function (id, currentPoint) {
							var _v7 = A2($elm$core$Dict$get, id, model.bi);
							if (_v7.$ === 1) {
								return $elm$core$Maybe$Nothing;
							} else {
								var previousPoint = _v7.a;
								return $elm$core$Maybe$Just(
									{au: currentPoint, ay: previousPoint});
							}
						}),
					model.aI)));
		switch (listener.$) {
			case 0:
				var fingers = listener.a.cd;
				var createMsg = listener.b;
				var touchDeltas = A2(
					$elm$core$List$map,
					function (_v1) {
						var previous = _v1.ay;
						var current = _v1.au;
						return {Z: current.Z - previous.Z, _: current._ - previous._};
					},
					touchPositions);
				var averageDelta = {
					Z: $dullbananas$elm_touch$Touch$Internal$average(
						A2(
							$elm$core$List$map,
							function ($) {
								return $.Z;
							},
							touchDeltas)),
					_: $dullbananas$elm_touch$Touch$Internal$average(
						A2(
							$elm$core$List$map,
							function ($) {
								return $._;
							},
							touchDeltas))
				};
				return _Utils_eq(
					fingers,
					$elm$core$List$length(touchDeltas)) ? $elm$core$Maybe$Just(
					A2(createMsg, averageDelta.Z, averageDelta._)) : $elm$core$Maybe$Nothing;
			case 1:
				var createMsg = listener.a;
				if ((touchPositions.b && touchPositions.b.b) && (!touchPositions.b.b.b)) {
					var point1 = touchPositions.a;
					var _v3 = touchPositions.b;
					var point2 = _v3.a;
					var previousDistance = A2($dullbananas$elm_touch$Touch$Internal$calcDistance, point1.ay, point2.ay);
					var currentDistance = A2($dullbananas$elm_touch$Touch$Internal$calcDistance, point1.au, point2.au);
					var delta = currentDistance - previousDistance;
					return $elm$core$Maybe$Just(
						createMsg(delta));
				} else {
					return $elm$core$Maybe$Nothing;
				}
			default:
				var createMsg = listener.a;
				if ((touchPositions.b && touchPositions.b.b) && (!touchPositions.b.b.b)) {
					var point1 = touchPositions.a;
					var _v5 = touchPositions.b;
					var point2 = _v5.a;
					var previousAngle = A2($dullbananas$elm_touch$Touch$Internal$calcAngle, point1.ay, point2.ay);
					var currentAngle = A2($dullbananas$elm_touch$Touch$Internal$calcAngle, point1.au, point2.au);
					var maybeDelta = A3($elm$core$Maybe$map2, $elm$core$Basics$sub, currentAngle, previousAngle);
					if (!maybeDelta.$) {
						var delta = maybeDelta.a;
						return $elm$core$Maybe$Just(
							createMsg(
								(_Utils_cmp(
									$elm$core$Basics$abs(delta),
									$elm$core$Basics$pi) < 0) ? delta : (($elm$core$Basics$pi * 2) - $elm$core$Basics$abs(delta))));
					} else {
						return $elm$core$Maybe$Nothing;
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
		}
	});
var $dullbananas$elm_touch$Touch$Internal$triggerMsgs = A2(
	$elm$core$Basics$composeR,
	$elm$core$List$map(
		function (msg) {
			return A2(
				$elm$core$Task$attempt,
				$elm$core$Basics$always(msg),
				$elm$core$Task$succeed(msg));
		}),
	$elm$core$Platform$Cmd$batch);
var $dullbananas$elm_touch$Touch$Internal$update = F3(
	function (msg, oldModel, updater) {
		var touches = msg.eJ;
		var model = _Utils_update(
			oldModel,
			{
				aI: $elm$core$Dict$fromList(
					A2(
						$elm$core$List$map,
						function (_v1) {
							var identifier = _v1.dR;
							var clientPos = _v1.dx;
							return A2(
								$elm$core$Tuple$pair,
								identifier,
								{Z: clientPos.a, _: clientPos.b});
						},
						touches)),
				bi: oldModel.aI
			});
		return A2(
			$elm$core$Tuple$pair,
			updater(model),
			$dullbananas$elm_touch$Touch$Internal$triggerMsgs(
				A2(
					$elm$core$List$filterMap,
					$dullbananas$elm_touch$Touch$Internal$triggerListener(model),
					model.bA)));
	});
var $dullbananas$elm_touch$Touch$update = F3(
	function (_v0, _v1, updater) {
		var msg = _v0;
		var model = _v1;
		return A3(
			$dullbananas$elm_touch$Touch$Internal$update,
			msg,
			model,
			A2($elm$core$Basics$composeR, $elm$core$Basics$identity, updater));
	});
var $author$project$Main$Rotating = function (a) {
	return {$: 1, a: a};
};
var $author$project$Main$updateMouseDown = F2(
	function (model, pos) {
		return _Utils_update(
			model,
			{
				w: $elm$core$Maybe$Just(
					$author$project$Main$Rotating(pos))
			});
	});
var $author$project$Main$Panning = function (a) {
	return {$: 0, a: a};
};
var $author$project$Main$updateMouseDownWithShift = F2(
	function (model, pos) {
		return _Utils_update(
			model,
			{
				w: $elm$core$Maybe$Just(
					$author$project$Main$Panning(pos))
			});
	});
var $author$project$Main$updateMouseMove = F2(
	function (model, newPoint) {
		var _v0 = model.w;
		if (_v0.$ === 1) {
			return model;
		} else {
			if (_v0.a.$ === 1) {
				var oldPoint = _v0.a.a;
				return A4(
					$author$project$Main$doRotation,
					model,
					$elm$core$Maybe$Just(
						$author$project$Main$Rotating(newPoint)),
					oldPoint,
					newPoint);
			} else {
				var oldPoint = _v0.a.a;
				return A4(
					$author$project$Main$doPanning,
					model,
					$elm$core$Maybe$Just(
						$author$project$Main$Panning(newPoint)),
					oldPoint,
					newPoint);
			}
		}
	});
var $author$project$Main$updateMouseUp = F2(
	function (model, _v0) {
		return _Utils_update(
			model,
			{w: $elm$core$Maybe$Nothing});
	});
var $author$project$Main$updateViewport = F3(
	function (w, h, model) {
		return _Utils_update(
			model,
			{
				ag: A3($elm$core$Basics$clamp, 10, h - 10, h * 0.8),
				p: {s: h, G: w}
			});
	});
var $author$project$Main$updateWheel = F2(
	function (model, _v0) {
		var dy = _v0.b;
		return A2($author$project$Main$doDolly, model, dy);
	});
var $author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
				var meshMsg = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							ax: A2($author$project$Graphics$Mesh$update, meshMsg, model.ax)
						}),
					$elm$core$Platform$Cmd$none);
			case 1:
				var pos = msg.a;
				return _Utils_Tuple2(
					A2($author$project$Main$updateMouseDown, model, pos),
					$elm$core$Platform$Cmd$none);
			case 2:
				var pos = msg.a;
				return _Utils_Tuple2(
					A2($author$project$Main$updateMouseMove, model, pos),
					$elm$core$Platform$Cmd$none);
			case 3:
				var pos = msg.a;
				return _Utils_Tuple2(
					A2($author$project$Main$updateMouseUp, model, pos),
					$elm$core$Platform$Cmd$none);
			case 4:
				var pos = msg.a;
				return _Utils_Tuple2(
					A2($author$project$Main$updateMouseDownWithShift, model, pos),
					$elm$core$Platform$Cmd$none);
			case 5:
				var pos = msg.a;
				return _Utils_Tuple2(
					A2($author$project$Main$updateMouseMove, model, pos),
					$elm$core$Platform$Cmd$none);
			case 6:
				var pos = msg.a;
				return _Utils_Tuple2(
					A2($author$project$Main$updateMouseUp, model, pos),
					$elm$core$Platform$Cmd$none);
			case 7:
				var pos = msg.a;
				return _Utils_Tuple2(
					A2($author$project$Main$updateWheel, model, pos),
					$elm$core$Platform$Cmd$none);
			case 8:
				var viewport = msg.a;
				return _Utils_Tuple2(
					A3($author$project$Main$updateViewport, viewport.p.G, viewport.p.s, model),
					$elm$core$Platform$Cmd$none);
			case 9:
				var width = msg.a;
				var height = msg.b;
				return _Utils_Tuple2(
					A3($author$project$Main$updateViewport, width, height, model),
					$elm$core$Platform$Cmd$none);
			case 10:
				var program = msg.a;
				var execResult = $author$project$Forth$Interpreter$execute(program);
				return _Utils_Tuple2(
					function () {
						var _v1 = execResult.a5;
						if (_v1.$ === 1) {
							return _Utils_update(
								model,
								{a5: $elm$core$Maybe$Nothing, U: execResult.U, V: program, u: execResult.u});
						} else {
							var errMsg = _v1.a;
							return _Utils_update(
								model,
								{
									a5: $elm$core$Maybe$Just(errMsg),
									V: program
								});
						}
					}(),
					$author$project$Storage$save(program));
			case 11:
				var pos = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							aS: $elm$core$Maybe$Just(pos)
						}),
					$elm$core$Platform$Cmd$none);
			case 12:
				var _v2 = msg.a;
				var y = _v2.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							ag: A3($elm$core$Basics$clamp, 100, 1200, y)
						}),
					$elm$core$Platform$Cmd$none);
			case 13:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{aS: $elm$core$Maybe$Nothing}),
					$elm$core$Platform$Cmd$none);
			case 14:
				var x = msg.a;
				var y = msg.b;
				return _Utils_Tuple2(
					A4(
						$author$project$Main$doRotation,
						model,
						model.w,
						_Utils_Tuple2(0, 0),
						_Utils_Tuple2(x, y)),
					$elm$core$Platform$Cmd$none);
			case 15:
				var x = msg.a;
				var y = msg.b;
				return _Utils_Tuple2(
					A4(
						$author$project$Main$doPanning,
						model,
						model.w,
						_Utils_Tuple2(0, 0),
						_Utils_Tuple2(x, y)),
					$elm$core$Platform$Cmd$none);
			case 16:
				var r = msg.a;
				return _Utils_Tuple2(
					A2($author$project$Main$doDolly, model, r),
					$elm$core$Platform$Cmd$none);
			default:
				var touchMsg = msg.a;
				return A3(
					$dullbananas$elm_touch$Touch$update,
					touchMsg,
					model.bp,
					function (newTouchModel) {
						return _Utils_update(
							model,
							{bp: newTouchModel});
					});
		}
	});
var $author$project$Main$main = $elm$browser$Browser$document(
	{dU: $author$project$Main$init, eB: $author$project$Main$subscriptions, eL: $author$project$Main$update, eM: $author$project$Main$document});
_Platform_export({'Main':{'init':$author$project$Main$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (program) {
			return $elm$json$Json$Decode$succeed(
				{V: program});
		},
		A2($elm$json$Json$Decode$field, 'program', $elm$json$Json$Decode$string)))(0)}});}(this));
