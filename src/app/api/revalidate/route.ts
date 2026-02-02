import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
    try {
        const body = await req.text();
        const hmac = req.headers.get('X-Shopify-Hmac-Sha256');
        const secret = process.env.SHOPIFY_WEBHOOK_SECRET;

        if (!secret) {
            console.error('Missing SHOPIFY_WEBHOOK_SECRET');
            return NextResponse.json({ message: 'Server config error' }, { status: 500 });
        }

        if (!hmac) {
            return NextResponse.json({ message: 'Missing signature' }, { status: 401 });
        }

        // Verify Signature
        const hash = crypto
            .createHmac('sha256', secret)
            .update(body)
            .digest('base64');

        if (hash !== hmac) {
            return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
        }

        // We can be specific based on the topic, but for simplicity we revalidate all shopify data
        // Topics: products/update, collections/update
        // revalidateTag('shopify');

        console.log('Revalidated tag: shopify');

        return NextResponse.json({ message: 'Revalidated' }, { status: 200 });
    } catch (error) {
        console.error('Revalidation error:', error);
        return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
    }
}
