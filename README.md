# wp-gutenberg-epfl
> A plugin for Wordpress which provides multiple blocks for EPFL services, based on [Wordpress Gutenberg](https://github.com/WordPress/gutenberg).

## How to dev

### Clone
- Clone this repo to your local machine using `git clone https://github.com/epfl-si/wp-gutenberg-epfl`
 
### Setup
- npm
    - Assert you have npm installed or [follow this process to install it](https://developer.wordpress.org/block-editor/tutorials/devenv/)
- Install dependencies `npm install`

 
### Dev
- Start development builds: `npm start`
- Develop. Test. Repeat.
- Create production build: `npm run build`

### Translate

- Recent entries should be in `languages/epfl-fr_FR-scripts.pot`
- Copy this entries into the languages/epfl-fr_FR.po
- Translate it and run the .po to .json converter
`./node_modules/po2json/bin/po2json ./languages/epfl-fr_FR.po ./languages/epfl-fr_FR-wp-gutenberg-script-translations.json -f jed`

## References
- https://developer.wordpress.org/block-editor/tutorials/
