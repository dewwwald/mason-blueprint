import SubscriptionManager from './subscription-manager';
import EventListiners from './event-listiners';

function masonBlueprintUpdated() {
  subscriptions.forEach(subscription => {
    subscription();
  });
}

function reSelectElements(dataTransporter) {
  dataTransporter.mason = dataTransporter.fn();
}

function emitMasonBlueprint(dataTransporter) {
  SubscriptionManager.getSubscribers().forEach(subscription => {
    subscription(dataTransporter.mason);
  });
}

function subscribeMasonBlueprintUpdated(dataTransporter, callback) {
  let subscription = SubscriptionManager
    .addSubscriber(callback);
  emitMasonBlueprint(dataTransporter);
  return subscription;
}

function findShortestCol(array) {
  return array.reduce(
    (pre, val, index) => array[index] < array[pre] ? index : pre, 0);
}

function buildMasonBlueprint(mason) {
  let gridWidht = mason.element.clientWidth;
  let columnCount = Math.round(gridWidht / mason.element.children[0].clientWidth);
  let blueprint = [];
  let rowCol = 0;
  let row = 0;
  let topOffset = Array(columnCount).fill(0);

  [...mason.element.children].forEach((childElement, index) => {
    let top;
    let shortestCol = findShortestCol(topOffset);
    if (row > 0) {
      top = topOffset[shortestCol];
    } else {
      top = 0;
    }

    topOffset[shortestCol] = topOffset[shortestCol] + childElement.clientHeight;
    blueprint.push({
      left: shortestCol / columnCount * 100 + '%',
      top: top + 'px',
    });
    rowCol = (rowCol + 1);
    if (rowCol === columnCount) row++;
    rowCol = rowCol % columnCount;
  });

  return blueprint;
}

function getMasonBlueprint(dataTransporter) {
  dataTransporter.mason.map(mason => {
    mason.blueprint = buildMasonBlueprint(mason);
    return mason;
  });
  emitMasonBlueprint(dataTransporter);
  return dataTransporter.mason;
}

function MasonBlueprintGenerator(dataTransporter) {
  getMasonBlueprint(dataTransporter);
  EventListiners.addResizeListiner(getMasonBlueprint.bind(null, dataTransporter))
  return {
    reSelectElements: reSelectElements.bind(null, dataTransporter),
    getMasonBlueprint: getMasonBlueprint.bind(null, dataTransporter),
    subscribe: subscribeMasonBlueprintUpdated.bind(null, dataTransporter)
  };

}
export default MasonBlueprintGenerator;
