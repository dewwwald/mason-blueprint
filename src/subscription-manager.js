const subscriptions = [];

function getSubscribers() {
  return subscriptions.filter(sub => typeof sub !== 'undefined');
}

function addSubscriber(subscriber) {
  let subscriberIndex = subscriptions.length
  subscriptions.push(subscriber);
  return {
    removeSubscriber: removeSubscriber.bind(null, subscriberIndex)
  };
}

function removeSubscriber(subscriberIndex) {
  subscriptions.splice(subscriberIndex, 1);
}

const SubscriptionManager = {
  getSubscribers: getSubscribers,
  addSubscriber: addSubscriber
}

export default SubscriptionManager;
