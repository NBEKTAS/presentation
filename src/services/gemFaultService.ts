// GEM (Global Earthquake Model) Global Active Faults API Service
// Calls official GEM GAF-DB hosted on ArcGIS Online FeatureServer
// Query pattern: GET https://services.arcgis.com/jIL9msH9OI208GCb/arcgis/rest/services/Active_Faults/FeatureServer/0/query

export interface GemFaultProperties {
  OBJECTID: number;
  catalog_id: string;
  catalog_na: string;
  name?: string;
  slip_type: string;
  Shape__Length?: number;
  // Computed fields
  inferredName?: string;
  kinematicLabel?: string;
  styleColor?: string;
  dashArray?: string;
  weight?: number;
  lengthKm?: number;
}

export interface GemFaultFeature {
  type: 'Feature';
  id: number;
  geometry: {
    type: 'LineString' | 'MultiLineString';
    coordinates: number[][] | number[][][];
  };
  properties: GemFaultProperties;
}

export interface GemFeatureCollection {
  type: 'FeatureCollection';
  features: GemFaultFeature[];
}

export const GEM_FEATURE_SERVER_URL =
  'https://services.arcgis.com/jIL9msH9OI208GCb/arcgis/rest/services/Active_Faults/FeatureServer/0/query';

/**
 * Calculate geodesic line length in kilometers using Haversine formula
 */
export function calculatePolylineLengthKm(coords: number[][] | number[][][]): number {
  const haversine = (p1: number[], p2: number[]) => {
    const toRad = (x: number) => (x * Math.PI) / 180;
    const dLat = toRad(p2[1] - p1[1]);
    const dLon = toRad(p2[0] - p1[0]);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(p1[1])) * Math.cos(toRad(p2[1])) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return 6371 * c;
  };

  let total = 0;
  if (!Array.isArray(coords) || coords.length === 0) return 0;
  if (typeof coords[0][0] === 'number') {
    const pts = coords as number[][];
    for (let i = 0; i < pts.length - 1; i++) {
      total += haversine(pts[i], pts[i + 1]);
    }
  } else {
    const lines = coords as number[][][];
    for (const line of lines) {
      for (let i = 0; i < line.length - 1; i++) {
        total += haversine(line[i], line[i + 1]);
      }
    }
  }
  return Math.round(total * 10) / 10;
}

/**
 * Convert GeoJSON [lng, lat] coordinates to Leaflet [lat, lng]
 */
export function geoJsonToLeafletCoords(
  coords: number[][] | number[][][]
): [number, number][] | [number, number][][] {
  if (!Array.isArray(coords) || coords.length === 0) return [];
  if (typeof coords[0][0] === 'number') {
    return (coords as number[][]).map((pt) => [pt[1], pt[0]] as [number, number]);
  } else {
    return (coords as number[][][]).map((line) =>
      line.map((pt) => [pt[1], pt[0]] as [number, number])
    );
  }
}

/**
 * Spatial / catalog lookup to associate known regional and local Anatolian fault names
 * with the GEM / SHARE / EMME harmonized fault catalog IDs and geometries.
 */
