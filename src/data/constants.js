export const SUPPORTED_CHAIN_IDS = [1, 4, 3, 42, 5, 56, 97, 1337]
export const desktopSidebarWidth = '20px'

export const PHASE=3;
// export const serverOrigin='http://coinstarz.com:5000';
// export const clientOrigin='http://coinstarz.com';
export const serverOrigin='http://localhost:5000';
export const clientOrigin='http://localhost:3002';

//matching def in csz-api/models/UserProfile.js
export const enumCurrencies = [
  {label:'Bitcoin', symbol: 'BTC'},
  {label:'Ethereum', symbol: 'ETH'},
  {label:'Binance Coin', symbol: 'BNB'},
  {label:'Cardano', symbol: 'ADA'},
  {label:'Tether',  symbol:'USDT'},
  {label:'USD Coin',  symbol:'USDC'},
]

export const enumSocLinksLabels = [
  'Email', 'Instagram', 'Twitter','Twitch',
  'Facebook', 'Spotify', 'Opensea', 'Telegram', 'Soundcloud',
]
export const enumSocLinksIconSets = [
  'Color', 'FlatOutline', 'FlatSolid',
]
