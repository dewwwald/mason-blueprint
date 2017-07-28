const subscriptions = [];

function getSubscribers() {
  return subscriptions;
}

function addSubscriber(subscriber) {
  let subscriberIndex = subscriptions.length
  subscriptions.push(subscriber);
  return {
    removeSubscriber: removeSubscriber.bind(null, subscriberIndex)
  };
}

function removeSubscriber(subscriberIndex) {

}

const SubscriptionManager = {
  getSubscribers: getSubscribers,
  addSubscriber: addSubscriber
}

export default SubscriptionManager;
