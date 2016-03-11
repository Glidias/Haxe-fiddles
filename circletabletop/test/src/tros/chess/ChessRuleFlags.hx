package tros.chess;

/**
 * ...
 * @author Glenn Ko
 */
class ChessRuleFlags
{
	// Spatial rule flags for chess formation layout, movement and engagements.
	
	// melee engagement rule flags
	public static inline var MELEE_ORTHOGONAL_FULL_ONLY:Int = (1 << 0);  //1a
	public static inline var MELEE_FREE_INTERCEPT_JOINER_PATH:Int = (1 << 1); //2
	public static inline var MELEE_FREE_INTERCEPT_ANYONE:Int = (1 << 2); //3
	public static inline var MELEE_FREE_INTERCEPT_IMMEDIATE_RESPONSE:Int = (1 << 3); //4
	public static inline var MELEE_COST_INTERCEPT_JOINER:Int = (1 << 4); //5
	public static inline var MELEE_COST_INTERCEPT_JOINER_NEWBLOB:Int = (1 << 5); //5a
	public static inline var MELEE_DIAGONAL_OPENHALF_ENGAGE:Int = (1 << 6); //6
	public static inline var MELEE_DIAGONAL_BISHOP_ENGAGE:Int = (1 << 7); //6a
	public static inline var MELEE_JOIN_BOUT_2_VS_1_COST:Int = (1 << 8); //7a
	public static inline var MELEE_JOIN_BOUT_3_VS_1_COST:Int = (1 << 9); //7b
	public static inline var MELEE_JOIN_BOUT_2_VS_1_NEED_INIT:Int = (1 << 10); //7c
	public static inline var MELEE_JOIN_BOUT_2_VS_1_NEED_INIT_AFTER:Int = (1 << 11); //7c.i
	public static inline var MELEE_JOIN_BOUT_3_VS_1_NEED_INIT:Int = (1 << 12); //7d
	public static inline var MELEE_JOIN_BOUT_3_VS_1_NEED_INIT_AFTER:Int = (1 << 13); //7d.i
	
	public static inline var TOTAL_MELEE_RULES:Int = 14;
	
	// movement rule flags
	public static inline var MOVEMENT_DISPLACEMENT:Int = (1 << (TOTAL_MELEE_RULES+0)); //1
	public static inline var MOVEMENT_FRIENDLY_DIAGONAL_L:Int = (1 << (TOTAL_MELEE_RULES+1)); //2
	public static inline var MOVEMENT_FRIENDLY_BISHOP_DIAGONAL_L:Int = (1 << (TOTAL_MELEE_RULES+2)); // 2a
	public static inline var MOVEMENT_DIAGONAL_COST_ONE:Int = (1 << (TOTAL_MELEE_RULES+3)); // 2b
	public static inline var CONFIRMED_BLOB_BLOCK_FRIENDLY:Int = (1 << (TOTAL_MELEE_RULES+4)); // 3a
	public static inline var CONFIRMED_BLOB_BLOCK_ENEMY:Int = (1 << (TOTAL_MELEE_RULES+5)); // 3b
	public static inline var UNCONFIRMED_BLOB_BLOCK_FRIENDLY:Int = (1 << (TOTAL_MELEE_RULES+6)); // 4a
	public static inline var UNCONFIRMED_BLOB_BLOCK_ENEMY:Int = (1 << (TOTAL_MELEE_RULES+7)); // 4b
	
	// sample base rulesets
	
	// the basic template (Comment away the stuffs you don't need)
	public static inline var RULESET_ALL:Int =
	(
	0
	|	MELEE_ORTHOGONAL_FULL_ONLY
	|   MELEE_FREE_INTERCEPT_JOINER_PATH
	|   MELEE_FREE_INTERCEPT_ANYONE
	|   MELEE_FREE_INTERCEPT_IMMEDIATE_RESPONSE
	|   MELEE_COST_INTERCEPT_JOINER
	|   MELEE_COST_INTERCEPT_JOINER_NEWBLOB
	|   MELEE_DIAGONAL_OPENHALF_ENGAGE
	|   MELEE_DIAGONAL_BISHOP_ENGAGE
	|	MELEE_JOIN_BOUT_2_VS_1_COST
	|	MELEE_JOIN_BOUT_3_VS_1_COST
	|	MELEE_JOIN_BOUT_2_VS_1_NEED_INIT
	|	MELEE_JOIN_BOUT_2_VS_1_NEED_INIT_AFTER
	|	MELEE_JOIN_BOUT_3_VS_1_NEED_INIT
	|	MELEE_JOIN_BOUT_3_VS_1_NEED_INIT_AFTER
	|   MOVEMENT_DISPLACEMENT
	|   MOVEMENT_FRIENDLY_DIAGONAL_L
	|   MOVEMENT_FRIENDLY_BISHOP_DIAGONAL_L
	|   MOVEMENT_DIAGONAL_COST_ONE
	|   CONFIRMED_BLOB_BLOCK_FRIENDLY
	|   CONFIRMED_BLOB_BLOCK_ENEMY
	|   UNCONFIRMED_BLOB_BLOCK_FRIENDLY
	|   UNCONFIRMED_BLOB_BLOCK_ENEMY
	);
	
