import React, { type ReactElement, useState } from "react";
import { Button, ButtonGroup, Input, Textarea } from "@nextui-org/react";
import { Controller, type Control, type FieldValues, type UseFormSetValue, type FieldErrors } from "react-hook-form";

interface NewDataSheetStep2ComponentProps {
  control: Control;
  setValue: UseFormSetValue<FieldValues>
  onNext: () => void;
  onBack: () => void;
  errors: FieldErrors;
  isValid: boolean
}

const NewDataSheetStep2Component = (props: NewDataSheetStep2ComponentProps): ReactElement => {
  const { control, onNext, onBack, errors, isValid } = props;
  const [characteristics, setCharacteristics] = useState(['']);

  function nextStepHandle(): void {
    if(isValid) {
      onNext();
    }
  }

  function previousStepHandle(): void {
    onBack();
  }

  const handleAddField = (): void => {
    setCharacteristics([...characteristics, '']);
  };

  const handleRemoveField = (index: number): void => {
    const newCharacteristics = characteristics.filter((_, i) => i !== index);
    setCharacteristics(newCharacteristics);
  };

  return (
    <div className="card_transparent">
      <form className="base_form">
        <h1>Etape 2</h1>
        <Controller
          name="nom"
          control={control}
          rules={{ required: 'Nom obligatoire.' }}
          render={({ field }) => (
            <>
              <Input {...field} type="text" label="nom" size="sm" />
              {(errors.nom != null) && <p className="text-red-500">{errors.nom.message as string}</p>}
            </>
          )}
        />

        <Controller
          name="Description"
          control={control}
          rules={{ required: 'Description obligatoire.' }}
          render={({ field }) => (
            <>
              <Textarea {...field} label="Description" placeholder="Entrez la description" />
              {(errors.Description != null) && <p className="text-red-500">{errors.Description.message as string}</p>}
            </>
          )}
        />

        {characteristics.map((characteristic, index) => (
          <>
            <Controller
              name={`Caractéristique ${index + 1}`}
              control={control}
              rules={{ required: `Caractéristique ${index + 1} obligatoire.` }}
              render={({ field }) => (
                <>
                  <Input {...field} placeholder={`Caractéristique ${index + 1}`} fullWidth />
                  {(errors[`Caractéristique ${index + 1}`] != null) && <p className="text-red-500">{errors[`Caractéristique ${index + 1}`]?.message as string}</p>}
                </>
              )}
            />
            <ButtonGroup>
              {characteristics.length > 1 && (
                <Button size="sm" color="danger" onClick={() => { handleRemoveField(index); }}>
                  Remove
                </Button>
              )}
              {characteristics.length - 1 === index && (
                <Button size="sm" color="success" onClick={handleAddField}>
                  Add
                </Button>
              )}
            </ButtonGroup>
          </>
        ))}

        <div className="base_toolbar justify-between gap-2">
          <Button onClick={previousStepHandle} size="sm" className="button_gradient_tr_example">
            Retour
          </Button>
          <Button onClick={nextStepHandle} size="sm" className="button_gradient_tl_example" isDisabled={!isValid}>
            Suite
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewDataSheetStep2Component;
