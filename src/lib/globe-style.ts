/**
 * Shared visual language for the 3D globe and the 2D vector map.
 *
 * Both views read these tokens, so continents, oceans, coastlines and the
 * graticule look identical across a view switch. Colours only — no geometry,
 * no data, no imagery.
 */

export const EARTH_STYLE = {
  /** deep ocean near the poles -> lighter ocean at the equator */
  oceanDeep: '#04182c',
  oceanMid: '#0a3050',
  oceanShallow: '#10456b',
  /** subtle land greens */
  landLow: '#153b30',
  landHigh: '#276148',
  coast: '#6fe3c4',
  graticule: '#4a86c8',
  graticuleMajor: '#7dd3fc',
  atmosphere: '#5aa2e8',
  space: '#03060d',
} as const;
