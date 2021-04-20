export default class Utils {
  /**
   * Округление числа
   *
   * @param num {number} число
   * @param precision {number} кол-во цифр после запятой
   */
  static round(num, precision) {
    return +(num).toFixed(precision);
  }
}
