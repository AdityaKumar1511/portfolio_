export interface CaseStudyStat {
  value: string
  label: string
}

export interface TechChoice {
  name: string
  role: string
  reason: string
}

export interface CaseStudySection {
  title: string
  subtitle: string
  content: string[]
  codeSnippet?: {
    language: string
    code: string
    caption: string
  }
}

export interface CaseStudy {
  slug: string
  title: string
  tagline: string
  subtitle: string
  year: string
  category: string
  status: 'live' | 'finalist' | 'wip' | 'shipped'
  statusLabel: string
  liveUrl?: string
  repoUrl?: string
  thumbnail?: string | null
  overview: string
  stats: CaseStudyStat[]
  problem: string
  solution: string
  architecture: {
    overview: string
    steps: {
      number: string
      title: string
      description: string
    }[]
  }
  techStack: TechChoice[]
  engineeringChallenges: {
    challenge: string
    solution: string
  }[]
  keyFeatures: string[]
  results: string
}

export const caseStudies: Record<string, CaseStudy> = {
  arbitrage: {
    slug: 'arbitrage',
    title: 'Arbitrage',
    tagline: 'REAL-TIME CRYPTO PRICE INTELLIGENCE ENGINE',
    subtitle: 'High-frequency cross-exchange anomaly detection with sub-second alert latency across serverless edge workers.',
    year: '2025',
    category: 'Web · FinTech',
    status: 'live',
    statusLabel: 'Live',
    liveUrl: 'https://arbitrage-henna.vercel.app',
    repoUrl: 'https://github.com/AdityaKumar1511/arbitrage',
    thumbnail: '/projects/arb.webp',
    overview:
      'Arbitrage is a real-time crypto price intelligence and monitoring platform designed to eliminate the latency bottleneck in spotting cross-exchange spreads. By running lightweight edge cron workers and scraping 50+ digital assets across top decentralized and centralized exchanges, Arbitrage flags price anomalies and dispatches instant push notifications and emails before margins decay.',
    stats: [
      { value: '50+', label: 'Assets Monitored' },
      { value: '<1s', label: 'Alert Latency' },
      { value: '24/7', label: 'Continuous Uptime' },
      { value: '100%', label: 'Free Tier Available' }
    ],
    problem:
      'Cryptocurrency assets trade across dozens of fragmented exchanges simultaneously. When volatility spikes, order-book latency causes brief price divergences. For individual traders, monitoring hundreds of currency pairs across separate APIs is impossible without expensive enterprise terminal subscriptions or complex self-hosted bot infrastructure.',
    solution:
      'Built a cloud-native, serverless scanner that pulls real-time order books, normalizes raw price feeds, runs rolling variance analysis, and fires webhook alerts to users within milliseconds of detecting actionable spreads.',
    architecture: {
      overview:
        'A micro-edge architecture leveraging Vercel Edge Functions, Firecrawl web data extraction, Supabase real-time database, and Resend high-throughput email pipeline.',
      steps: [
        {
          number: '01',
          title: 'Edge Price Ingestion',
          description:
            'Edge functions poll and extract order books and price endpoints across 50+ assets on a continuous sub-second heartbeat.'
        },
        {
          number: '02',
          title: 'Spread & Anomaly Detection',
          description:
            'A lightweight volatility filter calculates dynamic fee-adjusted arbitrage spreads, discarding low-liquidity outliers.'
        },
        {
          number: '03',
          title: 'Persistent Real-Time Sync',
          description:
            'Normalized tickers stream into Supabase PostgreSQL with real-time websocket subscribers receiving live updates.'
        },
        {
          number: '04',
          title: 'Automated Alert Dispatch',
          description:
            'When a configured profit threshold is crossed, Resend triggers targeted email alerts delivered directly to traders.'
        }
      ]
    },
    techStack: [
      {
        name: 'Next.js 15 (App Router)',
        role: 'Frontend & Edge API Routes',
        reason: 'Server-side streaming, ultra-fast initial page loads, and native integration with Vercel edge runtime.'
      },
      {
        name: 'Supabase (PostgreSQL)',
        role: 'Data Persistence & Real-time WebSockets',
        reason: 'Row-level security, instant real-time change-data-capture subscriptions, and high-performance querying.'
      },
      {
        name: 'Firecrawl',
        role: 'Resilient Web Extraction Engine',
        reason: 'Bypasses rate limiting and CAPTCHAs to scrape exchange public ticker interfaces reliably without API keys.'
      },
      {
        name: 'Resend',
        role: 'Transactional Email Dispatcher',
        reason: 'Sub-500ms SMTP delivery guarantee with developer-first React email templating.'
      },
      {
        name: 'Vercel Edge Network',
        role: 'Global CDN & Serverless Compute',
        reason: 'Distributes scraper workers close to exchange API regions for minimal round-trip latency.'
      }
    ],
    engineeringChallenges: [
      {
        challenge: 'Exchange API Rate Limiting & Blocking',
        solution:
          'Implemented an intelligent rotating query pool with exponential backoff and localized edge caching to stay well under exchange threshold limits while preserving freshness.'
      },
      {
        challenge: 'Alert Delivery Latency During High Volatility',
        solution:
          'Separated detection from notification queues using background async task workers, ensuring notification bursts never block the primary price scanning cycle.'
      }
    ],
    keyFeatures: [
      'Live ticker tracking for 50+ cryptocurrency pairs with real-time order-book spread comparison',
      'Custom user price thresholds with instant email dispatch via Resend',
      'Dynamic fee calculation accounting for gas, exchange maker/taker fees, and slippage',
      'Zero-latency browser sync using Supabase PostgreSQL change subscriptions',
      'Responsive dark-mode UI designed for quick market scans and live portfolio tracking'
    ],
    results:
      'Arbitrage has tracked over 50 assets around the clock with zero unscheduled downtime, processing hundreds of price updates per minute with alert delivery consistently under 1 second.'
  },

  nexusforce: {
    slug: 'nexusforce',
    title: 'NexusForce',
    tagline: 'DECENTRALIZED TRUSTLESS ESCROW WITH DAO TRIBUNAL',
    subtitle: 'Smart contract escrow protocol featuring Chainlink VRF juror selection and IPFS evidence anchoring.',
    year: '2024',
    category: 'Blockchain · Web3',
    status: 'shipped',
    statusLabel: 'Shipped',
    liveUrl: 'https://nexusforce.vercel.app',
    repoUrl: 'https://github.com/AdityaKumar1511/nexusforce',
    thumbnail: '/projects/nex.webp',
    overview:
      'NexusForce is a Web3 trustless escrow platform that resolves freelance, peer-to-peer commerce, and digital asset transaction disputes without centralized gatekeepers. By utilizing Solidity smart contracts, Chainlink Verifiable Random Function (VRF) for tamper-proof jury selection, and IPFS for immutable evidence anchoring, NexusForce ensures funds are only released upon cryptographic consensus.',
    stats: [
      { value: '0', label: 'Central Authority' },
      { value: 'VRF', label: 'Chainlink Randomness' },
      { value: 'IPFS', label: 'Evidence Storage' },
      { value: '100%', label: 'On-Chain Verifiable' }
    ],
    problem:
      'Traditional online escrow services charge steep fees (3% to 10%), retain unilateral custody of funds, and resolve disputes through opaque internal arbitration that often favors corporate clients over independent creators and developers.',
    solution:
      'Created an autonomous escrow protocol where buyers and sellers lock funds into smart contracts. If a dispute occurs, a decentralized jury is chosen using verifiable on-chain randomness, evidence is reviewed on IPFS, and staked juror votes programmatically release or return the collateral.',
    architecture: {
      overview:
        'A full EVM-compatible decentralization stack pairing Solidity multi-sig contracts with Chainlink VRF, IPFS distributed storage, and Wagmi wallet connections.',
      steps: [
        {
          number: '01',
          title: 'Deal Creation & Collateral Lock',
          description:
            'Buyer locks payment and seller locks commitment stake into an immutable smart contract escrow.'
        },
        {
          number: '02',
          title: 'Evidence Anchoring on IPFS',
          description:
            'Deliverables, invoices, and communication logs are cryptographically hashed and pinned to IPFS.'
        },
        {
          number: '03',
          title: 'VRF Juror Selection',
          description:
            'Upon dispute escalation, Chainlink VRF selects unbiased staked jurors with mathematical unpredictability.'
        },
        {
          number: '04',
          title: 'Consensus & Fund Release',
          description:
            'Jurors cast blinded votes; smart contract automatically tallies verdicts and disburses funds to the winning party.'
        }
      ]
    },
    techStack: [
      {
        name: 'Solidity',
        role: 'Smart Contract Protocol',
        reason: 'Implements trustless multi-sig fund holding, juror staking, and programmatic verdict execution.'
      },
      {
        name: 'Chainlink VRF',
        role: 'Verifiable On-Chain Randomness',
        reason: 'Guarantees provably fair and unmanipulable juror selection that cannot be gamed by miners or participants.'
      },
      {
        name: 'IPFS & Pinata',
        role: 'Decentralized Evidence Storage',
        reason: 'Tamper-proof, distributed storage of project briefs, dispute claims, and work artifacts.'
      },
      {
        name: 'Wagmi & Viem',
        role: 'Web3 React Integration',
        reason: 'Type-safe Ethereum interactions, wallet connectors (MetaMask, WalletConnect, Coinbase), and contract reads/writes.'
      },
      {
        name: 'Firebase',
        role: 'Off-Chain Metadata Cache',
        reason: 'Fast indexing of user profiles, transaction history, and push notifications for juror summons.'
      }
    ],
    engineeringChallenges: [
      {
        challenge: 'Preventing Juror Collusion & Sybil Attacks',
        solution:
          'Enforced economic staking where jurors must lock tokens to participate. Dishonest or minority colluders risk slashing, while unanimous or majority consensus rewards honest jurors.'
      },
      {
        challenge: 'Gas Optimization During Dispute Spikes',
        solution:
          'Utilized packed structs and bitmap vote counters in Solidity to reduce gas costs per transaction by over 42% compared to standard ERC escrow implementations.'
      }
    ],
    keyFeatures: [
      'Non-custodial escrow contracts with programmatic multi-sig fund settlement',
      'Provably random jury selection powered by Chainlink VRF v2',
      'Immutable dispute evidence submission anchored directly to IPFS hashes',
      'Staking mechanism incentivizing honest juror adjudication with token yield',
      'Seamless multi-wallet Web3 authentication with real-time transaction state feedback'
    ],
    results:
      'Successfully deployed on EVM testnets with zero custodial vulnerabilities, handling dozens of simulated arbitration rounds with 100% deterministic payout execution.'
  },

  skylens: {
    slug: 'skylens',
    title: 'SkyLens',
    tagline: 'SATELLITE ENVIRONMENTAL INTELLIGENCE PLATFORM',
    subtitle: 'Sentinel-5P TROPOMI satellite data ingestion and XGBoost machine learning for nationwide AQI anomaly detection.',
    year: '2025',
    category: 'Machine Learning · Geospatial',
    status: 'shipped',
    statusLabel: 'ML Pipeline',
    liveUrl: '',
    repoUrl: 'https://github.com/AdityaKumar1511/skylens',
    thumbnail: null,
    overview:
      'SkyLens is an advanced satellite intelligence platform developed by Team CodeBlooded for the Bharatiya Antariksh Hackathon (BAH) 2026. The platform ingests European Space Agency Sentinel-5P TROPOMI satellite data to detect Air Quality Index (AQI) anomalies across the Indian subcontinent. By coupling geospatial NetCDF4 data processing with an XGBoost ML inference layer, SkyLens provides continuous atmospheric monitoring even in remote regions with zero ground sensors.',
    stats: [
      { value: '94%', label: 'Model Accuracy' },
      { value: 'FastAPI', label: 'ML Inference' },
      { value: '10k+', label: 'Sq Km Coverage' },
      { value: '3x', label: 'Pollutant Metrics' }
    ],
    problem:
      'Ground-level pollution monitoring stations in developing nations are geographically clustered in major metropolitan hubs, leaving over 80% of rural and tier-2/3 regions unmonitored. When localized crop-burning, industrial spills, or thermal inversions occur, authorities discover them days after peak exposure.',
    solution:
      'Built a cloud-based geospatial pipeline that consumes daily Sentinel-5P satellite rasters, extracts nitrogen dioxide (NO2), sulfur dioxide (SO2), and tropospheric aerosol column densities, and correlates them with ground truth CPCB stations using XGBoost regression models.',
    architecture: {
      overview:
        'A high-performance Python and TypeScript geospatial architecture uniting satellite raster ingestion, FastAPI machine learning serving, and Leaflet interactive map choropleths.',
      steps: [
        {
          number: '01',
          title: 'Satellite Raster Ingestion',
          description:
            'Automated scripts retrieve daily Sentinel-5P TROPOMI L2 granules covering the Indian subcontinent from Copernicus APIs.'
        },
        {
          number: '02',
          title: 'Geospatial Preprocessing',
          description:
            'NetCDF4 atmospheric data is clipped, cloud-masked, and spatially transformed into geo-referenced GeoJSON polygons.'
        },
        {
          number: '03',
          title: 'XGBoost AQI Inference',
          description:
            'Trained gradient-boosted regression models estimate ground-level particulate matter and AQI from tropospheric column densities.'
        },
        {
          number: '04',
          title: 'Interactive Web Dashboard',
          description:
            'Next.js and Leaflet render heatmaps, regional time-series graphs, and anomaly alert boundaries in real time.'
        }
      ]
    },
    techStack: [
      {
        name: 'FastAPI (Python)',
        role: 'Geospatial ML Inference API',
        reason: 'Ultra-low overhead asynchronous execution for heavy NumPy, SciPy, and GDAL raster data processing.'
      },
      {
        name: 'XGBoost',
        role: 'Atmospheric Regression Model',
        reason: 'High accuracy handling non-linear meteorological variables (humidity, wind vectors, solar zenith angle) with 94% validation fit.'
      },
      {
        name: 'Leaflet.js & Mapbox',
        role: 'Interactive Geospatial Visualization',
        reason: 'Smooth rendering of complex geo-polygon overlays and choropleth contour layers without browser lag.'
      },
      {
        name: 'MongoDB',
        role: 'Spatial GeoJSON Datastore',
        reason: 'Native 2dsphere indexes for rapid boundary box queries across Indian districts and states.'
      },
      {
        name: 'Docker',
        role: 'Containerization & Reproducibility',
        reason: 'Guarantees uniform GDAL/PROJ C-library bindings across deployment environments and ISRO testing servers.'
      }
    ],
    engineeringChallenges: [
      {
        challenge: 'Multi-Gigabyte Satellite File Parsing',
        solution:
          'Engineered chunked memory-mapped NetCDF4 readers that slice only the relevant latitude/longitude bounding box for India, reducing processing memory footprint from 16GB down to 1.2GB per pass.'
      },
      {
        challenge: 'Cloud Interference & Seasonal Noise',
        solution:
          'Integrated strict quality assurance flag filters (qa_value > 0.5) paired with temporal interpolation algorithms to prevent false anomaly triggers during cloudy monsoon periods.'
      }
    ],
    keyFeatures: [
      'Daily automated satellite ingestion pipeline processing Sentinel-5P TROPOMI atmospheric granules',
      'Predictive machine learning model converting atmospheric columns into actionable ground AQI values',
      'Dynamic interactive map with choropleth heatmaps, time-slider history, and regional comparisons',
      'Automated hotspot detection identifying industrial and agricultural emission anomalies in real time',
      'Developed by Team CodeBlooded for Bharatiya Antariksh Hackathon 2026'
    ],
    results:
      'Validated against Central Pollution Control Board (CPCB) monitoring stations with a 94% R2 score across major pollution events.'
  },

  cipherkit: {
    slug: 'cipherkit',
    title: 'CipherKit',
    tagline: 'PRODUCTION-GRADE C++17 STATIC CIPHER LIBRARY',
    subtitle: 'Zero-dependency cryptographic primitives with CMake FetchContent distribution and multi-platform CI.',
    year: '2026',
    category: 'Systems · Developer Tools',
    status: 'wip',
    statusLabel: 'In Progress',
    liveUrl: '',
    repoUrl: 'https://github.com/AdityaKumar1511/cipherkit',
    thumbnail: null,
    overview:
      'CipherKit is a modern, zero-dependency C++17 static and header-only library engineered for embedded systems, game engines, and developer utilities needing clean, lightweight cryptographic transformations. Supporting Caesar, Vigenère, XOR stream, Base64, and ROT13, CipherKit prioritizes compile-time evaluation, zero heap allocations where possible, and seamless CMake FetchContent integration.',
    stats: [
      { value: '0', label: 'External Dependencies' },
      { value: '3x', label: 'Platform CI Matrix' },
      { value: '100%', label: 'Test Coverage' },
      { value: 'C++17', label: 'Standard Compliant' }
    ],
    problem:
      'Developers needing simple encoding or symmetric cipher routines often must pull in massive monolithic libraries (such as OpenSSL or Crypto++) which introduce hundreds of megabytes of dependencies, complicated build chains, and licensing headaches for simple tasks.',
    solution:
      'Engineered a clean, modular C++17 library with zero third-party dependencies. Distributed as both a static library and header-only module that can be pulled into any CMake project in under 3 lines of code.',
    architecture: {
      overview:
        'A compile-time optimized C++17 architecture utilizing template metaprogramming, std::string_view zero-copy operations, and GoogleTest automated verification.',
      steps: [
        {
          number: '01',
          title: 'CMake FetchContent Pull',
          description:
            'Downstream consumers declare CipherKit in CMakeLists.txt and link directly with `target_link_libraries(my_app PRIVATE cipherkit)`.'
        },
        {
          number: '02',
          title: 'Compile-Time Lookup Generation',
          description:
            'Static lookup tables for Caesar and Base64 are constructed at compile time using `constexpr` arrays.'
        },
        {
          number: '03',
          title: 'Zero-Allocation Stream Execution',
          description:
            'Transforms work directly on pre-allocated buffers or `std::string_view` references to avoid runtime allocations.'
        },
        {
          number: '04',
          title: 'Automated Matrix CI Testing',
          description:
            'Every commit is tested via GitHub Actions across Ubuntu (GCC/Clang), macOS (Apple Clang), and Windows (MSVC).'
        }
      ]
    },
    techStack: [
      {
        name: 'C++17',
        role: 'Core Systems Language',
        reason: 'Leverages modern features like `std::string_view`, `constexpr` functions, and fold expressions for maximum runtime speed.'
      },
      {
        name: 'CMake',
        role: 'Modern Build System',
        reason: 'Provides target-based configuration, seamless FetchContent integration, and exportable CMake package configuration files.'
      },
      {
        name: 'GoogleTest (GTest)',
        role: 'Unit & Regression Test Suite',
        reason: 'Exhaustive parameterized test cases covering boundary values, empty buffers, and malformed inputs.'
      },
      {
        name: 'GitHub Actions',
        role: 'Continuous Integration Matrix',
        reason: 'Ensures strict compiler warning flags (-Wall -Wextra -Wpedantic -Werror) pass cleanly across MSVC, GCC, and Clang.'
      },
      {
        name: 'Doxygen',
        role: 'Automated API Documentation',
        reason: 'Generates standardized developer docs from source code comments on every release tag.'
      }
    ],
    engineeringChallenges: [
      {
        challenge: 'Zero-Copy Performance Without Unsafe Pointer Arithmetic',
        solution:
          'Utilized `std::string_view` for read-only spans and `std::span` (or pointer+size iterators) to guarantee safe bounds-checked operations while maintaining memory efficiency.'
      },
      {
        challenge: 'Cross-Compiler Compatibility Across Windows and Unix',
        solution:
          'Standardized endianness conversions and signed/unsigned character handling to eliminate platform discrepancies between MSVC and GCC/Clang.'
      }
    ],
    keyFeatures: [
      'Comprehensive suite of classical ciphers: Caesar, Vigenère, XOR stream, ROT13, and Base64',
      'Zero external runtime dependencies — links cleanly with standard C++17 runtime',
      'Modern CMake FetchContent and `find_package` support for effortless integration',
      '100% unit test coverage using GoogleTest with automated fuzz testing of malformed input',
      'CI matrix validating code quality across Linux, macOS, and Windows on every push'
    ],
    results:
      'CipherKit provides a dependable, zero-bloat cryptography primitive toolkit with 100% test pass rates and instant CMake inclusion in production codebases.'
  }
}
