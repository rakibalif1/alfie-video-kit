import glob
parts=["src/head.html","src/rig.js","src/s1.js","src/s2.js","src/s3.js","src/s4.js","src/s5.js","src/s6.js","src/s7.js","src/final.js"]
out=""
for p in parts:
    try: out+=open(p).read()+"\n"
    except FileNotFoundError: print("missing",p)
out+="\n    </script>\n  </body>\n</html>\n"
open("index.html","w").write(out)
