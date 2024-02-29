class PubSub {
  private subscribers: Function[] = [];

  subscribe(subscriber: Function) {
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriberToRemove: Function) {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber !== subscriberToRemove,
    );
  }

  publish(data: any) {
    this.subscribers.forEach((subscriber) => {
      try {
        subscriber(data);
      } catch {
        console.error('Not able to publish data');
      }
    });
  }
}

export default PubSub;
