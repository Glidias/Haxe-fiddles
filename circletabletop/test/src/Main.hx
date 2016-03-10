import createjs.Container;
import createjs.DisplayObject;
import createjs.MovieClip;
import createjs.Shape;
import createjs.Sprite;
import createjs.Stage;
import createjs.Matrix2D;
import js.Browser;
import js.html.CanvasElement;
import js.html.CanvasRenderingContext2D;
import js.html.RequestAnimationFrameCallback;
import tros.chess.ChessRuleFlags;

class Main
{
	static public function main()
	{
		new TestExp();
		ChessRuleFlags;
	}
	
	
}


class ArcSplit {
	public var next:ArcSplit;
	public var from:Float;  // the angle origin of arc
	public var to:Float;  // clockwise half-arc magnitude
	private static inline var PI_2:Float = 3.1415926535897932384626433832795 * 2;
	private static inline var PI:Float = 3.1415926535897932384626433832795;
	private static inline var RAD_TO_DEG:Float = 57.295779513082320876798154814105;// (180 / Math.PI);
	
	public function new() {
		
	}
	
	public function asDefault():ArcSplit {
		from = 0;
		to = PI_2;
		return this;
	}
	
	public function toString():String {
		return "[ArcSplit " + getPreviewApprox(from)+"->" + getPreviewApprox(to) + "]";
	}
	inline function getDegApprox(val:Float):Float {
		return Math.round(val * RAD_TO_DEG);
	}
	inline function getPreviewApprox(val:Float):Float {
		return getDegApprox(val);
	}
	
	inline function setFromTo(fromAng:Float, toAng:Float):Void {
		from = fromAng;
		to = toAng;
	}
	
	public function splitBy(splitLowLimit:Float, splitHighLimit:Float):ArcSplit {
		var newSplit:ArcSplit = null;
		var lowLimit:Float = from;
		var highLimit:Float = to;
		
		// check if splitter is outside bounds
		if (splitLowLimit > highLimit || splitHighLimit < lowLimit) { 
			return this;
		}

		// check if splitter encloses entire bounds
		if (splitLowLimit <= lowLimit && splitHighLimit >= highLimit) {  // split entire length of arcSplit, no more!
			trace("Truncate:: Split till no more.");
			return null;
		}
		
		if (splitLowLimit >lowLimit  && splitHighLimit < highLimit) {  // will divide into 2 regions
			newSplit = new ArcSplit();
			newSplit.setFromTo(lowLimit, splitLowLimit);
			newSplit.next = new ArcSplit();
			newSplit.next.setFromTo(splitHighLimit, highLimit);
			//trace("SPLIT:"+newSplit + ", "+newSplit.next);
		}
		else if (splitLowLimit <= lowLimit) {  // split for highlimit region remaining
			newSplit = new ArcSplit();
			newSplit.setFromTo(splitHighLimit, highLimit);
			//trace("subtract from low:"+newSplit);
		
			
		}
		else {  // split for lowlimit region remaining
			newSplit = new ArcSplit();
			newSplit.setFromTo(lowLimit, splitLowLimit);
			//trace("subtract from high:"+newSplit);
		}
		
		
		return newSplit;
	}
	
	public function performSplitting(arcMinAng:Float, arcMaxAng:Float):ArcSplit {
		var headS:ArcSplit = this;
		if (arcMinAng < 0) {
			if (arcMaxAng >= 0) {
				headS = headS.performSplitting2(PI_2 + arcMinAng, PI_2);
				if (headS != null) headS = headS.performSplitting2(0, arcMaxAng);
				//	trace("Performing second split:"+headS + ", "+(arcMinAng+PI_2) + ", "+PI_2);
				
			}
			else {
				headS = headS.performSplitting2(PI_2 + arcMinAng, PI_2 + arcMaxAng);
			}	
		}
		else {
			headS = headS.performSplitting2( arcMinAng, (arcMaxAng <= 0 ? PI_2 + arcMaxAng : arcMaxAng) );
		}
		
		return headS;
		
	}
	