	// Simulates Pen-and-Paper game with minimal spatial considerations. May be good if chessboard isn't shown explicitly but runs hidden in the background only.
	// Engagement blobs do not perform any collision detection or block paths, but merely act as abstract reference positions.
	//  There is no per-turn movement displacement of units. They move as if refering to the current formation layout.
	// Persons higher up the initiative laddder can make the cost-counter-interceptions, even though there may be others lower in the intiatiive ladder that COULD make free interceptions and may have been in a better position to do so.
	// A variant to this rule is to allow MELEE_FREE_INTERCEPT_IMMEDIATE_RESPONSE to avoid this problem, but this allows turn actions to be interrupted via enemy player response. If this is allowed, can also consider enabling MELEE_FREE_INTERCEPT_ANYONE. This makes a  defensive formation much more "reactive" and will not let enemies simply pass, no matter how "fast" they may be.
	// Ensures per-turn spatial movement doesn't cause other moves to be invalided due to obstacles being formed...to allow for more available/predictable options based off the initial layout outset.
	// In all cases of MELEE_FREE_INTERCEPT actions from current position, the formed engagement blob can overlap another blob as a leeway for all rulesets.
	public static inline var RULESET_ABSTRACT:Int = 
	( 
	0
	//|	MELEE_ORTHOGONAL_FULL_ONLY
	|   MELEE_FREE_INTERCEPT_JOINER_PATH
	//|   MELEE_FREE_INTERCEPT_ANYONE
	//|   MELEE_FREE_INTERCEPT_IMMEDIATE_RESPONSE
	|   MELEE_COST_INTERCEPT_JOINER
	//|   MELEE_COST_INTERCEPT_JOINER_NEWBLOB
	//|   MELEE_DIAGONAL_BISHOP_ENGAGE
	|	MELEE_JOIN_BOUT_2_VS_1_COST
	|	MELEE_JOIN_BOUT_3_VS_1_COST
	|	MELEE_JOIN_BOUT_2_VS_1_NEED_INIT
	|	MELEE_JOIN_BOUT_2_VS_1_NEED_INIT_AFTER
	|	MELEE_JOIN_BOUT_3_VS_1_NEED_INIT
	|	MELEE_JOIN_BOUT_3_VS_1_NEED_INIT_AFTER
	//|   MOVEMENT_DISPLACEMENT
	|   MOVEMENT_FRIENDLY_DIAGONAL_L
	//|   MOVEMENT_FRIENDLY_BISHOP_DIAGONAL_L
	//|   MOVEMENT_DIAGONAL_COST_ONE
	//|   CONFIRMED_BLOB_BLOCK_FRIENDLY
	//|   CONFIRMED_BLOB_BLOCK_ENEMY
	//|   UNCONFIRMED_BLOB_BLOCK_FRIENDLY
	//|   UNCONFIRMED_BLOB_BLOCK_ENEMY
	);
	
	
	// This ruleset tries to be as spatially "realistic" as possible from a tactical visual standpoint, and may be better suited if the chessboard is visually shown so that any "blockages" as mentioned by GM doesn't come across as arbituary.
	// All engagement blobs must be confirmed and synced via immediate response by opposing side if it can be interrupted, and will perform collision detection for both sides.
	// Any kind of engagements being formed,  will form such blobs which will result in collision blackages, and all such engagements must be confirmed per turn.
	// Actual per-turn movement displacement, though this can be considered not required as a variant.
	// Can freely intercept anyone along path due to immediate response MELEE_FREE_INTERCEPT_IMMEDIATE_RESPONSE, so spatial positioning takes precedence over initiative ladder placing.
	// This ruleset has a conumdrum with whether to optionally provide more collision blockages than necessary when excluding  MOVEMENT_DISPLACEMENT, since this will result in double onion-skinned collision hulls along both start formation position and end-engagement positions. This might make movement too restrictive beyond it's own good.
	public static inline var RULESET_SPATIAL_REALISM:Int = 
	( 
	0
	//|	MELEE_ORTHOGONAL_FULL_ONLY
	|   MELEE_FREE_INTERCEPT_JOINER_PATH
	|   MELEE_FREE_INTERCEPT_ANYONE   // consider not having... to fit pen-n-paper rules and reward first-time initaitive high-mobiliy engagers
	|   MELEE_FREE_INTERCEPT_IMMEDIATE_RESPONSE
	|   MELEE_COST_INTERCEPT_JOINER
	|   MELEE_COST_INTERCEPT_JOINER_NEWBLOB
	//|   MELEE_DIAGONAL_BISHOP_ENGAGE
	|	MELEE_JOIN_BOUT_2_VS_1_COST
	|	MELEE_JOIN_BOUT_3_VS_1_COST
	|	MELEE_JOIN_BOUT_2_VS_1_NEED_INIT
	|	MELEE_JOIN_BOUT_2_VS_1_NEED_INIT_AFTER
	|	MELEE_JOIN_BOUT_3_VS_1_NEED_INIT
	|	MELEE_JOIN_BOUT_3_VS_1_NEED_INIT_AFTER
	|   MOVEMENT_DISPLACEMENT   	 // consider not having... to enforce better formation setups from the beginning
	|   MOVEMENT_FRIENDLY_DIAGONAL_L
	//|   MOVEMENT_FRIENDLY_BISHOP_DIAGONAL_L
	//|   MOVEMENT_DIAGONAL_COST_ONE  
	|   CONFIRMED_BLOB_BLOCK_FRIENDLY
	|   CONFIRMED_BLOB_BLOCK_ENEMY
	|   UNCONFIRMED_BLOB_BLOCK_FRIENDLY
	|   UNCONFIRMED_BLOB_BLOCK_ENEMY
	);
	
