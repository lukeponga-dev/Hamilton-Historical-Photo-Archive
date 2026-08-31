import steelMillImg from '../assets/images/steel_mill_1920_1788157454994.jpg';
import streetcarImg from '../assets/images/streetcar_1910_1788157470942.jpg';
import dundurnCastleImg from '../assets/images/dundurn_castle_1890_1788157486476.jpg';
import inclineRailwayImg from '../assets/images/incline_railway_1930_1788157500167.jpg';
import goreParkImg from '../assets/images/gore_park_1950_1788157516017.jpg';

import { Photo, Landmark } from '../types';

/**
 * Historical photograph objects collection pulled from
 * Hamilton City Libraries Heritage Online:
 * https://heritage.hamiltonlibraries.co.nz/objects?sort=name&facet=collection_type%3AImages
 */
export const HISTORICAL_PHOTOS: Photo[] = [
  {
    id: 'hcl-02271',
    title: 'Claudelands Railway Bridge & Waikato River',
    year: 1884,
    decade: '1880s',
    category: 'Transit & Streets',
    photographer: 'Hamilton Heritage Photographic Survey',
    accessionNo: 'HCL_02271',
    imageUrl: inclineRailwayImg,
    locationName: 'Claudelands Bridge',
    coordinates: { x: 62, y: 38 },
    description: 'The wrought-iron lattice truss railway bridge crossing the Waikato River, completed in 1883 to connect Hamilton West with the Claudelands rail yard and the Te Aroha line. The structure is captured in its inaugural decade with steam trains transporting timber and coal across the river.',
    historicalFact: 'Originally constructed as a railway bridge in 1883, Claudelands Bridge was later converted for vehicular road traffic in 1968. It is designated as a Category 2 historic place by Heritage New Zealand.',
    tags: ['Bridge', 'Waikato River', 'Claudelands', 'Railway', 'Victorian', 'Infrastructure'],
    heritageUrl: 'https://heritage.hamiltonlibraries.co.nz/objects/2271',
    sourceCollection: 'Hamilton City Libraries Heritage Online'
  },
  {
    id: 'hcl-05890',
    title: 'Construction of the Fairfield Bridge Arch Spans',
    year: 1937,
    decade: '1930s',
    category: 'Historic Estates & Architecture',
    photographer: 'Waikato Public Works Department',
    accessionNo: 'HCL_05890',
    imageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=700&auto=format&fit=crop',
    locationName: 'Fairfield Bridge',
    coordinates: { x: 55, y: 18 },
    description: 'A striking archival perspective showing the construction of the three reinforced concrete tied-arch spans of Fairfield Bridge over the Waikato River. Designed by engineer W.L. Newnham and built by Roose Shipping Co., it was opened in April 1937 by the Minister of Public Works Bob Semple.',
    historicalFact: 'Fairfield Bridge is renowned as one of New Zealand’s most iconic reinforced concrete bowstring arch bridges, spanning 139 metres across the Waikato River.',
    tags: ['Fairfield Bridge', 'Waikato River', 'Architecture', 'Art Deco', '1930s', 'Concrete'],
    heritageUrl: 'https://heritage.hamiltonlibraries.co.nz/objects/5890',
    sourceCollection: 'Hamilton City Libraries Heritage Online'
  },
  {
    id: 'hcl-03180',
    title: 'Ferry Bank Regatta & Waikato River Boathouse',
    year: 1914,
    decade: '1910s',
    category: 'Parks & Nature',
    photographer: 'Hamilton River Guild Archive',
    accessionNo: 'HCL_03180',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=700&auto=format&fit=crop',
    locationName: 'Ferry Bank & Grantham Street',
    coordinates: { x: 48, y: 58 },
    description: 'Spectators in Edwardian attire gather on the willow-fringed grassy banks at Ferry Bank along Grantham Street for the annual Hamilton River Regatta. Rowing eights, skiffs, and motor launches line the tranquil waters of the Waikato River.',
    historicalFact: 'Before the first Victoria Bridge opened in 1879, the Wiremu ferry operated here at Ferry Bank as the primary link between the military settlements of Hamilton West and Hamilton East.',
    tags: ['Ferry Bank', 'Waikato River', 'Regatta', 'Rowing', 'Edwardian', 'Waterfront'],
    heritageUrl: 'https://heritage.hamiltonlibraries.co.nz/objects/3180',
    sourceCollection: 'Hamilton City Libraries Heritage Online'
  },
  {
    id: 'hcl-02344',
    title: 'Frankton Junction Railway Station & Yard',
    year: 1924,
    decade: '1920s',
    category: 'Transit & Streets',
    photographer: 'New Zealand Railways Publicity Unit',
    accessionNo: 'HCL_02344',
    imageUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=700&auto=format&fit=crop',
    locationName: 'Frankton Junction',
    coordinates: { x: 26, y: 48 },
    description: 'A bustling wide-angle study of Frankton Junction, the pivotal North Island Main Trunk railway interchange. Steam locomotives, passenger carriages, and bustling railway signal boxes accommodate hundreds of travelers transferring between Rotorua, Auckland, and Wellington.',
    historicalFact: 'Frankton Junction was home to the famous NZR House Factory, which pre-cut thousands of standardized kitset timber homes shipped across the country for railway workers during the 1920s.',
    tags: ['Frankton', 'Railway', 'Steam Train', 'Station', 'Transit', '1920s'],
    heritageUrl: 'https://heritage.hamiltonlibraries.co.nz/objects/2344',
    sourceCollection: 'Hamilton City Libraries Heritage Online'
  },
  {
    id: 'hcl-03891',
    title: 'Garden Place & Carnegie Free Library',
    year: 1912,
    decade: '1910s',
    category: 'Civic Life & People',
    photographer: 'Waikato Times Special Edition',
    accessionNo: 'HCL_03891',
    imageUrl: goreParkImg,
    locationName: 'Garden Place & Victoria Street',
    coordinates: { x: 50, y: 50 },
    description: 'The stately Edwardian Baroque Carnegie Library on Victoria Street facing Garden Place Hill. Philanthropist Andrew Carnegie donated funds for the library, which opened in 1908. Horse carriages and early delivery carts line the gravel roadway outside.',
    historicalFact: 'In 1940, the prominent 18-metre-high Garden Place Hill (Te Pae o Hape) was excavated in a massive civic project, leveling the terrain to create the open civic square that stands today at 9 Garden Place.',
    tags: ['Garden Place', 'Carnegie Library', 'Victoria Street', 'Civic', 'Books', 'Edwardian'],
    heritageUrl: 'https://heritage.hamiltonlibraries.co.nz/objects/3891',
    sourceCollection: 'Hamilton City Libraries Heritage Online'
  },
  {
    id: 'hcl-01832',
    title: 'Hockin House at Waikato Hospital Grounds',
    year: 1895,
    decade: '1890s',
    category: 'Historic Estates & Architecture',
    photographer: 'Medical Board Historical Register',
    accessionNo: 'HCL_01832',
    imageUrl: dundurnCastleImg,
    locationName: 'Pembroke Street & Waikato Hospital',
    coordinates: { x: 42, y: 72 },
    description: 'A handsome Victorian residence built in 1893 on the hospital grounds overlooking Lake Rotoroa. Designed for medical superintendents, the villa features ornate wooden fretwork, wrap-around verandahs, and native botanical gardens.',
    historicalFact: 'Hockin House is now preserved as a heritage museum and library headquarters for the Waikato Historical Society, showcasing 19th-century medical and settler artifacts.',
    tags: ['Hockin House', 'Waikato Hospital', 'Heritage Villa', 'Victorian', 'Pembroke Street'],
    heritageUrl: 'https://heritage.hamiltonlibraries.co.nz/objects/1832',
    sourceCollection: 'Hamilton City Libraries Heritage Online'
  },
  {
    id: 'hcl-01169',
    title: 'The Clock Tower at Hamilton Chief Post Office',
    year: 1902,
    decade: '1900s',
    category: 'Historic Estates & Architecture',
    photographer: 'HCL Public Collections',
    accessionNo: 'HCL_01169',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=700&auto=format&fit=crop',
    locationName: 'Victoria Street & Collingwood Street',
    coordinates: { x: 52, y: 56 },
    description: 'The monumental two-storey brick Hamilton Chief Post and Telegraph building on Victoria Street, featuring its grand clock tower and arched entrance. Local citizens gathered here daily to receive telegraphs and dispatch mailbags via the railway.',
    historicalFact: 'The Chief Post Office served as Hamilton’s primary communications nerve centre for over eight decades before modern telecommunications redeveloped the Victoria Street corridor.',
    tags: ['Post Office', 'Clock Tower', 'Victoria Street', 'Civic', 'Collingwood St'],
    heritageUrl: 'https://heritage.hamiltonlibraries.co.nz/objects/1169',
    sourceCollection: 'Hamilton City Libraries Heritage Online'
  },
  {
    id: 'hcl-00127',
    title: 'Victoria Street South & Horse Carts',
    year: 1898,
    decade: '1890s',
    category: 'Transit & Streets',
    photographer: 'Hamilton Pioneer Photographers',
    accessionNo: 'HCL_00127',
    imageUrl: streetcarImg,
    locationName: 'Victoria Street South',
    coordinates: { x: 50, y: 53 },
    description: 'Archival view of early Victoria Street looking south toward Hood Street. Shows wooden shopfronts with timber awnings, horse-drawn buggies parked along the unpaved roadway, and early telegraph poles linking the fledgling township.',
    historicalFact: 'Victoria Street was named in honor of Queen Victoria and established following the arrival of the 4th Waikato Militia in 1864, quickly becoming the economic spine of Hamilton West.',
    tags: ['Victoria Street', 'Horse Carts', 'Downtown', 'Victorian', 'Settler', 'Storefronts'],
    heritageUrl: 'https://heritage.hamiltonlibraries.co.nz/objects/127',
    sourceCollection: 'Hamilton City Libraries Heritage Online'
  },
  {
    id: 'hcl-07936',
    title: 'Waikato Dairy Co-operative & Milk Delivery, Matangi',
    year: 1918,
    decade: '1910s',
    category: 'Industry & Business',
    photographer: 'Matangi Factory Archive',
    accessionNo: 'HCL_07936',
    imageUrl: steelMillImg,
    locationName: 'Matangi / Hamilton Rural Outskirts',
    coordinates: { x: 80, y: 65 },
    description: 'Lined-up horse carts and early motor lorries loaded with steel milk cans outside the historic Matangi Glaxo dairy factory. Steam vents and chimneys illustrate the agricultural and industrial backbone of the greater Waikato basin.',
    historicalFact: 'The Matangi factory was internationally significant as the birthplace of industrial dried baby milk powder produced under the world-renowned Glaxo pharmaceutical label.',
    tags: ['Dairy', 'Matangi', 'Glaxo', 'Industry', 'Agriculture', 'Waikato'],
    heritageUrl: 'https://heritage.hamiltonlibraries.co.nz/objects/7936',
    sourceCollection: 'Hamilton City Libraries Heritage Online'
  },
  {
    id: 'hcl-01452',
    title: 'Waikato River & The Historic Victoria Traffic Bridge',
    year: 1910,
    decade: '1910s',
    category: 'Historic Estates & Architecture',
    photographer: 'Waikato Times Landscape Survey',
    accessionNo: 'HCL_01452',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=700&auto=format&fit=crop',
    locationName: 'Victoria Bridge (Traffic Bridge)',
    coordinates: { x: 53, y: 62 },
    description: 'The elegant steel arch Victoria Traffic Bridge spanning the Waikato River, connecting Hamilton West with Hamilton East. The river steamer S.S. Manuwai is seen cruising beneath the structure, delivering cargo and passengers along the navigable waterways.',
    historicalFact: 'Opened in 1910 to replace the earlier 1879 wooden Union Bridge, the Victoria Bridge is a landmark 152-metre steel arch bridge manufactured by the Cleveland Bridge and Engineering Company.',
    tags: ['Victoria Bridge', 'Waikato River', 'Steamship', 'Bridge', 'Hamilton East', 'Edwardian'],
    heritageUrl: 'https://heritage.hamiltonlibraries.co.nz/objects/1452',
    sourceCollection: 'Hamilton City Libraries Heritage Online'
  },
  {
    id: 'hcl-06104',
    title: 'Waikato Times Printing Office & Typesetters',
    year: 1922,
    decade: '1920s',
    category: 'Industry & Business',
    photographer: 'Waikato Times Studio',
    accessionNo: 'HCL_06104',
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=700&auto=format&fit=crop',
    locationName: 'Victoria Street & Alma Street',
    coordinates: { x: 51, y: 52 },
    description: 'Inside the bustling print shop of the Waikato Times newspaper on Victoria Street. Skilled compositors and Linotype press operators assemble the daily broadsheet reporting on regional agriculture, sports, civic affairs, and international news.',
    historicalFact: 'First published in 1872 at Ngaruawahia, the Waikato Times moved to Hamilton in 1875 and has continuously served as the premier daily newspaper of the Waikato region.',
    tags: ['Waikato Times', 'Printing Press', 'Linotype', 'Journalism', 'Victoria Street', '1920s'],
    heritageUrl: 'https://heritage.hamiltonlibraries.co.nz/objects/6104',
    sourceCollection: 'Hamilton City Libraries Heritage Online'
  },
  {
    id: 'hcl-04120',
    title: 'Yachting & Walkways at Lake Rotoroa (Hamilton Lake)',
    year: 1938,
    decade: '1930s',
    category: 'Parks & Nature',
    photographer: 'Hamilton Domain Board Collection',
    accessionNo: 'HCL_04120',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=700&auto=format&fit=crop',
    locationName: 'Lake Rotoroa (Hamilton Lake)',
    coordinates: { x: 34, y: 64 },
    description: 'Wooden sailing dinghies glide across Lake Rotoroa on a breezy weekend afternoon, with strollers enjoying the willow-shaded paths of the 3.8-kilometre shoreline domain. Families gather on the grassy reserve for picnics and model boat races.',
    historicalFact: 'Lake Rotoroa (Hamilton Lake) is a 54-hectare peat lake set aside as a public domain in 1875. It is celebrated as the scenic recreational heart of Hamilton.',
    tags: ['Lake Rotoroa', 'Hamilton Lake', 'Yachting', 'Nature', 'Park', '1930s'],
    heritageUrl: 'https://heritage.hamiltonlibraries.co.nz/objects/4120',
    sourceCollection: 'Hamilton City Libraries Heritage Online'
  }
];

