/**
 * Vector basemap for the 2D operational map.
 *
 * Projects the *same* vector land data the 3D globe renders (no imagery, no
 * textures), so both views always show identical continents and grid.
 */

import { LAND_POLYGONS, LAND_RINGS } from '@/lib/vector-globe';
import { MAP_H, MAP_W, project } from '@/lib/geo2d';

const fmt = (n: number) => n.toFixed(2);

/** Filled landmasses as a single SVG path (even-odd handles lakes/holes). */
export const LAND_PATH_2D: string = (() => {
  const d: string[] = [];
  for (const poly of LAND_POLYGONS) {
    for (const ring of poly) {
      if (ring.length < 3) continue;
      ring.forEach(([lon, lat], i) => {
        const p = project(lat, Math.max(-180, Math.min(180, lon)));
        d.push(`${i === 0 ? 'M' : 'L'} ${fmt(p.x)} ${fmt(p.y)}`);
      });
      d.push('Z');
    }
  }
  return d.join(' ');
})();

/** Coastline strokes. */
export const COAST_PATH_2D: string = (() => {
  const d: string[] = [];
  for (const ring of LAND_RINGS) {
    if (ring.length < 2) continue;
    ring.forEach(([lon, lat], i) => {
      const p = project(lat, Math.max(-180, Math.min(180, lon)));
      d.push(`${i === 0 ? 'M' : 'L'} ${fmt(p.x)} ${fmt(p.y)}`);
    });
  }
  return d.join(' ');
})();

/** Lat/lon graticule matching the globe's grid step. */
export function graticulePath2D(step = 15): string {
  const d: string[] = [];
  for (let lat = -90 + step; lat < 90; lat += step) {
    const y = project(lat, 0).y;
    d.push(`M 0 ${fmt(y)} L ${MAP_W} ${fmt(y)}`);
  }
  for (let lon = -180 + step; lon < 180; lon += step) {
    const x = project(0, lon).x;
    d.push(`M ${fmt(x)} 0 L ${fmt(x)} ${MAP_H}`);
  }
  return d.join(' ');
}

export const GRATICULE_PATH_2D = graticulePath2D(15);

/** Equator and quarter meridians — the 2D twin of graticuleMajorGeometry(). */
export const GRATICULE_MAJOR_PATH_2D: string = (() => {
  const d: string[] = [];
  const eq = project(0, 0).y;
  d.push(`M 0 ${fmt(eq)} L ${MAP_W} ${fmt(eq)}`);
  for (const lon of [-90, 0, 90]) {
    const x = project(0, lon).x;
    d.push(`M ${fmt(x)} 0 L ${fmt(x)} ${MAP_H}`);
  }
  return d.join(' ');
})();
