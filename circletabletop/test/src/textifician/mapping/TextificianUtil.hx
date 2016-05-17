package textifician.mapping ;
import de.polygonal.ds.Graph;
import de.polygonal.ds.GraphArc;
import de.polygonal.ds.GraphNode;
import haxe.rtti.CType.TypeApi;
import textifician.mapping.TextificianUtil.PropertyChainHolder;


/**
 * Generic mapping/measurement methods used by Textifician engine
 * @author Glenn Ko
 */
@:expose
class TextificianUtil
{
	
	public static var EPSILON:Float = 1; // based off acutal unit measure. adjust accordingly
	
	public static function getTotalDistanceFrom(graph:Graph<GraphNode<Dynamic>>, startNode:GraphNode<Dynamic>, endNode:GraphNode<Dynamic>, route:Array<GraphArc<ArcPacket>>=null ):Float {
	
		return 0;
	}
	
	public static function getDirectDistanceFromTo(startLocation:LocationPacket, endLocation:LocationPacket, posOffset:IXYZ = null):Float {
		var ox:Float = posOffset != null ? posOffset.x : 0;
		var oy:Float = posOffset != null ? posOffset.y : 0;
		return 0;
	}
	
	public static function distancePointToRegion(pt:IXYZ, regionPt:IXYZ, regionSize:Float):Float {
		return 0;
	}
	public static function distanceRegionToRegion(pt:IXYZ, pt1RegionSize:Float, pt2:IXYZ, pt2RegionSize:Float):Float {
		return 0;
	}
	
	public static function distancePtToPt(pt:IXYZ, pt2:IXYZ):Float {
		var dx:Float = pt2.x-pt.x;
		var dy:Float = pt2.y -  pt.y;
		return Math.sqrt(dx * dx + dy * dy);
	}
	
	public static function getPropertyChainObj(src:Dynamic, property:Dynamic):PropertyChainHolder {
		var me:PropertyChainHolder = new PropertyChainHolder();
		me.setupProperty(src,property);
		return me;
	}
	
	/**
	 * Applies dynamic properties over a given target from a plain dynamic object 
	 * @param	obj		The plain obj model containing the values to apply
	 * @param	target	The target  (might be a complex class instance)  to apply properties over
	 */
	public static function applyDynamicProperties(obj:Dynamic, target:Dynamic):Void {
		var fields = Reflect.fields(obj);
		for (p in fields) {
			var val = Reflect.field(fields, p);
			if ( Reflect.isObject(val)) {
				
				var tarProp = Reflect.getProperty(target, p);
				
				if (tarProp != null) {
					applyDynamicProperties(val, tarProp );
				}
				else {
					// TODO: allow for dynamic instantation on the fly
					Reflect.setProperty(target, p, null);
				}
			}
			else {
				Reflect.setProperty(target, p, val);
			}
		}
	}
	
	/**
	 * 
	 * @param   src		The src object (might be a complex class instance)  to derive values from
	 * @param	obj		The plain dynamic object model to update. Valid properties to be retrieved are derived from here.
	 */
	public static function applyPropertiesOverFromSrc(src:Dynamic, obj:Dynamic):Void {
		// TODO:// eg. this approach will apply LocationDefinition properties onto obj, converting a Model to ViewModel
		
		
	}
	
	/**
	 * 
	 * @param   src		The src object (must be a complex class instance)  to derive properties from via the inspectable metatag
	 * @param	obj		The plain dynamic object model to update.
	 */
	/*
	 public static function applyInspectablePropertiesOverFromSrc(src:Dynamic, obj:Dynamic):Void {
		// kiv: not needed atm
	}
	*/
	
	
	
	
}


class PropertyChainHolder {
	private var _src:Dynamic;
	
    @:isVar public var value(get, set):Float;
	public var propertyChain:Array<String>;
	
	public function new() {
		
		
		#if js
		untyped Object.defineProperty(this,"value",{
           get : get_value,
           set : set_value
        });
		#end
		
	}
	public  function setupProperty(src:Dynamic, property:Dynamic=null):Void {
		_src = src;
		
		if (property == null) {

			return;
		}
		if (Std.is(property, String)) {
			var str:String = property;
			propertyChain = str.split(".");
		}
		else { // assumed array
			propertyChain = property;
		}
	}
	
	private  function getPropertyChainValue():Dynamic {
		var len:Int = propertyChain.length;
		var cur = _src;
		
		for (i in 0...len) {
			var propToGet = propertyChain[i];
			cur = getPropertyOf(cur, propToGet );
			if (cur == null) {
				
				return null;
			}
		}
		return cur;
	}
	
	
	private  function setPropertyChainValue(val:Dynamic):Dynamic {
		
		if (_src == null) {
			_src = { };
		}
		var cur = _src;
		var len:Int = propertyChain.length;
		
		/*
		if (len == 1) {  // early out case
			Reflect.setProperty(_src, propertyChain[0], val);
			return val;
		}
		*/
		
		var propStack:Array<String> = [];
		for (i in 0...len) {
			var propToSet = propertyChain[i];
			propStack.push(propToSet);
			cur = setPropertyOf(cur, propToSet, val, i >= len -1, propStack);
			if (cur == null) {
			//	trace("EXITING null: " + val);
				return null;
			}
		}
		return cur;
	}
	
