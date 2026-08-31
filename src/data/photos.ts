import steelMillImg from '../assets/images/steel_mill_1920_1788157454994.jpg';
import streetcarImg from '../assets/images/streetcar_1910_1788157470942.jpg';
import dundurnCastleImg from '../assets/images/dundurn_castle_1890_1788157486476.jpg';
import inclineRailwayImg from '../assets/images/incline_railway_1930_1788157500167.jpg';
import goreParkImg from '../assets/images/gore_park_1950_1788157516017.jpg';

import { Photo, Landmark } from '../types';

export const HISTORICAL_PHOTOS: Photo[] = [
  {
    id: 'dundurn-1890',
    title: 'Dundurn Castle Grounds and Carriages',
    year: 1890,
    decade: '1890s',
    category: 'Historic Estates & Architecture',
    photographer: 'William Green Studio',
    accessionNo: 'HPL-ARC-1890-0082',
    imageUrl: dundurnCastleImg,
    locationName: 'Dundurn Castle',
    coordinates: { x: 28, y: 35 }, // Upper Left on Hamilton map
    description: 'A grand sepia-toned archive capture of Dundurn Castle, the historic 40-room neoclassical mansion completed in 1835 for Sir Allan MacNab, premier of the United Provinces of Canada. This image shows horse-drawn carriages on the pristine gravel path with the stately Doric pillars casting bold shadows across the front portico. Dundurn Castle remains a crown jewel of Hamilton heritage, representing mid-19th-century aristocratic life in Upper Canada.',
    historicalFact: 'Sir Allan MacNab, the owner of Dundurn Castle, was a prominent politician and railway magnate who coined the phrase "All my business is to make money" when promoting the Great Western Railway.',
    tags: ['Mansion', 'Sir Allan MacNab', 'Carriage', 'Sepia', 'Victorian']
  },
  {
    id: 'streetcar-1910',
    title: 'Electric Streetcars on James Street North',
    year: 1910,
    decade: '1910s',
    category: 'Transit & Streets',
    photographer: 'John Thomson Archive',
    accessionNo: 'HPL-ARC-1910-0412',
    imageUrl: streetcarImg,
    locationName: 'James Street North & King Street',
    coordinates: { x: 50, y: 52 }, // Central downtown
    description: 'An evocative sepia photograph detailing Hamilton\'s advanced early electric streetcar system operating along bustling James Street North. Horse-drawn carts share the busy cobblestone road with early automobiles, while pedestrians dressed in Edwardian frock coats, bowler hats, and elegant high-collared dresses stroll past the grand limestone storefronts. James Street was the primary commercial corridor, alive with merchants, theatres, and the pulse of a growing industrial hub.',
    historicalFact: 'Hamilton was one of the earliest Canadian cities to adopt electric streetcars, launching its electric trolley service in 1892 to replace the older horse-drawn carriage street railways.',
    tags: ['Streetcar', 'Downtown', 'Transit', 'Edwardian', 'James Street']
  },
  {
    id: 'steel-mill-1920',
    title: 'The Fires of Industry: Hamilton Steel Mill',
    year: 1920,
    decade: '1920s',
    category: 'Industry & Business',
    photographer: 'C.P.R. Industrial Photographic Unit',
    accessionNo: 'HPL-ARC-1920-0985',
    imageUrl: steelMillImg,
    locationName: 'Hamilton Harbour (Industrial Sector)',
    coordinates: { x: 75, y: 32 }, // Northeast on the bay
    description: 'A striking black and white study of a towering blast furnace in the north-end industrial zone along the Hamilton Harbour. Dense plumes of black smoke and columns of brilliant white steam ascend into the sky as ironworkers shift heavy raw materials. This photograph encapsulates Hamilton\'s rise as "The Ambitious City" and the steel manufacturing capital of Canada, driven by giants like Stelco and Dofasco.',
    historicalFact: 'During World War I and II, Hamilton mills produced over half of Canada\'s entire steel output, turning the city into a vital military-industrial powerhouse for the Allied forces.',
    tags: ['Steel Mill', 'Industry', 'Stelco', 'Labour', 'Hamilton Harbour']
  },
  {
    id: 'incline-1930',
    title: 'Mount Hamilton Incline Railway',
    year: 1930,
    decade: '1930s',
    category: 'Transit & Streets',
    photographer: 'Escarpment Historical Society',
    accessionNo: 'HPL-ARC-1930-1121',
    imageUrl: inclineRailwayImg,
    locationName: 'Hamilton Incline Railway (James St. Steps)',
    coordinates: { x: 49, y: 76 }, // South-central on the mountain wall
    description: 'A breathtaking archival view of the historic Mount Hamilton Incline Railway climbing the sheer limestone cliffs of the Niagara Escarpment. This image captures a wooden double-tracked cable car midway on its steep incline. It transported thousands of daily commuters and horse-drawn wagons between the lower city grid and the rapidly expanding suburban "Mountain" top neighborhoods.',
    historicalFact: 'Hamilton had two separate incline railways: the Hamilton Steps/James Street Incline (active 1892–1932) and the East End Incline (active 1901–1936). They played a critical role in mountain transit before paved roads made auto ascent feasible.',
    tags: ['Incline', 'Transit', 'Escarpment', 'Cable Car', 'Engineering']
  },
  {
    id: 'gore-park-1950',
    title: 'Post-War Gore Park and Victorian Fountain',
    year: 1950,
    decade: '1950s',
    category: 'Civic Life & People',
    photographer: 'Spectator Staff Photo Archives',
    accessionNo: 'HPL-ARC-1950-2204',
    imageUrl: goreParkImg,
    locationName: 'Gore Park',
    coordinates: { x: 52, y: 55 }, // Central downtown park
    description: 'A gorgeous mid-century black and white view of Gore Park in downtown Hamilton during the high peak of post-war prosperity. Citizens in 1950s fashion relax on iron benches beside the grand Victorian iron fountain, which was originally installed in 1860 to celebrate the opening of the city\'s waterworks. Vintage sedans and shop signs line King Street, portraying a thriving, bustling urban core.',
    historicalFact: 'Gore Park has been the public heart of Hamilton since the 1840s. Its beautiful cast-iron fountain was manufactured by the Wood & Perot company in Philadelphia and shipped to Hamilton in pieces.',
    tags: ['Gore Park', 'Downtown', 'Fountain', 'Mid-Century', '1950s']
  },
  {
    id: 'westinghouse-1918',
    title: 'Westinghouse Office Building Headquarters',
    year: 1918,
    decade: '1910s',
    category: 'Historic Estates & Architecture',
    photographer: 'Prack & Prack Architects Collection',
    accessionNo: 'HPL-ARC-1918-0056',
    imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=600&auto=format&fit=crop',
    locationName: 'Westinghouse Headquarters (Sanford Ave)',
    coordinates: { x: 68, y: 53 }, // East-central
    description: 'A rare high-contrast print showing the five-story neoclassical head office of Canadian Westinghouse on Sanford Avenue North. Built in 1917–1918, this building was a marvel of modern office engineering, featuring detailed brickwork, large steel-framed windows to let in daylight, and an ornate limestone entrance. It served as the central brain of Hamilton\'s vast electric manufacturing empire.',
    historicalFact: 'Canadian Westinghouse was the city\'s second-largest employer after Stelco, producing everything from air brakes and steam turbines to lightbulbs, washing machines, and radios.',
    tags: ['Architecture', 'Neoclassical', 'Westinghouse', 'Sanford Ave', 'World War I']
  },
  {
    id: 'canal-lighthouse-1880',
    title: 'Beach Canal Lighthouse and Keeper\'s Cottage',
    year: 1880,
    decade: '1880s',
    category: 'Parks & Nature',
    photographer: 'Alexander Henderson Portfolios',
    accessionNo: 'HPL-ARC-1880-0012',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop',
    locationName: 'Hamilton Beach Canal',
    coordinates: { x: 92, y: 15 }, // Far top-right on the spit
    description: 'An exquisite early glass-plate print showing the historic stone lighthouse constructed in 1858 at the beach canal entrance to Hamilton Harbour. The lighthouse keeper\'s wooden frame cottage stands beside it, overlooking the sandy bar of Hamilton Beach. In the channel, a masted schooner is towed by a small steam tug, navigating the vital passage that connected the Great Lakes to the industrial heart of the city.',
    historicalFact: 'The 1858 lighthouse was built using solid Queenston limestone and stood 55 feet tall. It operated continuously for over 100 years before being decommissioned in 1958 when the Burlington Canal Lift Bridge was completed.',
    tags: ['Canal', 'Lighthouse', 'Sailing Ship', 'Burlington Beach', 'Lake Ontario']
  },
  {
    id: 'websters-1905',
    title: 'Victorian Excursionists at Webster\'s Falls',
    year: 1905,
    decade: '1900s',
    category: 'Parks & Nature',
    photographer: 'F.G. Eastmure Catalog',
    accessionNo: 'HPL-ARC-1905-0145',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=600&auto=format&fit=crop',
    locationName: 'Spencer Gorge (Webster\'s Falls)',
    coordinates: { x: 12, y: 25 }, // Far west (Dundas area)
    description: 'A charming historical photograph depicting Victorian-era tourists picnicking on the grassy banks of Spencer Gorge, directly in front of the thundering Webster\'s Falls. Ladies in massive sweeping skirts, parasols, and wide straw hats pose near the stone bridge, illustrating Hamilton\'s early reputation as a sanctuary of natural beauty. The Spencer Creek provided the initial hydraulic power that fueled the industrial birth of nearby Dundas.',
    historicalFact: 'Hamilton is internationally recognized as the "Waterfall Capital of the World," boasting over 100 waterfalls within its city limits, created by Spencer Creek and other rivers spilling over the Niagara Escarpment.',
    tags: ['Waterfall', 'Nature', 'Spencer Gorge', 'Picnic', 'Dundas', 'Edwardian']
  },
  {
    id: 'pigott-1935',
    title: 'The Art Deco Silhouette of the Pigott Building',
    year: 1935,
    decade: '1930s',
    category: 'Historic Estates & Architecture',
    photographer: 'A.M. Fleet Architectural Survey',
    accessionNo: 'HPL-ARC-1935-0812',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop',
    locationName: 'The Pigott Building (James St S)',
    coordinates: { x: 48, y: 59 }, // Downtown south
    description: 'A dramatic low-angle archival view of the newly completed Pigott Building rising 18 stories above James Street South. Designed by architects Prack & Prack, this Gothic Revival and Art Deco masterpiece was completed in 1929 by the legendary Pigott Construction Company. Its crown features beautiful gargoyles, soaring vertical arches, and multi-colored cathedral glass, standing as Hamilton\'s first true skyscraper.',
    historicalFact: 'The Pigott Construction Company was once Canada\'s largest, building not only this headquarters but also the Royal Connaught Hotel, the Cathedral of Christ the King, and McMaster University\'s original buildings.',
    tags: ['Skyscraper', 'Art Deco', 'Gothic Revival', 'Pigott', 'Downtown']
  },
  {
    id: 'rbg-1932',
    title: 'Construction of the Royal Botanical Rock Garden',
    year: 1932,
    decade: '1930s',
    category: 'Parks & Nature',
    photographer: 'RBG Photographic Archive',
    accessionNo: 'HPL-ARC-1932-0210',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=600&auto=format&fit=crop',
    locationName: 'Royal Botanical Gardens (Rock Garden)',
    coordinates: { x: 20, y: 22 }, // Northwest entrance
    description: 'A historical view documenting relief workers during the Great Depression constructing the legendary Rock Garden of the Royal Botanical Gardens. The site was originally an abandoned, unsightly gravel pit. Under a government work relief scheme, hundreds of men manually hauled local limestone boulders, contoured the hills, and planted thousands of perennials to transform the entrance of Hamilton into a spectacular green gateway.',
    historicalFact: 'The RBG is the largest botanical garden in Canada, spanning over 2,400 acres of nature reserves, marshlands, and formal garden displays along the tip of Lake Ontario.',
    tags: ['RBG', 'Gardens', 'Great Depression', 'Labour', 'Rock Garden', 'Conservation']
  },
  {
    id: 'gage-1947',
    title: 'Gage Park Greenhouse and Concert Crowd',
    year: 1947,
    decade: '1947',
    category: 'Civic Life & People',
    photographer: 'Spectator Civic Life Collection',
    accessionNo: 'HPL-ARC-1947-1594',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop',
    locationName: 'Gage Park (East Hamilton)',
    coordinates: { x: 73, y: 64 }, // Southeast area
    description: 'A warm summer archival shot capturing crowds of post-war Hamilton families gathered around the Gage Park bandshell to enjoy a Sunday military brass band concert. In the background, the iconic Gage Park tropical greenhouse conservatory displays its symmetrical glass dome architecture. The park\'s lush rose gardens and extensive tree canopy served as a refreshing natural retreat for the hard-working steel families of the east end.',
    historicalFact: 'Gage Park was designed in the "City Beautiful" style in 1919 by the famous landscape architects Harries & Hall. It features the beautiful Gage Park Fountain, funded by a bequest from the prominent Gage family.',
    tags: ['Gage Park', 'Concert', 'Greenhouse', 'Bandshell', 'East End', '1940s']
  },
  {
    id: 'saddlery-1885',
    title: 'The Jolley Saddlery & Harness Workshop',
    year: 1885,
    decade: '1880s',
    category: 'Industry & Business',
    photographer: 'Hamilton Commercial Gazette',
    accessionNo: 'HPL-ARC-1885-0005',
    imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=600&auto=format&fit=crop',
    locationName: 'James Street South Saddlery',
    coordinates: { x: 47, y: 55 }, // Downtown core
    description: 'An incredibly rare interior plate photo showing James Jolley & Sons saddlery workroom on James Street South. Craftsmen in leather aprons stand surrounded by hand-stitched leather horse harnesses, saddles, brass fittings, and tools. As a premier manufacturer of heavy industrial horse gear, the saddlery was vital to the logistics of transport, shipping, and farming in late Victorian Hamilton.',
    historicalFact: 'James Jolley was an esteemed Hamiltonian who served as a city alderman and school trustee. His saddlery was famous across Canada, winning numerous medals for leather craft at industrial exhibitions.',
    tags: ['Saddlery', 'Leather', 'Workshop', 'Victorian', 'James Street', 'Craftsmen']
  }
];

