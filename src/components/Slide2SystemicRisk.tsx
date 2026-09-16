import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Activity, Sliders, CheckCircle2, Globe2 } from 'lucide-react';
import { IZMIR_COORDS, TURKIYE_CENTER } from '../data/seismicData';

export const Slide2SystemicRisk: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const [showRiskLayer, setShowRiskLayer] = useState(true);
  const [riskOpacity, setRiskOpacity] = useState(0.85);

  // Layer reference for ESRM20 Seismic Risk layer
  const efehrRiskLayerRef = useRef<L.TileLayer | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy previous instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

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
      attribution: '&copy; Esri, OSM, EFEHR, GEM',
      maxZoom: 16,
    }).addTo(map);

    // 2. ESRM20 Gridded Risk Layer (EUCENTRE MapProxy)
    const efehrRiskLayer = L.tileLayer(
      'https://maps.eu-risk.eucentre.it/mapproxy/European_Risk_Index_Gridded/wmts/seismic-risk/webmercator/{z}/{x}/{y}.png',
      {
        attribution: '&copy; <a href="https://www.efehr.org" target="_blank" rel="noopener">EFEHR</a> / ESRM20 / EUCENTRE',
        opacity: riskOpacity,
        maxZoom: 16,
        minZoom: 3,
      }
    );
    efehrRiskLayerRef.current = efehrRiskLayer;
    if (showRiskLayer) {
      efehrRiskLayer.addTo(map);
    }

    // 3. Light Gray Reference Layer (boundaries and place names overlay)
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
      opacity: 0.75,
      maxZoom: 16,
      zIndex: 400,
    }).addTo(map);

    // Zoom control at bottom right to avoid overlapping header
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Radar Beacon on İzmir
    const radarIcon = L.divIcon({
      className: '',
      html: '<div style="position:relative;width:24px;height:24px;"><div class="radar-beacon-ring"></div><div style="position:absolute;top:6px;left:6px;width:12px;height:12px;border-radius:50%;background:#0284c7;border:2px solid #ffffff;box-shadow:0 0 8px rgba(2,132,199,0.8);"></div></div>',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
    L.marker(IZMIR_COORDS, { icon: radarIcon }).addTo(map);

    const izmirMarker = L.circleMarker(IZMIR_COORDS, {
      radius: 6,
      color: '#ffffff',
      weight: 2.5,
      fillColor: '#0284c7',
      fillOpacity: 1,
    }).addTo(map);
    izmirMarker.bindTooltip('<strong>İzmir Metropolitan Area</strong><br/><span style="color:#0284c7">High Systemic Risk Node</span>');

    // Resize observer to handle responsiveness
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

  // Update opacity and visibility of ESRM20 Risk layer
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layer = efehrRiskLayerRef.current;
    if (!map || !layer) return;

    if (showRiskLayer) {
      layer.setOpacity(riskOpacity);
      if (!map.hasLayer(layer)) {
        layer.addTo(map);
      }
    } else {
      if (map.hasLayer(layer)) {
        map.removeLayer(layer);
      }
    }
  }, [showRiskLayer, riskOpacity]);

  const zoomToIzmir = () => {
    mapInstanceRef.current?.flyTo(IZMIR_COORDS, 8.5, { duration: 1.2 });
  };

  const zoomToTurkiye = () => {
    mapInstanceRef.current?.flyTo(TURKIYE_CENTER, 5.8, { duration: 1.2 });
  };

  return (
    <div className="w-full h-full min-h-0 flex flex-col max-w-[1700px] mx-auto p-2 sm:p-4">
      {/* Title */}
      <div className="mb-2">
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          Urban earthquake risk is systemic — and İzmir shows why
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          ESRM20 European Seismic Risk Model identifies the Aegean Extensional Arc and Anatolian microplate as Europe’s highest seismic risk zones.
        </p>
      </div>

      {/* Map Wrapper with Bleed Container */}
      <div className="flex-1 relative w-full min-h-[460px] rounded-2xl overflow-hidden border border-slate-200 shadow-md">
        {/* Leaflet Map DOM container */}
        <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />

        {/* Floating Top Status Badges */}
        <div className="absolute top-3 left-3 z-[500] flex flex-wrap gap-2 pointer-events-none max-w-[calc(100%-380px)]">
          <div className="pointer-events-auto bg-white/95 backdrop-blur-md border border-slate-200/90 px-3 py-1.5 rounded-full text-xs font-medium text-slate-800 shadow-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <strong>ESRM20 Regional Seismic Risk</strong>
            <span className="text-slate-300">|</span>
            <span className="font-mono text-rose-600 font-bold">
              İzmir Risk Index: ≥ 0.80–1.0 (Very High)
            </span>
          </div>

          <div className="pointer-events-auto hidden sm:flex bg-white/95 backdrop-blur-md border border-slate-200/90 px-3 py-1.5 rounded-full text-xs text-slate-700 shadow-sm items-center gap-2">
            <Globe2 className="w-3.5 h-3.5 text-sky-600" />
            <span className="font-mono text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              EFEHR Live: ESRM20 Gridded Risk
            </span>
          </div>
        </div>

        {/* Floating Right Frosted Glass Panel */}
        <div className="absolute top-3 right-3 z-[500] w-80 sm:w-[350px] max-w-[calc(100%-1.5rem)] max-h-[calc(100%-1.5rem)] bg-white/90 backdrop-blur-md border border-white/80 rounded-2xl p-4 sm:p-5 flex flex-col shadow-xl overflow-y-auto">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-sky-600" />
              Systemic Risk Dynamics
            </span>
            <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-full">
              İzmir Case
            </span>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-sky-600 font-bold">→</span>
              <span><strong>Systemic disruption:</strong> Physical damage cascades directly across municipal water, port logistics, power, and livelihoods.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-600 font-bold">→</span>
              <span><strong>European priority:</strong> ESRM20 ranks the Aegean Arc among Europe's most vulnerable agglomerations.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-600 font-bold">→</span>
              <span><strong>Active boundary:</strong> At least <strong>17 active faults</strong> intersect or surround the metropolitan footprint.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-600 font-bold">→</span>
              <span><strong>Institutional fragmentation:</strong> Dispersed responsibilities between central AFAD and 30 district municipalities weaken coordinated operational response.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-600 font-bold">→</span>
              <span><strong>The core challenge:</strong> Bridge the chasm between technical engineering risk assessments and municipal political budget decisions.</span>
            </li>
          </ul>

          {/* Preset Camera Zoom Actions */}
          <div className="mt-4 pt-3 border-t border-slate-200 grid grid-cols-2 gap-2">
            <button
              onClick={zoomToIzmir}
              className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold transition-all shadow-xs cursor-pointer text-center"
            >
              Zoom İzmir
            </button>
            <button
              onClick={zoomToTurkiye}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all cursor-pointer text-center"
            >
              Türkiye
            </button>
          </div>

          {/* EFEHR API Seismic Risk Layer Controls */}
          <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-1.5 font-medium text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showRiskLayer}
                  onChange={(e) => setShowRiskLayer(e.target.checked)}
                  className="rounded text-sky-600 focus:ring-0 cursor-pointer"
                />
                <span className="font-semibold text-slate-800">ESRM20 Risk Layer</span>
              </label>
              <span className="text-[10px] text-emerald-600 font-mono font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                Live MapProxy
              </span>
            </div>

            {showRiskLayer && (
              <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                <Sliders className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="shrink-0">Opacity:</span>
                <input
                  type="range"
                  min="0.2"
                  max="1.0"
                  step="0.05"
                  value={riskOpacity}
                  onChange={(e) => setRiskOpacity(parseFloat(e.target.value))}
                  className="w-full accent-sky-600 h-1 bg-slate-200 rounded-lg cursor-pointer"
                />
                <span className="font-mono text-[10px] w-8 text-right font-semibold text-slate-700">
                  {Math.round(riskOpacity * 100)}%
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Floating Legend on Bottom-Left */}
        <div className="absolute bottom-3 left-3 z-[500] bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl p-3 shadow-md w-72 pointer-events-auto">
          <div className="mb-1.5">
            <span className="text-[11px] font-bold text-slate-800">ESRM20 European Seismic Risk Index</span>
          </div>
          <div className="h-2 rounded-full bg-gradient-to-r from-blue-300 via-amber-300 to-rose-600 w-full mb-1" />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mb-2">
            <span>Low (0.0)</span>
            <span className="text-rose-600 font-bold">Severe (1.0)</span>
          </div>

          {/* Key Geographic Reference Nodes */}
          <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-600 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-sky-600 border border-white shrink-0" />
              <span className="font-medium text-slate-700">İzmir Metropolitan Node</span>
            </div>
            <span className="text-slate-400 font-mono text-[9px]">EFEHR / EUCENTRE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
