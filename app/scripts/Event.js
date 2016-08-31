import localforage from 'localforage';

export default class Event {
	constructor(name) {
		this.id = guidGenerator();
		this.name = name || '';
		this.counters = [];
		this.createDate = new Date();
	}

	save() {
		localforage.setItem('event-' + this.id, this);
	}
}


function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

