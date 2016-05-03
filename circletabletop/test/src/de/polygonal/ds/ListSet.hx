/*
Copyright (c) 2008-2016 Michael Baczynski, http://www.polygonal.de

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
package de.polygonal.ds;

import de.polygonal.ds.tools.Assert.assert;
import de.polygonal.ds.tools.GrowthRate;
import de.polygonal.ds.tools.M;

using de.polygonal.ds.tools.NativeArrayTools;

/**
	A simple set using an array
**/
#if generic
@:generic
#end
class ListSet<T> implements Set<T>
{
	/**
		A unique identifier for this object.
		
		A hash table transforms this key into an index of an array element by using a hash function.
		
		<warn>This value should never be changed by the user.</warn>
	**/
	public var key(default, null):Int = HashKey.next();
	
	/**
		The capacity of the internal container.
		
		The capacity is usually a bit larger than `size` (_mild overallocation_).
	**/
	public var capacity(default, null):Int;
	
	/**
		The growth rate of the container.
		
		+  0: fixed size
		+ -1: grows at a rate of 1.125x plus a constant.
		+ -2: grows at a rate of 1.5x (default value).
		+ -3: grows at a rate of 2.0x.
		+ >0: grows at a constant rate: capacity += growthRate
	**/
	public var growthRate:Int = GrowthRate.NORMAL;
	
	/**
		If true, reuses the iterator object instead of allocating a new one when calling ``iterator()``.
		
		The default is false.
		
		<warn>If true, nested iterations are likely to fail as only one iteration is allowed at a time.</warn>
	**/
	public var reuseIterator:Bool = false;
	
	var mData:NativeArray<T>;
	var mInitialCapacity:Int;
	var mSize:Int = 0;
	var mIterator:ListSetIterator<T> = null;
	
	public function new(initialCapacity:Null<Int> = 16, ?source:Array<T>)
	{
		mInitialCapacity = M.max(1, initialCapacity);
		capacity = mInitialCapacity;
		if (source != null) capacity = source.length;
		mData = NativeArrayTools.alloc(capacity);
		if (source != null) for (i in source) set(i);
	}
	
	/**
		Preallocates storage for `n` elements.
		
		May cause a reallocation, but has no effect on the vector size and its elements.
		Useful before inserting a large number of elements as this reduces the amount of incremental reallocation.
	**/
	public function reserve(n:Int):ListSet<T>
	{
		if (n > capacity)
		{
			capacity = n;
			resizeContainer(n);
		}
		return this;
	}
	
	/**
		Reduces the capacity of the internal container to the initial capacity.
		
		May cause a reallocation, but has no effect on the vector size and its elements.
		An application can use this operation to free up memory by GC'ing used resources.
	**/
	public function pack():ListSet<T>
	{
		if (capacity > mInitialCapacity)
		{
			capacity = M.max(mInitialCapacity, mSize);
			resizeContainer(capacity);
		}
		else
		{
			var d = mData;
			for (i in mSize...capacity) d.set(i, cast null);
		}
		return this;
	}
	
	/**
		Returns a string representing the current object.
		
		Example:
		<pre class="prettyprint">
		var set = new de.polygonal.ds.ListSet<String>();
		set.set("val1");
		set.set("val2");
		trace(set);</pre>
		<pre class="console">
		{ ListSet size: 2 }
		[
		  val1
		  val2
		]</pre>
	**/
	public function toString():String
	{
		var b = new StringBuf();
		b.add('{ ListSet size: ${size} }');
		if (isEmpty()) return b.toString();
		b.add("\n[\n");
		for (i in 0...size) b.add('  ${Std.string(mData[i])}\n');
		b.add("]");
		return b.toString();
	}
	
	/* INTERFACE Set */
	
	/**
		Returns true if this set contains the element `x`.
	**/
	public function has(x:T):Bool
	{
		if (isEmpty()) return false;
		var d = mData;
		for (i in 0...size) if (d.get(i) == x) return true;
		return false;
	}
	
	/**
		Adds the element `x` to this set if possible.
		@return true if `x` was added to this set, false if `x` already exists.
	**/
	public function set(x:T):Bool
	{
		var d = mData;
		for (i in 0...size) if (d.get(i) == x) return false;
		if (size == capacity)
		{
			grow();
			d = mData;
		}
		d.set(mSize++, x);
		return true;
	}
	
	/**
		Removes the element `x` from this set if possible.
		@return true if `x` was removed from this set, false if `x` does not exist.
	**/
	public inline function unset(x:T):Bool
	{
		return remove(x);
	}
	
