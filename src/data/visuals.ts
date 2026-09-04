// VCGMEDIA Visual Diagram Library — real SVG diagrams attached to the
// "Diagram & Visual" exercise layer by the Offline Engine.
// All visuals: self-contained SVG (400x300), white background, print-safe, offline.

import { ExerciseDiagram } from '../types';

export interface DiagramVisualDef {
  id: string;
  title: string;
  svg: string;
}

const svgOpen = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300" style="max-width:100%;height:auto" font-family="Arial, Helvetica, sans-serif"><rect width="400" height="300" fill="#ffffff"/>`;
const svgClose = `</svg>`;
const title = (t: string) => `<text x="200" y="20" text-anchor="middle" font-size="15" font-weight="bold" fill="#1e3a8a">${t}</text>`;
const label = (x: number, y: number, t: string, size = 11) => `<text x="${x}" y="${y}" font-size="${size}" font-weight="bold" fill="#0f172a">${t}</text>`;

export const DIAGRAM_VISUALS: Record<string, DiagramVisualDef> = {

  'ghana-map': {
    id: 'ghana-map',
    title: 'Map of Ghana (16 Regions)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300" style="max-width:100%;height:auto" font-family="Segoe UI, Arial, sans-serif"><rect width="400" height="300" fill="#ffffff"/><text x="200" y="20" font-size="14" font-weight="700" fill="#1e293b" text-anchor="middle">The Republic of Ghana - The 16 Regions</text><path d="M146.5,18.1 L149.8,22.1 L145.8,36.7 L158.4,48.5 L165.3,52.6 L163.0,77.9 L160.5,79.7 L163.7,81.4 L160.9,82.8 L159.2,87.3 L160.3,88.8 L166.4,86.1 L171.4,90.0 L168.9,101.8 L169.9,112.9 L165.0,116.7 L166.8,121.2 L175.2,128.5 L178.1,133.7 L178.2,135.8 L174.5,139.8 L173.8,142.4 L174.7,159.9 L170.3,167.5 L170.7,172.2 L176.0,175.6 L174.2,188.9 L171.3,192.9 L171.4,196.6 L178.8,207.9 L180.2,213.3 L187.6,218.5 L190.6,218.8 L193.3,223.7 L199.0,226.1 L199.1,228.5 L193.4,232.5 L189.1,240.2 L180.7,242.3 L160.3,242.4 L144.1,250.3 L134.8,253.1 L116.0,264.6 L104.9,266.4 L86.6,272.5 L65.6,284.0 L61.9,283.9 L49.0,277.0 L19.1,270.3 L20.2,268.7 L26.0,269.1 L31.6,267.7 L34.1,256.0 L32.5,248.9 L25.4,247.2 L23.9,244.3 L14.5,213.8 L14.0,198.4 L24.5,181.8 L25.6,171.3 L32.7,151.4 L40.0,146.6 L40.1,142.3 L44.5,139.8 L40.6,115.0 L36.8,105.6 L34.5,104.8 L37.5,94.8 L36.3,94.1 L36.2,84.3 L33.1,75.5 L34.3,73.3 L32.7,56.8 L33.6,54.9 L31.4,51.3 L32.6,46.7 L30.7,45.8 L27.4,40.0 L27.7,34.4 L31.0,23.1 L105.8,22.6 L120.1,23.4 L123.2,26.0 L128.8,22.7 L131.4,19.1 L134.9,19.3 L136.9,16.0 L146.5,18.1Z" fill="#fde68a" stroke="#b45309" stroke-width="2.2" stroke-linejoin="round"/><circle cx="67.1" cy="149.5" r="9" fill="#ffffff" fill-opacity="0.92" stroke="#b45309" stroke-width="1.2"/><text x="67.1" y="153.3" font-size="11.5" font-weight="700" fill="#7c2d12" text-anchor="middle">A</text><circle cx="81.5" cy="203.4" r="9" fill="#ffffff" fill-opacity="0.92" stroke="#b45309" stroke-width="1.2"/><text x="81.5" y="207.20000000000002" font-size="11.5" font-weight="700" fill="#7c2d12" text-anchor="middle">B</text><circle cx="68.1" cy="187.8" r="9" fill="#ffffff" fill-opacity="0.92" stroke="#b45309" stroke-width="1.2"/><text x="68.1" y="191.60000000000002" font-size="11.5" font-weight="700" fill="#7c2d12" text-anchor="middle">C</text><circle cx="74.9" cy="192.5" r="9" fill="#ffffff" fill-opacity="0.92" stroke="#b45309" stroke-width="1.2"/><text x="74.9" y="196.3" font-size="11.5" font-weight="700" fill="#7c2d12" text-anchor="middle">D</text><circle cx="98.2" cy="271.3" r="9" fill="#ffffff" fill-opacity="0.92" stroke="#b45309" stroke-width="1.2"/><text x="98.2" y="275.1" font-size="11.5" font-weight="700" fill="#7c2d12" text-anchor="middle">E</text><circle cx="189.2" cy="225.9" r="9" fill="#ffffff" fill-opacity="0.92" stroke="#b45309" stroke-width="1.2"/><text x="189.2" y="229.70000000000002" font-size="11.5" font-weight="700" fill="#7c2d12" text-anchor="middle">F</text><circle cx="141.4" cy="250.3" r="9" fill="#ffffff" fill-opacity="0.92" stroke="#b45309" stroke-width="1.2"/><text x="141.4" y="254.10000000000002" font-size="11.5" font-weight="700" fill="#7c2d12" text-anchor="middle">G</text><circle cx="188.4" cy="89.9" r="9" fill="#ffffff" fill-opacity="0.92" stroke="#b45309" stroke-width="1.2"/><text x="188.4" y="93.7" font-size="11.5" font-weight="700" fill="#7c2d12" text-anchor="middle">H</text><circle cx="170.0" cy="51.1" r="9" fill="#ffffff" fill-opacity="0.92" stroke="#b45309" stroke-width="1.2"/><text x="170.0" y="54.9" font-size="11.5" font-weight="700" fill="#7c2d12" text-anchor="middle">I</text><circle cx="180.0" cy="104.4" r="9" fill="#ffffff" fill-opacity="0.92" stroke="#b45309" stroke-width="1.2"/><text x="180.0" y="108.2" font-size="11.5" font-weight="700" fill="#7c2d12" text-anchor="middle">J</text><circle cx="124.5" cy="89.4" r="9" fill="#ffffff" fill-opacity="0.92" stroke="#b45309" stroke-width="1.2"/><text x="124.5" y="93.2" font-size="11.5" font-weight="700" fill="#7c2d12" text-anchor="middle">K</text><circle cx="114.4" cy="31.9" r="9" fill="#ffffff" fill-opacity="0.92" stroke="#b45309" stroke-width="1.2"/><text x="114.4" y="35.699999999999996" font-size="11.5" font-weight="700" fill="#7c2d12" text-anchor="middle">L</text><circle cx="44.6" cy="90.5" r="9" fill="#ffffff" fill-opacity="0.92" stroke="#b45309" stroke-width="1.2"/><text x="44.6" y="94.3" font-size="11.5" font-weight="700" fill="#7c2d12" text-anchor="middle">M</text><circle cx="201.2" cy="188.1" r="9" fill="#ffffff" fill-opacity="0.92" stroke="#b45309" stroke-width="1.2"/><text x="201.2" y="191.9" font-size="11.5" font-weight="700" fill="#7c2d12" text-anchor="middle">N</text><circle cx="61.4" cy="286.4" r="9" fill="#ffffff" fill-opacity="0.92" stroke="#b45309" stroke-width="1.2"/><text x="61.4" y="290.2" font-size="11.5" font-weight="700" fill="#7c2d12" text-anchor="middle">O</text><circle cx="42.3" cy="241.0" r="9" fill="#ffffff" fill-opacity="0.92" stroke="#b45309" stroke-width="1.2"/><text x="42.3" y="244.8" font-size="11.5" font-weight="700" fill="#7c2d12" text-anchor="middle">P</text><path d="M141.4,243.8 L143.0,248.3 L147.9,248.3 L144.0,251.3 L145.4,256.1 L141.4,253.10000000000002 L137.4,256.1 L138.8,251.3 L134.9,248.3 L139.8,248.3 Z" fill="#7c2d12"/><text x="131.4" y="254.3" font-size="11.5" font-weight="700" fill="#7c2d12" text-anchor="end" paint-order="stroke" stroke="#ffffff" stroke-width="3">Accra</text><circle cx="81.5" cy="199.6" r="3.4" fill="#7c2d12"/><text x="87.5" y="203.2" font-size="10.5" fill="#334155" paint-order="stroke" stroke="#ffffff" stroke-width="3">Kumasi</text><circle cx="188.4" cy="86.6" r="3.4" fill="#7c2d12"/><text x="194.4" y="90.19999999999999" font-size="10.5" fill="#334155" paint-order="stroke" stroke="#ffffff" stroke-width="3">Tamale</text><circle cx="67.8" cy="278.3" r="3.4" fill="#7c2d12"/><text x="73.8" y="281.90000000000003" font-size="10.5" fill="#334155" paint-order="stroke" stroke="#ffffff" stroke-width="3">Takoradi</text><text x="150" y="292" font-size="11" font-style="italic" fill="#64748b" text-anchor="middle">Gulf of Guinea (Atlantic Ocean)</text></svg>`,
  },

  'west-africa': {
    id: 'west-africa',
    title: 'West Africa - Ghana and its Neighbours',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300" style="max-width:100%;height:auto" font-family="Segoe UI, Arial, sans-serif"><rect width="400" height="300" fill="#ffffff"/><path d="M265.3,78.8 L261.7,88.6 L257.6,91.7 L257.4,93.2 L252.3,92.4 L251.7,92.6 L251.6,93.4 L231.9,94.2 L227.8,97.5 L220.2,97.5 L219.4,98.3 L214.1,96.6 L212.2,97.2 L210.7,96.4 L208.1,96.8 L204.7,99.4 L197.3,103.0 L194.0,103.6 L193.1,106.6 L192.4,106.9 L188.4,105.7 L186.9,106.2 L183.6,109.4 L182.7,112.9 L179.3,112.8 L178.7,117.2 L176.1,118.3 L172.3,116.1 L170.0,116.0 L166.8,119.1 L168.0,122.8 L165.0,124.2 L165.7,125.3 L165.6,128.1 L162.5,131.1 L157.8,132.4 L155.7,134.0 L156.4,137.5 L156.1,139.2 L155.0,142.1 L153.3,143.1 L153.7,146.2 L153.0,150.2 L149.3,150.6 L147.1,152.9 L144.7,152.1 L145.2,150.5 L144.4,146.8 L142.5,147.4 L142.5,148.7 L139.9,147.6 L139.4,151.1 L136.5,151.2 L136.0,152.2 L136.3,153.1 L135.7,153.5 L131.7,152.2 L131.4,151.2 L130.1,150.1 L128.2,150.2 L126.5,152.4 L124.4,153.3 L124.2,151.4 L121.2,149.5 L120.4,143.7 L118.8,143.0 L117.3,143.7 L116.6,143.5 L119.7,139.3 L116.6,137.6 L116.1,136.4 L114.8,135.8 L114.8,132.9 L112.8,128.0 L111.4,126.8 L109.3,126.3 L108.2,126.6 L108.9,128.3 L108.6,129.1 L105.1,130.4 L104.5,131.5 L103.3,131.5 L98.0,129.6 L95.8,130.4 L93.3,133.2 L92.7,133.0 L90.4,129.6 L88.8,130.0 L86.6,132.0 L83.9,130.1 L85.1,127.3 L85.2,126.5 L84.4,125.6 L85.1,121.1 L82.3,116.2 L80.8,115.9 L80.0,116.8 L77.4,113.1 L78.5,110.3 L77.8,109.2 L77.8,106.5 L75.4,103.6 L75.9,101.4 L74.8,99.5 L76.8,100.3 L78.7,98.6 L79.5,97.4 L80.8,92.4 L82.7,90.7 L84.3,90.1 L90.2,95.6 L90.8,95.6 L93.1,92.4 L96.4,92.2 L101.9,93.0 L107.6,92.0 L107.8,90.1 L108.7,89.5 L108.9,91.2 L110.7,91.6 L153.1,91.6 L154.9,82.5 L151.7,78.8Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.2" stroke-linejoin="round"/><path d="M74.8,99.5 L75.9,101.4 L75.4,103.6 L77.8,106.5 L77.8,109.2 L78.5,110.3 L77.4,113.1 L80.0,116.8 L80.8,115.9 L82.3,116.2 L85.1,121.1 L84.4,125.6 L85.2,126.5 L85.1,127.3 L77.6,127.4 L74.7,128.2 L68.8,126.8 L67.3,125.9 L65.8,126.3 L65.5,124.7 L41.1,124.1 L36.7,126.3 L33.6,126.9 L30.1,126.7 L25.7,128.0 L23.5,127.9 L22.7,126.5 L23.0,125.9 L26.6,125.0 L24.9,123.7 L23.7,125.0 L23.2,125.2 L22.9,124.7 L22.9,119.7 L24.3,118.7 L33.7,118.6 L33.9,116.7 L40.0,115.9 L41.6,114.0 L49.8,117.3 L52.0,117.7 L56.7,116.6 L56.9,115.7 L56.6,114.9 L55.2,114.2 L50.2,114.6 L44.1,111.4 L42.1,111.1 L38.4,112.0 L37.4,113.7 L25.3,113.7 L25.0,112.5 L22.9,110.0 L24.6,108.4 L22.6,108.8 L22.5,107.8 L20.5,104.2 L19.3,103.3 L18.3,101.5 L16.2,100.4 L15.4,100.5 L15.0,101.3 L14.0,100.1 L18.5,98.2 L22.0,93.9 L25.2,88.8 L26.7,83.4 L29.0,79.6 L34.4,80.1 L41.8,78.8 L50.7,78.8 L53.9,80.9 L56.4,84.0 L60.6,84.2 L62.5,86.0 L64.1,90.2 L67.3,92.1 L68.1,94.5 L74.5,99.4Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.2" stroke-linejoin="round"/><path d="M22.9,119.7 L22.2,116.5 L24.0,115.0 L25.3,116.9 L27.0,117.3 L29.6,117.2 L29.9,116.0 L38.4,115.0 L36.7,114.7 L30.2,115.3 L27.7,116.5 L26.7,116.4 L25.6,115.1 L25.3,113.7 L37.4,113.7 L38.4,112.0 L42.1,111.1 L44.1,111.4 L50.2,114.6 L55.2,114.2 L56.6,114.9 L56.9,115.7 L56.7,116.6 L52.0,117.7 L49.8,117.3 L41.6,114.0 L40.0,115.9 L33.9,116.7 L33.7,118.6 L24.3,118.7 L23.6,119.1Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.2" stroke-linejoin="round"/><path d="M219.4,98.3 L218.8,103.1 L221.3,106.0 L221.0,107.3 L221.8,109.2 L224.0,112.3 L227.3,113.4 L228.6,115.0 L230.8,116.3 L228.3,116.2 L228.3,120.0 L235.0,124.7 L237.6,124.9 L239.5,123.8 L240.9,123.8 L242.5,125.8 L242.6,127.1 L240.7,127.9 L244.5,133.2 L243.3,135.6 L239.8,138.7 L238.4,138.5 L235.4,138.9 L234.9,138.4 L233.4,138.4 L232.1,140.2 L230.1,140.7 L229.2,142.9 L228.3,142.7 L227.6,143.7 L223.2,144.1 L213.4,141.7 L212.9,142.6 L211.9,142.5 L209.6,144.4 L208.8,143.7 L204.8,143.5 L184.1,143.6 L183.1,148.3 L184.6,150.5 L184.2,151.0 L184.9,152.4 L184.7,158.1 L185.7,161.2 L184.9,161.8 L184.3,161.8 L182.3,158.8 L179.6,156.4 L173.0,156.1 L167.5,158.1 L166.7,159.3 L164.5,158.4 L163.4,158.5 L159.4,156.0 L157.9,152.4 L156.0,151.5 L154.6,151.5 L153.0,150.2 L153.7,146.2 L153.3,143.1 L155.0,142.1 L156.1,139.2 L156.4,137.5 L155.7,134.0 L157.8,132.4 L162.5,131.1 L165.6,128.1 L165.7,125.3 L165.0,124.2 L168.0,122.8 L166.8,119.1 L168.8,116.9 L171.2,115.8 L175.5,118.2 L176.7,118.2 L178.7,117.2 L179.3,112.8 L182.7,112.9 L183.6,109.4 L186.9,106.2 L188.4,105.7 L192.4,106.9 L193.1,106.6 L194.0,103.6 L197.3,103.0 L204.7,99.4 L208.1,96.8 L210.7,96.4 L212.2,97.2 L214.1,96.6 L217.0,97.5Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.2" stroke-linejoin="round"/><path d="M85.1,127.3 L83.8,129.7 L86.1,131.8 L87.2,131.7 L88.8,130.0 L90.4,129.6 L93.0,133.2 L94.0,132.7 L95.8,130.4 L98.0,129.6 L103.3,131.5 L104.5,131.5 L105.1,130.4 L108.6,129.1 L108.9,128.3 L108.2,126.6 L108.5,126.5 L111.4,126.8 L112.8,128.0 L114.8,132.9 L114.8,135.8 L116.1,136.4 L116.6,137.6 L119.7,139.3 L116.6,143.5 L117.3,143.7 L118.8,143.0 L120.4,143.7 L121.2,149.5 L124.5,151.9 L124.4,153.3 L122.5,155.5 L122.7,161.0 L124.0,162.1 L125.5,161.9 L125.3,164.5 L126.9,165.8 L125.0,167.0 L124.9,169.2 L126.8,170.0 L127.9,171.8 L127.8,173.9 L126.4,172.9 L123.7,172.6 L121.6,173.0 L121.4,175.4 L123.8,176.3 L124.2,177.4 L121.6,183.4 L119.3,182.9 L118.7,183.4 L117.6,182.0 L116.7,181.9 L114.0,186.8 L111.4,187.4 L109.7,185.5 L107.4,185.0 L108.5,181.7 L106.8,174.3 L105.1,172.8 L104.2,173.0 L103.7,172.1 L100.4,173.3 L99.5,172.3 L97.0,172.6 L94.7,174.6 L92.9,174.4 L95.4,170.3 L94.2,168.3 L94.1,166.0 L92.5,165.6 L93.2,163.1 L87.2,155.4 L79.1,155.2 L78.9,156.0 L76.4,156.6 L74.8,156.0 L73.1,156.3 L72.2,156.7 L69.3,162.4 L66.9,163.7 L66.1,165.5 L65.0,166.2 L63.1,166.2 L63.4,164.7 L61.4,161.9 L59.9,160.4 L58.5,160.5 L58.9,159.3 L58.5,156.0 L57.8,156.7 L57.0,156.5 L55.4,155.5 L54.4,153.5 L52.9,153.7 L50.0,152.3 L47.9,148.8 L48.0,146.3 L47.1,147.2 L45.9,144.4 L44.6,144.0 L43.6,145.9 L42.7,145.5 L42.8,144.3 L47.0,137.7 L49.7,137.1 L51.8,135.9 L55.4,135.9 L58.0,135.1 L57.9,131.9 L55.5,130.0 L55.5,129.5 L58.3,128.4 L58.7,126.5 L58.0,124.2 L65.5,124.7 L65.8,126.3 L67.3,125.9 L68.8,126.8 L73.4,128.1 L84.3,127.2Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.2" stroke-linejoin="round"/><path d="M33.0,142.6 L32.2,142.9 L32.5,141.4 L32.9,141.9Z M30.4,142.9 L29.5,143.1 L29.0,142.3 L31.0,141.3 L30.9,142.6Z M34.9,141.1 L34.9,141.6 L34.3,141.3 L35.0,140.1 L35.7,140.3 L35.4,140.9Z M32.9,138.2 L32.4,138.6 L31.5,138.1 L32.2,136.7 L32.7,136.8Z M36.9,137.4 L36.2,137.4 L37.8,136.3 L37.2,137.2Z M31.9,133.4 L31.3,134.8 L30.6,134.6 L30.0,133.4 L31.5,133.3Z M58.7,126.5 L58.0,128.8 L55.5,129.5 L57.9,131.9 L58.0,135.1 L55.4,135.9 L51.8,135.9 L49.7,137.1 L47.0,137.7 L42.8,144.3 L42.2,143.5 L42.7,141.9 L40.8,143.2 L40.8,141.8 L39.7,141.8 L38.8,141.1 L39.2,139.0 L37.8,138.8 L38.4,137.8 L42.5,136.7 L41.9,135.9 L40.7,135.6 L38.6,136.5 L37.5,135.2 L37.9,133.8 L40.9,133.5 L42.2,133.0 L42.4,132.4 L41.2,132.9 L38.3,132.7 L33.9,134.8 L32.4,134.5 L32.7,132.7 L30.2,133.0 L28.0,131.4 L28.9,129.3 L26.7,129.7 L23.5,127.9 L25.7,128.0 L30.1,126.7 L33.6,126.9 L36.7,126.3 L41.1,124.1 L58.0,124.2 L58.0,125.2Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.2" stroke-linejoin="round"/><path d="M118.7,183.4 L119.3,183.9 L120.8,190.1 L120.5,192.2 L117.3,195.6 L119.1,196.1 L121.0,197.7 L124.5,198.1 L125.6,198.7 L126.7,201.7 L130.6,203.3 L131.3,206.6 L130.9,209.2 L130.0,211.7 L129.3,212.1 L129.0,215.1 L129.6,220.5 L121.3,217.7 L111.2,212.4 L98.0,200.5 L92.1,197.8 L91.4,196.0 L86.2,193.5 L83.7,190.9 L86.5,187.2 L93.7,181.1 L94.6,177.5 L97.0,176.1 L97.9,172.7 L99.5,172.3 L100.4,173.3 L103.9,172.1 L104.2,173.0 L104.8,172.7 L106.8,174.3 L108.5,181.7 L107.4,184.7 L107.7,185.2 L109.7,185.5 L111.4,187.4 L112.1,187.2 L114.0,186.8 L115.8,184.1 L116.1,182.2 L117.6,182.0 L118.3,183.1Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.2" stroke-linejoin="round"/><path d="M181.2,211.5 L180.8,212.0 L179.3,211.7 L179.7,211.3Z M144.8,148.2 L145.2,150.5 L144.7,151.9 L145.2,152.5 L147.1,152.9 L149.3,150.6 L152.6,150.1 L154.6,151.5 L156.0,151.5 L157.9,152.4 L159.4,156.0 L163.4,158.5 L164.5,158.4 L166.7,159.3 L167.5,158.1 L173.0,156.1 L179.6,156.4 L182.3,158.8 L184.3,161.8 L185.7,161.2 L185.9,163.5 L185.1,166.2 L185.7,166.4 L186.8,169.0 L187.9,175.9 L186.7,176.6 L186.6,177.7 L184.6,179.1 L182.6,184.6 L182.3,187.5 L179.4,192.1 L179.3,193.9 L179.8,197.4 L182.2,204.8 L182.6,205.6 L184.5,206.1 L185.0,208.0 L184.3,211.2 L182.8,211.6 L180.2,210.6 L180.4,209.0 L179.8,208.9 L178.1,211.5 L172.1,210.4 L170.8,209.6 L169.2,209.4 L164.2,209.8 L163.5,210.3 L169.3,210.0 L170.2,210.3 L160.2,211.4 L158.7,210.6 L155.8,210.6 L154.8,211.3 L158.3,211.5 L148.5,212.9 L137.7,216.8 L131.0,220.2 L129.6,220.5 L129.3,220.1 L129.3,212.1 L130.2,211.4 L131.3,206.6 L130.6,203.3 L126.7,201.7 L125.6,198.7 L124.5,198.1 L121.0,197.7 L119.1,196.1 L117.3,195.6 L120.5,192.2 L120.8,190.1 L119.3,183.9 L118.7,183.4 L119.3,182.9 L121.6,183.4 L124.2,177.4 L123.8,176.3 L121.4,175.4 L121.6,173.0 L123.7,172.6 L126.4,172.9 L127.3,173.9 L128.0,173.5 L127.6,170.9 L126.8,170.0 L124.9,169.2 L125.0,167.0 L126.9,165.8 L125.3,164.5 L125.5,161.9 L124.0,162.1 L122.7,161.0 L122.5,155.5 L124.4,153.3 L126.5,152.4 L128.2,150.2 L130.1,150.1 L131.4,151.2 L131.7,152.2 L135.7,153.5 L136.3,153.1 L136.0,152.2 L136.5,151.2 L139.4,151.1 L139.9,147.6 L142.5,148.7 L142.5,147.4 L144.6,146.8Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.2" stroke-linejoin="round"/><path d="M301.3,219.7 L299.5,220.0 L300.5,218.5 L301.6,218.9Z M284.4,111.6 L290.7,113.5 L293.1,115.7 L295.6,119.2 L297.1,120.4 L298.5,120.4 L299.9,119.4 L302.0,119.2 L307.5,116.5 L310.5,117.1 L318.1,121.5 L323.3,122.5 L328.1,122.6 L333.1,118.1 L338.1,116.6 L348.9,116.4 L355.6,118.2 L357.1,119.4 L361.1,119.4 L363.3,116.7 L365.8,115.3 L369.5,113.8 L371.0,112.7 L374.3,112.3 L379.6,119.5 L381.1,127.6 L384.8,128.6 L386.0,130.3 L385.3,137.9 L381.2,140.5 L378.6,141.1 L375.4,145.1 L373.5,148.2 L372.1,153.2 L370.4,154.7 L369.6,160.2 L366.4,161.8 L365.0,168.0 L364.2,169.7 L362.4,171.1 L360.4,171.4 L358.4,175.0 L357.5,179.0 L356.0,181.4 L355.9,183.0 L353.0,186.7 L354.1,188.5 L350.8,191.1 L350.2,193.8 L347.9,195.8 L345.9,196.4 L345.0,195.6 L344.2,192.9 L339.6,189.1 L338.1,191.1 L337.3,191.3 L334.9,191.1 L334.2,189.9 L330.0,192.6 L328.6,195.3 L321.7,201.3 L320.2,204.0 L318.7,210.7 L315.8,215.8 L314.4,215.9 L312.1,214.1 L313.2,217.0 L312.8,218.1 L305.3,218.5 L304.4,218.1 L304.0,217.0 L303.2,218.1 L301.1,218.2 L298.7,216.3 L299.7,217.4 L299.6,218.6 L298.0,220.0 L297.0,220.0 L295.2,216.2 L295.5,219.1 L296.2,220.2 L293.6,220.6 L293.0,219.1 L292.7,220.6 L289.3,221.0 L289.4,219.6 L288.8,220.1 L288.7,221.2 L287.2,221.2 L284.0,219.3 L281.5,217.1 L280.4,214.9 L279.1,211.5 L280.2,211.2 L279.0,210.7 L279.0,209.1 L280.5,208.6 L281.1,207.5 L279.2,208.3 L277.0,206.8 L277.2,206.4 L280.0,205.9 L278.8,205.8 L278.5,204.8 L276.7,206.0 L276.0,205.6 L275.8,204.1 L273.1,201.1 L268.1,197.4 L264.6,196.7 L256.8,196.5 L260.3,194.7 L259.9,194.5 L256.5,195.4 L255.5,196.8 L248.2,197.2 L249.0,193.2 L248.4,190.1 L249.1,184.3 L248.3,182.7 L247.9,179.8 L249.0,166.2 L252.1,165.8 L253.3,163.0 L253.1,161.5 L255.4,159.0 L255.7,157.3 L258.0,156.2 L259.0,153.3 L258.3,151.8 L259.1,150.4 L260.5,150.3 L261.2,148.1 L260.3,146.3 L259.9,142.7 L257.2,139.0 L258.0,136.3 L259.3,134.8 L258.7,133.3 L259.1,125.9 L262.5,123.0 L263.6,121.2 L264.8,115.2 L269.6,112.3 L272.7,111.7 L277.5,111.7 L280.4,110.3Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.2" stroke-linejoin="round"/><path d="M258.5,135.5 L257.2,137.8 L257.2,139.0 L259.9,142.7 L260.3,146.3 L261.2,148.1 L260.5,150.3 L259.1,150.4 L258.3,151.8 L259.0,153.3 L258.0,156.2 L255.7,157.3 L255.4,159.0 L253.1,161.5 L253.3,163.0 L252.1,165.8 L249.0,166.2 L247.9,179.8 L248.3,182.7 L249.1,184.3 L248.4,190.1 L249.0,193.2 L248.2,197.2 L235.6,198.9 L235.5,198.5 L237.4,198.0 L237.0,196.5 L235.4,194.4 L235.2,191.3 L234.6,189.9 L235.7,189.9 L235.4,166.1 L232.9,162.5 L232.3,155.2 L225.9,151.0 L226.0,146.9 L227.3,143.7 L228.3,142.7 L229.4,142.7 L230.1,140.7 L232.1,140.2 L233.4,138.4 L234.9,138.4 L235.4,138.9 L238.4,138.5 L239.8,138.7 L242.7,136.3 L244.8,132.0 L244.2,129.4 L245.4,129.0 L249.3,127.6 L250.2,127.8 L255.0,132.9 L257.7,134.5Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.2" stroke-linejoin="round"/><path d="M227.3,143.7 L226.0,146.9 L225.7,150.7 L232.3,155.2 L232.9,162.5 L235.4,166.1 L235.7,189.9 L234.6,189.9 L235.2,191.3 L235.4,194.4 L237.0,196.5 L237.4,198.0 L230.6,200.4 L230.6,199.7 L229.0,199.1 L228.3,197.7 L225.4,196.2 L222.9,191.6 L224.2,185.8 L222.8,184.8 L222.7,183.5 L223.9,181.4 L223.8,175.9 L224.8,174.8 L224.0,172.7 L221.7,170.7 L221.2,169.5 L222.5,168.4 L222.3,165.4 L222.9,162.1 L221.6,161.0 L219.9,161.8 L219.6,161.4 L220.1,160.1 L220.8,159.7 L219.9,159.3 L220.6,158.8 L221.3,151.8 L215.9,147.4 L217.0,143.3 L216.1,142.2 L222.5,143.7 L222.6,144.1 L224.3,143.8Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.2" stroke-linejoin="round"/><path d="M216.1,142.2 L217.0,143.3 L215.9,147.4 L221.3,151.8 L220.6,158.8 L219.9,159.3 L220.8,159.7 L220.1,160.1 L219.6,161.4 L219.9,161.8 L221.6,161.0 L222.9,162.1 L222.3,165.4 L222.5,168.4 L221.2,169.5 L221.7,170.7 L224.0,172.7 L224.8,174.2 L223.6,176.6 L223.9,181.4 L222.7,183.5 L222.8,184.8 L224.2,185.8 L222.9,191.6 L225.4,196.2 L228.3,197.7 L229.0,199.1 L230.6,199.7 L230.6,200.4 L229.0,201.5 L227.9,203.6 L225.5,204.2 L219.9,204.2 L212.8,207.2 L207.6,210.4 L199.5,212.6 L193.7,215.7 L192.7,215.7 L189.1,213.8 L180.8,212.0 L181.2,211.5 L184.3,211.2 L185.0,208.0 L184.5,206.1 L182.6,205.6 L182.2,204.8 L179.6,196.3 L179.4,192.1 L182.3,187.5 L182.6,184.6 L184.6,179.1 L186.6,177.7 L186.7,176.6 L187.9,175.9 L186.8,169.0 L185.7,166.4 L185.1,166.2 L185.9,163.5 L184.7,158.1 L184.9,152.4 L184.2,151.4 L184.6,150.1 L183.1,148.3 L184.1,143.6 L204.8,143.5 L208.8,143.7 L209.6,144.4 L211.9,142.5 L212.9,142.6 L213.4,141.7Z" fill="#f59e0b" stroke="#92400e" stroke-width="2" stroke-linejoin="round"/><text x="176.4" y="85.7" font-size="10" fill="#475569" text-anchor="middle" paint-order="stroke" stroke="#ffffff" stroke-width="3">Mali</text><text x="32.9" y="96.2" font-size="10" fill="#475569" text-anchor="middle" paint-order="stroke" stroke="#ffffff" stroke-width="3">Senegal</text><text x="41.0" y="115.2" font-size="10" fill="#475569" text-anchor="middle" paint-order="stroke" stroke="#ffffff" stroke-width="3">Gambia</text><text x="80.4" y="151.7" font-size="10" fill="#475569" text-anchor="middle" paint-order="stroke" stroke="#ffffff" stroke-width="3">Guinea</text><text x="48.0" y="133.2" font-size="10" fill="#475569" text-anchor="middle" paint-order="stroke" stroke="#ffffff" stroke-width="3">Guinea-Bissau</text><text x="211.1" y="118.1" font-size="10" fill="#475569" text-anchor="middle" paint-order="stroke" stroke="#ffffff" stroke-width="3">Burkina Faso</text><text x="112.7" y="191.0" font-size="10" fill="#475569" text-anchor="middle" paint-order="stroke" stroke="#ffffff" stroke-width="3">Liberia</text><text x="159.0" y="176.0" font-size="10" fill="#475569" text-anchor="middle" paint-order="stroke" stroke="#ffffff" stroke-width="3">Cote d'Ivoire</text><text x="224.4" y="174.8" font-size="10" fill="#475569" text-anchor="middle" paint-order="stroke" stroke="#ffffff" stroke-width="3">Togo</text><text x="245.8" y="159.8" font-size="10" fill="#475569" text-anchor="middle" paint-order="stroke" stroke="#ffffff" stroke-width="3">Benin</text><text x="303.6" y="149.4" font-size="10" fill="#475569" text-anchor="middle" paint-order="stroke" stroke="#ffffff" stroke-width="3">Nigeria</text><text x="211.1" y="173.7" font-size="13" font-weight="800" fill="#78350f" text-anchor="middle" paint-order="stroke" stroke="#ffffff" stroke-width="3.5">GHANA</text><text x="248" y="289" font-size="11" font-style="italic" fill="#0369a1" text-anchor="middle">Gulf of Guinea</text><text x="200" y="20" font-size="14" font-weight="700" fill="#1e293b" text-anchor="middle">West Africa - Ghana and its Neighbours</text></svg>`,
  },

  'compass': {
    id: 'compass',
    title: 'Compass: The Four Cardinal Points',
    svg: svgOpen + title('COMPASS') + `
<circle cx="200" cy="155" r="95" fill="#eff6ff" stroke="#1e3a8a" stroke-width="2"/>
<circle cx="200" cy="155" r="88" fill="none" stroke="#bfdbfe" stroke-width="1"/>
<path d="M200,60 L214,145 L200,155 L186,145 Z" fill="#dc2626"/>
<path d="M200,250 L214,165 L200,155 L186,165 Z" fill="#334155"/>
<path d="M295,155 L210,169 L200,155 L210,141 Z" fill="#334155"/>
<path d="M105,155 L190,169 L200,155 L190,141 Z" fill="#94a3b8"/>
${label(196, 50, 'N', 20)}
${label(196, 280, 'S', 20)}
${label(305, 160, 'E', 20)}
${label(80, 160, 'W', 20)}
<text x="200" y="296" text-anchor="middle" font-size="9" fill="#475569">North • South • East • West</text>
` + svgClose,
  },

  'counting-objects': {
    id: 'counting-objects',
    title: 'Counting Objects (1–10)',
    svg: svgOpen + title('COUNT THE MANGOES (1 – 10)') + (() => {
      let out = '';
      for (let i = 0; i < 10; i++) {
        const row = Math.floor(i / 5);
        const col = i % 5;
        const cx = 70 + col * 68;
        const cy = 105 + row * 85;
        out += `<g transform="rotate(-18 ${cx} ${cy})"><ellipse cx="${cx}" cy="${cy}" rx="22" ry="15" fill="#f59e0b" stroke="#b45309" stroke-width="1.5"/></g>`;
        out += `<path d="M${cx + 14},${cy - 16} q8,-8 16,-6" stroke="#16a34a" stroke-width="2.5" fill="none"/>`;
        out += `<ellipse cx="${cx + 22}" cy="${cy - 22}" rx="9" ry="4.5" fill="#22c55e" transform="rotate(-30 ${cx + 22} ${cy - 22})"/>`;
        out += label(cx - 3, cy + 42, String(i + 1), 13);
      }
      return out;
    })() + `
<text x="200" y="285" text-anchor="middle" font-size="10" fill="#475569">How many mangoes are there in total?</text>
` + svgClose,
  },

  'number-chart-1-20': {
    id: 'number-chart-1-20',
    title: 'Number Chart (1–20)',
    svg: svgOpen + title('NUMBER CHART (1 – 20)') + (() => {
      let out = '';
      for (let n = 1; n <= 20; n++) {
        const row = Math.floor((n - 1) / 5);
        const col = (n - 1) % 5;
        const x = 40 + col * 66;
        const y = 42 + row * 56;
        const fill = (row + col) % 2 === 0 ? '#dbeafe' : '#fef3c7';
        out += `<rect x="${x}" y="${y}" width="58" height="48" rx="8" fill="${fill}" stroke="#64748b" stroke-width="1.5"/>`;
        out += `<text x="${x + 29}" y="${y + 32}" text-anchor="middle" font-size="24" font-weight="bold" fill="#1e293b">${n}</text>`;
      }
      return out;
    })() + svgClose,
  },

  'shapes-chart': {
    id: 'shapes-chart',
    title: 'Plane Shapes',
    svg: svgOpen + title('SHAPE CHART') + `
<circle cx="80" cy="95" r="34" fill="#fee2e2" stroke="#dc2626" stroke-width="2.5"/>
<text x="80" y="152" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Circle</text>
<rect x="160" y="61" width="68" height="68" fill="#dbeafe" stroke="#2563eb" stroke-width="2.5"/>
<text x="194" y="152" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Square</text>
<path d="M320,61 L358,129 L282,129 Z" fill="#dcfce7" stroke="#16a34a" stroke-width="2.5"/>
<text x="320" y="152" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Triangle</text>
<rect x="42" y="180" width="95" height="55" fill="#f3e8ff" stroke="#9333ea" stroke-width="2.5"/>
<text x="90" y="262" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Rectangle</text>
<path d="M200,178 l11,23 25,3 -18,18 5,25 -23,-12 -23,12 5,-25 -18,-18 25,-3 Z" fill="#ffedd5" stroke="#ea580c" stroke-width="2.5"/>
<text x="200" y="272" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Star</text>
<path d="M290,207 l17,30 34,0 17,-30 -17,-30 -34,0 Z" fill="#ccfbf1" stroke="#0d9488" stroke-width="2.5"/>
<text x="320" y="272" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">Hexagon</text>
` + svgClose,
  },

  'clock-face': {
    id: 'clock-face',
    title: 'Telling Time (Clock Face)',
    svg: svgOpen + title('WHAT TIME IS IT?') + `
<circle cx="200" cy="150" r="95" fill="#ffffff" stroke="#1e3a8a" stroke-width="4"/>
<circle cx="200" cy="150" r="88" fill="none" stroke="#e2e8f0" stroke-width="1"/>
${(() => {
  let t = '';
  for (let i = 1; i <= 12; i++) {
    const a = (i * 30 - 90) * Math.PI / 180;
    const x1 = 200 + 82 * Math.cos(a);
    const y1 = 150 + 82 * Math.sin(a);
    const x2 = 200 + 88 * Math.cos(a);
    const y2 = 150 + 88 * Math.sin(a);
    t += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#1e293b" stroke-width="${i % 3 === 0 ? 3 : 1.5}"/>`;
    const tx = 200 + 70 * Math.cos(a);
    const ty = 150 + 70 * Math.sin(a) + 4;
    t += `<text x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e293b">${i}</text>`;
  }
  return t;
})()}
<line x1="200" y1="150" x2="228" y2="165" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>
<line x1="200" y1="150" x2="200" y2="85" stroke="#0f172a" stroke-width="3.5" stroke-linecap="round"/>
<circle cx="200" cy="150" r="5" fill="#dc2626"/>
<text x="200" y="285" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e3a8a">Half past three (3:30)</text>
` + svgClose,
  },

  'place-value-chart': {
    id: 'place-value-chart',
    title: 'Place Value Chart (2,468)',
    svg: svgOpen + title('PLACE VALUE CHART') + `
