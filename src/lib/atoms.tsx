import { atom } from 'jotai'
import { TestHandler, TestJSON } from './Tests'

export const currentNumberTestAtom = atom<number>(1)

export const testsAtom = atom<TestJSON[]>([])

export const testAtom = atom<TestHandler | null>(null)
