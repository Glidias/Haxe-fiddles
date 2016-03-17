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
 * This is done through a basic node-based graph linking different locations together. These locations have detailed tactical information bundled to each node.
 * 
 * It also allows path-finding across these locations, and determining the shortest/easiest route to a destination location.
 * It's a tool meant to quickly prototype tactical RPG gameworlds by graphing out locations in general with tactical details, while determining the relative distances between them as you perform the graphing.
 * It also allows you to set up visibility connections between these locations to determie general fog-of-war/line-of-sight visibility as well between locations.
 * 
 * Currently, points, paths and regions (radial-only at the moment) are supported for mapping out positionings that affects distancing. In the future, more precise region-based locations could be mapped out like polygon, etc., but for now this can be simulated roughly by using connecting location regions to location paths to define boundaries.  After all, the primary purpose of this engine is support basic text-based RPG gameplay only with a necessary degree of abstraction.
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
		
	}
	
	
	
	
	
}