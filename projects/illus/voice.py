import sys; sys.path.insert(0,'/home/user/alfie-video-kit/tools')
from pron import say_text
import os, json, subprocess, tempfile, shutil, numpy as np, soundfile as sf
import espeakng_loader
from kokoro_onnx import Kokoro, EspeakConfig
M='/tmp/alfie-test/models'; data=espeakng_loader.get_data_path()
if len(data)>100:
    short=os.path.join(tempfile.gettempdir(),'kokoro-espeak-ng-data')
    if not os.path.exists(os.path.join(short,'phontab')): shutil.copytree(data,short)
    data=short
k=Kokoro(M+'/kokoro-v1.0.onnx',M+'/voices-v1.0.bin',espeak_config=EspeakConfig(lib_path=espeakng_loader.get_library_path(),data_path=data))
L=[("priya","bf_lily",1.0,"I arrived last week. Where do I even start?"),
   ("emma","bf_emma",1.0,"First, check your visa conditions. Then get a cheap SIM, and open a bank account in the UK."),
   ("ada","af_nicole",1.05,"And please, never pay anyone to get you a job!"),
   ("priya","bf_lily",1.0,"Thank you both. That helps a lot.")]
out=[np.zeros(int(0.6*24000),dtype=np.float32)]; t=0.6; meta=[]
for who,v,sp,txt in L:
    s,sr=k.create(say_text(txt),voice=v,speed=sp,lang='en-gb'); i=np.where(np.abs(s)>0.008)[0]; s=s[max(0,i[0]-300):i[-1]+900]
    meta.append({"who":who,"text":txt,"start":round(t,2),"dur":round(len(s)/sr,2)}); out+=[s,np.zeros(int(0.5*sr),dtype=np.float32)]; t+=len(s)/sr+0.5
a=np.concatenate(out); sf.write('assets/vo.wav',a,24000); json.dump({"lines":meta,"dur":round(t+0.5,2)},open('lines.json','w')); print(round(t+0.5,1))
