import { type NextPage } from "next";
import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import '@/app/globals.css';
import dataSheetStyles from "./data-sheet.module.css";
import LinkButton from "@/lib/components/buttons/LinkButton";



const DataSheet: NextPage = withPageAuthRequired(async () => {
  const href = "/data-sheet/new-datasheet";
  const classname = "button_gradient_tr_example";
  const label = "Ajouter";

  return (
    <div className={dataSheetStyles.data_sheet_wrapper}>
      <h1>Fiches techniques</h1>
      <p>Les fiches techniques des produits</p>
      <LinkButton href={href} className={classname} label={label} />
    </div>
  );
});

export default DataSheet;
