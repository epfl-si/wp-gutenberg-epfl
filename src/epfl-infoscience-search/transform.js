/**
 * Set some functions about migrating block variations
 */

const {
  getProtocol,
  getAuthority,
  getQueryArgs,
  buildQueryString,
} = wp.url;

export const transformInvenioURLToDSpaceURL = ( url ) =>  {
  console.log('transforming url...', getQueryArgs( url ) )

  // get and omit some paramaters
  const {
    p,
    c,
    ...queryArgs
  } = getQueryArgs( url )

  const newQueryString = buildQueryString( {
    query: p,
    ...queryArgs
  } );

  console.log('transformed query...', newQueryString)

  return getProtocol(url) + '//' + getAuthority(url) + '/search?' + newQueryString
}
