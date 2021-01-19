import * as crypto from 'crypto';

export const hashPwd = (p: string): string => {
    const hmac = crypto.createHmac('sha512',' j89efwj9e8fw0huh*(&MGHCD(A&^GC(AS*H,*9ghAC(M&^gCA()*&YAC(*HJANXC*uy9xhm7A*(XMG879mAXMgAX^&MXAMGXA&^TbAX&tAXMV967%AXFgxA^&9mBXA87XTA%FvAX*^%TmxgA*&65AXFX*A^%TvXAB*^n5XAFXA*M%V^T&XMA^%XAF');
    hmac.update(p);
    return hmac.digest('hex');
}