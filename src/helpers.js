// export default function debounce(a, b, c) {
//   var d, e;
//   return function () {
//       function h() {
//           d = null;
//           c || (e = a.apply(f, g));
//       }
//       var f = this,
//           g = arguments;
//       return (
//           clearTimeout(d),
//           (d = setTimeout(h, b)),
//           c && !d && (e = a.apply(f, g)),
//           e
//       );
//   };
// }

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
export default debounce;

export function removeHTMLTags(str) {
  return str.replace(/<[^>]*>?/gm, '');
}
