// Reads width, height and the alpha flag from a WebP file header.
module.exports=b=>{const type=b.toString('latin1',12,16);
 if(type==='VP8X')return{width:1+b.readUIntLE(24,3),height:1+b.readUIntLE(27,3),alpha:!!(b[20]&16)};
 if(type==='VP8 ')return{width:b.readUInt16LE(26)&0x3fff,height:b.readUInt16LE(28)&0x3fff,alpha:false};
 if(type==='VP8L'){const v=b.readUInt32LE(21);return{width:1+(v&0x3fff),height:1+((v>>>14)&0x3fff),alpha:!!((v>>>28)&1)}}
 throw new Error('Not a WebP file')};
