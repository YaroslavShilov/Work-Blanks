# Template for building difficult websites

## Use:
  1. HTML (PUG)
  2. CSS (SCSS)
  3. JS (+jQuery)
  4. Gulp
  5. SVG (+sprites)

##Bem
### Class naming (global system)
```
.block
.block__elem
.block__elem--modificator
```

```
<header class="header">
    
    //we use this logo only in header, It's an element
    <a class="header__logo" href="#">Logo</a>

    //we use this menu in header and footer, It's a block
    <nav class="menu">....</nav> 

    //we use this search in header and global, It's a mix
    //we use it for margin, because block mustn't have margin
    <a class="search-form header__search-form" href="#">search</a>
</header>
```

### More Examples
```
#html
<div class="block">
  <div class="block__elem1">
    <div class="block__elem2">
	    <div class="block__elem3"></div>
    </div>
  </div>

  <div class="block__elem4"></div> 
</div>

#css
.block {}
.block__elem1 {}
.block__elem2 {}
.block__elem3 {}
.block__elem4 {}

## !!!NOT!!! не используй вложенность
.block .block__elem1 .block__elem2 {} //bad
.block__elem1 .block__elem2 {} //bad
```

## CSS Organize
```
.block {
    /* Inheritance */
    @extend
    @mixin, e.g. clearfix
    
    /* Generated content */
    content
    
    /* Positioning */
    position
    top
    right
    bottom
    left
    z-index
    
    
    /* Block model */
    display
    float
    flex
    table
    grid
    width
    height
    max-width
    max-height
    min-width
    min-height
    padding
    margin
    overflow
    clip
    clear
    
    /* Typography */
    font
    font-family
    font-size
    font-smoothing
    osx-font-smoothing
    font-style
    font-weight
    hyphens
    src
    line-height
    letter-spacing
    word-spacing
    text-align
    text-decoration
    text-indent
    text-overflow
    text-rendering
    text-size-adjust
    text-shadow
    text-transform
    word-break
    word-wrap
    white-space
    vertical-align
    list-style
    pointer-events
    cursor
    
    /* Visual */
    color
    background
    border
    border-radius
    quotes
    outline
    opacity
    visibility
    filter
    size
    zoom
    transform
    box-align
    box-flex
    box-orient
    box-pack
    box-shadow
    box-sizing
    table-layout
    animation
    transition
    backface-visibility
    resize
    appearance
    user-select
    interpolation-mode
    direction
    marks
    page
    set-link-source
    unicode-bidi
    speak
    will-change: auto;
}
```
