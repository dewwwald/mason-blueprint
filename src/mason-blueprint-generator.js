import SubscriptionManager from './subscription-manager';

function masonBlueprintUpdated() {
  subscriptions.forEach(subscription => {
    subscription();
  });
}

function reSelectElements(dataTransporter) {
  dataTransporter.mason = dataTransporter.fn();
}

function subscribeMasonBlueprintUpdated(dataTransporter, callback) {
  SubscriptionManager
    .addSubscriber(callback);
}

function getMasonBlueprint(dataTransporter) {
  // (dataTransporter)
  return ;
}

function MasonBlueprintGenerator(dataTransporter) {
  return {
    reSelectElements: reSelectElements.bind(null, dataTransporter),
    getMasonBlueprint: getMasonBlueprint.bind(null, dataTransporter),
    subscribe: subscribeMasonBlueprintUpdated.bind(null, dataTransporter)
  };

}
export default MasonBlueprintGenerator;
