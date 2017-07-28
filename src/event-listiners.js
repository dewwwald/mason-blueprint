class EventListiner {
  constructor() {
    this.listiners = [];
  }

  getListiners() {
    return this.listiners.filter(listiner => typeof listiner !== 'undefined');
  }

  addListiner(listiner) {
    let listinerIndex = this.listiners.length
    this.listiners.push(listiner);
    return {
      removelistiner: this.removelistiner.bind(this, listinerIndex)
    };
  }

  removelistiner() {
    // something to do
  }
}

let resizeListiner = new EventListiner();

window.addEventListener('resize', function masonResize() {
  resizeListiner.getListiners().forEach(listiner => {
    listiner();
  });
}, false);

const EventListiners = {
  addResizeListiner: resizeListiner.addListiner.bind(resizeListiner)
}

export default EventListiners;
