# Behaviour Activation

## Code style

These are only guidelines, and may be ignored if it is appropriate.

* Use 2 spaces for indentation
* Use UNIX line endings ([vscode](https://stackoverflow.com/a/48694365),
  [atom](https://stackoverflow.com/a/48686409))

Defining functions

```JavaScript
    // preferred
    const f = (a, b) => {
        console.log(a, b);
    };

    // avoid
    function f(a ,b) {
        console.log(a, b);
    }
```
