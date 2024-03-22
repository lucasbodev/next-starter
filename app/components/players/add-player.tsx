'use client';

import { Button, Input, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { addPlayer } from "@/app/actions/player-actions";
import UploadIcon from "@/app/components/players/UploadIcon";
import { z } from "zod";
import { player, Prisma } from "@prisma/client";
import styles from "@/app/styles/players/add-players.module.scss";
import { useState } from "react";

const Player = z.object({
    email: z.string().min(1, { message: 'Username is required' }),
    name: z.string().min(1, { message: 'firstname is required' }),
    age: z.number()
    //photo: z.string(),
});

type Player = z.infer<typeof Player>;

const AddPlayer = () => {

    const [error, setError] = useState<boolean>(false);

    const onSubmit = async (player: FormData) => {
        const data = {
            email: player.get('email') as string,
            name: player.get('name') as string,
            age: Number(player.get('age') as string),
        }
        if (validateForm(data)) {
            try {
                await addPlayer(data as player);
            } catch (e) {
                // if (e instanceof Prisma.PrismaClientKnownRequestError) {
                //     if (e.code === 'P2002') {
                        setError(true);
                //     }
                // }

            }
        }
    };

    const validateForm = (data: Player) => {
        try {
            Player.parse(data);
            return true;
        } catch (error) {
            console.log(error);
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
                {/* isInvalid={validateEmail(value)} errorMessage="Please enter a valid email" */}
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

                <Popover placement="bottom" showArrow={true} isOpen={error}>
                    <PopoverTrigger>
                        <Button type="submit">Add Player</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="px-1 py-2">
                            <div className="text-small font-bold">Popover Content</div>
                            <div className="text-tiny">This is the popover content</div>
                        </div>
                    </PopoverContent>
                </Popover>
            </form>
        </div>
    );
}

export default AddPlayer;
