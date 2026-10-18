'use client'

import React from 'react'

interface ProjectProps {
  slug: string
  name: string
  category: string
  liveUrl?: string | null
  thumbnail?: string | null
  impactStats?: { value: string; label: string }[]
  statusLabel?: string
}

export function MacBookMockup({ project }: { project: ProjectProps }) {
  const displayUrl = project.liveUrl
    ? project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : `${project.slug.toLowerCase()}.engine.internal`

  return (
    <div className="device-mockup-wrapper w-full flex flex-col">
      {/* Device Header Tag */}
      <div className="flex items-center justify-between pb-2 px-1 text-[10px] font-mono tracking-widest text-[#a8a29e] uppercase select-none">
        <span className="flex items-center gap-1.5">
          <span className="text-neutral-500 font-semibold">DEVICE //</span> MACBOOK 13&quot;
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#fa5f34] animate-pulse" />
      </div>

      {/* Laptop Window Frame */}
      <div className="relative rounded-xl border border-white/10 bg-[#121316] shadow-2xl overflow-hidden flex flex-col h-[296px]">
        {/* Browser Top Navigation Bar */}
        <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#18191d] border-b border-white/5 select-none flex-shrink-0">
          {/* Traffic Light Dots */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block shadow-sm" />
          </div>

          {/* URL Pill Bar */}
          <div className="flex-1 max-w-[280px] mx-2 px-3 py-1 rounded bg-[#0d0e11] border border-white/5 flex items-center justify-center gap-1.5 overflow-hidden">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 flex-shrink-0" />
            <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 truncate text-center">
              {displayUrl}
            </span>
          </div>

          {/* Right Tech Spec */}
          <div className="text-[8px] font-mono text-neutral-500 uppercase tracking-wider hidden sm:block flex-shrink-0">
            16:10 · 2880×1800
          </div>
        </div>

        {/* Screen Viewport */}
        <div className="relative flex-1 w-full bg-[#090a0d] overflow-hidden flex items-center justify-center">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={`${project.name} Desktop Interface`}
              className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="text-neutral-500 font-mono text-xs uppercase">No Preview Available</div>
          )}

          {/* Subtle Screen Glare overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/[0.02] via-transparent to-white/[0.04]" />
        </div>
      </div>
    </div>
  )
}

export function IPhoneMockup({ project }: { project: ProjectProps }) {
  return (
    <div className="device-mockup-wrapper w-full flex flex-col items-center">
      {/* Device Header Tag */}
      <div className="w-[146px] flex items-center justify-between pb-2 px-1 text-[10px] font-mono tracking-widest text-[#a8a29e] uppercase select-none">
        <span className="flex items-center gap-1.5 truncate">
          <span className="text-neutral-500 font-semibold">MOBILE //</span> IPHONE
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#fa5f34] animate-pulse flex-shrink-0" />
      </div>

      {/* iPhone Outer Hardware Frame: HEIGHT EXACTLY MATCHES DESKTOP (296px) */}
      <div className="relative w-[146px] h-[296px] rounded-[30px] p-1.5 bg-[#1b1c20] border-2 border-neutral-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col flex-shrink-0">
        {/* Dynamic Inner Screen */}
        <div className="relative rounded-[24px] bg-[#0c0d10] border border-neutral-800 w-full h-full overflow-hidden flex flex-col justify-between">
          {/* Top Bar with Dynamic Island */}
          <div className="pt-1.5 px-2 pb-0.5 flex flex-col items-center z-10 bg-gradient-to-b from-black/90 to-transparent flex-shrink-0">
            {/* Dynamic Island Capsule */}
            <div className="w-14 h-3 bg-black rounded-full flex items-center justify-end px-1.5 border border-white/5">
              <span className="w-1 h-1 rounded-full bg-[#1e293b] mr-0.5" />
              <span className="w-1 h-1 rounded-full bg-emerald-500/70 animate-ping" />
            </div>

            {/* Mobile Header Subtitle */}
            <div className="w-full flex items-center justify-between mt-1 text-[6.5px] font-mono text-neutral-400 uppercase tracking-wider">
              <span className="truncate">{project.name}</span>
              <span className="text-[#fa5f34] font-bold flex-shrink-0">
                {project.statusLabel || 'ACTIVE'}
              </span>
            </div>
          </div>

          {/* Screen Body Content */}
          <div className="flex-1 px-2 py-1 flex flex-col justify-center overflow-hidden">
            {project.slug === 'arbitrage' ? (
              <ArbitrageMobilePreview />
            ) : (
              <NexusForceMobilePreview />
            )}
          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="pb-1 pt-0.5 flex justify-center z-10 flex-shrink-0">
            <span className="w-12 h-0.5 rounded-full bg-white/30" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Non-Live Project Showcase: Architectural Blueprint & Telemetry
───────────────────────────────────────────────────────────── */

export function NonLiveProjectShowcase({ project }: { project: ProjectProps }) {
  if (project.slug === 'skylens') {
    return <SkyLensArchitectureShowcase />
  }

  if (project.slug === 'cipherkit') {
    return <CipherKitArchitectureShowcase />
  }

  return <GenericArchitectureShowcase project={project} />
}

function SkyLensArchitectureShowcase() {
  return (
    <div className="w-full flex flex-col">
      {/* Header Tag */}
      <div className="flex items-center justify-between pb-2 px-1 text-[10px] font-mono tracking-widest text-[#a8a29e] uppercase select-none">
        <span className="flex items-center gap-1.5">
          <span className="text-cyan-500 font-semibold">ENGINEERING //</span> SATELLITE GEOSPATIAL TELEMETRY
        </span>
        <span className="flex items-center gap-2">
          <span className="text-[9px] text-[#fa5f34] font-bold">GEOSPATIAL ML PIPELINE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        </span>
      </div>

      {/* Main 2-Panel Architectural Card (Height matches desktop: 296px) */}
      <div className="relative rounded-xl border border-cyan-500/20 bg-[#080d13] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 h-auto md:h-[296px] divide-y md:divide-y-0 md:divide-x divide-cyan-500/15">
        {/* Panel 1: Satellite Radar Pipeline */}
        <div className="p-3.5 flex flex-col justify-between font-mono text-[#d4cec7]">
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-[9px] font-bold text-cyan-300 tracking-wider">
                SENTINEL-5P TROPOMI PIPELINE
              </span>
            </div>
            <span className="text-[8px] bg-cyan-950 text-cyan-300 border border-cyan-700/60 px-1.5 py-0.5 rounded">
              L2 GRANULES
            </span>
          </div>

          {/* Radar Scanner Visual */}
          <div className="relative my-2 h-28 rounded border border-cyan-900/40 bg-black/60 overflow-hidden flex items-center justify-center">
            {/* Concentric Radar Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-32 h-32 rounded-full border border-cyan-500/15" />
              <div className="w-20 h-20 rounded-full border border-cyan-500/25" />
              <div className="w-10 h-10 rounded-full border border-cyan-500/35" />
              <div className="absolute w-full h-[1px] bg-cyan-500/15" />
              <div className="absolute h-full w-[1px] bg-cyan-500/15" />
            </div>

            {/* Coordinates and Anomaly Alerts */}
            <div className="absolute top-2 left-3 text-[7.5px] text-amber-300">
              ● NO2 SPIKE: 28.61° N, 77.20° E [NCR]
            </div>
            <div className="absolute bottom-2 right-3 text-[7.5px] text-emerald-400">
              ● SO2 NORMAL: 19.07° N, 72.87° E
            </div>

            <div className="text-center z-10">
              <div className="text-[11px] font-bold tracking-wider text-cyan-200">
                10,000+ SQ KM SCAN
              </div>
              <div className="text-[7.5px] text-cyan-400/80">
                COPERNICUS OPEN ACCESS STREAM
              </div>
            </div>
          </div>

          {/* Pipeline Footprint */}
          <div className="flex items-center justify-between text-[8px] border-t border-cyan-500/15 pt-1.5 text-neutral-400">
            <span>RES: 3.5×5.5 KM</span>
            <span className="text-cyan-300 font-bold">NETCDF4 MESH DECODE</span>
            <span className="text-[#fa5f34] font-bold">TEAM CODEBLOODED</span>
          </div>
        </div>

        {/* Panel 2: Machine Learning Inference Telemetry */}
        <div className="p-3.5 flex flex-col justify-between font-mono bg-[#060a10]">
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-1.5">
            <span className="text-[9px] font-bold text-cyan-300 tracking-wider">
              XGBOOST ML REGRESSION MATRIX
            </span>
            <span className="text-[8px] bg-emerald-950 text-emerald-300 border border-emerald-700/60 px-1.5 py-0.5 rounded font-bold">
              94% ACCURACY
            </span>
          </div>

          {/* Model Metrics Table */}
          <div className="my-2 space-y-1.5 text-[8px]">
            <div className="p-1.5 rounded bg-black/40 border border-neutral-800 flex justify-between items-center">
              <span className="text-neutral-400">CPCB Ground Station R² Fit</span>
              <span className="text-emerald-400 font-bold">0.941 Validation</span>
            </div>
            <div className="p-1.5 rounded bg-black/40 border border-neutral-800 flex justify-between items-center">
              <span className="text-neutral-400">FastAPI Asynchronous Inference</span>
              <span className="text-cyan-300 font-bold">&lt;45ms Latency</span>
            </div>
            <div className="p-1.5 rounded bg-black/40 border border-neutral-800 flex justify-between items-center">
              <span className="text-neutral-400">Spatial Indexing</span>
              <span className="text-neutral-200 font-bold">MongoDB 2dsphere</span>
            </div>
          </div>

          {/* Bottom Tags */}
          <div className="flex items-center justify-between text-[8px] border-t border-cyan-500/15 pt-1.5">
            <span className="text-neutral-500">CONTAINER: DOCKER / GDAL</span>
            <span className="text-cyan-400 font-bold">LEAFLET CHOROPLETH</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function CipherKitArchitectureShowcase() {
  return (
    <div className="w-full flex flex-col">
      {/* Header Tag */}
      <div className="flex items-center justify-between pb-2 px-1 text-[10px] font-mono tracking-widest text-[#a8a29e] uppercase select-none">
        <span className="flex items-center gap-1.5">
          <span className="text-[#fa5f34] font-semibold">SYSTEMS //</span> ZERO-DEPENDENCY C++17 SPEC
        </span>
        <span className="flex items-center gap-2">
          <span className="text-[9px] text-emerald-400 font-bold">CI: LINUX · MACOS · WIN</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </span>
      </div>

      {/* Main 2-Panel Architectural Card (Height matches desktop: 296px) */}
      <div className="relative rounded-xl border border-white/10 bg-[#0d0d10] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 h-auto md:h-[296px] divide-y md:divide-y-0 md:divide-x divide-neutral-800">
        {/* Panel 1: Terminal Build & Integration */}
        <div className="p-3.5 flex flex-col justify-between font-mono text-[#d4cec7]">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#fa5f34]" />
              <span className="text-[9px] font-bold text-neutral-200 tracking-wider">
                CMAKE FETCHCONTENT DISTRIBUTION
              </span>
            </div>
            <span className="text-[8px] bg-neutral-900 text-neutral-400 px-1.5 py-0.5 rounded border border-neutral-800">
              C++17 STATIC
            </span>
          </div>

          {/* Terminal Code Snippet */}
          <div className="my-2 p-2 rounded bg-black/80 border border-neutral-800/80 text-[7.5px] leading-relaxed space-y-1">
            <div className="text-neutral-500"># Link via modern CMake in 3 lines:</div>
            <div className="text-emerald-400">
              FetchContent_Declare(cipherkit GIT_REPOSITORY ...)
            </div>
            <div className="text-neutral-300">
              FetchContent_MakeAvailable(cipherkit)
            </div>
            <div className="text-cyan-400">
              target_link_libraries(app PRIVATE cipherkit::cipherkit)
            </div>
          </div>

          {/* Architecture Details */}
          <div className="flex items-center justify-between text-[8px] border-t border-neutral-800 pt-1.5 text-neutral-400">
            <span>ZERO HEAP ALLOC</span>
            <span className="text-[#fa5f34] font-bold">CONSTEXPR TABLES</span>
            <span>HEADER + STATIC</span>
          </div>
        </div>

        {/* Panel 2: Verification Matrix & Benchmarks */}
        <div className="p-3.5 flex flex-col justify-between font-mono bg-[#09090c]">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
            <span className="text-[9px] font-bold text-neutral-200 tracking-wider">
              GOOGLE TEST SUITE & MATRIX
            </span>
            <span className="text-[8px] bg-emerald-950 text-emerald-400 border border-emerald-700/60 px-1.5 py-0.5 rounded font-bold">
              100% COVERAGE
            </span>
          </div>

          {/* Benchmark rows */}
          <div className="my-2 space-y-1.5 text-[8px]">
            <div className="p-1.5 rounded bg-black/50 border border-neutral-800 flex justify-between items-center">
              <span className="text-neutral-400">Ubuntu 24.04 (GCC 13, Clang 17)</span>
              <span className="text-emerald-400 font-bold">PASS ✓</span>
            </div>
            <div className="p-1.5 rounded bg-black/50 border border-neutral-800 flex justify-between items-center">
              <span className="text-neutral-400">macOS Sonoma (Apple Clang 15)</span>
              <span className="text-emerald-400 font-bold">PASS ✓</span>
            </div>
            <div className="p-1.5 rounded bg-black/50 border border-neutral-800 flex justify-between items-center">
              <span className="text-neutral-400">Windows 11 (MSVC 19.38)</span>
              <span className="text-emerald-400 font-bold">PASS ✓</span>
            </div>
          </div>

          {/* Throughput Footer */}
          <div className="flex items-center justify-between text-[8px] border-t border-neutral-800 pt-1.5">
            <span className="text-neutral-500">BASE64 SPEED: 1.84 GB/S</span>
            <span className="text-cyan-400 font-bold">FUZZ TESTED: 0 FAILS</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function GenericArchitectureShowcase({ project }: { project: ProjectProps }) {
  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-between pb-2 px-1 text-[10px] font-mono tracking-widest text-[#a8a29e] uppercase select-none">
        <span className="flex items-center gap-1.5">
          <span className="text-neutral-500 font-semibold">ARCHITECTURE //</span> TECHNICAL BLUEPRINT
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#fa5f34] animate-pulse" />
      </div>

      <div className="rounded-xl border border-white/10 bg-[#121316] p-4 h-[296px] flex flex-col justify-between font-mono">
        <div className="flex justify-between items-center border-b border-white/5 pb-2">
          <span className="text-xs font-bold text-white">{project.name} ARCHITECTURE</span>
          <span className="text-[9px] text-[#fa5f34] font-bold">{project.statusLabel}</span>
        </div>
        <div className="text-[11px] text-neutral-300 leading-relaxed">
          {project.impactStats?.map((s, i) => (
            <div key={i} className="flex justify-between py-1 border-b border-white/5">
              <span className="text-neutral-400">{s.label}</span>
              <span className="text-white font-bold">{s.value}</span>
            </div>
          ))}
        </div>
        <div className="text-[9px] text-neutral-500">
          CATEGORY: {project.category.toUpperCase()}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Mobile Preview Mockup Screens (Arbitrage & NexusForce)
───────────────────────────────────────────────────────────── */

function ArbitrageMobilePreview() {
  return (
    <div className="h-full flex flex-col justify-between font-mono select-none">
      {/* Ticker Search Box */}
      <div className="rounded bg-neutral-900 border border-neutral-800 px-1.5 py-1 text-[7px] text-neutral-400 flex items-center justify-between">
        <span>🔍 50+ Assets...</span>
        <span className="text-[#fa5f34] text-[6.5px] font-bold">LIVE</span>
      </div>

      {/* Crypto list */}
      <div className="my-1 space-y-1">
        <div className="p-1 rounded bg-neutral-900/60 border border-neutral-800 flex items-center justify-between text-[7px]">
          <div>
            <div className="font-bold text-neutral-200">BTC/USDT</div>
            <div className="text-[5.5px] text-neutral-500">Binance ↔ Bybit</div>
          </div>
          <div className="text-right">
            <div className="text-emerald-400 font-bold">+2.4%</div>
            <div className="text-[5.5px] text-neutral-400">420ms</div>
          </div>
        </div>

        <div className="p-1 rounded bg-neutral-900/60 border border-neutral-800 flex items-center justify-between text-[7px]">
          <div>
            <div className="font-bold text-neutral-200">SOL/USDC</div>
            <div className="text-[5.5px] text-neutral-500">Raydium ↔ OKX</div>
          </div>
          <div className="text-right">
            <div className="text-emerald-400 font-bold">+3.8%</div>
            <div className="text-[5.5px] text-neutral-400">310ms</div>
          </div>
        </div>

        <div className="p-1 rounded bg-neutral-900/60 border border-neutral-800 flex items-center justify-between text-[7px]">
          <div>
            <div className="font-bold text-neutral-200">ETH/USDT</div>
            <div className="text-[5.5px] text-neutral-500">Uniswap ↔ Kraken</div>
          </div>
          <div className="text-right">
            <div className="text-amber-400 font-bold">+1.2%</div>
            <div className="text-[5.5px] text-neutral-400">580ms</div>
          </div>
        </div>
      </div>

      {/* Quick Action Button */}
      <div className="w-full py-1 rounded bg-[#fa5f34] text-black font-bold text-[7px] uppercase tracking-wider text-center">
        Set Price Alert
      </div>
    </div>
  )
}

function NexusForceMobilePreview() {
  return (
    <div className="h-full flex flex-col justify-between font-mono select-none">
      {/* Escrow Status Header */}
      <div className="rounded bg-indigo-950/40 border border-indigo-800/50 p-1 text-center">
        <span className="text-[6px] text-indigo-300 uppercase tracking-widest block">ESCROW #4092</span>
        <span className="text-[8.5px] font-bold text-white">12.50 ETH LOCKED</span>
      </div>

      {/* DAO Dispute Panel */}
      <div className="my-1 p-1.5 rounded bg-neutral-900/80 border border-neutral-800 text-[7px] space-y-0.5">
        <div className="flex justify-between items-center text-[6.5px] text-neutral-400">
          <span>TRIBUNAL:</span>
          <span className="text-amber-400 font-bold">ARBITRATION</span>
        </div>
        <div className="flex justify-between text-[6.5px]">
          <span className="text-neutral-500">VRF SEED:</span>
          <span className="text-emerald-400">VERIFIED</span>
        </div>
        <div className="w-full bg-neutral-800 rounded-full h-1 my-0.5 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-1 w-4/5" />
        </div>
        <div className="text-[5.5px] text-neutral-400 text-center">4 / 5 JURORS VOTED</div>
      </div>

      {/* Evidence Button */}
      <div className="w-full py-1 rounded bg-neutral-800 text-[#d4cec7] border border-neutral-700 text-[6.5px] uppercase tracking-wider font-semibold text-center">
        IPFS Evidence
      </div>
    </div>
  )
}
