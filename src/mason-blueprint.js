import MasonBlueprintGenerator from './mason-blueprint-generator';
import SubscriptionManager from './subscription-manager';

function getElementSelector(element) {
  const id = element.getAttribute('id');
  const classList = element.className.replace(' ', '');
  const tagName = element.tagName;
  if (element.getAttribute('id')) {
    return id;
  }
  return tagName + (classList ? classList : '');
}

function getSelectorDataTransporter(selector) {
  // given a selector string get elements and build [{ element: element, selector: selector }]
  return [...document.querySelectorAll(selector)].map(element => ({
    element: element,
    selector: selector
  }));
}

function getElementsDataTransporter(elements) {
  // given an element get selector and build [{ element: element, selector: selector }]
  return elements.map(element => ({
    element: element,
    selector: getElementSelector(element)
  }));
}

function determineInitializerFunction(initialItem) {
  if (typeof initialItem === 'string') {
    return getSelectorDataTransporter(initialItem);
  } else if (initialItem.length && initialItem.length  > 0) {
    return getElementsDataTransporter(initialItem);
  } else if (typeof initialItem === 'object') {
    return getElementsDataTransporter([initialItem]);
  }
}

function MasonBlueprint(initialItem) {
  let fn = determineInitializerFunction.bind(null, initialItem);
  const dataTransporter = {
    initialItemType: typeof initialItem,
    fn: fn,
    mason: fn()
  };

  return {
    masonBlueprints: MasonBlueprintGenerator(dataTransporter),
  };
}

export default MasonBlueprint;