<rect x="40" y="60" width="320" height="70" fill="#eff6ff" stroke="#1e3a8a" stroke-width="2"/>
<line x1="120" y1="60" x2="120" y2="130" stroke="#1e3a8a" stroke-width="1.5"/>
<line x1="200" y1="60" x2="200" y2="130" stroke="#1e3a8a" stroke-width="1.5"/>
<line x1="280" y1="60" x2="280" y2="130" stroke="#1e3a8a" stroke-width="1.5"/>
${label(52, 88, 'Thousands', 10)}
${label(132, 88, 'Hundreds', 10)}
${label(214, 88, 'Tens', 10)}
${label(294, 88, 'Ones', 10)}
<text x="80" y="122" text-anchor="middle" font-size="30" font-weight="bold" fill="#b91c1c">2</text>
<text x="160" y="122" text-anchor="middle" font-size="30" font-weight="bold" fill="#b91c1c">4</text>
<text x="240" y="122" text-anchor="middle" font-size="30" font-weight="bold" fill="#b91c1c">6</text>
<text x="320" y="122" text-anchor="middle" font-size="30" font-weight="bold" fill="#b91c1c">8</text>
<text x="200" y="175" text-anchor="middle" font-size="34" font-weight="bold" fill="#0f172a">2,468</text>
<rect x="40" y="200" width="320" height="66" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
<text x="200" y="226" text-anchor="middle" font-size="12" fill="#1e293b">2,468 = 2 Thousands + 4 Hundreds</text>
<text x="200" y="246" text-anchor="middle" font-size="12" fill="#1e293b">+ 6 Tens + 8 Ones</text>
` + svgClose,
  },

  'cedi-coins': {
    id: 'cedi-coins',
    title: 'Ghana Cedi Coins',
    svg: svgOpen + title('GHANA CEDI COINS') + (() => {
      const coins: Array<[string, string, number, number, number]> = [
        ['5 P', 'Five Pesewas', 70, 95, 26],
        ['10 P', 'Ten Pesewas', 155, 95, 30],
        ['20 P', 'Twenty Pesewas', 245, 95, 34],
        ['50 P', 'Fifty Pesewas', 335, 95, 38],
        ['₵ 1', 'One Cedi', 105, 205, 34],
        ['₵ 2', 'Two Cedis', 250, 205, 38],
      ];
      let out = '';
      coins.forEach(([val, name, cx, cy, r]) => {
        out += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#fbbf24" stroke="#b45309" stroke-width="2.5"/>`;
        out += `<circle cx="${cx}" cy="${cy}" r="${r - 7}" fill="none" stroke="#d97706" stroke-width="1" stroke-dasharray="3 3"/>`;
        out += `<text x="${cx}" y="${cy + 5}" text-anchor="middle" font-size="${r > 32 ? 13 : 11}" font-weight="bold" fill="#78350f">${val}</text>`;
        out += `<text x="${cx}" y="${cy + r + 16}" text-anchor="middle" font-size="9.5" fill="#334155">${name}</text>`;
      });
      return out;
    })() + `
<text x="200" y="285" text-anchor="middle" font-size="10" fill="#475569">100 Pesewas = 1 Cedi (₵)</text>
` + svgClose,
  },

  'digestive-system': {
    id: 'digestive-system',
    title: 'Human Digestive System (Labelled A–F)',
    svg: svgOpen + title('THE DIGESTIVE SYSTEM') + `
<circle cx="150" cy="55" r="20" fill="#fde8d7" stroke="#d6a077" stroke-width="1.5"/>
<path d="M150,75 C120,80 108,105 110,140 C112,185 122,225 150,240 C178,225 188,185 190,140 C192,105 180,80 150,75 Z" fill="#fde8d7" stroke="#d6a077" stroke-width="1.5"/>
<ellipse cx="150" cy="58" rx="7" ry="4" fill="#fca5a5" stroke="#dc2626" stroke-width="1.5"/>
<rect x="146" y="75" width="9" height="42" rx="4" fill="#fdba74" stroke="#ea580c" stroke-width="1.5"/>
<path d="M176,120 C196,112 200,130 192,140 C186,148 172,146 170,134 Z" fill="#86efac" stroke="#16a34a" stroke-width="1.5"/>
<path d="M146,117 C128,120 122,142 132,154 C140,163 156,160 158,148 C159,141 152,138 150,142 C156,150 148,158 138,152 C126,144 130,124 146,117 Z" fill="#f9a8d4" stroke="#db2777" stroke-width="1.5"/>
<path d="M132,158 q8,10 0,18 q-8,10 0,18 q8,10 0,16" fill="none" stroke="#f59e0b" stroke-width="5" stroke-linecap="round"/>
<path d="M120,168 C116,185 118,205 130,216 M182,168 C186,185 184,205 172,216" fill="none" stroke="#fb923c" stroke-width="7" stroke-linecap="round"/>
<path d="M130,216 C140,226 162,226 172,216 L170,232 L134,232 Z" fill="#fb923c" stroke="#ea580c" stroke-width="1.5"/>
<line x1="150" y1="58" x2="238" y2="52" stroke="#64748b" stroke-width="1"/>
<line x1="150" y1="95" x2="238" y2="82" stroke="#64748b" stroke-width="1"/>
<line x1="142" y1="140" x2="238" y2="112" stroke="#64748b" stroke-width="1"/>
<line x1="150" y1="176" x2="238" y2="142" stroke="#64748b" stroke-width="1"/>
<line x1="150" y1="222" x2="238" y2="172" stroke="#64748b" stroke-width="1"/>
<line x1="150" y1="232" x2="238" y2="202" stroke="#64748b" stroke-width="1"/>
${label(242, 56, 'A – Mouth')}
${label(242, 86, 'B – Oesophagus')}
${label(242, 116, 'C – Stomach')}
${label(242, 146, 'D – Small Intestine')}
${label(242, 176, 'E – Large Intestine')}
${label(242, 206, 'F – Rectum')}
<text x="255" y="250" font-size="9" fill="#475569">(Liver shown in green, top right)</text>
` + svgClose,
  },

  'circulatory-system': {
    id: 'circulatory-system',
    title: 'Human Circulatory System (Labelled)',
    svg: svgOpen + title('THE CIRCULATORY SYSTEM') + `
<circle cx="170" cy="52" r="18" fill="#fde8d7" stroke="#d6a077" stroke-width="1.5"/>
<path d="M170,70 C135,76 122,102 124,140 C126,185 138,222 170,236 C202,222 214,185 216,140 C218,102 205,76 170,70 Z" fill="#fde8d7" stroke="#d6a077" stroke-width="1.5"/>
<ellipse cx="142" cy="140" rx="24" ry="42" fill="#fecdd3" stroke="#f43f5e" stroke-width="1.5"/>
<ellipse cx="198" cy="140" rx="24" ry="42" fill="#fecdd3" stroke="#f43f5e" stroke-width="1.5"/>
<path d="M168,118 C150,120 142,140 148,158 C152,170 165,175 172,168 C180,160 178,148 172,142 C182,146 186,158 180,166 C190,172 202,164 200,148 C198,130 184,116 168,118 Z" fill="#dc2626" stroke="#991b1b" stroke-width="2"/>
<path d="M166,118 C160,100 176,92 186,100 C196,108 192,122 184,128" fill="none" stroke="#ef4444" stroke-width="6" stroke-linecap="round"/>
<path d="M176,120 C180,104 192,100 198,108 C204,116 200,128 194,132" fill="none" stroke="#3b82f6" stroke-width="5" stroke-linecap="round"/>
<path d="M150,170 C140,195 138,210 142,228 M192,170 C202,195 204,210 200,228" fill="none" stroke="#ef4444" stroke-width="2.5"/>
<path d="M160,172 C152,195 150,212 154,228 M184,172 C192,195 194,212 190,228" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
<line x1="174" y1="150" x2="248" y2="120" stroke="#64748b" stroke-width="1"/>
<line x1="180" y1="102" x2="248" y2="70" stroke="#64748b" stroke-width="1"/>
<line x1="194" y1="110" x2="248" y2="95" stroke="#64748b" stroke-width="1"/>
<line x1="142" y1="128" x2="248" y2="145" stroke="#64748b" stroke-width="1"/>
<line x1="152" y1="200" x2="248" y2="195" stroke="#64748b" stroke-width="1"/>
<line x1="196" y1="205" x2="248" y2="220" stroke="#64748b" stroke-width="1"/>
${label(252, 74, 'A – Aorta')}
${label(252, 99, 'B – Vena Cava')}
${label(252, 124, 'C – Heart')}
${label(252, 149, 'D – Lungs')}
${label(252, 199, 'E – Arteries (red)')}
${label(252, 224, 'F – Veins (blue)')}
` + svgClose,
  },

  'respiratory-system': {
    id: 'respiratory-system',
    title: 'Human Respiratory System (Labelled)',
    svg: svgOpen + title('THE RESPIRATORY SYSTEM') + `
<circle cx="170" cy="48" r="17" fill="#fde8d7" stroke="#d6a077" stroke-width="1.5"/>
<path d="M170,65 C138,71 126,96 128,135 C130,180 142,214 170,228 C198,214 210,180 212,135 C214,96 202,71 170,65 Z" fill="#fde8d7" stroke="#d6a077" stroke-width="1.5"/>
<rect x="165" y="62" width="10" height="52" rx="4" fill="#fde68a" stroke="#d97706" stroke-width="1.5"/>
<line x1="165" y1="74" x2="175" y2="74" stroke="#d97706" stroke-width="1.5"/>
<line x1="165" y1="84" x2="175" y2="84" stroke="#d97706" stroke-width="1.5"/>
<line x1="165" y1="94" x2="175" y2="94" stroke="#d97706" stroke-width="1.5"/>
<path d="M165,114 C152,124 142,134 138,146 M175,114 C188,124 198,134 202,146" fill="none" stroke="#fde68a" stroke-width="7"/>
<path d="M165,114 C152,124 142,134 138,146 M175,114 C188,124 198,134 202,146" fill="none" stroke="#d97706" stroke-width="1.5"/>
<ellipse cx="144" cy="165" rx="26" ry="46" fill="#fecdd3" stroke="#f43f5e" stroke-width="2"/>
<ellipse cx="196" cy="165" rx="26" ry="46" fill="#fecdd3" stroke="#f43f5e" stroke-width="2"/>
<path d="M132,212 C150,224 190,224 208,212" fill="none" stroke="#8b5cf6" stroke-width="4" stroke-linecap="round"/>
<line x1="170" y1="80" x2="250" y2="60" stroke="#64748b" stroke-width="1"/>
<line x1="148" y1="128" x2="250" y2="100" stroke="#64748b" stroke-width="1"/>
<line x1="144" y1="165" x2="250" y2="140" stroke="#64748b" stroke-width="1"/>
<line x1="170" y1="222" x2="250" y2="190" stroke="#64748b" stroke-width="1"/>
${label(254, 64, 'A – Trachea')}
${label(254, 104, 'B – Bronchus')}
${label(254, 144, 'C – Lung')}
${label(254, 194, 'D – Diaphragm')}
` + svgClose,
  },

  'plant-parts': {
    id: 'plant-parts',
    title: 'Parts of a Flowering Plant (Labelled)',
    svg: svgOpen + title('PARTS OF A FLOWERING PLANT') + `
<rect x="30" y="215" width="340" height="60" fill="#a16207" opacity="0.25"/>
<line x1="30" y1="215" x2="370" y2="215" stroke="#92400e" stroke-width="2"/>
<path d="M190,215 C186,235 184,248 178,262 M190,215 C192,238 196,250 204,260 M190,215 C190,235 188,252 190,268 M180,238 L170,248 M200,240 L210,250" stroke="#92400e" stroke-width="3" fill="none" stroke-linecap="round"/>
<line x1="190" y1="215" x2="190" y2="85" stroke="#16a34a" stroke-width="6" stroke-linecap="round"/>
<path d="M190,160 C160,150 145,128 148,112 C168,114 186,134 190,160 Z" fill="#22c55e" stroke="#15803d" stroke-width="1.5"/>
<path d="M190,125 C220,115 235,95 232,80 C212,82 194,100 190,125 Z" fill="#22c55e" stroke="#15803d" stroke-width="1.5"/>
<g>
${[0, 72, 144, 216, 288].map(a => `<ellipse cx="${190 + 16 * Math.cos((a - 90) * Math.PI / 180)}" cy="${72 + 16 * Math.sin((a - 90) * Math.PI / 180)}" rx="11" ry="16" fill="#f9a8d4" stroke="#db2777" stroke-width="1.5" transform="rotate(${a} ${190 + 16 * Math.cos((a - 90) * Math.PI / 180)} ${72 + 16 * Math.sin((a - 90) * Math.PI / 180)})"/>`).join('')}
<circle cx="190" cy="72" r="9" fill="#fbbf24" stroke="#d97706" stroke-width="1.5"/>
</g>
<line x1="190" y1="145" x2="228" y2="152" stroke="#16a34a" stroke-width="3"/>
<ellipse cx="240" cy="155" rx="12" ry="9" fill="#ef4444" stroke="#991b1b" stroke-width="1.5" transform="rotate(-20 240 155)"/>
<line x1="182" y1="240" x2="95" y2="245" stroke="#64748b" stroke-width="1"/>
<line x1="190" y1="190" x2="95" y2="195" stroke="#64748b" stroke-width="1"/>
<line x1="158" y1="130" x2="95" y2="135" stroke="#64748b" stroke-width="1"/>
<line x1="200" y1="60" x2="95" y2="80" stroke="#64748b" stroke-width="1"/>
<line x1="236" y1="152" x2="95" y2="280" stroke="#64748b" stroke-width="1"/>
${label(32, 249, 'A – Root', 11)}
${label(32, 199, 'B – Stem', 11)}
${label(32, 139, 'C – Leaf', 11)}
${label(32, 84, 'D – Flower', 11)}
${label(32, 284, 'E – Fruit', 11)}
` + svgClose,
  },

  'water-cycle': {
    id: 'water-cycle',
    title: 'The Water Cycle',
    svg: svgOpen + title('THE WATER CYCLE') + `
<circle cx="70" cy="70" r="24" fill="#fde047" stroke="#eab308" stroke-width="2"/>
${[0, 45, 90, 135, 180, 225, 270, 315].map(a => { const r = (a * Math.PI) / 180; return `<line x1="${70 + 30 * Math.cos(r)}" y1="${70 + 30 * Math.sin(r)}" x2="${70 + 38 * Math.cos(r)}" y2="${70 + 38 * Math.sin(r)}" stroke="#eab308" stroke-width="2.5"/>`; }).join('')}
<rect x="30" y="235" width="180" height="40" fill="#bfdbfe" stroke="#2563eb" stroke-width="1.5"/>
<path d="M230,275 L230,230 C250,210 290,205 320,215 C350,225 370,245 370,275 Z" fill="#bbf7d0" stroke="#16a34a" stroke-width="1.5"/>
<g>
<ellipse cx="250" cy="105" rx="30" ry="20" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
<ellipse cx="285" cy="95" rx="34" ry="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
<ellipse cx="315" cy="108" rx="28" ry="18" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
</g>
<path d="M120,225 C130,190 160,160 205,135" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-dasharray="6 4"/>
<path d="M205,135 L215,143 M205,135 L216,133" stroke="#2563eb" stroke-width="2.5" fill="none"/>
${[0, 1, 2, 3, 4, 5].map(i => `<line x1="${248 + i * 12}" y1="${130 + (i % 2) * 4}" x2="${244 + i * 12}" y2="${152 + (i % 2) * 4}" stroke="#2563eb" stroke-width="2"/>`).join('')}
<path d="M300,150 C310,175 315,195 318,212" fill="none" stroke="#64748b" stroke-width="2"/>
<path d="M318,212 L312,204 M318,212 L325,205" stroke="#64748b" stroke-width="2" fill="none"/>
<path d="M240,252 C220,258 200,260 185,258" fill="none" stroke="#16a34a" stroke-width="2"/>
<path d="M185,258 L193,253 M185,258 L193,264" stroke="#16a34a" stroke-width="2" fill="none"/>
${label(118, 175, 'A – Evaporation', 10.5)}
${label(222, 60, 'B – Condensation', 10.5)}
${label(330, 165, 'C – Precipitation (Rain)', 10.5)}
${label(140, 285, 'D – Collection', 10.5)}
` + svgClose,
  },

  'circuit-series': {
    id: 'circuit-series',
    title: 'Simple Series Electric Circuit',
    svg: svgOpen + title('A SIMPLE SERIES CIRCUIT') + `
<rect x="80" y="70" width="240" height="150" fill="none" stroke="#0f172a" stroke-width="3"/>
<line x1="80" y1="145" x2="130" y2="145" stroke="#0f172a" stroke-width="3"/>
<line x1="130" y1="128" x2="130" y2="162" stroke="#0f172a" stroke-width="3.5"/>
<line x1="140" y1="138" x2="140" y2="152" stroke="#0f172a" stroke-width="7"/>
<line x1="140" y1="145" x2="190" y2="145" stroke="#0f172a" stroke-width="3"/>
<line x1="190" y1="145" x2="238" y2="145" stroke="#0f172a" stroke-width="3"/>
<line x1="238" y1="145" x2="268" y2="118" stroke="#0f172a" stroke-width="3"/>
<circle cx="130" cy="145" r="3.5" fill="#0f172a"/>
<circle cx="238" cy="145" r="3.5" fill="#0f172a"/>
<circle cx="320" cy="145" r="17" fill="#fef9c3" stroke="#0f172a" stroke-width="2.5"/>
<line x1="308" y1="133" x2="332" y2="157" stroke="#0f172a" stroke-width="2"/>
<line x1="332" y1="133" x2="308" y2="157" stroke="#0f172a" stroke-width="2"/>
<path d="M222,70 L258,70" stroke="#0f172a" stroke-width="3"/>
<path d="M258,70 L272,52" stroke="#0f172a" stroke-width="3"/>
<circle cx="222" cy="70" r="3.5" fill="#0f172a"/>
<circle cx="272" cy="52" r="3.5" fill="#0f172a"/>
<path d="M160,58 L185,58" stroke="#16a34a" stroke-width="2.5" fill="none"/>
<path d="M185,58 L178,53 M185,58 L178,63" stroke="#16a34a" stroke-width="2.5" fill="none"/>
${label(96, 185, 'A – Cell (Battery)', 10.5)}
${label(215, 34, 'B – Switch (closed)', 10.5)}
${label(336, 149, 'C – Bulb', 10.5)}
${label(160, 245, 'D – Wiring', 10.5)}
<text x="200" y="272" text-anchor="middle" font-size="10" fill="#475569">Green arrow shows the direction of current flow</text>
` + svgClose,
  },

  'food-chain': {
    id: 'food-chain',
    title: 'A Simple Food Chain',
    svg: svgOpen + title('A SIMPLE FOOD CHAIN') + `
<g>
<path d="M55,205 C50,180 52,165 58,150 M62,205 C60,178 64,160 72,148 M70,205 C72,180 78,168 86,158" stroke="#16a34a" stroke-width="3" fill="none" stroke-linecap="round"/>
<text x="68" y="230" text-anchor="middle" font-size="11" font-weight="bold" fill="#166534">Grass</text>
</g>
<path d="M105,190 L120,190 M120,190 L114,184 M120,190 L114,196" stroke="#475569" stroke-width="2" fill="none"/>
<g>
<ellipse cx="160" cy="185" rx="20" ry="11" fill="#a3e635" stroke="#4d7c0f" stroke-width="1.5" transform="rotate(-12 160 185)"/>
<circle cx="182" cy="178" r="8" fill="#a3e635" stroke="#4d7c0f" stroke-width="1.5"/>
<path d="M186,172 q6,-8 10,-8 M150,192 L144,204 M158,194 L154,206 M168,193 L170,205" stroke="#4d7c0f" stroke-width="1.5" fill="none"/>
<text x="163" y="230" text-anchor="middle" font-size="11" font-weight="bold" fill="#3f6212">Grasshopper</text>
</g>
<path d="M205,185 L222,185 M222,185 L216,179 M222,185 L216,191" stroke="#475569" stroke-width="2" fill="none"/>
<g>
<ellipse cx="262" cy="185" rx="24" ry="9" fill="#4ade80" stroke="#15803d" stroke-width="1.5"/>
<path d="M284,182 C296,178 302,182 306,190 C298,192 292,190 286,188 Z" fill="#4ade80" stroke="#15803d" stroke-width="1.5"/>
<circle cx="288" cy="178" r="6" fill="#4ade80" stroke="#15803d" stroke-width="1.5"/>
<path d="M250,192 L246,202 M260,193 L258,203 M270,192 L274,202" stroke="#15803d" stroke-width="1.5"/>
<text x="268" y="230" text-anchor="middle" font-size="11" font-weight="bold" fill="#166534">Lizard</text>
</g>
<path d="M312,185 L328,185 M328,185 L322,179 M328,185 L322,191" stroke="#475569" stroke-width="2" fill="none"/>
<g>
<path d="M336,196 C344,178 356,172 366,180 C376,188 372,202 360,204 C350,206 344,200 348,192" fill="none" stroke="#f59e0b" stroke-width="6" stroke-linecap="round"/>
<circle cx="334" cy="199" r="5" fill="#f59e0b" stroke="#b45309" stroke-width="1.5"/>
<text x="352" y="230" text-anchor="middle" font-size="11" font-weight="bold" fill="#92400e">Snake</text>
</g>
<text x="200" y="268" text-anchor="middle" font-size="10.5" fill="#475569">Arrows show the flow of energy: producer → consumer</text>
` + svgClose,
  },

  'states-of-matter': {
    id: 'states-of-matter',
    title: 'States of Matter (Solid, Liquid, Gas)',
    svg: svgOpen + title('STATES OF MATTER') + `
<rect x="35" y="55" width="105" height="130" rx="6" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
${[0, 1, 2].map(c => [0, 1].map(r => `<circle cx="${62 + c * 24}" cy="${120 + r * 24}" r="10" fill="#93c5fd" stroke="#1d4ed8" stroke-width="1.5"/>`).join('')).join('')}
<text x="87" y="215" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">A – SOLID</text>
<text x="87" y="230" text-anchor="middle" font-size="8.5" fill="#475569">Particles packed tightly</text>
<path d="M175,60 L175,150 C175,175 225,175 225,150 L225,60" fill="none" stroke="#334155" stroke-width="2.5"/>
<path d="M178,110 C188,104 212,116 222,110 L222,150 C222,168 178,168 178,150 Z" fill="#bfdbfe" opacity="0.8"/>
${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<circle cx="${184 + (i % 5) * 9}" cy="${158 - Math.floor(i / 5) * 9}" r="4" fill="#1d4ed8"/>`).join('')}
<text x="200" y="215" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">B – LIQUID</text>
<text x="200" y="230" text-anchor="middle" font-size="8.5" fill="#475569">Particles close, can move</text>
<rect x="260" y="55" width="105" height="130" rx="6" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
${[0, 1, 2, 3, 4, 5, 6].map(i => { const x = [280, 300, 330, 292, 345, 312, 275][i]; const y = [80, 110, 90, 150, 160, 125, 100][i]; return `<circle cx="${x}" cy="${y}" r="7" fill="#fca5a5" stroke="#dc2626" stroke-width="1.5"/><path d="M${x + 8},${y} L${x + 14},${y - 2} M${x + 8},${y} L${x + 13},${y + 4}" stroke="#dc2626" stroke-width="1.2" fill="none"/>`; }).join('')}
<text x="312" y="215" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e293b">C – GAS</text>
<text x="312" y="230" text-anchor="middle" font-size="8.5" fill="#475569">Particles far apart, fast</text>
<text x="200" y="265" text-anchor="middle" font-size="10.5" fill="#475569">All three states are the same substance — only the particle arrangement changes</text>
` + svgClose,
  },

  'gui-desktop': {
    id: 'gui-desktop',
    title: 'Computer Desktop (GUI) & Hardware',
    svg: svgOpen + title('COMPUTER GRAPHICAL USER INTERFACE (GUI)') + `
