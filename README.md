# jh-datepicker

## What is this?
This project is an open-source data picker. It aims to provide a data picker that anyone can easily use by simply importing it from the source code.

## How to use

Import datepicker.css and datepicker.js from the src/codebase folder for usage.
```html
    <link rel='stylesheet' href='../src/codebase/datepicker.css' />
    <script src="../src/codebase/datepicker.js"></script>
```

If you want to use the compressed version, please use the code inside the "minimum" folder.

If you plan to bundle your project using a bundling package like webpack and need to use this project in CommonJS format, you can copy the code from the datepicker.js file in the codebase folder and paste it into your project. Afterward, insert the following code at the very bottom:
```javascript
module.exports = JH_datepicker
```

For detailed usage instructions, refer to the example code in the index.html file located in the example folder.



## License

MIT