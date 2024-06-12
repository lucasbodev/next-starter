'use client';

import React, { type ReactElement, useRef } from "react";
import {
  type Control,
  Controller, type FieldErrors,
  type FieldValues,
  type UseFormSetValue, type UseFormTrigger,
  type UseFormWatch
} from "react-hook-form";
import { Button, Image } from '@nextui-org/react';
import {CameraIcon} from './camera-icon';

interface NewDataSheetStep1ComponentProps {
  control: Control;
  setValue: UseFormSetValue<FieldValues>
  onNext: () => void;
  watch: UseFormWatch<FieldValues>;
  errors: FieldErrors;
  isValid: boolean;
  trigger: UseFormTrigger<FieldValues>
}

const NewDataSheetStep1Component =  (props: NewDataSheetStep1ComponentProps): ReactElement => {
  const {
    control,
    setValue,
    onNext,
    watch,
    isValid,
    trigger
  } = props;

  const image = watch('Image');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const accept = "image/*";

  const openAddFile = (): void => {
    if (fileInputRef.current != null) {
      fileInputRef.current.click();
    }
  };

  const handleNextStep = (): void => {
    if(isValid) {
      onNext();
    }
  };

  return (
    <div className="card_transparent">
      <form className="base_form">
        <h1>Étape 1</h1>
        <Image
          src={image ?? ''}
          width={300}
          height={300}
          className="h-auto object-contain mx-auto"
          alt="Ajouter"
        />
        <Controller
          name="Image"
          control={control}
          rules={{ required: 'Image obligatoire.' }}
          render={({ field: { onChange } }) => (
              <input
                onChange={(event) => {
                  void (async () => {
                    const files = event?.target?.files;
                    const file = files !== null && files.length > 0 ? files[0] : null;

                    if (file !== null) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        const base64 = reader.result as string;
                        setValue('Image', base64);
                        void trigger('Image');
                      };
                      reader.readAsDataURL(file);
                    }
                  })();
                }}
                type="file"
                ref={fileInputRef}
                hidden
                accept={accept}
              />
          )}
        />
        <div className="flex justify-between w-full">
          <Button onClick={openAddFile}
                  size="sm"
                  color="default"
                  endContent={<CameraIcon />}
          >
            Choisir image
          </Button>
          <Button onClick={handleNextStep} size="sm" className="button_gradient_tl_example ml-auto" isDisabled={!isValid}>
            Suite
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewDataSheetStep1Component;
