document.addEventListener('DOMContentLoaded', function () {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {
    edge: 'right'
  });
  // add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {
    edge: 'left'
  });
});

if ("serviceWorker" in navigator) {
  console.log("sw is in the browser");
  window.addEventListener("load", function () {
    navigator.serviceWorker.register('../sw.js').then(() => {
      console.log("sw is registered");
    }).catch((e) => {
      console.error("failed with an erreo", e);
    })
  })
}



// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('./sw.js')
//       .then(registration => {
//         console.log(`Service Worker registered! Scope: ${registration.scope}`);
//       })
//       .catch(err => {
//         console.log(`Service Worker registration failed: ${err}`);
//       });
//   });
// }