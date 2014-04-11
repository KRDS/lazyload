/**
 * PxLoader plugin to load CSS
 */
function PxLoaderCss(src, tags, priority)
{
    var self	=	this,
        loader	=	null;

    this.tags		=	tags;
    this.priority	=	priority;
	
	this.lazyLoad	=	new CssLoader();
	
	var onLoad = function()
	{
        loader.onLoad(self);
    };

    this.start = function(pxLoader)
	{
        // we need the loader ref so we can notify upon completion
        loader = pxLoader;

		self.lazyLoad.css(src, onLoad);
    };

    // called by PxLoader when it is no longer waiting
    this.onTimeout = function()
	{	   		
	    if( ! self.lazyLoad.pending)
            loader.onLoad(self);
        else
            loader.onTimeout(self);
    };

    // returns a name for the resource that can be used in logging
    this.getName = function()
	{
        return src;
    };
}

// add a convenience method to PxLoader for adding a font
PxLoader.prototype.addCss = function(src, tags, priority)
{
    var cssLoader = new PxLoaderCss(src, tags, priority);
    this.add(cssLoader);

    // return the Font instance to the caller
    return cssLoader.lazyLoad;
};
