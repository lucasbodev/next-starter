import { type NextPage } from "next";
import React from "react";
import { Button } from "@nextui-org/react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import '@/app/globals.scss';
import dataSheetStyles from "./data-sheet.module.scss";
import Link from "next/link";

const DataSheet: NextPage = withPageAuthRequired(async () => {
  return (
    <>
      <div className={dataSheetStyles.data_sheet_wrapper}>
        <h1>Fiches techniques</h1>
        <p>Les fiches techniques des produits</p>
        <Link href="/data-sheet/new-datasheet">
          <Button className="button_gradient_tr_example">
            Ajouter
          </Button>
        </Link>
      </div>
    </>
  );
});

export default DataSheet;
