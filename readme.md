#random.weighted


```
npm install random.weighted
```

```javascript
//define possible events including weighted probability
//(can be any integer score, like total counted words etc..)

var p1 = Probe([
	{name:'tree', weight: 13}
	, {name:'car', weight: 27}
	, {name:'bike', weight: 7}
]);
```

with that setup trees is expected to occur ~twice as often as bikes, and
cars ~twice as often as trees

```javascript
//gets the next random event
var event = p1.emit();

//gets new array of random weighted events
var events = p1.emit(20);

//all emitted events
console.log(JSON.stringify(p1.emitted));

//event stats
console.log(JSON.stringify(p1.events));

//print formatted stats
console.log(p1.toString());
```
