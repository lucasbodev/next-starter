'use client';

import React, { type ReactElement, useState } from "react";
import { useForm } from 'react-hook-form';
import NewDataSheetStep1Component from "@/lib/components/data-sheet/new-data-sheet/new-data-sheet-step1.component";
import NewDataSheetStep2Component from "@/lib/components/data-sheet/new-data-sheet/new-data-sheet-step2.component";
import NewDataSheetStep3Component from "@/lib/components/data-sheet/new-data-sheet/new-data-sheet-step3.component";


const DataSheetForm = (): ReactElement => {
  const [step, setStep] = useState(0);
  const { control, handleSubmit, setValue, watch, formState: { errors, isValid }, trigger } = useForm();

  const nextStep = (): void => {
    setStep((prevStep: number): number => prevStep + 1);
  };

  const prevStep = (): void => {
    setStep((prevStep: number): number => prevStep - 1);
  };

  const onSubmit = (data: any): void => {
    console.log(data);
    // Handle final form submission here
  };

  return (
    <>
      {step === 0 && <NewDataSheetStep1Component control={control}
                                                 setValue={setValue}
                                                 onNext={nextStep}
                                                 watch={watch}
                                                 errors={errors}
                                                 isValid={isValid}
                                                 trigger={trigger} />}

      {step === 1 && <NewDataSheetStep2Component control={control}
                                                 setValue={setValue}
                                                 onNext={nextStep}
                                                 onBack={prevStep}
                                                 errors={errors}
                                                 isValid={isValid} />}

      {step === 2 && <NewDataSheetStep3Component control={control}
                                                 setValue={setValue}
                                                 onBack={prevStep}
                                                 onSubmit={(event) => handleSubmit(onSubmit)}
                                                 errors={errors} />}
    </>
  );
};

export default DataSheetForm;
