import {writeFile} from 'fs/promises';
import {type NextRequest, NextResponse} from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse> {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;


    if (file === null) {
        return NextResponse.json({success: false});
    }

    const path = `public/images/${file.name}`;

    try {
        const arrayBuffer = await file.arrayBuffer();
        await writeFile(path, Buffer.from(arrayBuffer));
    } catch (e) {
        console.error(e);
        return NextResponse.json({success: false});
    }

    return NextResponse.json({success: true, url: `/images/${file.name}`});
}