	function performSplitting2(arcMinAng:Float, arcMaxAng:Float):ArcSplit {
		var checkS:ArcSplit = null;
		var headS:ArcSplit = null;
		var s:ArcSplit  = this;
		var lastS:ArcSplit = null;
		while (s != null) 
		{
			var nextS:ArcSplit = s.next;
			
			
			
			checkS = s.splitBy(arcMinAng, arcMaxAng);
			if (checkS != null) { // replace
				s.next = null;
				
				if (headS != null) {
					lastS.next = checkS;
				}
				else {
					headS = checkS;
				}
				
				if (checkS.next != null) {
					s = checkS.next; 
					checkS.next.next = nextS;
				//	trace("Pointing to next:"+(headS == checkS));
				}
				else {
					s = checkS;
					checkS.next = nextS;
				}
			
			}
			
			
			
			
			lastS = s;
			s = nextS;
		}
		
		if (headS == null && checkS != null) {
				headS = checkS;
			}
		
		return headS;
	}
	
	public function getCount():Int
	{
		var count:Int = 1;
		var s = next;
		while ( s != null) {
			count++;
			s = s.next;
		}
		return count;
	}

	

}



class TestExp {
	
	private var canvas:CanvasElement;
	private var stage:Stage;
	private var shape:Shape;
	private var circleCont:Container;
	private var arcs:Shape;
	
	private static inline var SIZE:Float = 16;
	private static inline var SIZE2:Float = 32;
	
	private var circles:Array<Shape>;
	private var circlesSplits:Array<ArcSplit>;
	
	private static inline var RAD_TO_DEG:Float = 57.295779513082320876798154814105;// (180 / Math.PI);
	private static inline var PI_2:Float = 3.1415926535897932384626433832795 * 2;
	private static inline var PI:Float = 3.1415926535897932384626433832795 ;
	
	
	public function new() {
	
		
		canvas = cast Browser.document.getElementById("nanoFL_canvas");
		stage = new Stage(canvas);
		
		shape  =new Shape();
		stage.addChild(shape);
		
		circleCont = new Container();
		stage.addChild(circleCont);
		
		arcs = new Shape();
		stage.addChild(arcs);
		

		
		
		
		
		shape.graphics
			.beginStroke("red")
			.rect(-100, -50, 200, 100)
			.endStroke();
			
		shape.x = 400;
		shape.y = 200;
		
		circles = [];
		circlesSplits = [];
		
		Browser.window.requestAnimationFrame( requestFrame);
		
		//Brows
		
		
		
		addCircle(20, 20, SIZE * .5, "#000000");
		addCircle(50, 20, SIZE * .5, "#000000");
		addCircle(70, 20, SIZE * .5, "#000000");
		addCircle(90, 20, SIZE * .5, "#000000");
//		drawExposedArcs();
	}
	
	var xDist:Float;
	var aDist:Float;
	var cDist:Float;
	var offsetX:Float;
	var offsetY:Float;
	
	function getIntersectionArc(x1:Float, y1:Float, R:Float, x2:Float, y2:Float, r:Float):Float {
	
		var x =  x2 - x1;
		var y = y2 - y1;
		offsetX  = x;
		offsetY = y;
		var rr = R + r;
		if ( x*x+y*y >= rr*rr ) return 0;
		var d = Math.sqrt( x * x + y * y );
		cDist = d;
		x = d*d-r*r+ R*R;
		x /= 2 * d;
		
		xDist = x;
		var a = 1/d * Math.sqrt( (-d+r-R)*(-d-r+R)*(-d+r+R)*(d+r+R) );
		
		aDist = a;
		return Math.atan2( 0.5*a , x);
	}
	
	// assumed clockwise clip
	function divideCircle(circle:ArcSplit, clipFromArc:Float, clipAmountAng:Float):Void {
		var s:ArcSplit = circle;
		while ( s != null) {
			var nextArc:ArcSplit = circle.next;
			
			
			
			s = nextArc;
		}
		
	}
	
	function drag(evt) {
		 // target will be the container that the event listener was added to
		 if(evt.target.name == "square") {
		  evt.target.x = evt.stageX - SIZE;
		  evt.target.y = evt.stageY - SIZE;
		 }
		 else {
		  evt.target.x = evt.stageX;
		  evt.target.y = evt.stageY;
		 }
		 
		// drawExposedArcs();
		 // make sure to redraw the stage to show the change
		 stage.update();
		 
		
		}
	
	function addCircle(x, y, r, fill) {

		 var circle = new createjs.Shape();
		 circle.graphics.beginFill(fill).drawCircle(0, 0, r);
		 circle.x = x;
		 circle.y = y;
		 circle.name = "circle";
		 circle.on("pressmove", drag);
		 circleCont.addChild(circle);
		 
		 circles.push(circle);
		 circlesSplits.push(null);
		 
		
		
		  circle.graphics.beginFill(fill).drawCircle(0, 0, r).endFill();
		//  circle.graphics.beginStroke("#555555").drawCircle(0,0,SIZE2).endStroke();
	}
		
	
	static inline var TESTING_ONE:Bool = false;
	static inline var DRAW_CHORDS:Bool = false;
	