	// eg. variation
	//public static inline var RULESET_SPATIAL_REALISM_2:Int = (RULESET_SPATIAL_REALISM & ~MOVEMENT_DISPLACEMENT);
	
	// -----------------------------------
	
	// trying out some weird combination without having to resort to MELEE_FREE_INTERCEPT_IMMEDIATE_RESPONSE... 
	// Bsaically, unconfirmed engagement blobs will block friendlies, but not the enemies.
	// This is to encourage players to go for confirmed blobs that can't be intercepted, since going for an unconfirmed engagement blob is akin to "gambling" and will not block movement path of enemies. Going for confirmed blobs will block both enemies and friendlies though...
	// There are possible spatial exploits due to the lack of enemy's MELEE_FREE_INTERCEPT_IMMEDIATE_RESPONSE,  so "the formed engagement blob can overlap another blob" as a leeway should be noted due to out-of-sync timing situations. Also, 
	public static inline var RULESET_TRYOUT:Int = 
	( 
	0
	//|	MELEE_ORTHOGONAL_FULL_ONLY
	|   MELEE_FREE_INTERCEPT_JOINER_PATH
//	|   MELEE_FREE_INTERCEPT_ANYONE   // consider not having... to fit pen-n-paper rules and reward first-initaitive high-mobiliy engagers
//	|   MELEE_FREE_INTERCEPT_IMMEDIATE_RESPONSE
	|   MELEE_COST_INTERCEPT_JOINER
	//|   MELEE_COST_INTERCEPT_JOINER_NEWBLOB
	//|   MELEE_DIAGONAL_BISHOP_ENGAGE
	|	MELEE_JOIN_BOUT_2_VS_1_COST
	|	MELEE_JOIN_BOUT_3_VS_1_COST
	|	MELEE_JOIN_BOUT_2_VS_1_NEED_INIT
	|	MELEE_JOIN_BOUT_2_VS_1_NEED_INIT_AFTER
	|	MELEE_JOIN_BOUT_3_VS_1_NEED_INIT
	|	MELEE_JOIN_BOUT_3_VS_1_NEED_INIT_AFTER
	|   MOVEMENT_DISPLACEMENT   	 // consider not having... to enforce better formation setups
	|   MOVEMENT_FRIENDLY_DIAGONAL_L
	//|   MOVEMENT_FRIENDLY_BISHOP_DIAGONAL_L
	//|   MOVEMENT_DIAGONAL_COST_ONE  
	|   CONFIRMED_BLOB_BLOCK_FRIENDLY
	|   CONFIRMED_BLOB_BLOCK_ENEMY
	|   UNCONFIRMED_BLOB_BLOCK_FRIENDLY
	//|   UNCONFIRMED_BLOB_BLOCK_ENEMY
	);
	
	public function new() 
	{
		
	}
	
}

