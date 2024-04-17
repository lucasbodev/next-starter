'use client';

import React, { useState, type ReactElement } from 'react';
import { Button, Input, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { addPlayer } from '@/lib/actions/player-actions';
import UploadIcon from '@/lib/components/players/upload-icon.component';
import styles from '@/lib/components/players/add-players.module.scss';
import { type Dictionary } from '@/dictionaries';

interface PopupData {
    message: string
    color: 'success' | 'default' | 'danger' | 'foreground' | 'primary' | 'secondary' | 'warning' | undefined
    error: boolean
}

const AddPlayer = (dictionary: Dictionary): ReactElement => {
    const [popup, setPopup] = useState<boolean>(false);
    const [popupData, setPopupData] = useState<PopupData>({ message: '', color: 'success', error: false });

    const submit = async (data: FormData): Promise<void> => {
        const { error, message } = await addPlayer(data);
        if (error) {
            popError(message);
        } else {
            popSuccess(message);
        }
    };

    const popError = (message: string): void => {
        setPopupData({ message, color: 'danger', error: true });
        setPopup(true);
        setTimeout(() => {
            setPopup(false);
        }, 3000);
    };

    const popSuccess = (message: string): void => {
        setPopupData({ message, color: 'success', error: false });
        setPopup(true);
        setTimeout(() => {
            setPopup(false);
        }, 3000);
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
            <form className="flex flex-col gap-4" action={submit}>
                <Input type="text" placeholder="Email" name="email" isRequired />
                <Input type="text" placeholder="Name" name="name" isRequired />
                <Input type="number" placeholder="Age" name="age" isRequired />
                <div className={`${styles.pointer}`}
                    onClick={triggerFileInput}
                    onKeyDown={triggerFileInput}
                    role="button"
                    tabIndex={0}>
                    <Input
                        readOnly={true}
                        endContent={
                            <div>
                                <UploadIcon size={16} />
                                <input
                                    type="file" style={{ display: 'none' }}
                                    onChange={handleFileSelect}
                                    ref={(input) => (fileInput = input)}
                                    name="image" />
                            </div>
                        }
                        placeholder="Photo" />
                </div>

                <Popover placement="bottom" showArrow={true} isOpen={popup} color={popupData.color}>
                    <PopoverTrigger>
                        <Button type="submit">{dictionary.players.form.title}</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="px-1 py-2">
                            <div
                                className="text-small font-bold">{popupData.error ? dictionary.players.messages.addPlayerError : dictionary.players.messages.addPlayerSuccess}</div>
                            <div className="text-tiny">{popupData.message}</div>
                        </div>
                    </PopoverContent>
                </Popover>
            </form>
        </div>
    );
};

export default AddPlayer;
