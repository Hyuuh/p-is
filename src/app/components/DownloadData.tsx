"use client";

import { useTestsStore } from "@/lib/stores";
import { Button } from "@/components/ui/button";
import { CloudArrowDown } from "@phosphor-icons/react";
import { MouseEvent, MouseEventHandler, useState } from "react";
import clsx from "clsx";
import { generateDownload } from "@/lib/generateDownload";
import JSZip from "jszip";
export default function DownloadData() {
  const [clear, setClear] = useState(false);
  const testsStore = useTestsStore();
  const download = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    if (e.shiftKey) {
      setClear(true);
      setTimeout(() => {
        setClear(false);
      }, 3000);
      return testsStore.setTests([]);
    }
    if (!testsStore.tests.length) {
      setClear(true);
      setTimeout(() => {
        setClear(false);
      }, 3000);
      return;
    }
    const zip = new JSZip();

    for (const test of testsStore.tests) {
      const testBlob = generateDownload({ user: test });
      zip.file(`${test.user.name}.csv`, testBlob);
    }
    const zipBlob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(zipBlob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "datos.zip");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      onClick={(e) => {
        download(e);
      }}
      className={clsx("dark:bg-emerald-400 ", {
        "bg-emerald-600": !clear,
        "bg-red-600": clear,
      })}
    >
      <CloudArrowDown size={24} className="mr-2" />
      Descargar Datos
    </Button>
  );
}
