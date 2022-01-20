const $ = require("jquery");

window.onload = (function () {
  let dropdown = $(".dropdown__input-wrapper");
  let counter = $(".counter");

  if (window.Worker) {
    const myWorker = new Worker("./utils/js/worker.js");

    myWorker.onmessage = function () {
      result.textContent = e.data;
      console.log("Сообщение, полученое от работника");
    };
    console.log("работник work");
  }

  dropdown.on("click", function (e) {
    e.preventDefault();
    let d = e.data;
    counter.toggleClass("counter_hidden");
    e.stopPropagation();
  });
})();