	function drawExposedArcs() {
		
		var c1:createjs.Shape;
		var a:ArcSplit;
		var baseAng:Float;
		var arc:ArcSplit;
		var len:Int = circles.length;
	
		var g = arcs.graphics;
		g.clear();
	//	g.setStrokeStyle(1);
		var limit;
		
		
		
		
		for (i in 0...len) {
			 circlesSplits[i] = new ArcSplit().asDefault();
		}
		
		limit = TESTING_ONE ? 1 : len;
		
		for (i in 0...limit) {
			c1 = circles[i];
			
			
			
			
			for (k in (i+1)...len ) {
				
				var c2 = circles[k];
				
				
				var ang;
				ang = getIntersectionArc(c1.x, c1.y, SIZE2, c2.x, c2.y, SIZE2);
				if (ang != 0) {

					var x;
					var y;
					var nx = offsetX / cDist;
					var ny = offsetY / cDist;
					
					// line to to chord's midpt from circle center
					if (DRAW_CHORDS) {
						g.beginStroke("#555555");
						g.moveTo(c1.x, c1.y);
						g.lineTo(x=c1.x+nx*xDist,  y=c1.y+ny*xDist);
						g.endStroke();
						
						// chord pt1
						g.beginStroke("#555555");
						g.moveTo(x,y);
						g.lineTo(x - ny*aDist*.5, y + nx*aDist*.5 );
						g.endStroke();
						
						// chord pt2
						g.beginStroke("#555555");
						g.moveTo(x,y);
						g.lineTo(x + ny*aDist*.5, y - nx*aDist*.5 );
						g.endStroke();
					}
					
					arc = circlesSplits[i];
					baseAng = Math.atan2(offsetY, offsetX);
					if (arc != null) circlesSplits[i] = arc = arc.performSplitting(baseAng-ang , baseAng+ang);
					
					
					if (!TESTING_ONE) {
					///*
					ang = getIntersectionArc(c2.x, c2.y, SIZE2, c1.x, c1.y, SIZE2);
					arc = circlesSplits[k];
					baseAng = Math.atan2(offsetY, offsetX);
					if (arc != null) circlesSplits[k] = arc = arc.performSplitting(baseAng-ang , baseAng+ang);
					
					
					nx *= -1;
					ny *= -1;
					
					
					// line to to chord's midpt from circle center
					
					if (DRAW_CHORDS) {
						g.beginStroke("#555555");
						g.moveTo(c2.x, c2.y);
						g.lineTo(x=c2.x+nx*xDist,  y=c2.y+ny*xDist);
						g.endStroke();
						
						// chord pt1
						g.beginStroke("#555555");
						g.moveTo(x,y);
						g.lineTo(x - ny*aDist*.5, y + nx*aDist*.5 );
						g.endStroke();
						
						// chord pt2
						g.beginStroke("#555555");
						g.moveTo(x,y);
						g.lineTo(x + ny*aDist*.5, y - nx*aDist*.5 );
						g.endStroke();
					}
					
					//*/
					}
				}

			}
			
			//g.setStrokeStyle(2);
			
			
			// dunno why need to clear graphics here as well???
			
			
			g.clear();
			for (i in 0...limit ) { 
				
				c1 = circles[i];
				arc = circlesSplits[i];
				a = arc;
				
				//if (i==1) trace("B");
				while ( a != null) {
					g.beginStroke("#ffff00");
					g.arc(c1.x, c1.y, SIZE2, a.from, a.to, false);
					g.endStroke();
					//if (i == 1) {
					//	if (a != null) trace(a +"");
					
					//}
					a = a.next;
				}	
			}
			
		}
		
		
		
	}
	
	 function  requestFrame(time:Float):Bool {
		
		var matrix = shape.getMatrix();
		var m = new Matrix2D().appendTransform(0, 0, 1, 1, 1, 0, 0);
		matrix.appendMatrix(m);
		shape.set(matrix.decompose());
		
		//trace("FRAME");
		drawExposedArcs();
			stage.update();
		
			
		Browser.window.requestAnimationFrame( requestFrame);
		
		return true;
	}
}
