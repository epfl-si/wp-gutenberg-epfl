/**
 * Set some functions about migrating block variations
 */

const {
  getProtocol,
  getAuthority,
  getQueryArgs,
  buildQueryString,
} = wp.url;


const parseP = (p = '') => {
  if (p && (typeof p === 'string' || p instanceof String) ) {
    if (p.includes('recid:')) {
      p = p.replace('recid:', 'cris.legacyId:')
    }

    if (p.includes('unit:')) {
      p = p.replace('unit:', 'dc.description.sponsorship:')
    }
  }

  return p
}

const getSortOrderFromInvenioUrl = (sortField, sortDirection ) => {
  let sortParameters = {}

  if (sortDirection === 'a') {
    sortParameters['spc.sd'] = 'ASC'
  } else if (sortDirection === 'd') {
    sortParameters['spc.sd'] = 'DESC'
  }

  if (sortField === 'year') {
    sortParameters['spc.sf'] = 'dc.date.issued'
  }

  return sortParameters
}

export const transformInvenioURLToDSpaceURL = ( url ) =>  {
  // get and omit some paramaters
  const {
    c,  // cleared
    p,  // to query
    sf,  // to spc.sf
    rg,  // to spc.rpp
    so,  // to spc.sd
    sort, // to spc.sd
    ...queryArgs
  } = getQueryArgs( url )

  let newQuery = {
    configuration: 'researchoutputs',
    query: parseP(p),
    'spc.rpp': rg ?? 10,
    ...getSortOrderFromInvenioUrl(sf, so ?? sort),
    ...queryArgs
  }

  // clean up empty entries
  newQuery = Object.entries(newQuery).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})

  const newQueryString = buildQueryString( newQuery );

  return getProtocol(url) + '//' + getAuthority(url) + '/search?' + newQueryString

}
