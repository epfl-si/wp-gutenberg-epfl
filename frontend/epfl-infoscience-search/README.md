# Infoscience search documentation

This plugin aims to fetch and render Infoscience data.

It provides users with a Gutenberg UI to configure some options, like the grouping, the order, ...

## Getting started

Edit a post/page in Wordpress and select below the method who suit you the must.
You can switch the method by pressing Ctrl+Shift+Alt+M

### Use visual editor

Add the 'EPFL Infoscience' block and edit the attributes on the block panel. 

### Use Code

Add this block definition and configure the parameters as you like:

- direct url
    ```
    <!-- wp:epfl/infoscience-search {"url":"https://infoscience.epfl.ch/search?p=vetterli"} /-->
    ```
- with patterns
    ```
    <!-- wp:epfl/infoscience-search {"pattern":"vetterli"} /-->
    ```


## Understanding

Provide some key elements to understand the underlying goals of the code.

### Data providers

They should provide a MARCXML list. The code is compatible with Invenio data coming from infoscience.epfl.ch.

### Cache

Valid results are cached once the page is published and visited.

Take a look into ./charts after reading this for some meaningful info about the cache.

The cache system consists of three parts :
- short 
  - as soon as some valid results are fetched from infoscience.epfl.ch, they are put into this cache.
  - use: the WP transient system
  - type: temporal
  - TTL: Less than the long one
- long
  - a copy of the short cache is saved into the long cache. It is used only when infoscience.epfl.ch is not returning valid results anymore.
  - use: WP option through the WP transient system
  - type: temporal
  - TTL: More than the short one
- db
  - a copy of the short cache. Used when we transit from an engine to another, and the urls are no more compatible. So we still have some data to provide. 
  - Later, it will be a readonly table used only to keep results for the old infoscience block.
  - use: a custom table
  - type: eternal
  - TTL: as long as the data in the table 'epfl_infoscience_cache_db' exists.


Cases when the cache is bypassed:
    - in wp-admin, when a user edit a page
    - when one of parameters is set for the block definition:
        - debugCache
        - debugData
        - debugTemplate

## Reference

### Block parameters

An incomplete list of some useful attributes. Some of the attributes may be hidden from the UI and require the code editor view.

- debug
  - Set it to get additional information as a div at the top of the render. 
  ```
  <!-- wp:epfl/infoscience-search {"pattern":"vetterli","debug":true} /-->
  ```
- debugData
  - Set it to get additional information about the raw data.
- debugTemplate
    - Set it to debug the template system.
- noCache
  - Set it to desactivate the cache. Should be used on dev only.