	/**
		Adds all elements of the set `x` to this set.
		<assert>element is not of type `Cloneable`</assert>
		@param assign if true, the `copier` parameter is ignored and primitive elements are copied by value whereas objects are copied by reference.
		If false, the ``clone()`` method is called on each element. <warn>In this case all elements have to implement `Cloneable`.</warn>
		@param copier a custom function for copying elements. Replaces ``element::clone()`` if `assign` is false.
	**/
	public function merge(x:Set<T>, ?assign:Bool, copier:T->T = null)
	{
		if (assign)
		{
			for (val in x) set(val);
		}
		else
		{
			if (copier != null)
			{
				for (val in x)
					set(copier(val));
			}
			else
			{
				for (val in x)
				{
					assert(Std.is(val, Cloneable), "element is not of type Cloneable");
					
					#if python //TODO only required for haxe 3.2.x
					var t:Cloneable<Dynamic> = cast val;
					set(t.clone());
					#else
					set(cast(val, Cloneable<Dynamic>).clone());
					#end
				}
			}
		}
		
	}
	
	/**
		The total number of elements.
	**/
	public var size(get, never):Int;
	inline function get_size():Int
	{
		return mSize;
	}
	
	/**
		Destroys this object by explicitly nullifying all elements.
		
		Improves GC efficiency/performance (optional).
	**/
	public function free()
	{
		mData.nullify();
		mData = null;
		if (mIterator != null)
		{
			mIterator.free();
			mIterator = null;
		}
	}
	
	/**
		Same as ``has()``.
	**/
	public function contains(x:T):Bool
	{
		return has(x);
	}
	
	/**
		Removes the element `x`.
		@return true if `x` was successfully removed.
	**/
	public function remove(x:T):Bool
	{
		var d = mData;
		for (i in 0...size)
			if (d.get(i) == x)
			{
				d.set(i, mData.get(--mSize));
				return true;
			}
		return false;
	}
	
	/**
		Removes all elements.
		@param gc if true, nullifies references upon removal so the garbage collector can reclaim used memory.
	**/
	public function clear(gc:Bool = false)
	{
		if (gc) mData.nullify();
		mSize = 0;
	}
	
	/**
		Iterates over all elements contained in this set.
		
		The elements are visited in a random order.
		
		See <a href="http://haxe.org/ref/iterators" target="mBlank">http://haxe.org/ref/iterators</a>
	**/
	public function iterator():Itr<T>
	{
		if (reuseIterator)
		{
			if (mIterator == null)
				mIterator = new ListSetIterator<T>(this);
			else
				mIterator.reset();
			return mIterator;
		}
		else
			return new ListSetIterator<T>(this);
	}
	
	/**
		Returns true if this set is empty.
	**/
	public function isEmpty():Bool
	{
		return size == 0;
	}
	
	/**
		Returns an unordered array containing all elements in this set.
	**/
	public function toArray():Array<T>
	{
		return mData.toArray(0, size);
	}
	
	/**
		Duplicates this set. Supports shallow (structure only) and deep copies (structure & elements).
		<assert>element is not of type `Cloneable`</assert>
		@param assign if true, the `copier` parameter is ignored and primitive elements are copied by value whereas objects are copied by reference.
		If false, the ``clone()`` method is called on each element. <warn>In this case all elements have to implement `Cloneable`.</warn>
		@param copier a custom function for copying elements. Replaces ``element::clone()`` if `assign` is false.
	**/
	public function clone(assign:Bool = true, copier:T->T = null):Collection<T>
	{
		var out = new ListSet<T>();
		out.capacity = size;
		out.mSize = size;
		out.mData = NativeArrayTools.alloc(size);
		
		var src = mData;
		var dst = out.mData;
		
		if (assign)
			src.blit(0, dst, 0, size);
		else
		if (copier == null)
		{
			for (i in 0...size)
			{
				assert(Std.is(src.get(i), Cloneable), "element is not of type Cloneable");
				
				#if python //TODO only required for haxe 3.2.x
				var t:Cloneable<Dynamic> = cast src.get(i);
				dst.set(i, t.clone());
				#else
				dst.set(i, cast(src.get(i), Cloneable<Dynamic>).clone());
				#end
			}
		}
		else
		{
			for (i in 0...size)
				dst.set(i, copier(src.get(i)));
		}
		return cast out;
	}
	
	function grow()
	{
		capacity = GrowthRate.compute(growthRate, capacity);
		resizeContainer(capacity);
	}
	
	function resizeContainer(newSize:Int)
	{
		var t = NativeArrayTools.alloc(newSize);
		mData.blit(0, t, 0, mSize);
		mData = t;
	}
}

@:access(de.polygonal.ds.ListSet)
#if generic
@:generic
#end
@:dox(hide)
class ListSetIterator<T> implements de.polygonal.ds.Itr<T>
{
	var mObject:ListSet<T>;
	var mData:NativeArray<T>;
	var mI:Int;
	var mS:Int;
	
	public function new(x:ListSet<T>)
	{
		mObject = x;
		reset();
	}
	
	public function free()
	{
		mObject = null;
		mData = null;
	}
	
	public inline function reset():Itr<T>
	{
		mData = mObject.mData;
		mS = mObject.size;
		mI = 0;
		return this;
	}
	
	public inline function hasNext():Bool
	{
		return mI < mS;
	}
	
	public inline function next():T
	{
		return mData.get(mI++);
	}
	
	public function remove()
	{
		assert(mI > 0, "call next() before removing an element");
		
		mData.set(mI, mData.get(--mS));
	}
}