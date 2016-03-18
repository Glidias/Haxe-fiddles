package textifician.mapping ;
import de.polygonal.ds.Graph;
import de.polygonal.ds.GraphNode;
import haxe.ds.StringMap;
import textifician.rpg.ICharacter;
import textifician.rpg.IFixture;
import textifician.rpg.IItem;
import textifician.rpg.IParty;

/**
 * Main manager class to construct a Textifician world. aka. The Textifician Engine.
 * 
 * A Textfician world is a text-based description of an RPG environment/scene that also includes general tactical/spatial information within it to support text-based tactical RPGs
 * ( which can later also expand to precise 2D/3D RPG visualisations/simulations for scenes, if developers wish to expand on it )
 * 
 * This is done through a basic node-based graph linking different locations together. These locations have detailed tactical information bundled to each node including positional information.
 * 
 * It also allows path-finding across these locations, and estimating the shortest/easiest route to a destination location given the distance/obstacles in the way.
 * It's a tool meant to quickly prototype tactical RPG gameworlds by graphing out locations in general with tactical details, while determining the relative distances between them as you perform the graphing via position referencing. 
 * It also allows you to set up visibility connections between these locations to determine  general fog-of-war/line-of-sight visibility as well between locations. The presence/lack of of cover within locations can variably affect visibility of targets within locations using your own tactical RPG system abstractions.
 * 
 * Currently, points, paths and regions (radial-only at the moment) are supported for mapping out positionings that affects distancing. In the future, more precise region-based locations could be mapped out like polygon, etc., but for now this can be simulated roughly by using connecting location regions to location paths to define boundaries.  After all, the primary purpose of this engine is support basic text-based RPG gameplay with a necessary degree of abstraction. 
 * 
 * What is is not (unique selling point): This is not really an interactive-fiction developer/mapper suite, but a nifty tool you can use to outline your own adventures/rpg environments with necessary details used to conduct tactical combat and also (optionally) manage procedural generation of content. Also, unlike old-school interactive fiction mappers I've seen which tend to restrict players to moving in compass direction steps, the Textifician engine uses it's own method of mapping that is between 1d to 2d (call it "1.5d"), and isn't restricted to cardinal compass directions, but has a full fledged 2d graph built-in to handle automatic pathfinding between locations across paths, points and regions. Because you aren't restricted to fixed cardinal directions, you can use this to map out real locations on Google maps and estimate walking route times, for example. The intent is to provide a fast-travel (automatic route-finding ) means for players to move about, without having to be forced to navigate manually through explicit cardinal compass directions or micromanaging  movement decisions, but provide the necessary abstraction when deciding to explore areas. Generally, if your character has no specific destination to go to because he can't see anything "interesting" yet, he basically wanders around "aimlessly" at first, and the Textifician engine can abstract this away intelligently based on the knowledge state of the exploring character.
 * 
 * @author Glenn Ko
 */
class TextificianWorld
{
	
	// usually eacn node contains either Zone or LocationPacket
	private var graph:Graph<GraphNode<Dynamic>>;  
	
	// Any location vincities can be shown here, that makes for good starting locations for the given gameworld.
	private var zones:Array<Zone>;
	
	// A library hash of location definitions that you can use under this world
	private var locationDefs:StringMap<LocationDefinition>;
	

	public function new() 
	{
		ICharacter; IParty; IFixture; IItem; 
		
		zones = [];
		graph = new Graph();
		locationDefs = new StringMap<LocationDefinition>();
	}
	
	public static function configureGlobals(defaultMapScale:Float, smallestMovementUnit:Float):Void {
		Zone.DEFAULT_SCALE = defaultMapScale;
		TextificianUtil.EPSILON = smallestMovementUnit;
	}
	public static function configureGlobalMapScale(defaultMapScale:Float):Void {
		Zone.DEFAULT_SCALE = defaultMapScale;
	}
	public static function configureGlobalSmallestMovementDist(smallestMovementUnit:Float):Void {
		TextificianUtil.EPSILON = smallestMovementUnit;
	}
	
	
	public function addLocationDefinition(def:LocationDefinition, forceOverwrite:Bool=true):LocationDefinition {
		var current:LocationDefinition = locationDefs.get(def.id);
		if (forceOverwrite || current==null) locationDefs.set(def.id, def);
		return current;
	}
	
	public function addZone(zone:Zone):Void {
		zones.push(zone);
	}
	

	
	

	
}