/* 
 
Not all rules can/shoudl be implemented. It all depends...
First mentioned case is deemed a FALSE, before TRUE.

Melee Engagement spatial rules:
-------------------------------
1) Orthogonal Adjaciency: The one that actively engages a target, must move into position to be orthogonally adjacient to the target (ie. touching on orthogonal edge by at least a half square) in order to form an Engagement Blob at his current position solely tied to the target only.
a) Only full square adjaciency allowed instead of also allowing half square


2) Freely intercept bout joiner engager: A case of freely intercepting someone who is wanting to join a bout at a particular location . (Engager joining a bout to stack over an engagement blob vs joining a bout by creating a new engagement blob adjacient to target).  
 - This can happen when the enroute-movement path to the target he wishes to engage can be intercepted along adjacient orthogonal touch.
 - This can happen along the diagonal corner touch at the end location (where the blob was formed), if the blob is stacked with >1 person in it.

3) Freely intercept ANY engager: Same as above but not just for bout-joiners, for anyone wishing to start a new bout against any target. This means such engagemement blobs are deemed UNCONFIRMED.

4) The presence of an engagmeent blob is important, because if they do act as obstacles along the way, it'll affect what movements (and thus what engagements) are available. 
For the case of unconfirmed blobs, can they be freely intercepted by the relavant opposition (in order/priority of appearance) immediately AFTER the move is declared on someone's turn else it'll be confirmed?

5)  Non-free intercept bout joiner: 
Someone can move to adjaciently intercept any given bout-joiner at a confirmed blob as long as it's within range/adjaciency to form a new engagement blob adjacient to that person's blob being intercepted. However, this should only work  by if the interceptor  has higher placing in the initiative ladder compared to the  bout joiner being intercepted. Otherwise, it's considered as approaching but unable to intercept for the current Round of Limelights until later. (This, however, might favour high initiative attackers though, as they can outnumber someone someone wjo;e being able to reach him in time to help him out out yet).
a) Form new blob adjacient to the one being intercepted or can freely join blob?

6) Engaging enemies can occur along half-open diagonal, not just orthogonal.
a) Closed diagonal engagement also possible. (eg. Queen/King/Bishop chess piece)

7) Joining bout to outnumber someone yields initiative ladder drop costs and possible limitations that might not even make it possible
a) Join bout 2vs1 initiative ladder cost? (3 places) (disadvantages the high initiative outnumberers by a certain amount)
b) Join bout 3vs1 initiative ladder cost? (6 places) (disadvantages the high initiative outnumberers by a certain amount)
c) Join bout 2vs1 must be in higher initiative placing, else cannot join bout but can only approach. (disadvantages the  low initiative charcters)
  c.i) ...determines this after drop in initiative ladder placing after paying any costs
d) Join bout 3vs1 must be in higher initiative placing,  else cannot join bout but can only approach. (disadvantages the  low initiative charcters)
  d.i) ...determines after drop in initiative ladder placing after  paying any costs
This is to fit pen and paper rules better, and reward high initiative winners better by reducign first move disadvantage (eg. movign in to engage someone first..only to get engaged by others that move in later..). 




Movement rules:
----------------
1) All planned movements are done from existing formation reference positions, regardless of turn order.
OR
All movement will occur for a given turn to update positioning. The formation position is altered as a result and can provide openings for those behind that have yet to make their turn.

2) Friendly Diagonal L (uses 2 square movements) opening allowed if target diagonal destination is available and only crosses 1 half (or less) square of a friendly unit for an L shape path to the diagonal destination.
a) Friendly Bishop tight diagonal move ( intersect both friendlies) along L shape.
b) Diagonal costs only 1 movement point instead of 2

3) For engagement blobs that are formed,  do they block the path of units? If so, among friendlies/enemies or both?
For confirmed blobs
a) Blocks friendlies
b) Blocks enemies

4) For unconfirmed blobs
a) Blocks friendlies
b) Blocks enemies

*/


/*
 * Dealing with melee outnumberers while within a formation:
--------------------------------------------------
House-rule that allows Multiple Opponents terrain roll to be done within a formation without being forced to leave the formation. This is happens when your "friends" beside you in the formation act as a natural obstacle/deterrant against multiple enemies being able to find an adequate opening to hit you. Thus, the enemies, even though they are engaging/targeting you, is effectively engaging the "formation" as well. 
Note that there can be cases where you'll still be forced to leave the formation. How to determine this?

Before the first limelight starts, in order of limelights and mobility for outnumberers within the limelight, shift individual engagement blobs of outnumberers away from  diagonal and adjacient contacts from your other "friends" within the target formation, if space allows, while still maintaining engagement contact on you. Any outnumberers, if no longer being marked out by friends within your formation, in order to be avoided, must also yield movement on your part (forcing you to leave the formation) with your successful terrain roll. In short, there can be cases where performing a Terrain Roll might require you to leave the formation in order to avoid a specific outnumberer, otherwise, you have to suck it up within the formation and deal with that particular enemy as well. Depending on the nature of your exposed flanks within your formation, you might being forced to leave the formation or get murdered by multiple enemies. This is how a formation MIGHT end up breaking during a melee clash.
*/



