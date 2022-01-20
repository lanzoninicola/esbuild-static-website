(() => {
  // modules/multiply.js
  function multiply(a, b) {
    return a * b;
  }

  // modules/sum.js
  function sum(a, b) {
    return a + b;
  }

  // modules/session-manager.js
  var SessionManager = class {
    constructor() {
    }
    set = (key, value) => {
      let _value = value;
      if (typeof _value === "object") {
        _value = JSON.stringify(_value);
      }
      sessionStorage.setItem(key, _value);
    };
    get = (key) => {
      const value = sessionStorage.getItem(key);
      if (value === "null") {
        return null;
      }
      if (value === "undefined") {
        return false;
      }
      if (value?.charAt(0) === "{") {
        return JSON.parse(value);
      }
      return value;
    };
    remove = (key) => {
      sessionStorage.removeItem(key);
    };
  };
})();
//# sourceMappingURL=index.js.map
