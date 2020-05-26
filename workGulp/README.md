# Template for building difficult websites

## Use:
  1. HTML (PUG)
  2. CSS (SCSS)
  3. JS (+jQuery)
  4. Gulp
  5. SVG (+sprites)

## Class naming
```
.block
.block_elem
.block_elem.__modificator
```

## SCSS Organize
```
.block {
  /* Inheritance */
  @extend
  @mixin, e.g. clearfix

  /* Generated content */
  content: "";

  /* Positioning */
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  Flexbox properties
  float
  clear

  /* Block model */
  display: inline-block;
  float: left;
  width: 150px;
  height: 150px;
  margin: 25px;
  padding: 25px;

  /* Typography */
  font: normal 13px/1.5 "Helvetica", sans-serif;
  font-style: normal;
  font-size: 13px;
  line-height: 1.5;
  font-family: "Helvetica", sans-serif;
  text-align: start;

  /* Appearance */
  color: #999999;
  background-color: #e3e3e3;
  border: 1px solid #333333;
  border-radius: 5px;
  opacity: 1;

  /* Animation */
  transition: all 0.8s;

  /* Other */
  will-change: auto;
}
```