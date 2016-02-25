(function () { "use strict";
var Main = function() { }
Main.main = function() {
	new TestExp();
}
var ArcSplit = function() {
};
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
		var headS = this;
		var s = this;
		var lastS = null;
		while(s != null) {
			var nextS = s.next;
			var checkS = s.splitBy(arcMinAng,arcMaxAng);
			if(checkS != null) {
				s.next = null;
				if(lastS != null) lastS.next = checkS; else headS = checkS;
				if(checkS.next != null) {
					s = checkS.next;
					checkS.next.next = nextS;
				} else {
					s = checkS;
					checkS.next = nextS;
				}
			} else {
				s.next = null;
				headS = nextS;
			}
			lastS = s;
			s = nextS;
		}
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
}
var TestExp = function() {
	this.canvas = js.Browser.document.getElementById("nanoFL_canvas");
	this.stage = new createjs.Stage(this.canvas);
	this.shape = new createjs.Shape();
	this.stage.addChild(this.shape);
	this.arcs = new createjs.Shape();
	this.stage.addChild(this.arcs);
	this.arcs.graphics.setStrokeStyle(1);
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
	this.drawExposedArcs();
};
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
		limit = 1;
		var _g = 0;
		while(_g < limit) {
			var i = _g++;
			c1 = this.circles[i];
			g.beginStroke("#555555");
			g.drawCircle(c1.x,c1.y,32);
			g.endStroke();
			var upp = i + 1;
			var _g1 = upp;
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
					g.beginStroke("#555555");
					g.moveTo(c1.x,c1.y);
					g.lineTo(x = c1.x + nx * this.xDist,y = c1.y + ny * this.xDist);
					g.endStroke();
					g.beginStroke("#555555");
					g.moveTo(x,y);
					g.lineTo(x - ny * this.aDist * .5,y + nx * this.aDist * .5);
					g.endStroke();
					g.beginStroke("#555555");
					g.moveTo(x,y);
					g.lineTo(x + ny * this.aDist * .5,y - nx * this.aDist * .5);
					g.endStroke();
					arc = this.circlesSplits[i];
					baseAng = Math.atan2(this.offsetY,this.offsetX);
					this.circlesSplits[i] = arc = arc.performSplitting(baseAng - ang,baseAng + ang);
					a = arc;
				}
			}
			var _g1 = 0;
			while(_g1 < limit) {
				var i1 = _g1++;
				c1 = this.circles[i1];
				arc = this.circlesSplits[i1];
				a = arc;
				if(a != null) console.log(a.getCount());
				while(a != null) {
					g.beginStroke("#ff0000");
					g.arc(c1.x,c1.y,32,a.from,a.to,false);
					g.endStroke();
					console.log(a.toString());
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
		this.stage.addChild(circle);
		this.circles.push(circle);
		this.circlesSplits.push(null);
		circle.graphics.beginFill(fill).drawCircle(0,0,r);
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
}
var js = {}
js.Browser = function() { }
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
createjs.DisplayObject.prototype.setBounds = function(x, y, width, height) { this._bounds = x != null ? (this._bounds || new createjs.Rectangle()).setValues(x, y, width, height) : null; };;
ArcSplit.PI_2 = 3.1415926535897932384626433832795 * 2;
ArcSplit.PI = 3.1415926535897932384626433832795;
ArcSplit.RAD_TO_DEG = 57.295779513082320876798154814105;
TestExp.SIZE = 16;
TestExp.SIZE2 = 32;
TestExp.RAD_TO_DEG = 57.295779513082320876798154814105;
TestExp.PI_2 = 3.1415926535897932384626433832795 * 2;
TestExp.PI = 3.1415926535897932384626433832795;
TestExp.TESTING_ONE = true;
js.Browser.window = typeof window != "undefined" ? window : null;
js.Browser.document = typeof window != "undefined" ? window.document : null;
Main.main();
})();
