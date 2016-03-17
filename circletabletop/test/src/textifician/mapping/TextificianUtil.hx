package textifician.mapping ;
import de.polygonal.ds.Graph;
import de.polygonal.ds.GraphArc;
import de.polygonal.ds.GraphNode;

/**
 * ...
 * @author Glenn Ko
 */
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
	
	public static function getIdFromLabel(label:String):String {
		return label;
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


*/