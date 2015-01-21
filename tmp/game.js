var MindDefGame = {
//подготовка
  initialize: function() {
     this.cnv = document.getElementById('canvas');
     this.ctx = this.cnv.getContext('2d');
     this.x = 0;
  },
//завершение
  stop: function() {
     //пока пусто
  },
//повторяющийся цикл
  loop: function() {
     //input.update();    // управление
     //global.update();   // "глобальные события"
     //objs.update();     // обновление
     //objs.render();     // отрисовка
     // "затухание" экрана
     this.ctx.globalAlpha = .017;
     this.ctx.fillStyle = "#000";
     this.ctx.fillRect(0,0,this.cnv.width,this.cnv.height);
     this.ctx.globalAlpha = 1;
     // изображение новой полоски
     var clr = 'rgb(' + Math.round(Math.random()*255) + ',' + Math.round(Math.random()*255) + ',' + Math.round(Math.random()*255) + ')';
     this.ctx.fillStyle = clr;
     this.ctx.fillRect(this.x, 0, 1, this.cnv.height);
     this.x++;
     this.x &= 0xFF;
  }
};
 
Function.prototype.bind = function(bind) {
  var me = this;
  return function() {
    var args = Array.prototype.slice.call(arguments);
    return me.apply(bind || null, args);
  };
};
window.addEventListener(
  "load",
  function() {
    MindDefGame.initialize();
    var fps = 25;
    MindDefGame._interval = setInterval(MindDefGame.loop.bind(MindDefGame), 1000/fps);
  },
  false);