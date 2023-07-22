import { LETTERS_ARRAY, NUMBERS_ARRAY, randomizeArray } from "./array";
import shuffle from "lodash/shuffle";

export interface TestUser {
  id: string;
  name: string;
  age: number;
  laterality: string;
  createdAt: Date;
}

export interface TestData {
  id: number;
  errors: number;
  sections: number;
  incisions: number;
  reactions: (number | null)[][];
  responses: (string | null)[][];
  raw: string;
  questions: TypeTest[];
}

export interface TypeTest {
  section: number;
  incision: number;
  questions: (number | string)[];
}

export interface TestJSON {
  user: TestUser;
  tests: TestData[];
}

export class TestHandler {
  user: TestUser;
  tests: TestData[];
  constructor(user: TestUser, tests?: TestData[]) {
    this.user = user;
    this.tests = tests || [];
  }
  toJSON() {
    return {
      user: this.user,
      tests: this.tests,
    };
  }
  generateNumberTest(SECTION_ENUM: number[], TOTAL_INCISIONS: number) {
    const TOTAL_SECTIONS = SECTION_ENUM.length;
    const test: TypeTest[] = [];
    for (let sectionIndex = 0; sectionIndex < TOTAL_SECTIONS; sectionIndex++) {
      for (let incision = 0; incision < TOTAL_INCISIONS; incision++) {
        const numbers = randomizeArray(
          [...NUMBERS_ARRAY],
          SECTION_ENUM[sectionIndex]
        ) as number[];
        test.push({
          section: sectionIndex + 1,
          incision: incision + 1,
          questions: numbers,
        });
      }
    }
    return shuffle(test);
  }
  generateNumberWithLetterTest(
    SECTION_ENUM: number[],
    TOTAL_INCISIONS: number
  ) {
    const TOTAL_SECTIONS = SECTION_ENUM.length;
    const test: TypeTest[] = [];
    for (let sectionIndex = 0; sectionIndex < TOTAL_SECTIONS; sectionIndex++) {
      for (let incision = 0; incision < TOTAL_INCISIONS; incision++) {
        const numbersArray = shuffle(
          randomizeArray([...NUMBERS_ARRAY], NUMBERS_ARRAY.length)
        ) as number[];
        const stringArray = shuffle(
          randomizeArray([...LETTERS_ARRAY], LETTERS_ARRAY.length)
        ) as string[];
        const result = [];
        result.push(numbersArray.shift());
        result.push(stringArray.shift());
        if (SECTION_ENUM[sectionIndex] > 2) {
          while (result.length < SECTION_ENUM[sectionIndex]) {
            const random = Math.random();
            if (random > 0.5) result.push(numbersArray.shift());
            else result.push(stringArray.shift());
          }
        }
        test.push({
          section: sectionIndex + 1,
          incision: incision + 1,
          questions: result as (number | string)[],
        });
      }
    }
    return shuffle(test);
  }

  setup() {
    const firstTest = this.generateNumberTest([2, 3, 4, 5, 6, 7, 8, 9], 2);
    const secondTest = this.generateNumberTest([2, 2, 3, 4, 5, 6, 7, 8], 2);
    const thirdTest = this.generateNumberWithLetterTest(
      [2, 2, 3, 3, 3, 4, 5, 6, 7, 8],
      3
    );
    this.tests.push(
      {
        id: 1,
        errors: 0,
        sections: 8,
        incisions: 2,
        reactions: [
          [null, null],
          [null, null],
          [null, null],
          [null, null],
          [null, null],
          [null, null],
          [null, null],
          [null, null],
        ],
        responses: [
          [null, null],
          [null, null],
          [null, null],
          [null, null],
          [null, null],
          [null, null],
          [null, null],
          [null, null],
        ],
        raw: "",
        questions: firstTest,
      },
      {
        id: 2,
        errors: 0,
        sections: 8,
        incisions: 2,
        raw: "",
        questions: secondTest,
        responses: [
          [null, null],
          [null, null],
          [null, null],
          [null, null],
          [null, null],
          [null, null],
          [null, null],
          [null, null],
        ],
        reactions: [
          [null, null],
          [null, null],
          [null, null],
          [null, null],
          [null, null],
          [null, null],
          [null, null],
          [null, null],
        ],
      },
      {
        id: 3,
        errors: 0,
        sections: 10,
        incisions: 3,
        raw: "",
        questions: thirdTest,
        reactions: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
          [null, null, null],
          [null, null, null],
          [null, null, null],
          [null, null, null],
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
        responses: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
          [null, null, null],
          [null, null, null],
          [null, null, null],
          [null, null, null],
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
      }
    );
  }
}
