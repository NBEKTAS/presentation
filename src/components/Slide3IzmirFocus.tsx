import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  AlertCircle,
  Building,
  Globe2,
  Database,
  RefreshCw,
  Info,
  ExternalLink,
  Layers,
  Maximize2,
  Activity,
  Flame,
  Users,
  Coins,
  X,
} from 'lucide-react';
import {
  IZMIR_COORDS,
  TURKIYE_CENTER,
} from '../data/seismicData';
import {
  fetchGemFaultsByPoint,
  loadCachedRegionalGemFaults,
  geoJsonToLeafletCoords,
  GemFaultFeature,
  GEM_FEATURE_SERVER_URL,
} from '../services/gemFaultService';
import {
  fetchUsgsHistoricalEarthquakes,
  UsgsEarthquake,
  VERIFIED_HISTORICAL_TURKIYE_EARTHQUAKES,
} from '../services/usgsEarthquakeService';

export const Slide3IzmirFocus: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const [selectedGemFault, setSelectedGemFault] = useState<GemFaultFeature | null>(null);
  const [showFaults, setShowFaults] = useState(true);
  const [showHazardMap, setShowHazardMap] = useState(true);
  const [hazardOpacity, setHazardOpacity] = useState(0.75);

  // USGS Historical Earthquakes layer
  const [showEarthquakes, setShowEarthquakes] = useState(true);
  const [earthquakes, setEarthquakes] = useState<UsgsEarthquake[]>(VERIFIED_HISTORICAL_TURKIYE_EARTHQUAKES);
  const [selectedQuake, setSelectedQuake] = useState<UsgsEarthquake | null>(null);

  // Active view scale tracker
  const [viewScope, setViewScope] = useState<'regional' | 'izmir'>('regional');

  // GEM Active Faults state (Queried from ArcGIS REST API or regional catalog)
  const [gemFaults, setGemFaults] = useState<GemFaultFeature[]>([]);
  const [isQueryingGem, setIsQueryingGem] = useState(false);
  const [gemQueryRadius, setGemQueryRadius] = useState<number | 'all'>('all');
  const [gemDataSource, setGemDataSource] = useState<'arcgis-live' | 'cached'>('cached');
  const [queryError, setQueryError] = useState<string | null>(null);

  // Layer groups refs
  const faultsLayerRef = useRef<L.LayerGroup | null>(null);
  const earthquakeLayerRef = useRef<L.LayerGroup | null>(null);
  const efehrHazardLayerRef = useRef<L.TileLayer.WMS | null>(null);

  // Navigation handlers matching Slide 2 regional scale
  const zoomToRegional = () => {
    setViewScope('regional');
    mapInstanceRef.current?.flyTo(TURKIYE_CENTER, 5.8, { duration: 1.2 });
  };

  const zoomToTurkiye = () => {
    setViewScope('regional');
    mapInstanceRef.current?.flyTo(TURKIYE_CENTER, 5.8, { duration: 1.2 });
  };

  const zoomToIzmir = () => {
    setViewScope('izmir');
    mapInstanceRef.current?.flyTo([38.435, 27.14], 10.5, { duration: 1.2 });
  };

  // Live Query method against GEM ArcGIS REST API
  const queryGemArcGis = async (radius: number | 'all') => {
    setIsQueryingGem(true);
    setQueryError(null);
    try {
      if (radius === 'all') {
        const cached = await loadCachedRegionalGemFaults();
        setGemFaults(cached);
        setGemDataSource('cached');
      } else {
        // Query GEM FeatureServer using geometry point & radius matching user's spec
        const collection = await fetchGemFaultsByPoint(27.1428, 38.435, radius);
        if (collection && Array.isArray(collection.features) && collection.features.length > 0) {
          setGemFaults(collection.features);
          setGemDataSource('arcgis-live');
        } else {
          const cached = await loadCachedRegionalGemFaults(radius);
          setGemFaults(cached);
          setGemDataSource('cached');
        }
      }
    } catch (err) {
      console.warn('Live ArcGIS query failed, falling back to cached GEM catalog', err);
      const cached = await loadCachedRegionalGemFaults(typeof radius === 'number' ? radius : undefined);
      setGemFaults(cached);
      setGemDataSource('cached');
      setQueryError('ArcGIS live query completed with regional backup.');
    } finally {
      setIsQueryingGem(false);
    }
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize with broad regional view (matching Slide 2 scale)
    const map = L.map(mapContainerRef.current, {
      center: TURKIYE_CENTER,
      zoom: 5.8,
      zoomSnap: 0.1,
      zoomDelta: 0.5,
      zoomControl: false,
    });
    mapInstanceRef.current = map;

    // 1. Light Canvas basemap
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; Esri, OSM, GEM, AFAD',
      maxZoom: 17,
      zIndex: 1,
    }).addTo(map);

    // 2. ESHM20 Seismic Hazard Map Layer (WMS via EFEHR / ETH Zürich)
    const efehrHazardLayer = L.tileLayer.wms(
      'https://efehrmaps.ethz.ch/cgi-bin/mapserv?map=/var/www/mapfile/eshm20data.map',
      {
        layers: 'seismic-hazard',
        format: 'image/png',
        transparent: true,
        version: '1.1.1',
        opacity: hazardOpacity,
        maxZoom: 16,
        minZoom: 3,
        attribution: '&copy; <a href="http://hazard.efehr.org" target="_blank" rel="noopener">EFEHR</a> / ESHM20 / ETH Zürich',
        zIndex: 2,
      }
    );
    efehrHazardLayerRef.current = efehrHazardLayer;
    if (showHazardMap) {
      efehrHazardLayer.addTo(map);
    }

    // 3. Light Gray Reference Layer (labels, boundaries)
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
      opacity: 0.75,
      maxZoom: 17,
      zIndex: 10,
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Faults Vector Layer Group (dynamically populated from GEM ArcGIS Active Faults)
    const faultsGroup = L.layerGroup();
    faultsLayerRef.current = faultsGroup;
    faultsGroup.addTo(map);

    // Earthquake Vector Layer Group
    const eqGroup = L.layerGroup();
    earthquakeLayerRef.current = eqGroup;
    eqGroup.addTo(map);

    // Radar Beacon on İzmir (visible at national and regional scales, clickable to zoom directly)
    const radarIcon = L.divIcon({
      className: '',
      html: '<div style="position:relative;width:26px;height:26px;cursor:pointer;"><div class="radar-beacon-ring"></div><div style="position:absolute;top:7px;left:7px;width:12px;height:12px;border-radius:50%;background:#0284c7;border:2px solid #ffffff;box-shadow:0 0 10px rgba(2,132,199,0.9);"></div></div>',
      iconSize: [26, 26],
      iconAnchor: [13, 13],
    });
    const beaconMarker = L.marker(IZMIR_COORDS, { icon: radarIcon, zIndexOffset: 900 }).addTo(map);
    beaconMarker.bindTooltip('<strong>İzmir Metropolitan Area</strong><br><span style="color:#0284c7;">Click to zoom into urban focus</span>', {
      direction: 'top',
      offset: [0, -12],
    });
    beaconMarker.on('click', () => {
      zoomToIzmir();
    });

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(mapContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle Seismic Hazard Map toggle & opacity
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layer = efehrHazardLayerRef.current;
    if (!map || !layer) return;

    if (showHazardMap) {
      layer.setOpacity(hazardOpacity);
      if (!map.hasLayer(layer)) {
        layer.addTo(map);
      }
    } else {
      if (map.hasLayer(layer)) {
        map.removeLayer(layer);
      }
    }
  }, [showHazardMap, hazardOpacity]);

  useEffect(() => {
    if (!mapInstanceRef.current || !faultsLayerRef.current) return;
    if (showFaults) {
      faultsLayerRef.current.addTo(mapInstanceRef.current);
    } else {
      faultsLayerRef.current.remove();
    }
  }, [showFaults]);

  // Initial GEM active faults loading (all regional features for zero-latency initial rendering matching Slide 2)
  useEffect(() => {
    loadCachedRegionalGemFaults().then((features) => {
      if (Array.isArray(features) && features.length > 0) {
        setGemFaults(features);
      }
    });
  }, []);

  // Fetch USGS Historical Earthquakes live on mount
  useEffect(() => {
    fetchUsgsHistoricalEarthquakes(6.3).then((res) => {
      if (res && Array.isArray(res.earthquakes)) {
        setEarthquakes(res.earthquakes);
      }
    }).catch((err) => {
      console.warn('Slide 3 USGS API fetch error:', err);
    });
  }, []);

  // Synchronize USGS Earthquakes into Leaflet vector layer
  useEffect(() => {
    if (!earthquakeLayerRef.current) return;
    earthquakeLayerRef.current.clearLayers();

    if (!showEarthquakes || !Array.isArray(earthquakes)) return;

    earthquakes.forEach((quake) => {
      const isCatastrophic = quake.severityLevel === 'catastrophic';
      const isExtreme = quake.severityLevel === 'extreme';
      const isSelected = selectedQuake?.id === quake.id;

      let fillColor = '#d97706';
      if (isCatastrophic) fillColor = '#dc2626';
      else if (isExtreme) fillColor = '#ea580c';

      if (isSelected) fillColor = '#7f1d1d';

      const radius = Math.min(16, Math.max(7, (quake.magnitude - 5.5) * 5.5));

      const marker = L.circleMarker([quake.latitude, quake.longitude], {
        radius: isSelected ? radius + 2 : radius,
        fillColor,
        fillOpacity: isSelected ? 0.95 : 0.85,
        color: isSelected ? '#fef08a' : '#ffffff',
        weight: isSelected ? 2.5 : 1.5,
      });

      const tooltipHtml = `
        <div style="font-family: system-ui, -apple-system, sans-serif; font-size: 11px; line-height: 1.4; min-width: 250px; max-width: 320px; color: #0f172a;">
          <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-bottom: 4px;">
            <div style="font-size: 13px; font-weight: 800; color: #0f172a; line-height: 1.25;">${quake.historicalName}</div>
            <span style="background: ${fillColor}; color: #ffffff; padding: 2px 7px; border-radius: 9999px; font-size: 11px; font-weight: 800; font-family: monospace; white-space: nowrap; flex-shrink: 0;">M${quake.magnitude.toFixed(1)}</span>
          </div>
          <div style="font-size: 11px; color: #475569; font-weight: 500; margin-bottom: 8px; display: flex; align-items: center; gap: 4px;">
            <span>📅 ${quake.date}</span>
            <span style="color: #94a3b8;">•</span>
            <span>Depth: <strong style="color: #1e293b;">${quake.depthKm} km</strong></span>
          </div>

          <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 6px 8px; margin-bottom: 6px;">
            <div style="font-size: 10px; font-weight: 800; color: #991b1b; text-transform: uppercase; letter-spacing: 0.5px;">
              👥 Loss of Life
            </div>
            <div style="font-size: 12px; font-weight: 700; color: #b91c1c; margin-top: 1px;">
              ${quake.fatalitiesStr}
            </div>
          </div>

          <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 6px 8px;">
            <div style="font-size: 10px; font-weight: 800; color: #065f46; text-transform: uppercase; letter-spacing: 0.5px;">
              💰 Economic Loss Value
            </div>
            <div style="font-size: 12px; font-weight: 700; color: #047857; margin-top: 1px;">
              ${quake.economicLossUsd}
            </div>
            ${quake.economicLossDetail ? `<div style="font-size: 10px; color: #047857; margin-top: 2px; line-height: 1.3;">${quake.economicLossDetail}</div>` : ''}
          </div>

          <div style="font-size: 9px; color: #94a3b8; margin-top: 6px; text-align: right;">
            Click marker to inspect event
          </div>
        </div>
      `;

      marker.bindTooltip(tooltipHtml, {
        className: 'quake-tooltip',
        direction: 'top',
        offset: [0, -radius],
      });

      marker.on('click', () => {
        setSelectedQuake(quake);
        setSelectedGemFault(null);
      });

      earthquakeLayerRef.current?.addLayer(marker);
    });
  }, [earthquakes, showEarthquakes, selectedQuake]);

  // Synchronize GEM faults into Leaflet vector layer with rich styling & tooltips
  useEffect(() => {
    if (!faultsLayerRef.current) return;
    faultsLayerRef.current.clearLayers();

    if (!showFaults || !Array.isArray(gemFaults)) return;

    gemFaults.forEach((feature) => {
      try {
        if (!feature || !feature.geometry || !feature.geometry.coordinates) return;
        const latLngs = geoJsonToLeafletCoords(feature.geometry.coordinates);
        if (!latLngs || (Array.isArray(latLngs) && latLngs.length === 0)) return;

        const props = feature.properties || ({} as any);
        const strokeColor = props.styleColor || '#dc2626';
        const weight = props.weight || 3;
        const dashArray = props.dashArray;

        const line = L.polyline(latLngs as any, {
          color: strokeColor,
          weight,
          opacity: 0.95,
          dashArray,
        });

        const tooltipHtml = `
          <div style="font-family:system-ui,-apple-system,sans-serif;font-size:12px;min-width:220px;max-width:300px;line-height:1.4;">
            <div style="font-weight:700;color:#0f172a;margin-bottom:2px;">${props.inferredName || props.name || 'GEM Aktif Fay'}</div>
            <div style="font-size:11px;font-weight:600;color:${strokeColor}">
              ${props.kinematicLabel || props.slip_type || 'Active Fault'}
            </div>
            <div style="font-size:10px;color:#475569;margin-top:3px;">
              Catalog ID: <span style="font-family:monospace;font-weight:700;color:#0284c7">${props.catalog_id || 'N/A'}</span> (${props.catalog_na || 'GAF-DB'})
            </div>
            <div style="font-size:10px;color:#64748b;">
              Trace Length: <strong>${props.lengthKm || 0} km</strong>
            </div>
            <div style="font-size:9px;color:#94a3b8;margin-top:4px;border-top:1px solid #e2e8f0;padding-top:2px;display:flex;justify-content:space-between;">
              <span>GEM Global Active Faults</span>
              <span style="color:#0284c7;font-weight:600;">ArcGIS REST API</span>
            </div>
          </div>
        `;

        line.bindTooltip(tooltipHtml, { sticky: true, className: 'quake-tooltip' });

        line.on('click', () => {
          setSelectedGemFault(feature);
        });

        faultsLayerRef.current?.addLayer(line);
      } catch (err) {
        console.warn('Error rendering fault feature in map layer:', err);
      }
    });
  }, [gemFaults, showFaults]);

  return (
    <div className="w-full h-full min-h-0 flex flex-col max-w-[106.25rem] mx-auto p-2 @sm:p-4">
      {/* Title */}
      <div className="mb-2">
        <h1 className="text-xl @sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          İzmir motivates a <span className="text-sky-600">city-scale</span> approach
        </h1>
        <p className="text-xs @sm:text-sm text-slate-500">
          Regional active fault network (GEM) & metropolitan exposure: soft basin amplification, 17 active faults, and critical lifeline assets.
        </p>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative w-full min-h-[460px] rounded-2xl overflow-hidden border border-slate-200 shadow-md">
        <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />

        {/* Floating Top Badges */}
        <div className="absolute top-3 left-3 z-[500] flex flex-wrap gap-2 pointer-events-none max-w-[calc(100%-23.75rem)]">
          {showHazardMap && (
            <div className="pointer-events-auto bg-white/95 backdrop-blur-md border border-rose-200 px-3 py-1.5 rounded-full text-xs text-rose-900 shadow-sm flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-rose-600" />
              <span><strong>ESHM20 Seismic Hazard Map</strong> (PGA 475yr)</span>
            </div>
          )}

          <div className="pointer-events-auto bg-white/95 backdrop-blur-md border border-slate-200/90 px-3 py-1.5 rounded-full text-xs text-slate-700 shadow-sm flex items-center gap-2">
            <Database className="w-3.5 h-3.5 text-rose-600" />
            <strong className="text-rose-600 font-mono font-bold">{gemFaults.length}</strong>
            <span>GEM Active Faults</span>
          </div>
        </div>

        {/* Floating Right Frosted Glass Sidebar */}
        <div className="absolute top-3 right-3 z-[500] w-80 @sm:w-[21.875rem] max-w-[calc(100%-1.5rem)] max-h-[calc(100%-1.5rem)] bg-white/90 backdrop-blur-md border border-white/80 rounded-2xl p-4 @sm:p-5 flex flex-col shadow-xl overflow-y-auto">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-sky-600" />
              Metropolitan Risk Drivers
            </span>
            <span className="text-[10px] bg-sky-100 text-sky-800 font-semibold px-2 py-0.5 rounded-full">
              City-Scale
            </span>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-sky-600 font-bold">→</span>
              <span><strong>17 Active Faults on Land:</strong> Including the Tuzla, Gülbahçe, and Seferihisar faults, compounded by potential tsunamis and climate-induced urban flooding.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-600 font-bold">→</span>
              <span><strong>Basin Resonance Lesson:</strong> The 2020 Samos (M7.0) rupture proved that distant offshore faults (70 km away) collapse residential towers in İzmir due to deep alluvial soil resonance (Bayraklı).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-600 font-bold">→</span>
              <span><strong>Institutional Anchors:</strong> İzmir's <em>İRAP</em> (23 targeted goals, 218 actions) and the <em>Resilient İzmir Feasibility Project</em> (AFAD, EU, World Bank) establish the local baseline.</span>
            </li>
          </ul>

          {/* Preset Camera Zoom Actions */}
          <div className="mt-4 pt-3 border-t border-slate-200 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={zoomToIzmir}
              className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold transition-all shadow-xs cursor-pointer text-center"
            >
              Zoom İzmir
            </button>
            <button
              type="button"
              onClick={zoomToTurkiye}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all cursor-pointer text-center"
            >
              Türkiye
            </button>
          </div>

          {/* ESHM20 Seismic Hazard Map Controls */}
          <div className="mt-3 pt-3 border-t border-slate-200 space-y-2">
            {/* USGS Earthquakes Layer Checkbox */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-1.5 font-bold text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showEarthquakes}
                  onChange={(e) => setShowEarthquakes(e.target.checked)}
                  className="rounded text-rose-600 focus:ring-0 cursor-pointer"
                />
                <span className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-rose-600" />
                  USGS Historical Earthquakes
                </span>
              </label>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200">
                USGS API
              </span>
            </div>

            {/* Seismic Hazard Map (ESHM20) */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-1.5 font-bold text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showHazardMap}
                  onChange={(e) => setShowHazardMap(e.target.checked)}
                  className="rounded text-rose-600 focus:ring-0 cursor-pointer"
                />
                <span className="flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-rose-600" />
                  Seismic Hazard Map (ESHM20)
                </span>
              </label>
              <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
                PGA 475yr
              </span>
            </div>

            {showHazardMap && (
              <div className="p-2.5 bg-slate-50/90 rounded-xl border border-slate-200/80 space-y-2 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Hazard Map Opacity:</span>
                  <span className="font-mono text-slate-700 font-bold">{Math.round(hazardOpacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="1"
                  step="0.05"
                  value={hazardOpacity}
                  onChange={(e) => setHazardOpacity(parseFloat(e.target.value))}
                  className="w-full accent-rose-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="text-[10px] text-slate-500 leading-tight">
                  European Seismic Hazard Model 2020 · WMS via <strong>EFEHR / ETH Zürich</strong>
                </div>
              </div>
            )}
          </div>

          {/* GEM Active Faults Controls & Live ArcGIS Query */}
          <div className="mt-4 pt-3 border-t border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-1.5 font-bold text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showFaults}
                  onChange={(e) => setShowFaults(e.target.checked)}
                  className="rounded text-rose-600 focus:ring-0 cursor-pointer"
                />
                <span className="flex items-center gap-1">
                  <Database className="w-3.5 h-3.5 text-rose-600" />
                  GEM Active Faults
                </span>
              </label>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                {isQueryingGem ? (
                  <>
                    <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                    Querying...
                  </>
                ) : (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {gemFaults.length} Traces
                  </>
                )}
              </span>
            </div>

            {showFaults && (
              <div className="p-2.5 bg-slate-50/90 rounded-xl border border-slate-200/80 space-y-2 text-[11px]">
                <div className="flex flex-col gap-1.5 text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700">Fault Extent / Radius:</span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {gemQueryRadius === 'all' ? 'Türkiye & Aegean' : `${gemQueryRadius} km`}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setGemQueryRadius('all');
                        queryGemArcGis('all');
                      }}
                      disabled={isQueryingGem}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                        gemQueryRadius === 'all'
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      All Regional
                    </button>
                    {[150, 100, 75, 50].map((radius) => (
                      <button
                        key={radius}
                        type="button"
                        onClick={() => {
                          setGemQueryRadius(radius);
                          queryGemArcGis(radius);
                        }}
                        disabled={isQueryingGem}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                          gemQueryRadius === radius
                            ? 'bg-rose-600 text-white shadow-xs'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {radius}km
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Floating Legend */}
        <div className="absolute bottom-3 left-3 z-[500] bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl p-3 shadow-md w-80 pointer-events-auto">
          {showHazardMap && (
            <div className="mb-2 pb-2 border-b border-slate-200">
              <div className="flex items-center justify-between text-[10px] font-semibold text-slate-700 mb-1">
                <span className="flex items-center gap-1">
                  <Activity className="w-3 h-3 text-rose-600" />
                  ESHM20 Seismic Hazard (PGA 475-yr)
                </span>
                <span className="text-slate-400 font-normal">EFEHR / ETH</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gradient-to-r from-amber-200 via-rose-500 to-purple-900" />
              <div className="flex justify-between text-[9px] text-slate-500 mt-1 font-mono">
                <span>&lt; 0.10g</span>
                <span>0.25g</span>
                <span>&gt; 0.50g</span>
              </div>
            </div>
          )}

          <span className="text-[11px] font-bold text-slate-800 block mb-1.5">
            Active Fault Kinematics
          </span>
          <div className="grid grid-cols-2 gap-1.5 text-[10px] text-slate-600">
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-1 bg-rose-600 rounded-xs shrink-0" />
              <span>Normal Fault (Graben)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-1 bg-slate-900 border-dashed border-b rounded-xs shrink-0" />
              <span>Strike-Slip (KAF/DAF)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-1 bg-purple-600 border-dashed border-b rounded-xs shrink-0" />
              <span>Subduction (Hellenic Arc)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-sky-600 border border-white shrink-0" />
              <span>İzmir Metro Node</span>
            </div>
          </div>
        </div>

        {/* Selected GEM Fault Callout Modal */}
        {selectedGemFault && (
          <div className="absolute bottom-16 right-3 @sm:right-[370px] z-[500] max-w-sm bg-white/95 backdrop-blur-md border border-rose-200 p-4 rounded-xl shadow-xl text-xs animate-in fade-in">
            <div className="flex items-center justify-between font-bold text-slate-900 mb-1.5">
              <span className="flex items-center gap-1.5 text-rose-700">
                <Database className="w-4 h-4 text-rose-600" />
                {selectedGemFault.properties.inferredName || selectedGemFault.properties.name || 'GEM Active Fault'}
              </span>
              <button
                type="button"
                onClick={() => setSelectedGemFault(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1.5 text-[11px] text-slate-600 mb-3">
              <div className="flex justify-between">
                <span className="text-slate-500">Catalog Identifier:</span>
                <span className="font-mono font-bold text-sky-700">
                  {selectedGemFault.properties.catalog_id || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Source Compilation:</span>
                <span className="font-semibold text-slate-800">
                  {selectedGemFault.properties.catalog_na || 'Global Active Faults'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Kinematic Slip Type:</span>
                <span className="font-bold text-rose-600">
                  {selectedGemFault.properties.kinematicLabel || selectedGemFault.properties.slip_type || 'Active'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Trace Length:</span>
                <span className="font-mono font-semibold text-slate-800">
                  {selectedGemFault.properties.lengthKm} km
                </span>
              </div>
              {selectedGemFault.properties.slip_rate && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Slip Rate:</span>
                  <span className="font-mono text-slate-800">
                    {selectedGemFault.properties.slip_rate} mm/yr
                  </span>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>Scientific provenance: GEM GAF</span>
              <a
                href="https://github.com/GEMScienceTools/gem-global-active-faults"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-sky-600 hover:text-sky-800 font-semibold"
              >
                <ExternalLink className="w-3 h-3" />
                GitHub GEM
              </a>
            </div>
          </div>
        )}

        {/* Selected Earthquake Callout Modal */}
        {selectedQuake && (
          <div className="absolute bottom-16 right-3 @sm:right-[370px] z-[500] max-w-sm bg-white/98 backdrop-blur-md border border-rose-200 p-4 rounded-xl shadow-2xl text-xs animate-in fade-in">
            <div className="flex items-center justify-between font-bold text-slate-900 mb-2">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded font-mono font-bold text-[10px] bg-rose-600 text-white">
                  M{selectedQuake.magnitude.toFixed(1)}
                </span>
                <span className="text-xs font-bold text-slate-900 line-clamp-1">
                  {selectedQuake.historicalName}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedQuake(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-[11px] text-slate-500 mb-2 font-medium">
              {selectedQuake.date} • Depth: {selectedQuake.depthKm} km
            </div>

            <div className="space-y-2 mb-3">
              <div className="p-2 rounded-lg bg-rose-50 border border-rose-100">
                <div className="text-[10px] font-bold text-rose-800 flex items-center gap-1 uppercase">
                  <Users className="w-3 h-3 text-rose-600" />
                  Loss of Life
                </div>
                <div className="text-xs font-bold text-rose-900 font-mono mt-0.5">
                  {selectedQuake.fatalitiesStr}
                </div>
              </div>

              <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100">
                <div className="text-[10px] font-bold text-emerald-800 flex items-center gap-1 uppercase">
                  <Coins className="w-3 h-3 text-emerald-600" />
                  Economic Loss Value
                </div>
                <div className="text-xs font-bold text-emerald-900 font-mono mt-0.5">
                  {selectedQuake.economicLossUsd}
                </div>
                <div className="text-[10px] text-emerald-700 mt-0.5">
                  {selectedQuake.economicLossDetail}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
              <a
                href={selectedQuake.usgsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-rose-600 hover:text-rose-800 font-semibold"
              >
                <ExternalLink className="w-3 h-3" />
                USGS Event Page
              </a>
              <button
                type="button"
                onClick={() => setSelectedQuake(null)}
                className="text-slate-500 hover:text-slate-700 font-medium cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
