// https://tonicdev.com/kasiawygodna/weighted-random
// author: earendel
// date: 2016-03-27
// mailto: kasia99@gmx.de


function Probe(array) {
	array = array || [];
  var p = {
    _private: {
        events: array
    },
    get events() {
      return this._private.events;
    },
    set events(array) {
        this._private.events = array;
        this.init();
    },
    get total() {
      return this.events.map(x => x.weight).reduce((prev, curr) => prev + curr)
    },
    emitted: [],
    addEvent: function(weight, name, obj) {
      obj = obj || {};
      obj.name = name || "P" + this.events.length;
      obj.weight = weight || 1;
      this._private.events.push(obj);
      this.init();
    },
    init: function() {
			this.emitted = [];
      var nextmin = 0;
      for (var i = this.events.length; i--> 0;) {
        this.events[i].chance = this.events[i].weight / this.total;
        this.events[i].min = nextmin;
        this.events[i].max = this.events[i].chance + nextmin;
				nextmin = this.events[i].max;
      }
    },
    toString: function() {
        return this.events.map(event=>{ return event.name + " (" + (event.chance*100).toFixed(2) + "%) : " + event.count + " / " + this.emitted.length; }).join(" | ");
    },
    emit: function(n) {

        if(this.events.length <= 0)
          throw Error('No events specified.');

        if (n > 1) {
            while (n--> 0) {
                var event = this.emit()
            };
            return this.emitted;
        }

        var rand = Math.random();
        var event = this.events.filter(e => ((rand >= e.min) && (rand < e.max)))[0];
        if (!event.count)
                event.count = 0;
        event.count++;
            this.emitted.push(event);
        return event;
    }
  };
  p.init();
  return p;
};

module.exports = Probe;


//define possible events including weighted probability
//(can be any integer score, like total counted words etc)
/*
var p1 = Probe([
	{name:'tree', weight: 13}
	, {name:'car', weight: 27}
	, {name:'bike', weight: 7}
]);
/* */
//with that setup trees is expected to occur ~twice as often as bikes, and
//cars ~twice as often as trees
