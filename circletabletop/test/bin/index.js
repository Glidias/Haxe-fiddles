(function (console, $hx_exports, $global) { "use strict";
$hx_exports.tjson = $hx_exports.tjson || {};
$hx_exports.textifician = $hx_exports.textifician || {};
$hx_exports.textifician.mapping = $hx_exports.textifician.mapping || {};
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	r: null
	,match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw new js__$Boot_HaxeError("EReg::matched");
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw new js__$Boot_HaxeError("Invalid date format : " + s);
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	h: null
	,q: null
	,length: null
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,iterator: function() {
		return new _$List_ListIterator(this.h);
	}
	,__class__: List
};
var _$List_ListIterator = function(head) {
	this.head = head;
	this.val = null;
};
$hxClasses["_List.ListIterator"] = _$List_ListIterator;
_$List_ListIterator.__name__ = ["_List","ListIterator"];
_$List_ListIterator.prototype = {
	head: null
	,val: null
	,hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		this.val = this.head[0];
		this.head = this.head[1];
		return this.val;
	}
	,__class__: _$List_ListIterator
};
Math.__name__ = ["Math"];
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && v.__enum__ == null || t == "function" && (v.__name__ || v.__ename__) != null;
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) return false;
	delete(o[field]);
	return true;
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	b: null
	,add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var TextificianGoJS = function() {
};
$hxClasses["TextificianGoJS"] = TextificianGoJS;
TextificianGoJS.__name__ = ["TextificianGoJS"];
TextificianGoJS.main = function() {
	de_polygonal_ds_Graph;
	textifician_mapping_LocationPacket;
	textifician_mapping_LocationDefinition;
	textifician_mapping_TextificianWorld;
	textifician_mapping_TextificianUtil;
};
TextificianGoJS.prototype = {
	__class__: TextificianGoJS
};
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null; else return js_Boot.getClass(o);
};
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
	return null;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw new js__$Boot_HaxeError("No such constructor " + constr);
	if(Reflect.isFunction(f)) {
		if(params == null) throw new js__$Boot_HaxeError("Constructor " + constr + " need parameters");
		return Reflect.callMethod(e,f,params);
	}
	if(params != null && params.length != 0) throw new js__$Boot_HaxeError("Constructor " + constr + " does not need parameters");
	return f;
};
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
};
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = js_Boot.getClass(v);
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
var de_polygonal_ds_ArrayUtil = function() { };
$hxClasses["de.polygonal.ds.ArrayUtil"] = de_polygonal_ds_ArrayUtil;
de_polygonal_ds_ArrayUtil.__name__ = ["de","polygonal","ds","ArrayUtil"];
de_polygonal_ds_ArrayUtil.alloc = function(x) {
	var a;
	a = new Array(x);
	return a;
};
de_polygonal_ds_ArrayUtil.shrink = function(a,x) {
	if(a.length > x) a.length = x;
	return a;
};
de_polygonal_ds_ArrayUtil.copy = function(src,dst,min,max) {
	if(max == null) max = -1;
	if(min == null) min = 0;
	if(max == -1) max = src.length;
	var j = 0;
	var _g = min;
	while(_g < max) {
		var i = _g++;
		dst[j++] = src[i];
	}
	return dst;
};
de_polygonal_ds_ArrayUtil.fill = function(dst,x,k) {
	if(k == null) k = -1;
	if(k == -1) k = dst.length;
	var _g = 0;
	while(_g < k) {
		var i = _g++;
		dst[i] = x;
	}
};
de_polygonal_ds_ArrayUtil.assign = function(dst,C,args,k) {
	if(k == null) k = -1;
	if(k == -1) k = dst.length;
	if(args == null) args = [];
	var _g = 0;
	while(_g < k) {
		var i = _g++;
		dst[i] = Type.createInstance(C,args);
	}
};
de_polygonal_ds_ArrayUtil.memmove = function(a,destination,source,n) {
	if(source == destination) return; else if(source <= destination) {
		var i = source + n;
		var j = destination + n;
		var _g = 0;
		while(_g < n) {
			var k = _g++;
			i--;
			j--;
			a[j] = a[i];
		}
	} else {
		var i1 = source;
		var j1 = destination;
		var _g1 = 0;
		while(_g1 < n) {
			var k1 = _g1++;
			a[j1] = a[i1];
			i1++;
			j1++;
		}
	}
};
de_polygonal_ds_ArrayUtil.bsearchComparator = function(a,x,min,max,comparator) {
	var l = min;
	var m;
	var h = max + 1;
	while(l < h) {
		m = l + (h - l >> 1);
		if(comparator(a[m],x) < 0) l = m + 1; else h = m;
	}
	if(l <= max && comparator(a[l],x) == 0) return l; else return ~l;
};
de_polygonal_ds_ArrayUtil.bsearchInt = function(a,x,min,max) {
	var l = min;
	var m;
	var h = max + 1;
	while(l < h) {
		m = l + (h - l >> 1);
		if(a[m] < x) l = m + 1; else h = m;
	}
	if(l <= max && a[l] == x) return l; else return ~l;
};
de_polygonal_ds_ArrayUtil.bsearchFloat = function(a,x,min,max) {
	var l = min;
	var m;
	var h = max + 1;
	while(l < h) {
		m = l + (h - l >> 1);
		if(a[m] < x) l = m + 1; else h = m;
	}
	if(l <= max && a[l] == x) return l; else return ~l;
};
de_polygonal_ds_ArrayUtil.shuffle = function(a,rval) {
	var s = a.length;
	if(rval == null) {
		var m = Math;
		while(--s > 1) {
			var i = Std["int"](m.random() * s);
			var t = a[s];
			a[s] = a[i];
			a[i] = t;
		}
	} else {
		var j = 0;
		while(--s > 1) {
			var i1 = Std["int"](rval[j++] * s);
			var t1 = a[s];
			a[s] = a[i1];
			a[i1] = t1;
		}
	}
};
de_polygonal_ds_ArrayUtil.sortRange = function(a,compare,useInsertionSort,first,count) {
	var k = a.length;
	if(k > 1) {
		if(useInsertionSort) de_polygonal_ds_ArrayUtil._insertionSort(a,first,count,compare); else de_polygonal_ds_ArrayUtil._quickSort(a,first,count,compare);
	}
};
de_polygonal_ds_ArrayUtil.quickPerm = function(n) {
	var results = [];
	var a = [];
	var p = [];
	var i;
	var j;
	var tmp;
	var _g = 0;
	while(_g < n) {
		var i1 = _g++;
		a[i1] = i1 + 1;
		p[i1] = 0;
	}
	results.push(a.slice());
	i = 1;
	while(i < n) if(p[i] < i) {
		j = i % 2 * p[i];
		tmp = a[j];
		a[j] = a[i];
		a[i] = tmp;
		results.push(a.slice());
		p[i]++;
		i = 1;
	} else {
		p[i] = 0;
		i++;
	}
	return results;
};
de_polygonal_ds_ArrayUtil.equals = function(a,b) {
	if(a.length != b.length) return false;
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(a[i] != b[i]) return false;
	}
	return true;
};
de_polygonal_ds_ArrayUtil.split = function(a,n,k) {
	var output = [];
	var b = null;
	var _g = 0;
	while(_g < n) {
		var i = _g++;
		if(i % k == 0) output[i / k | 0] = b = [];
		b.push(a[i]);
	}
	return output;
};
de_polygonal_ds_ArrayUtil._insertionSort = function(a,first,k,cmp) {
	var _g1 = first + 1;
	var _g = first + k;
	while(_g1 < _g) {
		var i = _g1++;
		var x = a[i];
		var j = i;
		while(j > first) {
			var y = a[j - 1];
			if(cmp(y,x) > 0) {
				a[j] = y;
				j--;
			} else break;
		}
		a[j] = x;
	}
};
de_polygonal_ds_ArrayUtil._quickSort = function(a,first,k,cmp) {
	var last = first + k - 1;
	var lo = first;
	var hi = last;
	if(k > 1) {
		var i0 = first;
		var i1 = i0 + (k >> 1);
		var i2 = i0 + k - 1;
		var t0 = a[i0];
		var t1 = a[i1];
		var t2 = a[i2];
		var mid;
		var t = cmp(t0,t2);
		if(t < 0 && cmp(t0,t1) < 0) if(cmp(t1,t2) < 0) mid = i1; else mid = i2; else if(cmp(t1,t0) < 0 && cmp(t1,t2) < 0) if(t < 0) mid = i0; else mid = i2; else if(cmp(t2,t0) < 0) mid = i1; else mid = i0;
		var pivot = a[mid];
		a[mid] = a[first];
		while(lo < hi) {
			while(cmp(pivot,a[hi]) < 0 && lo < hi) hi--;
			if(hi != lo) {
				a[lo] = a[hi];
				lo++;
			}
			while(cmp(pivot,a[lo]) > 0 && lo < hi) lo++;
			if(hi != lo) {
				a[hi] = a[lo];
				hi--;
			}
		}
		a[lo] = pivot;
		de_polygonal_ds_ArrayUtil._quickSort(a,first,lo - first,cmp);
		de_polygonal_ds_ArrayUtil._quickSort(a,lo + 1,last - lo,cmp);
	}
};
var de_polygonal_ds_Hashable = function() { };
$hxClasses["de.polygonal.ds.Hashable"] = de_polygonal_ds_Hashable;
de_polygonal_ds_Hashable.__name__ = ["de","polygonal","ds","Hashable"];
de_polygonal_ds_Hashable.prototype = {
	key: null
	,__class__: de_polygonal_ds_Hashable
};
var de_polygonal_ds_Collection = function() { };
$hxClasses["de.polygonal.ds.Collection"] = de_polygonal_ds_Collection;
de_polygonal_ds_Collection.__name__ = ["de","polygonal","ds","Collection"];
de_polygonal_ds_Collection.__interfaces__ = [de_polygonal_ds_Hashable];
de_polygonal_ds_Collection.prototype = {
	free: null
	,contains: null
	,remove: null
	,clear: null
	,iterator: null
	,isEmpty: null
	,size: null
	,toArray: null
	,clone: null
	,__class__: de_polygonal_ds_Collection
};
var de_polygonal_ds_Graph = function(maxSize) {
	if(maxSize == null) maxSize = -1;
	this.maxSize = -1;
	this.clear();
	this._size = 0;
	this._iterator = null;
	this.autoClearMarks = false;
	this.key = de_polygonal_ds_HashKey._counter++;
	this.reuseIterator = false;
};
$hxClasses["de.polygonal.ds.Graph"] = de_polygonal_ds_Graph;
de_polygonal_ds_Graph.__name__ = ["de","polygonal","ds","Graph"];
de_polygonal_ds_Graph.__interfaces__ = [de_polygonal_ds_Collection];
de_polygonal_ds_Graph.prototype = {
	key: null
	,maxSize: null
	,autoClearMarks: null
	,reuseIterator: null
	,borrowArc: null
	,returnArc: null
	,_nodeList: null
	,_size: null
	,_stack: null
	,_que: null
	,_iterator: null
	,getNodeList: function() {
		return this._nodeList;
	}
	,findNode: function(x) {
		var found = false;
		var n = this._nodeList;
		while(n != null) {
			if(n.val == x) {
				found = true;
				break;
			}
			n = n.next;
		}
		if(found) return n; else return null;
	}
	,createNode: function(x) {
		return new de_polygonal_ds_GraphNode(this,x);
	}
	,addNode: function(x) {
		this._size++;
		x.next = this._nodeList;
		if(x.next != null) x.next.prev = x;
		this._nodeList = x;
		return x;
	}
	,removeNode: function(x) {
		this.unlink(x);
		if(x.prev != null) x.prev.next = x.next;
		if(x.next != null) x.next.prev = x.prev;
		if(this._nodeList == x) this._nodeList = x.next;
		this._size--;
	}
	,addSingleArc: function(source,target,cost) {
		if(cost == null) cost = 1.;
		var walker = this._nodeList;
		while(walker != null) {
			if(walker == source) {
				var sourceNode = walker;
				walker = this._nodeList;
				while(walker != null) {
					if(walker == target) {
						sourceNode.addArc(walker,cost);
						break;
					}
					walker = walker.next;
				}
				break;
			}
			walker = walker.next;
		}
	}
	,addMutualArc: function(source,target,cost) {
		if(cost == null) cost = 1.;
		var walker = this._nodeList;
		while(walker != null) {
			if(walker == source) {
				var sourceNode = walker;
				walker = this._nodeList;
				while(walker != null) {
					if(walker == target) {
						sourceNode.addArc(walker,cost);
						walker.addArc(sourceNode,cost);
						break;
					}
					walker = walker.next;
				}
				break;
			}
			walker = walker.next;
		}
	}
	,unlink: function(node) {
		var arc0 = node.arcList;
		while(arc0 != null) {
			var node1 = arc0.node;
			var arc1 = node1.arcList;
			while(arc1 != null) {
				var hook1 = arc1.next;
				if(arc1.node == node) {
					if(arc1.prev != null) arc1.prev.next = hook1;
					if(hook1 != null) hook1.prev = arc1.prev;
					if(node1.arcList == arc1) node1.arcList = hook1;
					arc1.free();
					if(this.returnArc != null) this.returnArc(arc1);
				}
				arc1 = hook1;
			}
			var hook = arc0.next;
			if(arc0.prev != null) arc0.prev.next = hook;
			if(hook != null) hook.prev = arc0.prev;
			if(node.arcList == arc0) node.arcList = hook;
			arc0.free();
			if(this.returnArc != null) this.returnArc(arc0);
			arc0 = hook;
		}
		node.arcList = null;
		return node;
	}
	,clearMarks: function() {
		var node = this._nodeList;
		while(node != null) {
			node.marked = false;
			node = node.next;
		}
	}
	,clearParent: function() {
		var node = this._nodeList;
		while(node != null) {
			node.parent = null;
			node = node.next;
		}
	}
	,DFS: function(preflight,seed,process,userData,recursive) {
		if(recursive == null) recursive = false;
		if(preflight == null) preflight = false;
		if(this._size == 0) return;
		if(this.autoClearMarks) this.clearMarks();
		var c = 1;
		if(seed == null) seed = this._nodeList;
		this._stack[0] = seed;
		seed.parent = seed;
		seed.depth = 0;
		if(preflight) {
			if(process == null) {
				if(recursive) {
					var v = seed.val;
					if(v.visit(true,userData)) this._DFSRecursiveVisit(seed,true,userData);
				} else {
					var v1 = null;
					var n = this._stack[0];
					v1 = n.val;
					if(!v1.visit(true,userData)) return;
					while(c > 0) {
						var n1 = this._stack[--c];
						if(n1.marked) continue;
						n1.marked = true;
						v1 = n1.val;
						if(!v1.visit(false,userData)) break;
						var a = n1.arcList;
						while(a != null) {
							v1 = n1.val;
							a.node.parent = n1;
							a.node.depth = n1.depth + 1;
							if(v1.visit(true,userData)) this._stack[c++] = a.node;
							a = a.next;
						}
					}
				}
			} else if(recursive) {
				if(process(seed,true,userData)) this._DFSRecursiveProcess(seed,process,true,userData);
			} else {
				var n2 = this._stack[0];
				if(!process(n2,true,userData)) return;
				while(c > 0) {
					var n3 = this._stack[--c];
					if(n3.marked) continue;
					n3.marked = true;
					if(!process(n3,false,userData)) break;
					var a1 = n3.arcList;
					while(a1 != null) {
						a1.node.parent = n3;
						a1.node.depth = n3.depth + 1;
						if(process(a1.node,true,userData)) this._stack[c++] = a1.node;
						a1 = a1.next;
					}
				}
			}
		} else if(process == null) {
			if(recursive) this._DFSRecursiveVisit(seed,false,userData); else {
				var v2 = null;
				while(c > 0) {
					var n4 = this._stack[--c];
					if(n4.marked) continue;
					n4.marked = true;
					v2 = n4.val;
					if(!v2.visit(false,userData)) break;
					var a2 = n4.arcList;
					while(a2 != null) {
						this._stack[c++] = a2.node;
						a2.node.parent = n4;
						a2.node.depth = n4.depth + 1;
						a2 = a2.next;
					}
				}
			}
		} else if(recursive) this._DFSRecursiveProcess(seed,process,false,userData); else while(c > 0) {
			var n5 = this._stack[--c];
			if(n5.marked) continue;
			n5.marked = true;
			if(!process(n5,false,userData)) break;
			var a3 = n5.arcList;
			while(a3 != null) {
				this._stack[c++] = a3.node;
				a3.node.parent = n5;
				a3.node.depth = n5.depth + 1;
				a3 = a3.next;
			}
		}
	}
	,BFS: function(preflight,seed,process,userData) {
		if(preflight == null) preflight = false;
		if(this._size == 0) return;
		if(this.autoClearMarks) this.clearMarks();
		var front = 0;
		var c = 1;
		if(seed == null) seed = this._nodeList;
		this._que[0] = seed;
		seed.marked = true;
		seed.parent = seed;
		seed.depth = 0;
		if(preflight) {
			if(process == null) {
				var v = null;
				var n = this._que[front];
				v = n.val;
				if(!v.visit(true,userData)) return;
				while(c > 0) {
					n = this._que[front];
					v = n.val;
					if(!v.visit(false,userData)) return;
					var a = n.arcList;
					while(a != null) {
						var m = a.node;
						if(m.marked) {
							a = a.next;
							continue;
						}
						m.marked = true;
						m.parent = n;
						m.depth = n.depth + 1;
						v = m.val;
						if(v.visit(true,userData)) this._que[c++ + front] = m;
						a = a.next;
					}
					front++;
					c--;
				}
			} else {
				var n1 = this._que[front];
				if(!process(n1,true,userData)) return;
				while(c > 0) {
					n1 = this._que[front];
					if(!process(n1,false,userData)) return;
					var a1 = n1.arcList;
					while(a1 != null) {
						var m1 = a1.node;
						if(m1.marked) {
							a1 = a1.next;
							continue;
						}
						m1.marked = true;
						m1.parent = n1;
						m1.depth = n1.depth + 1;
						if(process(m1,true,userData)) this._que[c++ + front] = m1;
						a1 = a1.next;
					}
					front++;
					c--;
				}
			}
		} else if(process == null) {
			var v1 = null;
			while(c > 0) {
				var n2 = this._que[front];
				v1 = n2.val;
				if(!v1.visit(false,userData)) return;
				var a2 = n2.arcList;
				while(a2 != null) {
					var m2 = a2.node;
					if(m2.marked) {
						a2 = a2.next;
						continue;
					}
					m2.marked = true;
					m2.parent = n2;
					m2.depth = n2.depth + 1;
					this._que[c++ + front] = m2;
					a2 = a2.next;
				}
				front++;
				c--;
			}
		} else while(c > 0) {
			var n3 = this._que[front];
			if(!process(n3,false,userData)) return;
			var a3 = n3.arcList;
			while(a3 != null) {
				var m3 = a3.node;
				if(m3.marked) {
					a3 = a3.next;
					continue;
				}
				m3.marked = true;
				m3.parent = n3;
				m3.depth = n3.depth + 1;
				this._que[c++ + front] = m3;
				a3 = a3.next;
			}
			front++;
			c--;
		}
	}
	,DLBFS: function(maxDepth,preflight,seed,process,userData) {
		if(preflight == null) preflight = false;
		if(this._size == 0) return;
		if(this.autoClearMarks) this.clearMarks();
		var front = 0;
		var c = 1;
		var node = this._nodeList;
		while(node != null) {
			node.depth = 0;
			node = node.next;
		}
		if(seed == null) seed = this._nodeList;
		this._que[0] = seed;
		seed.marked = true;
		seed.parent = seed;
		if(preflight) {
			if(process == null) {
				var v = null;
				var n = this._que[front];
				v = n.val;
				if(!v.visit(true,userData)) return;
				while(c > 0) {
					n = this._que[front];
					v = n.val;
					if(!v.visit(false,userData)) return;
					var a = n.arcList;
					while(a != null) {
						var m = a.node;
						if(m.marked) {
							a = a.next;
							continue;
						}
						m.marked = true;
						m.parent = n;
						m.depth = n.depth + 1;
						if(m.depth <= maxDepth) {
							v = m.val;
							if(v.visit(true,userData)) this._que[c++ + front] = m;
						}
						a = a.next;
					}
					front++;
					c--;
				}
			} else {
				var n1 = this._que[front];
				if(!process(n1,true,userData)) return;
				while(c > 0) {
					n1 = this._que[front];
					if(!process(n1,false,userData)) return;
					var a1 = n1.arcList;
					while(a1 != null) {
						var m1 = a1.node;
						if(m1.marked) {
							a1 = a1.next;
							continue;
						}
						m1.marked = true;
						m1.parent = n1;
						m1.depth = n1.depth + 1;
						if(m1.depth <= maxDepth) {
							if(process(m1,true,userData)) this._que[c++ + front] = m1;
						}
						a1 = a1.next;
					}
					front++;
					c--;
				}
			}
		} else if(process == null) {
			var v1 = null;
			while(c > 0) {
				var n2 = this._que[front];
				v1 = n2.val;
				if(!v1.visit(false,userData)) return;
				var a2 = n2.arcList;
				while(a2 != null) {
					var m2 = a2.node;
					if(m2.marked) {
						a2 = a2.next;
						continue;
					}
					m2.marked = true;
					m2.depth = n2.depth + 1;
					m2.parent = n2.parent;
					if(m2.depth <= maxDepth) this._que[c++ + front] = m2;
					a2 = a2.next;
				}
				front++;
				c--;
			}
		} else while(c > 0) {
			var n3 = this._que[front];
			if(n3.depth > maxDepth) continue;
			if(!process(n3,false,userData)) return;
			var a3 = n3.arcList;
			while(a3 != null) {
				var m3 = a3.node;
				if(m3.marked) {
					a3 = a3.next;
					continue;
				}
				m3.marked = true;
				m3.depth = n3.depth + 1;
				m3.parent = n3.parent;
				if(m3.depth <= maxDepth) this._que[c++ + front] = m3;
				a3 = a3.next;
			}
			front++;
			c--;
		}
	}
	,toString: function() {
		var s = "{ Graph size: " + this._size + " }";
		if(this._size == 0) return s;
		s += "\n[\n";
		var node = this._nodeList;
		while(node != null) {
			s += "  " + node.toString() + "\n";
			node = node.next;
		}
		s += "]";
		return s;
	}
	,free: function() {
		var node = this._nodeList;
		while(node != null) {
			var nextNode = node.next;
			var arc = node.arcList;
			while(arc != null) {
				var nextArc = arc.next;
				arc.next = arc.prev = null;
				arc.node = null;
				arc = nextArc;
			}
			node.free();
			node = nextNode;
		}
		this._nodeList = null;
		var _g1 = 0;
		var _g = this._stack.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._stack[i] = null;
		}
		this._stack = null;
		var _g11 = 0;
		var _g2 = this._que.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			this._que[i1] = null;
		}
		this._que = null;
		this._iterator = null;
	}
	,contains: function(x) {
		var found = false;
		var node = this._nodeList;
		while(node != null) {
			if(node.val == x) return true;
			node = node.next;
		}
		return false;
	}
	,remove: function(x) {
		var found = false;
		var node = this._nodeList;
		while(node != null) {
			var nextNode = node.next;
			if(node.val == x) {
				this.unlink(node);
				node.val = null;
				node.next = node.prev = null;
				node.arcList = null;
				found = true;
				this._size--;
			}
			node = nextNode;
		}
		return found;
	}
	,clear: function(purge) {
		if(purge == null) purge = false;
		if(purge) {
			var node = this._nodeList;
			while(node != null) {
				var hook = node.next;
				var arc = node.arcList;
				while(arc != null) {
					var hook1 = arc.next;
					arc.free();
					arc = hook1;
				}
				node.free();
				node = hook;
			}
		}
		this._nodeList = null;
		this._size = 0;
		this._stack = [];
		this._que = [];
	}
	,iterator: function() {
		if(this.reuseIterator) {
			if(this._iterator == null) this._iterator = new de_polygonal_ds_GraphIterator(this); else this._iterator.reset();
			return this._iterator;
		} else return new de_polygonal_ds_GraphIterator(this);
	}
	,nodeIterator: function() {
		return new de_polygonal_ds_GraphNodeIterator(this);
	}
	,arcIterator: function() {
		return new de_polygonal_ds_GraphArcIterator(this);
	}
	,size: function() {
		return this._size;
	}
	,isEmpty: function() {
		return this._size == 0;
	}
	,toArray: function() {
		var a = de_polygonal_ds_ArrayUtil.alloc(this._size);
		var node = this._nodeList;
		while(node != null) {
			a.push(node.val);
			node = node.next;
		}
		return a;
	}
	,clone: function(assign,copier) {
		if(assign == null) assign = true;
		var copy = new de_polygonal_ds_Graph(this.maxSize);
		if(this._nodeList == null) return copy;
		var t = [];
		var i = 0;
		var n = this._nodeList;
		if(assign) while(n != null) {
			var m = copy.addNode(copy.createNode(n.val));
			t[i++] = m;
			n = n.next;
		} else if(copier == null) {
			var c = null;
			while(n != null) {
				c = n.val;
				var m1 = copy.addNode(copy.createNode(c.clone()));
				t[i++] = m1;
				n = n.next;
			}
		} else while(n != null) {
			var m2 = copy.addNode(copy.createNode(copier(n.val)));
			t[i++] = m2;
			n = n.next;
		}
		i = 0;
		n = this._nodeList;
		while(n != null) {
			var m3 = t[i++];
			var a = n.arcList;
			while(a != null) {
				m3.addArc(a.node,a.cost);
				a = a.next;
			}
			n = n.next;
		}
		return copy;
	}
	,_DFSRecursiveVisit: function(node,preflight,userData) {
		node.marked = true;
		var v = node.val;
		if(!v.visit(false,userData)) return false;
		var a = node.arcList;
		while(a != null) {
			var m = a.node;
			if(m.marked) {
				a = a.next;
				continue;
			}
			a.node.parent = node;
			a.node.depth = node.depth + 1;
			if(preflight) {
				v = m.val;
				if(v.visit(true,userData)) {
					if(!this._DFSRecursiveVisit(m,true,userData)) return false;
				}
			} else if(!this._DFSRecursiveVisit(m,false,userData)) return false;
			a = a.next;
		}
		return true;
	}
	,_DFSRecursiveProcess: function(node,process,preflight,userData) {
		node.marked = true;
		if(!process(node,false,userData)) return false;
		var a = node.arcList;
		while(a != null) {
			var m = a.node;
			if(m.marked) {
				a = a.next;
				continue;
			}
			a.node.parent = node;
			a.node.depth = node.depth + 1;
			if(preflight) {
				if(process(m,true,userData)) {
					if(!this._DFSRecursiveProcess(m,process,true,userData)) return false;
				}
			} else if(!this._DFSRecursiveProcess(m,process,false,userData)) return false;
			a = a.next;
		}
		return true;
	}
	,__class__: de_polygonal_ds_Graph
};
var de_polygonal_ds_Itr = function() { };
$hxClasses["de.polygonal.ds.Itr"] = de_polygonal_ds_Itr;
de_polygonal_ds_Itr.__name__ = ["de","polygonal","ds","Itr"];
de_polygonal_ds_Itr.prototype = {
	hasNext: null
	,next: null
	,remove: null
	,reset: null
	,__class__: de_polygonal_ds_Itr
};
var de_polygonal_ds_GraphIterator = function(f) {
	this._f = f;
	{
		this._node = this._f._nodeList;
		this;
	}
};
$hxClasses["de.polygonal.ds.GraphIterator"] = de_polygonal_ds_GraphIterator;
de_polygonal_ds_GraphIterator.__name__ = ["de","polygonal","ds","GraphIterator"];
de_polygonal_ds_GraphIterator.__interfaces__ = [de_polygonal_ds_Itr];
de_polygonal_ds_GraphIterator.prototype = {
	_f: null
	,_node: null
	,reset: function() {
		this._node = this._f._nodeList;
		return this;
	}
	,hasNext: function() {
		return this._node != null;
	}
	,next: function() {
		var x = this._node.val;
		this._node = this._node.next;
		return x;
	}
	,remove: function() {
		throw new js__$Boot_HaxeError("unsupported operation");
	}
	,__nodeList: function(f) {
		return f._nodeList;
	}
	,__class__: de_polygonal_ds_GraphIterator
};
var de_polygonal_ds_GraphNodeIterator = function(f) {
	this._f = f;
	{
		this._node = this._f._nodeList;
		this;
	}
};
$hxClasses["de.polygonal.ds.GraphNodeIterator"] = de_polygonal_ds_GraphNodeIterator;
de_polygonal_ds_GraphNodeIterator.__name__ = ["de","polygonal","ds","GraphNodeIterator"];
de_polygonal_ds_GraphNodeIterator.__interfaces__ = [de_polygonal_ds_Itr];
de_polygonal_ds_GraphNodeIterator.prototype = {
	_f: null
	,_node: null
	,reset: function() {
		this._node = this._f._nodeList;
		return this;
	}
	,hasNext: function() {
		return this._node != null;
	}
	,next: function() {
		var x = this._node;
		this._node = this._node.next;
		return x;
	}
	,remove: function() {
		throw new js__$Boot_HaxeError("unsupported operation");
	}
	,__nodeList: function(f) {
		return f._nodeList;
	}
	,__class__: de_polygonal_ds_GraphNodeIterator
};
var de_polygonal_ds_GraphArcIterator = function(f) {
	this._f = f;
	{
		this._node = this._f._nodeList;
		this._arc = this._node.arcList;
		this;
	}
};
$hxClasses["de.polygonal.ds.GraphArcIterator"] = de_polygonal_ds_GraphArcIterator;
de_polygonal_ds_GraphArcIterator.__name__ = ["de","polygonal","ds","GraphArcIterator"];
de_polygonal_ds_GraphArcIterator.__interfaces__ = [de_polygonal_ds_Itr];
de_polygonal_ds_GraphArcIterator.prototype = {
	_f: null
	,_node: null
	,_arc: null
	,reset: function() {
		this._node = this._f._nodeList;
		this._arc = this._node.arcList;
		return this;
	}
	,hasNext: function() {
		return this._arc != null && this._node != null;
	}
	,next: function() {
		var x = this._arc;
		this._arc = this._arc.next;
		if(this._arc == null) {
			this._node = this._node.next;
			if(this._node != null) this._arc = this._node.arcList;
		}
		return x;
	}
	,remove: function() {
		throw new js__$Boot_HaxeError("unsupported operation");
	}
	,__nodeList: function(f) {
		return f._nodeList;
	}
	,__class__: de_polygonal_ds_GraphArcIterator
};
var de_polygonal_ds_GraphArc = function(node,cost) {
	this.node = node;
	this.cost = cost;
	this.next = null;
	this.prev = null;
	this.key = de_polygonal_ds_HashKey._counter++;
};
$hxClasses["de.polygonal.ds.GraphArc"] = de_polygonal_ds_GraphArc;
de_polygonal_ds_GraphArc.__name__ = ["de","polygonal","ds","GraphArc"];
de_polygonal_ds_GraphArc.__interfaces__ = [de_polygonal_ds_Hashable];
de_polygonal_ds_GraphArc.prototype = {
	key: null
	,node: null
	,cost: null
	,next: null
	,prev: null
	,free: function() {
		this.node = null;
		this.next = this.prev = null;
	}
	,val: function() {
		return this.node.val;
	}
	,__class__: de_polygonal_ds_GraphArc
};
var de_polygonal_ds_GraphNode = function(graph,x) {
	this.val = x;
	this.arcList = null;
	this.marked = false;
	this.key = de_polygonal_ds_HashKey._counter++;
	this._graph = graph;
};
$hxClasses["de.polygonal.ds.GraphNode"] = de_polygonal_ds_GraphNode;
de_polygonal_ds_GraphNode.__name__ = ["de","polygonal","ds","GraphNode"];
de_polygonal_ds_GraphNode.__interfaces__ = [de_polygonal_ds_Hashable];
de_polygonal_ds_GraphNode.prototype = {
	key: null
	,val: null
	,parent: null
	,depth: null
	,next: null
	,prev: null
	,arcList: null
	,marked: null
	,_graph: null
	,free: function() {
		this.val = null;
		this.next = this.prev = null;
		this.arcList = null;
		this._graph = null;
	}
	,iterator: function() {
		return new de_polygonal_ds_NodeValIterator(this);
	}
	,isConnected: function(target) {
		return this.getArc(target) != null;
	}
	,isMutuallyConnected: function(target) {
		return this.getArc(target) != null && target.getArc(this) != null;
	}
	,getArc: function(target) {
		var found = false;
		var a = this.arcList;
		while(a != null) {
			if(a.node == target) {
				found = true;
				break;
			}
			a = a.next;
		}
		if(found) return a; else return null;
	}
	,addArc: function(target,cost) {
		if(cost == null) cost = 1.;
		var arc;
		if(this._graph.borrowArc != null) arc = this._graph.borrowArc(target,cost); else arc = new de_polygonal_ds_GraphArc(target,cost);
		arc.next = this.arcList;
		if(this.arcList != null) this.arcList.prev = arc;
		this.arcList = arc;
	}
	,removeArc: function(target) {
		var arc = this.getArc(target);
		if(arc != null) {
			if(arc.prev != null) arc.prev.next = arc.next;
			if(arc.next != null) arc.next.prev = arc.prev;
			if(this.arcList == arc) this.arcList = arc.next;
			arc.next = null;
			arc.prev = null;
			arc.node = null;
			if(this._graph.returnArc != null) this._graph.returnArc(arc);
			return true;
		}
		return false;
	}
	,removeSingleArcs: function() {
		var arc = this.arcList;
		while(arc != null) {
			this.removeArc(arc.node);
			arc = arc.next;
		}
	}
	,removeMutualArcs: function() {
		var arc = this.arcList;
		while(arc != null) {
			arc.node.removeArc(this);
			this.removeArc(arc.node);
			arc = arc.next;
		}
		this.arcList = null;
	}
	,getArcCount: function() {
		var c = 0;
		var arc = this.arcList;
		while(arc != null) {
			c++;
			arc = arc.next;
		}
		return c;
	}
	,toString: function() {
		var t = [];
		if(this.arcList != null) {
			var arc = this.arcList;
			while(arc != null) {
				t.push(Std.string(arc.node.val));
				arc = arc.next;
			}
		}
		if(t.length > 0) return "{ GraphNode val: " + Std.string(this.val) + ", connected to: " + t.join(",") + " }"; else return "{ GraphNode val: " + Std.string(this.val) + " }";
	}
	,__class__: de_polygonal_ds_GraphNode
};
var de_polygonal_ds_NodeValIterator = function(node) {
	this._node = node;
	{
		this._arcList = this._node.arcList;
		this;
	}
};
$hxClasses["de.polygonal.ds.NodeValIterator"] = de_polygonal_ds_NodeValIterator;
de_polygonal_ds_NodeValIterator.__name__ = ["de","polygonal","ds","NodeValIterator"];
de_polygonal_ds_NodeValIterator.__interfaces__ = [de_polygonal_ds_Itr];
de_polygonal_ds_NodeValIterator.prototype = {
	_node: null
	,_arcList: null
	,reset: function() {
		this._arcList = this._node.arcList;
		return this;
	}
	,hasNext: function() {
		return this._arcList != null;
	}
	,next: function() {
		var val = this._arcList.node.val;
		this._arcList = this._arcList.next;
		return val;
	}
	,remove: function() {
		throw new js__$Boot_HaxeError("unsupported operation");
	}
	,__class__: de_polygonal_ds_NodeValIterator
};
var de_polygonal_ds_HashKey = function() { };
$hxClasses["de.polygonal.ds.HashKey"] = de_polygonal_ds_HashKey;
de_polygonal_ds_HashKey.__name__ = ["de","polygonal","ds","HashKey"];
de_polygonal_ds_HashKey.next = function() {
	return de_polygonal_ds_HashKey._counter++;
};
var de_polygonal_ds_HashableItem = function() {
	this.key = de_polygonal_ds_HashKey._counter++;
};
$hxClasses["de.polygonal.ds.HashableItem"] = de_polygonal_ds_HashableItem;
de_polygonal_ds_HashableItem.__name__ = ["de","polygonal","ds","HashableItem"];
de_polygonal_ds_HashableItem.__interfaces__ = [de_polygonal_ds_Hashable];
de_polygonal_ds_HashableItem.prototype = {
	key: null
	,__class__: de_polygonal_ds_HashableItem
};
var de_polygonal_ds_error_Assert = function() { };
$hxClasses["de.polygonal.ds.error.Assert"] = de_polygonal_ds_error_Assert;
de_polygonal_ds_error_Assert.__name__ = ["de","polygonal","ds","error","Assert"];
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = ["haxe","IMap"];
haxe_IMap.prototype = {
	get: null
	,keys: null
	,__class__: haxe_IMap
};
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
$hxClasses["haxe._Int64.___Int64"] = haxe__$Int64__$_$_$Int64;
haxe__$Int64__$_$_$Int64.__name__ = ["haxe","_Int64","___Int64"];
haxe__$Int64__$_$_$Int64.prototype = {
	high: null
	,low: null
	,__class__: haxe__$Int64__$_$_$Int64
};
var haxe_Serializer = function() {
	this.buf = new StringBuf();
	this.cache = [];
	this.useCache = haxe_Serializer.USE_CACHE;
	this.useEnumIndex = haxe_Serializer.USE_ENUM_INDEX;
	this.shash = new haxe_ds_StringMap();
	this.scount = 0;
};
$hxClasses["haxe.Serializer"] = haxe_Serializer;
haxe_Serializer.__name__ = ["haxe","Serializer"];
haxe_Serializer.prototype = {
	buf: null
	,cache: null
	,shash: null
	,scount: null
	,useCache: null
	,useEnumIndex: null
	,toString: function() {
		return this.buf.b;
	}
	,serializeString: function(s) {
		var x = this.shash.get(s);
		if(x != null) {
			this.buf.b += "R";
			if(x == null) this.buf.b += "null"; else this.buf.b += "" + x;
			return;
		}
		this.shash.set(s,this.scount++);
		this.buf.b += "y";
		s = encodeURIComponent(s);
		if(s.length == null) this.buf.b += "null"; else this.buf.b += "" + s.length;
		this.buf.b += ":";
		if(s == null) this.buf.b += "null"; else this.buf.b += "" + s;
	}
	,serializeRef: function(v) {
		var vt = typeof(v);
		var _g1 = 0;
		var _g = this.cache.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ci = this.cache[i];
			if(typeof(ci) == vt && ci == v) {
				this.buf.b += "r";
				if(i == null) this.buf.b += "null"; else this.buf.b += "" + i;
				return true;
			}
		}
		this.cache.push(v);
		return false;
	}
	,serializeFields: function(v) {
		var _g = 0;
		var _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.serializeString(f);
			this.serialize(Reflect.field(v,f));
		}
		this.buf.b += "g";
	}
	,serialize: function(v) {
		{
			var _g = Type["typeof"](v);
			switch(_g[1]) {
			case 0:
				this.buf.b += "n";
				break;
			case 1:
				var v1 = v;
				if(v1 == 0) {
					this.buf.b += "z";
					return;
				}
				this.buf.b += "i";
				if(v1 == null) this.buf.b += "null"; else this.buf.b += "" + v1;
				break;
			case 2:
				var v2 = v;
				if(isNaN(v2)) this.buf.b += "k"; else if(!isFinite(v2)) if(v2 < 0) this.buf.b += "m"; else this.buf.b += "p"; else {
					this.buf.b += "d";
					if(v2 == null) this.buf.b += "null"; else this.buf.b += "" + v2;
				}
				break;
			case 3:
				if(v) this.buf.b += "t"; else this.buf.b += "f";
				break;
			case 6:
				var c = _g[2];
				if(c == String) {
					this.serializeString(v);
					return;
				}
				if(this.useCache && this.serializeRef(v)) return;
				switch(c) {
				case Array:
					var ucount = 0;
					this.buf.b += "a";
					var l = v.length;
					var _g1 = 0;
					while(_g1 < l) {
						var i = _g1++;
						if(v[i] == null) ucount++; else {
							if(ucount > 0) {
								if(ucount == 1) this.buf.b += "n"; else {
									this.buf.b += "u";
									if(ucount == null) this.buf.b += "null"; else this.buf.b += "" + ucount;
								}
								ucount = 0;
							}
							this.serialize(v[i]);
						}
					}
					if(ucount > 0) {
						if(ucount == 1) this.buf.b += "n"; else {
							this.buf.b += "u";
							if(ucount == null) this.buf.b += "null"; else this.buf.b += "" + ucount;
						}
					}
					this.buf.b += "h";
					break;
				case List:
					this.buf.b += "l";
					var v3 = v;
					var _g1_head = v3.h;
					var _g1_val = null;
					while(_g1_head != null) {
						var i1;
						_g1_val = _g1_head[0];
						_g1_head = _g1_head[1];
						i1 = _g1_val;
						this.serialize(i1);
					}
					this.buf.b += "h";
					break;
				case Date:
					var d = v;
					this.buf.b += "v";
					this.buf.add(d.getTime());
					break;
				case haxe_ds_StringMap:
					this.buf.b += "b";
					var v4 = v;
					var $it0 = v4.keys();
					while( $it0.hasNext() ) {
						var k = $it0.next();
						this.serializeString(k);
						this.serialize(__map_reserved[k] != null?v4.getReserved(k):v4.h[k]);
					}
					this.buf.b += "h";
					break;
				case haxe_ds_IntMap:
					this.buf.b += "q";
					var v5 = v;
					var $it1 = v5.keys();
					while( $it1.hasNext() ) {
						var k1 = $it1.next();
						this.buf.b += ":";
						if(k1 == null) this.buf.b += "null"; else this.buf.b += "" + k1;
						this.serialize(v5.h[k1]);
					}
					this.buf.b += "h";
					break;
				case haxe_ds_ObjectMap:
					this.buf.b += "M";
					var v6 = v;
					var $it2 = v6.keys();
					while( $it2.hasNext() ) {
						var k2 = $it2.next();
						var id = Reflect.field(k2,"__id__");
						Reflect.deleteField(k2,"__id__");
						this.serialize(k2);
						k2.__id__ = id;
						this.serialize(v6.h[k2.__id__]);
					}
					this.buf.b += "h";
					break;
				case haxe_io_Bytes:
					var v7 = v;
					var i2 = 0;
					var max = v7.length - 2;
					var charsBuf = new StringBuf();
					var b64 = haxe_Serializer.BASE64;
					while(i2 < max) {
						var b1 = v7.get(i2++);
						var b2 = v7.get(i2++);
						var b3 = v7.get(i2++);
						charsBuf.add(b64.charAt(b1 >> 2));
						charsBuf.add(b64.charAt((b1 << 4 | b2 >> 4) & 63));
						charsBuf.add(b64.charAt((b2 << 2 | b3 >> 6) & 63));
						charsBuf.add(b64.charAt(b3 & 63));
					}
					if(i2 == max) {
						var b11 = v7.get(i2++);
						var b21 = v7.get(i2++);
						charsBuf.add(b64.charAt(b11 >> 2));
						charsBuf.add(b64.charAt((b11 << 4 | b21 >> 4) & 63));
						charsBuf.add(b64.charAt(b21 << 2 & 63));
					} else if(i2 == max + 1) {
						var b12 = v7.get(i2++);
						charsBuf.add(b64.charAt(b12 >> 2));
						charsBuf.add(b64.charAt(b12 << 4 & 63));
					}
					var chars = charsBuf.b;
					this.buf.b += "s";
					if(chars.length == null) this.buf.b += "null"; else this.buf.b += "" + chars.length;
					this.buf.b += ":";
					if(chars == null) this.buf.b += "null"; else this.buf.b += "" + chars;
					break;
				default:
					if(this.useCache) this.cache.pop();
					if(v.hxSerialize != null) {
						this.buf.b += "C";
						this.serializeString(Type.getClassName(c));
						if(this.useCache) this.cache.push(v);
						v.hxSerialize(this);
						this.buf.b += "g";
					} else {
						this.buf.b += "c";
						this.serializeString(Type.getClassName(c));
						if(this.useCache) this.cache.push(v);
						this.serializeFields(v);
					}
				}
				break;
			case 4:
				if(js_Boot.__instanceof(v,Class)) {
					var className = Type.getClassName(v);
					this.buf.b += "A";
					this.serializeString(className);
				} else if(js_Boot.__instanceof(v,Enum)) {
					this.buf.b += "B";
					this.serializeString(Type.getEnumName(v));
				} else {
					if(this.useCache && this.serializeRef(v)) return;
					this.buf.b += "o";
					this.serializeFields(v);
				}
				break;
			case 7:
				var e = _g[2];
				if(this.useCache) {
					if(this.serializeRef(v)) return;
					this.cache.pop();
				}
				if(this.useEnumIndex) this.buf.b += "j"; else this.buf.b += "w";
				this.serializeString(Type.getEnumName(e));
				if(this.useEnumIndex) {
					this.buf.b += ":";
					this.buf.b += Std.string(v[1]);
				} else this.serializeString(v[0]);
				this.buf.b += ":";
				var l1 = v.length;
				this.buf.b += Std.string(l1 - 2);
				var _g11 = 2;
				while(_g11 < l1) {
					var i3 = _g11++;
					this.serialize(v[i3]);
				}
				if(this.useCache) this.cache.push(v);
				break;
			case 5:
				throw new js__$Boot_HaxeError("Cannot serialize function");
				break;
			default:
				throw new js__$Boot_HaxeError("Cannot serialize " + Std.string(v));
			}
		}
	}
	,__class__: haxe_Serializer
};
var haxe_Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = [];
	this.cache = [];
	var r = haxe_Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe_Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe_Unserializer;