<rect x="45" y="40" width="250" height="160" rx="8" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
<rect x="53" y="48" width="234" height="134" rx="4" fill="#60a5fa"/>
<rect x="65" y="60" width="100" height="70" rx="4" fill="#ffffff" stroke="#334155" stroke-width="1"/>
<rect x="65" y="60" width="100" height="14" rx="4" fill="#1d4ed8"/>
<circle cx="72" cy="67" r="2.5" fill="#fca5a5"/><circle cx="80" cy="67" r="2.5" fill="#fde047"/><circle cx="88" cy="67" r="2.5" fill="#86efac"/>
<line x1="72" y1="85" x2="150" y2="85" stroke="#94a3b8" stroke-width="3"/>
<line x1="72" y1="96" x2="140" y2="96" stroke="#cbd5e1" stroke-width="3"/>
<line x1="72" y1="107" x2="148" y2="107" stroke="#cbd5e1" stroke-width="3"/>
<rect x="185" y="75" width="90" height="60" rx="4" fill="#e2e8f0" stroke="#334155" stroke-width="1"/>
<rect x="185" y="75" width="90" height="12" rx="4" fill="#475569"/>
<line x1="192" y1="100" x2="265" y2="100" stroke="#94a3b8" stroke-width="3"/>
<line x1="192" y1="112" x2="255" y2="112" stroke="#cbd5e1" stroke-width="3"/>
<rect x="53" y="166" width="234" height="16" fill="#0f172a"/>
<rect x="57" y="169" width="10" height="10" fill="#60a5fa"/>
<circle cx="80" cy="174" r="4" fill="#fde047"/><circle cx="94" cy="174" r="4" fill="#86efac"/><circle cx="108" cy="174" r="4" fill="#fca5a5"/>
<rect x="150" y="200" width="60" height="10" fill="#334155"/>
<rect x="120" y="210" width="120" height="8" rx="3" fill="#475569"/>
<rect x="55" y="235" width="150" height="42" rx="5" fill="#e2e8f0" stroke="#334155" stroke-width="1.5"/>
${[0, 1, 2].map(r => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(c => `<rect x="${63 + c * 14}" y="${242 + r * 11}" width="11" height="8" rx="1.5" fill="#f8fafc" stroke="#94a3b8" stroke-width="0.8"/>`).join('')).join('')}
<rect x="235" y="240" width="34" height="48" rx="16" fill="#e2e8f0" stroke="#334155" stroke-width="1.5"/>
<line x1="252" y1="244" x2="252" y2="258" stroke="#94a3b8" stroke-width="1.5"/>
<line x1="288" y1="80" x2="320" y2="80" stroke="#64748b" stroke-width="1"/>
<line x1="252" y1="172" x2="320" y2="196" stroke="#64748b" stroke-width="1"/>
<line x1="130" y1="255" x2="200" y2="285" stroke="#64748b" stroke-width="1"/>
<line x1="252" y1="240" x2="290" y2="228" stroke="#64748b" stroke-width="1"/>
${label(324, 84, 'A – Screen', 10)}
${label(324, 120, 'B – Window', 10)}
${label(324, 200, 'C – Taskbar', 10)}
${label(204, 288, 'D – Keyboard', 10)}
${label(294, 231, 'E – Mouse', 10)}
` + svgClose,
  },

  'fraction-pie': {
    id: 'fraction-pie',
    title: 'Fractions (Pies)',
    svg: svgOpen + title('FRACTIONS') + `
