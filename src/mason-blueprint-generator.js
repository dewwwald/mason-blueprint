import SubscriptionManager from './subscription-manager';

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
    subscription(dataTransporter);
  });
}

function subscribeMasonBlueprintUpdated(dataTransporter, callback) {
  SubscriptionManager
    .addSubscriber(callback);
  emitMasonBlueprint(dataTransporter);
}

function buildMasonBlueprint(mason) {
  let gridWidht = mason.element.clientWidth;
  let columnCount = gridWidht / mason.element.children[0].clientWidth;
  columnCount = columnCount - columnCount % 1;
  let blueprint = [];
  let rowCol = 0;
  let row = 0;

  mason.element.children.forEach(childElement => {
    let top;
    if (row > 0) {
      top = 0;
    }
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
  return {
    reSelectElements: reSelectElements.bind(null, dataTransporter),
    getMasonBlueprint: getMasonBlueprint.bind(null, dataTransporter),
    subscribe: subscribeMasonBlueprintUpdated.bind(null, dataTransporter)
  };

}
export default MasonBlueprintGenerator;
