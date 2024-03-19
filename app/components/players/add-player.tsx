'use client';

import {Button, Input} from "@nextui-org/react";
import addPlayer from "@/app/styles/players/add-players.module.scss";
import UploadIcon from "@/app/components/players/UploadIcon";

const AddPlayer = () => {

    let fileInput: HTMLInputElement | null;
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0];
        console.log(file); // Here, you might upload the file or perform other actions
    }

    // Step 3: The conjuration method for the file selection dialogue
    const triggerFileInput = () => {
        if (fileInput) {
            fileInput.click();
        }
    }

    return (
        <div className={`${addPlayer.form_container} dark`}>
            <h1>Add Player</h1>
            <form className="flex flex-col gap-4">
                <Input type="text" placeholder="Login"/>
                <Input type="text" placeholder="First Name"/>
                <Input type="text" placeholder="Last Name"/>
                <Input type="number" placeholder="Age"/>
                <div className={`${addPlayer.pointer}`} onClick={triggerFileInput}>
                    <Input
                        readOnly={true}
                        endContent={
                            <div>
                                <UploadIcon width="16" height="16"/>
                                <input
                                    type="file" style={{display: 'none'}}
                                    onChange={handleFileSelect}
                                    ref={(input) => (fileInput = input)}/>
                            </div>
                        }
                        placeholder="Photo"/>
                </div>
                <Button>Add Player</Button>
            </form>
        </div>
    );
}

export default AddPlayer;
