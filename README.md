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

- While `npm start` is running, recent entries should be in `languages/epfl.pot`
- Add or Merge the new entries into the `languages/epfl-fr_FR.po` file
- Assert the translations in `languages/epfl-fr_FR.po`
- Update the json file with `./node_modules/po2json/bin/po2json ./languages/epfl-fr_FR.po ./languages/epfl-fr_FR-wp-gutenberg-scripts.json -f jed1.x -p`
- Update the mo file with Poedit

## References
- https://developer.wordpress.org/block-editor/tutorials/
