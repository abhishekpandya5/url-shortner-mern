export default function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
}

// Usage:
// const wrappedFunction = wrapAsync(async (req, res, next) => {
//   // Your async code here
// });
