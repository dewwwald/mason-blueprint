import MasonBlueprint from './mason-blueprint'

let element = document.querySelector('.g.g--masonary');
let masonBlueprint = MasonBlueprint(element).masonBlueprints;
let subscription = masonBlueprint.subscribe((data) => {
  let elements = [...element.children];
  element.style.position = 'relative';
  element.style.height = element.clientHeight + 'px';
  data[0].blueprint.forEach((masonObject, index) => {
    Object.keys(masonObject).forEach((prop) => {
      elements[index].style.position = 'absolute';
      elements[index].style[prop] = masonObject[prop];
    });
  });
});
