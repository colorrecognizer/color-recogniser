export class RegexUtils {
  /**
   * The username consists of 8 to 30 characters inclusive.
   * The username can only contain alphanumeric characters and underscores (_).
   * The first character of the username must be an alphabetic character.
   */
  static USERNAME = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;

  static EMAIL = /^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$/;

  /**
   * At least one digit [0-9].
   * At least one lowercase character [a-z].
   * At least one uppercase character [A-Z].
   * At least one special character [*.!@#$%^&(){}[]:;<>,.?/~_+-=|\].
   * At least 8 characters in length, but no more than 32.
   */
  static PASSWORD =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&\\(\\){}\\[\]:;<>,.?\\/~_+-=|\\]).{8,32}$/;

  static PHONE_NUMBER =
    /^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$/;
}
