import MyMap from "../../common/my-map.js";

new MyMap();

/*
  Локализация карты

  Чтобы задать для карты язык, необходимо при подключении API передать параметр lang:
  lang=language_region

  - language - двузначный код языка. Формат ISO 639-1.
  - region - двузначный код страны. Формат ISO 3166-1.
    Определяет региональные особенности, например, единицу измерения.

  Поддерживаются следующие локали:
    lang=ru_RU;
    lang=en_US;
    lang=en_RU;
    lang=ru_UA;
    lang=uk_UA;
    lang=tr_TR.
 */
