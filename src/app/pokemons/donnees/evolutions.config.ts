export interface EvolutionChain {
  names: string[];
}

export const EVOLUTION_CHAINS: EvolutionChain[] = [
  { names: ['Bulbizarre', 'Herbizarre', 'Florizarre'] },
  { names: ['Salamèche', 'Reptincel', 'Dracaufeu'] },
  { names: ['Carapuce', 'Carabaffe', 'Tortank'] },
  { names: ['Chenipan', 'Chrysacier', 'Papilusion'] },
  { names: ['Aspicot', 'Coconfort', 'Dardargnan'] },
  { names: ['Roucool', 'Roucoups', 'Roucarnage'] },
  { names: ['Rattata', 'Rattatac'] },
  { names: ['Pichu', 'Pikachu', 'Raichu'] },
  { names: ['Sabelette', 'Sablaireau'] },
  { names: ['Nidoran♀', 'Nidorina', 'Nidoqueen'] },
  { names: ['Nidoran♂', 'Nidorino', 'Nidoking'] },
  { names: ['Méléfée', 'Mélodelfe'] },
  { names: ['Goupix', 'Feunard'] },
  { names: ['Rondoudou', 'Grodoudou'] },
  { names: ['Abra', 'Kadabra', 'Alakazam'] },
  { names: ['Machop', 'Machopeur', 'Mackogneur'] },
  { names: ['Chetiflor', 'Boustiflor', 'Empiflor'] },
  { names: ['Tentacool', 'Tentacruel'] },
  { names: ['Géodude', 'Gravalanch', 'Grolem'] },
  { names: ['Ponyta', 'Galopa'] },
  { names: ['Magnéti', 'Magnéton'] },
  { names: ['Doduo', 'Dodrio'] },
  { names: ['Otaria', 'Lamantine'] },
  { names: ['Fantominus', 'Spectrum', 'Ectoplasma'] },
  { names: ['Minidraco', 'Draco', 'Dracolosse'] },
  { names: ['Ptitard', 'Têtarte', 'Tartard'] },
  { names: ['Hypotrempe', 'Hypocéan'] },
  { names: ['Voltorbe', 'Électrode'] },
  { names: ['Amonita', 'Amonistar'] },
  { names: ['Kabuto', 'Kabutops'] },
  { names: ['Smogo', 'Smogogo'] },
  { names: ['Taupiqueur', 'Triopikeur'] },
  { names: ['Caninos', 'Arcanin'] },
  { names: ['Poissirène', 'Poissoroy'] },
  { names: ['Magicarpe', 'Léviator'] },
  { names: ['Évoli', 'Aquali'] },
  { names: ['Évoli', 'Voltali'] },
  { names: ['Évoli', 'Pyroli'] },
  { names: ['Osselait', 'Ossatueur', 'Ossydral'] },
  { names: ['Excelangue', 'Exeggutor'] },
  { names: ['Abo', 'Arbok'] },
  { names: ['Mélofée', 'Mélodelfe'] },
  { names: ['Piafabec', 'Rapasdepic'] },
];

export function getEvolutionChain(pokemonName: string): string[] | null {
  const chain = EVOLUTION_CHAINS.find(c =>
    c.names.some(n => n.toLowerCase() === pokemonName.toLowerCase())
  );
  return chain ? chain.names : null;
}

export function getNextEvolution(pokemonName: string): string | null {
  const chain = getEvolutionChain(pokemonName);
  if (!chain) return null;
  const idx = chain.findIndex(n => n.toLowerCase() === pokemonName.toLowerCase());
  return idx < chain.length - 1 ? chain[idx + 1] : null;
}

export function getEvolutionStage(pokemonName: string): number {
  const chain = getEvolutionChain(pokemonName);
  if (!chain) return 0;
  return chain.findIndex(n => n.toLowerCase() === pokemonName.toLowerCase());
}
