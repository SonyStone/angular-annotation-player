import { KeyCode } from "./keycodes";

const shortcuts = [
  {
    action: 'undo',
    shortcuts: [
      [KeyCode.ControlLeft, KeyCode.KeyZ],
      [KeyCode.ControlRight, KeyCode.KeyZ]
    ] 
  },
  {
    action: 'redo',
    shortcuts: [
      [KeyCode.ControlLeft, KeyCode.KeyY],
      [KeyCode.ControlRight, KeyCode.KeyY],
    ] 
  },
  {
    action: 'play',
    shortcuts: [
      KeyCode.KeyP
    ],
  },
  {
    action: 'pause',
  },
  {
    action: 'nextFrame',
  },
  {
    action: 'previousFrame',
  },
  {
    action: 'nextComment',
  },
  {
    action: 'previousComment',
  },
  {
    action: 'forward',
  },
  {
    action: 'rewind',
  },
  {
    action: 'pen',
  },
  {
    action: 'eraser',
  },
  {
    action: 'draw',
    shortcuts: [
      'pointerdown', 'pointermove', 'pointerup'
    ]
  },
  {
    action: 'pan',
    shortcuts: [
      KeyCode.Space,
      'pointerdown', 'pointermove', 'pointerup'
    ]
  },
  {
    action: 'pan',
    shortcuts: [
      KeyCode.ShiftRight,
      'pointerdown', 'pointermove', 'pointerup'
    ]
  },
]