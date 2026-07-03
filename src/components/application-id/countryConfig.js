export const COUNTRY_CONFIG = {
  PAK: { name: 'Pakistan', calling_code: '92', flag: '🇵🇰' },
  UAE: { name: 'United Arab Emirates', calling_code: '971', flag: '🇦🇪' },
  IND: { name: 'India', calling_code: '91', flag: '🇮🇳' },
  TUR: { name: 'Turkey', calling_code: '90', flag: '🇹🇷' },
  QAT: { name: 'Qatar', calling_code: '974', flag: '🇶🇦' },
  SAU: { name: 'Saudi Arabia', calling_code: '966', flag: '🇸🇦' },
  BGD: { name: 'Bangladesh', calling_code: '880', flag: '🇧🇩' },
  NPL: { name: 'Nepal', calling_code: '977', flag: '🇳🇵' },
  OMN: { name: 'Oman', calling_code: '968', flag: '🇴🇲' },
  KWT: { name: 'Kuwait', calling_code: '965', flag: '🇰🇼' },
  BHR: { name: 'Bahrain', calling_code: '973', flag: '🇧🇭' },
  AFG: { name: 'Afghanistan', calling_code: '93', flag: '🇦🇫' },
  GBR: { name: 'United Kingdom', calling_code: '44', flag: '🇬🇧' },
  USA: { name: 'United States', calling_code: '1', flag: '🇺🇸' },
  CAN: { name: 'Canada', calling_code: '1', flag: '🇨🇦' },
  AUS: { name: 'Australia', calling_code: '61', flag: '🇦🇺' },
  MYS: { name: 'Malaysia', calling_code: '60', flag: '🇲🇾' },
  IDN: { name: 'Indonesia', calling_code: '62', flag: '🇮🇩' },
};

export const COUNTRY_LIST = Object.entries(COUNTRY_CONFIG).map(([code, config]) => ({
  code,
  ...config,
}));