haxe_Unserializer.__name__ = ["haxe","Unserializer"];
haxe_Unserializer.initCodes = function() {
	var codes = [];
	var _g1 = 0;
	var _g = haxe_Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe_Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
};
haxe_Unserializer.prototype = {
	buf: null
	,pos: null
	,length: null
	,cache: null
	,scache: null
	,resolver: null
	,setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_1) {
			return null;
		}}; else this.resolver = r;
	}
	,get: function(p) {
		return this.buf.charCodeAt(p);
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,readFloat: function() {
		var p1 = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
		}
		return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw new js__$Boot_HaxeError("Invalid object");
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!(typeof(k) == "string")) throw new js__$Boot_HaxeError("Invalid object key");
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.get(this.pos++) != 58) throw new js__$Boot_HaxeError("Invalid enum format");
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = [];
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserialize: function() {
		var _g = this.get(this.pos++);
		switch(_g) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			return this.readFloat();
		case 121:
			var len = this.readDigits();
			if(this.get(this.pos++) != 58 || this.length - this.pos < len) throw new js__$Boot_HaxeError("Invalid string length");
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = decodeURIComponent(s.split("+").join(" "));
			this.scache.push(s);
			return s;
		case 107:
			return NaN;
		case 109:
			return -Infinity;
		case 112:
			return Infinity;
		case 97:
			var buf = this.buf;
			var a = [];
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n1 = this.readDigits();
			if(n1 < 0 || n1 >= this.cache.length) throw new js__$Boot_HaxeError("Invalid reference");
			return this.cache[n1];
		case 82:
			var n2 = this.readDigits();
			if(n2 < 0 || n2 >= this.scache.length) throw new js__$Boot_HaxeError("Invalid string reference");
			return this.scache[n2];
		case 120:
			throw new js__$Boot_HaxeError(this.unserialize());
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw new js__$Boot_HaxeError("Class not found " + name);
			var o1 = Type.createEmptyInstance(cl);
			this.cache.push(o1);
			this.unserializeObject(o1);
			return o1;
		case 119:
			var name1 = this.unserialize();
			var edecl = this.resolver.resolveEnum(name1);
			if(edecl == null) throw new js__$Boot_HaxeError("Enum not found " + name1);
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name2 = this.unserialize();
			var edecl1 = this.resolver.resolveEnum(name2);
			if(edecl1 == null) throw new js__$Boot_HaxeError("Enum not found " + name2);
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl1)[index];
			if(tag == null) throw new js__$Boot_HaxeError("Unknown enum index " + name2 + "@" + index);
			var e1 = this.unserializeEnum(edecl1,tag);
			this.cache.push(e1);
			return e1;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf1 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe_ds_StringMap();
			this.cache.push(h);
			var buf2 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s1 = this.unserialize();
				h.set(s1,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h1 = new haxe_ds_IntMap();
			this.cache.push(h1);
			var buf3 = this.buf;
			var c1 = this.get(this.pos++);
			while(c1 == 58) {
				var i = this.readDigits();
				h1.set(i,this.unserialize());
				c1 = this.get(this.pos++);
			}
			if(c1 != 104) throw new js__$Boot_HaxeError("Invalid IntMap format");
			return h1;
		case 77:
			var h2 = new haxe_ds_ObjectMap();
			this.cache.push(h2);
			var buf4 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s2 = this.unserialize();
				h2.set(s2,this.unserialize());
			}
			this.pos++;
			return h2;
		case 118:
			var d;
			if(this.buf.charCodeAt(this.pos) >= 48 && this.buf.charCodeAt(this.pos) <= 57 && this.buf.charCodeAt(this.pos + 1) >= 48 && this.buf.charCodeAt(this.pos + 1) <= 57 && this.buf.charCodeAt(this.pos + 2) >= 48 && this.buf.charCodeAt(this.pos + 2) <= 57 && this.buf.charCodeAt(this.pos + 3) >= 48 && this.buf.charCodeAt(this.pos + 3) <= 57 && this.buf.charCodeAt(this.pos + 4) == 45) {
				var s3 = HxOverrides.substr(this.buf,this.pos,19);
				d = HxOverrides.strDate(s3);
				this.pos += 19;
			} else {
				var t = this.readFloat();
				var d1 = new Date();
				d1.setTime(t);
				d = d1;
			}
			this.cache.push(d);
			return d;
		case 115:
			var len1 = this.readDigits();
			var buf5 = this.buf;
			if(this.get(this.pos++) != 58 || this.length - this.pos < len1) throw new js__$Boot_HaxeError("Invalid bytes length");
			var codes = haxe_Unserializer.CODES;
			if(codes == null) {
				codes = haxe_Unserializer.initCodes();
				haxe_Unserializer.CODES = codes;
			}
			var i1 = this.pos;
			var rest = len1 & 3;
			var size;
			size = (len1 >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i1 + (len1 - rest);
			var bytes = haxe_io_Bytes.alloc(size);
			var bpos = 0;
			while(i1 < max) {
				var c11 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c2 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c11 << 2 | c2 >> 4);
				var c3 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c2 << 4 | c3 >> 2);
				var c4 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c3 << 6 | c4);
			}
			if(rest >= 2) {
				var c12 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c21 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c12 << 2 | c21 >> 4);
				if(rest == 3) {
					var c31 = codes[StringTools.fastCodeAt(buf5,i1++)];
					bytes.set(bpos++,c21 << 4 | c31 >> 2);
				}
			}
			this.pos += len1;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name3 = this.unserialize();
			var cl1 = this.resolver.resolveClass(name3);
			if(cl1 == null) throw new js__$Boot_HaxeError("Class not found " + name3);
			var o2 = Type.createEmptyInstance(cl1);
			this.cache.push(o2);
			o2.hxUnserialize(this);
			if(this.get(this.pos++) != 103) throw new js__$Boot_HaxeError("Invalid custom data");
			return o2;
		case 65:
			var name4 = this.unserialize();
			var cl2 = this.resolver.resolveClass(name4);
			if(cl2 == null) throw new js__$Boot_HaxeError("Class not found " + name4);
			return cl2;
		case 66:
			var name5 = this.unserialize();
			var e2 = this.resolver.resolveEnum(name5);
			if(e2 == null) throw new js__$Boot_HaxeError("Enum not found " + name5);
			return e2;
		default:
		}
		this.pos--;
		throw new js__$Boot_HaxeError("Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos);
	}
	,__class__: haxe_Unserializer
};
var haxe_Utf8 = function(size) {
	this.__b = "";
};
$hxClasses["haxe.Utf8"] = haxe_Utf8;
haxe_Utf8.__name__ = ["haxe","Utf8"];
haxe_Utf8.prototype = {
	__b: null
	,__class__: haxe_Utf8
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = ["haxe","ds","IntMap"];
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	h: null
	,set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	h: null
	,set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,get: function(key) {
		return this.h[key.__id__];
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	h: null
	,rh: null
	,set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,__class__: haxe_ds_StringMap
};
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = ["haxe","io","Bytes"];
haxe_io_Bytes.alloc = function(length) {
	return new haxe_io_Bytes(new ArrayBuffer(length));
};
haxe_io_Bytes.prototype = {
	length: null
	,b: null
	,get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,__class__: haxe_io_Bytes
};
var haxe_io_Error = $hxClasses["haxe.io.Error"] = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.toString = $estr;
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.toString = $estr;
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.toString = $estr;
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; $x.toString = $estr; return $x; };
var haxe_io_FPHelper = function() { };
$hxClasses["haxe.io.FPHelper"] = haxe_io_FPHelper;
haxe_io_FPHelper.__name__ = ["haxe","io","FPHelper"];
haxe_io_FPHelper.i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var exp = i >>> 23 & 255;
	var sig = i & 8388607;
	if(sig == 0 && exp == 0) return 0.0;
	return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	if(f == 0) return 0;
	var af;
	if(f < 0) af = -f; else af = f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp < -127) exp = -127; else if(exp > 128) exp = 128;
	var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608) & 8388607;
	return (f < 0?-2147483648:0) | exp + 127 << 23 | sig;
};
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	var sign = 1 - (high >>> 31 << 1);
	var exp = (high >> 20 & 2047) - 1023;
	var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
	if(sig == 0 && exp == -1023) return 0.0;
	return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
};
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else {
		var av;
		if(v < 0) av = -v; else av = v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		var sig;
		var v1 = (av / Math.pow(2,exp) - 1) * 4503599627370496.;
		sig = Math.round(v1);
		var sig_l = sig | 0;
		var sig_h = sig / 4294967296.0 | 0;
		i64.low = sig_l;
		i64.high = (v < 0?-2147483648:0) | exp + 1023 << 20 | sig_h;
	}
	return i64;
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	val: null
	,__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = ["js","Boot"];
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_html_compat_ArrayBuffer = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else {
		var len = a;
		this.a = [];
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.a[i] = 0;
		}
		this.byteLength = len;
	}
};
$hxClasses["js.html.compat.ArrayBuffer"] = js_html_compat_ArrayBuffer;
js_html_compat_ArrayBuffer.__name__ = ["js","html","compat","ArrayBuffer"];
js_html_compat_ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null?null:end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js_html_compat_ArrayBuffer.prototype = {
	byteLength: null
	,a: null
	,slice: function(begin,end) {
		return new js_html_compat_ArrayBuffer(this.a.slice(begin,end));
	}
	,__class__: js_html_compat_ArrayBuffer
};
var js_html_compat_DataView = function(buffer,byteOffset,byteLength) {
	this.buf = buffer;
	if(byteOffset == null) this.offset = 0; else this.offset = byteOffset;
	if(byteLength == null) this.length = buffer.byteLength - this.offset; else this.length = byteLength;
	if(this.offset < 0 || this.length < 0 || this.offset + this.length > buffer.byteLength) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
};
$hxClasses["js.html.compat.DataView"] = js_html_compat_DataView;
js_html_compat_DataView.__name__ = ["js","html","compat","DataView"];
js_html_compat_DataView.prototype = {
	buf: null
	,offset: null
	,length: null
	,getInt8: function(byteOffset) {
		var v = this.buf.a[this.offset + byteOffset];
		if(v >= 128) return v - 256; else return v;
	}
	,getUint8: function(byteOffset) {
		return this.buf.a[this.offset + byteOffset];
	}
	,getInt16: function(byteOffset,littleEndian) {
		var v = this.getUint16(byteOffset,littleEndian);
		if(v >= 32768) return v - 65536; else return v;
	}
	,getUint16: function(byteOffset,littleEndian) {
		if(littleEndian) return this.buf.a[this.offset + byteOffset] | this.buf.a[this.offset + byteOffset + 1] << 8; else return this.buf.a[this.offset + byteOffset] << 8 | this.buf.a[this.offset + byteOffset + 1];
	}
	,getInt32: function(byteOffset,littleEndian) {
		var p = this.offset + byteOffset;
		var a = this.buf.a[p++];
		var b = this.buf.a[p++];
		var c = this.buf.a[p++];
		var d = this.buf.a[p++];
		if(littleEndian) return a | b << 8 | c << 16 | d << 24; else return d | c << 8 | b << 16 | a << 24;
	}
	,getUint32: function(byteOffset,littleEndian) {
		var v = this.getInt32(byteOffset,littleEndian);
		if(v < 0) return v + 4294967296.; else return v;
	}
	,getFloat32: function(byteOffset,littleEndian) {
		return haxe_io_FPHelper.i32ToFloat(this.getInt32(byteOffset,littleEndian));
	}
	,getFloat64: function(byteOffset,littleEndian) {
		var a = this.getInt32(byteOffset,littleEndian);
		var b = this.getInt32(byteOffset + 4,littleEndian);
		return haxe_io_FPHelper.i64ToDouble(littleEndian?a:b,littleEndian?b:a);
	}
	,setInt8: function(byteOffset,value) {
		if(value < 0) this.buf.a[byteOffset + this.offset] = value + 128 & 255; else this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setUint8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setInt16: function(byteOffset,value,littleEndian) {
		this.setUint16(byteOffset,value < 0?value + 65536:value,littleEndian);
	}
	,setUint16: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
		} else {
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p] = value & 255;
		}
	}
	,setInt32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,value,littleEndian);
	}
	,setUint32: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p++] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >>> 24;
		} else {
			this.buf.a[p++] = value >>> 24;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value & 255;
		}
	}
	,setFloat32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,haxe_io_FPHelper.floatToI32(value),littleEndian);
	}
	,setFloat64: function(byteOffset,value,littleEndian) {
		var i64 = haxe_io_FPHelper.doubleToI64(value);
		if(littleEndian) {
			this.setUint32(byteOffset,i64.low);
			this.setUint32(byteOffset,i64.high);
		} else {
			this.setUint32(byteOffset,i64.high);
			this.setUint32(byteOffset,i64.low);
		}
	}
	,__class__: js_html_compat_DataView
};
var js_html_compat_Uint8Array = function() { };
$hxClasses["js.html.compat.Uint8Array"] = js_html_compat_Uint8Array;
js_html_compat_Uint8Array.__name__ = ["js","html","compat","Uint8Array"];
js_html_compat_Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g = 0;
		while(_g < arg1) {
			var i = _g++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else if(js_Boot.__instanceof(arg1,js_html_compat_ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) offset = 0;
		if(length == null) length = buffer.byteLength - offset;
		if(offset == 0) arr = buffer.a; else arr = buffer.a.slice(offset,offset + length);
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
	arr.subarray = js_html_compat_Uint8Array._subarray;
	arr.set = js_html_compat_Uint8Array._set;
	return arr;
};
js_html_compat_Uint8Array._set = function(arg,offset) {
	var t = this;
	if(js_Boot.__instanceof(arg.buffer,js_html_compat_ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			t[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			t[i1 + offset] = a1[i1];
		}
	} else throw new js__$Boot_HaxeError("TODO");
};
js_html_compat_Uint8Array._subarray = function(start,end) {
	var t = this;
	var a = js_html_compat_Uint8Array._new(t.slice(start,end));
	a.byteOffset = start;
	return a;
};
var textifician_mapping_ArcPacket = $hx_exports.textifician.mapping.ArcPacket = function() {
};
$hxClasses["textifician.mapping.ArcPacket"] = textifician_mapping_ArcPacket;
textifician_mapping_ArcPacket.__name__ = ["textifician","mapping","ArcPacket"];
textifician_mapping_ArcPacket.prototype = {
	flags: null
	,label: null
	,breakVisibility: null
	,__class__: textifician_mapping_ArcPacket
};
var textifician_mapping_IXYZ = function() { };
$hxClasses["textifician.mapping.IXYZ"] = textifician_mapping_IXYZ;
textifician_mapping_IXYZ.__name__ = ["textifician","mapping","IXYZ"];
textifician_mapping_IXYZ.prototype = {
	x: null
	,y: null
	,z: null
	,__class__: textifician_mapping_IXYZ
};
var textifician_mapping_IndoorLocationSpecs = $hx_exports.textifician.mapping.IndoorLocationSpecs = function() {
};
$hxClasses["textifician.mapping.IndoorLocationSpecs"] = textifician_mapping_IndoorLocationSpecs;
textifician_mapping_IndoorLocationSpecs.__name__ = ["textifician","mapping","IndoorLocationSpecs"];
textifician_mapping_IndoorLocationSpecs.create = function(wallHeight,wallThickness,wallStrength,ceilingThickness,ceilingStrength) {
	if(ceilingStrength == null) ceilingStrength = -1;
	if(ceilingThickness == null) ceilingThickness = -1;
	if(wallStrength == null) wallStrength = -1;
	if(wallThickness == null) wallThickness = -1;
	if(wallHeight == null) wallHeight = -1;
	var me = new textifician_mapping_IndoorLocationSpecs();
	if(wallHeight < 0) me.wallHeight = textifician_mapping_IndoorLocationSpecs.DEFAULT_WALL_HEIGHT; else me.wallHeight = wallHeight;
	if(wallThickness < 0) me.wallThickness = textifician_mapping_IndoorLocationSpecs.DEFAULT_WALL_THICKNESS; else me.wallThickness = wallThickness;
	if(wallStrength < 0) me.wallStrength = textifician_mapping_IndoorLocationSpecs.DEFAULT_WALL_STRENGTH; else me.wallStrength = wallStrength;
	if(ceilingThickness < 0) me.ceilingThickness = textifician_mapping_IndoorLocationSpecs.DEFAULT_CEILING_THICKNESS; else me.ceilingThickness = ceilingThickness;
	if(ceilingStrength < 0) me.ceilingStrength = textifician_mapping_IndoorLocationSpecs.DEFAULT_CEILING_STRENGTH; else me.ceilingStrength = ceilingStrength;
	return me;
};
textifician_mapping_IndoorLocationSpecs.prototype = {
	wallHeight: null
	,wallThickness: null
	,wallStrength: null
	,ceilingThickness: null
	,ceilingStrength: null
	,testMethod: function() {
	}
	,__class__: textifician_mapping_IndoorLocationSpecs
};
var textifician_mapping_LocationDefinition = $hx_exports.textifician.mapping.LocationDefinition = function() {
};
$hxClasses["textifician.mapping.LocationDefinition"] = textifician_mapping_LocationDefinition;
textifician_mapping_LocationDefinition.__name__ = ["textifician","mapping","LocationDefinition"];
textifician_mapping_LocationDefinition.create = function(type,label,id) {
	var locDef = new textifician_mapping_LocationDefinition();
	locDef.type = type;
	locDef.label = label;
	if(id != null) locDef.id = id;
	return locDef;
};
textifician_mapping_LocationDefinition.createWithMatchingId = function(type,label,id,doSlugify,camelCase) {
	if(camelCase == null) camelCase = false;
	if(doSlugify == null) doSlugify = false;
	var locDef = new textifician_mapping_LocationDefinition();
	locDef.type = type;
	locDef.label = label;
	if(id != null) locDef.id = id; else {
		if(!doSlugify) locDef.id = label; else locDef.id = new EReg("-+$","").replace(new EReg("^-+","").replace(new EReg("\\-\\-+","g").replace(new EReg("[^\\w\\-]+","g").replace(new EReg("\\s+","g").replace(label.toString().toLowerCase(),"-"),""),"-"),""),"");
		if(doSlugify && camelCase) locDef.id = textifician_mapping_LocationDefinition.camelizeSlug(locDef.id);
	}
	return locDef;
};
textifician_mapping_LocationDefinition.slugify = function(label) {
	return new EReg("-+$","").replace(new EReg("^-+","").replace(new EReg("\\-\\-+","g").replace(new EReg("[^\\w\\-]+","g").replace(new EReg("\\s+","g").replace(label.toString().toLowerCase(),"-"),""),"-"),""),"");
};
textifician_mapping_LocationDefinition.camelizeSlug = function(slug) {
	var splitStr = slug.split("-");
	var len = splitStr.length;
	var _g = 1;
	while(_g < len) {
		var i = _g++;
		splitStr[i] = splitStr[i].charAt(0).toUpperCase() + HxOverrides.substr(splitStr[i],1,null);
	}
	return splitStr.join("");
};
textifician_mapping_LocationDefinition.prototype = {
	id: null
	,label: null
	,description: null
	,flags: null
	,size: null
	,type: null
	,envFlags: null
	,indoorLocationSpecs: null
	,defaultLighting: null
	,generalFixtures: null
	,fixtureDensity: null
	,priorityIndex: null
	,setSize: function(val) {
		this.size = val;
		return this;
	}
	,setDescription: function(val) {
		this.description = val;
		return this;
	}
	,makeDoor: function(val,implyEntrance) {
		if(implyEntrance == null) implyEntrance = true;
		if(val == null) val = true;
		if(val) {
			if(implyEntrance) this.flags |= 1; else this.flags |= 0;
			this.flags |= 2;
		} else this.flags &= -3;
		return this;
	}
	,makeEntrance: function(val) {
		if(val == null) val = true;
		if(val) this.flags |= 1; else this.flags &= -2;
		return this;
	}
	,makeKey: function(val) {
		if(val == null) val = true;
		if(val) this.flags |= 4; else this.flags &= -5;
		return this;
	}
	,makeLandmark: function(val) {
		if(val == null) val = true;
		if(val) this.flags |= 8; else this.flags &= -9;
		return this;
	}
	,resetShelterFlags: function() {
		this.envFlags &= -16;
	}
	,resetShelterWallFlags: function() {
		this.envFlags &= -4;
	}
	,resetShelterCeilingFlags: function() {
		this.envFlags &= -13;
	}
	,makeFullyIndoor: function() {
		this.envFlags &= -16;
		this.envFlags |= 15;
		return this;
	}
	,makeFullyOutdoor: function() {
		this.envFlags &= -16;
		return this;
	}
	,setupIndoorLocationSpecs: function(locationSpecs) {
		this.indoorLocationSpecs = locationSpecs;
		return this;
	}
	,setupShelterAmounts: function(wallAmount,ceilingAmount) {
		this.envFlags &= -16;
		if(wallAmount == 0) this.envFlags |= 0; else if(wallAmount == 1) this.envFlags |= 1; else if(wallAmount == 2) this.envFlags |= 2; else this.envFlags |= 3;
		if(ceilingAmount == 0) this.envFlags |= 0; else if(ceilingAmount == 1) this.envFlags |= 4; else if(ceilingAmount == 2) this.envFlags |= 8; else this.envFlags |= 12;
		return this;
	}
	,setWallAmount: function(wallAmount) {
		this.envFlags &= -4;
		if(wallAmount == 0) this.envFlags |= 0; else if(wallAmount == 1) this.envFlags |= 1; else if(wallAmount == 2) this.envFlags |= 2; else this.envFlags |= 3;
		return this;
	}
	,setCeilingAmount: function(ceilingAmount) {
		this.envFlags &= -13;
		if(ceilingAmount == 0) this.envFlags |= 0; else if(ceilingAmount == 1) this.envFlags |= 4; else if(ceilingAmount == 2) this.envFlags |= 8; else this.envFlags |= 12;
		return this;
	}
	,__class__: textifician_mapping_LocationDefinition
};
var textifician_mapping_LocationPacket = function() {
};
$hxClasses["textifician.mapping.LocationPacket"] = textifician_mapping_LocationPacket;
textifician_mapping_LocationPacket.__name__ = ["textifician","mapping","LocationPacket"];
textifician_mapping_LocationPacket.__interfaces__ = [textifician_mapping_IXYZ];
textifician_mapping_LocationPacket.prototype = {
	state: null
	,def: null
	,defOverwrites: null
	,x: null
	,y: null
	,z: null
	,getLabel: function() {
		if(this.defOverwrites != null && this.defOverwrites.label != null) return this.defOverwrites.label; else return this.def.label;
	}
	,__class__: textifician_mapping_LocationPacket
};
var textifician_mapping_LocationState = $hx_exports.textifician.mapping.LocationState = function() {
};
$hxClasses["textifician.mapping.LocationState"] = textifician_mapping_LocationState;
textifician_mapping_LocationState.__name__ = ["textifician","mapping","LocationState"];
textifician_mapping_LocationState.prototype = {
	thingsHere: null
	,notes: null
	,flags: null
	,customData: null
	,openDoorFully: function() {
		this.flags |= 6;
		return this;
	}
	,openDoorPartially: function(ajarOnly) {
		if(ajarOnly == null) ajarOnly = false;
		this.flags &= -7;
		if(ajarOnly) this.flags |= 2; else this.flags |= 4;
		return this;
	}
	,closeDoor: function() {
		this.flags &= -7;
		return this;
	}
	,closeAndLockDoor: function() {
		this.closeDoor();
		this.flags |= 1;
		return this;
	}
	,lockDoor: function() {
		this.flags |= 1;
		return this;
	}
	,unlockDoor: function() {
		this.flags &= -2;
		return this;
	}
	,__class__: textifician_mapping_LocationState
};
var textifician_mapping_TextificianUtil = $hx_exports.textifician.mapping.TextificianUtil = function() { };
$hxClasses["textifician.mapping.TextificianUtil"] = textifician_mapping_TextificianUtil;
textifician_mapping_TextificianUtil.__name__ = ["textifician","mapping","TextificianUtil"];
textifician_mapping_TextificianUtil.getTotalDistanceFrom = function(graph,startNode,endNode,route) {
	return 0;
};
textifician_mapping_TextificianUtil.getDirectDistanceFromTo = function(startLocation,endLocation,posOffset) {
	var ox;
	if(posOffset != null) ox = posOffset.x; else ox = 0;
	var oy;
	if(posOffset != null) oy = posOffset.y; else oy = 0;
	return 0;
};
textifician_mapping_TextificianUtil.distancePointToRegion = function(pt,regionPt,regionSize) {
	return 0;
};
textifician_mapping_TextificianUtil.distanceRegionToRegion = function(pt,pt1RegionSize,pt2,pt2RegionSize) {
	return 0;
};
textifician_mapping_TextificianUtil.distancePtToPt = function(pt,pt2) {
	var dx = pt2.x - pt.x;
	var dy = pt2.y - pt.y;
	return Math.sqrt(dx * dx + dy * dy);
};
var textifician_mapping_TextificianWorld = $hx_exports.textifician.mapping.TextificianWorld = function() {
	textifician_rpg_ICharacter;
	textifician_rpg_IParty;
	textifician_rpg_IFixture;
	textifician_rpg_IItem;
	this.zones = new haxe_ds_StringMap();
	this.graph = new de_polygonal_ds_Graph();
	this.locationDefs = new haxe_ds_StringMap();
};
$hxClasses["textifician.mapping.TextificianWorld"] = textifician_mapping_TextificianWorld;
textifician_mapping_TextificianWorld.__name__ = ["textifician","mapping","TextificianWorld"];
textifician_mapping_TextificianWorld.serialize = function(world) {
	var serializer = new haxe_Serializer();
	serializer.serialize(world);
	return serializer.toString();
};
textifician_mapping_TextificianWorld.unserialize = function(str) {
	var unserializer = new haxe_Unserializer(str);
	return unserializer.unserialize();
};
textifician_mapping_TextificianWorld.configureGlobals = function(defaultMapScale,smallestMovementUnit) {
	textifician_mapping_Zone.DEFAULT_SCALE = defaultMapScale;
	textifician_mapping_TextificianUtil.EPSILON = smallestMovementUnit;
};
textifician_mapping_TextificianWorld.configureGlobalMapScale = function(defaultMapScale) {
	textifician_mapping_Zone.DEFAULT_SCALE = defaultMapScale;
};
textifician_mapping_TextificianWorld.configureGlobalSmallestMovementDist = function(smallestMovementUnit) {
	textifician_mapping_TextificianUtil.EPSILON = smallestMovementUnit;
};
textifician_mapping_TextificianWorld.prototype = {
	graph: null
	,zones: null
	,locationDefs: null
	,setupDefaultNew: function(zone) {
		if(zone == null) zone = textifician_mapping_Zone.create("DefaultZone","");
		this.addZone(zone);
		this.addLocationDef(textifician_mapping_LocationDefinition.createWithMatchingId(0,"Point"));
		this.addLocationDef(textifician_mapping_LocationDefinition.createWithMatchingId(1,"Path"));
		this.addLocationDef(textifician_mapping_LocationDefinition.createWithMatchingId(2,"Region"));
	}
	,getDuplicationLocationDef: function(def,newId) {
		if(newId == null) newId = "";
		var serializer = new haxe_Serializer();
		serializer.serialize(def);
		var unserializer = new haxe_Unserializer(serializer.toString());
		var locDef = unserializer.unserialize();
		if(newId != null) if(newId != "") locDef.id = newId; else locDef.id = null; else locDef.id = "instance" + de_polygonal_ds_HashKey._counter++;
		return locDef;
	}
	,addLocationNode: function(def,x,y,z,state,defOverwrites) {
		if(z == null) z = 0;
		if(y == null) y = 0;
		if(x == null) x = 0;
		var locationPacket = new textifician_mapping_LocationPacket();
		locationPacket.def = def;
		locationPacket.state = state;
		locationPacket.x = x;
		locationPacket.y = y;
		locationPacket.z = z;
		return this.graph.addNode(this.graph.createNode(locationPacket));
	}
	,addZoneNode: function(zone) {
		return this.graph.addNode(this.graph.createNode(zone));
	}
	,getLocationDef: function(id) {
		return this.locationDefs.get(id);
	}
	,addLocationDef: function(def,forceOverwrite) {
		if(forceOverwrite == null) forceOverwrite = false;
		if(def.id == null) {
			def.id = "instance" + de_polygonal_ds_HashKey._counter++;
			if(!forceOverwrite && this.locationDefs.exists(def.id)) throw new js__$Boot_HaxeError("Location Definition of: " + def.id + " already exists!");
			this.locationDefs.set(def.id,def);
		} else {
			var current;
			current = this.locationDefs.get(def.id);
			if(current == null) this.locationDefs.set(def.id,def); else if(forceOverwrite) this.locationDefs.set(def.id,def); else throw new js__$Boot_HaxeError("Location Definition of: " + def.id + " already exists!");
		}
		return def;
	}
	,addZone: function(zone,forceOverwrite) {
		if(forceOverwrite == null) forceOverwrite = false;
		if(zone.id == null) {
			zone.id = "zone" + de_polygonal_ds_HashKey._counter++;
			if(!forceOverwrite && this.zones.exists(zone.id)) throw new js__$Boot_HaxeError("Zone id of: " + zone.id + " already exists!");
			this.zones.set(zone.id,zone);
		} else {
			var current;
			current = this.zones.get(zone.id);
			if(current == null) this.zones.set(zone.id,zone); else if(forceOverwrite) this.zones.set(zone.id,zone); else throw new js__$Boot_HaxeError("Zone id of: " + zone.id + " already exists!");
		}
		return zone;
	}
	,getZone: function(id) {
		if(id == null) id = "";
		return this.zones.get(id);
	}
	,__class__: textifician_mapping_TextificianWorld
};
var textifician_mapping_Zone = $hx_exports.textifician.mapping.Zone = function() {
};
$hxClasses["textifician.mapping.Zone"] = textifician_mapping_Zone;
textifician_mapping_Zone.__name__ = ["textifician","mapping","Zone"];
textifician_mapping_Zone.__interfaces__ = [textifician_mapping_IXYZ];
textifician_mapping_Zone.slugify = function(label) {
	return new EReg("-+$","").replace(new EReg("^-+","").replace(new EReg("\\-\\-+","g").replace(new EReg("[^\\w\\-]+","g").replace(new EReg("\\s+","g").replace(label.toString().toLowerCase(),"-"),""),"-"),""),"");
};
textifician_mapping_Zone.camelizeSlug = function(slug) {
	var splitStr = slug.split("-");
	var len = splitStr.length;
	var _g = 1;
	while(_g < len) {
		var i = _g++;
		splitStr[i] = splitStr[i].charAt(0).toUpperCase() + HxOverrides.substr(splitStr[i],1,null);
	}
	return splitStr.join("");
};
textifician_mapping_Zone.resolveIdWithLabel = function(label) {
	if(textifician_mapping_Zone.IDMODE == 1) return new EReg("-+$","").replace(new EReg("^-+","").replace(new EReg("\\-\\-+","g").replace(new EReg("[^\\w\\-]+","g").replace(new EReg("\\s+","g").replace(label.toString().toLowerCase(),"-"),""),"-"),""),""); else if(textifician_mapping_Zone.IDMODE == 2) return textifician_mapping_Zone.camelizeSlug(new EReg("-+$","").replace(new EReg("^-+","").replace(new EReg("\\-\\-+","g").replace(new EReg("[^\\w\\-]+","g").replace(new EReg("\\s+","g").replace(label.toString().toLowerCase(),"-"),""),"-"),""),"")); else return label;
};
textifician_mapping_Zone.create = function(label,id) {
	var zone = new textifician_mapping_Zone();
	zone.label = label;
	if(id != null) zone.id = id; else zone.id = textifician_mapping_Zone.resolveIdWithLabel(label);
	zone.scale = textifician_mapping_Zone.DEFAULT_SCALE;
	zone.childNodes = [];
	zone.size = -1;
	return zone;
};
textifician_mapping_Zone.setupNew = function(label,id,x,y,z,scale,size) {
	if(size == null) size = -1;
	if(scale == null) scale = 1;
	if(z == null) z = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	var newZone = textifician_mapping_Zone.create(label,id);
	newZone.scale = scale;
	newZone.size = size;
	newZone.x = x;
	newZone.y = y;
	newZone.z = z;
	return newZone;
};
textifician_mapping_Zone.prototype = {
	id: null
	,label: null
	,childNodes: null
	,size: null
	,scale: null
	,x: null
	,y: null
	,z: null
	,parentZone: null
	,setScale: function(scale) {
		this.scale = scale;
		return this;
	}
	,setSize: function(size) {
		this.size = size;
		return this;
	}
	,setPos: function(x,y,z) {
		if(z == null) z = 0;
		if(y == null) y = 0;
		if(x == null) x = 0;
		this.x = x;
		this.y = y;
		this.z = z;
		return this;
	}
	,addChildren: function(list) {
		var _g1 = 0;
		var _g = list.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.addChild(list[i]);
		}
		return this;
	}
	,addChild: function(node) {
		return null;
	}
	,removeChild: function(node) {
		return null;
	}
	,__class__: textifician_mapping_Zone
};
var textifician_rpg_ICharacter = function() { };
$hxClasses["textifician.rpg.ICharacter"] = textifician_rpg_ICharacter;
textifician_rpg_ICharacter.__name__ = ["textifician","rpg","ICharacter"];
textifician_rpg_ICharacter.__interfaces__ = [textifician_mapping_IXYZ];
textifician_rpg_ICharacter.prototype = {
	name: null
	,__class__: textifician_rpg_ICharacter
};
var textifician_rpg_IFixture = function() { };
$hxClasses["textifician.rpg.IFixture"] = textifician_rpg_IFixture;
textifician_rpg_IFixture.__name__ = ["textifician","rpg","IFixture"];
textifician_rpg_IFixture.prototype = {
	name: null
	,__class__: textifician_rpg_IFixture
};
var textifician_rpg_IItem = function() { };
$hxClasses["textifician.rpg.IItem"] = textifician_rpg_IItem;
textifician_rpg_IItem.__name__ = ["textifician","rpg","IItem"];
textifician_rpg_IItem.__interfaces__ = [textifician_mapping_IXYZ];
textifician_rpg_IItem.prototype = {
	name: null
	,__class__: textifician_rpg_IItem
};
var textifician_rpg_IParty = function() { };
$hxClasses["textifician.rpg.IParty"] = textifician_rpg_IParty;
textifician_rpg_IParty.__name__ = ["textifician","rpg","IParty"];
textifician_rpg_IParty.__interfaces__ = [textifician_mapping_IXYZ];
textifician_rpg_IParty.prototype = {
	name: null
	,characters: null
	,__class__: textifician_rpg_IParty
};
var tjson_TJSON = $hx_exports.tjson.TJSON = function() { };
$hxClasses["tjson.TJSON"] = tjson_TJSON;
tjson_TJSON.__name__ = ["tjson","TJSON"];
tjson_TJSON.parse = function(json,fileName,stringProcessor) {
	if(fileName == null) fileName = "JSON Data";
	var t = new tjson_TJSONParser(json,fileName,stringProcessor);
	return t.doParse();
};
tjson_TJSON.encode = function(obj,style,useCache) {
	if(useCache == null) useCache = true;
	var t = new tjson_TJSONEncoder(useCache);
	return t.doEncode(obj,style);
};
var tjson_TJSONParser = function(vjson,vfileName,stringProcessor) {
	if(vfileName == null) vfileName = "JSON Data";
	this.json = vjson;
	this.fileName = vfileName;
	this.currentLine = 1;
	this.lastSymbolQuoted = false;
	this.pos = 0;
	this.floatRegex = new EReg("^-?[0-9]*\\.[0-9]+$","");
	this.intRegex = new EReg("^-?[0-9]+$","");
	if(stringProcessor == null) this.strProcessor = $bind(this,this.defaultStringProcessor); else this.strProcessor = stringProcessor;
	this.cache = [];
};
$hxClasses["tjson.TJSONParser"] = tjson_TJSONParser;
tjson_TJSONParser.__name__ = ["tjson","TJSONParser"];
tjson_TJSONParser.prototype = {
	pos: null
	,json: null
	,lastSymbolQuoted: null
	,fileName: null
	,currentLine: null
	,cache: null
	,floatRegex: null
	,intRegex: null
	,strProcessor: null
	,doParse: function() {
		try {
			var _g = this.getNextSymbol();
			var s = _g;
			switch(_g) {
			case "{":
				return this.doObject();
			case "[":
				return this.doArray();
			default:
				return this.convertSymbolToProperType(s);
			}
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			if( js_Boot.__instanceof(e,String) ) {
				throw new js__$Boot_HaxeError(this.fileName + " on line " + this.currentLine + ": " + e);
			} else throw(e);
		}
	}
	,doObject: function() {
		var o = { };
		var val = "";
		var key;
		var isClassOb = false;
		this.cache.push(o);
		while(this.pos < this.json.length) {
			key = this.getNextSymbol();
			if(key == "," && !this.lastSymbolQuoted) continue;
			if(key == "}" && !this.lastSymbolQuoted) {
				if(isClassOb && o.TJ_unserialize != null) o.TJ_unserialize();
				return o;
			}
			var seperator = this.getNextSymbol();
			if(seperator != ":") throw new js__$Boot_HaxeError("Expected ':' but got '" + seperator + "' instead.");
			var v = this.getNextSymbol();
			if(key == "_hxcls") {
				if(StringTools.startsWith(v,"Date@")) {
					var t = Std.parseInt(HxOverrides.substr(v,5,null));
					var d = new Date();
					d.setTime(t);
					o = d;
				} else {
					var cls = Type.resolveClass(v);
					if(cls == null) {
						cls = eval("window['" + v + "']");
						if(cls == null) throw new js__$Boot_HaxeError("Could not resolve Javascript class - " + v);
					}
					o = Type.createEmptyInstance(cls);
				}
				this.cache.pop();
				this.cache.push(o);
				isClassOb = true;
				continue;
			}
			if(v == "{" && !this.lastSymbolQuoted) val = this.doObject(); else if(v == "[" && !this.lastSymbolQuoted) val = this.doArray(); else val = this.convertSymbolToProperType(v);
			o[key] = val;
		}
		throw new js__$Boot_HaxeError("Unexpected end of file. Expected '}'");
	}
	,doArray: function() {
		var a = [];
		var val;
		while(this.pos < this.json.length) {
			val = this.getNextSymbol();
			if(val == "," && !this.lastSymbolQuoted) continue; else if(val == "]" && !this.lastSymbolQuoted) return a; else if(val == "{" && !this.lastSymbolQuoted) val = this.doObject(); else if(val == "[" && !this.lastSymbolQuoted) val = this.doArray(); else val = this.convertSymbolToProperType(val);
			a.push(val);
		}
		throw new js__$Boot_HaxeError("Unexpected end of file. Expected ']'");
	}
	,convertSymbolToProperType: function(symbol) {
		if(this.lastSymbolQuoted) {
			if(StringTools.startsWith(symbol,tjson_TJSON.OBJECT_REFERENCE_PREFIX)) {
				var idx = Std.parseInt(HxOverrides.substr(symbol,tjson_TJSON.OBJECT_REFERENCE_PREFIX.length,null));
				return this.cache[idx];
			}
			return symbol;
		}
		if(this.looksLikeFloat(symbol)) return parseFloat(symbol);
		if(this.looksLikeInt(symbol)) return Std.parseInt(symbol);
		if(symbol.toLowerCase() == "true") return true;
		if(symbol.toLowerCase() == "false") return false;
		if(symbol.toLowerCase() == "null") return null;
		return symbol;
	}
	,looksLikeFloat: function(s) {
		if(this.floatRegex.match(s)) return true;
		if(this.intRegex.match(s)) {
			if((function($this) {
				var $r;
				var intStr = $this.intRegex.matched(0);
				$r = HxOverrides.cca(intStr,0) == 45?intStr > "-2147483648":intStr > "2147483647";
				return $r;
			}(this))) return true;
			var f = parseFloat(s);
			if(f > 2147483647.0) return true; else if(f < -2147483648) return true;
		}
		return false;
	}
	,looksLikeInt: function(s) {
		return this.intRegex.match(s);
	}
	,getNextSymbol: function() {
		this.lastSymbolQuoted = false;
		var c = "";
		var inQuote = false;
		var quoteType = "";
		var symbol = "";
		var inEscape = false;
		var inSymbol = false;
		var inLineComment = false;
		var inBlockComment = false;
		while(this.pos < this.json.length) {
			c = this.json.charAt(this.pos++);
			if(c == "\n" && !inSymbol) this.currentLine++;
			if(inLineComment) {
				if(c == "\n" || c == "\r") {
					inLineComment = false;
					this.pos++;
				}
				continue;
			}
			if(inBlockComment) {
				if(c == "*" && this.json.charAt(this.pos) == "/") {
					inBlockComment = false;
					this.pos++;
				}
				continue;
			}
			if(inQuote) {
				if(inEscape) {
					inEscape = false;
					if(c == "'" || c == "\"") {
						symbol += c;
						continue;
					}
					if(c == "t") {
						symbol += "\t";
						continue;
					}
					if(c == "n") {
						symbol += "\n";
						continue;
					}
					if(c == "\\") {
						symbol += "\\";
						continue;
					}
					if(c == "r") {
						symbol += "\r";
						continue;
					}
					if(c == "/") {
						symbol += "/";
						continue;
					}
					if(c == "u") {
						var hexValue = 0;
						var _g = 0;
						while(_g < 4) {
							var i = _g++;
							if(this.pos >= this.json.length) throw new js__$Boot_HaxeError("Unfinished UTF8 character");
							var nc;
							var index = this.pos++;
							nc = HxOverrides.cca(this.json,index);
							hexValue = hexValue << 4;
							if(nc >= 48 && nc <= 57) hexValue += nc - 48; else if(nc >= 65 && nc <= 70) hexValue += 10 + nc - 65; else if(nc >= 97 && nc <= 102) hexValue += 10 + nc - 95; else throw new js__$Boot_HaxeError("Not a hex digit");
						}
						var utf = new haxe_Utf8();
						utf.__b += String.fromCharCode(hexValue);
						symbol += utf.__b;
						continue;
					}
					throw new js__$Boot_HaxeError("Invalid escape sequence '\\" + c + "'");
				} else {
					if(c == "\\") {
						inEscape = true;
						continue;
					}
					if(c == quoteType) return symbol;
					symbol += c;
					continue;
				}
			} else if(c == "/") {
				var c2 = this.json.charAt(this.pos);
				if(c2 == "/") {
					inLineComment = true;
					this.pos++;
					continue;
				} else if(c2 == "*") {
					inBlockComment = true;
					this.pos++;
					continue;
				}
			}
			if(inSymbol) {
				if(c == " " || c == "\n" || c == "\r" || c == "\t" || c == "," || c == ":" || c == "}" || c == "]") {
					this.pos--;
					return symbol;
				} else {
					symbol += c;
					continue;
				}
			} else {
				if(c == " " || c == "\t" || c == "\n" || c == "\r") continue;
				if(c == "{" || c == "}" || c == "[" || c == "]" || c == "," || c == ":") return c;
				if(c == "'" || c == "\"") {
					inQuote = true;
					quoteType = c;
					this.lastSymbolQuoted = true;
					continue;
				} else {
					inSymbol = true;
					symbol = c;
					continue;
				}
			}
		}
		if(inQuote) throw new js__$Boot_HaxeError("Unexpected end of data. Expected ( " + quoteType + " )");
		return symbol;
	}
	,defaultStringProcessor: function(str) {
		return str;
	}
	,__class__: tjson_TJSONParser
};
var tjson_TJSONEncoder = function(useCache) {
	if(useCache == null) useCache = true;
	this.uCache = useCache;
	if(this.uCache) this.cache = [];
};
$hxClasses["tjson.TJSONEncoder"] = tjson_TJSONEncoder;
tjson_TJSONEncoder.__name__ = ["tjson","TJSONEncoder"];
tjson_TJSONEncoder.prototype = {
	cache: null
	,uCache: null
	,doEncode: function(obj,style) {
		if(!Reflect.isObject(obj)) throw new js__$Boot_HaxeError("Provided object is not an object.");
		var st;
		if(js_Boot.__instanceof(style,tjson_EncodeStyle)) st = style; else if(style == "fancy") st = new tjson_FancyStyle(); else st = new tjson_SimpleStyle();
		var buffer = new StringBuf();
		if((obj instanceof Array) && obj.__enum__ == null || js_Boot.__instanceof(obj,List)) buffer.add(this.encodeIterable(obj,st,0)); else if(js_Boot.__instanceof(obj,haxe_ds_StringMap)) buffer.add(this.encodeMap(obj,st,0)); else {
			this.cacheEncode(obj);
			buffer.add(this.encodeObject(obj,st,0));
		}
		return buffer.b;
	}
	,encodeObject: function(obj,style,depth) {
		var buffer = new StringBuf();
		buffer.add(style.beginObject(depth));
		var fieldCount = 0;
		var fields;
		var dontEncodeFields = null;
		var cls = Type.getClass(obj);
		if(cls != null) fields = Type.getInstanceFields(cls); else fields = Reflect.fields(obj);
		{
			var _g = Type["typeof"](obj);
			switch(_g[1]) {
			case 6:
				var c = _g[2];
				var className = Type.getClassName(c);
				if(className == "Date") className += "@" + (js_Boot.__cast(obj , Date)).getTime();
				if(fieldCount++ > 0) buffer.add(style.entrySeperator(depth)); else buffer.add(style.firstEntry(depth));
				buffer.add("\"_hxcls\"" + style.keyValueSeperator(depth));
				buffer.add(this.encodeValue(className,style,depth));
				if(obj.TJ_noEncode != null) dontEncodeFields = obj.TJ_noEncode();
				break;
			default:
			}
		}
		var _g1 = 0;
		while(_g1 < fields.length) {
			var field = fields[_g1];
			++_g1;
			if(dontEncodeFields != null && HxOverrides.indexOf(dontEncodeFields,field,0) >= 0) continue;
			var value = Reflect.field(obj,field);
			var vStr = this.encodeValue(value,style,depth);
			if(vStr != null) {
				if(fieldCount++ > 0) buffer.add(style.entrySeperator(depth)); else buffer.add(style.firstEntry(depth));
				buffer.add("\"" + field + "\"" + style.keyValueSeperator(depth) + vStr);
			}
		}
		buffer.add(style.endObject(depth));
		return buffer.b;
	}
	,encodeMap: function(obj,style,depth) {
		var buffer = new StringBuf();
		buffer.add(style.beginObject(depth));
		var fieldCount = 0;
		var $it0 = obj.keys();
		while( $it0.hasNext() ) {
			var field = $it0.next();
			if(fieldCount++ > 0) buffer.add(style.entrySeperator(depth)); else buffer.add(style.firstEntry(depth));
			var value = obj.get(field);
			buffer.add("\"" + field + "\"" + style.keyValueSeperator(depth));
			buffer.add(this.encodeValue(value,style,depth));
		}
		buffer.add(style.endObject(depth));
		return buffer.b;
	}
	,encodeIterable: function(obj,style,depth) {
		var buffer = new StringBuf();
		buffer.add(style.beginArray(depth));
		var fieldCount = 0;
		var $it0 = $iterator(obj)();
		while( $it0.hasNext() ) {
			var value = $it0.next();
			if(fieldCount++ > 0) buffer.add(style.entrySeperator(depth)); else buffer.add(style.firstEntry(depth));
			buffer.add(this.encodeValue(value,style,depth));
		}
		buffer.add(style.endArray(depth));
		return buffer.b;
	}
	,cacheEncode: function(value) {
		if(!this.uCache) return null;
		var _g1 = 0;
		var _g = this.cache.length;
		while(_g1 < _g) {
			var c = _g1++;
			if(this.cache[c] == value) return "\"" + tjson_TJSON.OBJECT_REFERENCE_PREFIX + c + "\"";
		}
		this.cache.push(value);
		return null;
	}
	,encodeValue: function(value,style,depth) {
		if(((value | 0) === value) || typeof(value) == "number") return value; else if((value instanceof Array) && value.__enum__ == null || js_Boot.__instanceof(value,List)) {
			var v = value;
			return this.encodeIterable(v,style,depth + 1);
		} else if(js_Boot.__instanceof(value,List)) {
			var v1 = value;
			return this.encodeIterable(v1,style,depth + 1);
		} else if(js_Boot.__instanceof(value,haxe_ds_StringMap)) return this.encodeMap(value,style,depth + 1); else if(typeof(value) == "string") return "\"" + StringTools.replace(StringTools.replace(StringTools.replace(StringTools.replace(Std.string(value),"\\","\\\\"),"\n","\\n"),"\r","\\r"),"\"","\\\"") + "\""; else if(typeof(value) == "boolean") return value; else if(Reflect.isObject(value)) {
			var ret = this.cacheEncode(value);
			if(ret != null) return ret;
			return this.encodeObject(value,style,depth + 1);
		} else if(value == null) return "null"; else return null;
	}
	,__class__: tjson_TJSONEncoder
};
var tjson_EncodeStyle = function() { };
$hxClasses["tjson.EncodeStyle"] = tjson_EncodeStyle;
tjson_EncodeStyle.__name__ = ["tjson","EncodeStyle"];
tjson_EncodeStyle.prototype = {
	beginObject: null
	,endObject: null
	,beginArray: null
	,endArray: null
	,firstEntry: null
	,entrySeperator: null
	,keyValueSeperator: null
	,__class__: tjson_EncodeStyle
};
var tjson_SimpleStyle = function() {
};
$hxClasses["tjson.SimpleStyle"] = tjson_SimpleStyle;
tjson_SimpleStyle.__name__ = ["tjson","SimpleStyle"];
tjson_SimpleStyle.__interfaces__ = [tjson_EncodeStyle];
tjson_SimpleStyle.prototype = {
	beginObject: function(depth) {
		return "{";
	}
	,endObject: function(depth) {
		return "}";
	}
	,beginArray: function(depth) {
		return "[";
	}
	,endArray: function(depth) {
		return "]";
	}
	,firstEntry: function(depth) {
		return "";
	}
	,entrySeperator: function(depth) {
		return ",";
	}
	,keyValueSeperator: function(depth) {
		return ":";
	}
	,__class__: tjson_SimpleStyle
};
var tjson_FancyStyle = function(tab) {
	if(tab == null) tab = "    ";
	this.tab = tab;
	this.charTimesNCache = [""];
};
$hxClasses["tjson.FancyStyle"] = tjson_FancyStyle;
tjson_FancyStyle.__name__ = ["tjson","FancyStyle"];
tjson_FancyStyle.__interfaces__ = [tjson_EncodeStyle];
tjson_FancyStyle.prototype = {
	tab: null
	,beginObject: function(depth) {
		return "{\n";
	}
	,endObject: function(depth) {
		return "\n" + this.charTimesN(depth) + "}";
	}
	,beginArray: function(depth) {
		return "[\n";
	}
	,endArray: function(depth) {
		return "\n" + this.charTimesN(depth) + "]";
	}
	,firstEntry: function(depth) {
		return this.charTimesN(depth + 1) + " ";
	}
	,entrySeperator: function(depth) {
		return "\n" + this.charTimesN(depth + 1) + ",";
	}
	,keyValueSeperator: function(depth) {
		return " : ";
	}
	,charTimesNCache: null
	,charTimesN: function(n) {
		if(n < this.charTimesNCache.length) return this.charTimesNCache[n]; else return this.charTimesNCache[n] = this.charTimesN(n - 1) + this.tab;
	}
	,__class__: tjson_FancyStyle
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
var __map_reserved = {}
var ArrayBuffer = $global.ArrayBuffer || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
var DataView = $global.DataView || js_html_compat_DataView;
var Uint8Array = $global.Uint8Array || js_html_compat_Uint8Array._new;
de_polygonal_ds_HashKey._counter = 0;
haxe_Serializer.USE_CACHE = false;
haxe_Serializer.USE_ENUM_INDEX = false;
haxe_Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe_Unserializer.DEFAULT_RESOLVER = Type;
haxe_Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe_ds_ObjectMap.count = 0;
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	$r = x;
	return $r;
}(this));
js_Boot.__toStr = {}.toString;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
textifician_mapping_ArcPacket.CARDINAL_EAST = 0;
textifician_mapping_ArcPacket.CARDINAL_SOUTH_EAST = 1;
textifician_mapping_ArcPacket.CARDINAL_SOUTH = 2;
textifician_mapping_ArcPacket.CARDINAL_SOUTH_WEST = 3;
textifician_mapping_ArcPacket.CARDINAL_WEST = 4;
textifician_mapping_ArcPacket.CARDINAL_NORTH_WEST = 5;
textifician_mapping_ArcPacket.CARDINAL_NORTH = 6;
textifician_mapping_ArcPacket.CARDINAL_NORTH_EAST = 7;
textifician_mapping_ArcPacket.FLAG_ENTRANCE = 1;
textifician_mapping_IndoorLocationSpecs.DEFAULT_WALL_HEIGHT = 1;
textifician_mapping_IndoorLocationSpecs.DEFAULT_WALL_THICKNESS = 1;
textifician_mapping_IndoorLocationSpecs.DEFAULT_WALL_STRENGTH = 1;
textifician_mapping_IndoorLocationSpecs.DEFAULT_CEILING_THICKNESS = 1;
textifician_mapping_IndoorLocationSpecs.DEFAULT_CEILING_STRENGTH = 1;
textifician_mapping_LocationDefinition.__meta__ = { fields : { id : { readonly : null}, flags : { bitmask : ["FLAG"]}, type : { values : ["TYPE"]}, envFlags : { bitmask : ["ENV"]}, defaultLighting : { range : ["LIGHTING"]}, fixtureDensity : { range : ["DENSITY"]}}};
textifician_mapping_LocationDefinition.FLAG_ENTRANCE = 1;
textifician_mapping_LocationDefinition.FLAG_DOOR = 2;
textifician_mapping_LocationDefinition.FLAG_KEY = 4;
textifician_mapping_LocationDefinition.FLAG_LANDMARK = 8;
textifician_mapping_LocationDefinition.FLAG_ENCLOSED = 16;
textifician_mapping_LocationDefinition.TYPE_POINT = 0;
textifician_mapping_LocationDefinition.TYPE_PATH = 1;
textifician_mapping_LocationDefinition.TYPE_REGION = 2;
textifician_mapping_LocationDefinition.ENV_WALL_1 = 1;
textifician_mapping_LocationDefinition.ENV_WALL_2 = 2;
textifician_mapping_LocationDefinition.ENV_CEILING_1 = 4;
textifician_mapping_LocationDefinition.ENV_CEILING_2 = 8;
textifician_mapping_LocationDefinition.LIGHTING_NONE_OR_OUTDOOR = 0;
textifician_mapping_LocationDefinition.LIGHTING_DIM = 1;
textifician_mapping_LocationDefinition.LIGHTING_NORMAL = 2;
textifician_mapping_LocationDefinition.LIGHTING_BRIGHT = 3;
textifician_mapping_LocationDefinition.DENSITY_NONE = 0;
textifician_mapping_LocationDefinition.DENSITY_VERY_SPARSE = 1;
textifician_mapping_LocationDefinition.DENSITY_SPARSE = 2;
textifician_mapping_LocationDefinition.DENSITY_AVERAGE = 3;
textifician_mapping_LocationDefinition.DENSITY_DENSE = 4;
textifician_mapping_LocationDefinition.DENSITY_VERY_DENSE = 5;
textifician_mapping_LocationDefinition.SHELTER_NONE = 0;
textifician_mapping_LocationDefinition.SHELTER_SPARSE = 1;
textifician_mapping_LocationDefinition.SHELTER_HALF = 2;
textifician_mapping_LocationDefinition.SHELTER_FULL = 3;
textifician_mapping_LocationState.FLAG_DOOR_LOCKED = 1;
textifician_mapping_LocationState.FLAG_DOOR_OPEN_1 = 2;
textifician_mapping_LocationState.FLAG_DOOR_OPEN_2 = 4;
textifician_mapping_TextificianUtil.EPSILON = 1;
textifician_mapping_Zone.__meta__ = { fields : { id : { readonly : null}, parentZone : { readonly : null}}};
textifician_mapping_Zone.DEFAULT_SCALE = 1;
textifician_mapping_Zone.ID_MATCH_LABEL = 0;
textifician_mapping_Zone.ID_SLUGIFY = 1;
textifician_mapping_Zone.ID_CAMELIZE = 2;
textifician_mapping_Zone.IDMODE = 0;
tjson_TJSON.OBJECT_REFERENCE_PREFIX = "@~obRef#";
TextificianGoJS.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