export function enrichGemFaultProperties(props: GemFaultProperties, coords: number[][] | number[][][]): GemFaultProperties {
  const catId = (props.catalog_id || '').trim();
  let name = (props.name || '').trim();
  const slipType = (props.slip_type || 'Unknown').trim();

  // Determine kinematic styling & badge
  let styleColor = '#dc2626'; // Default red
  let dashArray: string | undefined = undefined;
  let weight = 2.8;
  let kinematicLabel = slipType;

  if (slipType.includes('Subduction') || slipType === 'Subduction_Thrust') {
    styleColor = '#7c3aed'; // Purple
    weight = 3.6;
    dashArray = '8, 4';
    kinematicLabel = 'Subduction Arc / Dalma-Batma';
  } else if (slipType === 'Dextral' || slipType === 'Sinistral' || slipType === 'Strike-Slip') {
    styleColor = '#0f172a'; // Charcoal
    weight = 3.0;
    dashArray = '6, 3.5';
    kinematicLabel = `${slipType} Strike-Slip / Doğrultu Atımlı`;
  } else if (slipType.includes('Reverse') || slipType === 'Thrust') {
    styleColor = '#9333ea'; // Violet
    weight = 3.2;
    kinematicLabel = `${slipType} / Ters Fay`;
  } else if (slipType.includes('Normal') && (slipType.includes('Dextral') || slipType.includes('Sinistral'))) {
    styleColor = '#ea580c'; // Amber orange
    weight = 3.0;
    dashArray = '5, 3';
    kinematicLabel = `${slipType} (Oblique / Verev Atımlı)`;
  } else if (slipType === 'Normal') {
    styleColor = '#dc2626'; // Red
    weight = 2.8;
    kinematicLabel = 'Normal Extensional Fault / Normal Fay';
  }

  // Known catalog ID mapping for Turkish / Aegean / Cyprus faults
  const catalogNameMap: Record<string, string> = {
    EUR_TRCS354: 'İzmir Fayı (İzmir Fault Zone - Balçova / Konak / Bornova)',
    EUR_TRCS355: 'İzmir Fayı (Doğu Segmenti - Bornova Basin)',
    EUR_TRCS360: 'Tuzla Fayı (Tuzla Fault Zone - Cumaovası / Seferihisar)',
    ME_TRCS360: 'Tuzla Fayı (Tuzla Strike-Slip Fault - Doğanbey / Gaziemir)',
    EUR_TRCS365: 'Karşıyaka Fayı (Karşıyaka-Bornova Fault System)',
    ME_TRCS365: 'Karşıyaka Fayı (Kuzey Körfez Segmenti)',
    EUR_TRCS367: 'Menemen Fayı (Menemen Fault Zone)',
    EUR_TRCS369: 'Kemalpaşa-Bornova Fayı (Kemalpaşa Graben Fault)',
    ME_TRCS369: 'Kemalpaşa-Bornova Fayı (Dextral-Normal)',
    EUR_TRCS361: 'Foça Fayı (Foça Fault Zone)',
    EUR_TRCS362: 'Karaburun Fayı (Karaburun Fault Zone)',
    EUR_TRCS363: 'Urla Fayı (Urla Fault Zone)',
    ME_TRCS363: 'Urla-Gülbahçe Fayı (Sinistral Fault)',
    EUR_TRCS326: 'Spil Dağı Batı Fayı (Spil Fault - Manisa)',
    EUR_TRCS327: 'Spil Dağı Doğu Fayı (Manisa Fault Zone)',
    EUR_TRCS328: 'Yamanlar Dağı Güneydoğu Fayı',
    EUR_TRCS210: 'Gediz Grabeni Güney Sınır Fayı (Salihli / Alaşehir)',
    ME_TRCS210: 'Gediz Graben Fault System',
    EUR_TRCS322: 'Gediz Grabeni Ana Fayı (Turgutlu / Ahmetli)',
    ME_TRCS322: 'Gediz Graben Boundary Fault',
    EUR_TRCS318: 'Büyük Menderes Grabeni Fayı (Aydın / Nazilli)',
    EUR_TRCS222: 'Simav Fayı (Simav Fault Zone)',
    EUR_TRCS353: 'Seferihisar Fayı (Seferihisar Fault Zone)',
  };

  if (!name && catalogNameMap[catId]) {
    name = catalogNameMap[catId];
  }

  // Spatial inference if name is still generic/blank
  if (!name) {
    // Extract first coordinate point
    let firstPt: [number, number] | null = null;
    if (Array.isArray(coords) && coords.length > 0) {
      if (typeof coords[0][0] === 'number') {
        firstPt = [coords[0][0] as number, coords[0][1] as number];
      } else if (Array.isArray(coords[0]) && typeof coords[0][0][0] === 'number') {
        firstPt = [coords[0][0][0] as number, coords[0][0][1] as number];
      }
    }

    if (firstPt) {
      const [lng, lat] = firstPt;
      // Cyprus Arc (Kıbrıs Yayı)
      if (lat >= 33.8 && lat <= 35.8 && lng >= 31.0 && lng <= 35.5) {
        name = 'Kıbrıs Yayı (Cyprus Arc Subduction Zone)';
      }
      // Hellenic Arc (Helen Yayı)
      else if (lat >= 34.0 && lat <= 36.5 && lng >= 24.0 && lng <= 29.5 && slipType.includes('Subduction')) {
        name = 'Helen Yayı (Hellenic Arc Subduction Zone)';
      }
      // North Anatolian Fault Zone
      else if (lat >= 40.0 && lat <= 41.5 && lng >= 26.0 && lng <= 41.0 && (slipType === 'Dextral' || slipType === 'Strike-Slip')) {
        name = 'Kuzey Anadolu Fay Zonu (NAFZ / KAF Segmenti)';
      }
      // East Anatolian Fault Zone
      else if (lat >= 36.5 && lat <= 39.5 && lng >= 36.0 && lng <= 41.0 && (slipType === 'Sinistral' || slipType === 'Strike-Slip')) {
        name = 'Doğu Anadolu Fay Zonu (EAFZ / DAF Segmenti)';
      }
      // Central Izmir basin vicinity
      else if (lat >= 38.35 && lat <= 38.55 && lng >= 27.0 && lng <= 27.35) {
        name = 'İzmir Metropol Aktif Fay Segmenti';
      }
      // Aegean Extensional Province
      else if (lat >= 37.5 && lat <= 39.5 && lng >= 26.0 && lng <= 29.0) {
        name = `Ege Açılma Havzası Fayı (${catId || 'GEM GAF-DB'})`;
      } else {
        name = `GEM Aktif Fay [${catId || 'GAF-DB'}]`;
      }
    } else {
      name = `GEM Aktif Fay [${catId || 'GAF-DB'}]`;
    }
  }

  const lengthKm = calculatePolylineLengthKm(coords);

  return {
    ...props,
    inferredName: name,
    kinematicLabel,
    styleColor,
    dashArray,
    weight,
    lengthKm,
  };
}

