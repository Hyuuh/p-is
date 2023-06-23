import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { TestData, TestHandler, TestJSON } from './Tests'

interface numberTestState {
  count: number
  inc: () => void
}
export const useNumberTestStore = create<numberTestState>((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 }))
}))

interface TestsStore {
  tests: TestJSON[]
  addTest: (test: TestJSON) => void
  setTests: (tests: TestJSON[]) => void
  editTest: (test: TestJSON, index: number) => void
}

export const useTestsStore = create<TestsStore, [['zustand/persist', unknown]]>(
  persist(
    (set, get) => ({
      tests: [],
      addTest: (test: TestJSON) => set({ tests: [...get().tests, test] }),
      setTests: (tests: TestJSON[]) => set({ tests }),
      editTest: (test: TestJSON, index: number) => {
        const tests = get().tests
        tests[index] = test
        set({ tests })
      }
    }),
    {
      name: 'tests',
      storage: createJSONStorage(() => localStorage)
    }
  )
)

interface TestStore {
  test: TestHandler | null
  setTest: (test: TestHandler | null) => void
  editTest: (test: TestData, index: number) => void
  resetTest: () => void
}
export const useTestStore = create<TestStore>((set, get) => ({
  test: null,
  setTest: (test: TestHandler | null) => set(() => ({ test })),
  editTest: (test: TestData, index: number) => {
    const testFromGet = get().test
    if (!testFromGet) return
    const tests = testFromGet.tests
    tests[index] = test
    set(() => ({ test: testFromGet }))
  },
  resetTest: () => set(() => ({ test: null }))
}))
