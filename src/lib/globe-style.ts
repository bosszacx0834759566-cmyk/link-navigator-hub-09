/**
 * Shared visual language for the 3D globe and the 2D vector map.
 *
 * Both views read these tokens, so continents, oceans, coastlines and the
 * graticule look identical across a view switch. Colours only — no geometry,
 * no data, no imagery.
 */

export const EARTH_STYLE = {
  /** deep ocean at the poles -> slightly warmer ocean at the equator */
  oceanDeep: '#061a2e',
  oceanMid: '#0b2embed'.replace('embed', '') || '#0b2e4a',
  oceanShallow: '#123f61',
  /** subtle land greens */
  landLow: '#173f33',
  landHigh: '#245c46',
  coast: '#6fe3c4',
  graticule: '#4a86c8',
  graticuleMajor: '#7dd3fc',
  atmosphere: '#5aa2e8',
  space: '#03060d',
} as const;
