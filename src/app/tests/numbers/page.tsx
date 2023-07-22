"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useNumberTestStore, useTestStore, useTestsStore } from "@/lib/stores";
import { TestData } from "@/lib/Tests";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FastForward } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  userResponse: z.string().optional(),
});

export default function Home() {
  const [reaction, setReaction] = useState<number>(0);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userResponse: "",
    },
  });
  const [numberText, setNumberText] = useState<string>("");
  const [resetEffect, setResetEffect] = useState<boolean>(false);
  const [canResponse, setCanResponse] = useState<boolean>(false);
  const [submitTimeout, setSubmitTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const testStore = useTestStore();
  const numberTest = useNumberTestStore();
  const [currentTest, setCurrentTest] = useState<TestData | null>(null);
  const router = useRouter();
  const [errors, setErrors] = useState<number>(0);
  const [sections, setSections] = useState<number>(1);
  const [incisions, setIncisions] = useState<number>(1);
  const [currentQuestions, setQuestions] = useState<number[]>([]);
  const [raw, setRaw] = useState<string[]>([
    "0",
    "-",
    "0",
    "|",
    "0",
    "-",
    "0",
    "|",
    "0",
    "-",
    "0",
    "|",
    "0",
    "-",
    "0",
    "|",
    "0",
    "-",
    "0",
    "|",
    "0",
    "-",
    "0",
    "|",
    "0",
    "-",
    "0",
    "|",
    "0",
    "-",
    "0",
  ]);
  useEffect(() => {
    if (!testStore.test) return router.push("/user");
    let currentIndex = 0;
    let currentInterval: NodeJS.Timeout | null = null;
    setCanResponse(false);
    const displayNextQuestion = () => {
      const currentTest = testStore.test?.tests.find(
        (t) => t.id === numberTest.count
      )!;
      if (!currentTest) return router.push("/user");
      setCurrentTest(currentTest);
      const questions = currentTest.questions.find(
        (q) => q.incision == incisions && q.section == sections
      )!.questions;
      setQuestions(questions as number[]);
      currentInterval = setInterval(() => {
        if (currentIndex == questions.length) {
          setReaction(Date.now());
          setNumberText("");
          setCanResponse(true);
          setSubmitTimeout(
            setTimeout(() => {
              setCanResponse(false);
              clearTimeout(submitTimeout!);
              setReaction(0);
            }, 3000)
          );
          setTimeout(() => {
            form.setFocus("userResponse");
          }, 50);
          return clearInterval(currentInterval!);
        }
        setNumberText(questions[currentIndex].toString() || "");
        currentIndex++;
      }, 1500);
    };
    displayNextQuestion();
    return () => clearTimeout(currentInterval!);
  }, [resetEffect]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setCanResponse(false);

    clearTimeout(submitTimeout!);
    let correctAnswer: number[] | string = [...currentQuestions];
    if (numberTest.count == 2) correctAnswer = correctAnswer.reverse();
    correctAnswer = correctAnswer.join("");
    const reactions = currentTest!.reactions;
    if (reaction != 0)
      reactions[sections - 1][incisions - 1] = Date.now() - reaction;
    const responses = currentTest!.responses;
    responses[sections - 1][incisions - 1] = values.userResponse as string;

    form.reset({ userResponse: "" });
    if (values.userResponse == correctAnswer) {
      setRaw((r) => {
        const index = (sections - 1) * 2 * 2 + (incisions - 1) * 2;
        r[index] = "1";
        return r;
      });

      if (sections == 8 && incisions == 2) {
        currentTest!.raw = raw.join("");
        currentTest!.errors = errors;
        currentTest!.reactions = reactions;
        const indexTest = testStore.test?.tests.findIndex(
          (t) => t.id === numberTest.count
        )!;
        testStore.editTest(currentTest!, indexTest);
        numberTest.inc();
        router.push("/tests");
        return;
      }

      if (incisions == 2) {
        setIncisions(1);
        setErrors(0);
        setSections(sections + 1);
      } else setIncisions(2);
      setResetEffect(!resetEffect);
      return;
    } else {
      if (errors == 1) {
        currentTest!.raw = raw.join("");
        currentTest!.errors = errors;
        currentTest!.reactions = reactions;
        const indexTest = testStore.test?.tests.findIndex(
          (t) => t.id === numberTest.count
        )!;
        testStore.editTest(currentTest!, indexTest);
        numberTest.inc();
        return router.push("/tests");
      } else {
        setErrors((e) => e + 1);
        if (sections == 8 && incisions == 2) {
          currentTest!.raw = raw.join("");
          currentTest!.errors = errors;
          currentTest!.reactions = reactions;
          const indexTest = testStore.test?.tests.findIndex(
            (t) => t.id === numberTest.count
          )!;
          testStore.editTest(currentTest!, indexTest);
          numberTest.inc();
          router.push("/tests");
          return;
        }
        if (incisions == 2) {
          setIncisions(1);
          setSections(sections + 1);
        } else setIncisions(2);
        setResetEffect(!resetEffect);
        return;
      }
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10">
      <Card className="w-[400px]">
        <CardHeader>
          <p className="uppercase text-8xl font-black text-center">
            {numberText}
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-8"
            >
              <FormField
                control={form.control}
                name="userResponse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Respuesta</FormLabel>
                    <FormControl>
                      <Input
                        autoFocus
                        disabled={!canResponse}
                        className="placeholder:text-center"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="submit"
                className="w-full bg-emerald-600 dark:bg-white dark:text-black text-black font-black text-center px-2 py-1 flex items-center justify-center rounded text-sm"
                hidden={canResponse || numberText != ""}
              >
                <FastForward size={24} className="mr-2" />
                Enviar
              </button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
