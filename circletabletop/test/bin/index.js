(function (console, $hx_exports, $global) { "use strict";
$hx_exports.tjson = $hx_exports.tjson || {};
$hx_exports.textifician = $hx_exports.textifician || {};
$hx_exports.textifician.mapping = $hx_exports.textifician.mapping || {};
$hx_exports.dat = $hx_exports.dat || {};
$hx_exports.dat.gui = $hx_exports.dat.gui || {};
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
	,last: function() {
		if(this.q == null) return null; else return this.q[0];
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,iterator: function() {
		return new _$List_ListIterator(this.h);
	}
	,join: function(sep) {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		while(l != null) {
			if(first) first = false; else if(sep == null) s.b += "null"; else s.b += "" + sep;
			s.add(l[0]);
			l = l[1];
		}
		return s.b;
	}
	,map: function(f) {
		var b = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			b.add(f(v));
		}
		return b;
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
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) return null; else if(o.__properties__ && (tmp = o.__properties__["get_" + field])) return o[tmp](); else return o[field];
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
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
	,addSub: function(s,pos,len) {
		if(len == null) this.b += HxOverrides.substr(s,pos,null); else this.b += HxOverrides.substr(s,pos,len);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.htmlEscape = function(s,quotes) {
	s = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
	if(quotes) return s.split("\"").join("&quot;").split("'").join("&#039;"); else return s;
};
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
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
	var serializer = new haxe_Serializer();
	serializer.useCache = true;
	var nestedArr = [0,0,0];
	var sameArr = [1,2,3,nestedArr];
	var itest = new InstanceTest();
	itest.a = sameArr;
	itest.b = sameArr;
	console.log(itest.a == itest.b);
	console.log(itest.a != null && itest.a[3] == itest.b[3]);
	serializer.serialize(itest);
	var unserializer = new haxe_Unserializer(serializer.toString());
	itest = unserializer.unserialize();
	console.log(itest.a == itest.b);
	console.log(itest.a[3] == itest.b[3]);
	var fields;
	var somethingGood = dat_gui_DatUtil.setup(new textifician_mapping_LocationDefinition(),null);
	console.log(somethingGood);
};
TextificianGoJS.prototype = {
	__class__: TextificianGoJS
};
var InstanceTest = function() {
};
$hxClasses["InstanceTest"] = InstanceTest;
InstanceTest.__name__ = ["InstanceTest"];
InstanceTest.prototype = {
	a: null
	,b: null
	,__class__: InstanceTest
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
var Xml = function(nodeType) {
	this.nodeType = nodeType;
	this.children = [];
	this.attributeMap = new haxe_ds_StringMap();
};
$hxClasses["Xml"] = Xml;
Xml.__name__ = ["Xml"];
Xml.parse = function(str) {
	return haxe_xml_Parser.parse(str);
};
Xml.createElement = function(name) {
	var xml = new Xml(Xml.Element);
	if(xml.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + xml.nodeType);
	xml.nodeName = name;
	return xml;
};
Xml.createPCData = function(data) {
	var xml = new Xml(Xml.PCData);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createCData = function(data) {
	var xml = new Xml(Xml.CData);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createComment = function(data) {
	var xml = new Xml(Xml.Comment);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createDocType = function(data) {
	var xml = new Xml(Xml.DocType);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createProcessingInstruction = function(data) {
	var xml = new Xml(Xml.ProcessingInstruction);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createDocument = function() {
	return new Xml(Xml.Document);
};
Xml.prototype = {
	nodeType: null
	,nodeName: null
	,nodeValue: null
	,parent: null
	,children: null
	,attributeMap: null
	,get_nodeName: function() {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		return this.nodeName;
	}
	,get: function(att) {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		return this.attributeMap.get(att);
	}
	,set: function(att,value) {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		this.attributeMap.set(att,value);
	}
	,exists: function(att) {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		return this.attributeMap.exists(att);
	}
	,attributes: function() {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		return this.attributeMap.keys();
	}
	,iterator: function() {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		return HxOverrides.iter(this.children);
	}
	,elements: function() {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		var ret;
		var _g = [];
		var _g1 = 0;
		var _g2 = this.children;
		while(_g1 < _g2.length) {
			var child = _g2[_g1];
			++_g1;
			if(child.nodeType == Xml.Element) _g.push(child);
		}
		ret = _g;
		return HxOverrides.iter(ret);
	}
	,elementsNamed: function(name) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		var ret;
		var _g = [];
		var _g1 = 0;
		var _g2 = this.children;
		while(_g1 < _g2.length) {
			var child = _g2[_g1];
			++_g1;
			if(child.nodeType == Xml.Element && (function($this) {
				var $r;
				if(child.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + child.nodeType);
				$r = child.nodeName;
				return $r;
			}(this)) == name) _g.push(child);
		}
		ret = _g;
		return HxOverrides.iter(ret);
	}
	,firstElement: function() {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.nodeType == Xml.Element) return child;
		}
		return null;
	}
	,addChild: function(x) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		if(x.parent != null) x.parent.removeChild(x);
		this.children.push(x);
		x.parent = this;
	}
	,removeChild: function(x) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		if(HxOverrides.remove(this.children,x)) {
			x.parent = null;
			return true;
		}
		return false;
	}
	,__class__: Xml
	,__properties__: {get_nodeName:"get_nodeName"}
};
var dat_gui_DatUtil = $hx_exports.dat.gui.DatUtil = function() { };
$hxClasses["dat.gui.DatUtil"] = dat_gui_DatUtil;
dat_gui_DatUtil.__name__ = ["dat","gui","DatUtil"];
dat_gui_DatUtil._concatDyn = function(a1,a2) {
	return a1.concat(a2);
};
dat_gui_DatUtil.setup = function(instance,classe,options,dotPath) {
	if(dotPath == null) dotPath = "";
	if(classe == null) classe = Type.getClass(instance);
	if(options == null) options = { };
	var ignoreInspectMeta = Reflect.field(options,"ignoreInspectMeta");
	var rtti = haxe_rtti_Rtti.getRtti(classe);
	var meta = haxe_rtti_Meta.getFields(classe);
	var fieldHash = { };
	var fields = rtti.fields;
	var fieldsI = new _$List_ListIterator(fields.h);
	var cur;
	var curVal;
	var frStatics;
	var frParams;
	var frValue;
	var frPrefix = null;
	var frI;
	var _g = fieldsI;
	while(_g.head != null) {
		var f;
		f = (function($this) {
			var $r;
			_g.val = _g.head[0];
			_g.head = _g.head[1];
			$r = _g.val;
			return $r;
		}(this));
		var fieldMeta = Reflect.field(meta,f.name);
		if(haxe_rtti_TypeApi.isVar(f.type) && (!ignoreInspectMeta?fieldMeta != null && Object.prototype.hasOwnProperty.call(fieldMeta,"inspect"):true)) {
			cur = Reflect.field(fieldMeta,"inspect");
			if(cur == null) cur = { }; else cur = cur[0];
			if(Object.prototype.hasOwnProperty.call(cur,"value")) curVal = Reflect.field(cur,"value"); else curVal = Reflect.getProperty(instance,f.name);
			var typeStr = haxe_rtti_CTypeTools.toString(f.type);
			if(typeStr == "Int" || typeStr == "UInt" || typeStr == "Float") {
				if(curVal == null) curVal = 0;
				cur.value = curVal;
				if(typeStr == "Int" || typeStr == "UInt") {
					if(Object.prototype.hasOwnProperty.call(fieldMeta,"bitmask")) {
						var bitMaskFolder = { _classes : Object.prototype.hasOwnProperty.call(cur,"_classes")?dat_gui_DatUtil._concatDyn(["bitmask"],Reflect.field(cur,"_classes")):["bitmask"]};
						var gotBits = false;
						var bitFieldMeta = Reflect.field(fieldMeta,"bitmask")[0];
						if(typeof(bitFieldMeta) == "string") {
							frValue = bitFieldMeta;
							frStatics = new _$List_ListIterator(rtti.statics.h);
							var _g1 = frStatics;
							while(_g1.head != null) {
								var f1;
								f1 = (function($this) {
									var $r;
									_g1.val = _g1.head[0];
									_g1.head = _g1.head[1];
									$r = _g1.val;
									return $r;
								}(this));
								frI = f1.name.indexOf("_");
								if(frI >= 0) {
									gotBits = true;
									frPrefix = f1.name.substring(0,frI);
									if(frPrefix == frValue) Reflect.setField(bitMaskFolder,f1.name.substring(frI + 1),{ _bit : Reflect.field(classe,f1.name), value : (curVal & Reflect.field(classe,f1.name)) != 0});
								}
							}
						} else {
							var _g2 = 0;
							while(_g2 < 32) {
								var i = _g2++;
								bitMaskFolder["b" + (i == null?"null":"" + i)] = { _bit : 1 << i, value : (curVal & 1 << i) != 0};
							}
							gotBits = true;
						}
						if(gotBits) {
							fieldHash[f.name] = bitMaskFolder;
							bitMaskFolder._subProxy = "bitmask";
						}
					} else {
						if(!Object.prototype.hasOwnProperty.call(cur,"step")) cur.step = 1;
						if(typeStr == "UInt" && !Object.prototype.hasOwnProperty.call(cur,"min")) cur.min = 0;
						fieldHash[f.name] = cur;
						cur._isLeaf = true;
					}
				} else {
					if(dat_gui_DatUtil.DEFAULT_FLOAT_STEP > 0 && !Object.prototype.hasOwnProperty.call(cur,"step")) cur.step = dat_gui_DatUtil.DEFAULT_FLOAT_STEP;
					fieldHash[f.name] = cur;
					cur._isLeaf = true;
				}
			} else if(typeStr == "String") {
				if(curVal == null) curVal = "";
				cur.value = curVal;
				fieldHash[f.name] = cur;
				cur._isLeaf = true;
			} else if(typeStr == "Bool") {
				if(curVal == null) curVal = false;
				cur.value = curVal;
				fieldHash[f.name] = cur;
				cur._isLeaf = true;
			} else {
				var tryInstance = Reflect.getProperty(instance,f.name);
				var instanceAvailable = true;
				if(tryInstance == null) {
					instanceAvailable = false;
					tryInstance = Type.createInstance(Type.resolveClass(typeStr),[]);
				}
				var nested;
				Reflect.setField(fieldHash,f.name,nested = dat_gui_DatUtil.setup(tryInstance,Type.resolveClass(typeStr),f.type,(dotPath != ""?dotPath + ".":"") + f.name));
				if(instanceAvailable) nested._folded = false; else nested._folded = true;
				nested._classes = ["instance"];
			}
			if(Object.prototype.hasOwnProperty.call(fieldMeta,"range")) {
				frParams = Reflect.field(fieldMeta,"range");
				if(frParams != null && frParams.length > 0) {
					frValue = frParams[0];
					if(typeof(frValue) == "string") {
						var frEnum = { };
						var min = 1e20;
						var max = -1e20;
						frStatics = new _$List_ListIterator(rtti.statics.h);
						var _g3 = frStatics;
						while(_g3.head != null) {
							var f2;
							f2 = (function($this) {
								var $r;
								_g3.val = _g3.head[0];
								_g3.head = _g3.head[1];
								$r = _g3.val;
								return $r;
							}(this));
							frI = f2.name.indexOf("_");
							if(frI >= 0) {
								frPrefix = f2.name.substring(0,frI);
								if(frPrefix == frValue) {
									var v;
									v = Reflect.field(classe,f2.name);
									if(v > max) max = v;
									if(v < min) min = v;
									Reflect.setField(frEnum,f2.name.substring(frI + 1),v);
								}
							}
						}
						cur.enumeration = frEnum;
						cur.min = min;
						cur.max = max;
					} else {
						Reflect.setField(cur,"min",Object.prototype.hasOwnProperty.call(frValue,"min")?Reflect.field(frValue,"min"):0);
						Reflect.setField(cur,"max",Object.prototype.hasOwnProperty.call(frValue,"max")?Reflect.field(frValue,"max"):Reflect.field(frValue,"min") + 1);
					}
				}
			}
			if(Object.prototype.hasOwnProperty.call(fieldMeta,"choices")) {
				frParams = Reflect.field(fieldMeta,"choices");
				if(frParams != null && frParams.length > 0) {
					frValue = frParams[0];
					if(typeof(frValue) == "string") {
						var frChoices = { };
						frStatics = new _$List_ListIterator(rtti.statics.h);
						var _g4 = frStatics;
						while(_g4.head != null) {
							var f3;
							f3 = (function($this) {
								var $r;
								_g4.val = _g4.head[0];
								_g4.head = _g4.head[1];
								$r = _g4.val;
								return $r;
							}(this));
							frI = f3.name.indexOf("_");
							if(frI >= 0) {
								frPrefix = f3.name.substring(0,frI);
								if(frPrefix == frValue) Reflect.setField(frChoices,f3.name.substring(frI + 1),Reflect.field(classe,f3.name));
							}
						}
						cur.choices = frChoices;
					} else cur.choices = frValue;
				}
			}
		}
	}
	fieldHash._dotPath = dotPath;
	Reflect.setField(fieldHash,"_hxclass",Type.getClassName(classe));
	return fieldHash;
};
var de_polygonal_ds_Cloneable = function() { };
$hxClasses["de.polygonal.ds.Cloneable"] = de_polygonal_ds_Cloneable;
de_polygonal_ds_Cloneable.__name__ = ["de","polygonal","ds","Cloneable"];
de_polygonal_ds_Cloneable.prototype = {
	clone: null
	,__class__: de_polygonal_ds_Cloneable
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
	get_size: null
	,free: null
	,contains: null
	,remove: null
	,clear: null
	,iterator: null
	,isEmpty: null
	,toArray: null
	,clone: null
	,__class__: de_polygonal_ds_Collection
	,__properties__: {get_size:"get_size"}
};
var de_polygonal_ds_Graph = function() {
	this.mQueSize = 16;
	this.mStackSize = 16;
	this.mIterator = null;
	this.mSize = 0;
	this.mNodeList = null;
	this.reuseIterator = false;
	this.autoClearMarks = false;
	this.key = de_polygonal_ds_HashKey._counter++;
	this.mStack = new Array(this.mStackSize);
	this.mQue = new Array(this.mQueSize);
};
$hxClasses["de.polygonal.ds.Graph"] = de_polygonal_ds_Graph;
de_polygonal_ds_Graph.__name__ = ["de","polygonal","ds","Graph"];
de_polygonal_ds_Graph.__interfaces__ = [de_polygonal_ds_Collection];
de_polygonal_ds_Graph.prototype = {
	key: null
	,autoClearMarks: null
	,reuseIterator: null
	,borrowArc: null
	,returnArc: null
	,mNodeList: null
	,mSize: null
	,mIterator: null
	,mStack: null
	,mStackSize: null
	,mQue: null
	,mQueSize: null
	,getNodeList: function() {
		return this.mNodeList;
	}
	,findNode: function(x) {
		var found = false;
		var n = this.mNodeList;
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
		this.mSize++;
		x.next = this.mNodeList;
		if(x.next != null) x.next.prev = x;
		this.mNodeList = x;
		return x;
	}
	,removeNode: function(x) {
		this.unlink(x);
		if(x.prev != null) x.prev.next = x.next;
		if(x.next != null) x.next.prev = x.prev;
		if(this.mNodeList == x) this.mNodeList = x.next;
		this.mSize--;
	}
	,addSingleArc: function(source,target,cost) {
		if(cost == null) cost = 1.;
		var walker = this.mNodeList;
		while(walker != null) {
			if(walker == source) {
				var sourceNode = walker;
				walker = this.mNodeList;
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
	,addGetSingleArc: function(source,target,cost) {
		if(cost == null) cost = 1.;
		this.addSingleArc(source,target,cost);
		return source.getArc(target);
	}
	,addMutualArcs: function(source,target,cost) {
		if(cost == null) cost = 1.;
		this.addMutualArc(source,target,cost);
		return [source.getArc(target),target.getArc(source)];
	}
	,addMutualArc: function(source,target,cost) {
		if(cost == null) cost = 1.;
		var walker = this.mNodeList;
		while(walker != null) {
			if(walker == source) {
				var sourceNode = walker;
				walker = this.mNodeList;
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
		var node = this.mNodeList;
		while(node != null) {
			node.marked = false;
			node = node.next;
		}
	}
	,clearParent: function() {
		var node = this.mNodeList;
		while(node != null) {
			node.parent = null;
			node = node.next;
		}
	}
	,DFS: function(preflight,seed,process,userData,recursive) {
		if(recursive == null) recursive = false;
		if(preflight == null) preflight = false;
		var _g = this;
		if(this.mSize == 0) return;
		if(this.autoClearMarks) this.clearMarks();
		var c = 1;
		if(seed == null) seed = this.mNodeList;
		var max = this.mStackSize;
		var s = this.mStack;
		s[0] = seed;
		seed.parent = seed;
		seed.depth = 0;
		if(preflight) {
			if(process == null) {
				if(recursive) {
					var v = seed.val;
					if(v.visit(true,userData)) this.dFSRecursiveVisit(seed,true,userData);
				} else {
					var v1 = null;
					var n = s[0];
					v1 = n.val;
					if(!v1.visit(true,userData)) return;
					while(c > 0) {
						var n1 = de_polygonal_ds_tools_NativeArrayTools.get(s,--c);
						if(n1.marked) continue;
						n1.marked = true;
						v1 = n1.val;
						if(!v1.visit(false,userData)) break;
						var a = n1.arcList;
						while(a != null) {
							v1 = n1.val;
							a.node.parent = n1;
							a.node.depth = n1.depth + 1;
							if(v1.visit(true,userData)) {
								if(c == max) _g.resizeStack(max = max * 2);
								de_polygonal_ds_tools_NativeArrayTools.set(s,c++,a.node);
							}
							a = a.next;
						}
					}
				}
			} else if(recursive) {
				if(process(seed,true,userData)) this.dFSRecursiveProcess(seed,process,true,userData);
			} else {
				var n2 = s[0];
				if(!process(n2,true,userData)) return;
				while(c > 0) {
					var n3 = de_polygonal_ds_tools_NativeArrayTools.get(s,--c);
					if(n3.marked) continue;
					n3.marked = true;
					if(!process(n3,false,userData)) break;
					var a1 = n3.arcList;
					while(a1 != null) {
						a1.node.parent = n3;
						a1.node.depth = n3.depth + 1;
						if(process(a1.node,true,userData)) {
							if(c == max) _g.resizeStack(max = max * 2);
							de_polygonal_ds_tools_NativeArrayTools.set(s,c++,a1.node);
						}
						a1 = a1.next;
					}
				}
			}
		} else if(process == null) {
			if(recursive) this.dFSRecursiveVisit(seed,false,userData); else {
				var v2 = null;
				while(c > 0) {
					var n4 = de_polygonal_ds_tools_NativeArrayTools.get(s,--c);
					if(n4.marked) continue;
					n4.marked = true;
					v2 = n4.val;
					if(!v2.visit(false,userData)) break;
					var a2 = n4.arcList;
					while(a2 != null) {
						if(c == max) _g.resizeStack(max = max * 2);
						de_polygonal_ds_tools_NativeArrayTools.set(s,c++,a2.node);
						a2.node.parent = n4;
						a2.node.depth = n4.depth + 1;
						a2 = a2.next;
					}
				}
			}
		} else if(recursive) this.dFSRecursiveProcess(seed,process,false,userData); else while(c > 0) {
			var n5 = de_polygonal_ds_tools_NativeArrayTools.get(s,--c);
			if(n5.marked) continue;
			n5.marked = true;
			if(!process(n5,false,userData)) break;
			var a3 = n5.arcList;
			while(a3 != null) {
				if(c == max) _g.resizeStack(max = max * 2);
				de_polygonal_ds_tools_NativeArrayTools.set(s,c++,a3.node);
				a3.node.parent = n5;
				a3.node.depth = n5.depth + 1;
				a3 = a3.next;
			}
		}
	}
	,BFS: function(preflight,seed,process,userData) {
		if(preflight == null) preflight = false;
		var _g = this;
		if(this.mSize == 0) return;
		if(this.autoClearMarks) this.clearMarks();
		var front = 0;
		var c = 1;
		var q = this.mQue;
		var max = this.mQueSize;
		if(seed == null) seed = this.mNodeList;
		q[0] = seed;
		seed.marked = true;
		seed.parent = seed;
		seed.depth = 0;
		if(preflight) {
			if(process == null) {
				var v = null;
				var n = q[front];
				v = n.val;
				if(!v.visit(true,userData)) return;
				while(c > 0) {
					n = q[front];
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
						if(v.visit(true,userData)) {
							var i = c++ + front;
							if(i == max) {
								_g.resizeQue(max = max * 2);
								q = _g.mQue;
							}
							q[i] = m;
						}
						a = a.next;
					}
					front++;
					c--;
				}
			} else {
				var n1 = q[front];
				if(!process(n1,true,userData)) return;
				while(c > 0) {
					n1 = q[front];
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
						if(process(m1,true,userData)) {
							var i1 = c++ + front;
							if(i1 == max) {
								_g.resizeQue(max = max * 2);
								q = _g.mQue;
							}
							q[i1] = m1;
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
				var n2 = q[front];
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
					var i2 = c++ + front;
					if(i2 == max) {
						_g.resizeQue(max = max * 2);
						q = _g.mQue;
					}
					q[i2] = m2;
					a2 = a2.next;
				}
				front++;
				c--;
			}
		} else while(c > 0) {
			var n3 = q[front];
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
				var i3 = c++ + front;
				if(i3 == max) {
					_g.resizeQue(max = max * 2);
					q = _g.mQue;
				}
				q[i3] = m3;
				a3 = a3.next;
			}
			front++;
			c--;
		}
	}
	,DLBFS: function(maxDepth,preflight,seed,process,userData) {
		if(preflight == null) preflight = false;
		var _g = this;
		if(this.mSize == 0) return;
		if(this.autoClearMarks) this.clearMarks();
		var front = 0;
		var c = 1;
		var q = this.mQue;
		var max = this.mQueSize;
		var node = this.mNodeList;
		while(node != null) {
			node.depth = 0;
			node = node.next;
		}
		if(seed == null) seed = this.mNodeList;
		seed.marked = true;
		seed.parent = seed;
		q[0] = seed;
		if(preflight) {
			if(process == null) {
				var v = null;
				var n = q[front];
				v = n.val;
				if(!v.visit(true,userData)) return;
				while(c > 0) {
					n = q[front];
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
							if(v.visit(true,userData)) {
								var i = c++ + front;
								if(i == max) {
									_g.resizeQue(max = max * 2);
									q = _g.mQue;
								}
								q[i] = m;
							}
						}
						a = a.next;
					}
					front++;
					c--;
				}
			} else {
				var n1 = q[front];
				if(!process(n1,true,userData)) return;
				while(c > 0) {
					n1 = q[front];
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
							if(process(m1,true,userData)) {
								var i1 = c++ + front;
								if(i1 == max) {
									_g.resizeQue(max = max * 2);
									q = _g.mQue;
								}
								q[i1] = m1;
							}
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
				var n2 = q[front];
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
					if(m2.depth <= maxDepth) {
						var i2 = c++ + front;
						if(i2 == max) {
							_g.resizeQue(max = max * 2);
							q = _g.mQue;
						}
						q[i2] = m2;
					}
					a2 = a2.next;
				}
				front++;
				c--;
			}
		} else while(c > 0) {
			var n3 = q[front];
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
				if(m3.depth <= maxDepth) {
					var i3 = c++ + front;
					if(i3 == max) {
						_g.resizeQue(max = max * 2);
						q = _g.mQue;
					}
					q[i3] = m3;
				}
				a3 = a3.next;
			}
			front++;
			c--;
		}
	}
	,toString: function() {
		var b = new StringBuf();
		b.b += Std.string("{ Graph size: " + this.mSize + " }");
		if(this.mSize == 0) return b.b;
		b.b += "\n[\n";
		var node = this.mNodeList;
		while(node != null) {
			b.add("  " + node.toString() + "\n");
			node = node.next;
		}
		b.b += "]";
		return b.b;
	}
	,get_size: function() {
		return this.mSize;
	}
	,free: function() {
		var node = this.mNodeList;
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
		this.mNodeList = null;
		de_polygonal_ds_tools_NativeArrayTools.nullify(this.mStack);
		this.mStack = null;
		de_polygonal_ds_tools_NativeArrayTools.nullify(this.mQue);
		this.mQue = null;
		if(this.mIterator != null) {
			this.mIterator.free();
			this.mIterator = null;
		}
	}
	,contains: function(x) {
		var found = false;
		var node = this.mNodeList;
		while(node != null) {
			if(node.val == x) return true;
			node = node.next;
		}
		return false;
	}
	,remove: function(x) {
		var found = false;
		var node = this.mNodeList;
		while(node != null) {
			var nextNode = node.next;
			if(node.val == x) {
				this.unlink(node);
				if(node == this.mNodeList) this.mNodeList = nextNode;
				node.val = null;
				node.next = node.prev = null;
				node.arcList = null;
				found = true;
				this.mSize--;
			}
			node = nextNode;
		}
		return found;
	}
	,clear: function(gc) {
		if(gc == null) gc = false;
		if(gc) {
			var node = this.mNodeList;
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
			de_polygonal_ds_tools_NativeArrayTools.nullify(this.mStack);
			de_polygonal_ds_tools_NativeArrayTools.nullify(this.mQue);
		}
		this.mNodeList = null;
		this.mSize = 0;
	}
	,iterator: function() {
		if(this.reuseIterator) {
			if(this.mIterator == null) this.mIterator = new de_polygonal_ds_GraphIterator(this); else this.mIterator.reset();
			return this.mIterator;
		} else return new de_polygonal_ds_GraphIterator(this);
	}
	,nodeIterator: function() {
		return new de_polygonal_ds_GraphNodeIterator(this);
	}
	,arcIterator: function() {
		return new de_polygonal_ds_GraphArcIterator(this);
	}
	,isEmpty: function() {
		return this.mSize == 0;
	}
	,toArray: function() {
		if(this.mSize == 0) return [];
		var i = 0;
		var out = de_polygonal_ds_tools_ArrayTools.alloc(this.mSize);
		var node = this.mNodeList;
		while(node != null) {
			out[i++] = node.val;
			node = node.next;
		}
		return out;
	}
	,clone: function(assign,copier) {
		if(assign == null) assign = true;
		var copy = new de_polygonal_ds_Graph();
		if(this.mNodeList == null) return copy;
		var t = [];
		var i = 0;
		var n = this.mNodeList;
		var m;
		if(assign) while(n != null) {
			m = copy.addNode(copy.createNode(n.val));
			t[i++] = m;
			n = n.next;
		} else if(copier == null) while(n != null) {
			m = copy.addNode(copy.createNode((js_Boot.__cast(n.val , de_polygonal_ds_Cloneable)).clone()));
			t[i++] = m;
			n = n.next;
		} else while(n != null) {
			m = copy.addNode(copy.createNode(copier(n.val)));
			t[i++] = m;
			n = n.next;
		}
		i = 0;
		n = this.mNodeList;
		var a;
		while(n != null) {
			m = t[i++];
			a = n.arcList;
			while(a != null) {
				m.addArc(a.node,a.cost);
				a = a.next;
			}
			n = n.next;
		}
		return copy;
	}
	,dFSRecursiveVisit: function(node,preflight,userData) {
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
					if(!this.dFSRecursiveVisit(m,true,userData)) return false;
				}
			} else if(!this.dFSRecursiveVisit(m,false,userData)) return false;
			a = a.next;
		}
		return true;
	}
	,dFSRecursiveProcess: function(node,process,preflight,userData) {
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
					if(!this.dFSRecursiveProcess(m,process,true,userData)) return false;
				}
			} else if(!this.dFSRecursiveProcess(m,process,false,userData)) return false;
			a = a.next;
		}
		return true;
	}
	,resizeStack: function(newSize) {
		var t = new Array(newSize);
		de_polygonal_ds_tools_NativeArrayTools.blit(this.mStack,0,t,0,this.mStackSize);
		this.mStack = t;
		this.mStackSize = newSize;
	}
	,resizeQue: function(newSize) {
		var t = new Array(newSize);
		de_polygonal_ds_tools_NativeArrayTools.blit(this.mQue,0,t,0,this.mQueSize);
		this.mQue = t;
		this.mQueSize = newSize;
	}
	,__class__: de_polygonal_ds_Graph
	,__properties__: {get_size:"get_size"}
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
var de_polygonal_ds_GraphIterator = function(x) {
	this.mObject = x;
	{
		this.mNode = this.mObject.mNodeList;
		this;
	}
};
$hxClasses["de.polygonal.ds.GraphIterator"] = de_polygonal_ds_GraphIterator;
de_polygonal_ds_GraphIterator.__name__ = ["de","polygonal","ds","GraphIterator"];
de_polygonal_ds_GraphIterator.__interfaces__ = [de_polygonal_ds_Itr];
de_polygonal_ds_GraphIterator.prototype = {
	mObject: null
	,mNode: null
	,free: function() {
		this.mObject = null;
		this.mNode = null;
	}
	,reset: function() {
		this.mNode = this.mObject.mNodeList;
		return this;
	}
	,hasNext: function() {
		return this.mNode != null;
	}
	,next: function() {
		var x = this.mNode.val;
		this.mNode = this.mNode.next;
		return x;
	}
	,remove: function() {
		throw new js__$Boot_HaxeError("unsupported operation");
	}
	,__class__: de_polygonal_ds_GraphIterator
};
var de_polygonal_ds_GraphNodeIterator = function(x) {
	this.mObject = x;
	{
		this.mNode = this.mObject.mNodeList;
		this;
	}
};
$hxClasses["de.polygonal.ds.GraphNodeIterator"] = de_polygonal_ds_GraphNodeIterator;
de_polygonal_ds_GraphNodeIterator.__name__ = ["de","polygonal","ds","GraphNodeIterator"];
de_polygonal_ds_GraphNodeIterator.__interfaces__ = [de_polygonal_ds_Itr];
de_polygonal_ds_GraphNodeIterator.prototype = {
	mObject: null
	,mNode: null
	,reset: function() {
		this.mNode = this.mObject.mNodeList;
		return this;
	}
	,hasNext: function() {
		return this.mNode != null;
	}
	,next: function() {
		var x = this.mNode;
		this.mNode = this.mNode.next;
		return x;
	}
	,remove: function() {
		throw new js__$Boot_HaxeError("unsupported operation");
	}
	,__class__: de_polygonal_ds_GraphNodeIterator
};
var de_polygonal_ds_GraphArcIterator = function(x) {
	this.mObject = x;
	{
		this.mNode = this.mObject.mNodeList;
		this.mArc = this.mNode.arcList;
		this;
	}
};
$hxClasses["de.polygonal.ds.GraphArcIterator"] = de_polygonal_ds_GraphArcIterator;
de_polygonal_ds_GraphArcIterator.__name__ = ["de","polygonal","ds","GraphArcIterator"];
de_polygonal_ds_GraphArcIterator.__interfaces__ = [de_polygonal_ds_Itr];
de_polygonal_ds_GraphArcIterator.prototype = {
	mObject: null
	,mNode: null
	,mArc: null
	,reset: function() {
		this.mNode = this.mObject.mNodeList;
		this.mArc = this.mNode.arcList;
		return this;
	}
	,hasNext: function() {
		return this.mArc != null && this.mNode != null;
	}
	,next: function() {
		var x = this.mArc;
		this.mArc = this.mArc.next;
		if(this.mArc == null) {
			this.mNode = this.mNode.next;
			if(this.mNode != null) this.mArc = this.mNode.arcList;
		}
		return x;
	}
	,remove: function() {
		throw new js__$Boot_HaxeError("unsupported operation");
	}
	,__class__: de_polygonal_ds_GraphArcIterator
};
var de_polygonal_ds_GraphArc = function(node,cost) {
	this.key = de_polygonal_ds_HashKey._counter++;
	this.node = node;
	this.cost = cost;
	this.next = null;
	this.prev = null;
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
	,val: null
	,free: function() {
		this.node = null;
		this.next = this.prev = null;
	}
	,__class__: de_polygonal_ds_GraphArc
};
var de_polygonal_ds_GraphNode = function(graph,x) {
	this.numArcs = 0;
	this.key = de_polygonal_ds_HashKey._counter++;
	this.val = x;
	this.arcList = null;
	this.marked = false;
	this.mGraph = graph;
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
	,numArcs: null
	,mGraph: null
	,free: function() {
		this.val = null;
		this.next = this.prev = null;
		this.arcList = null;
		this.mGraph = null;
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
		if(cost == null) cost = 1;
		var arc;
		if(this.mGraph.borrowArc != null) arc = this.mGraph.borrowArc(target,cost); else arc = new de_polygonal_ds_GraphArc(target,cost);
		arc.next = this.arcList;
		if(this.arcList != null) this.arcList.prev = arc;
		this.arcList = arc;
		this.numArcs++;
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
			if(this.mGraph.returnArc != null) this.mGraph.returnArc(arc);
			this.numArcs--;
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
		this.numArcs = 0;
	}
	,removeMutualArcs: function() {
		var arc = this.arcList;
		while(arc != null) {
			arc.node.removeArc(this);
			this.removeArc(arc.node);
			arc = arc.next;
		}
		this.arcList = null;
		this.numArcs = 0;
	}
	,toString: function() {
		var t = [];
		var arc;
		if(this.arcList != null) {
			arc = this.arcList;
			while(arc != null) {
				t.push(Std.string(arc.node.val));
				arc = arc.next;
			}
		}
		if(t.length > 0) return "{ GraphNode val: " + Std.string(this.val) + ", connected to: " + t.join(",") + " }"; else return "{ GraphNode val: " + Std.string(this.val) + " }";
	}
	,__class__: de_polygonal_ds_GraphNode
};
var de_polygonal_ds_NodeValIterator = function(x) {
	this.mObject = x;
	{
		this.mArcList = this.mObject.arcList;
		this;
	}
};
$hxClasses["de.polygonal.ds.NodeValIterator"] = de_polygonal_ds_NodeValIterator;
de_polygonal_ds_NodeValIterator.__name__ = ["de","polygonal","ds","NodeValIterator"];
de_polygonal_ds_NodeValIterator.__interfaces__ = [de_polygonal_ds_Itr];
de_polygonal_ds_NodeValIterator.prototype = {
	mObject: null
	,mArcList: null
	,reset: function() {
		this.mArcList = this.mObject.arcList;
		return this;
	}
	,hasNext: function() {
		return this.mArcList != null;
	}
	,next: function() {
		var val = this.mArcList.node.val;
		this.mArcList = this.mArcList.next;
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
var de_polygonal_ds_tools_ArrayTools = function() { };
$hxClasses["de.polygonal.ds.tools.ArrayTools"] = de_polygonal_ds_tools_ArrayTools;
de_polygonal_ds_tools_ArrayTools.__name__ = ["de","polygonal","ds","tools","ArrayTools"];
de_polygonal_ds_tools_ArrayTools.alloc = function(x) {
	var a;
	a = new Array(x);
	return a;
};
de_polygonal_ds_tools_ArrayTools.shrink = function(a,x) {
	if(a.length > x) {
		a.length = x;
		return a;
	} else return a;
};
de_polygonal_ds_tools_ArrayTools.copy = function(source,destination,min,max) {
	if(max == null) max = -1;
	if(min == null) min = 0;
	if(max == -1) max = source.length;
	var j = 0;
	var _g = min;
	while(_g < max) {
		var i = _g++;
		destination[j++] = source[i];
	}
	return destination;
};
de_polygonal_ds_tools_ArrayTools.init = function(destination,x,k) {
	if(k == null) k = -1;
	if(k == -1) k = destination.length;
	var _g = 0;
	while(_g < k) {
		var i = _g++;
		destination[i] = x;
	}
};
de_polygonal_ds_tools_ArrayTools.memmove = function(a,destination,source,n) {
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
de_polygonal_ds_tools_ArrayTools.bsearchComparator = function(a,x,min,max,comparator) {
	var l = min;
	var m;
	var h = max + 1;
	while(l < h) {
		m = l + (h - l >> 1);
		if(comparator(a[m],x) < 0) l = m + 1; else h = m;
	}
	if(l <= max && comparator(a[l],x) == 0) return l; else return ~l;
};
de_polygonal_ds_tools_ArrayTools.bsearchInt = function(a,x,min,max) {
	var l = min;
	var m;
	var h = max + 1;
	while(l < h) {
		m = l + (h - l >> 1);
		if(a[m] < x) l = m + 1; else h = m;
	}
	if(l <= max && a[l] == x) return l; else return ~l;
};
de_polygonal_ds_tools_ArrayTools.bsearchFloat = function(a,x,min,max) {
	var l = min;
	var m;
	var h = max + 1;
	while(l < h) {
		m = l + (h - l >> 1);
		if(a[m] < x) l = m + 1; else h = m;
	}
	if(l <= max && a[l] == x) return l; else return ~l;
};
de_polygonal_ds_tools_ArrayTools.shuffle = function(a,rvals) {
	var s = a.length;
	if(rvals == null) {
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
			var i1 = Std["int"](rvals[j++] * s);
			var t1 = a[s];
			a[s] = a[i1];
			a[i1] = t1;
		}
	}
};
de_polygonal_ds_tools_ArrayTools.sortRange = function(a,compare,useInsertionSort,first,count) {
	var k = a.length;
	if(k > 1) {
		if(useInsertionSort) de_polygonal_ds_tools_ArrayTools._insertionSort(a,first,count,compare); else de_polygonal_ds_tools_ArrayTools._quickSort(a,first,count,compare);
	}
};
de_polygonal_ds_tools_ArrayTools.quickPerm = function(n) {
	var results = [];
	var a = [];
	var p = [];
	var i;
	var j;
	var t;
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
		t = a[j];
		a[j] = a[i];
		a[i] = t;
		results.push(a.slice());
		p[i]++;
		i = 1;
	} else {
		p[i] = 0;
		i++;
	}
	return results;
};
de_polygonal_ds_tools_ArrayTools.equals = function(a,b) {
	if(a.length != b.length) return false;
	var _g1 = 0;
	var _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(a[i] != b[i]) return false;
	}
	return true;
};
de_polygonal_ds_tools_ArrayTools.split = function(a,n,k) {
	var out = [];
	var b = null;
	var _g = 0;
	while(_g < n) {
		var i = _g++;
		if(i % k == 0) out[i / k | 0] = b = [];
		b.push(a[i]);
	}
	return out;
};
de_polygonal_ds_tools_ArrayTools._insertionSort = function(a,first,k,cmp) {
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
de_polygonal_ds_tools_ArrayTools._quickSort = function(a,first,k,cmp) {
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
		de_polygonal_ds_tools_ArrayTools._quickSort(a,first,lo - first,cmp);
		de_polygonal_ds_tools_ArrayTools._quickSort(a,lo + 1,last - lo,cmp);
	}
};
var de_polygonal_ds_tools_Assert = function() { };
$hxClasses["de.polygonal.ds.tools.Assert"] = de_polygonal_ds_tools_Assert;
de_polygonal_ds_tools_Assert.__name__ = ["de","polygonal","ds","tools","Assert"];
var de_polygonal_ds_tools_NativeArrayTools = function() { };
$hxClasses["de.polygonal.ds.tools.NativeArrayTools"] = de_polygonal_ds_tools_NativeArrayTools;
de_polygonal_ds_tools_NativeArrayTools.__name__ = ["de","polygonal","ds","tools","NativeArrayTools"];
de_polygonal_ds_tools_NativeArrayTools.alloc = function(len) {
	return new Array(len);
};
de_polygonal_ds_tools_NativeArrayTools.get = function(x,i) {
	return x[i];
};
de_polygonal_ds_tools_NativeArrayTools.set = function(x,i,v) {
	x[i] = v;
};
de_polygonal_ds_tools_NativeArrayTools.size = function(x) {
	return x.length;
};
de_polygonal_ds_tools_NativeArrayTools.toArray = function(x,first,count) {
	if(count == 0) return [];
	var out = de_polygonal_ds_tools_ArrayTools.alloc(count);
	if(first == 0) {
		var _g = 0;
		while(_g < count) {
			var i = _g++;
			out[i] = x[i];
		}
	} else {
		var j;
		var _g1 = first;
		var _g2 = first + count;
		while(_g1 < _g2) {
			var i1 = _g1++;
			out[i1 - first] = x[i1];
		}
	}
	return out;
};
de_polygonal_ds_tools_NativeArrayTools.ofArray = function(x) {
	return x.slice(0,x.length);
};
de_polygonal_ds_tools_NativeArrayTools.blit = function(src,srcPos,dst,dstPos,len) {
	if(len > 0) {
		if(src == dst) {
			if(srcPos < dstPos) {
				var i = srcPos + len;
				var j = dstPos + len;
				var _g = 0;
				while(_g < len) {
					var k = _g++;
					i--;
					j--;
					src[j] = src[i];
				}
			} else if(srcPos > dstPos) {
				var i1 = srcPos;
				var j1 = dstPos;
				var _g1 = 0;
				while(_g1 < len) {
					var k1 = _g1++;
					src[j1] = src[i1];
					i1++;
					j1++;
				}
			}
		} else if(srcPos == 0 && dstPos == 0) {
			var _g2 = 0;
			while(_g2 < len) {
				var i2 = _g2++;
				dst[i2] = src[i2];
			}
		} else if(srcPos == 0) {
			var _g3 = 0;
			while(_g3 < len) {
				var i3 = _g3++;
				dst[dstPos + i3] = src[i3];
			}
		} else if(dstPos == 0) {
			var _g4 = 0;
			while(_g4 < len) {
				var i4 = _g4++;
				dst[i4] = src[srcPos + i4];
			}
		} else {
			var _g5 = 0;
			while(_g5 < len) {
				var i5 = _g5++;
				dst[dstPos + i5] = src[srcPos + i5];
			}
		}
	}
};
de_polygonal_ds_tools_NativeArrayTools.copy = function(src) {
	return src.slice(0);
};
de_polygonal_ds_tools_NativeArrayTools.zero = function(dst,first,len) {
	var val = 0;
	var _g1 = first;
	var _g = first + len;
	while(_g1 < _g) {
		var i = _g1++;
		dst[i] = val;
	}
	return dst;
};
de_polygonal_ds_tools_NativeArrayTools.init = function(dst,x,first,k) {
	if(first == null) first = 0;
	if(k == null) k = dst.length;
	var _g1 = first;
	var _g = first + k;
	while(_g1 < _g) {
		var i = _g1++;
		dst[i] = x;
	}
	return dst;
};
de_polygonal_ds_tools_NativeArrayTools.nullify = function(dst,count) {
	if(count == null) count = 0;
	if(count == 0) count = dst.length;
	var _g = 0;
	while(_g < count) {
		var i = _g++;
		dst[i] = null;
	}
};
de_polygonal_ds_tools_NativeArrayTools.binarySearchCmp = function(v,x,min,max,cmp) {
	var l = min;
	var m;
	var h = max + 1;
	while(l < h) {
		m = l + (h - l >> 1);
		if(cmp(v[m],x) < 0) l = m + 1; else h = m;
	}
	if(l <= max && cmp(v[l],x) == 0) return l; else return ~l;
};
de_polygonal_ds_tools_NativeArrayTools.binarySearchf = function(v,x,min,max) {
	var l = min;
	var m;
	var h = max + 1;
	while(l < h) {
		m = l + (h - l >> 1);
		if(v[m] < x) l = m + 1; else h = m;
	}
	if(l <= max && v[l] == x) return l; else return ~l;
};
de_polygonal_ds_tools_NativeArrayTools.binarySearchi = function(v,x,min,max) {
	var l = min;
	var m;
	var h = max + 1;
	while(l < h) {
		m = l + (h - l >> 1);
		if(v[m] < x) l = m + 1; else h = m;
	}
	if(l <= max && v[l] == x) return l; else return ~l;
};
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
var haxe_rtti_CType = $hxClasses["haxe.rtti.CType"] = { __ename__ : ["haxe","rtti","CType"], __constructs__ : ["CUnknown","CEnum","CClass","CTypedef","CFunction","CAnonymous","CDynamic","CAbstract"] };
haxe_rtti_CType.CUnknown = ["CUnknown",0];
haxe_rtti_CType.CUnknown.toString = $estr;
haxe_rtti_CType.CUnknown.__enum__ = haxe_rtti_CType;
haxe_rtti_CType.CEnum = function(name,params) { var $x = ["CEnum",1,name,params]; $x.__enum__ = haxe_rtti_CType; $x.toString = $estr; return $x; };
haxe_rtti_CType.CClass = function(name,params) { var $x = ["CClass",2,name,params]; $x.__enum__ = haxe_rtti_CType; $x.toString = $estr; return $x; };
haxe_rtti_CType.CTypedef = function(name,params) { var $x = ["CTypedef",3,name,params]; $x.__enum__ = haxe_rtti_CType; $x.toString = $estr; return $x; };
haxe_rtti_CType.CFunction = function(args,ret) { var $x = ["CFunction",4,args,ret]; $x.__enum__ = haxe_rtti_CType; $x.toString = $estr; return $x; };
haxe_rtti_CType.CAnonymous = function(fields) { var $x = ["CAnonymous",5,fields]; $x.__enum__ = haxe_rtti_CType; $x.toString = $estr; return $x; };
haxe_rtti_CType.CDynamic = function(t) { var $x = ["CDynamic",6,t]; $x.__enum__ = haxe_rtti_CType; $x.toString = $estr; return $x; };
haxe_rtti_CType.CAbstract = function(name,params) { var $x = ["CAbstract",7,name,params]; $x.__enum__ = haxe_rtti_CType; $x.toString = $estr; return $x; };
var haxe_rtti_Rights = $hxClasses["haxe.rtti.Rights"] = { __ename__ : ["haxe","rtti","Rights"], __constructs__ : ["RNormal","RNo","RCall","RMethod","RDynamic","RInline"] };
haxe_rtti_Rights.RNormal = ["RNormal",0];
haxe_rtti_Rights.RNormal.toString = $estr;
haxe_rtti_Rights.RNormal.__enum__ = haxe_rtti_Rights;
haxe_rtti_Rights.RNo = ["RNo",1];
haxe_rtti_Rights.RNo.toString = $estr;
haxe_rtti_Rights.RNo.__enum__ = haxe_rtti_Rights;
haxe_rtti_Rights.RCall = function(m) { var $x = ["RCall",2,m]; $x.__enum__ = haxe_rtti_Rights; $x.toString = $estr; return $x; };
haxe_rtti_Rights.RMethod = ["RMethod",3];
haxe_rtti_Rights.RMethod.toString = $estr;
haxe_rtti_Rights.RMethod.__enum__ = haxe_rtti_Rights;
haxe_rtti_Rights.RDynamic = ["RDynamic",4];
haxe_rtti_Rights.RDynamic.toString = $estr;
haxe_rtti_Rights.RDynamic.__enum__ = haxe_rtti_Rights;
haxe_rtti_Rights.RInline = ["RInline",5];
haxe_rtti_Rights.RInline.toString = $estr;
haxe_rtti_Rights.RInline.__enum__ = haxe_rtti_Rights;
var haxe_rtti_TypeTree = $hxClasses["haxe.rtti.TypeTree"] = { __ename__ : ["haxe","rtti","TypeTree"], __constructs__ : ["TPackage","TClassdecl","TEnumdecl","TTypedecl","TAbstractdecl"] };
haxe_rtti_TypeTree.TPackage = function(name,full,subs) { var $x = ["TPackage",0,name,full,subs]; $x.__enum__ = haxe_rtti_TypeTree; $x.toString = $estr; return $x; };
haxe_rtti_TypeTree.TClassdecl = function(c) { var $x = ["TClassdecl",1,c]; $x.__enum__ = haxe_rtti_TypeTree; $x.toString = $estr; return $x; };
haxe_rtti_TypeTree.TEnumdecl = function(e) { var $x = ["TEnumdecl",2,e]; $x.__enum__ = haxe_rtti_TypeTree; $x.toString = $estr; return $x; };
haxe_rtti_TypeTree.TTypedecl = function(t) { var $x = ["TTypedecl",3,t]; $x.__enum__ = haxe_rtti_TypeTree; $x.toString = $estr; return $x; };
haxe_rtti_TypeTree.TAbstractdecl = function(a) { var $x = ["TAbstractdecl",4,a]; $x.__enum__ = haxe_rtti_TypeTree; $x.toString = $estr; return $x; };
var haxe_rtti_TypeApi = function() { };
$hxClasses["haxe.rtti.TypeApi"] = haxe_rtti_TypeApi;
haxe_rtti_TypeApi.__name__ = ["haxe","rtti","TypeApi"];
haxe_rtti_TypeApi.isVar = function(t) {
	switch(t[1]) {
	case 4:
		return false;
	default:
		return true;
	}
};
var haxe_rtti_CTypeTools = function() { };
$hxClasses["haxe.rtti.CTypeTools"] = haxe_rtti_CTypeTools;
haxe_rtti_CTypeTools.__name__ = ["haxe","rtti","CTypeTools"];
haxe_rtti_CTypeTools.toString = function(t) {
	switch(t[1]) {
	case 0:
		return "unknown";
	case 2:
		var params = t[3];
		var name = t[2];
		return haxe_rtti_CTypeTools.nameWithParams(name,params);
	case 1:
		var params1 = t[3];
		var name1 = t[2];
		return haxe_rtti_CTypeTools.nameWithParams(name1,params1);
	case 3:
		var params2 = t[3];
		var name2 = t[2];
		return haxe_rtti_CTypeTools.nameWithParams(name2,params2);
	case 7:
		var params3 = t[3];
		var name3 = t[2];
		return haxe_rtti_CTypeTools.nameWithParams(name3,params3);
	case 4:
		var ret = t[3];
		var args = t[2];
		if(args.length == 0) return "Void -> " + haxe_rtti_CTypeTools.toString(ret); else return args.map(haxe_rtti_CTypeTools.functionArgumentName).join(" -> ");
		break;
	case 6:
		var d = t[2];
		if(d == null) return "Dynamic"; else return "Dynamic<" + haxe_rtti_CTypeTools.toString(d) + ">";
		break;
	case 5:
		var fields = t[2];
		return "{ " + fields.map(haxe_rtti_CTypeTools.classField).join(", ");
	}
};
haxe_rtti_CTypeTools.nameWithParams = function(name,params) {
	if(params.length == 0) return name;
	return name + "<" + params.map(haxe_rtti_CTypeTools.toString).join(", ") + ">";
};
haxe_rtti_CTypeTools.functionArgumentName = function(arg) {
	return (arg.opt?"?":"") + arg.name + ":" + haxe_rtti_CTypeTools.toString(arg.t) + (arg.value == null?"":" = " + arg.value);
};
haxe_rtti_CTypeTools.classField = function(cf) {
	return cf.name + ":" + haxe_rtti_CTypeTools.toString(cf.type);
};
var haxe_rtti_Meta = function() { };
$hxClasses["haxe.rtti.Meta"] = haxe_rtti_Meta;
haxe_rtti_Meta.__name__ = ["haxe","rtti","Meta"];
haxe_rtti_Meta.getMeta = function(t) {
	return t.__meta__;
};
haxe_rtti_Meta.getFields = function(t) {
	var meta = haxe_rtti_Meta.getMeta(t);
	if(meta == null || meta.fields == null) return { }; else return meta.fields;
};
var haxe_rtti_Rtti = function() { };
$hxClasses["haxe.rtti.Rtti"] = haxe_rtti_Rtti;
haxe_rtti_Rtti.__name__ = ["haxe","rtti","Rtti"];
haxe_rtti_Rtti.getRtti = function(c) {
	var rtti = Reflect.field(c,"__rtti");
	if(rtti == null) throw new js__$Boot_HaxeError("Class " + Type.getClassName(c) + " has no RTTI information, consider adding @:rtti");
	var x = Xml.parse(rtti).firstElement();
	var infos = new haxe_rtti_XmlParser().processElement(x);
	{
		var t = infos;
		switch(infos[1]) {
		case 1:
			var c1 = infos[2];
			return c1;
		default:
			throw new js__$Boot_HaxeError("Enum mismatch: expected TClassDecl but found " + Std.string(t));
		}
	}
};
var haxe_rtti_XmlParser = function() {
	this.root = [];
};
$hxClasses["haxe.rtti.XmlParser"] = haxe_rtti_XmlParser;
haxe_rtti_XmlParser.__name__ = ["haxe","rtti","XmlParser"];
haxe_rtti_XmlParser.prototype = {
	root: null
	,curplatform: null
	,mkPath: function(p) {
		return p;
	}
	,mkTypeParams: function(p) {
		var pl = p.split(":");
		if(pl[0] == "") return [];
		return pl;
	}
	,mkRights: function(r) {
		switch(r) {
		case "null":
			return haxe_rtti_Rights.RNo;
		case "method":
			return haxe_rtti_Rights.RMethod;
		case "dynamic":
			return haxe_rtti_Rights.RDynamic;
		case "inline":
			return haxe_rtti_Rights.RInline;
		default:
			return haxe_rtti_Rights.RCall(r);
		}
	}
	,xerror: function(c) {
		throw new js__$Boot_HaxeError("Invalid " + c.get_name());
	}
	,processElement: function(x) {
		var c = new haxe_xml_Fast(x);
		var _g = c.get_name();
		switch(_g) {
		case "class":
			return haxe_rtti_TypeTree.TClassdecl(this.xclass(c));
		case "enum":
			return haxe_rtti_TypeTree.TEnumdecl(this.xenum(c));
		case "typedef":
			return haxe_rtti_TypeTree.TTypedecl(this.xtypedef(c));
		case "abstract":
			return haxe_rtti_TypeTree.TAbstractdecl(this.xabstract(c));
		default:
			return this.xerror(c);
		}
	}
	,xmeta: function(x) {
		var ml = [];
		var _g = x.nodes.resolve("m").iterator();
		while(_g.head != null) {
			var m;
			m = (function($this) {
				var $r;
				_g.val = _g.head[0];
				_g.head = _g.head[1];
				$r = _g.val;
				return $r;
			}(this));
			var pl = [];
			var _g1 = m.nodes.resolve("e").iterator();
			while(_g1.head != null) {
				var p;
				p = (function($this) {
					var $r;
					_g1.val = _g1.head[0];
					_g1.head = _g1.head[1];
					$r = _g1.val;
					return $r;
				}(this));
				pl.push(p.get_innerHTML());
			}
			ml.push({ name : m.att.resolve("n"), params : pl});
		}
		return ml;
	}
	,xoverloads: function(x) {
		var l = new List();
		var $it0 = x.get_elements();
		while( $it0.hasNext() ) {
			var m = $it0.next();
			l.add(this.xclassfield(m));
		}
		return l;
	}
	,xpath: function(x) {
		var path = this.mkPath(x.att.resolve("path"));
		var params = new List();
		var $it0 = x.get_elements();
		while( $it0.hasNext() ) {
			var c = $it0.next();
			params.add(this.xtype(c));
		}
		return { path : path, params : params};
	}
	,xclass: function(x) {
		var csuper = null;
		var doc = null;
		var tdynamic = null;
		var interfaces = new List();
		var fields = new List();
		var statics = new List();
		var meta = [];
		var $it0 = x.get_elements();
		while( $it0.hasNext() ) {
			var c = $it0.next();
			var _g = c.get_name();
			switch(_g) {
			case "haxe_doc":
				doc = c.get_innerData();
				break;
			case "extends":
				csuper = this.xpath(c);
				break;
			case "implements":
				interfaces.add(this.xpath(c));
				break;
			case "haxe_dynamic":
				tdynamic = this.xtype(new haxe_xml_Fast(c.x.firstElement()));
				break;
			case "meta":
				meta = this.xmeta(c);
				break;
			default:
				if(c.x.exists("static")) statics.add(this.xclassfield(c)); else fields.add(this.xclassfield(c));
			}
		}
		return { file : x.has.resolve("file")?x.att.resolve("file"):null, path : this.mkPath(x.att.resolve("path")), module : x.has.resolve("module")?this.mkPath(x.att.resolve("module")):null, doc : doc, isPrivate : x.x.exists("private"), isExtern : x.x.exists("extern"), isInterface : x.x.exists("interface"), params : this.mkTypeParams(x.att.resolve("params")), superClass : csuper, interfaces : interfaces, fields : fields, statics : statics, tdynamic : tdynamic, platforms : this.defplat(), meta : meta};
	}
	,xclassfield: function(x,defPublic) {
		if(defPublic == null) defPublic = false;
		var e = x.get_elements();
		var t = this.xtype(e.next());
		var doc = null;
		var meta = [];
		var overloads = null;
		while( e.hasNext() ) {
			var c = e.next();
			var _g = c.get_name();
			switch(_g) {
			case "haxe_doc":
				doc = c.get_innerData();
				break;
			case "meta":
				meta = this.xmeta(c);
				break;
			case "overloads":
				overloads = this.xoverloads(c);
				break;
			default:
				this.xerror(c);
			}
		}
		return { name : x.get_name(), type : t, isPublic : x.x.exists("public") || defPublic, isOverride : x.x.exists("override"), line : x.has.resolve("line")?Std.parseInt(x.att.resolve("line")):null, doc : doc, get : x.has.resolve("get")?this.mkRights(x.att.resolve("get")):haxe_rtti_Rights.RNormal, set : x.has.resolve("set")?this.mkRights(x.att.resolve("set")):haxe_rtti_Rights.RNormal, params : x.has.resolve("params")?this.mkTypeParams(x.att.resolve("params")):[], platforms : this.defplat(), meta : meta, overloads : overloads, expr : x.has.resolve("expr")?x.att.resolve("expr"):null};
	}
	,xenum: function(x) {
		var cl = new List();
		var doc = null;
		var meta = [];
		var $it0 = x.get_elements();
		while( $it0.hasNext() ) {
			var c = $it0.next();
			if(c.get_name() == "haxe_doc") doc = c.get_innerData(); else if(c.get_name() == "meta") meta = this.xmeta(c); else cl.add(this.xenumfield(c));
		}
		return { file : x.has.resolve("file")?x.att.resolve("file"):null, path : this.mkPath(x.att.resolve("path")), module : x.has.resolve("module")?this.mkPath(x.att.resolve("module")):null, doc : doc, isPrivate : x.x.exists("private"), isExtern : x.x.exists("extern"), params : this.mkTypeParams(x.att.resolve("params")), constructors : cl, platforms : this.defplat(), meta : meta};
	}
	,xenumfield: function(x) {
		var args = null;
		var xdoc = x.x.elementsNamed("haxe_doc").next();
		var meta;
		if(x.hasNode.resolve("meta")) meta = this.xmeta(x.node.resolve("meta")); else meta = [];
		if(x.has.resolve("a")) {
			var names = x.att.resolve("a").split(":");
			var elts = x.get_elements();
			args = new List();
			var _g = 0;
			while(_g < names.length) {
				var c = names[_g];
				++_g;
				var opt = false;
				if(c.charAt(0) == "?") {
					opt = true;
					c = HxOverrides.substr(c,1,null);
				}
				args.add({ name : c, opt : opt, t : this.xtype(elts.next())});
			}
		}
		return { name : x.get_name(), args : args, doc : xdoc == null?null:new haxe_xml_Fast(xdoc).get_innerData(), meta : meta, platforms : this.defplat()};
	}
	,xabstract: function(x) {
		var doc = null;
		var impl = null;
		var athis = null;
		var meta = [];
		var to = [];
		var from = [];
		var $it0 = x.get_elements();
		while( $it0.hasNext() ) {
			var c = $it0.next();
			var _g = c.get_name();
			switch(_g) {
			case "haxe_doc":
				doc = c.get_innerData();
				break;
			case "meta":
				meta = this.xmeta(c);
				break;
			case "to":
				var $it1 = c.get_elements();
				while( $it1.hasNext() ) {
					var t = $it1.next();
					to.push({ t : this.xtype(new haxe_xml_Fast(t.x.firstElement())), field : t.has.resolve("field")?t.att.resolve("field"):null});
				}
				break;
			case "from":
				var $it2 = c.get_elements();
				while( $it2.hasNext() ) {
					var t1 = $it2.next();
					from.push({ t : this.xtype(new haxe_xml_Fast(t1.x.firstElement())), field : t1.has.resolve("field")?t1.att.resolve("field"):null});
				}
				break;
			case "impl":
				impl = this.xclass(c.node.resolve("class"));
				break;
			case "this":
				athis = this.xtype(new haxe_xml_Fast(c.x.firstElement()));
				break;
			default:
				this.xerror(c);
			}
		}
		return { file : x.has.resolve("file")?x.att.resolve("file"):null, path : this.mkPath(x.att.resolve("path")), module : x.has.resolve("module")?this.mkPath(x.att.resolve("module")):null, doc : doc, isPrivate : x.x.exists("private"), params : this.mkTypeParams(x.att.resolve("params")), platforms : this.defplat(), meta : meta, athis : athis, to : to, from : from, impl : impl};
	}
	,xtypedef: function(x) {
		var doc = null;
		var t = null;
		var meta = [];
		var $it0 = x.get_elements();
		while( $it0.hasNext() ) {
			var c = $it0.next();
			if(c.get_name() == "haxe_doc") doc = c.get_innerData(); else if(c.get_name() == "meta") meta = this.xmeta(c); else t = this.xtype(c);
		}
		var types = new haxe_ds_StringMap();
		if(this.curplatform != null) types.set(this.curplatform,t);
		return { file : x.has.resolve("file")?x.att.resolve("file"):null, path : this.mkPath(x.att.resolve("path")), module : x.has.resolve("module")?this.mkPath(x.att.resolve("module")):null, doc : doc, isPrivate : x.x.exists("private"), params : this.mkTypeParams(x.att.resolve("params")), type : t, types : types, platforms : this.defplat(), meta : meta};
	}
	,xtype: function(x) {
		var _g = x.get_name();
		switch(_g) {
		case "unknown":
			return haxe_rtti_CType.CUnknown;
		case "e":
			return haxe_rtti_CType.CEnum(this.mkPath(x.att.resolve("path")),this.xtypeparams(x));
		case "c":
			return haxe_rtti_CType.CClass(this.mkPath(x.att.resolve("path")),this.xtypeparams(x));
		case "t":
			return haxe_rtti_CType.CTypedef(this.mkPath(x.att.resolve("path")),this.xtypeparams(x));
		case "x":
			return haxe_rtti_CType.CAbstract(this.mkPath(x.att.resolve("path")),this.xtypeparams(x));
		case "f":
			var args = new List();
			var aname = x.att.resolve("a").split(":");
			var eargs = HxOverrides.iter(aname);
			var evalues;
			if(x.has.resolve("v")) {
				var _this = x.att.resolve("v").split(":");
				evalues = HxOverrides.iter(_this);
			} else evalues = null;
			var $it0 = x.get_elements();
			while( $it0.hasNext() ) {
				var e = $it0.next();
				var opt = false;
				var a = eargs.next();
				if(a == null) a = "";
				if(a.charAt(0) == "?") {
					opt = true;
					a = HxOverrides.substr(a,1,null);
				}
				var v;
				if(evalues == null) v = null; else v = evalues.next();
				args.add({ name : a, opt : opt, t : this.xtype(e), value : v == ""?null:v});
			}
			var ret = args.last();
			args.remove(ret);
			return haxe_rtti_CType.CFunction(args,ret.t);
		case "a":
			var fields = new List();
			var $it1 = x.get_elements();
			while( $it1.hasNext() ) {
				var f = $it1.next();
				var f1 = this.xclassfield(f,true);
				f1.platforms = new List();
				fields.add(f1);
			}
			return haxe_rtti_CType.CAnonymous(fields);
		case "d":
			var t = null;
			var tx = x.x.firstElement();
			if(tx != null) t = this.xtype(new haxe_xml_Fast(tx));
			return haxe_rtti_CType.CDynamic(t);
		default:
			return this.xerror(x);
		}
	}
	,xtypeparams: function(x) {
		var p = new List();
		var $it0 = x.get_elements();
		while( $it0.hasNext() ) {
			var c = $it0.next();
			p.add(this.xtype(c));
		}
		return p;
	}
	,defplat: function() {
		var l = new List();
		if(this.curplatform != null) l.add(this.curplatform);
		return l;
	}
	,__class__: haxe_rtti_XmlParser
};
var haxe_xml__$Fast_NodeAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.NodeAccess"] = haxe_xml__$Fast_NodeAccess;
haxe_xml__$Fast_NodeAccess.__name__ = ["haxe","xml","_Fast","NodeAccess"];
haxe_xml__$Fast_NodeAccess.prototype = {
	__x: null
	,resolve: function(name) {
		var x = this.__x.elementsNamed(name).next();
		if(x == null) {
			var xname;
			if(this.__x.nodeType == Xml.Document) xname = "Document"; else xname = this.__x.get_nodeName();
			throw new js__$Boot_HaxeError(xname + " is missing element " + name);
		}
		return new haxe_xml_Fast(x);
	}
	,__class__: haxe_xml__$Fast_NodeAccess
};
var haxe_xml__$Fast_AttribAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.AttribAccess"] = haxe_xml__$Fast_AttribAccess;
haxe_xml__$Fast_AttribAccess.__name__ = ["haxe","xml","_Fast","AttribAccess"];
haxe_xml__$Fast_AttribAccess.prototype = {
	__x: null
	,resolve: function(name) {
		if(this.__x.nodeType == Xml.Document) throw new js__$Boot_HaxeError("Cannot access document attribute " + name);
		var v = this.__x.get(name);
		if(v == null) throw new js__$Boot_HaxeError(this.__x.get_nodeName() + " is missing attribute " + name);
		return v;
	}
	,__class__: haxe_xml__$Fast_AttribAccess
};
var haxe_xml__$Fast_HasAttribAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.HasAttribAccess"] = haxe_xml__$Fast_HasAttribAccess;
haxe_xml__$Fast_HasAttribAccess.__name__ = ["haxe","xml","_Fast","HasAttribAccess"];
haxe_xml__$Fast_HasAttribAccess.prototype = {
	__x: null
	,resolve: function(name) {
		if(this.__x.nodeType == Xml.Document) throw new js__$Boot_HaxeError("Cannot access document attribute " + name);
		return this.__x.exists(name);
	}
	,__class__: haxe_xml__$Fast_HasAttribAccess
};
var haxe_xml__$Fast_HasNodeAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.HasNodeAccess"] = haxe_xml__$Fast_HasNodeAccess;
haxe_xml__$Fast_HasNodeAccess.__name__ = ["haxe","xml","_Fast","HasNodeAccess"];
haxe_xml__$Fast_HasNodeAccess.prototype = {
	__x: null
	,resolve: function(name) {
		return this.__x.elementsNamed(name).hasNext();
	}
	,__class__: haxe_xml__$Fast_HasNodeAccess
};
var haxe_xml__$Fast_NodeListAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.NodeListAccess"] = haxe_xml__$Fast_NodeListAccess;
haxe_xml__$Fast_NodeListAccess.__name__ = ["haxe","xml","_Fast","NodeListAccess"];
haxe_xml__$Fast_NodeListAccess.prototype = {
	__x: null
	,resolve: function(name) {
		var l = new List();
		var $it0 = this.__x.elementsNamed(name);
		while( $it0.hasNext() ) {
			var x = $it0.next();
			l.add(new haxe_xml_Fast(x));
		}
		return l;
	}
	,__class__: haxe_xml__$Fast_NodeListAccess
};
var haxe_xml_Fast = function(x) {
	if(x.nodeType != Xml.Document && x.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Invalid nodeType " + x.nodeType);
	this.x = x;
	this.node = new haxe_xml__$Fast_NodeAccess(x);
	this.nodes = new haxe_xml__$Fast_NodeListAccess(x);
	this.att = new haxe_xml__$Fast_AttribAccess(x);
	this.has = new haxe_xml__$Fast_HasAttribAccess(x);
	this.hasNode = new haxe_xml__$Fast_HasNodeAccess(x);
};
$hxClasses["haxe.xml.Fast"] = haxe_xml_Fast;
haxe_xml_Fast.__name__ = ["haxe","xml","Fast"];
haxe_xml_Fast.prototype = {
	x: null
	,node: null
	,nodes: null
	,att: null
	,has: null
	,hasNode: null
	,get_name: function() {
		if(this.x.nodeType == Xml.Document) return "Document"; else return this.x.get_nodeName();
	}
	,get_innerData: function() {
		var it = this.x.iterator();
		if(!it.hasNext()) throw new js__$Boot_HaxeError(this.get_name() + " does not have data");
		var v = it.next();
		var n = it.next();
		if(n != null) {
			if(v.nodeType == Xml.PCData && n.nodeType == Xml.CData && StringTools.trim((function($this) {
				var $r;
				if(v.nodeType == Xml.Document || v.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + v.nodeType);
				$r = v.nodeValue;
				return $r;
			}(this))) == "") {
				var n2 = it.next();
				if(n2 == null || n2.nodeType == Xml.PCData && StringTools.trim((function($this) {
					var $r;
					if(n2.nodeType == Xml.Document || n2.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + n2.nodeType);
					$r = n2.nodeValue;
					return $r;
				}(this))) == "" && it.next() == null) {
					if(n.nodeType == Xml.Document || n.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + n.nodeType);
					return n.nodeValue;
				}
			}
			throw new js__$Boot_HaxeError(this.get_name() + " does not only have data");
		}
		if(v.nodeType != Xml.PCData && v.nodeType != Xml.CData) throw new js__$Boot_HaxeError(this.get_name() + " does not have data");
		if(v.nodeType == Xml.Document || v.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + v.nodeType);
		return v.nodeValue;
	}
	,get_innerHTML: function() {
		var s = new StringBuf();
		var $it0 = this.x.iterator();
		while( $it0.hasNext() ) {
			var x = $it0.next();
			s.add(haxe_xml_Printer.print(x));
		}
		return s.b;
	}
	,get_elements: function() {
		var it = this.x.elements();
		return { hasNext : $bind(it,it.hasNext), next : function() {
			var x = it.next();
			if(x == null) return null;
			return new haxe_xml_Fast(x);
		}};
	}
	,__class__: haxe_xml_Fast
	,__properties__: {get_elements:"get_elements",get_innerHTML:"get_innerHTML",get_innerData:"get_innerData",get_name:"get_name"}
};
var haxe_xml_Parser = function() { };
$hxClasses["haxe.xml.Parser"] = haxe_xml_Parser;
haxe_xml_Parser.__name__ = ["haxe","xml","Parser"];
haxe_xml_Parser.parse = function(str,strict) {
	if(strict == null) strict = false;
	var doc = Xml.createDocument();
	haxe_xml_Parser.doParse(str,strict,0,doc);
	return doc;
};
haxe_xml_Parser.doParse = function(str,strict,p,parent) {
	if(p == null) p = 0;
	var xml = null;
	var state = 1;
	var next = 1;
	var aname = null;
	var start = 0;
	var nsubs = 0;
	var nbrackets = 0;
	var c = str.charCodeAt(p);
	var buf = new StringBuf();
	var escapeNext = 1;
	var attrValQuote = -1;
	while(!(c != c)) {
		switch(state) {
		case 0:
			switch(c) {
			case 10:case 13:case 9:case 32:
				break;
			default:
				state = next;
				continue;
			}
			break;
		case 1:
			switch(c) {
			case 60:
				state = 0;
				next = 2;
				break;
			default:
				start = p;
				state = 13;
				continue;
			}
			break;
		case 13:
			if(c == 60) {
				buf.addSub(str,start,p - start);
				var child = Xml.createPCData(buf.b);
				buf = new StringBuf();
				parent.addChild(child);
				nsubs++;
				state = 0;
				next = 2;
			} else if(c == 38) {
				buf.addSub(str,start,p - start);
				state = 18;
				escapeNext = 13;
				start = p + 1;
			}
			break;
		case 17:
			if(c == 93 && str.charCodeAt(p + 1) == 93 && str.charCodeAt(p + 2) == 62) {
				var child1 = Xml.createCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child1);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 2:
			switch(c) {
			case 33:
				if(str.charCodeAt(p + 1) == 91) {
					p += 2;
					if(HxOverrides.substr(str,p,6).toUpperCase() != "CDATA[") throw new js__$Boot_HaxeError("Expected <![CDATA[");
					p += 5;
					state = 17;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) == 68 || str.charCodeAt(p + 1) == 100) {
					if(HxOverrides.substr(str,p + 2,6).toUpperCase() != "OCTYPE") throw new js__$Boot_HaxeError("Expected <!DOCTYPE");
					p += 8;
					state = 16;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) != 45 || str.charCodeAt(p + 2) != 45) throw new js__$Boot_HaxeError("Expected <!--"); else {
					p += 2;
					state = 15;
					start = p + 1;
				}
				break;
			case 63:
				state = 14;
				start = p;
				break;
			case 47:
				if(parent == null) throw new js__$Boot_HaxeError("Expected node name");
				start = p + 1;
				state = 0;
				next = 10;
				break;
			default:
				state = 3;
				start = p;
				continue;
			}
			break;
		case 3:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(p == start) throw new js__$Boot_HaxeError("Expected node name");
				xml = Xml.createElement(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml);
				nsubs++;
				state = 0;
				next = 4;
				continue;
			}
			break;
		case 4:
			switch(c) {
			case 47:
				state = 11;
				break;
			case 62:
				state = 9;
				break;
			default:
				state = 5;
				start = p;
				continue;
			}
			break;
		case 5:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				var tmp;
				if(start == p) throw new js__$Boot_HaxeError("Expected attribute name");
				tmp = HxOverrides.substr(str,start,p - start);
				aname = tmp;
				if(xml.exists(aname)) throw new js__$Boot_HaxeError("Duplicate attribute");
				state = 0;
				next = 6;
				continue;
			}
			break;
		case 6:
			switch(c) {
			case 61:
				state = 0;
				next = 7;
				break;
			default:
				throw new js__$Boot_HaxeError("Expected =");
			}
			break;
		case 7:
			switch(c) {
			case 34:case 39:
				buf = new StringBuf();
				state = 8;
				start = p + 1;
				attrValQuote = c;
				break;
			default:
				throw new js__$Boot_HaxeError("Expected \"");
			}
			break;
		case 8:
			switch(c) {
			case 38:
				buf.addSub(str,start,p - start);
				state = 18;
				escapeNext = 8;
				start = p + 1;
				break;
			case 62:
				if(strict) throw new js__$Boot_HaxeError("Invalid unescaped " + String.fromCharCode(c) + " in attribute value"); else if(c == attrValQuote) {
					buf.addSub(str,start,p - start);
					var val = buf.b;
					buf = new StringBuf();
					xml.set(aname,val);
					state = 0;
					next = 4;
				}
				break;
			case 60:
				if(strict) throw new js__$Boot_HaxeError("Invalid unescaped " + String.fromCharCode(c) + " in attribute value"); else if(c == attrValQuote) {
					buf.addSub(str,start,p - start);
					var val1 = buf.b;
					buf = new StringBuf();
					xml.set(aname,val1);
					state = 0;
					next = 4;
				}
				break;
			default:
				if(c == attrValQuote) {
					buf.addSub(str,start,p - start);
					var val2 = buf.b;
					buf = new StringBuf();
					xml.set(aname,val2);
					state = 0;
					next = 4;
				}
			}
			break;
		case 9:
			p = haxe_xml_Parser.doParse(str,strict,p,xml);
			start = p;
			state = 1;
			break;
		case 11:
			switch(c) {
			case 62:
				state = 1;
				break;
			default:
				throw new js__$Boot_HaxeError("Expected >");
			}
			break;
		case 12:
			switch(c) {
			case 62:
				if(nsubs == 0) parent.addChild(Xml.createPCData(""));
				return p;
			default:
				throw new js__$Boot_HaxeError("Expected >");
			}
			break;
		case 10:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(start == p) throw new js__$Boot_HaxeError("Expected node name");
				var v = HxOverrides.substr(str,start,p - start);
				if(v != (function($this) {
					var $r;
					if(parent.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + parent.nodeType);
					$r = parent.nodeName;
					return $r;
				}(this))) throw new js__$Boot_HaxeError("Expected </" + (function($this) {
					var $r;
					if(parent.nodeType != Xml.Element) throw "Bad node type, expected Element but found " + parent.nodeType;
					$r = parent.nodeName;
					return $r;
				}(this)) + ">");
				state = 0;
				next = 12;
				continue;
			}
			break;
		case 15:
			if(c == 45 && str.charCodeAt(p + 1) == 45 && str.charCodeAt(p + 2) == 62) {
				var xml1 = Xml.createComment(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml1);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 16:
			if(c == 91) nbrackets++; else if(c == 93) nbrackets--; else if(c == 62 && nbrackets == 0) {
				var xml2 = Xml.createDocType(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml2);
				nsubs++;
				state = 1;
			}
			break;
		case 14:
			if(c == 63 && str.charCodeAt(p + 1) == 62) {
				p++;
				var str1 = HxOverrides.substr(str,start + 1,p - start - 2);
				var xml3 = Xml.createProcessingInstruction(str1);
				parent.addChild(xml3);
				nsubs++;
				state = 1;
			}
			break;
		case 18:
			if(c == 59) {
				var s = HxOverrides.substr(str,start,p - start);
				if(s.charCodeAt(0) == 35) {
					var c1;
					if(s.charCodeAt(1) == 120) c1 = Std.parseInt("0" + HxOverrides.substr(s,1,s.length - 1)); else c1 = Std.parseInt(HxOverrides.substr(s,1,s.length - 1));
					buf.b += String.fromCharCode(c1);
				} else if(!haxe_xml_Parser.escapes.exists(s)) {
					if(strict) throw new js__$Boot_HaxeError("Undefined entity: " + s);
					buf.b += Std.string("&" + s + ";");
				} else buf.add(haxe_xml_Parser.escapes.get(s));
				start = p + 1;
				state = escapeNext;
			} else if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45) && c != 35) {
				if(strict) throw new js__$Boot_HaxeError("Invalid character in entity: " + String.fromCharCode(c));
				buf.b += "&";
				buf.addSub(str,start,p - start);
				p--;
				start = p + 1;
				state = escapeNext;
			}
			break;
		}
		c = StringTools.fastCodeAt(str,++p);
	}
	if(state == 1) {
		start = p;
		state = 13;
	}
	if(state == 13) {
		if(p != start || nsubs == 0) {
			buf.addSub(str,start,p - start);
			var xml4 = Xml.createPCData(buf.b);
			parent.addChild(xml4);
			nsubs++;
		}
		return p;
	}
	if(!strict && state == 18 && escapeNext == 13) {
		buf.b += "&";
		buf.addSub(str,start,p - start);
		var xml5 = Xml.createPCData(buf.b);
		parent.addChild(xml5);
		nsubs++;
		return p;
	}
	throw new js__$Boot_HaxeError("Unexpected end");
};
var haxe_xml_Printer = function(pretty) {
	this.output = new StringBuf();
	this.pretty = pretty;
};
$hxClasses["haxe.xml.Printer"] = haxe_xml_Printer;
haxe_xml_Printer.__name__ = ["haxe","xml","Printer"];
haxe_xml_Printer.print = function(xml,pretty) {
	if(pretty == null) pretty = false;
	var printer = new haxe_xml_Printer(pretty);
	printer.writeNode(xml,"");
	return printer.output.b;
};
haxe_xml_Printer.prototype = {
	output: null
	,pretty: null
	,writeNode: function(value,tabs) {
		var _g = value.nodeType;
		switch(_g) {
		case 2:
			this.output.b += Std.string(tabs + "<![CDATA[");
			this.write(StringTools.trim((function($this) {
				var $r;
				if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + value.nodeType);
				$r = value.nodeValue;
				return $r;
			}(this))));
			this.output.b += "]]>";
			if(this.pretty) this.output.b += "";
			break;
		case 3:
			var commentContent;
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + value.nodeType);
			commentContent = value.nodeValue;
			commentContent = new EReg("[\n\r\t]+","g").replace(commentContent,"");
			commentContent = "<!--" + commentContent + "-->";
			if(tabs == null) this.output.b += "null"; else this.output.b += "" + tabs;
			this.write(StringTools.trim(commentContent));
			if(this.pretty) this.output.b += "";
			break;
		case 6:
			var $it0 = (function($this) {
				var $r;
				if(value.nodeType != Xml.Document && value.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + value.nodeType);
				$r = HxOverrides.iter(value.children);
				return $r;
			}(this));
			while( $it0.hasNext() ) {
				var child = $it0.next();
				this.writeNode(child,tabs);
			}
			break;
		case 0:
			this.output.b += Std.string(tabs + "<");
			this.write((function($this) {
				var $r;
				if(value.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + value.nodeType);
				$r = value.nodeName;
				return $r;
			}(this)));
			var $it1 = value.attributes();
			while( $it1.hasNext() ) {
				var attribute = $it1.next();
				this.output.b += Std.string(" " + attribute + "=\"");
				this.write(StringTools.htmlEscape(value.get(attribute),true));
				this.output.b += "\"";
			}
			if(this.hasChildren(value)) {
				this.output.b += ">";
				if(this.pretty) this.output.b += "";
				var $it2 = (function($this) {
					var $r;
					if(value.nodeType != Xml.Document && value.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + value.nodeType);
					$r = HxOverrides.iter(value.children);
					return $r;
				}(this));
				while( $it2.hasNext() ) {
					var child1 = $it2.next();
					this.writeNode(child1,this.pretty?tabs + "\t":tabs);
				}
				this.output.b += Std.string(tabs + "</");
				this.write((function($this) {
					var $r;
					if(value.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + value.nodeType);
					$r = value.nodeName;
					return $r;
				}(this)));
				this.output.b += ">";
				if(this.pretty) this.output.b += "";
			} else {
				this.output.b += "/>";
				if(this.pretty) this.output.b += "";
			}
			break;
		case 1:
			var nodeValue;
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + value.nodeType);
			nodeValue = value.nodeValue;
			if(nodeValue.length != 0) {
				this.write(tabs + StringTools.htmlEscape(nodeValue));
				if(this.pretty) this.output.b += "";
			}
			break;
		case 5:
			this.write("<?" + (function($this) {
				var $r;
				if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + value.nodeType);
				$r = value.nodeValue;
				return $r;
			}(this)) + "?>");
			break;
		case 4:
			this.write("<!DOCTYPE " + (function($this) {
				var $r;
				if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + value.nodeType);
				$r = value.nodeValue;
				return $r;
			}(this)) + ">");
			break;
		}
	}
	,write: function(input) {
		if(input == null) this.output.b += "null"; else this.output.b += "" + input;
	}
	,hasChildren: function(value) {
		var $it0 = (function($this) {
			var $r;
			if(value.nodeType != Xml.Document && value.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + value.nodeType);
			$r = HxOverrides.iter(value.children);
			return $r;
		}(this));
		while( $it0.hasNext() ) {
			var child = $it0.next();
			var _g = child.nodeType;
			switch(_g) {
			case 0:case 1:
				return true;
			case 2:case 3:
				if(StringTools.ltrim((function($this) {
					var $r;
					if(child.nodeType == Xml.Document || child.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + child.nodeType);
					$r = child.nodeValue;
					return $r;
				}(this))).length != 0) return true;
				break;
			default:
			}
		}
		return false;
	}
	,__class__: haxe_xml_Printer
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
	this.wallHeight = textifician_mapping_IndoorLocationSpecs.DEFAULT_WALL_HEIGHT;
	this.wallThickness = textifician_mapping_IndoorLocationSpecs.DEFAULT_WALL_THICKNESS;
	this.wallStrength = textifician_mapping_IndoorLocationSpecs.DEFAULT_WALL_STRENGTH;
	this.ceilingThickness = textifician_mapping_IndoorLocationSpecs.DEFAULT_WALL_THICKNESS;
	this.ceilingStrength = textifician_mapping_IndoorLocationSpecs.DEFAULT_CEILING_STRENGTH;
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
	,toString: function() {
		return "[IndoorLocationSpecs]";
	}
	,__class__: textifician_mapping_IndoorLocationSpecs
};
var textifician_mapping_LocationDefinition = $hx_exports.textifician.mapping.LocationDefinition = function() {
	this.defaultLighting = 2;
	this.fixtureDensity = 0;
};
$hxClasses["textifician.mapping.LocationDefinition"] = textifician_mapping_LocationDefinition;
textifician_mapping_LocationDefinition.__name__ = ["textifician","mapping","LocationDefinition"];
textifician_mapping_LocationDefinition.create = function(type,label,id) {
	var locDef = new textifician_mapping_LocationDefinition();
	locDef.type = type;
	locDef.label = label;
	locDef.size = 1;
	if(id != null) locDef.id = id;
	return locDef;
};
textifician_mapping_LocationDefinition.createWithMatchingId = function(type,label,id,doSlugify,camelCase) {
	if(camelCase == null) camelCase = false;
	if(doSlugify == null) doSlugify = false;
	var locDef = new textifician_mapping_LocationDefinition();
	locDef.type = type;
	locDef.label = label;
	locDef.size = 1;
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
	,defaultLighting: null
	,generalFixtures: null
	,fixtureDensity: null
	,priorityIndex: null
	,indoorLocationSpecs: null
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
	,cloneOverwrites: function() {
		if(this.defOverwrites == null) return null;
		var obj = { };
		var fields = Reflect.fields(this.defOverwrites);
		var _g = 0;
		while(_g < fields.length) {
			var p = fields[_g];
			++_g;
			Reflect.setField(obj,p,Reflect.field(this.defOverwrites,p));
		}
		return obj;
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
textifician_mapping_TextificianUtil.getPropertyChainObj = function(src,property) {
	var me = new textifician_mapping_PropertyChainHolder();
	me.setupProperty(src,property);
	return me;
};
textifician_mapping_TextificianUtil.applyDynamicProperties = function(obj,target) {
	var fields = Reflect.fields(obj);
	var _g = 0;
	while(_g < fields.length) {
		var p = fields[_g];
		++_g;
		var val = Reflect.field(fields,p);
		if(Reflect.isObject(val)) {
			var tarProp = Reflect.getProperty(target,p);
			if(tarProp != null) textifician_mapping_TextificianUtil.applyDynamicProperties(val,tarProp); else Reflect.setProperty(target,p,null);
		} else Reflect.setProperty(target,p,val);
	}
};
textifician_mapping_TextificianUtil.applyPropertiesOverFromSrc = function(src,obj) {
};
var textifician_mapping_PropertyChainHolder = function() {
	Object.defineProperty(this,"value",{ get : $bind(this,this.get_value), set : $bind(this,this.set_value)});
};
$hxClasses["textifician.mapping.PropertyChainHolder"] = textifician_mapping_PropertyChainHolder;
textifician_mapping_PropertyChainHolder.__name__ = ["textifician","mapping","PropertyChainHolder"];
textifician_mapping_PropertyChainHolder.prototype = {
	_src: null
	,value: null
	,propertyChain: null
	,setupProperty: function(src,property) {
		this._src = src;
		if(property == null) return;
		if(typeof(property) == "string") {
			var str = property;
			this.propertyChain = str.split(".");
		} else this.propertyChain = property;
	}
	,getPropertyChainValue: function() {
		var len = this.propertyChain.length;
		var cur = this._src;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			var propToGet = this.propertyChain[i];
			cur = Reflect.getProperty(cur,propToGet);
			if(cur == null) return null;
		}
		return cur;
	}
	,setPropertyChainValue: function(val) {
		if(this._src == null) this._src = { };
		var cur = this._src;
		var len = this.propertyChain.length;
		var propStack = [];
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			var propToSet = this.propertyChain[i];
			propStack.push(propToSet);
			cur = this.setPropertyOf(cur,propToSet,val,i >= len - 1,propStack);
			if(cur == null) {
				console.log("EXITING null: " + Std.string(val));
				return null;
			}
		}
		return cur;
	}
	,setPropertyOf: function(obj,prop,val,leaf,propStack) {
		if(!leaf) {
			var reflectProp = val = Reflect.getProperty(obj,prop);
			if(reflectProp == null) {
				if(val == null) return null;
				Reflect.setProperty(obj,prop,reflectProp = { });
			}
			val = reflectProp;
		}
		Reflect.setProperty(obj,prop,val);
		return val;
	}
	,getPropertyOf: function(obj,prop) {
		return Reflect.getProperty(obj,prop);
	}
	,get_value: function() {
		if(this.propertyChain != null && this._src != null) return this.getPropertyChainValue(); else return null;
	}
	,set_value: function(v) {
		if(this.propertyChain != null) return this.setPropertyChainValue(v); else return null;
	}
	,__class__: textifician_mapping_PropertyChainHolder
	,__properties__: {set_value:"set_value",get_value:"get_value"}
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
	serializer.useCache = true;
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
		var a = this.graph.addNode(this.graph.createNode(null));
		var b = this.graph.addNode(this.graph.createNode(null));
		this.graph.addGetSingleArc(a,b).val = 331;
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
		locationPacket.defOverwrites = defOverwrites;
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
Xml.Element = 0;
Xml.PCData = 1;
Xml.CData = 2;
Xml.Comment = 3;
Xml.DocType = 4;
Xml.ProcessingInstruction = 5;
Xml.Document = 6;
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
haxe_xml_Parser.escapes = (function($this) {
	var $r;
	var h = new haxe_ds_StringMap();
	if(__map_reserved.lt != null) h.setReserved("lt","<"); else h.h["lt"] = "<";
	if(__map_reserved.gt != null) h.setReserved("gt",">"); else h.h["gt"] = ">";
	if(__map_reserved.amp != null) h.setReserved("amp","&"); else h.h["amp"] = "&";
	if(__map_reserved.quot != null) h.setReserved("quot","\""); else h.h["quot"] = "\"";
	if(__map_reserved.apos != null) h.setReserved("apos","'"); else h.h["apos"] = "'";
	$r = h;
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
textifician_mapping_IndoorLocationSpecs.__meta__ = { fields : { wallHeight : { inspect : null}, wallThickness : { inspect : null}, wallStrength : { inspect : null}, ceilingThickness : { inspect : null}, ceilingStrength : { inspect : null}}};
textifician_mapping_IndoorLocationSpecs.__rtti = "<class path=\"textifician.mapping.IndoorLocationSpecs\" params=\"\">\n\t<DEFAULT_WALL_HEIGHT public=\"1\" expr=\"1\" line=\"17\" static=\"1\">\n\t\t<x path=\"Float\"/>\n\t\t<meta><m n=\":value\"><e>1</e></m></meta>\n\t</DEFAULT_WALL_HEIGHT>\n\t<DEFAULT_WALL_THICKNESS public=\"1\" expr=\"1\" line=\"18\" static=\"1\">\n\t\t<x path=\"Float\"/>\n\t\t<meta><m n=\":value\"><e>1</e></m></meta>\n\t</DEFAULT_WALL_THICKNESS>\n\t<DEFAULT_WALL_STRENGTH public=\"1\" expr=\"1\" line=\"19\" static=\"1\">\n\t\t<x path=\"Float\"/>\n\t\t<meta><m n=\":value\"><e>1</e></m></meta>\n\t</DEFAULT_WALL_STRENGTH>\n\t<DEFAULT_CEILING_THICKNESS public=\"1\" expr=\"1\" line=\"20\" static=\"1\">\n\t\t<x path=\"Float\"/>\n\t\t<meta><m n=\":value\"><e>1</e></m></meta>\n\t</DEFAULT_CEILING_THICKNESS>\n\t<DEFAULT_CEILING_STRENGTH public=\"1\" expr=\"1\" line=\"21\" static=\"1\">\n\t\t<x path=\"Float\"/>\n\t\t<meta><m n=\":value\"><e>1</e></m></meta>\n\t</DEFAULT_CEILING_STRENGTH>\n\t<create public=\"1\" set=\"method\" line=\"42\" static=\"1\">\n\t\t<f a=\"?wallHeight:?wallThickness:?wallStrength:?ceilingThickness:?ceilingStrength\" v=\"-1:-1:-1:-1:-1\">\n\t\t\t<x path=\"Float\"/>\n\t\t\t<x path=\"Float\"/>\n\t\t\t<x path=\"Float\"/>\n\t\t\t<x path=\"Float\"/>\n\t\t\t<x path=\"Float\"/>\n\t\t\t<c path=\"textifician.mapping.IndoorLocationSpecs\"/>\n\t\t</f>\n\t\t<meta><m n=\":value\"><e>{ceilingStrength:-1,ceilingThickness:-1,wallStrength:-1,wallThickness:-1,wallHeight:-1}</e></m></meta>\n\t</create>\n\t<wallHeight public=\"1\">\n\t\t<x path=\"Float\"/>\n\t\t<meta><m n=\"inspect\"/></meta>\n\t</wallHeight>\n\t<wallThickness public=\"1\">\n\t\t<x path=\"Float\"/>\n\t\t<meta><m n=\"inspect\"/></meta>\n\t</wallThickness>\n\t<wallStrength public=\"1\">\n\t\t<x path=\"Float\"/>\n\t\t<meta><m n=\"inspect\"/></meta>\n\t</wallStrength>\n\t<ceilingThickness public=\"1\">\n\t\t<x path=\"Float\"/>\n\t\t<meta><m n=\"inspect\"/></meta>\n\t</ceilingThickness>\n\t<ceilingStrength public=\"1\">\n\t\t<x path=\"Float\"/>\n\t\t<meta><m n=\"inspect\"/></meta>\n\t</ceilingStrength>\n\t<toString public=\"1\" set=\"method\" line=\"53\"><f a=\"\"><c path=\"String\"/></f></toString>\n\t<new public=\"1\" set=\"method\" line=\"23\"><f a=\"\"><x path=\"Void\"/></f></new>\n\t<meta>\n\t\t<m n=\":directlyUsed\"/>\n\t\t<m n=\":rtti\"/>\n\t\t<m n=\":expose\"/>\n\t</meta>\n</class>";
textifician_mapping_IndoorLocationSpecs.DEFAULT_WALL_HEIGHT = 1;
textifician_mapping_IndoorLocationSpecs.DEFAULT_WALL_THICKNESS = 1;
textifician_mapping_IndoorLocationSpecs.DEFAULT_WALL_STRENGTH = 1;
textifician_mapping_IndoorLocationSpecs.DEFAULT_CEILING_THICKNESS = 1;
textifician_mapping_IndoorLocationSpecs.DEFAULT_CEILING_STRENGTH = 1;
textifician_mapping_LocationDefinition.__meta__ = { fields : { id : { inspect : [{ _readonly : true}]}, label : { inspect : null}, description : { inspect : [{ display : "textarea"}]}, flags : { inspect : null, bitmask : ["FLAG"]}, size : { inspect : null}, type : { inspect : [{ display : "selector", choices : [0,1,2]}], choices : ["TYPE"]}, envFlags : { inspect : null, bitmask : ["ENV"]}, defaultLighting : { inspect : [{ display : "range", value : 2}], range : ["LIGHTING"]}, fixtureDensity : { inspect : [{ display : "range"}], range : ["DENSITY"]}, priorityIndex : { inspect : null}, indoorLocationSpecs : { inspect : null}}};
textifician_mapping_LocationDefinition.__rtti = "<class path=\"textifician.mapping.LocationDefinition\" params=\"\">\n\t<FLAG_ENTRANCE public=\"1\" get=\"inline\" set=\"null\" expr=\"(1&lt;&lt;0)\" line=\"12\" static=\"1\">\n\t\t<x path=\"Int\"/>\n\t\t<meta><m n=\":value\"><e><![CDATA[(1<<0)]]></e></m></meta>\n\t</FLAG_ENTRANCE>\n\t<FLAG_DOOR public=\"1\" get=\"inline\" set=\"null\" expr=\"(1&lt;&lt;1)\" line=\"13\" static=\"1\">\n\t\t<x path=\"Int\"/>\n\t\t<meta><m n=\":value\"><e><![CDATA[(1<<1)]]></e></m></meta>\n\t</FLAG_DOOR>\n\t<FLAG_KEY public=\"1\" get=\"inline\" set=\"null\" expr=\"(1&lt;&lt;2)\" line=\"14\" static=\"1\">\n\t\t<x path=\"Int\"/>\n\t\t<meta><m n=\":value\"><e><![CDATA[(1<<2)]]></e></m></meta>\n\t</FLAG_KEY>\n\t<FLAG_LANDMARK public=\"1\" get=\"inline\" set=\"null\" expr=\"(1&lt;&lt;3)\" line=\"15\" static=\"1\">\n\t\t<x path=\"Int\"/>\n\t\t<meta><m n=\":value\"><e><![CDATA[(1<<3)]]></e></m></meta>\n\t</FLAG_LANDMARK>\n\t<FLAG_ENCLOSED public=\"1\" get=\"inline\" set=\"null\" expr=\"(1&lt;&lt;4)\" line=\"16\" static=\"1\">\n\t\t<x path=\"Int\"/>\n\t\t<meta><m n=\":value\"><e><![CDATA[(1<<4)]]></e></m></meta>\n\t</FLAG_ENCLOSED>\n\t<TYPE_POINT public=\"1\" get=\"inline\" set=\"null\" expr=\"0\" line=\"18\" static=\"1\">\n\t\t<x path=\"Int\"/>\n\t\t<meta><m n=\":value\"><e>0</e></m></meta>\n\t</TYPE_POINT>\n\t<TYPE_PATH public=\"1\" get=\"inline\" set=\"null\" expr=\"1\" line=\"19\" static=\"1\">\n\t\t<x path=\"Int\"/>\n\t\t<meta><m n=\":value\"><e>1</e></m></meta>\n\t</TYPE_PATH>\n\t<TYPE_REGION public=\"1\" get=\"inline\" set=\"null\" expr=\"2\" line=\"20\" static=\"1\">\n\t\t<x path=\"Int\"/>\n\t\t<meta><m n=\":value\"><e>2</e></m></meta>\n\t</TYPE_REGION>\n\t<ENV_WALL_1 public=\"1\" get=\"inline\" set=\"null\" expr=\"(1&lt;&lt;0)\" line=\"22\" static=\"1\">\n\t\t<x path=\"Int\"/>\n\t\t<meta><m n=\":value\"><e><![CDATA[(1<<0)]]></e></m></meta>\n\t</ENV_WALL_1>\n\t<ENV_WALL_2 public=\"1\" get=\"inline\" set=\"null\" expr=\"(1&lt;&lt;1)\" line=\"23\" static=\"1\">\n\t\t<x path=\"Int\"/>\n\t\t<meta><m n=\":value\"><e><![CDATA[(1<<1)]]></e></m></meta>\n\t</ENV_WALL_2>\n\t<ENV_CEILING_1 public=\"1\" get=\"inline\" set=\"null\" expr=\"(1&lt;&lt;2)\" line=\"24\" static=\"1\">\n\t\t<x path=\"Int\"/>\n\t\t<meta><m n=\":value\"><e><![CDATA[(1<<2)]]></e></m></meta>\n\t</ENV_CEILING_1>\n\t<ENV_CEILING_2 public=\"1\" get=\"inline\" set=\"null\" expr=\"(1&lt;&lt;3)\" line=\"25\" static=\"1\">\n\t\t<x path=\"Int\"/>\n\t\t<meta><m n=\":value\"><e><![CDATA[(1<<3)]]></e></m></meta>\n\t</ENV_CEILING_2>\n\t<LIGHTING_NONE_OR_OUT public=\"1\" get=\"inline\" set=\"null\" expr=\"0\" line=\"29\" static=\"1\">\n\t\t<x path=\"Int\"/>\n\t\t<meta><m n=\":value\"><e>0</e></m></meta>\n\t</LIGHTING_NONE_OR_OUT>\n\t<LIGHTING_DIM public=\"1\" get=\"inline\" set=\"null\" expr=\"1\" line=\"30\" static=\"1\">\n\t\t<x path=\"Int\"/>\n\t\t<meta><m n=\":value\"><e>1</e></m></meta>\n\t</LIGHTING_DIM>\n\t<LIGHTING_NORMAL public=\"1\" get=\"inline\" set=\"null\" expr=\"2\" line=\"31\" static=\"1\">\n\t\t<x path=\"Int\"/>\n\t\t<meta><m n=\":value\"><e>2</e></m></meta>\n\t</LIGHTING_NORMAL>\n\t<LIGHTING_BRIGHT public=\"1\" get=\"inline\" set=\"null\" expr=\"3\" line=\"32\" static=\"1\">\n\t\t<x path=\"Int\"/>\n\t\t<meta><m n=\":value\"><e>3</e></m></meta>\n\t</LIGHTING_BRIGHT>\n\t<DENSITY_NONE public=\"1\" get=\"inline\" set=\"null\" expr=\"0\" line=\"34\" static=\"1\">\n\t\t<x path=\"Int\"/>\n\t\t<meta><m n=\":value\"><e>0</e></m></meta>\n\t</DENSITY_NONE>\n\t<DENSITY_VERY_SPARSE public=\"1\" get=\"inline\" set=\"null\" expr=\"1\" line=\"35\" static=\"1\">\n\t\t<x path=\"Int\"/>\n\t\t<meta><m n=\":value\"><e>1</e></m></meta>\n\t</DENSITY_VERY_SPARSE>\n\t<DENSITY_SPARSE public=\"1\" get=\"inline\" set=\"null\" expr=\"2\" line=\"36\" static=\"1\">\n\t\t<x path=\"Int\"/>\n\t\t<meta><m n=\":value\"><e>2</e></m></meta>\n\t</DENSITY_SPARSE>\n\t<DENSITY_AVERAGE public=\"1\" get=\"inline\" set=\"null\" expr=\"3\" line=\"37\" static=\"1\">\n\t\t<x path=\"Int\"/>\n\t\t<meta><m n=\":value\"><e>3</e></m></meta>\n\t</DENSITY_AVERAGE>\n\t<DENSITY_DENSE public=\"1\" get=\"inline\" set=\"null\" expr=\"4\" line=\"38\" static=\"1\">\n\t\t<x path=\"Int\"/>\n\t\t<meta><m n=\":value\"><e>4</e></m></meta>\n\t</DENSITY_DENSE>\n\t<DENSITY_VERY_DENSE public=\"1\" get=\"inline\" set=\"null\" expr=\"5\" line=\"39\" static=\"1\">\n\t\t<x path=\"Int\"/>\n\t\t<meta><m n=\":value\"><e>5</e></m></meta>\n\t</DENSITY_VERY_DENSE>\n\t<SHELTER_NONE public=\"1\" get=\"inline\" set=\"null\" expr=\"0\" line=\"41\" static=\"1\">\n\t\t<x path=\"Int\"/>\n\t\t<meta><m n=\":value\"><e>0</e></m></meta>\n\t</SHELTER_NONE>\n\t<SHELTER_SPARSE public=\"1\" get=\"inline\" set=\"null\" expr=\"1\" line=\"42\" static=\"1\">\n\t\t<x path=\"Int\"/>\n\t\t<meta><m n=\":value\"><e>1</e></m></meta>\n\t</SHELTER_SPARSE>\n\t<SHELTER_HALF public=\"1\" get=\"inline\" set=\"null\" expr=\"2\" line=\"43\" static=\"1\">\n\t\t<x path=\"Int\"/>\n\t\t<meta><m n=\":value\"><e>2</e></m></meta>\n\t</SHELTER_HALF>\n\t<SHELTER_FULL public=\"1\" get=\"inline\" set=\"null\" expr=\"3\" line=\"44\" static=\"1\">\n\t\t<x path=\"Int\"/>\n\t\t<meta><m n=\":value\"><e>3</e></m></meta>\n\t</SHELTER_FULL>\n\t<create public=\"1\" set=\"method\" line=\"69\" static=\"1\">\n\t\t<f a=\"type:label:?id\" v=\"::null\">\n\t\t\t<x path=\"Int\"/>\n\t\t\t<c path=\"String\"/>\n\t\t\t<c path=\"String\"/>\n\t\t\t<c path=\"textifician.mapping.LocationDefinition\"/>\n\t\t</f>\n\t\t<meta><m n=\":value\"><e>{id:null}</e></m></meta>\n\t</create>\n\t<createWithMatchingId public=\"1\" set=\"method\" line=\"90\" static=\"1\">\n\t\t<f a=\"type:label:?id:?doSlugify:?camelCase\" v=\"::null:false:false\">\n\t\t\t<x path=\"Int\"/>\n\t\t\t<c path=\"String\"/>\n\t\t\t<c path=\"String\"/>\n\t\t\t<x path=\"Bool\"/>\n\t\t\t<x path=\"Bool\"/>\n\t\t\t<c path=\"textifician.mapping.LocationDefinition\"/>\n\t\t</f>\n\t\t<meta><m n=\":value\"><e>{camelCase:false,doSlugify:false,id:null}</e></m></meta>\n\t</createWithMatchingId>\n\t<slugify public=\"1\" get=\"inline\" set=\"null\" line=\"110\" static=\"1\"><f a=\"label\">\n\t<c path=\"String\"/>\n\t<c path=\"String\"/>\n</f></slugify>\n\t<camelizeSlug public=\"1\" get=\"inline\" set=\"null\" line=\"132\" static=\"1\"><f a=\"slug\">\n\t<c path=\"String\"/>\n\t<c path=\"String\"/>\n</f></camelizeSlug>\n\t<id public=\"1\">\n\t\t<c path=\"String\"/>\n\t\t<meta><m n=\"inspect\"><e>{_readonly:true}</e></m></meta>\n\t</id>\n\t<label public=\"1\">\n\t\t<c path=\"String\"/>\n\t\t<meta><m n=\"inspect\"/></meta>\n\t</label>\n\t<description public=\"1\">\n\t\t<c path=\"String\"/>\n\t\t<meta><m n=\"inspect\"><e>{display:\"textarea\"}</e></m></meta>\n\t</description>\n\t<flags public=\"1\">\n\t\t<x path=\"Int\"/>\n\t\t<meta>\n\t\t\t<m n=\"inspect\"/>\n\t\t\t<m n=\"bitmask\"><e>\"FLAG\"</e></m>\n\t\t</meta>\n\t</flags>\n\t<size public=\"1\">\n\t\t<x path=\"Float\"/>\n\t\t<meta><m n=\"inspect\"/></meta>\n\t</size>\n\t<type public=\"1\">\n\t\t<x path=\"Int\"/>\n\t\t<meta>\n\t\t\t<m n=\"inspect\"><e>{display:\"selector\",choices:[0,1,2]}</e></m>\n\t\t\t<m n=\"choices\"><e>\"TYPE\"</e></m>\n\t\t</meta>\n\t</type>\n\t<envFlags public=\"1\">\n\t\t<x path=\"Int\"/>\n\t\t<meta>\n\t\t\t<m n=\"inspect\"/>\n\t\t\t<m n=\"bitmask\"><e>\"ENV\"</e></m>\n\t\t</meta>\n\t</envFlags>\n\t<defaultLighting public=\"1\">\n\t\t<x path=\"Int\"/>\n\t\t<meta>\n\t\t\t<m n=\"inspect\"><e>{display:\"range\",value:2}</e></m>\n\t\t\t<m n=\"range\"><e>\"LIGHTING\"</e></m>\n\t\t</meta>\n\t</defaultLighting>\n\t<generalFixtures public=\"1\"><c path=\"Array\"><c path=\"String\"/></c></generalFixtures>\n\t<fixtureDensity public=\"1\">\n\t\t<x path=\"Int\"/>\n\t\t<meta>\n\t\t\t<m n=\"inspect\"><e>{display:\"range\"}</e></m>\n\t\t\t<m n=\"range\"><e>\"DENSITY\"</e></m>\n\t\t</meta>\n\t</fixtureDensity>\n\t<priorityIndex public=\"1\">\n\t\t<x path=\"Int\"/>\n\t\t<meta><m n=\"inspect\"/></meta>\n\t</priorityIndex>\n\t<indoorLocationSpecs public=\"1\">\n\t\t<c path=\"textifician.mapping.IndoorLocationSpecs\"/>\n\t\t<meta><m n=\"inspect\"/></meta>\n\t</indoorLocationSpecs>\n\t<setSize public=\"1\" set=\"method\" line=\"81\"><f a=\"val\">\n\t<x path=\"Float\"/>\n\t<c path=\"textifician.mapping.LocationDefinition\"/>\n</f></setSize>\n\t<setDescription public=\"1\" set=\"method\" line=\"85\"><f a=\"val\">\n\t<c path=\"String\"/>\n\t<c path=\"textifician.mapping.LocationDefinition\"/>\n</f></setDescription>\n\t<makeDoor public=\"1\" set=\"method\" line=\"148\">\n\t\t<f a=\"?val:?implyEntrance\" v=\"true:true\">\n\t\t\t<x path=\"Bool\"/>\n\t\t\t<x path=\"Bool\"/>\n\t\t\t<c path=\"textifician.mapping.LocationDefinition\"/>\n\t\t</f>\n\t\t<meta><m n=\":value\"><e>{implyEntrance:true,val:true}</e></m></meta>\n\t</makeDoor>\n\t<makeEntrance public=\"1\" set=\"method\" line=\"159\">\n\t\t<f a=\"?val\" v=\"true\">\n\t\t\t<x path=\"Bool\"/>\n\t\t\t<c path=\"textifician.mapping.LocationDefinition\"/>\n\t\t</f>\n\t\t<meta><m n=\":value\"><e>{val:true}</e></m></meta>\n\t</makeEntrance>\n\t<makeKey public=\"1\" set=\"method\" line=\"169\">\n\t\t<f a=\"?val\" v=\"true\">\n\t\t\t<x path=\"Bool\"/>\n\t\t\t<c path=\"textifician.mapping.LocationDefinition\"/>\n\t\t</f>\n\t\t<meta><m n=\":value\"><e>{val:true}</e></m></meta>\n\t</makeKey>\n\t<makeLandmark public=\"1\" set=\"method\" line=\"179\">\n\t\t<f a=\"?val\" v=\"true\">\n\t\t\t<x path=\"Bool\"/>\n\t\t\t<c path=\"textifician.mapping.LocationDefinition\"/>\n\t\t</f>\n\t\t<meta><m n=\":value\"><e>{val:true}</e></m></meta>\n\t</makeLandmark>\n\t<resetShelterFlags get=\"inline\" set=\"null\" line=\"189\"><f a=\"\"><x path=\"Void\"/></f></resetShelterFlags>\n\t<resetShelterWallFlags get=\"inline\" set=\"null\" line=\"192\"><f a=\"\"><x path=\"Void\"/></f></resetShelterWallFlags>\n\t<resetShelterCeilingFlags get=\"inline\" set=\"null\" line=\"195\"><f a=\"\"><x path=\"Void\"/></f></resetShelterCeilingFlags>\n\t<makeFullyIndoor public=\"1\" set=\"method\" line=\"199\"><f a=\"\"><c path=\"textifician.mapping.LocationDefinition\"/></f></makeFullyIndoor>\n\t<makeFullyOutdoor public=\"1\" set=\"method\" line=\"205\"><f a=\"\"><c path=\"textifician.mapping.LocationDefinition\"/></f></makeFullyOutdoor>\n\t<setupIndoorLocationSpecs public=\"1\" set=\"method\" line=\"210\"><f a=\"locationSpecs\">\n\t<c path=\"textifician.mapping.IndoorLocationSpecs\"/>\n\t<c path=\"textifician.mapping.LocationDefinition\"/>\n</f></setupIndoorLocationSpecs>\n\t<setupShelterAmounts public=\"1\" set=\"method\" line=\"221\"><f a=\"wallAmount:ceilingAmount\">\n\t<x path=\"Int\"/>\n\t<x path=\"Int\"/>\n\t<c path=\"textifician.mapping.LocationDefinition\"/>\n</f></setupShelterAmounts>\n\t<setWallAmount public=\"1\" set=\"method\" line=\"228\"><f a=\"wallAmount\">\n\t<x path=\"Int\"/>\n\t<c path=\"textifician.mapping.LocationDefinition\"/>\n</f></setWallAmount>\n\t<setCeilingAmount public=\"1\" set=\"method\" line=\"234\"><f a=\"ceilingAmount\">\n\t<x path=\"Int\"/>\n\t<c path=\"textifician.mapping.LocationDefinition\"/>\n</f></setCeilingAmount>\n\t<new public=\"1\" set=\"method\" line=\"240\"><f a=\"\"><x path=\"Void\"/></f></new>\n\t<meta>\n\t\t<m n=\":directlyUsed\"/>\n\t\t<m n=\":rtti\"/>\n\t\t<m n=\":expose\"/>\n\t</meta>\n</class>";
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
textifician_mapping_LocationDefinition.LIGHTING_NONE_OR_OUT = 0;
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