	private function setPropertyOf(obj:Dynamic, prop:String, val:Dynamic,leaf:Bool, propStack:Array<String>):Dynamic {
		if (!leaf) {
			var reflectProp = val = Reflect.getProperty(obj, prop);
			if (reflectProp == null) {
				if (val == null) { // if value isn't significant, don't force it
					
					return null;  
				}
				Reflect.setProperty(obj, prop, (reflectProp={ }) );
			}
			val =  reflectProp;
		}
		Reflect.setProperty(obj, prop, val);
		return val;
	}
	
	private  inline function getPropertyOf(obj:Dynamic, prop:String):Dynamic {


		return  Reflect.getProperty(obj, prop);
	}
	
	@:getter function get_value():Dynamic 
	{
		return propertyChain!= null && _src != null ? getPropertyChainValue() : null;
	}
	
	@:setter function set_value(v:Dynamic):Dynamic 
	{
		return propertyChain!= null ? setPropertyChainValue(v) : null;
	}
	
	
}

/*
Distance aggregation:
----------
Right here within sprinting distance
Right here within running distance
Right here within hurried distance
Right here within normal distance
Right here within cautious distance ::: Epsilon (less than 3 yards??)
--------------

(((
Distance point to region - 
  From region: straight line distance to point from region offset position
 From point:: point to region center minus radius of that region  ::: clamp episolon
 From path:: point on path to region center minus radius of that region  ::: clamp min path half width
)))


((
Distance region to region - 
  point distance to destination region center point from region offset position point
 minus destination radius  (Same as distance from point to region except diff clamp)
CLAMP: Minimum distance between regions

Minimum distance between regions, if non-overlapping, the whitespace distance which is distance - sumOfRadii, else constant EPSILON

If destination redius is INFINITY,  no need to minus, just use the epislon. 
TO handle distances accruately between 2 regions of infinite radii, they should be seperated by a path/boundary location. (eg. treeline, shoreline.).
))


((((
Distance point to point - Point distance 
))))


((((
Distance path point - path Point distance
If same location definition, point distance
If diff location definition, hmmm...best to seperate by entrance path (assume entrance path has higher priority over non-entrance paths),  else will resort to priorityIndex...if higher, indicates breakpoint biased to that location.

))))


An arc from one GraphNode that leads from one graphNode with LocationDefinition path  to another graphNode without LocationDefinition, indicates, infinity path...


Types of entrances:
--------------------
Entrance region (region size acts as PORTAL...as long as within it, you are at entrance)
Entrance point (m,ust be exaclty on point to be deemed at entrance)
Entrance path  (most accruate way to define an entrance, using 2 points and thickness)



(((
Distance path to region
 From region: nearest straight line distance to path from region offset position
 From path: path width-half off
)))


________


Location line-of-sight visibility:
--------------------------------
Textifician infers line-of-sight visibilty between location graph nodes using the following rules:

______________________

Conventions to determine LOS visibility between point/radius-based locations:
-----------------

Point considered a region with a near-zero radius.

General rules of whether an area is considered OPENED vs ENCLOSED.

- Something that is deemed "opened" is completely open from all sides as far as visibility is concerned. 
- If there is walls that are high enough to block it's view from others (of ANY quantity), then it's considered "enclosed", even if parts of the location isn't fully covered. 
- Some locations may not have explicit walls defined for that location, but are still deemed "enclosed" due to the surrounding locations/implicit obstacles around it. Again, a single neaerby occluding obstacle of vis-blocking height may be good enough to consider an area to be "enclosed".
- A location within an indoor zone isn't ncessarily enclosed. It is only "Enclosed" when that location is completely self-contained by it's own local walls or blocking obstacles, and the same concept applies to any location found at an outdoor zone. For example, ther can be open halls within an indoor area, an an open hall is considered opened even though it exists indoors.

_____________________

Adjacient location LOS visiblity is always deemed true, except in the case of doors or special vis-blocking arcs.

But what about contigous LOS visiblity across multiple locations down the chain?
Rules to determine contigous LOS visibility.

Unless otherwise stated, deemed always visible in contigous manner.

Start From Opened Path to Opened Region 
-----------------------------
(visible)

Enclosed path to Enclosed Path
------------------------------
Turning angle cannot be too drastic. There are 2 checks that must be done in the following order..
- Angle turning accumulates (accumulatedAngle) until it raeches pass threshold and no longer visible.
- Direction to target position from current position, angled against principle angle, cannot exceed angle threshold as well.
///accumulatedAngle can run on absolute, so bendey roads do not subtract from each other?

Start from Enclosed Path to Opened Region
Start from Enclosed Path to Enclosed Region
-----------------------------------
- Uses shortest possible arc angle turning to the region's radial bounds, from exit arc angle.
- A Region that is of infinite radius (unbounded) is deemed always visible contigously from the given exit arc angle. 

Determining exit arc from path to region,
 (when no entrance is specified, otherwise simply use exit arc that is along person's own traveling arc towards entrance node).
If at end of path , then exit arc direction is equal to the last arc leading to the end of path.
Otherwise, exit arc is simply the last traveled arc path before running on the closest exit direction towards the target region.
Basically, the latter rule somes up all cases. (ie. the last traveled arc before exiting out to region..)


Start from Enclosed  Region to Enclosed Region
Start from Enclosed  Region to Open Region
--------------------------------
Cannot see beyond contigous.
Enclosed means self contained.



*/