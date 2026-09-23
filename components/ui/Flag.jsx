import ReactCountryFlag from 'react-country-flag'

// Windows n'affiche pas les emoji drapeau comme des images (Segoe UI Emoji ne
// fournit pas les glyphes pays, par choix de Microsoft) : le navigateur retombe
// sur le code à deux lettres brut. On utilise donc de vraies images SVG plutôt
// que l'emoji Unicode, pour un rendu identique sur toutes les plateformes.
//
// La base stocke des codes à 3 lettres issus de deux conventions différentes
// (motorsport/Ergast pour pilotes-écuries, ISO 3166-1 pour les circuits) : ce
// mapping normalise les deux vers l'ISO 3166-1 alpha-2 attendu par la lib de drapeaux.
const ISO2 = {
  GBR: 'GB', NED: 'NL', MON: 'MC', BRA: 'BR', GER: 'DE', FRA: 'FR', AUT: 'AT',
  ESP: 'ES', ITA: 'IT', USA: 'US', MEX: 'MX', CAN: 'CA', AUS: 'AU', JPN: 'JP',
  CHN: 'CN', BHR: 'BH', SAU: 'SA', UAE: 'AE', SGP: 'SG', HUN: 'HU', BEL: 'BE',
  SUI: 'CH', FIN: 'FI', DEN: 'DK', POL: 'PL', ARG: 'AR', ZAF: 'ZA', RSA: 'ZA',
  THA: 'TH', PRT: 'PT', POR: 'PT', SWE: 'SE', NOR: 'NO', CZE: 'CZ', NZL: 'NZ',
  IRL: 'IE', COL: 'CO', VEN: 'VE', URY: 'UY', CHL: 'CL', IDN: 'ID', MYS: 'MY',
  RUS: 'RU', LIE: 'LI', IND: 'IN', HKG: 'HK', AZE: 'AZ', KOR: 'KR', MAR: 'MA',
  QAT: 'QA', TUR: 'TR', LBN: 'LB', EGY: 'EG',
}

// Nationalités disparues (Rhodésie, Yougoslavie...) sans code ISO actuel : pas de
// drapeau possible, on retombe sur le drapeau à damier générique du site.
export function Flag({ code, className }) {
  const iso2 = ISO2[code]
  if (!iso2) return <span className={className}>🏁</span>

  return (
    <ReactCountryFlag
      countryCode={iso2}
      svg
      // L'image est un élément inline aligné par défaut sur sa base (comme du texte
      // avec descendante) : sans ça, le drapeau flotte au-dessus de la ligne de texte.
      style={{ width: '1em', height: '1em', verticalAlign: 'middle', marginTop: '-0.15em' }}
      className={className}
      title={code}
    />
  )
}
