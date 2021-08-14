function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

(function() {
  docReady(function() {
    console.log("**********");
    const params = location.pathname.split("/");
    if (params.length == 3) {
      var headerTag = document.getElementsByTagName("h2")[0];
      var newTag = `<div class="d-flex justify-space-between align-items-center">
        <h2>${headerTag.textContent}</h2>
        <form method="post" action="/user/` + params[1] + `">
          <button type="submit">Start sync</button>
        </from>
      </div>`
      headerTag.outerHTML = newTag;
    }
  });
})();
