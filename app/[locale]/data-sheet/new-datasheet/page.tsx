import { type NextPage } from "next";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import React, { type ReactElement } from "react";
import DataSheetForm from "@/lib/components/data-sheet/data-sheet-form.component";
import newDataSheetStyles from "./new-data-sheet.module.css";

const NewDataSheet: NextPage = withPageAuthRequired(async (): Promise<ReactElement> => {
  return (
    <div className={newDataSheetStyles.new_data_sheet_wrapper}>
      <DataSheetForm />
    </div>
  );
});

export default NewDataSheet;