/**
 * Query GEM Active Faults from ArcGIS REST API using point + distance in kilometers
 * Exactly matching user's requested specification:
 * GET https://services.arcgis.com/jIL9msH9OI208GCb/arcgis/rest/services/Active_Faults/FeatureServer/0/query
 *   ?where=1=1
 *   &geometry={"x": lng, "y": lat}
 *   &geometryType=esriGeometryPoint
 *   &spatialRel=esriSpatialRelIntersects
 *   &distance=distanceKm
 *   &units=esriSRUnit_Kilometer
 *   &outFields=*
 *   &f=geojson
 */
export async function fetchGemFaultsByPoint(
  lng: number,
  lat: number,
  distanceKm = 100
): Promise<GemFeatureCollection> {
  const geometryObj = JSON.stringify({ x: lng, y: lat });
  const params = new URLSearchParams({
    where: '1=1',
    geometry: geometryObj,
    geometryType: 'esriGeometryPoint',
    spatialRel: 'esriSpatialRelIntersects',
    distance: distanceKm.toString(),
    units: 'esriSRUnit_Kilometer',
    outFields: '*',
    inSR: '4326',
    outSR: '4326',
    f: 'geojson',
  });

  const url = `${GEM_FEATURE_SERVER_URL}?${params.toString()}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`GEM ArcGIS request failed: ${response.status} ${response.statusText}`);
  }

  const rawData: GemFeatureCollection = await response.json();
  // Enrich properties
  const enrichedFeatures = rawData.features.map((f) => ({
    ...f,
    properties: enrichGemFaultProperties(f.properties, f.geometry.coordinates),
  }));

  return {
    ...rawData,
    features: enrichedFeatures,
  };
}

/**
 * Query GEM Active Faults from ArcGIS REST API by Bounding Box Envelope
 */
export async function fetchGemFaultsByBBox(
  west: number,
  south: number,
  east: number,
  north: number
): Promise<GemFeatureCollection> {
  const envelopeStr = `${west},${south},${east},${north}`;
  const params = new URLSearchParams({
    where: '1=1',
    geometry: envelopeStr,
    geometryType: 'esriGeometryEnvelope',
    spatialRel: 'esriSpatialRelIntersects',
    inSR: '4326',
    outSR: '4326',
    outFields: '*',
    f: 'geojson',
  });

  const url = `${GEM_FEATURE_SERVER_URL}?${params.toString()}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`GEM ArcGIS BBox request failed: ${response.status} ${response.statusText}`);
  }

  const rawData: GemFeatureCollection = await response.json();
  const enrichedFeatures = rawData.features.map((f) => ({
    ...f,
    properties: enrichGemFaultProperties(f.properties, f.geometry.coordinates),
  }));

  return {
    ...rawData,
    features: enrichedFeatures,
  };
}