<circle cx="75" cy="105" r="42" fill="#dbeafe" stroke="#1e3a8a" stroke-width="2"/>
<path d="M75,105 L75,63 A42,42 0 0,1 117,105 Z" fill="#2563eb"/>
<text x="75" y="168" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">1/4</text>
<circle cx="200" cy="105" r="42" fill="#dbeafe" stroke="#1e3a8a" stroke-width="2"/>
<path d="M200,105 L200,63 A42,42 0 0,1 200,147 Z" fill="#2563eb"/>
<line x1="200" y1="63" x2="200" y2="147" stroke="#1e3a8a" stroke-width="1.5"/>
<text x="200" y="168" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">1/2</text>
<circle cx="325" cy="105" r="42" fill="#dbeafe" stroke="#1e3a8a" stroke-width="2"/>
<path d="M325,105 L325,63 A42,42 0 0,1 361,126 Z" fill="#2563eb"/>
<line x1="325" y1="63" x2="325" y2="147" stroke="#1e3a8a" stroke-width="1.5"/>
<line x1="361" y1="126" x2="289" y2="126" stroke="#1e3a8a" stroke-width="1.5"/>
<text x="325" y="168" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e293b">1/3</text>
<rect x="45" y="195" width="310" height="60" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
<text x="200" y="220" text-anchor="middle" font-size="12" fill="#1e293b">Numerator = top number (parts taken)</text>
<text x="200" y="240" text-anchor="middle" font-size="12" fill="#1e293b">Denominator = bottom number (total equal parts)</text>
` + svgClose,
  },

  'number-line': {
    id: 'number-line',
    title: 'Number Line (0–10)',
    svg: svgOpen + title('NUMBER LINE (0 – 10)') + `
