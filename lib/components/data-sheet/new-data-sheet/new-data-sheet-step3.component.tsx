"use client";

import React, { type ReactElement } from "react";
import { Autocomplete, AutocompleteItem, Button, Checkbox, Input } from "@nextui-org/react";
import "@/app/globals.scss";
import Link from "next/link";
import { formTemplate } from "@/lib/components/data-sheet/new-data-sheet/form-template-types";
import { type Control, Controller, type FieldErrors, type FieldValues, type UseFormSetValue } from "react-hook-form";

interface NewDataSheetStep3ComponentProps {
  control: Control;
  setValue: UseFormSetValue<FieldValues>;
  onBack: () => void;
  onSubmit: (data: any) => void;
  errors: FieldErrors;
}

const NewDataSheetStep3Component = (props: NewDataSheetStep3ComponentProps): ReactElement => {
  const { onSubmit } = props;

  return (
    <div className="card_transparent">
      <form onSubmit={onSubmit} className="base_form">
        <h1>Step 3</h1>

        {formTemplate.map((field, index) => {
          if (field.type === "input") {
            return (
              <Controller
                key={index}
                name={field.label}
                control={props.control}
                render={({ field: controllerField }) => (
                  <Input
                    {...controllerField}
                    type={field.type ?? "text"}
                    label={field.label}
                    size="sm"
                  />
                )}
              />
            );
          }
          if (field.type === "autocomplete") {
            return (
              <Controller
                key={index}
                name={field.label}
                control={props.control}
                render={({ field: controllerField }) => (
                  <Autocomplete
                    {...controllerField}
                    label={field.label}
                    className="text-black"
                    size={"sm"}
                  >
                    {field.options.map((option: string, optionIndex: number) => (
                      <AutocompleteItem className="text-black" key={option} value={option}>
                        {option}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                )}
              />
            );
          }
          if (field.type === "checkbox") {
            return (
              <div key={field.label}>
                <h3>{field.label}</h3>
                <div className="flex flex-row">
                  {field.options.map((option: string, optionIndex: number) => (
                    <div key={option} className="flex justify-start mr-1">
                      <Controller
                        key={optionIndex}
                        name={option}
                        control={props.control}
                        render={({ field: controllerField }) => (
                          <Checkbox {...controllerField} size={"sm"} />
                        )}
                      />
                      <p>{option}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })}

        <div className="base_toolbar gap-2">
          <Button size="sm" onClick={props.onBack} className="button_gradient_tr_example">
            Retour
          </Button>
          <Link href="/data-sheet/view-datasheets">
            <Button type={"submit"} size="sm" className="button_gradient_tl_example">
              Enregistrer
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default NewDataSheetStep3Component;