/**
 * Haversine distance between two coordinates [lng, lat]
 */
function haversineDistanceKm(lng1: number, lat1: number, lng2: number, lat2: number): number {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return 6371 * c;
}

/**
 * Filter GEM Fault Features within a radial distance (km) of a center coordinate
 */
export function filterGemFaultsByRadius(
  features: GemFaultFeature[],
  targetLng: number,
  targetLat: number,
  radiusKm: number
): GemFaultFeature[] {
  if (!Array.isArray(features)) return [];
  return features.filter((f) => {
    if (!f.geometry || !f.geometry.coordinates) return false;
    const coords = f.geometry.coordinates;
    let minD = Infinity;

    const checkPoint = (pt: number[]) => {
      if (Array.isArray(pt) && pt.length >= 2 && typeof pt[0] === 'number' && typeof pt[1] === 'number') {
        const d = haversineDistanceKm(pt[0], pt[1], targetLng, targetLat);
        if (d < minD) minD = d;
      }
    };

    if (typeof coords[0]?.[0] === 'number') {
      (coords as number[][]).forEach(checkPoint);
    } else if (Array.isArray(coords[0])) {
      (coords as number[][][]).forEach((line) => {
        if (Array.isArray(line)) line.forEach(checkPoint);
      });
    }

    return minD <= radiusKm;
  });
}

/**
 * Loads pre-cached regional GEM Active Faults GeoJSON (from official GEMScienceTools/gem-global-active-faults).
 * Guarantees zero latency on initial render and robust offline resilience.
 * Returns an array of GemFaultFeature[].
 */
export async function loadCachedRegionalGemFaults(
  filterRadiusKm?: number,
  centerLng = 27.1428,
  centerLat = 38.435
): Promise<GemFaultFeature[]> {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}data/gem_active_faults_regional.geojson`);
    if (!res.ok) {
      console.warn(`Failed to fetch cached regional GEM faults: ${res.status}`);
      return [];
    }
    const rawData: GemFeatureCollection = await res.json();
    const enrichedFeatures: GemFaultFeature[] = (rawData.features || []).map((f) => ({
      ...f,
      properties: enrichGemFaultProperties(f.properties, f.geometry.coordinates),
    }));

    if (filterRadiusKm && filterRadiusKm > 0) {
      return filterGemFaultsByRadius(enrichedFeatures, centerLng, centerLat, filterRadiusKm);
    }

    return enrichedFeatures;
  } catch (err) {
    console.warn('Error loading cached GEM active faults GeoJSON:', err);
    return [];
  }
}
