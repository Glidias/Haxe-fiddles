(function () { "use strict";
var Main = function() { }
Main.__name__ = true;
Main.main = function() {
	new TestExp();
	tros.chess.ChessRuleFlags;
	de.polygonal.ds.Graph;
	textifician.mapping.LocationPacket;
	textifician.mapping.LocationDefinition;
	textifician.mapping.TextificianWorld;
	textifician.mapping.TextificianUtil;
}
var ArcSplit = function() {
};
ArcSplit.__name__ = true;
ArcSplit.prototype = {
	getCount: function() {
		var count = 1;
		var s = this.next;
		while(s != null) {
			count++;
			s = s.next;
		}
		return count;
	}
	,performSplitting2: function(arcMinAng,arcMaxAng) {
		var checkS = null;
		var headS = null;
		var s = this;
		var lastS = null;
		while(s != null) {
			var nextS = s.next;
			checkS = s.splitBy(arcMinAng,arcMaxAng);
			if(checkS != null) {
				s.next = null;
				if(headS != null) lastS.next = checkS; else headS = checkS;
				if(checkS.next != null) {
					s = checkS.next;
					checkS.next.next = nextS;
				} else {
					s = checkS;
					checkS.next = nextS;
				}
			}
			lastS = s;
			s = nextS;
		}
		if(headS == null && checkS != null) headS = checkS;
		return headS;
	}
	,performSplitting: function(arcMinAng,arcMaxAng) {
		var headS = this;
		if(arcMinAng < 0) {
			if(arcMaxAng >= 0) {
				headS = headS.performSplitting2(3.1415926535897932384626433832795 * 2 + arcMinAng,3.1415926535897932384626433832795 * 2);
				if(headS != null) headS = headS.performSplitting2(0,arcMaxAng);
			} else headS = headS.performSplitting2(3.1415926535897932384626433832795 * 2 + arcMinAng,3.1415926535897932384626433832795 * 2 + arcMaxAng);
		} else headS = headS.performSplitting2(arcMinAng,arcMaxAng <= 0?3.1415926535897932384626433832795 * 2 + arcMaxAng:arcMaxAng);
		return headS;
	}
	,splitBy: function(splitLowLimit,splitHighLimit) {
		var newSplit = null;
		var lowLimit = this.from;
		var highLimit = this.to;
		if(splitLowLimit > highLimit || splitHighLimit < lowLimit) return this;
		if(splitLowLimit <= lowLimit && splitHighLimit >= highLimit) {
			console.log("Truncate:: Split till no more.");
			return null;
		}
		if(splitLowLimit > lowLimit && splitHighLimit < highLimit) {
			newSplit = new ArcSplit();
			newSplit.from = lowLimit;
			newSplit.to = splitLowLimit;
			newSplit.next = new ArcSplit();
			newSplit.next.setFromTo(splitHighLimit,highLimit);
		} else if(splitLowLimit <= lowLimit) {
			newSplit = new ArcSplit();
			newSplit.from = splitHighLimit;
			newSplit.to = highLimit;
		} else {
			newSplit = new ArcSplit();
			newSplit.from = lowLimit;
			newSplit.to = splitLowLimit;
		}
		return newSplit;
	}
	,setFromTo: function(fromAng,toAng) {
		this.from = fromAng;
		this.to = toAng;
	}
	,getPreviewApprox: function(val) {
		return Math.round(val * 57.295779513082320876798154814105);
	}
	,getDegApprox: function(val) {
		return Math.round(val * 57.295779513082320876798154814105);
	}
	,toString: function() {
		return "[ArcSplit " + Math.round(this.from * 57.295779513082320876798154814105) + "->" + Math.round(this.to * 57.295779513082320876798154814105) + "]";
	}
	,asDefault: function() {
		this.from = 0;
		this.to = 3.1415926535897932384626433832795 * 2;
		return this;
	}
	,__class__: ArcSplit
}
var TestExp = function() {
	this.canvas = js.Browser.document.getElementById("nanoFL_canvas");
	this.stage = new createjs.Stage(this.canvas);
	this.shape = new createjs.Shape();
	this.stage.addChild(this.shape);
	this.circleCont = new createjs.Container();
	this.stage.addChild(this.circleCont);
	this.arcs = new createjs.Shape();
	this.stage.addChild(this.arcs);
	this.shape.graphics.beginStroke("red").rect(-100,-50,200,100).endStroke();
	this.shape.x = 400;
	this.shape.y = 200;
	this.circles = [];
	this.circlesSplits = [];
	js.Browser.window.requestAnimationFrame($bind(this,this.requestFrame));
	this.addCircle(20,20,8.,"#000000");
	this.addCircle(50,20,8.,"#000000");
	this.addCircle(70,20,8.,"#000000");
	this.addCircle(90,20,8.,"#000000");
};
TestExp.__name__ = true;
TestExp.prototype = {
	requestFrame: function(time) {
		var matrix = this.shape.getMatrix();
		var m = new createjs.Matrix2D().appendTransform(0,0,1,1,1,0,0);
		matrix.appendMatrix(m);
		this.shape.set(matrix.decompose());
		this.drawExposedArcs();
		this.stage.update();
		js.Browser.window.requestAnimationFrame($bind(this,this.requestFrame));
		return true;
	}
	,drawExposedArcs: function() {
		var c1;
		var a;
		var baseAng;
		var arc;
		var len = this.circles.length;
		var g = this.arcs.graphics;
		g.clear();
		var limit;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.circlesSplits[i] = new ArcSplit().asDefault();
		}
		limit = len;
		var _g = 0;
		while(_g < limit) {
			var i = _g++;
			c1 = this.circles[i];
			var _g1 = i + 1;
			while(_g1 < len) {
				var k = _g1++;
				var c2 = this.circles[k];
				var ang;
				ang = this.getIntersectionArc(c1.x,c1.y,32,c2.x,c2.y,32);
				if(ang != 0) {
					var x;
					var y;
					var nx = this.offsetX / this.cDist;
					var ny = this.offsetY / this.cDist;
					arc = this.circlesSplits[i];
					baseAng = Math.atan2(this.offsetY,this.offsetX);
					if(arc != null) this.circlesSplits[i] = arc = arc.performSplitting(baseAng - ang,baseAng + ang);
					ang = this.getIntersectionArc(c2.x,c2.y,32,c1.x,c1.y,32);
					arc = this.circlesSplits[k];
					baseAng = Math.atan2(this.offsetY,this.offsetX);
					if(arc != null) this.circlesSplits[k] = arc = arc.performSplitting(baseAng - ang,baseAng + ang);
					nx *= -1;
					ny *= -1;
				}
			}
			g.clear();
			var _g1 = 0;
			while(_g1 < limit) {
				var i1 = _g1++;
				c1 = this.circles[i1];
				arc = this.circlesSplits[i1];
				a = arc;
				while(a != null) {
					g.beginStroke("#ffff00");
					g.arc(c1.x,c1.y,32,a.from,a.to,false);
					g.endStroke();
					a = a.next;
				}
			}
		}
	}
	,addCircle: function(x,y,r,fill) {
		var circle = new createjs.Shape();
		circle.graphics.beginFill(fill).drawCircle(0,0,r);
		circle.x = x;
		circle.y = y;
		circle.name = "circle";
		circle.on("pressmove",$bind(this,this.drag));
		this.circleCont.addChild(circle);
		this.circles.push(circle);
		this.circlesSplits.push(null);
		circle.graphics.beginFill(fill).drawCircle(0,0,r).endFill();
	}
	,drag: function(evt) {
		if(evt.target.name == "square") {
			evt.target.x = evt.stageX - 16;
			evt.target.y = evt.stageY - 16;
		} else {
			evt.target.x = evt.stageX;
			evt.target.y = evt.stageY;
		}
		this.stage.update();
	}
	,divideCircle: function(circle,clipFromArc,clipAmountAng) {
		var s = circle;
		while(s != null) {
			var nextArc = circle.next;
			s = nextArc;
		}
	}
	,getIntersectionArc: function(x1,y1,R,x2,y2,r) {
		var x = x2 - x1;
		var y = y2 - y1;
		this.offsetX = x;
		this.offsetY = y;
		var rr = R + r;
		if(x * x + y * y >= rr * rr) return 0;
		var d = Math.sqrt(x * x + y * y);
		this.cDist = d;
		x = d * d - r * r + R * R;
		x /= 2 * d;
		this.xDist = x;
		var a = 1 / d * Math.sqrt((-d + r - R) * (-d - r + R) * (-d + r + R) * (d + r + R));
		this.aDist = a;
		return Math.atan2(0.5 * a,x);
	}
	,__class__: TestExp
}
var IMap = function() { }
IMap.__name__ = true;
var Std = function() { }
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
var Type = function() { }
Type.__name__ = true;
Type.createInstance = function(cl,args) {
	switch(args.length) {
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
		throw "Too many arguments";
	}
	return null;
}
var de = {}
de.polygonal = {}
de.polygonal.ds = {}
de.polygonal.ds.ArrayUtil = function() { }
de.polygonal.ds.ArrayUtil.__name__ = true;
de.polygonal.ds.ArrayUtil.alloc = function(x) {
	var a;
	a = new Array(x);
	return a;
}
de.polygonal.ds.ArrayUtil.shrink = function(a,x) {
	if(a.length > x) a.length = x;
	return a;
}
de.polygonal.ds.ArrayUtil.copy = function(src,dst,min,max) {
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
}
de.polygonal.ds.ArrayUtil.fill = function(dst,x,k) {
	if(k == null) k = -1;
	if(k == -1) k = dst.length;
	var _g = 0;
	while(_g < k) {
		var i = _g++;
		dst[i] = x;
	}
}
de.polygonal.ds.ArrayUtil.assign = function(dst,C,args,k) {
	if(k == null) k = -1;
	if(k == -1) k = dst.length;
	if(args == null) args = [];
	var _g = 0;
	while(_g < k) {
		var i = _g++;
		dst[i] = Type.createInstance(C,args);
	}
}
de.polygonal.ds.ArrayUtil.memmove = function(a,destination,source,n) {
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
		var i = source;
		var j = destination;
		var _g = 0;
		while(_g < n) {
			var k = _g++;
			a[j] = a[i];
			i++;
			j++;
		}
	}
}
de.polygonal.ds.ArrayUtil.bsearchComparator = function(a,x,min,max,comparator) {
	var l = min, m, h = max + 1;
	while(l < h) {
		m = l + (h - l >> 1);
		if(comparator(a[m],x) < 0) l = m + 1; else h = m;
	}
	if(l <= max && comparator(a[l],x) == 0) return l; else return ~l;
}
de.polygonal.ds.ArrayUtil.bsearchInt = function(a,x,min,max) {
	var l = min, m, h = max + 1;
	while(l < h) {
		m = l + (h - l >> 1);
		if(a[m] < x) l = m + 1; else h = m;
	}
	if(l <= max && a[l] == x) return l; else return ~l;
}
de.polygonal.ds.ArrayUtil.bsearchFloat = function(a,x,min,max) {
	var l = min, m, h = max + 1;
	while(l < h) {
		m = l + (h - l >> 1);
		if(a[m] < x) l = m + 1; else h = m;
	}
	if(l <= max && a[l] == x) return l; else return ~l;
}
de.polygonal.ds.ArrayUtil.shuffle = function(a,rval) {
	var s = a.length;
	if(rval == null) {
		var m = Math;
		while(--s > 1) {
			var i = m.random() * s | 0;
			var t = a[s];
			a[s] = a[i];
			a[i] = t;
		}
	} else {
		var j = 0;
		while(--s > 1) {
			var i = rval[j++] * s | 0;
			var t = a[s];
			a[s] = a[i];
			a[i] = t;
		}
	}
}
de.polygonal.ds.ArrayUtil.sortRange = function(a,compare,useInsertionSort,first,count) {
	var k = a.length;
	if(k > 1) {
		if(useInsertionSort) de.polygonal.ds.ArrayUtil._insertionSort(a,first,count,compare); else de.polygonal.ds.ArrayUtil._quickSort(a,first,count,compare);
	}
}
de.polygonal.ds.ArrayUtil.quickPerm = function(n) {
	var results = [];
	var a = [];
	var p = [];
	var i, j, tmp;
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
}
de.polygonal.ds.ArrayUtil.equals = function(a,b) {
	if(a.length != b.length) return false;
	var _g1 = 0, _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(a[i] != b[i]) return false;
	}
	return true;
}
de.polygonal.ds.ArrayUtil.split = function(a,n,k) {
	var output = new Array();
	var b = null;
	var _g = 0;
	while(_g < n) {
		var i = _g++;
		if(i % k == 0) output[i / k | 0] = b = [];
		b.push(a[i]);
	}
	return output;
}
de.polygonal.ds.ArrayUtil._insertionSort = function(a,first,k,cmp) {
	var _g1 = first + 1, _g = first + k;
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
}
de.polygonal.ds.ArrayUtil._quickSort = function(a,first,k,cmp) {
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
		if(t < 0 && cmp(t0,t1) < 0) mid = cmp(t1,t2) < 0?i1:i2; else if(cmp(t1,t0) < 0 && cmp(t1,t2) < 0) mid = t < 0?i0:i2; else mid = cmp(t2,t0) < 0?i1:i0;
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
		de.polygonal.ds.ArrayUtil._quickSort(a,first,lo - first,cmp);
		de.polygonal.ds.ArrayUtil._quickSort(a,lo + 1,last - lo,cmp);
	}
}
de.polygonal.ds.Hashable = function() { }
de.polygonal.ds.Hashable.__name__ = true;
de.polygonal.ds.Hashable.prototype = {
	__class__: de.polygonal.ds.Hashable
}
de.polygonal.ds.Collection = function() { }
de.polygonal.ds.Collection.__name__ = true;
de.polygonal.ds.Collection.__interfaces__ = [de.polygonal.ds.Hashable];
de.polygonal.ds.Collection.prototype = {
	__class__: de.polygonal.ds.Collection
}
de.polygonal.ds.Graph = function(maxSize) {
	if(maxSize == null) maxSize = -1;
	this.maxSize = -1;
	this.clear();
	this._size = 0;
	this._iterator = null;
	this.autoClearMarks = false;
	this.key = de.polygonal.ds.HashKey._counter++;
	this.reuseIterator = false;
};
de.polygonal.ds.Graph.__name__ = true;
de.polygonal.ds.Graph.__interfaces__ = [de.polygonal.ds.Collection];
de.polygonal.ds.Graph.prototype = {
	_DFSRecursiveProcess: function(node,process,preflight,userData) {
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
	,clone: function(assign,copier) {
		if(assign == null) assign = true;
		var copy = new de.polygonal.ds.Graph(this.maxSize);
		if(this._nodeList == null) return copy;
		var t = new Array();
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
				var m = copy.addNode(copy.createNode(c.clone()));
				t[i++] = m;
				n = n.next;
			}
		} else while(n != null) {
			var m = copy.addNode(copy.createNode(copier(n.val)));
			t[i++] = m;
			n = n.next;
		}
		i = 0;
		n = this._nodeList;
		while(n != null) {
			var m = t[i++];
			var a = n.arcList;
			while(a != null) {
				m.addArc(a.node,a.cost);
				a = a.next;
			}
			n = n.next;
		}
		return copy;
	}
	,toArray: function() {
		var a = de.polygonal.ds.ArrayUtil.alloc(this._size);
		var node = this._nodeList;
		while(node != null) {
			a.push(node.val);
			node = node.next;
		}
		return a;
	}
	,isEmpty: function() {
		return this._size == 0;
	}
	,size: function() {
		return this._size;
	}
	,arcIterator: function() {
		return new de.polygonal.ds.GraphArcIterator(this);
	}
	,nodeIterator: function() {
		return new de.polygonal.ds.GraphNodeIterator(this);
	}
	,iterator: function() {
		if(this.reuseIterator) {
			if(this._iterator == null) this._iterator = new de.polygonal.ds.GraphIterator(this); else this._iterator.reset();
			return this._iterator;
		} else return new de.polygonal.ds.GraphIterator(this);
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
		this._stack = new Array();
		this._que = new Array();
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
	,contains: function(x) {
		var found = false;
		var node = this._nodeList;
		while(node != null) {
			if(node.val == x) return true;
			node = node.next;
		}
		return false;
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
		var _g1 = 0, _g = this._stack.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._stack[i] = null;
		}
		this._stack = null;
		var _g1 = 0, _g = this._que.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._que[i] = null;
		}
		this._que = null;
		this._iterator = null;
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
				var n = this._que[front];
				if(!process(n,true,userData)) return;
				while(c > 0) {
					n = this._que[front];
					if(!process(n,false,userData)) return;
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
							if(process(m,true,userData)) this._que[c++ + front] = m;
						}
						a = a.next;
					}
					front++;
					c--;
				}
			}
		} else if(process == null) {
			var v = null;
			while(c > 0) {
				var n = this._que[front];
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
					m.depth = n.depth + 1;
					m.parent = n.parent;
					if(m.depth <= maxDepth) this._que[c++ + front] = m;
					a = a.next;
				}
				front++;
				c--;
			}
		} else while(c > 0) {
			var n = this._que[front];
			if(n.depth > maxDepth) continue;
			if(!process(n,false,userData)) return;
			var a = n.arcList;
			while(a != null) {
				var m = a.node;
				if(m.marked) {
					a = a.next;
					continue;
				}
				m.marked = true;
				m.depth = n.depth + 1;
				m.parent = n.parent;
				if(m.depth <= maxDepth) this._que[c++ + front] = m;
				a = a.next;
			}
			front++;
			c--;
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
				var n = this._que[front];
				if(!process(n,true,userData)) return;
				while(c > 0) {
					n = this._que[front];
					if(!process(n,false,userData)) return;
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
						if(process(m,true,userData)) this._que[c++ + front] = m;
						a = a.next;
					}
					front++;
					c--;
				}
			}
		} else if(process == null) {
			var v = null;
			while(c > 0) {
				var n = this._que[front];
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
					this._que[c++ + front] = m;
					a = a.next;
				}
				front++;
				c--;
			}
		} else while(c > 0) {
			var n = this._que[front];
			if(!process(n,false,userData)) return;
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
				this._que[c++ + front] = m;
				a = a.next;
			}
			front++;
			c--;
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
					var v = null;
					var n = this._stack[0];
					v = n.val;
					if(!v.visit(true,userData)) return;
					while(c > 0) {
						var n1 = this._stack[--c];
						if(n1.marked) continue;
						n1.marked = true;
						v = n1.val;
						if(!v.visit(false,userData)) break;
						var a = n1.arcList;
						while(a != null) {
							v = n1.val;
							a.node.parent = n1;
							a.node.depth = n1.depth + 1;
							if(v.visit(true,userData)) this._stack[c++] = a.node;
							a = a.next;
						}
					}
				}
			} else if(recursive) {
				if(process(seed,true,userData)) this._DFSRecursiveProcess(seed,process,true,userData);
			} else {
				var n = this._stack[0];
				if(!process(n,true,userData)) return;
				while(c > 0) {
					var n1 = this._stack[--c];
					if(n1.marked) continue;
					n1.marked = true;
					if(!process(n1,false,userData)) break;
					var a = n1.arcList;
					while(a != null) {
						a.node.parent = n1;
						a.node.depth = n1.depth + 1;
						if(process(a.node,true,userData)) this._stack[c++] = a.node;
						a = a.next;
					}
				}
			}
		} else if(process == null) {
			if(recursive) this._DFSRecursiveVisit(seed,false,userData); else {
				var v = null;
				while(c > 0) {
					var n = this._stack[--c];
					if(n.marked) continue;
					n.marked = true;
					v = n.val;
					if(!v.visit(false,userData)) break;
					var a = n.arcList;
					while(a != null) {
						this._stack[c++] = a.node;
						a.node.parent = n;
						a.node.depth = n.depth + 1;
						a = a.next;
					}
				}
			}
		} else if(recursive) this._DFSRecursiveProcess(seed,process,false,userData); else while(c > 0) {
			var n = this._stack[--c];
			if(n.marked) continue;
			n.marked = true;
			if(!process(n,false,userData)) break;
			var a = n.arcList;
			while(a != null) {
				this._stack[c++] = a.node;
				a.node.parent = n;
				a.node.depth = n.depth + 1;
				a = a.next;
			}
		}
	}
	,clearParent: function() {
		var node = this._nodeList;
		while(node != null) {
			node.parent = null;
			node = node.next;
		}
	}
	,clearMarks: function() {
		var node = this._nodeList;
		while(node != null) {
			node.marked = false;
			node = node.next;
		}
	}
	,unlink: function(node) {
		var arc0 = node.arcList;
		while(arc0 != null) {
			var node1 = arc0.node;
			var arc1 = node1.arcList;
			while(arc1 != null) {
				var hook = arc1.next;
				if(arc1.node == node) {
					if(arc1.prev != null) arc1.prev.next = hook;
					if(hook != null) hook.prev = arc1.prev;
					if(node1.arcList == arc1) node1.arcList = hook;
					arc1.free();
					if(this.returnArc != null) this.returnArc(arc1);
				}
				arc1 = hook;
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
	,removeNode: function(x) {
		this.unlink(x);
		if(x.prev != null) x.prev.next = x.next;
		if(x.next != null) x.next.prev = x.prev;
		if(this._nodeList == x) this._nodeList = x.next;
		this._size--;
	}
	,addNode: function(x) {
		this._size++;
		x.next = this._nodeList;
		if(x.next != null) x.next.prev = x;
		this._nodeList = x;
		return x;
	}
	,createNode: function(x) {
		return new de.polygonal.ds.GraphNode(this,x);
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
		return found?n:null;
	}
	,getNodeList: function() {
		return this._nodeList;
	}
	,__class__: de.polygonal.ds.Graph
}
de.polygonal.ds.Itr = function() { }
de.polygonal.ds.Itr.__name__ = true;
de.polygonal.ds.Itr.prototype = {
	__class__: de.polygonal.ds.Itr
}
de.polygonal.ds.GraphIterator = function(f) {
	this._f = f;
	{
		this._node = this._f._nodeList;
		this;
	}
};
de.polygonal.ds.GraphIterator.__name__ = true;
de.polygonal.ds.GraphIterator.__interfaces__ = [de.polygonal.ds.Itr];
de.polygonal.ds.GraphIterator.prototype = {
	__nodeList: function(f) {
		return f._nodeList;
	}
	,remove: function() {
		throw "unsupported operation";
	}
	,next: function() {
		var x = this._node.val;
		this._node = this._node.next;
		return x;
	}
	,hasNext: function() {
		return this._node != null;
	}
	,reset: function() {
		this._node = this._f._nodeList;
		return this;
	}
	,__class__: de.polygonal.ds.GraphIterator
}
de.polygonal.ds.GraphNodeIterator = function(f) {
	this._f = f;
	{
		this._node = this._f._nodeList;
		this;
	}
};
de.polygonal.ds.GraphNodeIterator.__name__ = true;
de.polygonal.ds.GraphNodeIterator.__interfaces__ = [de.polygonal.ds.Itr];
de.polygonal.ds.GraphNodeIterator.prototype = {
	__nodeList: function(f) {
		return f._nodeList;
	}
	,remove: function() {
		throw "unsupported operation";
	}
	,next: function() {
		var x = this._node;
		this._node = this._node.next;
		return x;
	}
	,hasNext: function() {
		return this._node != null;
	}
	,reset: function() {
		this._node = this._f._nodeList;
		return this;
	}
	,__class__: de.polygonal.ds.GraphNodeIterator
}
de.polygonal.ds.GraphArcIterator = function(f) {
	this._f = f;
	{
		this._node = this._f._nodeList;
		this._arc = this._node.arcList;
		this;
	}
};
de.polygonal.ds.GraphArcIterator.__name__ = true;
de.polygonal.ds.GraphArcIterator.__interfaces__ = [de.polygonal.ds.Itr];
de.polygonal.ds.GraphArcIterator.prototype = {
	__nodeList: function(f) {
		return f._nodeList;
	}
	,remove: function() {
		throw "unsupported operation";
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
	,hasNext: function() {
		return this._arc != null && this._node != null;
	}
	,reset: function() {
		this._node = this._f._nodeList;
		this._arc = this._node.arcList;
		return this;
	}
	,__class__: de.polygonal.ds.GraphArcIterator
}
de.polygonal.ds.GraphArc = function(node,cost) {
	this.node = node;
	this.cost = cost;
	this.next = null;
	this.prev = null;
	this.key = de.polygonal.ds.HashKey._counter++;
};
de.polygonal.ds.GraphArc.__name__ = true;
de.polygonal.ds.GraphArc.__interfaces__ = [de.polygonal.ds.Hashable];
de.polygonal.ds.GraphArc.prototype = {
	val: function() {
		return this.node.val;
	}
	,free: function() {
		this.node = null;
		this.next = this.prev = null;
	}
	,__class__: de.polygonal.ds.GraphArc
}
de.polygonal.ds.GraphNode = function(graph,x) {
	this.val = x;
	this.arcList = null;
	this.marked = false;
	this.key = de.polygonal.ds.HashKey._counter++;
	this._graph = graph;
};
de.polygonal.ds.GraphNode.__name__ = true;
de.polygonal.ds.GraphNode.__interfaces__ = [de.polygonal.ds.Hashable];
de.polygonal.ds.GraphNode.prototype = {
	toString: function() {
		var t = new Array();
		if(this.arcList != null) {
			var arc = this.arcList;
			while(arc != null) {
				t.push(Std.string(arc.node.val));
				arc = arc.next;
			}
		}
		if(t.length > 0) return "{ GraphNode val: " + Std.string(this.val) + ", connected to: " + t.join(",") + " }"; else return "{ GraphNode val: " + Std.string(this.val) + " }";
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
	,removeMutualArcs: function() {
		var arc = this.arcList;
		while(arc != null) {
			arc.node.removeArc(this);
			this.removeArc(arc.node);
			arc = arc.next;
		}
		this.arcList = null;
	}
	,removeSingleArcs: function() {
		var arc = this.arcList;
		while(arc != null) {
			this.removeArc(arc.node);
			arc = arc.next;
		}
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
	,addArc: function(target,cost) {
		if(cost == null) cost = 1.;
		var arc = this._graph.borrowArc != null?this._graph.borrowArc(target,cost):new de.polygonal.ds.GraphArc(target,cost);
		arc.next = this.arcList;
		if(this.arcList != null) this.arcList.prev = arc;
		this.arcList = arc;
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
	,isMutuallyConnected: function(target) {
		return this.getArc(target) != null && target.getArc(this) != null;
	}
	,isConnected: function(target) {
		return this.getArc(target) != null;
	}
	,iterator: function() {
		return new de.polygonal.ds.NodeValIterator(this);
	}
	,free: function() {
		this.val = null;
		this.next = this.prev = null;
		this.arcList = null;
		this._graph = null;
	}
	,__class__: de.polygonal.ds.GraphNode
}
de.polygonal.ds.NodeValIterator = function(node) {
	this._node = node;
	{
		this._arcList = this._node.arcList;
		this;
	}
};
de.polygonal.ds.NodeValIterator.__name__ = true;
de.polygonal.ds.NodeValIterator.__interfaces__ = [de.polygonal.ds.Itr];
de.polygonal.ds.NodeValIterator.prototype = {
	remove: function() {
		throw "unsupported operation";
	}
	,next: function() {
		var val = this._arcList.node.val;
		this._arcList = this._arcList.next;
		return val;
	}
	,hasNext: function() {
		return this._arcList != null;
	}
	,reset: function() {
		this._arcList = this._node.arcList;
		return this;
	}
	,__class__: de.polygonal.ds.NodeValIterator
}
de.polygonal.ds.HashKey = function() { }
de.polygonal.ds.HashKey.__name__ = true;
de.polygonal.ds.HashKey.next = function() {
	return de.polygonal.ds.HashKey._counter++;
}
de.polygonal.ds.error = {}
de.polygonal.ds.error.Assert = function() { }
de.polygonal.ds.error.Assert.__name__ = true;
var haxe = {}
haxe.ds = {}
haxe.ds.StringMap = function() { }
haxe.ds.StringMap.__name__ = true;
haxe.ds.StringMap.__interfaces__ = [IMap];
var js = {}
js.Boot = function() { }
js.Boot.__name__ = true;
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
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
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
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
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) {
					if(cl == Array) return o.__enum__ == null;
					return true;
				}
				if(js.Boot.__interfLoop(o.__class__,cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
}
js.Browser = function() { }
js.Browser.__name__ = true;
var textifician = {}
textifician.mapping = {}
textifician.mapping.ArcPacket = function() {
};
textifician.mapping.ArcPacket.__name__ = true;
textifician.mapping.ArcPacket.prototype = {
	__class__: textifician.mapping.ArcPacket
}
textifician.mapping.IXYZ = function() { }
textifician.mapping.IXYZ.__name__ = true;
textifician.mapping.IXYZ.prototype = {
	__class__: textifician.mapping.IXYZ
}
textifician.mapping.IndoorLocationSpecs = function() {
};
textifician.mapping.IndoorLocationSpecs.__name__ = true;
textifician.mapping.IndoorLocationSpecs.prototype = {
	__class__: textifician.mapping.IndoorLocationSpecs
}
textifician.mapping.LocationDefinition = function() {
};
textifician.mapping.LocationDefinition.__name__ = true;
textifician.mapping.LocationDefinition.prototype = {
	__class__: textifician.mapping.LocationDefinition
}
textifician.mapping.LocationPacket = function() {
	this.state = new textifician.mapping.LocationState();
	this.def = new textifician.mapping.LocationDefinition();
};
textifician.mapping.LocationPacket.__name__ = true;
textifician.mapping.LocationPacket.__interfaces__ = [textifician.mapping.IXYZ];
textifician.mapping.LocationPacket.prototype = {
	__class__: textifician.mapping.LocationPacket
}
textifician.mapping.LocationState = function() {
};
textifician.mapping.LocationState.__name__ = true;
textifician.mapping.LocationState.prototype = {
	__class__: textifician.mapping.LocationState
}
textifician.mapping.TextificianUtil = function() { }
textifician.mapping.TextificianUtil.__name__ = true;
textifician.mapping.TextificianUtil.getTotalDistanceFrom = function(graph,startNode,endNode,route) {
	return 0;
}
textifician.mapping.TextificianUtil.getDirectDistanceFromTo = function(startLocation,endLocation,posOffset) {
	var ox = posOffset != null?posOffset.x:0;
	var oy = posOffset != null?posOffset.y:0;
	return 0;
}
textifician.mapping.TextificianUtil.distancePointToRegion = function(pt,regionPt,regionSize) {
	return 0;
}
textifician.mapping.TextificianUtil.distanceRegionToRegion = function(pt,pt1RegionSize,pt2,pt2RegionSize) {
	return 0;
}
textifician.mapping.TextificianUtil.distancePtToPt = function(pt,pt2) {
	var dx = pt2.x - pt.x;
	var dy = pt2.y - pt.y;
	return Math.sqrt(dx * dx + dy * dy);
}
textifician.mapping.TextificianUtil.getIdFromLabel = function(label) {
	return label;
}
textifician.mapping.TextificianWorld = function() {
	textifician.rpg.ICharacter;
	textifician.rpg.IParty;
};
textifician.mapping.TextificianWorld.__name__ = true;
textifician.mapping.TextificianWorld.prototype = {
	__class__: textifician.mapping.TextificianWorld
}
textifician.mapping.Zone = function() {
};
textifician.mapping.Zone.__name__ = true;
textifician.mapping.Zone.__interfaces__ = [textifician.mapping.IXYZ];
textifician.mapping.Zone.setupNew = function(label,id,x,y,z,size,scale) {
	if(scale == null) scale = 1;
	if(size == null) size = 0;
	if(z == null) z = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	var newZone = new textifician.mapping.Zone();
	newZone.scale = scale;
	newZone.size = size;
	newZone.x = x;
	newZone.y = y;
	newZone.z = z;
	return newZone;
}
textifician.mapping.Zone.prototype = {
	removeChild: function(zone) {
		return null;
	}
	,addChild: function(zone) {
		return null;
	}
	,__class__: textifician.mapping.Zone
}
textifician.rpg = {}
textifician.rpg.ICharacter = function() { }
textifician.rpg.ICharacter.__name__ = true;
textifician.rpg.ICharacter.__interfaces__ = [textifician.mapping.IXYZ];
textifician.rpg.ICharacter.prototype = {
	__class__: textifician.rpg.ICharacter
}
textifician.rpg.IParty = function() { }
textifician.rpg.IParty.__name__ = true;
textifician.rpg.IParty.__interfaces__ = [textifician.mapping.IXYZ];
textifician.rpg.IParty.prototype = {
	__class__: textifician.rpg.IParty
}
var tros = {}
tros.chess = {}
tros.chess.ChessRuleFlags = function() {
};
tros.chess.ChessRuleFlags.__name__ = true;
tros.chess.ChessRuleFlags.prototype = {
	__class__: tros.chess.ChessRuleFlags
}
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.prototype.__class__ = Array;
Array.__name__ = true;
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
createjs.DisplayObject.prototype.setBounds = function(x, y, width, height) { this._bounds = x != null ? (this._bounds || new createjs.Rectangle()).setValues(x, y, width, height) : null; };;
ArcSplit.PI_2 = 3.1415926535897932384626433832795 * 2;
ArcSplit.PI = 3.1415926535897932384626433832795;
ArcSplit.RAD_TO_DEG = 57.295779513082320876798154814105;
TestExp.SIZE = 16;
TestExp.SIZE2 = 32;
TestExp.RAD_TO_DEG = 57.295779513082320876798154814105;
TestExp.PI_2 = 3.1415926535897932384626433832795 * 2;
TestExp.PI = 3.1415926535897932384626433832795;
TestExp.TESTING_ONE = false;
TestExp.DRAW_CHORDS = false;
de.polygonal.ds.HashKey._counter = 0;
js.Browser.window = typeof window != "undefined" ? window : null;
js.Browser.document = typeof window != "undefined" ? window.document : null;
textifician.mapping.ArcPacket.FLAG_ENTRANCE = 1;
textifician.mapping.LocationDefinition.FLAG_ENTRANCE = 1;
textifician.mapping.LocationDefinition.FLAG_KEY = 2;
textifician.mapping.LocationDefinition.FLAG_LANDMARK = 4;
textifician.mapping.LocationDefinition.TYPE_POINT = 0;
textifician.mapping.LocationDefinition.TYPE_PATH = 1;
textifician.mapping.LocationDefinition.TYPE_REGION = 2;
textifician.mapping.LocationDefinition.ENV_WALL_1 = 1;
textifician.mapping.LocationDefinition.ENV_WALL_2 = 2;
textifician.mapping.LocationDefinition.ENV_CEILING_1 = 4;
textifician.mapping.LocationDefinition.ENV_CEILING_2 = 8;
textifician.mapping.LocationDefinition.LIGHTING_NONE_OR_OUTDOOR = 0;
textifician.mapping.LocationDefinition.LIGHTING_DIM = 1;
textifician.mapping.LocationDefinition.LIGHTING_NORMAL = 2;
textifician.mapping.LocationDefinition.LIGHTING_BRIGHT = 3;
textifician.mapping.LocationDefinition.CROWDEDNESS_NONE = 0;
textifician.mapping.LocationDefinition.CROWDEDNESS_VERY_SPARSE = 1;
textifician.mapping.LocationDefinition.CROWDEDNESS_SPARSE = 2;
textifician.mapping.LocationDefinition.CROWDEDNESS_AVERAGE = 3;
textifician.mapping.LocationDefinition.CROWDEDNESS_DENSE = 4;
textifician.mapping.LocationDefinition.CROWDEDNESS_VERY_DENSE = 5;
textifician.mapping.TextificianUtil.EPSILON = 1;
tros.chess.ChessRuleFlags.MELEE_ORTHOGONAL_FULL_ONLY = 1;
tros.chess.ChessRuleFlags.MELEE_FREE_INTERCEPT_JOINER_PATH = 2;
tros.chess.ChessRuleFlags.MELEE_FREE_INTERCEPT_ANYONE = 4;
tros.chess.ChessRuleFlags.MELEE_FREE_INTERCEPT_IMMEDIATE_RESPONSE = 8;
tros.chess.ChessRuleFlags.MELEE_COST_INTERCEPT_JOINER = 16;
tros.chess.ChessRuleFlags.MELEE_COST_INTERCEPT_JOINER_NEWBLOB = 32;
tros.chess.ChessRuleFlags.MELEE_DIAGONAL_OPENHALF_ENGAGE = 64;
tros.chess.ChessRuleFlags.MELEE_DIAGONAL_BISHOP_ENGAGE = 128;
tros.chess.ChessRuleFlags.MELEE_JOIN_BOUT_2_VS_1_COST = 256;
tros.chess.ChessRuleFlags.MELEE_JOIN_BOUT_3_VS_1_COST = 512;
tros.chess.ChessRuleFlags.MELEE_JOIN_BOUT_2_VS_1_NEED_INIT = 1024;
tros.chess.ChessRuleFlags.MELEE_JOIN_BOUT_2_VS_1_NEED_INIT_AFTER = 2048;
tros.chess.ChessRuleFlags.MELEE_JOIN_BOUT_3_VS_1_NEED_INIT = 4096;
tros.chess.ChessRuleFlags.MELEE_JOIN_BOUT_3_VS_1_NEED_INIT_AFTER = 8192;
tros.chess.ChessRuleFlags.TOTAL_MELEE_RULES = 14;
tros.chess.ChessRuleFlags.MOVEMENT_DISPLACEMENT = 16384;
tros.chess.ChessRuleFlags.MOVEMENT_FRIENDLY_DIAGONAL_L = 32768;
tros.chess.ChessRuleFlags.MOVEMENT_FRIENDLY_BISHOP_DIAGONAL_L = 65536;
tros.chess.ChessRuleFlags.MOVEMENT_DIAGONAL_COST_ONE = 131072;
tros.chess.ChessRuleFlags.CONFIRMED_BLOB_BLOCK_FRIENDLY = 262144;
tros.chess.ChessRuleFlags.CONFIRMED_BLOB_BLOCK_ENEMY = 524288;
tros.chess.ChessRuleFlags.UNCONFIRMED_BLOB_BLOCK_FRIENDLY = 1048576;
tros.chess.ChessRuleFlags.UNCONFIRMED_BLOB_BLOCK_ENEMY = 2097152;
tros.chess.ChessRuleFlags.RULESET_ALL = 4194303;
tros.chess.ChessRuleFlags.RULESET_ABSTRACT = 48914;
tros.chess.ChessRuleFlags.RULESET_SPATIAL_REALISM = 3997502;
tros.chess.ChessRuleFlags.RULESET_TRYOUT = 1900306;
Main.main();
})();
