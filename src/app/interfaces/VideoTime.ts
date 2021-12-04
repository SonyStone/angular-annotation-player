import { Brand } from "./Brand.type";

/**
 * Время в ролике в секундах `float`. Милисекунду — число после запятой.
 * Возвращает `<video>` элемент
 * * `currentTime`
 * * `duration`
 */
export type VideoTime = Brand<number, 'VideoTime'>;