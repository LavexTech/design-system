import { useSyncExternalStore } from "react"
import { AccessibilityInfo } from "react-native"

let reduceMotion = false
let listening = false
let generation = 0
let subscription: { remove: () => void } | null = null
const subscribers = new Set<() => void>()

function notify() {
  subscribers.forEach((subscriber) => subscriber())
}

function ensureListening() {
  if (listening) return
  listening = true
  const current = generation
  AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
    if (!listening || current !== generation || reduceMotion === enabled) return
    reduceMotion = enabled
    notify()
  })
  subscription = AccessibilityInfo.addEventListener("reduceMotionChanged", (enabled) => {
    if (reduceMotion === enabled) return
    reduceMotion = enabled
    notify()
  })
}

function subscribe(subscriber: () => void) {
  subscribers.add(subscriber)
  ensureListening()
  return () => {
    subscribers.delete(subscriber)
    if (subscribers.size > 0) return
    subscription?.remove()
    subscription = null
    listening = false
    generation += 1
  }
}

function getSnapshot() {
  return reduceMotion
}

function getServerSnapshot() {
  return false
}

export function useReduceMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
