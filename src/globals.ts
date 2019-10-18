import url from "url";
/**
 * This polyfill is used where the Uint8Array.fill is not available on given platform.
 * It will port the Array.fill function to Uint8Array.fill. So, when Uint8Array.fill is called,
 * then the implementation of Array.fill will be invoked.
 *
 * @platfroms IE11, Safari, Android for React Native Apps.
 * @author Mozilla Development Network
 */
if (!Uint8Array.prototype.fill) {
  Object.defineProperty(Array.prototype, "fill", {
    value: function(value: any) {
      // Steps 1-2.
      if (this == null) {
        throw new TypeError("this is null or not defined");
      }

      const O = Object(this);

      // Steps 3-5.
      // tslint:disable-next-line
      const len = O.length >>> 0;

      // Steps 6-7.
      const start = arguments[1];
      // tslint:disable-next-line
      const relativeStart = start >> 0;

      // Step 8.
      let k =
        relativeStart < 0
          ? Math.max(len + relativeStart, 0)
          : Math.min(relativeStart, len);

      // Steps 9-10.
      const end = arguments[2];
      // tslint:disable-next-line
      const relativeEnd = end === undefined ? len : end >> 0;

      // Step 11.
      const final =
        relativeEnd < 0
          ? Math.max(len + relativeEnd, 0)
          : Math.min(relativeEnd, len);

      // Step 12.
      while (k < final) {
        O[k] = value;
        k++;
      }

      // Step 13.
      return O;
    }
  });

  // @ts-ignore
  Uint8Array.prototype.fill = Array.prototype.fill;
}

global.URL = class URL {
  constructor(inputUrl) {
    return url.parse(inputUrl);
  }
};

if (typeof btoa === "undefined") {
  global.btoa = function(str) {
    return new Buffer(str, "binary").toString("base64");
  };
}

if (typeof atob === "undefined") {
  global.atob = function(b64Encoded) {
    return new Buffer(b64Encoded, "base64").toString("binary");
  };
}

if (window.nacl) {
  window.nacl.setPRNG(function(x, n) {
    var i,
      v = new Uint8Array(n);
    crypto.getRandomValues(v);
    for (i = 0; i < n; i++) x[i] = v[i];
    window.nacl.cleanup(v);
  });
}