<line x1="30" y1="140" x2="370" y2="140" stroke="#1e293b" stroke-width="3"/>
${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => { const x = 35 + n * 32; return `<line x1="${x}" y1="132" x2="${x}" y2="148" stroke="#1e293b" stroke-width="2"/><text x="${x}" y="172" text-anchor="middle" font-size="15" font-weight="bold" fill="#1e293b">${n}</text>`; }).join('')}
<line x1="135" y1="95" x2="135" y2="128" stroke="#dc2626" stroke-width="3"/>
<path d="M135,130 L129,118 L141,118 Z" fill="#dc2626"/>
<text x="135" y="82" text-anchor="middle" font-size="13" font-weight="bold" fill="#dc2626">3</text>
<text x="200" y="225" text-anchor="middle" font-size="11" fill="#475569">The red arrow shows the number 3 on the line</text>
` + svgClose,
  },

  'digestive-system-upper': {
    id: 'digestive-system-upper',
    title: 'Human Digestive System — Detailed (Basic 4 & above)',
    svg: svgOpen + title('THE DIGESTIVE SYSTEM (DETAILED)') + `
<circle cx="170" cy="42" r="17" fill="#fde8d7" stroke="#d6a077" stroke-width="1.5"/>
<path d="M162,57 L178,57 L182,70 L158,70 Z" fill="#fde8d7" stroke="#d6a077" stroke-width="1"/>
<path d="M170,59 C132,66 116,92 118,132 C120,180 134,222 170,238 C206,222 220,180 222,132 C224,92 208,66 170,59 Z" fill="#fde8d7" stroke="#d6a077" stroke-width="1.5"/>
<ellipse cx="170" cy="46" rx="6" ry="3.5" fill="#fca5a5" stroke="#dc2626" stroke-width="1.2"/>
<rect x="166" y="66" width="8" height="34" rx="3.5" fill="#fdba74" stroke="#ea580c" stroke-width="1.2"/>
<path d="M95,102 C88,116 92,132 108,138 C128,144 148,138 152,124 C154,112 140,100 124,98 C112,97 100,98 95,102 Z" fill="#86efac" stroke="#16a34a" stroke-width="1.5"/>
<ellipse cx="140" cy="141" rx="7" ry="5" fill="#4ade80" stroke="#16a34a" stroke-width="1.2"/>
<path d="M174,100 C196,96 212,106 212,124 C212,142 200,152 188,150 C180,148 176,142 178,136 C184,142 194,140 196,130 C198,118 188,108 174,112 Z" fill="#f9a8d4" stroke="#db2777" stroke-width="1.5"/>
<path d="M152,152 C162,148 182,148 192,154 C196,158 192,162 186,161 C176,159 164,159 156,161 C150,162 148,155 152,152 Z" fill="#fcd34d" stroke="#d97706" stroke-width="1.2"/>
<path d="M196,150 C200,160 198,170 192,176 M148,164 C140,170 136,178 138,186" fill="none" stroke="#f59e0b" stroke-width="4.5" stroke-linecap="round"/>
<path d="M140,186 C150,178 160,190 170,182 C180,174 190,188 200,180 M142,198 C152,190 162,202 172,194 C182,186 192,200 202,192 M145,210 C155,202 165,214 175,206 C185,198 195,210 204,204" fill="none" stroke="#fbbf24" stroke-width="4" stroke-linecap="round"/>
<path d="M138,172 C130,168 126,158 128,146 L128,140 M128,140 C126,134 132,130 140,132 L212,132 C220,132 224,136 224,142 L224,150 M224,150 C226,164 224,184 220,200 C216,214 206,222 192,224 C184,225 178,228 176,232" fill="none" stroke="#fb923c" stroke-width="9" stroke-linecap="round"/>
<path d="M176,232 L174,240" stroke="#ea580c" stroke-width="5" stroke-linecap="round"/>
<line x1="170" y1="46" x2="60" y2="42" stroke="#64748b" stroke-width="1"/>
<line x1="170" y1="82" x2="60" y2="72" stroke="#64748b" stroke-width="1"/>
<line x1="100" y1="112" x2="60" y2="102" stroke="#64748b" stroke-width="1"/>
<line x1="140" y1="141" x2="60" y2="132" stroke="#64748b" stroke-width="1"/>
<line x1="190" y1="120" x2="258" y2="92" stroke="#64748b" stroke-width="1"/>
<line x1="176" y1="156" x2="60" y2="162" stroke="#64748b" stroke-width="1"/>
<line x1="170" y1="192" x2="60" y2="192" stroke="#64748b" stroke-width="1"/>
<line x1="224" y1="160" x2="258" y2="160" stroke="#64748b" stroke-width="1"/>
<line x1="176" y1="236" x2="258" y2="226" stroke="#64748b" stroke-width="1"/>
${label(12, 46, 'A – Mouth')}
${label(12, 76, 'B – Oesophagus')}
${label(12, 106, 'C – Liver')}
${label(12, 136, 'D – Gall Bladder')}
${label(262, 96, 'E – Stomach')}
${label(12, 166, 'F – Pancreas')}
${label(12, 196, 'G – Small Intestine')}
${label(262, 164, 'H – Large Intestine')}
${label(262, 230, 'I – Rectum')}
` + svgClose,
  },

  'circulatory-system-upper': {
    id: 'circulatory-system-upper',
    title: 'Human Circulatory System — Detailed (Basic 4 & above)',
    svg: svgOpen + title('THE CIRCULATORY SYSTEM (DETAILED)') + `