export const HAMILTON_LANDMARKS: Landmark[] = [
  {
    id: 'gore-park',
    name: 'Gore Park',
    description: 'The historical public plaza and central square at King and Hughson streets, home to the iconic 1860 Victorian iron fountain and cenotaph.',
    coordinates: { x: 52, y: 55 },
    associatedPhotoIds: ['gore-park-1950', 'streetcar-1910']
  },
  {
    id: 'dundurn-castle',
    name: 'Dundurn Castle',
    description: 'Sir Allan MacNab\'s majestic 1835 neoclassical villa situated on Burlington Heights, overlooking the Hamilton Harbour.',
    coordinates: { x: 28, y: 35 },
    associatedPhotoIds: ['dundurn-1890']
  },
  {
    id: 'incline-railway',
    name: 'Hamilton Incline Railway',
    description: 'The historic cable railway at the base of James St. South, built to carry pedestrians and wagons up the Niagara Escarpment mountain wall.',
    coordinates: { x: 49, y: 76 },
    associatedPhotoIds: ['incline-1930', 'pigott-1935']
  },
  {
    id: 'industrial-sector',
    name: 'Hamilton Harbour Industrial Sector',
    description: 'The northern waterfront of Hamilton that hosted massive shipping canals, blast furnaces, and the steel operations of Stelco and Dofasco.',
    coordinates: { x: 75, y: 32 },
    associatedPhotoIds: ['steel-mill-1920']
  },
  {
    id: 'beach-canal',
    name: 'Burlington Beach Canal',
    description: 'The sandy sandbar spit and deep-water canal connecting Lake Ontario to Hamilton Harbour, featuring the 1858 stone lighthouse.',
    coordinates: { x: 92, y: 15 },
    associatedPhotoIds: ['canal-lighthouse-1880']
  },
  {
    id: 'spencer-gorge',
    name: 'Spencer Gorge & Dundas Valley',
    description: 'The majestic natural gorge containing Webster\'s Falls, Tew\'s Falls, and the historical mills of Dundas that powered early settler commerce.',
    coordinates: { x: 12, y: 25 },
    associatedPhotoIds: ['websters-1905', 'rbg-1932']
  },
  {
    id: 'gage-park',
    name: 'Gage Park',
    description: 'A beautifully preserved 71-acre historic park in Hamilton\'s east end, boasting an Art Deco bandshell, rose gardens, and a grand conservatory greenhouse.',
    coordinates: { x: 73, y: 64 },
    associatedPhotoIds: ['gage-1947', 'westinghouse-1918']
  }
];

export const ALL_DECADES = ['All', '1880s', '1890s', '1900s', '1910s', '1920s', '1930s', '1940s', '1950s'];

export const ALL_CATEGORIES = [
  'All',
  'Industry & Business',
  'Transit & Streets',
  'Historic Estates & Architecture',
  'Parks & Nature',
  'Civic Life & People'
];
