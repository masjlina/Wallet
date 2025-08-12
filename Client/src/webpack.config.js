'use strict';

const path = require('path');

module.exports = {
  mode: 'development',
  entry: './js/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'js'),

    // надежный шаблон для читабельных имён в DevTools
    devtoolModuleFilenameTemplate: info => {
      // предпочитаем абсолютный путь, но есть разные поля у info
      let abs = info.absoluteResourcePath || info.resourcePath || '';

      // 1) убираем NUL-символы, которые превращаются в \u0000
      abs = abs.replace(/\u0000/g, '');

      // 2) если путь содержит Windows-диск "C:\", удалим букву диска,
      //    чтобы не получить "C\u0000#..." и чтобы path.relative работал корректно
      abs = abs.replace(/^[A-Za-z]:[\\/]/, '');

      // 3) сделаем путь относительным от рабочей папки проекта (process.cwd())
      //    — это даст структуру вроде "Client/src/js/components/Input.js"
      let rel = path.relative(process.cwd(), abs);

      // если path.relative вернул пусто (редко), используем исходный очищённый путь
      if (!rel) rel = abs;

      // 4) нормализуем разделители к POSIX-стилю, чтобы DevTools показывал дерево папок
      rel = rel.replace(/\\/g, '/');

      // 5) итог — укажем префикс webpack:/// (можно заменить на 'file:///' при желании)
      return 'webpack:///' + rel;
    }
  },

  watch: true,
  // для отладки предпочтительнее не eval-source-map
  // (eval вставляет код в eval() и иногда мешает читаемым путям);
  // лучше "cheap-module-source-map" (быстро и читаемо) или "source-map" (медленнее, но точнее)
  devtool: 'cheap-module-source-map',

  module: {}
};