<circle cx="178" cy="36" r="14" fill="#fde8d7" stroke="#d6a077" stroke-width="1.5"/>
<path d="M178,50 C140,56 124,82 126,120 C128,168 142,208 178,224 C214,208 228,168 230,120 C232,82 216,56 178,50 Z" fill="#fde8d7" stroke="#d6a077" stroke-width="1.5"/>
<ellipse cx="112" cy="120" rx="26" ry="44" fill="#fecdd3" stroke="#f43f5e" stroke-width="1.5"/>
<ellipse cx="244" cy="120" rx="26" ry="44" fill="#fecdd3" stroke="#f43f5e" stroke-width="1.5"/>
<path d="M186,92 C196,66 224,62 232,80 C238,94 230,108 218,112 M218,112 C224,120 226,132 222,140" fill="none" stroke="#ef4444" stroke-width="8" stroke-linecap="round"/>
<path d="M186,96 L186,86 M196,88 L198,76 M208,86 L214,76" stroke="#ef4444" stroke-width="3.5" stroke-linecap="round"/>
<path d="M180,84 C176,64 168,52 162,44 M188,84 C190,66 192,54 196,44" stroke="#ef4444" stroke-width="2.5"/>
<path d="M152,58 C150,76 150,92 152,104" fill="none" stroke="#3b82f6" stroke-width="7" stroke-linecap="round"/>
<path d="M156,108 C140,100 124,96 112,104 M158,110 C176,100 200,98 224,102 M224,102 C232,104 238,110 240,118" fill="none" stroke="#1e40af" stroke-width="5" stroke-linecap="round"/>
<path d="M118,112 C134,112 146,114 154,120 M238,120 C224,122 210,124 200,128" stroke="#ef4444" stroke-width="2"/>
<path d="M150,104 C140,116 136,136 142,156 C146,170 158,178 168,174 C176,170 178,160 174,152 C186,158 196,152 198,140 C200,124 190,108 176,104 C164,101 154,98 150,104 Z" fill="#dc2626" stroke="#991b1b" stroke-width="2"/>
<path d="M150,120 C162,116 182,116 196,120 M172,116 L172,172 M150,150 C162,156 182,156 196,150" fill="none" stroke="#fca5a5" stroke-width="1.5"/>
<text x="160" y="140" font-size="7" fill="#7f1d1d" font-weight="bold">Right</text>
<text x="160" y="148" font-size="7" fill="#7f1d1d" font-weight="bold">Atrium*</text>
<text x="178" y="168" font-size="7" fill="#7f1d1d" font-weight="bold">Left</text>
<text x="178" y="176" font-size="7" fill="#7f1d1d" font-weight="bold">Ventricle*</text>
<path d="M196,146 C204,170 206,196 202,220 M168,176 C164,196 164,210 166,224" stroke="#ef4444" stroke-width="4" fill="none"/>
<path d="M152,176 C146,196 146,210 148,224 M186,178 C190,196 190,210 188,224" stroke="#3b82f6" stroke-width="4" fill="none"/>
<line x1="188" y1="150" x2="268" y2="130" stroke="#64748b" stroke-width="1"/>
<line x1="196" y1="72" x2="268" y2="66" stroke="#64748b" stroke-width="1"/>
<line x1="152" y1="66" x2="70" y2="56" stroke="#64748b" stroke-width="1"/>
<line x1="128" y1="100" x2="70" y2="92" stroke="#64748b" stroke-width="1"/>
<line x1="232" y1="116" x2="268" y2="106" stroke="#64748b" stroke-width="1"/>
<line x1="204" y1="190" x2="268" y2="190" stroke="#64748b" stroke-width="1"/>
<line x1="150" y1="200" x2="70" y2="204" stroke="#64748b" stroke-width="1"/>
${label(272, 70, 'A – Aorta')}
${label(74, 60, 'B – Vena Cava')}
${label(74, 96, 'C – Pulmonary Artery')}
${label(272, 110, 'D – Pulmonary Vein')}
${label(272, 134, 'E – Heart (4 chambers)')}
${label(272, 194, 'F – Arteries')}
${label(74, 208, 'G – Veins')}
${label(74, 140, 'H – Lungs')}
<text x="200" y="288" text-anchor="middle" font-size="8.5" fill="#64748b">*In a front view the patient's right side appears on your left</text>
` + svgClose,
  },

  'writing-letters': {
    id: 'writing-letters',
    title: 'Trace the Letter a (Manuscript)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300" style="max-width:100%;height:auto" font-family="Arial, Helvetica, sans-serif"><rect width="400" height="300" fill="#ffffff"/><text x="200" y="22" text-anchor="middle" font-size="15" font-weight="bold" fill="#1e3a8a">Trace the letter a, then write it</text><line x1="24" y1="46" x2="376" y2="46" stroke="#475569" stroke-width="1.8"/><line x1="24" y1="80" x2="376" y2="80" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="7 6"/><line x1="24" y1="112" x2="376" y2="112" stroke="#475569" stroke-width="1.8"/><text x="48" y="80" font-size="46" fill="#1e293b" font-family="Comic Sans MS, Segoe Print, cursive">a</text><text x="122" y="80" font-size="46" fill="none" stroke="#64748b" stroke-width="1.6" stroke-dasharray="4 3.5" font-family="Comic Sans MS, Segoe Print, cursive">a</text><text x="196" y="80" font-size="46" fill="none" stroke="#64748b" stroke-width="1.6" stroke-dasharray="4 3.5" font-family="Comic Sans MS, Segoe Print, cursive">a</text><line x1="24" y1="130" x2="376" y2="130" stroke="#475569" stroke-width="1.8"/><line x1="24" y1="164" x2="376" y2="164" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="7 6"/><line x1="24" y1="196" x2="376" y2="196" stroke="#475569" stroke-width="1.8"/><text x="30" y="177" font-size="44" fill="#334155" font-family="Comic Sans MS, Segoe Print, cursive">1</text><line x1="24" y1="218" x2="376" y2="218" stroke="#475569" stroke-width="1.8"/><line x1="24" y1="252" x2="376" y2="252" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="7 6"/><line x1="24" y1="284" x2="376" y2="284" stroke="#475569" stroke-width="1.8"/><text x="30" y="265" font-size="44" fill="#334155" font-family="Comic Sans MS, Segoe Print, cursive">2</text></svg>`,
  },
  'writing-words': {
    id: 'writing-words',
    title: 'Trace and Print the Word',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300" style="max-width:100%;height:auto" font-family="Arial, Helvetica, sans-serif"><rect width="400" height="300" fill="#ffffff"/><text x="200" y="22" text-anchor="middle" font-size="15" font-weight="bold" fill="#1e3a8a">Trace and print the word</text><line x1="24" y1="46" x2="376" y2="46" stroke="#475569" stroke-width="1.8"/><line x1="24" y1="80" x2="376" y2="80" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="7 6"/><line x1="24" y1="112" x2="376" y2="112" stroke="#475569" stroke-width="1.8"/><text x="38" y="80" font-size="38" fill="#1e293b" font-family="Comic Sans MS, Segoe Print, cursive">Sun</text><text x="162" y="80" font-size="38" fill="none" stroke="#64748b" stroke-width="1.6" stroke-dasharray="4 3.5" font-family="Comic Sans MS, Segoe Print, cursive">Sun</text><text x="268" y="80" font-size="38" fill="none" stroke="#64748b" stroke-width="1.6" stroke-dasharray="4 3.5" font-family="Comic Sans MS, Segoe Print, cursive">Sun</text><line x1="24" y1="130" x2="376" y2="130" stroke="#475569" stroke-width="1.8"/><line x1="24" y1="164" x2="376" y2="164" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="7 6"/><line x1="24" y1="196" x2="376" y2="196" stroke="#475569" stroke-width="1.8"/><text x="30" y="177" font-size="44" fill="#334155" font-family="Comic Sans MS, Segoe Print, cursive">1</text><line x1="24" y1="218" x2="376" y2="218" stroke="#475569" stroke-width="1.8"/><line x1="24" y1="252" x2="376" y2="252" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="7 6"/><line x1="24" y1="284" x2="376" y2="284" stroke="#475569" stroke-width="1.8"/><text x="30" y="265" font-size="44" fill="#334155" font-family="Comic Sans MS, Segoe Print, cursive">2</text></svg>`,
  },
  'writing-sentences': {
    id: 'writing-sentences',
    title: 'Read and Trace the Sentence',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300" style="max-width:100%;height:auto" font-family="Arial, Helvetica, sans-serif"><rect width="400" height="300" fill="#ffffff"/><text x="200" y="22" text-anchor="middle" font-size="15" font-weight="bold" fill="#1e3a8a">Read the sentence, then trace it</text><text x="36" y="46" font-size="17" fill="#1e293b" font-family="Comic Sans MS, Segoe Print, cursive">The cat is black.</text><line x1="24" y1="64" x2="376" y2="64" stroke="#475569" stroke-width="1.8"/><line x1="24" y1="96" x2="376" y2="96" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="7 6"/><line x1="24" y1="128" x2="376" y2="128" stroke="#475569" stroke-width="1.8"/><text x="36" y="96" font-size="21" fill="none" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4 3.5" font-family="Comic Sans MS, Segoe Print, cursive">The cat is black.</text><line x1="24" y1="146" x2="376" y2="146" stroke="#475569" stroke-width="1.8"/><line x1="24" y1="178" x2="376" y2="178" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="7 6"/><line x1="24" y1="210" x2="376" y2="210" stroke="#475569" stroke-width="1.8"/><text x="36" y="178" font-size="21" fill="none" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4 3.5" font-family="Comic Sans MS, Segoe Print, cursive">The cat is black.</text><line x1="24" y1="234" x2="376" y2="234" stroke="#475569" stroke-width="1.8"/><line x1="24" y1="266" x2="376" y2="266" stroke="#94a3b8" stroke-width="1.4" stroke-dasharray="7 6"/><line x1="24" y1="298" x2="376" y2="298" stroke="#475569" stroke-width="1.8"/><text x="30" y="281" font-size="44" fill="#334155" font-family="Comic Sans MS, Segoe Print, cursive">1</text></svg>`,
  },

};

