'use client';

import React, {type ReactElement, useState} from 'react';
import {Button, Input, Popover, PopoverContent, PopoverTrigger} from '@nextui-org/react';
import {addPlayer} from '@/lib/actions/player-actions';
import UploadIcon from '@/lib/components/players/upload-icon.component';
import {z, type ZodIssue} from 'zod';
import styles from '@/lib/components/players/add-players.module.scss';
import { type Dictionary } from '@/app/dictionaries';

const playerData = z.object({
    email: z.string().email({message: 'Email is not valid'}),
    name: z.string().min(1, {message: 'Name is required'}),
    age: z.number()
    // photo: z.string(),
});

interface PopupData {
    message: string
    color: 'success' | 'default' | 'danger' | 'foreground' | 'primary' | 'secondary' | 'warning' | undefined
    error: boolean
}

const AddPlayer = (dictionary: Dictionary): ReactElement => {
    const [popup, setPopup] = useState<boolean>(false);
    const [popupData, setPopupData] = useState<PopupData>({message: '', color: 'success', error: false});

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        const formData = new FormData(event.currentTarget);

        console.log('formData', formData);


         try {
            // const res = await fetch('/api/images', {
            //     method: 'POST',
            //     body: formData
            // });
            // if (res.ok) {
            //     console.log(res);
            //     const pictureUrl = (await res.json()).url;

                const data = {
                    email: formData.get('email') as string,
                    name: formData.get('name') as string,
                    age: Number(formData.get('age') as string),
                    pictureUrl: 'pictureUrl'
                };
                if (validateForm(data)) {
                    try {
                        await addPlayer(data);
                        popSuccess(dictionary.players.messages.addPlayerSuccess);
                    } catch (e) {
                        popError(dictionary.players.messages.addPlayerError);
                    }
                }
            // }
        } catch (e) {
            console.log(e);
            popError(dictionary.errors.general);
        }
    };

    const popError = (message: string): void => {
        setPopupData({message, color: 'danger', error: true});
        setPopup(true);
        setTimeout(() => {
            setPopup(false);
        }, 3000);
    };

    const popSuccess = (message: string): void => {
        setPopupData({message, color: 'success', error: false});
        setPopup(true);
        setTimeout(() => {
            setPopup(false);
        }, 3000);
    };

    const formatZodIssue = (issue: ZodIssue): string => {
        const {message} = issue;
        return `${message}`;
    };

    const formatZodError = (error: z.ZodError): string => {
        const {issues} = error;

        if (issues.length > 0) {
            const currentIssue = issues[0];

            return formatZodIssue(currentIssue);
        }
        return dictionary.errors.general;
    };

    const validateForm = (data: { pictureUrl: string, name: string, email: string, age: number }): boolean => {
        try {
            playerData.parse(data);
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                popError(formatZodError(error));
            }

            return false;
        }
    };

    let fileInput: HTMLInputElement | null;
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const file = event.currentTarget.files?.[0];
        console.log(file);
    };

    const triggerFileInput = (): void => {
        if (fileInput != null) {
            fileInput.click();
        }
    };

    return (
        <div className={`${styles.form__container} dark`}>
            <h1>{dictionary.players.form.title}</h1>
            <form className="flex flex-col gap-4" onSubmit={(event) => {
                onSubmit(event).then(r => {
                    console.log(r);
                }).catch(e => {
                    console.log(e);
                });
            }}>
                <Input type="text" placeholder="Email" name="email" isRequired/>
                <Input type="text" placeholder="Name" name="name" isRequired/>
                <Input type="number" placeholder="Age" name="age" isRequired/>
                <div className={`${styles.pointer}`}
                     onClick={triggerFileInput}
                     onKeyDown={triggerFileInput}
                     role="button"
                     tabIndex={0}>
                    <Input
                        readOnly={true}
                        endContent={
                            <div>
                                <UploadIcon size={16}/>
                                <input
                                    type="file" style={{display: 'none'}}
                                    onChange={handleFileSelect}
                                    ref={(input) => (fileInput = input)}
                                    name="file"/>
                            </div>
                        }
                        placeholder="Photo"/>
                </div>

                <Popover placement="bottom" showArrow={true} isOpen={popup} color={popupData.color}>
                    <PopoverTrigger>
                        <Button type="submit">{dictionary.players.form.title}</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="px-1 py-2">
                            <div
                                className="text-small font-bold">{popupData.error ? dictionary.players.messages.addPlayerError : dictionary.players.messages.addPlayerError}</div>
                            <div className="text-tiny">{popupData.message}</div>
                        </div>
                    </PopoverContent>
                </Popover>
            </form>
        </div>
    );
};

export default AddPlayer;
