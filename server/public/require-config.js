require.config({
  baseUrl: "/static",
  paths: {
    "knockout": "ext/knockout/dist/knockout",
    "text": "ext/text/text",
    "socket.io": "ext/socket.io-client/socket.io",
    "justGauge": "ext/justgage-toorshia/justgage",
    "jquery": "ext/jquery/dist/jquery.min",
    "knockout-projections": "ext/knockout-projections/dist/knockout-projections.min"
  },

  shim: {
    "knockout-projections": {
      deps: ["knockout"]
    }
  },

  waitSeconds: 15
});