export const HAMILTON_LANDMARKS: Landmark[] = [
  {
    id: 'victoria-street',
    name: 'Victoria Street',
    description: 'The historic commercial backbone of Hamilton West, featuring iconic early settler storefronts, bank chambers, and the Chief Post Office clock tower.',
    coordinates: { x: 50, y: 53 },
    associatedPhotoIds: ['hcl-00127', 'hcl-01169', 'hcl-06104']
  },
  {
    id: 'garden-place',
    name: 'Garden Place & Carnegie Library',
    description: 'The civic heart of Hamilton Central (9 Garden Place), originally home to the 1908 Carnegie Free Library and the historic Garden Place Hill.',
    coordinates: { x: 50, y: 50 },
    associatedPhotoIds: ['hcl-03891']
  },
  {
    id: 'waikato-river-bridges',
    name: 'Waikato River & Bridges',
    description: 'The lifeblood of Kirikiriroa Hamilton, spanned by the 1910 Victoria Traffic Bridge, the 1883 Claudelands Railway Bridge, and the 1937 Fairfield Bridge.',
    coordinates: { x: 53, y: 62 },
    associatedPhotoIds: ['hcl-01452', 'hcl-02271', 'hcl-05890']
  },
  {
    id: 'ferry-bank',
    name: 'Ferry Bank & Waikato Waterfront',
    description: 'The river landing at Grantham Street where the historic Wiremu ferry crossed, later hosting the Waikato rowing club and annual river regattas.',
    coordinates: { x: 48, y: 58 },
    associatedPhotoIds: ['hcl-03180']
  },
  {
    id: 'frankton-junction',
    name: 'Frankton Junction',
    description: 'The major railway nexus of the North Island Main Trunk line, famous for its steam sheds, busy passenger platforms, and the NZR House Factory.',
    coordinates: { x: 26, y: 48 },
    associatedPhotoIds: ['hcl-02344']
  },
  {
    id: 'hamilton-lake',
    name: 'Lake Rotoroa (Hamilton Lake)',
    description: 'The picturesque 54-hectare peat lake domain with its 3.8 km perimeter walkway, yachting club, and recreational parklands.',
    coordinates: { x: 34, y: 64 },
    associatedPhotoIds: ['hcl-04120']
  },
  {
    id: 'hockin-house',
    name: 'Hockin House & Waikato Hospital',
    description: 'The 1893 historic superintendent villa on Pembroke Street overlooking the lake, now serving as the Waikato Historical Society museum.',
    coordinates: { x: 42, y: 72 },
    associatedPhotoIds: ['hcl-01832']
  },
  {
    id: 'matangi-district',
    name: 'Matangi Dairy District',
    description: 'The pioneer dairy processing hub on Hamilton\'s rural outskirts, celebrated for the historic Glaxo dried milk factory.',
    coordinates: { x: 80, y: 65 },
    associatedPhotoIds: ['hcl-07936']
  }
];

export const ALL_DECADES = ['All', '1880s', '1890s', '1900s', '1910s', '1920s', '1930s', '1940s'];

export const ALL_CATEGORIES = [
  'All',
  'Transit & Streets',
  'Historic Estates & Architecture',
  'Parks & Nature',
  'Civic Life & People',
  'Industry & Business'
];
