import EventEmitter2 from "eventemitter2";

const eventEmitter = new EventEmitter2({
  wildcard: false,
  delimiter: ".",
  newListener: false,
  removeListener: false,
  verboseMemoryLeak: false,
  ignoreErrors: false,
});

export { eventEmitter };
