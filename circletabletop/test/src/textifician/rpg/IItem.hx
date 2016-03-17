package textifician.rpg;
import textifician.mapping.IXYZ;

/**
 * Marker class for pickable items
 * @author Glenn Ko
 */

interface IItem extends IXYZ
{
  public var name:String;
}