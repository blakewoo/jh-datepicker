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
```html
    <link rel='stylesheet' href='../src/minimum/datepicker.min.css' />
    <script src="../src/minimum/datepicker.min.js"></script>
```


If you plan to bundle your project using a bundling package like webpack and need to use this project in CommonJS format, you can copy the code from the datepicker.js file in the codebase folder and paste it into your project. Afterward, insert the following code at the very bottom:
```javascript
module.exports = JH_datepicker
```

##Quick start
To create the object for the event where you want the Datepicker to appear, import the following properties:
```javascript
document.getElementById("exampleId").addEventListener("click",function(event){
	let example = new JH_datepicker(X_COORDINATE,Y_COORDINATE,DEFAULT_MONTH,LIMIT_START_DATE,LIMIT_END_DATE)
        example.getDay = function (day) {
            document.getElementById("exampleDiv").innerText = day
        }
})
```
###X_COORDINATE
The X-coordinate where the Datepicker will appear.   
###Y_COORDINATE
The Y-coordinate where the Datepicker will appear.   
###DEFAULT_MONTH
The initial year and month, received as a date object, with the default value being today.   
###LIMIT_START_DATE
You cannot select a date before the specified date. The default value is null, meaning there is no starting date limitation.   
###LIMIT_END_DATE
You cannot select a date after the specified date. The default value is null, meaning there is no ending date limitation.   


###getDay function
If you want to retrieve information about the selected date, you can call the getDay function on the created object and obtain the first argument. When passed as a date object, it represents the midnight time of the user's reference date.


## License

MIT