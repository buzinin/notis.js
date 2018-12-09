/*!
 * Lib.js 1.0.0
 * https://github.com/buzinin/Lib.js
 * @license MIT licensed
 *
 * Copyright (C) 2018 Buziinin D V
 */

;(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.notis = factory();
  }
}(this, function () {
    'use strict';

    //Todo text param convert toString
    //TODO get margin from css
    //TODO Set width to notification

    var defaultConfig = {
      type: 'success',
      duration: 6000,
      indentY: 25,
      indentX: 25,
      max: 5,
      width: '300px',
      close: false,
      closeBtn: true,
      position: 'top-right',
      showAnimation: '',
      beforeCreate: function (elem) {
      },
      beforeDestroy: function (elem) {
      }
    };

    var merge = function (obj1, obj2) {
      var obj = {};
      obj2 = obj2 || {};

      for(var prop in obj1) {
        if (obj1.hasOwnProperty(prop)) {
          obj[prop] = obj1[prop];
        }
      }

      for (prop in obj2) {
        if (obj2.hasOwnProperty(prop)) {
          obj[prop] = obj2[prop];
        }
      }

      return obj;
    };

    var Notis = function (el) {
      this.el = el;
      this.text = null
    };

    var NotisBuilder = function (text, config) {
      var self = this;
      this.positions = {};

      this.create = function () {
        var el = document.createElement('div');
        this.notis = new Notis(el);
      };

      this.setDestroy = function () {
        this.notis.destroy = this._destroy.bind(this);
      };

      this.setTimer = function () {
        if (!config.duration) return;
        this.notis.timer = setTimeout(this.notis.destroy, config.duration);
      };

      this.addCloseBtn = function () {
        if (!config.closeBtn) return;
        var btn = document.createElement('div');
        btn.className = 'notis__close';
        btn.onclick = this.notis.destroy;

        this.notis.el.insertBefore(btn, this.notis.el.firstChild);
      };

      this.setOnClick = function () {
        if (!config.close) return;
        this.notis.el.onclick = this.notis.destroy;
      };

      this.addClassName = function () {
        this.notis.el.classList.add('notis');
        this.notis.el.classList.add('notis-' + config.position);
        this.notis.el.classList.add('notis-' + config.type);

        this.notis.el.className += ' ' + config.showAnimation;
      };

      this.addText = function () {
        text = text + '' || '';
        this.notis.text = document.createElement('span');
        this.notis.text.className = 'notis__text';
        this.notis.text.textContent = text + '';
        this.notis.el.appendChild(this.notis.text);
      };

      this.setPositions = function () {
        var regexp = /(^(top|bottom))[-]((right|left)$)/;
        var position = regexp.test(config.position) ? config.position : 'top-right';
        position = position.split('-');
        this.positions.Y = position[0];
        this.positions.X = position[1];
      };

      this.setStyles = function () {
        var el = this.notis.el;
        el.style.position = 'fixed';
        el.style.width = parseFloat(config.width) + 'px';
        el.style[this.positions.Y] = config.indentY + 'px';
        el.style[this.positions.X] = config.indentX + 'px';
        el.style.transition = 'all 0.3s ease-out';
        el.style.webkitTransition = 'all 0.3s ease-out';
      };

      this.updatePositions = function () {
        var prevY = config.indentY;
        var allNotis = document.querySelectorAll('.notis-' + config.position);

        for (var i = 0; i < allNotis.length; i++) {
          var height = allNotis[i].offsetHeight;
          allNotis[i].style[this.positions.Y] = prevY + 'px';
          prevY += height + 10;
        }
      };

      this.setUpdateMethod = function () {
        this.notis.update = function (newText) {
          this.text.textContent = newText;
        }
      };

      this.callBeforeCreate = function () {
        if (typeof config.beforeCreate === 'function') config.beforeCreate(this.notis.el);
      };

      this.callBeforeDestroy = function () {
        if (typeof config.beforeCreate === 'function') config.beforeDestroy(this.notis.el);
      };

      this.append = function () {
        document.body.insertBefore(this.notis.el, document.body.firstChild);
      };

      this._destroy = function () {
        this.callBeforeDestroy();
        this.notis.timer && clearTimeout(this.notis.timer);
        this.notis.el.onclick = null;
        this.notis.el.classList.add('hide');

        setTimeout(function () {
          document.body.removeChild(self.notis.el);
          self.notis = null;
          self.updatePositions();
        }, 300);
      };

      this.build = function () {
        this.create();
        this.setDestroy();
        this.setTimer();
        this.setOnClick();
        this.addCloseBtn();
        this.setPositions();
        this.addClassName();
        this.addText();
        this.setStyles();
        this.setUpdateMethod();
        this.callBeforeCreate();
        this.append();
        this.updatePositions();
        return this.notis;
      };

      return this.build();
    };

    return {
      show: function (text, options) {
        var config = merge(defaultConfig, options);
        return new NotisBuilder(text, config);
      },

      config: function (options) {
        defaultConfig = merge(defaultConfig, options);
      }
    }
  }
));