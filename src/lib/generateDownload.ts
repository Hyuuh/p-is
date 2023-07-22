import { TestJSON } from "./Tests";
import Papa from "papaparse";
export type UserOrder = {
  question: string;
  response: string;
  reactionMS: string;
  incision: number;
  section: number;
  test: number;
}[][];
export const ordenarUser = (user: TestJSON): UserOrder => {
  return user.tests.map((test) => {
    return test.questions.map(({ questions, incision, section }) => {
      const reactionMS = test.reactions[section - 1]?.at(
        incision - 1
      ) as number;
      const response = test.responses[section - 1]?.at(incision - 1) as string;
      const question = questions.join(" ");
      return {
        question,
        response: response || "No hay",
        reactionMS: reactionMS?.toLocaleString("en-US") || "No hay",
        incision,
        section,
        test: test.id,
      };
    });
  });
};
const formatDate = (date: Date) => {
  const itdl = Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return itdl?.format(typeof date == "object" ? date : new Date()) || "-";
};
export const generateDownload = ({ user }: { user: TestJSON }) => {
  let data: {
    question: string;
    response: string;
    reactionMS: string;
    incision: number;
    section: number;
    test: number;
  }[][] = [];
  data = ordenarUser(user);
  // nombre/ edad/ lateralidad/ preguntas/ respuestas/ ms de respuesta
  const firstTest = data.find((data) => data.find((d) => d.test == 1));
  const firstData = {
    Preguntas: firstTest?.find((d) => d.incision == 1 && d.section == 1)
      ?.question,
    Respuestas: firstTest?.find((d) => d.incision == 1 && d.section == 1)
      ?.response,
    "ms de respuesta": firstTest?.find((d) => d.incision == 1 && d.section == 1)
      ?.reactionMS,
  };
  const headers: any = [
    {
      fecha: formatDate(user.user.createdAt),
      nombre: user.user.name,
      edad: user.user.age,
      lateralidad: user.user.laterality == "left" ? "zurdo" : "diestro",
      ...firstData,
    },
  ];
  data.forEach((test) => {
    const sorted = test.sort(
      (a, b) => a.section - b.section || a.incision - b.incision
    );
    sorted.forEach((d) => {
      headers.push({
        Preguntas: d.question,
        Respuestas: d.response,
        "ms de respuesta": d.reactionMS,
      });
    });
  });

  const content = Papa.unparse(headers);
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  return blob;
};
