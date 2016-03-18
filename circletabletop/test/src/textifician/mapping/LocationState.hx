package textifician.mapping ;
import de.polygonal.ds.GraphNode;

/**
 * ...
 * @author Glenn Ko
 */
class LocationState
{
	public static inline var FLAG_DOOR_LOCKED:Int = (1 << 0);  // lock bolt mechanism
	// Having both flags opened imply a "fully open" door.
	public static inline var FLAG_DOOR_OPEN_1:Int = (1 << 1); // ajar...open as little as possible to peek through
	public static inline var FLAG_DOOR_OPEN_2:Int = (1 << 2); // partially opened...open just enough to slip body through
	
	public var visibleNodesFromHere:Array<GraphNode<Dynamic>>;
	public var thingsHere:Array<Dynamic>;  // store any uniquely defined things here for existing node
	public var notes:String; // any custom notes can go here
	public var flags:Int; // common state flags can go here with regards to mapping/path-finding
	public var customData:Dynamic; // custom data extenesion stuff goes here if needed
	
	// door controls
	// it's techically possible to unlock/lock doors indepedantly (eg. adjust the bolt) while the door is opened or closed,
	// or open/close doors evens when a door is "locked".
	// No sanity checks are done here and it's up to the game context to check/inform with the player accordingly...
	
	public function openDoorFully():LocationState {
		flags |= (FLAG_DOOR_OPEN_1|FLAG_DOOR_OPEN_2);
		return this;
	}
	
	public function openDoorPartially(ajarOnly:Bool = false):LocationState {
		flags &= ~(FLAG_DOOR_OPEN_1|FLAG_DOOR_OPEN_2);
		flags |= ajarOnly ? FLAG_DOOR_OPEN_1 : FLAG_DOOR_OPEN_2;
		return this;
	}
	
	public function closeDoor():LocationState {
		flags &= ~(FLAG_DOOR_OPEN_1|FLAG_DOOR_OPEN_2);
		return this;
	}
	public function closeAndLockDoor():LocationState {
		closeDoor();
		flags |= FLAG_DOOR_LOCKED;
		return this;
	}
	public function lockDoor():LocationState {
		flags |= FLAG_DOOR_LOCKED;
		return this;
	}
	public function unlockDoor():LocationState {
		flags &= ~FLAG_DOOR_LOCKED;
		return this;
	}


	
	public function new() 
	{
		
	}
	
}