// ── SVG → PNG rasterizer (for PDF/Word export; browser-only, no new deps) ──
export function svgToPngDataUrl(svg: string, targetW = 800): Promise<string | null> {
  return new Promise(resolve => {
    try {
      const svgUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
      const img = new Image();
      img.onload = () => {
        try {
          const w = img.naturalWidth || 400;
          const h = img.naturalHeight || 300;
          const canvas = document.createElement('canvas');
          canvas.width = targetW;
          canvas.height = Math.round((h / w) * targetW);
          const ctx = canvas.getContext('2d');
          if (!ctx) { resolve(null); return; }
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/png'));
        } catch (e) {
          resolve(null);
        }
      };
      img.onerror = () => resolve(null);
      img.src = svgUrl;
    } catch (e) {
      resolve(null);
    }
  });
}

// ── Topic → visual matching (called by the Offline Engine) ──
const isEarlyYears = (classLevel: string): boolean =>
  /nursery|kg|kindergarten|basic 1|basic 2|basic 3|b1|b2|b3/.test(classLevel.toLowerCase());

function pickVisual(subj: string, classLevel: string, text: string, category: string): string | null {
  const upper = /basic 4|basic 5|basic 6|basic 7|basic 8|basic 9|b4|b5|b6|b7|b8|b9|jhs/.test(classLevel.toLowerCase());
  if (subj === 'science') {
    if (/digest|stomach|intestine|gut|o(es)?ophag|nutrition/.test(text)) return upper ? 'digestive-system-upper' : 'digestive-system';
    if (/heart|blood|circulat|aorta|vena cava/.test(text)) return upper ? 'circulatory-system-upper' : 'circulatory-system';
    if (/breath|lung|respir/.test(text)) return 'respiratory-system';
    if (/circuit|conductor|insulator|electric|current|switch|battery|bulb/.test(text)) return 'circuit-series';
    if (/food chain|food web|predator|prey/.test(text)) return 'food-chain';
    if (/water cycle|cycle of water/.test(text)) return 'water-cycle';
    if (/solid|liquid|gas|states? of matter/.test(text)) return 'states-of-matter';
    if (/plant|photosynthesis|flower|\bleaf|\bleaves|\bstems?\b|fruit|\bseeds?\b|\broots? (of|in)/.test(text)) return 'plant-parts';
    return null;
  }
  if (subj === 'social studies' || /geography/.test(subj)) {
    if (/west africa|neighbouring|neighbouring country|african country/.test(text)) return 'west-africa';
    if (/ghana|region|capital/.test(text)) return 'ghana-map';
    if (/direction|compass|north|south|east|west/.test(text)) return 'compass';
    return null;
  }
  if (/math/.test(subj)) {
    if (/place value/.test(text)) return 'place-value-chart';
    if (/fraction/.test(text)) return 'fraction-pie';
    if (/number line|number sequence|number pattern|counting/.test(text)) return 'number-line';
    if (/clock|time|hour|minute|o'clock/.test(text)) return 'clock-face';
    if (/coin|money|cedi|pesewa/.test(text)) return 'cedi-coins';
    return null;
  }
  if (/comput/.test(subj)) {
    if (/gui|interface|desktop|screen|window|mouse|keyboard|hardware|monitor|input|output/.test(text)) return 'gui-desktop';
    return null;
  }
  if (isEarlyYears(classLevel)) {
    if (/sentence/.test(text)) return 'writing-sentences';
    if (/letter|trace|alphabet|manuscript/.test(text)) return 'writing-letters';
    if (/word|write|writing|name|colour|color/.test(text)) return 'writing-words';
    if (/clock|time|hour|minute|o'clock/.test(text)) return 'clock-face';
    if (/coin|money|cedi|pesewa/.test(text)) return 'cedi-coins';
    if (/shape|circle|square|triangle|geometry|solid|plane figure/.test(text)) return 'shapes-chart';
    if (/number|count|digit|sequence/.test(text)) return 'number-chart-1-20';
    if (category === 'Trace Diagram & Shapes') return 'shapes-chart';
    if (category === 'Trace Letters & Words') return 'writing-words';
    if (category === 'Picture Identification') return 'counting-objects';
    return 'counting-objects';
  }
  return null;
}

export function attachDiagramVisuals(
  diagrams: ExerciseDiagram[],
  subject: string,
  classLevel: string,
  topic: string,
  keywords: string[]
): void {
  if (!diagrams || diagrams.length === 0) return;
  const subj = subject ? subject.toLowerCase() : '';
  const text = `${topic || ''} ${(keywords || []).join(' ')}`.toLowerCase();
  for (const d of diagrams) {
    const vid = pickVisual(subj, classLevel || '', text, d.diagramCategory || '');
    const v = vid ? DIAGRAM_VISUALS[vid] : null;
    if (v) {
      d.diagramSvg = v.svg;
      d.diagramPrompt = `Study the diagram below (${v.title}) carefully and complete the task.`;
    }
  }
}
