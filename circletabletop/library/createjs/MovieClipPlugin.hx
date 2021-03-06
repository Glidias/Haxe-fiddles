package createjs;

/**
 * This plugin works with <a href="http://tweenjs.com" target="_blank">TweenJS</a> to prevent the startPosition
 * property from tweening.
 */
extern class MovieClipPlugin
{
	function new() : Void;

	function tween(tween:Tween, prop:String, value:Dynamic, startValues:Array<Dynamic>, endValues:Array<Dynamic>, ratio:Float, wait:Dynamic, end:Dynamic) : Dynamic;
}