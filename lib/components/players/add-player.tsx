'use client';

import { Button, Input, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { addPlayer } from "@/lib/actions/player-actions";
import UploadIcon from "@/lib/components/players/UploadIcon";
import { z, ZodIssue } from "zod";
import { player } from "@prisma/client";
import styles from "@/lib/styles/players/add-players.module.scss";
import { useState } from "react";

const Player = z.object({
    email: z.string().email({ message: 'Email is not valid' }),
    name: z.string().min(1, { message: 'Name is required' }),
    age: z.number()
    //photo: z.string(),
});

type Player = z.infer<typeof Player>;

type PopupData = {
    message: string;
    color: "success" | "default" | "danger" | "foreground" | "primary" | "secondary" | "warning" | undefined;
    error: boolean;
}

const AddPlayer = () => {

    const [popup, setPopup] = useState<boolean>(false);
    const [popupData, setPopupData] = useState<PopupData>({ message: '', color: "success", error: false});

    const onSubmit = async (player: FormData) => {
        const data = {
            email: player.get('email') as string,
            name: player.get('name') as string,
            age: Number(player.get('age') as string),
        }
        if (validateForm(data)) {
            try {
                await addPlayer(data as player);
                popSuccess('Player added successfully');
            } catch (e) {
                popError('Email already exists');
            }
        }
    };

    const popError = (message: string) => {
        setPopupData({ message, color: 'danger', error: true});
        setPopup(true);
        setTimeout(() => {
            setPopup(false);
        }, 3000);
    }

    const popSuccess = (message: string) => {
        setPopupData({ message, color: 'success', error: false});
        setPopup(true);
        setTimeout(() => {
            setPopup(false);
        }, 3000);
    }

    const formatZodIssue = (issue: ZodIssue): string => {
        const { message } = issue
        return `${message}`
    }
    
    const formatZodError = (error: z.ZodError) : string => {
        const { issues } = error
    
        if (issues.length) {
            const currentIssue = issues[0]
    
            return formatZodIssue(currentIssue)
        }
        return "An error occurred";
    }

    const validateForm = (data: Player) => {
        try {
            Player.parse(data);
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                popError(formatZodError(error));
              }
            
            return false;
        }
    }

    let fileInput: HTMLInputElement | null;
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0];
        console.log(file);
    }

    const triggerFileInput = () => {
        if (fileInput) {
            fileInput.click();
        }
    }

    return (
        <div className={`${styles.form_container} dark`}>
            <h1>Add Player</h1>
            <form className="flex flex-col gap-4" action={onSubmit}>
                <Input type="text" placeholder="Email" name="email" isRequired />
                <Input type="text" placeholder="Name" name="name" isRequired />
                <Input type="number" placeholder="Age" name="age" isRequired />
                <div className={`${styles.pointer}`} onClick={triggerFileInput}>
                    <Input
                        readOnly={true}
                        endContent={
                            <div>
                                <UploadIcon width="16" height="16" />
                                <input
                                    type="file" style={{ display: 'none' }}
                                    onChange={handleFileSelect}
                                    ref={(input) => (fileInput = input)} />
                            </div>
                        }
                        placeholder="Photo" />
                </div>

                <Popover placement="bottom" showArrow={true} isOpen={popup} color={popupData.color}>
                    <PopoverTrigger>
                        <Button type="submit">Add Player</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="px-1 py-2">
                            <div className="text-small font-bold">{popupData.error ? "Impossible to add the player" : "Player added succesfully"}</div>
                            <div className="text-tiny">{popupData.message}</div>
                        </div>
                    </PopoverContent>
                </Popover>
            </form>
        </div>
    );
}

export default AddPlayer;
