import MasonBlueprint from './mason-blueprint'

let masonBlueprint = MasonBlueprint('.g.g--masonary').masonBlueprints;
masonBlueprint.subscribe((data) => console.log(data));
