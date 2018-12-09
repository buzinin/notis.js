## Notis.js
Lightweigth, fully customizable, no dependencies, notification system library (gzip < 1 kb)
#### Demo
[Demo page](https://buzinin.github.io/notis.js/ "Demo page")
#### Browser support
The minimum supported version

| IE | Edge         | Chrome | Firefox | Safari |
|----|--------------|--------|---------|--------|
| 10 | All version | 60     | 53      |   9.1  |

#### Options

| Option             | Type    | Default        | Description                                                                                          |
|--------------------|---------|----------------|------------------------------------------------------------------------------------------------------|
| type               | String  | 'success'      | Four types of notifications by default  ('success', 'info', 'warn', 'error'). You can set your type. |
| position           | String  | 'top-right'    | Position of the notification element  ('top-right', 'bottom-right', 'bottom-left', 'top-left').      |
| duration           | Integer | 6000           | Delay for closing notification in milliseconds (ms). E.g. 10000                                      |
| width              | Integer | 300            | Width (px) of the notification element.                                                              |
| indentY            | Integer | 25             | Vertical indent for notification element.                                                            |
| indentX            | Integer | 25             | Horizontal iindent for notification element.                                                         |
| close              | Boolean | false          | Close by click on the notification element.                                                          |
| closeBtnclose      | Boolean | true           | Show close button.                                                                                   |
| showAnimationclose | String  | (empty string) | You can add and use animate.css class names or your custom css animations as well.                   |

```js
const config = {
      type: 'error',
      duration: 6000,
      indentY: 25,
      indentX: 25,
      max: 5,
      width: 300,
      close: false,
      closeBtn: true,
      position: 'top-right',
      showAnimation: ''
    };

notis.show('text', config);
```

#### Callbacks
| Callback      | Description                                                  |
|---------------|--------------------------------------------------------------|
| beforeCreate  | Will be called before inserting the notification on the page |
| beforeDestroy | Will be called before deleting the notification              |

```js
notis.show('My text', {
    type: 'info',
    duration: 8000,
    beforeCreate: function (elem) {
      elem.style.background = 'purple';
    },
    beforeDestroy: function (elem) {
      console.log(elem);
    }
});
```

#### Methods
| Methods   | Description              |
|-----------|--------------------------|
| update()  | Update notification text |
| destroy() | Destroy notification     |

Example - Set new text after 4000 seconds
```js
const myNotis = notis.show('Hello');
setTimeout(() => myNotis.update('New text'), 4000);
```
Example - Destroy notification after 4000 seconds
```js
const myNotis = notis.show('Hello');
setTimeout(() => myNotis.destroy(), 4000);
```